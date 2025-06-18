'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { destroySession } from '@/app/lib/server-auth'

export default function LogoutPage() {
  const router = useRouter()
  useEffect(() => {
    destroySession()
    router.push('/')
  }, [router])

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900 text-white">
      <p>Saindo da sua conta...</p>
    </div>
  )
}
