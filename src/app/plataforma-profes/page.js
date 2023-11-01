'use client'
import React, { useState, useEffect } from 'react'
import { getProfesores, getAlumnos } from '../api/api.js'
import { useRouter } from 'next/navigation'

const page = () => {
  const [profesor, setProfesor] = useState([])
  const [alumnos, setAlumnos] = useState([])
  const router = useRouter()

  useEffect(() => {
    const email = localStorage.getItem('userEmail')

    getProfesores().then(data => {
      const profesoresFiltrados = data.filter(profesor => profesor.Email === email)
      if (profesoresFiltrados.length > 0) {
        const profe = profesoresFiltrados[0]
        setProfesor(profe)
      }
    })

    if (!email) {
      router.push('./login')
    }
  }, [router])

  useEffect(() => {
    getAlumnos().then(data => {
      setAlumnos(data)
    })
  }, [])
  return (
    <div className='flex'>
      {profesor
        ? <div>
          {alumnos.filter(alumno => alumno.Profesor === profesor.Nombre).map((alumno) => (
            <div key={alumno.id} className="flex flex-col rounded-xl shadow-lg bg-amber-50 w-64 h-64 mx-2 my-2">
              <div className="flex flex-col mx-auto px-3 py-2 items-center">
                <p className="text-white font-botones font-bold text-center text-sm mb-2">{alumno.Nombre}</p>
                <p className="text-white font-botones font-bold text-center text-sm mb-2">{alumno.Apellido}</p>
                <p className="text-white font-botones font-bold text-center text-sm mb-2">{alumno.Edad}</p>
                <p className="text-white font-botones font-bold text-center text-sm mb-2">{alumno.Profesor}</p>
                <p className="text-white font-botones font-bold text-center text-sm mb-2">{alumno.DIa}</p>
                <p className="text-white font-botones font-bold text-center text-sm mb-2">{alumno.Horario}</p>
                <p className="text-white font-botones font-bold text-center text-sm mb-2">{alumno.Duracion}</p>
                <p className="text-white font-botones font-bold text-center text-sm mb-2">{alumno.Instrumento}</p>
                <p className="text-white font-botones font-bold text-center text-sm mb-2">{alumno.Deuda}</p>
              </div>
            </div>
          ))}
        </div>
        : ''}
      <p className='text-white mx-auto mt-16'>Plataforma Profes</p>
    </div>
  )
}

export default page
