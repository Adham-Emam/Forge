"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Filter, BookOpen } from "lucide-react";
import BlogPostCard from "@/components/blog/blog-post-card";
import { formatDistanceToNow } from "date-fns";

// Sample blog posts data
const allPosts = [
  {
    id: "1",
    title: "The Future of Skill Exchange in a Digital Economy",
    excerpt: "How technology is revolutionizing the way we trade skills and services in the modern world.",
    coverImage: "https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    publishedAt: "2025-02-15",
    author: {
      name: "Jamie Rodriguez",
      avatar: "https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    },
    category: "Trends",
  },
  {
    id: "2",
    title: "7 Skills That Will Be in High Demand by 2026",
    excerpt: "A look at the emerging skills that will shape the job market and create new opportunities in the coming years.",
    coverImage: "https://images.pexels.com/photos/3952989/pexels-photo-3952989.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    publishedAt: "2025-01-28",
    author: {
      name: "Alex Kim",
      avatar: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    },
    category: "Career",
  },
  {
    id: "3",
    title: "How to Price Your Creative Work: A Guide for Freelancers",
    excerpt: "Learn effective strategies for pricing your creative services to ensure fair compensation while remaining competitive.",
    coverImage: "https://images.pexels.com/photos/3785927/pexels-photo-3785927.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    publishedAt: "2025-01-12",
    author: {
      name: "Mira Johnson",
      avatar: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    },
    category: "Business",
  },
  {
    id: "4",
    title: "Building a Portfolio That Stands Out in a Crowded Market",
    excerpt: "Tips and strategies for creating a portfolio that captures attention and showcases your unique skills.",
    coverImage: "https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    publishedAt: "2024-12-19",
    author: {
      name: "David Chen",
      avatar: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    },
    category: "Career",
  },
  {
    id: "5",
    title: "The Psychology of Collaboration: Working Better Together",
    excerpt: "Understanding the psychological aspects of effective collaboration and how to overcome common challenges.",
    coverImage: "https://images.pexels.com/photos/3182812/pexels-photo-3182812.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    publishedAt: "2024-12-05",
    author: {
      name: "Sarah Miller",
      avatar: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    },
    category: "Psychology",
  },
  {
    id: "6",
    title: "AI Tools for Creative Professionals: Enhancing Your Workflow",
    excerpt: "Discover the latest AI tools that can help you streamline your creative process and boost productivity.",
    coverImage: "https://images.pexels.com/photos/8386434/pexels-photo-8386434.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    publishedAt: "2024-11-22",
    author: {
      name: "Raj Patel",
      avatar: "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    },
    category: "Technology",
  },
];

// Categories for filtering
const categories = [
  "All",
  "Trends",
  "Career",
  "Business",
  "Psychology",
  "Technology",
];

// Featured post (first post from the list)
const featuredPost = allPosts[0];

export default function BlogPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  
  // Filter posts based on search query and category
  const filteredPosts = allPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === "All" || post.category === activeCategory;
    
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen pt-16">
      {/* Hero Section */}
      <section className="bg-muted/30 py-12 md:py-20">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center text-center space-y-4">
            <Badge className="px-4 py-1.5 rounded-full border-accent/30 bg-accent/5 text-accent">
              Forge Blog
            </Badge>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight">
              Insights from the <span className="molten-text">Creative Frontier</span>
            </h1>
            <p className="text-muted-foreground max-w-2xl text-lg">
              Explore articles, guides, and trends to help you grow your skills and navigate the creative landscape.
            </p>
          </div>
        </div>
      </section>
      
      {/* Search and Filter */}
      <section className="py-8 border-b">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="relative w-full md:w-96">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search articles..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <div className="flex items-center space-x-2 w-full md:w-auto overflow-x-auto no-scrollbar">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={activeCategory === category ? "default" : "outline"}
                  size="sm"
                  onClick={() => setActiveCategory(category)}
                  className="whitespace-nowrap"
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </section>
      
      {/* Content */}
      <section className="py-12">
        <div className="container px-4 md:px-6">
          {searchQuery || activeCategory !== "All" ? (
            <div className="mb-8">
              <h2 className="text-2xl font-bold">
                {filteredPosts.length === 0 
                  ? "No results found" 
                  : `Search Results (${filteredPosts.length})`}
              </h2>
            </div>
          ) : (
            <>
              {/* Featured Post */}
              <div className="mb-12">
                <h2 className="text-2xl font-bold mb-6">Featured Article</h2>
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
                  <div className="lg:col-span-3 relative h-[300px] md:h-[400px] overflow-hidden rounded-xl">
                    <Image
                      src={featuredPost.coverImage}
                      alt={featuredPost.title}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
                    <div className="absolute bottom-0 p-6 text-white">
                      <Badge className="mb-3 bg-accent text-white border-none">
                        {featuredPost.category}
                      </Badge>
                      <h3 className="text-2xl md:text-3xl font-bold mb-2">
                        {featuredPost.title}
                      </h3>
                      <p className="mb-4 text-white/90 max-w-xl line-clamp-2">
                        {featuredPost.excerpt}
                      </p>
                      <div className="flex items-center space-x-4">
                        <div className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-white/30">
                          <Image
                            src={featuredPost.author.avatar}
                            alt={featuredPost.author.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <p className="font-medium">{featuredPost.author.name}</p>
                          <p className="text-sm text-white/70">
                            {formatDistanceToNow(new Date(featuredPost.publishedAt), { addSuffix: true })}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="lg:col-span-2 flex flex-col">
                    <Card className="flex-1">
                      <CardContent className="p-6">
                        <div className="flex items-center mb-4">
                          <BookOpen className="h-5 w-5 text-accent mr-2" />
                          <h3 className="font-medium">Featured Excerpt</h3>
                        </div>
                        <p className="text-muted-foreground mb-4 line-clamp-4">
                          In an era of rapid technological advancement, the concept of skill exchange is undergoing a profound transformation. Digital platforms are enabling people to trade expertise across geographical boundaries, creating new economic models. This article explores how this shift is impacting traditional employment and creating opportunities for those willing to embrace new approaches to work.
                        </p>
                        <div className="space-y-3">
                          <div className="flex items-center">
                            <div className="w-2 h-2 rounded-full bg-accent mr-2"></div>
                            <p className="text-sm">The rise of platform-based skill marketplaces</p>
                          </div>
                          <div className="flex items-center">
                            <div className="w-2 h-2 rounded-full bg-accent mr-2"></div>
                            <p className="text-sm">How cryptocurrency is enabling peer-to-peer compensation</p>
                          </div>
                          <div className="flex items-center">
                            <div className="w-2 h-2 rounded-full bg-accent mr-2"></div>
                            <p className="text-sm">The challenges of establishing trust in digital exchanges</p>
                          </div>
                        </div>
                        <Button 
                          className="w-full mt-6" 
                          variant="outline"
                          asChild
                        >
                          <Link href={`/blog/${featuredPost.id}`}>
                            Read Full Article
                          </Link>
                        </Button>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </div>
            </>
          )}
          
          {/* Articles Grid */}
          <div>
            <h2 className="text-2xl font-bold mb-6">
              {searchQuery || activeCategory !== "All" ? "Results" : "Latest Articles"}
            </h2>
            {filteredPosts.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground">No articles found matching your criteria.</p>
                <Button 
                  variant="outline" 
                  className="mt-4"
                  onClick={() => {
                    setSearchQuery("");
                    setActiveCategory("All");
                  }}
                >
                  Clear Filters
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredPosts.map(post => (
                  <BlogPostCard key={post.id} post={post} />
                ))}
              </div>
            )}
          </div>
          
          {/* Newsletter */}
          <div className="mt-16 bg-muted rounded-xl p-8 border">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-2xl font-bold mb-2">Stay updated</h3>
                <p className="text-muted-foreground mb-4">
                  Subscribe to our newsletter for the latest articles, guides, and insights.
                </p>
                <div className="flex gap-2">
                  <Input placeholder="Your email" className="max-w-sm" />
                  <Button>Subscribe</Button>
                </div>
              </div>
              <div className="hidden md:block">
                <div className="flex justify-end">
                  <div className="w-32 h-32 relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full blur-xl animate-pulse"></div>
                    <div className="relative h-full w-full flex items-center justify-center">
                      <BookOpen className="h-12 w-12 text-accent" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}