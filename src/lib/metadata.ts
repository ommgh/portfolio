import { siteConfig } from "@/config/site";
import type { Metadata } from "next/types";

export const OpenGraph: Metadata = {
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
