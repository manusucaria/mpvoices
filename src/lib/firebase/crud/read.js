import { collection, where, query, getDocs, getDoc, doc } from 'firebase/firestore'

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
    } else {
      throw new Error('Rol no encontrado')
    }
  } catch (error) {
    return null
  }
}

export const getRolById = async ({ id }) => {
  try {
    const ref = doc(db, 'roles', id)
    const docSnap = await getDoc(ref)
    if (docSnap.exists()) {
      return { ...docSnap.data(), id: docSnap.id }
    } else {
      return null
    }
  } catch (error) {
    return null
  }
}

export const getUsuarioById = async ({ id }) => {
  try {
    const ref = doc(db, 'usuarios', id)
    const docSnap = await getDoc(ref)
    if (docSnap.exists()) {
      return { ...docSnap.data(), id: docSnap.id }
    } else {
      return null
    }
  } catch (error) {
    return null
  }
}

export const getAllProfesores = async ({ getUsuario, getRol } = {}) => {
  try {
    const ref = collection(db, 'profesores')
    const querySnapshot = await getDocs(ref)
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
    return null
  }
}

export const getAllAlumnos = async ({ getUsuario, getRol } = {}) => {
  try {
    const ref = collection(db, 'alumnos')
    const querySnapshot = await getDocs(ref)
    const alumnos = []
    for (const doc of querySnapshot.docs) {
      let usuario = doc.data().usuario
      if (getUsuario && usuario.id) {
        usuario = await getUsuarioById({ id: usuario.id })
      }
      if (getRol && getUsuario && usuario.rol && usuario.rol.id) {
        usuario.rol = await getRolById({ id: usuario.rol.id })
      }
      alumnos.push({ ...doc.data(), id: doc.id, usuario })
    }
    return alumnos
  } catch (error) {
    return null
  }
}
