"use client"
import React, { useState } from "react"

import {
    FadeIn,
    CalculatorInput,
    ResultSummaryCard,
    CalculatorCardHeader,
} from "@/app/tools/_shared/components"
import { Card, CardContent } from "@/components/ui/card"
import { Users, MousePointerClick } from "lucide-react"
import { CampaignResults } from "./CampaignResults"

export function EmailROICalculator() {
    const [currency, setCurrency] = useState("USD")
    const [listSize, setListSize] = useState<number | "">("")
    const [campaignCost, setCampaignCost] = useState<number | "">("")
    const [openRate, setOpenRate] = useState<number | "">(20)
    const [clickThroughRate, setClickThroughRate] = useState<number | "">(2.5)
    const [conversionRate, setConversionRate] = useState<number | "">(3)
    const [averageOrderValue, setAverageOrderValue] = useState<number | "">(50)

    const val = (v: number | "") => (v === "" ? 0 : v)
    const handleReset = () => {
        setListSize("")
        setCampaignCost("")
        setOpenRate(20)
        setClickThroughRate(2.5)
        setConversionRate(3)
        setAverageOrderValue(50)
    }

    const size = val(listSize)
    const cost = val(campaignCost)
    const openPct = val(openRate)
    const ctrPct = val(clickThroughRate)
    const convPct = val(conversionRate)
    const aov = val(averageOrderValue)

    const opens = Math.round(size * (openPct / 100))
    const clicks = Math.round(opens * (ctrPct / 100))
    const conversions = Math.round(clicks * (convPct / 100))
    const revenue = conversions * aov
    const netProfit = revenue - cost
    const roi = cost > 0 ? (netProfit / cost) * 100 : 0
    const cpa = conversions > 0 ? cost / conversions : 0

    const isCalculated = listSize !== "" && campaignCost !== ""
    const formatCurrency = (v: number) =>
        new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: currency,
            maximumFractionDigits: 2,
        }).format(v)
    const formatNumber = (v: number) => new Intl.NumberFormat("en-US").format(Math.round(v))

    return (
        <FadeIn className="w-full max-w-6xl mx-auto py-2 px-4" duration={0.6}>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
                <div className="lg:col-span-7 flex flex-col h-full space-y-3">
                    <Card className="border border-slate-200 shadow-xl shadow-slate-200/40 bg-white rounded-2xl overflow-hidden h-full flex flex-col">
                        <CalculatorCardHeader
                            title="Campaign Data"
                            description="Essential metrics for quick ROI calculation."
                            currency={currency}
                            onCurrencyChange={setCurrency}
                            onReset={handleReset}
                        />
                        <CardContent className="p-4 md:p-6 pb-12 md:pb-16 flex-1 flex flex-col">
                            {/* Campaign Setup */}
                            <CalculatorInput
                                hideSeparator={true}
                                label="Number of Email Subscribers"
                                value={listSize}
                                onChange={setListSize}
                                placeholder="10000"
                                tooltip="Total number of subscribers who will receive your email campaign."
                                groupingTitle="Campaign setup"
                                groupingIcon={Users}
                            />
                            <CalculatorInput
                                label="Total Campaign Cost"
                                value={campaignCost}
                                onChange={setCampaignCost}
                                placeholder="500.00"
                                tooltip="Total cost including email software, design, copywriting, and marketing expenses."
                                currency={currency}
                            />
                            {/* Performance Metrics */}
                            <CalculatorInput
                                label="Estimated Open Rate"
                                value={openRate}
                                onChange={setOpenRate}
                                placeholder="Avg: 20"
                                tooltip="Percentage of subscribers who open your email. Industry average: 20–25%."
                                suffix="%"
                                hint="Industry standard range: 20% – 25%"
                                groupingTitle="Email Performance (Optional)"
                                groupingIcon={MousePointerClick}
                                benchmarkBadge={true}
                            />
                            <CalculatorInput
                                label="Email CTR (on Opens)"
                                value={clickThroughRate}
                                onChange={setClickThroughRate}
                                placeholder="Avg: 2.5"
                                tooltip="Percentage of email openers who clicked a link. Industry average: 2–3%."
                                suffix="%"
                                hint="Industry standard range: 2% – 3%"
                            />
                            <CalculatorInput
                                label="Post-Click Conversion Rate"
                                value={conversionRate}
                                onChange={setConversionRate}
                                placeholder="Avg: 3"
                                tooltip="Percentage of link clickers who completed a purchase. Industry average: 2–5%."
                                suffix="%"
                                hint="Industry standard range: 2% – 5%"
                            />
                            <CalculatorInput
                                label="Avg. Order Value (AOV)"
                                value={averageOrderValue}
                                onChange={setAverageOrderValue}
                                placeholder="Avg: 50"
                                tooltip="Average revenue from each purchase. If left empty, 50 is used."
                                currency={currency}
                                hint="Industry standard range: $50 – $150"
                            />

                        </CardContent>
                    </Card>
                </div>
                <div className="lg:col-span-5 space-y-3 lg:sticky lg:top-32">
                    <ResultSummaryCard
                        title="ROI (Return on Investment)"
                        currency={currency}
                        primaryResult={{
                            value: roi.toFixed(2),
                            unit: "%",
                            label: "Return on Investment",
                        }}
                        secondaryResults={[
                            {
                                key: "netProfit",
                                label: "Net Profit",
                                value: netProfit.toFixed(2),
                                isCurrency: true,
                                tooltip: "Total revenue generated minus the campaign cost.",
                            },
                            {
                                key: "cpa",
                                label: "Cost Per Acquisition",
                                value: cpa.toFixed(2),
                                isCurrency: true,
                                tooltip: "Average cost required to acquire one customer.",
                            },
                        ]}
                        showLiveBadge={true}
                        isCalculated={isCalculated}
                        profitLossKey="netProfit"
                        emptyResultLabel="Return on Investment"
                        checklistItems={[
                            { key: 'size', label: 'Email List Size', isComplete: listSize !== "" },
                            { key: 'cost', label: 'Campaign Cost', isComplete: campaignCost !== "" }
                        ]}
                        dynamicMessages={{
                            positive: "Great job! Your email campaign is profitable and generating a positive return.",
                            negative: "Your campaign is currently at a loss. Try improving your Open Rate or CTR to boost results.",
                            neutral: "Your campaign is breaking even. Consider optimizing your conversion path for profit."
                        }}
                    />
                    <CampaignResults
                        opens={opens}
                        clicks={clicks}
                        conversions={conversions}
                        revenue={revenue}
                        openPct={openPct}
                        ctrPct={ctrPct}
                        convPct={convPct}
                        formatNumber={formatNumber}
                        formatCurrency={formatCurrency}
                    />
                </div>
            </div>
        </FadeIn>
    )
}
