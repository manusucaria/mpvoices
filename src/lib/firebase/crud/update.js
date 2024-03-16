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
      notificaciones: [...alumnoSnap.notificaciones, notificacion]
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
