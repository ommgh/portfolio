import type { Registry } from "shadcn/schema";

export const blocks: Registry["items"] = [
  {
    name: "book-call-block-01",
    type: "registry:block",
    registryDependencies: ["@omm/book-call"],
    files: [
      {
        path: "examples/book-call-demo.tsx",
        type: "registry:component",
      },
    ],
  },
  {
    name: "book-call-block-02",
    type: "registry:block",
    registryDependencies: ["@omm/book-call"],
    files: [
      {
        path: "examples/book-call-demo-02.tsx",
        type: "registry:component",
      },
    ],
  },
];
