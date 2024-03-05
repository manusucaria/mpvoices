import React, { useState } from 'react'
import { createAlumno } from '../../api/api.js'

const AltaAlumno = ({ setShowAlumnoForm, profesores, confirmacionRegistro, newUserEmail, newUserPassword }) => {
  const [showConfirmation, setShowConfirmation] = useState(false)
  const [warningMessage, setWarningMessage] = useState('')
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
    console.log(alumnoData)
    const requiredFields = ['Nombre', 'Apellido', 'Fecha', 'Dia', 'Instrumento', 'Profesor', 'Saldo', 'Duracion', 'Horario', 'Tel']
    const incompleteFields = requiredFields.filter(field => !alumnoData[field])

    if (incompleteFields.length > 0) {
      setWarningMessage('*Faltan completar datos')
      return
    }
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

  const instrumentos = [
    'Violin', 'Viola', 'Cello', 'Contrabajo', 'Bajo', 'Piano', 'Guitarra',
    'Batería', 'Ukelele', 'Canto', 'Iniciación Musical', 'Ensamble Vocal', 'Ensamble',
    'Dúo de Canto', 'Trío de Canto', 'Cuarteto de Canto', 'Bandoneón', 'Saxo',
    'Trompeta', 'Composición', 'Producción', 'Profesorado de Canto', 'Arpa'
  ]

  instrumentos.sort()

  const generateHorarios = () => {
    const horarios = []
    let hora = 12
    let minutos = 0

    while (hora < 21 || (hora === 21 && minutos === 0)) {
      const horaString = hora.toString().padStart(2, '0')
      const minutosString = minutos.toString().padStart(2, '0')
      horarios.push(`${horaString}:${minutosString}`)

      minutos += 15
      if (minutos === 60) {
        minutos = 0
        hora += 1
      }
    }

    return horarios
  }

  const duraciones = [30, 45, 60, 75, 90]

  return (
    <div className='flex flex-col mx-auto w-full'>
      <div className="mx-auto flex justify-center w-full md:w-4/6 lg:w-3/6 my-8">
        <div className="flex my-auto pt-1">
          <svg className='my-auto md:hover:cursor-pointer stroke-[#E9500E] md:hover:stroke-[#DB9B6D]' onClick={cancelarClick} width="34" height="32" viewBox="0 0 34 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g id="iconamoon:arrow-up-2-light">
            <path id="Vector" d="M19.8333 9.22572L12.75 15.8155L19.8333 22.4053" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </g>
          </svg>
        </div>
        <div className='my-auto flex ml-4'>
          <h3 className="text-[#FFFFFF] my-auto text-xl sm:text-2xl">Nuevos usuarios</h3>
          <p className='text-[#FFFFFF] my-auto mx-2'>|</p>
          <p className='text-[#E9500E] my-auto lg:mt-1 text-xl sm:text-2xl'>Alta alumno</p>
        </div>
      </div>
      <form className='flex flex-col mx-auto w-full md:w-4/6 lg:w-3/6 bg-[#0D0D0D] px-4 sm:px-8 py-8' onSubmit={handleSubmit}>
        <div className='flex border-b-[0.5px] sm:border-b-1 border-b-[#FFFFFF] pb-8 mb-8'>
          <h4 className='text-[#FFFFFF] my-auto text-lg sm:text-xl'>Alta alumno</h4>
          <p className='text-[#FFFFFF] my-auto mx-4'>|</p>
          <p className='text-[#E9500E] my-auto text-lg sm:text-xl'>Completar datos</p>
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
          <label className='font-bold mr-auto w-2/6 text-[#FFFFFF]'>Fecha de nac.:</label>
          <input placeholder="Fecha de nac." className='text-[#0D0D0D] rounded-3xl h-8 pl-2 w-4/6 ml-auto' type="text" name="Fecha" value={alumnoData.Fecha} onChange={handleChange} />
        </div>
        <div className='flex mb-6'>
          <label className='font-bold mr-auto w-2/6 text-[#FFFFFF]'>Día:</label>
          <select
            className='text-[#0D0D0D] rounded-3xl h-8 pl-2 w-4/6 ml-auto'
            name="Dia"
            value={alumnoData.Dia}
            onChange={handleChange}
          >
            <option value="">Seleccione un día</option>
            <option value="lunes">lunes</option>
            <option value="martes">martes</option>
            <option value="miércoles">miércoles</option>
            <option value="jueves">jueves</option>
            <option value="viernes">viernes</option>
          </select>
        </div>
        <div className='flex mb-6'>
          <label className='font-bold mr-auto w-2/6 text-[#FFFFFF]'>Instr.:</label>
          <select
            className='text-[#0D0D0D] rounded-3xl h-8 pl-2 w-4/6 ml-auto'
            name="Instrumento"
            value={alumnoData.Instrumento}
            onChange={handleChange}
          >
            <option value="">Seleccione un instrumento</option>
            {instrumentos.map((instrumento, index) => (
              <option key={index} value={instrumento}>
                {instrumento}
              </option>
            ))}
          </select>
        </div>
        <div className='flex mb-6'>
          <label className='font-bold mr-auto w-2/6 text-[#FFFFFF]'>Profesor:</label>
          <select
            className='text-[#0D0D0D] rounded-3xl h-8 pl-2 w-4/6 ml-auto'
            name="Profesor"
            value={alumnoData.Profesor}
            onChange={handleChange}
          >
            <option value="">Seleccione un profesor</option>
            {profesores.map((profesor, index) => (
              <option key={index} value={profesor.Nombre}>
                {profesor.Nombre}
              </option>
            ))}
          </select>
        </div>
        <div className='flex mb-6'>
          <label className='font-bold mr-auto w-2/6 text-[#FFFFFF]'>Saldo:</label>
          <input placeholder="Saldo" className='text-[#0D0D0D] rounded-3xl h-8 pl-2 w-4/6 ml-auto' type="text" name="Saldo" value={alumnoData.Saldo} onChange={handleChange} />
        </div>
        <div className='flex mb-6'>
          <label className='font-bold mr-auto w-2/6 text-[#FFFFFF]'>Duración:</label>
          <select
            className='text-[#0D0D0D] rounded-3xl h-8 pl-2 w-4/6 ml-auto'
            name="Duracion"
            value={alumnoData.Duracion}
            onChange={handleChange}
          >
            <option value="">Seleccione una duración</option>
            {duraciones.map((duracion, index) => (
              <option key={index} value={duracion}>{duracion} minutos</option>
            ))}
          </select>
        </div>
        <div className='flex mb-6'>
          <label className='font-bold mr-auto w-2/6 text-[#FFFFFF]'>Horario:</label>
          <select
            className='text-[#0D0D0D] rounded-3xl h-8 pl-2 w-4/6 ml-auto'
            name="Horario"
            value={alumnoData.Horario}
            onChange={handleChange}
          >
            <option value="">Seleccione un horario</option>
            {generateHorarios().map((horario, index) => (
              <option key={index} value={horario}>
                {horario}
              </option>
            ))}
          </select>
        </div>
        <div className='flex mb-6'>
          <label className='font-bold mr-auto w-2/6 text-[#FFFFFF]'>Teléfono:</label>
          <input placeholder="Teléfono" className='text-[#0D0D0D] rounded-3xl h-8 pl-2 w-4/6 ml-auto' type="text" name="Tel" value={alumnoData.Tel} onChange={handleChange} />
        </div>
        {warningMessage && (
          <div className="ml-auto text-sm text-[#FFFFFF]">{warningMessage}</div>
        )}
        <div className='flex w-full mx-auto my-8 gap-x-4'>
          <button className='rounded-3xl w-3/6 font-botones font-bold h-12 sm:h-10 bg-[#E9500E] text-[#FFFFFF] px-3 md:hover:bg-[#DB9B6D]' type='submit'>
            Guardar
          </button>
          <button
            className='rounded-3xl w-3/6 font-botones font-bold h-12 sm:h-10 ml-auto bg-[#FFFFFF] text-[#0D0D0D] md:hover:text-[#E9500E] border-2 border-[#E9500E] px-3'
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
            <p className="text-[#0D0D0D] font-bold text-xl mb-4">Los datos se guardaron correctamente</p>
            <button
              className="text-[#E9500E] md:hover:text-[#DB9B6D] font-bold ml-auto"
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
