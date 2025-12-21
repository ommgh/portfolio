"use client";

import { Plus } from "lucide-react";
import Image from "next/image";

import { cn } from "@/lib/utils";

interface BookCallProps {
  /** URL to the meeting/booking link */
  meetingLink: string;
  /** URL or path to the profile image */
  profileImage: string;
  /** Text to display on the button */
  text?: string;
  /** Alt text for the profile image */
  profileAlt?: string;
  /** Additional class names */
  className?: string;
}

export function BookCall({
  meetingLink,
  profileImage,
  text = "Book a Call",
  profileAlt = "You",
  className,
}: BookCallProps) {
  return (
    <a
      href={meetingLink}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "group inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm text-primary-foreground transition-all duration-300 ease-out hover:gap-3 hover:bg-primary/90",
        className
      )}
    >
      <div className="relative flex items-center">
        <div className="h-6 w-6 shrink-0 overflow-hidden rounded-full">
          <Image
            alt="Profile"
            width={24}
            height={24}
            className="h-full w-full object-cover"
            src={profileImage}
          />
        </div>

        <div className="flex w-0 items-center overflow-hidden opacity-0 transition-all duration-300 ease-out group-hover:w-12 group-hover:opacity-100">
          <Plus className="mx-0.5 h-3 w-3 shrink-0" />
          <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary-foreground/20 text-[10px] font-medium">
            {profileAlt}
          </span>
        </div>
      </div>

      <span className="whitespace-nowrap">{text}</span>
    </a>
  );
}

export default BookCall;
