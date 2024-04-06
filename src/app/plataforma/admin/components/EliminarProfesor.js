import React, { useState } from 'react'

import { deleteUserAsAdmin } from '@/lib/firebase/actions.admin'

const EliminarProfesor = ({ selectedProfesor, setSelectedProfesor, setCambios }) => {
  const [showConfirmation, setShowConfirmation] = useState(false)
  const [showDone, setShowDone] = useState(false)

  const handleSubmit = () => {
    setShowConfirmation(true)
  }

  const handleConfirmDelete = async () => {
    try {
      await deleteUserAsAdmin({ uid: selectedProfesor.id })
      setCambios(true)
      setShowConfirmation(false)
      setShowDone(true)
    } catch (error) {
      console.log(error)
    }
  }

  const handleCloseConfirmation = () => {
    setShowConfirmation(false)
  }

  const handleCloseDone = () => {
    setShowDone(false)
    setSelectedProfesor(null)
  }

  return (
    <div className='flex w-full mx-auto bg-black'>
      <button onClick={handleSubmit} type="submit" className="font-botones font-bold mx-auto rounded-3xl w-4/6 sm:w-3/6 h-12 sm:h-10 mb-8 bg-white text-black md:hover:text-[#663481] border-2 border-[#663481]">Eliminar profesor</button>
      {showConfirmation && (
          <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-80 z-50">
            <div className="bg-white p-12 rounded-lg text-center flex flex-col">
              <p className="text-black text-xl mb-4 font-bold">¿Seguro de que desea eliminar al profesor?</p>
              <div className='flex mx-auto gap-x-16'>
                <button
                  className="text-orange-600 md:hover:text-orange-300 font-bold"
                  onClick={handleConfirmDelete}
                >
                  Si
                </button>
                <button
                  className="text-orange-600 md:hover:text-orange-300 font-bold"
                  onClick={handleCloseConfirmation}
                >
                  No
                </button>
              </div>
            </div>
          </div>
      )}
      {showDone && (
        <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-80 z-50">
          <div className="bg-white p-12 rounded-lg text-center flex flex-col">
            <p className="text-black text-xl mb-4 font-bold">Profesor eliminado correctamente.</p>
            <button
              className="text-orange-600 md:hover:text-orange-300 mx-auto font-bold"
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

export default EliminarProfesor
