import {
  ChevronLeft,
  FileTextIcon,
  GlobeIcon,
  InfinityIcon,
} from "lucide-react"
import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"

import { GitHub } from "@/components/icons/github"
import { Markdown } from "@/components/markdown"
import { Tag } from "@/components/ui/tag"
import { ProseMono } from "@/components/ui/typography"
import { UTM_PARAMS } from "@/config/site"
import { PROJECTS } from "@/features/portfolio/data/projects"
import { addQueryParams } from "@/utils/url"

type PageProps = {
  params: Promise<{
    name: string
  }>
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { name } = await params
  const project = PROJECTS.find((item) => item.id === name)

  if (!project) {
    return {
      title: "Project Not Found",
    }
  }

  return {
    title: `Projects / ${project.title}`,
    description: project.description,
  }
}

export default async function Page({ params }: PageProps) {
  const { name } = await params
  const project = PROJECTS.find((item) => item.id === name)

  if (!project) {
    notFound()
  }

  const displayImage = project.displayImage ?? project.logo
  const projectLink = addQueryParams(project.link, UTM_PARAMS)
  const projectCodeLink = project.code
    ? addQueryParams(project.code, UTM_PARAMS)
    : null
  const projectPostLink = project.post
    ? addQueryParams(project.post, UTM_PARAMS)
    : null
  const isGithub = project.link.includes("github.com")
  const { start, end } = project.period
  const isOngoing = !end
  const isSinglePeriod = end === start

  return (
    <div className="min-h-svh">
      <div className="screen-line-after p-2">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Link
            href="/projects"
            className="inline-flex items-center gap-1 hover:text-foreground"
          >
            <ChevronLeft className="size-4" />
            Projects
          </Link>
          <span>/</span>
          <span className="text-foreground">{project.title}</span>
        </div>
      </div>

      <div className="px-4 pt-4">
        <div className="relative overflow-hidden border border-edge bg-muted">
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
            <div className="flex aspect-1200/630 items-center justify-center text-muted-foreground">
              <span>No preview available</span>
            </div>
          )}
          <div className="pointer-events-none absolute inset-0 ring-1 ring-black/10 ring-inset dark:ring-white/10" />
        </div>

        <div className="flex w-full divide-x divide-edge border-t border-edge">
          <a
            className="flex flex-1 items-center justify-center gap-2 p-3 text-sm hover:underline"
            href={projectLink}
            target="_blank"
            rel="noopener"
          >
            {isGithub ? (
              <GitHub className="size-4" aria-hidden />
            ) : (
              <GlobeIcon className="size-4" aria-hidden />
            )}
            <span className="hidden sm:inline">
              {isGithub ? "GitHub" : "Website"}
            </span>
          </a>

          {projectCodeLink && (
            <a
              className="flex flex-1 items-center justify-center gap-2 p-3 text-sm hover:underline"
              href={projectCodeLink}
              target="_blank"
              rel="noopener"
            >
              <GitHub className="size-4" aria-hidden />
              <span className="hidden sm:inline">Code</span>
            </a>
          )}

          {projectPostLink && (
            <a
              className="flex flex-1 items-center justify-center gap-2 p-3 text-sm hover:underline"
              href={projectPostLink}
              target="_blank"
              rel="noopener"
            >
              <FileTextIcon className="size-4" aria-hidden />
              <span className="hidden sm:inline">Post</span>
            </a>
          )}
        </div>
      </div>

      <div className="screen-line-before p-4">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-3">
            {project.logo && (
              <Image
                src={project.logo}
                alt=""
                width={40}
                height={40}
                className="mt-1 size-8 rounded-md object-contain"
                unoptimized
                aria-hidden
              />
            )}
            <div>
              <h1 className="text-xl font-semibold">{project.title}</h1>
              <dl className="text-sm text-muted-foreground">
                <dt className="sr-only">Period</dt>
                <dd className="flex items-center gap-1">
                  <span>{start}</span>
                  {!isSinglePeriod && (
                    <>
                      <span className="font-mono">—</span>
                      {isOngoing ? (
                        <>
                          <InfinityIcon className="size-4.5" aria-hidden />
                          <span className="sr-only">Present</span>
                        </>
                      ) : (
                        <span>{end}</span>
                      )}
                    </>
                  )}
                </dd>
              </dl>
            </div>
          </div>
        </div>

        {project.description && (
          <ProseMono className="mt-3">
            <Markdown>{project.description}</Markdown>
          </ProseMono>
        )}
      </div>

      {project.skills.length > 0 && (
        <div className="screen-line-before p-4">
          <h2 className="text-sm font-semibold">Stack used</h2>
          <ul className="mt-3 flex flex-wrap gap-1.5">
            {project.skills.map((skill, index) => (
              <li key={index} className="flex">
                <Tag>{skill}</Tag>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="h-4" />
    </div>
  )
}
