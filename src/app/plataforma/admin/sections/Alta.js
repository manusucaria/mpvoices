import React, { useState, useEffect } from 'react'

import AltaUsuarioAlumno from '../components/AltaUsuarioAlumno'
import AltaUsuarioProfe from '../components/AltaUsuarioProfe'

import { getAllProfesores } from '@/lib/firebase/crud/read'

const Alta = () => {
  const [showProfesorForm, setShowProfesorForm] = useState(false)
  const [showAlumnoForm, setShowAlumnoForm] = useState(false)
  const [backgroundClass, setBackgroundClass] = useState('bg-[#D9D9D9]')
  const [profesores, setProfesores] = useState([])

  useEffect(() => {
    getAllProfesores({ getUsuario: true }).then((data) => {
      setProfesores(data)
    })
  }, [])

  useEffect(() => {
    if (showAlumnoForm || showProfesorForm) {
      setBackgroundClass(
        'bg-[#212121] pb-16 pt-0 border-y-1 border-y-[#FFFFFF]'
      )
    } else {
      setBackgroundClass('bg-[#D9D9D9] py-20')
    }
  }, [showAlumnoForm, showProfesorForm])

  const handleShowProfesorForm = () => {
    if (showProfesorForm) {
      setShowProfesorForm(false)
    } else {
      setShowProfesorForm(true)
      setShowAlumnoForm(false)
    }
  }

  const handleShowAlumnoForm = () => {
    if (showAlumnoForm) {
      setShowAlumnoForm(false)
    } else {
      setShowAlumnoForm(true)
      setShowProfesorForm(false)
    }
  }

  const handleCancelar = () => {
    setShowAlumnoForm(false)
    setShowProfesorForm(false)
  }

  return (
    <div id="Crear" className={`w-full ${backgroundClass}`}>
      {!showProfesorForm && !showAlumnoForm && (
        <h2 className="text-center text-2xl sm:text-3xl mt-4 mb-12 text-[#0D0D0D]">
          Nuevos usuarios
        </h2>
      )}
      {!showProfesorForm && !showAlumnoForm && (
        <div className="flex flex-col sm:flex-row justify-center gap-y-12 sm:gap-y-0 mb-6 mx-auto w-full sm:w-4/6 md:w-4/6 lg:w-3/6 gap-x-4">
          <button
            className="text-[#FFFFFF] font-botones font-bold bg-[#E9500E] w-4/6 mx-auto sm:my-0 sm:ml-4 h-14 sm:h-12 rounded-3xl md:hover:bg-[#DB9B6D]"
            onClick={handleShowAlumnoForm}
          >
            Alta alumno
          </button>
          <button
            className="text-[#FFFFFF] font-botones font-bold bg-[#663481] w-4/6 mx-auto sm:my-0 sm:mr-4 h-14 sm:h-12 rounded-3xl md:hover:bg-[#9B70BE]"
            onClick={handleShowProfesorForm}
          >
            Alta profesor
          </button>
        </div>
      )}
      {showProfesorForm && <AltaUsuarioProfe handleCancelar={handleCancelar} />}
      {showAlumnoForm && (
        <AltaUsuarioAlumno
          profesores={profesores}
          handleCancelar={handleCancelar}
        />
      )}
    </div>
  )
}

export default Alta
