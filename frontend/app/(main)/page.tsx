import Link from 'next/link'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import { Badge } from '@/components/ui/badge'
import {
  ArrowRight,
  CheckCircle2,
  Users,
  Zap,
  Hammer,
  ClipboardList,
  ChevronRight,
} from 'lucide-react'
import ProjectCard from '@/components/projects/project-card'
import BlogPostCard from '@/components/blog/blog-post-card'

// Sample featured blog posts
const featuredPosts = [
  {
    id: '1',
    title: 'The Future of Skill Exchange in a Digital Economy',
    excerpt:
      'How technology is revolutionizing the way we trade skills and services in the modern world.',
    coverImage:
      'https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    publishedAt: '2025-02-15',
    author: {
      name: 'Jamie Rodriguez',
      avatar:
        'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    },
    category: 'Trends',
  },
  {
    id: '2',
    title: '7 Skills That Will Be in High Demand by 2026',
    excerpt:
      'A look at the emerging skills that will shape the job market and create new opportunities in the coming years.',
    coverImage:
      'https://images.pexels.com/photos/3952989/pexels-photo-3952989.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    publishedAt: '2025-01-28',
    author: {
      name: 'Alex Kim',
      avatar:
        'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    },
    category: 'Career',
  },
]

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-28 md:pt-32 pb-20 overflow-hidden">
        <div className="container mx-auto max-w-7xl px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <Badge
                variant="outline"
                className="px-4 py-1.5 rounded-full inline-flex items-center border-accent/30 bg-accent/5"
              >
                <span className="relative flex h-2 w-2 mr-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
                </span>
                <span className="text-xs font-medium">Now in Public Beta</span>
              </Badge>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
                <span className="molten-text">Forge</span> Your Skills,
                <br className="hidden md:inline" /> Craft Your Future
              </h1>

              <p className="text-xl text-muted-foreground max-w-md">
                Exchange skills, collaborate on projects, and build your
                professional network on the platform designed for the creators
                of tomorrow.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 pt-2">
                <Button size="lg" className="glow" asChild>
                  <Link href="/register">
                    Get Started
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link href="/projects">Browse Projects</Link>
                </Button>
              </div>

              <div className="flex items-center space-x-4 pt-4">
                <div className="flex -space-x-2">
                  <div className="relative w-8 h-8 rounded-full border-2 border-background overflow-hidden">
                    <Image
                      src="https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                      alt="User"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="relative w-8 h-8 rounded-full border-2 border-background overflow-hidden">
                    <Image
                      src="https://images.pexels.com/photos/1212984/pexels-photo-1212984.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                      alt="User"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="relative w-8 h-8 rounded-full border-2 border-background overflow-hidden">
                    <Image
                      src="https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                      alt="User"
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">
                  <span className="font-medium text-foreground">750+</span>{' '}
                  skilled professionals joined in the last month
                </p>
              </div>
            </div>

            <div className="relative w-full animate-float">
              <div className="absolute -left-20 -top-20 w-40 h-40 bg-primary/20 rounded-full blur-3xl forge-bg-glow"></div>
              <div className="absolute -right-10 -bottom-10 w-60 h-60 bg-accent/20 rounded-full blur-3xl forge-bg-glow"></div>

              <div className="relative w-full h-full rounded-2xl border border-border/50 bg-card/70 backdrop-blur-sm p-4 overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-full bg-forge-pattern opacity-5"></div>

                <div className=" relative z-10 space-y-4">
                  {/* Mock project interface */}
                  <div className="flex items-center justify-between">
                    <h3 className="font-orbitron text-lg">Active Projects</h3>
                    <Badge variant="outline" className="font-mono">
                      Beta v0.9.2
                    </Badge>
                  </div>

                  <div className="space-y-3">
                    {/* Project item */}
                    <div className="bg-background/70 rounded-lg p-3 border border-border/50 hover:border-primary/30 transition-all duration-300 cursor-pointer group">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-medium text-sm group-hover:text-primary transition-colors">
                            3D Game Asset Creation
                          </h4>
                          <p className="text-xs text-muted-foreground mt-1">
                            Due in 8 days
                          </p>
                        </div>
                        <Badge className="bg-primary/15 text-primary hover:bg-primary/20 border-none">
                          In Progress
                        </Badge>
                      </div>
                      <div className="mt-3 flex justify-between items-center">
                        <div className="flex -space-x-1">
                          <div className="relative w-6 h-6 rounded-full border-2 border-background overflow-hidden">
                            <Image
                              src="https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                              alt="User"
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div className="relative w-6 h-6 rounded-full border-2 border-background overflow-hidden">
                            <Image
                              src="https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                              alt="User"
                              fill
                              className="object-cover"
                            />
                          </div>
                        </div>
                        <div className="text-xs text-muted-foreground">
                          3 new messages
                        </div>
                      </div>
                    </div>

                    {/* Project item */}
                    <div className="bg-background/70 rounded-lg p-3 border border-border/50 hover:border-primary/30 transition-all duration-300 cursor-pointer group">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-medium text-sm group-hover:text-primary transition-colors">
                            Logo Design for Tech Startup
                          </h4>
                          <p className="text-xs text-muted-foreground mt-1">
                            Due in 4 days
                          </p>
                        </div>
                        <Badge className="bg-accent/15 text-accent hover:bg-accent/20 border-none">
                          Review
                        </Badge>
                      </div>
                      <div className="mt-3 flex items-center">
                        <div className="relative w-6 h-6 rounded-full border-2 border-background overflow-hidden">
                          <Image
                            src="https://images.pexels.com/photos/1391498/pexels-photo-1391498.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                            alt="User"
                            fill
                            className="object-cover"
                          />
                        </div>
                        <span className="ml-2 text-xs">Feedback received</span>
                      </div>
                    </div>

                    {/* Project item */}
                    <div className="bg-background/70 rounded-lg p-3 border border-border/50 hover:border-primary/30 transition-all duration-300 cursor-pointer group">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-medium text-sm group-hover:text-primary transition-colors">
                            Mobile App UI Design
                          </h4>
                          <p className="text-xs text-muted-foreground mt-1">
                            Due in 12 days
                          </p>
                        </div>
                        <Badge className="bg-secondary/30 text-foreground hover:bg-secondary/40 border-none">
                          Planning
                        </Badge>
                      </div>
                      <div className="mt-3 flex justify-between items-center">
                        <div className="flex -space-x-1">
                          <div className="relative w-6 h-6 rounded-full border-2 border-background overflow-hidden">
                            <Image
                              src="https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                              alt="User"
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div className="relative w-6 h-6 rounded-full border-2 border-background overflow-hidden">
                            <Image
                              src="https://images.pexels.com/photos/1987301/pexels-photo-1987301.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                              alt="User"
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div className="relative w-6 h-6 rounded-full border-2 border-background overflow-hidden bg-muted flex items-center justify-center text-xs">
                            +3
                          </div>
                        </div>
                        <div className="text-xs text-muted-foreground">
                          Kick-off tomorrow
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="relative py-3">
                  <Button variant="outline" className="w-full border-dashed">
                    <Link
                      href="/projects/new"
                      className="w-full flex items-center justify-center"
                    >
                      <span className="text-sm">Start New Project</span>
                      <span className="ml-1 text-muted-foreground">+</span>
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto max-w-7xl px-4 md:px-6">
          <div className="flex flex-col items-center text-center space-y-4 mb-12">
            <h2 className="text-3xl md:text-4xl font-bold">
              Crafted for{' '}
              <span className="molten-text">Creative Professionals</span>
            </h2>
            <p className="text-muted-foreground max-w-3xl">
              Forge combines project marketplace, skill exchange, and networking
              in one powerful platform designed to help you build your career.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Feature 1 */}
            <div className="bg-card rounded-xl p-6 border border-border hover:border-primary/50 transition-all duration-300 group">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary/20 transition-colors">
                <Hammer className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">Skill Exchange</h3>
              <p className="text-muted-foreground">
                Trade your expertise for other skills. No money needed, just
                valuable knowledge exchange.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-card rounded-xl p-6 border border-border hover:border-primary/50 transition-all duration-300 group">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary/20 transition-colors">
                <ClipboardList className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">Project Marketplace</h3>
              <p className="text-muted-foreground">
                Find paid opportunities or post your own projects to connect
                with skilled professionals.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-card rounded-xl p-6 border border-border hover:border-primary/50 transition-all duration-300 group">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary/20 transition-colors">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">Community Network</h3>
              <p className="text-muted-foreground">
                Connect with like-minded creators, collaborate, and grow your
                professional network.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="bg-card rounded-xl p-6 border border-border hover:border-primary/50 transition-all duration-300 group">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary/20 transition-colors">
                <Zap className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">Skill Development</h3>
              <p className="text-muted-foreground">
                Access resources, workshops, and feedback to continuously
                improve your craft.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Projects Section */}
      {/* <section className="py-20">
        <div className="container mx-auto max-w-7xl px-4 md:px-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Featured Projects
              </h2>
              <p className="text-muted-foreground max-w-2xl">
                Explore our curated selection of projects from innovative
                creators around the world.
              </p>
            </div>
            <Button variant="ghost" className="mt-4 md:mt-0" asChild>
              <Link href="/projects">
                View All Projects
                <ChevronRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredProjects.map((project, index) => (
              <ProjectCard key={index} project={project} />
            ))}
          </div>
        </div>
      </section> */}

      {/* Testimonial Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto max-w-7xl px-4 md:px-6">
          <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              What Our Community Says
            </h2>
            <div className="relative">
              <div className="absolute -inset-1 rounded-lg bg-gradient-to-r from-primary/20 via-accent/20 to-primary/20 blur"></div>
              <div className="relative bg-card border border-border rounded-lg p-8 shadow-sm">
                <p className="text-lg italic mb-6">
                  &quot;Forge has completely transformed how I collaborate with
                  other professionals. The skill exchange feature allowed me to
                  trade my UI design skills for web development help, saving me
                  thousands while building valuable connections.&quot;
                </p>
                <div className="flex items-center justify-center space-x-4">
                  <div className="relative w-12 h-12 rounded-full overflow-hidden">
                    <Image
                      src="https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                      alt="Sarah Johnson"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="text-left">
                    <h4 className="font-semibold">Sarah Johnson</h4>
                    <p className="text-sm text-muted-foreground">
                      UI/UX Designer @ Creatify
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-card rounded-xl p-6 border border-border">
              <div className="flex space-x-4 mb-6">
                <CheckCircle2 className="h-6 w-6 text-accent" />
                <h3 className="text-xl font-bold">Verified Skills</h3>
              </div>
              <p className="text-muted-foreground">
                Our community members validate each other&apos;s work, ensuring
                quality and trust.
              </p>
            </div>

            <div className="bg-card rounded-xl p-6 border border-border">
              <div className="flex space-x-4 mb-6">
                <CheckCircle2 className="h-6 w-6 text-accent" />
                <h3 className="text-xl font-bold">Secure Payments</h3>
              </div>
              <p className="text-muted-foreground">
                Funds are held safely in escrow until both parties are satisfied
                with the work.
              </p>
            </div>

            <div className="bg-card rounded-xl p-6 border border-border">
              <div className="flex space-x-4 mb-6">
                <CheckCircle2 className="h-6 w-6 text-accent" />
                <h3 className="text-xl font-bold">Dedicated Support</h3>
              </div>
              <p className="text-muted-foreground">
                Our team is available to help resolve any issues and ensure
                smooth collaborations.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <section className="py-20">
        <div className="container mx-auto max-w-7xl px-4 md:px-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Latest from the Blog
              </h2>
              <p className="text-muted-foreground max-w-2xl">
                Insights, trends, and stories from the world of creative
                professionals.
              </p>
            </div>
            <Button variant="ghost" className="mt-4 md:mt-0" asChild>
              <Link href="/blog">
                View All Articles
                <ChevronRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {featuredPosts.map((post) => (
              <BlogPostCard key={post.id} post={post} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto max-w-7xl px-4 md:px-6">
          <div className="relative rounded-2xl overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/90 to-accent/90 opacity-95"></div>
            <div className="absolute inset-0 bg-forge-pattern opacity-5 mix-blend-overlay"></div>

            <div className="relative z-10 p-8 md:p-12 text-white">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                <div className="space-y-6">
                  <h2 className="text-3xl md:text-4xl font-bold">
                    Ready to Forge Your Path?
                  </h2>
                  <p className="text-white/90 text-lg">
                    Join thousands of creative professionals who are building
                    their careers, sharing skills, and making connections on
                    Forge.
                  </p>
                  <div className="pt-4 flex flex-col sm:flex-row gap-4">
                    <Button
                      size="lg"
                      variant="default"
                      className="bg-white text-primary hover:bg-white/90"
                      asChild
                    >
                      <Link href="/register">
                        Create Account
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                    <Button
                      size="lg"
                      variant="outline"
                      className="text-foreground border-white hover:bg-white/10"
                      asChild
                    >
                      <Link href="/about">Learn More</Link>
                    </Button>
                  </div>
                </div>

                <div className="hidden md:flex justify-end">
                  <div className="relative w-80 h-80">
                    <div className="absolute w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
                    <Image
                      src="https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                      alt="Creative collaboration"
                      fill
                      className="object-cover rounded-lg"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
