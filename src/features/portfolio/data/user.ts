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
  email: "b21Ab21taXNocmEubWU=", // base64 encoded
  website: "https://ommishra.me",
  jobTitle: "Full Stack Developer",
  jobs: [
    {
      title: "Founder",
      company: "Lit Labs",
      website: "https://launchit.today",
    },
  ],

  about: `
  Full stack engineer focused on building products from 0 → production.

  Built and led [Lit Labs](https://launchit.today) shipping web and mobile apps for 10+ clients with a team of 5.

  Contributed to open-source, won bounties, and built multiple products across AI, developer tools, and frontend systems.

  Currently building [Onboarder](https://onboarder.store) — platform that enables local merchants to make their products e-commerce ready in minutes.
  `,
  avatar: "https://assets.ommishra.me/images/om-avatar.jpg",
  ogImage: "https://assets.ommishra.me/images/screenshot-og-dark.png",
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
  dateCreated: "2025-12-20", // YYYY-MM-DD
} satisfies User
