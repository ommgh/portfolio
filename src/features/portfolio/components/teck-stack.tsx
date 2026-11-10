import { cn } from "@/lib/utils"

import { TECH_STACK } from "../data/tech-stack"
import type { TechStack as TechStackType } from "../types/tech-stack"
import { Panel, PanelContent, PanelHeader, PanelTitle } from "./panel"

export function TeckStack() {
  return (
    <Panel id="stack">
      <PanelHeader>
        <PanelTitle>Skills & Technologies</PanelTitle>
      </PanelHeader>

      <PanelContent className="p-0">
        <div className="relative [--badge-height:--spacing(6)] [--col-left-width:--spacing(48)]">
          <div
            className="pointer-events-none absolute inset-y-0 left-(--col-left-width) -z-1 w-px max-sm:hidden"
            aria-hidden
          />

          {Object.entries(groupByCategory(TECH_STACK)).map(
            ([category, items], index, categories) => {
              // The rules are painted as a background-image by `.border-edge`,
              // which is unlayered CSS and so outranks any Tailwind variant —
              // `last:border-none` and `last:bg-none` both get overridden. Drop
              // the class outright instead, otherwise the final row's rule
              // lands on the next panel's top rule.
              const isLast = index === categories.length - 1
              const categoryId = `${category
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, "-")
                .replace(/(^-|-$)/g, "")}`

              return (
                <div
                  key={category}
                  className={cn(
                    "grid items-start gap-y-2 py-4 sm:grid-cols-[var(--col-left-width)_1fr]",
                    !isLast && "border-b border-edge"
                  )}
                >
                  <div
                    id={categoryId}
                    className="pl-4 text-sm/(--badge-height) text-muted-foreground"
                  >
                    <span
                      className="mr-1.5 font-mono text-muted-foreground/50 select-none"
                      aria-hidden
                    >
                      {(index + 1).toString().padStart(2, "0")}
                    </span>
                    {category}
                  </div>

                  <ul
                    aria-labelledby={categoryId}
                    className="flex flex-wrap gap-1.5 px-4"
                  >
                    {items.map((item) => {
                      return (
                        <li key={item.key} className="flex">
                          <a
                            href={item.href}
                            target="_blank"
                            rel="noopener"
                            className="flex h-(--badge-height) items-center justify-center gap-1.5 rounded-md bg-zinc-50/80 px-1.75 font-mono text-xs text-foreground inset-ring-1 inset-ring-border dark:bg-zinc-900/80 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 [&_svg]:text-muted-foreground/80"
                          >
                            {item.icon}
                            {item.title}
                          </a>
                        </li>
                      )
                    })}
                  </ul>
                </div>
              )
            }
          )}
        </div>
      </PanelContent>
    </Panel>
  )
}

function groupByCategory(
  items: TechStackType[]
): Record<string, TechStackType[]> {
  return items.reduce<Record<string, TechStackType[]>>((acc, item) => {
    for (const category of item.categories) {
      ;(acc[category] ??= []).push(item)
    }
    return acc
  }, {})
}
