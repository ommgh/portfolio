import Image from "next/image"
import React from "react"

import type { Experience } from "../../types/experiences"
import { ExperiencePositionItem } from "./experience-position-item"

export function ExperienceItem({ experience }: { experience: Experience }) {
  // The last item's rule would otherwise land exactly on the next panel's
  // top rule, drawing two scallop bands a pixel apart.
  return (
    <div className="screen-line-after space-y-4 py-4 last:after:hidden">
      <div className="flex items-center gap-3">
        <div className="flex size-6 shrink-0 items-center justify-center select-none">
          {experience.companyLogo ? (
            <Image
              src={experience.companyLogo}
              alt={experience.companyName}
              width={24}
              height={24}
              quality={100}
              className="rounded-full"
              unoptimized
              aria-hidden
            />
          ) : (
            /* The company sits on the thread as a pulli with its loop drawn. */
            <span
              className="size-2.5 rounded-full border border-muted-foreground/45"
              aria-hidden
            />
          )}
        </div>

        <h3 className="text-lg leading-snug font-medium">
          {experience.companyName}
        </h3>

        {experience.isCurrentEmployer && (
          /* The one accent on the page is sindoor; the stock blue dot pulled a
             second accent colour into the layout for no reason. */
          <span className="flex items-center gap-1.5 font-mono text-xs text-sindoor">
            <span className="size-1.5 rounded-full bg-sindoor" aria-hidden />
            Present
            <span className="sr-only">Current employer</span>
          </span>
        )}
      </div>

      {/*
        The thread joining the roles is the vertical scallop used on every other
        edge of the site, rather than a plain solid hairline.
      */}
      <div className="relative space-y-4 before:absolute before:left-[9px] before:h-full before:w-(--rule-thickness) before:bg-(image:--rule-v) before:bg-[length:var(--rule-thickness)_var(--rule-pitch)] before:bg-repeat-y">
        {experience.positions.map((position) => (
          <ExperiencePositionItem key={position.id} position={position} />
        ))}
      </div>
    </div>
  )
}
