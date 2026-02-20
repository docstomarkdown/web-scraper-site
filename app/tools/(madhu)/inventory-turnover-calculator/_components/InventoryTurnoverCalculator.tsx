"use client"

import React, { useState, useMemo } from "react"
import {
    Info,
    AlertCircle,
    CheckCircle2
} from "lucide-react"
import {
    InputCardHeader,
    ActionButtons
} from "../../ToolTemplate"
import { Counter, ResultFeedbackCard } from "@/app/tools/_shared/components"
import { cn } from "@/lib/utils"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Card, CardContent } from "@/components/ui/card"

interface TurnoverState {
    cogs: string
    beginningInventory: string
    endingInventory: string
    periodInDays: string
}

const DEFAULT_STATE: TurnoverState = {
    cogs: "",
    beginningInventory: "",
    endingInventory: "",
    periodInDays: "365"
}

export function InventoryTurnoverCalculator() {
    const [values, setValues] = useState<TurnoverState>(DEFAULT_STATE)
    const [isCopying, setIsCopying] = useState(false)

    const handleInputChange = (field: keyof TurnoverState, value: string) => {
        if (value === "" || (/^\d*\.?\d*$/.test(value) && parseFloat(value) >= 0)) {
            setValues(prev => ({ ...prev, [field]: value }))
        }
    }

    const hasInputs = useMemo(() => {
        const cogs = parseFloat(values.cogs) || 0
        const begInv = parseFloat(values.beginningInventory) || 0
        const endInv = parseFloat(values.endingInventory) || 0
        return values.cogs !== "" && (values.beginningInventory !== "" || values.endingInventory !== "") && cogs > 0
    }, [values])

    const results = useMemo(() => {
        const cogs = parseFloat(values.cogs) || 0
        const begInv = parseFloat(values.beginningInventory) || 0
        const endInv = parseFloat(values.endingInventory) || 0
        const period = parseFloat(values.periodInDays) || 365

        if (!hasInputs) return {
            avgInventory: 0,
            turnoverRatio: 0,
            dsi: 0,
            status: "waiting" as const,
            efficiency: 0
        }

        const avgInventory = (begInv + endInv) / (begInv && endInv ? 2 : 1)
        const turnoverRatio = avgInventory > 0 ? cogs / avgInventory : 0
        const dsi = turnoverRatio > 0 ? period / turnoverRatio : 0

        let status: "low" | "moderate" | "high" | "excellent" = "moderate"
        if (turnoverRatio < 3) status = "low"
        else if (turnoverRatio < 7) status = "moderate"
        else if (turnoverRatio < 12) status = "high"
        else status = "excellent"

        // Simplified efficiency score (0-100)
        const efficiency = Math.min(100, (turnoverRatio / 8) * 100)

        return {
            avgInventory,
            turnoverRatio,
            dsi,
            status,
            efficiency
        }
    }, [values, hasInputs])

    const handleReset = () => setValues(DEFAULT_STATE)

    const handleCopy = async () => {
        setIsCopying(true)
        const text = `
Inventory Turnover Analysis:
---------------------------------------
- Cost of Goods Sold (COGS): $${values.cogs}
- Beginning Inventory: $${values.beginningInventory}
- Ending Inventory: $${values.endingInventory}
- Analysis Period: ${values.periodInDays} days

Results:
- INVENTORY TURNOVER RATIO: ${results.turnoverRatio.toFixed(2)}x
- DAYS SALES IN INVENTORY (DSI): ${results.dsi.toFixed(1)} days
- AVERAGE INVENTORY VALUE: $${results.avgInventory.toFixed(2)}
- EFFICIENCY RATING: ${results.status.toUpperCase()}
        `.trim()

        await navigator.clipboard.writeText(text)
        setTimeout(() => setIsCopying(false), 2000)
    }

    const getStatusStyles = (status: string) => {
        switch (status) {
            case "low": return "text-red-500 bg-red-50 border-red-100"
            case "moderate": return "text-amber-500 bg-amber-50 border-amber-100"
            case "high": return "text-emerald-500 bg-emerald-50 border-emerald-100"
            case "excellent": return "text-blue-500 bg-blue-50 border-blue-100"
            default: return "text-slate-400 bg-slate-50 border-slate-100"
        }
    }

    return (
        <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch pt-6">

                {/* Left Column: Smart Inputs */}
                <div className="lg:col-span-7">
                    <Card className="border border-slate-200 shadow-sm bg-white overflow-hidden h-full flex flex-col rounded-[2.5rem]">
                        <InputCardHeader
                            title="Turnover Configuration"
                            subtitle="Input your financial data to analyze how effectively you're managing inventory."
                            scrollId="how-to-use"
                        />

                        <CardContent className="p-6 space-y-6 flex-1 flex flex-col">
                            <div className="space-y-6">
                                <TurnoverInput
                                    label="Cost of Goods Sold (COGS)"
                                    value={values.cogs}
                                    onChange={(v) => handleInputChange('cogs', v)}
                                    placeholder="Ex: 150000"
                                    tooltip="The total cost of products sold during the period (found on your Income Statement)."
                                />

                                <TurnoverInput
                                    label="Analysis Period (Days)"
                                    value={values.periodInDays}
                                    onChange={(v) => handleInputChange('periodInDays', v)}
                                    placeholder="Ex: 365"
                                    tooltip="Length of time analyzed. Standard: 365 (Year), 90 (Quarter), 30 (Month)."
                                    headerRight={
                                        <div className="flex gap-1.5 ml-auto">
                                            {[
                                                { label: "30D", value: "30" },
                                                { label: "90D", value: "90" },
                                                { label: "365D", value: "365" }
                                            ].map((preset) => (
                                                <button
                                                    key={preset.value}
                                                    onClick={() => handleInputChange('periodInDays', preset.value)}
                                                    className={cn(
                                                        "px-2 py-0.5 rounded-md text-[10px] font-bold transition-all border",
                                                        values.periodInDays === preset.value
                                                            ? "bg-transparent text-blue-600 border-blue-600"
                                                            : "bg-slate-50 text-slate-500 border-slate-200 hover:border-blue-400 hover:text-blue-600"
                                                    )}
                                                >
                                                    {preset.label}
                                                </button>
                                            ))}
                                        </div>
                                    }
                                />


                                <TurnoverInput
                                    label="Beginning Inventory"
                                    value={values.beginningInventory}
                                    onChange={(v) => handleInputChange('beginningInventory', v)}
                                    placeholder="Ex: 25000"
                                    tooltip="Value of stock at the start of the period."
                                />
                                <TurnoverInput
                                    label="Ending Inventory"
                                    value={values.endingInventory}
                                    onChange={(v) => handleInputChange('endingInventory', v)}
                                    placeholder="Ex: 35000"
                                    tooltip="Value of stock at the end of the period."
                                />
                            </div>

                            <div className="pt-1.5 border-t border-slate-50">
                                <ActionButtons
                                    onReset={handleReset}
                                    onCopy={handleCopy}
                                    copyDisabled={!hasInputs || isCopying}
                                    isCopied={isCopying}
                                />
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Right Column: Results */}
                <div className="lg:col-span-5 space-y-6 flex flex-col">
                    <ResultFeedbackCard
                        title="INVENTORY TURNOVER RATIO"
                        titleLabel="Efficiency Score"
                        className="flex-shrink-0"
                        mainValue={
                            <div className="flex flex-col">
                                <div className="flex items-baseline gap-2">
                                    <Counter
                                        value={results.turnoverRatio}
                                        formatter={(v) => v.toLocaleString(undefined, {
                                            minimumFractionDigits: 2,
                                            maximumFractionDigits: 2
                                        })}
                                    />
                                    <span className="text-2xl font-medium opacity-50">x</span>
                                </div>
                                {hasInputs && (
                                    <div className={`flex items-center gap-2 mt-4 px-3 py-1.5 rounded-xl border w-fit font-bold text-xs uppercase tracking-wider ${getStatusStyles(results.status)}`}>
                                        {results.status === "low" ? (
                                            <AlertCircle className="w-3.5 h-3.5" />
                                        ) : (
                                            <CheckCircle2 className="w-3.5 h-3.5" />
                                        )}
                                        {results.status} Turnover
                                    </div>
                                )}
                            </div>
                        }
                    >
                        <div className="space-y-6">
                            <div className="grid grid-cols-2 gap-4">
                                <TooltipProvider delayDuration={100}>
                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                            <div className="bg-white/5 rounded-xl p-4 border border-white/5 cursor-help transition-all hover:bg-white/10">
                                                <p className="text-xs font-bold text-slate-300 mb-1 flex items-center gap-1.5">
                                                    DSI (Runway)
                                                    <Info className="w-3 h-3 text-slate" />
                                                </p>
                                                <p className="text-xl font-bold text-indigo-400">
                                                    {hasInputs ? results.dsi.toFixed(1) : "0"} <span className="text-xs font-normal opacity-50">Days</span>
                                                </p>
                                            </div>
                                        </TooltipTrigger>
                                        <TooltipContent side="top" className="text-[10px] bg-slate-900 text-white border-slate-800 p-2 max-w-[200px]">
                                            Days Sales in Inventory. Represents how many days of stock you have left based on sales velocity.
                                        </TooltipContent>
                                    </Tooltip>
                                </TooltipProvider>

                                <TooltipProvider delayDuration={100}>
                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                            <div className="bg-white/5 rounded-xl p-4 border border-white/5 text-left cursor-help transition-all hover:bg-white/10">
                                                <p className="text-xs font-bold text-slate-300 mb-1 flex items-center gap-1.5">
                                                    Avg. Inventory
                                                    <Info className="w-3 h-3 text-slate" />
                                                </p>
                                                <p className="text-xl font-bold text-emerald-400">
                                                    {hasInputs ? `$${(results.avgInventory / 1000).toFixed(1)}k` : "$0k"}
                                                </p>
                                            </div>
                                        </TooltipTrigger>
                                        <TooltipContent side="top" className="text-[10px] bg-slate-900 text-white border-slate-800 p-2 max-w-[200px]">
                                            The average dollar value of stock held during this period.
                                        </TooltipContent>
                                    </Tooltip>
                                </TooltipProvider>
                            </div>
                        </div>
                    </ResultFeedbackCard>
                </div>
            </div>
        </div >
    )
}

function TurnoverInput({
    label,
    value,
    onChange,
    tooltip,
    placeholder,
    headerRight
}: {
    label: string,
    value: string,
    onChange: (v: string) => void,
    tooltip: string,
    placeholder: string,
    headerRight?: React.ReactNode
}) {
    return (
        <div className="space-y-2 group/input">
            <div className="flex items-center gap-1.5 mb-1 pl-1">
                <label className="text-sm font-bold text-slate-600 group-focus-within/input:text-blue-600 transition-colors">
                    {label}
                </label>
                <TooltipProvider delayDuration={100}>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <button className="text-slate-400 hover:text-blue-600 transition-colors p-0.5 mt-0.5">
                                <Info className="h-3.5 w-3.5" />
                            </button>
                        </TooltipTrigger>
                        <TooltipContent side="top" className="text-[10px] bg-slate-900 text-white border-slate-800 p-2 max-w-[200px]">
                            {tooltip}
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
                {headerRight}
            </div>

            <div className="relative group">
                <input
                    type="text"
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    className={cn(
                        "h-10 w-full text-base border-2 border-slate-200 bg-white rounded-xl hover:border-blue-600 focus:border-blue-600 focus:ring-4 focus:ring-blue-600/5 transition-all font-bold text-slate-900 focus:outline-none placeholder:text-slate-300 placeholder:font-normal placeholder:italic px-5 shrink-0"
                    )}
                    placeholder={placeholder}
                />
            </div>
        </div>
    )
}
