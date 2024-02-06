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
    <div className='flex w-4/6 mx-auto mt-4'>
      <button onClick={handleSubmit} type="submit" className="rounded-3xl w-full h-8 mt-8 mb-8 bg-orange-600">Eliminar Alumno</button>
    </div>
  )
}

export default EliminarAlumno
