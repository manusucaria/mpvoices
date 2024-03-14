import { auth } from 'firebase-admin'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

import firebaseConfig from '@/config/firebase.config'
import { runAdminApp } from '@/lib/firebase/firebase-admin'

// Inicializar Firebase Admin App para obtener la sesión del usuario en la aplicación de administración.
runAdminApp()

export const GET = async () => {
  try {
    const cookieSession = cookies().get(
      firebaseConfig.COOKIE_SESSION_NAME
    )?.value
    const sessionCookie = await auth().verifySessionCookie(cookieSession)
    await auth().getUser(sessionCookie.uid)

    return NextResponse.json({
      isLogged: true,
      rol: sessionCookie.rol,
      email_verified: sessionCookie.email_verified
    })
  } catch (error) {
    return NextResponse.json(
      { isLogged: false, error: error.message, code: error.code },
      { status: 500 }
    )
  }
}
