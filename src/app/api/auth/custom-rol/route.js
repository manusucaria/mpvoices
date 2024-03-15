import { auth } from 'firebase-admin'
import { headers } from 'next/headers'
import { NextResponse } from 'next/server'

import { runAdminApp } from '@/lib/firebase/firebase-admin'

// Inicializar Firebase Admin App para obtener la sesión del usuario en la aplicación de administración.
runAdminApp()

export const POST = async () => {
  try {
    const uid = headers().get('x-uid')
    const rol = headers().get('x-rol')

    await auth().setCustomUserClaims(uid, { rol })

    return new Response(JSON.stringify({ message: 'Rol asignado' }), {
      status: 200
    })
  } catch (error) {
    return NextResponse.json(
      { isLogged: false, error: error.message },
      { status: 400, headers: { 'Content-Type': 'application/json' } }
    )
  }
}
