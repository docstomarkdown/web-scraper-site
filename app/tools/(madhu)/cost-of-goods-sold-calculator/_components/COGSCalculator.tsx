"use client"
import React, { useState, useMemo } from "react"
import {
    Info,
    RefreshCw,
    Copy,
    TrendingUp,
    Package,
    Truck
} from "lucide-react"
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger
} from "@/components/ui/tooltip"
import {
    InputCardHeader,
    ActionButtons
} from "../../ToolTemplate"
import { Counter, ResultFeedbackCard, CalculatorInput } from "@/app/tools/_shared/components"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"
interface COGSState {
    productCost: string | number
    inboundShipping: string | number
    duties: string | number
    packaging: string | number
    fulfillmentFee: string | number
    outboundShipping: string | number
    returnRate: string | number
    sellPrice: string | number
}
const DEFAULT_STATE: COGSState = {
    productCost: "",
    inboundShipping: "",
    duties: "",
    packaging: "",
    fulfillmentFee: "",
    outboundShipping: "",
    returnRate: "",
    sellPrice: ""
}
export function COGSCalculator() {
    const [values, setValues] = useState<COGSState>(DEFAULT_STATE)
    const handleInputChange = (field: keyof COGSState, value: string | number) => {
        setValues(prev => ({ ...prev, [field]: value === "" ? "" : value.toString() }))
    }
    const hasInputs = useMemo(() => {
        return Object.values(values).some(val => val !== "")
    }, [values])
    const results = useMemo(() => {
        const product = Number(values.productCost) || 0
        const inbound = Number(values.inboundShipping) || 0
        const duties = Number(values.duties) || 0
        const pkg = Number(values.packaging) || 0
        const fulfillment = Number(values.fulfillmentFee) || 0
        const outbound = Number(values.outboundShipping) || 0
        const rate = Number(values.returnRate) || 0
        const price = Number(values.sellPrice) || 0
        // 1. Landed Cost
        const landedCost = product + inbound + duties + pkg
        // 2. Return Risk (Simplified as % of Sell Price, as lost revenue/cost)
        // Alternatively, it could be % of COGS, but usually sellers budget a % of revenue for returns.
        const returnRiskCost = price * (rate / 100)
        // 3. True COGS (Total Cost to Sell one unit)
        // Landed Cost + Fulfillment (Pick/Pack) + Shipping to Customer + Return Allowance
        const trueCogs = landedCost + fulfillment + outbound + returnRiskCost
        // 4. Gross Profit & Margin
        const grossProfit = price - trueCogs
        const grossMargin = price > 0 ? (grossProfit / price) * 100 : 0
        return {
            landedCost,
            returnRiskCost,
            trueCogs,
            grossProfit,
            grossMargin
        }
    }, [values])
    const handleReset = () => setValues(DEFAULT_STATE)
    return (
        <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start pt-1">
                {/* Left Column: Inputs */}
                <div className="lg:col-span-7">
                    <Card className="border border-slate-200 shadow-sm bg-white overflow-hidden h-full flex flex-col rounded-3xl">
                        <InputCardHeader
                            title="Unit Economics"
                            subtitle="Calculate the true cost and profitability of a single product unit."
                            scrollId="how-to-use"
                        />
                        <CardContent className="p-6 md:p-8 space-y-8 flex-1 flex flex-col">
                            {/* Section 1: Acquisition Costs */}
                            <div className="space-y-3">
                                <label className="text-sm font-medium text-slate-700 flex items-center gap-2">
                                    <Package className="w-4 h-4 text-slate-400" />
                                    Acquisition (Landed) Cost
                                </label>
                                <div className="space-y-3">
                                    <CalculatorInput
                                        label="Product Cost"
                                        value={values.productCost}
                                        onChange={(v) => handleInputChange('productCost', v)}
                                        placeholder="15.00"
                                        prefix="$"
                                        tooltip="Cost per unit from supplier"
                                    />
                                    <CalculatorInput
                                        label="Inbound Shipping"
                                        value={values.inboundShipping}
                                        onChange={(v) => handleInputChange('inboundShipping', v)}
                                        placeholder="2.50"
                                        prefix="$"
                                        tooltip="Freight cost to get goods to you (per unit)"
                                    />
                                    <CalculatorInput
                                        label="Duties & Taxes"
                                        value={values.duties}
                                        onChange={(v) => handleInputChange('duties', v)}
                                        placeholder="1.25"
                                        prefix="$"
                                        tooltip="Customs duties, tariffs, and taxes"
                                    />
                                    <CalculatorInput
                                        label="Pkg. & Prep"
                                        value={values.packaging}
                                        onChange={(v) => handleInputChange('packaging', v)}
                                        placeholder="0.75"
                                        prefix="$"
                                        tooltip="Cost of packaging, polybags, labels, etc."
                                    />
                                </div>
                            </div>
                            {/* Section 2: Fulfillment & Sales */}
                            <div className="space-y-3">
                                <label className="text-sm font-medium text-slate-700 flex items-center gap-2">
                                    <Truck className="w-4 h-4 text-slate-400" />
                                    Fulfillment & Sales
                                </label>
                                <div className="space-y-3">
                                    <CalculatorInput
                                        label="Fulfillment Fee"
                                        value={values.fulfillmentFee}
                                        onChange={(v) => handleInputChange('fulfillmentFee', v)}
                                        placeholder="3.50"
                                        prefix="$"
                                        tooltip="Cost to pick and pack (e.g., FBA Fee)"
                                    />
                                    <CalculatorInput
                                        label="Outbound Ship"
                                        value={values.outboundShipping}
                                        onChange={(v) => handleInputChange('outboundShipping', v)}
                                        placeholder="4.00"
                                        prefix="$"
                                        tooltip="Shipping cost to customer (if not included in price)"
                                    />
                                    <CalculatorInput
                                        label="Est. Return Rate"
                                        value={values.returnRate}
                                        onChange={(v) => handleInputChange('returnRate', v)}
                                        placeholder="5"
                                        suffix="%"
                                        tooltip="Percentage of sales expected to be returned"
                                    />
                                    <CalculatorInput
                                        label="Target Sell Price"
                                        value={values.sellPrice}
                                        onChange={(v) => handleInputChange('sellPrice', v)}
                                        placeholder="49.99"
                                        prefix="$"
                                        tooltip="The price you intend to sell the product for"
                                    />
                                </div>
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
                <div className="lg:col-span-5 space-y-3 sticky top-6">
                    <ResultFeedbackCard
                        title="TRUE COGS"
                        titleLabel="Total Cost Per Unit"
                        mainValue={
                            <div className="flex flex-col">
                                <div className="flex items-baseline gap-2">
                                    <span className="text-4xl font-bold tracking-tight text-white">$</span>
                                    <Counter value={results.trueCogs} formatter={(v) => v.toFixed(2)} />
                                </div>
                                <p className="text-slate-400 text-xs font-bold mt-2">Landed + Fulfillment + Returns</p>
                            </div>
                        }
                    >
                        <div className="space-y-3">
                            {/* Breakdown Items - Updated to Match Reorder Point Calculator Style */}
                            <div className="grid grid-cols-2 gap-4">
                                <div className="bg-white/5 rounded-xl p-4 border border-white/5">
                                    <div className="flex items-center gap-1.5 justify-between mb-1">
                                        <div className="flex items-center gap-1.5">
                                            <p className="text-xs font-bold text-slate-300">Landed Cost</p>
                                            <TooltipProvider delayDuration={100}>
                                                <Tooltip>
                                                    <TooltipTrigger className="cursor-help">
                                                        <Info className="h-3.5 w-3.5 text-slate-400 hover:text-white transition-colors" />
                                                    </TooltipTrigger>
                                                    <TooltipContent side="top" className="max-w-xs text-xs bg-slate-900 text-white border-slate-800">
                                                        Cost of product plus shipping, duties, and packaging.
                                                    </TooltipContent>
                                                </Tooltip>
                                            </TooltipProvider>
                                        </div>
                                    </div>
                                    <div className="flex items-baseline gap-1">
                                        <span className="text-lg font-medium text-blue-400">$</span>
                                        <span className="text-xl font-bold text-blue-400">{results.landedCost.toFixed(2)}</span>
                                    </div>
                                </div>
                                <div className="bg-white/5 rounded-xl p-4 border border-white/5 text-left">
                                    <div className="flex items-center gap-1.5 justify-between mb-1">
                                        <div className="flex items-center gap-1.5">
                                            <p className="text-xs font-bold text-slate-300">Return Cost</p>
                                            <TooltipProvider delayDuration={100}>
                                                <Tooltip>
                                                    <TooltipTrigger className="cursor-help">
                                                        <Info className="h-3.5 w-3.5 text-slate-400 hover:text-white transition-colors" />
                                                    </TooltipTrigger>
                                                    <TooltipContent side="top" className="max-w-xs text-xs bg-slate-900 text-white border-slate-800">
                                                        Expected cost from returns based on estimated return rate.
                                                    </TooltipContent>
                                                </Tooltip>
                                            </TooltipProvider>
                                        </div>
                                    </div>
                                    <div className="flex items-baseline gap-1">
                                        <span className="text-lg font-medium text-blue-400">$</span>
                                        <span className="text-xl font-bold text-blue-400">{results.returnRiskCost.toFixed(2)}</span>
                                    </div>
                                </div>
                            </div>
                            {/* Profit Card */}
                            <div className={cn(
                                "rounded-xl p-5 border mt-4 transition-colors",
                                !hasInputs ? "bg-white/5 border-white/5" :
                                    results.grossProfit > 0 ? "bg-emerald-500/10 border-emerald-500/20" :
                                        "bg-rose-500/10 border-rose-500/20"
                            )}>
                                <div className="flex items-center justify-between mb-2">
                                    <div className="flex items-center gap-2">
                                        <div className={cn(
                                            "p-1.5 rounded-md",
                                            !hasInputs ? "bg-white/10 text-slate-400" :
                                                results.grossProfit > 0 ? "bg-emerald-500/20 text-emerald-400" :
                                                    "bg-rose-500/20 text-rose-400"
                                        )}>
                                            <TrendingUp className="w-4 h-4" />
                                        </div>
                                        <p className={cn(
                                            "text-xs font-bold uppercase tracking-wider",
                                            !hasInputs ? "text-blue-400" :
                                                results.grossProfit > 0 ? "text-emerald-400" :
                                                    "text-rose-400"
                                        )}>Gross Profit</p>
                                    </div>
                                    <span className={cn(
                                        "text-xs font-black px-2 py-1 rounded-full",
                                        !hasInputs ? "bg-white/10 text-slate-300" :
                                            results.grossProfit > 0 ? "bg-emerald-500/20 text-emerald-300" :
                                                "bg-rose-500/20 text-rose-300"
                                    )}>
                                        {results.grossMargin.toFixed(1)}% Margin
                                    </span>
                                </div>
                                <div className="flex items-baseline gap-1">
                                    <span className={cn(
                                        "text-lg font-medium",
                                        !hasInputs ? "text-blue-400" :
                                            results.grossProfit > 0 ? "text-emerald-500/60" :
                                                "text-rose-500/60"
                                    )}>$</span>
                                    <span className={cn(
                                        "text-3xl font-black",
                                        !hasInputs ? "text-blue-400" :
                                            results.grossProfit > 0 ? "text-emerald-400" :
                                                "text-rose-400"
                                    )}>
                                        {results.grossProfit.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </ResultFeedbackCard>
                    {/* Add a breakdown list or mini-chart if needed, but the above is quite dense already */}
                </div>
            </div>
        </div>
    )
}