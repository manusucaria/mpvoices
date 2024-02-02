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
    <div className='w-full mx-auto mt-4'>
      <h2 className="text-center text-3xl sm:text-5xl mb-4 text-white">Eliminar Usuario</h2>
      <div className='flex justify-center mb-4'>
        <button className="text-white font-bold py-2 px-4 rounded" onClick={handleMostrarAlumno}>
          Eliminar Alumno
        </button>
        <button className="text-white font-bold py-2 px-4 rounded" onClick={handleMostrarProfesor}>
          Eliminar Profesor
        </button>
      </div>
      {mostrarAlumno && <EliminarAlumno setMostrarAlumno={setMostrarAlumno} setMostrarProfesor={setMostrarProfesor} />}
      {mostrarProfesor && <EliminarProfesor setMostrarAlumno={setMostrarAlumno} setMostrarProfesor={setMostrarProfesor} />}
    </div>
  )
}

export default Eliminar
