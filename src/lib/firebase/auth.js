import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signInWithEmailAndPassword,
  signOut as signOutFirebase
} from 'firebase/auth'

import { auth, db } from './firebase'
import { doc, setDoc } from 'firebase/firestore'

export const signIn = async (user) => {
  try {
    const userSigned = await signInWithEmailAndPassword(
      auth,
      user.email,
      user.password
    )
    const idToken = await userSigned.user.getIdToken()

    await fetch('api/auth/session', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${idToken}`
      }
    })
  } catch (error) {
    throw new Error(error)
  }
}

export const signUP = async (
  email,
  password,
  sendEmail,
  rolAsignado,
  ...rest
) => {
  try {
    const createdUser = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    )

    const firebaseUser = createdUser.user

    await fetch('api/auth/custom-rol', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-uid': firebaseUser.uid,
        'x-rol': rolAsignado.nombre
      }
    })

    await setDoc(doc(db, 'usuarios', firebaseUser.uid), {
      email,
      ...rest,
      rol: doc(db, 'roles', rolAsignado.id)
    })

    let collection
    let additionalData = {}

    switch (rolAsignado.nombre) {
      case 'profesor': {
        collection = 'profesores'
        const instrumento = rest?.instrumento
        additionalData = {
          instrumento: doc(db, 'instrumentos', instrumento)
        }
        break
      }
      case 'alumno': {
        collection = 'alumnos'
        const profesor = rest?.profesor
        additionalData = {
          profesor: doc(db, 'profesores', profesor)
        }
        break
      }
      default:
    }

    await setDoc(doc(db, collection, firebaseUser.uid), {
      usuario: doc(db, 'usuarios', firebaseUser.uid),
      ...additionalData
    })
  } catch (error) {
    throw new Error(error)
  }
}

export const signOut = async () => {
  try {
    await signOutFirebase(auth)
    await fetch('api/auth/session', {
      method: 'DELETE'
    })
  } catch (error) {
    throw new Error(error)
  }
}

export const verifyEmailAccount = async () => {
  try {
    await sendEmailVerification(auth.currentUser)
    await signOut(auth)
  } catch (error) {
    throw new Error(error)
  }
}
