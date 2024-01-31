import React, { useState, useEffect } from 'react'
import { getAlumnos, getProfesores } from '../../api/api.js'
import { useAuth } from '../../../lib/auth.js'
import EditorAlumnos from './EditorAlumnos.js'
import EditorProfesor from './EditorProfesor.js'

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
  }, [user, selectedAlumno, selectedProfesor])

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
        <div className='flex flex-col mx-auto w-full'>
          {buscarAlumnos.map((alumno) => (
            <button key={alumno.id} onClick={() => handleAlumnoClick(alumno)} className='mx-auto bg-white text-black rounded-3xl h-8 w-4/6 sm:w-2/6'>{alumno.Nombre} {alumno.Apellido}</button>
          ))}
        </div>
      )}
      {selectedAlumno && (
        <div className="flex flex-col mx-auto px-3 py-2 items-center w-3/6">
          <EditorAlumnos alumno={selectedAlumno} />
          <button onClick={clearDetails} className='bg-white text-black font-botones font-bold text-center text-sm rounded-3xl h-8 w-4/6'>Volver</button>
        </div>
      )}
      {searchTerm.trim() !== '' && (
        <div className='flex flex-col mx-auto w-full'>
          {buscarProfesores.map((profesor) => (
            <button key={profesor.id} onClick={() => handleProfesorClick(profesor)} className='mx-auto bg-white text-black rounded-3xl h-8 w-4/6 sm:w-2/6'>{profesor.Nombre} {profesor.Apellido}</button>
          ))}
        </div>
      )}
      {selectedProfesor && (
        <div className="flex flex-col mx-auto px-3 py-2 items-center w-3/6">
          <EditorProfesor profesor={selectedProfesor} />
          <button onClick={clearDetails} className='bg-white text-black font-botones font-bold text-center text-sm rounded-3xl h-8 w-4/6'>Volver</button>
        </div>
      )}
    </div>
  )
}

export default Buscador