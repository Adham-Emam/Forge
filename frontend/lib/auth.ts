import { jwtDecode } from 'jwt-decode'

export const checkAuth = async (): Promise<boolean> => {
  try {
    const access = localStorage.getItem('forge-auth-token')
    const refresh = localStorage.getItem('forge-refresh-token')
    if (!access) {
      return false
    }

    // Check if access token expired locally
    const { exp } = jwtDecode<{ exp?: number }>(access)
    if (!exp || Date.now() >= exp * 1000) {
      // Try to refresh token
      if (!refresh) {
        return false
      }

      const refreshResponse = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/users/token/refresh/`,
        {
          method: 'POST',
          body: JSON.stringify({ refresh }),
          headers: { 'Content-Type': 'application/json' },
        }
      )

      if (refreshResponse.ok) {
        const newTokens = await refreshResponse.json()
        localStorage.setItem('forge-auth-token', newTokens.access)
        if (newTokens.refresh) {
          localStorage.setItem('forge-refresh-token', newTokens.refresh)
        }
        return true
      } else {
        // Refresh token also expired or invalid
        localStorage.removeItem('forge-auth-token')
        localStorage.removeItem('forge-refresh-token')
        return false
      }
    }

    // Access token still valid
    return true
  } catch (error) {
    console.error('Error checking authentication:', error)
    return false
  }
}
