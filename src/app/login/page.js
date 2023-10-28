'use client'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { getAuth } from '../../lib/firebase-utils'

const LoginForm = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState({})
  const router = useRouter()

  const validateEmail = (email) => {
    const re = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i
    return re.test(email.trim())
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    setErrors({})

    const formErrors = {}
    if (!validateEmail(email)) {
      formErrors.email = 'Usuario incorrecto'
    }
    if (!password) {
      formErrors.password = 'Se necesita contraseña'
    }

    if (Object.keys(formErrors).length === 0) {
      // Funcion que realiza la autenticacion
      getAuth(email.trim(), password, router, false, false, undefined)
    } else {
      // si hay errores, mostrarlos en el formulario
      setErrors(formErrors)
    }
  }

  return (
    <div className='w-auto h-auto mt-8 lg:mt-2 lg:h-screen flex flex-col justify-center items-center md:justify-start'>
      <div className='md:mt-14 lg:mb-4'>
        <p className='text-3xl text-white'>Ingresar</p>
      </div>

      <form className='border-2 border-white-200 rounded-md m-4 flex flex-col gap-4 py-6 px-4' onSubmit={handleSubmit}>
        <div>
          <label className='text-white mr-2' htmlFor="email">Usuario:</label>
          <input
            placeholder='Nombre de Usuario'
            className='text-black border-2 border-slate-200 rounded-xl p-2 w-full'
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value.trimStart())}
            autoComplete="email"
          />
          {errors.email && <p className='text-[#E9500E] text-sm pt-2'>{errors.email}</p>}
        </div>

        <div>
          <label className='text-white mr-2' htmlFor="password">Contraseña:</label>
          <input
            placeholder='Contraseña'
            className='text-black border-2 border-slate-200 rounded-xl p-2 w-full'
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
          />
          {errors.password && <p className='text-[#E9500E] text-sm pt-2'>{errors.password}</p>}
        </div>

        <button className='hover:bg-[#E9500E] hover:border-white transition-all w-full py-3 px-4 shadow-md border border-[#E9500E] text-white font-bold rounded-3xl mt-5'
          type="submit">
            Iniciar Sesión
        </button>
      </form>
    </div>
  )
}

export default LoginForm
