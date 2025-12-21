import { visit } from "unist-util-visit";

import type { UnistNode, UnistTree } from "@/types/unist";

export function rehypeMermaid() {
  return (tree: UnistTree) => {
    visit(tree, "element", (node: UnistNode, index, parent) => {
      // Look for pre > code elements with language-mermaid class
      if (node.tagName !== "pre") return;

      const codeElement = node.children?.find(
        (child: UnistNode) => child.tagName === "code"
      );

      if (!codeElement) return;

      const className = codeElement.properties?.className;
      const isMermaid =
        Array.isArray(className) && className.includes("language-mermaid");

      if (!isMermaid) return;

      // Get the mermaid code content
      const textNode = codeElement.children?.find(
        (child: UnistNode) => child.type === "text"
      );

      if (!textNode?.value) return;

      const mermaidCode = textNode.value.trim();

      // Replace the pre element with our custom Mermaid component
      // This creates an MDX component node that will be rendered by the Mermaid component
      const mermaidNode: UnistNode = {
        type: "mdxJsxFlowElement",
        name: "Mermaid",
        attributes: [
          {
            type: "mdxJsxAttribute",
            name: "chart",
            value: mermaidCode,
          },
        ],
        children: [],
      };

      // Replace the current node with the Mermaid component
      if (parent && typeof index === "number") {
        (parent.children as UnistNode[])[index] = mermaidNode;
      }
    });
  };
}
