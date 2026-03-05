"use client"
import { useEffect } from "react"
import { useMotionValue, useTransform, motion, animate } from "framer-motion"
interface CounterProps {
    value: number
    formatter?: (value: number) => string
    className?: string
    prefix?: string
    suffix?: string
}
export function Counter({ value, formatter, className, prefix = "", suffix = "" }: CounterProps) {
    const motionValue = useMotionValue(value)
    useEffect(() => {
        const controls = animate(motionValue, value, {
            duration: 0.5,
            ease: "easeOut"
        })
        return controls.stop
    }, [value, motionValue])
    const displayValue = useTransform(motionValue, (latest) => {
        if (formatter) {
            return formatter(latest)
        }
        return Math.round(latest).toLocaleString()
    })
    return (
        <span className={className}>
            {prefix}<motion.span>{displayValue}</motion.span>{suffix}
        </span>
    )
}