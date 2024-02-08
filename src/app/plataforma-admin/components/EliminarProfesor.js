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
    <div className='flex w-4/6 mx-auto'>
      <button onClick={handleSubmit} type="submit" className="font-botones font-bold rounded-3xl w-full h-10 mt-8 mb-4 text-[#663481] md:text-[#0D0D0D] md:hover:text-[#663481] border-2 border-[#663481]">Eliminar Profesor</button>
    </div>
  )
}

export default EliminarProfesor
