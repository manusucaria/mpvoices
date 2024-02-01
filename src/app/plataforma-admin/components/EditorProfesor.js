import React, { useState, useEffect } from 'react'
import { updateProfesor } from '../../api/api.js'

const EditorDatosProfesor = ({ profesor }) => {
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
          <form className='w-4/6 mx-auto mt-4' onSubmit={handleSubmit}>
            <div className='flex mb-6'>
              <label className='mr-auto w-2/6'>Nombre:</label>
              <input
                className='text-black rounded-3xl h-8 pl-2 w-4/6 ml-auto'
                type='text'
                name='nombre'
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
              />
            </div>
            <div className='flex mb-6'>
              <label className='mr-auto w-2/6'>Apellido:</label>
              <input
                className='text-black rounded-3xl h-8 pl-2 w-4/6 ml-auto'
                type='text'
                name='apellido'
                value={apellido}
                onChange={(e) => setApellido(e.target.value)}
              />
            </div>
            <div className='flex mb-6'>
              <label className='mr-auto w-2/6'>Email:</label>
              <input
                className='text-black rounded-3xl h-8 pl-2 w-4/6 ml-auto'
                type='text'
                name='email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
              <label className='mr-auto w-2/6'>Instrumento:</label>
              <input
                className='text-black rounded-3xl h-8 pl-2 w-4/6 ml-auto'
                type='text'
                name='instrumento'
                value={instrumento}
                onChange={(e) => setInstrumento(e.target.value)}
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
          <p className='mb-8'>Nombre: {nombre}</p>
          <p className='mb-8'>Apellido: {apellido}</p>
          <p className='mb-8'>Email: {email}</p>
          <p className='mb-8'>Día: {dia}</p>
          <p>Instrumento: {instrumento}</p>
          <button className='rounded-3xl h-8 mt-8 mb-8 bg-orange-600' onClick={handleEditClick}>
            Editar Perfil
          </button>
        </div>
          )}
    </div>
  )
}

export default EditorDatosProfesor
