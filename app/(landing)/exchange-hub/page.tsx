"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Search, Filter, Hammer, Code, Palette, PenTool, Camera, Music } from "lucide-react"
import { useState } from "react"
import Link from "next/link"

export default function ExchangeHub() {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [selectedSkills, setSelectedSkills] = useState<string[]>([])
  const [selectedValueRange, setSelectedValueRange] = useState<string[]>([])
  const [selectedTimeframe, setSelectedTimeframe] = useState<string[]>([])

  const exchangeListings = [
    {
      id: 1,
      title: "Website Development for Logo Design",
      offering: "Full-stack web development",
      seeking: "Professional logo design",
      skills: ["React", "Node.js", "MongoDB"],
      user: {
        name: "Alex Thompson",
        rating: 4.8,
        image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80"
      }
    },
    {
      id: 2,
      title: "UI/UX Design for Content Writing",
      offering: "UI/UX Design",
      seeking: "Content Writing",
      skills: ["Figma", "Adobe XD", "Prototyping"],
      user: {
        name: "Sarah Chen",
        rating: 4.9,
        image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80"
      }
    },
    {
      id: 3,
      title: "Video Editing for Social Media Management",
      offering: "Professional Video Editing",
      seeking: "Social Media Management",
      skills: ["Premier Pro", "After Effects", "Color Grading"],
      user: {
        name: "Marcus Rodriguez",
        rating: 4.7,
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80"
      }
    }
  ]

  const categories = [
    { icon: Code, name: "Development", count: 234 },
    { icon: Palette, name: "Design", count: 156 },
    { icon: PenTool, name: "Writing", count: 98 },
    { icon: Camera, name: "Photography", count: 87 },
    { icon: Music, name: "Music", count: 65 },
  ]

  const filterOptions = {
    skills: [
      "React",
      "Node.js",
      "Python",
      "UI/UX Design",
      "Graphic Design",
      "Content Writing",
      "Video Editing",
      "Photography",
      "Social Media",
      "SEO"
    ],
    valueRanges: [
      "$100 - $500",
      "$501 - $1000",
      "$1001 - $2000",
      "$2001 - $5000",
      "$5000+"
    ],
    timeframes: [
      "Less than a week",
      "1-2 weeks",
      "2-4 weeks",
      "1-2 months",
      "2+ months"
    ]
  }

  return (
    <div className="min-h-screen py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex flex-col items-center text-center mb-12">
          <div className="rounded-full bg-primary/10 p-3 ring-1 ring-primary/20 mb-6">
            <Hammer className="h-6 w-6 text-primary" />
          </div>
          <h1 className="text-4xl font-bold tracking-tight mb-4">Exchange Hub</h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Discover opportunities to exchange skills with talented professionals or find traditional freelance projects.
          </p>
        </div>

        <div className="mb-8">
          <Tabs defaultValue="exchange" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger value="exchange">Skill Exchange</TabsTrigger>
              <TabsTrigger value="traditional">Traditional Projects</TabsTrigger>
            </TabsList>
            <TabsContent value="exchange">
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                {/* Search and Filters */}
                <div className="lg:col-span-1">
                  <Card className="p-4">
                    <div className="space-y-4">
                      <div className="relative">
                        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input placeholder="Search exchanges" className="pl-8" />
                      </div>
                      <div className="space-y-4">
                        <h3 className="font-semibold">Categories</h3>
                        {categories.map((category) => (
                          <button
                            key={category.name}
                            className="flex items-center justify-between w-full p-2 rounded-lg hover:bg-secondary/50 transition-colors"
                          >
                            <div className="flex items-center gap-2">
                              <category.icon className="h-4 w-4 text-primary" />
                              <span>{category.name}</span>
                            </div>
                            <span className="text-sm text-muted-foreground">{category.count}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  </Card>
                </div>

                {/* Listings */}
                <div className="lg:col-span-3 space-y-6">
                  <div className="flex justify-between items-center">
                    <p className="text-sm text-muted-foreground">Showing 1-3 of 150 exchanges</p>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="outline" size="sm">
                          <Filter className="h-4 w-4 mr-2" />
                          Filter
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="w-56">
                        <DropdownMenuLabel>Skills Required</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        {filterOptions.skills.map((skill) => (
                          <DropdownMenuCheckboxItem
                            key={skill}
                            checked={selectedSkills.includes(skill)}
                            onCheckedChange={(checked) => {
                              setSelectedSkills(
                                checked
                                  ? [...selectedSkills, skill]
                                  : selectedSkills.filter((s) => s !== skill)
                              )
                            }}
                          >
                            {skill}
                          </DropdownMenuCheckboxItem>
                        ))}
                        
                        <DropdownMenuSeparator />
                        <DropdownMenuLabel>Value Range</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        {filterOptions.valueRanges.map((range) => (
                          <DropdownMenuCheckboxItem
                            key={range}
                            checked={selectedValueRange.includes(range)}
                            onCheckedChange={(checked) => {
                              setSelectedValueRange(
                                checked
                                  ? [...selectedValueRange, range]
                                  : selectedValueRange.filter((r) => r !== range)
                              )
                            }}
                          >
                            {range}
                          </DropdownMenuCheckboxItem>
                        ))}

                        <DropdownMenuSeparator />
                        <DropdownMenuLabel>Timeframe</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        {filterOptions.timeframes.map((time) => (
                          <DropdownMenuCheckboxItem
                            key={time}
                            checked={selectedTimeframe.includes(time)}
                            onCheckedChange={(checked) => {
                              setSelectedTimeframe(
                                checked
                                  ? [...selectedTimeframe, time]
                                  : selectedTimeframe.filter((t) => t !== time)
                              )
                            }}
                          >
                            {time}
                          </DropdownMenuCheckboxItem>
                        ))}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                  
                  <div className="grid gap-6">
                    {exchangeListings.map((listing) => (
                      <Card key={listing.id} className="p-6">
                        <div className="flex items-start justify-between">
                          <div className="flex items-start gap-4">
                            <img
                              src={listing.user.image}
                              alt={listing.user.name}
                              className="h-12 w-12 rounded-full"
                            />
                            <div>
                              <h3 className="font-semibold">{listing.title}</h3>
                              <p className="text-sm text-muted-foreground">by {listing.user.name} • ⭐ {listing.user.rating}</p>
                            </div>
                          </div>
                          <Button asChild>
                            <Link href={`/exchange-hub/${listing.id}`}>View Details</Link>
                          </Button>
                        </div>
                        <div className="mt-4 grid grid-cols-2 gap-4">
                          <div>
                            <p className="text-sm font-medium">Offering</p>
                            <p className="text-sm text-muted-foreground">{listing.offering}</p>
                          </div>
                          <div>
                            <p className="text-sm font-medium">Seeking</p>
                            <p className="text-sm text-muted-foreground">{listing.seeking}</p>
                          </div>
                        </div>
                        <div className="mt-4 flex flex-wrap gap-2">
                          {listing.skills.map((skill) => (
                            <span
                              key={skill}
                              className="inline-flex items-center rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </Card>
                    ))}
                  </div>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="traditional">
              <div className="text-center py-12">
                <h3 className="text-2xl font-semibold mb-4">Traditional Projects Coming Soon</h3>
                <p className="text-muted-foreground">
                  We're working on bringing traditional freelance projects to the platform.
                  Stay tuned for updates!
                </p>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}