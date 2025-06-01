import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'

import { Navbar } from '@/components/layout/navbar'
import EditForm from '@/components/profile/edit-form'

export default async function ProfileEditPage({
  params,
}: {
  params: Promise<{ id: number }>
}) {
  const { id } = await params

  return (
    <>
      <Navbar />

      <div className="absolute w-full h-64 md:h-80 z-[-1]">
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
      </div>

      <div className="container min-h-screen pt-24 relative max-w-7xl mx-auto px-4 md:px-6 pb-8">
        <div className="mb-6">
          <h1 className="text-2xl font-bold mb-2">Edit Profile</h1>
          <p className="text-muted-foreground">
            Update your personal and professional information
          </p>
        </div>
        <Tabs defaultValue="personal">
          <TabsList className="space-x-4 my-4">
            <TabsTrigger value="personal">Personal</TabsTrigger>
            <TabsTrigger value="skills">Skills</TabsTrigger>
            <TabsTrigger value="professional">Professional</TabsTrigger>
            <TabsTrigger value="social">Social Links</TabsTrigger>
          </TabsList>
          <EditForm id={Number(id)} />
        </Tabs>
      </div>
    </>
  )
}
