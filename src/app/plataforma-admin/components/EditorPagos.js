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
        console.log('¡Datos actualizados correctamente!')
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
          <form className='w-4/6 mx-auto mt-4' onSubmit={handleSubmit}>
            <div className='flex mb-6'>
              <label className='mr-auto w-2/6'>Saldo:</label>
              <input
                className='text-black rounded-3xl h-8 pl-2 w-4/6 ml-auto'
                type='number'
                name='saldo'
                value={saldo}
                onChange={(e) => setSaldo(parseFloat(e.target.value))}
              />
            </div>
            <div className='flex mb-6'>
              <label className='mr-auto w-2/6'>Última Actualización:</label>
              <input
                className='text-black rounded-3xl h-8 pl-2 w-4/6 ml-auto'
                type='text'
                name='actualizacion'
                value={actualizacion}
                onChange={(e) => setActualizacion(e.target.value)}
              />
            </div>
            <div className='flex w-full mx-auto my-8'>
              <button className='rounded-3xl bg-white text-black px-3 py-2' type='submit'>
                Guardar cambios
              </button>
              <button
                className='rounded-3xl ml-auto bg-orange-600 text-white px-3 py-2'
                onClick={cancelarClick}
                type='button'
              >
                Cancelar cambios
              </button>
            </div>
          </form>
        </div>
          )
        : (
        <div className='flex flex-col w-4/6 mx-auto mt-4'>
          <p className='mb-8'>Saldo: {saldo}</p>
          <p className='mb-8'>Última Actualización: {actualizacion}</p>
          <button className='rounded-3xl h-8 mt-8 mb-8 bg-orange-600' onClick={handleEditClick}>
            Editar Perfil
          </button>
        </div>
          )}
    </div>
  )
}

export default EditorPagos
