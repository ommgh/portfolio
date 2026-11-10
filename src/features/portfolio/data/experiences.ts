import type { Experience } from "../types/experiences"

export const EXPERIENCES: Experience[] = [
  {
    id: "camps-union",
    companyName: "Campsunion",
    isCurrentEmployer: true,
    positions: [
      {
        id: "camps-union-fullstack",
        title: "Full Stack Developer",
        employmentPeriod: {
          start: "05.2026",
        },
        employmentType: "Full-time",
        description: `- Founding engineer on **Stipnd** — shipped the React Native app, NestJS API and Next.js admin to both stores in **7 weeks**, now **1,000+ users**.
- Razorpay payments and payouts on an idempotent wallet ledger.
- In-app community — posts, votes, real-time DMs, moderation — in **6 days**.
- Gemini vision pipeline turning selfies into compliant passport photos, verified through DigiLocker.
- Kotlin native modules for Play Store attribution and in-app updates.
- 4 repos unified into a Turborepo monorepo with **1,400+ tests** and CI/CD.`,
        skills: [
          "React Native",
          "NestJS",
          "Next.js",
          "TypeScript",
          "Kotlin",
          "PostgreSQL",
          "Prisma",
          "Turborepo",
          "Gemini API",
        ],
      },
    ],
  },
  {
    id: "zudlabs",
    companyName: "ZudLabs",
    positions: [
      {
        id: "zudlabs-founding-engineer",
        title: "Founding Engineer",
        employmentPeriod: {
          start: "07.2024",
          end: "01.2026",
        },
        employmentType: "Full-time",
        description: `- Founded and led a 5-person studio shipping web and mobile for **10+ startups**.
- A React design system used across every client project — **40% faster** search, **2x** inbound leads.
- Scaled WebSocket features to **1,000+ concurrent users** at sub-100ms latency.
- Cut LCP under **1.8s** with code splitting and memoisation.`,
        skills: [
          "React",
          "Next.js",
          "TypeScript",
          "WebSockets",
          "Design Systems",
          "Team Leadership",
        ],
      },
    ],
  },
]
