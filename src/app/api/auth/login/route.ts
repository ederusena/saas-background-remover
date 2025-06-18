import prisma from '@/app/lib/prisma'
import { createSession } from '@/app/lib/server-auth'
import { comparePasswords } from '@/app/lib/auth-utils'
import { NextResponse } from 'next/server'
import { z } from 'zod'

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6)
})

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { email, password } = loginSchema.parse(body)
    console.log('Login attempt:', { email })
    const user = await prisma.user.findUnique({ where: { email } })
    console.log('User found:', user ? user.id : 'No user found')
    if (!user || !(await comparePasswords(password, user.password))) {
      return NextResponse.json({ error: 'Credenciais inválidas' }, { status: 401 })
    }

    await createSession(user.id)

    return NextResponse.json({
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role
      }
    })
  } catch (error) {
    return NextResponse.json({ error: 'Erro no servidor' }, { status: 500 })
  }
}