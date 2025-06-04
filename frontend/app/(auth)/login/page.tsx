import Link from 'next/link'
import { Suspense } from 'react'

import AuthForm from '@/components/auth/auth-form'
import Loader from '@/components/layout/loader'

export default function LoginPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-1 flex items-center justify-center p-4 md:p-8">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold tracking-tight font-orbitron">
              Welcome back
            </h1>
            <p className="text-muted-foreground mt-2">
              Sign in to your Forge account
            </p>
          </div>

          <div className="bg-card p-6 rounded-lg border shadow-sm">
            <Suspense fallback={<Loader />}>
              <AuthForm action="login" />
            </Suspense>
            <div className="mt-6 text-center text-sm">
              <span className="text-muted-foreground">
                Don&apos;t have an account?{' '}
              </span>
              <Link href="/register" className="text-accent hover:underline">
                Sign up
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
