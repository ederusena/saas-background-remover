import { Metadata } from 'next'
import Link from 'next/link'
import { LoginForm } from '@/app/components/auth/login-form'
import { Logo } from '@/app/components/logo'

export const metadata: Metadata = {
  title: 'Entrar - BG Remover Pro',
  description: 'Acesse sua conta para remover fundos de imagens',
}

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 to-slate-800 px-4 py-12 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-lg">
        <div className="text-center">
          <div className="flex justify-center mb-6">
            <Logo className="h-12 w-auto" />
          </div>
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            Entrar na sua conta
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Acesse sua conta para começar a remover fundos de imagens
          </p>
        </div>

        <div className="mt-8">
          <LoginForm />
        </div>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Não tem uma conta?{' '}
            <Link
              href="/signup"
              className="font-medium text-emerald-600 hover:text-emerald-500"
            >
              Criar conta
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
