import React, { useState, useEffect } from 'react'
import { updateAlumno, fetchAlumno } from '../../api/api.js'

const EditorClases = ({ alumno, setSelectedAlumno, profesores }) => {
  const [instrumento, setInstrumento] = useState('')
  const [dia, setDia] = useState('')
  const [horario, setHorario] = useState('')
  const [duracion, setDuracion] = useState('')
  const [profesor, setProfesor] = useState('')
  const [originalData, setOriginalData] = useState(null)
  const [editMode, setEditMode] = useState(false)
  const [showConfirmation, setShowConfirmation] = useState(false)

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
    try {
      const updatedAlumno = {
        Instrumento: instrumento,
        Dia: dia,
        Horario: horario,
        Duracion: duracion,
        Profesor: profesor
      }
      await updateAlumno(alumno.id, updatedAlumno)
      const updatedAlumnoData = await fetchAlumno(alumno.id)
      setSelectedAlumno(updatedAlumnoData)
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
    if (originalData) {
      setInstrumento(originalData.Instrumento)
      setDia(originalData.Dia)
      setHorario(originalData.Horario)
      setDuracion(originalData.Duracion)
      setProfesor(originalData.Profesor)
    }
    setEditMode(false)
  }

  const handleCloseConfirmation = () => {
    setShowConfirmation(false)
  }

  const generateHorarios = () => {
    const horarios = []
    let hora = 12
    let minutos = 0

    while (!(hora === 20 && minutos === 30)) {
      const horaStr = hora.toString().padStart(2, '0')
      const minStr = minutos.toString().padStart(2, '0')
      horarios.push(`${horaStr}:${minStr}`)
      minutos += 15
      if (minutos === 60) {
        minutos = 0
        hora += 1
      }
    }

    return horarios
  }

  const duracionOptions = [30, 45, 60, 75, 90]

  const renderDuracionOptions = () => {
    return duracionOptions.map((duracionOption, index) => (
    <option key={index} value={duracionOption}>
      {duracionOption} minutos
    </option>
    ))
  }

  const instrumentos = [
    'Violin', 'Viola', 'Cello', 'Contrabajo', 'Bajo', 'Piano', 'Guitarra',
    'Batería', 'Ukelele', 'Canto', 'Iniciación Musical', 'Ensamble Vocal', 'Ensamble',
    'Dúo de Canto', 'Trío de Canto', 'Cuarteto de Canto', 'Bandoneón', 'Saxo',
    'Trompeta', 'Composición', 'Producción', 'Profesorado de Canto', 'Arpa'
  ]

  instrumentos.sort()

  const renderInstrumentoOptions = () => {
    return instrumentos.map((instrumento, index) => (
      <option key={index} value={instrumento.toLowerCase().replace(/\s/g, '_')}>
        {instrumento}
      </option>
    ))
  }

  const formatInstrumento = (instrumento) => {
    if (!instrumento) return ''
    const instrumentoFormateado = instrumento.charAt(0).toUpperCase() + instrumento.slice(1)
    return instrumentoFormateado.replace(/_/g, ' ')
  }

  return (
    <div className='w-full'>
      {editMode
        ? (
        <div className='flex flex-col w-full bg-[#0D0D0D] px-4 sm:px-8 pb-8 pt-4'>
          <form className='w-full mx-auto' onSubmit={handleSubmit}>
            <div className='flex mb-6'>
              <label className='font-bold mr-auto w-2/6'>Instrumento:</label>
              <select
                className='text-[#0D0D0D] rounded-3xl h-8 pl-2 w-4/6 ml-auto'
                value={instrumento}
                onChange={(e) => setInstrumento(e.target.value)}
              >
                {renderInstrumentoOptions()}
              </select>
            </div>
            <div className='flex mb-6'>
              <label className='font-bold mr-auto w-2/6'>Días:</label>
              <select
                className='text-[#0D0D0D] rounded-3xl h-8 pl-2 w-4/6 ml-auto'
                value={dia}
                onChange={(e) => setDia(e.target.value)}
              >
                <option value="lunes">lunes</option>
                <option value="martes">martes</option>
                <option value="miércoles">miércoles</option>
                <option value="jueves">jueves</option>
                <option value="viernes">viernes</option>
              </select>
            </div>
            <div className='flex mb-6'>
              <label className='font-bold mr-auto w-2/6'>Horario:</label>
              <select
                className='text-[#0D0D0D] rounded-3xl h-8 pl-2 w-4/6 ml-auto'
                value={horario}
                onChange={(e) => setHorario(e.target.value)}
              >
                {generateHorarios().map((hora, index) => (
                  <option key={index} value={hora}>
                    {hora}
                  </option>
                ))}
              </select>
            </div>
            <div className='flex mb-6'>
              <label className='font-bold mr-auto w-2/6'>Duración:</label>
              <select
                className='text-[#0D0D0D] rounded-3xl h-8 pl-2 w-4/6 ml-auto'
                value={duracion}
                onChange={(e) => setDuracion(e.target.value)}
              >
                {renderDuracionOptions()}
              </select>
            </div>
            <div className='flex mb-6'>
              <label className='font-bold mr-auto w-2/6'>Profesor:</label>
              <select
                className='text-[#0D0D0D] rounded-3xl h-8 pl-2 w-4/6 ml-auto'
                value={profesor}
                onChange={(e) => setProfesor(e.target.value)}
              >
              {profesores
                .sort((a, b) => a.Nombre.localeCompare(b.Nombre))
                .map((profesor, index) => (
                  <option key={index} value={profesor.Nombre}>
                    {profesor.Nombre}
                  </option>
                ))
              }
              </select>
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
              <p className='mr-2 text-base font-bold'>Instrumento:</p>
              <p className='text-base'>{formatInstrumento(instrumento)}</p>
            </div>
            <div className='mb-8 flex'>
              <p className='mr-2 text-base font-bold'>Días:</p>
              <p className='text-base'>{dia.toLowerCase()}</p>
            </div>
            <div className='mb-8 flex'>
              <p className='mr-2 text-base font-bold'>Horario:</p>
              <p className='text-base'>{horario}hs</p>
            </div>
            <div className='mb-8 flex'>
              <p className='mr-2 text-base font-bold'>Duración:</p>
              <p className='text-base'>{duracion} min</p>
            </div>
            <div className='flex'>
              <p className='mr-2 text-base font-bold'>Profesor:</p>
              <p className='text-base'>{profesor}</p>
            </div>
          </div>
          <div className='bg-[#0D0D0D] flex flex-col mx-auto w-full'>
            <button className='font-botones font-bold rounded-3xl w-4/6 sm:w-3/6 mx-auto h-12 sm:h-10 mb-8 bg-[#E9500E] md:hover:bg-[#DB9B6D]' onClick={handleEditClick}>
                Editar clases
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

export default EditorClases
