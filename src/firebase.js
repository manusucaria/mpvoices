import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import {
  getAuth,
  setPersistence,
  browserLocalPersistence
} from 'firebase/auth'
import config from '@/config/config'

const firebaseConfig = {
  apiKey: config.firebaseConfig.API_KEY,
  authDomain: config.firebaseConfig.AUTH_DOMAIN,
  projectId: config.firebaseConfig.PROJECT_ID,
  storageBucket: config.firebaseConfig.STORAGE_BUCKET,
  messagingSenderId: config.firebaseConfig.MESSAGING_SENDER_ID,
  appId: config.firebaseConfig.APP_ID,
  measurementId: config.firebaseConfig.MEASUREMENT_ID
}

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig)
export const firestore = getFirestore()
export const auth = getAuth(firebaseApp)

// Si descomentas la siguiente línea, cuando mientras que el usuario no se desloguee expresamente o cierre el navegador, permanecerá logueado y podremos acceder a su id desde cualquier página
setPersistence(auth, browserLocalPersistence)
