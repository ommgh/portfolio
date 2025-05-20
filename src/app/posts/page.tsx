import { BookOpenText, RssIcon } from "lucide-react";
import { getPosts } from "@/lib/content";
import { cn } from "@/lib/utils";
import { Link as NextViewTransition } from "next-view-transitions";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

function formatDate(date: string | number | Date): string {
  const d: Date = new Date(date);
  return d.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export default function PostPage() {
  const category = "all";
  const limit = null;
  const className = "";

  const posts = getPosts(category).sort(
    (a, b) =>
      new Date(b.time.created).getTime() - new Date(a.time.created).getTime()
  );

  const limitedPosts = limit == null ? posts : posts.slice(0, limit);

  return (
    <div className={cn("text-sm", className)}>
      <div className="flex items-center justify-between px-1 py-3 border-b border-border/75">
        <NextViewTransition href={`/${category}`}>
          <div className="flex items-center gap-2 font-medium text-foreground/80">
            <BookOpenText className="w-4 h-4" />
            <h2 className="capitalize font-normal">
              {category !== "all" ? category : "Posts"}
            </h2>
          </div>
        </NextViewTransition>
        <Button variant={"outline"} size={"xs"}>
          <RssIcon className="w-3 h-3" />
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
        {limitedPosts.length > 0 ? (
          limitedPosts.map((item) => (
            <PostCard
              key={item.slug}
              title={item.title}
              slug={item.slug}
              type={item.type}
              date={formatDate(item.time.created)}
            />
          ))
        ) : (
          <div className="flex justify-center items-center py-8 col-span-full">
            <div className="text-muted-foreground italic">No posts yet.</div>
          </div>
        )}
      </div>
    </div>
  );
}

interface PostItemProps {
  title: string;
  slug: string;
  date: string;
  type?: string;
}

function PostCard({ title, slug, type, date }: PostItemProps) {
  return (
    <NextViewTransition
      href={`/${type}/${slug}`}
      className="block rounded-xl border border-border p-4 hover:shadow-sm hover:border-muted-foreground transition-colors"
    >
      <div className="mb-2 flex items-center justify-between">
        <h3 className="text-base font-semibold text-foreground">{title}</h3>
        <span className="text-xs text-muted-foreground whitespace-nowrap">
          {date}
        </span>
      </div>
      {type && (
        <Badge
          variant="outline"
          className="text-xs font-normal text-muted-foreground capitalize"
        >
          {type}
        </Badge>
      )}
    </NextViewTransition>
  );
}
