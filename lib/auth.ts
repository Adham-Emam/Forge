export async function checkAuth() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/me/`, {
    credentials: 'include',
  })
  const user = await res.json()
  return res.ok ? { isAuthenticated: true, user } : { isAuthenticated: false }
}
