'use client'
import React, { useState } from 'react'

import Buscador from './sections/Buscador.js'
import Agenda from './sections/Agenda.js'
import Alta from './sections/Alta'

import Menu from './components/Menu'

import { useAuth } from '@/lib/firebase/useAuth.js'
import { signOut } from '@/lib/firebase/auth.js'

const page = () => {
  const user = useAuth()
  const [cambios, setCambios] = useState()
  const [showConfirmation, setShowConfirmation] = useState(false)

  const handleSubmit = () => {
    setShowConfirmation(true)
  }

  const handleLogout = async () => {
    await signOut()
    window.location.reload()
  }

  const newCambio = (cambio) => {
    setCambios(cambio)
  }

  const handleCloseConfirmation = () => {
    setShowConfirmation(false)
  }

  return (
    <div className="flex flex-col xl:border-b-1 xl:border-b-white">
      {user
        ? (
        <div className="xl:grid xl:grid-cols-9">
          <div className="hidden xl:flex xl:flex-col col-start-1 col-end-2">
            <Menu handleLogOut={handleSubmit} />
          </div>
          <div className="xl:col-start-2 xl:col-end-9 flex flex-col xl:border-l-1 xl:border-l-white">
            <h1 className="text-center text-white text-3xl sm:text-5xl mt-8 mb-12">
              ¡Hola Administrador/a!
            </h1>
            <Agenda cambios={cambios} />
            <Buscador newCambio={newCambio} cambios={cambios} />
            <Alta newCambio={newCambio} cambios={cambios} />
            <div className="bg-[#212121] flex w-full py-16">
              <button
                className="bg-[#FFFFFF] mx-auto text-[#0D0D0D] md:hover:text-[#E9500E] border-2 border-[#E9500E] font-botones font-bold p-2 my-12 lg:mb-12 w-4/6 sm:w-2/6 h-12 sm:h-10 text-center rounded-3xl hover:cursor-pointer"
                onClick={handleSubmit}
              >
                <p>Cerrar sesión</p>
              </button>
            </div>
          </div>
        </div>
          )
        : (
            ''
          )}
      {showConfirmation && (
        <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray-800 bg-opacity-50 z-50">
          <div className="bg-[#FFFFFF] p-12 rounded-lg text-center flex flex-col">
            <p className="text-[#0D0D0D] font-bold text-xl mb-4">
              ¿Está seguro de que desea cerrar sesión?
            </p>
            <div className="flex mx-auto gap-x-16">
              <button
                className="text-[#E9500E] font-bold md:hover:text-[#DB9B6D]"
                onClick={handleLogout}
              >
                Si
              </button>
              <button
                className="text-[#E9500E] font-bold md:hover:text-[#DB9B6D]"
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
