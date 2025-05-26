'use client'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { Loader2 } from 'lucide-react'

export default function Logout() {
  const router = useRouter()
  useEffect(() => {
    try {
      localStorage.removeItem('forge-auth-token')
      localStorage.removeItem('forge-refresh-token')
      localStorage.removeItem('forge-user')
    } catch (error) {
      console.error('Error during logout:', error)
    }

    const redirectToLogin = () => {
      router.push('/')
    }

    // Redirect to login after a short delay to allow the UI to update
    const timer = setTimeout(redirectToLogin, 1000)

    // Cleanup the timer on component unmount
    return () => clearTimeout(timer)
  }, [router])

  return (
    <div>
      <Loader2 className="absolute top-1/2 left-1/2 mr-2 h-8 w-8 animate-spin c" />
    </div>
  )
}
