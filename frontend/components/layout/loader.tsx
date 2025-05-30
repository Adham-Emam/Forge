import { Loader2 } from 'lucide-react'
import { cn } from '@/lib/utils'

export default function Loader({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        'w-full h-full bg-card absolute inset-0 flex items-center justify-center bg-opacity-50 z-50',
        className
      )}
    >
      <Loader2 className="h-8 w-8 animate-spin" />
    </div>
  )
}
