"use client"

import React, { useState, useMemo } from "react"
import {
    TrendingUp,
    CheckCircle2,
    Info,
    Package,
    Users,
    BarChart3
} from "lucide-react"
import {
    InputCardHeader,
    ActionButtons,
    MadhuSubHeader
} from "../../ToolTemplate"
import { Counter, ResultFeedbackCard, CalculatorInput } from "@/app/tools/_shared/components"
import { cn } from "@/lib/utils"
import { Card, CardContent } from "@/components/ui/card"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface AffiliateState {
    productPrice: number | ""
    productCost: number | ""
    commissionRate: number | ""
    affiliateCount: number | ""
    salesPerAffiliate: number | ""
    refundRate: number | ""
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

    const handleInputChange = (field: keyof AffiliateState, value: string | number) => {
        setValues(prev => ({ ...prev, [field]: value === "" ? "" : Number(value) }))
    }

    const hasInputs = useMemo(() => {
        return values.productPrice !== "" && values.commissionRate !== ""
    }, [values])

    const results = useMemo(() => {
        const price = Number(values.productPrice) || 0
        const cogs = Number(values.productCost) || 0
        const rate = Number(values.commissionRate) || 0
        const affiliates = Number(values.affiliateCount) || 0
        const salesPer = Number(values.salesPerAffiliate) || 0
        const refundRatePct = Number(values.refundRate) || 0

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

        const isAboveBreakEven = rate > breakEvenRate

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
        <div className="max-w-6xl mx-auto py-2">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-stretch pt-2">

                {/* Left Column: Inputs */}
                <div className="lg:col-start-2 lg:col-span-6 flex flex-col h-full space-y-4">
                    <Card className="border border-slate-200 shadow-sm bg-white overflow-hidden h-full flex flex-col rounded-3xl">
                        <InputCardHeader
                            title="Program Configuration"
                            subtitle="Set your pricing, costs, and affiliate terms to calculate payouts."
                            scrollId="how-to-use"
                        />

                        <CardContent className="p-6 md:p-8 space-y-8 flex-1 flex flex-col">
                            {/* Section: Product & Pricing */}
                            <div className="space-y-3">
                                <MadhuSubHeader title="Product & Pricing" icon={Package} className="mb-2" withDot={false} />
                                <div className="flex flex-col gap-3">
                                    <CalculatorInput
                                        label="Product Price"
                                        value={values.productPrice}
                                        onChange={(v) => handleInputChange('productPrice', v)}
                                        placeholder="99.00"
                                        tooltip="The retail price your customer pays for the product or service."
                                        prefix="$"
                                    />
                                    <CalculatorInput
                                        label="Product Cost / COGS"
                                        value={values.productCost}
                                        onChange={(v) => handleInputChange('productCost', v)}
                                        placeholder="35.00"
                                        tooltip="Your cost to produce or purchase the product. Used to calculate your break-even commission rate."
                                        prefix="$"
                                    />
                                </div>
                            </div>

                            {/* Section: Affiliate Program */}
                            <div className="h-px bg-slate-100 w-full" />
                            <div className="space-y-3">
                                <MadhuSubHeader title="Affiliate Program" icon={Users} className="mb-2" withDot={false} />
                                <div className="flex flex-col gap-3">
                                    <CalculatorInput
                                        label="Commission Rate"
                                        value={values.commissionRate}
                                        onChange={(v) => handleInputChange('commissionRate', v)}
                                        placeholder="20"
                                        tooltip="Percentage of the sale price paid to the affiliate for each conversion."
                                        suffix="%"
                                    />
                                    <CalculatorInput
                                        label="Refund Rate"
                                        value={values.refundRate}
                                        onChange={(v) => handleInputChange('refundRate', v)}
                                        placeholder="5"
                                        tooltip="% of orders that are refunded. Commissions are only paid on net, non-refunded sales — industry best practice."
                                        suffix="%"
                                    />
                                </div>
                            </div>

                            {/* Section: Scale */}
                            <div className="h-px bg-slate-100 w-full" />
                            <div className="space-y-3">
                                <MadhuSubHeader title="Scale Projection" icon={BarChart3} className="mb-2" withDot={false} />
                                <div className="flex flex-col gap-3">
                                    <CalculatorInput
                                        label="Active Affiliates"
                                        value={values.affiliateCount}
                                        onChange={(v) => handleInputChange('affiliateCount', v)}
                                        placeholder="10"
                                        tooltip="Total number of active affiliates currently promoting your offer."
                                    />
                                    <CalculatorInput
                                        label="Sales per Affiliate"
                                        value={values.salesPerAffiliate}
                                        onChange={(v) => handleInputChange('salesPerAffiliate', v)}
                                        placeholder="5"
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
                <div className="lg:col-span-4 space-y-4">
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
                                    value={<div className="flex items-baseline gap-1 text-lg font-bold text-indigo-400"><span>$</span><Counter value={results.commissionPerSale} formatter={(v) => v.toFixed(2)} /></div>}
                                />
                                <MetricCard
                                    label="Total Payout"
                                    tooltip="Total commissions owed across all affiliates on net (non-refunded) sales."
                                    value={<div className="flex items-baseline gap-1 text-lg font-bold text-indigo-400"><span>$</span><Counter value={results.totalPayout} formatter={(v) => Math.round(v).toLocaleString()} /></div>}
                                />
                                <MetricCard
                                    label="Net Sales (units)"
                                    tooltip="Gross sales minus refunded orders. Commissions are calculated on this number only."
                                    value={<p className="text-lg font-bold text-emerald-400">{Math.round(results.netSales)}<span className="text-xs font-normal opacity-50 ml-1">units</span></p>}
                                />
                                <MetricCard
                                    label="Net / Sale"
                                    tooltip="Your profit per unit after product cost and affiliate commission are deducted."
                                    value={
                                        <div className={cn("flex items-baseline gap-1 text-lg font-bold", results.netPerSale >= 0 ? "text-emerald-400" : "text-red-400")}>
                                            <span>$</span>
                                            <Counter value={results.netPerSale} formatter={(v) => v.toFixed(2)} />
                                        </div>
                                    }
                                />
                            </div>

                            {/* Break-Even inline alert — only shows when COGS is entered */}
                            {(hasInputs && Number(values.productCost) > 0) && (
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


