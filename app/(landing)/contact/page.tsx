import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Mail, Phone, MapPin } from 'lucide-react'

export default function Contact() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="forge-pattern py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 text-center">
          <div className="mx-auto max-w-2xl">
            <div className="mb-8 flex justify-center">
              <div className="relative rounded-full p-4 bg-primary/10 ring-1 ring-primary/20">
                <Mail className="h-12 w-12 text-primary" aria-hidden="true" />
              </div>
            </div>
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
              Get in Touch
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-300">
              Have questions about Forge? We&apos;re here to help you navigate
              the world of skill exchange.
            </p>
          </div>
        </div>
      </div>

      {/* Contact Form Section */}
      <div className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div>
              <h2 className="text-3xl font-bold tracking-tight mb-8">
                Contact Information
              </h2>
              <div className="space-y-8">
                <div className="flex items-start gap-4">
                  <div className="rounded-lg bg-primary/10 p-2 ring-1 ring-primary/20">
                    <Mail className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Email</h3>
                    <p className="text-muted-foreground">support@forge.com</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="rounded-lg bg-primary/10 p-2 ring-1 ring-primary/20">
                    <Phone className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Phone</h3>
                    <p className="text-muted-foreground">+1 (555) 123-4567</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="rounded-lg bg-primary/10 p-2 ring-1 ring-primary/20">
                    <MapPin className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Location</h3>
                    <p className="text-muted-foreground">
                      123 Forge Street
                      <br />
                      San Francisco, CA 94105
                      <br />
                      United States
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-12">
                <h2 className="text-3xl font-bold tracking-tight mb-8">
                  Office Hours
                </h2>
                <div className="space-y-4 text-muted-foreground">
                  <p>Monday - Friday: 9:00 AM - 6:00 PM (PST)</p>
                  <p>Saturday: 10:00 AM - 4:00 PM (PST)</p>
                  <p>Sunday: Closed</p>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <Card className="p-8">
              <h2 className="text-2xl font-bold mb-6">Send us a Message</h2>
              <form className="space-y-6">
                <div className="space-y-4">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium mb-2"
                    >
                      Name
                    </label>
                    <Input id="name" placeholder="Your name" />
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium mb-2"
                    >
                      Email
                    </label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="your@email.com"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="subject"
                      className="block text-sm font-medium mb-2"
                    >
                      Subject
                    </label>
                    <Input id="subject" placeholder="How can we help?" />
                  </div>
                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium mb-2"
                    >
                      Message
                    </label>
                    <Textarea
                      id="message"
                      placeholder="Tell us more about your inquiry..."
                      rows={6}
                    />
                  </div>
                </div>
                <Button className="w-full">Send Message</Button>
              </form>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
