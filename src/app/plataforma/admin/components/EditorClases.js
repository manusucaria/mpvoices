import React, { useState, useEffect } from 'react'

import {
  horarios,
  duracionOptions,
  instrumentos,
  diasSemana
} from '@/app/api/data'
import { getProfesorById } from '@/lib/firebase/crud/read'
import Loader from '@/app/components/loader/Loader'
import { updateClasesAlumno } from '@/lib/firebase/actions.admin'

const EditorClases = ({ alumno, setSelectedAlumno, profesores, setCambios }) => {
  const [instrumento, setInstrumento] = useState(
    alumno ? alumno.instrumento : ''
  )
  const [horaInicio, setHoraInicio] = useState(
    alumno ? alumno.clases.hora_inicio : ''
  )
  const [duracion, setDuracion] = useState(
    alumno ? alumno.clases.duracion : ''
  )
  const [dia, setDia] = useState('')
  const [profesor, setProfesor] = useState('')
  const [originalData, setOriginalData] = useState(null)
  const [editMode, setEditMode] = useState(false)
  const [showConfirmation, setShowConfirmation] = useState(false)
  const [loading, setLoading] = useState(true)
  const [sending, setSending] = useState(false)

  useEffect(() => {
    (async () => {
      setLoading(true)
      alumno.profesor = await getProfesorById(alumno.profesor.id, {
        getUsuario: true
      })
      setProfesor(alumno.profesor)
      setLoading(false)
    })()
  }, [])

  useEffect(() => {
    if (alumno && !loading) {
      setInstrumento(alumno.instrumento || '')
      setDia(alumno.clases.dia || '')
      setHoraInicio(alumno.clases.hora_inicio || '')
      setDuracion(alumno.clases.duracion || '')

      setOriginalData({
        instrumento: alumno.instrumento || '',
        dia: alumno.clases.dia || '',
        hora_inicio: alumno.clases.hora_inicio || '',
        duracion: alumno.clases.duracion || '',
        profesor: alumno.profesor || ''
      })
    }
  }, [alumno, loading])

  const handleProfesor = async (e) => {
    const profesor = profesores.find(
      (profesor) => profesor.id === e.target.value
    )
    setProfesor(profesor)
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setSending(true)
    try {
      const formattedInstrumento =
        instrumento.charAt(0).toUpperCase() +
        instrumento.slice(1).toLowerCase().replace(/_/g, ' ')

      const updatedClasesAlumnoData = await updateClasesAlumno(alumno.id, {
        dia,
        duracion,
        hora_inicio: horaInicio,
        instrumento: formattedInstrumento,
        profesor
      })
      setSelectedAlumno(updatedClasesAlumnoData)
      setCambios(true)
      setEditMode(false)
      setShowConfirmation(true)
    } catch (error) {
      console.error('Error al actualizar los datos:', error)
    }
    setSending(false)
  }

  const handleEditClick = () => {
    setEditMode(true)
  }

  const cancelarClick = () => {
    if (originalData) {
      setInstrumento(originalData.instrumento)
      setDia(originalData.dia)
      setHoraInicio(originalData.hora_inicio)
      setDuracion(originalData.duracion)
      setProfesor(originalData.profesor)
    }
    setEditMode(false)
  }

  const handleCloseConfirmation = () => {
    setShowConfirmation(false)
  }

  const renderInstrumentoOptions = () => {
    return instrumentos.map((instrumento, index) => {
      const formattedInstrumento =
        instrumento.charAt(0).toUpperCase() +
        instrumento.slice(1).toLowerCase().replace(/_/g, ' ')
      return (
        <option
          key={index}
          value={instrumento.toLowerCase().replace(/\s/g, '_')}
        >
          {formattedInstrumento}
        </option>
      )
    })
  }

  const formatInstrumento = (instrumento) => {
    if (!instrumento) return ''
    const instrumentoFormateado =
      instrumento.charAt(0).toUpperCase() + instrumento.slice(1)
    return instrumentoFormateado.replace(/_/g, ' ')
  }

  if (loading) return <Loader />

  return (
    <div className="w-full">
      {editMode
        ? (
        <div className="flex flex-col w-full bg-black px-4 sm:px-8 pb-8 pt-4">
          <form className="w-full mx-auto" onSubmit={handleSubmit}>
            <div className="flex mb-6">
              <label className="font-bold mr-auto w-2/6">Instrumento:</label>
              <select
                className="text-black rounded-3xl h-8 pl-2 w-4/6 ml-auto appearance-none"
                value={instrumento}
                onChange={(e) => setInstrumento(e.target.value)}
              >
                <option
                  className='text-black'
                  value={
                    instrumento.charAt(0).toUpperCase() +
                    instrumento.slice(1).toLowerCase().replace(/_/g, ' ')
                  }
                >
                  {instrumento}
                </option>
                {renderInstrumentoOptions()}
              </select>
            </div>
            <div className="flex mb-6">
              <label className="font-bold mr-auto w-2/6">Días:</label>
              <select
                className="text-black rounded-3xl h-8 pl-2 w-4/6 ml-auto appearance-none"
                value={dia}
                onChange={(e) => setDia(e.target.value)}
              >
                {diasSemana.map((dia, index) => (
                  <option className='text-black' value={dia} key={index}>
                    {dia}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex mb-6">
              <label className="font-bold mr-auto w-2/6">Horario:</label>
              <select
                className="text-black rounded-3xl h-8 pl-2 w-4/6 ml-auto appearance-none"
                value={horaInicio}
                onChange={(e) => setHoraInicio(e.target.value)}
              >
                {horarios.map((hora, index) => (
                  <option className='text-black' key={index} value={hora}>
                    {hora}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex mb-6">
              <label className="font-bold mr-auto w-2/6">Duración:</label>
              <select
                className="text-black rounded-3xl h-8 pl-2 w-4/6 ml-auto appearance-none"
                value={duracion}
                onChange={(e) => setDuracion(e.target.value)}
              >
                {duracionOptions.map((duracionOption, index) => (
                  <option className='text-black' key={index} value={duracionOption}>
                    {duracionOption} min
                  </option>
                ))}
              </select>
            </div>
            <div className="flex mb-6">
              <label className="font-bold mr-auto w-2/6">Profesor:</label>
              <select
                className="text-black rounded-3xl h-8 pl-2 w-4/6 ml-auto appearance-none"
                defaultValue={profesor.id}
                onChange={handleProfesor}
              >
                {profesores
                  .sort((a, b) =>
                    a.usuario.full_name.nombre.localeCompare(
                      b.usuario.full_name.nombre
                    )
                  )
                  .map((profesor, index) => (
                    <option className='text-black' key={index} value={profesor.id}>
                      {profesor.usuario.full_name.nombre}{' '}
                      {profesor.usuario.full_name.apellido}{' '}
                    </option>
                  ))}
              </select>
            </div>
            <div className="flex w-full mx-auto mt-8 gap-x-4">
              <button
                className={`font-botones font-bold rounded-3xl w-3/6 bg-orange-600 text-white px-3 h-12 sm:h-10 md:hover:bg-orange-300 ${
                  sending && 'opacity-50'
                }`}
                type="submit"
                disabled={sending}
              >
                {sending
                  ? (
                  <div
                    role="status"
                    className="w-full flex items-center justify-center"
                  >
                    <svg
                      aria-hidden="true"
                      className="w-6 h-6 text-gray-200 animate-spin fill-orange-600"
                      viewBox="0 0 100 101"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                        fill="currentColor"
                      />
                      <path
                        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                        fill="currentFill"
                      />
                    </svg>
                    <span className="sr-only">Loading...</span>
                  </div>
                    )
                  : (
                      'Guardar'
                    )}
              </button>
              <button
                className="font-botones font-bold rounded-3xl w-3/6 ml-auto bg-white text-black md:hover:text-orange-600 border-2 border-orange-600 px-3 h-12 sm:h-10"
                onClick={cancelarClick}
                type="button"
              >
                Cancelar
              </button>
            </div>
          </form>
        </div>
          )
        : (
        <div className="flex flex-col w-full mx-auto bg-black">
          <div className="px-4 sm:px-8 pb-8 w-full pt-4">
            <div className="mb-8 flex">
              <p className="mr-2 text-base font-bold">Instrumento:</p>
              <p className="text-base">{formatInstrumento(instrumento)}</p>
            </div>
            <div className="mb-8 flex">
              <p className="mr-2 text-base font-bold">Días:</p>
              <p className="text-base">{dia.toLowerCase()}</p>
            </div>
            <div className="mb-8 flex">
              <p className="mr-2 text-base font-bold">Horario:</p>
              <p className="text-base">{horaInicio}hs</p>
            </div>
            <div className="mb-8 flex">
              <p className="mr-2 text-base font-bold">Duración:</p>
              <p className="text-base">{duracion} min</p>
            </div>
            <div className="flex">
              <p className="mr-2 text-base font-bold">Profesor:</p>
              <p className="text-base">
                {profesor.usuario?.full_name.nombre}{' '}
                {profesor.usuario?.full_name.apellido}
              </p>
            </div>
          </div>
          <div className="bg-black flex flex-col mx-auto w-full">
            <button
              className="font-botones font-bold rounded-3xl w-4/6 sm:w-3/6 mx-auto h-12 sm:h-10 mb-8 bg-orange-600 md:hover:bg-orange-300"
              onClick={handleEditClick}
            >
              Editar clases
            </button>
          </div>
        </div>
          )}
      {showConfirmation && (
        <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray-800 bg-opacity-50 z-50">
          <div className="bg-white p-12 rounded-lg text-center flex flex-col">
            <p className="text-black text-xl mb-4 font-bold">
              Los cambios se guardaron correctamente.
            </p>
            <button
              className="text-orange-600 md:hover:text-orange-300 ml-auto font-bold"
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
