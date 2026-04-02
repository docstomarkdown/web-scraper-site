"use client"
import React, { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { DollarSign, Percent, TrendingUp, Tag } from "lucide-react"
import { CalculatorCardHeader, CalculatorInput, FadeIn } from "@/app/tools/_shared/components"
import { ResultSummaryCard } from "@/app/tools/_shared/components/ResultSummaryCard"
import { WholesaleBreakdown } from "./WholesaleBreakdown"

export function WholesalePriceCalculator() {
    const [currency, setCurrency] = useState("USD")
    const [costOfGoods, setCostOfGoods] = useState<number | "">("")
    const [desiredMargin, setDesiredMargin] = useState<number | "">("")
    const [taxRate, setTaxRate] = useState<number | "">("")

    const handleReset = () => {
        setCostOfGoods("")
        setDesiredMargin("")
        setTaxRate("")
    }

    const val = (v: number | "") => (v === "" ? 0 : v)

    // Calculations
    const cost = val(costOfGoods)
    const margin = val(desiredMargin)
    const tax = val(taxRate)
    const effectiveCost = cost * (1 + tax / 100)
    const wholesalePrice = margin < 100 && effectiveCost > 0 ? effectiveCost / (1 - margin / 100) : 0
    const profitPerUnit = wholesalePrice - effectiveCost
    const markup = effectiveCost > 0 ? (profitPerUnit / effectiveCost) * 100 : 0

    const formatCurrency = (v: number) =>
        new Intl.NumberFormat("en-US", {
            style: "currency",
            currency,
            maximumFractionDigits: 2,
        }).format(v)

    const isCalculated = cost > 0 && margin > 0 && margin < 100

    return (
        <FadeIn className="w-full max-w-6xl mx-auto py-8 px-4" duration={0.6}>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                {/* Inputs Section */}
                <div className="lg:col-span-7 space-y-3 lg:sticky lg:top-8">
                    <Card className="border border-slate-200 shadow-sm bg-white overflow-hidden">
                        <CalculatorCardHeader
                            title="Pricing Details"
                            description="Enter product costs and your target margin."
                            onReset={handleReset}
                            guideId="wholesale-guide"
                            currency={currency}
                            onCurrencyChange={setCurrency}
                        />
                        <CardContent className="space-y-3 pt-6">
                            {/* Group 1: Cost Inputs */}
                            <div className="space-y-4 max-w-[520px] mx-auto w-full">
                                <CalculatorInput
                                    hideSeparator={true}
                                    groupingTitle="Product Costs"
                                    groupingIcon={Tag}
                                    label="Cost per Unit"
                                    isCurrency
                                    currency={currency}
                                    value={costOfGoods}
                                    onChange={setCostOfGoods}
                                    placeholder="10.00"
                                    max={1000000}
                                    tooltip="What you pay to produce or buy one unit of the product."
                                />
                                <CalculatorInput
                                    label="Tax / Duty Rate"
                                    suffix="%"
                                    isOptional
                                    value={taxRate}
                                    onChange={setTaxRate}
                                    placeholder="0"
                                    max={100}
                                    tooltip="Any import duty or tax rate applied on top of your production cost."
                                />
                            </div>
                            {/* Group 2: Margin Target */}
                            <div className="space-y-4 max-w-[520px] mx-auto w-full pt-2">
                                <CalculatorInput
                                    groupingTitle="Margin Target"
                                    groupingIcon={Percent}
                                    label="Desired Profit Margin"
                                    suffix="%"
                                    value={desiredMargin}
                                    onChange={setDesiredMargin}
                                    placeholder="40"
                                    max={99.9}
                                    tooltip="The profit percentage of the final selling price you want to achieve."
                                />
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Results Section */}
                <div className="lg:col-span-5 space-y-3">
                    <ResultSummaryCard
                        primaryResult={{
                            value: wholesalePrice,
                            isCurrency: true,
                            label: "Recommended Wholesale Price",
                            key: "wholesalePrice",
                        }}
                        secondaryResults={[
                            {
                                key: "profitPerUnit",
                                label: "Profit per Unit",
                                value: profitPerUnit,
                                isCurrency: true,
                                icon: DollarSign,
                                tooltip: "Revenue kept per unit after covering all costs. Formula: Wholesale Price − Effective Cost."
                            },
                            {
                                key: "markup",
                                label: "Required Markup",
                                value: `${markup.toFixed(2)}%`,
                                icon: TrendingUp,
                                tooltip: "The percentage added on top of your cost to reach this wholesale price. Markup is always higher than margin."
                            }
                        ]}
                        currency={currency}
                        isCalculated={isCalculated}
                        emptyMessage="Wholesale Price"
                        profitLossKey="profitPerUnit"
                        liveBadgeText={profitPerUnit > 0 ? "Profitable" : "Review Inputs"}
                        liveBadgeColor={profitPerUnit > 0 ? "emerald" : "amber"}
                        validationBadgeText={{ valid: "Profitable", invalid: "Loss" }}
                    />

                    {/* Price Breakdown Card */}
                    <FadeIn delay={0.1}>
                        <WholesaleBreakdown
                            effectiveCost={effectiveCost}
                            profitPerUnit={profitPerUnit}
                            wholesalePrice={wholesalePrice}
                            targetMargin={margin}
                            currency={currency}
                        />
                    </FadeIn>
                </div>
            </div>
        </FadeIn>
    )
}