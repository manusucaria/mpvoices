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
        className='font-botones font-bold mx-auto rounded-3xl w-4/6 sm:w-3/6 h-12 sm:h-10 mb-8 bg-[#FFFFFF] text-[#0D0D0D] md:hover:text-[#A33100] border-2 border-[#A33100]'
      >
        Eliminar alumno
      </button>
      {showConfirmation && (
        <div className='fixed top-0 left-0 w-full h-full flex justify-center px-3 bg-[#0D0D0D] bg-opacity-30 items-center z-50'>
          <div className='bg-[#FFFFFF] p-12 rounded-lg text-center flex flex-col'>
            <p className='text-[#0D0D0D] text-xl mb-4 font-bold'>
              ¿Está seguro de que desea eliminar al alumno?
            </p>
            <div className='flex mx-auto gap-x-16'>
              <button
                className='text-[#A33100] md:hover:text-[#F57B48] font-bold'
                onClick={handleConfirmDelete}
              >
                Si
              </button>
              <button
                className='text-[#A33100] md:hover:text-[#F57B48] font-bold'
                onClick={handleCloseConfirmation}
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}
      {showDone && (
        <div className='fixed top-0 left-0 w-full h-full flex justify-center px-3 bg-[#0D0D0D] bg-opacity-30 items-center z-50'>
          <div className='bg-[#FFFFFF] p-12 rounded-lg text-center flex flex-col'>
            <p className='text-[#0D0D0D] text-xl mb-4 font-bold'>
              Alumno eliminado correctamente.
            </p>
            <button
              className='text-[#E9500E] md:hover:text-[#DB9B6D] ml-auto font-bold'
              onClick={handleCloseDone}
            >
              Volver al inicio
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default EliminarAlumno
