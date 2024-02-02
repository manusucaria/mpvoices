import React, { useState } from 'react'
import { createAlumno } from '../../api/api.js'

const AltaAlumno = ({ setShowAlumnoForm, confirmacionRegistro }) => {
  const [alumnoData, setAlumnoData] = useState({
    Nombre: '',
    Apellido: '',
    Fecha: '',
    Dia: '',
    Instrumento: '',
    Profesor: '',
    Saldo: '',
    Email: '',
    Contraseña: '',
    Duracion: '',
    Rol: '',
    Horario: '',
    Tel: ''
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setAlumnoData({ ...alumnoData, [name]: value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    createAlumno(alumnoData)
      .then(() => {
        confirmacionRegistro() // Llamar a la función después de que se crea el profesor
      })
      .catch((error) => {
        console.error('Error al crear el profesor:', error)
      })
  }

  const cancelarClick = () => {
    setShowAlumnoForm()
  }

  return (
    <div className='flex flex-col mx-auto w-full'>
      <h2 className="text-center text-xl sm:text-3xl mb-4 text-white">Datos nuevo alumno</h2>
      <form className='flex flex-col mx-auto w-4/6 mt-4' onSubmit={handleSubmit}>
        <div className='flex mb-6'>
          <label className='mr-auto w-2/6'>Nombre:</label>
          <input placeholder="Nombre" className='text-black rounded-3xl h-8 pl-2 w-4/6 ml-auto' type="text" name="Nombre" value={alumnoData.Nombre} onChange={handleChange} />
        </div>
        <div className='flex mb-6'>
          <label className='mr-auto w-2/6'>Apellido:</label>
          <input placeholder="Apellido" className='text-black rounded-3xl h-8 pl-2 w-4/6 ml-auto' type="text" name="Apellido" value={alumnoData.Apellido} onChange={handleChange} />
        </div>
        <div className='flex mb-6'>
          <label className='mr-auto w-2/6'>Fecha de Nacimiento:</label>
          <input placeholder="Fecha de Nacimiento" className='text-black rounded-3xl h-8 pl-2 w-4/6 ml-auto' type="text" name="Fecha" value={alumnoData.Fecha} onChange={handleChange} />
        </div>
        <div className='flex mb-6'>
          <label className='mr-auto w-2/6'>Día:</label>
          <input placeholder="Día" className='text-black rounded-3xl h-8 pl-2 w-4/6 ml-auto' type="text" name="Dia" value={alumnoData.Dia} onChange={handleChange} />
        </div>
        <div className='flex mb-6'>
          <label className='mr-auto w-2/6'>Instrumento:</label>
          <input placeholder="Instrumento" className='text-black rounded-3xl h-8 pl-2 w-4/6 ml-auto' type="text" name="Instrumento" value={alumnoData.Instrumento} onChange={handleChange} />
        </div>
        <div className='flex mb-6'>
          <label className='mr-auto w-2/6'>Profesor:</label>
          <input placeholder="Profesor" className='text-black rounded-3xl h-8 pl-2 w-4/6 ml-auto' type="text" name="Profesor" value={alumnoData.Profesor} onChange={handleChange} />
        </div>
        <div className='flex mb-6'>
          <label className='mr-auto w-2/6'>Saldo:</label>
          <input placeholder="Saldo" className='text-black rounded-3xl h-8 pl-2 w-4/6 ml-auto' type="text" name="Saldo" value={alumnoData.Saldo} onChange={handleChange} />
        </div>
        <div className='flex mb-6'>
          <label className='mr-auto w-2/6'>Email:</label>
          <input placeholder="Email"autoComplete="current-email" className='text-black rounded-3xl h-8 pl-2 w-4/6 ml-auto' type="email" name="Email" value={alumnoData.Email} onChange={handleChange} />
        </div>
        <div className='flex mb-6'>
          <label className='mr-auto w-2/6'>Contraseña:</label>
          <input placeholder="Contraseña" autoComplete="current-password" className='text-black rounded-3xl h-8 pl-2 w-4/6 ml-auto' type="text" name="Contraseña" value={alumnoData.Contraseña} onChange={handleChange} />
        </div>
        <div className='flex mb-6'>
          <label className='mr-auto w-2/6'>Duración de clase:</label>
          <input placeholder="Duración de clase" className='text-black rounded-3xl h-8 pl-2 w-4/6 ml-auto' type="text" name="Duracion" value={alumnoData.Duracion} onChange={handleChange} />
        </div>
        <div className='flex mb-6'>
          <label className='mr-auto w-2/6'>Horario:</label>
          <input placeholder="Horario" className='text-black rounded-3xl h-8 pl-2 w-4/6 ml-auto' type="text" name="Horario" value={alumnoData.Horario} onChange={handleChange} />
        </div>
        <div className='flex mb-6'>
          <label className='mr-auto w-2/6'>Teléfono:</label>
          <input placeholder="Teléfono" className='text-black rounded-3xl h-8 pl-2 w-4/6 ml-auto' type="text" name="Tel" value={alumnoData.Tel} onChange={handleChange} />
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

export default AltaAlumno
