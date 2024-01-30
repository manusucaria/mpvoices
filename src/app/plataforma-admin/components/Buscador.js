import React, { useState, useEffect } from 'react'
import { getAlumnos, getProfesores } from '../../api/api.js'
import { useAuth } from '../../../lib/auth.js'

const Buscador = () => {
  const user = useAuth()
  const [alumnos, setAlumnos] = useState([])
  const [profesores, setProfesores] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedAlumno, setSelectedAlumno] = useState(null)
  const [selectedProfesor, setSelectedProfesor] = useState(null)

  useEffect(() => {
    getAlumnos().then(data => {
      setAlumnos(data)
    })
    getProfesores().then(data => {
      setProfesores(data)
    })
  }, [user])

  const handleSearchTermChange = (event) => {
    setSearchTerm(event.target.value)
    clearDetails()
  }

  const handleAlumnoClick = (alumno) => {
    setSelectedAlumno(alumno)
    setSearchTerm('')
  }

  const handleProfesorClick = (profesor) => {
    setSelectedProfesor(profesor)
    setSearchTerm('')
  }

  const clearDetails = () => {
    setSelectedAlumno(null)
    setSelectedProfesor(null)
  }

  const buscarAlumnos = searchTerm.trim() !== ''
    ? alumnos.filter(alumno => (
      alumno.Nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      alumno.Apellido.toLowerCase().includes(searchTerm.toLowerCase())
    ))
    : []

  const buscarProfesores = searchTerm.trim() !== ''
    ? profesores.filter(profesor => (
      profesor.Nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      profesor.Apellido.toLowerCase().includes(searchTerm.toLowerCase())
    ))
    : []

  return (
    <div className='flex flex-col'>
      <h2 className='text-center text-3xl sm:text-5xl mt-8 mb-4 text-white'>Buscar Perfiles</h2>
      <input
        type="text"
        placeholder="Buscar alumnos o profesores"
        value={searchTerm}
        onChange={handleSearchTermChange}
        onClick={clearDetails}
        className="text-black bg-white w-4/6 sm:w-2/6 mx-auto text-center px-3 py-2 mb-4 rounded-3xl"
      />
      {searchTerm.trim() !== '' && (
        <div className='flex flex-col mx-auto'>
          {buscarAlumnos.map((alumno) => (
            <div key={alumno.id} className="flex flex-col mx-auto my-8 w-ful">
              <button onClick={() => handleAlumnoClick(alumno)} className='bg-white text-black rounded-3xl h-8 w-4/6'>{alumno.Nombre} {alumno.Apellido}</button>
            </div>
          ))}
        </div>
      )}
      {selectedAlumno && (
        <div className="flex flex-col mx-auto px-3 py-2 items-center">
          <p className="text-white font-botones font-bold text-center text-sm mb-2">Nombre: {selectedAlumno.Nombre}</p>
          <p className="text-white font-botones font-bold text-center text-sm mb-2">Apellido: {selectedAlumno.Apellido}</p>
          <p className="text-white font-botones font-bold text-center text-sm mb-2">Edad: {selectedAlumno.Edad}</p>
          <p className="text-white font-botones font-bold text-center text-sm mb-2">Profesor: {selectedAlumno.Profesor}</p>
          <p className="text-white font-botones font-bold text-center text-sm mb-2">Dia: {selectedAlumno.Dia}</p>
          <p className="text-white font-botones font-bold text-center text-sm mb-2">Horario: {selectedAlumno.Horario}</p>
          <p className="text-white font-botones font-bold text-center text-sm mb-2">Duración de Clase: {selectedAlumno.Duracion} minutos</p>
          <p className="text-white font-botones font-bold text-center text-sm mb-2">Instrumento: {selectedAlumno.Instrumento}</p>
          <p className="text-white font-botones font-bold text-center text-sm mb-2">Deuda: {selectedAlumno.Deuda}</p>
          <button onClick={clearDetails} className='bg-white text-black font-botones font-bold text-center text-sm rounded-3xl h-8 w-4/6'>Volver</button>
        </div>
      )}
      {searchTerm.trim() !== '' && (
        <div className='flex flex-col mx-auto'>
          {buscarProfesores.map((profesor) => (
            <div key={profesor.id} className="flex flex-col mx-auto my-8 w-100">
              <button onClick={() => handleProfesorClick(profesor)} className='bg-white text-black rounded-3xl h-8 w-4/6'>{profesor.Nombre} {profesor.Apellido}</button>
            </div>
          ))}
        </div>
      )}
      {selectedProfesor && (
        <div className="flex flex-col mx-auto px-3 py-2 items-center">
          <p className="text-white font-botones font-bold text-center text-sm mb-2">Nombre: {selectedProfesor.Nombre}</p>
          <p className="text-white font-botones font-bold text-center text-sm mb-2">Apellido: {selectedProfesor.Apellido}</p>
          <p className="text-white font-botones font-bold text-center text-sm mb-2">Edad: {selectedProfesor.Edad}</p>
          <p className="text-white font-botones font-bold text-center text-sm mb-2">Instrumento: {selectedProfesor.Instrumento}</p>
          <button onClick={clearDetails} className='bg-white text-black font-botones font-bold text-center text-sm rounded-3xl h-8 w-4/6'>Volver</button>
        </div>
      )}
    </div>
  )
}

export default Buscador
