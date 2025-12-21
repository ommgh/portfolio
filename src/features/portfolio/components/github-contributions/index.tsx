import { Suspense } from "react";

import { CollapsibleList } from "@/components/collapsible-list";

import { CONTRIBUTIONS } from "../../data/contributions";
import { getGitHubContributions } from "../../data/github-contributions";
import { Panel, PanelHeader, PanelTitle } from "../panel";
import { GitHubContributionFallback, GitHubContributionGraph } from "./graph";
import { PRItem } from "./pr-item";

export function GitHubContributions() {
  const contributions = getGitHubContributions();

  return (
    <Panel>
      <h2 className="sr-only">GitHub Contributions</h2>
      <PanelHeader>
        <PanelTitle>Open Source Contributions</PanelTitle>
      </PanelHeader>
      <CollapsibleList
        items={CONTRIBUTIONS}
        max={4}
        renderItem={(item) => <PRItem contribution={item} />}
      />
      <Suspense fallback={<GitHubContributionFallback />}>
        <GitHubContributionGraph contributions={contributions} />
      </Suspense>
    </Panel>
  );
}
