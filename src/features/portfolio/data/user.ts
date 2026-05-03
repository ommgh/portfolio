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
  Hey, I’m a full stack engineer who likes building things from scratch and getting them into people’s hands. I focus on clean code, solid products, and details that actually matter.

  I run Lit Labs, where I help startups go from idea to real product, fast.
  Currently building Quickboarder — helping local merchants get online in minutes.
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
