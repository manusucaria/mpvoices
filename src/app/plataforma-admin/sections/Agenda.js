import React, { useState, useEffect } from 'react'
import { getAlumnos, getProfesores } from '../../api/api.js'

const Agenda = () => {
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
  }, [selectedDay])

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

  const calcularNuevoHorario = (horario, duracion) => {
    const [hora, minuto] = horario.split(':').map(Number)
    const duracionMinutos = duracion / 15 * 15
    const nuevoHorarioMinutos = hora * 60 + minuto + duracionMinutos
    const nuevaHora = Math.floor(nuevoHorarioMinutos / 60)
    const nuevoMinuto = nuevoHorarioMinutos % 60
    return `${nuevaHora}:${nuevoMinuto < 10 ? '0' : ''}${nuevoMinuto}`
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
          <div className='grid grid-cols-[20%_40%_40%] grid-rows-37'>
            <div className=" bg-navy-blue border h-10 border-white text-center col-start-1 col-end-2 row-start-1 row-end-2 flex">
              <p className='m-auto'>Profe</p>
            </div>
            {timeSlots.map((time, index) => (
              <div key={index} className='border border-white text-center col-start-1 col-end-2 bg-navy-blue flex h-10'>
                <p className='m-auto'>{time}</p>
              </div>
            ))}
            <div className="col-start-2 col-end-4 row-start-1 row-end-38 grid grid-cols-2 bg-orange-300">
              {filteredProfesoresSorted.slice(startIndex, startIndex + 2).map((profesor) => (
              <div key={profesor.id} className="grid grid-cols-1 grid-rows-37 border border-white text-center">
                <div className='flex row-start-1 row-end-2 h-10 text-sm border border-b-white bg-orange-600'>
                  <p className='m-auto'>{profesor.Nombre}</p>
                </div>
                {filteredAlumnos
                  .filter((alumno) => alumno.Profesor === profesor.Nombre)
                  .map((alumno) => (
                    <div
                      key={`${alumno.Nombre}`}
                      className="flex flex-col h-full text-center bg-navy-blue p-2 border border-white"
                      style={{
                        gridColumn: filteredProfesoresSorted.findIndex((p) => p.Nombre === profesor.Nombre) - startIndex,
                        gridRowStart: timeSlots.indexOf(alumno.Horario) + 2,
                        gridRowEnd: timeSlots.indexOf(alumno.Horario) + 2 + alumno.Duracion / 15
                      }}
                    >
                      <p className='text-base mt-auto'>{alumno.Nombre} {alumno.Apellido}</p>
                      <p className='text-base mb-auto'>{alumno.Instrumento} {alumno.Horario}-{calcularNuevoHorario(alumno.Horario, alumno.Duracion)}</p>
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
