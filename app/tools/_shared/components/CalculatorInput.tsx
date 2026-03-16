"use client"
import * as React from "react"
import { currencies } from "./CurrencyCombobox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger, TooltipArrow } from "@/components/ui/tooltip"
import { Info, LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"

export interface CalculatorInputProps {
    label: React.ReactNode
    labelClassName?: string
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
    benchmarkBadge?: boolean
    hideSeparator?: boolean
    isOptional?: boolean
    groupingAction?: React.ReactNode
    rowAction?: React.ReactNode
}

export function CalculatorInput({
    label,
    labelClassName,
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
    highlight = false,
    benchmarkBadge = false,
    hideSeparator = false,
    isOptional = false,
    groupingAction,
    rowAction
}: CalculatorInputProps) {
    const inputRef = React.useRef<HTMLInputElement>(null)
    const containerRef = React.useRef<HTMLDivElement>(null)
    const [isFirstInput, setIsFirstInput] = React.useState(false)
    const [isInLabeledGroup, setIsInLabeledGroup] = React.useState(false)
    const [isLastInGroup, setIsLastInGroup] = React.useState(false)

    // Strict empty check: Don't highlight if user has entered '0'
    const isEmpty = value === "" || value === null || value === undefined
    const isHighlighted = (highlight || isFirstInput) && isEmpty

    React.useLayoutEffect(() => {
        const checkGroup = () => {
            if (!containerRef.current) return;
            const el = containerRef.current;
            const prev = el.previousElementSibling;
            const next = el.nextElementSibling;

            // Updated today: Improved path logic to connect rows more reliably
            const isNextInput = next?.classList.contains('calculator-input-row') && next.getAttribute('data-has-title') !== 'true';

            let labeled = false;
            if (groupingTitle) {
                labeled = true;
            } else {
                let current = prev;
                while (current && current.classList.contains('calculator-input-row')) {
                    if (current.getAttribute('data-has-title') === 'true') {
                        labeled = true;
                        break;
                    }
                    current = current.previousElementSibling;
                }
            }
            setIsInLabeledGroup(labeled);
            setIsLastInGroup(!isNextInput);
        };
        checkGroup();
        const timer = setTimeout(checkGroup, 100);
        return () => clearTimeout(timer);
    }, [groupingTitle])

    React.useEffect(() => {
        if (isFirstInput && isEmpty) {
            const focusTimer = setTimeout(() => {
                if (inputRef.current) {
                    const activeEl = document.activeElement;
                    const isInputFocused = activeEl?.tagName === 'INPUT' || activeEl?.classList.contains('calculator-input-field');
                    if (!isInputFocused) {
                        inputRef.current.focus();
                    }
                }
            }, 100);
            return () => clearTimeout(focusTimer);
        }
    }, [isFirstInput, isEmpty, value])

    React.useEffect(() => {
        const checkIndex = () => {
            if (inputRef.current) {
                const allInputs = document.querySelectorAll('.calculator-input-field');
                const isFirst = allInputs[0] === inputRef.current;
                if (isFirst) {
                    setIsFirstInput(true);
                    if (!document.activeElement || document.activeElement === document.body) {
                        inputRef.current.focus();
                    }
                } else if (autoFocus) {
                    inputRef.current.focus();
                }
            }
        };
        checkIndex();
        const timer = setTimeout(checkIndex, 50);
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

    const getCurrencyInfo = React.useCallback((code: string) => {
        // Try looking up in our custom currencies list first (consistent with the combo box)
        const found = currencies.find(c => c.code === code)
        if (found) {
            return { symbol: found.symbol, isSuffix: false }
        }

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
        <div
            className={cn(
                "w-full relative calculator-input-row [.calculator-input-row+&]:mt-3",
                (groupingTitle || isInLabeledGroup)
                    ? "max-w-[520px] mx-auto px-3 sm:px-5"
                    : "max-w-none ml-0 pr-3 sm:pr-5 pl-0"
            )}
            ref={containerRef}
            data-has-title={!!groupingTitle}
        >
            {/* ── Section Separator (Global) ── */}
            {groupingTitle && !hideSeparator && (
                <div className="h-px bg-slate-100/80 w-[calc(100%+48px)] -ml-6 mb-3 mt-1" />
            )}

            <div className="relative w-full">
                {/* Dynamic Connecting Line Fragment: Ensures a solid vertical path ONLY for labeled groups */}
                {isInLabeledGroup && (
                    <div
                        className="absolute left-[-19px] w-[1.5px] bg-blue-200/70 z-0"
                        style={{
                            top: groupingTitle ? '14px' : '-50px',
                            bottom: isLastInGroup ? '10px' : '-50px',
                        }}
                    />
                )}
                {groupingTitle && (() => {
                    // Parse groupingTitle to separate main title from (Optional)
                    const optionalMatch = groupingTitle.match(/^(.+?)\s*\((Optional|optional)\)$/i);
                    const mainTitle = optionalMatch ? optionalMatch[1].trim() : groupingTitle;
                    const hasOptional = !!optionalMatch;
                    
                    return (
                        <div className="flex items-center gap-2 -ml-[33px] mb-3 relative">
                            {GroupIcon && (
                                <div className="w-7 h-7 rounded-lg bg-blue-50 ring-[6px] ring-white flex items-center justify-center flex-shrink-0 z-10">
                                    <GroupIcon className="w-3.5 h-3.5 text-blue-600" />
                                </div>
                            )}
                            <span className="text-[16px] font-bold text-slate-600 capitalize z-10 tracking-tight flex-1">
                                {mainTitle}
                                {hasOptional && (
                                    <span className="ml-1.5 text-[11px] font-normal italic text-slate-400">(optional)</span>
                                )}
                            </span>
                            {groupingAction && (
                                <div className="z-10 ml-auto">
                                    {groupingAction}
                                </div>
                            )}
                            {benchmarkBadge && (
                                <>
                                    <span className="text-slate-300 text-sm z-10 select-none">·</span>
                                    <span className="text-[11px] text-blue-400 italic z-10 whitespace-nowrap">
                                        Industry benchmarks pre-filled
                                    </span>
                                </>
                            )}
                        </div>
                    );
                })()}
                <div className="flex items-center gap-3 w-full relative z-10">
                    <div className="flex items-center gap-2 flex-1 min-w-0 text-left">
                        <Label
                            htmlFor={inputId}
                            className={cn(
                                "text-[14.5px] font-medium text-slate-600/90 cursor-pointer py-1",
                                labelClassName
                            )}
                        >
                            {label}
                            {isOptional && (
                                <span className="ml-1.5 font-normal italic text-[12px] text-slate-400 lowercase tracking-normal">
                                    (optional)
                                </span>
                            )}
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
                                <TooltipContent side="top" className="max-w-xs text-[13px] font-normal bg-slate-900 text-white border-slate-800">
                                    {tooltip}
                                </TooltipContent>
                            </Tooltip>
                        )}
                    </div>
                    <div className="relative group flex-shrink-0 flex items-center gap-3">
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <div className="relative">
                                    {finalPrefix && (
                                        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-600 text-xs font-semibold group-focus-within:text-blue-500 transition-colors pointer-events-none z-10">
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
                                            "h-11 text-[16px] font-semibold text-slate-600 border-2 border-slate-200 bg-white shadow-sm transition-all duration-200",
                                            "placeholder:text-slate-300 placeholder:font-normal placeholder:text-[15px] rounded-xl text-right",
                                            "hover:border-blue-300 hover:shadow-md",
                                            "focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 focus:outline-none",
                                            "w-36 sm:w-44",
                                            isHighlighted && "border-blue-400 shadow-sm",
                                            finalPrefix && "pl-10",
                                            finalSuffix && "pr-10"
                                        )}
                                        min={String(type) === "number" ? min : undefined}
                                        max={String(type) === "number" ? max : undefined}
                                        step={String(type) === "number" ? step : undefined}
                                        placeholder={placeholder ? (String(type) === "number" && !placeholder.startsWith("Eg:") && !placeholder.startsWith("Default:") && !placeholder.startsWith("Avg:") ? `Eg: ${placeholder}` : placeholder) : undefined}
                                    />
                                    {finalSuffix && (
                                        <div className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-600 text-xs font-semibold group-focus-within:text-blue-500 transition-colors pointer-events-none z-10">
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
                                    className="bg-white text-black border border-black rounded-none px-3 py-1.5 text-[13px] shadow-none animate-none font-sans z-[100] max-w-xs overflow-void font-normal text-center"
                                >
                                    <TooltipArrow className="fill-white stroke-black stroke-[1px] -mt-[1px]" width={12} height={6} />
                                    {hint}
                                </TooltipContent>
                            )}
                        </Tooltip>
                        {rowAction && <div className="flex-shrink-0">{rowAction}</div>}
                    </div>
                </div>
            </div>
        </div>
    )
}
