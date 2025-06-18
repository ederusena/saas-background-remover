import { cookies } from 'next/headers'
import { PrismaClient } from '@prisma/client'
import { User } from '@prisma/client'

const prisma = new PrismaClient()
const secretKey = new TextEncoder().encode(process.env.JWT_SECRET!)

interface AuthResult {
  user: User | null
  session: any | null
  error: string | null
}

export async function validateRequest(): Promise<AuthResult> {
  try {
    // 1. Verificar token nos cookies
    const cookieStore = cookies()
    const token = (await cookieStore).get('session-token')?.value

    if (!token) {
      return { user: null, session: null, error: 'Nenhum token encontrado' }
    }

    // 2. Verificar JWT
    const { payload } = await jwtVerify(token, secretKey, {
      algorithms: ['HS256']
    })

    if (!payload.userId) {
      return { user: null, session: null, error: 'Token inválido' }
    }

    // 3. Buscar usuário no banco
    const user = await prisma.user.findUnique({
      where: { id: payload.userId as string },
      include: {
        subscriptions: {
          include: { plan: true },
          where: { status: 'active' },
          orderBy: { startDate: 'desc' },
          take: 1
        }
      }
    })

    if (!user) {
      return { user: null, session: null, error: 'Usuário não encontrado' }
    }

    // 4. Retornar dados do usuário e sessão
    return {
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        currentPlan: user.subscriptions[0]?.plan || null
      },
      session: {
        id: payload.sessionId,
        expiresAt: payload.exp
      },
      error: null
    }

  } catch (error) {
    console.error('Erro na validação:', error)
    return { 
      user: null, 
      session: null, 
      error: error instanceof Error ? error.message : 'Erro desconhecido' 
    }
  }
}