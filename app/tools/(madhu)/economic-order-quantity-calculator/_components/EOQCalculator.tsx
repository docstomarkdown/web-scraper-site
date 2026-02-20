"use client"

import React, { useState, useMemo } from "react"
import {
    Scale,
    Info
} from "lucide-react"
import {
    InputCardHeader,
    ActionButtons
} from "../../ToolTemplate"
import { FadeIn, Counter, ResultFeedbackCard } from "@/app/tools/_shared/components"
import { cn } from "@/lib/utils"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Card, CardContent } from "@/components/ui/card"

interface EOQState {
    annualDemand: string
    orderCost: string
    holdingCost: string
}

const DEFAULT_STATE: EOQState = {
    annualDemand: "",
    orderCost: "",
    holdingCost: ""
}

export function EOQCalculator() {
    const [values, setValues] = useState<EOQState>(DEFAULT_STATE)
    const [isCopying, setIsCopying] = useState(false)

    const handleInputChange = (field: keyof EOQState, value: string) => {
        if (value === "" || (/^\d*\.?\d*$/.test(value) && parseFloat(value) >= 0)) {
            setValues(prev => ({ ...prev, [field]: value }))
        }
    }

    const hasInputs = useMemo(() => {
        return values.annualDemand !== "" && values.orderCost !== "" && values.holdingCost !== ""
            && parseFloat(values.annualDemand) > 0 && parseFloat(values.holdingCost) > 0
    }, [values])

    const results = useMemo(() => {
        const D = parseFloat(values.annualDemand) || 0
        const S = parseFloat(values.orderCost) || 0
        const H = parseFloat(values.holdingCost) || 0

        if (D === 0 || H === 0) return {
            eoq: 0,
            annualOrders: 0,
            annualOrderCost: 0,
            annualHoldingCost: 0,
            totalCost: 0
        }

        const eoq = Math.sqrt((2 * D * S) / H)
        const annualOrders = D / eoq
        const annualOrderCost = annualOrders * S
        const annualHoldingCost = (eoq / 2) * H
        const totalCost = annualOrderCost + annualHoldingCost

        return {
            eoq: Math.round(eoq),
            annualOrders: annualOrders.toFixed(1),
            annualOrderCost: annualOrderCost,
            annualHoldingCost: annualHoldingCost,
            totalCost: totalCost
        }
    }, [values])

    const handleReset = () => setValues({
        annualDemand: "",
        orderCost: "",
        holdingCost: ""
    })

    const handleCopy = async () => {
        setIsCopying(true)
        const text = `
Economic Order Quantity (EOQ) Analysis:
---------------------------------------
- Annual Demand: ${values.annualDemand} units
- Ordering Cost: $${values.orderCost} per order
- Holding Cost: $${values.holdingCost} per unit/year

Results:
- OPTIMAL ORDER QUANTITY (EOQ): ${results.eoq} units
- Orders Per Year: ${results.annualOrders}
- Total Annual Cost: $${results.totalCost.toFixed(2)}
        `.trim()

        await navigator.clipboard.writeText(text)
        setTimeout(() => setIsCopying(false), 2000)
    }

    return (
        <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch pt-6">

                {/* Left Column: Smart Inputs */}
                <div className="lg:col-span-7">
                    <Card className="border border-slate-200 shadow-sm bg-white overflow-hidden h-full flex flex-col rounded-[2.5rem]">
                        <InputCardHeader
                            title="EOQ Configuration"
                            subtitle="Configure your annual supply chain costs to identify your optimal order equilibrium."
                            scrollId="how-to-use"
                        />

                        <CardContent className="p-5 md:p-6 space-y-6 flex-1 flex flex-col">
                            <div className="space-y-5">
                                <EOQInput
                                    label="Annual Demand (Units)"
                                    value={values.annualDemand}
                                    onChange={(v) => handleInputChange('annualDemand', v)}
                                    placeholder="Ex: 10000"
                                    tooltip="The total number of units your business sells or uses in one year."
                                />
                                <EOQInput
                                    label="Ordering Cost ($)"
                                    value={values.orderCost}
                                    onChange={(v) => handleInputChange('orderCost', v)}
                                    placeholder="Ex: 50"
                                    isCurrency
                                    tooltip="Fixed cost per purchase order (shipping, labor, admin processing)."
                                />
                                <EOQInput
                                    label="Annual Holding Cost ($)"
                                    value={values.holdingCost}
                                    onChange={(v) => handleInputChange('holdingCost', v)}
                                    placeholder="Ex: 2.50"
                                    isCurrency
                                    tooltip="Cost to store one unit for one year (storage rent, insurance, capital cost)."
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
                        title="OPTIMAL ORDER QUANTITY"
                        titleLabel="EOQ Result"
                        className="flex-shrink-0"
                        mainValue={
                            <div className="flex flex-col">
                                <div className="flex items-baseline gap-2">
                                    <Counter value={results.eoq} />
                                    <span className="text-2xl font-medium opacity-50">Units</span>
                                </div>
                                <p className="text-slate-400 text-sm font-bold mt-2">Units per order to minimize cost</p>
                            </div>
                        }
                    >
                        <div className="space-y-6">
                            {/* Cost Breakdown Grid */}
                            <div className="grid grid-cols-2 gap-4">
                                <div className="bg-white/5 rounded-xl p-4 border border-white/5">
                                    <p className="text-xs font-bold text-slate-300 mb-1">Ordering Cost</p>
                                    <p className="text-xl font-bold text-indigo-400">
                                        {hasInputs ? `$${results.annualOrderCost.toFixed(0)}` : "$0"}
                                    </p>
                                </div>
                                <div className="bg-white/5 rounded-xl p-4 border border-white/5 text-left">
                                    <p className="text-xs font-bold text-slate-300 mb-1">Holding Cost</p>
                                    <p className="text-xl font-bold text-blue-400">
                                        {hasInputs ? `$${results.annualHoldingCost.toFixed(0)}` : "$0"}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </ResultFeedbackCard>

                    {/* Cost Balance Summary */}
                    <FadeIn delay={0.1}>
                        <div className="bg-white rounded-[2rem] border border-slate-200 shadow-sm p-6 overflow-hidden relative group">
                            {/* Subtle Background Pattern */}
                            <div className="absolute top-0 right-0 -mr-16 -mt-16 w-32 h-32 bg-blue-50/50 rounded-full blur-3xl group-hover:bg-blue-100/50 transition-colors duration-500" />

                            <div className="flex items-center justify-between mb-4 relative z-10">
                                <div className="flex items-center gap-2.5">
                                    <div className="p-1.5 bg-blue-50 rounded-lg text-blue-600 border border-blue-100/50">
                                        <Scale className="w-4 h-4" />
                                    </div>
                                    <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider">Cost Balance Analysis</h3>
                                </div>
                                {!hasInputs && (
                                    <span className="text-[9px] font-black text-blue-600 uppercase tracking-widest bg-blue-50/80 backdrop-blur-sm px-2.5 py-1 rounded-lg border border-blue-100/50 animate-pulse">
                                        Waiting
                                    </span>
                                )}
                            </div>

                            {hasInputs ? (
                                <div className="relative">
                                    <div className="flex flex-col">
                                        <div className="flex-1 min-w-0">
                                            <h4 className="text-base font-bold text-slate-900 mb-1 flex items-center gap-2">
                                                Optimal Equilibrium
                                            </h4>
                                            <p className="text-[14px] text-slate-500 leading-relaxed font-medium mb-4 pr-4">
                                                At <span className="text-blue-600 font-bold">{results.eoq} units</span>, your ordering and storage costs are perfectly balanced.
                                            </p>

                                            <div className="flex items-center gap-2 overflow-hidden">
                                                <div className="px-3 py-1.5 bg-slate-50 rounded-xl border border-slate-100 flex items-center gap-2 group-hover:border-blue-200 group-hover:bg-blue-50/30 transition-all duration-300">
                                                    <span className="text-xs text-slate-500 font-bold whitespace-nowrap">Annual Spend</span>
                                                    <span className="text-[15px] text-slate-900 font-black tracking-tight">${results.totalCost.toFixed(0)}</span>
                                                </div>
                                                <div className="flex-1 h-[1px] bg-gradient-to-r from-slate-100 to-transparent" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div className="relative">
                                    <div className="flex flex-col">
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center justify-between mb-1">
                                                <h4 className="text-base font-bold text-slate-900">Optimal Equilibrium</h4>
                                            </div>
                                            <p className="text-[14px] text-slate-500 leading-relaxed font-medium mb-4 pr-4">
                                                At <span className="text-blue-400 font-bold">0 units</span>, your ordering and storage costs will be perfectly balanced.
                                            </p>

                                            <div className="flex items-center gap-2 overflow-hidden">
                                                <div className="px-3 py-1.5 bg-slate-50/50 rounded-xl border border-slate-100 flex items-center gap-2">
                                                    <span className="text-xs text-slate-400 font-bold whitespace-nowrap">Annual Spend</span>
                                                    <span className="text-[15px] text-slate-400 font-black tracking-tight">$0</span>
                                                </div>
                                                <div className="flex-1 h-[1px] bg-slate-100/50" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </FadeIn>
                </div>
            </div>
        </div>
    )
}

function EOQInput({
    label,
    value,
    onChange,
    tooltip,
    placeholder,
    isCurrency = false
}: {
    label: string,
    value: string,
    onChange: (v: string) => void,
    tooltip: string,
    placeholder: string,
    isCurrency?: boolean
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
            </div>

            <div className="relative group">
                {isCurrency && (
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-base font-bold text-slate-400 transition-colors group-focus-within:text-blue-600">
                        $
                    </div>
                )}
                <input
                    type="text"
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    className={cn(
                        "h-10 w-full text-base border-2 border-slate-200 bg-white rounded-xl hover:border-blue-600 focus:border-blue-600 focus:ring-4 focus:ring-blue-600/5 transition-all font-bold text-slate-900 focus:outline-none placeholder:text-slate-300 placeholder:font-normal placeholder:italic shrink-0",
                        isCurrency ? "pl-8 pr-5" : "px-5"
                    )}
                    placeholder={placeholder}
                />
            </div>
        </div>
    )
}
