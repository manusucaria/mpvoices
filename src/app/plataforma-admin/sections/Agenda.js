import React, { useState, useEffect } from 'react'
import { getAlumnos, getProfesores } from '../../api/api.js'
import { useAuth } from '../../../lib/auth.js'

const Agenda = () => {
  const user = useAuth()
  const [alumnos, setAlumnos] = useState([])
  const [profesores, setProfesores] = useState([])
  const [selectedDay, setSelectedDay] = useState('')
  const [timeSlots, setTimeSlots] = useState([])
  const [startIndex, setStartIndex] = useState(0)

  useEffect(() => {
    getAlumnos().then((data) => {
      setAlumnos(data)
    })
    getProfesores().then((data) => {
      setProfesores(data)
    })
  }, [user])

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

  const filteredProfesores = selectedDay
    ? profesores.filter((profesor) => {
      const diaProfesor = profesor.Dia.toLocaleLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')
      const diaSeleccionado = selectedDay.toLocaleLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')
      return diaProfesor.includes(diaSeleccionado)
    })
    : []

  const filteredProfesoresSorted = filteredProfesores.slice().sort((a, b) => {
    const nombreProfesorA = a.Nombre.toLocaleLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    const nombreProfesorB = b.Nombre.toLocaleLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    if (nombreProfesorA < nombreProfesorB) return -1
    if (nombreProfesorA > nombreProfesorB) return 1
    return 0
  })

  const filteredAlumnos = selectedDay
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

  return (
    <div className="flex flex-col">
      <h2 className="text-center text-3xl sm:text-5xl mb-4 text-white">Días y horarios</h2>
      {selectedDay
        ? (
        <div className="flex justify-center mb-4">
          <button onClick={() => showAllDays()} className="mr-2">
            Volver Atrás
          </button>
          <p>│</p>
          <h3 className="text-white ml-2">{selectedDay}</h3>
        </div>
          )
        : (
        <div className="flex flex-col justify-center mb-4">
          <button onClick={() => filterAlumnosByDay('Lunes')} className="bg-white text-black text-lg rounded-3xl mx-auto h-8 w-4/6 sm:w-2/6 mb-6">
            Lunes
          </button>
          <button onClick={() => filterAlumnosByDay('Martes')} className="bg-white text-black text-lg rounded-3xl mx-auto h-8 w-4/6 sm:w-2/6 mb-6">
            Martes
          </button>
          <button onClick={() => filterAlumnosByDay('Miércoles')} className="bg-white text-black text-lg rounded-3xl mx-auto h-8 w-4/6 sm:w-2/6 mb-6">
            Miércoles
          </button>
          <button onClick={() => filterAlumnosByDay('Jueves')} className="bg-white text-black text-lg rounded-3xl mx-auto h-8 w-4/6 sm:w-2/6 mb-6">
            Jueves
          </button>
          <button onClick={() => filterAlumnosByDay('Viernes')} className="bg-white text-black text-lg rounded-3xl mx-auto h-8 w-4/6 sm:w-2/6">
            Viernes
          </button>
        </div>
          )}
      {selectedDay && (
        <div className="flex flex-col overflow-x-auto mx-auto w-full px-6 sm:px-0 sm:w-4/6">
          <div className="flex justify-center my-4">
            {filteredProfesoresSorted.length >= 3 && startIndex > 0 && (
              <button className='mr-auto pl-4' onClick={handlePrev}>Prev</button>
            )}
            {startIndex + 2 < filteredProfesoresSorted.length && (
              <button className='ml-auto pr-4' onClick={handleNext}>Next</button>
            )}
          </div>
          <div className="grid grid-cols-[20%_40%_40%] bg-orange-300">
            <div className="border border-white text-center">Profe</div>
            {filteredProfesoresSorted.slice(startIndex, startIndex + 2).map((profesor) => (
              <div key={profesor.id} className="border border-white text-center">
                <p>{profesor.Nombre}</p>
              </div>
            ))}
          </div>
          <div className={'bg-navy-blue grid grid-cols-[20%_40%_40%] grid-rows-36'}>
            {timeSlots.map((time, index) => (
              <div key={index} className='border border-white text-center col-start-1 col-end-2 bg-navy-blue'>
                {time}
              </div>
            ))}
            {timeSlots.map((time, index) => (
              <div key={`empty_${index}`} className='border border-white text-center col-start-2 col-end-3 row-start-1 row-end-37 bg-navy-blue'>
                <p></p>
              </div>
            ))}
            {timeSlots.map((time, index) => (
              <div key={`empty_${index}`} className='border border-white text-center col-start-3 col-end-4 row-start-1 row-end-37 bg-navy-blue'>
                <p></p>
              </div>
            ))}
            {filteredAlumnos.map((alumno) => {
              const alumnoHorarioIndex = timeSlots.indexOf(alumno.Horario)
              const duracionFilas = alumno.Duracion / 15
              const gridRowStart = alumnoHorarioIndex + 1
              const gridRowEnd = gridRowStart + duracionFilas
              const profesorIndex = filteredProfesoresSorted.findIndex(profesor => profesor.Nombre === alumno.Profesor)
              const gridColumn = profesorIndex + 2 + startIndex

              return (
                <div key={`${alumno.Nombre}`} className="flex flex-col h-full text-center items-center bg-orange-300 p-2 border border-white" style={{ gridColumn, gridRowStart, gridRowEnd }}>
                  <p className='my-auto'>{alumno.Nombre} {alumno.Apellido}</p>
                  <p className='my-auto'>{alumno.Instrumento}</p>
                  <p className='my-auto'>Notificaiones</p>
                </div>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}

export default Agenda
