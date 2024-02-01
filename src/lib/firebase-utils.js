import { auth } from './firebase'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, deleteUser, updateProfile } from 'firebase/auth'

const signUp = async (email, password, rol) => {
  return createUserWithEmailAndPassword(auth, email, password)
    .then(async (userCredential) => {
      const user = userCredential.user

      await updateProfile(user, {
        displayName: rol
      })

      return user.uid
    })
    .catch(error => {
      throw error
    })
}

const signIn = async (email, password, router) => {
  return signInWithEmailAndPassword(auth, email.trim(), password)
    .then(async (userCredential) => {
      const user = userCredential.user
      const idToken = await user.getIdToken()
      const response = await fetch('/api/auth', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${idToken}`
        }
      })
      if (response.status === 200) {
        const rol = user.displayName || 'unknown'
        switch (rol) {
          case 'Profesor':
            router.push('/plataforma-profes')
            break
          case 'Alumno':
            router.push('/plataforma-alumnos')
            break
          case 'Administrador':
            router.push('/plataforma-admin')
            break
          default:
            break
        }
      }
    })
    .catch(error => {
      throw error
    })
}

const deleteUserByUid = (uid) => {
  return deleteUser(auth, uid)
    .then(() => {
      console.log(`Usuario con UID ${uid} eliminado correctamente.`)
    })
    .catch((error) => {
      console.error('Error al eliminar el usuario:', error)
      return Promise.reject(error)
    })
}

export { signUp, signIn, deleteUserByUid }
