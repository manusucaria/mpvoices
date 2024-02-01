import React, { useState } from 'react'
import { signUp } from '../../../lib/firebase-utils'

const AltaUsuarioAlumno = ({ setAlumnoFormSubmitted, setUidRegistered }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [rol, setRol] = useState('')
  const [errors, setErrors] = useState({})

  const handleSubmit = async (event) => {
    event.preventDefault()

    setErrors({})

    const formErrors = {}

    if (Object.keys(formErrors).length === 0) {
      try {
        const uid = await signUp(email.trim(), password, rol)
        setUidRegistered(uid)
        setAlumnoFormSubmitted(true)
      } catch (error) {
        console.error('Error al registrarse:', error)
      }
    } else {
      setErrors(formErrors)
    }
  }

  return (
    <div className='flex flex-col mx-auto w-full'>
      <h3 className="text-center text-xl sm:text-3xl mb-4 text-white">Crear Cuenta Alumno</h3>
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

        <div className='flex mb-6'>
          <label className='mr-auto w-2/6' htmlFor="rol">Rol:</label>
          <input
            className='text-black rounded-3xl h-8 pl-2 w-4/6 ml-auto'
            id="rol"
            type="text"
            value={rol}
            onChange={(e) => setRol(e.target.value)}
          />
        </div>

        <button
          className='mx-auto w-4/6 rounded-3xl ml-auto bg-orange-600 text-white px-3 py-2'
          type="submit">
            Crear Cuenta
        </button>
      </form>
    </div>
  )
}

export default AltaUsuarioAlumno
