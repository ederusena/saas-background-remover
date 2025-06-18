'use client'

import { useEffect, useState } from 'react'

export const useAuth = () => {
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch('/api/auth/validate')
        const data = await res.json()
        setUser(data.user)
      } catch (error) {
        console.error('Erro ao verificar autenticação:', error)
        setUser(null)
      } finally {
        setLoading(false)
      }
    }

    checkAuth()
  }, [])

  return { user, loading }
}