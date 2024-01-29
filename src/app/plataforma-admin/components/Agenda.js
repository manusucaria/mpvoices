import React, { useState, useEffect } from 'react'
import { getAlumnos } from '../../api/api.js'
import { useAuth } from '../../../lib/auth'

const Agenda = () => {
  const user = useAuth()
  const [alumnos, setAlumnos] = useState([])
  const [selectedDay, setSelectedDay] = useState('')

  useEffect(() => {
    getAlumnos().then(data => {
      setAlumnos(data)
    })
  }, [user])

  const filterAlumnosByDay = (day) => {
    setSelectedDay(day)
  }

  const showAllDays = () => {
    setSelectedDay('')
  }

  // Filtrar alumnos solo si se ha seleccionado un día
  const filteredAlumnos = selectedDay ? alumnos.filter(alumno => alumno.Dia === selectedDay) : []

  return (
    <div className='flex flex-col'>
      <h2 className='text-center text-3xl sm:text-5xl mb-4 text-white'>Días y horarios</h2>
      {selectedDay
        ? (
        <div className="flex justify-center mb-4">
          <button onClick={() => showAllDays()} className='mr-2'>Volver Atrás</button>
          <p>│</p>
          <h3 className="text-white ml-2">{selectedDay}</h3>
        </div>
          )
        : (
        <div className="flex flex-col justify-center mb-4">
          <button onClick={() => filterAlumnosByDay('Lunes')} className='bg-white text-black text-lg rounded-3xl mx-auto h-8 w-[30%] mb-6'>Lunes</button>
          <button onClick={() => filterAlumnosByDay('Martes')} className='bg-white text-black text-lg rounded-3xl mx-auto h-8 w-[30%] mb-6'>Martes</button>
          <button onClick={() => filterAlumnosByDay('Miércoles')} className='bg-white text-black text-lg rounded-3xl mx-auto h-8 w-[30%] mb-6'>Miércoles</button>
          <button onClick={() => filterAlumnosByDay('Jueves')} className='bg-white text-black text-lg rounded-3xl mx-auto h-8 w-[30%] mb-6'>Jueves</button>
          <button onClick={() => filterAlumnosByDay('Viernes')} className='bg-white text-black text-lg rounded-3xl mx-auto h-8 w-[30%]'>Viernes</button>
        </div>
          )}
      {filteredAlumnos.length >= 1
        ? (
        <div className='flex flex-col mx-auto'>
          {filteredAlumnos.map((alumno) => (
            <div key={alumno.id} className="flex flex-col mx-auto my-8">
              <div className="flex flex-col mx-auto px-3 py-2 items-center">
                <p className="text-white font-botones font-bold text-center text-sm mb-2">Nombre: {alumno.Nombre}</p>
                <p className="text-white font-botones font-bold text-center text-sm mb-2">Apellido: {alumno.Apellido}</p>
                <p className="text-white font-botones font-bold text-center text-sm mb-2">Edad: {alumno.Edad}</p>
                <p className="text-white font-botones font-bold text-center text-sm mb-2">Profesor: {alumno.Profesor}</p>
                <p className="text-white font-botones font-bold text-center text-sm mb-2">Dia: {alumno.Dia}</p>
                <p className="text-white font-botones font-bold text-center text-sm mb-2">Horario: {alumno.Horario}</p>
                <p className="text-white font-botones font-bold text-center text-sm mb-2">Duración de Clase: {alumno.Duracion} minutos</p>
                <p className="text-white font-botones font-bold text-center text-sm mb-2">Instrumento: {alumno.Instrumento}</p>
                <p className="text-white font-botones font-bold text-center text-sm mb-2">Deuda: {alumno.Deuda}</p>
              </div>
            </div>
          ))}
        </div>
          )
        : (
            selectedDay && <p className="text-white text-center">No hay alumnos para este día.</p>
          )}
    </div>
  )
}

export default Agenda
