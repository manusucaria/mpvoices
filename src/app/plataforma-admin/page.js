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
    <div className='flex flex-col xl:border-b-1 xl:border-b-[#FFFFFF]'>
      {user
        ? <div className='xl:grid xl:grid-cols-9'>
            <div className='hidden xl:flex xl:flex-col col-start-1 col-end-2'>
              <Menu handleLogOut={handleSubmit} />
            </div>
            <div className='xl:col-start-2 xl:col-end-9 flex flex-col xl:border-l-1 xl:border-l-[#FFFFFF]'>
              <h1 className='text-center text-[#FFFFFF] text-3xl sm:text-5xl mt-8 mb-12'>¡Hola Administrador/a!</h1>
              <Agenda cambios={cambios} />
              <Buscador newCambio={newCambio} cambios={cambios} />
              <Alta newCambio={newCambio} cambios={cambios} />
              <div className='bg-[#212121] flex w-full py-16'>
                <button className='bg-[#FFFFFF] mx-auto text-[#0D0D0D] md:hover:text-[#A33100] border-2 border-[#A33100] font-botones font-bold p-2 my-12 lg:mb-12 w-4/6 sm:w-2/6 h-12 sm:h-10 text-center rounded-3xl hover:cursor-pointer' onClick={handleSubmit}>
                  <p>Cerrar sesión</p>
                </button>
              </div>
            </div>
          </div>
        : ''}
        {showConfirmation && (
          <div className='fixed top-0 left-0 w-full h-full flex justify-center items-center px-3 z-50'>
            <div className='bg-[#FFFFFF] p-12 rounded-lg text-center flex flex-col'>
              <p className='text-[#0D0D0D] font-bold text-xl mb-4'>
                ¿Está seguro de que desea cerrar sesión?
              </p>
              <div className='flex mx-auto gap-x-16'>
                <button
                  className='text-[#A33100] md:hover:text-[#F57B48] font-bold'
                  onClick={handleLogout}
                >
                  Si
                </button>
                <button
                  className='text-[#A33100] md:hover:text-[#F57B48] font-bold'
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
