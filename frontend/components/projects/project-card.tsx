'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { ArrowUpRight, Users, DollarSign } from 'lucide-react'

import { ProjectProps } from '@/types/project'

interface User {
  id: number
  first_name: string
  last_name: string
}

export default function ProjectCard({ project }: { project: ProjectProps }) {
  const [owner, setOwner] = useState<User>({
    id: 0,
    first_name: '',
    last_name: '',
  })

  useEffect(() => {
    const getProjectOwner = async () => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/users/${project.owner}`
      )
      if (!response.ok) {
        throw new Error('Failed to fetch project owner')
      }

      const user = await response.json()

      setOwner(user)
    }
    getProjectOwner()
  }, [project.owner])

  return (
    <div>
      <Card className="group overflow-hidden border-border hover:border-primary/30 transition-all duration-200">
        <CardHeader className="p-4 flex justify-between space-y-0 bg-muted/30">
          <div className="space-y-2">
            <div className="flex space-x-2">
              <Badge
                variant={
                  project.project_type === 'exchange' ? 'default' : 'secondary'
                }
              >
                {project.project_type === 'exchange'
                  ? 'Skill Exchange'
                  : 'Paid Project'}
              </Badge>
            </div>
            <Link href={`/projects/${project.id}`}>
              <h3 className="font-orbitron text-lg font-medium group-hover:text-primary transition-colors line-clamp-1">
                {project.title}
              </h3>
            </Link>
          </div>
        </CardHeader>
        <CardContent className="p-4">
          <p className="text-muted-foreground line-clamp-3 mb-4 h-[4.5rem]">
            {project.offer_description}
          </p>
          <div className="flex flex-wrap gap-2 mb-4">
            {project.skills.map((skill, index) => (
              <Badge key={index} variant="outline" className="bg-background/50">
                {skill}
              </Badge>
            ))}
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="relative w-8 h-8 rounded-full overflow-hidden">
                <span className="absolute inset-0 flex items-center justify-center bg-background text-white text-sm border border-border rounded-full">
                  {owner?.first_name.charAt(0)}
                  {owner?.last_name.charAt(0)}
                </span>
              </div>
              <Link
                href={`/profile/${owner?.id}`}
                className="text-sm font-medium hover:underline"
              >
                {owner?.first_name} {owner?.last_name}
              </Link>
            </div>
            <div className="flex items-center text-sm text-muted-foreground">
              {project.project_type === 'traditional' ? (
                <span className="flex items-center">
                  <DollarSign className="h-4 w-4 mr-1" /> {project.offer_value}
                </span>
              ) : (
                <span className="flex items-center">
                  <Users className="h-4 w-4 mr-1" /> Skill Trade
                </span>
              )}
            </div>
          </div>
        </CardContent>
        <CardFooter className="p-4 pt-0">
          <Button
            variant="ghost"
            className="w-full justify-between group-hover:text-primary group-hover:bg-primary/5"
            asChild
          >
            <Link href={`/projects/${project.id}`}>
              <span>View Details</span>
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
