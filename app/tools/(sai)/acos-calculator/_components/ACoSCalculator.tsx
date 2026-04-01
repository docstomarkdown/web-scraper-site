"use client"
import React, { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { TrendingUp, DollarSign, Percent, BarChart3, AlertCircle, CheckCircle2 } from "lucide-react"
import { FadeIn, Counter, CalculatorInput, ResultFeedbackCard, CalculatorCardHeader } from "@/app/tools/_shared/components"
import { ResultSummaryCard } from "@/app/tools/_shared/components/ResultSummaryCard"
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip as RechartsTooltip } from "recharts"
import { PieChart as PieChartIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { motion } from "framer-motion"
import { ACoSBreakdown } from "./ACoSBreakdown"
export function ACoSCalculator() {
    const [currency, setCurrency] = useState<string>("USD")
    const [adSpend, setAdSpend] = useState<number | "">("")
    const [adRevenue, setAdRevenue] = useState<number | "">("")
    const [profitMargin, setProfitMargin] = useState<number | "">("")
    const [acos, setAcos] = useState<number>(0)
    const [roas, setRoas] = useState<number>(0)
    const [netProfit, setNetProfit] = useState<number>(0)
    const [breakevenAcos, setBreakevenAcos] = useState<number>(0)
    useEffect(() => {
        const spend = Number(adSpend) || 0
        const revenue = Number(adRevenue) || 0
        const margin = Number(profitMargin) || 0
        if (revenue > 0) {
            const calculatedAcos = (spend / revenue) * 100
            setAcos(calculatedAcos)
            setRoas(spend > 0 ? revenue / spend : 0)
        } else {
            setAcos(0)
            setRoas(0)
        }
        if (revenue > 0 && margin > 0) {
            // Breakeven ACoS is simply the Profit Margin %
            setBreakevenAcos(margin)
            // Net Profit = (Revenue * Margin%) - Spend
            const profit = (revenue * (margin / 100)) - spend
            setNetProfit(profit)
        } else {
            setBreakevenAcos(0)
            setNetProfit(0)
        }
    }, [adSpend, adRevenue, profitMargin])
    const handleReset = () => {
        setAdSpend("")
        setAdRevenue("")
        setProfitMargin("")
    }
    // Determine Status
    let status = "Waiting"
    // liveBadgeColor needs to be one of: "emerald" | "amber" | "rose" | "blue" | "slate"
    let badgeColor: "blue" | "emerald" | "amber" | "rose" | "slate" = "slate"

    if (acos > 0 && breakevenAcos > 0) {
        if (acos < breakevenAcos) {
            status = "Profitable"
            badgeColor = "emerald"
        } else if (Math.abs(acos - breakevenAcos) < 0.1) {
            status = "Breakeven"
            badgeColor = "amber"
        } else {
            status = "Unprofitable"
            badgeColor = "rose"
        }
    }

    // Prepare Breakdown Data
    const cogs = (Number(adRevenue) || 0) * (1 - ((Number(profitMargin) || 0) / 100))
    const spendValue = Number(adSpend) || 0
    let breakdownData: { name: string; value: number; color: string }[] = []

    if (Number(adRevenue) > 0) {
        if (netProfit >= 0) {
            breakdownData = [
                { name: 'Product Costs', value: cogs, color: '#94a3b8' },
                { name: 'Ad Spend', value: spendValue, color: '#f43f5e' },
                { name: 'Net Profit', value: netProfit, color: '#10b981' }
            ]
        } else {
            // Unprofitable scenario
            breakdownData = [
                { name: 'Product Costs', value: cogs, color: '#94a3b8' },
                { name: 'Ad Spend', value: spendValue, color: '#f43f5e' }
            ]
        }
    }

    const CustomTooltip = ({ active, payload }: any) => {
        if (active && payload && payload.length) {
            return (
                <div className="bg-slate-900 border border-slate-800 text-white p-3 rounded-lg shadow-xl text-sm">
                    <p className="font-semibold mb-1">{payload[0].name}</p>
                    <p className="text-slate-300">
                        ${Number(payload[0].value).toFixed(2)}
                    </p>
                </div>
            )
        }
        return null
    }

    return (
        <FadeIn className="w-full max-w-6xl mx-auto py-8 px-4" duration={0.6}>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                {/* Left Column: Inputs */}
                <div className="lg:col-span-7 space-y-3 lg:sticky lg:top-8">
                    <Card className="border border-slate-200 shadow-sm bg-white overflow-hidden">
                        <CalculatorCardHeader
                            title="ACoS Details"
                            description="Enter your ad spend, revenue, and product margin."
                            onReset={handleReset}
                            currency={currency}
                            onCurrencyChange={setCurrency}
                        />
                        <CardContent className="space-y-3 pt-6">
                            {/* Group 1: Campaign Data */}
                            <div className="space-y-4 max-w-[520px] mx-auto w-full">
                                <CalculatorInput
                                    hideSeparator={true}
                                    groupingTitle="Campaign Data"
                                    groupingIcon={TrendingUp}
                                    label="Ad Spend"
                                    isCurrency
                                    currency={currency}
                                    value={adSpend}
                                    onChange={setAdSpend}
                                    placeholder="200.00"
                                    min={0}
                                    tooltip="Total amount spent on advertising."
                                />
                                <CalculatorInput
                                    label="Ad Revenue"
                                    isCurrency
                                    currency={currency}
                                    value={adRevenue}
                                    onChange={setAdRevenue}
                                    placeholder="800.00"
                                    min={0}
                                    tooltip="Total sales generated directly from ads."
                                />
                            </div>
                            {/* Group 2: Product Metrics */}
                            <div className="space-y-4 max-w-[520px] mx-auto w-full pt-2">
                                <CalculatorInput
                                    groupingTitle="Product Metrics"
                                    groupingIcon={Percent}
                                    label="Profit Margin"
                                    suffix="%"
                                    isOptional
                                    value={profitMargin}
                                    onChange={setProfitMargin}
                                    placeholder="40.0"
                                    min={0}
                                    max={100}
                                    tooltip="Your profit percentage after all costs (used to check if ads are profitable)."
                                />
                            </div>
                        </CardContent>
                    </Card>
                </div>
                <div className="lg:col-span-5 space-y-3">
                    <ResultSummaryCard
                        primaryResult={{
                            value: acos.toFixed(2),
                            unit: "%",
                            label: "Total ACoS Percentage",
                            key: "acos"
                        }}
                        secondaryResults={[
                            {
                                key: "netProfit",
                                label: "Net Profit",
                                value: netProfit,
                                isCurrency: true,
                                icon: DollarSign,
                                tooltip: "Estimated amount you gain or lose after ad spend."
                            }
                        ]}
                        profitLossKey="netProfit"
                        currency={currency}
                        isCalculated={Number(adRevenue) > 0 && Number(adSpend) > 0}
                        emptyMessage="ACoS"
                        emptyResultLabel="ACoS %"
                        liveBadgeText={status}
                        liveBadgeColor={badgeColor}
                        validationBadgeText={{ valid: "Profitable", invalid: "Unprofitable" }}
                    />

                    {/* Breakdown Card */}
                    <FadeIn delay={0.1}>
                        <ACoSBreakdown
                            revenue={Number(adRevenue) || 0}
                            spend={Number(adSpend) || 0}
                            cogs={cogs}
                            netProfit={netProfit}
                        />
                    </FadeIn>
                </div>
            </div>
        </FadeIn>
    )
}
