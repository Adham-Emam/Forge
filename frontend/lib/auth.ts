export const checkAuth = async (): Promise<boolean> => {
  try {
    const token = localStorage.getItem('forge-auth-token')
    if (!token) {
      return false // No token means not authenticated
    }
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/users/token/verify/`,

      {
        method: 'POST',
        body: JSON.stringify({ token }),
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )

    if (!response.ok) {
      return false
    }

    const userData = await response.json()
    return !!userData // Return true if user data is valid
  } catch (error) {
    console.error('Error checking authentication:', error)
    return false // Return false if there's an error
  }
}
