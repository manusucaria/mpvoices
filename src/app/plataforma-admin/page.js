'use client'
import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '../../lib/auth'
import { signOut } from 'firebase/auth'
import { auth } from '../../lib/firebase.js'
import Buscador from './components/Buscador.js'
import Agenda from './components/Agenda.js'

const page = () => {
  const user = useAuth()
  const [usuario, setUsuario] = useState('')
  const [userLoaded, setUserLoaded] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const userType = localStorage.getItem('usuario')
    setUsuario(userType)
    if (user) {
      setUserLoaded(true)
      if (usuario !== 'admin') {
        setUserLoaded(false)
        router.push('/login')
      }
    } else if (user === null && !userLoaded) {
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
      {user
        ? <div className='flex flex-col'>
        <h1 className='text-center text-white text-3xl sm:text-5xl mt-6 mb-12'>¡Bienvenido Administrador!</h1>
        <Agenda />
        <Buscador />
        <div className='mx-auto bg-white text-black p-2 my-6 w-4/6 sm:w-2/6 h-auto text-center rounded-3xl hover:cursor-pointer' onClick={handleLogout}>
          <p>Cerrar Sesión</p>
        </div>
      </div>
        : ''}
    </div>
  )
}

export default page
