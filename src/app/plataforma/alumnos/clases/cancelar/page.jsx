'use client'

import React, { useEffect, useState } from 'react'

import { playfair600 } from '@/utils/fonts/fonts'

import { updateAlumnoCancelarClase } from '@/lib/firebase/crud/update'
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
  const [dayOfWeek, setDayOfWeek] = useState(null)
  const [selectedDate, setSelectedDate] = useState(null)
  const [selectedDay, setSelectedDay] = useState(null)
  const [alumnoClaseCanceladaUid, setAlumnoClaseCanceladaUid] = useState(null)
  const [showModal, setShowModal] = useState(false)
  const [loading, setLoading] = useState(true)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState(null)

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
          setDayOfWeek(dataAlumno.clases.dia)
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
      const newAlumnoData = await updateAlumnoCancelarClase(user.uid, {
        fecha: selectedDate.fecha,
        duracion: selectedDate.duracion,
        hora_inicio: selectedDate.hora_inicio,
        alumno_clase_agendada_uid: alumnoClaseCanceladaUid
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
            mode={!selectedDate ? 'disabled-light' : ''}
            onClick={() => setShowModal(true)}
            disabled={!selectedDate}
            hasACallback
          />
        }
      >
        <Calendario
          dayOfWeek={dayOfWeek}
          clases={alumno.clases}
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
          selectedDay={selectedDay}
          setSelectedDay={setSelectedDay}
          setAlumnoClaseCanceladaUid={setAlumnoClaseCanceladaUid}
        />

        {error && <p className="text-orange-300">{error.message}</p>}
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
          leggend="¿Seguro querés cancelar la clase?"
          onClose={() => setShowModal(false)}
        />
      </CardContainer>
    </div>
  )
}
export default page
