import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ArrowRight, Hammer } from 'lucide-react'
import { formatDate } from '@/lib/utils'
import PostsSkeleton from '@/components/posts-skeleton'
import Link from 'next/link'
import Image from 'next/image'

type Post = {
  title: string
  slug: string
  image: string
  category: string
  excerpt: string
  body: string
  posted_at: string
}

export default async function Blog() {
  const posts = await fetch(`${process.env.NEXT_PUBLIC_API_URL}blog/posts/`)
    .then((res) => {
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`)
      }
      return res.json()
    })
    .catch((err) => {
      console.error('Error fetching random posts:', err)
      return null
    })

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="forge-pattern py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 text-center">
          <div className="mx-auto max-w-2xl">
            <div className="mb-8 flex justify-center">
              <div className="relative rounded-full p-4 bg-primary/10 ring-1 ring-primary/20">
                <Hammer className="h-12 w-12 text-primary" aria-hidden="true" />
              </div>
            </div>
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
              Forge Blog
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-300">
              Insights, stories, and guides from the Forge community.
            </p>
          </div>
        </div>
      </div>

      {/* Blog Posts Grid */}
      <div className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          {posts ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post: Post) => (
                <Card
                  key={post.title}
                  className="relative overflow-hidden pb-12"
                >
                  {post.image ? (
                    <Image
                      src={post.image}
                      alt={post.title}
                      width={300}
                      height={200}
                      className="h-48 w-full object-cover"
                    />
                  ) : (
                    <div className="h-48 w-full object-cover" />
                  )}
                  <div className="p-6">
                    <div className="flex items-center gap-2 mb-4">
                      <span className="inline-flex items-center rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
                        {post.category}
                      </span>
                      <span className="text-sm text-muted-foreground">
                        {formatDate(post.posted_at)}
                      </span>
                    </div>
                    <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
                    <p className="text-muted-foreground mb-4">{post.excerpt}</p>
                    <div className="absolute right-5 bottom-5">
                      <Link href={post.slug}>
                        <Button variant="ghost" size="sm">
                          Read More <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </Link>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <PostsSkeleton />
          )}
        </div>
      </div>
    </div>
  )
}
