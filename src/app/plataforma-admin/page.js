'use client'
import React, { useState, useEffect } from 'react'
import { getAlumnos, getProfesores } from '../api/api.js'
import { useRouter } from 'next/navigation'
import { useAuth } from '../../lib/auth'
import { signOut } from 'firebase/auth'
import { auth } from '../../lib/firebase.js'

const page = () => {
  const user = useAuth()
  const [alumnos, setAlumnos] = useState([])
  const [profesores, setProfesores] = useState([])
  const [usuario, setUsuario] = useState('')
  const [userLoaded, setUserLoaded] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const userType = localStorage.getItem('usuario')
    setUsuario(userType)
    if (user) {
      getAlumnos().then(data => {
        setAlumnos(data)
      })
      getProfesores().then(data => {
        setProfesores(data)
      })
      setUserLoaded(true)
    } else if (user === null && !userLoaded && usuario !== 'admin') {
      setUserLoaded(false)
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
    <div className='flex flex-col'>
      <h1 className='text-center text-white text-3xl sm:text-5xl mt-6 mb-12'>Plataforma Administración</h1>
      <h2 className='text-center text-3xl sm:text-5xl mb-4 text-white'>Alumnos</h2>
      {alumnos.length >= 1
        ? <div className='flex flex-col mx-auto'>
            {alumnos.map((alumno) => (
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
        : ''}
      <h2 className='text-center text-3xl sm:text-5xl mt-8 mb-4 text-white'>Profesores</h2>
      {profesores.length >= 1
        ? <div className='flex flex-col mx-auto'>
            {profesores.map((profe) => (
              <div key={profe.id} className="flex flex-col mx-auto my-8">
                <div className="flex flex-col mx-auto px-3 py-2 items-center">
                  <p className="text-white font-botones font-bold text-center text-sm mb-2">Nombre: {profe.Nombre}</p>
                  <p className="text-white font-botones font-bold text-center text-sm mb-2">Apellido: {profe.Apellido}</p>
                  <p className="text-white font-botones font-bold text-center text-sm mb-2">Edad: {profe.Edad}</p>
                  <p className="text-white font-botones font-bold text-center text-sm mb-2">Instrumento: {profe.Instrumento}</p>
                </div>
              </div>
            ))}
        </div>
        : ''}
      <div className='mx-auto border p-2 my-6 border-white w-auto h-auto rounded-3xl' onClick={handleLogout}>
        <p>Cerrar Sesión</p>
      </div>
    </div>
  )
}

export default page
