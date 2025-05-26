'use client'

import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { jwtDecode } from 'jwt-decode'
import Loader from './loader'

interface DecodedToken {
  exp: number
}

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const checkToken = async () => {
      const token = localStorage.getItem('forge-auth-token')
      const refreshToken = localStorage.getItem('forge-refresh-token')

      if (!token || !refreshToken) {
        router.push(
          '/login?next=' + encodeURIComponent(window.location.pathname)
        )
        return
      }

      try {
        const decoded = jwtDecode<DecodedToken>(token)
        const currentTime = Date.now() / 1000

        if (decoded.exp < currentTime) {
          // Token expired, try refresh
          const refreshRes = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/users/token/refresh/`,
            {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ refresh: refreshToken }),
            }
          )

          if (!refreshRes.ok) throw new Error('Refresh token invalid')

          const data = await refreshRes.json()
          localStorage.setItem('forge-auth-token', data.access)
        }
      } catch (error) {
        router.push(
          '/login?next=' + encodeURIComponent(window.location.pathname)
        )
        return
      } finally {
        setLoading(false)
      }
    }

    checkToken()
  }, [router])

  if (loading) {
    return <Loader />
  }

  return <>{children}</>
}

export default ProtectedRoute
