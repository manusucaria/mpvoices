import {
  collection,
  getDocs,
  query,
  doc,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  where
} from 'firebase/firestore'
import { db } from '../../lib/firebase'

// CREATE
export const createAlumno = async (obj) => {
  const colRef = collection(db, 'alumnos')
  const data = await addDoc(colRef, obj)
  return data.id
}
export const createProfesor = async (obj) => {
  const colRef = collection(db, 'profesores')
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

// DELETE

export const deleteAlumno = async (email, password) => {
  const q = query(collection(db, 'alumnos'), where('Email', '==', email))
  const querySnapshot = await getDocs(q)
  if (querySnapshot.empty) {
    throw new Error('Alumno no encontrado')
  }
  let alumnoEncontrado = false
  querySnapshot.forEach(doc => {
    const alumnoData = doc.data()
    if (alumnoData.Contraseña === password) {
      deleteDoc(doc.ref)
      alumnoEncontrado = true
    }
  })
  if (!alumnoEncontrado) {
    throw new Error('Contraseña incorrecta')
  }
}

export const deleteProfesor = async (email, password) => {
  const q = query(collection(db, 'profesores'), where('Email', '==', email))
  const querySnapshot = await getDocs(q)
  if (querySnapshot.empty) {
    throw new Error('Profesor no encontrado')
  }
  let profesorEncontrado = false
  querySnapshot.forEach(doc => {
    const profesorData = doc.data()
    if (profesorData.Contraseña === password) {
      deleteDoc(doc.ref)
      profesorEncontrado = true
    }
  })
  if (!profesorEncontrado) {
    throw new Error('Contraseña incorrecta')
  }
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

/**
 * Obtiene la información de un alumno por su dirección de correo electrónico, excluyendo la contraseña.
 *
 * @param {Object} options - Opciones de búsqueda.
 * @param {string} options.email - Dirección de correo electrónico del alumno a buscar.
 * @returns {Promise<Object>} - Un objeto que representa la información del alumno sin la contraseña.
 * @throws {Error} - Se lanza un error si el alumno no es encontrado.
 */
export const getAlumnoByEmail = async ({ email }) => {
  // Crea una consulta para buscar al alumno por su dirección de correo electrónico
  const q = query(collection(db, 'alumnos'), where('Email', '==', email))

  // Obtiene el resultado de la consulta
  const querySnapshot = await getDocs(q)

  // Verifica si el resultado de la consulta está vacío
  if (querySnapshot.empty) {
    throw new Error('Alumno no encontrado')
  }

  // Extrae los datos del primer documento encontrado
  const alumnoData = querySnapshot.docs[0].data()

  // Excluye el campo 'Contraseña' antes de devolver los datos
  const { Contraseña, ...alumnoWithoutPassword } = alumnoData

  // Retorna la información del alumno sin la contraseña
  return alumnoWithoutPassword
}

const getArrayFromCollection = (collection) => {
  return collection.docs.map((doc) => {
    return { ...doc.data(), id: doc.id }
  })
}
