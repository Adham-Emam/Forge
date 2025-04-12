import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'

export default function ForgotPasswordPage() {
  return (
    <main className="w-fit mx-auto">
      <div className="container flex h-screen flex-col items-center justify-center">
        <Card className="max-w-[400px]">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold">
              Forgot password?
            </CardTitle>
            <CardDescription>
              Enter your email address and we&apos;ll send you a link to reset
              your password
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Input
                type="email"
                placeholder="name@example.com"
                className="w-full"
              />
              <Button className="w-full" type="submit">
                Send Reset Link
              </Button>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="link" className="w-full" asChild>
              <Link href="/auth/login">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to login
              </Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    </main>
  )
}
