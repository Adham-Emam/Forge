'use client'
import { useState, useEffect } from 'react'
import { UserProps } from '@/types/user'
import { checkAuth } from '@/lib/auth'

const ProfileCompletion = () => {
  const [isAuth, setIsAuth] = useState(false)

  useEffect(() => {
    async function checkLoginStatus() {
      const isAuthenticated: boolean = await checkAuth()
      setIsAuth(isAuthenticated)
    }
    checkLoginStatus()
  }, [])

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/users/current`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${localStorage.getItem(
                'forge-auth-token'
              )}`,
            },
          }
        )
        const data = await response.json()
        setUserData(data)
      } catch (error) {
        throw new Error('Error fetching user data:' + error)
      }
    }

    if (isAuth) {
      fetchUserData()
    } else {
      return
    }
  }, [isAuth])

  const [userData, setUserData] = useState<UserProps | null>(null)
  const [completion, setCompletion] = useState<number>(100)

  useEffect(() => {
    const weights: Record<keyof UserProps, number> = {
      id: 0,
      credit_amount: 0,
      posted_projects: 0,
      assigned_projects: 0,
      first_name: 5,
      last_name: 5,
      email: 10,
      level: 5,
      country_code: 5,
      phone_number: 5,
      country: 5,
      city: 5,
      title: 10,
      overview: 10,
      skills: 10,
      hourly_rate: 10,
      availability: 5,
      social_links: 10,
      company_name: 5,
      company_website: 5,
      badges: 0,
    }

    if (!userData) {
      return
    }

    for (const key in weights) {
      const value = userData[key as keyof UserProps]

      if (value === null || value === undefined) {
        setCompletion((prev) =>
          Math.max(0, prev - weights[key as keyof UserProps])
        )
      } else if (typeof value === 'number' && value === 0) {
        setCompletion((prev) =>
          Math.max(0, prev - weights[key as keyof UserProps])
        )
      } else if (typeof value === 'string' && value.trim().length === 0) {
        setCompletion((prev) =>
          Math.max(0, prev - weights[key as keyof UserProps])
        )
      } else if (Array.isArray(value) && value.length === 0) {
        setCompletion((prev) =>
          Math.max(0, prev - weights[key as keyof UserProps])
        )
      } else if (typeof value === 'object' && Object.keys(value).length === 0) {
        setCompletion((prev) =>
          Math.max(0, prev - weights[key as keyof UserProps])
        )
      }
    }
  }, [userData])

  //   Get Random Message on Mount
  const progressMessages = [
    `🔥Boost Your Forge Power: ${completion}% complete – keep going!`,
    `⚡ Your profile is ${completion}% complete – unlock more trades!`,
    `🔗 You’re at ${completion}% – complete your profile and forge ahead!`,
    `🚀 Almost there! Your profile is ${completion}% complete. Let’s forge your skills!`,
    `🎯 Reach 100%! Your profile is ${completion}% ready to unlock all features.`,
    `💪 Power up! Your Forge profile is ${completion}% complete.`,
    `🌟 Complete your profile to unlock new opportunities – you’re at ${completion}%!`,
  ]
  const index = Math.floor(Math.random() * progressMessages.length)
  const message = progressMessages[index]

  return (
    0 < completion &&
    completion < 100 && (
      <div className="fixed w-full top-[64px] left-0 bg-accent/20 px-4 py-1 overflow-hidden backdrop-blur-md z-20">
        <div
          style={{
            width: `${completion}%`,
            background:
              'linear-gradient(270deg, #ff6f00, #ff0000, #ff6f00, #ff0000)',
            backgroundSize: '400% 400%',
            opacity: 0.6,
          }}
          className="absolute top-0 left-0 bg-accent/70 h-full rounded-r-full backdrop-blur-md z-10 animate-lavaFlow"
        />
        <div className="container mx-auto max-w-7xl">
          <p className="relative font-bold text-lg text-muted dark:text-white z-30">
            {message}
          </p>
        </div>
      </div>
    )
  )
}

export default ProfileCompletion
