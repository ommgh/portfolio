"use client";

import Link from "next/link";
import type React from "react";
import { cn } from "@/lib/utils";
import { Grid2x2Check } from "lucide-react";
import { projects } from "@/content/projects";

export default function ProjectPage() {
  const className = "";
  return (
    <div className={cn("text-sm", className)}>
      <div className="flex items-center justify-between px-1 py-3 border-b border-border/75">
        <Link href="/projects">
          <div className="flex items-center gap-2 font-medium text-foreground/80">
            <Grid2x2Check className="w-4 h-4" />
            <h2 className="capitalize font-normal">Projects</h2>
          </div>
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
        {projects.map((project) => (
          <ProjectCard
            key={project.title}
            title={project.title}
            description={project.description}
            github={project.github}
            date={project.date}
          />
        ))}
      </div>
    </div>
  );
}

interface ProjectItemProps {
  title: string;
  description: string;
  date: string;
  github: string;
}

function ProjectCard({ title, description, date, github }: ProjectItemProps) {
  return (
    <Link
      href={github || ""}
      target="_blank"
      className="block rounded-xl border border-border p-4 hover:shadow-sm hover:border-muted-foreground transition-colors"
    >
      <div className="mb-2 flex items-center justify-between">
        <h3 className="text-base font-semibold text-foreground">{title}</h3>
        <span className="text-xs text-muted-foreground whitespace-nowrap">
          {formatDate(date)}
        </span>
      </div>
      <p className="text-sm text-muted-foreground">{description}</p>
    </Link>
  );
}

function formatDate(date: string) {
  const dateObj = new Date(date);
  return dateObj.toLocaleString("default", { month: "long", year: "numeric" });
}
