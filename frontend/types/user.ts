import { ProjectProps } from './project'
import { BadgeProps } from './badge'

export type UserProps = {
  id: number
  first_name: string
  last_name: string
  email?: string | null
  credit_amount?: number | null
  level?: string | null
  country_code?: string | null
  phone_number?: string | null
  country?: string | null
  city?: string | null
  title?: string | null
  overview?: string | null
  skills?: string[] | null
  hourly_rate?: number | null
  availability: string
  posted_projects: ProjectProps[]
  assigned_projects: ProjectProps[]
  social_links?: Record<string, string> | null
  company_name?: string | null
  company_website?: string | null
  badges: BadgeProps[]
}
