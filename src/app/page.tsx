import { Button } from '@/app/components/ui/button'
import Link from 'next/link'
import { validateRequest } from '@/app/lib/server-auth'

export default async function Home() {
  const { user } = await validateRequest()
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 text-white">
      <nav className="container mx-auto py-6 flex justify-between items-center">
        <h1 className="text-2xl font-bold">BG Remover Pro</h1>
        <div className="flex gap-4">
          {user ? (
            <form action="/logout" method="post">
              <Button type="submit" variant="ghost">
                Sair
              </Button>
            </form>
          ) : (
            <>
              <Button asChild variant="ghost">
                <Link href="/login">Entrar</Link>
              </Button>
              <Button asChild>
                <Link href="/signup">Começar Gratuitamente</Link>
              </Button>
            </>
          )}
        </div>
      </nav>

      <section className="container mx-auto py-24 text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">
          Remova fundos de imagens <br />
          <span className="text-emerald-400">com um clique</span>
        </h1>
        <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto">
          Ferramenta profissional para criativos, e-commerces e redes sociais
        </p>
        <div className="flex flex-col md:flex-row justify-center gap-4">
          <Button size="lg" asChild>
            <Link href="/upload">Experimente Agora</Link>
          </Button>
          <Button size="lg" variant="secondary" asChild>
            <Link href="/pricing">Ver Planos</Link>
          </Button>
        </div>
      </section>
    </div>
  )
}