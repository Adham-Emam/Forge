'use client'

import { useState, useRef, useEffect } from 'react'
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
import {
  Sheet,
  SheetTitle,
  SheetContent,
  SheetTrigger,
} from '@/components/ui/sheet'
import { cn } from '@/lib/utils'
import { motion } from 'framer-motion'
import { Hammer, Loader2, Menu, X } from 'lucide-react'
import { checkAuth } from '@/lib/auth'

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
]

const profileDropdown = [
  {
    name: 'Bonfire',
    path: '/bonfire',
  },
  {
    name: 'Notifications',
    path: '/notifications',
  },
  {
    name: 'Help & Support',
    path: '/help',
  },
  {
    name: 'Feedback',
    path: '/feedback',
  },
  {
    name: 'Log Out',
    path: '/logout',
  },
]

export function Navbar() {
  const pathname = usePathname()
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')

  const [isOpen, setIsOpen] = useState(false)
  const toggleDropdown = () => setIsOpen(!isOpen)
  // Reference for the dropdown to handle clicks outside
  const dropdownRef = useRef<HTMLDivElement>(null)

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
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        event.target &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
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
                            <NavigationMenuLink
                              className={cn(
                                'block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent/10 focus:bg-accent/10',
                                pathname === subItem.path && 'bg-accent/10'
                              )}
                              href={subItem.path}
                              key={subItem.path}
                            >
                              <div className="text-sm font-medium leading-none">
                                {subItem.name}
                              </div>
                            </NavigationMenuLink>
                          ))}
                        </div>
                      </NavigationMenuContent>
                    </>
                  ) : (
                    <NavigationMenuLink
                      href={route.path}
                      className={cn(
                        'font-medium',
                        pathname === route.path
                          ? 'text-accent'
                          : 'text-foreground'
                      )}
                    >
                      {route.name}
                    </NavigationMenuLink>
                  )}
                </NavigationMenuItem>
              ))}
              {isLoggedIn && (
                <NavigationMenuItem className="p-3">
                  <NavigationMenuLink
                    href="/messages"
                    className={cn(
                      'font-medium',
                      pathname === '/messages"'
                        ? 'text-accent'
                        : 'text-foreground'
                    )}
                  >
                    Messages
                  </NavigationMenuLink>
                </NavigationMenuItem>
              )}
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center space-x-3">
          <ModeToggle />

          {isLoggedIn ? (
            <div
              className="hidden md:flex items-center space-x-3 relative"
              ref={dropdownRef}
            >
              <Avatar className="cursor-pointer" onClick={toggleDropdown}>
                <AvatarImage
                  src="https://images.pexels"
                  alt={`${firstName} ${lastName}`}
                />
                <AvatarFallback className="bg-card text-foreground">
                  {firstName?.charAt(0)}
                  {lastName?.charAt(0)}
                </AvatarFallback>
              </Avatar>

              {isOpen && (
                <div className="absolute top-full right-0 mt-2 w-48 bg-card/90 backdrop-blur-lg border-b shadow-sm rounded z-50 border">
                  <NavigationMenu className="w-full flex flex-col list-none">
                    <NavigationMenuItem className="px-3 py-2">
                      <NavigationMenuLink
                        href={`/profile/${firstName.toLowerCase()}-${lastName.toLowerCase()}`}
                        onClick={() => setIsOpen(false)}
                        className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent/10 focus:bg-accent/10"
                      >
                        {firstName} {lastName}
                      </NavigationMenuLink>
                    </NavigationMenuItem>
                    {profileDropdown.map((item) => (
                      <NavigationMenuItem
                        key={item.path}
                        className="w-full px-3 py-2"
                      >
                        <NavigationMenuLink
                          href={item.path}
                          onClick={() => setIsOpen(false)}
                          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent/10 focus:bg-accent/10"
                        >
                          {item.name}
                        </NavigationMenuLink>
                      </NavigationMenuItem>
                    ))}
                  </NavigationMenu>
                </div>
              )}
            </div>
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
            <SheetTitle className="sr-only">Menu</SheetTitle>
            <SheetContent className="flex flex-col">
              <Link href="/" className="flex items-center gap-x-2 py-6">
                <Hammer className="h-6 w-6 text-accent" />
                <span className="font-orbitron text-xl font-bold">
                  <span className="molten-text">FORGE</span>
                </span>
              </Link>
              <nav className="overflow-y-auto flex flex-col gap-y-6 text-lg">
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
                {isLoggedIn && (
                  <div className="space-y-3">
                    <Link
                      href="/notifications"
                      className={cn(
                        'text-foreground/80 hover:text-foreground transition-colors',
                        pathname === '/notifications' &&
                          'text-accent font-semibold'
                      )}
                    >
                      Notifications
                    </Link>
                  </div>
                )}
                <div className="space-y-3">
                  <Link
                    href="/bonfire"
                    className={cn(
                      'text-foreground/80 hover:text-foreground transition-colors',
                      pathname === '/bonfire' && 'text-accent font-semibold'
                    )}
                  >
                    Bonfire
                  </Link>
                </div>
                <div className="space-y-3">
                  <Link
                    href="/help"
                    className={cn(
                      'text-foreground/80 hover:text-foreground transition-colors',
                      pathname === '/help' && 'text-accent font-semibold'
                    )}
                  >
                    Help & Support
                  </Link>
                </div>
                <div className="space-y-3">
                  <Link
                    href="/feedback"
                    className={cn(
                      'text-foreground/80 hover:text-foreground transition-colors',
                      pathname === '/feedback' && 'text-accent font-semibold'
                    )}
                  >
                    Feedback
                  </Link>
                </div>
              </nav>
              <div className="mt-auto pt-6">
                {isLoggedIn ? (
                  <div className="flex items-center gap-x-4">
                    <Avatar className="cursor-pointer">
                      <Link
                        href={`/profile/${firstName.toLowerCase()}-${lastName.toLowerCase()}`}
                        className="block text-sm font-medium"
                      >
                        <AvatarImage
                          src="https://images.pexels"
                          alt={`${firstName}${lastName}`}
                        />
                      </Link>
                      <AvatarFallback className="bg-card text-foreground">
                        <Link
                          href={`/profile/${firstName.toLowerCase()}-${lastName.toLowerCase()}`}
                          className="block text-sm font-medium"
                        >
                          {firstName?.split('', 1)}
                          {lastName?.split('', 1)}
                        </Link>
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <Link
                        href={`/profile/${firstName.toLowerCase()}-${lastName.toLowerCase()}`}
                        className="block text-sm font-medium"
                      >
                        {firstName} {lastName}
                      </Link>
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
