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
    mainValue: React.ReactNode
    valueColor?: string // e.g. "text-emerald-400"
    mainMetricLabel?: string // e.g. "ROAS %"
    mainMetricValue?: React.ReactNode // e.g. "420%"
    mainMetricColor?: string
    secondaryMetrics?: SecondaryMetric[]
    className?: string
}

export function ResultFeedbackCard({
    title,
    titleLabel,
    labelClassName = "text-blue-400",
    mainValue,
    valueColor = "text-white",
    mainMetricLabel,
    mainMetricValue,
    mainMetricColor = "text-blue-400",
    secondaryMetrics = [],
    className
}: ResultFeedbackCardProps) {
    return (
        <Card className={cn("border-0 shadow-xl overflow-hidden relative transition-colors duration-300 bg-slate-900 text-white", className)}>
            {/* Background Effects */}
            <div className="absolute top-0 right-0 w-64 h-64 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none bg-blue-500/10" />
            <div className="absolute bottom-0 left-0 w-48 h-48 rounded-full blur-3xl -ml-16 -mb-16 pointer-events-none bg-blue-500/5" />

            <CardHeader className="pb-2 relative z-10">
                <CardTitle className="text-sm font-medium uppercase tracking-wider text-slate-300/80 flex justify-between items-center">
                    <span>{title}</span>
                    {titleLabel && (
                        <span className={cn("text-xs font-bold px-2 py-0.5 rounded-full bg-black/20", labelClassName)}>
                            {titleLabel}
                        </span>
                    )}
                </CardTitle>
            </CardHeader>

            <CardContent className="relative z-10">
                {/* Main Big Number */}
                <div className="flex items-baseline gap-3 mb-6">
                    <div className={cn("text-5xl font-bold tracking-tight", valueColor)}>
                        {mainValue}
                    </div>
                </div>

                {/* Metrics Section */}
                <div className="pt-4 border-t border-white/10 space-y-4">
                    {/* Primary Supporting Metric (Full Width) */}
                    {mainMetricLabel && (
                        <div className="pb-3 border-b border-white/5">
                            <p className="text-xs text-slate-300 mb-1">{mainMetricLabel}</p>
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
                                    <p className="text-xs text-slate-300 mb-1">{metric.label}</p>
                                    <div className={cn("text-xl font-bold break-all", metric.color || "text-emerald-400")}>
                                        {metric.value}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </CardContent>
        </Card>
    )
}
