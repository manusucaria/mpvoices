import React, { useState } from 'react'
import { createProfesor } from '../../api/api.js'

const AltaProfesor = ({ setShowProfesorForm, confirmacionRegistro }) => {
  const [profesorData, setProfesorData] = useState({
    Nombre: '',
    Apellido: '',
    Email: '',
    Contraseña: '',
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
      <h2 className="text-center text-xl sm:text-3xl mb-4 text-white">Datos nuevo profesor</h2>
      <form className='flex flex-col mx-auto w-4/6 mt-4' onSubmit={handleSubmit}>
        <div className='flex mb-6'>
          <label className='mr-auto w-2/6'>Nombre:</label>
          <input className='text-black rounded-3xl h-8 pl-2 w-4/6 ml-auto' type="text" name="Nombre" value={profesorData.Nombre} onChange={handleChange} />
        </div>
        <div className='flex mb-6'>
          <label className='mr-auto w-2/6'>Apellido:</label>
          <input className='text-black rounded-3xl h-8 pl-2 w-4/6 ml-auto' type="text" name="Apellido" value={profesorData.Apellido} onChange={handleChange} />
        </div>
        <div className='flex mb-6'>
          <label className='mr-auto w-2/6'>Email:</label>
          <input autoComplete="current-email" className='text-black rounded-3xl h-8 pl-2 w-4/6 ml-auto' type="email" name="Email" value={profesorData.Email} onChange={handleChange} />
        </div>
        <div className='flex mb-6'>
          <label className='mr-auto w-2/6'>Contraseña:</label>
          <input autoComplete="current-password" className='text-black rounded-3xl h-8 pl-2 w-4/6 ml-auto' type="text" name="Contraseña" value={profesorData.Contraseña} onChange={handleChange} />
        </div>
        <div className='flex mb-6'>
          <label className='mr-auto w-2/6'>Día:</label>
          <input className='text-black rounded-3xl h-8 pl-2 w-4/6 ml-auto' type="text" name="Dia" value={profesorData.Dia} onChange={handleChange} />
        </div>
        <div className='flex mb-6'>
          <label className='mr-auto w-2/6'>Instrumento:</label>
          <input className='text-black rounded-3xl h-8 pl-2 w-4/6 ml-auto' type="text" name="Instrumento" value={profesorData.Instrumento} onChange={handleChange} />
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
}

export default AltaProfesor
