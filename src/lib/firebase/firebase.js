import { getApp, getApps, initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

import { firebaseConfig } from '@/config/config'

const config = {
  apiKey: firebaseConfig.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: firebaseConfig.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: firebaseConfig.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: firebaseConfig.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: firebaseConfig.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: firebaseConfig.NEXT_PUBLIC_FIREBASE_APP_ID
}

const app = getApps().length > 0 ? getApp() : initializeApp(config)
const db = getFirestore(app)

export { app, db }
