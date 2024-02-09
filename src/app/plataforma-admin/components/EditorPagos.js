import React, { useState, useEffect } from 'react'
import { updateAlumno } from '../../api/api.js'

const EditorPagos = ({ alumno }) => {
  const [saldo, setSaldo] = useState(0)
  const [originalSaldo, setOriginalSaldo] = useState(0)
  const [actualizacion, setActualizacion] = useState('')
  const [editMode, setEditMode] = useState(false)

  useEffect(() => {
    if (alumno) {
      setSaldo(alumno.Saldo || 0)
      setOriginalSaldo(alumno.Saldo || 0)
      setActualizacion(alumno.Actualizacion || '')
    }
  }, [alumno])

  const handleSubmit = async (event) => {
    event.preventDefault()
    const confirmation = window.confirm('¿Estás seguro de que deseas guardar los cambios?')
    if (confirmation) {
      try {
        const updatedAlumno = {
          Saldo: saldo,
          Actualizacion: actualizacion
        }
        await updateAlumno(alumno.id, updatedAlumno)
        setEditMode(false)
      } catch (error) {
        console.error('Error al actualizar los datos:', error)
      }
    }
  }

  const handleEditClick = () => {
    setEditMode(true)
  }

  const cancelarClick = () => {
    setSaldo(originalSaldo)
    setEditMode(false)
  }

  return (
    <div className='w-full'>
      {editMode
        ? (
        <div className='flex flex-col w-full'>
          <form className='w-full mx-auto mt-4' onSubmit={handleSubmit}>
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
              <label className='font-bold mr-auto w-2/6'>Última Actualización:</label>
              <input
                className='text-[#0D0D0D] rounded-3xl h-8 pl-2 w-4/6 ml-auto'
                type='text'
                name='actualizacion'
                value={actualizacion}
                onChange={(e) => setActualizacion(e.target.value)}
              />
            </div>
            <div className='flex w-full mx-auto mt-8 gap-x-4'>
            <button className='font-botones font-bold rounded-3xl w-3/6 bg-[#E9500E] text-[#FFFFFF] px-3 h-10 md:hover:bg-[#DB9B6D]' type='submit'>
                Guardar
              </button>
              <button
                className='font-botones font-bold rounded-3xl w-3/6 ml-auto bg-[#FFFFFF] text-[#E9500E] md:text-[#0D0D0D] md:hover:text-[#E9500E] border-2 border-[#E9500E] px-3 h-10'
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
        <div className='flex flex-col w-full mx-auto mt-4'>
          <div className='mb-8 flex'>
            <p className='mr-2 text-base font-bold'>Saldo:</p>
            <p className='text-base'>{saldo}</p>
          </div>
          <div className='flex'>
            <p className='mr-2 text-base font-bold'>Última Actualización:</p>
            <p className='text-base'>{actualizacion}</p>
          </div>
          <button className='font-botones font-bold rounded-3xl w-4/6 mx-auto h-10 mt-8 bg-[#E9500E] md:hover:bg-[#DB9B6D]' onClick={handleEditClick}>
            Editar Perfil
          </button>
        </div>
          )}
    </div>
  )
}

export default EditorPagos
