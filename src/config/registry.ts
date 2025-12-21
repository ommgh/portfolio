export const registryConfig = {
  /**
   * Registry namespace identifier for shadcn CLI
   * @example "@omm" - Users can install components with: `npx shadcn add @omm/book-call`
   * @see https://ui.shadcn.com/docs/registry/namespace#overview
   */
  namespace: process.env.REGISTRY_NAMESPACE || "@omm",
  /**
   * URL pattern for resolving namespaced components
   * The {name} placeholder will be replaced with the component name
   * @example "https://ommishra.me/r/{name}.json" resolves to "https://ommishra.me/r/book-call.json"
   * This tells shadcn CLI where to fetch component definitions when installing with namespace prefix
   * @see https://ui.shadcn.com/docs/registry/namespace#url-pattern-system
   */
  namespaceUrl:
    process.env.REGISTRY_NAMESPACE_URL || "https://ommishra.me/r/{name}.json",
};
