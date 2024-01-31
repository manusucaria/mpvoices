import {
  collection,
  getDocs,
  query,
  doc,
  getDoc,
  addDoc,
  updateDoc,
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

// UPDATE
export const updateAlumno = async (id, obj) => {
  const docRef = doc(db, 'alumnos', id)
  await updateDoc(docRef, obj)
}
export const updateProfesor = async (id, obj) => {
  const docRef = doc(db, 'profesores', id)
  await updateDoc(docRef, obj)
}

// READ WITH WHERE
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
