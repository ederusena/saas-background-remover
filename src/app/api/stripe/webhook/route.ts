import { stripe } from '@/app/lib/stripe'
import { headers } from 'next/headers'
import prisma from '@/app/lib/prisma'

export async function POST(req: Request) {
  const body = await req.text()
  const headersList = await headers()
  const signature = headersList.get('stripe-signature')!

  try {
    const event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    )

    if (event.type === 'checkout.session.completed') {
      const session = event.data.object
      await prisma.subscription.create({
        data: {
          userId: session.client_reference_id!,
          planId: session.metadata!.planId,
          status: 'active',
          startDate: new Date(),
          endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) // +30 dias
        }
      })
    }
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : 'Unknown error'
    return new Response(`Webhook Error: ${errorMessage}`, { status: 400 })
  }
}   