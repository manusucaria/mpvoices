import { NextResponse } from 'next/server'

import firebaseConfig from './config/firebase.config'
import { cookies } from 'next/headers'

export const middleware = async (req) => {
  const { pathname, origin } = req.nextUrl
  try {
    const cookieStore = cookies()
    const cookieSession = cookieStore.get(
      firebaseConfig.COOKIE_SESSION_NAME
    )?.value

    if (pathname.startsWith('/login') && !cookieSession) {
      return NextResponse.next()
    } else if (pathname.startsWith('/login') && cookieSession) {
      return NextResponse.redirect(new URL('/', req.url))
    }

    const data = await (
      await fetch(`${origin}/api/auth/verify-session`, {
        headers: {
          'Content-Type': 'application/json',
          Cookie: `${firebaseConfig.COOKIE_SESSION_NAME}=${cookieSession}`
        }
      })
    ).json()

    if (
      (data?.error && data?.code === 'auth/user-not-found') ||
      !data.isLogged
    ) {
      return NextResponse.redirect(new URL('/login', req.url), {
        headers: {
          'Set-Cookie': `${firebaseConfig.COOKIE_SESSION_NAME}=; Path=/; Max-Age=0`,
          'Cache-Control': 'no-store'
        }
      })
    }

    if (!data.rol) {
      return NextResponse.rewrite(new URL('/no-autorizado', req.url))
    }

    if (
      pathname.startsWith('/plataforma') &&
      !(
        data.rol.includes('admin') ||
        data.rol.includes('profesor') ||
        data.rol.includes('alumno')
      )
    ) {
      return NextResponse.rewrite(new URL('/no-autorizado', req.url))
    }

    if (
      pathname.startsWith('/plataforma') &&
      !pathname.includes('/admin') &&
      data.rol === 'admin'
    ) {
      return NextResponse.redirect(new URL('/plataforma/admin', req.url))
    }

    if (
      pathname.startsWith('/plataforma') &&
      !pathname.includes('/profes') &&
      data.rol === 'profesor'
    ) {
      return NextResponse.redirect(new URL('/plataforma/profes', req.url))
    }

    if (
      pathname.startsWith('/plataforma') &&
      !pathname.includes('/alumnos') &&
      data.rol === 'alumno'
    ) {
      return NextResponse.redirect(new URL('/plataforma/alumnos', req.url))
    }

    return NextResponse.next()
  } catch (error) {
    console.log(error)
    return NextResponse.redirect(new URL('/login', req.url), {
      headers: {
        'Set-Cookie': `${firebaseConfig.COOKIE_SESSION_NAME}=; Path=/; Max-Age=0`,
        'Cache-Control': 'no-store'
      }
    })
  }
}

export const config = {
  matcher: ['/login', '/plataforma/:path*']
}
