import React from 'react'
import { deleteProfesor } from '../../api/api.js'

const EliminarProfesor = ({ selectedProfesor, setSelectedProfesor }) => {
  const email = selectedProfesor.Email
  const password = selectedProfesor.Contraseña

  const handleSubmit = () => {
    const confirmacion = window.confirm('¿Estás seguro de que deseas eliminar al profesor?')

    if (confirmacion) {
      deleteProfesor(email, password)
        .then(() => {
          setSelectedProfesor(null)
        })
        .catch(error => {
          console.error('Error al eliminar profesor:', error.message)
        })
    }
  }

  return (
    <div className='flex w-4/6 mx-auto mt-4'>
      <button onClick={handleSubmit} type="submit" className="rounded-3xl w-full h-8 mt-8 mb-8 bg-orange-600">Eliminar Profesor</button>
    </div>
  )
}

export default EliminarProfesor
