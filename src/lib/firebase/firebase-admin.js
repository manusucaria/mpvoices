import { cert, getApps, initializeApp } from 'firebase-admin/app'

import firebaseConfig from '@/config/firebase.config'

const config = {
  credential: cert({
    projectId: firebaseConfig.PROJECT_ID,
    clientEmail: firebaseConfig.ADMIN_CLIENT_EMAIL,
    privateKey: firebaseConfig.ADMIN_PRIVATE_KEY
  })
}

export const runAdminApp = () => getApps() <= 0 && initializeApp(config)
