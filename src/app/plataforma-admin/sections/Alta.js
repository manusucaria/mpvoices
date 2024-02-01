import React, { useState } from 'react'
import AltaAlumno from '../components/AltaAlumno'
import AltaProfe from '../components/AltaProfe'
import AltaUsuarioAlumno from '../components/AltaUsuarioAlumno'
import { deleteUserByUid } from '../../../lib/firebase-utils'

const Alta = () => {
  const [showProfesorForm, setShowProfesorForm] = useState(false)
  const [showAlumnoForm, setShowAlumnoForm] = useState(false)
  const [alumnoFormSubmitted, setAlumnoFormSubmitted] = useState(false)
  const [registeredUid, setRegisteredUid] = useState('')

  const handleSetUidRegistered = (uid) => {
    setRegisteredUid(uid)
  }

  const handleShowProfesorForm = () => {
    setShowProfesorForm(true)
    setShowAlumnoForm(false)
    setAlumnoFormSubmitted(false)
  }

  const handleShowAlumnoForm = () => {
    setShowAlumnoForm(true)
    setShowProfesorForm(false)
    setAlumnoFormSubmitted(false)
  }

  const cancelarAlumnoForm = () => {
    if (registeredUid) {
      deleteUserByUid(registeredUid)
        .then(() => {
          console.log(`Usuario con UID ${registeredUid} eliminado correctamente.`)
        })
        .catch((error) => {
          console.error('Error al eliminar el usuario:', error)
        })
    }
    setShowAlumnoForm(false)
    setShowProfesorForm(false)
    setAlumnoFormSubmitted(false)
  }

  return (
    <div className='w-full sm:w-3/6 mx-auto mt-4'>
      <h2 className="text-center text-3xl sm:text-5xl mb-4 text-white">Usuarios Nuevos</h2>
      <div className="flex justify-center mb-4">
        <button className="mr-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={handleShowProfesorForm}>
          Alta Profesor
        </button>
        <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded" onClick={handleShowAlumnoForm}>
          Alta Alumno
        </button>
      </div>
      {showProfesorForm && (
        <AltaProfe />
      )}
      {showAlumnoForm && !alumnoFormSubmitted && (
        <AltaUsuarioAlumno setAlumnoFormSubmitted={setAlumnoFormSubmitted} setUidRegistered={handleSetUidRegistered} />
      )}
      {alumnoFormSubmitted && (
        <AltaAlumno setShowAlumnoForm={cancelarAlumnoForm} />
      )}
    </div>
  )
}

export default Alta
