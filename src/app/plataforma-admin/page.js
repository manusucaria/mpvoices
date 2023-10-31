'use client'
import React, { useState, useEffect } from 'react'
import { getAlumnos } from '../api/api.js'
import { useRouter } from 'next/navigation'

const page = () => {
  const [alumnos, setAlumnos] = useState([])
  const [userEmail, setUserEmail] = useState('')
  const [userPassword, setUserPassword] = useState('')
  const router = useRouter()

  useEffect(() => {
    const email = localStorage.getItem('userEmail')
    const password = localStorage.getItem('userPassword')

    if (!email || !password) {
      router.push('./login')
    } else {
      setUserEmail(email)
      setUserPassword(password)
    }
  }, [router])

  useEffect(() => {
    getAlumnos().then(data => {
      setAlumnos(data)
    })
  }, [])
  return (
    <div className='flex'>
      {alumnos.length >= 1
        ? <div>
          {alumnos.map((alumno) => (
            <div key={alumno.nombre} className="flex flex-col rounded-xl shadow-lg bg-amber-50 w-64 h-64 mx-2 my-2">
              <div className="flex flex-col mx-auto px-3 py-2 items-center">
                <p className="text-white font-botones font-bold text-center text-sm mb-2">Correo Electrónico: {userEmail}</p>
                <p className="text-white font-botones font-bold text-center text-sm mb-2">Contraseña: {userPassword}</p>
                <p className="text-white font-botones font-bold text-center text-sm mb-2">{alumno.edad}</p>
                <p className="text-white font-botones font-bold text-center text-sm mb-2">{alumno.usuario}</p>
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
