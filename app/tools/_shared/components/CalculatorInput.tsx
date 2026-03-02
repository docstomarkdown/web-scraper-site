"use client"

import * as React from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger, TooltipArrow } from "@/components/ui/tooltip"
import { Info, LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"

export interface CalculatorInputProps {
    label: string
    value: number | string | ""
    onChange: (value: any) => void
    min?: number
    max?: number
    step?: number
    prefix?: string
    suffix?: string
    currency?: string
    placeholder?: string
    tooltip?: string
    hint?: string | React.ReactNode
    type?: "number" | "text"
    groupingTitle?: string
    groupingIcon?: LucideIcon | React.ElementType
    autoFocus?: boolean
    highlight?: boolean
}

export function CalculatorInput({
    label,
    value,
    onChange,
    min = 0,
    max = 1000000,
    step = 1,
    prefix,
    suffix,
    currency,
    placeholder,
    tooltip,
    hint,
    type = "number",
    groupingTitle,
    groupingIcon: GroupIcon,
    autoFocus = false,
    highlight = false
}: CalculatorInputProps) {
    const inputRef = React.useRef<HTMLInputElement>(null)

    React.useEffect(() => {
        // Automatically focus the first calculator input on the page if not manually specified
        const timer = setTimeout(() => {
            if (inputRef.current) {
                const allInputs = document.querySelectorAll('.calculator-input-field');
                if (allInputs[0] === inputRef.current || autoFocus) {
                    inputRef.current.focus();
                }
            }
        }, 100);
        return () => clearTimeout(timer);
    }, [autoFocus])

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

    // Intelligent currency symbol lookup & position
    const getCurrencyInfo = React.useCallback((code: string) => {
        // Try narrowSymbol first (gives ƒ, ₹, etc. instead of full currency codes)
        const tryFormat = (display: 'narrowSymbol' | 'symbol') => {
            try {
                const formatter = new Intl.NumberFormat('en-US', {
                    style: 'currency',
                    currency: code,
                    currencyDisplay: display,
                })
                const parts = formatter.formatToParts(1)
                const symbol = parts.find(p => p.type === 'currency')?.value || code
                const isSuffix = parts[parts.length - 1].type === 'currency'
                return { symbol, isSuffix }
            } catch {
                return null
            }
        }

        return tryFormat('narrowSymbol') ?? tryFormat('symbol') ?? { symbol: code, isSuffix: false }
    }, [])

    const currencyInfo = React.useMemo(() => currency ? getCurrencyInfo(currency) : null, [currency, getCurrencyInfo])
    const finalPrefix = prefix || (currencyInfo && !currencyInfo.isSuffix ? currencyInfo.symbol : undefined)
    const finalSuffix = suffix || (currencyInfo && currencyInfo.isSuffix ? currencyInfo.symbol : undefined)

    const inputId = React.useId()

    return (
        <div className="space-y-3">
            {groupingTitle && (
                <div className="flex items-center gap-3 mb-3">
                    {GroupIcon && (
                        <div className="w-8 h-8 rounded-xl bg-slate-100/80 flex items-center justify-center flex-shrink-0">
                            <GroupIcon className="w-4 h-4 text-slate-500" />
                        </div>
                    )}
                    <span className="text-sm font-semibold text-slate-500 tracking-wide">
                        {groupingTitle}
                    </span>
                </div>
            )}

            <div className="flex items-center justify-between gap-4 w-full">
                <div className="flex items-center gap-2 flex-1 min-w-0 text-left">
                    <Label
                        htmlFor={inputId}
                        className="text-base font-semibold text-slate-700 truncate cursor-pointer"
                    >
                        {label}
                    </Label>
                    {tooltip && (
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <button
                                    type="button"
                                    tabIndex={-1}
                                    className="text-slate-400 hover:text-blue-600 transition-colors cursor-help shrink-0"
                                >
                                    <Info className="h-3.5 w-3.5" />
                                </button>
                            </TooltipTrigger>
                            <TooltipContent side="top" className="max-w-xs text-xs bg-slate-900 text-white border-slate-800">
                                {tooltip}
                            </TooltipContent>
                        </Tooltip>
                    )}
                </div>

                <div className="relative group flex-shrink-0">
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <div className="relative">
                                {finalPrefix && (
                                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xs font-semibold group-focus-within:text-blue-500 transition-colors pointer-events-none z-10">
                                        {finalPrefix}
                                    </div>
                                )}
                                <Input
                                    id={inputId}
                                    ref={inputRef}
                                    type={type}
                                    value={value}
                                    onChange={handleInputChange}
                                    className={cn(
                                        "calculator-input-field",
                                        "h-11 text-sm font-medium border border-slate-200 bg-slate-50/70 shadow-none transition-all duration-150",
                                        "placeholder:text-slate-300 placeholder:font-normal placeholder:text-sm rounded-xl text-right",
                                        "hover:bg-white hover:border-slate-300",
                                        "focus:bg-white focus:border-blue-400 focus:ring-2 focus:ring-blue-500/10 focus:outline-none",
                                        "w-44 sm:w-52",
                                        highlight && !value && "bg-blue-50/80 border-blue-200 shadow-[0_0_10px_rgba(59,130,246,0.05)]",
                                        finalPrefix && "pl-10",
                                        finalSuffix && "pr-10"
                                    )}
                                    min={type === "number" ? min : undefined}
                                    max={type === "number" ? max : undefined}
                                    step={type === "number" ? step : undefined}
                                    placeholder={placeholder ? (type === "number" && !placeholder.startsWith("Eg:") ? `Eg: ${placeholder}` : placeholder) : undefined}
                                />
                                {finalSuffix && (
                                    <div className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 text-xs font-semibold group-focus-within:text-blue-500 transition-colors pointer-events-none z-10">
                                        {finalSuffix}
                                    </div>
                                )}
                            </div>
                        </TooltipTrigger>
                        {hint && (
                            <TooltipContent
                                side="right"
                                sideOffset={8}
                                align="center"
                                className="bg-white text-black border border-black rounded-none px-3 py-1.5 text-[12.5px] shadow-none animate-none font-sans z-[100] whitespace-nowrap overflow-visible"
                            >
                                <TooltipArrow className="fill-white stroke-black stroke-[1px] -mt-[1px]" width={12} height={6} />
                                {hint}
                            </TooltipContent>
                        )}
                    </Tooltip>
                </div>
            </div>
        </div>
    )
}
