import { ChevronLeft } from "lucide-react"
import type { Metadata } from "next"
import Link from "next/link"

import { ProjectItem } from "@/features/portfolio/components/projects/project-item"
import { PROJECTS } from "@/features/portfolio/data/projects"

export const metadata: Metadata = {
  title: "Projects",
  description: "A collection of products, experiments, and client work.",
}

export default function Page() {
  return (
    <div className="min-h-svh">
      <div className="screen-line-after p-2">
        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
          >
            <ChevronLeft className="size-4" />
          </Link>
          <h1 className="text-xl font-semibold">Projects</h1>
        </div>
      </div>

      <div className="relative">
        <div className="absolute inset-0 -z-1 grid grid-cols-1 max-sm:hidden sm:grid-cols-2">
          <div className="border-r border-edge" />
        </div>

        <div className="grid grid-cols-1 gap-4 p-2 sm:grid-cols-2">
          {PROJECTS.map((project) => (
            <ProjectItem key={project.id} project={project} />
          ))}
        </div>
      </div>

      <div className="h-4" />
    </div>
  )
}
