import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Hammer, ArrowRight, Shield, Target, Users, DollarSign } from "lucide-react"
import Link from "next/link"

export default function HowItWorks() {
  const steps = [
    {
      title: "Create Your Profile",
      description: "Sign up and showcase your professional skills, experience, and portfolio. Let others know what you can offer and what you're looking for.",
      icon: Users,
    },
    {
      title: "Find Your Match",
      description: "Browse through potential matches or post your own exchange request. Our platform helps you find professionals with complementary skills.",
      icon: Target,
    },
    {
      title: "Agree on Terms",
      description: "Discuss the details of your skill exchange, including scope, timeline, and any monetary adjustments if skill values differ.",
      icon: Shield,
    },
    {
      title: "Complete the Exchange",
      description: "Work together to deliver your agreed services. Build your reputation through successful exchanges and reviews.",
      icon: DollarSign,
    },
  ]

  const faqs = [
    {
      question: "How does skill value adjustment work?",
      answer: "When exchanging skills of different values, the difference is calculated based on market rates and professional experience. The party offering the lower-valued skill can make up the difference with a monetary payment.",
    },
    {
      question: "What if I can't find a matching skill?",
      answer: "If you can't find a direct skill match, you can either post a traditional freelance project or create an exchange request that stays open until a suitable match is found.",
    },
    {
      question: "How is quality assured?",
      answer: "We maintain quality through our review system, skill verification process, and dispute resolution service. All users build a reputation score based on their exchange history.",
    },
    {
      question: "What types of skills can be exchanged?",
      answer: "Any professional skill can be exchanged on our platform, including but not limited to: development, design, writing, marketing, consulting, and creative services.",
    },
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
              How Forge Works
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-300">
              Learn how to exchange skills and create value on our platform. Follow our simple process to start your journey.
            </p>
          </div>
        </div>
      </div>

      {/* Steps Section */}
      <div className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Four Simple Steps to Success
            </h2>
            <p className="mt-6 text-lg leading-8 text-muted-foreground">
              Follow these steps to start exchanging skills and building valuable professional relationships.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            {steps.map((step, index) => (
              <Card key={step.title} className="p-6 relative">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 ring-1 ring-primary/20">
                  <step.icon className="h-6 w-6 text-primary" aria-hidden="true" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                <p className="text-muted-foreground">{step.description}</p>
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute -right-4 top-1/2 transform -translate-y-1/2">
                    <ArrowRight className="h-6 w-6 text-primary" />
                  </div>
                )}
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* FAQs Section */}
      <div className="py-24 sm:py-32 bg-secondary/50">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Frequently Asked Questions
            </h2>
            <p className="mt-6 text-lg leading-8 text-muted-foreground">
              Get answers to common questions about using Forge.
            </p>
          </div>

          <div className="mx-auto max-w-3xl">
            <div className="grid gap-8">
              {faqs.map((faq) => (
                <Card key={faq.question} className="p-6">
                  <h3 className="text-lg font-semibold mb-2">{faq.question}</h3>
                  <p className="text-muted-foreground">{faq.answer}</p>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Ready to Start Exchanging?
            </h2>
            <p className="mt-6 text-lg leading-8 text-muted-foreground">
              Join our community of skilled professionals and start creating value through skill exchange.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Button size="lg" asChild>
                <Link href="/exchange-hub">
                  Browse Exchanges <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link href="/contact">Contact Support</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}