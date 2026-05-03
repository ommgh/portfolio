import { useCallback, useEffect, useRef } from "react"

import { useEffectsPreference } from "@/hooks/use-effects-preference"

/**
 * Custom React hook to load and play a sound from a given URL using the Web Audio API.
 *
 * This hook fetches the audio file at the specified URL, decodes it, and prepares it for playback.
 * It returns a `play` function that can be called to play the loaded sound.
 *
 * @param url - The URL of the audio file to load and play.
 * @returns A function that, when called, plays the loaded sound.
 *
 * @remarks
 * - If reduced effects are enabled, audio is not loaded or played.
 * - If the Web Audio API is not supported in the browser, a warning is logged and playback is disabled.
 * - The audio context and buffer are managed internally using React refs.
 * - Errors during fetching or decoding the audio are logged to the console.
 *
 * @example
 * ```tsx
 * const playClick = useSound('/sounds/click.mp3');
 * // Later in an event handler:
 * playClick();
 * ```
 */
export function useSound(url: string) {
  const { reducedEffects } = useEffectsPreference()
  const audioCtxRef = useRef<AudioContext | null>(null)
  const bufferRef = useRef<AudioBuffer | null>(null)

  useEffect(() => {
    if (reducedEffects) {
      bufferRef.current = null
      void audioCtxRef.current?.close()
      audioCtxRef.current = null
      return
    }

    const AudioContextClass =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext })
        .webkitAudioContext

    if (!AudioContextClass) {
      console.warn("Web Audio API is not supported in this browser.")
      return
    }

    let cancelled = false
    const audioCtx = new AudioContextClass()
    audioCtxRef.current = audioCtx

    fetch(url)
      .then((res) => res.arrayBuffer())
      .then((data) => audioCtx.decodeAudioData(data))
      .then((decoded) => {
        if (!cancelled) {
          bufferRef.current = decoded
        }
      })
      .catch((err) => {
        if (!cancelled) {
          console.log(`Failed to load click sound from ${url}:`, err)
        }
      })

    return () => {
      cancelled = true
      bufferRef.current = null

      if (audioCtxRef.current === audioCtx) {
        audioCtxRef.current = null
      }

      void audioCtx.close()
    }
  }, [reducedEffects, url])

  const play = useCallback(
    (volume: number = 1) => {
      const audioCtx = audioCtxRef.current
      const buffer = bufferRef.current

      if (reducedEffects || !audioCtx || !buffer) {
        return
      }

      if (audioCtx.state === "suspended") {
        void audioCtx.resume()
      }

      const source = audioCtx.createBufferSource()
      const gainNode = audioCtx.createGain()

      source.buffer = buffer
      gainNode.gain.value = volume

      source.connect(gainNode)
      gainNode.connect(audioCtx.destination)
      source.start(0)
    },
    [reducedEffects]
  )

  return play
}
