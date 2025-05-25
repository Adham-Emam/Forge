'use client'
import { useRouter } from 'next/navigation'
import { Loader2 } from 'lucide-react'

export default function Logout() {
  const router = useRouter()
  localStorage.removeItem('forge-auth-token')
  localStorage.removeItem('forge-refresh-token')
  localStorage.removeItem('forge-user')

  router.push('/login')

  return (
    <div>
      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
    </div>
  )
}
