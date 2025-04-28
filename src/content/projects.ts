interface Project {
  title: string;
  description: string;
  date: string;
  github: string;
}

export const projects: Project[] = [
  {
    title: "QuickBoarder",
    description: "Catalogue Digitization For Local Businesses",
    date: "2024-03-01",
    github: "https://quickboarder.shop",
  },
  {
    title: "SuperDocs",
    description: "Turn websites into LLM-ready data",
    date: "2024-05-01",
    github: "https://superdocs.xyz",
  },
  {
    title: "BioShop",
    description: "Organised Store for Affiliate Products",
    date: "2024-04-01",
    github: "https://bioshop.vercel.app",
  },
];
