import Link from 'next/link'
import { Badge } from '@/components/ui/badge'

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-3xl font-bold mb-4">Page not found</h1>
      <p className="mb-8 max-w-md text-center text-muted-foreground">
        The page you are looking for does not exist. It might have been moved or
        deleted. You can try searching for it or check the URL for any mistakes.
      </p>
      <Link href="/" className="">
        <Badge
          variant="destructive"
          className="cursor-pointer px-4 py-2 text-sm font-semibold transition-colors hover:bg-red-600 hover:text-white"
        >
          Go back home
        </Badge>
      </Link>
    </div>
  )
}
