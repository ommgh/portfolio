import { USER } from "@/features/portfolio/data/user"
import type { NavItem } from "@/types/nav"

export const SITE_INFO = {
  name: USER.displayName,
  url: process.env.APP_URL || "https://ommishra.in",
  ogImage: USER.ogImage,
  description: USER.bio,
  keywords: USER.keywords,
}

export const META_THEME_COLORS = {
  light: "#f7f4ee",
  dark: "#141210",
}

export const MAIN_NAV: NavItem[] = [
  {
    title: "Portfolio",
    href: "/",
  },
  {
    title: "Blog",
    href: "/blog",
  },
]

export const GITHUB_USERNAME = "ommgh"
export const SOURCE_CODE_GITHUB_REPO = "ommgh/portfolio"
export const SOURCE_CODE_GITHUB_URL = "https://github.com/ommgh/portfolio"

export const SPONSORSHIP_URL = "https://github.com/sponsors/ommgh"

export const UTM_PARAMS = {
  utm_source: "ommishra.in",
  utm_medium: "referral",
  utm_campaign: "portfolio",
}
