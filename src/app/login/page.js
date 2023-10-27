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
      formErrors.email = 'Invalid email address'
    }
    if (!password) {
      formErrors.password = 'Password is required'
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
    <div className='w-screen h-screen bg-purple-50 flex flex-col justify-center items-center md:justify-start'>
      <div className='md:mt-14'>
        <p className='text-3xl text-purple-600'>Inicia Sesión</p>
      </div>

      <form className='border-2 border-purple-200 rounded p-2 m-4 flex flex-col gap-4' onSubmit={handleSubmit}>
        <div>
          <label className='text-slate-600 mr-2' htmlFor="email">Email:</label>
          <input
            className='text-black border-2 border-slate-200 rounded p-2 w-full'
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value.trimStart())}
          />
          {errors.email && <p>{errors.email}</p>}
        </div>

        <div>
          <label className='text-slate-600 mr-2' htmlFor="password">Password:</label>
          <input
            className='text-black border-2 border-slate-200 rounded p-2 w-full'
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {errors.password && <p>{errors.password}</p>}
        </div>

        <button className='w-full py-3 px-4 bg-purple-600 shadow-md shadow-orange-300 text-white font-bold rounded hover:bg-purple-800 mt-5'
          type="submit">
            Iniciar Sesión
        </button>
      </form>
    </div>
  )
}

export default LoginForm
