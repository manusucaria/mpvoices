'use client'

import React, { useEffect, useState } from 'react'

import { playfair600 } from '@/utils/fonts/fonts'

import { getAlumnoById } from '@/lib/firebase/crud/read'
import { useAuth } from '@/lib/firebase/useAuth'
import { signOut } from '@/lib/firebase/auth'

import Loader from '@/app/components/loader/Loader'
import Button from '@/app/components/button/Button'
import Modal from '@/app/components/modal/Modal'

import ButtonReturn from '../../components/ButtonReturn'
import CardContainer from '../../components/CardContainer'

const page = () => {
  const user = useAuth()

  const [alumno, setAlumno] = useState(null)
  const [days, setDays] = useState([])
  const [selectedDay, setSelectedDay] = useState(null)
  const [showModal, setShowModal] = useState(false)
  const [loading, setLoading] = useState(true)

  const getFutureDaysInMonth = ({ month, year, daysOfWeek }) => {
    const days = []
    const daysOfWeekSpanish = [
      'domingo',
      'lunes',
      'martes',
      'miércoles',
      'jueves',
      'viernes',
      'sábado'
    ]
    const daysOfWeekNumbers = daysOfWeek.map((day) =>
      daysOfWeekSpanish.indexOf(day.toLowerCase())
    )

    const date = new Date(year, month, 1)
    while (date.getMonth() === month) {
      if (daysOfWeekNumbers.includes(date.getDay()) && date > new Date()) {
        days.push(
          date.toLocaleDateString('es-ES', {
            weekday: 'long',
            day: 'numeric',
            month: 'long'
          })
        )
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
            user?.uid &&
            (await getAlumnoById(user.uid, {
              getUsuario: true,
              getProfesor: true
            }))
          if (!dataAlumno) {
            await signOut()
            window.location.reload()
          }
          const currentYear = new Date().getFullYear()
          const currentMonth = new Date().getMonth()
          const futureDays = getFutureDaysInMonth({
            month: currentMonth,
            year: currentYear,
            daysOfWeek: dataAlumno.profesor.dias.split(', ')
          })
          setDays(futureDays)
          setAlumno(dataAlumno)
          setLoading(false)
        }
      } catch (error) {
        await signOut()
        window.location.reload()
      }
    })()
  }, [user])

  const handleAgendarClase = async () => {
    console.log(selectedDay)
  }

  if (loading) return <Loader />

  return (
    <div className="w-full h-full flex flex-col items-center">
      <div className="w-full py-10 text-center flex items-center justify-center relative">
        <ButtonReturn />
        <h2 className={`text-xl sm:text-2xl ${playfair600.className}`}>
          Agendar clase
        </h2>
      </div>
      <CardContainer
        title="Seleccionar nueva clase"
        header={
          <p className="w-full border-b-1 py-1">
            Clases disponibles |{' '}
            <span className="text-orange-600">
              {alumno.profesor.instrumento} |{' '}
              {alumno.profesor.usuario.full_name.nombre}
            </span>
          </p>
        }
        button={
          <Button
            text={selectedDay ? 'Agendar clase' : 'Seleccionar una clase'}
            mode={!selectedDay ? 'disabled-light' : ''}
            onClick={() => setShowModal(true)}
            disabled={!selectedDay}
            hasACallback
          />
        }
      >
        {days.length > 0 &&
          days.map((day, index) => (
            <div key={index} className="w-full flex items-start gap-4">
              <input
                value={day}
                name="dia"
                type="radio"
                className="w-4 h-4 rounded-full text-orange-600 bg-black border-gray-500 focus:ring-orange-600 focus:ring-2"
                onChange={() => setSelectedDay(day)}
              />
              <label
                className="text-sm font-medium flex flex-col gap-1 items-start justify-start"
                htmlFor={`dia-${index}`}
              >
                <span>Día: {day}</span>
                <span>Horario: {alumno.clases.hora_inicio} hs</span>
                <span>Duración: {alumno.clases.duracion} minutos</span>
              </label>
            </div>
          ))}

          <Modal
            leggend="¿Estás seguro que querés agendar la nueva clase?"
            callback={handleAgendarClase}
            isOpen={showModal}
            onClose={() => setShowModal(false)}
          />
      </CardContainer>
    </div>
  )
}
export default page
