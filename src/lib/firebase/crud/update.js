import { arrayRemove, arrayUnion, doc, getDoc, updateDoc } from 'firebase/firestore'
import { format } from 'date-fns'
import { es } from 'date-fns/locale'

import { db } from '../firebase'
import { getAlumnoById } from './read'

export const updateAlumnoCancelarClase = async (uid, { fecha, hora_inicio, duracion }) => {
  try {
    const alumnoRef = doc(db, 'alumnos', uid)
    const alumnoSnap = await getDoc(alumnoRef)
    const alumno = alumnoSnap.data()
    const { clases } = alumno
    const dayUpdated = format(fecha, 'eeee', { locale: es })
    const day = clases.dia
    if (
      clases.hora_inicio === hora_inicio &&
      clases.duracion === duracion &&
      dayUpdated === day
    ) {
      await updateDoc(alumnoRef, {
        'clases.agendadas': arrayRemove({ fecha, hora_inicio, duracion }),
        'clases.canceladas': arrayUnion({ fecha, hora_inicio, duracion }),
        'clases.notificaciones': arrayUnion({ fecha, tipo: 'cancelar' })
      })
    } else {
      await updateDoc(alumnoRef, {
        'clases.agendadas': arrayRemove({ fecha, hora_inicio, duracion }),
        'clases.notificaciones': arrayUnion({ fecha, tipo: 'cancelar' })
      })
    }

    const alumnoUpdated = await getAlumnoById(uid, {
      getUsuario: true,
      getProfesor: true
    })
    return alumnoUpdated
  } catch (error) {
    console.log(error)
    throw error
  }
}

export const updateAlumnoRecuperarClase = async (uid, { fecha, hora_inicio, duracion }) => {
  try {
    const alumnoRef = doc(db, 'alumnos', uid)

    await updateDoc(alumnoRef, {
      'clases.agendadas': arrayUnion({ fecha, hora_inicio, duracion }),
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
