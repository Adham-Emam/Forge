import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Star, Clock, CheckCircle, AlertCircle } from "lucide-react"
import Link from "next/link"

// This would normally come from an API/database
const projects = [
  {
    id: "1",
    title: "Website Development for Logo Design",
    status: "active",
    createdAt: "2024-03-20",
    offering: {
      title: "Full-stack web development",
      description: "I can build a complete web application using React, Node.js, and MongoDB. This includes frontend development, backend API development, database design, and deployment.",
      estimatedValue: 2000,
      deliverables: [
        "Custom web application",
        "Responsive design",
        "API integration",
        "Database setup",
        "Deployment assistance"
      ],
      timeline: "2-3 weeks"
    },
    seeking: {
      title: "Professional logo design",
      description: "Looking for a modern, minimalist logo design that reflects my brand. Need both vector and raster formats, along with brand guidelines.",
      estimatedValue: 1500,
      requirements: [
        "Original design",
        "Vector formats (AI, SVG, EPS)",
        "Raster formats (PNG, JPG)",
        "Brand guidelines document",
        "3 revision rounds"
      ],
      timeline: "1-2 weeks"
    },
    skills: ["React", "Node.js", "MongoDB", "API Development", "Responsive Design"],
    user: {
      name: "Alex Thompson",
      rating: 4.8,
      completedProjects: 23,
      memberSince: "2023",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80",
      location: "San Francisco, CA"
    }
  },
  {
    id: "2",
    title: "UI/UX Design for Content Writing",
    status: "active",
    createdAt: "2024-03-19",
    offering: {
      title: "UI/UX Design",
      description: "Professional UI/UX design services including wireframes, prototypes, and user research.",
      estimatedValue: 1800,
      deliverables: [
        "Wireframes",
        "Interactive prototypes",
        "User flow diagrams",
        "Design system",
        "UI components"
      ],
      timeline: "2 weeks"
    },
    seeking: {
      title: "Content Writing",
      description: "Need comprehensive content writing for my design portfolio and blog.",
      estimatedValue: 1200,
      requirements: [
        "Portfolio descriptions",
        "Case studies",
        "Blog articles",
        "SEO optimization",
        "2 revision rounds"
      ],
      timeline: "2 weeks"
    },
    skills: ["Figma", "Adobe XD", "Prototyping"],
    user: {
      name: "Sarah Chen",
      rating: 4.9,
      completedProjects: 18,
      memberSince: "2023",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80",
      location: "New York, NY"
    }
  },
  {
    id: "3",
    title: "Video Editing for Social Media Management",
    status: "active",
    createdAt: "2024-03-18",
    offering: {
      title: "Professional Video Editing",
      description: "High-quality video editing services including color grading, transitions, and effects.",
      estimatedValue: 1500,
      deliverables: [
        "Edited videos",
        "Color grading",
        "Custom transitions",
        "Sound design",
        "Multiple formats"
      ],
      timeline: "1 week"
    },
    seeking: {
      title: "Social Media Management",
      description: "Looking for comprehensive social media management across multiple platforms.",
      estimatedValue: 1500,
      requirements: [
        "Content calendar",
        "Daily posts",
        "Engagement management",
        "Analytics reports",
        "Community management"
      ],
      timeline: "1 month"
    },
    skills: ["Premier Pro", "After Effects", "Color Grading"],
    user: {
      name: "Marcus Rodriguez",
      rating: 4.7,
      completedProjects: 15,
      memberSince: "2023",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80",
      location: "Los Angeles, CA"
    }
  }
];

export function generateStaticParams() {
  return projects.map((project) => ({
    id: project.id,
  }))
}

export default function ProjectDetails({ params }: { params: { id: string } }) {
  const project = projects.find(p => p.id === params.id) || projects[0];

  return (
    <div className="min-h-screen py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Back Button */}
        <Button variant="ghost" className="mb-8" asChild>
          <Link href="/exchange-hub">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Exchange Hub
          </Link>
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Project Header */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Badge variant="outline" className="text-primary">
                  {project.status === 'active' ? 'Active' : 'Closed'}
                </Badge>
                <span className="text-sm text-muted-foreground">
                  Posted on {new Date(project.createdAt).toLocaleDateString()}
                </span>
              </div>
              <h1 className="text-4xl font-bold tracking-tight mb-4">{project.title}</h1>
              <div className="flex flex-wrap gap-2">
                {project.skills.map((skill) => (
                  <Badge key={skill} variant="secondary">{skill}</Badge>
                ))}
              </div>
            </div>

            {/* Exchange Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Offering */}
              <Card className="p-6">
                <h2 className="text-xl font-semibold mb-4">Offering</h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-medium">{project.offering.title}</h3>
                    <p className="text-muted-foreground mt-2">{project.offering.description}</p>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Deliverables:</h4>
                    <ul className="list-disc list-inside text-muted-foreground">
                      {project.offering.deliverables.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="flex items-center gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Estimated Value</p>
                      <p className="font-medium">${project.offering.estimatedValue}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Timeline</p>
                      <p className="font-medium">{project.offering.timeline}</p>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Seeking */}
              <Card className="p-6">
                <h2 className="text-xl font-semibold mb-4">Seeking</h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-medium">{project.seeking.title}</h3>
                    <p className="text-muted-foreground mt-2">{project.seeking.description}</p>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Requirements:</h4>
                    <ul className="list-disc list-inside text-muted-foreground">
                      {project.seeking.requirements.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="flex items-center gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Estimated Value</p>
                      <p className="font-medium">${project.seeking.estimatedValue}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Timeline</p>
                      <p className="font-medium">{project.seeking.timeline}</p>
                    </div>
                  </div>
                </div>
              </Card>
            </div>

            {/* Value Difference */}
            {project.offering.estimatedValue !== project.seeking.estimatedValue && (
              <Card className="p-6 border-primary/20">
                <h2 className="text-xl font-semibold mb-4">Value Difference</h2>
                <p className="text-muted-foreground">
                  There is a value difference of ${Math.abs(project.offering.estimatedValue - project.seeking.estimatedValue)}.
                  The party offering the lower-valued skill will need to compensate for this difference.
                </p>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* User Profile */}
            <Card className="p-6">
              <div className="text-center">
                <img
                  src={project.user.image}
                  alt={project.user.name}
                  className="mx-auto h-24 w-24 rounded-full mb-4"
                />
                <h2 className="text-xl font-semibold">{project.user.name}</h2>
                <p className="text-muted-foreground mb-4">{project.user.location}</p>
                <div className="flex justify-center items-center gap-2 mb-4">
                  <Star className="h-4 w-4 text-primary fill-primary" />
                  <span className="font-medium">{project.user.rating}</span>
                </div>
              </div>
              <div className="space-y-2 pt-4 border-t">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Member since</span>
                  <span>{project.user.memberSince}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Completed projects</span>
                  <span>{project.user.completedProjects}</span>
                </div>
              </div>
              <Button className="w-full mt-6">Contact {project.user.name}</Button>
            </Card>

            {/* Quick Stats */}
            <Card className="p-6">
              <h3 className="font-semibold mb-4">Exchange Stats</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">
                    Posted {new Date(project.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-primary" />
                  <span className="text-sm text-muted-foreground">
                    Skills verified
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <AlertCircle className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">
                    Response rate: 95%
                  </span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}