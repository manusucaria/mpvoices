'use client'

import { openSans500 } from '@/utils/fonts/fonts'
import React, { useEffect, useState } from 'react'

const Calendario = ({
  dayOfWeek = '',
  clases = {},
  selectedDate,
  setSelectedDate,
  selectedDay,
  setSelectedDay
}) => {
  const [currentMonth, setCurrentMonth] = useState(new Date())
  const [highlightedDays, setHighlightedDays] = useState([])
  const [fechasCanceladas, setFechasCanceladas] = useState([])

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
    setFechasCanceladas(
      clases.canceladas.map(
        (cancelada) => new Date(cancelada?.fecha?.seconds * 1000)
      )
    )
    setHighlightedDays(days)
  }, [currentMonth])

  const handleMonthChange = (increment) => {
    setSelectedDate(null)
    setSelectedDay(null)
    setCurrentMonth((prevMonth) => {
      const newMonth = new Date(prevMonth)
      newMonth.setMonth(newMonth.getMonth() + increment)
      return newMonth
    })
  }

  const handleDateClick = (day) => {
    setSelectedDay(null)
    setSelectedDay(day)
    setSelectedDate(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day)
    )
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
      const fechaCancelada = fechasCanceladas.find(
        (cancelada) =>
          cancelada.getDate() === day &&
          cancelada.getMonth() === currentMonth.getMonth() &&
          cancelada.getFullYear() === currentMonth.getFullYear()
      )
      const isHighlighted = highlightedDays.includes(day)
      const isSelected = selectedDay === day

      let buttonClass =
        'pointer-events-none w-auto h-8 rounded-md flex items-center justify-center'

      if (day !== null) {
        if (isHighlighted && !fechaCancelada && !isSelected) {
          buttonClass +=
            ' font-black text-orange-300 hover:bg-orange-600 hover:bg-opacity-40 pointer-events-auto'
        }
        if (fechaCancelada) {
          buttonClass +=
            ' bg-orange-300 bg-opacity-10 text-orange-600 font-black'
        }
        if (isSelected) {
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
              {selectedDate.toLocaleDateString('es-ES', {
                weekday: 'long',
                day: 'numeric',
                month: 'long'
              })}
            </span>
            <span>{clases.hora_inicio} hs</span>
            <span>{clases.duracion} minutos</span>
          </>
        )}
      </p>
    </div>
  )
}

export default Calendario
