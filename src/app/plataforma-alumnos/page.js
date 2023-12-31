'use client'
import React, { useState, useEffect } from 'react'
import { getAlumnos } from '../api/api.js'
import { useRouter } from 'next/navigation'
import { useAuth } from '../../lib/auth'
import { signOut } from 'firebase/auth'
import { auth } from '../../lib/firebase.js'

const page = () => {
  const user = useAuth()
  const [alumnos, setAlumnos] = useState([])
  const [usuario, setUsuario] = useState('')
  const [userEmail, setUserEmail] = useState('')
  const [userLoaded, setUserLoaded] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const userType = localStorage.getItem('usuario')
    setUsuario(userType)
    if (user) {
      setUserEmail(user.email)
      getAlumnos().then(data => {
        setAlumnos(data)
      })
      setUserLoaded(true)
      if (usuario !== 'alumno') {
        setUserLoaded(false)
        router.push('/login')
      }
    } else if (user === null && !userLoaded) {
      router.push('/login')
    }
  }, [user, router, userLoaded])

  const handleLogout = () => {
    signOut(auth).then(() => {
      localStorage.removeItem('usuario')
      router.push('/')
    })
  }
  return (
    <div className='flex'>
      {alumnos.length >= 1
        ? <div className='flex flex-col mx-auto'>
            <h1 className='text-center text-white text-3xl sm:text-5xl'>Plataforma Alumnos</h1>
            {alumnos.filter(alumno => alumno.Email === userEmail).map((alumno) => (
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
                <div className='mx-auto border p-2 my-6 border-white w-auto h-auto rounded-3xl' onClick={handleLogout}>
                  <p>Cerrar Sesión</p>
                </div>
              </div>
            ))}
        </div>
        : ''}
    </div>
  )
}

export default page
