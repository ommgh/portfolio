import { GeistMono } from "geist/font/mono"
import {
  IBM_Plex_Sans as FontSans,
  IBM_Plex_Sans_Devanagari as FontDevanagari,
} from "next/font/google"

export const fontSans = FontSans({
  weight: ["400", "500", "600"],
  display: "swap",
  subsets: ["latin"],
  variable: "--font-sans",
})

/**
 * Same superfamily as the Latin face, so the Devanagari accents (section
 * numerals, the name in the profile header) sit next to the Latin text without
 * a visible change of voice.
 */
export const fontDevanagari = FontDevanagari({
  weight: ["400", "500", "600"],
  display: "swap",
  subsets: ["devanagari"],
  variable: "--font-devanagari",
})

export const fontMono = GeistMono
