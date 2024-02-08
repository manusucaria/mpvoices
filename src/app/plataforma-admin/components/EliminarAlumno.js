import React from 'react'
import { deleteAlumno } from '../../api/api.js'

const EliminarAlumno = ({ selectedAlumno, setSelectedAlumno, newCambio }) => {
  const email = selectedAlumno.Email
  const password = selectedAlumno.Contraseña

  const handleSubmit = () => {
    const confirmacion = window.confirm('¿Estás seguro de que deseas eliminar al alumno?')

    if (confirmacion) {
      deleteAlumno(email, password)
        .then(() => {
          setSelectedAlumno(null)
          newCambio('Alta')
        })
        .catch(error => {
          console.error('Error al eliminar alumno:', error.message)
        })
    }
  }

  return (
    <div className='flex w-4/6 mx-auto'>
      <button onClick={handleSubmit} type="submit" className="font-botones font-bold rounded-3xl w-full h-10 mb-4 mt-8 bg-[#FFFFFF] text-[#E9500E] md:text-[#0D0D0D] md:hover:text-[#E9500E] border-2 border-[#E9500E]">Eliminar Alumno</button>
    </div>
  )
}

export default EliminarAlumno
