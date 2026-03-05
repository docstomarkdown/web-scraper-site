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
import { Counter, ResultFeedbackCard, CalculatorInput } from "@/app/tools/_shared/components"
import { cn } from "@/lib/utils"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Card, CardContent } from "@/components/ui/card"
interface TurnoverState {
    cogs: string | number
    beginningInventory: string | number
    endingInventory: string | number
    periodInDays: string | number
}
const DEFAULT_STATE: TurnoverState = {
    cogs: "",
    beginningInventory: "",
    endingInventory: "",
    periodInDays: ""
}
export function InventoryTurnoverCalculator() {
    const [values, setValues] = useState<TurnoverState>(DEFAULT_STATE)
    const handleInputChange = (field: keyof TurnoverState, value: string | number) => {
        setValues(prev => ({ ...prev, [field]: value === "" ? "" : value.toString() }))
    }
    const hasInputs = useMemo(() => {
        const cogs = Number(values.cogs) || 0
        const begInv = Number(values.beginningInventory) || 0
        const endInv = Number(values.endingInventory) || 0
        return values.cogs !== "" && (values.beginningInventory !== "" || values.endingInventory !== "") && cogs > 0
    }, [values])
    const results = useMemo(() => {
        const cogs = Number(values.cogs) || 0
        const begInv = Number(values.beginningInventory) || 0
        const endInv = Number(values.endingInventory) || 0
        const period = Number(values.periodInDays) || 365
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
    const getStatusStyles = (status: string) => {
        switch (status) {
            case "low": return "text-red-500 bg-red-50 border-red-100"
            case "moderate": return "text-amber-500 bg-amber-50 border-amber-100"
            case "high": return "text-blue-500 bg-blue-50 border-blue-100"
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
                        <CardContent className="p-6 md:p-8 space-y-8 flex-1 flex flex-col">
                            <div className="space-y-3">
                                <CalculatorInput
                                    label="Cost of Goods Sold (COGS)"
                                    value={values.cogs}
                                    onChange={(v) => handleInputChange('cogs', v)}
                                    placeholder="150000"
                                    tooltip="The total cost of products sold during the period (found on your Income Statement)."
                                    prefix="$"
                                />
                                <div className="space-y-2">
                                    <div className="flex gap-1.5 justify-end w-full">
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
                                    <CalculatorInput
                                        label="Analysis Period (Days)"
                                        value={values.periodInDays}
                                        onChange={(v) => handleInputChange('periodInDays', v)}
                                        placeholder="365"
                                        tooltip="Length of time analyzed. Standard: 365 (Year), 90 (Quarter), 30 (Month)."
                                    />
                                </div>
                                <CalculatorInput
                                    label="Beginning Inventory"
                                    value={values.beginningInventory}
                                    onChange={(v) => handleInputChange('beginningInventory', v)}
                                    placeholder="25000"
                                    tooltip="Value of stock at the start of the period."
                                    prefix="$"
                                />
                                <CalculatorInput
                                    label="Ending Inventory"
                                    value={values.endingInventory}
                                    onChange={(v) => handleInputChange('endingInventory', v)}
                                    placeholder="35000"
                                    tooltip="Value of stock at the end of the period."
                                    prefix="$"
                                />
                            </div>
                            <div className="pt-6 mt-auto border-t border-slate-100">
                                <ActionButtons
                                    onReset={handleReset}
                                />
                            </div>
                        </CardContent>
                    </Card>
                </div>
                {/* Right Column: Results */}
                <div className="lg:col-span-5 space-y-3 flex flex-col">
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
                                    <span className="text-2xl font-medium text-blue-400">x</span>
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
                        <div className="space-y-3">
                            <div className="grid grid-cols-2 gap-4">
                                <TooltipProvider delayDuration={100}>
                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                            <div className="bg-white/5 rounded-xl p-4 border border-white/5 cursor-help transition-all hover:bg-white/10">
                                                <p className="text-xs font-bold text-slate-300 mb-1 flex items-center gap-1.5">
                                                    DSI (Runway)
                                                    <Info className="w-3 h-3 text-slate" />
                                                </p>
                                                <p className="text-xl font-bold text-blue-400">
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
                                                <p className="text-xl font-bold text-blue-400">
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