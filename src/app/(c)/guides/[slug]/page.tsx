import type { Post } from "@/types/type";
import { OpenGraph } from "@/lib/metadata";
import { getPosts, getPostBySlug } from "@/lib/content";
import { notFound } from "next/navigation";
import PostLayout from "@/components/post-layout";

interface PageProps {
  params: {
    slug: string;
  };
}

const route = "guides";

export async function generateStaticParams() {
  const posts = getPosts(route);
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export function generateMetadata({ params }: PageProps) {
  const post = getPostBySlug(route, params.slug);

  if (!post) {
    return {};
  }

  const title = post.title;
  const image = `${
    process.env.NEXT_PUBLIC_SITE_URL
  }api/og?title=${encodeURIComponent(title)}`;

  return {
    ...OpenGraph,
    title,
    openGraph: {
      title,
      images: [image],
    },
    twitter: {
      images: [image],
    },
  };
}

export default function Page({ params }: PageProps) {
  const post = getPostBySlug(route, params.slug);

  if (!post) {
    notFound();
  }

  return <PostLayout post={post} route={route} />;
}
