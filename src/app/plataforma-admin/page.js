'use client'
import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '../../lib/auth'
import { signOut } from 'firebase/auth'
import { auth } from '../../lib/firebase.js'
import Buscador from './sections/Buscador.js'
import Agenda from './sections/Agenda.js'
import Alta from './sections/Alta'

const page = () => {
  const user = useAuth()
  const [userLoaded, setUserLoaded] = useState(false)
  const router = useRouter()

  useEffect(() => {
    if (user) {
      setUserLoaded(true)
      if (user.displayName !== 'Administrador') {
        // No necesitas setUserLoaded(false) aquí
        router.push('/login')
      }
    } else if (user === null && !userLoaded) {
      setUserLoaded(false)
      router.push('/login')
    }
  }, [router, userLoaded])

  const handleLogout = () => {
    signOut(auth).then(() => {
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
            <Alta />
            <div className='mx-auto bg-white text-black p-2 my-6 w-4/6 sm:w-2/6 h-auto text-center rounded-3xl hover:cursor-pointer' onClick={handleLogout}>
              <p>Cerrar Sesión</p>
            </div>
          </div>
        : ''}
    </div>
  )
}

export default page
