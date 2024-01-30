import React, { useState, useEffect } from 'react'
import { getAlumnos, getProfesores } from '../../api/api.js'
import { useAuth } from '../../../lib/auth'

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
  }

  const filteredAlumnos = selectedDay ? alumnos.filter((alumno) => alumno.Dia === selectedDay) : []

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

  const renderTimeSlots = () => {
    return timeSlots.map((time, index) => (
      <tr key={time}>
        <td className='border border-white'>{time}</td>
        {profesores.slice(startIndex, startIndex + 2).map((profesor) => {
          const alumnoBackgroundColor = getBackgroundColor(profesor, time)
          const alumnoData = filteredAlumnos.filter(alumno => alumno.Profesor === profesor.Nombre && alumno.Horario === time)
          return (
            <td
              key={`${profesor.id}-${time}`}
              style={{
                width: '10rem',
                backgroundColor: alumnoBackgroundColor,
                border: alumnoBackgroundColor === 'green' ? 'none' : '1px solid white'
              }}
            >
              {alumnoData.map((alumno) => (
                <div key={`${alumno.Nombre}-${time}`} className="flex flex-col text-center items-center">
                  <div>{`${alumno.Nombre} ${alumno.Apellido}`}</div>
                  <div>{alumno.Horario}</div>
                  <div>Notificaciones</div>
                </div>
              ))}
            </td>
          )
        })}
      </tr>
    ))
  }

  const handleNext = () => {
    setStartIndex((prevIndex) => Math.min(prevIndex + 2, profesores.length - 2))
  }

  const handlePrev = () => {
    setStartIndex((prevIndex) => Math.max(prevIndex - 2, 0))
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
          <button onClick={() => filterAlumnosByDay('Lunes')} className="bg-white text-black text-lg rounded-3xl mx-auto h-8 w-[30%] mb-6">
            Lunes
          </button>
          <button onClick={() => filterAlumnosByDay('Martes')} className="bg-white text-black text-lg rounded-3xl mx-auto h-8 w-[30%] mb-6">
            Martes
          </button>
          <button onClick={() => filterAlumnosByDay('Miércoles')} className="bg-white text-black text-lg rounded-3xl mx-auto h-8 w-[30%] mb-6">
            Miércoles
          </button>
          <button onClick={() => filterAlumnosByDay('Jueves')} className="bg-white text-black text-lg rounded-3xl mx-auto h-8 w-[30%] mb-6">
            Jueves
          </button>
          <button onClick={() => filterAlumnosByDay('Viernes')} className="bg-white text-black text-lg rounded-3xl mx-auto h-8 w-[30%]">
            Viernes
          </button>
        </div>
          )}
      {selectedDay && (
        <div className="overflow-x-auto">
          <div className="flex justify-center mb-2">
            <button className='mr-6' onClick={handlePrev}>Prev</button>
            <button className='ml-6' onClick={handleNext}>Next</button>
          </div>
          <table className="mx-auto border-collapse border border-white">
            <thead>
              <tr>
                <th className="border border-white"></th>
                {profesores.slice(startIndex, startIndex + 2).map((profesor) => (
                  <th key={profesor.id} className="border border-white">
                    {profesor.Nombre}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody >{renderTimeSlots()}</tbody>
          </table>
        </div>
      )}
    </div>
  )
}

export default Agenda
