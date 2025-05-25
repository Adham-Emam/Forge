"use client";

import Link from "next/link";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { ArrowUpRight, Users, DollarSign } from "lucide-react";
import { motion } from "framer-motion";

interface Project {
  id: string;
  title: string;
  description: string;
  skills: string[];
  budget: string;
  type: "traditional" | "exchange";
  owner: {
    name: string;
    avatar: string;
  };
}

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <Card className="group overflow-hidden border-border hover:border-primary/30 transition-all duration-200">
        <CardHeader className="p-4 flex justify-between space-y-0 bg-muted/30">
          <div className="space-y-2">
            <div className="flex space-x-2">
              <Badge variant={project.type === "exchange" ? "default" : "secondary"}>
                {project.type === "exchange" ? "Skill Exchange" : "Paid Project"}
              </Badge>
            </div>
            <Link href={`/projects/${project.id}`}>
              <h3 className="font-orbitron text-lg font-medium group-hover:text-primary transition-colors line-clamp-1">
                {project.title}
              </h3>
            </Link>
          </div>
        </CardHeader>
        <CardContent className="p-4">
          <p className="text-muted-foreground line-clamp-3 mb-4 h-[4.5rem]">
            {project.description}
          </p>
          <div className="flex flex-wrap gap-2 mb-4">
            {project.skills.map((skill, index) => (
              <Badge key={index} variant="outline" className="bg-background/50">
                {skill}
              </Badge>
            ))}
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="relative w-8 h-8 rounded-full overflow-hidden">
                <Image
                  src={project.owner.avatar}
                  alt={project.owner.name}
                  fill
                  className="object-cover"
                />
              </div>
              <span className="text-sm font-medium">{project.owner.name}</span>
            </div>
            <div className="flex items-center text-sm text-muted-foreground">
              {project.type === "traditional" ? (
                <span className="flex items-center">
                  <DollarSign className="h-4 w-4 mr-1" /> {project.budget}
                </span>
              ) : (
                <span className="flex items-center">
                  <Users className="h-4 w-4 mr-1" /> Skill Trade
                </span>
              )}
            </div>
          </div>
        </CardContent>
        <CardFooter className="p-4 pt-0">
          <Button
            variant="ghost"
            className="w-full justify-between group-hover:text-primary group-hover:bg-primary/5"
            asChild
          >
            <Link href={`/projects/${project.id}`}>
              <span>View Details</span>
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
}