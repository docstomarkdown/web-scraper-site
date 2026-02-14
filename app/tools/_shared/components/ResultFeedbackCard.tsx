"use client"

import React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface SecondaryMetric {
    label: string
    value: React.ReactNode
    color?: string
}

interface ResultFeedbackCardProps {
    title: string
    titleLabel?: string // e.g. "High Performance"
    labelClassName?: string // e.g. "text-emerald-400"
    mainValue?: React.ReactNode
    valueColor?: string // e.g. "text-emerald-400"
    mainMetricLabel?: string // e.g. "ROAS %"
    mainMetricValue?: React.ReactNode // e.g. "420%"
    mainMetricColor?: string
    secondaryMetrics?: SecondaryMetric[]
    className?: string
    children?: React.ReactNode
}

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Info } from "lucide-react"

export function ResultFeedbackCard({
    title,
    titleLabel,
    labelClassName,
    mainValue,
    valueColor,
    mainMetricLabel,
    mainMetricValue,
    mainMetricColor = "text-blue-400",
    secondaryMetrics = [],
    className,
    variant = "default",
    tooltip,
    children
}: ResultFeedbackCardProps & { variant?: "default" | "warning" | "compact", tooltip?: string }) {

    // Default styles based on variant
    const getBaseStyles = () => {
        switch (variant) {
            case "warning":
                return "bg-red-950 border-red-900"
            case "compact":
                return "bg-white border-slate-200 shadow-sm text-slate-900"
            default:
                return "bg-slate-700 border-0 text-white"
        }
    }

    const getLabelStyles = () => {
        if (labelClassName) return labelClassName
        if (variant === "compact") return "bg-slate-100 text-slate-600"
        return "text-emerald-400 bg-slate-600/50 border-slate-500/50"
    }

    const getValueColor = () => {
        if (valueColor) return valueColor
        if (variant === "compact") return "text-slate-900"
        return "text-white"
    }

    // Background effects (only for default/warning dark themes)
    const showEffects = variant !== "compact"

    return (
        <Card className={cn(
            "shadow-xl overflow-hidden relative transition-all duration-300",
            getBaseStyles(),
            className
        )}>
            {/* Background Effects */}
            {showEffects && (
                <>
                    <div className={cn(
                        "absolute top-0 right-0 w-64 h-64 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none opacity-20",
                        variant === "warning" ? "bg-red-500" : "bg-blue-500"
                    )} />
                    <div className={cn(
                        "absolute bottom-0 left-0 w-48 h-48 rounded-full blur-3xl -ml-16 -mb-16 pointer-events-none opacity-10",
                        variant === "warning" ? "bg-orange-500" : "bg-emerald-500"
                    )} />
                </>
            )}

            <CardHeader className="pb-2 relative z-10">
                <CardTitle className={cn(
                    "text-sm font-medium uppercase tracking-wider flex justify-between items-center",
                    variant === "compact" ? "text-slate-500" : "text-slate-300/80"
                )}>
                    <div className="flex items-center gap-2">
                        <span>{title}</span>
                        {tooltip && (
                            <TooltipProvider delayDuration={100}>
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <button type="button" className={cn(
                                            "transition-colors",
                                            variant === "compact" ? "text-slate-400 hover:text-blue-600" : "text-slate-500 hover:text-white"
                                        )}>
                                            <Info className="h-3.5 w-3.5" />
                                        </button>
                                    </TooltipTrigger>
                                    <TooltipContent side="top" className="max-w-xs text-xs bg-slate-900 text-white border-slate-800">
                                        {tooltip}
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                        )}
                    </div>
                    {titleLabel && (
                        <span className={cn("text-xs font-bold px-2 py-0.5 rounded-full", getLabelStyles())}>
                            {titleLabel}
                        </span>
                    )}
                </CardTitle>
            </CardHeader>

            <CardContent className="relative z-10">
                {/* Main Big Number */}
                {mainValue && (
                    <div className="flex items-baseline gap-3 mb-6">
                        <div className={cn(
                            "font-bold tracking-tight",
                            variant === "compact" ? "text-3xl" : "text-5xl",
                            getValueColor()
                        )}>
                            {mainValue}
                        </div>
                    </div>
                )}

                {/* Metrics Section */}
                {(mainMetricLabel || secondaryMetrics.length > 0) && (
                    <div className={cn(
                        "pt-4 space-y-4",
                        variant === "compact" ? "border-t border-slate-100" : "border-t border-white/10"
                    )}>
                        {/* Primary Supporting Metric (Full Width) */}
                        {mainMetricLabel && (
                            <div className={cn("pb-3", variant === "compact" ? "border-b border-slate-100" : "border-b border-white/5")}>
                                <p className={cn("text-xs mb-1", variant === "compact" ? "text-slate-500" : "text-slate-300")}>{mainMetricLabel}</p>
                                <div className={cn("text-2xl font-bold break-words", mainMetricColor)}>
                                    {mainMetricValue}
                                </div>
                            </div>
                        )}

                        {/* Secondary Supporting Metrics Grid */}
                        {secondaryMetrics.length > 0 && (
                            <div className="grid grid-cols-2 gap-4">
                                {secondaryMetrics.map((metric, index) => (
                                    <div key={index}>
                                        <p className={cn("text-xs mb-1", variant === "compact" ? "text-slate-500" : "text-slate-300")}>{metric.label}</p>
                                        <div className={cn("text-xl font-bold break-all", metric.color || "text-emerald-400")}>
                                            {metric.value}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )}

                {/* Custom Children */}
                {children && (
                    <div className={cn(
                        "pt-4",
                        (mainValue || mainMetricLabel || secondaryMetrics.length > 0) && (variant === "compact" ? "border-t border-slate-100" : "border-t border-white/10")
                    )}>
                        {children}
                    </div>
                )}
            </CardContent>
        </Card>
    )
}
