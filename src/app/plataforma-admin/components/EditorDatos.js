import React, { useState, useEffect } from 'react'
import { updateAlumno, fetchAlumno } from '../../api/api.js'

const EditorDatos = ({ alumno, setSelectedAlumno }) => {
  const [nombre, setNombre] = useState('')
  const [apellido, setApellido] = useState('')
  const [fecha, setFecha] = useState('')
  const [email, setEmail] = useState('')
  const [tel, setTel] = useState('')
  const [originalData, setOriginalData] = useState(null)
  const [editMode, setEditMode] = useState(false)
  const [showConfirmation, setShowConfirmation] = useState(false)

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
    try {
      const updatedAlumno = {
        Nombre: nombre,
        Apellido: apellido,
        Fecha: fecha,
        Email: email,
        Tel: tel
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
      setNombre(originalData.Nombre)
      setApellido(originalData.Apellido)
      setFecha(originalData.Fecha)
      setEmail(originalData.Email)
      setTel(originalData.Tel)
    }
    setEditMode(false)
  }

  const handleCloseConfirmation = () => {
    setShowConfirmation(false)
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    const utcDate = new Date(date.toUTCString())
    const day = utcDate.getUTCDate().toString().padStart(2, '0')
    const month = (utcDate.getUTCMonth() + 1).toString().padStart(2, '0')
    const year = utcDate.getUTCFullYear()
    return `${day}-${month}-${year}`
  }

  return (
    <div className='w-full'>
      {editMode
        ? (
        <div className='flex flex-col w-full bg-[#0D0D0D] px-4 sm:px-8 pb-8 pt-4'>
          <form className='w-full mx-auto' onSubmit={handleSubmit}>
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
              <label className='font-bold mr-auto w-2/6'>Fecha de nac.:</label>
              <input
                className='text-[#0D0D0D] rounded-3xl h-8 px-2 w-4/6 ml-auto'
                type='date'
                name='fecha'
                value={fecha}
                onChange={(e) => setFecha(e.target.value)}
              />
            </div>
            <div className='flex mb-6'>
              <label className='font-bold mr-auto w-2/6'>E-Mail:</label>
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
            <button className='font-botones font-bold rounded-3xl w-3/6 bg-[#A33100] text-[#FFFFFF] px-3 h-12 sm:h-10 md:hover:bg-[#F57B48]' type='submit'>
                Guardar
              </button>
              <button
                className='font-botones font-bold rounded-3xl w-3/6 ml-auto bg-[#FFFFFF] text-[#0D0D0D] md:hover:text-[#A33100] border-2 border-[#A33100] px-3 h-12 sm:h-10'
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
              <p className='mr-2 text-base font-bold'>Nombre:</p>
              <p className='text-base'>{nombre}</p>
            </div>
            <div className='mb-8 flex'>
              <p className='mr-2 text-base font-bold'>Apellido:</p>
              <p className='text-base'>{apellido}</p>
            </div>
            <div className='mb-8 flex'>
              <p className='mr-2 text-base font-bold'>Fecha de nac.:</p>
              <p className='text-base'>{formatDate(fecha)}</p>
            </div>
            <div className='mb-8 flex'>
              <p className='mr-2 text-base font-bold'>E-Mail:</p>
              <p className='text-base'>{email}</p>
            </div>
            <div className='flex'>
              <p className='mr-2 text-base font-bold'>Teléfono:</p>
              <p className='text-base'>{tel}</p>
            </div>
          </div>
          <div className='bg-[#0D0D0D] flex flex-col mx-auto w-full'>
            <button className='font-botones font-bold rounded-3xl w-4/6 sm:w-3/6 mx-auto h-12 sm:h-10 mb-8 bg-[#A33100] md:hover:bg-[#F57B48]' onClick={handleEditClick}>
                Editar datos
            </button>
          </div>
        </div>
          )}
        {showConfirmation && (
          <div className="fixed top-0 left-0 w-full h-full flex justify-center px-3 items-center z-50">
            <div className="bg-[#FFFFFF] p-12 rounded-lg text-center flex flex-col">
              <p className="text-[#0D0D0D] text-xl mb-4 font-bold">Los cambios se guardaron correctamente.</p>
              <button
                className="text-[#A33100] md:hover:text-[#F57B48] ml-auto font-bold"
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

export default EditorDatos
