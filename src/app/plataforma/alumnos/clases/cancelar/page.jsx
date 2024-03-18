'use client'

import React, { useEffect, useState } from 'react'

import { playfair600 } from '@/utils/fonts/fonts'

import { createNotificacionAlumno } from '@/lib/firebase/crud/update'
import { getAlumnoById } from '@/lib/firebase/crud/read'
import { useAuth } from '@/lib/firebase/useAuth'
import { signOut } from '@/lib/firebase/auth'

import Button from '@/app/components/button/Button'
import Loader from '@/app/components/loader/Loader'
import Modal from '@/app/components/modal/Modal'

import CardContainer from '../../components/CardContainer'
import ButtonReturn from '../../components/ButtonReturn'
import Calendario from '../../components/Calendario'

const page = () => {
  const user = useAuth()

  const [alumno, setAlumno] = useState(null)
  const [highlightedDays, setHighlightedDays] = useState([])
  const [selectedDate, setSelectedDate] = useState(null)
  const [selectedDay, setSelectedDay] = useState(null)
  const [showModal, setShowModal] = useState(false)
  const [loading, setLoading] = useState(true)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState(null)

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
      if ((date.getDay() === dayOfWeekNumber) && date > new Date()) {
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

  useEffect(() => {
    setError(null)
    setSuccess(false)
  }, [selectedDay])

  const handleCancelarClase = async () => {
    try {
      const parseFechaString = selectedDate.toLocaleDateString('es-ES', {
        weekday: 'long',
        day: 'numeric',
        month: 'long'
      })
      const messageNotificacion = `No asistirá a la clase del ${parseFechaString}`
      const newAlumnoData = await createNotificacionAlumno(alumno.id, {
        notificacion: messageNotificacion
      })
      setAlumno(newAlumnoData)
      setShowModal(false)
      setSelectedDate(null)
      setSuccess(true)
    } catch (error) {
      setError(error)
      setShowModal(false)
      setSelectedDate(null)
      setSuccess(false)
    }
  }

  if (loading) return <Loader />

  return (
    <div className="w-full h-full flex flex-col items-center">
      <div className="w-full py-10 text-center flex items-center justify-center relative">
        <ButtonReturn />
        <h2 className={`text-2xl sm:text-3xl ${playfair600.className}`}>
          Cancelar clase
        </h2>
      </div>
      <CardContainer
        title="Seleccionar clase a cancelar"
        warning
        top
        button={
          <Button
            text={'Cancelar clase'}
            mode={!selectedDate ? 'disabled' : ''}
            onClick={() => setShowModal(true)}
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
          selectedDay={selectedDay}
          setSelectedDay={setSelectedDay}
        />

        {error && <p className="text-orange-600">{error.message}</p>}
        {success && (
          <Modal
            isOpen={success}
            leggend={'La clase se canceló con éxito'}
            onClose={() => {
              setSuccess(false)
              window.location.href = '/plataforma/alumnos'
            }}
            isCheckedIcon={true}
            leggendClose="Entendido"
          />
        )}

        <Modal
          callback={handleCancelarClase}
          isOpen={showModal}
          leggend="¿Estás seguro que querés cancelar la clase?"
          onClose={() => setShowModal(false)}
        />
      </CardContainer>
    </div>
  )
}
export default page
