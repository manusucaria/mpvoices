import React, { useState } from 'react'
import { createProfesor } from '../../api/api.js'

const AltaProfesor = ({ setShowProfesorForm, confirmacionRegistro, newUserEmail, newUserPassword }) => {
  const [showConfirmation, setShowConfirmation] = useState(false)
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
        setShowConfirmation(true)
      })
      .catch((error) => {
        console.error('Error al crear el profesor:', error)
      })
  }

  const cancelarClick = () => {
    setShowProfesorForm()
  }

  const handleCloseConfirmation = () => {
    setShowConfirmation(false)
    confirmacionRegistro()
  }

  return (
    <div className='flex flex-col mx-auto w-full'>
      <div className="mx-auto flex justify-center w-full md:w-4/6 lg:w-3/6 mt-4 mb-8">
        <div className="flex my-auto pt-1">
          <svg className='my-auto md:hover:cursor-pointer stroke-[#663481] md:hover:stroke-[#9B70BE]' onClick={cancelarClick} width="34" height="32" viewBox="0 0 34 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g id="iconamoon:arrow-up-2-light">
            <path id="Vector" d="M19.8333 9.22572L12.75 15.8155L19.8333 22.4053" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </g>
          </svg>
        </div>
        <div className='my-auto flex ml-4'>
          <h3 className="text-[#0D0D0D] my-auto text-xl sm:text-2xl">Nuevos usuarios</h3>
          <p className='text-[#0D0D0D] my-auto mx-2'>|</p>
          <p className='text-[#663481] my-auto mt-2 lg:mt-1 text-xl sm:text-2xl'>alta profesor</p>
        </div>
      </div>
      <form className='flex flex-col mx-auto w-full md:w-4/6 lg:w-3/6 bg-[#0D0D0D] p-8' onSubmit={handleSubmit}>
        <div className='flex border-b-[0.5px] sm:border-b-1 border-b-[#FFFFFF] pb-8 mb-8'>
          <h4 className='text-[#FFFFFF] my-auto text-xl sm:text-2xl'>Alta profesor</h4>
          <p className='text-[#FFFFFF] my-auto mx-4'>|</p>
          <p className='text-[#663481] my-auto text-xl sm:text-2xl'>completar datos</p>
        </div>
        <div className='flex mb-6'>
          <label className='font-bold mr-auto w-2/6 text-[#FFFFFF]'>Nombre:</label>
          <input placeholder="Nombre" className='text-[#0D0D0D] rounded-3xl h-8 pl-2 w-4/6 ml-auto' type="text" name="Nombre" value={profesorData.Nombre} onChange={handleChange} />
        </div>
        <div className='flex mb-6'>
          <label className='font-bold mr-auto w-2/6 text-[#FFFFFF]'>Apellido:</label>
          <input placeholder="Apellido" className='text-[#0D0D0D] rounded-3xl h-8 pl-2 w-4/6 ml-auto' type="text" name="Apellido" value={profesorData.Apellido} onChange={handleChange} />
        </div>
        <div className='flex mb-6'>
          <label className='font-bold mr-auto w-2/6 text-[#FFFFFF]'>Día:</label>
          <input placeholder="Día" className='text-[#0D0D0D] rounded-3xl h-8 pl-2 w-4/6 ml-auto' type="text" name="Dia" value={profesorData.Dia} onChange={handleChange} />
        </div>
        <div className='flex mb-6'>
          <label className='font-bold mr-auto w-2/6 text-[#FFFFFF]'>Instrumento/s:</label>
          <input placeholder="Intrumento/s" className='text-[#0D0D0D] rounded-3xl h-8 pl-2 w-4/6 ml-auto' type="text" name="Instrumento" value={profesorData.Instrumento} onChange={handleChange} />
        </div>
        <div className='flex w-full mx-auto my-8 gap-x-4'>
          <button className='rounded-3xl w-3/6 font-botones font-bold h-12 bg-[#663481] text-[#FFFFFF] px-3 md:hover:bg-[#9B70BE]' type='submit'>
            Guardar
          </button>
          <button
            className='rounded-3xl w-3/6 font-botones font-bold h-12 ml-auto bg-[#FFFFFF] text-[#0D0D0D] md:hover:text-[#663481] border-2 border-[#663481] px-3'
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
              className="text-[#663481] md:hover:text-[#663481] ml-auto"
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

export default AltaProfesor
