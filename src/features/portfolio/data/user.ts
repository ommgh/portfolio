import type { User } from "@/features/portfolio/types/user";

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
  - **Full Stack Engineer** focused on shipping production-grade software that solves real-world problems, with hands-on experience building and scaling MVPs from zero to launch.
  - Founder & Lead Engineer at [Lit Labs](https://lauchit.today), partnering with early-stage startups to architect, build, and deploy industry-ready products with speed and technical rigor.
  - **Open source contributor** to [Firecrawl](https://github.com/firecrawl/fire-enrich/pull/16)
    - Earned a **$125 bounty** for a production-impacting PR
  - **National Finalist — Amazon Sambhav Hackathon 2024**
    - Selected among **100,000+ teams** nationwide for problem-solving and execution excellence
  - Currently building [Quickboarder](https://quickboarder.shop) — a platform that enables local merchants to make their products e-commerce ready in minutes, bridging offline businesses to online distribution.
  `,
  avatar: "https://assets.ommishra.me/images/om-avatar.jpg",
  ogImage:
    "https://assets.chanhdai.com/images/screenshot-og-image-light.png?t=1764345394",
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
} satisfies User;
