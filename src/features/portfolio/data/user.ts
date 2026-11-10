import type { User } from "@/features/portfolio/types/user"

export const USER = {
  firstName: "Om Kumar",
  lastName: "Mishra",
  displayName: "Om Mishra",
  displayNameDevanagari: "ओम मिश्रा",
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
      company: "Campsunion",
      website: "https://campsunion.com",
    },
  ],

  about: `
  Full stack engineer focused on building products from 0 → production.

  Founding engineer at Campsunion, where I shipped [Stipnd](https://stipnd.app) — a React Native app, NestJS API and Next.js admin — to both app stores in 7 weeks, now serving 1,000+ users.

  Before that I founded and led [ZudLabs](https://zudlabs.com), a 5-person studio shipping web and mobile products for 10+ startups.
  `,
  avatar: "/images/omm-pf.jpg",
  ogImage: "https://assets.ommishra.in/images/brand/sc-og-dark.png",
  namePronunciationUrl: "/audio/chanhdai.mp3",
  timeZone: "Asia/Calcutta",
  keywords: [
    "omm",
    "ommishra",
    "om kumar mishra",
    "ommgh",
    "Om Kumar",
    "ommishra",
    "zud",
    "zudlabs",
    "mishra om",
    "ommshx",
  ],
  dateCreated: "2026-07-05", // YYYY-MM-DD
} satisfies User
