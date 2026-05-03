import { Markdown } from "@/components/markdown"
import { ProseMono } from "@/components/ui/typography"
import { USER } from "@/features/portfolio/data/user"

import { Panel, PanelContent } from "./panel"

export function About() {
  return (
    <Panel id="about">
      <PanelContent>
        <ProseMono>
          <Markdown>{USER.about}</Markdown>
        </ProseMono>
      </PanelContent>
    </Panel>
  )
}
