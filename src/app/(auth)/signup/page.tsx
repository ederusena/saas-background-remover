import { Metadata } from 'next'
import Link from 'next/link'
import { SignupForm } from '@/app/components/auth/signup-form'
import { Logo } from '@/app/components/logo'

export const metadata: Metadata = {
  title: 'Criar Conta - BG Remover Pro',
  description: 'Crie sua conta para começar a remover fundos de imagens',
}

export default function SignupPage() {
  return (
    
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 to-slate-800 px-4 py-12 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-lg">
        <div className="text-center">
          <div className="flex justify-center mb-6">
            <Logo className="h-12 w-auto" />
          </div>
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            Criar uma conta
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Preencha os campos abaixo para criar sua conta
          </p>
        </div>

        <div className="mt-8">
          <SignupForm />
        </div>
        
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Ao criar uma conta, você concorda com nossos{' '}
            <Link href="/terms" className="font-medium text-emerald-600 hover:text-emerald-500">
              Termos de Serviço
            </Link>{' '}
            e{' '}
            <Link href="/privacy" className="font-medium text-emerald-600 hover:text-emerald-500">
              Política de Privacidade
            </Link>.
          </p>
        </div>
      </div>
    </div>
  )
}