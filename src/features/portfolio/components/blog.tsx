import { ArrowRightIcon } from "lucide-react"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { getListedPosts } from "@/features/blog/data/posts"

import { BlogList } from "./blog-list"
import { Panel, PanelHeader, PanelTitle } from "./panel"

export function Blog() {
  const allPosts = getListedPosts()

  return (
    <Panel id="blog">
      <PanelHeader>
        <PanelTitle>Blogs</PanelTitle>
      </PanelHeader>

      <BlogList posts={allPosts.slice(0, 4)} />

      <div className="flex justify-center py-2">
        <Button variant="default" asChild>
          <Link href="/blog">
            All Posts
            <ArrowRightIcon />
          </Link>
        </Button>
      </div>
    </Panel>
  )
}
