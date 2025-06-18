import { validateRequest } from '@/app/lib/server-auth'
import { redirect } from 'next/navigation'
import AdminSidebar from '@/app/components/admin/sidebar'

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { user } = await validateRequest()
  
  if (!user || user.role !== 'ADMIN') {
    redirect('/')
  }

  return (
    <div className="flex min-h-screen">
      <AdminSidebar />
      <div className="flex-1 p-8 ml-64">
        <header className="mb-8">
          <h1 className="text-2xl font-bold">Painel Administrativo</h1>
        </header>
        {children}
      </div>
    </div>
  )
}