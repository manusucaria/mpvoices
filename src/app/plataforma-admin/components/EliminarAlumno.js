import React, { useState } from 'react'
import { deleteAlumno } from '../../api/api.js'

const EliminarAlumno = ({ setMostrarAlumno, setMostrarProfesor }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)
  const [eliminado, setEliminado] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()

    const confirmacion = window.confirm('¿Estás seguro de que deseas eliminar al alumno?')

    if (confirmacion) {
      deleteAlumno(email, password)
        .then(() => {
          setEliminado(true)
        })
        .catch(error => {
          console.error('Error al eliminar alumno:', error.message)
          setError('Usuario y/o contraseña incorrectos')
        })
    }
  }

  const handleAceptar = () => {
    setMostrarAlumno(false)
    setMostrarProfesor(false)
  }

  return (
    <div className='w-full md:w-4/6 lg:w-3/6 mx-auto mt-4'>
      {!eliminado
        ? (
        <form onSubmit={handleSubmit} className="flex flex-col w-4/6 mx-auto">
          <div className='flex mb-6'>
            <label className='mr-auto w-2/6' htmlFor="email">Email:</label>
            <input
              placeholder="Email"
              className='text-black rounded-3xl h-8 pl-2 w-4/6 ml-auto'
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className='flex mb-6'>
            <label className='mr-auto w-2/6' htmlFor="password">Password:</label>
            <input
              placeholder="Contraseña"
              className='text-black rounded-3xl h-8 pl-2 w-4/6 ml-auto'
              id="password"
              type="password"
              value={password}
              autoComplete='Current password'
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {error && (
            <p className="flex mx-auto text-orange-600 text-center mb-4">{error}</p>
          )}
          <button type="submit" className="rounded-3xl mt-4 mx-auto md:w-3/6 bg-[#E9500E] text-white px-3 py-2">Eliminar Alumno</button>
        </form>
          )
        : (
        <div className="flex flex-col mx-auto w-4/6">
          <p className="text-white text-sm mb-4 mx-auto">Alumno correctamente eliminado</p>
          <button onClick={handleAceptar} className="mx-auto w-3/6 rounded-3xl bg-[#E9500E] text-white px-3 py-2">Aceptar</button>
        </div>
          )}
    </div>
  )
}

export default EliminarAlumno
