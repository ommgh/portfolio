import { BoxIcon } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

import { Tag } from "@/components/ui/tag"
import { cn } from "@/lib/utils"

import type { Project } from "../../types/projects"

export function ProjectItem({
  className,
  project,
}: {
  className?: string
  project: Project
}) {
  const displayImage = project.displayImage ?? project.logo

  return (
    <Link
      className={cn(
        "group/project flex flex-col gap-2 border-b border-edge p-2",
        className
      )}
      href={`/projects/${project.id}`}
    >
      <div className="relative flex aspect-1200/630 items-center justify-center overflow-hidden bg-muted p-1 select-none">
        {displayImage ? (
          <Image
            src={displayImage}
            alt={project.title}
            width={1200}
            height={630}
            quality={100}
            className="size-full object-cover"
            unoptimized
          />
        ) : (
          <div className="flex size-16 items-center justify-center rounded-2xl border border-muted-foreground/15 bg-background text-muted-foreground ring-1 ring-edge ring-offset-1 ring-offset-background">
            <BoxIcon className="size-8" />
          </div>
        )}

        <div className="pointer-events-none absolute inset-0 ring-1 ring-black/10 ring-inset dark:ring-white/10" />
      </div>

      <div className="flex flex-col gap-2 p-2">
        <div className="flex items-start gap-3">
          {project.logo && (
            <Image
              src={project.logo}
              alt=""
              width={32}
              height={32}
              quality={100}
              className="mt-0.5 size-6 shrink-0 rounded-md object-contain"
              unoptimized
              aria-hidden
            />
          )}

          <div className="min-w-0 flex-1">
            <h3 className="text-lg leading-snug font-medium text-balance underline-offset-4 group-hover/project:underline">
              {project.title}
            </h3>
          </div>
        </div>

        {project.description && (
          <p className="line-clamp-2 text-sm text-muted-foreground">
            {project.description}
          </p>
        )}

        {project.skills.length > 0 && (
          <ul className="flex flex-wrap gap-1.5">
            {project.skills.slice(0, 4).map((skill, index) => (
              <li key={index} className="flex">
                <Tag>{skill}</Tag>
              </li>
            ))}
          </ul>
        )}
      </div>
    </Link>
  )
}
