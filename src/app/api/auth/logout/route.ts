import prisma from '@/app/lib/prisma'
import { getCurrentUser } from '@/app/lib/server-auth'
import { NextResponse } from 'next/server'
import { removeBackground } from '@/app/services/image.service'

export async function POST(req: Request) {
  const user = await getCurrentUser()
  if (!user) return NextResponse.json({ error: 'Não autenticado' }, { status: 401 })

  const formData = await req.formData()
  const file = formData.get('file') as File | null
  if (!file) return NextResponse.json({ error: 'Nenhum arquivo enviado' }, { status: 400 })

  try {
    // Verificar limite do plano
    const imageCount = await prisma.image.count({ 
      where: { 
        userId: user.id,
        createdAt: {
          gte: new Date(new Date().setDate(1)) // Imagens deste mês
        }
      }
    })

    const planLimit = user.subscriptions[0]?.plan?.features.includes('unlimited') 
      ? Infinity 
      : 100

    if (imageCount >= planLimit) {
      return NextResponse.json({ error: 'Limite do plano excedido' }, { status: 403 })
    }

    // Processar imagem
    const processedImage = await removeBackground(file)
    const imageUrl = await saveImageToStorage(processedImage) // Implementar esta função

    // Salvar no banco de dados
    const image = await prisma.image.create({
      data: {
        userId: user.id,
        originalUrl: 'original.jpg', // URL da imagem original
        resultUrl: imageUrl,
        status: 'completed'
      }
    })

    return NextResponse.json(image)
  } catch (error) {
    return NextResponse.json({ error: 'Falha no processamento' }, { status: 500 })
  }
}