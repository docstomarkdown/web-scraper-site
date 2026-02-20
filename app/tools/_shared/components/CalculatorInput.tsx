"use client"

import * as React from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Info } from "lucide-react"

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
    type = "number"
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
        <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-2">
                <Label className="text-base font-semibold text-slate-700 whitespace-nowrap">{label}</Label>
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
            <Input
                type={type}
                value={value}
                onChange={handleInputChange}
                className={`h-11 text-base font-medium border-slate-200 bg-white shadow-sm placeholder:text-slate-300 placeholder:font-normal placeholder:italic w-40 md:w-48 text-right hover:border-blue-600 focus:border-blue-600 focus:ring-4 focus:ring-blue-600/10 transition-all`}
                min={type === "number" ? min : undefined}
                max={type === "number" ? max : undefined}
                step={type === "number" ? step : undefined}
                placeholder={placeholder ? (type === "number" && !placeholder.startsWith("Ex:") ? `Ex: ${placeholder}` : placeholder) : undefined}
            />
        </div>
    )
}
