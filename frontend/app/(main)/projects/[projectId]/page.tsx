import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Separator } from '@/components/ui/separator'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Textarea } from '@/components/ui/textarea'
import {
  ArrowLeft,
  Calendar,
  Clock,
  DollarSign,
  Users,
  Star,
  MessageSquare,
  Flag,
  CheckCircle2,
  Award,
  MapPin,
  Briefcase,
  ArrowRight,
  Zap,
  Handshake,
  Target,
  Gift,
} from 'lucide-react'
import { formatDistanceToNow } from 'date-fns'

import { notFound } from 'next/navigation'

// Sample project data - in real app this would come from API
// const getProjectData = (id: string) => {
//   const projects = {
//     '1': {
//       id: '1',
//       title: 'Mobile App for Sustainable Fashion',
//       description:
//         "I'm looking for a talented React Native developer to help me build an innovative mobile application focused on sustainable fashion choices. This app will help users track their clothing purchases, find eco-friendly alternatives, and connect with sustainable fashion brands.",
//       detailed_description: `
//         <h3>Project Overview</h3>
//         <p>We're building a comprehensive mobile application that will revolutionize how people approach sustainable fashion. The app will serve as a personal fashion assistant, helping users make more environmentally conscious choices.</p>

//         <h3>Key Features</h3>
//         <ul>
//           <li>Barcode scanning for clothing items to check sustainability ratings</li>
//           <li>Personal wardrobe tracking and analytics</li>
//           <li>Sustainable brand discovery and recommendations</li>
//           <li>Social features to share sustainable fashion tips</li>
//           <li>Carbon footprint calculator for fashion choices</li>
//           <li>Integration with major e-commerce platforms</li>
//         </ul>

//         <h3>Technical Requirements</h3>
//         <ul>
//           <li>React Native for cross-platform development</li>
//           <li>Integration with REST APIs</li>
//           <li>Camera functionality for barcode scanning</li>
//           <li>Push notifications</li>
//           <li>Social login integration</li>
//           <li>Offline functionality for core features</li>
//         </ul>

//         <h3>Timeline</h3>
//         <p>We're looking to complete this project within 8-10 weeks, with regular milestone check-ins every 2 weeks.</p>
//       `,
//       category: 'Mobile Development',
//       project_type: 'exchange',
//       skills: ['React Native', 'UI/UX Design', 'Node.js', 'API Integration'],
//       budget: '$2000-$3000',
//       deadline: '2025-04-15',
//       estimated_duration: 60,
//       status: 'active',
//       created_at: '2025-01-10',

//       // Request details
//       request: {
//         title: 'React Native Developer for Sustainable Fashion App',
//         description:
//           'Looking for an experienced React Native developer to build a cross-platform mobile app with barcode scanning, social features, and e-commerce integration.',
//         value: 2500,
//       },

//       // Exchange offer details
//       offer: {
//         title: 'UI/UX Design & Branding Services',
//         description:
//           'In exchange, I can provide complete UI/UX design services including user research, wireframing, prototyping, and brand identity design. I have 5+ years of experience in design.',
//         value: 2500,
//       },

//       owner: {
//         id: 'user1',
//         name: 'Lisa Chen',
//         avatar:
//           'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
//         title: 'UI/UX Designer',
//         rating: 4.9,
//         completed_projects: 23,
//         location: 'San Francisco, CA',
//         member_since: '2023-03-15',
//         verified: true,
//       },

//       applications: 12,
//       views: 156,
//       saved_count: 8,
//     },
//     '2': {
//       id: '2',
//       title: 'E-commerce Website Development',
//       description:
//         'Need a full-stack developer to build a modern, responsive e-commerce website with payment processing, inventory management, and admin dashboard.',
//       detailed_description: `
//         <h3>Project Overview</h3>
//         <p>We're launching a new online store for handcrafted jewelry and need a complete e-commerce solution built from scratch. The website should be modern, fast, and provide an excellent user experience.</p>

//         <h3>Required Features</h3>
//         <ul>
//           <li>Product catalog with search and filtering</li>
//           <li>Shopping cart and checkout process</li>
//           <li>Payment integration (Stripe, PayPal)</li>
//           <li>User accounts and order history</li>
//           <li>Admin dashboard for inventory management</li>
//           <li>Order tracking and notifications</li>
//           <li>SEO optimization</li>
//           <li>Mobile-responsive design</li>
//         </ul>

//         <h3>Technical Stack</h3>
//         <ul>
//           <li>Frontend: React/Next.js with TypeScript</li>
//           <li>Backend: Node.js with Express or similar</li>
//           <li>Database: PostgreSQL or MongoDB</li>
//           <li>Payment: Stripe integration</li>
//           <li>Hosting: Vercel or similar platform</li>
//         </ul>

//         <h3>Deliverables</h3>
//         <ul>
//           <li>Complete source code with documentation</li>
//           <li>Deployed website ready for production</li>
//           <li>Admin training and handover session</li>
//           <li>30 days of post-launch support</li>
//         </ul>
//       `,
//       category: 'Web Development',
//       project_type: 'traditional',
//       skills: ['React', 'Node.js', 'PostgreSQL', 'Stripe', 'TypeScript'],
//       budget: '$3000-$5000',
//       deadline: '2025-05-01',
//       estimated_duration: 45,
//       status: 'active',
//       created_at: '2025-01-08',

//       // Request details (for traditional projects, this is the main project)
//       request: {
//         title: 'Full-Stack E-commerce Website Development',
//         description:
//           'Complete e-commerce solution with modern design, payment processing, inventory management, and admin dashboard.',
//         value: 4000,
//       },

//       owner: {
//         id: 'user2',
//         name: 'James Thompson',
//         avatar:
//           'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
//         title: 'Business Owner',
//         rating: 4.7,
//         completed_projects: 8,
//         location: 'Austin, TX',
//         member_since: '2024-06-20',
//         verified: true,
//       },

//       applications: 18,
//       views: 234,
//       saved_count: 15,
//     },
//   }

//   return projects[id as keyof typeof projects] || null
// }

async function fetchProjectData(id: number) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/projects/${id}`,
      {
        next: { revalidate: 60 },
        cache: 'no-cache',
      }
    )

    if (!res.ok) {
      throw new Error('Network response was not ok')
    }

    const project = await res.json()

    return project
  } catch (err) {
    console.error('There has been a problem with your fetch operation:', err)
  }
}

export default async function ProjectDetail({
  params,
}: {
  params: Promise<{ projectId: number }>
}) {
  const { projectId } = await params

  const project = await fetchProjectData(projectId)

  console.log(project)

  // const [showApplyDialog, setShowApplyDialog] = useState(false)
  // const [applicationMessage, setApplicationMessage] = useState('')

  if (!project) {
    return notFound()
  }

  const isExchange = project.project_type === 'exchange'
  const createdDate = new Date(project.created_at)
  const deadlineDate = project.deadline ? new Date(project.deadline) : null

  return (
    <div className="min-h-screen pt-16">
      {/* Header */}
      <section className="bg-muted/30 py-8">
        <div className="container mx-auto max-w-7xl px-4 md:px-6">
          <div className="flex items-center gap-4 mb-6">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/projects">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Projects
              </Link>
            </Button>
            <div className="flex items-center gap-2">
              <Badge variant={isExchange ? 'default' : 'secondary'}>
                {isExchange ? 'Skill Exchange' : 'Paid Project'}
              </Badge>
              <Badge variant="outline">{project.category}</Badge>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <h1 className="text-3xl md:text-4xl font-bold mb-4 font-orbitron">
                {project.title}
              </h1>
              <p className="text-lg text-muted-foreground mb-6">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-6">
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-2" />
                  Posted {formatDistanceToNow(createdDate, { addSuffix: true })}
                </div>
                {deadlineDate && (
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-2" />
                    Due {formatDistanceToNow(deadlineDate, { addSuffix: true })}
                  </div>
                )}
                <div className="flex items-center">
                  <Users className="h-4 w-4 mr-2" />
                  {project.applications} applications
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mb-6">
                {project.skills.length > 0 &&
                  project.skills.map((skill: string, index: number) => (
                    <Badge key={index} variant="outline">
                      {skill}
                    </Badge>
                  ))}
              </div>
            </div>

            {/* Project Owner Card */}
            <div className="lg:col-span-1">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <Avatar className="w-16 h-16">
                      <AvatarImage
                        src={project.owner.avatar}
                        alt={project.owner.name}
                      />
                      {/* <AvatarFallback>{project.owner.name[0]}</AvatarFallback> */}
                    </Avatar>
                    <div>
                      <h3 className="font-semibold flex items-center gap-2">
                        {project.owner.name}
                        {project.owner.verified && (
                          <CheckCircle2 className="h-4 w-4 text-blue-500" />
                        )}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {project.owner.title}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-3 mb-6">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Rating</span>
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 text-accent fill-accent" />
                        <span className="font-medium">
                          {project.owner.rating}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Projects</span>
                      <span className="font-medium">
                        {project.owner.completed_projects}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Location</span>
                      <span className="text-sm">{project.owner.location}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Member since</span>
                      <span className="text-sm">
                        {new Date(project.owner.member_since).getFullYear()}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Button className="w-full" asChild>
                      <Link href={`/profile/${project.owner.id}`}>
                        View Profile
                      </Link>
                    </Button>
                    <Button variant="outline" className="w-full">
                      <MessageSquare className="mr-2 h-4 w-4" />
                      Message
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12">
        <div className="container mx-auto max-w-7xl px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Content */}
            <div className="lg:col-span-2">
              <Tabs defaultValue="description" className="space-y-6">
                <TabsList>
                  <TabsTrigger value="description">Description</TabsTrigger>
                  <TabsTrigger value="requirements">Requirements</TabsTrigger>
                  {isExchange && (
                    <TabsTrigger value="exchange">Exchange Details</TabsTrigger>
                  )}
                </TabsList>

                <TabsContent value="description">
                  <Card>
                    <CardHeader>
                      <h2 className="text-xl font-semibold">
                        Project Description
                      </h2>
                    </CardHeader>
                    <CardContent>
                      <div
                        className="prose prose-sm max-w-none"
                        dangerouslySetInnerHTML={{
                          __html: project.detailed_description,
                        }}
                      />
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="requirements">
                  <Card>
                    <CardHeader>
                      <h2 className="text-xl font-semibold flex items-center gap-2">
                        <Target className="h-5 w-5 text-accent" />
                        What We&apos;re Looking For
                      </h2>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div>
                        <h3 className="font-medium mb-3">
                          {project.request.title}
                        </h3>
                        <p className="text-muted-foreground mb-4">
                          {project.request.description}
                        </p>
                        <div className="flex items-center gap-2">
                          <DollarSign className="h-4 w-4 text-accent" />
                          <span className="font-medium">
                            Value: ${project.request.value.toLocaleString()}
                          </span>
                        </div>
                      </div>

                      <Separator />

                      <div>
                        <h4 className="font-medium mb-3">Required Skills</h4>
                        <div className="flex flex-wrap gap-2">
                          {project.skills.length > 0 &&
                            project.skills.map(
                              (skill: string, index: number) => (
                                <Badge key={index} variant="secondary">
                                  {skill}
                                </Badge>
                              )
                            )}
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {project.deadline && (
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4 text-accent" />
                            <div>
                              <p className="text-sm font-medium">Deadline</p>
                              <p className="text-sm text-muted-foreground">
                                {new Date(
                                  project.deadline
                                ).toLocaleDateString()}
                              </p>
                            </div>
                          </div>
                        )}
                        {project.estimated_duration && (
                          <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4 text-accent" />
                            <div>
                              <p className="text-sm font-medium">Duration</p>
                              <p className="text-sm text-muted-foreground">
                                {project.estimated_duration} days
                              </p>
                            </div>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                {isExchange && (
                  <TabsContent value="exchange">
                    <Card>
                      <CardHeader>
                        <h2 className="text-xl font-semibold flex items-center gap-2">
                          <Gift className="h-5 w-5 text-accent" />
                          What&apos;s Being Offered
                        </h2>
                      </CardHeader>
                      <CardContent className="space-y-6">
                        <div className="bg-accent/5 border border-accent/20 rounded-lg p-6">
                          <div className="flex items-center gap-3 mb-4">
                            <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center">
                              <Handshake className="h-6 w-6 text-accent" />
                            </div>
                            <div>
                              <h3 className="font-medium">
                                {/* {project.offer?.title} */}
                              </h3>
                              <p className="text-sm text-muted-foreground">
                                In exchange for your services
                              </p>
                            </div>
                          </div>

                          <p className="text-muted-foreground mb-4">
                            {/* {project.offer?.description} */}
                          </p>

                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <DollarSign className="h-4 w-4 text-accent" />
                              <span className="font-medium">
                                Estimated Value: $
                                {/* {project.offer?.value.toLocaleString()} */}
                              </span>
                            </div>
                            <Badge className="bg-accent/10 text-accent border-accent/30">
                              Equal Exchange
                            </Badge>
                          </div>
                        </div>

                        <div className="bg-muted/30 rounded-lg p-4">
                          <h4 className="font-medium mb-2 flex items-center gap-2">
                            <Zap className="h-4 w-4 text-accent" />
                            Why Skill Exchange?
                          </h4>
                          <ul className="text-sm text-muted-foreground space-y-1">
                            <li>• No upfront payment required</li>
                            <li>• Build valuable professional relationships</li>
                            <li>
                              • Expand your skill set while helping others
                            </li>
                            <li>• Create a portfolio of diverse work</li>
                          </ul>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                )}
              </Tabs>
            </div>

            {/* Right Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 space-y-6">
                {/* Action Card */}
                <Card>
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold mb-1">
                          {isExchange
                            ? 'Skill Exchange'
                            : `$${project.request.value.toLocaleString()}`}
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {isExchange ? 'Equal value trade' : 'Project budget'}
                        </p>
                      </div>

                      <Separator />

                      {/* <div className="space-y-3">
                        <Dialog
                          open={showApplyDialog}
                          onOpenChange={setShowApplyDialog}
                        >
                          <DialogTrigger asChild>
                            <Button className="w-full" size="lg">
                              {isExchange ? 'Propose Exchange' : 'Apply Now'}
                              <ArrowRight className="ml-2 h-4 w-4" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>
                                {isExchange
                                  ? 'Propose Skill Exchange'
                                  : 'Apply for Project'}
                              </DialogTitle>
                              <DialogDescription>
                                {isExchange
                                  ? "Explain how your skills match what they're offering and what you're looking for."
                                  : "Tell the project owner why you're the right person for this job."}
                              </DialogDescription>
                            </DialogHeader>
                            <div className="py-4">
                              <Textarea
                                placeholder={
                                  isExchange
                                    ? "I'm interested in exchanging my [your skills] for your [their offered skills]. Here's why this would be a great match..."
                                    : "I'm excited about this project because..."
                                }
                                value={applicationMessage}
                                onChange={(e) =>
                                  setApplicationMessage(e.target.value)
                                }
                                className="min-h-[120px]"
                              />
                            </div>
                            <DialogFooter>
                              <Button
                                variant="outline"
                                onClick={() => setShowApplyDialog(false)}
                              >
                                Cancel
                              </Button>
                              <Button onClick={() => setShowApplyDialog(false)}>
                                {isExchange
                                  ? 'Send Proposal'
                                  : 'Submit Application'}
                              </Button>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>
                      </div> */}
                    </div>
                  </CardContent>
                </Card>

                {/* Project Stats */}
                <Card>
                  <CardHeader>
                    <h3 className="font-semibold">Project Activity</h3>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Applications</span>
                      <span className="font-medium">
                        {project.applications}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Views</span>
                      <span className="font-medium">{project.views}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Saved</span>
                      <span className="font-medium">{project.saved_count}</span>
                    </div>
                  </CardContent>
                </Card>

                {/* Report Project */}
                <Card>
                  <CardContent className="p-4">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="w-full text-muted-foreground"
                    >
                      <Flag className="mr-2 h-4 w-4" />
                      Report Project
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
