"use client"

import React, { useState, useMemo } from "react"
import {
    TrendingUp,
    CheckCircle2,
    Package,
    Users,
    BarChart3
} from "lucide-react"
import {
    ActionButtons,
} from "../../ToolTemplate"
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
    commissionRate: "",
    affiliateCount: "",
    salesPerAffiliate: "",
    refundRate: ""
}

export function AffiliateCommissionCalculator() {
    const [values, setValues] = useState<AffiliateState>(DEFAULT_STATE)
    const [currencyCode, setCurrencyCode] = useState("USD")
    const [isCopying, setIsCopying] = useState(false)

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

    const handleCopy = async () => {
        setIsCopying(true)
        const text = `
Affiliate Commission Analysis:
-------------------------------
Inputs:
- Product Price:       ${currencySymbol}${values.productPrice}
- Product Cost (COGS): ${currencySymbol}${values.productCost || "0"}
- Commission Rate:     ${values.commissionRate}%
- Refund Rate:         ${values.refundRate || "0"}%
- Active Affiliates:   ${values.affiliateCount || "0"}
- Sales per Affiliate: ${values.salesPerAffiliate || "0"}

Results:
- Commission per Sale:     ${currencySymbol}${results.commissionPerSale.toFixed(2)}
- Net Profit per Sale:     ${currencySymbol}${results.netPerSale.toFixed(2)}
- Net Sales (post-refund): ${Math.round(results.netSales)} units
- Total Payout:            ${currencySymbol}${results.totalPayout.toFixed(2)}
- Total Net Revenue:       ${currencySymbol}${results.netRevenue.toFixed(2)}
- Break-Even Rate:         ${results.breakEvenRate.toFixed(1)}%
        `.trim()

        await navigator.clipboard.writeText(text)
        setTimeout(() => setIsCopying(false), 2000)
    }

    return (
        <div className="max-w-6xl mx-auto py-2">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch pt-2">

                {/* Left Column: Inputs */}
                <div className="lg:col-span-7 flex flex-col h-full space-y-4">
                    <Card className="border border-slate-200 shadow-sm bg-white overflow-hidden h-full flex flex-col rounded-3xl">
                        <CalculatorCardHeader
                            title="Program Configuration"
                            description="Set your pricing, costs, and affiliate terms to calculate payouts."
                            currency={currencyCode}
                            onCurrencyChange={setCurrencyCode}
                        />

                        <CardContent className="p-5 md:p-6 space-y-6 flex-1 flex flex-col">
                            {/* Section: Product & Pricing */}
                            <div className="space-y-3">
                                <div className="flex flex-col gap-4">
                                    <CalculatorInput
                                        label="Product Price"
                                        value={values.productPrice}
                                        onChange={(v) => handleInputChange('productPrice', v)}
                                        placeholder="99.00"
                                        tooltip="The retail price your customer pays for the product or service."
                                        prefix={currencySymbol}
                                        groupingTitle="Product & Pricing"
                                        groupingIcon={Package}
                                    />
                                    <CalculatorInput
                                        label="Product Cost / COGS"
                                        value={values.productCost}
                                        onChange={(v) => handleInputChange('productCost', v)}
                                        placeholder="35.00"
                                        tooltip="Your cost to produce or purchase the product."
                                        prefix={currencySymbol}
                                    />
                                </div>
                            </div>

                            <Separator />

                            {/* Section: Affiliate Program */}
                            <div className="space-y-3">
                                <div className="flex flex-col gap-4">
                                    <CalculatorInput
                                        label="Commission Rate"
                                        value={values.commissionRate}
                                        onChange={(v) => handleInputChange('commissionRate', v)}
                                        placeholder="20"
                                        tooltip="Percentage of the sale price paid to the affiliate for each conversion."
                                        suffix="%"
                                        groupingTitle="Affiliate Program"
                                        groupingIcon={Users}
                                    />
                                    <CalculatorInput
                                        label="Refund Rate"
                                        value={values.refundRate}
                                        onChange={(v) => handleInputChange('refundRate', v)}
                                        placeholder="5"
                                        tooltip="Expected percentage of orders that will be refunded or returned."
                                        suffix="%"
                                    />
                                </div>
                            </div>

                            <Separator />

                            {/* Section: Scale */}
                            <div className="space-y-3">
                                <div className="flex flex-col gap-4">
                                    <CalculatorInput
                                        label="Active Affiliates"
                                        value={values.affiliateCount}
                                        onChange={(v) => handleInputChange('affiliateCount', v)}
                                        placeholder="10"
                                        tooltip="Total number of affiliates promoting your product."
                                        groupingTitle="Scale Projection"
                                        groupingIcon={BarChart3}
                                    />
                                    <CalculatorInput
                                        label="Sales per Affiliate"
                                        value={values.salesPerAffiliate}
                                        onChange={(v) => handleInputChange('salesPerAffiliate', v)}
                                        placeholder="5"
                                        tooltip="Average sales each affiliate is expected to generate."
                                    />
                                </div>
                            </div>

                            <div className="mt-auto pt-6 border-t border-slate-100">
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
                <div className="lg:col-span-5 space-y-4">
                    <ResultSummaryCard
                        title="NET REVENUE (After commissions & COGS)"
                        primaryResult={{
                            value: Math.round(results.netRevenue).toLocaleString(),
                            unit: currencySymbol,
                            label: "Estimated Profit"
                        }}
                        secondaryResults={[
                            {
                                key: "commissionPerSale",
                                label: "Commission / Sale",
                                value: results.commissionPerSale.toFixed(2),
                                unit: currencySymbol,
                                tooltip: "Amount earned by an affiliate for one sale."
                            },
                            {
                                key: "totalPayout",
                                label: "Total Payout",
                                value: Math.round(results.totalPayout).toLocaleString(),
                                unit: currencySymbol,
                                tooltip: "Total commission paid to all affiliates."
                            },
                            {
                                key: "netSales",
                                label: "Net Sales (units)",
                                value: Math.round(results.netSales).toString(),
                                unit: " units",
                                tooltip: "Successful sales after refunds are deducted."
                            },
                            {
                                key: "netPerSale",
                                label: "Net / Sale",
                                value: results.netPerSale.toFixed(2),
                                unit: currencySymbol,
                                tooltip: "Your earnings per sale after costs and commissions."
                            }
                        ]}
                        isCalculated={hasInputs}
                        profitLossKey="netPerSale"
                    // description="Estimated profit after paying affiliates and product costs."
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

const Separator = () => <div className="h-px w-full bg-slate-100" />



