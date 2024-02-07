import React, { useState, useEffect } from 'react'
import { updateProfesor } from '../../api/api.js'

const EditorDatosProfesor = ({ profesor, newCambio }) => {
  const [nombre, setNombre] = useState('')
  const [apellido, setApellido] = useState('')
  const [email, setEmail] = useState('')
  const [dia, setDia] = useState('')
  const [instrumento, setInstrumento] = useState('')
  const [editMode, setEditMode] = useState(false)
  const [originalValues, setOriginalValues] = useState(null)

  useEffect(() => {
    if (profesor) {
      setNombre(profesor.Nombre || '')
      setApellido(profesor.Apellido || '')
      setEmail(profesor.Email || '')
      setDia(profesor.Dia || '')
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
    const confirmation = window.confirm('¿Estás seguro de que deseas guardar los cambios?')
    if (confirmation) {
      try {
        const updatedProfesor = {
          Nombre: nombre,
          Apellido: apellido,
          Email: email,
          Dia: dia,
          Instrumento: instrumento
        }
        await updateProfesor(profesor.id, updatedProfesor)
        newCambio('Edicion')
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
    setNombre(originalValues.nombre)
    setApellido(originalValues.apellido)
    setEmail(originalValues.email)
    setDia(originalValues.dia)
    setInstrumento(originalValues.instrumento)
    setEditMode(false)
  }

  return (
    <div className='w-full'>
      {editMode
        ? (
        <div className='flex flex-col w-full'>
          <form className='w-full mx-auto mt-4' onSubmit={handleSubmit}>
            <div className='flex mb-6'>
              <label className='font-bold mr-auto w-2/6'>Nombre:</label>
              <input
                className='text-[#0D0D0D] rounded-3xl h-8 pl-2 w-4/6 ml-auto'
                type='text'
                name='nombre'
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
              />
            </div>
            <div className='flex mb-6'>
              <label className='font-bold mr-auto w-2/6'>Apellido:</label>
              <input
                className='text-[#0D0D0D] rounded-3xl h-8 pl-2 w-4/6 ml-auto'
                type='text'
                name='apellido'
                value={apellido}
                onChange={(e) => setApellido(e.target.value)}
              />
            </div>
            <div className='flex mb-6'>
              <label className='font-bold mr-auto w-2/6'>Email:</label>
              <input
                className='text-[#0D0D0D] rounded-3xl h-8 pl-2 w-4/6 ml-auto'
                type='text'
                name='email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
              <label className='font-bold mr-auto w-2/6'>Instrumento:</label>
              <input
                className='text-[#0D0D0D] rounded-3xl h-8 pl-2 w-4/6 ml-auto'
                type='text'
                name='instrumento'
                value={instrumento}
                onChange={(e) => setInstrumento(e.target.value)}
              />
            </div>
            <div className='flex w-full mx-auto mt-8 gap-x-4'>
            <button className='font-botones font-bold rounded-3xl w-3/6 bg-[#663481] text-[#FFFFFF] px-3 h-10' type='submit'>
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
            <p className='mr-2 text-base font-bold'>Nombre:</p>
            <p className='text-base'>{nombre}</p>
          </div>
          <div className='mb-8 flex'>
            <p className='mr-2 text-base font-bold'>Apellido:</p>
            <p className='text-base'>{apellido}</p>
          </div>
          <div className='mb-8 flex'>
            <p className='mr-2 text-base font-bold'>Email:</p>
            <p className='text-base'>{email}</p>
          </div>
          <div className='mb-8 flex'>
            <p className='mr-2 text-base font-bold'>Día:</p>
            <p className='text-base'>{dia}</p>
          </div>
          <div className='flex'>
            <p className='mr-2 text-base font-bold'>Instrumento:</p>
            <p className='text-base'>{instrumento}</p>
          </div>
          <button className='font-botones font-bold rounded-3xl w-4/6 mx-auto h-10 mt-8 bg-[#663481]' onClick={handleEditClick}>
            Editar Perfil
          </button>
        </div>
          )}
    </div>
  )
}

export default EditorDatosProfesor
