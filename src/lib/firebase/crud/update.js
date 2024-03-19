import { arrayUnion, doc, updateDoc } from 'firebase/firestore'

import { db } from '../firebase'
import { getAlumnoById } from './read'

export const updateAlumnoCancelarClase = async (uid, { fecha }) => {
  try {
    const alumnoRef = doc(db, 'alumnos', uid)

    await updateDoc(alumnoRef, {
      'clases.canceladas': arrayUnion({ fecha }),
      'clases.notificaciones': arrayUnion({ fecha, tipo: 'cancelar' })
    })

    const alumnoUpdated = await getAlumnoById(uid, {
      getUsuario: true,
      getProfesor: true
    })
    return alumnoUpdated
  } catch (error) {
    throw error
  }
}

export const updateAlumnoRecuperarClase = async (uid, { fecha }) => {
  try {
    const alumnoRef = doc(db, 'alumnos', uid)

    await updateDoc(alumnoRef, {
      'clases.recuperar': arrayUnion({ fecha }),
      'clases.notificaciones': arrayUnion({ fecha, tipo: 'recuperar' })
    })

    const alumnoUpdated = await getAlumnoById(uid, {
      getUsuario: true,
      getProfesor: true
    })
    return alumnoUpdated
  } catch (error) {
    throw error
  }
}
