"use client"

import React from "react"
import { CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { HelpCircle, RotateCcw } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { CurrencyCombobox } from "./CurrencyCombobox"

interface CalculatorCardHeaderProps {
    title?: string
    description: string
    guideId?: string
    currency?: string
    onCurrencyChange?: (value: string) => void
    tooltip?: string
    onReset?: () => void
}

export function CalculatorCardHeader({
    title,
    description,
    guideId = "how-to-use",
    currency,
    onCurrencyChange,
    tooltip,
}: CalculatorCardHeaderProps) {
    const scrollToGuide = () => {
        const element = document.getElementById(guideId)
        if (element) {
            const offset = 100 // Adjust this value for desired top spacing
            const elementPosition = element.getBoundingClientRect().top + window.scrollY
            const offsetPosition = elementPosition - offset

            window.scrollTo({
                top: offsetPosition,
                behavior: "smooth"
            })
        }
    }

    return (
        <CardHeader className="px-6 py-4 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4 space-y-0">
            <div className="space-y-1">
                <div className="flex items-center gap-2">
                    <CardTitle className="text-2xl font-bold text-blue-600 tracking-tight">
                        {title}
                    </CardTitle>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <button
                                type="button"
                                tabIndex={-1}
                                onClick={scrollToGuide}
                                className="text-slate-400 hover:text-blue-600 transition-colors"
                            >
                                <HelpCircle className="h-5 w-5" />
                            </button>
                        </TooltipTrigger>
                        <TooltipContent side="top" className="text-xs bg-slate-900 text-white border-slate-800">
                            {tooltip || "How to use this tool"}
                        </TooltipContent>
                    </Tooltip>
                </div>
                <CardDescription className="text-sm text-slate-500 font-medium">
                    {description}
                </CardDescription>
            </div>
            {currency && onCurrencyChange && (
                <div className="w-[145px]">
                    <CurrencyCombobox value={currency} onValueChange={onCurrencyChange} />
                </div>
            )}
        </CardHeader>
    )
}
