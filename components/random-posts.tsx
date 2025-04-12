import Image from 'next/image'
import Link from 'next/link'
import { formatDate } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'
import { Card } from '@/components/ui/card'

type Post = {
  id: number
  title: string
  slug: string
  image: string
  category: string
  excerpt: string
  posted_at: string
}

export default async function RandomPosts({
  slug,
  count,
}: {
  slug: string
  count: number
}) {
  const posts = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}blog/random-posts/?slug=${slug}&num=${count}`
  )
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
    <section className="border-t py-12 max-w-4xl mx-auto px-8 lg:px-0">
      <div className="container max-w-4xl">
        <h2 className="text-2xl font-bold tracking-tight mb-6">Also Read</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {posts.map((post: Post) => (
            <Card key={post.title} className="relative overflow-hidden pb-12">
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
                  <Link href={`/blog/${post.slug}`}>
                    <Button variant="ghost" size="sm">
                      Read More <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
