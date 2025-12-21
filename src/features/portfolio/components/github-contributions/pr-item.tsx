import { LinkIcon } from "lucide-react";
import Image from "next/image";

import { Markdown } from "@/components/markdown";
import {
  CollapsibleChevronsIcon,
  CollapsibleContent,
  CollapsibleTrigger,
  CollapsibleWithContext,
} from "@/components/ui/collapsible";
import { Tag } from "@/components/ui/tag";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ProseMono } from "@/components/ui/typography";
import { UTM_PARAMS } from "@/config/site";
import { addQueryParams } from "@/utils/url";

import type { Contribution } from "../../types/contributions";

export function PRItem({
  className,
  contribution,
}: {
  className?: string;
  contribution: Contribution;
}) {
  const date = contribution.date;

  return (
    <CollapsibleWithContext defaultOpen={contribution.isExpanded} asChild>
      <div className={className}>
        <div className="flex items-center hover:bg-accent2">
          <Image
            src={contribution.org}
            alt={contribution.repository}
            width={24}
            height={20}
            quality={100}
            className="mx-4 flex shrink-0 select-none"
            unoptimized
            aria-hidden="true"
          />

          <div className="flex-1 border-l border-dashed border-edge">
            <CollapsibleTrigger className="flex w-full items-center gap-2 p-4 pr-2 text-left">
              <div className="flex-1">
                <h3 className="mb-1 flex items-center gap-2 leading-snug font-medium text-balance">
                  <span>{contribution.title}</span>
                  <span className="rounded-full bg-[#FA5D19] px-2 py-0.5 text-xs text-[#F9F9F9]">
                    {contribution.bounty}
                  </span>
                </h3>

                <dl className="text-sm text-muted-foreground">
                  <dt className="sr-only">Date</dt>
                  <dd>{date}</dd>
                </dl>
              </div>

              <Tooltip>
                <TooltipTrigger asChild>
                  <a
                    className="relative flex size-6 shrink-0 items-center justify-center text-muted-foreground after:absolute after:-inset-2 hover:text-foreground"
                    href={addQueryParams(contribution.link, UTM_PARAMS)}
                    target="_blank"
                    rel="noopener"
                  >
                    <LinkIcon className="pointer-events-none size-4" />
                    <span className="sr-only">Open Contribution Link</span>
                  </a>
                </TooltipTrigger>

                <TooltipContent>
                  <p>Open Contribution Link</p>
                </TooltipContent>
              </Tooltip>

              <div
                className="shrink-0 text-muted-foreground [&_svg]:size-4"
                aria-hidden
              >
                <CollapsibleChevronsIcon />
              </div>
            </CollapsibleTrigger>
          </div>
        </div>

        <CollapsibleContent className="group overflow-hidden duration-300 data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down">
          <div className="border-t border-edge shadow-inner">
            <div className="space-y-4 p-4 duration-300 group-data-[state=closed]:animate-fade-out group-data-[state=open]:animate-fade-in">
              {contribution.description && (
                <ProseMono>
                  <Markdown>{contribution.description}</Markdown>
                </ProseMono>
              )}

              <div className="flex flex-wrap gap-1.5">
                <Tag>{contribution.bounty}</Tag>
                <Tag>{contribution.type}</Tag>
                <Tag>{contribution.state}</Tag>
              </div>
            </div>
          </div>
        </CollapsibleContent>
      </div>
    </CollapsibleWithContext>
  );
}
