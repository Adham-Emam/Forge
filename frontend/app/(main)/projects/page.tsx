import Link from 'next/link'
import { Suspense } from 'react'

import { Button } from '@/components/ui/button'
import ProjectsSection from '@/components/projects/projects-section'
import ProfileCompletion from '@/components/profile/profile-completion'
import Loader from '@/components/layout/loader'

import { Users, Plus } from 'lucide-react'

export default function ProjectsPage() {
  return (
    <>
      <ProfileCompletion />
      <div className="min-h-screen pt-16">
        {/* Hero Section */}
        <section className="bg-muted/30 py-12 md:py-20">
          <div className="container mx-auto max-w-7xl px-4 md:px-6">
            <div className="flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="space-y-4 text-center md:text-left">
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight">
                  Find Your Next <span className="molten-text">Project</span>
                </h1>
                <p className="text-muted-foreground max-w-lg text-lg">
                  Browse opportunities, connect with creative professionals, and
                  bring your projects to life.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" asChild>
                  <Link href="/projects/create">
                    <Plus className="h-5 w-5 mr-2" />
                    Post a Project
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link href="/projects/browse-skills">
                    <Users className="h-5 w-5 mr-2" />
                    Browse Skills
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-12">
          <div className="container mx-auto max-w-7xl px-4 md:px-6">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              <Suspense fallback={<Loader />}>
                <ProjectsSection />
              </Suspense>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}
