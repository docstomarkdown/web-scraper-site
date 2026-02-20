"use client"

import React, { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { HelpCircle, Info, TrendingUp, DollarSign, Percent, BarChart3, PieChart, Calculator, CheckCircle2 } from "lucide-react"
import { ActionButtons, InputCardHeader } from "../../ToolTemplate"
import { CalculatorInput, ResultFeedbackCard, Counter, CurrencyCombobox, FadeIn } from "@/app/tools/_shared/components"
import { cn } from "@/lib/utils"

export function NetProfitCalculator() {
    const [currency, setCurrency] = useState("USD")

    // Input States
    const [revenue, setRevenue] = useState<number | "">("")
    const [cogs, setCogs] = useState<number | "">("")
    const [adSpend, setAdSpend] = useState<number | "">("")
    const [overhead, setOverhead] = useState<number | "">("") // Includes software, rent, etc.
    const [taxRate, setTaxRate] = useState<number | "">("") // Removed default 20%

    const val = (v: number | "") => (v === "" ? 0 : v)

    const handleReset = () => {
        setRevenue("")
        setCogs("")
        setAdSpend("")
        setOverhead("")
        setTaxRate("")
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

    const [isCopied, setIsCopied] = useState(false)

    const handleCopy = () => {
        const text = `Net Profit Calculator Results:\n\nRevenue: ${formatCurrency(r)}\nCOGS: ${formatCurrency(c)}\nAd Spend: ${formatCurrency(ads)}\nOverhead: ${formatCurrency(over)}\nTax Rate: ${txRate}%\n\nNet Profit: ${formatCurrency(netProfit)}\nNet Margin: ${netMargin.toFixed(2)}%\nROI: ${roi.toFixed(2)}%`

        navigator.clipboard.writeText(text).then(() => {
            setIsCopied(true)
            setTimeout(() => setIsCopied(false), 2000)
        })
    }

    const formatCurrency = (val: number) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: currency,
            maximumFractionDigits: 2
        }).format(val)
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
        <FadeIn className="w-full max-w-6xl mx-auto py-8 px-4" duration={0.6}>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

                {/* Left Column: Inputs */}
                <div className="lg:col-span-7 space-y-6">
                    <Card className="border border-slate-200 shadow-xl shadow-slate-200/40 bg-white rounded-3xl overflow-hidden">
                        <div className="flex flex-row items-center justify-between border-b border-slate-100 pr-6">
                            <InputCardHeader
                                title="Financial Data"
                                subtitle="Enter your revenue and expenses."
                                icon={Calculator}
                                scrollId="how-to-use"
                            />
                            <div className="w-[100px]">
                                <CurrencyCombobox value={currency} onValueChange={setCurrency} />
                            </div>
                        </div>

                        <CardContent className="p-4 md:p-6 space-y-6">

                            <div className="space-y-6">
                                {/* Income Section */}
                                <div className="space-y-4">
                                    <div className="flex items-center gap-2">
                                        <h3 className="text-base font-bold text-slate-400 tracking-tight">
                                            Expected income
                                        </h3>
                                    </div>
                                    <div className="flex flex-col gap-4">
                                        <CalculatorInput
                                            label={`Total Revenue`}
                                            value={revenue}
                                            onChange={setRevenue}
                                            placeholder="50000.00"
                                            tooltip="Total sales receipts before any deductions."
                                        />
                                    </div>
                                </div>

                                {/* Expenses Section */}
                                <div className="space-y-4">
                                    <div className="flex items-center gap-2">
                                        <h3 className="text-base font-bold text-slate-400 tracking-tight">
                                            Business expenses
                                        </h3>
                                    </div>

                                    <div className="flex flex-col gap-4">
                                        <CalculatorInput
                                            label={`Cost of Goods Sold (COGS)`}
                                            value={cogs}
                                            onChange={setCogs}
                                            placeholder="15000.00"
                                            tooltip="Cost of Goods Sold: Manufacturing, shipping to warehouse, etc."
                                        />
                                        <CalculatorInput
                                            label={`Ad Spend (Marketing)`}
                                            value={adSpend}
                                            onChange={setAdSpend}
                                            placeholder="5000.00"
                                            tooltip="Total marketing and advertising expenditure."
                                        />
                                        <CalculatorInput
                                            label={`Overhead & Subscriptions`}
                                            value={overhead}
                                            onChange={setOverhead}
                                            placeholder="2000.00"
                                            tooltip="Rent, software, salaries, legal fees, etc."
                                        />
                                        <CalculatorInput
                                            label={`Estimated Tax Rate (%)`}
                                            value={taxRate}
                                            onChange={setTaxRate}
                                            placeholder="20"
                                            max={100}
                                            tooltip="Estimated income tax rate percentage."
                                        />
                                    </div>
                                </div>
                            </div>

                            <ActionButtons
                                onReset={handleReset}
                                onCopy={handleCopy}
                                isCopied={isCopied}
                                className="pt-4"
                            />
                        </CardContent>
                    </Card>
                </div>

                {/* Right Column: Results */}
                <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-32">

                    {/* Primary Result Card */}
                    <ResultFeedbackCard
                        title="NET PROFIT"
                        titleLabel="Live calculation"
                        mainValue={
                            <div className="flex flex-col">
                                <div className="flex items-baseline gap-2">
                                    <Counter
                                        value={netProfit}
                                        formatter={formatCurrency}
                                        key={currency}
                                        className="text-white"
                                    />
                                    <span className="text-white/60 text-lg font-medium">Profit</span>
                                </div>
                                <p className="text-white/50 text-sm font-bold mt-2">
                                    True take-home earnings
                                </p>
                            </div>
                        }
                    >
                        <div className="space-y-6">
                            {/* Secondary Metrics Grid */}
                            <div className="grid grid-cols-2 gap-3">
                                <div className="bg-white/5 rounded-xl p-3 border border-white/5">
                                    <div className="flex items-center gap-1.5 mb-1">
                                        <p className="text-xs font-bold text-slate-400">Net Margin</p>
                                        <TooltipProvider delayDuration={100}>
                                            <Tooltip>
                                                <TooltipTrigger asChild>
                                                    <Info className="h-3.5 w-3.5 text-slate-400 hover:text-white cursor-pointer" />
                                                </TooltipTrigger>
                                                <TooltipContent side="top" className="max-w-xs text-xs bg-slate-900 text-white border-slate-800">
                                                    Percentage of revenue that is actual profit after ALL expenses and taxes.
                                                </TooltipContent>
                                            </Tooltip>
                                        </TooltipProvider>
                                    </div>
                                    <p className={cn("text-xl font-bold", netMargin >= 0 ? "text-emerald-400" : "text-red-400")}>
                                        <Counter value={netMargin} formatter={(v) => `${v.toFixed(2)}%`} />
                                    </p>
                                </div>
                                <div className="bg-white/5 rounded-xl p-3 border border-white/5">
                                    <div className="flex items-center gap-1.5 mb-1">
                                        <p className="text-xs font-bold text-slate-400">ROI</p>
                                        <TooltipProvider delayDuration={100}>
                                            <Tooltip>
                                                <TooltipTrigger asChild>
                                                    <Info className="h-3.5 w-3.5 text-slate-400 hover:text-white cursor-pointer" />
                                                </TooltipTrigger>
                                                <TooltipContent side="top" className="max-w-xs text-xs bg-slate-900 text-white border-slate-800">
                                                    Return on Investment: Net Profit divided by Total Costs (COGS + Ads + Overhead).
                                                </TooltipContent>
                                            </Tooltip>
                                        </TooltipProvider>
                                    </div>
                                    <p className={cn("text-xl font-bold", roi >= 0 ? "text-blue-400" : "text-red-400")}>
                                        <Counter value={roi} formatter={(v) => `${v.toFixed(2)}%`} />
                                    </p>
                                </div>
                                <div className="bg-white/5 rounded-xl p-3 border border-white/5">
                                    <p className="text-xs font-bold text-slate-400 mb-1">Tax Amount</p>
                                    <p className="text-xl font-bold text-amber-400">
                                        <Counter value={taxAmount} formatter={formatCurrency} />
                                    </p>
                                </div>
                                <div className="bg-white/5 rounded-xl p-3 border border-white/5">
                                    <p className="text-xs font-bold text-slate-400 mb-1">Total Expenses</p>
                                    <p className="text-xl font-bold text-slate-200">
                                        <Counter value={totalExpenses + taxAmount} formatter={formatCurrency} />
                                    </p>
                                </div>
                            </div>
                        </div>
                    </ResultFeedbackCard>

                    {/* Breakdown Chart */}
                    <Card className="bg-white border-slate-200 shadow-sm rounded-2xl overflow-hidden p-5">
                        <h4 className="text-sm font-bold text-slate-700 mb-6 flex items-center gap-2">
                            <PieChart className="w-4 h-4 text-blue-500" />
                            Revenue Distribution
                        </h4>

                        {/* Stacked Bar */}
                        <div className="relative w-full h-10 bg-slate-100 rounded-lg overflow-hidden flex mb-4">
                            {cogsPercent > 0 && (
                                <div style={{ width: `${cogsPercent}%` }} className="h-full bg-slate-400" title="COGS" />
                            )}
                            {adsPercent > 0 && (
                                <div style={{ width: `${adsPercent}%` }} className="h-full bg-blue-400" title="Ads" />
                            )}
                            {overheadPercent > 0 && (
                                <div style={{ width: `${overheadPercent}%` }} className="h-full bg-purple-400" title="Overhead" />
                            )}
                            {taxPercent > 0 && (
                                <div style={{ width: `${taxPercent}%` }} className="h-full bg-amber-400" title="Tax" />
                            )}
                            {profitPercent > 0 && (
                                <div style={{ width: `${profitPercent}%` }} className="h-full bg-emerald-500" title="Profit" />
                            )}
                        </div>

                        {/* Legend */}
                        <div className="grid grid-cols-2 gap-y-2 gap-x-4 text-xs font-medium text-slate-600">
                            <div className="flex items-center gap-2">
                                <div className="w-2.5 h-2.5 rounded-full bg-slate-400" />
                                <span>COGS ({cogsPercent.toFixed(1)}%)</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-2.5 h-2.5 rounded-full bg-blue-400" />
                                <span>Ads ({adsPercent.toFixed(1)}%)</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-2.5 h-2.5 rounded-full bg-purple-400" />
                                <span>Overhead ({overheadPercent.toFixed(1)}%)</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                                <span>Tax ({taxPercent.toFixed(1)}%)</span>
                            </div>
                            <div className="flex items-center gap-2 col-span-2 mt-1 pt-1 border-t border-slate-100">
                                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                                <span className="font-bold text-emerald-600">Net Profit ({profitPercent.toFixed(1)}%)</span>
                            </div>
                        </div>
                    </Card>

                </div>
            </div>
        </FadeIn>
    )
}
