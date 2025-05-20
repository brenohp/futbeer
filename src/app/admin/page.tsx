'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAdminStore } from '@/app/store/adminStore'

export default function AdminPage() {
  const router = useRouter()
  const { setAdmin, isAdmin } = useAdminStore()
  const [usuario, setUsuario] = useState('')
  const [senha, setSenha] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (isAdmin) {
      router.push('/')
    }
  }, [isAdmin, router])

  const handleLogin = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ login: usuario, senha }),
      })

      if (res.ok) {
        setAdmin(true)
      } else {
        alert('Usuário ou senha incorretos!')
      }
    } catch (error) {
      console.error('Erro no login:', error)
      alert('Erro ao tentar fazer login. Tente novamente.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-sm mx-auto bg-white p-6 rounded shadow">
        <h2 className="text-lg font-bold mb-4 text-gray-800">Acesso Restrito</h2>
        <input
          type="text"
          placeholder="Usuário"
          className="border rounded px-3 py-2 w-full mb-4 text-gray-800 placeholder-gray-800"
          value={usuario}
          onChange={(e) => setUsuario(e.target.value)}
          disabled={loading}
        />
        <input
          type="password"
          placeholder="Senha"
          className="border rounded px-3 py-2 w-full mb-4 text-gray-800 placeholder-gray-800"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          disabled={loading}
        />
        <button
          onClick={handleLogin}
          className="bg-blue-600 text-white px-4 py-2 rounded w-full"
          disabled={loading}
        >
          {loading ? 'Entrando...' : 'Entrar'}
        </button>
      </div>
    </div>
  )
}
