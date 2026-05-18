"use client"

import { Volume2Icon, VolumeXIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { useEffectsPreference } from "@/hooks/use-effects-preference"
import { useSound } from "@/hooks/use-sound"

export function EffectsToggle() {
  const { reducedEffects, toggleReducedEffects } = useEffectsPreference()
  const playClick = useSound("/audio/click.wav")
  const label = reducedEffects
    ? "Enable Motion & Audio"
    : "Reduce Motion & Mute Audio"

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          aria-label={label}
          aria-pressed={reducedEffects}
          onClick={() => {
            playClick(0.5)
            toggleReducedEffects()
          }}
        >
          {reducedEffects ? <VolumeXIcon /> : <Volume2Icon />}
          <span className="sr-only">{label}</span>
        </Button>
      </TooltipTrigger>

      <TooltipContent>{label}</TooltipContent>
    </Tooltip>
  )
}
