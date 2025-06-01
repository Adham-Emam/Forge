'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  User,
  Building2,
  Mail,
  Phone,
  MapPin,
  Globe,
  Briefcase,
  DollarSign,
  UserRoundSearch,
  Loader2,
  Save,
  Award,
} from 'lucide-react'

import {
  Form,
  FormControl,
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
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { TabsContent } from '@/components/ui/tabs'
import { Button } from '@/components/ui/button'
import Loader from '@/components/layout/loader'
import { SkillsInput } from '@/components/profile/skills-input'
import { isCurrentUser } from '@/lib/auth'

import countryCodes from '@/constants/country-codes'
import countries from '@/constants/countries'
import skillSuggestions from '@/constants/skills-suggestions'
import socialDomains from '@/constants/social-links'
import { SocialIcon } from '../ui/social-icon'
import { set } from 'date-fns'

const urlOrEmptyString = z.string().refine((value) => {
  if (value === '') return true
  return z.string().url().safeParse(value).success
})

const formSchema = z.object({
  // Personal Info
  first_name: z
    .string()
    .min(2, { message: 'First name must be at least 2 characters' }),
  last_name: z
    .string()
    .min(2, { message: 'Last name must be at least 2 characters' }),
  email: z.string().email({ message: 'Please enter a valid email address' }),
  country_code: z.string(),
  phone_number: z
    .string()
    .min(10, { message: 'Please enter a valid phone number' }),
  country: z.string().min(2, { message: 'Please select your country' }),
  city: z.string().min(2, { message: 'Please enter your city' }),
  overview: z
    .string()
    .min(10, { message: 'Overview must be at least 10 characters' }),

  // Professional Info
  title: z.string().min(2, { message: 'Professional title is required' }),
  level: z.string(),
  hourly_rate: z.number().min(0),
  availability: z.string(),
  social_links: z.record(urlOrEmptyString).optional(),
  skills: z.array(z.string()).optional(),
  company_name: z.string().optional(),
  company_website: z.string().url().optional(),
})

export default function EditForm({ id }: { id: number }) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)
  const [message, setMessage] = useState<{ type: string; message: string }>({
    type: '',
    message: '',
  })

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      first_name: '',
      last_name: '',
      email: '',
      country_code: '',
      phone_number: '',
      country: '',
      city: '',
      overview: '',
      title: '',
      level: '',
      hourly_rate: 0,
      availability: '',
      social_links: Object.fromEntries(
        Object.keys(socialDomains).map((key) => [key, ''])
      ),
      skills: [],
      company_name: '',
      company_website: '',
    },
  })

  useEffect(() => {
    async function fetchUserData() {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/${id}/`)

      if (!res.ok) {
        throw new Error('Failed to fetch user data')
      }

      const userData = await res.json()

      const safeUserData = {
        first_name: userData.first_name || '',
        last_name: userData.last_name || '',
        email: userData.email || '',
        country_code: userData.country_code || '',
        phone_number: userData.phone_number || '',
        country: userData.country || '',
        city: userData.city || '',
        overview: userData.overview || '',
        title: userData.title || '',
        level: userData.level || '',
        hourly_rate: userData.hourly_rate ?? 0,
        availability: userData.availability || '',
        social_links: userData.social_links
          ? Object.fromEntries(
              Object.keys(socialDomains).map((key) => [
                key,
                userData.social_links[key] || '',
              ])
            )
          : Object.fromEntries(
              Object.keys(socialDomains).map((key) => [key, ''])
            ),
        skills: userData.skills || [],
        company_name: userData.company_name || '',
        company_website: userData.company_website || '',
      }

      form.reset(safeUserData)
    }
    fetchUserData()
  }, [id, form])

  useEffect(() => {
    async function CheckAuthority() {
      const isAuthorized = await isCurrentUser(id)

      if (!isAuthorized) {
        router.push('/profile/' + id)
      } else {
        setIsLoading(false)
      }
    }

    CheckAuthority()
  }, [router, id])

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true)

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/users/${id}/update/`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('forge-auth-token')}`,
          },
          body: JSON.stringify(values),
        }
      )

      if (res.ok) {
        setMessage({ type: 'success', message: 'Profile updated successfully' })
      } else {
        setMessage({ type: 'error', message: 'Failed to update profile' })
      }
    } catch (error) {
      setMessage({ type: 'error', message: 'Error updating profile' })
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isLoading) {
    return <Loader className="fixed top-0 left-0 w-screen h-screen" />
  }

  return (
    <Form {...form}>
      {message.type && message.message && (
        <p
          className={`text-sm p-4 rounded-lg border ${
            message.type === 'success'
              ? 'border-green-500 bg-green-500/20'
              : 'border-red-500 bg-red-500/20'
          }`}
        >
          {message.message}
        </p>
      )}
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {/* Personal Information */}
        <TabsContent value="personal">
          <Card>
            <CardHeader className="pb-4">
              <div className="flex items-center space-x-2">
                <User className="h-5 w-5 text-accent" />
                <h2 className="text-lg font-semibold">Personal Information</h2>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Name Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="first_name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>First Name</FormLabel>
                      <FormControl>
                        <Input required {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="last_name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Last Name</FormLabel>
                      <FormControl>
                        <Input required {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Contact Information */}
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input disabled className="pl-10" {...field} />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="country_code"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Country Code</FormLabel>
                      <Select
                        value={
                          Object.entries(countryCodes).find(
                            ([country, code]) => code === field.value
                          )
                            ? Object.entries(countryCodes)
                                .find(([country, code]) => code === field.value)
                                ?.join('-')
                            : ''
                        }
                        onValueChange={(value) => {
                          const [, code] = value.split('-')
                          // Save only the code to the form
                          field.onChange(code)
                        }}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select country code" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {Object.entries(countryCodes).map(
                            ([country, code]) => (
                              <SelectItem
                                key={`${country}-${code}`}
                                value={`${country}-${code}`}
                              >
                                {country} {code}
                              </SelectItem>
                            )
                          )}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="phone_number"
                  render={({ field }) => {
                    // Override onChange to filter out non-digit chars
                    const handleChange = (
                      e: React.ChangeEvent<HTMLInputElement>
                    ) => {
                      const numericValue = e.target.value.replace(/\D/g, '') // Remove non-digits
                      field.onChange(numericValue)
                    }

                    return (
                      <FormItem>
                        <FormLabel>Phone Number</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                            <Input
                              type="tel"
                              inputMode="numeric"
                              pattern="[0-9]*"
                              className="pl-10"
                              {...field}
                              onChange={handleChange}
                              maxLength={15} // optional max length for phone number
                              placeholder="Enter your phone number"
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )
                  }}
                />
              </div>

              {/* Location */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="country"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Country</FormLabel>
                      <Select
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select country" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {countries.map((country) => (
                            <SelectItem key={country} value={country}>
                              {country}
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
                  name="city"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>City</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <Input className="pl-10" {...field} />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Overview */}
              <FormField
                control={form.control}
                name="overview"
                render={({ field }) => {
                  const maxChars = 1000
                  const currentLength = field.value ? field.value.length : 0
                  const isMaxReached = currentLength >= maxChars

                  return (
                    <FormItem>
                      <FormLabel>Overview</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Textarea
                            placeholder="Tell us about yourself and your expertise..."
                            className="min-h-[100px] resize-none pr-14" // add padding right for counter space
                            maxLength={maxChars}
                            rows={5}
                            {...field}
                          />
                          <div
                            className={`absolute bottom-1 right-2 text-xs font-medium select-none px-2 py-0.5 rounded-full transition-colors duration-300 ${
                              isMaxReached
                                ? 'bg-red-100 text-red-700'
                                : 'bg-gray-200 text-gray-600 dark:bg-gray-700 dark:text-gray-300'
                            }`}
                          >
                            {maxChars - currentLength} characters left
                          </div>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )
                }}
              />
            </CardContent>
          </Card>
        </TabsContent>

        {/* Skills */}
        <TabsContent value="skills">
          <Card>
            <CardHeader className="pb-4">
              <div className="flex items-center space-x-2">
                <Award className="h-5 w-5 text-accent" />
                <h2 className="text-lg font-semibold">Skills</h2>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <SkillsInput
                control={form.control}
                name="skills"
                suggestions={skillSuggestions}
              />
            </CardContent>
          </Card>
        </TabsContent>

        {/* Professional Information */}
        <TabsContent value="professional">
          <Card>
            <CardHeader className="pb-4">
              <div className="flex items-center space-x-2">
                <Briefcase className="h-5 w-5 text-accent" />
                <h2 className="text-lg font-semibold">
                  Professional Information
                </h2>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Professional Title & Level */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Professional Title</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="level"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Experience Level</FormLabel>
                      <Select
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select level" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="beginner">Beginner</SelectItem>
                          <SelectItem value="intermediate">
                            Intermediate
                          </SelectItem>
                          <SelectItem value="expert">Expert</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Rate & Availability */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="hourly_rate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Hourly Rate (USD)</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <DollarSign className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <Input
                            type="number"
                            className="pl-10"
                            min={0}
                            {...field}
                            onChange={(e) =>
                              field.onChange(Number(e.target.value))
                            }
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="availability"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Availability</FormLabel>
                      <Select
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select availability" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="full_time">Full Time</SelectItem>
                          <SelectItem value="part_time">Part Time</SelectItem>
                          <SelectItem value="remote">Remote</SelectItem>
                          <SelectItem value="flexible">Flexible</SelectItem>
                          <SelectItem value="not_available">
                            Not Available
                          </SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Company Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="company_name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Company Name</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Building2 className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <Input className="pl-10" {...field} />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="company_website"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Company Website</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Globe className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <Input className="pl-10" {...field} />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Social Links */}
        <TabsContent value="social">
          <Card>
            <CardHeader className="pb-4">
              <div className="flex items-center space-x-2">
                <UserRoundSearch className="h-5 w-5 text-accent" />
                <h2 className="text-lg font-semibold">Social Links</h2>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {Object.entries(socialDomains).map(([key, link]) => (
                  <FormField
                    key={key}
                    control={form.control}
                    name={`social_links.${key}`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          {key.charAt(0).toUpperCase() + key.slice(1)}
                        </FormLabel>
                        <FormControl>
                          <div className="relative">
                            <SocialIcon
                              name={key}
                              classname="absolute left-3 top-3 h-4 w-4 text-muted-foreground "
                            />
                            <Input
                              className="pl-10 placeholder:text-muted"
                              placeholder={`Your ${key} profile URL`}
                              {...field}
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <div className="flex justify-end space-x-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => router.push('/profile/' + id)}
          >
            Cancel
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Saving Changes...
              </>
            ) : (
              <>
                <Save className="mr-2 h-4 w-4" />
                Save Changes
              </>
            )}
          </Button>
        </div>
      </form>
    </Form>
  )
}
