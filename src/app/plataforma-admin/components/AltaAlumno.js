import React, { useState } from 'react'
import { createAlumno } from '../../api/api.js'

const AltaAlumno = ({ setShowAlumnoForm, confirmacionRegistro, newUserEmail, newUserPassword }) => {
  const [showConfirmation, setShowConfirmation] = useState(false)
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
        setShowConfirmation(true)
      })
      .catch((error) => {
        console.error('Error al crear el profesor:', error)
      })
  }

  const cancelarClick = () => {
    setShowAlumnoForm()
  }

  const handleCloseConfirmation = () => {
    setShowConfirmation(false)
    confirmacionRegistro()
  }

  return (
    <div className='flex flex-col mx-auto w-full'>
      <div className="mx-auto flex justify-center w-full md:w-4/6 lg:w-3/6 mt-4 mb-8">
        <div className="flex my-auto pt-1">
          <svg className='my-auto md:hover:cursor-pointer stroke-[#E9500E] md:hover:stroke-[#DB9B6D]' onClick={cancelarClick} width="34" height="32" viewBox="0 0 34 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g id="iconamoon:arrow-up-2-light">
            <path id="Vector" d="M19.8333 9.22572L12.75 15.8155L19.8333 22.4053" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </g>
          </svg>
        </div>
        <div className='my-auto flex ml-4'>
          <h3 className="text-[#0D0D0D] my-auto text-xl sm:text-2xl">Nuevos usuarios</h3>
          <p className='text-[#0D0D0D] my-auto mx-2'>|</p>
          <p className='text-[#E9500E] my-auto mt-2 lg:mt-1 text-xl sm:text-2xl'>alta alumno</p>
        </div>
      </div>
      <form className='flex flex-col mx-auto w-full md:w-4/6 lg:w-3/6 bg-[#0D0D0D] p-8' onSubmit={handleSubmit}>
        <div className='flex border-b-[0.5px] sm:border-b-1 border-b-[#FFFFFF] pb-8 mb-8'>
          <h4 className='text-[#FFFFFF] my-auto text-lg sm:text-xl'>Alta alumno</h4>
          <p className='text-[#FFFFFF] my-auto mx-4'>|</p>
          <p className='text-[#E9500E] my-auto text-lg sm:text-xl'>completar datos</p>
        </div>
        <div className='flex mb-6'>
          <label className='font-bold mr-auto w-2/6 text-[#FFFFFF]'>Nombre:</label>
          <input placeholder="Nombre" className='text-[#0D0D0D] rounded-3xl h-8 pl-2 w-4/6 ml-auto' type="text" name="Nombre" value={alumnoData.Nombre} onChange={handleChange} />
        </div>
        <div className='flex mb-6'>
          <label className='font-bold mr-auto w-2/6 text-[#FFFFFF]'>Apellido:</label>
          <input placeholder="Apellido" className='text-[#0D0D0D] rounded-3xl h-8 pl-2 w-4/6 ml-auto' type="text" name="Apellido" value={alumnoData.Apellido} onChange={handleChange} />
        </div>
        <div className='flex mb-6'>
          <label className='font-bold mr-auto w-2/6 text-[#FFFFFF]'>Fecha de Nacimiento:</label>
          <input placeholder="Fecha de Nacimiento" className='text-[#0D0D0D] rounded-3xl h-8 pl-2 w-4/6 ml-auto' type="text" name="Fecha" value={alumnoData.Fecha} onChange={handleChange} />
        </div>
        <div className='flex mb-6'>
          <label className='font-bold mr-auto w-2/6 text-[#FFFFFF]'>Día:</label>
          <input placeholder="Día" className='text-[#0D0D0D] rounded-3xl h-8 pl-2 w-4/6 ml-auto' type="text" name="Dia" value={alumnoData.Dia} onChange={handleChange} />
        </div>
        <div className='flex mb-6'>
          <label className='font-bold mr-auto w-2/6 text-[#FFFFFF]'>Instrumento:</label>
          <input placeholder="Instrumento" className='text-[#0D0D0D] rounded-3xl h-8 pl-2 w-4/6 ml-auto' type="text" name="Instrumento" value={alumnoData.Instrumento} onChange={handleChange} />
        </div>
        <div className='flex mb-6'>
          <label className='font-bold mr-auto w-2/6 text-[#FFFFFF]'>Profesor:</label>
          <input placeholder="Profesor" className='text-[#0D0D0D] rounded-3xl h-8 pl-2 w-4/6 ml-auto' type="text" name="Profesor" value={alumnoData.Profesor} onChange={handleChange} />
        </div>
        <div className='flex mb-6'>
          <label className='font-bold mr-auto w-2/6 text-[#FFFFFF]'>Saldo:</label>
          <input placeholder="Saldo" className='text-[#0D0D0D] rounded-3xl h-8 pl-2 w-4/6 ml-auto' type="text" name="Saldo" value={alumnoData.Saldo} onChange={handleChange} />
        </div>
        <div className='flex mb-6'>
          <label className='font-bold mr-auto w-2/6 text-[#FFFFFF]'>Duración de clase:</label>
          <input placeholder="Duración de clase" className='text-[#0D0D0D] rounded-3xl h-8 pl-2 w-4/6 ml-auto' type="text" name="Duracion" value={alumnoData.Duracion} onChange={handleChange} />
        </div>
        <div className='flex mb-6'>
          <label className='font-bold mr-auto w-2/6 text-[#FFFFFF]'>Horario:</label>
          <input placeholder="Horario" className='text-[#0D0D0D] rounded-3xl h-8 pl-2 w-4/6 ml-auto' type="text" name="Horario" value={alumnoData.Horario} onChange={handleChange} />
        </div>
        <div className='flex mb-6'>
          <label className='font-bold mr-auto w-2/6 text-[#FFFFFF]'>Teléfono:</label>
          <input placeholder="Teléfono" className='text-[#0D0D0D] rounded-3xl h-8 pl-2 w-4/6 ml-auto' type="text" name="Tel" value={alumnoData.Tel} onChange={handleChange} />
        </div>
        <div className='flex w-full mx-auto my-8 gap-x-4'>
          <button className='rounded-3xl w-3/6 font-botones font-bold h-12 bg-[#E9500E] text-[#FFFFFF] px-3 md:hover:bg-[#DB9B6D]' type='submit'>
            Guardar
          </button>
          <button
            className='rounded-3xl w-3/6 font-botones font-bold h-12 ml-auto bg-[#FFFFFF] text-[#0D0D0D] md:hover:text-[#E9500E] border-2 border-[#E9500E] px-3'
            onClick={cancelarClick}
            type='button'
          >
            Cancelar
          </button>
        </div>
      </form>
      {showConfirmation && (
        <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray-800 bg-opacity-50 z-50">
          <div className="bg-[#FFFFFF] p-12 rounded-lg text-center flex flex-col">
            <p className="text-[#0D0D0D] text-xl mb-4">Los datos se guardaron correctamente</p>
            <button
              className="text-[#E9500E] md:hover:text-[#DB9B6D] ml-auto"
              onClick={handleCloseConfirmation}
            >
              Ir a la página principal
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default AltaAlumno
