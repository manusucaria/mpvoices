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

    if (!email.trim()) {
      formErrors.email = 'El campo de correo electrónico es obligatorio'
    }

    if (!password) {
      formErrors.password = 'El campo de contraseña es obligatorio'
    }

    if (Object.keys(formErrors).length === 0) {
      try {
        const uid = await signUp(email.trim(), password, rol)
        setUidRegistered(uid)
        setProfesorFormSubmitted(true)
      } catch (error) {
        if (error.code === 'auth/email-already-in-use') {
          formErrors.email = 'Email no disponible'
        } else if (error.code === 'auth/weak-password') {
          formErrors.password = 'Contraseña débil'
        } else {
          console.error('Error al registrarse:', error)
        }
      }
    }

    setErrors(formErrors)
  }

  const handleCancel = () => {
    handleCancelar()
  }

  return (
    <div className='flex flex-col mx-auto w-full'>
      <h3 className="text-center text-xl sm:text-3xl mb-4 text-white">Crear Cuenta Profesor</h3>
      <form className='flex flex-col mx-auto w-4/6 mt-4' onSubmit={handleSubmit}>
        <div className='flex'>
          <label className='mr-auto w-2/6' htmlFor="email">Email:</label>
          <input
            placeholder="Email"
            className='text-black rounded-3xl h-8 pl-2 w-4/6 ml-auto'
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        {errors.email && <p className="ml-auto pr-4 mt-1 text-white text-sm">{errors.email}</p>}
        <div className='flex mt-6'>
          <label className='mr-auto w-2/6' htmlFor="password">Password:</label>
          <input
            placeholder="Contraseña"
            className='text-black rounded-3xl h-8 pl-2 w-4/6 ml-auto'
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {errors.password && <p className="ml-auto pr-4 mt-1 text-white text-sm">{errors.password}</p>}
        <div className='flex w-full mx-auto gap-x-2 mt-6'>
          <button
            className='w-3/6 mr-auto rounded-3xl bg-[#008f39] text-white px-3 py-2'
            type="submit">
              Crear Cuenta
          </button>
          <button
            className='w-3/6 ml-auto rounded-3xl bg-orange-600 text-white px-3 py-2'
            onClick={handleCancel}
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  )
}

export default AltaUsuarioProfe
