"use client"
import React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { Info } from "lucide-react"
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
interface SecondaryMetric {
    label: string
    value: React.ReactNode
    color?: string
    tooltip?: string
}
interface ContainerLoadResultCardProps {
    variant?: "default" | "compact"
    title: string
    titleLabel?: string
    labelClassName?: string
    mainValue?: React.ReactNode
    valueColor?: string
    secondaryMetrics?: SecondaryMetric[]
    className?: string
    tooltip?: string
    children?: React.ReactNode
}
export function ContainerLoadResultCard({
    variant = "default",
    title,
    titleLabel,
    labelClassName = "text-blue-400",
    mainValue,
    valueColor = variant === "compact" ? "text-blue-400" : "text-white",
    secondaryMetrics = [],
    className,
    tooltip,
    children
}: ContainerLoadResultCardProps) {
    return (
        <Card className={cn(
            "border-0 shadow-xl overflow-hidden relative transition-all duration-300",
            variant === "compact" ? "bg-white border border-slate-100 shadow-sm" : "bg-slate-700 text-white",
            className
        )}>
            {variant === "default" && (
                <>
                    <div className="absolute top-0 right-0 w-64 h-64 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none bg-blue-500 opacity-20" />
                    <div className="absolute bottom-0 left-0 w-48 h-48 rounded-full blur-3xl -ml-16 -mb-16 pointer-events-none bg-emerald-500 opacity-10" />
                </>
            )}
            <CardHeader className={cn("pb-2 relative z-10", variant === "compact" ? "px-4 pt-4" : "px-6 pt-6")}>
                <CardTitle className={cn(
                    "font-medium uppercase tracking-wider flex justify-between items-center",
                    variant === "compact" ? "text-[10px] text-slate-500" : "text-sm text-slate-300/80"
                )}>
                    <div className="flex items-center gap-1.5">
                        <span>{title}</span>
                        {tooltip && (
                            <TooltipProvider>
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <Info className="w-3 h-3 text-slate-400 cursor-help" />
                                    </TooltipTrigger>
                                    <TooltipContent side="top">
                                        <p className="text-xs max-w-[200px] leading-relaxed font-normal normal-case tracking-normal">
                                            {tooltip}
                                        </p>
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                        )}
                    </div>
                    {titleLabel && (
                        <span className={cn(
                            "text-[10px] font-bold px-2 py-0.5 rounded-full transition-colors",
                            variant === "compact" ? "bg-slate-100 text-slate-600" : "bg-black/20",
                            labelClassName
                        )}>
                            {titleLabel}
                        </span>
                    )}
                </CardTitle>
            </CardHeader>
            <CardContent className={cn("relative z-10", variant === "compact" ? "px-4 pb-4" : "px-6 pb-6")}>
                {mainValue && (
                    <div className={cn("flex items-baseline gap-3", variant === "compact" ? "mb-0" : "mb-6")}>
                        <div className={cn(
                            "tracking-tight transition-colors",
                            variant === "compact" ? "text-2xl font-bold" : "text-5xl font-bold",
                            valueColor
                        )}>
                            {mainValue}
                        </div>
                    </div>
                )}
                {secondaryMetrics.length > 0 && (
                    <div className={cn(
                        "pt-4 space-y-4",
                        variant === "default" ? "border-t border-white/10" : ""
                    )}>
                        <TooltipProvider>
                            <div className="grid grid-cols-2 gap-4">
                                {secondaryMetrics.map((metric, index) => (
                                    <div key={index} className="bg-white/5 rounded-xl p-4 border border-white/5">
                                        <div className="flex items-center gap-1.5 mb-1">
                                            <p className="text-xs font-bold text-slate-300">{metric.label}</p>
                                            {metric.tooltip && (
                                                <Tooltip>
                                                    <TooltipTrigger asChild>
                                                        <Info className="w-3 h-3 text-slate-400 cursor-help" />
                                                    </TooltipTrigger>
                                                    <TooltipContent side="top">
                                                        <p className="text-xs max-w-[200px] leading-relaxed">
                                                            {metric.tooltip}
                                                        </p>
                                                    </TooltipContent>
                                                </Tooltip>
                                            )}
                                        </div>
                                        <div className={cn(
                                            "text-xl font-bold break-all",
                                            metric.color || "text-blue-400"
                                        )}>
                                            {metric.value}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </TooltipProvider>
                    </div>
                )}
                {children && (
                    <div className={cn(
                        "mt-4",
                        (mainValue || secondaryMetrics.length > 0) && (variant === "compact" ? "pt-3" : "pt-4 border-t border-white/10")
                    )}>
                        {children}
                    </div>
                )}
            </CardContent>
        </Card>
    )
}