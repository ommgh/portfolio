import Link from "next/link";
import React from "react";

import { cn } from "@/lib/utils";
import type { NavItem } from "@/types/nav";

import { Kbd } from "./ui/kbd";

// Map of nav item titles to their keyboard shortcuts
const KEYBOARD_SHORTCUTS: Record<string, string> = {
  Portfolio: "P",
  Components: "C",
  Blog: "B",
};

export function Nav({
  items,
  activeId,
  className,
  showShortcuts = false,
}: {
  items: NavItem[];
  activeId?: string;
  className?: string;
  showShortcuts?: boolean;
}) {
  return (
    <nav
      data-active-id={activeId}
      className={cn("flex items-center gap-4", className)}
    >
      {items.map(({ title, href }) => {
        const active =
          activeId === href ||
          (href === "/" // Home page
            ? ["/", "/index"].includes(activeId || "")
            : activeId?.startsWith(href));

        const shortcut = KEYBOARD_SHORTCUTS[title];

        return (
          <NavItem key={href} href={href} active={active}>
            {showShortcuts && shortcut && (
              <Kbd className="mr-1.5">{shortcut}</Kbd>
            )}
            {title}
          </NavItem>
        );
      })}
    </nav>
  );
}

export function NavItem({
  active,
  ...props
}: React.ComponentProps<typeof Link> & {
  active?: boolean;
}) {
  return (
    <Link
      className={cn(
        "flex items-center font-mono text-sm font-medium text-muted-foreground transition-[color] duration-300",
        active && "text-foreground"
      )}
      {...props}
    />
  );
}
