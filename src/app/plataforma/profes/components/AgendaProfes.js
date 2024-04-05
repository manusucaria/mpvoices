'use client'
import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import alasSmall from '@/app/assets/alasSmall.jpg'
import alas from '@/app/assets/alas.jpg'
import { horarios, diasSemana } from '@/app/api/data'
import { getAllAlumnos } from '@/lib/firebase/crud/read'
import NotificacionProfe from '../../admin/components/NotificacionProfe'
import { isWithinInterval, addDays } from 'date-fns'

const AgendaProfes = ({ profesor }) => {
  const [alumnos, setAlumnos] = useState([])
  const [alumnosProfesor, setalumnosProfesor] = useState([])
  const [selectedDay, setSelectedDay] = useState('')
  const [filteredAlumnos, setFilteredAlumnos] = useState([])
  const [showNotification, setShowNotification] = useState(false)
  const [availableDays, setAvailableDays] = useState()
  const [selectedAlumno, setSelectedAlumno] = useState()
  const [notificaciones, setNotificaciones] = useState([])

  useEffect(() => {
    if (profesor && profesor?.dias) {
      const daysString = profesor?.dias
      const daysArray = daysString.split(/[,\s]*[,y]\s*/)
      setAvailableDays(daysArray)
    }
  }, [profesor])

  const filterAlumnosByDay = (day) => {
    setSelectedDay(day)
  }

  const showAllDays = () => {
    setSelectedDay('')
  }

  const handleAlumnoClick = (alumno) => {
    setSelectedAlumno(alumno)
    setNotificaciones(alumno.clases.notificaciones)
    setShowNotification(true)
  }

  const calcularNuevoHorario = (horario, duracion) => {
    const [hora, minuto] = horario.split(':').map(Number)
    const duracionMinutos = (duracion / 15) * 15
    const nuevoHorarioMinutos = hora * 60 + minuto + duracionMinutos
    const nuevaHora = Math.floor(nuevoHorarioMinutos / 60)
    const nuevoMinuto = nuevoHorarioMinutos % 60
    return `${nuevaHora}:${nuevoMinuto < 10 ? '0' : ''}${nuevoMinuto}`
  }

  useEffect(() => {
    (async () => {
      const alumnosData = await getAllAlumnos({
        getUsuario: true,
        getProfesor: true
      })
      setAlumnos(alumnosData)
    })()
  }, [selectedDay, selectedAlumno])

  useEffect(() => {
    const alumnosDelProfesor = alumnos.filter(
      (alumno) =>
        alumno.profesor.usuario.full_name.nombre ===
        profesor.usuario.full_name.nombre
    )
    setalumnosProfesor(alumnosDelProfesor)
  }, [selectedDay, alumnos])

  useEffect(() => {
    const filtered = selectedDay
      ? alumnosProfesor.filter((alumno) => {
        const diaAlumnoNormalized = alumno.clases.dia
          .toLowerCase()
          .normalize('NFD')
          .replace(/[\u0300-\u036f]/g, '')
        const selectedDayNormalized = selectedDay
          .toLowerCase()
          .normalize('NFD')
          .replace(/[\u0300-\u036f]/g, '')
        return diaAlumnoNormalized === selectedDayNormalized
      })
      : []
    setFilteredAlumnos(filtered)
  }, [selectedDay, alumnos])

  const isNotificationWithinCurrentWeek = (notificaciones) => {
    if (!Array.isArray(notificaciones)) {
      return false
    }
    const today = new Date()
    const endOfNextSixDays = addDays(today, 6)
    for (const notificacion of notificaciones) {
      const fecha = new Date(notificacion.fecha.seconds * 1000 + notificacion.fecha.nanoseconds / 1000000)
      if (isWithinInterval(fecha, { start: today, end: endOfNextSixDays })) {
        return true
      }
    }
    return false
  }

  return (
    <div>
      {selectedDay
        ? (
        <div className="flex justify-center items-center mb-4 bg-black">
          <div className="flex my-auto pb-3">
            <svg
              className="my-auto md:hover:cursor-pointer stroke-white md:hover:stroke-orange-300"
              onClick={() => showAllDays()}
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
          <div className="my-auto flex ml-4 sm:ml-8 mb-4">
            <h2 className="text-white my-auto text-xl sm:text-2xl">
              Días y horarios
            </h2>
            <p className="my-auto mx-4 sm:mx-8">|</p>
            <h2 className="text-orange-300 my-auto pt-1 text-xl sm:text-2xl">
              {selectedDay.toLowerCase()}
            </h2>
          </div>
        </div>
          )
        : (
        <div className="grid grid-cols-1 grid-rows-1 h-auto">
          <div className="bg-black col-start-1 col-end-1 row-start-1 row-end-1 z-40 border-2 lg:border-4 border-white opacity-30 h-[94%] w-[94%] sm:h-[90%] sm:w-[90%] m-auto"></div>
          <Image
            width={500}
            height={500}
            className="col-start-1 col-end-1 row-start-1 row-end-1 object-cover w-full flex md:hidden"
            src={alasSmall}
            alt="Separador Alas"
            priority
          />
          <Image
            width={500}
            height={500}
            className="col-start-1 col-end-1 row-start-1 row-end-1 w-full h-full hidden md:flex"
            src={alas}
            alt="Separador Alas"
            priority
          />
          <div className="col-start-1 col-end-1 row-start-1 row-end-1 w-full m-auto z-40 flex flex-col">
            <h2 className="text-center text-2xl sm:text-3xl m-auto text-white mb-8 sm:mb-6 lg:mb-8 xl:mb-10">
              Días y horarios
            </h2>
            {availableDays
              ? availableDays.map((day, index) => (
                  <button
                    key={index}
                    onClick={() => filterAlumnosByDay(day)}
                    className={`bg-white font-botones font-bold text-black sm:text-lg rounded-3xl mx-auto h-10 sm:h-8 md:h-8 lg:h-10 w-4/6 sm:w-3/6 md:w-2/6 ${
                      index === diasSemana.length - 1
                        ? ''
                        : 'mb-6 md:mb-4 xl:mb-6'
                    } md:hover:bg-orange-600 md:hover:text-white`}
                  >
                    {day.toLowerCase()}
                  </button>
              ))
              : null}
          </div>
        </div>
          )}
      {selectedDay && (
        <div className="flex flex-col overflow-x-auto mx-auto w-full px-4 md:w-4/6 mb-12">
          <div className="grid grid-cols-[20%_80%] grid-rows-45">
            <div className="rounded-tl-2xl border-b-[0.5px] sm:border-b-1 border-b-black border-r-[0.5px] sm:border-r-1 border-r-black bg-orange-600 h-12 text-center col-start-1 col-end-2 row-start-1 row-end-2 flex">
              <p className="text-md sm:text-md md:text-base m-auto text-white">
                Hora
              </p>
            </div>
            {horarios.map((time, index) => (
              <div
                key={index}
                className={`text-center border-r-[0.5px] sm:border-r-1 border-r-black col-start-1 col-end-2 bg-white flex h-12 ${
                  index === horarios.length - 1
                    ? 'border-b-none rounded-bl-2xl'
                    : 'border-b-[0.5px] sm:border-b-1 border-b-black'
                }`}
              >
                <p className="text-md sm:text-md md:text-base m-auto text-black">
                  {time}
                </p>
              </div>
            ))}
            <div className="col-start-2 col-end-3 row-start-1 row-end-46 grid grid-cols-1 bg-white rounded-br-2xl">
              <div className="grid grid-cols-1 grid-rows-45 text-center">
                <div className="bg-black row-start-1 row-end-2">
                  <div className="rounded-tr-2xl border-b-[0.5px] sm:border-b-1 border-b-black flex h-12 text-sm bg-navy-blue">
                    <p className="text-md sm:text-md md:text-base m-auto">
                      Profesor: {profesor.usuario.full_name.nombre} /{' '}
                      {profesor.instrumento}
                    </p>
                  </div>
                </div>
                {filteredAlumnos.map((alumno) => (
                  <div
                    key={`${alumno.id}`}
                    className="flex flex-col h-full w-full text-center border-none"
                    style={{
                      gridRowStart:
                        horarios.indexOf(alumno.clases.hora_inicio) + 2,
                      gridRowEnd:
                        horarios.indexOf(alumno.clases.hora_inicio) +
                        2 +
                        alumno.clases.duracion / 15
                    }}
                  >
                      <div
                        className={`flex flex-col m-auto h-[97.5%] w-[95%] text-center ${
                          isNotificationWithinCurrentWeek(alumno.clases.notificaciones)
                            ? 'bg-[#FFC9CB]'
                            : 'bg-[#ACFDB2]'
                        }`}
                      >
                      <p className="text-sm sm:text-sm md:text-base mt-auto font-bold pt-2 text-black">
                        Alumno: {alumno.usuario.full_name.nombre}{' '}
                        {alumno.usuario.full_name.apellido}
                      </p>
                      <p className="text-sm sm:text-sm md:text-base mb-auto text-black">
                        {alumno.instrumento} {alumno.clases.hora_inicio}-
                        {calcularNuevoHorario(
                          alumno.clases.hora_inicio,
                          alumno.clases.duracion
                        )}
                        hs
                      </p>
                      <div className="ms-auto pb-2 pe-2 sm:pe-4">
                        {alumno &&
                        alumno.clases.notificaciones &&
                        (alumno.clases.notificaciones.length > 0 ||
                          alumno.notas.length > 0)
                          ? (
                          <svg
                            className="md:cursor-pointer"
                            onClick={() => handleAlumnoClick(alumno)}
                            width="20"
                            height="20"
                            viewBox="0 0 20 20"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M5.55 2.08L4.12 0.65C1.72 2.48 0.14 5.3 0 8.5H2C2.15 5.85 3.51 3.53 5.55 2.08ZM17.94 8.5H19.94C19.79 5.3 18.21 2.48 15.82 0.65L14.4 2.08C16.42 3.53 17.79 5.85 17.94 8.5ZM15.97 9C15.97 5.93 14.33 3.36 11.47 2.68V2C11.47 1.17 10.8 0.5 9.97 0.5C9.14 0.5 8.47 1.17 8.47 2V2.68C5.6 3.36 3.97 5.92 3.97 9V14L1.97 16V17H17.97V16L15.97 14V9ZM9.97 20C10.11 20 10.24 19.99 10.37 19.96C11.02 19.82 11.55 19.38 11.81 18.78C11.91 18.54 11.96 18.28 11.96 18H7.96C7.97 19.1 8.86 20 9.97 20Z"
                              fill="#D0242A"
                            />
                          </svg>
                            )
                          : (
                          <svg
                            width="16"
                            height="19"
                            viewBox="0 0 16 19"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M15.3333 14.7401V15.6071H0V14.7401L1.7037 13.006V7.80357C1.7037 5.11567 3.43296 2.74859 5.96296 1.98558V1.73413C5.96296 1.27421 6.14246 0.833126 6.46197 0.507914C6.78147 0.182702 7.21482 0 7.66667 0C8.11852 0 8.55186 0.182702 8.87137 0.507914C9.19087 0.833126 9.37037 1.27421 9.37037 1.73413V1.98558C11.9004 2.74859 13.6296 5.11567 13.6296 7.80357V13.006L15.3333 14.7401ZM9.37037 16.4742C9.37037 16.9341 9.19087 17.3752 8.87137 17.7004C8.55186 18.0256 8.11852 18.2083 7.66667 18.2083C7.21482 18.2083 6.78147 18.0256 6.46197 17.7004C6.14246 17.3752 5.96296 16.9341 5.96296 16.4742"
                              fill="#036240"
                            />
                          </svg>
                            )}
                      </div>
                    </div>
                    {showNotification && (
                      <NotificacionProfe
                        alumno={selectedAlumno}
                        setSelectedAlumno={setSelectedAlumno}
                        notificaciones={notificaciones}
                        setNotificaciones={setNotificaciones}
                        setShowNotification={setShowNotification}
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default AgendaProfes
