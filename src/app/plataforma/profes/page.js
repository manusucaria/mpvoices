'use client'
import React, { useState, useEffect } from 'react'

import { useAuth } from '@/lib/firebase/useAuth.js'
import { signOut } from '@/lib/firebase/auth'
import { getProfesores } from '@/app/api/api'
import Loader from '@/app/components/loader/Loader'

// import AgendaProfes from './components/AgendaProfes.js'

const Page = () => {
  const user = useAuth()

  const [loading, setLoading] = useState(true)
  const [profesor, setProfesor] = useState({})
  // const [availableDays, setAvailableDays] = useState()
  const [showConfirmation, setShowConfirmation] = useState(false)

  useEffect(() => {
    if (user) setLoading(false)

    return () => setLoading(false)
  }, [user])

  // useEffect(() => {
  //   getProfesores().then((data) => {
  //     const profesoresFiltrados = data.filter(
  //       (profesor) => profesor.Email === user.email
  //     )
  //     if (profesoresFiltrados.length > 0) {
  //       const profe = profesoresFiltrados[0]
  //       setProfesor(profe)
  //       const daysString = profe.Dia
  //       const daysArray = daysString.split(/[,\s]*[,y]\s*/)
  //       setAvailableDays(daysArray)
  //     }
  //   })
  // }, [user])

  useEffect(() => {
    (async () => {
      const profesores = await getProfesores()
      const profe = profesores.find((profe) => profe.id === user?.uid)
      setProfesor(profe)
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
          <h1 className="text-center text-[#FFFFFF] text-3xl sm:text-5xl mt-8 mb-12">
            {/* ¡Hola {profesor.Nombre}! */}
            ¡Hola!
          </h1>
          {/* <AgendaProfes availableDays={availableDays} profesor={profesor} /> */}
          <div className="bg-[#212121] flex w-full py-16">
            <button
              className="bg-[#FFFFFF] mx-auto text-[#0D0D0D] md:hover:text-[#E9500E] border-2 border-[#E9500E] font-botones font-bold p-2 my-12 lg:mb-12 w-4/6 sm:w-2/6 h-12 sm:h-10 text-center rounded-3xl hover:cursor-pointer"
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

export default Page
