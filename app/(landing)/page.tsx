import { Button } from '@/components/ui/button'
import {
  ArrowRight,
  User,
  RefreshCw,
  Flame,
  Shield,
  Target,
  Star,
  Search,
  Handshake,
} from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <div className="relative hero-pattern">
        <div className="relative py-24 sm:py-32">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <div className="mb-8 flex justify-center">
                <div className="relative rounded-full p-4 bg-primary/10 ring-1 ring-primary/20">
                  <Flame
                    className="h-12 w-12 text-primary"
                    aria-hidden="true"
                  />
                </div>
              </div>
              <h1 className="text-4xl font-bold tracking-tight sm:text-6xl text-white">
                Forge Your Future Through Skill Exchange
              </h1>
              <p className="mt-6 text-lg leading-8 text-gray-300">
                Welcome to Forge - where talent meets opportunity. Exchange your
                skills with fellow craftsmen or find your next project in our
                thriving marketplace.
              </p>
              <div className="mt-10 flex items-center justify-center gap-x-6">
                <Button
                  size="lg"
                  className="bg-primary hover:bg-primary/90"
                  asChild
                >
                  <Link href="/exchange-hub">
                    Start Exchanging <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="text-white border-white hover:bg-white/10"
                  asChild
                >
                  <Link href="/how-it-works">Learn More</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-base font-semibold leading-7 text-primary">
              Why Choose Forge
            </h2>
            <p className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
              Master the Art of Skill Exchange
            </p>
            <p className="mt-6 text-lg leading-8 text-muted-foreground">
              Like a blacksmith shapes metal, Forge helps you shape your career
              through meaningful exchanges and collaborations.
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
            <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
              {[
                {
                  title: 'Direct Skill Exchange',
                  description:
                    'Trade your expertise directly with other professionals. No middlemen, just pure value exchange.',
                  icon: RefreshCw,
                },
                {
                  title: 'Fair Value Adjustment',
                  description:
                    'When skill values differ, simply pay the difference. Keep exchanges balanced and fair.',
                  icon: Shield,
                },
                {
                  title: 'Traditional Projects',
                  description:
                    "Can't find a match? Post or find traditional freelance projects on our platform.",
                  icon: Target,
                },
              ].map((feature) => (
                <div key={feature.title} className="flex flex-col items-start">
                  <div className="rounded-lg mx-0 lg:mx-auto bg-primary/10 p-2 ring-1 ring-primary/20">
                    <feature.icon
                      className="h-6 w-6 text-primary"
                      aria-hidden="true"
                    />
                  </div>
                  <dt className="mt-4 mx-0 lg:mx-auto font-semibold">
                    {feature.title}
                  </dt>
                  <dd className="mt-2 leading-7 text-muted-foreground text-left lg:text-center">
                    {feature.description}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>

      {/* How It Works Section */}
      <div className="forge-pattern py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              How It Works
            </h2>
            <p className="mt-6 text-lg leading-8 text-gray-300">
              Join our community of skilled professionals and start exchanging
              value today.
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
            <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-4 mx-auto">
              {[
                {
                  icon: User,
                  title: 'Create Profile',
                  description: 'Sign up and showcase your skills',
                },
                {
                  icon: Search,
                  title: 'Find Matches',
                  description:
                    'Discover professionals with complementary skills',
                },
                {
                  icon: Handshake,
                  title: 'Make Exchange',
                  description: 'Agree on terms and start collaboration',
                },
                {
                  icon: Star,
                  title: 'Build Reputation',
                  description: 'Complete projects and earn reviews',
                },
              ].map((item, index) => (
                <div
                  key={item.title}
                  className="flex flex-col items-center text-center"
                >
                  <div className="rounded-full bg-primary/10 p-3 ring-1 ring-primary/20">
                    <item.icon
                      className="h-6 w-6 text-primary"
                      aria-hidden="true"
                    />
                  </div>
                  <dt className="mt-4 font-semibold text-white">
                    {item.title}
                  </dt>
                  <dd className="mt-2 leading-7 text-gray-300">
                    {item.description}
                  </dd>
                  {index < 3 && (
                    <div className="hidden lg:block absolute right-0 top-1/2 transform translate-x-1/2 -translate-y-1/2">
                      <ArrowRight className="h-6 w-6 text-primary" />
                    </div>
                  )}
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-xl text-center">
            <h2 className="text-lg font-semibold leading-8 tracking-tight text-primary">
              Testimonials
            </h2>
            <p className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
              Trusted by Craftsmen Worldwide
            </p>
          </div>
          <div className="mx-auto mt-16 flow-root max-w-2xl sm:mt-20 lg:mx-0 lg:max-w-none">
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  name: 'Sarah Chen',
                  role: 'UI/UX Designer',
                  image:
                    'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80',
                  quote:
                    'Forge helped me exchange my design skills for web development. The platform made it easy to find the perfect match.',
                },
                {
                  name: 'Marcus Rodriguez',
                  role: 'Full Stack Developer',
                  image:
                    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80',
                  quote:
                    "The skill exchange concept is brilliant. I've completed multiple successful trades and expanded my network.",
                },
                {
                  name: 'Emily Taylor',
                  role: 'Content Creator',
                  image:
                    'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80',
                  quote:
                    "Forge's fair value system ensures everyone gets what they deserve. It's revolutionizing freelancing.",
                },
              ].map((testimonial) => (
                <div
                  key={testimonial.name}
                  className="rounded-2xl bg-secondary/50 p-8 ring-1 ring-primary/10"
                >
                  <Image
                    className="mx-auto h-12 w-12 rounded-full"
                    width={100}
                    height={100}
                    src={testimonial.image}
                    alt={testimonial.name}
                  />
                  <blockquote className="mt-6 text-center">
                    <p className="text-base leading-7 text-muted-foreground">
                      {testimonial.quote}
                    </p>
                  </blockquote>
                  <div className="mt-6 text-center">
                    <div className="font-semibold">{testimonial.name}</div>
                    <div className="text-sm text-muted-foreground">
                      {testimonial.role}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="relative isolate">
        <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Ready to Start Your Journey?
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-muted-foreground">
              Join our community of skilled professionals and start exchanging
              value today.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Button
                size="lg"
                className="bg-primary hover:bg-primary/90"
                asChild
              >
                <Link href="/exchange-hub">
                  Get Started <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link href="/contact">Contact Us</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
