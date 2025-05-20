import "@/styles/globals.css";

import { siteConfig } from "@/config/site";
import type { Metadata, Viewport } from "next";
import { ThemeProvider } from "next-themes";
import { TooltipProvider } from "@/components/ui/tooltip";
import { GeistMono } from "geist/font/mono";
import clsx from "clsx";
import { ViewTransitions } from "next-view-transitions";
import { Analytics } from "@vercel/analytics/next";

export const metadata: Metadata = {
  metadataBase: new URL("https://ommishra.tech"),
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    "om mishra",
    "om mishra portfolio",
    "ommgh github",
    "om mishra",
    "ommishra portfolio",
    "om portfolio",
    "software developer",
    "Full stack developer",
  ],
  authors: [
    {
      name: "Om Mishra",
      url: "https://ommishra.tech",
    },
  ],
  creator: "ommishra",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
    creator: "@ommishra",
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export const viewport: Viewport = {
  colorScheme: "dark light",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ViewTransitions>
      <html
        lang="en"
        className={clsx(GeistMono.className)}
        suppressHydrationWarning
      >
        <body>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <TooltipProvider>
              {children}
              <Analytics />
            </TooltipProvider>
          </ThemeProvider>
        </body>
      </html>
    </ViewTransitions>
  );
}
