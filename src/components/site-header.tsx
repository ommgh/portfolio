"use client";

import ThemeImage from "./theme-image";
import { siteConfig } from "@/config/site";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/ui/icons";
import { cn } from "@/lib/utils";
import { Link } from "next-view-transitions";

interface SiteHeaderProps {
  className?: string;
}

export default function SiteHeader({ className }: SiteHeaderProps) {
  return (
    <header className={cn(`z-50 w-full`, className)}>
      <div className="flex flex-row items-center justify-between w-full">
        <div className="flex flex-row items-start gap-4">
          <ThemeImage
            lightSrc="/images/light-avatar.png"
            darkSrc="/images/dark-avatar.png"
            alt={"Avatar of " + siteConfig.fullName}
            width={38}
            height={38}
            className=" mt-2 h-full"
          />
        </div>

        <div className="flex flex-row">
          <Link href={"https://x.com/indium114"} target="_blank">
            <Button variant="ghost" size="icon">
              <Icons.twitter className="w-3.5 h-3.5" />
            </Button>
          </Link>
          <Link href={"https://github.com/ommgh"} target="_blank">
            <Button variant="ghost" size="icon" className="mr-1">
              <Icons.gitHub className="w-3.5 h-3.5" />
            </Button>
          </Link>
          <Link href={"mailto:hello@ommishra.tech"}>
            <Button variant="ghost" size="icon" className="mr-1">
              <Icons.email className="w-3.5 h-3.5" />
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
}
