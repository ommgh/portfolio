export interface Project {
  title: string;
  description: string;
  tags: string[];
  url?: string;
  githubUrl?: string;
  logo: string | (({ className }: { className: string }) => JSX.Element);
  showOnHomepage?: boolean;
  hackathon?: boolean;
}

export const projects: Project[] = [
  {
    title: "BashCraft",
    description: "A community for devs who loves CLI & LINUX",
    tags: [],
    url: "https://bashcraft.club",
    githubUrl: "https://github.com/BashCraftClub/bashcraft",
    logo: "/bashcraft-logo.png",
    showOnHomepage: true,
  },
  {
    title: "NEX MCF",
    description:
      "A versatile tool for e-commerce sellers to manage different channels",
    tags: ["Next.js", "RPC", "Shopify API", "Shadcn/UI"],
    url: "https://nexmcf.vercel.app",
    githubUrl: "https://github.vom/ommgh/dashboard",
    logo: "/nexmcf.png",
    showOnHomepage: true,
  },

  {
    title: "Vistaar",
    description: "AI-Powered Frame Interpolation Engine for I.S.R.O",
    tags: [],
    url: "https://projectvistaar.vercel.app",
    githubUrl: "https://github.com/ommgh/vistaar",
    logo: "/vistaar.png",
    showOnHomepage: false,
  },
  {
    title: "Connect 4",
    description: "A MultiPlayer Game, To Fight For The Fist 4 Steps",
    tags: ["Next.js", "Tailwind CSS", "Supabase", "Shadcn/UI"],
    url: "https://connectfour-chi.vercel.app",
    logo: "/connect.png",
    showOnHomepage: false,
  },
  {
    title: "YardstoAcres",
    description: "A MarketPlace For Buying,Selling And Renting Properties",
    tags: [],
    url: "https://yardstoacres.com",
    logo: "/yard.png",
    hackathon: true,
  },
  {
    title: "NexaBetX",
    description: "A Betting Platform With Multiple Games, Play & Win",
    tags: ["Next.js", "Recoil", "Canvas", "NextAuth", "Shadcn/UI"],
    url: "https://nexabetx.vercel.app",
    logo: "/nexabet.png",
    hackathon: true,
  },
  {
    title: "Quickboarder",
    description: "Catalogue Digitilization For Local Commerce",
    tags: ["Postgre SQL", "Next.js", "Tailwind", "Typescript"],
    url: "https://scan2sell.vercel.app/",
    githubUrl: "https://github.com/QuickBoarder/scan2sell",
    logo: "/quick.png",
  },
  {
    title: "Devtown",
    description: "A Social Media Application For Developers",
    tags: [
      "Next.js",
      "Tailwind CSS",
      "Solidity",
      "Polygon",
      "Prisma",
      "PostgreSQL",
    ],
    githubUrl: "https://github.com/ommgh/devtown",
    logo: "/devtown.png",
  },
];
