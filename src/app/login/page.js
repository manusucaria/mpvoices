'use client'
import React, { useState } from 'react'

import { signIn } from '@/lib/firebase/auth'

const LoginForm = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState({})
  const [showPassword, setShowPassword] = useState(false)
  const [sending, setSending] = useState(false)

  const validateEmail = (email) => {
    const re = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i
    return re.test(email.trim())
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setErrors({})
    setSending(true)

    const formErrors = {}
    if (!validateEmail(email)) {
      formErrors.email = 'Usuario incorrecto'
    }
    if (!password) {
      formErrors.password = 'Se necesita contraseña'
    }

    if (Object.keys(formErrors).length === 0) {
      try {
        await signIn({ email: email.trim(), password })
        setEmail('')
        setPassword('')
        setErrors({})
        window.location.href = '/plataforma'
      } catch (error) {
        if (error.code === 'auth/wrong-password') {
          setErrors({ password: 'Contraseña incorrecta' })
        }
        if (error.code === 'auth/user-not-found') {
          setErrors({ email: 'E-Mail incorrecto' })
        }
        if (error.code === 'auth/too-many-requests') {
          setErrors({ message: 'Demasiados intentos fallidos' })
        }
      }
    } else {
      setErrors(formErrors)
    }
    setSending(false)
  }

  return (
    <div className="w-auto h-auto mt-8 lg:mt-2 lg:h-screen flex flex-col justify-center items-center md:justify-start">
      <div className="md:mt-14 lg:mb-4">
        <h2 className="text-3xl text-white">Ingresar</h2>
      </div>

      <form
        className="border-2 border-white-200 rounded-md m-4 flex flex-col gap-4 py-6 px-4"
        onSubmit={handleSubmit}
      >
        <div>
          <label className="text-white mr-2 ml-3" htmlFor="email">
            Usuario:
          </label>
          <input
            placeholder="Nombre de Usuario"
            className="text-black border-2 border-slate-200 rounded-3xl p-2 mt-2 w-full"
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value.trimStart())}
            autoComplete="email"
          />
          {errors.email && (
            <p className="text-orange-600 text-sm ml-3">{errors.email}</p>
          )}
        </div>
        <div className="flex flex-col">
          <label className="text-white mr-2 ml-3" htmlFor="password">
            Contraseña:
          </label>
          <div className="grid grid-cols-3 grid-rows-1 w-full mt-2">
            <input
              placeholder="Contraseña"
              className="text-black border-2 border-slate-200 rounded-3xl p-2 w-full col-start-1 col-end-4 row-start-1 row-end-2"
              id="password"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="p-2 mt-1 bg-transparent border-none focus:outline-none mr-2 z-20 col-start-3 col-end-4 row-start-1 row-end-2"
            >
              <img
                src={showPassword ? '/mostrar.png' : '/ocultar.png'}
                alt={showPassword ? 'Mostrar contraseña' : 'Ocultar contraseña'}
                className="w-5 h-5 ml-auto"
              />
            </button>
          </div>
          {errors.password && (
            <p className="text-orange-600 text-sm ml-3">{errors.password}</p>
          )}
        </div>
        {errors.message && (
          <p className="text-orange-600 text-sm ml-3">{errors.message}</p>
        )}
        <button
          className={`hover:bg-[#E9500E] hover:border-white transition-all w-full py-3 px-4 shadow-md border border-[#E9500E] text-white font-bold rounded-3xl mt-5 ${
            sending && 'opacity-50'
          }`}
          type="submit"
          disabled={sending}
        >
          {sending
            ? (
            <div
              role="status"
              className="w-full flex items-center justify-center"
            >
              <svg
                aria-hidden="true"
                className="w-6 h-6 text-gray-200 animate-spin fill-orange-600"
                viewBox="0 0 100 101"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="currentColor"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentFill"
                />
              </svg>
              <span className="sr-only">Loading...</span>
            </div>
              )
            : (
                'Iniciar sesión'
              )}
        </button>
      </form>
    </div>
  )
}

export default LoginForm
