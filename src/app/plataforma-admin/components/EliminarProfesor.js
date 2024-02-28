import React, { useState } from 'react'
import { deleteProfesor } from '../../api/api.js'

const EliminarProfesor = ({ selectedProfesor, setSelectedProfesor }) => {
  const [showConfirmation, setShowConfirmation] = useState(false)
  const [showDone, setShowDone] = useState(false)
  const email = selectedProfesor.Email
  const password = selectedProfesor.Contraseña

  const handleSubmit = () => {
    setShowConfirmation(true)
  }

  const handleConfirmDelete = () => {
    deleteProfesor(email, password)
      .then(() => {
        setShowConfirmation(false)
        setShowDone(true)
      })
      .catch(error => {
        console.error('Error al eliminar profesor:', error.message)
      })
  }

  const handleCloseConfirmation = () => {
    setShowConfirmation(false)
  }

  const handleCloseDone = () => {
    setShowDone(false)
    setSelectedProfesor(null)
  }

  return (
    <div className='flex w-full mx-auto bg-[#0D0D0D]'>
      <button onClick={handleSubmit} type="submit" className="font-botones font-bold mx-auto rounded-3xl w-4/6 sm:w-3/6 h-12 sm:h-10 mb-8 bg-[#FFFFFF] text-[#0D0D0D] md:hover:text-[#663481] border-2 border-[#663481]">Eliminar profesor</button>
      {showConfirmation && (
          <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray-800 bg-opacity-50 z-50">
            <div className="bg-[#FFFFFF] p-12 rounded-lg text-center flex flex-col">
              <p className="text-[#0D0D0D] text-xl mb-4">¿Está seguro de que desea eliminar al profesor?</p>
              <div className='flex mx-auto gap-x-16'>
                <button
                  className="text-[#663481] md:hover:text-[#9B70BE]"
                  onClick={handleConfirmDelete}
                >
                  Si
                </button>
                <button
                  className="text-[#0D0D0D]"
                  onClick={handleCloseConfirmation}
                >
                  No
                </button>
              </div>
            </div>
          </div>
      )}
      {showDone && (
        <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray-800 bg-opacity-50 z-50">
          <div className="bg-[#FFFFFF] p-12 rounded-lg text-center flex flex-col">
            <p className="text-[#0D0D0D] text-xl mb-4">Profesor eliminado correctamente</p>
            <button
              className="text-[#E9500E] md:hover:text-[#DB9B6D] ml-auto"
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

export default EliminarProfesor
