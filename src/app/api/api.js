import {
  collection,
  getDocs,
  query,
  doc,
  getDoc,
  addDoc,
  where
} from 'firebase/firestore'
import { db } from '../../lib/firebase'

// CREATE
export const createAlumno = async (obj) => {
  const colRef = collection(db, 'alumnos')
  const data = await addDoc(colRef, obj)
  return data.id
}

// READ
export const getAlumnos = async () => {
  const colRef = collection(db, 'alumnos')
  const result = await getDocs(query(colRef))
  return getArrayFromCollection(result)
}
export const getProfesores = async () => {
  const colRef = collection(db, 'profesores')
  const result = await getDocs(query(colRef))
  return getArrayFromCollection(result)
}
export const getAdmin = async () => {
  const colRef = collection(db, 'admin')
  const result = await getDocs(query(colRef))
  return getArrayFromCollection(result)
}

// READ WITH WHERE
// Tener en cuenta que el tipo de dato de la condición debe coincidir con el tipo de dato que hay en Firebase o no obtendré un dato de respuesta
export const getAlumnosByDia = async (IdDia) => {
  const colRef = collection(db, 'alumnos')
  const result = await getDocs(query(colRef, where('dia', '==', IdDia)))
  return getArrayFromCollection(result)
}

export const getAlumnosByProfesor = async (idProfesor) => {
  const colRef = collection(db, 'alumnos')
  const result = await getDoc(doc(colRef, idProfesor))
  return result.data()
}

const getArrayFromCollection = (collection) => {
  return collection.docs.map((doc) => {
    return { ...doc.data(), id: doc.id }
  })
}
