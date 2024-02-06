import { auth } from './firebase'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, deleteUser, updateProfile, signOut } from 'firebase/auth'

const signUp = async (newUserEmail, newUserPassword, newUserRol, adminEmail, adminPassword) => {
  const adminCredentials = {
    email: adminEmail,
    password: adminPassword
  }

  return createUserWithEmailAndPassword(auth, newUserEmail, newUserPassword)
    .then(async (userCredential) => {
      const user = userCredential.user

      await updateProfile(user, {
        displayName: newUserRol
      })

      await signInWithEmailAndPassword(auth, adminCredentials.email, adminCredentials.password)

      return user.uid
    })
    .catch(error => {
      throw error
    })
}

const logOut = () => {
  return signOut(auth)
    .then(() => {
      console.log('Se ha cerrado la sesión correctamente.')
    })
    .catch((error) => {
      console.error('Error al cerrar sesión:', error)
      throw error // Propaga el error para que pueda ser manejado en el componente.
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

export { signUp, signIn, deleteUserByUid, logOut }
