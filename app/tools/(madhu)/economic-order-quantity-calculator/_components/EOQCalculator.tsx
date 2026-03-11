"use client"
import React, { useState, useMemo } from "react"
import {
    Scale,
    Info
} from "lucide-react"
import {
    InputCardHeader
} from "../../ToolTemplate"
import { FadeIn, Counter, ResultFeedbackCard, CalculatorInput } from "@/app/tools/_shared/components"
import { cn } from "@/lib/utils"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Card, CardContent } from "@/components/ui/card"
interface EOQState {
    annualDemand: string | number
    orderCost: string | number
    holdingCost: string | number
}
const DEFAULT_STATE: EOQState = {
    annualDemand: "",
    orderCost: "",
    holdingCost: ""
}
export function EOQCalculator() {
    const [values, setValues] = useState<EOQState>(DEFAULT_STATE)
    const handleInputChange = (field: keyof EOQState, value: string | number) => {
        setValues(prev => ({ ...prev, [field]: value === "" ? "" : value.toString() }))
    }
    const hasInputs = useMemo(() => {
        return values.annualDemand !== "" && values.orderCost !== "" && values.holdingCost !== ""
            && Number(values.annualDemand) > 0 && Number(values.holdingCost) > 0
    }, [values])
    const results = useMemo(() => {
        const D = Number(values.annualDemand) || 0
        const S = Number(values.orderCost) || 0
        const H = Number(values.holdingCost) || 0
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
                            onReset={handleReset}
                        />
                        <CardContent className="p-6 md:p-8 pb-12 md:pb-16 space-y-8 flex-1 flex flex-col">
                            <div className="space-y-3">
                                <CalculatorInput
                                    label="Annual Demand (Units)"
                                    value={values.annualDemand}
                                    onChange={(v) => handleInputChange('annualDemand', v)}
                                    placeholder="10000"
                                    tooltip="The total number of units your business sells or uses in one year."
                                />
                                <CalculatorInput
                                    label="Ordering Cost"
                                    value={values.orderCost}
                                    onChange={(v) => handleInputChange('orderCost', v)}
                                    placeholder="50"
                                    prefix="$"
                                    tooltip="Fixed cost per purchase order (shipping, labor, admin processing)."
                                />
                                <CalculatorInput
                                    label="Annual Holding Cost"
                                    value={values.holdingCost}
                                    onChange={(v) => handleInputChange('holdingCost', v)}
                                    placeholder="2.50"
                                    prefix="$"
                                    tooltip="Cost to store one unit for one year (storage rent, insurance, capital cost)."
                                />
                            </div>

                        </CardContent>
                    </Card>
                </div>
                {/* Right Column: Results */}
                <div className="lg:col-span-5 space-y-3 flex flex-col">
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
                        <div className="space-y-3">
                            {/* Cost Breakdown Grid */}
                            <div className="grid grid-cols-2 gap-4">
                                <div className="bg-white/5 rounded-xl p-4 border border-white/5">
                                    <p className="text-xs font-bold text-slate-300 mb-1">Ordering Cost</p>
                                    <p className="text-xl font-bold text-blue-400">
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
                                    <h3 className="text-sm font-bold text-slate-300 uppercase tracking-wider">Cost Balance Analysis</h3>
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
