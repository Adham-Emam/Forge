'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { ArrowRight, Loader2 } from 'lucide-react'
import { Eye, EyeOff } from 'lucide-react'

import { checkAuth } from '@/lib/auth'

const loginFormSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email address' }),
  password: z
    .string()
    .min(6, { message: 'Password must be at least 6 characters' }),
})

const registerFormSchema = z
  .object({
    firstName: z.string().min(1, { message: 'First name is required' }),
    lastName: z.string().min(1, { message: 'Last name is required' }),
    email: z.string().email({ message: 'Please enter a valid email address' }),
    password: z
      .string()
      .min(6, { message: 'Password must be at least 6 characters' }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  })

const AuthForm = ({ action }: { action: 'login' | 'register' }) => {
  const router = useRouter()

  // Check if user is already authenticated
  useEffect(() => {
    const checkUserAuth = async () => {
      const isAuthenticated = await checkAuth()
      if (isAuthenticated) {
        router.push('/')
      }
    }
    checkUserAuth()
  }, [router])

  // State to manage loading state
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const form = useForm<z.infer<typeof registerFormSchema>>({
    resolver: zodResolver(
      action === 'login' ? loginFormSchema : registerFormSchema
    ),
    defaultValues:
      action === 'register'
        ? {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            confirmPassword: '',
          }
        : {
            email: '',
            password: '',
          },
  })

  async function onSubmit(values: z.infer<typeof registerFormSchema>) {
    setIsLoading(true)

    await fetch(
      action === 'login'
        ? `${process.env.NEXT_PUBLIC_API_URL}/users/token/`
        : `${process.env.NEXT_PUBLIC_API_URL}/users/register/`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body:
          action === 'login'
            ? JSON.stringify({
                email: values.email,
                password: values.password,
              })
            : JSON.stringify({
                first_name: values.firstName,
                last_name: values.lastName,
                email: values.email,
                password: values.password,
                password2: values.confirmPassword,
              }),
      }
    )
      .then((res) => {
        if (!res.ok) {
          throw new Error(
            action === 'login'
              ? 'Invalid credentials'
              : 'Failed to create account'
          )
        }
        return res.json()
      })
      .then((data) => {
        if (action === 'register') {
          // Handle successful registration
          console.log('Registration successful:', data)
        } else {
          // Handle successful authentication
          console.log('Authentication successful:', data)
        }
        // Store any necessary tokens or user info in localStorage or context
        localStorage.setItem('forge-auth-token', data.access)
        localStorage.setItem('forge-refresh-token', data.refresh)
        localStorage.setItem('forge-user', JSON.stringify(data.user))
        router.push('/')
        setIsLoading(false)
      })
      .catch((error) => {
        console.error('Authentication error:', error)
        setIsLoading(false)
        form.setError('email', {
          type: 'manual',
          message: 'Invalid email or password',
        })
      })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {action === 'register' && (
          <>
            {' '}
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>First Name</FormLabel>
                  <FormControl>
                    <Input placeholder="john" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Last Name</FormLabel>
                  <FormControl>
                    <Input placeholder="doe" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </>
        )}

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  placeholder="your.email@example.com"
                  type="email"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <div className="flex items-center justify-between">
                <FormLabel>Password</FormLabel>
                {action === 'login' && (
                  <Link
                    href="/forgot-password"
                    className="text-xs text-muted-foreground hover:text-accent transition-colors"
                  >
                    Forgot password?
                  </Link>
                )}
              </div>
              <FormControl>
                <div className="relative">
                  <Input type={showPassword ? 'text' : 'password'} {...field} />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 text-muted-foreground"
                  >
                    {showPassword ? <Eye /> : <EyeOff />}
                  </button>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {action === 'register' && (
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm Password</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      type={showConfirmPassword ? 'text' : 'password'}
                      {...field}
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 text-muted-foreground"
                    >
                      {showConfirmPassword ? <Eye /> : <EyeOff />}
                    </button>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              {action === 'register' ? 'Creating account...' : 'Signing in...'}
            </>
          ) : (
            <>
              {action === 'register' ? 'Create Account' : 'Sign in'}
              <ArrowRight className="ml-2 h-4 w-4" />
            </>
          )}
        </Button>
      </form>
    </Form>
  )
}

export default AuthForm
