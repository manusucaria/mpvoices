'use client'
import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '../../lib/auth'
import { logOut } from '../../lib/firebase-utils'
import Buscador from './sections/Buscador.js'
import Agenda from './sections/Agenda.js'
import Alta from './sections/Alta'
import Menu from './components/Menu'

const page = () => {
  const user = useAuth()
  const [cambios, setCambios] = useState()
  const router = useRouter()

  useEffect(() => {
    if (user === null) {
      router.push('/login')
    } if (user) {
      if (user.displayName !== 'Administrador') {
        router.push('/login')
      }
    }
  }, [router])

  const handleLogout = () => {
    logOut().then(() => {
      router.push('/')
    }).catch((error) => {
      console.error('Error al cerrar sesión:', error)
    })
  }

  const newCambio = (cambio) => {
    setCambios(cambio)
  }

  return (
    <div className='flex flex-col xl:border-y-1 xl:border-y-[#FFFFFF]'>
      {user
        ? <div className='xl:grid xl:grid-cols-9'>
            <div className='hidden xl:flex xl:flex-col col-start-1 col-end-2'>
              <Menu handleLogOut={handleLogout} />
            </div>
            <div className='xl:col-start-2 xl:col-end-9 flex flex-col xl:border-l-1 xl:border-l-[#FFFFFF]'>
              <h1 className='text-center text-[#FFFFFF] text-3xl sm:text-5xl mt-6 mb-12'>¡Bienvenido Administrador!</h1>
              <Agenda cambios={cambios} />
              <Buscador newCambio={newCambio} cambios={cambios} />
              <Alta newCambio={newCambio} cambios={cambios} />
              <button className='bg-[#FFFFFF] text-[#E9500E] md:text-[#0D0D0D] md:hover:text-[#E9500E] border-2 border-[#E9500E] mx-auto mt-12 font-botones font-bold p-2 my-6 lg:mb-12 w-4/6 sm:w-2/6 h-10 text-center rounded-3xl hover:cursor-pointer' onClick={handleLogout}>
                <p>Cerrar Sesión</p>
              </button>
            </div>
          </div>
        : ''}
    </div>
  )
}

export default page
