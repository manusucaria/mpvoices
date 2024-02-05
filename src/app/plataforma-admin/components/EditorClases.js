import React, { useState, useEffect } from 'react'
import { updateAlumno } from '../../api/api.js'

const EditorClases = ({ alumno }) => {
  const [instrumento, setInstrumento] = useState('')
  const [dia, setDia] = useState('')
  const [horario, setHorario] = useState('')
  const [duracion, setDuracion] = useState('')
  const [profesor, setProfesor] = useState('')
  const [originalData, setOriginalData] = useState(null)
  const [editMode, setEditMode] = useState(false)

  useEffect(() => {
    if (alumno) {
      setInstrumento(alumno.Instrumento || '')
      setDia(alumno.Dia || '')
      setHorario(alumno.Horario || '')
      setDuracion(alumno.Duracion || '')
      setProfesor(alumno.Profesor || '')

      setOriginalData({
        Instrumento: alumno.Instrumento || '',
        Dia: alumno.Dia || '',
        Horario: alumno.Horario || '',
        Duracion: alumno.Duracion || '',
        Profesor: alumno.Profesor || ''
      })
    }
  }, [alumno])

  const handleSubmit = async (event) => {
    event.preventDefault()
    const confirmation = window.confirm('¿Estás seguro de que deseas guardar los cambios?')
    if (confirmation) {
      try {
        const updatedAlumno = {
          Instrumento: instrumento,
          Dia: dia,
          Horario: horario,
          Duracion: duracion,
          Profesor: profesor
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
    if (originalData) {
      setInstrumento(originalData.Instrumento)
      setDia(originalData.Dia)
      setHorario(originalData.Horario)
      setDuracion(originalData.Duracion)
      setProfesor(originalData.Profesor)
    }
    setEditMode(false)
  }

  return (
    <div className='w-full'>
      {editMode
        ? (
        <div className='flex flex-col w-full'>
          <form className='w-4/6 mx-auto mt-4' onSubmit={handleSubmit}>
            <div className='flex mb-6'>
              <label className='mr-auto w-2/6'>Instrumento:</label>
              <input
                className='text-black rounded-3xl h-8 pl-2 w-4/6 ml-auto'
                type='text'
                name='instrumento'
                value={instrumento}
                onChange={(e) => setInstrumento(e.target.value)}
              />
            </div>
            <div className='flex mb-6'>
              <label className='mr-auto w-2/6'>Día:</label>
              <input
                className='text-black rounded-3xl h-8 pl-2 w-4/6 ml-auto'
                type='text'
                name='dia'
                value={dia}
                onChange={(e) => setDia(e.target.value)}
              />
            </div>
            <div className='flex mb-6'>
              <label className='mr-auto w-2/6'>Horario:</label>
              <input
                className='text-black rounded-3xl h-8 pl-2 w-4/6 ml-auto'
                type='text'
                name='horario'
                value={horario}
                onChange={(e) => setHorario(e.target.value)}
              />
            </div>
            <div className='flex mb-6'>
              <label className='mr-auto w-2/6'>Duración:</label>
              <input
                className='text-black rounded-3xl h-8 pl-2 w-4/6 ml-auto'
                type='text'
                name='duracion'
                value={duracion}
                onChange={(e) => setDuracion(e.target.value)}
              />
            </div>
            <div className='flex mb-6'>
              <label className='mr-auto w-2/6'>Profesor:</label>
              <input
                className='text-black rounded-3xl h-8 pl-2 w-4/6 ml-auto'
                type='text'
                name='profesor'
                value={profesor}
                onChange={(e) => setProfesor(e.target.value)}
              />
            </div>
            <div className='flex w-full mx-auto'>
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
          <p className='mb-8'>Instrumento: {instrumento}</p>
          <p className='mb-8'>Día: {dia}</p>
          <p className='mb-8'>Horario: {horario}</p>
          <p className='mb-8'>Duración: {duracion}</p>
          <p>Profesor: {profesor}</p>
          <button className='rounded-3xl h-8 mt-8 bg-orange-600' onClick={handleEditClick}>
            Editar Perfil
          </button>
        </div>
          )}
    </div>
  )
}

export default EditorClases
