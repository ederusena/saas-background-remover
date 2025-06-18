import Link from 'next/link'
import { Button } from '@/app/components/ui/button'
import {
  LayoutDashboard,
  Users,
  FileText,
  CreditCard,
  Settings,
  LogOut
} from 'lucide-react'

export default function AdminSidebar() {
  return (
    <div className="fixed left-0 top-0 h-full w-64 border-r bg-background">
      <div className="p-6 border-b">
        <h2 className="text-xl font-semibold">BG Remover Pro</h2>
      </div>
      
      <nav className="p-4 space-y-1">
        <Button asChild variant="ghost" className="w-full justify-start">
          <Link href="/admin">
            <LayoutDashboard className="mr-2 h-4 w-4" />
            Dashboard
          </Link>
        </Button>
        
        <Button asChild variant="ghost" className="w-full justify-start">
          <Link href="/admin/users">
            <Users className="mr-2 h-4 w-4" />
            Usuários
          </Link>
        </Button>
        
        <Button asChild variant="ghost" className="w-full justify-start">
          <Link href="/admin/posts">
            <FileText className="mr-2 h-4 w-4" />
            Posts
          </Link>
        </Button>
        
        <Button asChild variant="ghost" className="w-full justify-start">
          <Link href="/admin/plans">
            <CreditCard className="mr-2 h-4 w-4" />
            Planos
          </Link>
        </Button>
        
        <Button asChild variant="ghost" className="w-full justify-start">
          <Link href="/admin/settings">
            <Settings className="mr-2 h-4 w-4" />
            Configurações
          </Link>
        </Button>
        
        <Button 
          asChild 
          variant="ghost" 
          className="w-full justify-start mt-8 text-red-500 hover:text-red-600"
          onClick={() => fetch('/api/auth/logout', { method: 'POST' })}
        >
          <Link href="/">
            <LogOut className="mr-2 h-4 w-4" />
            Sair
          </Link>
        </Button>
      </nav>
    </div>
  )
}