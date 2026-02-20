"use client"

import React, { useState, useMemo } from "react"
import {
    Target,
    TrendingUp,
    ChevronUp,
    ChevronDown,
    CheckCircle2,
    Info
} from "lucide-react"
import {
    InputCardHeader,
    ActionButtons,
    MadhuSubHeader
} from "../../ToolTemplate"
import { FadeIn, Counter, ResultFeedbackCard } from "@/app/tools/_shared/components"
import { cn } from "@/lib/utils"
import { Card, CardContent } from "@/components/ui/card"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface AffiliateState {
    productPrice: string
    productCost: string
    commissionRate: string
    affiliateCount: string
    salesPerAffiliate: string
    refundRate: string
}

const DEFAULT_STATE: AffiliateState = {
    productPrice: "",
    productCost: "",
    commissionRate: "",
    affiliateCount: "",
    salesPerAffiliate: "",
    refundRate: ""
}

export function AffiliateCommissionCalculator() {
    const [values, setValues] = useState<AffiliateState>(DEFAULT_STATE)
    const [isCopying, setIsCopying] = useState(false)

    const handleInputChange = (field: keyof AffiliateState, value: string) => {
        if (value === "" || (/^\d*\.?\d*$/.test(value) && parseFloat(value) >= 0)) {
            setValues(prev => ({ ...prev, [field]: value }))
        }
    }

    const hasInputs = useMemo(() => {
        return values.productPrice !== "" && values.commissionRate !== ""
    }, [values])

    const results = useMemo(() => {
        const price = parseFloat(values.productPrice) || 0
        const cogs = parseFloat(values.productCost) || 0
        const rate = parseFloat(values.commissionRate) || 0
        const affiliates = parseFloat(values.affiliateCount) || 0
        const salesPer = parseFloat(values.salesPerAffiliate) || 0
        const refundRatePct = parseFloat(values.refundRate) || 0

        const grossMargin = price - cogs
        const breakEvenRate = price > 0 ? (grossMargin / price) * 100 : 0

        const commissionPerSale = price * (rate / 100)
        const netPerSale = price - commissionPerSale - cogs

        const totalGrossSales = affiliates * salesPer
        const refundedSales = totalGrossSales * (refundRatePct / 100)
        const netSales = totalGrossSales - refundedSales

        const totalPayout = commissionPerSale * netSales
        const totalRevenue = price * netSales
        const totalCOGS = cogs * netSales
        const netRevenue = totalRevenue - totalPayout - totalCOGS

        const isAboveBreakEven = rate > breakEvenRate && cogs > 0

        return {
            commissionPerSale,
            netPerSale,
            totalGrossSales,
            netSales,
            refundedSales,
            totalPayout,
            totalRevenue,
            totalCOGS,
            netRevenue,
            rate,
            breakEvenRate,
            isAboveBreakEven
        }
    }, [values])

    const handleReset = () => setValues(DEFAULT_STATE)

    const handleCopy = async () => {
        setIsCopying(true)
        const text = `
Affiliate Commission Analysis:
-------------------------------
Inputs:
- Product Price:       $${values.productPrice}
- Product Cost (COGS): $${values.productCost || "0"}
- Commission Rate:     ${values.commissionRate}%
- Refund Rate:         ${values.refundRate || "0"}%
- Active Affiliates:   ${values.affiliateCount || "0"}
- Sales per Affiliate: ${values.salesPerAffiliate || "0"}

Results:
- Commission per Sale:     $${results.commissionPerSale.toFixed(2)}
- Net Profit per Sale:     $${results.netPerSale.toFixed(2)}
- Net Sales (post-refund): ${Math.round(results.netSales)} units
- Total Payout:            $${results.totalPayout.toFixed(2)}
- Total Net Revenue:       $${results.netRevenue.toFixed(2)}
- Break-Even Rate:         ${results.breakEvenRate.toFixed(1)}%
        `.trim()

        await navigator.clipboard.writeText(text)
        setTimeout(() => setIsCopying(false), 2000)
    }

    return (
        <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch pt-6">

                {/* Left Column: Inputs */}
                <div className="lg:col-span-7">
                    <Card className="border border-slate-200 shadow-sm bg-white overflow-hidden h-full flex flex-col rounded-3xl">
                        <InputCardHeader
                            title="Program Configuration"
                            subtitle="Set your pricing, costs, and affiliate terms to calculate payouts."
                            scrollId="how-to-use"
                        />

                        <CardContent className="p-6 flex-1 flex flex-col gap-5">
                            {/* Section: Product & Pricing */}
                            <div className="space-y-3">
                                <MadhuSubHeader title="Product & Pricing" className="mb-2" withDot={false} />
                                <div className="grid grid-cols-2 gap-4">
                                    <AffiliateInput
                                        label="Product Price ($)"
                                        value={values.productPrice}
                                        onChange={(v) => handleInputChange('productPrice', v)}
                                        placeholder="e.g. 99.00"
                                        tooltip="The retail price your customer pays for the product or service."
                                    />
                                    <AffiliateInput
                                        label="Product Cost / COGS ($)"
                                        value={values.productCost}
                                        onChange={(v) => handleInputChange('productCost', v)}
                                        placeholder="e.g. 35.00"
                                        tooltip="Your cost to produce or purchase the product. Used to calculate your break-even commission rate."
                                    />
                                </div>
                            </div>

                            {/* Section: Affiliate Program */}
                            <div className="space-y-3">
                                <MadhuSubHeader title="Affiliate Program" className="mb-2" withDot={false} />
                                <div className="grid grid-cols-2 gap-4">
                                    <AffiliateInput
                                        label="Commission Rate (%)"
                                        value={values.commissionRate}
                                        onChange={(v) => handleInputChange('commissionRate', v)}
                                        placeholder="e.g. 20"
                                        tooltip="Percentage of the sale price paid to the affiliate for each conversion."
                                    />
                                    <AffiliateInput
                                        label="Refund Rate (%)"
                                        value={values.refundRate}
                                        onChange={(v) => handleInputChange('refundRate', v)}
                                        placeholder="e.g. 5"
                                        tooltip="% of orders that are refunded. Commissions are only paid on net, non-refunded sales — industry best practice."
                                    />
                                </div>
                            </div>

                            {/* Section: Scale */}
                            <div className="space-y-3">
                                <MadhuSubHeader title="Scale Projection" className="mb-2" withDot={false} />
                                <div className="grid grid-cols-2 gap-4">
                                    <AffiliateInput
                                        label="Active Affiliates"
                                        value={values.affiliateCount}
                                        onChange={(v) => handleInputChange('affiliateCount', v)}
                                        placeholder="e.g. 10"
                                        tooltip="Total number of active affiliates currently promoting your offer."
                                    />
                                    <AffiliateInput
                                        label="Sales per Affiliate"
                                        value={values.salesPerAffiliate}
                                        onChange={(v) => handleInputChange('salesPerAffiliate', v)}
                                        placeholder="e.g. 5"
                                        tooltip="Expected number of sales generated by each affiliate in this period."
                                    />
                                </div>
                            </div>

                            <div className="mt-auto pt-4 border-t border-slate-100">
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
                <div className="lg:col-span-5 space-y-5">
                    <ResultFeedbackCard
                        title="NET REVENUE"
                        titleLabel="After commissions & COGS"
                        mainValue={
                            <div className="flex flex-col">
                                <div className="flex items-baseline gap-1">
                                    <span className="text-3xl font-bold opacity-60">$</span>
                                    <Counter
                                        value={results.netRevenue}
                                        formatter={(v) => Math.round(v).toLocaleString()}
                                    />
                                </div>
                                <p className="text-slate-400 text-sm font-bold mt-2">Your take-home after all costs</p>
                            </div>
                        }
                    >
                        <div className="space-y-4">
                            {/* Metric Grid */}
                            <div className="grid grid-cols-2 gap-3">
                                <MetricCard
                                    label="Commission / Sale"
                                    tooltip="Dollar amount paid to the affiliate per successful sale."
                                    value={<div className="flex items-baseline gap-1 text-xl font-bold text-indigo-400"><span>$</span><Counter value={results.commissionPerSale} formatter={(v) => v.toFixed(2)} /></div>}
                                />
                                <MetricCard
                                    label="Total Payout"
                                    tooltip="Total commissions owed across all affiliates on net (non-refunded) sales."
                                    value={<div className="flex items-baseline gap-1 text-xl font-bold text-indigo-400"><span>$</span><Counter value={results.totalPayout} formatter={(v) => Math.round(v).toLocaleString()} /></div>}
                                />
                                <MetricCard
                                    label="Net Sales (units)"
                                    tooltip="Gross sales minus refunded orders. Commissions are calculated on this number only."
                                    value={<p className="text-xl font-bold text-emerald-400">{Math.round(results.netSales)}<span className="text-xs font-normal opacity-50 ml-1">units</span></p>}
                                />
                                <MetricCard
                                    label="Net / Sale"
                                    tooltip="Your profit per unit after product cost and affiliate commission are deducted."
                                    value={
                                        <div className={cn("flex items-baseline gap-1 text-xl font-bold", results.netPerSale >= 0 ? "text-emerald-400" : "text-red-400")}>
                                            <span>$</span>
                                            <Counter value={results.netPerSale} formatter={(v) => v.toFixed(2)} />
                                        </div>
                                    }
                                />
                            </div>

                            {/* Break-Even inline alert — only shows when COGS is entered */}
                            {(hasInputs && parseFloat(values.productCost) > 0) && (
                                <div className={cn(
                                    "rounded-xl p-3 border text-xs leading-relaxed transition-all",
                                    results.isAboveBreakEven
                                        ? "bg-red-500/10 border-red-500/20 text-red-200"
                                        : "bg-emerald-500/10 border-emerald-500/20 text-emerald-200"
                                )}>
                                    <div className="flex items-center gap-2 mb-1">
                                        {results.isAboveBreakEven ? (
                                            <TrendingUp className="w-3.5 h-3.5 text-red-400 flex-shrink-0" />
                                        ) : (
                                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                                        )}
                                        <span className="font-bold uppercase tracking-wider opacity-80">
                                            {results.isAboveBreakEven ? "Loss Warning" : "Profit Safe"}
                                        </span>
                                    </div>
                                    {results.isAboveBreakEven ? (
                                        <span>
                                            Your <strong>{results.rate}%</strong> rate exceeds break-even (<strong>{results.breakEvenRate.toFixed(1)}%</strong>). You lose money on every sale.
                                        </span>
                                    ) : (
                                        <span>
                                            Your <strong>{results.rate}%</strong> rate is safe. Break-even ceiling is <strong>{results.breakEvenRate.toFixed(1)}%</strong>.
                                        </span>
                                    )}
                                </div>
                            )}
                        </div>
                    </ResultFeedbackCard>

                    {/* Action Plan */}
                    <FadeIn delay={0.1}>
                        <div className="bg-white rounded-3xl border border-slate-200 p-5 shadow-sm">
                            <div className="flex items-center gap-2 mb-2">
                                <Target className="w-4 h-4 text-blue-500" />
                                <p className="text-slate-500 text-sm font-bold">Action plan</p>
                            </div>
                            <p className="text-[13px] font-medium text-slate-700 leading-relaxed">
                                For <span className="text-blue-600 font-bold">{Math.round(results.netSales)} net units</span> across{" "}
                                <span className="font-bold text-slate-900">{values.affiliateCount || 0} affiliate(s)</span>, you will pay out{" "}
                                <span className="font-bold text-indigo-600">${results.totalPayout.toFixed(0)}</span> and keep{" "}
                                <span className={cn("font-bold", results.netRevenue >= 0 ? "text-emerald-600" : "text-red-600")}>
                                    ${results.netRevenue.toFixed(0)}
                                </span> in net profit.
                            </p>
                        </div>
                    </FadeIn>
                </div>
            </div>
        </div>
    )
}

// ── Metric card inside the dark ResultFeedbackCard ──
function MetricCard({ label, value, tooltip }: { label: string; value: React.ReactNode; tooltip: string }) {
    return (
        <div className="bg-white/5 rounded-xl p-3 border border-white/5">
            <div className="flex items-center gap-1.5 mb-1">
                <p className="text-xs font-bold text-slate-300">{label}</p>
                <TooltipProvider delayDuration={0}>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <button type="button" className="text-slate-400 hover:text-white transition-colors cursor-help flex-shrink-0">
                                <Info className="h-3 w-3" />
                            </button>
                        </TooltipTrigger>
                        <TooltipContent side="top" className="max-w-[180px] text-xs bg-slate-900 text-white border-slate-700 p-2 rounded-lg z-50">
                            {tooltip}
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            </div>
            {value}
        </div>
    )
}

// ── Input field with tooltip icon, no leading icon ──
function AffiliateInput({
    label,
    value,
    onChange,
    tooltip,
    placeholder
}: {
    label: string,
    value: string,
    onChange: (v: string) => void,
    tooltip: string,
    placeholder: string
}) {
    return (
        <div className="space-y-1.5 group/input">
            <div className="flex items-center gap-1.5 pl-1">
                <label className="text-sm font-bold text-slate-600 group-focus-within/input:text-blue-600 transition-colors">
                    {label}
                </label>
                <TooltipProvider delayDuration={100}>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <button type="button" className="text-slate-500 hover:text-blue-500 transition-colors flex-shrink-0 cursor-help">
                                <Info className="h-3.5 w-3.5" />
                            </button>
                        </TooltipTrigger>
                        <TooltipContent side="top" className="max-w-[200px] text-xs bg-slate-900 text-white border-slate-700 p-2 rounded-lg z-50">
                            {tooltip}
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            </div>

            <div className="relative group">
                <input
                    type="text"
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    className="h-12 w-full text-base border-2 border-slate-200 bg-white rounded-xl px-4 hover:border-blue-600 focus:border-blue-600 focus:ring-4 focus:ring-blue-600/5 transition-all font-bold text-slate-900 focus:outline-none placeholder:text-slate-300 placeholder:font-normal placeholder:italic"
                    placeholder={placeholder}
                />
                <div className="absolute right-0 top-0 bottom-0 flex flex-col border-l border-slate-200 bg-slate-50/50 rounded-r-xl overflow-hidden group-hover:border-blue-600/50 transition-colors">
                    <button
                        onClick={() => onChange((parseFloat(value || "0") + 1).toString())}
                        className="flex items-center justify-center px-2 flex-1 hover:bg-blue-50 hover:text-blue-600 text-slate-400 transition-all border-b border-slate-100"
                    >
                        <ChevronUp className="h-3.5 w-3.5" />
                    </button>
                    <button
                        onClick={() => onChange(Math.max(0, (parseFloat(value || "0") - 1)).toString())}
                        className="flex items-center justify-center px-2 flex-1 hover:bg-red-50 hover:text-red-600 text-slate-400 transition-all"
                    >
                        <ChevronDown className="h-3.5 w-3.5" />
                    </button>
                </div>
            </div>
        </div>
    )
}
