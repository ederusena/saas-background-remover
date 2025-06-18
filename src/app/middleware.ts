import { NextResponse } from 'next/server'
import { getCurrentUser } from './lib/server-auth'

export async function middleware(request: Request) {
  const pathname = new URL(request.url).pathname
  const protectedRoutes = ['/dashboard', '/upload']
  const authRoutes = ['/login', '/signup']

  // Verificar rotas protegidas
  if (protectedRoutes.some(route => pathname.startsWith(route))) {
    const user = await getCurrentUser()
    if (!user) {
      return NextResponse.redirect(new URL('/login', request.url))
    }
  }

  // Redirecionar usuários autenticados
  if (authRoutes.includes(pathname)) {
    const user = await getCurrentUser()
    if (user) {
      return NextResponse.redirect(new URL('/dashboard', request.url))
    }
  }

  return NextResponse.next()
}