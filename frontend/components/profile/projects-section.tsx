'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Plus } from 'lucide-react'

import { Button } from '@/components/ui/button'
import ProjectCard from '@/components/projects/project-card'
import { isCurrentUser } from '@/lib/auth'

import { ProjectProps } from '@/types/project'
import { UserProps } from '@/types/user'

export default function ProjectsSection({ user }: { user: UserProps }) {
  const [isOwner, setIsOwner] = useState<boolean>(false)

  useEffect(() => {
    const checkProfileOwnership = async () => {
      const isOwner = await isCurrentUser(user.id)
      setIsOwner(isOwner)
    }
    checkProfileOwnership()
  }, [user.id])

  return (
    <>
      {/* Posted Projects Section */}

      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">Posted Projects</h3>
        {isOwner && (
          <Link href="/projects/create">
            <Button
              variant="outline"
              className="glow inline-flex items-center gap-2"
            >
              <Plus className="h-4 w-4" />
              Create New Project
            </Button>
          </Link>
        )}
      </div>
      {user.posted_projects.length > 0 ? (
        <div className="relative grid grid-cols-1 md:grid-cols-2 gap-6">
          {user.posted_projects.map((project: ProjectProps) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      ) : (
        <div className="text-center py-8">
          <p className="text-muted-foreground">
            {isOwner
              ? "You haven't posted any projects yet."
              : "This user hasn't posted any projects yet."}
          </p>
        </div>
      )}

      {/* Assigned Projects Section */}

      <div className="flex items-center justify-between mb-4 mt-8">
        <h3 className="text-lg font-semibold">Assigned Projects</h3>
      </div>
      {user.assigned_projects.length > 0 ? (
        <div className="relative grid grid-cols-1 md:grid-cols-2 gap-6">
          {user.assigned_projects.map((project: ProjectProps) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      ) : (
        <div className="text-center py-8">
          <p className="text-muted-foreground">
            {isOwner
              ? "You haven't been assigned any projects yet."
              : "This user hasn't been assigned any projects yet."}
          </p>
        </div>
      )}
    </>
  )
}
