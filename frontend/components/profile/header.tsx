'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { Avatar } from '../ui/avatar'
import { Button } from '../ui/button'
import {
  Edit,
  Timer,
  Briefcase,
  Award,
  CircleDollarSign,
  DollarSign,
  MessageSquare,
} from 'lucide-react'
import { Card, CardContent } from '../ui/card'
import Loader from '@/components/layout/loader'

import { isCurrentUser } from '@/lib/auth'
import { UserProps } from '@/types/user'

export default function ProfileHeader({ user }: { user: UserProps }) {
  const [isOwner, setIsOwner] = useState<boolean>(false)
  const [IsMounted, setIsMounted] = useState(false)

  useEffect(() => {
    const checkProfileOwnership = async () => {
      const isOwner = await isCurrentUser(user.id)
      setIsOwner(isOwner)
    }
    checkProfileOwnership()
  }, [user.id])

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!IsMounted) {
    return <Loader className="fixed top-0 left-0 w-screen h-screen" />
  }

  return (
    <header className="relative -mt-20">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between">
        <div className="flex items-end">
          <Avatar className="flex items-center justify-center text-3xl font-orbitron w-32 h-32 border-4 bg-card border-background">
            <span>
              {user.first_name.charAt(0)}
              {user.last_name.charAt(0)}
            </span>
          </Avatar>
          <div className="ml-4 mb-4">
            <h1 className="text-2xl md:text-3xl font-bold font-orbitron">
              <span className="capitalize">{user.first_name}</span>{' '}
              <span className="capitalize">{user.last_name}</span>
            </h1>
            <p className="text-muted-foreground">{user.title}</p>
          </div>
        </div>
        <div className="mt-4 md:mt-0 flex gap-4">
          {isOwner ? (
            <Link href={`/profile/${user.id}/edit`}>
              <Button variant="outline">
                <Edit className="mr-2 h-4 w-4" />
                Edit Profile
              </Button>
            </Link>
          ) : (
            <Button className="glow">
              <MessageSquare className="mr-2 h-4 w-4" />
              Message
            </Button>
          )}
        </div>
      </div>

      {/* Balance */}
      {isOwner && (
        <div className="mt-8">
          <Card>
            <CardContent className="p-4 flex items-center">
              <DollarSign className="h-5 w-5 text-accent mr-2" />
              <div>
                <p className="text-sm text-muted-foreground">Balance</p>
                <p className="text-xl font-bold">{user.credit_amount}</p>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
        <Card>
          <CardContent className="p-4 flex items-center">
            <Timer className="h-5 w-5 text-accent mr-2" />
            <div>
              <p className="text-sm text-muted-foreground">Availability</p>
              <p className="text-xl font-bold capitalize">
                {user.availability.split('_').join(' ')}
              </p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="relative p-4 flex items-center">
            <Briefcase className="h-5 w-5 text-accent mr-2" />
            <div>
              <p className="text-sm text-muted-foreground">Projects</p>
              <p className="text-xl font-bold">
                {user.posted_projects.length + user.assigned_projects.length}
              </p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center">
            <Award className="h-5 w-5 text-accent mr-2" />
            <div>
              <p className="text-sm text-muted-foreground">Level</p>
              <p className="text-xl font-bold capitalize">{user.level}</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center">
            <CircleDollarSign className="h-5 w-5 text-accent mr-2" />
            <div>
              <p className="text-sm text-muted-foreground">Hourly Rate</p>
              <p className="text-xl font-bold">{user.hourly_rate}</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </header>
  )
}
