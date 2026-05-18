"use client"

import { format } from "date-fns"
import { CalendarIcon, PinIcon } from "lucide-react"
import { motion } from "motion/react"
import Link from "next/link"

import ComesInGoesOutUnderline from "@/components/fancy/text/underline-comes-in-goes-out"
import { getIcon } from "@/components/icons"
import type { Post } from "@/features/blog/types/post"

type BlogListProps = {
  posts: Post[]
}

export function BlogList({ posts }: BlogListProps) {
  return (
    <div>
      {posts.map((post) => (
        <Link key={post.slug} href={`/blog/${post.slug}`} className="block">
          <motion.div
            className="flex items-center border-b border-edge pr-2 hover:bg-accent2"
            initial="rest"
            animate="rest"
            whileHover="hover"
          >
            <div className="mx-4 flex size-6 shrink-0 items-center justify-center text-muted-foreground select-none [&_svg]:size-5">
              {getIcon(post.metadata.icon) ?? (
                <span className="size-2 rounded-full bg-muted-foreground/40" />
              )}
            </div>

            <div className="relative flex-1 border-l border-dashed border-edge p-4">
              {(post.metadata.pinned || post.metadata.new) && (
                <div className="absolute top-3 right-3 flex items-center text-muted-foreground">
                  {post.metadata.pinned ? (
                    <PinIcon className="size-4 rotate-45" aria-hidden />
                  ) : (
                    <span className="size-2 rounded-full bg-info">
                      <span className="sr-only">New</span>
                    </span>
                  )}
                </div>
              )}
              <h3 className="mb-1 inline-block leading-snug font-medium text-balance">
                <ComesInGoesOutUnderline className="inline-block">
                  {post.metadata.title}
                </ComesInGoesOutUnderline>
              </h3>

              <dl className="text-xs text-muted-foreground">
                <dt className="sr-only">Published on</dt>
                <dd className="flex items-center gap-1">
                  <CalendarIcon className="size-3" aria-hidden />
                  <time
                    dateTime={new Date(post.metadata.createdAt).toISOString()}
                  >
                    {format(new Date(post.metadata.createdAt), "dd.MM.yyyy")}
                  </time>
                </dd>
              </dl>
            </div>
          </motion.div>
        </Link>
      ))}
    </div>
  )
}
