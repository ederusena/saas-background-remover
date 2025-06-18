'use server'
import { cookies } from 'next/headers'
import jwt from 'jsonwebtoken'
import prisma from './prisma'

export const createSession = async (userId: string) => {
  if (!process.env.JWT_SECRET) throw new Error('JWT_SECRET não configurado')
  
  const token = jwt.sign(
    { userId, iat: Math.floor(Date.now() / 1000) },
    process.env.JWT_SECRET,
    { expiresIn: '7d' }
  )

  ;(await cookies()).set('session-token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24 * 7 // 7 dias
  })

  return token
}

export const destroySession = async () => {
  (await cookies()).delete('session-token')
}

export const getCurrentUser = async () => {
  const token = (await cookies()).get('session-token')?.value
  if (!token) return null

  try {
    if (!process.env.JWT_SECRET) throw new Error('JWT_SECRET não configurado')
    
    const decoded = jwt.verify(token, process.env.JWT_SECRET) as { userId: string }
    
    return await prisma.user.findUnique({
      where: { id: decoded.userId },
      include: {
        subscriptions: {
          include: { plan: true },
          orderBy: { startDate: 'desc' },
          take: 1
        }
      }
    })
  } catch (error) {
    console.error('Erro na verificação do token:', error)
    return null
  }
}

export const validateRequest = async () => {
  const user = await getCurrentUser()
  return { user, isAuthenticated: !!user }
}