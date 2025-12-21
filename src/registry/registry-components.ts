import type { Registry } from "shadcn/schema";

export const components: Registry["items"] = [
  {
    name: "book-call",
    type: "registry:component",
    description:
      "A simple call-to-action button for booking meetings with a subtle hover animation.",
    title: "Book Call",
    author: "ommishra <om@ommishra.me>",
    dependencies: ["lucide-react"],
    registryDependencies: ["@omm/utils"],
    files: [
      {
        path: "book-call/book-call.tsx",
        type: "registry:component",
      },
    ],
    docs: "https://ommishra.me/components/book-call",
  },
];
