"use client"

import React, { useState } from "react"
import { MadhuSubHeader, ActionButtons } from "../../ToolTemplate"
import {
    Counter,
    FadeIn,
    CalculatorInput,
    CurrencyCombobox,
    ResultSummaryCard,
    CalculatorCardHeader,
} from "@/app/tools/_shared/components"
import { Card, CardContent } from "@/components/ui/card"
import { currencies } from "@/app/tools/_shared/components/CurrencyCombobox"
import {
    Mail,
    MousePointer,
    Target,
} from "lucide-react"
import { CampaignResults } from "./CampaignResults"

export function EmailROICalculator() {
    // Currency
    const [currency, setCurrency] = useState("USD")

    // Inputs
    const [listSize, setListSize] = useState<number | "">("")
    const [campaignCost, setCampaignCost] = useState<number | "">("")
    const [clickThroughRate, setClickThroughRate] = useState<number | "">("")
    const [conversionRate, setConversionRate] = useState<number | "">("")
    const [averageOrderValue, setAverageOrderValue] = useState<number | "">("")

    const val = (v: number | "") => (v === "" ? 0 : v)

    const handleReset = () => {
        setListSize("")
        setCampaignCost("")
        setClickThroughRate("")
        setConversionRate("")
        setAverageOrderValue("")
    }

    // Core Calculations
    const size = val(listSize)
    const cost = val(campaignCost)
    const ctrPct = val(clickThroughRate)
    const convPct = val(conversionRate)
    const aov = val(averageOrderValue)

    const clicks = Math.round(size * (ctrPct / 100))
    const conversions = Math.round(clicks * (convPct / 100))
    const revenue = conversions * aov
    const netProfit = revenue - cost
    const roi = cost > 0 ? (netProfit / cost) * 100 : 0
    const cpa = conversions > 0 ? cost / conversions : 0

    const isCalculated = size > 0 || cost > 0

    // Currency formatting
    const selectedCurrency = currencies.find((c) => c.code === currency)
    const currencySymbol = selectedCurrency?.symbol ?? "$"

    const formatCurrency = (v: number) =>
        new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: currency,
            maximumFractionDigits: 2,
        }).format(v)

    const formatNumber = (v: number) => new Intl.NumberFormat("en-US").format(Math.round(v))

    const [isCopied, setIsCopied] = useState(false)

    const handleCopy = () => {
        const text =
            `Email Marketing ROI Results:\n\n` +
            `Inputs:\n` +
            `- List Size: ${formatNumber(size)}\n` +
            `- Campaign Cost: ${formatCurrency(cost)}\n` +
            `- Click Rate: ${ctrPct}%\n` +
            `- Conversion Rate: ${convPct}%\n` +
            `- Avg Order Value: ${formatCurrency(aov)}\n\n` +
            `Results:\n` +
            `- ROI: ${roi.toFixed(2)}%\n` +
            `- Net Profit: ${formatCurrency(netProfit)}\n` +
            `- CPA: ${formatCurrency(cpa)}`

        navigator.clipboard.writeText(text).then(() => {
            setIsCopied(true)
            setTimeout(() => setIsCopied(false), 2000)
        })
    }

    return (
        <FadeIn className="w-full max-w-6xl mx-auto py-2 px-4" duration={0.6}>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">

                {/* ── Left Column: Inputs ── */}
                <div className="lg:col-span-7 flex flex-col h-full space-y-4">
                    <Card className="border border-slate-200 shadow-xl shadow-slate-200/40 bg-white rounded-2xl overflow-hidden h-full flex flex-col">

                        <CalculatorCardHeader
                            title="Campaign Data"
                            description="Essential metrics for quick ROI calculation."
                            currency={currency}
                            onCurrencyChange={setCurrency}
                        />

                        <CardContent className="p-5 md:p-6 space-y-6 flex-1 flex flex-col">
                            {/* Campaign Setup */}
                            <div className="space-y-3">
                                <MadhuSubHeader title="Campaign setup" icon={Mail} withDot={false} className="mb-2" />
                                <div className="flex flex-col gap-4">
                                    <CalculatorInput
                                        label="List Size"
                                        value={listSize}
                                        onChange={setListSize}
                                        placeholder="10000"
                                        tooltip="Total number of subscribers who will receive your email campaign."
                                    />
                                    <CalculatorInput
                                        label="Campaign Cost"
                                        value={campaignCost}
                                        onChange={setCampaignCost}
                                        placeholder="500.00"
                                        tooltip="Total cost of running the campaign, including email software, design, copywriting, and marketing expenses."
                                        prefix={currencySymbol}
                                    />
                                </div>
                            </div>

                            <div className="h-px bg-slate-100 w-full" />

                            {/* Performance Metrics */}
                            <div className="space-y-3">
                                <MadhuSubHeader title="Performance metrics" icon={Target} withDot={false} className="mb-2" />
                                <div className="flex flex-col gap-4">
                                    <CalculatorInput
                                        label="Click-Through Rate (CTR)"
                                        value={clickThroughRate}
                                        onChange={setClickThroughRate}
                                        placeholder="3.0"
                                        tooltip="Percentage of recipients who clicked a link in your email after opening it."
                                        suffix="%"
                                    />
                                    <CalculatorInput
                                        label="Conversion Rate"
                                        value={conversionRate}
                                        onChange={setConversionRate}
                                        placeholder="5.0"
                                        tooltip="Percentage of visitors who completed the desired action (such as a purchase or signup) after clicking your email."
                                        suffix="%"
                                    />
                                    <CalculatorInput
                                        label="Avg. Order Value (AOV)"
                                        value={averageOrderValue}
                                        onChange={setAverageOrderValue}
                                        placeholder="50.00"
                                        tooltip="Average revenue generated from each successful conversion or purchase."
                                        prefix={currencySymbol}
                                    />
                                </div>
                            </div>

                            <ActionButtons
                                onReset={handleReset}
                                onCopy={handleCopy}
                                isCopied={isCopied}
                                copyDisabled={!isCalculated}
                                className="pt-4"
                            />
                        </CardContent>
                    </Card>
                </div>

                {/* ── Right Column: Results ── */}
                <div className="lg:col-span-5 space-y-4 lg:sticky lg:top-32">

                    {/* ResultSummaryCard */}
                    <ResultSummaryCard
                        title="ROI (Return on Investment)"
                        primaryResult={{
                            value: roi.toFixed(2),
                            unit: "%",
                            label: "Return",
                        }}
                        secondaryResults={[
                            {
                                key: "netProfit",
                                label: "Net Profit",
                                value: formatCurrency(netProfit),
                                tooltip: "Total revenue generated minus the campaign cost.",
                            },
                            {
                                key: "cpa",
                                label: "CPA",
                                value: formatCurrency(cpa),
                                tooltip: "Average cost required to acquire one customer or conversion.",
                            },
                        ]}
                        showLiveBadge={true}
                        liveBadgeText={isCalculated ? (netProfit >= 0 ? "Profit" : "Loss") : "Awaiting Data"}
                        isCalculated={isCalculated}
                        profitLossKey="netProfit"
                    />

                    {/* Funnel Breakdown */}
                    <CampaignResults
                        clicks={clicks}
                        conversions={conversions}
                        revenue={revenue}
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
