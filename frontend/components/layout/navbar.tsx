'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { ModeToggle } from '@/components/theme/mode-toggle'
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { cn } from '@/lib/utils'
import { motion } from 'framer-motion'
import { Hammer, Menu, X } from 'lucide-react'
import { checkAuth } from '@/lib/auth'
import path from 'node:path'

const routes = [
  {
    name: 'Home',
    path: '/',
  },
  {
    name: 'Projects',
    path: '/projects',
    subMenu: [
      { name: 'Browse Projects', path: '/projects' },
      { name: 'Create Project', path: '/projects/create' },
      { name: 'My Projects', path: '/projects/my-projects' },
    ],
  },
  {
    name: 'Blog',
    path: '/blog',
  },
  {
    name: 'Messages',
    path: '/messages',
  },
]

export function Navbar() {
  const pathname = usePathname()
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')

  // Simulating login state - would be replaced with actual auth
  useEffect(() => {
    async function checkLoginStatus() {
      const isAuthenticated = await checkAuth()
      setIsLoggedIn(isAuthenticated)
      const user = localStorage.getItem('forge-user')
      setFirstName(user ? JSON.parse(user).first_name : '')
      setLastName(user ? JSON.parse(user).last_name : '')
    }

    checkLoginStatus()
  }, [pathname])

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header
      className={cn(
        'fixed top-0 w-full z-50 transition-all duration-300',
        isScrolled
          ? 'bg-background/85 backdrop-blur-md border-b shadow-sm'
          : 'bg-transparent'
      )}
    >
      <div className="container mx-auto max-w-7xl flex items-center justify-between h-16 px-4 md:px-8">
        <Link href="/" className="flex items-center space-x-2 z-50">
          <div className="relative w-8 h-8 flex items-center justify-center">
            <Hammer className="h-6 w-6 text-accent absolute" />
            <motion.div
              className="absolute inset-0 bg-accent rounded-full"
              initial={{ scale: 0.8, opacity: 0.5 }}
              animate={{
                scale: [0.8, 1.1, 0.8],
                opacity: [0.5, 0.3, 0.5],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
          </div>
          <span className="font-orbitron text-xl font-bold">
            <span className="molten-text">FORGE</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex md:items-center md:justify-between md:space-x-2">
          <NavigationMenu>
            <NavigationMenuList>
              {routes.map((route) => (
                <NavigationMenuItem key={route.path} className="p-3">
                  {route.subMenu ? (
                    <>
                      <NavigationMenuTrigger
                        className={cn(
                          'font-medium',
                          pathname === route.path && 'text-accent'
                        )}
                      >
                        {route.name}
                      </NavigationMenuTrigger>
                      <NavigationMenuContent>
                        <div className="w-[220px] p-3">
                          {route.subMenu.map((subItem) => (
                            <Link
                              key={subItem.path}
                              href={subItem.path}
                              legacyBehavior
                              passHref
                            >
                              <NavigationMenuLink
                                className={cn(
                                  'block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent/10 focus:bg-accent/10',
                                  pathname === subItem.path && 'bg-accent/10'
                                )}
                              >
                                <div className="text-sm font-medium leading-none">
                                  {subItem.name}
                                </div>
                              </NavigationMenuLink>
                            </Link>
                          ))}
                        </div>
                      </NavigationMenuContent>
                    </>
                  ) : (
                    <Link href={route.path} legacyBehavior passHref>
                      <NavigationMenuLink
                        className={cn(
                          'font-medium',
                          pathname === route.path
                            ? 'text-accent'
                            : 'text-foreground'
                        )}
                      >
                        {route.name}
                      </NavigationMenuLink>
                    </Link>
                  )}
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center space-x-3">
          <ModeToggle />

          {isLoggedIn ? (
            <Avatar className="cursor-pointer">
              <AvatarImage
                src="https://images.pexels"
                alt={`${firstName}${lastName}`}
              />
              <AvatarFallback className="bg-secondary">
                {firstName?.split('', 1)}
                {lastName?.split('', 1)}
              </AvatarFallback>
            </Avatar>
          ) : (
            <div className="hidden md:flex space-x-2">
              <Button variant="ghost" size="sm" asChild>
                <Link href="/login">Log In</Link>
              </Button>
              <Button className="glow" size="sm" asChild>
                <Link href="/register">Sign Up</Link>
              </Button>
            </div>
          )}

          {/* Mobile Menu */}
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden"
                aria-label="Menu"
              >
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent className="flex flex-col">
              <Link href="/" className="flex items-center gap-x-2 py-6">
                <Hammer className="h-6 w-6 text-accent" />
                <span className="font-orbitron text-xl font-bold">
                  <span className="molten-text">FORGE</span>
                </span>
              </Link>
              <nav className="flex flex-col gap-y-6 text-lg">
                {routes.map((route) => (
                  <div key={route.path} className="space-y-3">
                    <Link
                      href={route.path}
                      className={cn(
                        'text-foreground/80 hover:text-foreground transition-colors',
                        pathname === route.path && 'text-accent font-semibold'
                      )}
                    >
                      {route.name}
                    </Link>
                    {route.subMenu && (
                      <div className="pl-4 space-y-3 border-l border-border">
                        {route.subMenu.map((subItem) => (
                          <Link
                            key={subItem.path}
                            href={subItem.path}
                            className={cn(
                              'block text-sm text-foreground/70 hover:text-foreground',
                              pathname === subItem.path && 'text-accent'
                            )}
                          >
                            {subItem.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </nav>
              <div className="mt-auto pt-6">
                {isLoggedIn ? (
                  <div className="flex items-center gap-x-4">
                    <Avatar>
                      <AvatarImage
                        src="https://images.pexels.com/photos/1933873/pexels-photo-1933873.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                        alt="@username"
                      />
                      <AvatarFallback>U</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium">Alex Morgan</p>
                      <Link
                        className="px-0 text-sm text-muted-foreground hover:text-foreground"
                        href="/logout"
                      >
                        Log Out
                      </Link>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col gap-y-3">
                    <Button variant="outline" asChild>
                      <Link href="/login">Log In</Link>
                    </Button>
                    <Button asChild>
                      <Link href="/register">Sign Up</Link>
                    </Button>
                  </div>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
