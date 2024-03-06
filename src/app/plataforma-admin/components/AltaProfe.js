import React, { useState } from 'react'
import { createProfesor } from '../../api/api.js'

const AltaProfesor = ({ setShowProfesorForm, confirmacionRegistro, newUserEmail, newUserPassword }) => {
  const [showConfirmation, setShowConfirmation] = useState(false)
  const [warningMessage, setWarningMessage] = useState('')
  const [showDaysOptions, setShowDaysOptions] = useState(false)
  const [selectedDays, setSelectedDays] = useState([])
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
    const requiredFields = ['Nombre', 'Apellido', 'Instrumento']

    if (selectedDays.length === 0) {
      setWarningMessage('*Seleccione al menos un día')
      return
    }

    const incompleteFields = requiredFields.filter(field => !profesorData[field])

    if (incompleteFields.length > 0) {
      setWarningMessage('*Faltan completar datos')
      return
    }

    const dataToSubmit = {
      ...profesorData,
      Dia: selectedDays.join(', ')
    }

    createProfesor(dataToSubmit)
      .then(() => {
        setShowConfirmation(true)
      })
      .catch((error) => {
        console.error('Error al crear el profesor:', error)
      })
  }

  const formatInstrumento = (instrumento) => {
    if (!instrumento) return ''

    const words = instrumento.split(' ')
    const formattedWords = words.map((word, index) => {
      if (index === 0) {
        return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
      } else {
        return word.toLowerCase()
      }
    })

    return formattedWords.join(' ')
  }

  const cancelarClick = () => {
    setShowProfesorForm()
  }

  const handleCloseConfirmation = () => {
    setShowConfirmation(false)
    confirmacionRegistro()
  }

  const handleDayClick = () => {
    setShowDaysOptions(!showDaysOptions)
  }

  const handleDayCheckboxChange = (e) => {
    const { name, checked } = e.target
    let updatedSelectedDays = [...selectedDays]

    if (checked) {
      updatedSelectedDays.push(name)
    } else {
      updatedSelectedDays = updatedSelectedDays.filter(day => day !== name)
    }
    updatedSelectedDays.sort((a, b) => {
      return diasSemana.indexOf(a) - diasSemana.indexOf(b)
    })

    setSelectedDays(updatedSelectedDays)
  }

  const diasSemana = ['lunes', 'martes', 'miércoles', 'jueves', 'viernes']

  const instrumentos = [
    'Violin', 'Viola', 'Cello', 'Contrabajo', 'Bajo', 'Piano', 'Guitarra',
    'Batería', 'Ukelele', 'Canto', 'Iniciación musical', 'Ensamble vocal', 'Ensamble',
    'Dúo de canto', 'Trío de canto', 'Cuarteto de canto', 'Bandoneón', 'Saxo',
    'Trompeta', 'Composición', 'Producción', 'Profesorado de canto', 'Arpa'
  ]

  instrumentos.sort()

  return (
    <div className='flex flex-col mx-auto w-full'>
      <div className="mx-auto flex justify-center w-full md:w-4/6 lg:w-3/6 my-8">
        <div className="flex my-auto pt-1">
          <svg className='my-auto md:hover:cursor-pointer stroke-[#663481] md:hover:stroke-[#9B70BE]' onClick={cancelarClick} width="34" height="32" viewBox="0 0 34 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g id="iconamoon:arrow-up-2-light">
            <path id="Vector" d="M19.8333 9.22572L12.75 15.8155L19.8333 22.4053" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </g>
          </svg>
        </div>
        <div className='my-auto flex ml-4'>
          <h3 className="text-[#FFFFFF] my-auto text-xl sm:text-2xl">Nuevos usuarios</h3>
          <p className='text-[#FFFFFF] my-auto mx-2'>|</p>
          <p className='text-[#9B70BE] my-auto lg:mt-1 text-xl sm:text-2xl'>Alta profesor</p>
        </div>
      </div>
      <form className='flex flex-col mx-auto w-full md:w-4/6 lg:w-3/6 bg-[#0D0D0D] px-4 sm:px-8 py-8' onSubmit={handleSubmit}>
        <div className='flex border-b-[0.5px] sm:border-b-1 border-b-[#FFFFFF] pb-8 mb-8'>
          <h4 className='text-[#FFFFFF] my-auto text-lg sm:text-xl'>Alta profesor</h4>
          <p className='text-[#FFFFFF] my-auto mx-4'>|</p>
          <p className='text-[#9B70BE] my-auto text-lg sm:text-xl'>Completar datos</p>
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
          <div className="relative w-4/6 ml-auto">
          <input
            className='text-[#0D0D0D] rounded-3xl h-8 pl-2 w-full'
            type="text"
            name="Dia"
            placeholder="Seleccione un día"
            value={selectedDays.join(', ')}
            onClick={handleDayClick}
            readOnly
          />
          </div>
        </div>
        {showDaysOptions && (
          <div className="flex flex-col mb-6">
            <div className='w-4/6 ml-auto'>
              {diasSemana.map((dia, index) => (
                <div key={index} className="flex items-center">
                  <input
                    type="checkbox"
                    name={dia}
                    checked={selectedDays.includes(dia)}
                    onChange={handleDayCheckboxChange}
                    className="mr-2"
                  />
                  <label>{dia}</label>
                </div>
              ))}
            </div>
          </div>
        )}
        <div className='flex mb-6'>
          <label className='font-bold mr-auto w-2/6 text-[#FFFFFF]'>Instr.:</label>
          <select
            className='text-[#0D0D0D] rounded-3xl h-8 pl-2 w-4/6 ml-auto'
            name="Instrumento"
            value={formatInstrumento(profesorData.Instrumento)} // Aquí se utiliza la función
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
        {warningMessage && (
          <div className="ml-auto text-sm text-[#FFFFFF]">{warningMessage}</div>
        )}
        <div className='flex w-full mx-auto my-8 gap-x-4'>
          <button className='rounded-3xl w-3/6 font-botones font-bold h-12 sm:h-10 bg-[#663481] text-[#FFFFFF] px-3 md:hover:bg-[#9B70BE]' type='submit'>
            Guardar
          </button>
          <button
            className='rounded-3xl w-3/6 font-botones font-bold h-12 sm:h-10 ml-auto bg-[#FFFFFF] text-[#0D0D0D] md:hover:text-[#663481] border-2 border-[#663481] px-3'
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
              className="text-[#E9500E] font-bold md:hover:text-[#DB9B6D] ml-auto"
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
