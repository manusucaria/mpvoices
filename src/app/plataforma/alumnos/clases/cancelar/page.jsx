'use client'

import React, { useEffect, useState } from 'react'

import { playfair600 } from '@/utils/fonts/fonts'

import { getAlumnoById } from '@/lib/firebase/crud/read'
import { useAuth } from '@/lib/firebase/useAuth'
import { signOut } from '@/lib/firebase/auth'

import Button from '@/app/components/button/Button'
import Loader from '@/app/components/loader/Loader'

import CardContainer from '../../components/CardContainer'
import ButtonReturn from '../../components/ButtonReturn'
import Calendario from '../../components/Calendario'

const page = () => {
  const user = useAuth()

  const [alumno, setAlumno] = useState(null)
  const [highlightedDays, setHighlightedDays] = useState([])
  const [loading, setLoading] = useState(true)

  const [selectedDate, setSelectedDate] = useState(null) // Estado para almacenar la fecha seleccionada

  const getDaysInMonth = ({ month, year, dayOfWeek }) => {
    const days = []
    const daysOfWeek = [
      'domingo',
      'lunes',
      'martes',
      'miércoles',
      'jueves',
      'viernes',
      'sábado'
    ]
    const dayOfWeekNumber = daysOfWeek.indexOf(dayOfWeek.toLowerCase())

    const date = new Date(year, month, 1)
    while (date.getMonth() === month) {
      if (date.getDay() === dayOfWeekNumber) {
        days.push(date.getDate())
      }
      date.setDate(date.getDate() + 1)
    }
    return days
  }

  useEffect(() => {
    (async () => {
      try {
        if (user) {
          const dataAlumno =
            user?.uid && (await getAlumnoById(user.uid, { getUsuario: true }))
          if (!dataAlumno) {
            await signOut()
            window.location.reload()
          }
          const days = getDaysInMonth({
            month: new Date().getMonth(),
            year: new Date().getFullYear(),
            dayOfWeek: dataAlumno.clases.dia
          })
          setHighlightedDays(days)
          setAlumno(dataAlumno)
          setLoading(false)
        }
      } catch (error) {
        await signOut()
        window.location.reload()
      }
    })()
  }, [user])

  const handleCancelarClase = () => {
    console.log('cancelar clase')
    console.log(selectedDate)
  }

  if (loading) return <Loader />

  return (
    <div className="w-full h-full flex flex-col items-center">
      <div className="w-full py-10 text-center flex items-center justify-center relative">
        <ButtonReturn />
        <h2 className={`text-xl sm:text-2xl ${playfair600.className}`}>
          Cancelar clase
        </h2>
      </div>
      <CardContainer
        title="Seleccionar clase a cancelar"
        warning
        top
        button={
          <Button
            text={selectedDate ? 'Cancelar clase' : 'Seleccionar fecha'}
            mode={!selectedDate ? 'disabled' : ''}
            onClick={handleCancelarClase}
            disabled={!selectedDate}
            hasACallback
          />
        }
      >
        <Calendario
          highlightedDays={highlightedDays}
          clases={alumno.clases}
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
        />
      </CardContainer>
    </div>
  )
}
export default page
