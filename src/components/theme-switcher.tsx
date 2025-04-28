"use client";

import { useTheme } from "next-themes";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DesktopIcon, MoonIcon, SunIcon } from "@radix-ui/react-icons";
import { useEffect, useState } from "react";

export default function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // After hydration, we can safely show the UI
  useEffect(() => {
    setMounted(true);
  }, []);

  // Default to "system" during server-side rendering to avoid hydration mismatch
  const currentTheme = mounted ? theme : "dark";

  return (
    <Tabs value={currentTheme} onValueChange={setTheme} defaultValue="system">
      <TabsList className="rounded-md p-[1px] h-fit dark:bg-neutral-900">
        <TabsTrigger value="light" className="p-2" suppressHydrationWarning>
          <SunIcon className="size-3" />
          <span className="sr-only">Light</span>
        </TabsTrigger>
        <TabsTrigger value="dark" className="p-2" suppressHydrationWarning>
          <MoonIcon className="size-3" />
          <span className="sr-only">Dark</span>
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
}
