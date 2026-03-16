"use client"
import React, { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { DollarSign, PieChart, Calculator } from "lucide-react"
import {
    CalculatorCardHeader,
    CalculatorInput,
    CurrencyCombobox,
    ResultSummaryCard,
    FadeIn
} from "@/app/tools/_shared/components"
import { cn } from "@/lib/utils"
import { PieChart as RechartsPie, Pie, Cell, ResponsiveContainer, Tooltip as RechartsTooltip } from "recharts"
import { ProfitAllocation } from "./ProfitAllocation"
export function NetProfitCalculator() {
    const [currency, setCurrency] = useState("USD")
    // Input States
    const [revenue, setRevenue] = useState<number | "">("")
    const [cogs, setCogs] = useState<number | "">("")
    const [adSpend, setAdSpend] = useState<number | "">("")
    const [overhead, setOverhead] = useState<number | "">("") // Includes software, rent, etc.
    const [taxRate, setTaxRate] = useState<number | "">(20) // Default benchmark is 20%

    const val = (v: number | "") => (v === "" ? 0 : v)
    const handleReset = () => {
        setRevenue("")
        setCogs("")
        setAdSpend("")
        setOverhead("")
        setTaxRate(20) // Reset to benchmark
    }
    // Calculations
    const r = val(revenue)
    const c = val(cogs)
    const ads = val(adSpend)
    const over = val(overhead)
    const txRate = val(taxRate)
    const grossProfit = r - c
    const totalExpenses = c + ads + over
    const operatingProfit = r - totalExpenses // EBITDA-ish
    // Tax Calculation (on operating profit, assuming profit > 0)
    const taxAmount = operatingProfit > 0 ? (operatingProfit * (txRate / 100)) : 0
    const netProfit = operatingProfit - taxAmount
    const netMargin = r > 0 ? (netProfit / r) * 100 : 0
    const grossMargin = r > 0 ? (grossProfit / r) * 100 : 0
    // ROI (Return on Investment) = (Net Profit / Total Costs) * 100
    const roi = totalExpenses > 0 ? (netProfit / totalExpenses) * 100 : 0
    const formatCurrency = (val: number) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: currency,
            maximumFractionDigits: 2
        }).format(val)
    }
    const formatCompact = (val: number) => {
        const absVal = Math.abs(val)
        if (absVal < 1000000) return formatCurrency(val)
        // For extremely massive numbers, reduce precision to keep string short
        const digits = absVal > 1000000000000 ? 0 : 1
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: currency,
            notation: "compact",
            compactDisplay: "short",
            maximumFractionDigits: digits
        }).format(val)
    }
    const formatPercent = (val: number) => {
        if (Math.abs(val) < 10000) return `${val.toFixed(2)}%`
        return new Intl.NumberFormat('en-US', {
            notation: "compact",
            maximumFractionDigits: 1
        }).format(val) + "%"
    }
    // Progress bar checks
    // We want to visualize where the money goes. 
    // Revenue bar broken down into: COGS, Ads, Overhead, Tax, Profit.
    const getPercent = (amount: number) => {
        return r > 0 ? Math.min(Math.max((amount / r) * 100, 0), 100) : 0
    }
    const cogsPercent = getPercent(c)
    const adsPercent = getPercent(ads)
    const overheadPercent = getPercent(over)
    const taxPercent = getPercent(taxAmount)
    const profitPercent = getPercent(Math.max(netProfit, 0)) // Only show positive profit on bar
    return (
        <FadeIn className="w-full max-w-6xl mx-auto py-2 px-4" duration={0.6}>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
                {/* Left Column: Inputs */}
                <div className="lg:col-span-7">
                    <Card className="border border-slate-200 shadow-lg shadow-slate-200/40 bg-white rounded-3xl overflow-hidden">
                        <CalculatorCardHeader
                            title="Profit Analysis"
                            description="Enter your revenue and expenses to calculate true take-home pay."
                            currency={currency}
                            onCurrencyChange={setCurrency}
                            onReset={handleReset}
                        />
                        <CardContent className="p-4 md:p-6 space-y-3">
                            <div className="space-y-6 max-w-[520px] mx-auto w-full">
                                {/* Income Section */}
                                <div className="space-y-3">
                                    <CalculatorInput
                                        hideSeparator={true}
                                        label={`Total Revenue`}
                                        value={revenue}
                                        onChange={setRevenue}
                                        placeholder="50000.00"
                                        tooltip="Total sales receipts before any deductions."
                                        groupingTitle="Income Data"
                                        groupingIcon={DollarSign}
                                    />
                                </div>

                                {/* Expenses Section */}
                                <div className="space-y-3">
                                    <CalculatorInput
                                        label={`Cost of Goods Sold (COGS)`}
                                        value={cogs}
                                        onChange={setCogs}
                                        placeholder="15000.00"
                                        tooltip="Cost of Goods Sold: Manufacturing, shipping to warehouse, etc."
                                        groupingTitle="Business Expenses"
                                        groupingIcon={Calculator}
                                    />
                                    <CalculatorInput
                                        label={`Ad Spend`}
                                        value={adSpend}
                                        onChange={setAdSpend}
                                        placeholder="5000.00"
                                        tooltip="Total marketing and advertising expenditure."
                                        isOptional={true}
                                    />
                                    <CalculatorInput
                                        label={`Overhead & Subscriptions`}
                                        value={overhead}
                                        onChange={setOverhead}
                                        placeholder="2000.00"
                                        tooltip="Rent, software, salaries, legal fees, etc."
                                        isOptional={true}
                                    />
                                    <CalculatorInput
                                        label={`Estimated Tax Rate`}
                                        value={taxRate}
                                        onChange={setTaxRate}
                                        placeholder="Avg: 20"
                                        max={100}
                                        tooltip="Estimated income tax rate percentage. Typical range for small to medium businesses is 15% - 30%."
                                        isOptional={true}
                                        suffix="%"
                                        hint="Industry average: 15% – 30%"
                                        benchmarkBadge={true}
                                    />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
                {/* Right Column: Results */}
                <div className="lg:col-span-5 space-y-4 lg:sticky lg:top-32">
                    <ResultSummaryCard
                        title="Profit Analysis"
                        primaryResult={{
                            label: "Net Profit",
                            value: netProfit,
                            isCurrency: true,
                            key: "net-profit"
                        }}
                        secondaryResults={[
                            {
                                key: "net-margin",
                                label: "Net Margin",
                                value: netMargin.toFixed(2),
                                unit: "%",
                                tooltip: "The percentage of revenue that remains as profit after all costs are deducted."
                            },
                            {
                                key: "roi",
                                label: "ROI",
                                value: roi.toFixed(2),
                                unit: "%",
                                tooltip: "Return on Investment: Net Profit divided by Total Costs (COGS + Ads + Overhead)."
                            },
                            {
                                key: "tax-amount",
                                label: "Tax Amount",
                                value: taxAmount,
                                isCurrency: true,
                                tooltip: "Estimated income tax based on your operating profit and tax rate."
                            },
                            {
                                key: "total-expenses",
                                label: "Total Expenses",
                                value: totalExpenses + taxAmount,
                                isCurrency: true,
                                tooltip: "Sum of all business costs: COGS, Ad Spend, Overhead, and Tax."
                            }
                        ]}
                        currency={currency}
                        isCalculated={revenue !== "" && cogs !== ""}
                        profitLossKey="net-profit"
                        checklistItems={[
                            { key: 'revenue', label: 'Total Revenue', isComplete: revenue !== "" },
                            { key: 'cogs', label: 'Cost of Goods Sold', isComplete: cogs !== "" }
                        ]}
                        dynamicMessages={{
                            positive: "Great! Your business is generating a healthy net profit.",
                            negative: "Your total expenses exceed your revenue. You are operating at a net loss.",
                            neutral: "Your business is breaking even. Revenue exactly covers all expenses."
                        }}
                    />
                    <ProfitAllocation
                        revenue={r}
                        cogs={c}
                        adSpend={ads}
                        overhead={over}
                        taxAmount={taxAmount}
                        netProfit={netProfit}
                        currency={currency}
                    />
                </div>
            </div>
        </FadeIn >
    )
}
