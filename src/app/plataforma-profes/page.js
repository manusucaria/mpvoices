'use client'
import React, { useState, useEffect } from 'react'
import { getProfesores } from '../api/api.js'
import { useRouter } from 'next/navigation'
import { useAuth } from '../../lib/auth'
import { signOut } from 'firebase/auth'
import { auth } from '../../lib/firebase.js'
import AgendaProfe from './components/AgendaProfe.js'

const Page = () => {
  const user = useAuth()
  const [profesor, setProfesor] = useState([])
  const [availableDays, setAvailableDays] = useState([])
  const router = useRouter()

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
          const daysArray = daysString.split(/[,\s]*y\s*/)
          setAvailableDays(daysArray)
        }
      })
      if (user.displayName !== 'Profesor') {
        router.push('/login')
      }
    }
  }, [user, router])

  const handleLogout = () => {
    const confirmation = window.confirm('¿Estás seguro/a de que quieres cerrar sesión?')
    if (confirmation) {
      signOut(auth).then(() => {
        router.push('/')
      })
    }
  }

  return (
    <div id="Agenda" className="flex flex-col">
      {profesor && Object.keys(profesor).length > 0
        ? (
        <div className="flex flex-col">
          <h1 className="text-center text-[#FFFFFF] text-3xl sm:text-5xl mt-6 mb-12">
            ¡Bienvenido/a {profesor.Nombre} {profesor.Apelido}!
          </h1>
          <AgendaProfe availableDays={availableDays} profesor={profesor} />
          <button
            className="bg-[#FFFFFF] text-[#E9500E] md:text-[#0D0D0D] md:hover:text-[#E9500E] border-2 border-[#E9500E] mx-auto mt-12 font-botones font-bold p-2 my-6 lg:mb-12 w-4/6 sm:w-2/6 h-10 text-center rounded-3xl hover:cursor-pointer"
            onClick={handleLogout}
          >
            <p>Cerrar Sesión</p>
          </button>
        </div>
          )
        : (
            ''
          )}
    </div>
  )
}

export default Page
