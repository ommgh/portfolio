import type { MetadataRoute } from "next"

import { SITE_INFO } from "@/config/site"
import { getListedPosts } from "@/features/blog/data/posts"
import { PROJECTS } from "@/features/portfolio/data/projects"

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getListedPosts()
    .filter((post) => post.metadata.category !== "components")
    .map((post) => ({
      url: `${SITE_INFO.url}/blog/${post.slug}`,
      lastModified: new Date(post.metadata.updatedAt).toISOString(),
    }))

  const projects = PROJECTS.map((project) => ({
    url: `${SITE_INFO.url}/projects/${project.id}`,
  }))

  const routes = ["", "/blog", "/projects"].map((route) => ({
    url: `${SITE_INFO.url}${route}`,
    lastModified: new Date().toISOString(),
  }))

  return [...routes, ...posts, ...projects]
}
