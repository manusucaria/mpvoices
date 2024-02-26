'use client'
import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '../../lib/auth'
import Buscador from './sections/Buscador.js'
import Agenda from './sections/Agenda.js'
import Alta from './sections/Alta'
import Menu from './components/Menu'
import { signOut } from 'firebase/auth'
import { auth } from '../../lib/firebase.js'

const page = () => {
  const user = useAuth()
  const [cambios, setCambios] = useState()
  const router = useRouter()
  const [showConfirmation, setShowConfirmation] = useState(false)

  useEffect(() => {
    if (user === null) {
      router.push('/login')
    } if (user) {
      if (user.displayName !== 'Administrador') {
        router.push('/login')
      }
    }
  }, [router])

  const handleSubmit = () => {
    setShowConfirmation(true)
  }

  const handleLogout = () => {
    signOut(auth).then(() => {
      router.push('/')
    })
  }

  const newCambio = (cambio) => {
    setCambios(cambio)
  }

  const handleCloseConfirmation = () => {
    setShowConfirmation(false)
  }

  return (
    <div className='flex flex-col xl:border-y-1 xl:border-y-[#FFFFFF]'>
      {user
        ? <div className='xl:grid xl:grid-cols-9'>
            <div className='hidden xl:flex xl:flex-col col-start-1 col-end-2'>
              <Menu handleLogOut={handleLogout} />
            </div>
            <div className='xl:col-start-2 xl:col-end-9 flex flex-col xl:border-l-1 xl:border-l-[#FFFFFF]'>
              <h1 className='text-center text-[#FFFFFF] text-3xl sm:text-5xl mt-6 mb-12'>¡Hola Administrador/a!</h1>
              <Agenda cambios={cambios} />
              <Buscador newCambio={newCambio} cambios={cambios} />
              <Alta newCambio={newCambio} cambios={cambios} />
              <button className='bg-[#FFFFFF] text-[#E9500E] md:text-[#0D0D0D] md:hover:text-[#E9500E] border-2 border-[#E9500E] mx-auto mt-12 font-botones font-bold p-2 my-6 lg:mb-12 w-4/6 sm:w-2/6 h-10 text-center rounded-3xl hover:cursor-pointer' onClick={handleSubmit}>
                <p>Cerrar sesión</p>
              </button>
            </div>
          </div>
        : ''}
        {showConfirmation && (
          <div className='fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray-800 bg-opacity-50 z-50'>
            <div className='bg-[#FFFFFF] p-12 rounded-lg text-center flex flex-col'>
              <p className='text-[#0D0D0D] text-xl mb-4'>
                ¿Está seguro de que desea cerrar sesión?
              </p>
              <div className='flex mx-auto gap-x-16'>
                <button
                  className='text-[#E9500E] md:hover:text-[#DB9B6D]'
                  onClick={handleLogout}
                >
                  Si
                </button>
                <button
                  className='text-[#E9500E] md:hover:text-[#DB9B6D]'
                  onClick={handleCloseConfirmation}
                >
                  No
                </button>
              </div>
            </div>
          </div>
        )}
    </div>
  )
}

export default page
