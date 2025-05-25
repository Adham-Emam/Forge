"use client";

import Link from "next/link";
import Image from "next/image";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatDistanceToNow } from "date-fns";
import { motion } from "framer-motion";

interface Post {
  id: string;
  title: string;
  excerpt: string;
  coverImage: string;
  publishedAt: string;
  author: {
    name: string;
    avatar: string;
  };
  category: string;
}

interface BlogPostCardProps {
  post: Post;
}

export default function BlogPostCard({ post }: BlogPostCardProps) {
  const publishedDate = new Date(post.publishedAt);
  const timeAgo = formatDistanceToNow(publishedDate, { addSuffix: true });

  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <Card className="overflow-hidden group border-border hover:border-primary/30 transition-all duration-200">
        <div className="relative h-48 w-full overflow-hidden">
          <Image
            src={post.coverImage}
            alt={post.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
          <div className="absolute bottom-3 left-3">
            <Badge className="bg-accent/90 hover:bg-accent text-white border-none">
              {post.category}
            </Badge>
          </div>
        </div>
        <CardContent className="p-5">
          <Link href={`/blog/${post.id}`}>
            <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors line-clamp-2">
              {post.title}
            </h3>
          </Link>
          <p className="text-muted-foreground mb-4 line-clamp-3">
            {post.excerpt}
          </p>
        </CardContent>
        <CardFooter className="px-5 py-4 border-t bg-muted/30 flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <div className="relative w-8 h-8 rounded-full overflow-hidden">
              <Image
                src={post.author.avatar}
                alt={post.author.name}
                fill
                className="object-cover"
              />
            </div>
            <div>
              <p className="text-sm font-medium line-clamp-1">{post.author.name}</p>
              <p className="text-xs text-muted-foreground">{timeAgo}</p>
            </div>
          </div>
          <Link 
            href={`/blog/${post.id}`}
            className="text-sm font-medium text-primary hover:underline"
          >
            Read More
          </Link>
        </CardFooter>
      </Card>
    </motion.div>
  );
}