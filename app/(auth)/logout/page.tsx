'use client'
import { useRouter } from 'next/navigation'
import { Loader2 } from 'lucide-react'
import useAuth from '@/hooks/useAuth'

export default function LogoutPage() {
  const router = useRouter()

  const { accessToken, loading } = useAuth()

  if (loading) {
    return (
      <div className="w-full h-screen flex justify-center items-center">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    )
  }

  if (accessToken) {
    localStorage.removeItem('auth')
  }

  router.push('/')
  return
}
