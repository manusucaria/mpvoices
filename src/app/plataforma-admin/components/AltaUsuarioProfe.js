import React, { useState } from 'react'
import { signUp } from '../../../lib/firebase-utils'

const AltaUsuarioProfe = ({ setProfesorFormSubmitted, setUidRegistered, handleCancelar }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const rol = 'Profesor'
  const [errors, setErrors] = useState({})

  const handleSubmit = async (event) => {
    event.preventDefault()

    setErrors({})

    const formErrors = {}

    if (Object.keys(formErrors).length === 0) {
      try {
        const uid = await signUp(email.trim(), password, rol)
        setUidRegistered(uid)
        setProfesorFormSubmitted(true)
      } catch (error) {
        console.error('Error al registrarse:', error)
      }
    } else {
      setErrors(formErrors)
    }
  }

  return (
    <div className='flex flex-col mx-auto w-full'>
      <h3 className="text-center text-xl sm:text-3xl mb-4 text-white">Crear Cuenta Profesor</h3>
      <form className='flex flex-col mx-auto w-4/6 mt-4' onSubmit={handleSubmit}>
        <div className='flex mb-6'>
          <label className='mr-auto w-2/6' htmlFor="email">Email:</label>
          <input
            className='text-black rounded-3xl h-8 pl-2 w-4/6 ml-auto'
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {errors.email && <p>{errors.email}</p>}
        </div>

        <div className='flex mb-6'>
          <label className='mr-auto w-2/6' htmlFor="password">Password:</label>
          <input
            className='text-black rounded-3xl h-8 pl-2 w-4/6 ml-auto'
            id="password"
            type="text"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {errors.password && <p>{errors.password}</p>}
        </div>
        <div className='flex w-full mx-auto gap-x-2'>
          <button
            className='w-3/6 mr-auto rounded-3xl bg-[#008f39] text-white px-3 py-2'
            type="submit">
              Crear Cuenta
          </button>
          <button
            className='w-3/6 ml-auto rounded-3xl bg-orange-600 text-white px-3 py-2'
            onClick={handleCancelar}
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  )
}

export default AltaUsuarioProfe
