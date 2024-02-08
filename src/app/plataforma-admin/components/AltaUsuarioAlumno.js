import React, { useState } from 'react'
import { signUp } from '../../../lib/firebase-utils'

const AltaUsuarioAlumno = ({ setAlumnoFormSubmitted, handleCancelar, onFormSubmit }) => {
  const [newUserEmail, setNewUserEmail] = useState('')
  const [newUserPassword, setNewUserPassword] = useState('')
  const newUserRol = 'Alumno'
  const [errors, setErrors] = useState({})

  const adminEmail = 'admin@gmail.com'
  const adminPassword = 'admin1111'

  const handleSubmit = async (event) => {
    event.preventDefault()

    setErrors({})

    const formErrors = {}

    if (!newUserEmail.trim()) {
      formErrors.email = 'El campo de correo electrónico es obligatorio'
    }

    if (!newUserPassword) {
      formErrors.password = 'El campo de contraseña es obligatorio'
    }

    if (Object.keys(formErrors).length === 0) {
      try {
        onFormSubmit(newUserEmail, newUserPassword)
        await signUp(newUserEmail.trim(), newUserPassword, newUserRol, adminEmail, adminPassword)
        setAlumnoFormSubmitted(true)
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
    <div className='flex flex-col mx-auto w-full md:w-4/6'>
      <h3 className="text-center text-xl sm:text-3xl mb-4 text-[#0D0D0D]">Crear Cuenta Alumno</h3>
      <form className='flex flex-col mx-auto w-full md:w-4/6 mt-4 px-4' onSubmit={handleSubmit}>
        <div className='flex'>
          <label className='font-bold mr-auto w-2/6 text-[#0D0D0D]' htmlFor="email">Email:</label>
          <input
            placeholder="Email"
            className='text-[#0D0D0D] rounded-3xl h-8 pl-2 w-4/6 ml-auto'
            id="email"
            type="email"
            value={newUserEmail}
            onChange={(e) => setNewUserEmail(e.target.value)}
          />
        </div>
        {errors.email && <p className="ml-auto pr-4 mt-1 text-[#FFFFFF] text-sm">{errors.email}</p>}
        <div className='flex mt-6'>
          <label className='font-bold mr-auto w-2/6 text-[#0D0D0D]' htmlFor="password">Password:</label>
          <input
            placeholder="Contraseña"
            className='text-[#0D0D0D] rounded-3xl h-8 pl-2 w-4/6 ml-auto'
            id="password"
            type="text"
            value={newUserPassword}
            autoComplete='new-password'
            onChange={(e) => setNewUserPassword(e.target.value)}
          />
        </div>
        {errors.password && <p className="ml-auto pr-4 mt-1 text-white text-sm">{errors.password}</p>}
        <div className='flex w-full mx-auto gap-x-4 mt-8'>
          <button
            className='font-botones font-bold h-12 w-3/6 mr-auto rounded-3xl bg-[#E9500E] text-[#FFFFFF] px-3'
            type="submit">
              Crear Cuenta
          </button>
          <button
            className='font-botones font-bold h-12 w-3/6 ml-auto rounded-3xl bg-[#FFFFFF] text-[#E9500E] md:text-[#0D0D0D] md:hover:text-[#E9500E] border-2 border-[#E9500E] px-3'
            onClick={handleCancel}
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  )
}

export default AltaUsuarioAlumno
