'use client'

import { useEffect, useState } from 'react'

export function useAuth() {
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchAuth() {
      try {
        const response = await fetch('/api/auth/validate')
        const data = await response.json()
        setUser(data.user)
      } catch (error) {
        console.error('Erro ao validar autenticação:', error)
        setUser(null)
      } finally {
        setLoading(false)
      }
    }

    fetchAuth()
  }, [])

  return { user, loading }
}