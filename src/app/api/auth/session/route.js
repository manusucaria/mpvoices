import { auth } from 'firebase-admin'

import { cookies, headers } from 'next/headers'
import { NextResponse } from 'next/server'

import firebaseConfig from '@/config/firebase.config'
import { runAdminApp } from '@/lib/firebase/firebase-admin'

runAdminApp()

// Crear una sesión
export const POST = async () => {
  try {
    const idToken = headers().get('Authorization').split('Bearer ')[1]
    const decodedIdToken = await auth().verifyIdToken(idToken)

    if (!(new Date().getTime() / 1000 - decodedIdToken.auth_time < 5 * 60)) {
      return NextResponse.json(
        { isLogged: false, error: 'Token expired' },
        { status: 401 }
      )
    }

    const expiresIn = 60 * 60 * 24 * 5 * 1000
    const sessionCookie = await auth().createSessionCookie(idToken, {
      expiresIn
    })

    cookies().set(firebaseConfig.COOKIE_SESSION_NAME, sessionCookie, {
      httpOnly: true,
      maxAge: expiresIn,
      secure: true,
      sameSite: 'strict'
    })

    return NextResponse.json({ isLogged: true })
  } catch (error) {
    return NextResponse.json(
      { isLogged: false, error: error.message },
      { status: 400 }
    )
  }
}

// Eliminar una sesión
export const DELETE = async () => {
  try {
    cookies().delete(firebaseConfig.COOKIE_SESSION_NAME)
    return NextResponse.json({ isLogged: false })
  } catch (error) {
    return NextResponse.json(
      { isLogged: false, error: error.message },
      { status: 400 }
    )
  }
}
