import prisma from '@/app/lib/prisma'
import { CheckoutButton } from '@/app/components/checkout-button'
import { Button } from '@/app/components/ui/button'
import { getCurrentUser } from '@/app/lib/server-auth'

export default async function PricingPage() {
  const plans = await prisma.plan.findMany()
  const user = await getCurrentUser()

  return (
    <div className="container mx-auto py-12">
      <h1 className="text-3xl font-bold mb-8">Escolha seu Plano</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {plans.map((plan) => (
          <div key={plan.id} className="border rounded-lg p-6 shadow-md">
            <h2 className="text-xl font-bold mb-2">{plan.name}</h2>
            <p className="text-4xl font-bold mb-4">R${plan.price.toFixed(2)}/mês</p>
            
            <ul className="mb-6 space-y-2">
              {plan.features.map((feature, index) => (
                <li key={index} className="flex items-center">
                  <svg className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  {feature}
                </li>
              ))}
            </ul>
            
            {user ? (
              <CheckoutButton planId={plan.id} />
            ) : (
              <Button asChild>
                <a href="/signup">Criar Conta</a>
              </Button>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}