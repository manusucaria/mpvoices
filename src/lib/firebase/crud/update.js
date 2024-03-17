import { doc, updateDoc } from 'firebase/firestore'

import { db } from '../firebase'
import { getAlumnoById } from './read'

export const createNotificacionAlumno = async (uid, { notificacion }) => {
  try {
    const alumnoRef = doc(db, 'alumnos', uid)
    const alumnoSnap = await getAlumnoById(uid)
    if (alumnoSnap.notificaciones.includes(notificacion)) {
      throw new Error('Ya fué notificado previamente')
    }

    await updateDoc(alumnoRef, {
      notificaciones: [...alumnoSnap.notificaciones, notificacion],
      'clases.canceladas': alumnoSnap.clases.canceladas > 0 ? alumnoSnap.clases.canceladas + 1 : 1
    })

    const newNotificacionesAlumnoUpdated = await getAlumnoById(uid, {
      getUsuario: true,
      getProfesor: true
    })

    return newNotificacionesAlumnoUpdated
  } catch (error) {
    throw error
  }
}

export const createAgendarRecuperarClaseAlumno = async (uid, { notificacion }) => {
  try {
    const alumnoRef = doc(db, 'alumnos', uid)
    const alumnoSnap = await getAlumnoById(uid)
    if (alumnoSnap.notificaciones.includes(notificacion)) {
      throw new Error('Ya fué notificado previamente')
    }

    await updateDoc(alumnoRef, {
      'clases.canceladas': alumnoSnap.clases.canceladas > 0 ? alumnoSnap.clases.canceladas - 1 : 0,
      notificaciones: [...alumnoSnap.notificaciones, notificacion]
    })

    const newAgendarRecuperarClaseAlumnoUpdated = await getAlumnoById(uid, {
      getUsuario: true,
      getProfesor: true
    })

    return newAgendarRecuperarClaseAlumnoUpdated
  } catch (error) {
    throw error
  }
}
