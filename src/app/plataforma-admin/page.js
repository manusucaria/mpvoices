'use client'
import React, { useState, useEffect } from 'react'
import { getAlumnos } from '../api/api.js'
import { useRouter } from 'next/navigation'
import { useAuth } from '../../lib/auth'

const page = () => {
  const user = useAuth()
  const [alumnos, setAlumnos] = useState([])
  const [userLoaded, setUserLoaded] = useState(false)
  const router = useRouter()

  useEffect(() => {
    if (user) {
      getAlumnos().then(data => {
        setAlumnos(data)
      })
    } else if (user === null && !userLoaded) {
      router.push('/login')
    }
    setUserLoaded(true)
  }, [user, router, userLoaded])
  return (
    <div className='flex'>
      {alumnos.length >= 1
        ? <div>
          {alumnos.map((alumno) => (
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
      <p className='text-white mx-auto mt-16'>Plataforma Admin</p>
    </div>
  )
}

export default page
