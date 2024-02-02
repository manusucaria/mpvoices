import React, { useState } from 'react'
import { deleteAlumno } from '../../api/api.js'

const EliminarAlumno = ({ setMostrarAlumno, setMostrarProfesor }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    deleteAlumno(email, password)
      .then(() => {
        setMostrarAlumno(false)
        setMostrarProfesor(false)
      })
      .catch(error => {
        console.error('Error al eliminar alumno:', error.message)
        console.log('Error')
      })
  }

  return (
    <div className='w-full sm:w-3/6 mx-auto mt-4'>
      <h2 className="text-center text-3xl sm:text-5xl mb-4 text-white">Eliminar Alumno</h2>
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
            type="text"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit" className="rounded-3xl mx-auto w-3/6 bg-orange-600 text-white px-3 py-2">Eliminar Alumno</button>
      </form>
    </div>
  )
}

export default EliminarAlumno
