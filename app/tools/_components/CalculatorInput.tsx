"use client"

import * as React from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Info } from "lucide-react"

interface CalculatorInputProps {
    label: string
    value: number | ""
    onChange: (value: number | "") => void
    min?: number
    max?: number
    step?: number
    prefix?: string
    suffix?: string
    placeholder?: string
    tooltip?: string
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
}: CalculatorInputProps) {
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value
        if (value === "") {
            onChange("")
        } else {
            const val = parseFloat(value)
            if (!isNaN(val)) {
                onChange(val)
            }
        }
    }

    return (
        <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
                <Label className="text-base font-semibold text-slate-700">{label}</Label>
                {tooltip && (
                    <TooltipProvider delayDuration={100}>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <button type="button" className="text-slate-500 hover:text-blue-600 transition-colors">
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
                type="number"
                value={value}
                onChange={handleInputChange}
                className="h-10 text-base border-slate-300 bg-white shadow-sm placeholder:text-slate-400 placeholder:italic w-36 md:w-44 text-right hover:border-blue-600 focus:border-blue-600 focus:ring-4 focus:ring-blue-600/10 transition-all"
                min={min}
                max={max}
                step={step}
                placeholder={placeholder ? `Ex: ${placeholder}` : undefined}
            />
        </div>
    )
}
