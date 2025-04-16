'use client'
import { useRouter } from 'next/navigation'
import { useState, FormEvent } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { checkAuth } from '@/lib/auth'
import { Eye, EyeOff } from 'lucide-react'

const AuthForm = ({ action }: { action: string }) => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({})

  const [showPassword, setShowPassword] = useState(false)

  // const handlePassword = () => {}

  const router = useRouter()
  const verifyAuth = async () => {
    const { isAuthenticated } = await checkAuth()
    if (isAuthenticated) {
      router.push('/')
    }
  }
  verifyAuth()

  const getFirstError = () => {
    const errors = Object.entries(fieldErrors)
    return errors.length > 0 ? errors[0][1] : null
  }

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsSubmitting(true)
    setError(null)
    setSuccess(null)
    setFieldErrors({})

    const form = event.currentTarget
    const formData = new FormData(form)

    // Client-side validation for empty fields
    const emptyFieldErrors: Record<string, string> = {}
    const requiredFields =
      action === 'register'
        ? ['first-name', 'last-name', 'email', 'password', 'confirm-password']
        : ['email', 'password']

    requiredFields.forEach((field) => {
      if (!formData.get(field)) {
        const fieldName = field
          .replace('-', ' ')
          .split(' ')
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(' ')
        emptyFieldErrors[field] = `${fieldName} is required`
      }
    })

    if (Object.keys(emptyFieldErrors).length > 0) {
      setFieldErrors(emptyFieldErrors)
      setIsSubmitting(false)
      return
    }

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}users/${action}/`,
        {
          method: 'POST',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(
            action === 'register'
              ? {
                  first_name: formData.get('first-name'),
                  last_name: formData.get('last-name'),
                  email: formData.get('email'),
                  password: formData.get('password'),
                  password2: formData.get('confirm-password'),
                }
              : {
                  email: formData.get('email'),
                  password: formData.get('password'),
                }
          ),
        }
      )

      const data = await response.json()

      if (!response.ok) {
        const errors: Record<string, string> = {}

        if (data && typeof data === 'object') {
          Object.entries(data).forEach(([key, value]) => {
            if (Array.isArray(value)) {
              errors[key] = value[0] // Only take the first error per field
            } else if (typeof value === 'string') {
              errors[key] = value
            }
          })
        }

        setFieldErrors(errors)
        setIsSubmitting(false)
        return
      }

      if (action === 'register') {
        setSuccess('Registration successful! You can now login.')
        setTimeout(() => router.push('/login'), 1500)
      } else {
        setSuccess('Login successful! Redirecting...')
        const searchParams = new URLSearchParams(window.location.search)
        const nextUrl = searchParams.get('next') || '/'
        setTimeout(() => router.push(nextUrl), 1500)
      }
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : 'An unexpected error occurred'
      setError(errorMessage)
      console.error(`${action} error:`, err)
    } finally {
      setIsSubmitting(false)
    }
  }

  const firstError = getFirstError() || error

  return (
    <form
      onSubmit={onSubmit}
      aria-label={`${action === 'register' ? 'Registration' : 'Login'} form`}
      method="POST"
      className="space-y-4"
    >
      <div className="space-y-2">
        {success && (
          <div className="p-3 text-sm text-green-900 bg-green-500/10 border border-green-900 rounded-md">
            {success}
          </div>
        )}

        {firstError && (
          <div className="p-3 text-sm text-red-900 bg-red-500/10 border border-red-900 rounded-md">
            {firstError}
          </div>
        )}
      </div>

      {action === 'register' && (
        <>
          <div className="space-y-2">
            <Input
              type="text"
              placeholder="First Name"
              name="first-name"
              className={`w-full ${fieldErrors['first-name'] ? 'border-red-500' : ''}`}
            />
          </div>

          <div className="space-y-2">
            <Input
              type="text"
              placeholder="Last Name"
              name="last-name"
              className={`w-full ${fieldErrors['last-name'] ? 'border-red-500' : ''}`}
            />
          </div>
        </>
      )}

      <div className="space-y-2">
        <Input
          type="email"
          placeholder="name@example.com"
          name="email"
          className={`w-full ${fieldErrors.email ? 'border-red-500' : ''}`}
        />
      </div>

      <div
        className={`space-y-2 flex items-center border rounded-md overflow-hidden pr-2 ${fieldErrors.password ? 'border-red-500' : ''}`}
      >
        <Input
          type={showPassword ? 'text' : 'password'}
          placeholder={
            action === 'register' ? 'Create a password' : 'Enter your password'
          }
          name="password"
          className="w-full focus-visible:ring-transparent border-transparent bg-transparent"
        />
        <div
          onClick={() => {
            setShowPassword(!showPassword)
          }}
          className="!m-2 p-1 hover:bg-accent rounded-md cursor-pointer"
        >
          {showPassword ? <EyeOff /> : <Eye />}
        </div>
      </div>

      {action === 'register' && (
        <div className="space-y-2">
          <Input
            type={showPassword ? 'text' : 'password'}
            placeholder="Confirm your password"
            name="confirm-password"
            className={`w-full ${fieldErrors['confirm-password'] ? 'border-red-500' : ''}`}
          />
        </div>
      )}

      <Button className="w-full mt-4" type="submit" disabled={isSubmitting}>
        {action === 'register'
          ? isSubmitting
            ? 'Registering...'
            : 'Register'
          : isSubmitting
            ? 'Entering The Forge...'
            : 'Login'}
      </Button>
    </form>
  )
}

export default AuthForm
