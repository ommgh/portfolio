import { cn } from "@/lib/utils"

import { generateKolam } from "./kolam"
import styles from "./kolam-cover.module.css"

const CELL = 24

export interface KolamCoverProps {
  className?: string
  /** Same seed, same kolam — so server and client render identically. */
  seed?: string
  cols?: number
  rows?: number
}

/**
 * The cover band: a pulli kolam drawn across the top of the page, the way one is
 * drawn across a threshold.
 *
 * Deliberately a server component. The geometry is generated at render time and
 * the draw-in runs on CSS alone, so this ships no JavaScript at all — it
 * replaces a client canvas that was running a requestAnimationFrame loop.
 */
export function KolamCover({
  className,
  seed = "ommishra",
  // 22x6 cells gives a 23:7 frame (~3.29), near the 10/3 cover ratio, so
  // `slice` crops only a sliver.
  cols = 22,
  rows = 6,
}: KolamCoverProps) {
  const kolam = generateKolam({ cols, rows, cell: CELL, seed })

  // Accent the longest orbit: it's the most legible line in the weave, so the
  // one touch of colour lands somewhere the eye already follows.
  const accentIndex = kolam.loops.reduce(
    (best, loop, index) =>
      loop.length > kolam.loops[best]!.length ? index : best,
    0
  )

  return (
    <div
      className={cn(
        "group screen-line-before screen-line-after relative aspect-5/2 border-x border-edge before:-top-px after:-bottom-px sm:aspect-10/3",
        styles.cover,
        className
      )}
    >
      <svg
        className={styles.svg}
        viewBox={kolam.viewBox}
        preserveAspectRatio="xMidYMid slice"
        aria-hidden="true"
        focusable="false"
      >
        {kolam.dots.map((dot, index) => (
          <circle
            key={`dot-${index}`}
            className={styles.dot}
            cx={dot.x}
            cy={dot.y}
            r={1.1}
          />
        ))}

        {kolam.loops.map((loop, index) => (
          <path
            key={`loop-${index}`}
            className={cn(styles.loop, index === accentIndex && styles.accent)}
            d={loop.d}
            style={
              {
                "--kolam-length": loop.length.toFixed(1),
                // Stagger the orbits so the kolam appears to be drawn by hand
                // rather than switched on.
                "--kolam-delay": `${index * 90}ms`,
              } as React.CSSProperties
            }
          />
        ))}
      </svg>

      <div className={styles.fade} aria-hidden="true" />
    </div>
  )
}
