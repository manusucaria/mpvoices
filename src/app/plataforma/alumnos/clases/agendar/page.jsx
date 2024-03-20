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

  const [showModal, setShowModal] = useState(false)
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
            !(dataAlumno.clases.agendadas.length <
              dataAlumno.clases.canceladas.length ||
            (dataAlumno.clases.agendadas.length === 0 &&
              dataAlumno.clases.canceladas.length > 0))
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
          alumnosDelProfesorActual.forEach((a) => {
            a.clases.agendadas.forEach((agendada) => {
              agendedDays.push({
                ...agendada,
                fecha: new Date(agendada.fecha.seconds * 1000)
              })
            })
            a.clases.canceladas.forEach((cancelada) => {
              canceledDays.push({
                fecha: new Date(cancelada.fecha.seconds * 1000),
                hora_inicio: a.clases.hora_inicio,
                duracion: a.clases.duracion
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
            duracion: day.duracion
          })
        }
      })
      setHighlightedDays(days)
    }
  }, [currentMonth, alumno])

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
        duracion: selectedDate.duracion
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
            <svg
              width="37"
              height="38"
              viewBox="0 0 37 38"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M14.8764 6.77135C15.0157 6.77135 15.1203 6.69005 15.1551 6.52745C15.4455 4.83179 15.4455 4.82017 17.1643 4.50659C17.3386 4.46014 17.4315 4.36722 17.4315 4.21624C17.4315 4.06526 17.3386 3.97234 17.176 3.9375C15.4455 3.58908 15.4803 3.57746 15.1551 1.91664C15.1203 1.75405 15.0273 1.66113 14.8764 1.66113C14.7254 1.66113 14.6208 1.76566 14.5976 1.91664C14.2492 3.60069 14.2957 3.6123 12.5652 3.9375C12.4026 3.96073 12.3096 4.07687 12.3096 4.21624C12.3096 4.35561 12.4026 4.46014 12.5652 4.50659C14.2957 4.8434 14.284 4.83179 14.5976 6.52745C14.6208 6.67843 14.7254 6.77135 14.8764 6.77135ZM22.9598 9.87232C23.1688 9.87232 23.3198 9.73295 23.3431 9.51228C23.6682 6.82942 23.7844 6.74812 26.5253 6.30678C26.7692 6.28355 26.9086 6.1558 26.9086 5.92351C26.9086 5.73769 26.7692 5.5867 26.5718 5.56348C23.8076 5.01761 23.6682 5.04084 23.3431 2.35798C23.3198 2.13731 23.1688 1.99794 22.9598 1.99794C22.7623 1.99794 22.6114 2.13731 22.5881 2.34637C22.2281 5.0873 22.1584 5.15698 19.3594 5.56348C19.162 5.57509 19.011 5.73769 19.011 5.92351C19.011 6.14418 19.1504 6.28355 19.3594 6.30678C22.1584 6.86426 22.2281 6.85264 22.5881 9.53551C22.6114 9.73295 22.7623 9.87232 22.9598 9.87232ZM15.039 8.78059C14.8531 8.94319 14.7254 9.15224 14.6325 9.36129C13.6685 8.68767 12.5187 8.80382 11.636 9.68649C11.3224 10.0001 11.1366 10.3833 11.1018 10.7898C10.103 10.1278 9.02284 10.2091 8.17501 11.057C7.35041 11.8699 7.26911 12.9849 7.89628 13.9605C7.51301 13.9837 7.15297 14.1695 6.87423 14.4367C5.93349 15.389 5.9451 16.6898 6.92069 17.6654L7.68722 18.4203C7.28073 18.4319 6.88585 18.6294 6.57227 18.9429C5.63152 19.8837 5.66636 21.2542 6.66518 22.253L13.8543 29.4421C17.0366 32.6244 20.7996 33.2632 24.0515 31.5326C26.0259 31.463 27.9655 30.5803 29.6495 28.9079C32.6808 25.865 33.1802 22.102 31.1245 17.7583L28.4765 12.1719C27.9655 11.0918 27.106 10.453 26.0491 10.4646C25.48 10.4646 24.5161 10.7666 24.098 11.6609C23.2734 11.1383 22.2629 11.2079 21.4848 11.8351L18.4419 8.80382C17.3966 7.74693 16.0726 7.78177 15.039 8.78059ZM21.3454 16.0162L15.9332 10.604C15.9681 10.4762 16.0378 10.3717 16.1423 10.2672C16.4559 9.95361 16.8972 9.97684 17.234 10.302L20.695 13.7747C20.7183 13.9721 20.7763 14.1812 20.8576 14.3902L21.4848 15.9117C21.508 15.9581 21.508 15.993 21.4732 16.0278C21.4383 16.0626 21.3919 16.051 21.3454 16.0162ZM24.9574 28.3968C22.019 31.3352 18.3374 31.2655 15.0506 27.9671L8.15179 21.0799C7.84982 20.7664 7.82659 20.3482 8.12856 20.0463C8.43052 19.7443 8.86025 19.7443 9.17383 20.0579L13.4014 24.2854C13.7498 24.6455 14.2957 24.6106 14.6208 24.2854C14.9577 23.9486 14.9925 23.4028 14.6325 23.0543L8.29116 16.713C7.97757 16.3995 7.96596 15.9813 8.26793 15.6794C8.55828 15.3774 8.99962 15.3774 9.30158 15.691L15.2248 21.6026C15.5732 21.9626 16.1191 21.9278 16.4443 21.6026C16.7695 21.2658 16.8159 20.7315 16.4559 20.3715L9.49902 13.4146C9.19706 13.1127 9.18544 12.6713 9.4758 12.3694C9.77776 12.079 10.2075 12.0906 10.5211 12.4042L17.3734 19.2565C17.7102 19.5933 18.2561 19.5817 18.5929 19.2449C18.9297 18.9081 18.9529 18.3622 18.6045 18.0138L12.7974 12.2068C12.4839 11.8932 12.4722 11.4751 12.7742 11.1731C13.0762 10.8711 13.5059 10.8827 13.8079 11.1847L21.9958 19.3727C22.472 19.8488 23.0527 19.814 23.436 19.4191C23.7612 19.0939 23.9121 18.641 23.6682 18.0138L22.2049 14.1812C22.0307 13.7166 22.2049 13.3449 22.5533 13.1823C22.9366 13.0081 23.2966 13.1823 23.5173 13.6701L26.2001 19.4075C27.9771 23.2169 27.3383 26.0043 24.9574 28.3968ZM27.8842 18.6061L25.3988 13.3682C25.3755 13.2753 25.3639 13.1823 25.3639 13.0778C25.3639 12.7294 25.631 12.4042 26.084 12.4042C26.3627 12.4042 26.6531 12.6016 26.8041 12.9268L29.4405 18.5597C31.2174 22.3575 30.5903 25.1565 28.1978 27.5374C28.1281 27.5955 28.07 27.6651 28.0003 27.7232C29.545 25.0868 29.5101 22.0323 27.8842 18.6061ZM8.01242 33.2283C8.19824 33.2283 8.31438 33.1122 8.33761 32.9263C8.74411 30.65 8.73249 30.6035 11.1018 30.1622C11.2992 30.1273 11.4154 30.0228 11.4154 29.837C11.4154 29.6395 11.2992 29.535 11.1134 29.5002C8.73249 29.024 8.77895 28.9892 8.33761 26.736C8.31438 26.5502 8.19824 26.434 8.01242 26.434C7.8382 26.434 7.72206 26.5502 7.68722 26.736C7.24588 29.0008 7.31557 29.0472 4.92306 29.5002C4.73723 29.535 4.62109 29.6395 4.62109 29.837C4.62109 30.0228 4.73723 30.1273 4.92306 30.1622C7.31557 30.6384 7.26911 30.6616 7.68722 32.9263C7.72206 33.1122 7.8382 33.2283 8.01242 33.2283Z"
                fill="white"
              />
            </svg>
          )
        }
        isTitlePlayfair={success}
        header={
          !success && (
            <p className="w-full border-b-1 py-2">
              Clases disponibles |{' '}
              <span className="text-orange-600">
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
            <p className="w-full">Días: {alumno.clases.dia}</p>
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
              {highlightedDays.length > 0 &&
                highlightedDays.map((day, index) => (
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
                ))}
            </div>

            {error && <p className="text-orange-600">{error.message}</p>}

            <Modal
              leggend="¿Seguro querés agendar la nueva clase?"
              callback={handleAgendarClase}
              isOpen={showModal}
              onClose={() => setShowModal(false)}
            />
          </>
            )}
      </CardContainer>
    </div>
  )
}
export default page
