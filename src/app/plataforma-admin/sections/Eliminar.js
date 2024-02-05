import React, { useState } from 'react'
import EliminarAlumno from '../components/EliminarAlumno'
import EliminarProfesor from '../components/EliminarProfesor'

const Eliminar = () => {
  const [mostrarAlumno, setMostrarAlumno] = useState(false)
  const [mostrarProfesor, setMostrarProfesor] = useState(false)

  const handleMostrarAlumno = () => {
    if (mostrarAlumno) {
      setMostrarAlumno(false)
    } else {
      setMostrarAlumno(true)
      setMostrarProfesor(false)
    }
  }

  const handleMostrarProfesor = () => {
    if (mostrarProfesor) {
      setMostrarProfesor(false)
    } else {
      setMostrarProfesor(true)
      setMostrarAlumno(false)
    }
  }

  return (
    <div className='w-full mx-auto py-12 bg-[#212121]'>
      <h2 className="text-center text-xl sm:text-3xl mb-8 text-white">Eliminar usuario</h2>
      <div className="flex justify-center gap-x-4 sm:gap-x-12 mb-8">
        <button className="text-white text-sm sm:text-base bg-[#E9500E] py-2 w-3/6 sm:w-2/6 lg:w-1/6 ml-4 sm:px-12 rounded-3xl" onClick={handleMostrarAlumno}>
          Alumno
        </button>
        <button className="text-white text-sm sm:text-base bg-[#663481] py-2 w-3/6 sm:w-2/6 lg:w-1/6 mr-4 sm:px-12 rounded-3xl" onClick={handleMostrarProfesor}>
          Profesor
        </button>
      </div>
      {mostrarAlumno && <EliminarAlumno setMostrarAlumno={setMostrarAlumno} setMostrarProfesor={setMostrarProfesor} />}
      {mostrarProfesor && <EliminarProfesor setMostrarAlumno={setMostrarAlumno} setMostrarProfesor={setMostrarProfesor} />}
    </div>
  )
}

export default Eliminar
