"use client"
import React, { useState, useMemo } from "react"
import {
    TrendingUp,
    CheckCircle2,
    Tag,
    Handshake
} from "lucide-react"

import {
    Counter,
    CalculatorInput,
    CalculatorCardHeader,
    ResultSummaryCard,
    currencies
} from "@/app/tools/_shared/components"
import { cn } from "@/lib/utils"
import { Card, CardContent } from "@/components/ui/card"
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
    commissionRate: 15,
    affiliateCount: "",
    salesPerAffiliate: "",
    refundRate: 5
}
export function AffiliateCommissionCalculator() {
    const [values, setValues] = useState<AffiliateState>(DEFAULT_STATE)
    const [currencyCode, setCurrencyCode] = useState("USD")
    // Get current currency symbol
    const currencySymbol = useMemo(() => {
        return currencies.find(c => c.code === currencyCode)?.symbol || "$"
    }, [currencyCode])
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
    const handleReset = () => {
        setValues(DEFAULT_STATE)
        setCurrencyCode("USD")
    }
    return (
        <div className="max-w-6xl mx-auto py-2">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch pt-2">
                {/* Left Column: Inputs */}
                <div className="lg:col-span-7 flex flex-col h-full space-y-3">
                    <Card className="border border-slate-200 shadow-sm bg-white overflow-hidden h-full flex flex-col rounded-3xl">
                        <CalculatorCardHeader
                            title="Program Configuration"
                            description="Set your pricing, costs, and affiliate terms to calculate payouts."
                            currency={currencyCode}
                            onCurrencyChange={setCurrencyCode}
                            onReset={handleReset}
                        />
                        <CardContent className="p-4 md:p-6 pb-12 md:pb-16 space-y-3 flex-1 flex flex-col">
                            {/* Section: Product & Pricing */}
                            <div className="space-y-3">
                                <div className="flex flex-col gap-4">
                                    <CalculatorInput
                                        hideSeparator={true}
                                        label="Product Price"
                                        value={values.productPrice}
                                        onChange={(v) => handleInputChange('productPrice', v)}
                                        placeholder="99.00"
                                        tooltip="Amount customers pay for one product."
                                        prefix={currencySymbol}
                                        groupingTitle="Product & Pricing"
                                        groupingIcon={Tag}
                                    />
                                    <CalculatorInput
                                        label="Product Cost (Your Cost)"
                                        value={values.productCost}
                                        onChange={(v) => handleInputChange('productCost', v)}
                                        placeholder="35.00"
                                        tooltip="Your cost to make or buy one product."
                                        prefix={currencySymbol}
                                    />
                                </div>
                            </div>
                            {/* Section: Scale */}
                            <div className="space-y-3">
                                <div className="flex flex-col gap-4">
                                    <CalculatorInput
                                        label="Number of Active Affiliates"
                                        value={values.affiliateCount}
                                        onChange={(v) => handleInputChange('affiliateCount', v)}
                                        placeholder="10"
                                        tooltip="How many affiliates are currently promoting your product."
                                        groupingTitle="Sales Projection"
                                        groupingIcon={TrendingUp}
                                    />
                                    <CalculatorInput
                                        label="Average Sales per Affiliate"
                                        value={values.salesPerAffiliate}
                                        onChange={(v) => handleInputChange('salesPerAffiliate', v)}
                                        placeholder="5"
                                        tooltip="Estimated sales generated by each affiliate."
                                    />
                                </div>
                            </div>
                            {/* Section: Affiliate Program */}
                            <div className="space-y-3 relative">
                                <div className="flex flex-col gap-4">
                                    <CalculatorInput
                                        label="Commission Rate"
                                        value={values.commissionRate}
                                        onChange={(v) => handleInputChange('commissionRate', v)}
                                        placeholder="15"
                                        tooltip="Percentage of each sale paid to affiliates. Industry average: 10–20%"
                                        suffix="%"
                                        hint="Industry standard range: 10% – 20%"
                                        groupingTitle="Affiliate Settings"
                                        groupingIcon={Handshake}
                                        benchmarkBadge={true}
                                    />
                                    <CalculatorInput
                                        label="Refund Rate"
                                        value={values.refundRate}
                                        onChange={(v) => handleInputChange('refundRate', v)}
                                        placeholder="5"
                                        tooltip="Estimated percentage of sales refunded. Industry average: 2–8%"
                                        suffix="%"
                                        hint="Industry standard range: 2% – 8%"
                                    />
                                </div>
                            </div>

                        </CardContent>
                    </Card>
                </div>
                {/* Right Column: Results */}
                <div className="lg:col-span-5 space-y-3">
                    <ResultSummaryCard
                        title={results.netRevenue < 0 ? "Estimated Loss (After Costs & Commissions)" : "Estimated Profit (After Costs & Commissions)"}
                        primaryResult={{
                            value: Math.round(results.netRevenue).toLocaleString(),
                            unit: currencySymbol,
                            label: results.netRevenue < 0 ? "Estimated Loss" : "Estimated Profit",
                            key: "netRevenue"
                        }}
                        secondaryResults={[
                            {
                                key: "totalPayout",
                                label: "Affiliate Payout",
                                value: Math.round(results.totalPayout).toLocaleString(),
                                unit: currencySymbol,
                                tooltip: "Total commission paid across all affiliates."
                            },
                            {
                                key: "netSales",
                                label: "Net Sales (units)",
                                value: Math.round(results.netSales).toString(),
                                unit: " units",
                                tooltip: "Total number of successful sales you actually keep after accounting for returns and refunds."
                            }
                        ]}
                        isCalculated={hasInputs}
                        profitLossKey="netRevenue"
                        emptyMessage="Enter your product price and commission rate to see your estimated profit."
                        dynamicMessages={{
                            positive: "Great job! Your affiliate program is structured for a healthy profit margin.",
                            negative: "Your program is operating at a loss. Try lowering the commission or reducing product costs.",
                            neutral: "Your program is breaking even. You're covering costs but not making a profit."
                        }}
                    />
                    {/* Break-Even inline alert — only shows when COGS is entered */}
                    {(hasInputs && Number(values.productCost) > 0) && (
                        <div className={cn(
                            "rounded-2xl p-4 border text-sm leading-relaxed transition-all shadow-sm",
                            results.isAboveBreakEven
                                ? "bg-red-50 border-red-100 text-red-900"
                                : "bg-emerald-50 border-emerald-100 text-emerald-900"
                        )}>
                            <div className="flex items-center gap-2 mb-2">
                                {results.isAboveBreakEven ? (
                                    <TrendingUp className="w-4 h-4 text-red-600 flex-shrink-0" />
                                ) : (
                                    <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                                )}
                                <span className="font-bold uppercase tracking-wider text-xs">
                                    {results.isAboveBreakEven ? "Loss Warning" : "Profit Safe"}
                                </span>
                            </div>
                            {results.isAboveBreakEven ? (
                                <p>
                                    Your <strong>{results.rate}%</strong> rate exceeds break-even (<strong>{results.breakEvenRate.toFixed(1)}%</strong>). You lose money on every sale.
                                </p>
                            ) : (
                                <p>
                                    Your <strong>{results.rate}%</strong> rate is safe. Break-even ceiling is <strong>{results.breakEvenRate.toFixed(1)}%</strong>.
                                </p>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
