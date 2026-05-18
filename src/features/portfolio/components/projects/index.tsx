import { ArrowRightIcon } from "lucide-react"
import Link from "next/link"

import { Button } from "@/components/ui/button"

import { PROJECTS } from "../../data/projects"
import { Panel, PanelHeader, PanelTitle, PanelTitleSup } from "../panel"
import { ProjectItem } from "./project-item"

export function Projects() {
  return (
    <Panel id="projects">
      <PanelHeader>
        <PanelTitle>
          Projects
          <PanelTitleSup>({PROJECTS.length})</PanelTitleSup>
        </PanelTitle>
      </PanelHeader>

      <div className="absolute inset-0 -z-1 grid grid-cols-1 max-sm:hidden sm:grid-cols-2">
        <div className="border-r border-edge" />
      </div>

      <div className="relative">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {PROJECTS.slice(0, 4).map((project) => (
            <ProjectItem key={project.id} project={project} />
          ))}
        </div>
      </div>

      <div className="flex justify-center py-2">
        <Button variant="default" asChild>
          <Link href="/projects">
            All Projects
            <ArrowRightIcon />
          </Link>
        </Button>
      </div>
    </Panel>
  )
}
