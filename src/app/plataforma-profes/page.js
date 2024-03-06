'use client'
import React, { useState, useEffect } from 'react'
import { getProfesores } from '../api/api.js'
import { useRouter } from 'next/navigation'
import { useAuth } from '../../lib/auth'
import { signOut } from 'firebase/auth'
import { auth } from '../../lib/firebase.js'
import Agenda from './components/Agenda.js'

const Page = () => {
  const user = useAuth()
  const [profesor, setProfesor] = useState({})
  const [availableDays, setAvailableDays] = useState()
  const router = useRouter()
  const [showConfirmation, setShowConfirmation] = useState(false)

  useEffect(() => {
    if (user === null) {
      router.push('/login')
    } else if (user) {
      getProfesores().then((data) => {
        const profesoresFiltrados = data.filter(
          (profesor) => profesor.Email === user.email
        )
        if (profesoresFiltrados.length > 0) {
          const profe = profesoresFiltrados[0]
          setProfesor(profe)
          const daysString = profe.Dia
          const daysArray = daysString.split(/[,\s]*[,y]\s*/)
          setAvailableDays(daysArray)
        }
      })
      if (user.displayName !== 'Profesor') {
        router.push('/login')
      }
    }
  }, [user, router])

  const handleSubmit = () => {
    setShowConfirmation(true)
  }

  const handleLogout = () => {
    signOut(auth).then(() => {
      router.push('/')
    })
  }

  const handleCloseConfirmation = () => {
    setShowConfirmation(false)
  }

  return (
    <div id="Agenda" className="flex flex-col">
      {profesor && Object.keys(profesor).length > 0
        ? (
        <div className="flex flex-col">
          <h1 className="text-center text-[#FFFFFF] text-3xl sm:text-5xl mt-8 mb-12">
            ¡Hola {profesor.Nombre}!
          </h1>
          <Agenda availableDays={availableDays} profesor={profesor} />
          <div className='bg-[#212121] flex w-full py-16'>
            <button className='bg-[#FFFFFF] mx-auto text-[#0D0D0D] md:hover:text-[#E9500E] border-2 border-[#E9500E] font-botones font-bold p-2 my-12 lg:mb-12 w-4/6 sm:w-2/6 h-12 sm:h-10 text-center rounded-3xl hover:cursor-pointer' onClick={handleSubmit}>
              <p>Cerrar sesión</p>
            </button>
          </div>
        </div>
          )
        : (
            ''
          )}
        {showConfirmation && (
          <div className='fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray-800 bg-opacity-50 z-50'>
            <div className='bg-[#FFFFFF] p-12 rounded-lg text-center flex flex-col'>
              <p className='text-[#0D0D0D] font-bold text-xl mb-4'>
                ¿Está seguro de que desea cerrar sesión?
              </p>
              <div className='flex mx-auto gap-x-16'>
                <button
                  className='text-[#E9500E] font-bold md:hover:text-[#DB9B6D]'
                  onClick={handleLogout}
                >
                  Si
                </button>
                <button
                  className='text-[#E9500E] font-bold md:hover:text-[#DB9B6D]'
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
