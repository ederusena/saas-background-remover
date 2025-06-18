'use client'

import { Button } from '@/app/components/ui/button'
import { useMutation } from '@tanstack/react-query'
import { useAuth } from '@/app/hooks/use-auth'

export function CheckoutButton({ planId }: { planId: string }) {
  const { user } = useAuth()
  
  const mutation = useMutation({
    mutationFn: async () => {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          planId,
          customerEmail: user?.email,
          userId: user?.id
        })
      })
      
      if (!response.ok) throw new Error('Erro ao iniciar checkout')
      return await response.json()
    },
    onSuccess: (data) => {
      window.location.href = data.url
    }
  })

  return (
    <Button 
      onClick={() => mutation.mutate()} 
      disabled={mutation.isPending}
    >
      {mutation.isPending ? 'Processando...' : 'Assinar'}
    </Button>
  )
}