import { auth } from './firebase'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'
import { getProfesores, getAlumnos, getAdmin } from '../app/api/api.js'

const getAuth = async (email, password, router, isSignUp) => {
  if (isSignUp) {
    createUserWithEmailAndPassword(auth, email, password)
      .then(async (userCred) => {
        fetch('/api/auth', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${await userCred.user.getIdToken()}`
          }
        }).then((response) => {
          if (response.status === 200) {
            router.push('/login')
          }
        })
      })
      .catch(error => {
        alert(`Sign up failed: ${error.message} - ${error.code}`)
      })
  } else {
    signInWithEmailAndPassword(auth, email.trim(), password)
      .then(async (userCred) => {
        fetch('/api/auth', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${await userCred.user.getIdToken()}`
          }
        }).then(async (response) => {
          if (response.status === 200) {
            let userType = 'unknown'
            const profesoresData = await getProfesores()
            const alumnosData = await getAlumnos()
            const adminData = await getAdmin()
            if (profesoresData.some(profesor => profesor.Email === email)) {
              userType = 'profesor'
            } else if (alumnosData.some(alumno => alumno.Email === email)) {
              userType = 'alumno'
            } else if (adminData.some(admin => admin.Email === email)) {
              userType = 'admin'
            }
            localStorage.setItem('usuario', userType)
            switch (userType) {
              case 'profesor':
                router.push('/plataforma-profes')
                break
              case 'alumno':
                router.push('/plataforma-alumnos')
                break
              case 'admin':
                router.push('/plataforma-admin')
                break
              default:
                break
            }
          }
        })
      })
      .catch(error => {
        alert(`Login failed: ${error.message} - ${error.code}`)
      })
  }
}

export { getAuth }
