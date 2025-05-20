import "@/styles/globals.css";
import { ThemeProvider } from "next-themes";
import { TooltipProvider } from "@/components/ui/tooltip";

import { ViewTransitions } from "next-view-transitions";
export default function LandingLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ViewTransitions>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <TooltipProvider>
          <main className="mx-auto max-w-screen-sm overflow-x-hidden px-6 py-8 md:py-16 md:overflow-x-visible">
            {children}
          </main>
        </TooltipProvider>
      </ThemeProvider>
    </ViewTransitions>
  );
}
