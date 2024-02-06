import React, { useState, useEffect } from 'react'
import { updateAlumno } from '../../api/api.js'

const EditorDatos = ({ alumno }) => {
  const [nombre, setNombre] = useState('')
  const [apellido, setApellido] = useState('')
  const [fecha, setFecha] = useState('')
  const [email, setEmail] = useState('')
  const [tel, setTel] = useState('')
  const [originalData, setOriginalData] = useState(null)
  const [editMode, setEditMode] = useState(false)

  useEffect(() => {
    if (alumno) {
      setNombre(alumno.Nombre || '')
      setApellido(alumno.Apellido || '')
      setFecha(alumno.Fecha || '')
      setEmail(alumno.Email || '')
      setTel(alumno.Tel || '')

      setOriginalData({
        Nombre: alumno.Nombre || '',
        Apellido: alumno.Apellido || '',
        Fecha: alumno.Fecha || '',
        Email: alumno.Email || '',
        Tel: alumno.Tel || ''
      })
    }
  }, [alumno])

  const handleSubmit = async (event) => {
    event.preventDefault()
    const confirmation = window.confirm('¿Estás seguro de que deseas guardar los cambios?')
    if (confirmation) {
      try {
        const updatedAlumno = {
          Nombre: nombre,
          Apellido: apellido,
          Fecha: fecha,
          Email: email,
          Tel: tel
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
      setNombre(originalData.Nombre)
      setApellido(originalData.Apellido)
      setFecha(originalData.Fecha)
      setEmail(originalData.Email)
      setTel(originalData.Tel)
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
              <label className='mr-auto w-2/6'>Fecha de nacimiento:</label>
              <input
                className='text-black rounded-3xl h-8 pl-2 w-4/6 ml-auto'
                type='text'
                name='fecha'
                value={fecha}
                onChange={(e) => setFecha(e.target.value)}
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
              <label className='mr-auto w-2/6'>Teléfono:</label>
              <input
                className='text-black rounded-3xl h-8 pl-2 w-4/6 ml-auto'
                type='text'
                name='tel'
                value={tel}
                onChange={(e) => setTel(e.target.value)}
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
          <p className='mb-8'>Fecha de nacimiento: {fecha}</p>
          <p className='mb-8'>Email: {email}</p>
          <p>Teléfono: {tel}</p>
          <button className='rounded-3xl h-8 mt-8 bg-orange-600' onClick={handleEditClick}>
            Editar Perfil
          </button>
        </div>
          )}
    </div>
  )
}

export default EditorDatos
