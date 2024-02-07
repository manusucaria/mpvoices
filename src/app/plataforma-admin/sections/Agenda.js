import React, { useState, useEffect } from 'react'
import { getAlumnos, getProfesores } from '../../api/api.js'
import alas from '../../assets/alas.jpg'
import Image from 'next/image'

const Agenda = ({ cambios }) => {
  const [alumnos, setAlumnos] = useState([])
  const [profesores, setProfesores] = useState([])
  const [selectedDay, setSelectedDay] = useState('')
  const [timeSlots, setTimeSlots] = useState([])
  const [startIndex, setStartIndex] = useState(0)
  const [filteredAlumnos, setFilteredAlumnos] = useState([])
  const [filteredProfesores, setFilteredProfesores] = useState([])

  useEffect(() => {
    getAlumnos().then((data) => {
      setAlumnos(data)
    })
    getProfesores().then((data) => {
      setProfesores(data)
    })
  }, [selectedDay, cambios])

  useEffect(() => {
    const slots = []
    for (let hour = 12; hour <= 20; hour++) {
      for (let minute = 0; minute < 60; minute += 15) {
        slots.push(`${hour}:${minute === 0 ? '00' : minute}`)
      }
    }
    setTimeSlots(slots)
  }, [])

  const filterAlumnosByDay = (day) => {
    setSelectedDay(day)
  }

  const showAllDays = () => {
    setSelectedDay('')
    setStartIndex(0)
  }

  useEffect(() => {
    const filtered = selectedDay
      ? profesores.filter((profesor) => {
        const diaProfesor = profesor.Dia.toLocaleLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')
        const diaSeleccionado = selectedDay.toLocaleLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')
        return diaProfesor.includes(diaSeleccionado)
      })
      : []

    setFilteredProfesores(filtered)
  }, [selectedDay, cambios, profesores])

  const filteredProfesoresSorted = filteredProfesores.slice().sort((a, b) => {
    const nombreProfesorA = a.Nombre.toLocaleLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    const nombreProfesorB = b.Nombre.toLocaleLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    if (nombreProfesorA < nombreProfesorB) return -1
    if (nombreProfesorA > nombreProfesorB) return 1
    return 0
  })

  useEffect(() => {
    const filtered = selectedDay
      ? alumnos.filter((alumno) => {
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
  }, [selectedDay, cambios, alumnos])

  const handleNext = () => {
    if (startIndex + 2 < filteredProfesores.length) {
      setStartIndex((prevIndex) => prevIndex + 2)
    }
  }

  const handlePrev = () => {
    setStartIndex((prevIndex) => {
      return Math.max(prevIndex - 2, 0)
    })
  }

  const calcularNuevoHorario = (horario, duracion) => {
    const [hora, minuto] = horario.split(':').map(Number)
    const duracionMinutos = duracion / 15 * 15
    const nuevoHorarioMinutos = hora * 60 + minuto + duracionMinutos
    const nuevaHora = Math.floor(nuevoHorarioMinutos / 60)
    const nuevoMinuto = nuevoHorarioMinutos % 60
    return `${nuevaHora}:${nuevoMinuto < 10 ? '0' : ''}${nuevoMinuto}`
  }

  return (
    <div id='Agenda' className="flex flex-col">
      {selectedDay
        ? (
        <div className="flex justify-center mb-4">
          <div className="my-auto">
            <svg className='hover:cursor-pointer' onClick={() => showAllDays()} width="34" height="32" viewBox="0 0 34 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g id="iconamoon:arrow-up-2-light">
              <path id="Vector" d="M19.8333 9.22572L12.75 15.8155L19.8333 22.4053" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </g>
            </svg>
          </div>
          <div className='flex sm:ml-8'>
            <h3 className="text-[#FFFFFF] text-xl sm:text-2xl">Días y horarios</h3>
            <p className='my-auto mx-4 sm:mx-8'>|</p>
            <p className='text-[#E9500E] mt-auto text-lg'>{selectedDay}</p>
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
              <button onClick={() => filterAlumnosByDay('Lunes')} className="bg-[#FFFFFF] font-botones font-bold text-[#0D0D0D] sm:text-lg rounded-3xl mx-auto h-10 sm:h-8 md:h-8 lg:h-10 w-4/6 sm:w-3/6 md:w-2/6 mb-6 md:mb-4 xl:mb-6">
                Lunes
              </button>
              <button onClick={() => filterAlumnosByDay('Martes')} className="bg-[#FFFFFF] font-botones font-bold text-[#0D0D0D] sm:text-lg rounded-3xl mx-auto h-10 sm:h-8 md:h-8 lg:h-10 w-4/6 sm:w-3/6 md:w-2/6 mb-6 md:mb-4 xl:mb-6">
                Martes
              </button>
              <button onClick={() => filterAlumnosByDay('Miércoles')} className="bg-[#FFFFFF] font-botones font-bold text-[#0D0D0D] sm:text-lg rounded-3xl mx-auto h-10 sm:h-8 md:h-8 lg:h-10 w-4/6 sm:w-3/6 md:w-2/6 mb-6 md:mb-4 xl:mb-6">
                Miércoles
              </button>
              <button onClick={() => filterAlumnosByDay('Jueves')} className="bg-[#FFFFFF] font-botones font-bold text-[#0D0D0D] sm:text-lg rounded-3xl mx-auto h-10 sm:h-8 md:h-8 lg:h-10 w-4/6 sm:w-3/6 md:w-2/6 mb-6 md:mb-4 xl:mb-6">
                Jueves
              </button>
              <button onClick={() => filterAlumnosByDay('Viernes')} className="bg-[#FFFFFF] font-botones font-bold text-[#0D0D0D] sm:text-lg rounded-3xl mx-auto h-10 sm:h-8 md:h-8 lg:h-10 w-4/6 sm:w-3/6 md:w-2/6">
                Viernes
              </button>
            </div>
          </div>
          )}
      {selectedDay && (
        <div className="flex flex-col overflow-x-auto mx-auto w-full px-6 sm:px-0 sm:w-4/6 mb-12">
          <div className="grid grid-cols-3 mt-4 h-12 bg-[#FFFFFF] border-1 border-[#0D0D0D]">
            {filteredProfesoresSorted.length >= 3 && startIndex > 0 && (
              <button className='col-start-1 col-end-2 mr-auto pl-4' onClick={handlePrev}>
                <svg width="34" height="32" viewBox="0 0 34 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <g id="iconamoon:arrow-up-2-light">
                  <path id="Vector" d="M19.8333 9.22572L12.75 15.8155L19.8333 22.4053" stroke="#080808" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </g>
                </svg>
              </button>
            )}
            <h3 className='text-[#0D0D0D] col-start-2 col-end-3 mx-auto my-auto font-bold text-lg'>{selectedDay}</h3>
            {startIndex + 2 < filteredProfesoresSorted.length && (
              <button className='col-start-3 col-end-4 ml-auto pr-4' onClick={handleNext}>
                <svg width="34" height="32" viewBox="0 0 34 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <g id="iconamoon:arrow-up-2-light">
                  <path id="Vector" d="M16.6667 23.0188L25 16.2486L16.6667 9.47833" stroke="#080808" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </g>
                </svg>
              </button>
            )}
          </div>
          <div className='grid grid-cols-[20%_40%_40%] grid-rows-37'>
            <div className="border-1 border-[#0D0D0D] bg-[#E9500E] h-12 text-center col-start-1 col-end-2 row-start-1 row-end-2 flex">
              <p className='m-auto text-[#FFFFFF]'>Profe</p>
            </div>
            {timeSlots.map((time, index) => (
              <div key={index} className='text-center col-start-1 col-end-2 bg-[#FFFFFF] flex h-12 border-b-1 border-x-1 border-b-[#0D0D0D] border-x-[#0D0D0D]'>
                <p className='m-auto text-[#0D0D0D]'>{time}</p>
              </div>
            ))}
            <div className="col-start-2 col-end-4 row-start-1 row-end-38 grid grid-cols-2 bg-[#FFFFFF]">
              {filteredProfesoresSorted.slice(startIndex, startIndex + 2).map((profesor) => (
              <div key={profesor.id} className="grid grid-cols-1 grid-rows-37 text-center border-r-1 border-r-[#0D0D0D]">
                <div className='border-b-1 border-b-[#0D0D0D] flex row-start-1 row-end-2 h-12 text-sm bg-[#E9500E]'>
                  <p className='m-auto'>{profesor.Nombre} / {profesor.Instrumento}</p>
                </div>
                {filteredAlumnos
                  .filter((alumno) => alumno.Profesor === profesor.Nombre)
                  .map((alumno) => (
                    <div key={`${alumno.Nombre}`} className='flex flex-col h-full w-full text-center border-none' style={{
                      gridColumn: filteredProfesoresSorted.findIndex((p) => p.Nombre === profesor.Nombre) - startIndex,
                      gridRowStart: timeSlots.indexOf(alumno.Horario) + 2,
                      gridRowEnd: timeSlots.indexOf(alumno.Horario) + 2 + alumno.Duracion / 15
                    }}>
                      <div
                        className={`flex flex-col m-auto h-[95%] w-[95%] text-center ${
                          alumno.Notificaciones ? 'bg-[#FFC9CB]' : 'bg-[#ACFDB2]'
                        }`}
                      >
                        <p className='text-xs sm:text-sm md:text-base mt-auto pt-2 text-[#0D0D0D]'>{alumno.Nombre} {alumno.Apellido}</p>
                        <p className='text-xs sm:text-sm md:text-base mb-auto text-[#0D0D0D]'>{alumno.Instrumento} {alumno.Horario}-{calcularNuevoHorario(alumno.Horario, alumno.Duracion)}</p>
                        <div className='ms-auto pb-1 pe-4'>
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
              ))}
          </div>
        </div>
      </div>
      )}
    </div>
  )
}

export default Agenda
