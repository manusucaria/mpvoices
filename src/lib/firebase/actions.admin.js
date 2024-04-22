import { deleteDoc, doc, getDoc, updateDoc } from 'firebase/firestore'

import { db } from './firebase'
import { Profesor, Usuario } from './schemas'
import { getAlumnoById } from './crud/read'

export const updateUsuarioProfesorById = async (
  uid,
  { nombre, apellido, birthdate, instagram, email, telefono, dias, instrumento, usuario }
) => {
  try {
    const data = await (
      await fetch('/api/admin/users', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'x-uid': uid
        },
        body: JSON.stringify({ email })
      })
    ).json()

    if (data.code === 'auth/email-already-exists') {
      throw new Error('El email ya está en uso')
    }

    const profesorData = new Profesor({
      dias,
      instrumento,
      usuarioUid: usuario.id
    })
    const usuarioData = new Usuario({
      nombre,
      apellido,
      birthdate,
      instagram,
      email,
      telefono,
      rolUid: usuario.rol.id
    })

    const profesorRef = doc(db, 'profesores', uid)
    await updateDoc(profesorRef, Object.assign({}, profesorData))

    const usuarioRef = doc(db, 'usuarios', usuario.id)
    await updateDoc(usuarioRef, Object.assign({}, usuarioData))

    const newProfesorUpdatedSnap = await getDoc(profesorRef)
    const newProfesorUpdated = newProfesorUpdatedSnap.data()
    newProfesorUpdated.id = newProfesorUpdatedSnap.id

    const newUsuarioUpdated = await getDoc(usuarioRef)

    newProfesorUpdated.usuario = {
      ...newUsuarioUpdated.data(),
      id: newUsuarioUpdated.id
    }

    return newProfesorUpdated
  } catch (error) {
    throw error
  }
}

export const updateUsuarioAlumnoById = async (
  uid,
  { nombre, apellido, birthdate, email, instagram, telefono, usuario }
) => {
  try {
    const data = await (
      await fetch('/api/admin/users', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'x-uid': uid
        },
        body: JSON.stringify({ email })
      })
    ).json()

    if (data.error && data.code === 'auth/email-already-exists') {
      throw new Error('El email ya está en uso')
    }

    const usuarioData = new Usuario({
      nombre,
      apellido,
      birthdate,
      email,
      instagram,
      telefono,
      rolUid: usuario.rol.id
    })

    const usuarioRef = doc(db, 'usuarios', uid)
    await updateDoc(usuarioRef, Object.assign({}, usuarioData))

    const newUsuarioUpdated = await getAlumnoById(uid, { getUsuario: true })

    return newUsuarioUpdated
  } catch (error) {
    throw error
  }
}

export const updateClasesAlumno = async (
  uid,
  { dia, hora_inicio, duracion, instrumento, profesor }
) => {
  try {
    const alumnoRef = doc(db, 'alumnos', uid)
    await updateDoc(alumnoRef, {
      instrumento,
      profesor: doc(db, 'profesores', profesor.id),
      'clases.dia': dia,
      'clases.hora_inicio': hora_inicio,
      'clases.duracion': duracion
    })

    const newClaseUsuarioUpdated = await getAlumnoById(uid, {
      getUsuario: true,
      getProfesor: true
    })

    return newClaseUsuarioUpdated
  } catch (error) {
    throw error
  }
}

export const updatePagosAlumno = async (uid, { saldo, actualizacion }) => {
  try {
    const alumnoRef = doc(db, 'alumnos', uid)
    await updateDoc(alumnoRef, {
      'pagos.saldo': saldo,
      'pagos.actualizacion': actualizacion
    })

    const newPagosUsuarioUpdated = await getAlumnoById(uid, {
      getUsuario: true,
      getProfesor: true
    })

    return newPagosUsuarioUpdated
  } catch (error) {
    throw error
  }
}

export const udpateNotasAlumno = async (uid, { notas }) => {
  try {
    const alumnoRef = doc(db, 'alumnos', uid)
    await updateDoc(alumnoRef, { notas })

    const newNotasUsuarioUpdated = await getAlumnoById(uid, {
      getUsuario: true,
      getProfesor: true
    })

    return newNotasUsuarioUpdated
  } catch (error) {
    throw error
  }
}

export const deleteUserAsAdmin = async ({ uid }) => {
  try {
    const data = await (
      await fetch('/api/admin/users', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'x-uid': uid
        }
      })
    ).json()

    if (data.error && data.code === 'auth/user-not-found') {
      throw new Error('User not found')
    }

    switch (data.collection) {
      case 'profesores':
        await deleteDoc(doc(db, 'profesores', uid))
        break
      case 'alumnos':
        await deleteDoc(doc(db, 'alumnos', uid))
        break
      default:
        return
    }

    await deleteDoc(doc(db, 'usuarios', uid))
  } catch (error) {
    throw new Error(error)
  }
}
