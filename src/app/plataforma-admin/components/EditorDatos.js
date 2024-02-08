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
              <label className='font-bold mr-auto w-2/6'>Fecha de nacimiento:</label>
              <input
                className='text-[#0D0D0D] rounded-3xl h-8 pl-2 w-4/6 ml-auto'
                type='text'
                name='fecha'
                value={fecha}
                onChange={(e) => setFecha(e.target.value)}
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
              <label className='font-bold mr-auto w-2/6'>Teléfono:</label>
              <input
                className='text-[#0D0D0D] rounded-3xl h-8 pl-2 w-4/6 ml-auto'
                type='text'
                name='tel'
                value={tel}
                onChange={(e) => setTel(e.target.value)}
              />
            </div>
            <div className='flex w-full mx-auto mt-8 gap-x-4'>
            <button className='font-botones font-bold rounded-3xl w-3/6 bg-[#E9500E] text-[#FFFFFF] px-3 h-10' type='submit'>
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
            <p className='mr-2 text-base font-bold'>Nombre:</p>
            <p className='text-base'>{nombre}</p>
          </div>
          <div className='mb-8 flex'>
            <p className='mr-2 text-base font-bold'>Apellido:</p>
            <p className='text-base'>{apellido}</p>
          </div>
          <div className='mb-8 flex'>
            <p className='mr-2 text-base font-bold'>Fecha de nacimiento:</p>
            <p className='text-base'>{fecha}</p>
          </div>
          <div className='mb-8 flex'>
            <p className='mr-2 text-base font-bold'>Email:</p>
            <p className='text-base'>{email}</p>
          </div>
          <div className='flex'>
            <p className='mr-2 text-base font-bold'>Teléfono:</p>
            <p className='text-base'>{tel}</p>
          </div>
          <button className='rounded-3xl font-botones font-bold w-4/6 mx-auto h-10 mt-8 bg-[#E9500E]' onClick={handleEditClick}>
            Editar Perfil
          </button>
        </div>
          )}
    </div>
  )
}

export default EditorDatos
