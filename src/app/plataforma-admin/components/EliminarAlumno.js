import React, { useState } from 'react'
import { deleteAlumno } from '../../api/api.js'

const EliminarAlumno = ({ selectedAlumno, setSelectedAlumno }) => {
  const [showConfirmation, setShowConfirmation] = useState(false)
  const [showDone, setShowDone] = useState(false)
  const email = selectedAlumno.Email
  const password = selectedAlumno.Contraseña

  const handleSubmit = () => {
    setShowConfirmation(true)
  }

  const handleConfirmDelete = () => {
    deleteAlumno(email, password)
      .then(() => {
        setShowConfirmation(false)
        setShowDone(true)
      })
      .catch((error) => {
        console.error('Error al eliminar alumno:', error.message)
      })
  }

  const handleCloseConfirmation = () => {
    setShowConfirmation(false)
  }

  const handleCloseDone = () => {
    setShowDone(false)
    setSelectedAlumno(null)
  }

  return (
    <div className='flex w-full mx-auto bg-[#0D0D0D]'>
      <button
        onClick={handleSubmit}
        type='submit'
        className='font-botones font-bold mx-auto rounded-3xl w-4/6 sm:w-3/6 h-12 sm:h-10 mb-8 bg-[#FFFFFF] text-[#E9500E] md:text-[#0D0D0D] md:hover:text-[#DB9B6D] border-2 border-[#DB9B6D]'
      >
        Eliminar alumno
      </button>
      {showConfirmation && (
        <div className='fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray-800 bg-opacity-50 z-50'>
          <div className='bg-[#FFFFFF] p-12 rounded-lg text-center flex flex-col'>
            <p className='text-[#0D0D0D] text-xl mb-4'>
              ¿Está seguro de que desea eliminar al alumno?
            </p>
            <div className='flex mx-auto gap-x-16'>
              <button
                className='text-[#E9500E] md:hover:text-[#DB9B6D]'
                onClick={handleConfirmDelete}
              >
                Si
              </button>
              <button
                className='text-[#0D0D0D]'
                onClick={handleCloseConfirmation}
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}
      {showDone && (
        <div className='fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray-800 bg-opacity-50 z-50'>
          <div className='bg-[#FFFFFF] p-12 rounded-lg text-center flex flex-col'>
            <p className='text-[#0D0D0D] text-xl mb-4'>
              Alumno eliminado correctamente
            </p>
            <button
              className='text-[#663481] md:hover:text-[#9B70BE] ml-auto'
              onClick={handleCloseDone}
            >
              Entendido
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default EliminarAlumno
