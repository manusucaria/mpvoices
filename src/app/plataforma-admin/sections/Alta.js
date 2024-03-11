import React, { useState, useEffect } from 'react'
import AltaAlumno from '../components/AltaAlumno'
import AltaProfe from '../components/AltaProfe'
import AltaUsuarioAlumno from '../components/AltaUsuarioAlumno'
import AltaUsuarioProfe from '../components/AltaUsuarioProfe'

const Alta = () => {
  const [showProfesorForm, setShowProfesorForm] = useState(false)
  const [showAlumnoForm, setShowAlumnoForm] = useState(false)
  const [alumnoFormSubmitted, setAlumnoFormSubmitted] = useState(false)
  const [profesorFormSubmitted, setProfesorFormSubmitted] = useState(false)
  const [userEmail, setUserEmail] = useState('')
  const [userPassword, setUserPassword] = useState('')
  const [backgroundClass, setBackgroundClass] = useState('bg-[#D9D9D9]')

  useEffect(() => {
    if (showAlumnoForm || showProfesorForm) {
      setBackgroundClass('bg-[#212121] pb-16 pt-0 border-y-1 border-y-[#FFFFFF]')
    } else {
      setBackgroundClass('bg-[#D9D9D9] py-20')
    }
  }, [showAlumnoForm, showProfesorForm])

  const handleNewFormSubmit = (newUserEmail, newUserPassword) => {
    setUserEmail(newUserEmail)
    setUserPassword(newUserPassword)
  }

  const handleShowProfesorForm = () => {
    if (showProfesorForm) {
      setShowProfesorForm(false)
      setProfesorFormSubmitted(false)
    } else {
      setShowProfesorForm(true)
      setShowAlumnoForm(false)
      setAlumnoFormSubmitted(false)
      setProfesorFormSubmitted(false)
    }
  }

  const handleShowAlumnoForm = () => {
    if (showAlumnoForm) {
      setShowAlumnoForm(false)
      setAlumnoFormSubmitted(false)
    } else {
      setShowAlumnoForm(true)
      setShowProfesorForm(false)
      setAlumnoFormSubmitted(false)
      setProfesorFormSubmitted(false)
    }
  }

  const confirmacionRegistro = () => {
    setShowAlumnoForm(false)
    setShowProfesorForm(false)
    setAlumnoFormSubmitted(false)
    setProfesorFormSubmitted(false)
  }

  const cancelarAlumnoForm = () => {
    setShowAlumnoForm(false)
    setShowProfesorForm(false)
    setAlumnoFormSubmitted(false)
    setProfesorFormSubmitted(false)
  }

  const cancelarProfesorForm = () => {
    setShowAlumnoForm(false)
    setShowProfesorForm(false)
    setAlumnoFormSubmitted(false)
    setProfesorFormSubmitted(false)
  }

  const handleCancelar = () => {
    setShowAlumnoForm(false)
    setShowProfesorForm(false)
    setAlumnoFormSubmitted(false)
    setProfesorFormSubmitted(false)
  }

  return (
    <div id='Crear' className={`w-full ${backgroundClass}`}>
      {!showProfesorForm && !showAlumnoForm && (
        <h2 className="text-center text-2xl sm:text-3xl mt-4 mb-12 text-[#0D0D0D]">Nuevos usuarios</h2>
      )}
      {!showProfesorForm && !showAlumnoForm && (
        <div className="flex flex-col sm:flex-row justify-center gap-y-12 sm:gap-y-0 mb-6 mx-auto w-full sm:w-4/6 md:w-4/6 lg:w-3/6 gap-x-4">
          <button className="text-[#FFFFFF] font-botones font-bold bg-[#A33100] w-4/6 mx-auto sm:my-0 sm:ml-4 h-14 sm:h-12 rounded-3xl md:hover:bg-[#F57B48]" onClick={handleShowAlumnoForm}>
            Alta alumno
          </button>
          <button className="text-[#FFFFFF] font-botones font-bold bg-[#663481] w-4/6 mx-auto sm:my-0 sm:mr-4 h-14 sm:h-12 rounded-3xl md:hover:bg-[#9B70BE]" onClick={handleShowProfesorForm}>
            Alta profesor
          </button>
        </div>
      )}
      {showProfesorForm && !profesorFormSubmitted && (
        <AltaUsuarioProfe onFormSubmit={handleNewFormSubmit} setProfesorFormSubmitted={setProfesorFormSubmitted} handleCancelar={handleCancelar} />
      )}
      {profesorFormSubmitted && (
        <AltaProfe setShowProfesorForm={cancelarProfesorForm} confirmacionRegistro={confirmacionRegistro} newUserEmail={userEmail} newUserPassword={userPassword} />
      )}
      {showAlumnoForm && !alumnoFormSubmitted && (
        <AltaUsuarioAlumno onFormSubmit={handleNewFormSubmit} setAlumnoFormSubmitted={setAlumnoFormSubmitted} handleCancelar={handleCancelar} />
      )}
      {alumnoFormSubmitted && (
        <AltaAlumno setShowAlumnoForm={cancelarAlumnoForm} confirmacionRegistro={confirmacionRegistro} newUserEmail={userEmail} newUserPassword={userPassword} />
      )}
    </div>
  )
}

export default Alta
