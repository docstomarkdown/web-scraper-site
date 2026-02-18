"use client"

import * as React from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Info, ChevronUp, ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"

interface ContainerLoadCalculatorInputProps {
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
    className?: string
    fullWidth?: boolean
}

export function ContainerLoadCalculatorInput({
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
    className,
    fullWidth = false
}: ContainerLoadCalculatorInputProps) {
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

    const adjustValue = (delta: number) => {
        if (type !== "number") return
        const currentVal = value === "" ? 0 : Number(value)
        const newVal = Math.max(min, Math.min(max, currentVal + delta))
        onChange(newVal)
    }

    return (
        <div className={cn(
            "flex items-center justify-between gap-4 w-full",
            !fullWidth && "max-w-[400px]",
            className
        )}>
            <div className="flex items-center gap-2 whitespace-nowrap">
                <Label className="text-base font-semibold text-slate-700">{label}</Label>
                {tooltip && (
                    <TooltipProvider delayDuration={100}>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <button
                                    type="button"
                                    tabIndex={-1}
                                    className="text-slate-500 hover:text-blue-600 transition-colors cursor-default"
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
            <div className="relative group">
                <div className="relative">
                    <Input
                        type={type}
                        value={value}
                        onChange={handleInputChange}
                        className={cn(
                            "h-10 text-base border-slate-300 bg-white rounded-xl shadow-sm placeholder:text-slate-400 placeholder:italic w-[140px] text-right hover:border-blue-600 focus:border-blue-600 focus:ring-4 focus:ring-blue-600/10 transition-all pr-10",
                            type === 'text' && "text-sm"
                        )}
                        min={type === "number" ? min : undefined}
                        max={type === "number" ? max : undefined}
                        step={type === "number" ? step : undefined}
                        placeholder={placeholder ? (type === "number" ? `Ex: ${placeholder}` : placeholder) : undefined}
                    />
                </div>
                {type === "number" && (
                    <div className="absolute right-0 top-0 h-full flex flex-col border-l border-slate-200">
                        <button
                            type="button"
                            onClick={() => adjustValue(step)}
                            className="flex-1 px-2.5 hover:bg-slate-50 flex items-center justify-center text-slate-400 hover:text-blue-600 border-b border-slate-100 transition-colors rounded-tr-xl"
                        >
                            <ChevronUp className="h-3 w-3" />
                        </button>
                        <button
                            type="button"
                            onClick={() => adjustValue(-step)}
                            className="flex-1 px-2.5 hover:bg-slate-50 flex items-center justify-center text-slate-400 hover:text-blue-600 transition-colors rounded-br-xl"
                        >
                            <ChevronDown className="h-3 w-3" />
                        </button>
                    </div>
                )}
            </div>
        </div>
    )
}
