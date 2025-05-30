import Link from 'next/link'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { MapPin, Calendar, Globe } from 'lucide-react'

import { formatDate } from '@/lib/utils'

import { Navbar } from '@/components/layout/navbar'
import { SocialIcon } from '@/components/ui/social-icon'
import ProfileCompletion from '@/components/profile/profile-completion'
import ProjectsSection from '@/components/profile/projects-section'
import ProfileHeader from '@/components/profile/header'
import BadgesSection from '@/components/profile/badges-section'

import { notFound } from 'next/navigation'

async function getUserData(id: number) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/${id}/`, {
    next: { revalidate: 60 },
  })

  if (res.status === 404) {
    notFound()
  } else if (!res.ok) {
    throw new Error('Failed to fetch user data')
  }

  const user = await res.json()

  // Handle the case if API returns empty or invalid user data
  if (!user || Object.keys(user).length === 0) {
    notFound()
  }

  return user
}

export default async function ProfilePage({
  params,
}: {
  params: { id: number }
}) {
  const { id } = params

  const user = await getUserData(id)

  return (
    <div className="min-h-screen pt-16">
      <Navbar />
      <ProfileCompletion />

      {/* Cover Image */}
      <div className="relative h-64 md:h-80">
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent"></div>
      </div>

      <div className="container mx-auto max-w-7xl mb-8 px-4 md:px-6">
        {/* Profile Header */}
        <ProfileHeader user={user} />

        {/* Main Content */}
        <div className="mt-8">
          <Tabs defaultValue="overview" className="space-y-8">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="projects">Projects</TabsTrigger>
              <TabsTrigger value="badges">Badges</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-8">
              {/* Bio Section */}
              <Card>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-semibold mb-2">About</h3>
                      <p className="text-muted-foreground">{user.overview}</p>
                    </div>
                    <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center">
                        <MapPin className="h-4 w-4 mr-2" />
                        <span className="capitalize mr-1">{user.city},</span>
                        <span className="capitalize">{user.country}</span>
                      </div>
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-2" />
                        Joined {formatDate(user.date_joined)}
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-3">
                      {user.social_links.length > 0 &&
                        user.social_links.map(
                          (link: { name: string; url: string }) => (
                            <Link
                              key={link.name}
                              href={link.url}
                              target="_blank"
                              title={link.name}
                              className="text-muted-foreground hover:text-accent transition-colors"
                            >
                              <SocialIcon url={link.url} name={link.name} />
                            </Link>
                          )
                        )}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Skills Section */}
              {user.skills && user.skills.length > 0 && (
                <Card>
                  <CardHeader>
                    <h3 className="font-semibold">Skills</h3>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-4">
                      {user?.skills?.map((skill: string, index: number) => (
                        <Badge
                          key={index}
                          variant="secondary"
                          className="px-4 py-2"
                        >
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Employment Section */}
              <Card>
                <CardHeader>
                  <h3 className="font-semibold">Employment</h3>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-start gap-4">
                      <div className="flex-1">
                        <h4 className="font-semibold text-accent">
                          {user.company_name}
                        </h4>
                        <span className="text-sm text-muted-foreground">
                          {user.title}
                        </span>
                      </div>
                      {user.company_website && (
                        <Link href={user.company_website}>
                          <Globe />
                        </Link>
                      )}
                    </div>
                    <div className="flex items-start gap-4" />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="projects">
              <ProjectsSection user={user} />
            </TabsContent>

            <TabsContent value="badges">
              <BadgesSection user={user} />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
