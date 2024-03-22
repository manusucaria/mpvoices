'use client'
import React, { useEffect, useState } from 'react'
import Buscador from './sections/Buscador.js'
import Agenda from './sections/Agenda.js'
import Alta from './sections/Alta'
import Menu from './components/Menu'
import { useAuth } from '@/lib/firebase/useAuth.js'
import { signOut } from '@/lib/firebase/auth.js'
import Loader from '@/app/components/loader/Loader.jsx'

const page = () => {
  const user = useAuth()

  const [loading, setLoading] = useState(true)
  const [cambios, setCambios] = useState()
  const [showConfirmation, setShowConfirmation] = useState(false)

  useEffect(() => {
    if (user) {
      setLoading(false)
    }
    return () => {
      setLoading(false)
    }
  }, [user])

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

  if (loading) return <Loader />

  return (
    <div className="flex flex-col xl:border-b-1 xl:border-b-white">
        <div className="xl:grid xl:grid-cols-9">
          <div className="hidden xl:flex xl:flex-col col-start-1 col-end-2">
            <Menu handleLogOut={handleSubmit} />
          </div>
          <div className="xl:col-start-2 xl:col-end-9 flex flex-col xl:border-l-1 xl:border-l-white">
            <h1 className="text-center text-white text-3xl sm:text-5xl mt-8 mb-4">
              ¡Hola Administrador!
            </h1>
            <h2 className='text-center text-white mb-12 text-xl sm:text-2xl px-4'>Te damos la bienvenida a la Plataforma Voices</h2>
            <Agenda cambios={cambios} />
            <Buscador newCambio={newCambio} cambios={cambios} />
            <Alta newCambio={newCambio} cambios={cambios} />
            <div className="bg-black-light flex w-full py-16">
              <button
                className="bg-white mx-auto text-black md:hover:text-orange-600 border-2 border-orange-600 font-botones font-bold p-2 my-12 lg:mb-12 w-4/6 sm:w-2/6 h-12 sm:h-10 text-center rounded-3xl hover:cursor-pointer"
                onClick={handleSubmit}
              >
                <p>Cerrar sesión</p>
              </button>
            </div>
          </div>
        </div>
      {showConfirmation && (
        <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray-800 bg-opacity-50 z-50">
          <div className="bg-white p-12 rounded-lg text-center flex flex-col">
            <p className="text-black font-bold text-xl mb-4">
              ¿Seguro querés cerrar sesión?
            </p>
            <div className="flex mx-auto gap-x-16">
              <button
                className="text-orange-600 font-bold md:hover:text-orange-300"
                onClick={handleLogout}
              >
                Si
              </button>
              <button
                className="text-orange-600 font-bold md:hover:text-orange-300"
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
