import { auth } from 'firebase-admin'
import { headers } from 'next/headers'
import { NextResponse } from 'next/server'

export const POST = async () => {
  try {
    const uid = headers().get('x-uid')
    const rol = headers().get('x-rol')

    auth().setCustomUserClaims(uid, { rol })

    return NextResponse.json({ message: 'Claims added successfully' })
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
