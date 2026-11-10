import { InfinityIcon } from "lucide-react"
import React from "react"

import { Markdown } from "@/components/markdown"
import {
  CollapsibleChevronsIcon,
  CollapsibleContent,
  CollapsibleTrigger,
  CollapsibleWithContext,
} from "@/components/ui/collapsible"
import { Tag } from "@/components/ui/tag"
import { ProseMono } from "@/components/ui/typography"
import { cn } from "@/lib/utils"

import type { ExperiencePosition } from "../../types/experiences"

export function ExperiencePositionItem({
  position,
}: {
  position: ExperiencePosition
}) {
  const { start, end } = position.employmentPeriod
  const isOngoing = !end

  return (
    <CollapsibleWithContext defaultOpen={position.isExpanded} asChild>
      <div className="relative">
        <CollapsibleTrigger
          className={cn(
            "group/trigger block w-full text-left",
            "relative before:absolute before:-top-1 before:-right-1 before:-bottom-1.5 before:left-6 before:-z-1 before:rounded-md before:transition-[background-color] before:ease-out hover:before:bg-accent2"
          )}
        >
          <div className="relative z-1 mb-1 flex items-center gap-3">
            {/* A pulli on the thread, in place of a boxed icon. */}
            <span
              className="flex size-6 shrink-0 items-center justify-center"
              aria-hidden
            >
              <span className="size-1.5 rounded-full bg-muted-foreground/60 ring-2 ring-background" />
            </span>

            <h4 className="flex-1 font-medium text-balance">
              {position.title}
            </h4>

            <div
              className="shrink-0 text-muted-foreground [&_svg]:size-4"
              aria-hidden
            >
              <CollapsibleChevronsIcon />
            </div>
          </div>

          <div className="flex items-center gap-1.5 pl-9 font-mono text-xs text-muted-foreground">
            {position.employmentType && (
              <>
                <dl>
                  <dt className="sr-only">Employment Type</dt>
                  <dd>{position.employmentType}</dd>
                </dl>

                <span aria-hidden>·</span>
              </>
            )}

            <dl>
              <dt className="sr-only">Employment Period</dt>
              <dd className="flex items-center gap-1">
                <span>{start}</span>
                <span>—</span>
                {isOngoing ? (
                  <>
                    <InfinityIcon
                      className="size-4 translate-y-[0.5px]"
                      aria-hidden
                    />
                    <span className="sr-only">Present</span>
                  </>
                ) : (
                  <span>{end}</span>
                )}
              </dd>
            </dl>
          </div>
        </CollapsibleTrigger>

        <CollapsibleContent className="overflow-hidden duration-300 data-[state=closed]:animate-collapsible-fade-up data-[state=open]:animate-collapsible-fade-down">
          {position.description && (
            <ProseMono className="pt-2 pb-1 pl-9 prose-li:my-0.5">
              <Markdown>{position.description}</Markdown>
            </ProseMono>
          )}

          {Array.isArray(position.skills) && position.skills.length > 0 && (
            <ul className="flex flex-wrap gap-1.5 pt-2 pb-1 pl-9">
              {position.skills.map((skill, index) => (
                <li key={index} className="flex">
                  <Tag>{skill}</Tag>
                </li>
              ))}
            </ul>
          )}
        </CollapsibleContent>
      </div>
    </CollapsibleWithContext>
  )
}
