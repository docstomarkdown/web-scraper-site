"use client"
import React, { useState } from "react"
import { Card, CardContent } from "../../../../../components/ui/card"
import {
    Wallet, ShoppingCart, TrendingUp, DollarSign, Box, Truck, PlusCircle, ChevronUp, Lock
} from "lucide-react"
import { cn } from "@/lib/utils"
import { FadeIn, CalculatorInput, CalculatorCardHeader, ResultSummaryCard } from "../../../_shared/components"
import { BudgetAllocation } from "./BudgetAllocation"

export function InfluencerROICalculator() {
    const [currency, setCurrency] = useState("USD")

    // Simple mode
    const [campaignCost, setCampaignCost] = useState<number | "">("")
    const [revenue, setRevenue] = useState<number | "">("")

    // Detail mode toggle
    const [showDetails, setShowDetails] = useState(false)

    // Detail cost breakdown
    const [influencerFee, setInfluencerFee] = useState<number | "">("")
    const [adSpend, setAdSpend] = useState<number | "">("")
    const [productCost, setProductCost] = useState<number | "">("")
    const [shippingCost, setShippingCost] = useState<number | "">("")

    const val = (v: number | "") => (v === "" ? 0 : v)

    const handleReset = () => {
        setCampaignCost("")
        setRevenue("")
        setInfluencerFee("")
        setAdSpend("")
        setProductCost("")
        setShippingCost("")
    }

    // ── Cost resolution: simple OR detailed, never both ──
    const fee = val(influencerFee)
    const ad = val(adSpend)
    const product = val(productCost)
    const shipping = val(shippingCost)

    const detailedCost = fee + ad + product + shipping

    const effectiveCost = showDetails ? detailedCost : val(campaignCost)
    const rev = val(revenue)

    const profitLoss = rev - effectiveCost
    const roi = effectiveCost > 0 ? (profitLoss / effectiveCost) * 100 : 0

    // Checklist logic switches based on mode
    const hasDetailedCost = detailedCost > 0

    const isCalculated = showDetails
        ? hasDetailedCost && rev > 0
        : val(campaignCost) > 0 && rev > 0

    const handleToggleDetails = () => {
        setShowDetails(v => !v)
        // Clear the other mode's data on switch to avoid stale state
        if (!showDetails) {
            setCampaignCost("") // entering detail mode
        } else {
            setInfluencerFee("")
            setAdSpend("")
            setProductCost("")
            setShippingCost("")
        }
    }

    // Budget Allocation Percentages
    const getPercent = (amount: number) => {
        return detailedCost > 0 ? Math.min(Math.max((amount / detailedCost) * 100, 0), 100) : 0
    }
    const feePct = getPercent(fee)
    const adPct = getPercent(ad)
    const productPct = getPercent(product)
    const shippingPct = getPercent(shipping)

    const formatCurrency = (v: number) => {
        try {
            return new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: currency,
                currencyDisplay: "narrowSymbol",
                maximumFractionDigits: 2,
            }).format(v)
        } catch {
            return new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: currency,
                maximumFractionDigits: 2,
            }).format(v)
        }
    }

    return (
        <FadeIn className="w-full max-w-6xl mx-auto py-2 px-4" duration={0.6}>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">

                {/* ── Input Card ── */}
                <div className="lg:col-span-7 space-y-3">
                    <Card className="border border-slate-200 shadow-xl shadow-slate-200/40 bg-white rounded-3xl overflow-hidden">
                        <CalculatorCardHeader
                            title="Campaign Details"
                            description="Enter your campaign cost and revenue to see your ROI instantly."
                            currency={currency}
                            onCurrencyChange={setCurrency}
                            onReset={handleReset}
                        />
                        <CardContent className="p-4 md:p-6 pb-12 md:pb-16 space-y-3 flex-1 flex flex-col">

                            {/* ── Total Campaign Cost (Simple Mode) ── */}
                            {!showDetails ? (
                                <CalculatorInput
                                    hideSeparator={true}
                                    label="Total Campaign Cost"
                                    value={campaignCost}
                                    onChange={setCampaignCost}
                                    placeholder="1500.00"
                                    tooltip="Total money spent on this campaign — influencer fee, ads, product gifts, etc."
                                    currency={currency}
                                    groupingTitle="Campaign"
                                    groupingIcon={DollarSign}
                                />
                            ) : (
                                /* ── Disabled / greyed-out Campaign Cost in detail mode ── */
                                <div className="max-w-[520px] mx-auto px-3 sm:px-5 w-full">
                                    <div className="flex items-center gap-2 -ml-[33px] mb-3">
                                        <div className="w-7 h-7 rounded-lg bg-blue-50 ring-[6px] ring-white flex items-center justify-center flex-shrink-0">
                                            <DollarSign className="w-3.5 h-3.5 text-blue-600" />
                                        </div>
                                        <span className="text-[16px] font-bold text-slate-600 tracking-tight">Campaign</span>
                                    </div>
                                    <div className="flex items-center justify-between w-full opacity-50 pointer-events-none select-none">
                                        <div className="flex items-center gap-1.5">
                                            <Lock className="w-3.5 h-3.5 text-slate-400" />
                                            <span className="text-[14.5px] font-medium text-slate-400">Total Campaign Cost</span>
                                        </div>
                                        <div className="flex items-center gap-2 h-11 px-4 rounded-xl border-2 border-dashed border-slate-200 bg-slate-50 w-36 sm:w-44 justify-end">
                                            <span className="text-[13px] text-slate-400 italic">Auto‑calculated</span>
                                        </div>
                                    </div>
                                    <p className="text-[11.5px] text-blue-500 mt-1.5 font-medium">
                                        Total cost will be calculated automatically from your breakdown below.
                                    </p>
                                </div>
                            )}

                            {/* ── Revenue (always shown) ── */}
                            <CalculatorInput
                                label="Revenue"
                                value={revenue}
                                onChange={setRevenue}
                                placeholder="5000.00"
                                tooltip="Total sales revenue generated from this campaign."
                                currency={currency}
                            />

                            <div className="w-full relative calculator-input-row max-w-[520px] mx-auto px-3 sm:px-5">
                                <div className="h-px bg-slate-100/80 w-[calc(100%+48px)] -ml-6 mb-3 mt-1" />
                                <button
                                    onClick={handleToggleDetails}
                                    className="flex items-center gap-2 w-full group -ml-[33px] relative z-10"
                                >
                                    <div className="w-7 h-7 rounded-lg bg-white ring-[6px] ring-white border border-slate-200 flex items-center justify-center flex-shrink-0 group-hover:bg-blue-50 group-hover:border-blue-200 transition-all duration-200 shadow-sm">
                                        <PlusCircle className={cn("w-3.5 h-3.5 transition-colors", showDetails ? "text-blue-500" : "text-slate-400 group-hover:text-blue-500")} />
                                    </div>
                                    <span className="text-[15px] font-bold text-slate-600 group-hover:text-blue-600 transition-colors flex-1 text-left tracking-tight">
                                        Advanced Settings
                                        <span className="ml-1.5 font-normal italic text-[12px] text-slate-400 lowercase tracking-normal group-hover:text-blue-400/80 transition-colors">(optional)</span>
                                    </span>
                                    {showDetails
                                        ? <ChevronUp className="w-4 h-4 text-slate-400 group-hover:text-blue-400 transition-colors" />
                                        : <ChevronUp className="w-4 h-4 text-slate-400 group-hover:text-blue-400 transition-colors rotate-180" />
                                    }
                                </button>
                            </div>

                            {/* ── Detail Cost Breakdown (mutually exclusive with simple cost) ── */}
                            {showDetails && (
                                <div className="space-y-3">
                                    <CalculatorInput
                                        hideSeparator={true}
                                        label="Influencer Fee"
                                        value={influencerFee}
                                        onChange={setInfluencerFee}
                                        placeholder="1000.00"
                                        tooltip="The flat fee or commission paid directly to the influencer."
                                        currency={currency}
                                        groupingTitle="Cost Breakdown"
                                        groupingIcon={Wallet}
                                        isOptional={true}
                                    />
                                    <CalculatorInput
                                        label="Ad Spend"
                                        value={adSpend}
                                        onChange={setAdSpend}
                                        placeholder="500.00"
                                        tooltip="Amount spent on paid ads to boost or promote this campaign."
                                        currency={currency}
                                        isOptional={true}
                                    />
                                    <CalculatorInput
                                        label="Product Cost"
                                        value={productCost}
                                        onChange={setProductCost}
                                        placeholder="200.00"
                                        tooltip="The cost to produce or purchase products sent to the influencer."
                                        currency={currency}
                                        groupingTitle="Product & Shipping"
                                        groupingIcon={Box}
                                        isOptional={true}
                                    />
                                    <CalculatorInput
                                        label="Shipping Cost"
                                        value={shippingCost}
                                        onChange={setShippingCost}
                                        placeholder="30.00"
                                        tooltip="Shipping and handling cost to send products to the influencer."
                                        currency={currency}
                                        isOptional={true}
                                    />
                                </div>
                            )}

                        </CardContent>
                    </Card>
                </div>

                {/* ── Results Card ── */}
                <div className="lg:col-span-5 lg:sticky lg:top-32 flex flex-col gap-3">
                    <ResultSummaryCard
                        currency={currency}
                        primaryResult={{
                            value: roi.toFixed(2),
                            unit: "%",
                            label: "Return on Investment"
                        }}
                        secondaryResults={[
                            {
                                key: "profitLoss",
                                label: "Net Profit",
                                value: profitLoss.toFixed(2),
                                isCurrency: true,
                                tooltip: "Revenue minus total campaign cost. Positive = profit. Negative = loss.",
                                icon: TrendingUp,
                            },
                        ]}
                        isCalculated={isCalculated}
                        profitLossKey="profitLoss"
                        emptyResultLabel="Return on Investment"
                        dynamicMessages={{
                            positive: "Great job! Your campaign is generating a positive return on investment.",
                            negative: "Your campaign is operating at a loss. Consider optimising your spend or improving conversions.",
                            neutral: "Your campaign broke even — you made back exactly what you spent."
                        }}
                        checklistItems={
                            showDetails
                                ? [
                                    { key: "detail", label: "Cost Breakdown", isComplete: hasDetailedCost },
                                    { key: "revenue", label: "Revenue", isComplete: rev !== 0 },
                                ]
                                : [
                                    { key: "cost", label: "Total Campaign Cost", isComplete: val(campaignCost) !== 0 },
                                    { key: "revenue", label: "Revenue", isComplete: rev !== 0 },
                                ]
                        }
                    />

                    {/* ── Budget Allocation Chart (Only visible in Detail Mode) ── */}
                    {showDetails && (
                        <FadeIn duration={0.4}>
                            <BudgetAllocation
                                fee={fee}
                                adSpend={ad}
                                productCost={product}
                                shippingCost={shipping}
                                totalCost={detailedCost}
                                feePct={feePct}
                                adPct={adPct}
                                productPct={productPct}
                                shippingPct={shippingPct}
                                formatCurrency={formatCurrency}
                            />
                        </FadeIn>
                    )}
                </div>

            </div>
        </FadeIn>
    )
}
