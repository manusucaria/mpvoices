import React, { useEffect, useState } from 'react'

import { signUp } from '@/lib/firebase/auth'
import { getRolByName } from '@/lib/firebase/crud/read'
import {
  diasSemana,
  duracionOptions,
  horarios,
  instrumentos
} from '@/app/api/data'

const AltaUsuarioAlumno = ({ handleCancelar, profesores, setShowAlumnoForm }) => {
  const [newUserEmail, setNewUserEmail] = useState('')
  const [newUserPassword, setNewUserPassword] = useState('')
  const [newUserPhoneNumber, setNewUserPhoneNumber] = useState('')
  const [newUserRol, setNewUserRol] = useState('')
  const [newUserNombre, setNewUserNombre] = useState('')
  const [newUserApellido, setNewUserApellido] = useState('')
  const [newUserBirthdate, setNewUserBirthdate] = useState('')
  const [newUserInstrumento, setNewUserInstrumento] = useState('')
  const [newUserProfesor, setNewUserProfesor] = useState('')
  const [newUserClaseDia, setNewUserClaseDia] = useState('')
  const [newUserClaseHoraInicio, setNewUserClaseHoraInicio] = useState('')
  const [newUserClaseDuracion, setNewUserClaseDuracion] = useState('')
  const [newUserPagosSaldo, setNewUserPagosSaldo] = useState('')
  const [newUserPagosAtualizacion, setNewUserPagosActualizacion] = useState('')
  const [errors, setErrors] = useState({})
  const [showConfirmation, setShowConfirmation] = useState(false)

  const [sendingData, setSendingData] = useState(false)

  useEffect(() => {
    (async () => {
      try {
        const rol = await getRolByName({ nombre: 'alumno' })
        setNewUserRol(rol)
      } catch (error) {
        console.error('Error al obtener el rol:', error)
      }
    })()
  }, [])

  const handleSubmit = async (event) => {
    event.preventDefault()
    setSendingData(true)

    setErrors({})

    const formErrors = {}

    if (!newUserEmail.trim()) {
      formErrors.email = 'El campo de email es obligatorio'
    }
    if (!newUserPassword) {
      formErrors.password = 'El campo de contraseña es obligatorio'
    }
    if (!newUserPhoneNumber.trim()) {
      formErrors.telefono = 'El campo de telefono es obligatorio'
    }
    if (!newUserNombre.trim()) {
      formErrors.nombre = 'El campo de nombre es obligatorio'
    }
    if (!newUserApellido.trim()) {
      formErrors.apellido = 'El campo de apellido es obligatorio'
    }
    if (!newUserBirthdate.trim()) {
      formErrors.birthdate = 'El campo fecha de nacimiento es obligatorio'
    }
    if (!newUserInstrumento.trim()) {
      formErrors.instrumento = 'El campo de instrumento es obligatorio'
    }
    if (!newUserProfesor.trim()) {
      formErrors.profesor = 'El campo de profesor es obligatorio'
    }
    if (!newUserClaseDia.trim()) {
      formErrors.clase_dia = 'El campo día es obligatorio'
    }
    if (!newUserClaseHoraInicio.trim()) {
      formErrors.clase_hora_inicio = 'El campo hora de inicio es obligatorio'
    }
    if (!newUserClaseDuracion.trim()) {
      formErrors.clase_duracion = 'El campo duración es obligatorio'
    }
    if (!newUserPagosSaldo.trim()) {
      formErrors.pagos_saldo = 'El campo saldo es obligatorio'
    }
    if (!newUserPagosAtualizacion.trim()) {
      formErrors.pagos_actualizacion = 'El campo actualización es obligatorio'
    }

    if (Object.keys(formErrors).length === 0) {
      try {
        await signUp({
          email: newUserEmail,
          password: newUserPassword,
          phoneNumber: newUserPhoneNumber,
          rolAsignado: newUserRol,
          nombre: newUserNombre,
          apellido: newUserApellido,
          birthdate: newUserBirthdate,
          instrumento: newUserInstrumento,
          profesor: newUserProfesor,
          clase_dia: newUserClaseDia,
          clase_hora_inicio: newUserClaseHoraInicio,
          clase_duracion: newUserClaseDuracion,
          pagos_saldo: newUserPagosSaldo,
          pagos_actualizacion: newUserPagosAtualizacion
        })
        setShowConfirmation(true)
        setNewUserEmail('')
        setNewUserPassword('')
        setNewUserPhoneNumber('')
        setNewUserNombre('')
        setNewUserApellido('')
        setNewUserBirthdate('')
        setNewUserInstrumento('')
        setNewUserProfesor('')
        setNewUserClaseDia('')
        setNewUserClaseHoraInicio('')
        setNewUserClaseDuracion('')
        setNewUserPagosSaldo('')
        setNewUserPagosActualizacion('')
      } catch (error) {
        if (error.code === 'auth/email-already-in-use') {
          formErrors.email = 'E-Mail no disponible'
        } else if (error.code === 'auth/weak-password') {
          formErrors.password = 'Contraseña débil'
        } else {
          console.error('Error al registrarse:', error)
        }
      }
    }
    setSendingData(false)
    setErrors(formErrors)
  }

  const handleCancel = () => {
    handleCancelar()
  }

  const handleCloseConfirmation = () => {
    setShowConfirmation(false)
    setShowAlumnoForm(false)
  }

  return (
    <div className="flex flex-col mx-auto w-full">
      <div className="mx-auto flex justify-center w-full md:w-4/6 lg:w-3/6 mb-8 mt-16">
        <div className="flex my-auto pt-1">
          <svg
            className="my-auto md:hover:cursor-pointer stroke-white md:hover:stroke-orange-300"
            onClick={handleCancel}
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
        <div className="my-auto flex ml-4">
          <h3 className="text-white my-auto text-xl sm:text-2xl">
            Nuevos usuarios
          </h3>
          <p className="text-white my-auto mx-2">|</p>
          <p className="text-orange-300 my-auto lg:mt-1 text-xl sm:text-2xl">
            Alta alumno
          </p>
        </div>
      </div>
      <form
        className="flex flex-col mx-auto w-full md:w-4/6 lg:w-3/6 bg-black px-4 sm:px-8 py-8"
        onSubmit={handleSubmit}
      >
        <div className="flex border-b-[0.5px] sm:border-b-1 border-b-white pb-8 mb-8">
          <h4 className="text-white my-auto text-lg sm:text-xl">
            Alta alumno
          </h4>
          <p className="text-white my-auto mx-4">|</p>
          <p className="text-orange-300 my-auto text-lg sm:text-xl">
            Crear cuenta
          </p>
        </div>
        <div className="flex">
          <label className="font-bold mr-auto w-2/6 text-white">
            Nombre:
          </label>
          <input
            placeholder="Nombre"
            className="text-black rounded-3xl h-8 pl-2 w-4/6 ml-auto"
            type="text"
            name="nombre"
            value={newUserNombre}
            onChange={(e) => setNewUserNombre(e.target.value)}
          />
        </div>
        {errors.nombre && (
          <p className="ml-auto pr-4 mt-1 text-white text-sm">
            {errors.nombre}
          </p>
        )}
        <div className="flex mt-6">
          <label className="font-bold mr-auto w-2/6 text-white">
            Apellido:
          </label>
          <input
            placeholder="Apellido"
            className="text-black rounded-3xl h-8 px-2 w-4/6 ml-auto"
            type="text"
            name="apellido"
            value={newUserApellido}
            onChange={(e) => setNewUserApellido(e.target.value)}
          />
        </div>
        {errors.apellido && (
          <p className="ml-auto pr-4 mt-1 text-white text-sm">
            {errors.apellido}
          </p>
        )}
        <div className="flex mt-6">
          <label
            className="font-bold mr-auto w-2/6 text-white"
            htmlFor="email"
          >
            E-Mail:
          </label>
          <input
            placeholder="E-Mail"
            className="text-black rounded-3xl h-8 pl-2 w-4/6 ml-auto"
            id="email"
            name="email"
            type="email"
            value={newUserEmail}
            onChange={(e) => setNewUserEmail(e.target.value)}
          />
        </div>
        {errors.email && (
          <p className="ml-auto pr-4 mt-1 text-white text-sm">
            {errors.email}
          </p>
        )}
        <div className="flex mt-6">
          <label
            className="font-bold mr-auto w-2/6 text-white"
            htmlFor="password"
          >
            Password:
          </label>
          <input
            placeholder="Contraseña"
            className="text-black rounded-3xl h-8 pl-2 w-4/6 ml-auto"
            id="password"
            name="password"
            type="text"
            value={newUserPassword}
            autoComplete="new-password"
            onChange={(e) => setNewUserPassword(e.target.value)}
          />
        </div>
        {errors.password && (
          <p className="ml-auto pr-4 mt-1 text-white text-sm">
            {errors.password}
          </p>
        )}
        <div className="flex mt-6">
          <label className="font-bold mr-auto w-2/6 text-white">
            Teléfono:
          </label>
          <input
            placeholder="Teléfono"
            className="text-black rounded-3xl h-8 pl-2 w-4/6 ml-auto"
            type="tel"
            name="phoneNumber"
            value={newUserPhoneNumber}
            onChange={(e) => setNewUserPhoneNumber(e.target.value)}
          />
        </div>
        {errors.telefono && (
          <p className="ml-auto pr-4 mt-1 text-white text-sm">
            {errors.telefono}
          </p>
        )}
        <div className="flex mt-6">
          <label className="font-bold mr-auto w-2/6 text-white">
            Fecha de nac.:
          </label>
          <input
            placeholder="Fecha de nac."
            className="text-black rounded-3xl h-8 px-2 w-4/6 ml-auto"
            type="date"
            name="birthdate"
            value={newUserBirthdate}
            onChange={(e) => setNewUserBirthdate(e.target.value)}
          />
        </div>
        {errors.birthdate && (
          <p className="ml-auto pr-4 mt-1 text-white text-sm">
            {errors.birthdate}
          </p>
        )}
        <div className="flex mt-6">
          <label className="font-bold mr-auto w-2/6 text-white">
            Instr.:
          </label>
          <select
            className="text-black rounded-3xl h-8 pl-2 w-4/6 ml-auto appearance-none"
            name="instrumento"
            value={newUserInstrumento}
            onChange={(e) => setNewUserInstrumento(e.target.value)}
          >
            <option value="">Seleccione un instrumento</option>
            {instrumentos.map((instrumento, index) => (
              <option key={index} value={instrumento}>
                {instrumento}
              </option>
            ))}
          </select>
        </div>
        {errors.instrumento && (
          <p className="ml-auto pr-4 mt-1 text-white text-sm">
            {errors.instrumento}
          </p>
        )}
        <div className="flex mt-6">
          <label className="font-bold mr-auto w-2/6 text-white">
            Profesor:
          </label>
          <select
            className="text-black rounded-3xl h-8 px-2 w-4/6 ml-auto appearance-none"
            name="profesorId"
            value={newUserProfesor}
            onChange={(e) => setNewUserProfesor(e.target.value)}
          >
            <option value="">Seleccione un profesor</option>
            {profesores.map((profesor, index) => (
              <option key={index} value={profesor.id}>
                {profesor.usuario.full_name.nombre}{' '}
                {profesor.usuario.full_name.apellido} / {profesor.instrumento} / {profesor.dias}
              </option>
            ))}
          </select>
        </div>
        {errors.profesor && (
          <p className="ml-auto pr-4 mt-1 text-white text-sm">
            {errors.profesor}
          </p>
        )}
        <div className="flex mt-6">
          <label className="font-bold mr-auto w-2/6 text-white">Día:</label>
          <select
            className="text-black rounded-3xl h-8 pl-2 w-4/6 ml-auto appearance-none"
            name="Dia"
            value={newUserClaseDia}
            onChange={(e) => setNewUserClaseDia(e.target.value)}
          >
            <option value="">Seleccione un día</option>
            {diasSemana.map((dia, index) => (
              <option key={index} value={dia}>
                {dia}
              </option>
            ))}
          </select>
        </div>
        {errors.clase_dia && (
          <p className="ml-auto pr-4 mt-1 text-white text-sm">
            {errors.clase_dia}
          </p>
        )}
        <div className="flex mt-6">
          <label className="font-bold mr-auto w-2/6 text-white">
            Horario:
          </label>
          <select
            className="text-black rounded-3xl h-8 pl-2 w-4/6 ml-auto appearance-none"
            name="Horario"
            value={newUserClaseHoraInicio}
            onChange={(e) => setNewUserClaseHoraInicio(e.target.value)}
          >
            <option value="">Seleccione un horario</option>
            {horarios.map((horario, index) => (
              <option key={index} value={horario}>
                {horario}
              </option>
            ))}
          </select>
        </div>
        {errors.clase_hora_inicio && (
          <p className="ml-auto pr-4 mt-1 text-white text-sm">
            {errors.clase_hora_inicio}
          </p>
        )}
        <div className="flex mt-6">
          <label className="font-bold mr-auto w-2/6 text-white">
            Duración:
          </label>
          <select
            className="text-black rounded-3xl h-8 pl-2 w-4/6 ml-auto appearance-none"
            name="Duracion"
            value={newUserClaseDuracion}
            onChange={(e) => setNewUserClaseDuracion(e.target.value)}
          >
            <option value="">Seleccione una duración</option>
            {duracionOptions.map((duracion, index) => (
              <option key={index} value={duracion}>
                {duracion} minutos
              </option>
            ))}
          </select>
        </div>
        {errors.clase_duracion && (
          <p className="ml-auto pr-4 mt-1 text-white text-sm">
            {errors.clase_duracion}
          </p>
        )}
        <div className="flex mt-6">
          <label className="font-bold mr-auto w-2/6 text-white">
            Saldo:
          </label>
          <input
            placeholder="Saldo"
            className="text-black rounded-3xl h-8 pl-2 w-4/6 ml-auto"
            type="number"
            name="pagos_saldo"
            value={newUserPagosSaldo}
            onChange={(e) => setNewUserPagosSaldo(e.target.value)}
          />
        </div>
        {errors.pagos_saldo && (
          <p className="ml-auto pr-4 mt-1 text-white text-sm">
            {errors.pagos_saldo}
          </p>
        )}
        <div className="flex mt-6">
          <label className="font-bold mr-auto w-2/6 text-white">
            Actualización:
          </label>
          <input
            placeholder="Actualización de pago"
            className="text-black rounded-3xl h-8 px-2 w-4/6 ml-auto"
            type="date"
            name="pagos_actualizacion"
            value={newUserPagosAtualizacion}
            onChange={(e) => setNewUserPagosActualizacion(e.target.value)}
          />
        </div>
        {errors.pagos_actualizacion && (
          <p className="ml-auto pr-4 mt-1 text-white text-sm">
            {errors.pagos_actualizacion}
          </p>
        )}
        <div className="flex w-full mx-auto gap-x-4 mt-8 mb-2">
          <button
            className="font-botones font-bold h-12 sm:h-10 w-3/6 mr-auto rounded-3xl bg-orange-600 text-white px-3 md:hover:bg-[#DB9B6D]"
            type="submit"
          >
            {sendingData
              ? (
              <div
                role="status"
                className="w-full flex items-center justify-center"
              >
                <svg
                  aria-hidden="true"
                  className="w-6 h-6 text-gray-200 animate-spin fill-orange-600"
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
                  'Crear cuenta'
                )}
          </button>
          <button
            className="font-botones font-bold h-12 sm:h-10 w-3/6 ml-auto rounded-3xl bg-white text-black md:hover:text-orange-600 border-2 border-orange-600 px-3"
            onClick={handleCancel}
          >
            Cancelar
          </button>
        </div>
      </form>
      {showConfirmation && (
        <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray-800 bg-opacity-50 z-50">
          <div className="bg-white p-12 rounded-lg text-center flex flex-col">
            <svg
              className="mx-auto"
              width="24"
              height="22"
              viewBox="0 0 24 22"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M7.20926 21.7946C7.77176 21.7946 8.19364 21.5234 8.87667 20.9207L12.322 17.8672H18.399C21.4224 17.8672 23.12 16.1395 23.12 13.1562V5.36157C23.12 2.37831 21.4224 0.650635 18.399 0.650635H5.59208C2.56864 0.650635 0.871094 2.37831 0.871094 5.36157V13.1562C0.871094 16.1395 2.60882 17.8672 5.52176 17.8672H5.93359V20.3482C5.93359 21.2422 6.40569 21.7946 7.20926 21.7946ZM7.70145 19.5848V16.7221C7.70145 16.1294 7.45033 15.8984 6.87779 15.8984H5.6423C3.74386 15.8984 2.83984 14.9442 2.83984 13.0959V5.42184C2.83984 3.57363 3.74386 2.61938 5.6423 2.61938H18.3387C20.2372 2.61938 21.1512 3.57363 21.1512 5.42184V13.0959C21.1512 14.9442 20.2372 15.8984 18.3387 15.8984H12.2115C11.6088 15.8984 11.3075 15.9988 10.8856 16.4408L7.70145 19.5848ZM10.9258 14.0301C11.2874 14.0301 11.5988 13.8593 11.8097 13.5279L16.2997 6.50666C16.4302 6.29572 16.5508 6.05465 16.5508 5.83367C16.5508 5.33144 16.1088 4.99997 15.6367 4.99997C15.3354 4.99997 15.0642 5.17072 14.8532 5.5022L10.8856 11.8705L9.0173 9.48992C8.77623 9.17854 8.53516 9.06805 8.23382 9.06805C7.74163 9.06805 7.35993 9.46983 7.35993 9.96202C7.35993 10.2031 7.45033 10.4241 7.62109 10.635L9.99163 13.5379C10.2628 13.8794 10.5541 14.0301 10.9258 14.0301Z"
                fill="#E9500E"
              />
            </svg>
            <p className="text-black text-xl my-4 font-bold">
              ¡La cuenta se creó con éxito!
            </p>
            <button
              className="text-orange-600 md:hover:text-[#DB9B6D] ml-auto font-bold"
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

export default AltaUsuarioAlumno
