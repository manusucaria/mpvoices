'use client'

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { signOut } from 'firebase/auth'

import { getAlumnoByEmail } from '../api/api.js'
import { useAuth } from '../../lib/auth'
import { auth } from '../../lib/firebase.js'

const page = () => {
  const user = useAuth()
  const [alumno, setAlumno] = useState(null)
  const router = useRouter()

  useEffect(() => {
    (async () => {
      if (user === null) router.push('/login')
      if (user) {
        const dataAlumno = await getAlumnoByEmail({ email: user.email })
        if (dataAlumno === null) router.push('/login')
        setAlumno(dataAlumno)
        if (user.displayName !== 'Alumno') router.push('/login')
      }
    })()
  }, [user, router])

  const handleLogout = () => {
    signOut(auth).then(() => {
      router.push('/')
    })
  }

  return (
    <div className="flex">
      {alumno && (
        <div className="flex flex-col mx-auto">
          <h1 className="text-center text-white text-3xl sm:text-5xl">
            Plataforma Alumnos
          </h1>
          <div key={alumno.id} className="flex flex-col mx-auto my-8">
            <div className="flex flex-col mx-auto px-3 py-2 items-center">
              <p className="text-white font-botones font-bold text-center text-sm mb-2">
                Nombre: {alumno.Nombre}
              </p>
              <p className="text-white font-botones font-bold text-center text-sm mb-2">
                Apellido: {alumno.Apellido}
              </p>
              <p className="text-white font-botones font-bold text-center text-sm mb-2">
                Edad: {alumno.Edad}
              </p>
              <p className="text-white font-botones font-bold text-center text-sm mb-2">
                Profesor: {alumno.Profesor}
              </p>
              <p className="text-white font-botones font-bold text-center text-sm mb-2">
                Dia: {alumno.Dia}
              </p>
              <p className="text-white font-botones font-bold text-center text-sm mb-2">
                Horario: {alumno.Horario}
              </p>
              <p className="text-white font-botones font-bold text-center text-sm mb-2">
                Duración de Clase: {alumno.Duracion} minutos
              </p>
              <p className="text-white font-botones font-bold text-center text-sm mb-2">
                Instrumento: {alumno.Instrumento}
              </p>
              <p className="text-white font-botones font-bold text-center text-sm mb-2">
                Deuda: {alumno.Deuda}
              </p>
            </div>
            <div
              className="mx-auto border p-2 my-6 border-white w-auto h-auto rounded-3xl"
              onClick={handleLogout}
            >
              <p>Cerrar Sesión</p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default page
