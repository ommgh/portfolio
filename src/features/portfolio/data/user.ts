import type { User } from "@/features/portfolio/types/user"

export const USER = {
  firstName: "Om Kumar",
  lastName: "Mishra",
  displayName: "Om Mishra",
  username: "omm",
  gender: "male",
  pronouns: "he/him",
  bio: "Creating with code. Small details matter.",
  flipSentences: [
    "Full Stack Developer",
    "Design Engineer",
    "Open Source Contributor",
  ],
  address: "India",
  phoneNumber: "NjI5OTkyMTA5MQ==", // E.164 format, base64 encoded (https://t.io.vn/base64-string-converter)
  email: "b21Ab21taXNocmEuaW4=", // base64 encoded
  website: "https://ommishra.in",
  jobTitle: "Full Stack Developer",
  jobs: [
    {
      title: "Full Stack Developer",
      company: "Zud Labs",
      website: "https://zudlabs.com",
    },
  ],

  about: `
  Full stack engineer focused on building products from 0 → production.

  Built and led __ZudLabs__ shipping web and mobile apps for 10+ founders with a team of 5.

  Contributed to open-source, won bounties, and built multiple products across AI, developer tools, and frontend systems.

  Currently building [Onboarder](https://onboarder.store) — platform that enables local merchants to make their products e-commerce ready in minutes.
  `,
  avatar: "/images/omm-pf.jpg",
  ogImage: "https://assets.ommishra.in/images/screenshot-og-dark.png",
  namePronunciationUrl: "/audio/chanhdai.mp3",
  timeZone: "Asia/Calcutta",
  keywords: [
    "omm",
    "ommishra",
    "om kumar mishra",
    "ommgh",
    "Om Kumar",
    "ommishra",
    "lit",
    "launchit",
    "mishra om",
    "ommshx",
  ],
  dateCreated: "2026-06-15", // YYYY-MM-DD
} satisfies User
