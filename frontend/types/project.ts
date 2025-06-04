export type ProjectProps = {
  id: number
  title: string
  category: string
  project_type: string
  offer_title?: string
  offer_description?: string
  offer_value?: number
  request_title: string
  request_description: string
  request_value: number
  skills: string[]
  status: string
  owner: number
  owner_name: string
  assigned_to: number | null
  deadline: string
  estimated_duration: number
  created_at: string
}
