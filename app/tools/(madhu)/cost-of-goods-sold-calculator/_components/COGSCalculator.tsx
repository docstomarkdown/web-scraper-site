"use client"

import React, { useState, useMemo } from "react"
import {
    Info,
    RefreshCw,
    Copy,
    Check
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
import { Counter, ResultFeedbackCard } from "@/app/tools/_shared/components"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface COGSState {
    productCost: string
    inboundShipping: string
    duties: string
    packaging: string
    fulfillmentFee: string
    outboundShipping: string
    returnRate: string
    sellPrice: string
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
    const [isCopying, setIsCopying] = useState(false)

    const handleInputChange = (field: keyof COGSState, value: string) => {
        if (value === "" || (/^\d*\.?\d*$/.test(value) && parseFloat(value) >= 0)) {
            setValues(prev => ({ ...prev, [field]: value }))
        }
    }

    const hasInputs = useMemo(() => {
        return Object.values(values).some(val => val !== "")
    }, [values])

    const results = useMemo(() => {
        const product = parseFloat(values.productCost) || 0
        const inbound = parseFloat(values.inboundShipping) || 0
        const duties = parseFloat(values.duties) || 0
        const pkg = parseFloat(values.packaging) || 0
        const fulfillment = parseFloat(values.fulfillmentFee) || 0
        const outbound = parseFloat(values.outboundShipping) || 0
        const rate = parseFloat(values.returnRate) || 0
        const price = parseFloat(values.sellPrice) || 0

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

    const handleCopy = async () => {
        setIsCopying(true)
        const text = `
COGS & Profitability Analysis:
-----------------------------
Sell Price: $${values.sellPrice}

Direct Costs:
- Product Cost: $${values.productCost}
- Inbound Shipping: $${values.inboundShipping}
- Duties & Taxes: $${values.duties}
- Packaging: $${values.packaging}
-----------------------------
= Landed Cost: $${results.landedCost.toFixed(2)}

Operational Costs:
- Fulfillment Fee: $${values.fulfillmentFee}
- Outbound Shipping: $${values.outboundShipping}
- Return Risk (${values.returnRate}%): $${results.returnRiskCost.toFixed(2)}

Summary:
-----------------------------
TRUE COGS: $${results.trueCogs.toFixed(2)}
GROSS PROFIT: $${results.grossProfit.toFixed(2)}
GROSS MARGIN: ${results.grossMargin.toFixed(1)}%
        `.trim()

        await navigator.clipboard.writeText(text)
        setTimeout(() => setIsCopying(false), 2000)
    }

    return (
        <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start pt-1">

                {/* Left Column: Inputs */}
                <div className="lg:col-span-7">
                    <Card className="border border-slate-200 shadow-sm bg-white overflow-hidden h-full flex flex-col rounded-3xl">
                        <InputCardHeader
                            title="Unit Economics"
                            subtitle="Calculate the true cost and profitability of a single product unit."
                            scrollId="how-to-use"
                        />

                        <CardContent className="p-5 md:p-6 space-y-4 flex-1 flex flex-col">

                            {/* Section 1: Acquisition Costs */}
                            <div className="space-y-3">
                                <h3 className="text-[15px] font-bold text-slate-400">
                                    Acquisition (Landed) Cost
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-5 gap-y-4">
                                    <COGSInput
                                        label="Product Cost"
                                        value={values.productCost}
                                        onChange={(v) => handleInputChange('productCost', v)}
                                        placeholder="Ex: 0.00"
                                        tooltip="Cost per unit from supplier"
                                    />
                                    <COGSInput
                                        label="Inbound Shipping"
                                        value={values.inboundShipping}
                                        onChange={(v) => handleInputChange('inboundShipping', v)}
                                        placeholder="Ex: 0.00"
                                        tooltip="Freight cost to get goods to you (per unit)"
                                    />
                                    <COGSInput
                                        label="Duties & Taxes"
                                        value={values.duties}
                                        onChange={(v) => handleInputChange('duties', v)}
                                        placeholder="Ex: 0.00"
                                        tooltip="Customs duties, tariffs, and taxes"
                                    />
                                    <COGSInput
                                        label="Pkg. & Prep"
                                        value={values.packaging}
                                        onChange={(v) => handleInputChange('packaging', v)}
                                        placeholder="Ex: 0.00"
                                        tooltip="Cost of packaging, polybags, labels, etc."
                                    />
                                </div>
                            </div>

                            {/* Section 2: Fulfillment & Sales */}
                            <div className="space-y-3 pt-4 border-t border-slate-100">
                                <h3 className="text-[15px] font-bold text-slate-400">
                                    Fulfillment & Sales
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-5 gap-y-4">
                                    <COGSInput
                                        label="Fulfillment Fee"
                                        value={values.fulfillmentFee}
                                        onChange={(v) => handleInputChange('fulfillmentFee', v)}
                                        placeholder="Ex: 0.00"
                                        tooltip="Cost to pick and pack (e.g., FBA Fee)"
                                    />
                                    <COGSInput
                                        label="Outbound Ship"
                                        value={values.outboundShipping}
                                        onChange={(v) => handleInputChange('outboundShipping', v)}
                                        placeholder="Ex: 0.00"
                                        tooltip="Shipping cost to customer (if not included in price)"
                                    />
                                    <COGSInput
                                        label="Est. Return Rate"
                                        value={values.returnRate}
                                        onChange={(v) => handleInputChange('returnRate', v)}
                                        placeholder="Ex: 0"
                                        suffix="%"
                                        prefix=""
                                        tooltip="Percentage of sales expected to be returned"
                                    />
                                    <COGSInput
                                        label="Target Sell Price"
                                        value={values.sellPrice}
                                        onChange={(v) => handleInputChange('sellPrice', v)}
                                        placeholder="Ex: 0.00"
                                        highlightColor="blue"
                                        tooltip="The price you intend to sell the product for"
                                    />
                                </div>
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
                <div className="lg:col-span-5 space-y-6 sticky top-6">
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
                        <div className="space-y-4">
                            {/* Breakdown Items - Updated to Match Reorder Point Calculator Style */}
                            <div className="grid grid-cols-2 gap-4">
                                <div className="bg-white/5 rounded-xl p-4 border border-white/5">
                                    <p className="text-xs font-bold text-slate-300 mb-1">Landed Cost</p>
                                    <div className="flex items-baseline gap-1">
                                        <span className="text-lg font-medium text-indigo-400/60">$</span>
                                        <span className="text-xl font-bold text-indigo-400">{results.landedCost.toFixed(2)}</span>
                                    </div>
                                </div>
                                <div className="bg-white/5 rounded-xl p-4 border border-white/5 text-left">
                                    <p className="text-xs font-bold text-slate-300 mb-1">Return Cost</p>
                                    <div className="flex items-baseline gap-1">
                                        <span className="text-lg font-medium text-emerald-400/60">$</span>
                                        <span className="text-xl font-bold text-emerald-400">{results.returnRiskCost.toFixed(2)}</span>
                                    </div>
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

function COGSInput({
    label,
    value,
    onChange,
    tooltip,
    placeholder,
    prefix = "$",
    suffix = "",
    highlightColor = "blue"
}: {
    label: string,
    value: string,
    onChange: (v: string) => void,
    tooltip: string,
    placeholder: string,
    prefix?: string,
    suffix?: string,
    highlightColor?: "blue" | "indigo"
}) {
    return (
        <div className="space-y-1.5 group/input relative z-10">
            <div className="flex items-center gap-1.5 mb-1 pl-1">
                <label className="text-sm font-bold text-slate-600">
                    {label}
                </label>
                {tooltip && (
                    <TooltipProvider delayDuration={100}>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <button type="button" className="text-slate-400 hover:text-blue-600 transition-colors">
                                    <Info className="h-3.5 w-3.5" />
                                </button>
                            </TooltipTrigger>
                            <TooltipContent side="top" className="max-w-xs text-xs bg-slate-900 text-white border-slate-800">
                                {tooltip}
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                )}
            </div>

            <div className="relative group bg-white">
                {prefix && (
                    <div className="absolute left-3 top-0 bottom-0 flex items-center pointer-events-none">
                        <span className="text-slate-400 font-medium text-sm">{prefix}</span>
                    </div>
                )}
                <input
                    type="text"
                    value={value ?? ""}
                    onChange={(e) => onChange(e.target.value)}
                    className={cn(
                        "h-11 w-full text-base border border-slate-200 bg-slate-50/50 rounded-lg px-4 transition-all font-bold text-slate-900 focus:outline-none focus:ring-2 focus:bg-white placeholder:text-slate-300 placeholder:font-normal placeholder:italic",
                        prefix ? "pl-7" : "pl-4",
                        suffix ? "pr-8" : "pr-4",
                        highlightColor === "indigo"
                            ? "focus:border-indigo-500/50 focus:ring-indigo-500/10"
                            : "focus:border-blue-500/50 focus:ring-blue-500/10"
                    )}
                    placeholder={placeholder}
                />
                {suffix && (
                    <div className="absolute right-3 top-0 bottom-0 flex items-center pointer-events-none">
                        <span className="text-slate-400 font-medium text-sm">{suffix}</span>
                    </div>
                )}
            </div>
        </div>
    )
}
