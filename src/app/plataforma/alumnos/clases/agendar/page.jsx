'use client'

import React, { useEffect, useState } from 'react'
import { format } from 'date-fns'
import { es } from 'date-fns/locale'

import { openSans500, playfair600 } from '@/utils/fonts/fonts'

import { updateAlumnoRecuperarClase } from '@/lib/firebase/crud/update'
import {
  getAllAlumnosFromAProfesorExcludingCurrentAlumno,
  getAlumnoById
} from '@/lib/firebase/crud/read'
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

  const [selectedDate, setSelectedDate] = useState(null)
  const [isSelectedDay, setIsSelectedDay] = useState(false)
  const [availableDays, setAvailableDays] = useState([])
  const [highlightedDays, setHighlightedDays] = useState([])
  const [currentMonth, setCurrentMonth] = useState(new Date())
  const [isVisiblePrevArrow, setIsVisiblePrevArrow] = useState(false)

  const [showModal, setShowModal] = useState(false)
  const [showModalInfo, setShowModalInfo] = useState(true)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)

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
          if (
            !(
              dataAlumno.clases?.agendadas?.length <
                dataAlumno.clases?.canceladas?.length ||
              (dataAlumno.clases?.agendadas?.length === 0 &&
                dataAlumno.clases?.canceladas?.length > 0)
            )
          ) {
            window.location.href = '/plataforma/alumnos'
          }
          const alumnosDelProfesorActual =
            await getAllAlumnosFromAProfesorExcludingCurrentAlumno(
              dataAlumno?.profesor?.id,
              user.uid,
              { getUsuario: true }
            )
          const days = []
          const agendedDays = []
          const canceledDays = []
          alumnosDelProfesorActual?.forEach((a) => {
            a?.clases?.agendadas?.forEach((agendada) => {
              agendedDays.push({
                ...agendada,
                fecha: new Date(agendada.fecha.seconds * 1000),
                alumno: a
              })
            })
            a?.clases?.canceladas?.forEach((cancelada) => {
              canceledDays.push({
                fecha: new Date(cancelada.fecha.seconds * 1000),
                hora_inicio: a.clases.hora_inicio,
                duracion: a.clases.duracion,
                alumno: a
              })
            })
          })
          for (const canceled of canceledDays) {
            const isAgended = agendedDays.find(
              (a) =>
                format(a.fecha, 'dd/MM/yyyy') ===
                format(canceled.fecha, 'dd/MM/yyyy')
            )
            if (!isAgended) {
              days.push(canceled)
            }
          }
          setAvailableDays(days)
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
    if (availableDays.length > 0) {
      const days = []
      availableDays.forEach((day) => {
        const date = new Date(day.fecha)
        if (
          date.getMonth() === currentMonth.getMonth() &&
          date.getFullYear() === currentMonth.getFullYear()
        ) {
          days.push({
            fecha: date,
            hora_inicio: day.hora_inicio,
            duracion: day.duracion,
            alumno: day.alumno
          })
        }
      })
      setHighlightedDays(days)
    }
  }, [currentMonth, alumno])

  useEffect(() => {
    if (currentMonth.getMonth() === new Date().getMonth()) {
      setIsVisiblePrevArrow(false)
    } else {
      setIsVisiblePrevArrow(true)
    }
  }, [currentMonth])

  const handleDateClick = (day) => {
    setIsSelectedDay(true)
    setSelectedDate(day)
  }

  const handleMonthChange = (increment) => {
    setSelectedDate(null)
    setIsSelectedDay(false)
    setCurrentMonth((prevMonth) => {
      const newMonth = new Date(prevMonth)
      newMonth.setMonth(newMonth.getMonth() + increment)
      return newMonth
    })
  }

  const handleAgendarClase = async () => {
    try {
      const newAlumnoData = await updateAlumnoRecuperarClase(alumno.id, {
        fecha: selectedDate.fecha,
        hora_inicio: selectedDate.hora_inicio,
        duracion: selectedDate.duracion,
        alumno_clase_cancelada_uid: selectedDate.alumno.id
      })
      setAlumno(newAlumnoData)
      setShowModal(false)
      setSuccess(true)
      setError(null)
    } catch (error) {
      setError(error)
      setShowModal(false)
      setSuccess(false)
    }
  }

  if (loading) return <Loader />

  return (
    <div className="w-full h-full flex flex-col items-center">
      <div className="w-full py-10 text-center flex items-center justify-center relative">
        <ButtonReturn />
        <h2 className={`text-2xl sm:text-3xl ${playfair600.className}`}>
          Agendar clase
        </h2>
      </div>
      <CardContainer
        title={
          success
            ? '¡Tu nueva clase está confirmada!'
            : 'Seleccionar nueva clase'
        }
        icon={
          success && (
            <iframe
              height={37}
              width={38}
              src="https://lottie.host/embed/a89d138f-95a9-447b-87ed-65ad8d22a22f/spKLcMoKCb.json"
            ></iframe>
          )
        }
        isTitlePlayfair={success}
        header={
          !success && (
            <p className="w-full border-b-1 py-2">
              Clases disponibles |{' '}
              <span className="text-orange-300">
                {alumno.profesor.instrumento} | Profesor{' '}
                {alumno.profesor.usuario.full_name.nombre}
              </span>
            </p>
          )
        }
        button={
          success
            ? (
            <Button
              text="Volver al inicio"
              hasACallback
              onClick={() => {
                window.location.href = '/plataforma/alumnos'
              }}
            />
              )
            : (
            <Button
              text={'Agendar clase'}
              mode={!isSelectedDay ? 'disabled-light' : ''}
              onClick={() => setShowModal(true)}
              disabled={!isSelectedDay}
              hasACallback
            />
              )
        }
      >
        {success
          ? (
          <div className="w-full flex flex-col gap-5 items-start justify-start pb-10 border-b-1">
            <p className="w-full">Instrumento: {alumno.instrumento}</p>
            <p className="w-full">
              Día:{' '}
              {format(selectedDate.fecha, "EEEE d 'de' MMMM", { locale: es })}
            </p>
            <p className="w-full">Horario: {alumno.clases.hora_inicio} hs</p>
            <p className="w-full">Duración: {alumno.clases.duracion} minutos</p>
            <p className="w-full">
              Profesor: {alumno.profesor.usuario.full_name.nombre}
            </p>
          </div>
            )
          : (
          <>
            <ul className="bg-black text-white w-full py-1 rounded-t-md flex items-center justify-between">
              <li>
                {isVisiblePrevArrow
                  ? (
                  <button
                    className="text-white hover:text-orange-300 rounded-md px-4 py-1"
                    onClick={() => handleMonthChange(-1)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      fill="none"
                    >
                      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                      <polyline points="15 6 9 12 15 18" />
                    </svg>
                  </button>
                    )
                  : (
                  <span className="px-7 py-1"></span>
                    )}
              </li>
              <li>
                <h2
                  className={`w-full py-1 text-center ${openSans500.className}`}
                >
                  {currentMonth.toLocaleDateString('es-ES', {
                    month: 'long',
                    year: 'numeric'
                  })}
                </h2>
              </li>
              <li>
                <button
                  className="text-white hover:text-orange-300 rounded-md px-4 py-1"
                  onClick={() => handleMonthChange(+1)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    fill="none"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <polyline points="9 6 15 12 9 18" />
                  </svg>
                </button>
              </li>
            </ul>
            <div className="w-full flex flex-col gap-5 items-start justify-start">
              {highlightedDays.length > 0
                ? highlightedDays.map((day, index) => (
                    <div key={index} className="w-full flex items-start gap-4 ">
                      <input
                        value={day}
                        name="dia"
                        type="radio"
                        checked={
                          isSelectedDay &&
                          selectedDate.fecha.getDate() ===
                            new Date(day.fecha).getDate()
                        }
                        className="w-4 h-4 rounded-full text-orange-600 bg-black border-gray-500 focus:ring-orange-600 focus:ring-2"
                        onChange={() => handleDateClick(day)}
                      />
                      <label
                        className="text-sm font-medium flex flex-col gap-1 items-start justify-start"
                        htmlFor={`dia-${index}`}
                      >
                        <span>
                          Día:{' '}
                          {format(new Date(day.fecha), 'd MMMM yyyy', {
                            locale: es
                          })}
                        </span>
                        <span>Horario: {day.hora_inicio} hs</span>
                        <span>Duración: {day.duracion} minutos</span>
                      </label>
                    </div>
                ))
                : 'No hay clases por mostrar'}
              <p className="text-orange-300">
                Nota: sólo se mostrarán clases canceladas por otros alumnos.
              </p>
            </div>

            {error && <p className="text-orange-600">{error.message}</p>}

            <Modal
              leggend="¿Seguro querés agendar la nueva clase?"
              callback={handleAgendarClase}
              isOpen={showModal}
              onClose={() => setShowModal(false)}
            />
            <Modal
              leggend="Por cualquier consulta, por favor contacte con el administrador."
              isCheckedIcon
              isOpen={showModalInfo}
              leggendClose="Entendido"
              onClose={() => setShowModalInfo(false)}
            />
          </>
            )}
      </CardContainer>
    </div>
  )
}
export default page
