"use client"

import React, { useState, useMemo, useEffect } from "react"
import {
    CheckCircle2,
    Info
} from "lucide-react"
import {
    InputCardHeader,
    ActionButtons
} from "../../ToolTemplate"
import { FadeIn, Counter, ResultFeedbackCard, CalculatorInput } from "@/app/tools/_shared/components"
import { cn } from "@/lib/utils"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Card, CardContent } from "@/components/ui/card"

interface ROPState {
    salesVelocity: number | ""
    leadTime: number | ""
    safetyStock: number | ""
}

const DEFAULT_STATE: ROPState = {
    salesVelocity: "",
    leadTime: "",
    safetyStock: ""
}

export function ReorderPointCalculator() {
    const [values, setValues] = useState<ROPState>(DEFAULT_STATE)
    const [isCopying, setIsCopying] = useState(false)

    const handleInputChange = (field: keyof ROPState, value: string | number) => {
        setValues(prev => ({ ...prev, [field]: value === "" ? "" : Number(value) }))
    }

    const hasInputs = useMemo(() => {
        return values.salesVelocity !== "" && values.leadTime !== ""
    }, [values])

    const results = useMemo(() => {
        const velocity = Number(values.salesVelocity) || 0
        const leadTime = Number(values.leadTime) || 0
        const safetyStock = Number(values.safetyStock) || 0

        const leadTimeDemand = velocity * leadTime
        const reorderPoint = leadTimeDemand + safetyStock

        return {
            leadTimeDemand,
            reorderPoint: Math.ceil(reorderPoint),
            safetyStock,
            totalCoverage: velocity > 0 ? Math.floor(reorderPoint / velocity) : 0
        }
    }, [values])

    const handleReset = () => setValues({
        salesVelocity: "",
        leadTime: "",
        safetyStock: ""
    })

    const handleCopy = async () => {
        setIsCopying(true)
        const text = `
Reorder Point Analysis:
-----------------------
- Daily Sales: ${values.salesVelocity} units
- Lead Time: ${values.leadTime} days
- Safety Stock: ${values.safetyStock} units

Result:
- REORDER POINT: ${results.reorderPoint} units
- Inventory Coverage: ${results.totalCoverage} days
        `.trim()

        await navigator.clipboard.writeText(text)
        setTimeout(() => setIsCopying(false), 2000)
    }

    return (
        <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch pt-6">

                {/* Left Column: Smart Inputs */}
                <div className="lg:col-span-7">
                    <Card className="border border-slate-200 shadow-sm bg-white overflow-hidden flex flex-col rounded-3xl h-fit">
                        <InputCardHeader
                            title="Calculator Inputs"
                            subtitle="Configure your inventory restock triggers."
                            scrollId="how-to-use"
                        />

                        <CardContent className="p-6 md:p-8 space-y-8 flex-1 flex flex-col">
                            <div className="space-y-5">
                                <CalculatorInput
                                    label="Daily Sales Velocity"
                                    value={values.salesVelocity}
                                    onChange={(v) => handleInputChange('salesVelocity', v)}
                                    placeholder="25"
                                    tooltip="How many units do you sell on average each day?"
                                />
                                <CalculatorInput
                                    label="Lead Time (Days)"
                                    value={values.leadTime}
                                    onChange={(v) => handleInputChange('leadTime', v)}
                                    placeholder="14"
                                    tooltip="How many days does it take from order to delivery?"
                                />
                                <CalculatorInput
                                    label="Safety Stock (Units)"
                                    value={values.safetyStock}
                                    onChange={(v) => handleInputChange('safetyStock', v)}
                                    placeholder="50"
                                    tooltip="How many units do you want to keep as an emergency buffer?"
                                />
                            </div>

                            <div className="pt-6 mt-auto border-t border-slate-100">
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
                <div className="lg:col-span-5 space-y-6">
                    <ResultFeedbackCard
                        title="REORDER POINT"
                        titleLabel="Live calculation"
                        mainValue={
                            <div className="flex flex-col">
                                <div className="flex items-baseline gap-2">
                                    <Counter value={results.reorderPoint} />
                                    <span className="text-2xl font-medium opacity-50">Units</span>
                                </div>
                                <p className="text-slate-400 text-sm font-bold mt-2">Units to trigger restock</p>
                            </div>
                        }
                    >
                        <div className="space-y-6">
                            {/* Secondary Metrics Grid - Now on Top */}
                            <div className="grid grid-cols-2 gap-4">
                                <div className="bg-white/5 rounded-xl p-4 border border-white/5">
                                    <p className="text-xs font-bold text-slate-300 mb-1">Stock coverage</p>
                                    <p className="text-xl font-bold text-blue-400">{results.totalCoverage} <span className="text-xs font-normal opacity-50">Days</span></p>
                                </div>
                                <div className="bg-white/5 rounded-xl p-4 border border-white/5 text-left">
                                    <p className="text-xs font-bold text-slate-300 mb-1">Lead time demand</p>
                                    <p className="text-xl font-bold text-blue-400">{Math.round(results.leadTimeDemand)}</p>
                                </div>
                            </div>

                            {/* Action Plan - Refined Style */}
                            <div className="bg-white/5 p-3 rounded-2xl border border-white/5">
                                <div className="flex items-center gap-2 mb-1">
                                    <CheckCircle2 className="w-4 h-4 text-blue-400" />
                                    <p className="text-slate-400 text-sm font-bold">Action plan</p>
                                </div>
                                <p className="text-[13px] font-medium text-slate-200 leading-relaxed">
                                    Place your next order when inventory reaches <span className="text-blue-400 font-bold">{results.reorderPoint} units</span> to stay ahead of demand and prevent stockouts.
                                </p>
                            </div>
                        </div>
                    </ResultFeedbackCard>

                    {/* Timeline Analysis - Premium Minimalist Style */}
                    {/* Restock Journey - Always Visible */}
                    <FadeIn delay={0.1}>
                        <div className="relative group/journey overflow-hidden rounded-[2rem] border border-slate-100 shadow-sm transition-all duration-500 bg-white/40 backdrop-blur-md">
                            {/* Card Content - Visible as skeleton when no inputs */}
                            <div className={cn(
                                "p-7 transition-all duration-700 min-h-[220px] flex flex-col",
                                !hasInputs && "opacity-40 pointer-events-none"
                            )}>
                                <div className="mb-10 flex items-center justify-between">
                                    <h2 className="text-sm font-medium uppercase tracking-wider text-slate-500">RESTOCK JOURNEY</h2>
                                </div>

                                <div className="px-2">
                                    <div className={cn(
                                        "relative h-1 rounded-full mb-10 transition-colors duration-500",
                                        !hasInputs ? "bg-slate-200/50 border border-dashed border-slate-300 h-[3px]" : "bg-slate-100 h-1"
                                    )}>
                                        {/* Progress Bar (Visible only when has inputs) */}
                                        <div
                                            className={cn(
                                                "absolute left-0 h-full bg-blue-600 rounded-full transition-all duration-1000",
                                                !hasInputs ? "w-0 opacity-0" : "w-[70%] opacity-100"
                                            )}
                                        />

                                        {/* Start Node */}
                                        <div className={cn(
                                            "absolute left-0 -top-1.5 w-4 h-4 bg-white border-2 rounded-full transition-all",
                                            !hasInputs ? "border-slate-300 shadow-sm" : "border-slate-200"
                                        )}>
                                            <div className="absolute top-7 left-0 -translate-x-1/2 flex flex-col items-center">
                                                <span className="text-[10px] font-bold text-slate-300 tracking-tighter whitespace-nowrap">Order sent</span>
                                                <span className="text-[8px] font-medium text-slate-500 whitespace-nowrap">Day 0</span>
                                            </div>
                                        </div>

                                        {/* Reorder Point Hub */}
                                        <div
                                            className={cn(
                                                "absolute -top-2 w-5 h-5 bg-white border-4 rounded-full shadow-sm z-10 transition-all duration-700",
                                                !hasInputs
                                                    ? "left-1/2 -translate-x-1/2 border-slate-300 opacity-60"
                                                    : "left-[70%] border-blue-600"
                                            )}
                                        >
                                            <div className="absolute -top-10 left-1/2 -translate-x-1/2 flex flex-col items-center">
                                                <div className={cn(
                                                    "px-2 py-0.5 rounded text-[9px] font-black whitespace-nowrap mb-1 transition-all duration-500",
                                                    !hasInputs ? "bg-slate-100 text-slate-400 border border-slate-200" : "bg-blue-600 text-white"
                                                )}>
                                                    {hasInputs ? `${results.reorderPoint} Units` : "Restock Point"}
                                                </div>
                                                <div className={cn("w-px h-3 transition-colors", !hasInputs ? "bg-slate-300" : "bg-blue-600/30")} />
                                            </div>
                                            <div className="absolute top-7 left-1/2 -translate-x-1/2 flex flex-col items-center">
                                                <span className={cn(
                                                    "text-[10px] font-bold tracking-tighter whitespace-nowrap transition-colors",
                                                    !hasInputs ? "text-blue-400" : "text-blue-600"
                                                )}>Order point</span>
                                            </div>
                                        </div>

                                        {/* Arrival Node */}
                                        <div className={cn(
                                            "absolute right-0 -top-1.5 w-4 h-4 bg-white border-2 rounded-full transition-all",
                                            !hasInputs ? "border-slate-300 shadow-sm" : "border-slate-200"
                                        )}>
                                            <div className="absolute top-7 right-0 translate-x-1/2 flex flex-col items-center">
                                                <span className="text-[10px] font-bold text-slate-300 tracking-tighter whitespace-nowrap">Delivery</span>
                                                <span className="text-[8px] font-medium text-slate-500 whitespace-nowrap">Day {hasInputs ? values.leadTime : "—"}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Floating Overlay for Empty State - Transparent Background */}
                            {!hasInputs && (
                                <div className="absolute inset-0 z-20 flex items-start justify-end p-7 pointer-events-none">
                                    <span className="text-[10px] font-black text-blue-600 uppercase tracking-widest bg-white shadow-xl shadow-blue-500/10 px-3 py-1.5 rounded-full border border-blue-100 animate-in fade-in zoom-in duration-500 pointer-events-auto">
                                        Awaiting Data
                                    </span>
                                </div>
                            )}
                        </div>
                    </FadeIn>
                </div>
            </div>
        </div>
    )
}


