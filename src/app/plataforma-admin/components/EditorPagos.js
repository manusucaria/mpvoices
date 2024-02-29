import React, { useState, useEffect } from 'react'
import { updateAlumno } from '../../api/api.js'

const EditorPagos = ({ alumno }) => {
  const [saldo, setSaldo] = useState(0)
  const [originalSaldo, setOriginalSaldo] = useState(0)
  const [actualizacion, setActualizacion] = useState('')
  const [editMode, setEditMode] = useState(false)
  const [showConfirmation, setShowConfirmation] = useState(false)

  useEffect(() => {
    if (alumno) {
      setSaldo(alumno.Saldo || 0)
      setOriginalSaldo(alumno.Saldo || 0)
      setActualizacion(alumno.Actualizacion || '')
    }
  }, [alumno])

  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      const updatedAlumno = {
        Saldo: saldo,
        Actualizacion: actualizacion
      }
      await updateAlumno(alumno.id, updatedAlumno)
      setEditMode(false)
      setShowConfirmation(true)
    } catch (error) {
      console.error('Error al actualizar los datos:', error)
    }
  }

  const handleEditClick = () => {
    setEditMode(true)
  }

  const cancelarClick = () => {
    setSaldo(originalSaldo)
    setEditMode(false)
  }

  const handleCloseConfirmation = () => {
    setShowConfirmation(false)
  }

  return (
    <div className='w-full'>
      {editMode
        ? (
        <div className='flex flex-col w-full bg-[#0D0D0D] px-4 sm:px-8 p-8 pt-4'>
          <form className='w-full mx-auto' onSubmit={handleSubmit}>
            <div className='flex mb-6'>
              <label className='font-bold mr-auto w-2/6'>Saldo:</label>
              <input
                className='text-[#0D0D0D] rounded-3xl h-8 pl-2 w-4/6 ml-auto'
                type='number'
                name='saldo'
                value={saldo}
                onChange={(e) => setSaldo(parseFloat(e.target.value))}
              />
            </div>
            <div className='flex mb-6'>
              <label className='font-bold mr-auto w-2/6'>Actualización:</label>
              <input
                className='text-[#0D0D0D] rounded-3xl h-8 pl-2 w-4/6 ml-auto'
                type='text'
                name='actualizacion'
                value={actualizacion}
                onChange={(e) => setActualizacion(e.target.value)}
              />
            </div>
            <div className='flex w-full mx-auto mt-8 gap-x-4'>
              <button className='font-botones font-bold rounded-3xl w-3/6 bg-[#E9500E] text-[#FFFFFF] px-3 h-12 sm:h-10 md:hover:bg-[#DB9B6D]' type='submit'>
                Guardar
              </button>
              <button
                className='font-botones font-bold rounded-3xl w-3/6 ml-auto bg-[#FFFFFF] text-[#0D0D0D] md:hover:text-[#E9500E] border-2 border-[#E9500E] px-3 h-12 sm:h-10'
                onClick={cancelarClick}
                type='button'
              >
                Cancelar
              </button>
            </div>
          </form>
        </div>
          )
        : (
        <div className='flex flex-col w-full mx-auto bg-[#0D0D0D]'>
          <div className='px-4 sm:px-8 pb-8 w-full pt-4'>
            <div className='mb-8 flex'>
              <p className='mr-2 text-base font-bold'>Saldo:</p>
              <p className='text-base'>${saldo}</p>
            </div>
            <div className='flex'>
              <p className='mr-2 text-base font-bold'>Actualización:</p>
              <p className='text-base'>{actualizacion}</p>
            </div>
          </div>
          <div className='bg-[#0D0D0D] flex flex-col mx-auto w-full'>
            <button className='font-botones font-bold rounded-3xl w-4/6 sm:w-3/6 mx-auto h-12 sm:h-10 mb-8 bg-[#E9500E] md:hover:bg-[#DB9B6D]' onClick={handleEditClick}>
                Editar pagos
            </button>
          </div>
        </div>
          )}
        {showConfirmation && (
          <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray-800 bg-opacity-50 z-50">
            <div className="bg-[#FFFFFF] p-12 rounded-lg text-center flex flex-col">
              <p className="text-[#0D0D0D] text-xl mb-4 font-bold">Los cambios se guardaron correctamente.</p>
              <button
                className="text-[#E9500E] md:hover:text-[#DB9B6D] ml-auto font-bold"
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

export default EditorPagos
