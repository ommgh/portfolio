import { Mail, PhoneIcon } from "lucide-react";
import Link from "next/link";

import { FlipSentences } from "@/components/flip-sentences";
import { GitHub } from "@/components/icons/github";
import { LinkedIn } from "@/components/icons/linkedin";
import { XformerlyTwitter } from "@/components/icons/x";
import { Button } from "@/components/ui/button";
import { USER } from "@/features/portfolio/data/user";

export function ProfileHeader() {
  return (
    <div className="screen-line-after flex border-x border-edge">
      <div className="shrink-0 border-r border-edge">
        <div className="mx-0.5 my-[3px]">
          <img
            className="size-32 ring-1 ring-border ring-offset-2 ring-offset-background select-none sm:size-40"
            alt={`${USER.displayName}'s avatar`}
            src={USER.avatar}
            fetchPriority="high"
          />
        </div>
      </div>

      <div className="flex flex-1 flex-col">
        <div className="flex grow items-center pl-4">
          <h1 className="text-3xl font-semibold">{USER.displayName}</h1>
        </div>

        <div className="border-t border-edge py-1 pl-4">
          <FlipSentences
            className="font-mono text-sm text-balance text-muted-foreground"
            variants={{
              initial: { y: -10, opacity: 0 },
              animate: { y: -1, opacity: 1 },
              exit: { y: 10, opacity: 0 },
            }}
          >
            {USER.flipSentences}
          </FlipSentences>
        </div>

        <div className="flex items-center border-t border-edge py-1 pl-4">
          <div className="flex flex-row">
            <Link href={"https://x.com/ommshx"} target="_blank">
              <Button variant="ghost" size="icon">
                <XformerlyTwitter className="h-3.5 w-3.5" />
              </Button>
            </Link>
            <Link href={"https://github.com/ommgh"} target="_blank">
              <Button variant="ghost" size="icon" className="mr-1">
                <GitHub className="h-3.5 w-3.5" />
              </Button>
            </Link>
            <Link href={"https://www.linkedin.com/in/ommlinkd"} target="_blank">
              <Button variant="ghost" size="icon" className="mr-1">
                <LinkedIn className="h-3.5 w-3.5" />
              </Button>
            </Link>
            <Link href={"mailto:hey@ommishra.me"}>
              <Button variant="ghost" size="icon" className="mr-1">
                <Mail className="h-3.5 w-3.5" />
              </Button>
            </Link>
            <Link href={`tel:6299921091`}>
              <Button variant="ghost" size="icon" className="mr-1">
                <PhoneIcon className="h-3.5 w-3.5" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
