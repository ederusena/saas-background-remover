import { validateRequest } from '@/app/lib/server-auth'
import { redirect } from 'next/navigation'

export default async function DashboardPage() {
  const { user } = await validateRequest()
  
  if (!user) {
    redirect('/login')
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6">Bem-vindo, {user.name}</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-medium mb-4">Seu Plano Atual</h2>
          {user.subscriptions?.[0]?.plan ? (
            <div>
              <p className="text-xl font-bold">{user.subscriptions[0].plan.name}</p>
              <p className="text-gray-600">R$ {user.subscriptions[0].plan.price}/mês</p>
            </div>
          ) : (
            <p>Você não possui um plano ativo</p>
          )}
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-medium mb-4">Estatísticas</h2>
          <p>Imagens processadas: 0</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-medium mb-4">Ações Rápidas</h2>
          <a 
            href="/upload" 
            className="inline-block bg-emerald-600 text-white px-4 py-2 rounded hover:bg-emerald-700"
          >
            Nova Imagem
          </a>
        </div>
      </div>
    </div>
  )
}