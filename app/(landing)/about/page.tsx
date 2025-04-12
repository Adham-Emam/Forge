import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Hammer, Users, Target, Shield, ArrowRight } from "lucide-react"
import Link from "next/link"

export default function About() {
  const team = [
    {
      name: "Sarah Chen",
      role: "Founder & CEO",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80",
      description: "Former freelancer turned entrepreneur, passionate about revolutionizing skill exchange."
    },
    {
      name: "Marcus Rodriguez",
      role: "CTO",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80",
      description: "Tech veteran with 15+ years experience in marketplace platforms."
    },
    {
      name: "Emily Taylor",
      role: "Head of Community",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80",
      description: "Community builder focused on creating meaningful connections between professionals."
    }
  ]

  const values = [
    {
      icon: Users,
      title: "Community First",
      description: "We believe in the power of community and mutual growth through collaboration."
    },
    {
      icon: Target,
      title: "Fair Exchange",
      description: "Our platform ensures every exchange is balanced and valuable for all parties."
    },
    {
      icon: Shield,
      title: "Trust & Security",
      description: "We maintain the highest standards of trust and security in every transaction."
    }
  ]

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
              About Forge
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-300">
              We're building the future of professional collaboration through skill exchange.
            </p>
          </div>
        </div>
      </div>

      {/* Mission Section */}
      <div className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-8">Our Mission</h2>
            <p className="text-lg text-muted-foreground">
              At Forge, we believe in the power of skill exchange to transform careers and businesses. 
              Our platform connects talented professionals, enabling them to trade skills and create 
              mutual value. Like a blacksmith shapes metal, we help shape careers through meaningful 
              collaborations.
            </p>
          </div>
        </div>
      </div>

      {/* Values Section */}
      <div className="py-24 sm:py-32 bg-secondary/50">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Our Values</h2>
            <p className="mt-6 text-lg leading-8 text-muted-foreground">
              The principles that guide everything we do at Forge.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {values.map((value) => (
              <Card key={value.title} className="p-6">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 ring-1 ring-primary/20">
                  <value.icon className="h-6 w-6 text-primary" aria-hidden="true" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{value.title}</h3>
                <p className="text-muted-foreground">{value.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Our Team</h2>
            <p className="mt-6 text-lg leading-8 text-muted-foreground">
              Meet the craftsmen behind Forge.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {team.map((member) => (
              <Card key={member.name} className="p-6 text-center">
                <img
                  src={member.image}
                  alt={member.name}
                  className="mx-auto h-24 w-24 rounded-full mb-4"
                />
                <h3 className="text-xl font-semibold">{member.name}</h3>
                <p className="text-primary mb-2">{member.role}</p>
                <p className="text-muted-foreground">{member.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-24 sm:py-32 bg-secondary/50">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Join Our Community
            </h2>
            <p className="mt-6 text-lg leading-8 text-muted-foreground">
              Be part of the future of professional collaboration.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Button size="lg" asChild>
                <Link href="/exchange-hub">
                  Start Exchanging <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link href="/contact">Contact Us</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}