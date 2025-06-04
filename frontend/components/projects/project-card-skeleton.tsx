import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { Button } from '@/components/ui/button'
import { ArrowUpRight } from 'lucide-react'

export default function ProjectCardSkeleton() {
  return (
    <Card className="group overflow-hidden border-border hover:border-primary/30 transition-all duration-200">
      <CardHeader className="p-4 flex justify-between space-y-0 bg-muted/30">
        <div className="space-y-2 w-full">
          <div className="flex space-x-2">
            <Skeleton className="h-6 w-24 rounded-full" />
          </div>
          <Skeleton className="h-6 w-3/4" />
        </div>
      </CardHeader>

      <CardContent className="p-4">
        <Skeleton className="h-[4.5rem] mb-4" />
        <div className="flex flex-wrap gap-2 mb-4">
          {Array.from({ length: 3 }).map((_, index) => (
            <Skeleton key={index} className="h-6 w-16 rounded-full" />
          ))}
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Skeleton className="w-10 h-10 rounded-full" />
            <Skeleton className="h-4 w-24" />
          </div>
          <Skeleton className="h-4 w-20" />
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-0">
        <Button
          variant="ghost"
          className="w-full justify-between group-hover:text-primary group-hover:bg-primary/5"
          disabled
        >
          <span>View Details</span>
          <ArrowUpRight className="h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  )
}
