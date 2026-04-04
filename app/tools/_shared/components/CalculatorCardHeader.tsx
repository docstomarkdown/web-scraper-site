"use client"
import React from "react"
import { CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { HelpCircle, RotateCw, LucideIcon } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { CurrencyCombobox } from "./CurrencyCombobox"

interface CalculatorCardHeaderProps {
    title?: string
    titleIcon?: LucideIcon
    description: string
    guideId?: string
    currency?: string
    onCurrencyChange?: (value: string) => void
    tooltip?: string
    onReset?: () => void
}

export function CalculatorCardHeader({
    title,
    titleIcon: TitleIcon,
    description,
    guideId = "how-to-use",
    currency,
    onCurrencyChange,
    tooltip,
    onReset,
}: CalculatorCardHeaderProps) {
    const scrollToGuide = () => {
        const element = document.getElementById(guideId)
        if (element) {
            const offset = 100
            const elementPosition = element.getBoundingClientRect().top + window.scrollY
            const offsetPosition = elementPosition - offset
            window.scrollTo({ top: offsetPosition, behavior: "smooth" })
        }
    }

    return (
        <CardHeader className="px-6 py-5 border-b border-slate-100/80 bg-white/40">
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                {/* Title + description */}
                <div className="flex-1 min-w-0 space-y-1">
                    <div className="flex items-center gap-2">
                        {TitleIcon && (
                            <div className="flex-shrink-0 w-5 h-5 rounded-lg bg-blue-50 flex items-center justify-center">
                                <TitleIcon className="h-3.5 w-3.5 text-blue-600" />
                            </div>
                        )}
                        <CardTitle className="text-xl font-bold text-blue-600 tracking-tight leading-none">
                            {title}
                        </CardTitle>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <button
                                    type="button"
                                    tabIndex={-1}
                                    onClick={scrollToGuide}
                                    className="text-slate-400 hover:text-blue-500 transition-colors flex-shrink-0 mt-0.5"
                                >
                                    <HelpCircle className="h-4 w-4" />
                                </button>
                            </TooltipTrigger>
                            <TooltipContent side="top" className="text-xs bg-slate-900 text-white border-slate-800">
                                {tooltip || "How to use this tool"}
                            </TooltipContent>
                        </Tooltip>
                    </div>
                    <CardDescription className="text-[13px] text-slate-400 font-medium leading-relaxed whitespace-pre-wrap">
                        {description}
                    </CardDescription>
                </div>

                {/* Controls: Currency + Reset */}
                <div className="flex items-center gap-2 flex-shrink-0">
                    {currency && onCurrencyChange && (
                        <div className="w-[138px]">
                            <CurrencyCombobox value={currency} onValueChange={onCurrencyChange} />
                        </div>
                    )}
                    {onReset && (
                        <button
                            type="button"
                            onClick={onReset}
                            className="group flex items-center justify-center h-9 w-9 text-slate-400 hover:text-blue-600 bg-white border border-slate-200 hover:border-blue-200 shadow-sm hover:shadow-md rounded-xl transition-all duration-250 active:scale-90"
                            aria-label="Reset Calculator"
                        >
                            <RotateCw className="h-3.5 w-3.5" />
                        </button>
                    )}
                </div>
            </div>
        </CardHeader>
    )
}
