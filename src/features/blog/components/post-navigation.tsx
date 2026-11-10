import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react"
import Link from "next/link"

import type { Post } from "@/features/blog/types/post"
import { cn } from "@/lib/utils"

/**
 * Previous/next links at the foot of a post.
 *
 * These used to be two bare icon buttons. An arrow on its own says a post
 * exists in that direction but nothing about what it is, so the only way to
 * find out was to click and see — the reader has to guess whether it is worth
 * leaving the page for. Naming the destination is the whole point of a link,
 * so each side shows the title it leads to.
 */
export function PostNavigation({
  previous,
  next,
}: {
  previous?: Post | null
  next?: Post | null
}) {
  if (!previous && !next) return null

  return (
    <nav
      aria-label="Post navigation"
      className="grid grid-cols-1 gap-px sm:grid-cols-2"
    >
      {previous ? (
        <PostNavigationLink post={previous} direction="previous" />
      ) : (
        <div className="hidden sm:block" />
      )}

      {next && <PostNavigationLink post={next} direction="next" />}
    </nav>
  )
}

function PostNavigationLink({
  post,
  direction,
}: {
  post: Post
  direction: "previous" | "next"
}) {
  const isNext = direction === "next"

  return (
    <Link
      href={`/blog/${post.slug}`}
      rel={isNext ? "next" : "prev"}
      className={cn(
        "group/nav flex flex-col gap-1.5 p-4 transition-colors hover:bg-muted/50",
        // The next link sits on the right, so its label reads inward.
        isNext && "sm:items-end sm:text-right"
      )}
    >
      <span
        className={cn(
          "flex items-center gap-1.5 font-mono text-xs text-muted-foreground",
          isNext && "sm:flex-row-reverse"
        )}
      >
        {isNext ? (
          <ArrowRightIcon className="size-3.5" aria-hidden />
        ) : (
          <ArrowLeftIcon className="size-3.5" aria-hidden />
        )}
        {isNext ? "Next" : "Previous"}
      </span>

      <span className="text-sm leading-snug font-medium text-balance underline-offset-4 group-hover/nav:underline">
        {post.metadata.title}
      </span>
    </Link>
  )
}
