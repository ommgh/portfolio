import { cn } from "@/lib/utils";
import { Newsreader } from "next/font/google";
import Link from "next/link";

const newsreader = Newsreader({
  style: "italic",
  subsets: ["latin"],
});

interface AboutMeProps {
  className?: string;
}

export default function AboutMe({ className }: AboutMeProps) {
  return (
    <div
      className={cn(
        "prose prose-zinc dark:prose-invert max-w-none w-full text-sm text-foreground/80 font-normal text-pretty leading-loose mx-1",
        className
      )}
    >
      <p>
        I’m a developer with the love for shipping new products. Over the years,
        I have worked with multiple clients through my agency{" "}
        <Link
          href={"https://agencysynapse.tech"}
          target="_blank"
          className={cn(
            "font-reader text-[13px] text-foreground/95 font-normal mb-1 mx-1",
            newsreader.className
          )}
        >
          Synapse
        </Link>{" "}
        and have built multiple industry grade applications.I am currently
        working on{" "}
        <Link
          href={"https://bioshop.vercel.app"}
          target="_blank"
          className={cn(
            "font-reader text-[13px] text-foreground/95 font-normal mb-1 mx-1",
            newsreader.className
          )}
        >
          BioShop
        </Link>{" "}
        a tool for creators to , organize their affiliate links with a custom
        storefront.
      </p>
    </div>
  );
}
