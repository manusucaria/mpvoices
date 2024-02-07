import React, { useState } from 'react'
import { createProfesor } from '../../api/api.js'

const AltaProfesor = ({ setShowProfesorForm, confirmacionRegistro, newUserEmail, newUserPassword }) => {
  const [profesorData, setProfesorData] = useState({
    Nombre: '',
    Apellido: '',
    Email: newUserEmail,
    Contraseña: newUserPassword,
    Dia: '',
    Instrumento: ''
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setProfesorData({ ...profesorData, [name]: value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    createProfesor(profesorData)
      .then(() => {
        confirmacionRegistro()
      })
      .catch((error) => {
        console.error('Error al crear el profesor:', error)
      })
  }

  const cancelarClick = () => {
    setShowProfesorForm()
  }

  return (
    <div className='flex flex-col mx-auto w-full'>
      <h2 className="text-center text-xl sm:text-3xl mb-4 text-[#0D0D0D] mt-4">Datos nuevo profesor</h2>
      <form className='flex flex-col mx-auto mt-4 w-full px-4 md:w-3/6' onSubmit={handleSubmit}>
        <div className='flex mb-6'>
          <label className='font-bold mr-auto w-2/6 text-[#0D0D0D]'>Nombre:</label>
          <input placeholder="Nombre" className='text-[#0D0D0D] rounded-3xl h-8 pl-2 w-4/6 ml-auto' type="text" name="Nombre" value={profesorData.Nombre} onChange={handleChange} />
        </div>
        <div className='flex mb-6'>
          <label className='font-bold mr-auto w-2/6 text-[#0D0D0D]'>Apellido:</label>
          <input placeholder="Apellido" className='text-[#0D0D0D] rounded-3xl h-8 pl-2 w-4/6 ml-auto' type="text" name="Apellido" value={profesorData.Apellido} onChange={handleChange} />
        </div>
        <div className='flex mb-6'>
          <label className='font-bold mr-auto w-2/6 text-[#0D0D0D]'>Día:</label>
          <input placeholder="Día" className='text-[#0D0D0D] rounded-3xl h-8 pl-2 w-4/6 ml-auto' type="text" name="Dia" value={profesorData.Dia} onChange={handleChange} />
        </div>
        <div className='flex mb-6'>
          <label className='font-bold mr-auto w-2/6 text-[#0D0D0D]'>Instrumento/s:</label>
          <input placeholder="Intrumento/s" className='text-[#0D0D0D] rounded-3xl h-8 pl-2 w-4/6 ml-auto' type="text" name="Instrumento" value={profesorData.Instrumento} onChange={handleChange} />
        </div>
        <div className='flex w-full mx-auto my-8 gap-x-4'>
          <button className='rounded-3xl w-3/6 font-botones font-bold h-12 bg-[#663481] text-[#FFFFFF] px-3' type='submit'>
            Guardar
          </button>
          <button
            className='rounded-3xl w-3/6 font-botones font-bold h-12 ml-auto bg-[#008f39] text-[#FFFFFF] px-3'
            onClick={cancelarClick}
            type='button'
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  )
}

export default AltaProfesor
