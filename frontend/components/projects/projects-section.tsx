'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'

import {
  Select,
  SelectLabel,
  SelectContent,
  SelectItem,
  SelectGroup,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { RadioGroup, RadioGroupItem } from '../ui/radio-group'
import { Input } from '@/components/ui/input'
import { Slider } from '@/components/ui/slider'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'
import ProjectCard from '@/components/projects/project-card'
import ProjectCardSkeleton from '@/components/projects/project-card-skeleton'
import categories from '@/constants/project-categories'

import { ProjectProps } from '@/types/project'

import { Users, Hammer, Search, DollarSign, Plus } from 'lucide-react'
import { set } from 'date-fns'

export default function ProjectsSection() {
  // Projects
  const [projects, setProjects] = useState<ProjectProps[]>([])
  const [isLoading, setIsLoading] = useState(true)

  // Pagination
  const [projectsPages, setProjectsPages] = useState<number>(0)
  const [projectsPerPage, setProjectsPerPage] = useState<number>(10)
  const [currentPage, setCurrentPage] = useState<number>(1)

  // router
  const router = useRouter()
  const searchParams = useSearchParams()

  // Filters
  const [searchQuery, setSearchQuery] = useState('')
  const [projectType, setProjectType] = useState<string[]>([])
  const [budgetRange, setBudgetRange] = useState<number[]>([0, 5000])
  const [category, setCategory] = useState<string>('all')
  const [ordering, setOrdering] = useState<string>('')

  useEffect(() => {
    const search = searchParams.get('search') || ''
    const types = searchParams.getAll('project_type')
    const minBudget = parseInt(searchParams.get('min_budget') || '0')
    const maxBudget = parseInt(searchParams.get('max_budget') || '5000')
    const cat = searchParams.get('category') || 'all'
    const order = searchParams.get('ordering') || ''
    const page =
      parseInt(searchParams.get('page') || '1') > projectsPages
        ? 1
        : parseInt(searchParams.get('page') || '1')

    const pageSize = parseInt(searchParams.get('page_size') || '10')

    setSearchQuery(search)
    setProjectType(types)
    setBudgetRange([minBudget, maxBudget])
    setCategory(cat)
    setOrdering(order)
    setCurrentPage(page)
    setProjectsPerPage(pageSize)
  }, [searchParams, projectsPages])

  function updateQueryParams(params: {
    search?: string
    project_type?: string[]
    min_budget?: number
    max_budget?: number
    category?: string
    ordering?: string
    page?: number
    page_size?: number
  }) {
    const current = new URLSearchParams(window.location.search)

    // 🔍 Detect if any non-page filter is being changed
    const filterKeys = [
      'search',
      'project_type',
      'min_budget',
      'max_budget',
      'category',
      'ordering',
    ]
    const isFilterUpdate = Object.keys(params).some((key) =>
      filterKeys.includes(key)
    )

    // 🧹 Remove page if filter changes
    if (isFilterUpdate) {
      current.delete('page')
    }

    // === SAME MERGING LOGIC ===
    if (params.search !== undefined) {
      if (params.search.trim() === '') current.delete('search')
      else current.set('search', params.search.trim())
    }

    if (params.project_type !== undefined) {
      current.delete('project_type')
      if (params.project_type.length > 0) {
        for (const type of params.project_type) {
          current.append('project_type', type)
        }
      }
    }

    if (params.min_budget !== undefined) {
      if (params.min_budget === 0) current.delete('min_budget')
      else current.set('min_budget', String(params.min_budget))
    }

    if (params.max_budget !== undefined) {
      if (params.max_budget === 0) current.delete('max_budget')
      else current.set('max_budget', String(params.max_budget))
    }

    if (params.category !== undefined) {
      if (!params.category) current.delete('category')
      else current.set('category', params.category)
    }

    if (params.ordering !== undefined) {
      if (!params.ordering) current.delete('ordering')
      else current.set('ordering', params.ordering)
    }

    if (params.page !== undefined) {
      if (params.page === 1) current.delete('page')
      else current.set('page', String(params.page))
    }

    if (params.page_size !== undefined) {
      if (params.page_size === 10) current.delete('page_size')
      else current.set('page_size', String(params.page_size))
    }

    router.push(`?${current.toString()}`)
  }

  useEffect(() => {
    async function fetchProjects() {
      try {
        let query = new URLSearchParams({
          page: currentPage.toString(),
          page_size: projectsPerPage.toString(),
        })

        if (searchQuery) query.append('search', searchQuery)
        if (projectType.length > 0) {
          projectType.forEach((type) => query.append('project_type', type))
        }
        if (budgetRange[0] > 0)
          query.append('min_budget', budgetRange[0].toString())
        if (budgetRange[1] < 5000)
          query.append('max_budget', budgetRange[1].toString())
        if (category) query.append('category', category)
        if (ordering) query.append('ordering', ordering)

        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/projects/?${query.toString()}`
        )
        const data = await response.json()
        setProjects(data.results)

        const totalPages = Math.ceil(data.count / projectsPerPage)
        setProjectsPages(totalPages)
      } catch (err) {
        throw new Error('Error fetching projects:' + ' ' + err)
      } finally {
        setIsLoading(false)
      }
    }

    fetchProjects()
  }, [
    currentPage,
    projectsPerPage,
    searchQuery,
    projectType,
    budgetRange,
    category,
    ordering,
  ])

  const getPaginationRange = () => {
    const total = projectsPages
    const current = currentPage
    const delta = 2 // Show 2 before and 2 after
    const range = []

    const start = Math.max(1, current - delta)
    const end = Math.min(total, current + delta)

    for (let i = start; i <= end; i++) {
      range.push(i)
    }

    // Ensure we always show 5 items if possible
    while (range.length < 5 && range[0] > 1) {
      range.unshift(range[0] - 1)
    }
    while (range.length < 5 && range[range.length - 1] < total) {
      range.push(range[range.length - 1] + 1)
    }

    return range
  }

  return (
    <>
      <div className="lg:col-span-1">
        <div className="sticky top-24 bg-card rounded-lg border p-4 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Filters</h2>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => {
                setSearchQuery('')
                setProjectType([])
                setBudgetRange([0, 5000])
                setCategory('all')
                setOrdering('')
                router.push('?')
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
              onValueChange={(types) => {
                setProjectType(types)
                updateQueryParams({
                  project_type: types,
                })
              }}
            >
              <ToggleGroupItem
                value="traditional"
                className="flex gap-1 items-center border bg-background"
              >
                <DollarSign className="h-3 w-3" />
                Paid
              </ToggleGroupItem>
              <ToggleGroupItem
                value="exchange"
                className="flex gap-1 items-center border bg-background"
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
                min={0}
                max={5000}
                step={100}
                value={budgetRange}
                onValueChange={(range) => {
                  setBudgetRange(range)
                  updateQueryParams({
                    min_budget: range[0],
                    max_budget: range[1],
                  })
                }}
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
            <h3 className="font-medium mb-3">Category</h3>
            <RadioGroup
              value={category}
              onValueChange={(cat) => {
                setCategory(cat)
                updateQueryParams({
                  category: cat,
                })
              }}
              className="flex flex-col gap-3"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="all" id="all" />
                <label htmlFor="all" className="text-sm cursor-pointer">
                  All
                </label>
              </div>
              {categories.map((cat) => (
                <div key={cat} className="flex items-center space-x-2">
                  <RadioGroupItem value={cat.toLowerCase()} id={cat} />
                  <label
                    htmlFor={cat}
                    className="text-sm capitalize cursor-pointer"
                  >
                    {cat}
                  </label>
                </div>
              ))}
            </RadioGroup>
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
                onChange={(e) => {
                  setSearchQuery(e.target.value)
                  updateQueryParams({
                    search: e.target.value,
                  })
                }}
              />
            </div>
            <div className="flex items-center gap-4">
              <Select
                value={ordering}
                onValueChange={(value) => {
                  setOrdering(value)
                  updateQueryParams({
                    ordering: value,
                  })
                }}
                defaultValue="newest"
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Newest</SelectItem>
                  <SelectItem value="high_to_low">
                    Budget: High to Low
                  </SelectItem>
                  <SelectItem value="low_to_high">
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
              {projects.length || 0}
            </span>{' '}
            projects
            {searchQuery ||
              projectType.length > 0 ||
              budgetRange[0] > 0 ||
              budgetRange[1] < 5000 ||
              (category !== 'all' && ' matching your filters')}
          </p>
        </div>
        {/* Projects Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[...Array(4)].map((_, i) => (
              <ProjectCardSkeleton key={i} />
            ))}
          </div>
        ) : !projects.length ? (
          <div className="text-center py-16 bg-card rounded-lg border">
            <Hammer className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-bold mb-2">No projects found</h3>
            <p className="text-muted-foreground max-w-md mx-auto mb-6">
              We couldn&apos;t find any projects matching your current filters.
              Try adjusting your search criteria or post your own project.
            </p>
            <Button type="button" asChild>
              <Link href="/projects/create">
                <Plus className="h-4 w-4 mr-2" />
                Post a Project
              </Link>
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {projects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        )}
        {/* Pagination */}
        <div className="mt-12 flex justify-center md:justify-between items-center flex-wrap gap-8 md:gap-4">
          <SelectGroup className="flex gap-4 w-full md:w-[400px]">
            <Select
              value={projectsPerPage.toString()}
              onValueChange={(val) => {
                setProjectsPerPage(parseInt(val))
                updateQueryParams({
                  page_size: parseInt(val),
                })
              }}
            >
              <SelectLabel>Projects per page</SelectLabel>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Projects per page" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="10">10</SelectItem>
                <SelectItem value="20">20</SelectItem>
                <SelectItem value="30">30</SelectItem>
                <SelectItem value="50">50</SelectItem>
              </SelectContent>
            </Select>
          </SelectGroup>

          {projectsPages > 1 && (
            <div className="flex justify-center">
              <div className="flex space-x-2">
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  onClick={() => {
                    setCurrentPage((prev) => Math.max(1, prev - 1))
                    updateQueryParams({
                      page: Math.max(1, currentPage - 1),
                    })
                  }}
                  disabled={currentPage === 1}
                >
                  <svg
                    className="h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <polyline points="15 18 9 12 15 6" />
                  </svg>
                </Button>

                {getPaginationRange().map((page) => (
                  <Button
                    type="button"
                    key={page}
                    variant={page === currentPage ? 'default' : 'outline'}
                    size="icon"
                    onClick={() => {
                      setCurrentPage(Math.min(projectsPages, page))
                      updateQueryParams({
                        page: Math.min(projectsPages, page),
                      })
                    }}
                    disabled={page === currentPage}
                  >
                    {page}
                  </Button>
                ))}

                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  onClick={() => {
                    setCurrentPage((prev) => Math.min(projectsPages, prev + 1))
                    updateQueryParams({
                      page: Math.min(projectsPages, currentPage + 1),
                    })
                  }}
                  disabled={currentPage === projectsPages}
                >
                  <svg
                    className="h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <polyline points="9 18 15 12 9 6" />
                  </svg>
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
