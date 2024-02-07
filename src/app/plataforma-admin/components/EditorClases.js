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
          <form className='w-full mx-auto mt-4' onSubmit={handleSubmit}>
            <div className='flex mb-6'>
              <label className='font-bold mr-auto w-2/6'>Instrumento:</label>
              <input
                className='text-[#0D0D0D] rounded-3xl h-8 pl-2 w-4/6 ml-auto'
                type='text'
                name='instrumento'
                value={instrumento}
                onChange={(e) => setInstrumento(e.target.value)}
              />
            </div>
            <div className='flex mb-6'>
              <label className='font-bold mr-auto w-2/6'>Día:</label>
              <input
                className='text-[#0D0D0D] rounded-3xl h-8 pl-2 w-4/6 ml-auto'
                type='text'
                name='dia'
                value={dia}
                onChange={(e) => setDia(e.target.value)}
              />
            </div>
            <div className='flex mb-6'>
              <label className='font-bold mr-auto w-2/6'>Horario:</label>
              <input
                className='text-[#0D0D0D] rounded-3xl h-8 pl-2 w-4/6 ml-auto'
                type='text'
                name='horario'
                value={horario}
                onChange={(e) => setHorario(e.target.value)}
              />
            </div>
            <div className='flex mb-6'>
              <label className='font-bold mr-auto w-2/6'>Duración:</label>
              <input
                className='text-[#0D0D0D] rounded-3xl h-8 pl-2 w-4/6 ml-auto'
                type='text'
                name='duracion'
                value={duracion}
                onChange={(e) => setDuracion(e.target.value)}
              />
            </div>
            <div className='flex mb-6'>
              <label className='font-bold mr-auto w-2/6'>Profesor:</label>
              <input
                className='text-[#0D0D0D] rounded-3xl h-8 pl-2 w-4/6 ml-auto'
                type='text'
                name='profesor'
                value={profesor}
                onChange={(e) => setProfesor(e.target.value)}
              />
            </div>
            <div className='flex w-full mx-auto mt-8 gap-x-4'>
              <button className='font-botones font-bold rounded-3xl w-3/6 bg-[#E9500E] text-[#0D0D0D] px-3 h-10' type='submit'>
                Guardar
              </button>
              <button
                className='font-botones font-bold rounded-3xl w-3/6 ml-auto bg-[#008f39] text-[#FFFFFF] px-3 h-10'
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
            <p className='mr-2 text-base font-bold'>Instrumento:</p>
            <p className='text-base'>{instrumento}</p>
          </div>
          <div className='mb-8 flex'>
            <p className='mr-2 text-base font-bold'>Día:</p>
            <p className='text-base'>{dia}</p>
          </div>
          <div className='mb-8 flex'>
            <p className='mr-2 text-base font-bold'>Horario:</p>
            <p className='text-base'>{horario}</p>
          </div>
          <div className='mb-8 flex'>
            <p className='mr-2 text-base font-bold'>Duración:</p>
            <p className='text-base'>{duracion}</p>
          </div>
          <div className='flex'>
            <p className='mr-2 text-base font-bold'>Profesor:</p>
            <p className='text-base'>{profesor}</p>
          </div>
          <button className='font-botones font-bold rounded-3xl w-4/6 mx-auto h-10 mt-8 bg-[#E9500E]' onClick={handleEditClick}>
            Editar Perfil
          </button>
        </div>
          )}
    </div>
  )
}

export default EditorClases
