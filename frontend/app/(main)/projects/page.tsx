'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Slider } from '@/components/ui/slider'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'
import { Separator } from '@/components/ui/separator'
import {
  Hammer,
  Search,
  Filter,
  Users,
  DollarSign,
  ArrowUpRight,
  Plus,
} from 'lucide-react'
import ProjectCard from '@/components/projects/project-card'

// Sample projects data
const allProjects = [
  {
    id: '1',
    title: 'Mobile App for Sustainable Fashion',
    description:
      'Looking for a React Native developer to build an app that helps users track sustainable fashion choices.',
    skills: ['React Native', 'UI/UX', 'Node.js'],
    budget: '$2000-$3000',
    type: 'exchange',
    owner: {
      name: 'Lisa Chen',
      avatar:
        'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    },
  },
  {
    id: '2',
    title: '3D Game Environment Design',
    description:
      'Need a skilled 3D environment artist to create immersive game levels for an indie RPG.',
    skills: ['Blender', 'Unity', '3D Modeling'],
    budget: '$1500-$2500',
    type: 'traditional',
    owner: {
      name: 'Mark Wilson',
      avatar:
        'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    },
  },
  {
    id: '3',
    title: 'Logo Design for Tech Startup',
    description:
      'Looking for a creative designer to create a modern, memorable logo for our AI startup.',
    skills: ['Logo Design', 'Branding', 'Adobe Illustrator'],
    budget: '$300-$800',
    type: 'exchange',
    owner: {
      name: 'Sophia Martinez',
      avatar:
        'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    },
  },
  {
    id: '4',
    title: 'E-commerce Website Development',
    description:
      'Need a full-stack developer to build a responsive e-commerce website with payment processing and inventory management.',
    skills: ['React', 'Node.js', 'MongoDB', 'Stripe'],
    budget: '$3000-$5000',
    type: 'traditional',
    owner: {
      name: 'James Thompson',
      avatar:
        'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    },
  },
  {
    id: '5',
    title: 'Podcast Editing and Production',
    description:
      'Looking for an audio engineer to edit and produce a weekly podcast about technology and society.',
    skills: ['Audio Editing', 'Podcast Production', 'Sound Design'],
    budget: '$50-$100 per episode',
    type: 'traditional',
    owner: {
      name: 'Emma Nelson',
      avatar:
        'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    },
  },
  {
    id: '6',
    title: 'Social Media Content Creation',
    description:
      'Need a content creator to design engaging social media posts for a fitness brand.',
    skills: ['Graphic Design', 'Social Media', 'Content Strategy'],
    budget: '$500-$1000 per month',
    type: 'traditional',
    owner: {
      name: 'Alex Kim',
      avatar:
        'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    },
  },
  {
    id: '7',
    title: 'Video Production for Online Course',
    description:
      'Seeking a videographer to shoot and edit high-quality videos for an online programming course.',
    skills: ['Video Production', 'Video Editing', 'Lighting'],
    budget: '$2000-$4000',
    type: 'exchange',
    owner: {
      name: 'Rebecca Williams',
      avatar:
        'https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    },
  },
  {
    id: '8',
    title: "Custom Illustration for Children's Book",
    description:
      "Looking for an illustrator to create whimsical illustrations for a children's book about space exploration.",
    skills: ['Illustration', 'Character Design', 'Digital Art'],
    budget: '$1000-$2000',
    type: 'traditional',
    owner: {
      name: 'Daniel Lee',
      avatar:
        'https://images.pexels.com/photos/1933873/pexels-photo-1933873.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    },
  },
]

// Skills for filtering
const allSkills = [
  'React Native',
  'UI/UX',
  'Node.js',
  'Blender',
  'Unity',
  '3D Modeling',
  'Logo Design',
  'Branding',
  'Adobe Illustrator',
  'React',
  'MongoDB',
  'Stripe',
  'Audio Editing',
  'Podcast Production',
  'Sound Design',
  'Graphic Design',
  'Social Media',
  'Content Strategy',
  'Video Production',
  'Video Editing',
  'Lighting',
  'Illustration',
  'Character Design',
  'Digital Art',
]

export default function ProjectsPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [projectType, setProjectType] = useState<string[]>([])
  const [selectedSkills, setSelectedSkills] = useState<string[]>([])
  const [budgetRange, setBudgetRange] = useState<number[]>([0, 5000])

  // Filter projects based on search query, type, skills, and budget
  const filteredProjects = allProjects.filter((project) => {
    // Search filter
    const matchesSearch =
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase())

    // Type filter
    const matchesType =
      projectType.length === 0 || projectType.includes(project.type)

    // Skills filter
    const matchesSkills =
      selectedSkills.length === 0 ||
      selectedSkills.some((skill) => project.skills.includes(skill))

    // Budget filter (simple parsing for demo purposes)
    const projectMinBudget = parseInt(
      project.budget.match(/\$(\d+)/)?.[1] || '0'
    )
    const matchesBudget =
      projectMinBudget >= budgetRange[0] &&
      (projectMinBudget <= budgetRange[1] || budgetRange[1] === 5000)

    return matchesSearch && matchesType && matchesSkills && matchesBudget
  })

  return (
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
            {/* Filters Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 bg-card rounded-lg border p-4 space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold">Filters</h2>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      setSearchQuery('')
                      setProjectType([])
                      setSelectedSkills([])
                      setBudgetRange([0, 5000])
                    }}
                  >
                    Reset
                  </Button>
                </div>

                <Separator />

                <div>
                  <h3 className="font-medium mb-3">Project Type</h3>
                  <ToggleGroup
                    type="multiple"
                    className="justify-start flex-wrap"
                    value={projectType}
                    onValueChange={setProjectType}
                  >
                    <ToggleGroupItem
                      value="traditional"
                      className="flex gap-1 items-center"
                    >
                      <DollarSign className="h-3 w-3" />
                      <span>Paid</span>
                    </ToggleGroupItem>
                    <ToggleGroupItem
                      value="exchange"
                      className="flex gap-1 items-center"
                    >
                      <Users className="h-3 w-3" />
                      <span>Exchange</span>
                    </ToggleGroupItem>
                  </ToggleGroup>
                </div>

                <Separator />

                <div>
                  <h3 className="font-medium mb-3">Budget Range</h3>
                  <div className="px-2">
                    <Slider
                      defaultValue={[0, 5000]}
                      max={5000}
                      step={100}
                      value={budgetRange}
                      onValueChange={setBudgetRange}
                      className="mb-6"
                    />
                    <div className="flex items-center justify-between text-sm">
                      <span>${budgetRange[0]}</span>
                      <span>
                        ${budgetRange[1] === 5000 ? '5000+' : budgetRange[1]}
                      </span>
                    </div>
                  </div>
                </div>

                <Separator />

                <div>
                  <h3 className="font-medium mb-3">Skills</h3>
                  <Accordion type="multiple" className="w-full">
                    <AccordionItem value="design">
                      <AccordionTrigger className="text-sm py-2">
                        Design
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="flex flex-wrap gap-2">
                          {[
                            'UI/UX',
                            'Logo Design',
                            'Branding',
                            'Illustration',
                            'Character Design',
                            'Digital Art',
                          ].map((skill) => (
                            <Badge
                              key={skill}
                              variant={
                                selectedSkills.includes(skill)
                                  ? 'default'
                                  : 'outline'
                              }
                              className="cursor-pointer"
                              onClick={() => {
                                setSelectedSkills((prev) =>
                                  prev.includes(skill)
                                    ? prev.filter((s) => s !== skill)
                                    : [...prev, skill]
                                )
                              }}
                            >
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="development">
                      <AccordionTrigger className="text-sm py-2">
                        Development
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="flex flex-wrap gap-2">
                          {[
                            'React Native',
                            'Node.js',
                            'React',
                            'MongoDB',
                            'Stripe',
                          ].map((skill) => (
                            <Badge
                              key={skill}
                              variant={
                                selectedSkills.includes(skill)
                                  ? 'default'
                                  : 'outline'
                              }
                              className="cursor-pointer"
                              onClick={() => {
                                setSelectedSkills((prev) =>
                                  prev.includes(skill)
                                    ? prev.filter((s) => s !== skill)
                                    : [...prev, skill]
                                )
                              }}
                            >
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="3d">
                      <AccordionTrigger className="text-sm py-2">
                        3D & Animation
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="flex flex-wrap gap-2">
                          {['Blender', 'Unity', '3D Modeling'].map((skill) => (
                            <Badge
                              key={skill}
                              variant={
                                selectedSkills.includes(skill)
                                  ? 'default'
                                  : 'outline'
                              }
                              className="cursor-pointer"
                              onClick={() => {
                                setSelectedSkills((prev) =>
                                  prev.includes(skill)
                                    ? prev.filter((s) => s !== skill)
                                    : [...prev, skill]
                                )
                              }}
                            >
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="media">
                      <AccordionTrigger className="text-sm py-2">
                        Media Production
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="flex flex-wrap gap-2">
                          {[
                            'Audio Editing',
                            'Podcast Production',
                            'Sound Design',
                            'Video Production',
                            'Video Editing',
                            'Lighting',
                          ].map((skill) => (
                            <Badge
                              key={skill}
                              variant={
                                selectedSkills.includes(skill)
                                  ? 'default'
                                  : 'outline'
                              }
                              className="cursor-pointer"
                              onClick={() => {
                                setSelectedSkills((prev) =>
                                  prev.includes(skill)
                                    ? prev.filter((s) => s !== skill)
                                    : [...prev, skill]
                                )
                              }}
                            >
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="marketing">
                      <AccordionTrigger className="text-sm py-2">
                        Marketing
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="flex flex-wrap gap-2">
                          {[
                            'Graphic Design',
                            'Social Media',
                            'Content Strategy',
                          ].map((skill) => (
                            <Badge
                              key={skill}
                              variant={
                                selectedSkills.includes(skill)
                                  ? 'default'
                                  : 'outline'
                              }
                              className="cursor-pointer"
                              onClick={() => {
                                setSelectedSkills((prev) =>
                                  prev.includes(skill)
                                    ? prev.filter((s) => s !== skill)
                                    : [...prev, skill]
                                )
                              }}
                            >
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </div>
              </div>
            </div>

            {/* Projects List */}
            <div className="lg:col-span-3">
              <div className="mb-6">
                <div className="flex flex-col md:flex-row gap-4 justify-between">
                  <div className="relative w-full md:w-96">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search projects..."
                      className="pl-10"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  <div className="flex items-center gap-4">
                    <Select defaultValue="featured">
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Sort by" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="featured">Featured</SelectItem>
                        <SelectItem value="newest">Newest</SelectItem>
                        <SelectItem value="budget-high">
                          Budget: High to Low
                        </SelectItem>
                        <SelectItem value="budget-low">
                          Budget: Low to High
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              {/* Results count */}
              <div className="mb-6">
                <p className="text-muted-foreground">
                  Showing{' '}
                  <span className="font-medium text-foreground">
                    {filteredProjects.length}
                  </span>{' '}
                  projects
                  {(searchQuery ||
                    projectType.length > 0 ||
                    selectedSkills.length > 0 ||
                    budgetRange[0] > 0 ||
                    budgetRange[1] < 5000) &&
                    ' matching your filters'}
                </p>
              </div>

              {/* Projects Grid */}
              {filteredProjects.length === 0 ? (
                <div className="text-center py-16 bg-card rounded-lg border">
                  <Hammer className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-xl font-bold mb-2">No projects found</h3>
                  <p className="text-muted-foreground max-w-md mx-auto mb-6">
                    We couldn&apos;t find any projects matching your current
                    filters. Try adjusting your search criteria or post your own
                    project.
                  </p>
                  <Button asChild>
                    <Link href="/projects/create">
                      <Plus className="h-4 w-4 mr-2" />
                      Post a Project
                    </Link>
                  </Button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {filteredProjects.map((project) => (
                    <ProjectCard key={project.id} project={project} />
                  ))}
                </div>
              )}

              {/* Pagination */}
              {filteredProjects.length > 0 && (
                <div className="flex justify-center mt-12">
                  <div className="flex space-x-2">
                    <Button variant="outline" size="icon" disabled>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-4 w-4"
                      >
                        <polyline points="15 18 9 12 15 6" />
                      </svg>
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="bg-accent/10"
                    >
                      1
                    </Button>
                    <Button variant="outline" size="sm">
                      2
                    </Button>
                    <Button variant="outline" size="sm">
                      3
                    </Button>
                    <Button variant="outline" size="sm">
                      4
                    </Button>
                    <Button variant="outline" size="sm">
                      5
                    </Button>
                    <Button variant="outline" size="icon">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-4 w-4"
                      >
                        <polyline points="9 18 15 12 9 6" />
                      </svg>
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
