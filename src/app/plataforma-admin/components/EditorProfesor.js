import React, { useState, useEffect } from 'react'
import { updateProfesor, fetchProfesor } from '../../api/api.js'
import { instrumentos, diasSemana } from '../../api/data.js'

const EditorDatosProfesor = ({ profesor, setSelectedAlumno, setSelectedProfesor }) => {
  const [nombre, setNombre] = useState('')
  const [apellido, setApellido] = useState('')
  const [email, setEmail] = useState('')
  const [diasSeleccionados, setDiasSeleccionados] = useState([])
  const [instrumento, setInstrumento] = useState('')
  const [editMode, setEditMode] = useState(false)
  const [originalValues, setOriginalValues] = useState(null)
  const [showConfirmation, setShowConfirmation] = useState(false)
  const [showDiasCheckbox, setShowDiasCheckbox] = useState(false)

  useEffect(() => {
    if (profesor) {
      setNombre(profesor.Nombre || '')
      setApellido(profesor.Apellido || '')
      setEmail(profesor.Email || '')
      setDiasSeleccionados(profesor.Dia ? profesor.Dia.split(',').map(dia => dia.trim()) : [])
      setInstrumento(profesor.Instrumento || '')
      setOriginalValues({
        nombre: profesor.Nombre || '',
        apellido: profesor.Apellido || '',
        email: profesor.Email || '',
        dia: profesor.Dia || '',
        instrumento: profesor.Instrumento || ''
      })
    }
  }, [profesor])

  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      const formattedInstrumento = instrumento
        .toLowerCase()
        .split('_')
        .map((word, index) => (index === 0 ? word.charAt(0).toUpperCase() + word.slice(1) : word))
        .join(' ')

      const updatedProfesor = {
        Nombre: nombre,
        Apellido: apellido,
        Email: email,
        Dia: diasSeleccionados.join(', '),
        Instrumento: formattedInstrumento
      }

      await updateProfesor(profesor.id, updatedProfesor)
      const updatedProfesorData = await fetchProfesor(profesor.id)
      setSelectedProfesor(updatedProfesorData)
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
    setNombre(originalValues.nombre)
    setApellido(originalValues.apellido)
    setEmail(originalValues.email)
    setDiasSeleccionados(originalValues.dia ? [originalValues.dia] : [])
    setInstrumento(originalValues.instrumento)
    setEditMode(false)
  }

  const volver = () => {
    setSelectedAlumno(false)
    setSelectedProfesor(false)
  }

  const handleCloseConfirmation = () => {
    setShowConfirmation(false)
  }

  const renderInstrumentoOptions = () => {
    return instrumentos.map((instrumento, index) => (
      <option key={index} value={instrumento.replace(/\s/g, '_')}>
        {instrumento}
      </option>
    ))
  }

  const formatInstrumento = (instrumento) => {
    if (!instrumento) return ''
    const instrumentoFormateado = instrumento.charAt(0).toUpperCase() + instrumento.slice(1).toLowerCase().replace(/_/g, ' ')
    return instrumentoFormateado.replace(/_/g, ' ')
  }

  const handleDiaSelection = (selectedDia) => {
    setDiasSeleccionados(prevDiasSeleccionados => {
      if (prevDiasSeleccionados.includes(selectedDia)) {
        return prevDiasSeleccionados.filter((dia) => dia !== selectedDia)
      } else {
        return [...prevDiasSeleccionados, selectedDia]
      }
    })
  }

  return (
    <div className='w-full'>
      {editMode
        ? (
        <div className='flex flex-col w-full bg-[#0D0D0D]'>
          <div className='w-full flex justify-center mx-auto gap-x-4 sm:gap-x-6 pb-6 sm:pb-8 bg-[#212121] pt-4 lg:pt-6'>
            <div className="my-auto ml-auto pt-[0.5px] xl:pt-1">
              <svg className='hover:cursor-pointer stroke-[#FFFFFF] md:hover:stroke-[#9B70BE]' onClick={() => volver()} width="34" height="32" viewBox="0 0 34 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g id="iconamoon:arrow-up-2-light">
                <path id="Vector" d="M19.8333 9.22572L12.75 15.8155L19.8333 22.4053" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </g>
              </svg>
            </div>
            <h3 className="text-[#FFFFFF] my-auto text-xl sm:text-2xl">Profesor</h3>
            <p className='my-auto'>|</p>
            <p className='text-[#9B70BE] my-auto md:mt-1 text-xl sm:text-2xl mr-auto'>{profesor.Nombre} {profesor.Apellido}</p>
          </div>
          <form className='px-4 sm:px-8 pt-8 w-full mx-auto bg-[#0D0D0D]' onSubmit={handleSubmit}>
            <div className='flex border-b-[0.5px] sm:border-b-1 border-b-[#FFFFFF] pb-8 mb-8'>
              <h4 className='text-[#FFFFFF] my-auto text-xl sm:text-2xl'>Datos</h4>
              <p className='text-[#FFFFFF] my-auto mx-4'>|</p>
              <p className='text-[#9B70BE] my-auto text-xl sm:text-2xl'>Editar</p>
            </div>
            <div className='flex mb-6'>
              <label className='text-base font-bold mr-auto w-2/6'>Nombre:</label>
              <input
                className='text-[#0D0D0D] rounded-3xl h-8 pl-2 w-4/6 ml-auto'
                type='text'
                name='nombre'
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
              />
            </div>
            <div className='flex mb-6'>
              <label className='text-base font-bold mr-auto w-2/6'>Apellido:</label>
              <input
                className='text-[#0D0D0D] rounded-3xl h-8 pl-2 w-4/6 ml-auto'
                type='text'
                name='apellido'
                value={apellido}
                onChange={(e) => setApellido(e.target.value)}
              />
            </div>
            <div className='flex mb-6'>
              <label className='text-base font-bold mr-auto w-2/6'>E-Mail:</label>
              <input
                className='text-[#0D0D0D] rounded-3xl h-8 pl-2 w-4/6 ml-auto'
                type='text'
                name='email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className='flex mb-6'>
              <label className='text-base font-bold mr-auto w-2/6'>Días:</label>
              <input
                className='text-[#0D0D0D] rounded-3xl h-8 pl-2 w-4/6 ml-auto'
                type='text'
                onFocus={() => setShowDiasCheckbox(true)}
                value={diasSeleccionados
                  .sort((a, b) => {
                    const dias = ['lunes', 'martes', 'miércoles', 'jueves', 'viernes']
                    return dias.indexOf(a) - dias.indexOf(b)
                  })
                  .join(', ')
                }
                readOnly
              />
            </div>
            {showDiasCheckbox && (
              <div className="flex flex-col mb-6">
                <div className='w-4/6 ml-auto'>
                  {diasSemana.map((dia) => (
                    <div key={dia} className="flex items-center">
                      <input
                        className='mr-2'
                        type="checkbox"
                        value={dia}
                        checked={diasSeleccionados.includes(dia)}
                        onChange={() => handleDiaSelection(dia)}
                      />
                      <label>{dia}</label>
                    </div>
                  ))}
                </div>
              </div>
            )}
            <div className='flex mb-6'>
              <label className='font-bold mr-auto w-2/6'>Instrumento:</label>
              <select
                className='text-[#0D0D0D] rounded-3xl pl-2 h-8 w-4/6 ml-auto appearance-none'
                value={instrumento}
                onChange={(e) => setInstrumento(e.target.value)}
              >
                <option value={instrumento.charAt(0).toUpperCase() + instrumento.slice(1).toLowerCase().replace(/_/g, ' ')}>{instrumento}</option>
                {renderInstrumentoOptions()}
              </select>
            </div>
            <div className='flex w-full mx-auto my-8 gap-x-4'>
              <button className='font-botones font-bold rounded-3xl w-3/6 bg-[#663481] text-[#FFFFFF] px-3 h-12 sm:h-10 md:hover:bg-[#9B70BE]' type='submit'>
                Guardar
              </button>
              <button
                className='font-botones font-bold rounded-3xl w-3/6 ml-auto bg-[#FFFFFF] text-[#0D0D0D] md:hover:text-[#663481] border-2 border-[#663481] px-3 h-12 sm:h-10'
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
        <div className='flex flex-col w-full mx-auto'>
          <div className='w-full flex justify-center mx-auto gap-x-4 sm:gap-x-6 mb-6 sm:mb-8 pt-4 lg:pt-6'>
            <div className="my-auto ml-auto pt-[0.5px] xl:pt-1">
              <svg className='hover:cursor-pointer stroke-[#FFFFFF] md:hover:stroke-[#BDA0D4]' onClick={() => volver()} width="34" height="32" viewBox="0 0 34 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g id="iconamoon:arrow-up-2-light">
                <path id="Vector" d="M19.8333 9.22572L12.75 15.8155L19.8333 22.4053" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </g>
              </svg>
            </div>
            <h3 className="text-[#FFFFFF] my-auto text-xl sm:text-2xl">Profesor</h3>
            <p className='my-auto'>|</p>
            <p className='text-[#9B70BE] my-auto md:mt-1 text-xl sm:text-2xl mr-auto'>{profesor.Nombre} {profesor.Apellido}</p>
          </div>
          <div className='bg-[#0D0D0D] px-4 sm:px-8 py-8 flex flex-col mx-auto w-full'>
            <h4 className='text-[#FFFFFF] my-auto text-xl sm:text-2xl border-b-[0.5px] sm:border-b-1 border-b-[#FFFFFF] pb-8 mb-8'>Datos</h4>
            <div className='mb-8 flex'>
              <p className='mr-2 text-base font-bold'>Nombre:</p>
              <p className='text-base'>{nombre}</p>
            </div>
            <div className='mb-8 flex'>
              <p className='mr-2 text-base font-bold'>Apellido:</p>
              <p className='text-base'>{apellido}</p>
            </div>
            <div className='mb-8 flex'>
              <p className='mr-2 text-base font-bold'>E-Mail:</p>
              <p className='text-base'>{email}</p>
            </div>
            <div className='mb-8 flex'>
              <p className='mr-2 text-base font-bold'>Días:</p>
              <p className='text-base'>{diasSeleccionados.sort((a, b) => {
                const dias = ['lunes', 'martes', 'miércoles', 'jueves', 'viernes']
                return dias.indexOf(a) - dias.indexOf(b)
              })
                .join(', ')}</p>
            </div>
            <div className='mb-8 flex'>
              <p className='mr-2 text-base font-bold'>Instrumento:</p>
              <p className='text-base'>{formatInstrumento(instrumento)}</p>
            </div>
          </div>
          <div className='bg-[#0D0D0D] flex flex-col mx-auto w-full'>
            <button className='font-botones font-bold rounded-3xl w-4/6 sm:w-3/6 mx-auto h-12 sm:h-10 mb-8 bg-[#663481] md:hover:bg-[#9B70BE]' onClick={handleEditClick}>
                Editar perfil
            </button>
          </div>
        </div>
          )}
        {showConfirmation && (
          <div className="fixed top-0 left-0 w-full h-full flex justify-center px-3 items-center z-50">
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

export default EditorDatosProfesor
