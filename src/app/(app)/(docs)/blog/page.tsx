import type { Metadata } from "next"
import { Suspense } from "react"

import { PostList } from "@/features/blog/components/post-list"
import { PostListWithSearch } from "@/features/blog/components/post-list-with-search"
import { PostSearchInput } from "@/features/blog/components/post-search-input"
import { getListedPosts } from "@/features/blog/data/posts"

export const metadata: Metadata = {
  title: "Blog",
  description: "A collection of articles on development, design, and ideas.",
}

export default function Page() {
  const allPosts = getListedPosts()

  return (
    <div className="min-h-svh">
      <div className="screen-line-after p-2">
        <h1 className="text-xl font-semibold">Blogs</h1>
      </div>

      <div className="screen-line-before screen-line-after p-2">
        <Suspense
          fallback={
            <div className="flex h-9 w-full rounded-lg border border-input shadow-xs dark:bg-input/30" />
          }
        >
          <PostSearchInput />
        </Suspense>
      </div>

      <Suspense fallback={<PostList posts={allPosts} />}>
        <PostListWithSearch posts={allPosts} />
      </Suspense>

      <div className="h-4" />
    </div>
  )
}
