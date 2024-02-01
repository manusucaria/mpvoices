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
    for (let hour = 12; hour <= 21; hour++) {
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

  const renderTimeSlots = () => {
    return timeSlots.map((time, index) => (
      <div key={time} className="grid grid-cols-[20%_40%_40%] grid-rows-auto">
        <div className='border border-white text-center'>{time}</div>
        {filteredProfesoresSorted.slice(startIndex, startIndex + 2).map((profesor) => {
          const diasDisponiblesNormalized = profesor.Dia
            .toLowerCase()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .split(/,\s*|\sy\s*/)

          const selectedDayNormalized = selectedDay
            .toLowerCase()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')

          if (diasDisponiblesNormalized.includes(selectedDayNormalized)) {
            const alumnoBackgroundColor = getBackgroundColor(profesor, time)
            const alumnoData = filteredAlumnos.filter(alumno => alumno.Profesor === profesor.Nombre && alumno.Horario === time)
            return (
              <div
                key={`${profesor.id}-${time}`}
                style={{
                  backgroundColor: alumnoBackgroundColor,
                  border: alumnoBackgroundColor === 'green' ? 'none' : '1px solid white'
                }}
                className="border border-white text-center"
              >
                {alumnoData.map((alumno) => (
                  <div key={`${alumno.Nombre}-${time}`} className="text-center items-center">
                    <div>{`${alumno.Nombre} ${alumno.Apellido} ${alumno.Instrumento}`}</div>
                  </div>
                ))}
              </div>
            )
          }
          return null
        })}
      </div>
    ))
  }

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

  const getBackgroundColor = (profesor, time) => {
    let backgroundColor = 'black'
    filteredAlumnos.forEach((alumno) => {
      if (alumno.Profesor === profesor.Nombre) {
        const classStartTime = alumno.Horario
        const classEndTime = calculateClassEndTime(classStartTime, alumno.Duracion)
        const [classStartHour, classStartMinute] = classStartTime.split(':').map(Number)
        const [classEndHour, classEndMinute] = classEndTime.split(':').map(Number)
        const [currentTimeHour, currentTimeMinute] = time.split(':').map(Number)
        const classStartTotalMinutes = classStartHour * 60 + classStartMinute
        const classEndTotalMinutes = classEndHour * 60 + classEndMinute
        const currentTimeTotalMinutes = currentTimeHour * 60 + currentTimeMinute
        if (currentTimeTotalMinutes >= classStartTotalMinutes && currentTimeTotalMinutes <= classEndTotalMinutes) {
          backgroundColor = 'green'
        }
      }
    })
    return backgroundColor
  }

  const calculateClassEndTime = (startTime, duration) => {
    const [startHour, startMinute] = startTime.split(':').map(Number)
    const durationHour = Math.floor(duration / 60)
    const durationMinute = duration % 60
    const startTotalMinutes = startHour * 60 + startMinute
    const endTotalMinutes = startTotalMinutes + durationHour * 60 + durationMinute
    const endHour = Math.floor(endTotalMinutes / 60)
    const endMinute = endTotalMinutes % 60
    return `${endHour}:${endMinute < 10 ? '0' + endMinute : endMinute}`
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
        <div className="overflow-x-auto mx-auto w-full px-6 sm:px-0 sm:w-4/6">
        <div className="flex justify-center my-4">
          {filteredProfesores.length >= 3 && startIndex > 0 && (
            <button className='mr-auto pl-4' onClick={handlePrev}>Prev</button>
          )}
          {startIndex + 2 < filteredProfesores.length && (
            <button className='ml-auto pr-4' onClick={handleNext}>Next</button>
          )}
        </div>
          <div className="grid grid-cols-[20%_40%_40%]">
            <div className="border border-white text-center">Horarios</div>
            {filteredProfesoresSorted.slice(startIndex, startIndex + 2).map((profesor) => (
              <div key={profesor.id} className="border border-white text-center">
                {profesor.Nombre}
              </div>
            ))}
          </div>
          <div>{renderTimeSlots()}</div>
        </div>
      )}
    </div>
  )
}

export default Agenda
