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
        className,
      )}
    >
      <p>
        I&apos;m a full stack developer driven by shipping software that solves
        real problems. Through my agency,
        <Link
          href="https://launchit.today"
          target="_blank"
          className="text-[13px] text-[#30a14e] no-underline font-medium mx-1 hover:underline"
        >
          Lit Labs
        </Link>
        , I partner with startups to architect and deliver industry-grade MVPs.
        Currently, I&apos;m building{" "}
        <Link
          href="https://quickboarder.shop"
          target="_blank"
          className="text-[13px] text-[#30a14e] no-underline font-medium mx-1 hover:underline"
        >
          Quickboarder
        </Link>
        — a platform enabling local merchants to make their products e-commerce
        ready in minutes.
      </p>
    </div>
  );
}
