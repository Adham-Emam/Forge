'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import ProtectedRoute from '@/components/layout/protected-route'
import { SkillsInput } from '@/components/profile/skills-input'

import skillSuggestions from '@/constants/skills-suggestions'
import categories from '@/constants/project-categories'

import {
  Hammer,
  DollarSign,
  Users,
  Clock,
  Loader2,
  Save,
  X,
} from 'lucide-react'

const formSchema = z
  .object({
    title: z
      .string()
      .min(3, { message: 'Title must be at least 3 characters' }),
    category: z.string().min(1, { message: 'Please select a category' }),
    project_type: z.enum(['traditional', 'exchange']),
    request_title: z
      .string()
      .min(3, { message: 'Request title must be at least 3 characters' }),
    request_description: z.string().min(10, {
      message: 'Request description must be at least 10 characters',
    }),
    request_value: z
      .number()
      .min(1, { message: 'Value must be a positive number' }),
    skills: z.array(z.string()),
    deadline: z.string().min(1, { message: 'Please select a deadline' }),
    estimated_duration: z.number().optional(),
    offer_title: z.string().optional(),
    offer_description: z.string().optional(),
    offer_value: z
      .number()
      .min(1, { message: 'Value must be a positive number' })
      .optional(),
  })
  .refine(
    (data) => {
      if (data.project_type === 'exchange') {
        return data.offer_title && data.offer_description && data.offer_value
      }
      return true
    },
    {
      message: 'Offer details are required for exchange projects',
      path: ['offer_title'],
    }
  )

export default function CreateProjectPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [showDiscardDialog, setShowDiscardDialog] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      category: '',
      project_type: 'traditional',
      request_title: '',
      request_description: '',
      request_value: 0,
      skills: [],
      deadline: '',
      estimated_duration: undefined,
      offer_title: '',
      offer_description: '',
      offer_value: undefined,
    },
  })

  const projectType = form.watch('project_type')

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true)

    console.log(values)
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/projects/create/`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('forge-auth-token')}`,
          },
          body: JSON.stringify({
            ...values,
          }),
        }
      )

      if (!response.ok) {
        // throw new Error('Failed to create project')
        console.error('Failed to create project:', response)
        return
      }

      router.push('/projects')
    } catch (error) {
      console.error('Error creating project:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <ProtectedRoute>
      <div className="min-h-screen pt-16">
        <div className="container mx-auto max-w-7xl px-4 md:px-6 py-8">
          <div className="max-w-3xl mx-auto">
            <div className="mb-8">
              <h1 className="text-2xl font-bold mb-2">Create New Project</h1>
              <p className="text-muted-foreground">
                Share your project details and find the perfect collaborator
              </p>
            </div>

            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8"
              >
                {/* Basic Information */}
                <Card>
                  <CardHeader className="pb-4">
                    <div className="flex items-center space-x-2">
                      <Hammer className="h-5 w-5 text-accent" />
                      <h2 className="text-lg font-semibold">
                        Basic Information
                      </h2>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <FormField
                      control={form.control}
                      name="title"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Project Title</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Enter project title"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="category"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Category</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select category" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {categories.map((category) => (
                                <SelectItem
                                  key={category}
                                  value={category.toLowerCase()}
                                >
                                  {category}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="project_type"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Project Type</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select project type" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="traditional">
                                <div className="flex items-center">
                                  <DollarSign className="h-4 w-4 mr-2" />
                                  <span>Traditional (Paid)</span>
                                </div>
                              </SelectItem>
                              <SelectItem value="exchange">
                                <div className="flex items-center">
                                  <Users className="h-4 w-4 mr-2" />
                                  <span>Skill Exchange</span>
                                </div>
                              </SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </CardContent>
                </Card>

                {/* Request Details */}
                <Card>
                  <CardHeader className="pb-4">
                    <div className="flex items-center space-x-2">
                      <DollarSign className="h-5 w-5 text-accent" />
                      <h2 className="text-lg font-semibold">Request Details</h2>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <FormField
                      control={form.control}
                      name="request_title"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Request Title</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="What are you looking for?"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="request_description"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Request Description</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Describe what you need..."
                              className="min-h-[100px]"
                              maxLength={1000}
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="request_value"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Request Value (USD)</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              placeholder="0"
                              {...field}
                              onChange={(e) =>
                                field.onChange(Number(e.target.value))
                              }
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </CardContent>
                </Card>

                {/* Exchange Offer (Conditional) */}
                {projectType === 'exchange' && (
                  <Card>
                    <CardHeader className="pb-4">
                      <div className="flex items-center space-x-2">
                        <Users className="h-5 w-5 text-accent" />
                        <h2 className="text-lg font-semibold">
                          Exchange Offer
                        </h2>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <FormField
                        control={form.control}
                        name="offer_title"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Offer Title</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="What can you offer in exchange?"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="offer_description"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Offer Description</FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder="Describe what you're offering..."
                                className="min-h-[100px]"
                                maxLength={1000}
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="offer_value"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Offer Value (USD)</FormLabel>
                            <FormControl>
                              <Input
                                type="number"
                                placeholder="0"
                                {...field}
                                onChange={(e) =>
                                  field.onChange(Number(e.target.value))
                                }
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </CardContent>
                  </Card>
                )}

                {/* Additional Details */}
                <Card>
                  <CardHeader className="pb-4">
                    <div className="flex items-center space-x-2">
                      <Clock className="h-5 w-5 text-accent" />
                      <h2 className="text-lg font-semibold">
                        Additional Details
                      </h2>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <FormField
                      control={form.control}
                      name="deadline"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Deadline</FormLabel>
                          <FormControl>
                            <Input
                              type="date"
                              {...field}
                              className="cursor-pointer appearance-none [&::-webkit-calendar-picker-indicator]:hidden"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <SkillsInput
                      control={form.control}
                      name="skills"
                      suggestions={skillSuggestions}
                    />
                  </CardContent>
                </Card>

                <div className="flex justify-end space-x-4">
                  <AlertDialog
                    open={showDiscardDialog}
                    onOpenChange={setShowDiscardDialog}
                  >
                    <AlertDialogTrigger asChild>
                      <Button type="button" variant="outline">
                        Cancel
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Discard Changes?</AlertDialogTitle>
                        <AlertDialogDescription>
                          Are you sure you want to discard your project? All
                          changes will be lost.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Keep Editing</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => router.push('/projects')}
                          className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                        >
                          Discard Project
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>

                  <Button type="submit" disabled={isLoading}>
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Creating Project...
                      </>
                    ) : (
                      <>
                        <Save className="mr-2 h-4 w-4" />
                        Create Project
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  )
}
