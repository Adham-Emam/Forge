import { useEffect, useState } from 'react'
import axios from 'axios'
import { jwtDecode } from 'jwt-decode'

interface DecodedToken {
  exp: number
  [key: string]: any
}

export default function useAuth() {
  const [accessToken, setAccessToken] = useState<string | null>(null)
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let intervalId: NodeJS.Timeout

    const stored = localStorage.getItem('auth')
    if (!stored) {
      setLoading(false)
      return
    }

    const { access, refresh, user } = JSON.parse(stored)

    const refreshAccessToken = async () => {
      try {
        const res = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}users/token/refresh/`,
          { refresh }
        )
        const newAccess = res.data.access

        localStorage.setItem(
          'auth',
          JSON.stringify({ access: newAccess, refresh, user })
        )
        setAccessToken(newAccess)
        setUser(user)
      } catch (err) {
        console.error('Token refresh failed', err)
        localStorage.removeItem('auth')
        setAccessToken(null)
        setUser(null)
      }
    }

    const decoded: DecodedToken = jwtDecode(access)
    const timeUntilExpiry = decoded.exp * 1000 - Date.now()
    const refreshInterval = Math.max(timeUntilExpiry - 30000, 30000) // refresh 30s before expiry, minimum every 30s

    const init = async () => {
      if (timeUntilExpiry <= 0) {
        await refreshAccessToken()
      } else {
        setAccessToken(access)
        setUser(user)
      }
      setLoading(false)

      // Start refresh interval
      intervalId = setInterval(refreshAccessToken, 90 * 1000) // every 90 seconds
    }

    init()

    return () => clearInterval(intervalId)
  }, [])

  return { accessToken, user, loading }
}
