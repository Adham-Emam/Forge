'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Menu, X, Hammer } from 'lucide-react'
import { checkAuth } from '@/lib/auth'

const navigation = [
  { name: 'Exchange Hub', href: '/exchange-hub' },
  { name: 'How It Works', href: '/how-it-works' },
  { name: 'About', href: '/about' },
  { name: 'Blog', href: '/blog' },
  { name: 'Contact', href: '/contact' },
]

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    const verifyAuth = async () => {
      const { isAuthenticated } = await checkAuth()
      setIsAuthenticated(isAuthenticated)
    }
    verifyAuth()
  }, [])

  return (
    <header className="relative z-50">
      {/* Mobile menu */}
      {mobileMenuOpen && (
        <>
          <div
            className="fixed top-0 left-0 z-100 w-full h-screen bg-black/80 backdrop-filter backdrop-blur lg:hidden"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className="lg:hidden">
            <div className="fixed right-0 top-0 z-52 w-full h-screen overflow-y-auto bg-background/80 px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-border">
              <div className="flex items-center justify-between">
                <Link href="/" className="-m-1.5 p-1.5 flex items-center gap-2">
                  <Hammer className="h-8 w-8" />
                  <span className="text-xl font-bold">Forge</span>
                </Link>
                <button
                  type="button"
                  className="-m-2.5 rounded-md p-2.5"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <span className="sr-only">Close menu</span>
                  <X className="h-6 w-6" aria-hidden="true" />
                </button>
              </div>
              <div className="mt-6 flow-root">
                <div className="-my-6 divide-y divide-border">
                  <div className="space-y-2 py-6">
                    <Link
                      href="/"
                      className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 "
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Home
                    </Link>
                    {navigation.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 "
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                  <div className="py-6 space-y-2">
                    {isAuthenticated ? (
                      <Link href="/logout">
                        <Button variant="outline" className="w-full mb-2">
                          Sign out
                        </Button>
                      </Link>
                    ) : (
                      <>
                        <Link href="/login">
                          <Button variant="outline" className="w-full mb-2">
                            Sign in
                          </Button>
                        </Link>
                        <Link href="/register">
                          <Button className="w-full">Get Started</Button>
                        </Link>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
      <nav
        className="container mx-auto flex items-center justify-between p-6 lg:px-8"
        aria-label="Global"
      >
        <div className="flex lg:flex-1">
          <Link href="/" className="-m-1.5 p-1.5 flex items-center gap-2">
            <Hammer className="h-8 w-8" />
            <span className="text-xl font-bold">Forge</span>
          </Link>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Open main menu</span>
            <Menu className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        <div className="hidden lg:flex lg:gap-x-12">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-sm font-semibold leading-6 hover:text-primary transition-colors"
            >
              {item.name}
            </Link>
          ))}
        </div>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end gap-4">
          {isAuthenticated ? (
            <Link href="/logout">
              <Button variant="outline">Sign out</Button>
            </Link>
          ) : (
            <>
              <Link href="/login">
                <Button variant="outline">Sign in</Button>
              </Link>
              <Link href="/register">
                <Button>Get Started</Button>
              </Link>
            </>
          )}
        </div>
      </nav>
    </header>
  )
}
