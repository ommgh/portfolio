export type Contribution = {
  id: string;
  title: string;
  description: string;
  repository: string;
  org: string;
  link: string;
  date: string;
  bounty?: string;
  isExpanded?: boolean;
  type?: "feature" | "fix" | "perf" | "docs" | "refactor" | "test" | "chore";
  state?: "open" | "closed" | "merged";
};
