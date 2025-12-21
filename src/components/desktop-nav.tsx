"use client";

import { usePathname, useRouter } from "next/navigation";
import { useHotkeys } from "react-hotkeys-hook";

import { Nav } from "@/components/nav";
import type { NavItem } from "@/types/nav";

export function DesktopNav({ items }: { items: NavItem[] }) {
  const pathname = usePathname();
  const router = useRouter();

  // Keyboard shortcuts for navigation
  useHotkeys("p", () => router.push("/"));
  useHotkeys("c", () => router.push("/components"));
  useHotkeys("b", () => router.push("/blog"));

  return (
    <Nav
      className="max-sm:hidden"
      items={items}
      activeId={pathname}
      showShortcuts
    />
  );
}
