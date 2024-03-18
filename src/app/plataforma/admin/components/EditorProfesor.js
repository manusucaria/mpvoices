import React, { useState, useEffect } from 'react'

import { instrumentos, diasSemana } from '@/app/api/data'
import { updateUsuarioProfesorById } from '@/lib/firebase/actions.admin'

const EditorDatosProfesor = ({
  profesor,
  setSelectedAlumno,
  setSelectedProfesor
}) => {
  const [nombre, setNombre] = useState('')
  const [apellido, setApellido] = useState('')
  const [birthdate, setBirthdate] = useState('')
  const [email, setEmail] = useState('')
  const [telefono, setTelefono] = useState('')
  const [diasSeleccionados, setDiasSeleccionados] = useState([])
  const [instrumento, setInstrumento] = useState('')
  const [editMode, setEditMode] = useState(false)
  const [originalValues, setOriginalValues] = useState(null)
  const [showConfirmation, setShowConfirmation] = useState(false)
  const [showDiasCheckbox, setShowDiasCheckbox] = useState(false)
  const [error, setError] = useState(null)
  const [sending, setSending] = useState(false)

  useEffect(() => {
    if (profesor) {
      setNombre(profesor.usuario.full_name.nombre || '')
      setApellido(profesor.usuario.full_name.apellido || '')
      setBirthdate(profesor.usuario.birthdate || '')
      setEmail(profesor.usuario.email || '')
      setTelefono(profesor.usuario.telefono || '')
      setDiasSeleccionados(
        profesor.dias ? profesor.dias.split(',').map((dia) => dia.trim()) : []
      )
      setInstrumento(profesor.instrumento || '')
      setOriginalValues({
        nombre: profesor.usuario.full_name.nombre || '',
        apellido: profesor.usuario.full_name.apellido || '',
        birthdate: profesor.usuario.birthdate || '',
        email: profesor.usuario.email || '',
        telefono: profesor.usuario.telefono || '',
        dia: profesor.dias || '',
        instrumento: profesor.instrumento || ''
      })
    }
  }, [profesor])

  const handleSubmit = async (event) => {
    event.preventDefault()
    setSending(true)
    try {
      const formattedInstrumento = instrumento
        .toLowerCase()
        .split('_')
        .map((word, index) =>
          index === 0 ? word.charAt(0).toUpperCase() + word.slice(1) : word
        )
        .join(' ')

      const updatedProfesorData = await updateUsuarioProfesorById(profesor.id, {
        nombre,
        apellido,
        birthdate,
        email,
        telefono,
        dias: diasSeleccionados.join(', '),
        instrumento: formattedInstrumento,
        usuario: profesor.usuario
      })
      setError(null)
      setSelectedProfesor(updatedProfesorData)
      setEditMode(false)
      setShowConfirmation(true)
    } catch (error) {
      setError(error)
      console.error('Error al actualizar los datos:', error)
    }
    setSending(false)
  }

  const handleEditClick = () => {
    setEditMode(true)
  }

  const cancelarClick = () => {
    setNombre(originalValues.nombre)
    setApellido(originalValues.apellido)
    setEmail(originalValues.email)
    setTelefono(originalValues.telefono)
    setDiasSeleccionados(originalValues.dia ? [originalValues.dia] : [])
    setInstrumento(originalValues.instrumento)
    setEditMode(false)
  }

  const volver = () => {
    setSelectedAlumno(false)
    setSelectedProfesor(false)
  }

  const handleCloseConfirmation = () => {
    setShowConfirmation(false)
  }

  const renderInstrumentoOptions = () => {
    return instrumentos.map((instrumento, index) => (
      <option key={index} value={instrumento.replace(/\s/g, '_')}>
        {instrumento}
      </option>
    ))
  }

  const formatInstrumento = (instrumento) => {
    if (!instrumento) return ''
    const instrumentoFormateado =
      instrumento.charAt(0).toUpperCase() +
      instrumento.slice(1).toLowerCase().replace(/_/g, ' ')
    return instrumentoFormateado.replace(/_/g, ' ')
  }

  const handleDiaSelection = (selectedDia) => {
    setDiasSeleccionados((prevDiasSeleccionados) => {
      if (prevDiasSeleccionados.includes(selectedDia)) {
        return prevDiasSeleccionados.filter((dia) => dia !== selectedDia)
      } else {
        return [...prevDiasSeleccionados, selectedDia]
      }
    })
  }

  return (
    <div className="w-full">
      {editMode
        ? (
        <div className="flex flex-col w-full bg-black">
          <div className="w-full flex justify-center mx-auto gap-x-4 sm:gap-x-6 pb-6 sm:pb-8 bg-[#212121] pt-4 lg:pt-6">
            <div className="my-auto ml-auto pt-[0.5px] xl:pt-1">
              <svg
                className="hover:cursor-pointer stroke-white md:hover:stroke-navy-blue-light"
                onClick={() => volver()}
                width="34"
                height="32"
                viewBox="0 0 34 32"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g id="iconamoon:arrow-up-2-light">
                  <path
                    id="Vector"
                    d="M19.8333 9.22572L12.75 15.8155L19.8333 22.4053"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </g>
              </svg>
            </div>
            <h3 className="text-white my-auto text-xl sm:text-2xl">
              Profesor
            </h3>
            <p className="my-auto">|</p>
            <p className="text-navy-blue-light my-auto md:mt-1 text-xl sm:text-2xl mr-auto">
            {profesor?.usuario.full_name.nombre} {profesor?.usuario.full_name.apellido}
            </p>
          </div>
          <form
            className="px-4 sm:px-8 pt-8 w-full mx-auto bg-black"
            onSubmit={handleSubmit}
          >
            <div className="flex border-b-[0.5px] sm:border-b-1 border-b-white pb-8 mb-8">
              <h4 className="text-white my-auto text-xl sm:text-2xl">
                Datos
              </h4>
              <p className="text-white my-auto mx-4">|</p>
              <p className="text-navy-blue-light my-auto text-xl sm:text-2xl">
                Editar
              </p>
            </div>
            <div className="flex mb-6">
              <label className="text-base font-bold mr-auto w-2/6">
                Nombre:
              </label>
              <input
                className="text-black rounded-3xl h-8 pl-2 w-4/6 ml-auto"
                type="text"
                name="nombre"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
              />
            </div>
            <div className="flex mb-6">
              <label className="text-base font-bold mr-auto w-2/6">
                Apellido:
              </label>
              <input
                className="text-black rounded-3xl h-8 pl-2 w-4/6 ml-auto"
                type="text"
                name="apellido"
                value={apellido}
                onChange={(e) => setApellido(e.target.value)}
              />
            </div>
            <div className="flex mb-6">
              <label className="text-base font-bold mr-auto w-2/6">
                Fecha de nac.:
              </label>
              <input
                className="text-black rounded-3xl h-8 px-2 w-4/6 ml-auto"
                type="date"
                name="birthdate"
                value={birthdate}
                onChange={(e) => setBirthdate(e.target.value)}
              />
            </div>
            <div className="flex mb-6">
              <label className="text-base font-bold mr-auto w-2/6">
                E-Mail:
              </label>
              <input
                className="text-black rounded-3xl h-8 pl-2 w-4/6 ml-auto"
                type="text"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="flex mb-6">
              <label className="text-base font-bold mr-auto w-2/6">
                Teléfono:
              </label>
              <input
                className="text-black rounded-3xl h-8 pl-2 w-4/6 ml-auto"
                type="text"
                name="telefono"
                value={telefono}
                onChange={(e) => setTelefono(e.target.value)}
              />
            </div>
            <div className="flex mb-6">
              <label className="text-base font-bold mr-auto w-2/6">Días:</label>
              <input
                className="text-black rounded-3xl h-8 pl-2 w-4/6 ml-auto"
                type="text"
                onFocus={() => setShowDiasCheckbox(true)}
                value={diasSeleccionados
                  .sort((a, b) => {
                    const dias = [
                      'lunes',
                      'martes',
                      'miércoles',
                      'jueves',
                      'viernes'
                    ]
                    return dias.indexOf(a) - dias.indexOf(b)
                  })
                  .join(', ')}
                readOnly
              />
            </div>
            {showDiasCheckbox && (
              <div className="flex flex-col mb-6">
                <div className="w-4/6 ml-auto">
                  {diasSemana.map((dia) => (
                    <div key={dia} className="flex items-center">
                      <input
                        className="mr-2"
                        type="checkbox"
                        value={dia}
                        checked={diasSeleccionados.includes(dia)}
                        onChange={() => handleDiaSelection(dia)}
                      />
                      <label>{dia}</label>
                    </div>
                  ))}
                </div>
              </div>
            )}
            <div className="flex mt-6">
              <label className="font-bold mr-auto w-2/6">Instrumento:</label>
              <select
                className="text-black rounded-3xl h-8 pl-2 w-4/6 ml-auto appearance-none"
                value={instrumento}
                onChange={(e) => setInstrumento(e.target.value)}
              >
                <option
                  value={
                    instrumento.charAt(0).toUpperCase() +
                    instrumento.slice(1).toLowerCase().replace(/_/g, ' ')
                  }
                >
                  {instrumento}
                </option>
                {renderInstrumentoOptions()}
              </select>
            </div>
            {error && (
              <div className="flex mb-6">
                <p className="text-navy-blue-light my-auto text-sm">
                  {error.message}
                </p>
              </div>
            )}
            <div className="flex w-full mx-auto my-8 gap-x-4">
              <button
                className={`font-botones font-bold rounded-3xl w-3/6 bg-navy-blue text-white px-3 h-12 sm:h-10 md:hover:bg-navy-blue-light ${
                  sending && 'opacity-50'
                }`}
                type="submit"
                disabled={sending}
              >
                {sending
                  ? (
                  <div
                    role="status"
                    className="w-full flex items-center justify-center"
                  >
                    <svg
                      aria-hidden="true"
                      className="w-6 h-6 text-gray-200 animate-spin fill-navy-blue-light"
                      viewBox="0 0 100 101"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                        fill="currentColor"
                      />
                      <path
                        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                        fill="currentFill"
                      />
                    </svg>
                    <span className="sr-only">Loading...</span>
                  </div>
                    )
                  : (
                      'Guardar'
                    )}
              </button>
              <button
                className="font-botones font-bold rounded-3xl w-3/6 ml-auto bg-white text-black md:hover:text-navy-blue border-2 border-navy-blue px-3 h-12 sm:h-10"
                onClick={cancelarClick}
                type="button"
              >
                Cancelar
              </button>
            </div>
          </form>
        </div>
          )
        : (
        <div className="flex flex-col w-full mx-auto">
          <div className="w-full flex justify-center mx-auto gap-x-4 sm:gap-x-6 mb-6 sm:mb-8 pt-4 lg:pt-6">
            <div className="my-auto ml-auto pt-[0.5px] xl:pt-1">
              <svg
                className="hover:cursor-pointer stroke-white md:hover:stroke-navy-blue-light"
                onClick={() => volver()}
                width="34"
                height="32"
                viewBox="0 0 34 32"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g id="iconamoon:arrow-up-2-light">
                  <path
                    id="Vector"
                    d="M19.8333 9.22572L12.75 15.8155L19.8333 22.4053"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </g>
              </svg>
            </div>
            <h3 className="text-white my-auto text-xl sm:text-2xl">
              Profesor
            </h3>
            <p className="my-auto">|</p>
            <p className="text-navy-blue-light my-auto md:mt-1 text-xl sm:text-2xl mr-auto">
              {profesor?.usuario.full_name.nombre} {profesor?.usuario.full_name.apellido}
            </p>
          </div>
          <div className="bg-black px-4 sm:px-8 py-8 flex flex-col mx-auto w-full">
            <h4 className="text-white my-auto text-xl sm:text-2xl border-b-[0.5px] sm:border-b-1 border-b-white pb-8 mb-8">
              Datos
            </h4>
            <div className="mb-8 flex">
              <p className="mr-2 text-base font-bold">Nombre:</p>
              <p className="text-base">{nombre}</p>
            </div>
            <div className="mb-8 flex">
              <p className="mr-2 text-base font-bold">Apellido:</p>
              <p className="text-base">{apellido}</p>
            </div>
            <div className="mb-8 flex">
              <p className="mr-2 text-base font-bold">Fecha de nac.:</p>
              <p className="text-base">{birthdate}</p>
            </div>
            <div className="mb-8 flex">
              <p className="mr-2 text-base font-bold">E-Mail:</p>
              <p className="text-base">{email}</p>
            </div>
            <div className="mb-8 flex">
              <p className="mr-2 text-base font-bold">Teléfono:</p>
              <p className="text-base">{telefono}</p>
            </div>
            <div className="mb-8 flex">
              <p className="mr-2 text-base font-bold">Días:</p>
              <p className="text-base">
                {diasSeleccionados
                  .sort((a, b) => {
                    const dias = [
                      'lunes',
                      'martes',
                      'miércoles',
                      'jueves',
                      'viernes'
                    ]
                    return dias.indexOf(a) - dias.indexOf(b)
                  })
                  .join(', ')}
              </p>
            </div>
            <div className="mb-8 flex">
              <p className="mr-2 text-base font-bold">Instrumento:</p>
              <p className="text-base">{formatInstrumento(instrumento)}</p>
            </div>
          </div>
          <div className="bg-black flex flex-col mx-auto w-full">
            <button
              className="font-botones font-bold rounded-3xl w-4/6 sm:w-3/6 mx-auto h-12 sm:h-10 mb-8 bg-navy-blue md:hover:bg-navy-blue-light"
              onClick={handleEditClick}
            >
              Editar perfil
            </button>
          </div>
        </div>
          )}
      {showConfirmation && (
        <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray-800 bg-opacity-50 z-50">
          <div className="bg-white p-12 rounded-lg text-center flex flex-col">
            <p className="text-black text-xl mb-4 font-bold">
              Los cambios se guardaron correctamente.
            </p>
            <button
              className="text-orange-600 md:hover:text-orange-300 ml-auto font-bold"
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

export default EditorDatosProfesor
