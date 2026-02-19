"use client"

import React from "react"
import { CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { HelpCircle, RotateCcw } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { CurrencyCombobox } from "./CurrencyCombobox"

interface CalculatorCardHeaderProps {
    description: string
    onReset: () => void
    guideId?: string
    currency?: string
    onCurrencyChange?: (value: string) => void
}

export function CalculatorCardHeader({
    description,
    onReset,
    guideId = "how-to-use",
    currency,
    onCurrencyChange,
}: CalculatorCardHeaderProps) {
    const scrollToGuide = () => {
        const element = document.getElementById(guideId)
        if (element) element.scrollIntoView({ behavior: "smooth" })
    }

    return (
        <CardHeader className="pb-4 border-b border-slate-50 flex flex-row items-center justify-between space-y-0">
            <div className="space-y-1">
                <div className="flex items-center gap-2">
                    <CardTitle className="text-xl font-bold text-blue-600">
                        Inputs
                    </CardTitle>
                    <button
                        onClick={scrollToGuide}
                        className="text-slate-400 hover:text-blue-600 transition-colors"
                    >
                        <HelpCircle className="w-4 h-4" />
                    </button>
                    <TooltipProvider delayDuration={100}>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <button
                                    onClick={onReset}
                                    className="text-slate-400 hover:text-slate-600 hover:bg-slate-100 h-6 w-6 rounded-full transition-colors flex items-center justify-center p-0"
                                >
                                    <RotateCcw className="w-3.5 h-3.5" />
                                </button>
                            </TooltipTrigger>
                            <TooltipContent side="top" className="text-xs bg-slate-900 text-white border-slate-800">
                                Reset Calculator
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                </div>
                <CardDescription>{description}</CardDescription>
            </div>
            {currency && onCurrencyChange && (
                <div className="w-[140px]">
                    <CurrencyCombobox value={currency} onValueChange={onCurrencyChange} />
                </div>
            )}
        </CardHeader>
    )
}
