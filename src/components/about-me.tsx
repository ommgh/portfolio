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
        I&apos;m a developer passionate about building and shipping new
        products. Through my agency{" "}
        <Link
          href={"https://agencysynapse.tech"}
          target="_blank"
          className="text-[13px] text-[#30a14e] no-underline font-normal mb-1 mx-1"
        >
          Synapse
        </Link>
        , I&apos;ve collaborated with multiple clients to deliver industry-grade
        MVPs across different domains. Currently, I&apos;m working on{" "}
        <Link
          href={"https://qrated.site"}
          target="_blank"
          className="text-[13px] text-[#30a14e] no-underline font-normal mb-1 mx-1"
        >
          Qrated
        </Link>
        — a tool that helps creators organize their affiliate links into a
        personalized storefront.
      </p>
    </div>
  );
}
