'use client'

import React from 'react'
import Link from 'next/link'
import { Badge } from '@/components/ui/badge'

export default function Custom500() {
  return (
    <div className="flex flex-col items-center justify-center h-screen w-full">
      <h1 className="text-3xl font-bold mb-4">
        500 - Server-side error occurred
      </h1>
      <p className="mb-8 max-w-md text-center text-muted-foreground">
        Sorry! Something went wrong on our end.
      </p>
      <Link href="/">
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
