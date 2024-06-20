import {
  collection,
  where,
  query,
  getDocs,
  getDoc,
  doc,
  limit,
  startAfter
} from 'firebase/firestore'

import { db } from '../firebase'
import { RolConverter } from '../schemas.converters'

export const getRolByName = async ({ nombre }) => {
  try {
    const rolesRef = collection(db, 'roles')
    const q = query(rolesRef, where('nombre', '==', nombre)).withConverter(
      RolConverter
    )
    const querySnapshot = await getDocs(q)
    const rol = querySnapshot.docs[0]

    if (rol.exists()) {
      return { ...rol.data(), id: rol.id }
    }
  } catch (error) {
    throw error
  }
}

export const getRolById = async ({ id }) => {
  try {
    const ref = doc(db, 'roles', id)
    const docSnap = await getDoc(ref)
    if (docSnap.exists()) {
      return { ...docSnap.data(), id: docSnap.id }
    }
  } catch (error) {
    throw error
  }
}

export const getUsuarioById = async ({ id }) => {
  try {
    const ref = doc(db, 'usuarios', id)
    const docSnap = await getDoc(ref)
    if (docSnap.exists()) {
      return { ...docSnap.data(), id: docSnap.id }
    }
  } catch (error) {
    throw error
  }
}

export const getAllProfesores = async ({ getUsuario, getRol, page = 1, pageSize = 25 } = {}) => {
  try {
    const ref = collection(db, 'profesores')
    let querySnap = query(ref, limit(pageSize))
    if (page > 1) {
      const lastDoc = await getDocs(query(ref, limit(pageSize * (page - 1))))
      querySnap = query(ref, startAfter(lastDoc.docs[lastDoc.docs.length - 1]), limit(pageSize))
    }
    const querySnapshot = await getDocs(querySnap)
    const profesores = []
    for (const doc of querySnapshot.docs) {
      let usuario = doc.data().usuario
      if (getUsuario && usuario.id) {
        usuario = await getUsuarioById({ id: usuario.id })
      }
      if (getRol && getUsuario && usuario.rol && usuario.rol.id) {
        usuario.rol = await getRolById({ id: usuario.rol.id })
      }
      profesores.push({ ...doc.data(), id: doc.id, usuario })
    }
    return profesores
  } catch (error) {
    throw error
  }
}

export const getProfesorById = async (uid, { getUsuario, getRol } = {}) => {
  try {
    const ref = doc(db, 'profesores', uid)
    const docSnap = await getDoc(ref)
    if (docSnap.exists()) {
      let usuario = docSnap.data().usuario
      if (getUsuario && usuario.id) {
        usuario = await getUsuarioById({ id: usuario.id })
      }
      if (getRol && getUsuario && usuario.rol && usuario.rol.id) {
        usuario.rol = await getRolById({ id: usuario.rol.id })
      }
      return { ...docSnap.data(), id: docSnap.id, usuario }
    }
  } catch (error) {
    throw error
  }
}

export const getAllAlumnos = async ({ getUsuario, getRol, getProfesor, getByDayName } = {}) => {
  try {
    let ref
    if (getByDayName) {
      ref = collection(db, 'alumnos')
      ref = query(ref, where('clases.dia', '==', getByDayName))
    } else {
      ref = collection(db, 'alumnos')
    }
    const querySnapshot = await getDocs(ref)
    const alumnos = []
    for (const doc of querySnapshot.docs) {
      let usuario = doc.data().usuario
      let profesor = doc.data().profesor
      if (getUsuario && usuario.id) {
        usuario = await (await getDoc(usuario)).data()
      }
      if (getRol && getUsuario && usuario.rol && usuario.rol.id) {
        usuario.rol = await (await getDoc(usuario.rol)).data()
      }
      if (getProfesor && profesor && profesor.id) {
        profesor = await (await getDoc(profesor)).data()
      }
      alumnos.push({ ...doc.data(), id: doc.id, usuario, profesor })
    }
    return alumnos
  } catch (error) {
    throw error
  }
}

export const getAllAlumnosFromAProfesorExcludingCurrentAlumno = async (profesorUid, alumnoUid, { getUsuario, getRol, getProfesor } = {}) => {
  try {
    const profesorRef = doc(db, 'profesores', profesorUid)
    const ref = collection(db, 'alumnos')
    const q = query(ref, where('profesor', '==', profesorRef))
    const querySnapshot = await getDocs(q)
    const alumnos = []
    for (const doc of querySnapshot.docs) {
      let profesor = doc.data().profesor
      let usuario = doc.data().usuario
      if (doc.id === alumnoUid) continue
      if (getUsuario && usuario.id) {
        usuario = await getUsuarioById({ id: usuario.id })
      }
      if (getRol && getUsuario && usuario.rol && usuario.rol.id) {
        usuario.rol = await getRolById({ id: usuario.rol.id })
      }
      if (getProfesor && profesor && profesor.id) {
        profesor = await getProfesorById(profesor.id, { getUsuario: true })
      }
      alumnos.push({ ...doc.data(), id: doc.id, usuario, profesor })
    }
    return alumnos
  } catch (error) {
    throw error
  }
}

export const getAlumnoById = async (uid, { getUsuario, getRol, getProfesor } = {}) => {
  try {
    const ref = doc(db, 'alumnos', uid)
    const docSnap = await getDoc(ref)
    if (docSnap.exists()) {
      let usuario = docSnap.data().usuario
      let profesor = docSnap.data().profesor
      if (getUsuario && usuario.id) {
        usuario = await getUsuarioById({ id: usuario.id })
      }
      if (getRol && getUsuario && usuario.rol && usuario.rol.id) {
        usuario.rol = await getRolById({ id: usuario.rol.id })
      }
      if (getProfesor && profesor && profesor.id) {
        profesor = await getProfesorById(profesor.id, { getUsuario: true })
      }
      return { ...docSnap.data(), id: docSnap.id, usuario, profesor }
    }
  } catch (error) {
    throw error
  }
}
