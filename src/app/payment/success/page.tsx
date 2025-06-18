import { validateRequest } from '@/app/lib/server-auth'
import { redirect } from 'next/navigation'
import { stripe } from '@/app/lib/stripe'
import prisma from '@/app/lib/prisma'
import { Button } from '@/app/components/ui/button'

export default async function PaymentSuccessPage({
  searchParams,
}: {
  searchParams: { session_id: string }
}) {
  const { user } = await validateRequest()
  if (!user) redirect('/login')

  try {
    const session = await stripe.checkout.sessions.retrieve(
      searchParams.session_id
    )

    if (session.payment_status !== 'paid') {
      redirect('/pricing')
    }

    // Atualizar status do usuário se necessário
    await prisma.user.update({
      where: { id: user.id },
      data: { hasActiveSubscription: true },
    })

    return (
      <div className="container mx-auto py-12 text-center">
        <div className="bg-green-100 text-green-700 p-4 rounded-full w-16 h-16 mx-auto mb-6 flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        
        <h1 className="text-3xl font-bold mb-4">Pagamento Bem Sucedido!</h1>
        <p className="text-lg mb-8">
          Obrigado por assinar o plano {session.metadata?.planName}. 
          Sua assinatura está ativa e você já pode aproveitar todos os benefícios.
        </p>
        
        <Button asChild>
          <a href="/dashboard">Ir para o Dashboard</a>
        </Button>
      </div>
    )
  } catch (error) {
    console.error('Erro ao processar pagamento:', error)
    redirect('/pricing')
  }
}