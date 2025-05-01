import Image from 'next/image'
import RandomPosts from '@/components/random-posts'
import Comments from '@/components/comments'
import { Separator } from '@/components/ui/separator'
import { Calendar } from 'lucide-react'
import { formatDate } from '@/lib/utils'
import ReactMarkdown from 'react-markdown'
import type { Metadata } from 'next'

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  // read route params
  const { slug } = await params

  // fetch data
  const post = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}blog/posts/${slug}`
  ).then((res) => res.json())

  return {
    title: post.title,
    description: post.excerpt,
  }
}

type Post = {
  id: number
  title: string
  slug: string
  image: string
  reading_time: number
  category: string
  excerpt: string
  content: string
  posted_at: string
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const slug = (await params).slug
  const post: Post = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}blog/posts/${slug}`
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
    <div className="flex min-h-screen flex-col">
      <main className="flex-1">
        <article className="relative">
          {/* Hero Section */}
          <div className="relative h-[60vh] min-h-[400px] w-full">
            <Image
              src={post.image}
              alt={post.title}
              fill
              className="object-cover absolute left-0 top-0 w-full"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background to-background/20" />
            <div className="absolute bottom-0 left-0 right-0 p-8 mx-auto w-fit">
              <div className="container max-w-4xl">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-4">
                  {post.title}
                </h1>
                <p className="text-xl text-muted-foreground max-w-2xl mb-6">
                  {post.excerpt}
                </p>
                <div className="flex items-center gap-6">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <span className="inline-flex items-center rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
                      {post.category}
                    </span>
                  </div>
                  <Separator orientation="vertical" className="h-8" />
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    {formatDate(post.posted_at)}
                  </div>
                  <Separator orientation="vertical" className="h-8" />
                  <p className="text-sm text-muted-foreground">
                    {post.reading_time} Minutes
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="container max-w-4xl py-12 mx-auto w-fit px-8 lg:px-0">
            {/* Main Content */}
            <div className="flex-1">
              <div className="prose prose-lg dark:prose-invert max-w-none">
                <ReactMarkdown>{post.content}</ReactMarkdown>
              </div>
            </div>
          </div>
        </article>

        {/* Comments Section */}
        <section className="border-t py-12 max-w-4xl mx-auto px-8 lg:px-0">
          <h2 className="text-2xl font-bold tracking-tight mb-6">Comments</h2>
          <Comments id={post.id} />
        </section>

        {/* Related Articles */}
        <RandomPosts slug={slug} count={4} />
      </main>
    </div>
  )
}
