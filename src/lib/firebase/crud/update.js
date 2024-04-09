import {
  arrayRemove,
  arrayUnion,
  doc,
  getDoc,
  updateDoc
} from 'firebase/firestore'
import { format, differenceInHours } from 'date-fns'
import { es } from 'date-fns/locale'
import { db } from '../firebase'
import { getAlumnoById } from './read'

export const updateAlumnoCancelarClase = async (
  uid,
  { fecha, hora_inicio, duracion, alumno_clase_agendada_uid = null }
) => {
  try {
    const now = new Date()
    const hoursUntilClass = differenceInHours(fecha, now)
    if (hoursUntilClass < 24) {
      throw new Error('La clase solo se puede cancelar con 24 horas de anticipación.')
    }

    const alumnoRef = doc(db, 'alumnos', uid)
    const alumno = await getAlumnoById(uid, { getUsuario: true })
    const { clases } = alumno
    const dayUpdated = format(fecha, 'eeee', { locale: es })
    const day = clases.dia

    const agendadasObj = {
      fecha,
      hora_inicio,
      duracion
    }

    if (alumno_clase_agendada_uid) {
      const alumnoOriginal = await getAlumnoById(alumno_clase_agendada_uid, {
        getUsuario: true
      })
      if (alumnoOriginal) {
        const notificacion = {
          fecha,
          tipo: 'cancelada',
          usuario: {
            nombre: alumno.usuario.full_name.nombre,
            apellido: alumno.usuario.full_name.apellido
          }
        }
        await updateDoc(doc(db, 'alumnos', alumno_clase_agendada_uid), {
          'clases.notificaciones': arrayUnion(notificacion)
        })
      }
      agendadasObj.alumno_clase_cancelada = doc(
        db,
        'alumnos',
        alumno_clase_agendada_uid
      )
    }

    const updateData = {
      'clases.agendadas': arrayRemove(agendadasObj),
      'clases.notificaciones': arrayUnion({
        fecha,
        tipo: 'cancelada',
        usuario: {
          nombre: alumno.usuario.full_name.nombre,
          apellido: alumno.usuario.full_name.apellido
        }
      })
    }

    if (
      clases.hora_inicio === hora_inicio &&
      clases.duracion === duracion &&
      dayUpdated === day
    ) {
      updateData['clases.canceladas'] = arrayUnion({
        fecha,
        hora_inicio,
        duracion
      })
    } else {
      const alumno_clase_agendada_ref = doc(
        db,
        'alumnos',
        alumno_clase_agendada_uid
      )
      await updateDoc(alumno_clase_agendada_ref, {
        'clases.notificaciones': arrayUnion({
          fecha,
          tipo: 'agendada',
          usuario: {
            nombre: alumno.usuario.full_name.nombre,
            apellido: alumno.usuario.full_name.apellido
          }
        })
      })
    }

    await updateDoc(alumnoRef, updateData)

    const alumnoUpdated = await getAlumnoById(uid, {
      getUsuario: true,
      getProfesor: true
    })
    return alumnoUpdated
  } catch (error) {
    throw error
  }
}

export const updateAlumnoRecuperarClase = async (
  uid,
  { fecha, hora_inicio, duracion, alumno_clase_cancelada_uid }
) => {
  try {
    const alumnoRef = doc(db, 'alumnos', uid)
    const alumnoSnap = await (await getDoc(doc(db, 'usuarios', uid))).data()

    const alumnoCanceladoRef = doc(db, 'alumnos', alumno_clase_cancelada_uid)

    await updateDoc(alumnoRef, {
      'clases.agendadas': arrayUnion({
        fecha,
        hora_inicio,
        duracion,
        alumno_clase_cancelada: doc(db, 'alumnos', alumno_clase_cancelada_uid)
      })
    })

    await updateDoc(alumnoCanceladoRef, {
      'clases.notificaciones': arrayUnion({
        fecha,
        tipo: 'agendada',
        usuario: {
          nombre: alumnoSnap.full_name.nombre,
          apellido: alumnoSnap.full_name.apellido
        }
      })
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
