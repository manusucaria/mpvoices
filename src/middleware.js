import { NextResponse } from 'next/server'

export async function middleware (request, response) {
  const session = request.cookies.get(process.env.COOKIE_SESSION_NAME)
  if (!session) {
    return NextResponse.redirect(new URL('/login', request.url))
  }
  const responseAPI = await fetch(`${request.nextUrl.origin}/api/auth`, {
    headers: {
      Cookie: `${process.env.COOKIE_SESSION_NAME}=${session?.value}`
    }
  })
  if (responseAPI.status !== 200) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/plataforma-alumnos']
}
