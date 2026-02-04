"use client"

import { cn } from "@/lib/utils"
import { motion, MotionStyle, Transition } from "motion/react"
import { useTheme } from "next-themes"
import { useMemo } from "react"

interface BorderBeamProps {
  size?: number
  duration?: number
  delay?: number
  colorFrom?: string
  colorTo?: string
  transition?: Transition
  className?: string
  style?: React.CSSProperties
  reverse?: boolean
  initialOffset?: number
}

export const BorderBeam = ({
  className,
  size = 50,
  delay = 0,
  duration = 6,
  colorFrom,
  colorTo,
  transition,
  style,
  reverse = false,
  initialOffset = 0,
}: BorderBeamProps) => {
  const { resolvedTheme } = useTheme()

  const [finalColorFrom, finalColorTo] = useMemo(() => {
    const isDark = resolvedTheme === "dark"
    return [
      colorFrom || (isDark ? "#ffffff" : "#ffffff"),
      colorTo || (isDark ? "#2772ed" : "#2772ed"),
    ]
  }, [colorFrom, colorTo, resolvedTheme])

  return (
    <div className="pointer-events-none absolute inset-0 rounded-[inherit] border border-transparent [mask-clip:padding-box,border-box] [mask-composite:intersect] [mask-image:linear-gradient(transparent,transparent),linear-gradient(#000,#000)]">
      <motion.div
        className={cn(
          "absolute aspect-square",
          "bg-gradient-to-l from-[var(--color-from)] via-[var(--color-to)] to-transparent",
          className,
        )}
        style={
          {
            width: size,
            offsetPath: `rect(0 auto auto 0 round ${size}px)`,
            "--color-from": finalColorFrom,
            "--color-to": finalColorTo,
            ...style,
          } as MotionStyle
        }
        initial={{ offsetDistance: `${initialOffset}%` }}
        animate={{
          offsetDistance: reverse
            ? [`${100 - initialOffset}%`, `${-initialOffset}%`]
            : [`${initialOffset}%`, `${100 + initialOffset}%`],
        }}
        transition={{
          repeat: Infinity,
          ease: "linear",
          duration,
          delay: -delay,
          ...transition,
        }}
      />
    </div>
  )
}
