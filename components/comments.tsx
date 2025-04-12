'use client'
import { useState, useEffect, FormEvent } from 'react'
import { Button } from '@/components/ui/button'

interface Comment {
  id: number
  name: string
  body: string
  created_at: string
}

export default function Comments({ id }: { id: number }) {
  const [comments, setComments] = useState<Comment[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)

  // Fetch comments with pagination
  const fetchComments = async (pageNum = 1, reset = false) => {
    try {
      setLoading(true)
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}blog/comments/?id=${id}&page=${pageNum}`
      )

      if (!response.ok) throw new Error('Failed to fetch comments')

      const data = await response.json()

      if (reset || pageNum === 1) {
        setComments(data.results || [])
      } else {
        setComments((prev) => [...prev, ...(data.results || [])])
      }

      setHasMore(!!data.next)
      setError(false)
    } catch (err) {
      console.error('Error fetching comments:', err)
      setError(true)
    } finally {
      setLoading(false)
    }
  }

  // Handle form submission
  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsSubmitting(true)

    const form = event.currentTarget
    const formData = new FormData(form)
    const name = formData.get('name') as string
    const body = formData.get('comment') as string

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}blog/comments/`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name,
            body,
            post: id,
          }),
        }
      )

      if (!response.ok) throw new Error('Failed to submit comment')

      const newComment = await response.json()
      setComments((prev) => [newComment, ...prev]) // Add new comment at top
      form.reset()
      setShowSuccess(true)
      setTimeout(() => setShowSuccess(false), 3000)
    } catch (err) {
      console.error('Error submitting comment:', err)
    } finally {
      setIsSubmitting(false)
    }
  }

  // Load more comments
  const loadMore = () => {
    const nextPage = page + 1
    setPage(nextPage)
    fetchComments(nextPage)
  }

  // Initial load and reset when post ID changes
  useEffect(() => {
    setPage(1)
    fetchComments(1, true)
  }, [id])

  return (
    <div className="space-y-6">
      {/* Comment Form */}
      <form onSubmit={onSubmit} className="space-y-4">
        {showSuccess && (
          <div className="p-3 bg-green-100 text-green-800 rounded-md">
            Comment submitted successfully!
          </div>
        )}

        <input
          type="text"
          name="name"
          placeholder="Your name"
          className="w-full p-3 border rounded-lg bg-transparent"
          required
          disabled={isSubmitting}
        />

        <textarea
          name="comment"
          placeholder="Type your comment here..."
          className="w-full p-3 border rounded-lg min-h-[120px] bg-transparent"
          required
          disabled={isSubmitting}
        />

        <Button
          type="submit"
          disabled={isSubmitting}
          className="block w-fit mx-auto md:ms-auto"
        >
          {isSubmitting ? 'Submitting...' : 'Send Comment'}
        </Button>
      </form>

      {/* Comments List */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">
          Comments {comments.length > 0 ? `(${comments.length})` : ''}
        </h3>

        {loading && page === 1 ? (
          <div className="text-center py-4">Loading comments...</div>
        ) : error ? (
          <div className="text-center py-4 text-red-500">
            Failed to load comments. Please try again.
          </div>
        ) : comments.length === 0 ? (
          <div className="text-center py-4 text-gray-500">
            No comments yet. Be the first to comment!
          </div>
        ) : (
          <>
            {comments.map((comment) => (
              <div key={comment.id} className="p-4 border rounded-lg">
                <h4 className="font-medium">{comment.name}</h4>
                <p className="text-gray-600 mt-1">{comment.body}</p>
                <p className="text-xs text-gray-400 mt-2">
                  {new Date(comment.created_at).toLocaleString()}
                </p>
              </div>
            ))}

            {hasMore && (
              <Button
                onClick={loadMore}
                disabled={loading}
                variant="outline"
                className="w-full mt-4"
              >
                {loading ? 'Loading more...' : 'Load More Comments'}
              </Button>
            )}
          </>
        )}
      </div>
    </div>
  )
}
