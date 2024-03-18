'use client'

import { openSans500 } from '@/utils/fonts/fonts'
import React from 'react'

const Calendario = ({
  highlightedDays = [],
  clases = {},
  selectedDate,
  setSelectedDate,
  selectedDay,
  setSelectedDay
}) => {
  const currentMonth = new Date()

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

    return [...emptyDays, ...calendarDays].map((day, i) => (
      <button
        key={i}
        className={`${
          day !== null &&
          day !== selectedDay &&
          highlightedDays.includes(day) &&
          'hover:bg-orange-600 hover:bg-opacity-30 pointer-events-auto'
        } ${highlightedDays.includes(day) && 'font-black text-orange-600'} ${
          selectedDay === day && day !== null && 'bg-orange-600 text-white'
        } pointer-events-none w-auto h-8 rounded-md flex items-center justify-center`}
        onClick={() => handleDateClick(day)}
        disabled={!highlightedDays.includes(day) && day !== null}
      >
        {day}
      </button>
    ))
  }

  return (
    <div className="w-full grid grid-cols-1 place-content-center place-items-center gap-5">
      <div className="w-80">
        <h2 className={`w-full py-1 text-center ${openSans500.className}`}>
          {currentMonth.toLocaleDateString('es-ES', {
            month: 'long',
            year: 'numeric'
          })}
        </h2>
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
