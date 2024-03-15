import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signOut as signOutFirebase,
  signInWithEmailAndPassword
} from 'firebase/auth'
import { doc, setDoc } from 'firebase/firestore'

import { auth, db } from './firebase'
import {
  AlumnoConverter,
  ProfesorConverter,
  UsuarioConverter
} from './schemas.converters'
import { Alumno, Profesor, Usuario } from './schemas'

export const signIn = async ({ email, password }) => {
  try {
    const userSigned = await signInWithEmailAndPassword(auth, email, password)
    const idToken = await userSigned.user.getIdToken()

    await fetch('api/auth/session', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${idToken}`
      }
    })
  } catch (error) {
    throw error
  }
}

export const signUp = async ({
  email,
  password,
  rolAsignado,
  phoneNumber = '',
  ...rest
}) => {
  try {
    const createdUser = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    )

    const firebaseUser = createdUser.user

    await fetch('/api/auth/custom-rol', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'x-uid': firebaseUser.uid,
        'x-rol': rolAsignado.nombre
      }
    })

    const setUsuario = new Usuario({
      nombre: rest.nombre,
      apellido: rest.apellido,
      telefono: phoneNumber,
      rol: rolAsignado,
      email
    })

    const usuarioRef = doc(db, 'usuarios', firebaseUser.uid).withConverter(
      UsuarioConverter
    )

    await setDoc(usuarioRef, setUsuario)

    switch (rolAsignado.nombre) {
      case 'profesor': {
        const setProfesor = new Profesor({
          instrumento: rest.instrumento,
          usuario: firebaseUser.uid,
          dias: rest.dias
        })
        const profesorRef = doc(
          db,
          'profesores',
          firebaseUser.uid
        ).withConverter(ProfesorConverter)
        await setDoc(profesorRef, setProfesor)
        break
      }
      case 'alumno': {
        const setAlumno = new Alumno({
          usuario: firebaseUser.uid,
          profesor: rest.profesor,
          instrumento: rest.instrumento,
          clase_dia: rest.clase_dia,
          clase_duracion: rest.clase_duracion,
          clase_hora_inicio: rest.clase_hora_inicio
        })
        const alumnoRef = doc(db, 'alumnos', firebaseUser.uid).withConverter(
          AlumnoConverter
        )
        await setDoc(alumnoRef, setAlumno)
        break
      }
      default:
    }
  } catch (error) {
    throw error
  }
}

export const signOut = async () => {
  try {
    await signOutFirebase(auth)
    await fetch('/api/auth/session', {
      method: 'DELETE'
    })
  } catch (error) {
    throw error
  }
}

export const verifyEmailAccount = async () => {
  try {
    await sendEmailVerification(auth.currentUser)
    await signOut(auth)
  } catch (error) {
    throw error
  }
}
