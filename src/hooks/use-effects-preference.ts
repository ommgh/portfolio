"use client"

import { useAtom } from "jotai"
import { atomWithStorage } from "jotai/utils"
import { useCallback, useEffect } from "react"

import { useMediaQuery } from "@/hooks/use-media-query"

export type EffectsPreference = "system" | "full" | "reduced"

const effectsPreferenceAtom = atomWithStorage<EffectsPreference>(
  "effects_preference",
  "system"
)

export function useEffectsPreference() {
  const [preference, setPreference] = useAtom(effectsPreferenceAtom)
  const systemPrefersReducedMotion = useMediaQuery(
    "(prefers-reduced-motion: reduce)"
  )
  const reducedEffects =
    preference === "reduced" ||
    (preference === "system" && systemPrefersReducedMotion)

  useEffect(() => {
    document.documentElement.dataset.reducedEffects = String(reducedEffects)
  }, [reducedEffects])

  const toggleReducedEffects = useCallback(() => {
    setPreference((current) => {
      const currentlyReduced =
        current === "reduced" ||
        (current === "system" && systemPrefersReducedMotion)

      return currentlyReduced ? "full" : "reduced"
    })
  }, [setPreference, systemPrefersReducedMotion])

  return {
    preference,
    reducedEffects,
    setPreference,
    systemPrefersReducedMotion,
    toggleReducedEffects,
  }
}
