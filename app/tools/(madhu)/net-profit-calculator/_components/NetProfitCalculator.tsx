"use client"
import React, { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { HelpCircle, Info, TrendingUp, DollarSign, Percent, BarChart3, PieChart, Calculator, CheckCircle2 } from "lucide-react"
import { InputCardHeader } from "../../ToolTemplate"
import { CalculatorInput, ResultFeedbackCard, Counter, CurrencyCombobox, FadeIn } from "@/app/tools/_shared/components"
import { cn } from "@/lib/utils"
import { PieChart as RechartsPie, Pie, Cell, ResponsiveContainer, Tooltip as RechartsTooltip } from "recharts"
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
                    <Card className="border border-slate-200 shadow-lg shadow-slate-200/40 bg-white rounded-3xl overflow-hidden h-full flex flex-col">
                        <div className="flex flex-row items-center justify-between border-b border-slate-100 pr-6">
                            <InputCardHeader
                                title="Financial Data"
                                subtitle="Enter your revenue and expenses."
                                icon={Calculator}
                                scrollId="how-to-use"
                                onReset={handleReset}
                            />
                            <div className="w-[140px] flex-shrink-0">
                                <CurrencyCombobox value={currency} onValueChange={setCurrency} />
                            </div>
                        </div>
                        <CardContent className="p-6 md:p-8 pb-12 md:pb-16 space-y-8 flex-1 flex flex-col justify-between">
                            <div className="space-y-3">
                                {/* Income Section */}
                                <div className="space-y-3">
                                    <div className="flex items-center gap-2">
                                        <label className="text-sm font-medium text-slate-700 flex items-center gap-2">
                                            <DollarSign className="w-4 h-4 text-slate-400" />
                                            Expected income
                                        </label>
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
                                <div className="space-y-3">
                                    <div className="flex items-center gap-2">
                                        <label className="text-sm font-medium text-slate-700 flex items-center gap-2">
                                            <Calculator className="w-4 h-4 text-slate-400" />
                                            Business expenses
                                        </label>
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
                        </CardContent>
                    </Card>
                </div>
                {/* Right Column: Results */}
                <div className="lg:col-span-5 space-y-3 lg:sticky lg:top-32">
                    {/* Primary Result Card */}
                    <ResultFeedbackCard
                        title="NET PROFIT"
                        titleLabel="Live calculation"
                        mainValue={
                            <div className="flex flex-col">
                                <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-2">
                                    <Counter
                                        value={netProfit}
                                        formatter={formatCompact}
                                        key={currency}
                                        className={cn(
                                            "text-white font-black leading-tight",
                                            // Scale down font for extremely large numbers
                                            Math.abs(netProfit) > 1000000000000 ? "text-3xl" : "text-4xl md:text-5xl"
                                        )}
                                    />
                                    <span className="text-white/60 text-sm md:text-lg font-medium">Profit</span>
                                </div>
                                <p className="text-white/50 text-xs md:text-sm font-bold mt-2 truncate">
                                    True take-home earnings
                                </p>
                            </div>
                        }
                    >
                        <div className="space-y-3">
                            {/* Secondary Metrics Grid */}
                            <div className="grid grid-cols-2 gap-2">
                                <div className="bg-white/5 rounded-xl p-2 border border-white/5">
                                    <div className="flex items-center gap-1.5 mb-1">
                                        <p className="text-xs font-bold text-slate-300">Net Margin</p>
                                        <TooltipProvider delayDuration={100}>
                                            <Tooltip>
                                                <TooltipTrigger asChild>
                                                    <Info className="h-3.5 w-3.5 text-slate-400 hover:text-white cursor-pointer" />
                                                </TooltipTrigger>
                                                <TooltipContent side="top" className="max-w-xs text-xs bg-slate-900 text-white border-slate-800">
                                                    The percentage of revenue that remains as profit after all costs are deducted.
                                                </TooltipContent>
                                            </Tooltip>
                                        </TooltipProvider>
                                    </div>
                                    <p className={cn("text-xl font-bold break-all", netMargin >= 0 ? "text-blue-400" : "text-red-400")}>
                                        <Counter value={netMargin} formatter={formatPercent} />
                                    </p>
                                </div>
                                <div className="bg-white/5 rounded-xl p-2 border border-white/5">
                                    <div className="flex items-center gap-1.5 mb-1">
                                        <p className="text-xs font-bold text-slate-300">ROI</p>
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
                                    <p className={cn("text-xl font-bold break-all", roi >= 0 ? "text-blue-400" : "text-red-400")}>
                                        <Counter value={roi} formatter={formatPercent} />
                                    </p>
                                </div>
                                <div className="bg-white/5 rounded-xl p-2.5 border border-white/5">
                                    <div className="flex items-center gap-1.5 mb-1">
                                        <p className="text-[10px] font-bold text-slate-300 whitespace-nowrap">Tax Amount</p>
                                        <TooltipProvider delayDuration={100}>
                                            <Tooltip>
                                                <TooltipTrigger asChild>
                                                    <Info className="h-3.5 w-3.5 text-slate-400 hover:text-white cursor-pointer" />
                                                </TooltipTrigger>
                                                <TooltipContent side="top" className="max-w-xs text-xs bg-slate-900 text-white border-slate-800">
                                                    Estimated income tax based on your operating profit and tax rate.
                                                </TooltipContent>
                                            </Tooltip>
                                        </TooltipProvider>
                                    </div>
                                    <p className="text-lg font-bold text-blue-400 break-all leading-tight">
                                        <Counter value={taxAmount} formatter={formatCompact} />
                                    </p>
                                </div>
                                <div className="bg-white/5 rounded-xl p-2.5 border border-white/5">
                                    <div className="flex items-center gap-1.5 mb-1">
                                        <p className="text-[10px] font-bold text-slate-300 whitespace-nowrap">Total Expenses</p>
                                        <TooltipProvider delayDuration={100}>
                                            <Tooltip>
                                                <TooltipTrigger asChild>
                                                    <Info className="h-3.5 w-3.5 text-slate-400 hover:text-white cursor-pointer" />
                                                </TooltipTrigger>
                                                <TooltipContent side="top" className="max-w-xs text-xs bg-slate-900 text-white border-slate-800">
                                                    Sum of all business costs: COGS, Ad Spend, Overhead, and Tax.
                                                </TooltipContent>
                                            </Tooltip>
                                        </TooltipProvider>
                                    </div>
                                    <p className="text-lg font-bold text-blue-400 break-all leading-tight">
                                        <Counter value={totalExpenses + taxAmount} formatter={formatCompact} />
                                    </p>
                                </div>
                            </div>
                        </div>
                    </ResultFeedbackCard>
                    {/* Budget Allocation style Revenue Breakdown */}
                    <Card className="bg-white border-slate-200 shadow-sm rounded-2xl overflow-hidden p-3">
                        <div className="flex items-center justify-between mb-4">
                            <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2">
                                <PieChart className="w-3.5 h-3.5 text-blue-500" />
                                Revenue Breakdown
                            </h4>
                            {netProfit < 0 && (
                                <span className="text-[10px] font-black bg-red-50 text-red-600 px-2 py-0.5 rounded-full animate-pulse">
                                    NEGATIVE MARGIN
                                </span>
                            )}
                        </div>
                        <div className="flex items-center gap-4 min-h-[140px]">
                            {/* Left: Donut Chart */}
                            <div className="h-[120px] w-[120px] relative shrink-0">
                                {r > 0 ? (
                                    <ResponsiveContainer width="100%" height="100%">
                                        <RechartsPie>
                                            <Pie
                                                data={[
                                                    { name: "COGS", value: c, color: "#94a3b8" },
                                                    { name: "Ads", value: ads, color: "#60a5fa" },
                                                    { name: "Overhead", value: over, color: "#c084fc" },
                                                    { name: "Tax", value: taxAmount, color: "#fbbf24" },
                                                    { name: "Net Profit", value: Math.max(0, netProfit), color: "#10b981" },
                                                ].filter(i => i.value > 0)}
                                                cx="50%"
                                                cy="50%"
                                                innerRadius={45}
                                                outerRadius={60}
                                                paddingAngle={4}
                                                dataKey="value"
                                                stroke="none"
                                            >
                                                {[
                                                    { name: "COGS", value: c, color: "#94a3b8" },
                                                    { name: "Ads", value: ads, color: "#60a5fa" },
                                                    { name: "Overhead", value: over, color: "#c084fc" },
                                                    { name: "Tax", value: taxAmount, color: "#fbbf24" },
                                                    { name: "Net Profit", value: Math.max(0, netProfit), color: "#10b981" },
                                                ].filter(i => i.value > 0).map((entry, index) => (
                                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                                ))}
                                            </Pie>
                                            <RechartsTooltip
                                                formatter={(value: number) => formatCurrency(value)}
                                                contentStyle={{ backgroundColor: '#0f172a', border: 'none', borderRadius: '8px', color: '#fff', fontSize: '11px', padding: '8px' }}
                                                itemStyle={{ color: '#fff' }}
                                            />
                                        </RechartsPie>
                                    </ResponsiveContainer>
                                ) : (
                                    <div className="absolute inset-0 flex items-center justify-center text-slate-300 text-[10px] font-bold border-2 border-dashed border-slate-100 rounded-full text-center p-4">
                                        Enter Revenue to see breakdown
                                    </div>
                                )}
                                {/* Center Label */}
                                {r > 0 && (
                                    <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none p-2">
                                        <span className="text-[9px] font-bold text-slate-400 uppercase tracking-tighter">Total</span>
                                        <span className={`text-center font-black leading-tight ${netProfit >= 0 ? 'text-slate-900' : 'text-red-600'} ${Math.abs(r) > 1000000000 ? 'text-[8px]' : 'text-[11px]'}`}>
                                            {formatCompact(r)}
                                        </span>
                                    </div>
                                )}
                            </div>
                            {/* Right: Legend */}
                            <div className="flex-1 space-y-1.5 pt-1">
                                <LegendItem label="COGS" percent={cogsPercent} color="bg-slate-400" />
                                <LegendItem label="Ads" percent={adsPercent} color="bg-blue-400" />
                                <LegendItem label="Overhead" percent={overheadPercent} color="bg-purple-400" />
                                <LegendItem label="Tax" percent={taxPercent} color="bg-amber-400" />
                                <div className="pt-1 mt-1 border-t border-slate-100">
                                    <LegendItem
                                        label="Net Profit"
                                        percent={profitPercent}
                                        color="bg-emerald-500"
                                        isProfit
                                        isNegative={netProfit < 0}
                                    />
                                </div>
                            </div>
                        </div>
                    </Card>
                </div>
            </div>
        </FadeIn >
    )
}
function LegendItem({
    label,
    percent,
    color,
    isProfit = false,
    isNegative = false
}: {
    label: string,
    percent: number,
    color: string,
    isProfit?: boolean,
    isNegative?: boolean
}) {
    return (
        <div className="flex items-center justify-between text-[10px] px-2 bg-slate-50 rounded-lg py-1.5 border border-slate-100/50">
            <div className="flex items-center gap-1.5 truncate">
                <div className={cn(
                    "w-2 h-2 rounded-full shrink-0",
                    isProfit && isNegative ? "bg-red-500" : color
                )} />
                <span className={cn(
                    "font-medium truncate",
                    isProfit ? (isNegative ? "text-red-600" : "text-emerald-700") : "text-slate-600"
                )}>
                    {label}
                </span>
            </div>
            <span className={cn(
                "font-black ml-1",
                isProfit ? (isNegative ? "text-red-600" : "text-emerald-600") : "text-slate-900"
            )}>
                {percent.toFixed(1)}%
            </span>
        </div>
    )
}
