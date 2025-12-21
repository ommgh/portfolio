import type { Registry } from "shadcn/schema";

export const examples: Registry["items"] = [
  {
    name: "book-call-demo",
    type: "registry:example",
    registryDependencies: ["@omm/book-call"],
    files: [
      {
        path: "examples/book-call-demo.tsx",
        type: "registry:example",
      },
    ],
  },
  {
    name: "book-call-demo-02",
    type: "registry:example",
    registryDependencies: ["@omm/book-call"],
    files: [
      {
        path: "examples/book-call-demo-02.tsx",
        type: "registry:example",
      },
    ],
  },
];
