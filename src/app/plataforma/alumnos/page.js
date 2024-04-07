'use client'

import React, { useEffect, useState } from 'react'

import { signOut } from 'firebase/auth'

import { playfair600 } from '@/utils/fonts/fonts'

import { useAuth } from '@/lib/firebase/useAuth'
import { getAlumnoById } from '@/lib/firebase/crud/read'

import Loader from '@/app/components/loader/Loader'
import Button from '@/app/components/button/Button'
import CardContainer from './components/CardContainer'

const page = () => {
  const user = useAuth()

  const [alumno, setAlumno] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    (async () => {
      setLoading(true)
      try {
        if (user) {
          const dataAlumno =
            user?.uid &&
            (await getAlumnoById(user?.uid, {
              getUsuario: true,
              getProfesor: true
            }))
          if (!dataAlumno) {
            await signOut()
            window.location.reload()
          }
          setAlumno(dataAlumno)
          setLoading(false)
        }
      } catch (error) {
        await signOut()
        window.location.reload()
      }
    })()
  }, [user])

  if (loading) return <Loader />

  return (
    <div className="w-full h-full flex flex-col items-center">
      <div className="w-full py-10 text-center flex items-center justify-center">
        <h2 className={`text-2xl sm:text-3xl ${playfair600.className}`}>
          Inicio | Días y horarios
        </h2>
      </div>
      <CardContainer
        title="Clases"
        warning
        bottom
        button={
          <Button
            text="Cancelar clase"
            path="/plataforma/alumnos/clases/cancelar"
          />
        }
      >
        <p className="w-full">Instrumento: {alumno.instrumento}</p>
        <p className="w-full">Días: {alumno.clases.dia}</p>
        <p className="w-full">Horario: {alumno.clases.hora_inicio} hs</p>
        <p className="w-full">Duración: {alumno.clases.duracion} minutos</p>
        <p className="w-full">
          Profesor: {alumno.profesor.usuario.full_name.nombre}
        </p>
      </CardContainer>
    </div>
  )
}
export default page
