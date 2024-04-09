'use client'

import React, { useEffect, useState } from 'react'
import { format } from 'date-fns'
import { es } from 'date-fns/locale'

import { openSans500 } from '@/utils/fonts/fonts'

const Calendario = ({
  dayOfWeek = '',
  clases = {},
  selectedDate,
  setSelectedDate,
  selectedDay,
  setSelectedDay,
  setAlumnoClaseCanceladaUid
}) => {
  const [currentMonth, setCurrentMonth] = useState(new Date())
  const [highlightedDays, setHighlightedDays] = useState([])
  const [fechasCanceladas, setFechasCanceladas] = useState([])
  const [fechasAgendadas, setFechasAgendadas] = useState([])

  const [formatCurrentMonth, setFormatCurrentMonth] = useState('')

  useEffect(() => {
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

    const date = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth(),
      1
    )
    while (date.getMonth() === currentMonth.getMonth()) {
      if (date.getDay() === dayOfWeekNumber && date > new Date()) {
        days.push(date.getDate())
      }
      date.setDate(date.getDate() + 1)
    }

    const agendadas =
      clases?.agendadas
        ?.filter((agendada) => {
          const agendadaDate = new Date(agendada.fecha.seconds * 1000)
          return agendadaDate.getMonth() === currentMonth.getMonth()
        })
        .map((agendada) => {
          return new Date(agendada?.fecha?.seconds * 1000).getDate()
        }) || []

    setFechasCanceladas(
      clases?.canceladas?.map(
        (cancelada) => new Date(cancelada?.fecha?.seconds * 1000)
      )
    )
    setFechasAgendadas(
      clases?.agendadas?.map((agendada) => {
        return {
          ...agendada,
          fecha: new Date(agendada?.fecha?.seconds * 1000)
        }
      })
    )
    setHighlightedDays([...days, ...agendadas])
    setFormatCurrentMonth(format(currentMonth, 'MMMM yyyy', { locale: es }))
  }, [currentMonth])

  const handleMonthChange = (increment) => {
    setSelectedDate(null)
    setSelectedDay(null)
    setCurrentMonth((prevMonth) => {
      const newMonth = new Date(prevMonth)
      newMonth.setMonth(newMonth.getMonth() + increment)
      return newMonth
    })
    setFormatCurrentMonth(format(currentMonth, 'MMMM yyyy', { locale: es }))
  }

  const handleDateClick = (day) => {
    setSelectedDay(null)
    setSelectedDay(day)
    const selectedDate = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth(),
      day
    )
    const agendada = fechasAgendadas?.find(
      (agendada) =>
        new Date(agendada.fecha).getDate() === day &&
        new Date(agendada.fecha).getMonth() === currentMonth.getMonth() &&
        new Date(agendada.fecha).getFullYear() === currentMonth.getFullYear()
    )
    if (agendada) {
      setAlumnoClaseCanceladaUid(agendada.alumno_clase_cancelada.id)
      setSelectedDate(agendada)
    } else {
      setSelectedDate({
        fecha: selectedDate,
        hora_inicio: clases.hora_inicio,
        duracion: clases.duracion
      })
    }
  }

  const renderCalendar = () => {
    const daysInMonth = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth() + 1,
      0
    ).getDate()

    const firstDayOfMonth = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth(),
      1
    ).getDay()

    const calendarDays = Array.from({ length: daysInMonth }, (_, i) => i + 1)

    const emptyDays = Array.from({ length: firstDayOfMonth }, (i) => null)

    return [...emptyDays, ...calendarDays].map((day, i) => {
      const fechaCancelada = fechasCanceladas?.find(
        (cancelada) =>
          cancelada.getDate() === day &&
          cancelada.getMonth() === currentMonth.getMonth() &&
          cancelada.getFullYear() === currentMonth.getFullYear()
      )
      const fechaAgendada = fechasAgendadas?.find(
        (agendada) =>
          new Date(agendada.fecha).getDate() === day &&
          new Date(agendada.fecha).getMonth() === currentMonth.getMonth() &&
          new Date(agendada.fecha).getFullYear() === currentMonth.getFullYear()
      )
      const isHighlighted = highlightedDays.includes(day)
      const isSelected = selectedDay === day

      let buttonClass =
        'pointer-events-none w-auto h-8 rounded-md flex items-center justify-center'

      if (day !== null) {
        if (isHighlighted && !fechaCancelada && !fechaAgendada && !isSelected) {
          buttonClass +=
            ' font-black text-orange-300 hover:bg-orange-600 hover:bg-opacity-40 pointer-events-auto'
        }
        if (fechaCancelada) {
          buttonClass += ' bg-orange-300 text-black font-black'
        }
        if (fechaAgendada && !isSelected) {
          buttonClass +=
            ' bg-navy-blue-light text-navy-blue font-black pointer-events-auto'
        }
        if (isSelected && fechaAgendada) {
          buttonClass += ' bg-navy-blue text-white font-black'
        }
        if (isSelected && !fechaAgendada) {
          buttonClass += ' bg-orange-600 text-white font-black'
        }
      }

      return (
        <button
          key={i}
          className={buttonClass}
          onClick={() => handleDateClick(day)}
          disabled={!isHighlighted || fechaCancelada}
        >
          {day}
        </button>
      )
    })
  }

  return (
    <div className="w-full grid grid-cols-1 place-content-center place-items-center gap-5">
      <div className="w-80">
        <ul className="text-sm text-white text-opacity-50 flex flex-col gap-2">
          <li className="flex gap-2">
            <span className="bg-orange-300 w-5 h-5 rounded-full"></span>Clases
            canceladas
          </li>
          <li className="flex gap-2">
            <span className="bg-navy-blue-light w-5 h-5 rounded-full"></span>
            Clases agendadas
          </li>
        </ul>
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
            <h2 className={`w-full py-1 text-center ${openSans500.className}`}>
              {formatCurrentMonth}
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
        <ul className="grid grid-cols-7 gap-0 5">
          <li className="w-auto h-8 flex items-center justify-center">D</li>
          <li className="w-auto h-8 flex items-center justify-center">L</li>
          <li className="w-auto h-8 flex items-center justify-center">M</li>
          <li className="w-auto h-8 flex items-center justify-center">M</li>
          <li className="w-auto h-8 flex items-center justify-center">J</li>
          <li className="w-auto h-8 flex items-center justify-center">V</li>
          <li className="w-auto h-8 flex items-center justify-center">S</li>
        </ul>
        <div className="w-full grid grid-cols-7 gap-0.5">
          {renderCalendar()}
        </div>
      </div>
      <p className="w-full text-start flex flex-col items-start justify-start">
        {selectedDate && (
          <>
            <span>
              {format(selectedDate.fecha, "EEEE d 'de' MMMM", { locale: es })}
            </span>
            <span>{selectedDate.hora_inicio} hs</span>
            <span>{selectedDate.duracion} minutos</span>
          </>
        )}
      </p>
    </div>
  )
}

export default Calendario
