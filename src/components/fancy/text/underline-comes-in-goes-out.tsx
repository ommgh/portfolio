/* eslint-disable react-hooks/exhaustive-deps */
"use client"
import cn from "clsx"
import type { Transition } from "motion/react"
import { motion, useAnimationControls } from "motion/react"
import type { ComponentPropsWithoutRef, ElementType, ReactNode } from "react"
import { useEffect, useMemo, useRef, useState } from "react"

interface ComesInGoesOutUnderlineProps {
  children: ReactNode
  as?: ElementType
  direction?: "left" | "right"
  className?: string
  underlineHeightRatio?: number
  underlinePaddingRatio?: number
  transition?: Transition
  trigger?: "hover" | "parent"
  parentSelector?: string
}

const ComesInGoesOutUnderline = ({
  children,
  as,
  direction = "left",
  className,
  underlineHeightRatio = 0.1,
  underlinePaddingRatio = 0.01,
  transition = {
    duration: 0.4,
    ease: "easeInOut",
  },
  trigger = "parent",
  parentSelector = "a",
  ...props
}: ComesInGoesOutUnderlineProps & ComponentPropsWithoutRef<"span">) => {
  const controls = useAnimationControls()
  const [blocked, setBlocked] = useState(false)
  const textRef = useRef<HTMLSpanElement>(null)
  const isMounted = useRef(true)
  const MotionComponent = useMemo(() => motion.create(as ?? "span"), [as])

  useEffect(() => {
    return () => {
      isMounted.current = false
    }
  }, [])

  useEffect(() => {
    const updateUnderlineStyles = () => {
      if (textRef.current) {
        const fontSize = parseFloat(getComputedStyle(textRef.current).fontSize)
        const underlineHeight = fontSize * underlineHeightRatio
        const underlinePadding = fontSize * underlinePaddingRatio
        textRef.current.style.setProperty(
          "--underline-height",
          `${underlineHeight}px`
        )
        textRef.current.style.setProperty(
          "--underline-padding",
          `${underlinePadding}px`
        )
      }
    }

    updateUnderlineStyles()
    window.addEventListener("resize", updateUnderlineStyles)
    return () => window.removeEventListener("resize", updateUnderlineStyles)
  }, [underlineHeightRatio, underlinePaddingRatio])

  const animateIn = async () => {
    if (blocked || !isMounted.current) return
    setBlocked(true)
    await controls.start({
      width: "100%",
      transition,
      transitionEnd: {
        left: direction === "left" ? "auto" : 0,
        right: direction === "left" ? 0 : "auto",
      },
    })
    setBlocked(false)
  }

  const animateOut = async () => {
    if (!isMounted.current) return
    controls.stop()
    await controls.start({
      width: 0,
      transition,
      transitionEnd: {
        left: direction === "left" ? 0 : "auto",
        right: direction === "left" ? "auto" : 0,
      },
    })
  }

  useEffect(() => {
    if (trigger !== "parent") return

    const target = textRef.current?.closest(parentSelector)
    if (!target) return

    const handleEnter = () => void animateIn()
    const handleLeave = () => void animateOut()

    target.addEventListener("mouseenter", handleEnter)
    target.addEventListener("focusin", handleEnter)
    target.addEventListener("mouseleave", handleLeave)
    target.addEventListener("focusout", handleLeave)

    return () => {
      target.removeEventListener("mouseenter", handleEnter)
      target.removeEventListener("focusin", handleEnter)
      target.removeEventListener("mouseleave", handleLeave)
      target.removeEventListener("focusout", handleLeave)
    }
  }, [parentSelector, trigger])

  return (
    <MotionComponent
      className={cn("relative inline-block", className)}
      onHoverStart={trigger === "hover" ? animateIn : undefined}
      onHoverEnd={trigger === "hover" ? animateOut : undefined}
      ref={textRef}
      {...props}
    >
      <span>{children}</span>
      <motion.span
        className={cn("absolute w-0 bg-current", {
          "left-0": direction === "left",
          "right-0": direction === "right",
        })}
        style={{
          height: "var(--underline-height)",
          bottom: "calc(1 * var(--underline-padding))",
        }}
        animate={controls}
        aria-hidden="true"
      />
    </MotionComponent>
  )
}

ComesInGoesOutUnderline.displayName = "ComesInGoesOutUnderline"

export default ComesInGoesOutUnderline
