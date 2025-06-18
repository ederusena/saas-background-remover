import { stripe } from '@/app/lib/stripe'
import { NextResponse } from 'next/server'
import prisma from '@/app/lib/prisma'

export async function POST(req: Request) {
  try {
    const { planId, userId, customerEmail } = await req.json()
    
    // Buscar plano no banco de dados
    const plan = await prisma.plan.findUnique({
      where: { id: planId }
    })
    
    if (!plan) {
      return NextResponse.json({ error: 'Plano não encontrado' }, { status: 404 })
    }

    // Criar sessão de checkout no Stripe
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'brl',
            product_data: {
              name: plan.name,
              description: plan.description,
            },
            unit_amount: Math.round(plan.price * 100), // em centavos
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/payment/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/pricing`,
      customer_email: customerEmail,
      client_reference_id: userId,
      metadata: {
        planId: plan.id,
        userId,
      },
    })

    return NextResponse.json({ url: session.url })
  } catch (error) {
    console.error('Checkout error:', error)
    return NextResponse.json({ error: 'Erro ao criar sessão de checkout' }, { status: 500 })
  }
}