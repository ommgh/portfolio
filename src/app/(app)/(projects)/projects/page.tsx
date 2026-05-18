import type { Metadata } from "next"

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
        <h1 className="text-xl font-semibold">Projects</h1>
        <p className="text-sm text-muted-foreground">
          A collection of products, experiments, and client work.
        </p>
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
