export type ProjectProps = {
  id: number
  title: string
  skills: string[]
  description: string
  offer_title: string
  offer_description: string
  offer_value: number
  budget: string
  project_type: 'traditional' | 'exchange'
  owner: number
  type: string
}
