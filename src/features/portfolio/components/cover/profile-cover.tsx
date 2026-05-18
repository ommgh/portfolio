"use client"

import { DotPattern } from "@/components/magicui/dot-pattern"
import { FlickeringGrid } from "@/components/magicui/flickering-grid"
import { useEffectsPreference } from "@/hooks/use-effects-preference"

export function ProfileCover() {
  const { reducedEffects } = useEffectsPreference()

  return (
    <div className="group screen-line-before screen-line-after relative aspect-5/2 border-x border-edge p-4 before:-top-px after:-bottom-px sm:aspect-[10/3]">
      {reducedEffects ? (
        <>
          <DotPattern className="dark:hidden" />
          <DotPattern className="hidden text-white/40 dark:block" />
        </>
      ) : (
        <>
          <FlickeringGrid className="dark:hidden" />
          <FlickeringGrid
            className="hidden dark:block"
            color="rgb(255, 255, 255)"
          />
        </>
      )}
    </div>
  )
}
