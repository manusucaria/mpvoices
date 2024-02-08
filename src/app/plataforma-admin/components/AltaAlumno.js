import React, { useState } from 'react'
import { createAlumno } from '../../api/api.js'

const AltaAlumno = ({ setShowAlumnoForm, confirmacionRegistro, newUserEmail, newUserPassword }) => {
  const [alumnoData, setAlumnoData] = useState({
    Nombre: '',
    Apellido: '',
    Fecha: '',
    Dia: '',
    Instrumento: '',
    Profesor: '',
    Saldo: '',
    Email: newUserEmail,
    Contraseña: newUserPassword,
    Duracion: '',
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
        confirmacionRegistro()
      })
      .catch((error) => {
        console.error('Error al crear el profesor:', error)
      })
  }

  const cancelarClick = () => {
    setShowAlumnoForm()
  }

  return (
    <div className='flex flex-col mx-auto w-full md:w-4/6 lg:w-3/6'>
      <h2 className="text-center text-xl sm:text-3xl mb-4 text-[#0D0D0D] mt-4">Datos nuevo alumno</h2>
      <form className='flex flex-col mx-auto mt-4 w-full px-4 md:w-3/6' onSubmit={handleSubmit}>
        <div className='flex mb-6'>
          <label className='font-bold mr-auto w-2/6 text-[#0D0D0D]'>Nombre:</label>
          <input placeholder="Nombre" className='text-[#0D0D0D] rounded-3xl h-8 pl-2 w-4/6 ml-auto' type="text" name="Nombre" value={alumnoData.Nombre} onChange={handleChange} />
        </div>
        <div className='flex mb-6'>
          <label className='font-bold mr-auto w-2/6 text-[#0D0D0D]'>Apellido:</label>
          <input placeholder="Apellido" className='text-[#0D0D0D] rounded-3xl h-8 pl-2 w-4/6 ml-auto' type="text" name="Apellido" value={alumnoData.Apellido} onChange={handleChange} />
        </div>
        <div className='flex mb-6'>
          <label className='font-bold mr-auto w-2/6 text-[#0D0D0D]'>Fecha de Nacimiento:</label>
          <input placeholder="Fecha de Nacimiento" className='text-[#0D0D0D] rounded-3xl h-8 pl-2 w-4/6 ml-auto' type="text" name="Fecha" value={alumnoData.Fecha} onChange={handleChange} />
        </div>
        <div className='flex mb-6'>
          <label className='font-bold mr-auto w-2/6 text-[#0D0D0D]'>Día:</label>
          <input placeholder="Día" className='text-[#0D0D0D] rounded-3xl h-8 pl-2 w-4/6 ml-auto' type="text" name="Dia" value={alumnoData.Dia} onChange={handleChange} />
        </div>
        <div className='flex mb-6'>
          <label className='font-bold mr-auto w-2/6 text-[#0D0D0D]'>Instrumento:</label>
          <input placeholder="Instrumento" className='text-[#0D0D0D] rounded-3xl h-8 pl-2 w-4/6 ml-auto' type="text" name="Instrumento" value={alumnoData.Instrumento} onChange={handleChange} />
        </div>
        <div className='flex mb-6'>
          <label className='font-bold mr-auto w-2/6 text-[#0D0D0D]'>Profesor:</label>
          <input placeholder="Profesor" className='text-[#0D0D0D] rounded-3xl h-8 pl-2 w-4/6 ml-auto' type="text" name="Profesor" value={alumnoData.Profesor} onChange={handleChange} />
        </div>
        <div className='flex mb-6'>
          <label className='font-bold mr-auto w-2/6 text-[#0D0D0D]'>Saldo:</label>
          <input placeholder="Saldo" className='text-[#0D0D0D] rounded-3xl h-8 pl-2 w-4/6 ml-auto' type="text" name="Saldo" value={alumnoData.Saldo} onChange={handleChange} />
        </div>
        <div className='flex mb-6'>
          <label className='font-bold mr-auto w-2/6 text-[#0D0D0D]'>Duración de clase:</label>
          <input placeholder="Duración de clase" className='text-[#0D0D0D] rounded-3xl h-8 pl-2 w-4/6 ml-auto' type="text" name="Duracion" value={alumnoData.Duracion} onChange={handleChange} />
        </div>
        <div className='flex mb-6'>
          <label className='font-bold mr-auto w-2/6 text-[#0D0D0D]'>Horario:</label>
          <input placeholder="Horario" className='text-[#0D0D0D] rounded-3xl h-8 pl-2 w-4/6 ml-auto' type="text" name="Horario" value={alumnoData.Horario} onChange={handleChange} />
        </div>
        <div className='flex mb-6'>
          <label className='font-bold mr-auto w-2/6 text-[#0D0D0D]'>Teléfono:</label>
          <input placeholder="Teléfono" className='text-[#0D0D0D] rounded-3xl h-8 pl-2 w-4/6 ml-auto' type="text" name="Tel" value={alumnoData.Tel} onChange={handleChange} />
        </div>
        <div className='flex w-full mx-auto my-8 gap-x-4'>
          <button className='rounded-3xl w-3/6 font-botones font-bold h-12 bg-[#E9500E] text-[#FFFFFF] px-3' type='submit'>
            Guardar
          </button>
          <button
            className='rounded-3xl w-3/6 font-botones font-bold h-12 ml-auto bg-[#FFFFFF] text-[#E9500E] md:text-[#0D0D0D] md:hover:text-[#E9500E] border-2 border-[#E9500E] px-3'
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

export default AltaAlumno
