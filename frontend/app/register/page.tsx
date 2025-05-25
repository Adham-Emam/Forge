import Link from 'next/link'
import AuthForm from '@/components/auth/auth-form'

export default function RegisterPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-1 flex items-center justify-center p-4 md:p-8">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold tracking-tight font-orbitron">
              Create your account
            </h1>
            <p className="text-muted-foreground mt-2">
              Join Forge and start your creative journey
            </p>
          </div>

          <div className="bg-card p-6 rounded-lg border shadow-sm">
            <AuthForm action="register" />
            <div className="mt-6 text-center text-sm">
              <span className="text-muted-foreground">
                Already have an account?{' '}
              </span>
              <Link href="/login" className="text-accent hover:underline">
                Sign in
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
