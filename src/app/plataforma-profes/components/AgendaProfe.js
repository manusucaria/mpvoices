'use client'
import React, { useState, useEffect } from 'react'
import { getAlumnos } from '../../api/api.js'
import alasSmall from '../../assets/alasSmall.jpg'
import Image from 'next/image'
import alas from '../../assets/alas.jpg'

const AgendaProfe = ({ availableDays, profesor }) => {
  const [alumnos, setAlumnos] = useState([])
  const [alumnosProfesor, setalumnosProfesor] = useState([])
  const [selectedDay, setSelectedDay] = useState('')
  const [timeSlots, setTimeSlots] = useState([])
  const [filteredAlumnos, setFilteredAlumnos] = useState([])
  const [showNotification, setShowNotification] = useState(false)
  const [notification, setNotification] = useState([])

  useEffect(() => {
    getAlumnos().then(data => {
      setAlumnos(data)
    })
  }, [selectedDay])

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

  const handleAlumnoClick = (alumno) => {
    setNotification(alumno.Notificaciones)
    setShowNotification(true)
  }

  const closeNotification = () => {
    setNotification([])
    setShowNotification(false)
  }

  return (
    <div id='Agenda' className="flex flex-col">
      <div className={`flex flex-col md:hidden ${selectedDay ? 'mb-6' : ''}`}>
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
                <p className='text-[#E9500E] my-auto pt-1 text-xl sm:text-2xl'>{selectedDay.toLowerCase()}</p>
              </div>
            </div>
            )
          : (
              <div className='grid grid-cols-1 grid-rows-1 h-auto'>
                <div className='bg-[#0D0D0D] col-start-1 col-end-1 row-start-1 row-end-1 z-40 border-2 lg:border-4 border-[#FFFFFF] opacity-30 h-[94%] w-[94%] sm:h-[90%] sm:w-[90%] m-auto'></div>
                <Image
                  width={500}
                  height={500}
                  className='col-start-1 col-end-1 row-start-1 row-end-1 object-cover w-full flex md:hidden'
                  src={alasSmall}
                  alt="Separador Alas"
                  priority
                />
                <Image
                  width={500}
                  height={500}
                  className='col-start-1 col-end-1 row-start-1 row-end-1 w-full h-full hidden md:flex'
                  src={alas}
                  alt="Separador Alas"
                  priority
                />
                <div className="col-start-1 col-end-1 row-start-1 row-end-1 w-full m-auto z-40 flex flex-col">
                  <h2 className="text-center text-2xl sm:text-3xl m-auto text-[#FFFFFF] mb-8 sm:mb-6 lg:mb-8 xl:mb-10">Días y horarios</h2>
                  {availableDays.map((day, index) => (
                    <button key={index} onClick={() => filterAlumnosByDay(day)} className="bg-[#FFFFFF] font-botones font-bold text-[#0D0D0D] sm:text-lg rounded-3xl mx-auto h-12 w-4/6 sm:w-3/6 md:w-2/6 mb-6 min-[400px]:mb-8 md:mb-8 md:hover:bg-[#E9500E] md:hover:text-[#FFFFFF]">
                      {day.toLowerCase()}
                    </button>
                  ))}
                </div>
              </div>
            )}
          {selectedDay && (
            <div className="flex flex-col overflow-x-auto mx-auto w-full px-4 md:w-4/6 mb-12">
              <div className='grid grid-cols-[20%_80%] grid-rows-37'>
                <div className="rounded-tl-2xl border-b-[0.5px] sm:border-b-1 border-b-[#0D0D0D] border-r-[0.5px] sm:border-r-1 border-r-[#0D0D0D] bg-[#E9500E] h-12 text-center col-start-1 col-end-2 row-start-1 row-end-2 flex">
                  <p className='text-md sm:text-md md:text-base m-auto text-[#FFFFFF]'>Hora</p>
                </div>
                {timeSlots.map((time, index) => (
                  <div
                    key={index}
                    className={`text-center border-r-[0.5px] sm:border-r-1 border-r-[#0D0D0D] col-start-1 col-end-2 bg-[#FFFFFF] flex h-12 ${index === timeSlots.length - 1 ? 'border-b-none rounded-bl-2xl' : 'border-b-[0.5px] sm:border-b-1 border-b-[#0D0D0D]'}`}
                  >
                    <p className='text-md sm:text-md md:text-base m-auto text-[#0D0D0D]'>{time}</p>
                  </div>
                ))}
                <div className="col-start-2 col-end-3 row-start-1 row-end-38 grid grid-cols-1 bg-[#FFFFFF] rounded-br-2xl">
                  <div className="grid grid-cols-1 grid-rows-37 text-center">
                    <div className='bg-[#0D0D0D] row-start-1 row-end-2'>
                      <div className='rounded-tr-2xl border-b-[0.5px] sm:border-b-1 border-b-[#0D0D0D] flex h-12 text-sm bg-[#663481]'>
                        <p className='text-md sm:text-md md:text-base m-auto'>Profesor: {profesor.Nombre} / {profesor.Instrumento}</p>
                      </div>
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
                            <p className='text-sm sm:text-sm md:text-base mt-auto font-bold pt-2 text-[#0D0D0D]'>Alumno: {alumno.Nombre} {alumno.Apellido}</p>
                            <p className='text-sm sm:text-sm md:text-base mb-auto text-[#0D0D0D]'>{alumno.Instrumento} {alumno.Horario}-{calcularNuevoHorario(alumno.Horario, alumno.Duracion)}hs</p>
                            <div className='ms-auto p-1 pe-2 sm:pe-4'>
                              {alumno.Notificaciones
                                ? <svg onClick={() => handleAlumnoClick(alumno)} width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M5.55 2.08L4.12 0.65C1.72 2.48 0.14 5.3 0 8.5H2C2.15 5.85 3.51 3.53 5.55 2.08ZM17.94 8.5H19.94C19.79 5.3 18.21 2.48 15.82 0.65L14.4 2.08C16.42 3.53 17.79 5.85 17.94 8.5ZM15.97 9C15.97 5.93 14.33 3.36 11.47 2.68V2C11.47 1.17 10.8 0.5 9.97 0.5C9.14 0.5 8.47 1.17 8.47 2V2.68C5.6 3.36 3.97 5.92 3.97 9V14L1.97 16V17H17.97V16L15.97 14V9ZM9.97 20C10.11 20 10.24 19.99 10.37 19.96C11.02 19.82 11.55 19.38 11.81 18.78C11.91 18.54 11.96 18.28 11.96 18H7.96C7.97 19.1 8.86 20 9.97 20Z" fill="#D0242A"/>
                                  </svg>
                                : <svg width="16" height="19" viewBox="0 0 16 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M15.3333 14.7401V15.6071H0V14.7401L1.7037 13.006V7.80357C1.7037 5.11567 3.43296 2.74859 5.96296 1.98558V1.73413C5.96296 1.27421 6.14246 0.833126 6.46197 0.507914C6.78147 0.182702 7.21482 0 7.66667 0C8.11852 0 8.55186 0.182702 8.87137 0.507914C9.19087 0.833126 9.37037 1.27421 9.37037 1.73413V1.98558C11.9004 2.74859 13.6296 5.11567 13.6296 7.80357V13.006L15.3333 14.7401ZM9.37037 16.4742C9.37037 16.9341 9.19087 17.3752 8.87137 17.7004C8.55186 18.0256 8.11852 18.2083 7.66667 18.2083C7.21482 18.2083 6.78147 18.0256 6.46197 17.7004C6.14246 17.3752 5.96296 16.9341 5.96296 16.4742" fill="#036240"/>
                                  </svg>
                              }
                            </div>
                          </div>
                        </div>
                      ))}
                      {showNotification && notification.length > 0 && (
                        <div className='fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray-800 bg-opacity-50 z-[100]'>
                          <div className='bg-[#FFFFFF] p-12 rounded-lg text-center flex flex-col gap-y-8 border-1 border-[#0D0D0D]'>
                            <p className='text-[#0D0D0D] font-bold text-xl mx-auto'>Notificaciones:</p>
                            <div className='flex flex-col mx-auto'>
                              {notification.map((item, index) => (
                                  <div key={index} className='text-[#0D0D0D] mr-auto'>- {item}</div>
                              ))}
                            </div>
                            <button className='text-[#E9500E] font-bold md:hover:text-[#DB9B6D]' onClick={closeNotification}>Cerrar</button>
                          </div>
                        </div>
                      )}
                    </div>
              </div>
            </div>
          </div>
          )}
        </div>
      </div>
  )
}

export default AgendaProfe
