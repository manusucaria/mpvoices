'use client'
import React, { useState, useEffect } from 'react'
import { getProfesores, getAlumnos } from '../api/api.js'
import { useRouter } from 'next/navigation'
import { useAuth } from '../../lib/auth'
import { signOut } from 'firebase/auth'
import { auth } from '../../lib/firebase.js'
import alas from '../assets/alas.jpg'
import Image from 'next/image'

const page = () => {
  const user = useAuth()
  const [alumnos, setAlumnos] = useState([])
  const [profesor, setProfesor] = useState([])
  const [alumnosProfesor, setalumnosProfesor] = useState([])
  const [selectedDay, setSelectedDay] = useState('')
  const [timeSlots, setTimeSlots] = useState([])
  const [filteredAlumnos, setFilteredAlumnos] = useState([])
  const [availableDays, setAvailableDays] = useState([])
  const router = useRouter()

  useEffect(() => {
    if (user === null) {
      router.push('/login')
    } if (user) {
      getAlumnos().then(data => {
        setAlumnos(data)
      })
      getProfesores().then(data => {
        const profesoresFiltrados = data.filter(profesor => profesor.Email === user.email)
        if (profesoresFiltrados.length > 0) {
          const profe = profesoresFiltrados[0]
          setProfesor(profe)
          const daysString = profe.Dia
          const daysArray = daysString.split(/[,\s]*y\s*/)
          setAvailableDays(daysArray)
        }
      })
      if (user.displayName !== 'Profesor') {
        router.push('/login')
      }
    }
  }, [user, router])

  useEffect(() => {
    const alumnosDelProfesor = alumnos.filter((alumno) => alumno.Profesor === profesor.Nombre)
    setalumnosProfesor(alumnosDelProfesor)
  }, [selectedDay, alumnos])

  useEffect(() => {
    const slots = []
    for (let hour = 12; hour <= 20; hour++) {
      for (let minute = 0; minute < 60; minute += 15) {
        slots.push(`${hour}:${minute === 0 ? '00' : minute}`)
      }
    }
    setTimeSlots(slots)
  }, [])

  const showAllDays = () => {
    setSelectedDay('')
  }

  useEffect(() => {
    const filtered = selectedDay
      ? alumnosProfesor.filter((alumno) => {
        const diaAlumnoNormalized = alumno.Dia
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

  const calcularNuevoHorario = (horario, duracion) => {
    const [hora, minuto] = horario.split(':').map(Number)
    const duracionMinutos = duracion / 15 * 15
    const nuevoHorarioMinutos = hora * 60 + minuto + duracionMinutos
    const nuevaHora = Math.floor(nuevoHorarioMinutos / 60)
    const nuevoMinuto = nuevoHorarioMinutos % 60
    return `${nuevaHora}:${nuevoMinuto < 10 ? '0' : ''}${nuevoMinuto}`
  }

  const filterAlumnosByDay = (day) => {
    setSelectedDay(day)
  }

  const handleLogout = () => {
    signOut(auth).then(() => {
      router.push('/')
    })
  }

  return (
    <div id='Agenda' className="flex flex-col">
      {profesor && Object.keys(profesor).length > 0
        ? <div className="flex flex-col">
        <h1 className='text-center text-[#FFFFFF] text-3xl sm:text-5xl mt-6 mb-12'>¡Bienvenido/a {profesor.Nombre} {profesor.Apelido}!</h1>
        {selectedDay
          ? (
            <div className="flex justify-center items-center mb-4">
              <div className="flex my-auto pb-3">
                <svg className='my-auto md:hover:cursor-pointer stroke-[#FFFFFF] md:hover:stroke-[#E9500E]' onClick={() => showAllDays()} width="34" height="32" viewBox="0 0 34 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <g id="iconamoon:arrow-up-2-light">
                  <path id="Vector" d="M19.8333 9.22572L12.75 15.8155L19.8333 22.4053" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </g>
                </svg>
              </div>
              <div className='my-auto flex ml-4 sm:ml-8 mb-4'>
                <h3 className="text-[#FFFFFF] my-auto text-xl sm:text-2xl">Días y horarios</h3>
                <p className='my-auto mx-4 sm:mx-8'>|</p>
                <p className='text-[#E9500E] my-auto mt-1 md:mt-2 text-lg'>{selectedDay}</p>
              </div>
            </div>
            )
          : (
              <div className='grid grid-cols-1 grid-rows-1 h-screen md:h-auto'>
                <div className='bg-[#0D0D0D] col-start-1 col-end-1 row-start-1 row-end-1 z-40 border-2 lg:border-4 border-[#FFFFFF] opacity-30 h-[90%] w-[90%] m-auto'></div>
                <Image
                  width={500}
                  height={500}
                  className='col-start-1 col-end-1 row-start-1 row-end-1 w-full h-full hidden md:flex'
                  src={alas}
                  alt="Separador Alas"
                  priority
                />
                <div className="col-start-1 col-end-1 row-start-1 row-end-1 w-full m-auto z-40 flex flex-col">
                  <h2 className="text-center text-3xl lg:text-5xl m-auto text-[#FFFFFF] mb-8 sm:mb-6 lg:mb-8 xl:mb-10">Días y horarios</h2>
                  {availableDays.map((day, index) => (
                    <button key={index} onClick={() => filterAlumnosByDay(day)} className="bg-[#FFFFFF] md:hover:bg-[#E9500E] md:hover:text-[#FFFFFF] font-botones font-bold text-[#0D0D0D] sm:text-lg rounded-3xl mx-auto h-10 sm:h-8 md:h-8 lg:h-10 w-4/6 sm:w-3/6 md:w-2/6 mb-6 md:mb-4 xl:mb-6">
                      {day}
                    </button>
                  ))}
                </div>
              </div>
            )}
          {selectedDay && (
            <div className="flex flex-col overflow-x-auto mx-auto w-full px-2 md:w-4/6 mb-12">
              <div className='grid grid-cols-[20%_80%] grid-rows-37 border-r-1 border-r-[#0D0D0D]'>
                <div className="border-b-1 border-b-[#0D0D0D] border-x-1 border-x-[#0D0D0D] bg-[#E9500E] h-9 sm:h-12 text-center col-start-1 col-end-2 row-start-1 row-end-2 flex">
                  <p className='text-md sm:text-md md:text-base m-auto text-[#FFFFFF]'>Horario</p>
                </div>
                {timeSlots.map((time, index) => (
                  <div key={index} className='text-center col-start-1 col-end-2 bg-[#FFFFFF] flex h-9 sm:h-12 border-b-1 border-x-1 border-b-[#0D0D0D] border-x-[#0D0D0D]'>
                    <p className='text-md sm:text-md md:text-base m-auto text-[#0D0D0D]'>{time}</p>
                  </div>
                ))}
                <div className="col-start-2 col-end-3 row-start-1 row-end-38 grid grid-cols-1 bg-[#FFFFFF]">
                  <div className="grid grid-cols-1 grid-rows-37 text-center border-r-1 border-r-[#0D0D0D]">
                    <div className='border-b-1 border-b-[#0D0D0D] flex row-start-1 row-end-2 h-9 sm:h-12 text-sm bg-[#E9500E]'>
                      <p className='text-md sm:text-md md:text-base m-auto'>{profesor.Nombre} / {profesor.Instrumento}</p>
                    </div>
                    {filteredAlumnos
                      .map((alumno) => (
                        <div key={`${alumno.Nombre}`} className='flex flex-col h-full w-full text-center border-none' style={{
                          gridRowStart: timeSlots.indexOf(alumno.Horario) + 2,
                          gridRowEnd: timeSlots.indexOf(alumno.Horario) + 2 + alumno.Duracion / 15
                        }}>
                          <div
                            className={`flex flex-col m-auto h-[97.5%] w-[97.5%] text-center ${
                              alumno.Notificaciones ? 'bg-[#FFC9CB]' : 'bg-[#ACFDB2]'
                            }`}
                          >
                            <p className='text-sm sm:text-sm md:text-base mt-auto font-bold pt-2 text-[#0D0D0D]'>{alumno.Nombre} {alumno.Apellido}</p>
                            <p className='text-sm sm:text-sm md:text-base mb-auto text-[#0D0D0D]'>{alumno.Instrumento} {alumno.Horario}-{calcularNuevoHorario(alumno.Horario, alumno.Duracion)}</p>
                            <div className='ms-auto pe-2 sm:pe-4'>
                              {alumno.Notificaciones
                                ? <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 20 20" fill="none">
                                    <path d="M5.55 1.58L4.12 0.15C1.72 1.98 0.14 4.8 0 8H2C2.15 5.35 3.51 3.03 5.55 1.58ZM17.94 8H19.94C19.79 4.8 18.21 1.98 15.82 0.15L14.4 1.58C16.42 3.03 17.79 5.35 17.94 8ZM15.97 8.5C15.97 5.43 14.33 2.86 11.47 2.18V1.5C11.47 0.67 10.8 0 9.97 0C9.14 0 8.47 0.67 8.47 1.5V2.18C5.6 2.86 3.97 5.42 3.97 8.5V13.5L1.97 15.5V16.5H17.97V15.5L15.97 13.5V8.5ZM9.97 19.5C10.11 19.5 10.24 19.49 10.37 19.46C11.02 19.32 11.55 18.88 11.81 18.28C11.91 18.04 11.96 17.78 11.96 17.5H7.96C7.97 18.6 8.86 19.5 9.97 19.5Z" fill="#D0242A"/>
                                  </svg>
                                : <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 20 20" fill="none">
                                    <path d="M5.55 1.58L4.12 0.15C1.72 1.98 0.14 4.8 0 8H2C2.15 5.35 3.51 3.03 5.55 1.58ZM17.94 8H19.94C19.79 4.8 18.21 1.98 15.82 0.15L14.4 1.58C16.42 3.03 17.79 5.35 17.94 8ZM15.97 8.5C15.97 5.43 14.33 2.86 11.47 2.18V1.5C11.47 0.67 10.8 0 9.97 0C9.14 0 8.47 0.67 8.47 1.5V2.18C5.6 2.86 3.97 5.42 3.97 8.5V13.5L1.97 15.5V16.5H17.97V15.5L15.97 13.5V8.5ZM9.97 19.5C10.11 19.5 10.24 19.49 10.37 19.46C11.02 19.32 11.55 18.88 11.81 18.28C11.91 18.04 11.96 17.78 11.96 17.5H7.96C7.97 18.6 8.86 19.5 9.97 19.5Z" fill="#036240"/>
                                  </svg>
                              }
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
              </div>
            </div>
          </div>
          )}
          <button className='bg-[#FFFFFF] text-[#E9500E] md:text-[#0D0D0D] md:hover:text-[#E9500E] border-2 border-[#E9500E] mx-auto mt-12 font-botones font-bold p-2 my-6 lg:mb-12 w-4/6 sm:w-2/6 h-10 text-center rounded-3xl hover:cursor-pointer' onClick={handleLogout}>
            <p>Cerrar Sesión</p>
          </button>
        </div>
        : ''}
      </div>
  )
}

export default page
