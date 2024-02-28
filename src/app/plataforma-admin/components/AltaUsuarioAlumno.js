import React, { useState } from 'react'
import { signUp } from '../../../lib/firebase-utils'

const AltaUsuarioAlumno = ({ setAlumnoFormSubmitted, handleCancelar, onFormSubmit }) => {
  const [newUserEmail, setNewUserEmail] = useState('')
  const [newUserPassword, setNewUserPassword] = useState('')
  const newUserRol = 'Alumno'
  const [errors, setErrors] = useState({})
  const [showConfirmation, setShowConfirmation] = useState(false)

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
        setShowConfirmation(true)
      } catch (error) {
        if (error.code === 'auth/email-already-in-use') {
          formErrors.email = 'E-Mail no disponible'
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

  const handleCloseConfirmation = () => {
    setShowConfirmation(false)
    setAlumnoFormSubmitted(true)
  }

  return (
    <div className='flex flex-col mx-auto w-full'>
      <div className="mx-auto flex justify-center w-full md:w-4/6 lg:w-3/6 my-8">
        <div className="flex my-auto pt-1">
          <svg className='my-auto md:hover:cursor-pointer stroke-[#E9500E] md:hover:stroke-[#DB9B6D]' onClick={handleCancel} width="34" height="32" viewBox="0 0 34 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g id="iconamoon:arrow-up-2-light">
            <path id="Vector" d="M19.8333 9.22572L12.75 15.8155L19.8333 22.4053" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </g>
          </svg>
        </div>
        <div className='my-auto flex ml-4'>
          <h3 className="text-[#FFFFFF] my-auto text-xl sm:text-2xl">Nuevos usuarios</h3>
          <p className='text-[#FFFFFF] my-auto mx-2'>|</p>
          <p className='text-[#E9500E] my-auto lg:mt-1 text-xl sm:text-2xl'>alta alumno</p>
        </div>
      </div>
      <form className='flex flex-col mx-auto w-full md:w-4/6 lg:w-3/6 bg-[#0D0D0D] px-4 sm:px-8 py-8' onSubmit={handleSubmit}>
        <div className='flex border-b-[0.5px] sm:border-b-1 border-b-[#FFFFFF] pb-8 mb-8'>
          <h4 className='text-[#FFFFFF] my-auto text-lg sm:text-xl'>Alta alumno</h4>
          <p className='text-[#FFFFFF] my-auto mx-4'>|</p>
          <p className='text-[#E9500E] my-auto text-lg sm:text-xl'>crear cuenta</p>
        </div>
        <div className='flex'>
          <label className='font-bold mr-auto w-2/6 text-[#FFFFFF]' htmlFor="email">E-Mail:</label>
          <input
            placeholder="E-Mail"
            className='text-[#0D0D0D] rounded-3xl h-8 pl-2 w-4/6 ml-auto'
            id="email"
            type="email"
            value={newUserEmail}
            onChange={(e) => setNewUserEmail(e.target.value)}
          />
        </div>
        {errors.email && <p className="ml-auto pr-4 mt-1 text-[#FFFFFF] text-sm">{errors.email}</p>}
        <div className='flex mt-6'>
          <label className='font-bold mr-auto w-2/6 text-[#FFFFFF]' htmlFor="password">Password:</label>
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
        <div className='flex w-full mx-auto gap-x-4 mt-8 mb-2'>
          <button
            className='font-botones font-bold h-12 sm:h-10 w-3/6 mr-auto rounded-3xl bg-[#E9500E] text-[#FFFFFF] px-3 md:hover:bg-[#DB9B6D]'
            type="submit">
              Crear cuenta
          </button>
          <button
            className='font-botones font-bold h-12 sm:h-10 w-3/6 ml-auto rounded-3xl bg-[#FFFFFF] text-[#0D0D0D] md:hover:text-[#E9500E] border-2 border-[#E9500E] px-3'
            onClick={handleCancel}
          >
            Cancelar
          </button>
        </div>
      </form>
      {showConfirmation && (
        <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray-800 bg-opacity-50 z-50">
          <div className="bg-[#FFFFFF] p-12 rounded-lg text-center flex flex-col">
            <svg className='mx-auto' width="24" height="22" viewBox="0 0 24 22" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M7.20926 21.7946C7.77176 21.7946 8.19364 21.5234 8.87667 20.9207L12.322 17.8672H18.399C21.4224 17.8672 23.12 16.1395 23.12 13.1562V5.36157C23.12 2.37831 21.4224 0.650635 18.399 0.650635H5.59208C2.56864 0.650635 0.871094 2.37831 0.871094 5.36157V13.1562C0.871094 16.1395 2.60882 17.8672 5.52176 17.8672H5.93359V20.3482C5.93359 21.2422 6.40569 21.7946 7.20926 21.7946ZM7.70145 19.5848V16.7221C7.70145 16.1294 7.45033 15.8984 6.87779 15.8984H5.6423C3.74386 15.8984 2.83984 14.9442 2.83984 13.0959V5.42184C2.83984 3.57363 3.74386 2.61938 5.6423 2.61938H18.3387C20.2372 2.61938 21.1512 3.57363 21.1512 5.42184V13.0959C21.1512 14.9442 20.2372 15.8984 18.3387 15.8984H12.2115C11.6088 15.8984 11.3075 15.9988 10.8856 16.4408L7.70145 19.5848ZM10.9258 14.0301C11.2874 14.0301 11.5988 13.8593 11.8097 13.5279L16.2997 6.50666C16.4302 6.29572 16.5508 6.05465 16.5508 5.83367C16.5508 5.33144 16.1088 4.99997 15.6367 4.99997C15.3354 4.99997 15.0642 5.17072 14.8532 5.5022L10.8856 11.8705L9.0173 9.48992C8.77623 9.17854 8.53516 9.06805 8.23382 9.06805C7.74163 9.06805 7.35993 9.46983 7.35993 9.96202C7.35993 10.2031 7.45033 10.4241 7.62109 10.635L9.99163 13.5379C10.2628 13.8794 10.5541 14.0301 10.9258 14.0301Z" fill="#E9500E"/>
            </svg>
            <p className="text-[#0D0D0D] text-xl my-4">¡La cuenta se creó con éxito!</p>
            <button
              className="text-[#E9500E] md:hover:text-[#DB9B6D] ml-auto"
              onClick={handleCloseConfirmation}
            >
              Entendido
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default AltaUsuarioAlumno
