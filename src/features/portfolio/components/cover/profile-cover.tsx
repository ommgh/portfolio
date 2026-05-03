"use client"

import { type ReactNode, useEffect, useRef } from "react"

import { useEffectsPreference } from "@/hooks/use-effects-preference"

import styles from "./profile-cover.module.css"

const COVER_ANIMATIONS = [
  "ripple",
  "diagonal",
  "helix",
  "orbit",
  "signal",
] as const

type CoverAnimation = (typeof COVER_ANIMATIONS)[number]

interface CoverDot {
  x: number
  y: number
  distance: number
  diagonal: number
  helix: number
  orbit: number
  signal: number
  noise: number
}

interface CanvasSize {
  width: number
  height: number
  dpr: number
}

interface DrawOptions {
  color?: string
  dotSize: number
  cellSize: number
  speed: number
  cycleMs: number
  reducedMotion: boolean
}

export interface ProfileCoverProps {
  children?: ReactNode
  className?: string
  contentClassName?: string
  dotSize?: number
  cellSize?: number
  color?: string
  speed?: number
  cycleMs?: number
}

const DEFAULT_CANVAS_SIZE: CanvasSize = {
  width: 0,
  height: 0,
  dpr: 1,
}

const MIN_ROWS = 10
const MIN_COLS = 24
const MAX_ROWS = 44
const MAX_COLS = 96
const MAX_DEVICE_PIXEL_RATIO = 2
const TARGET_FPS = 24

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value))
}

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ")
}

function pseudoRandom(row: number, col: number) {
  const value = Math.sin((row + 1) * 127.1 + (col + 1) * 311.7) * 43758.5453
  return value - Math.floor(value)
}

function wrapUnit(value: number) {
  return ((value % 1) + 1) % 1
}

function smoothPeak(phase: number, width: number) {
  const distance = Math.min(phase, 1 - phase)
  const progress = clamp(1 - distance / width, 0, 1)

  return progress * progress * (3 - 2 * progress)
}

function buildDots(width: number, height: number, cellSize: number) {
  const safeCell = Math.max(8, cellSize)
  const rows = clamp(Math.round(height / safeCell), MIN_ROWS, MAX_ROWS)
  const cols = clamp(Math.round(width / safeCell), MIN_COLS, MAX_COLS)
  const cellWidth = width / cols
  const cellHeight = height / rows
  const centerRow = (rows - 1) / 2
  const centerCol = (cols - 1) / 2
  const maxDistance = Math.hypot(centerRow, centerCol) || 1
  const dots: CoverDot[] = []

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      const rowNorm = rows <= 1 ? 0 : row / (rows - 1)
      const colNorm = cols <= 1 ? 0 : col / (cols - 1)
      const dx = col - centerCol
      const dy = row - centerRow
      const distance = Math.hypot(dx, dy) / maxDistance
      const angle = (Math.atan2(dy, dx) + Math.PI) / (Math.PI * 2)
      const diagonal = (rowNorm + colNorm) / 2
      const antiDiagonal = (rowNorm + (1 - colNorm)) / 2
      const snake = col % 2 === 0 ? 1 - rowNorm : rowNorm
      const noise = pseudoRandom(row, col)

      dots.push({
        x: (col + 0.5) * cellWidth,
        y: (row + 0.5) * cellHeight,
        distance,
        diagonal,
        helix: (diagonal * 0.7 + antiDiagonal * 0.2 + noise * 0.1) % 1,
        orbit: (angle + distance * 0.42) % 1,
        signal: (snake * 0.65 + colNorm * 0.2 + noise * 0.15) % 1,
        noise,
      })
    }
  }

  return dots
}

function getActiveAnimation(now: number, cycleMs: number): CoverAnimation {
  const safeCycle = Math.max(1200, cycleMs)
  const index = Math.floor(now / safeCycle) % COVER_ANIMATIONS.length

  return COVER_ANIMATIONS[index] ?? COVER_ANIMATIONS[0]
}

function getDotOpacity(
  dot: CoverDot,
  now: number,
  animation: CoverAnimation,
  speed: number,
  reducedMotion: boolean
) {
  const baseOpacity = 0.045 + dot.noise * 0.045 + dot.distance * 0.025

  if (reducedMotion) {
    return 0.07 + dot.noise * 0.1
  }

  const speedScale = 1 / Math.max(0.2, speed)
  const elapsed = now

  if (animation === "ripple") {
    const phase = wrapUnit(elapsed / (1500 * speedScale) - dot.distance * 1.25)
    const pulse = smoothPeak(phase, 0.16)

    return clamp(
      baseOpacity + pulse * (0.56 + (1 - dot.distance) * 0.2),
      0,
      0.9
    )
  }

  if (animation === "diagonal") {
    const phase = wrapUnit(elapsed / (1750 * speedScale) - dot.diagonal * 1.3)
    const pulse = smoothPeak(phase, 0.1)

    return clamp(baseOpacity + pulse * 0.7, 0, 0.86)
  }

  if (animation === "helix") {
    const phase = wrapUnit(elapsed / (2100 * speedScale) - dot.helix * 1.35)
    const pulse = smoothPeak(phase, 0.13)

    return clamp(baseOpacity + pulse * 0.76, 0, 0.9)
  }

  if (animation === "orbit") {
    const phase = wrapUnit(elapsed / (2350 * speedScale) - dot.orbit * 1.35)
    const pulse = smoothPeak(phase, 0.09)

    return clamp(baseOpacity + pulse * 0.8, 0, 0.92)
  }

  const phase = wrapUnit(elapsed / (1900 * speedScale) - dot.signal)
  const step = Math.floor(phase * 8)
  const pulse = [0, 0.12, 0.68, 0.14, 0.78, 0.08, 0.34, 0.04][step] ?? 0

  return clamp(baseOpacity + pulse + dot.noise * 0.05, 0, 0.9)
}

function readCanvasColor(
  container: HTMLDivElement,
  context: CanvasRenderingContext2D,
  color?: string
) {
  const computed = window.getComputedStyle(container)
  const themeFallback = document.documentElement.classList.contains("dark")
    ? "#fafafa"
    : "#09090b"
  const fallback = computed.color || themeFallback
  const nextColor =
    color && color.trim() && color.trim() !== "currentColor"
      ? color.trim()
      : fallback

  context.fillStyle = themeFallback
  context.fillStyle = fallback
  context.fillStyle = nextColor

  return context.fillStyle
}

function drawCover(
  context: CanvasRenderingContext2D,
  dots: CoverDot[],
  size: CanvasSize,
  options: DrawOptions,
  color: string,
  now = performance.now()
) {
  if (size.width <= 0 || size.height <= 0) {
    return
  }

  const dotBaseSize = clamp(options.dotSize, 1, options.cellSize * 0.7)
  const activeAnimation = getActiveAnimation(now, options.cycleMs)

  context.clearRect(0, 0, size.width, size.height)
  context.fillStyle = color

  for (const dot of dots) {
    const opacity = getDotOpacity(
      dot,
      now,
      activeAnimation,
      options.speed,
      options.reducedMotion
    )
    const drawSize = dotBaseSize * (0.8 + opacity * 0.36)

    context.globalAlpha = opacity
    context.fillRect(
      dot.x - drawSize / 2,
      dot.y - drawSize / 2,
      drawSize,
      drawSize
    )
  }

  context.globalAlpha = 1
}

function useProfileCoverCanvas(
  containerRef: React.RefObject<HTMLDivElement | null>,
  canvasRef: React.RefObject<HTMLCanvasElement | null>,
  {
    cellSize,
    color: customColor,
    cycleMs,
    dotSize,
    reducedMotion,
    speed,
  }: DrawOptions
) {
  useEffect(() => {
    const container = containerRef.current
    const canvas = canvasRef.current
    const options = {
      cellSize,
      color: customColor,
      cycleMs,
      dotSize,
      reducedMotion,
      speed,
    }

    if (!container || !canvas) {
      return
    }

    const context = canvas.getContext("2d", { alpha: true })

    if (!context) {
      return
    }

    let size = DEFAULT_CANVAS_SIZE
    let dots: CoverDot[] = []
    let color = readCanvasColor(container, context, options.color)
    let isInView = true
    let isDocumentVisible = document.visibilityState === "visible"
    let animationFrame: number | undefined
    let frameTimer: number | undefined

    const cancelNextFrame = () => {
      if (animationFrame !== undefined) {
        window.cancelAnimationFrame(animationFrame)
        animationFrame = undefined
      }

      if (frameTimer !== undefined) {
        window.clearTimeout(frameTimer)
        frameTimer = undefined
      }
    }

    const shouldAnimate = () =>
      !options.reducedMotion &&
      isInView &&
      isDocumentVisible &&
      size.width > 0 &&
      size.height > 0

    const draw = (now = performance.now()) => {
      drawCover(context, dots, size, options, color, now)
    }

    const queueNextFrame = () => {
      if (
        !shouldAnimate() ||
        animationFrame !== undefined ||
        frameTimer !== undefined
      ) {
        return
      }

      frameTimer = window.setTimeout(() => {
        frameTimer = undefined
        animationFrame = window.requestAnimationFrame((now) => {
          animationFrame = undefined
          draw(now)
          queueNextFrame()
        })
      }, 1000 / TARGET_FPS)
    }

    const resize = () => {
      const rect = container.getBoundingClientRect()
      const width = Math.max(0, Math.round(rect.width))
      const height = Math.max(0, Math.round(rect.height))
      const dpr = clamp(window.devicePixelRatio || 1, 1, MAX_DEVICE_PIXEL_RATIO)
      const nextSize = { width, height, dpr }

      if (
        size.width === nextSize.width &&
        size.height === nextSize.height &&
        size.dpr === nextSize.dpr
      ) {
        return
      }

      size = nextSize
      canvas.width = Math.max(1, Math.round(width * dpr))
      canvas.height = Math.max(1, Math.round(height * dpr))
      context.setTransform(dpr, 0, 0, dpr, 0, 0)
      dots = buildDots(width, height, options.cellSize)
    }

    const refresh = () => {
      color = readCanvasColor(container, context, options.color)
      resize()
      draw()
      cancelNextFrame()
      queueNextFrame()
    }

    const resizeObserver = new ResizeObserver(refresh)
    resizeObserver.observe(container)

    const intersectionObserver = new IntersectionObserver(([entry]) => {
      isInView = entry?.isIntersecting ?? true

      if (isInView) {
        refresh()
      } else {
        cancelNextFrame()
      }
    })
    intersectionObserver.observe(container)

    const themeObserver = new MutationObserver(refresh)
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class", "style"],
    })

    const handleVisibilityChange = () => {
      isDocumentVisible = document.visibilityState === "visible"

      if (isDocumentVisible) {
        refresh()
      } else {
        cancelNextFrame()
      }
    }

    document.addEventListener("visibilitychange", handleVisibilityChange)
    refresh()

    return () => {
      cancelNextFrame()
      resizeObserver.disconnect()
      intersectionObserver.disconnect()
      themeObserver.disconnect()
      document.removeEventListener("visibilitychange", handleVisibilityChange)
    }
  }, [
    canvasRef,
    cellSize,
    containerRef,
    customColor,
    cycleMs,
    dotSize,
    reducedMotion,
    speed,
  ])
}

export function ProfileCover({
  children,
  className,
  contentClassName,
  dotSize = 3,
  cellSize = 12,
  color,
  speed = 1,
  cycleMs = 4200,
}: ProfileCoverProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { reducedEffects } = useEffectsPreference()

  useProfileCoverCanvas(containerRef, canvasRef, {
    cellSize,
    color,
    cycleMs,
    dotSize,
    reducedMotion: reducedEffects,
    speed,
  })

  return (
    <div ref={containerRef} className={cx(styles.cover, className)}>
      <div className={styles.surface} aria-hidden="true">
        <canvas ref={canvasRef} className={styles.canvas} />
      </div>

      <div className={cx(styles.content, contentClassName)}>{children}</div>
    </div>
  )
}
