import { ArrowRightIcon, BookOpenText, RssIcon } from "lucide-react";
import { getPosts } from "@/lib/content";
import { cn } from "@/lib/utils";

import { Link as NextViewTransition } from "next-view-transitions";
import { Button, buttonVariants } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

import Link from "next/link";

interface PostsListProps {
  category: string;
  limit?: number | null;
  className?: string;
}

function formatDate(date: string | number | Date): string {
  const d: Date = new Date(date);
  return d.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export default function PostsList({
  category,
  limit,
  className,
}: PostsListProps) {
  const posts = getPosts(category).sort((a, b) => {
    return (
      new Date(b.time.created).getTime() - new Date(a.time.created).getTime()
    );
  });

  const limitedPosts = limit == null ? posts : posts.slice(0, limit);

  return (
    <div className={cn("text-sm", className)}>
      <div className="flex flex-row items-center justify-between px-1 py-3 border-border/75 border-b">
        <NextViewTransition href={`/${category}`}>
          <div className="flex flex-row items-center gap-2 text-foreground/80 font-medium">
            <BookOpenText className="w-4 h-4" />

            <div>
              <h2 className="capitalize text-foreground/80 font-normal">
                {category !== "all" ? category : "Posts"}
              </h2>
            </div>
          </div>
        </NextViewTransition>
        <Button variant={"outline"} size={"xs"}>
          <RssIcon className="w-3 h-3" />
        </Button>
      </div>

      <div className="flex flex-col mt-3 gap-1">
        {limitedPosts.length > 0 ? (
          limitedPosts.map((item) => (
            <PostItem
              key={item.slug}
              title={item.title}
              slug={item.slug}
              type={item.type}
              date={formatDate(item.time.created)}
            />
          ))
        ) : (
          <div className="flex justify-center items-center py-8">
            <div className="text-muted-foreground italic">No posts yet.</div>
          </div>
        )}
      </div>
      <Link
        href="/posts"
        prefetch
        className={cn(
          buttonVariants({
            variant: "outline",
            size: "sm",
          }),
          "w-full text-xs text-muted-foreground mt-5 gap-2"
        )}
      >
        <span>View All</span> <ArrowRightIcon className="w-3.5 h-3.5" />
      </Link>
    </div>
  );
}

interface PostItemProps {
  title: string;
  slug: string;
  date: string;
  type?: string;
}

function PostItem({ title, slug, type, date }: PostItemProps) {
  return (
    <NextViewTransition
      href={`/${type}/${slug}`}
      className="group flex flex-col gap-2 px-4 py-3 rounded-md border border-border/50 hover:border-primary/30"
    >
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-foreground/90 transition-colors">
          {title}
        </span>
        <span className="text-xs text-muted-foreground whitespace-nowrap">
          {date}
        </span>
      </div>
      <div className="flex items-center gap-2">
        {type && (
          <Badge
            variant="outline"
            className="text-xs font-normal text-muted-foreground capitalize"
          >
            {type}
          </Badge>
        )}
      </div>
    </NextViewTransition>
  );
}
