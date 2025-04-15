import { Button } from '@/components/ui/button'
import AuthForm from '@/components/auth-form'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Github, Mail } from 'lucide-react'
import Link from 'next/link'

export default function RegisterPage() {
  return (
    <main className="w-fit mx-auto">
      <div className="container flex h-screen flex-col items-center justify-center">
        <Card className="max-w-[400px]">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold">
              Create an account
            </CardTitle>
            <CardDescription>
              Enter your email below to create your account
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Button variant="outline" className="w-full" type="button">
                <Github className="mr-2 h-4 w-4" />
                Continue with GitHub
              </Button>
              <Button variant="outline" className="w-full" type="button">
                <Mail className="mr-2 h-4 w-4" />
                Continue with Google
              </Button>
            </div>
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">
                  Or continue with
                </span>
              </div>
            </div>
            <div className="space-y-2"></div>
            <AuthForm action={'register'} />
          </CardContent>
          <CardFooter>
            <div className="text-sm text-muted-foreground text-center w-full">
              Already have an account?{' '}
              <Link
                href="/login"
                className="hover:text-primary underline underline-offset-4"
              >
                Sign in
              </Link>
            </div>
          </CardFooter>
        </Card>
      </div>
    </main>
  )
}
