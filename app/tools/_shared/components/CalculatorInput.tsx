"use client"

import * as React from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Info, LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"

interface CalculatorInputProps {
    label: string
    value: number | string | ""
    onChange: (value: any) => void
    min?: number
    max?: number
    step?: number
    prefix?: string
    suffix?: string
    placeholder?: string
    tooltip?: string
    type?: "number" | "text"
    groupingTitle?: string
    groupingIcon?: LucideIcon | React.ElementType
}

export function CalculatorInput({
    label,
    value,
    onChange,
    min = 0,
    max = 10000,
    step = 1,
    prefix,
    suffix,
    placeholder,
    tooltip,
    type = "number",
    groupingTitle,
    groupingIcon: GroupIcon
}: CalculatorInputProps) {
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value
        if (type === "number") {
            if (val === "") {
                onChange("")
            } else {
                const parsed = parseFloat(val)
                if (!isNaN(parsed)) {
                    onChange(parsed)
                }
            }
        } else {
            onChange(val)
        }
    }

    return (
        <div className="space-y-3">
            {groupingTitle && (
                <div className="flex items-center gap-2 mb-4">
                    {GroupIcon && <GroupIcon className="w-4 h-4 text-slate-400" />}
                    <span className="text-sm font-medium text-slate-700">
                        {groupingTitle}
                    </span>
                </div>
            )}

            <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-2 flex-1 min-w-0 text-left">
                    <Label className="text-base font-semibold text-slate-700 truncate">
                        {label}
                    </Label>
                    {tooltip && (
                        <TooltipProvider delayDuration={100}>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <button
                                        type="button"
                                        tabIndex={-1}
                                        className="text-slate-500 hover:text-blue-600 transition-colors cursor-default shrink-0"
                                    >
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

                <div className="relative group flex-shrink-0">
                    {prefix && (
                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold group-focus-within:text-blue-600 transition-colors pointer-events-none z-10">
                            {prefix}
                        </div>
                    )}
                    <Input
                        type={type}
                        value={value}
                        onChange={handleInputChange}
                        className={cn(
                            "h-12 sm:h-14 text-base sm:text-lg font-medium border-slate-200 bg-white shadow-sm transition-all",
                            "placeholder:text-slate-300 placeholder:font-normal placeholder:italic rounded-xl text-right",
                            "hover:border-blue-600 focus:border-blue-600 focus:ring-4 focus:ring-blue-600/10",
                            "w-48 sm:w-56 md:w-64",
                            prefix && "pl-12",
                            suffix && "pr-12"
                        )}
                        min={type === "number" ? min : undefined}
                        max={type === "number" ? max : undefined}
                        step={type === "number" ? step : undefined}
                        placeholder={placeholder ? (type === "number" && !placeholder.startsWith("Eg:") ? `Eg: ${placeholder}` : placeholder) : undefined}
                    />
                    {suffix && (
                        <div className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 font-bold group-focus-within:text-blue-600 transition-colors pointer-events-none z-10">
                            {suffix}
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
