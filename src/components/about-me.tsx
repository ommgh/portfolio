import { cn } from "@/lib/utils";
import Link from "next/link";
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
        I&apos;m a developer with the love for shipping new products. Over the
        years, I have worked with multiple clients through my agency{" "}
        <Link
          href={"https://agencysynapse.tech"}
          target="_blank"
          className=" text-[13px] text-[#30a14e] no-underline font-normal mb-1 mx-1"
        >
          Synapse
        </Link>{" "}
        and have built multiple industry grade MVPs. I am currently working on{" "}
        <Link
          href={"https://qrate.site"}
          target="_blank"
          className=" text-[13px] text-[#30a14e] no-underline font-normal mb-1 mx-1"
        >
          Qrate
        </Link>{" "}
        a tool for creators to , organize their affiliate links with a custom
        storefront.
      </p>
    </div>
  );
}
