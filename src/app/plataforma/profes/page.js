'use client'
import React, { useState, useEffect } from 'react'
import { useAuth } from '@/lib/firebase/useAuth.js'
import { signOut } from '@/lib/firebase/auth'
import { getProfesorById } from '@/lib/firebase/crud/read'
import Loader from '@/app/components/loader/Loader'
import AgendaProfes from './components/AgendaProfes'

const Page = () => {
  const user = useAuth()
  const [loading, setLoading] = useState(true)
  const [profesor, setProfesor] = useState({})
  const [availableDays, setAvailableDays] = useState()
  const [showConfirmation, setShowConfirmation] = useState(false)

  useEffect(() => {
    (async () => {
      setLoading(true)
      const profeData =
        user?.uid && (await getProfesorById(user?.uid, { getUsuario: true }))
      setProfesor(profeData)
      const daysString = profeData?.dias
      const daysArray = daysString?.split(/[, \s]*[, y]\s*/)
      setAvailableDays(daysArray)
      setLoading(false)
    })()
  }, [user])

  const handleSubmit = () => {
    setShowConfirmation(true)
  }

  const handleLogout = async () => {
    await signOut()
    window.location.reload()
  }

  const handleCloseConfirmation = () => {
    setShowConfirmation(false)
  }

  if (loading) return <Loader />

  return (
    <div id="Agenda" className="flex flex-col">
      {user
        ? (
        <div className="flex flex-col">
          <h1 className="text-center text-white text-3xl sm:text-5xl mt-8 mb-4">
            ¡Hola {profesor?.usuario.full_name.nombre}!
          </h1>
          <h2 className='text-center text-white mb-12 text-[1.6rem] sm:text-4xl px-4'>Te damos la bienvenida a la Plataforma Voices</h2>
          <AgendaProfes availableDays={availableDays} profesor={profesor} />
          <div className="bg-black-light flex w-full py-16">
            <button
              className="bg-white mx-auto text-black md:hover:text-orange-600 border-2 border-orange-600 font-botones font-bold p-2 my-12 lg:mb-12 w-4/6 sm:w-2/6 h-12 sm:h-10 text-center rounded-3xl hover:cursor-pointer"
              onClick={handleSubmit}
            >
              <p>Cerrar sesión</p>
            </button>
          </div>
        </div>
          )
        : (
            ''
          )}
      {showConfirmation && (
        <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-80 z-50">
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

export default Page
