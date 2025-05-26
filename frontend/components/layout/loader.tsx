import { Loader2 } from 'lucide-react'

export default function Loader() {
  return (
    <div className="w-full h-full bg-card absolute inset-0 flex items-center justify-center bg-opacity-50 z-50">
      <Loader2 className="h-8 w-8 animate-spin" />
    </div>
  )
}
