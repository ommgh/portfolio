"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { NavItem } from "@/types/nav";

export function MobileNav({
  items,
  className,
}: {
  items: NavItem[];
  className?: string;
}) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      return () => document.removeEventListener("keydown", handleEscape);
    }
  }, [isOpen]);

  return (
    <div className={cn("relative", className)}>
      <Button
        variant="ghost"
        className={cn(
          "group/toggle flex flex-col gap-1",
          isOpen && "bg-accent"
        )}
        size="icon"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-label="Toggle Menu"
      >
        <span
          className={cn(
            "flex h-0.5 w-4 transform rounded-[1px] bg-foreground transition-transform",
            isOpen && "translate-y-[3px] rotate-45"
          )}
        />
        <span
          className={cn(
            "flex h-0.5 w-4 transform rounded-[1px] bg-foreground transition-transform",
            isOpen && "translate-y-[-3px] -rotate-45"
          )}
        />
        <span className="sr-only">Toggle Menu</span>
      </Button>

      {isOpen && (
        <div
          className="fixed inset-0 top-14 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}

      <div
        className={cn(
          "fixed top-14 right-0 left-0 z-50 border-b border-edge bg-background px-4 shadow-lg transition-all duration-300 ease-in-out",
          isOpen
            ? "translate-y-0 opacity-100"
            : "pointer-events-none -translate-y-2 opacity-0"
        )}
      >
        <nav className="flex flex-col py-2">
          {items.map((link) => {
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={cn(
                  "flex items-center rounded-xl px-3 py-3 text-sm font-medium transition-colors",
                  "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                )}
              >
                {link.title}
              </Link>
            );
          })}
        </nav>
      </div>
    </div>
  );
}
