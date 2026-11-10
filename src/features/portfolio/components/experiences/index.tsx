import React from "react"

import { EXPERIENCES } from "../../data/experiences"
import { Panel, PanelHeader, PanelTitle } from "../panel"
import { ExperienceItem } from "./experience-item"

export function Experiences() {
  return (
    <Panel id="experience">
      <PanelHeader>
        <PanelTitle>Experience</PanelTitle>
      </PanelHeader>

      <div className="px-4">
        {/*
          One kolam thread runs the whole length of the section — the companies
          and the roles under them are pulli strung on it. It lives here rather
          than on each item so it never breaks between companies.
        */}
        <div className="relative before:absolute before:inset-y-0 before:left-[9px] before:w-(--rule-thickness) before:bg-(image:--rule-v) before:bg-[length:var(--rule-thickness)_var(--rule-pitch)] before:bg-repeat-y">
          {EXPERIENCES.map((experience) => (
            <ExperienceItem key={experience.id} experience={experience} />
          ))}
        </div>
      </div>
    </Panel>
  )
}
