import { format } from "date-fns"
import { getTableOfContents } from "fumadocs-core/content/toc"
import { ArrowLeftIcon } from "lucide-react"
import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import type { BlogPosting as PageSchema, WithContext } from "schema-dts"

import { InlineTOC } from "@/components/inline-toc"
import { MDX } from "@/components/mdx"
import { Button } from "@/components/ui/button"
import { Prose } from "@/components/ui/typography"
import { SITE_INFO } from "@/config/site"
import { PostKeyboardShortcuts } from "@/features/blog/components/post-keyboard-shortcuts"
import { PostNavigation } from "@/features/blog/components/post-navigation"
import { LLMCopyButtonWithViewOptions } from "@/features/blog/components/post-page-actions"
import { PostShareMenu } from "@/features/blog/components/post-share-menu"
import {
  findNeighbour,
  getAllPosts,
  getPostBySlug,
} from "@/features/blog/data/posts"
import { getReadingTime } from "@/features/blog/lib/reading-time"
import type { Post } from "@/features/blog/types/post"
import { USER } from "@/features/portfolio/data/user"
import { cn } from "@/lib/utils"

export async function generateStaticParams() {
  const posts = getAllPosts()
  return posts.map((post) => ({
    slug: post.slug,
  }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const slug = (await params).slug
  const post = getPostBySlug(slug)

  if (!post) {
    return notFound()
  }

  const { title, description, image, createdAt, updatedAt } = post.metadata

  const postUrl = getPostUrl(post)
  const ogImage = image || `/og/simple?title=${encodeURIComponent(title)}`

  return {
    title,
    description,
    alternates: {
      canonical: postUrl,
    },
    openGraph: {
      url: postUrl,
      type: "article",
      publishedTime: new Date(createdAt).toISOString(),
      modifiedTime: new Date(updatedAt).toISOString(),
      images: {
        url: ogImage,
        width: 1200,
        height: 630,
        alt: title,
      },
    },
    twitter: {
      card: "summary_large_image",
      images: [ogImage],
    },
  }
}

function getPageJsonLd(post: Post): WithContext<PageSchema> {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.metadata.title,
    description: post.metadata.description,
    image:
      post.metadata.image ||
      `/og/simple?title=${encodeURIComponent(post.metadata.title)}`,
    url: `${SITE_INFO.url}${getPostUrl(post)}`,
    datePublished: new Date(post.metadata.createdAt).toISOString(),
    dateModified: new Date(post.metadata.updatedAt).toISOString(),
    author: {
      "@type": "Person",
      name: USER.displayName,
      identifier: USER.username,
      image: USER.avatar,
    },
  }
}

export default async function Page({
  params,
}: {
  params: Promise<{
    slug: string
  }>
}) {
  const slug = (await params).slug
  const post = getPostBySlug(slug)

  if (!post) {
    notFound()
  }

  const toc = getTableOfContents(post.content)

  const allPosts = getAllPosts()
  const { previous, next } = findNeighbour(allPosts, slug)
  const readingTime = getReadingTime(post.content)

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(getPageJsonLd(post)).replace(/</g, "\\u003c"),
        }}
      />

      <PostKeyboardShortcuts basePath="/blog" previous={previous} next={next} />

      <div className="flex items-center justify-between p-2 pl-4">
        <Button
          className="h-7 gap-2 rounded-lg px-0 font-mono text-muted-foreground"
          variant="link"
          asChild
        >
          <Link href="/blog">
            <ArrowLeftIcon />
            Blog
          </Link>
        </Button>

        <div className="flex items-center gap-2">
          <LLMCopyButtonWithViewOptions
            markdownUrl={`${getPostUrl(post)}.mdx`}
            isComponent={post.metadata.category === "components"}
          />

          <PostShareMenu url={getPostUrl(post)} />
        </div>
      </div>

      <div className="screen-line-before screen-line-after"></div>

      <Prose
        className={cn(
          "px-4",
          // Readability research puts comfortable prose at 50-75 characters per
          // line; the container alone runs to roughly 95. Constrain the running
          // text only, so code blocks, tables and figures keep the full width.
          "[&_blockquote]:max-w-prose [&_h2]:max-w-prose [&_h3]:max-w-prose",
          "[&_li]:max-w-prose [&_ol]:max-w-prose [&_p]:max-w-prose [&_ul]:max-w-prose"
        )}
      >
        <h1 className="screen-line-after py-2 text-2xl font-semibold text-balance">
          {post.metadata.title}
        </h1>

        <p className="max-w-prose text-muted-foreground">
          {post.metadata.description}
        </p>

        <div className="not-prose flex flex-wrap items-center gap-x-2 gap-y-1 font-mono text-xs text-muted-foreground">
          <time dateTime={new Date(post.metadata.createdAt).toISOString()}>
            {format(new Date(post.metadata.createdAt), "d MMM yyyy")}
          </time>
          <span aria-hidden>·</span>
          <span>{readingTime} min read</span>
        </div>

        <InlineTOC items={toc} />

        <div>
          <MDX code={post.content} />
        </div>
      </Prose>

      <div className="screen-line-before w-full" />

      <PostNavigation previous={previous} next={next} />
    </>
  )
}

function getPostUrl(post: Post) {
  const isComponent = post.metadata.category === "components"
  return isComponent ? `/components/${post.slug}` : `/blog/${post.slug}`
}
