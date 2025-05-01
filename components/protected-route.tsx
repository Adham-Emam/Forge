'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Loader2 } from 'lucide-react'
import { jwtDecode } from 'jwt-decode'

interface Props {
  children: React.ReactNode
}

interface DecodedToken {
  exp: number
  [key: string]: any
}

export default function ProtectedRoute({ children }: Props) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const stored = localStorage.getItem('auth')

    if (!stored) {
      router.push('/login')
      return
    }

    const { access, refresh, user } = JSON.parse(stored)

    try {
      const decoded: DecodedToken = jwtDecode(access)
      const isExpired = decoded.exp * 1000 < Date.now()

      if (isExpired) {
        // try to refresh
        fetch(`${process.env.NEXT_PUBLIC_API_URL}users/token/refresh/`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ refresh }),
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.access) {
              // update localStorage
              localStorage.setItem(
                'auth',
                JSON.stringify({
                  access: data.access,
                  refresh,
                  user,
                })
              )
              setIsLoading(false)
            } else {
              localStorage.removeItem('auth')
              router.push('/login')
            }
          })
          .catch(() => {
            localStorage.removeItem('auth')
            router.push('/login')
          })
      } else {
        setIsLoading(false)
      }
    } catch (err) {
      localStorage.removeItem('auth')
      router.push('/login')
    }
  }, [router])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    )
  }

  return <>{children}</>
}
