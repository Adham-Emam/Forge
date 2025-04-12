import { Skeleton } from '@/components/ui/skeleton'

export default function PostsSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {[...Array(3)].map((_, i) => (
        <div
          key={i}
          className="relative overflow-hidden pb-12 border rounded-lg"
        >
          <Skeleton className="h-48 w-full" />
          <div className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <Skeleton className="h-5 w-20 rounded-full" />
              <Skeleton className="h-4 w-16" />
            </div>
            <Skeleton className="h-6 w-3/4 mb-2" />
            <div className="space-y-2 mb-4">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-5/6" />
              <Skeleton className="h-4 w-4/5" />
            </div>
            <div className="absolute right-5 bottom-5">
              <Skeleton className="h-9 w-24" />
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
