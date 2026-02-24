"use client"

import React, { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { HelpCircle, Info, TrendingUp, DollarSign, Percent, ArrowRightLeft, Target, Wallet, BarChart3, RefreshCw, RotateCcw } from "lucide-react"
import { ActionButtons, InputCardHeader } from "../../ToolTemplate"
import { CalculatorInput, ResultFeedbackCard, Counter, CurrencyCombobox, FadeIn } from "@/app/tools/_shared/components"
import { cn } from "@/lib/utils"

export function GrossMarginCalculator() {
    // Calculator Mode State
    // "margin": Calculate Margin % & Profit (Given Revenue, COGS)
    // "revenue": Calculate Revenue Needed (Given COGS, Target Margin)
    // "cogs": Calculate COGS Limit (Given Revenue, Target Margin)
    const [mode, setMode] = useState<"margin" | "revenue" | "cogs">("margin")

    const [currency, setCurrency] = useState("USD")

    // Inputs (stored as strings to allow empty states)
    const [revenue, setRevenue] = useState<number | "">("")
    const [cogs, setCogs] = useState<number | "">("")
    const [targetMargin, setTargetMargin] = useState<number | "">("")

    const val = (v: number | "") => (v === "" ? 0 : v)

    const currencySymbols: Record<string, string> = {
        USD: '$', EUR: '€', GBP: '£', INR: '₹', AUD: 'A$', CAD: 'C$', JPY: '¥', CNY: '¥',
        AED: 'AED', SGD: 'S$', HKD: 'HK$', CHF: 'Fr', MXN: 'MX$', BRL: 'R$', KRW: '₩',
        RUB: '₽', ZAR: 'R', SEK: 'kr', NOK: 'kr', DKK: 'kr', PLN: 'zł', THB: '฿',
        IDR: 'Rp', MYR: 'RM', PHP: '₱', VND: '₫', TRY: '₺', SAR: '﷼', NZD: 'NZ$',
        EGP: 'E£', PKR: '₨', BDT: '৳', NGN: '₦', KES: 'KSh'
    }
    const symbol = currencySymbols[currency] || "$"

    const handleReset = () => {
        setRevenue("")
        setCogs("")
        setTargetMargin("")
    }

    // Calculations based on Mode
    let derivedMargin = 0
    let derivedProfit = 0
    let derivedRevenue = 0
    let derivedCogs = 0
    let derivedMarkup = 0

    // Mode Logic
    if (mode === "margin") {
        const r = val(revenue)
        const c = val(cogs)
        derivedRevenue = r
        derivedCogs = c
        derivedProfit = r - c
        derivedMargin = r > 0 ? (derivedProfit / r) * 100 : 0
        derivedMarkup = c > 0 ? (derivedProfit / c) * 100 : 0
    } else if (mode === "revenue") {
        const c = val(cogs)
        const m = val(targetMargin)
        // Revenue = COGS / (1 - Margin%)
        // Margin% is 0-100
        const marginDecimal = m / 100
        if (marginDecimal < 1) {
            derivedRevenue = c / (1 - marginDecimal)
            derivedCogs = c
            derivedProfit = derivedRevenue - c
            derivedMargin = m
            derivedMarkup = c > 0 ? (derivedProfit / c) * 100 : 0
        }
    } else if (mode === "cogs") {
        const r = val(revenue)
        const m = val(targetMargin)
        // COGS = Revenue * (1 - Margin%)
        const marginDecimal = m / 100
        derivedRevenue = r
        derivedCogs = r * (1 - marginDecimal)
        derivedProfit = r - derivedCogs
        derivedMargin = m
        derivedMarkup = derivedCogs > 0 ? (derivedProfit / derivedCogs) * 100 : 0
    }

    const [isCopied, setIsCopied] = useState(false)

    const handleCopy = () => {
        const text = `Gross Margin Calculator Results:\n\nMode: ${mode === 'margin' ? 'Find Margin' : (mode === 'revenue' ? 'Find Revenue' : 'Find COGS')}\nRevenue: ${formatCurrency(derivedRevenue)}\nCOGS: ${formatCurrency(derivedCogs)}\n\nGross Margin: ${derivedMargin.toFixed(2)}%\nGross Profit: ${formatCurrency(derivedProfit)}\nMarkup: ${derivedMarkup.toFixed(2)}%`

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

    return (
        <FadeIn className="w-full max-w-6xl mx-auto py-8 px-4" duration={0.6}>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

                {/* Left Column: Inputs & Mode Selection */}
                <div className="lg:col-span-7 space-y-6">
                    <Card className="border border-slate-200 shadow-xl shadow-slate-200/40 bg-white rounded-3xl overflow-hidden">
                        <div className="flex flex-row items-center justify-between border-b border-slate-100 pr-6">
                            <InputCardHeader
                                title="Configurations"
                                subtitle="Set your parameters to calculate margin."
                                icon={BarChart3}
                                scrollId="how-to-use"
                            />
                            <div className="flex items-center gap-3">
                                <div className="w-[140px]">
                                    <CurrencyCombobox value={currency} onValueChange={setCurrency} />
                                </div>
                            </div>
                        </div>

                        <CardContent className="p-6 md:p-8 space-y-8">

                            {/* Calculation Mode Selector - Enhanced Design */}
                            <div className="grid grid-cols-3 gap-1.5 p-1 bg-slate-100 rounded-2xl border border-slate-200/60">
                                <ModeButton
                                    active={mode === "margin"}
                                    onClick={() => { setMode("margin"); handleReset(); }}
                                    icon={Percent}
                                    label="Find Margin"
                                />
                                <ModeButton
                                    active={mode === "revenue"}
                                    onClick={() => { setMode("revenue"); handleReset(); }}
                                    icon={Target}
                                    label="Find Revenue"
                                />
                                <ModeButton
                                    active={mode === "cogs"}
                                    onClick={() => { setMode("cogs"); handleReset(); }}
                                    icon={Wallet}
                                    label="Find COGS Cost"
                                />
                            </div>

                            {/* Dynamic Inputs based on Mode */}
                            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                                {mode === "margin" && (
                                    <>
                                        <CalculatorInput
                                            label={`Total Revenue (${symbol})`}
                                            value={revenue}
                                            onChange={setRevenue}
                                            placeholder="10000.00"
                                            tooltip="The total sales revenue before any deductions."
                                        />
                                        <CalculatorInput
                                            label={`Cost of Goods Sold (COGS) (${symbol})`}
                                            value={cogs}
                                            onChange={setCogs}
                                            placeholder="6000.00"
                                            tooltip="The direct costs attributable to the production of the goods sold."
                                        />
                                    </>
                                )}

                                {mode === "revenue" && (
                                    <>
                                        <CalculatorInput
                                            label={`Cost of Goods Sold (COGS) (${symbol})`}
                                            value={cogs}
                                            onChange={setCogs}
                                            placeholder="6000.00"
                                            tooltip="Your cost to produce or acquire the goods."
                                        />
                                        <CalculatorInput
                                            label="Target Gross Margin (%)"
                                            value={targetMargin}
                                            onChange={setTargetMargin}
                                            placeholder="40.0"
                                            max={99.99}
                                            tooltip="The gross margin percentage you want to achieve."
                                        />
                                    </>
                                )}

                                {mode === "cogs" && (
                                    <>
                                        <CalculatorInput
                                            label={`Target Revenue (${symbol})`}
                                            value={revenue}
                                            onChange={setRevenue}
                                            placeholder="10000.00"
                                            tooltip="The sales revenue you expect or aim for."
                                        />
                                        <CalculatorInput
                                            label="Target Gross Margin (%)"
                                            value={targetMargin}
                                            onChange={setTargetMargin}
                                            placeholder="40.0"
                                            max={99.99}
                                            tooltip="The gross margin percentage you need to maintain."
                                        />
                                    </>
                                )}
                            </div>

                            <ActionButtons
                                onReset={handleReset}
                                onCopy={handleCopy}
                                isCopied={isCopied}
                            />
                        </CardContent>
                    </Card>
                </div>

                {/* Right Column: Results */}
                <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-32 animate-in fade-in slide-in-from-right-4 duration-700 delay-100">

                    {/* Primary Result Card */}
                    <ResultFeedbackCard
                        title={mode === "margin" ? "GROSS MARGIN" : (mode === "revenue" ? "REQUIRED REVENUE" : "MAX COGS LIMIT")}
                        titleLabel="Live calculation"
                        mainValue={
                            <div className="flex flex-col">
                                <div className="flex items-baseline gap-2">
                                    {mode === "margin"
                                        ? <Counter value={derivedMargin} formatter={(v) => `${v.toFixed(2)}%`} />
                                        : <Counter value={mode === "revenue" ? derivedRevenue : derivedCogs} formatter={formatCurrency} key={currency} />
                                    }
                                    <span className="text-2xl font-medium opacity-50">
                                        {mode === "margin" ? "" : ""}
                                    </span>
                                </div>
                                <p className="text-slate-400 text-sm font-bold mt-2">
                                    {mode === "margin" ? "Profit margin percentage" : (mode === "revenue" ? "Revenue needed" : "Maximum allowable cost")}
                                </p>
                            </div>
                        }
                    >
                        <div className="space-y-6">
                            {/* Secondary Metrics Grid */}
                            <div className="grid grid-cols-2 gap-4">
                                <div className="bg-white/5 rounded-xl p-4 border border-white/5">
                                    <div className="flex items-center gap-1.5 mb-1">
                                        <p className="text-xs font-bold text-slate-300">Gross Profit</p>
                                        <TooltipProvider delayDuration={100}>
                                            <Tooltip>
                                                <TooltipTrigger asChild>
                                                    <Info className="h-3 w-3 text-slate-400 hover:text-white cursor-pointer" />
                                                </TooltipTrigger>
                                                <TooltipContent side="top" className="max-w-xs text-xs bg-slate-900 text-white border-slate-800">
                                                    This is your actual profit in dollars after paying for the product.
                                                </TooltipContent>
                                            </Tooltip>
                                        </TooltipProvider>
                                    </div>
                                    <p className="text-xl font-bold text-blue-400">
                                        <Counter value={derivedProfit} formatter={formatCurrency} key={currency} />
                                    </p>
                                </div>
                                <div className="bg-white/5 rounded-xl p-4 border border-white/5 text-left">
                                    <div className="flex items-center gap-1.5 mb-1">
                                        <p className="text-xs font-bold text-slate-300">Markup</p>
                                        <TooltipProvider delayDuration={100}>
                                            <Tooltip>
                                                <TooltipTrigger asChild>
                                                    <Info className="h-3 w-3 text-slate-400 hover:text-white cursor-pointer" />
                                                </TooltipTrigger>
                                                <TooltipContent side="top" className="max-w-xs text-xs bg-slate-900 text-white border-slate-800">
                                                    The percentage amount you increased the cost by to reach the selling price.
                                                </TooltipContent>
                                            </Tooltip>
                                        </TooltipProvider>
                                    </div>
                                    <p className="text-xl font-bold text-blue-400">
                                        <Counter value={derivedMarkup} formatter={(v) => `${v.toFixed(2)}%`} />
                                    </p>
                                </div>
                            </div>
                        </div>
                    </ResultFeedbackCard>



                    {/* Visual Breakdown Bar */}
                    <Card className="bg-white border-slate-200 shadow-sm rounded-2xl overflow-hidden p-5">
                        <h4 className="text-sm font-bold text-slate-700 mb-4 flex items-center gap-2">
                            <BarChart3 className="w-4 h-4 text-blue-500" />
                            Revenue Breakdown
                        </h4>
                        <div className="relative w-full h-8 bg-slate-100 rounded-full overflow-hidden flex">
                            {/* COGS Part */}
                            <div
                                style={{ width: `${Math.min(Math.max((derivedCogs / derivedRevenue) * 100, 0), 100)}%` }}
                                className="h-full bg-slate-400 flex items-center justify-center text-[10px] font-bold text-white transition-all duration-500"
                            >
                                {derivedRevenue > 0 && (derivedCogs / derivedRevenue) > 0.1 && "COGS"}
                            </div>

                            {/* Profit Part */}
                            <div
                                style={{ width: `${Math.min(Math.max((derivedProfit / derivedRevenue) * 100, 0), 100)}%` }}
                                className="h-full bg-emerald-500 flex items-center justify-center text-[10px] font-bold text-white transition-all duration-500"
                            >
                                {derivedRevenue > 0 && (derivedProfit / derivedRevenue) > 0.1 && "PROFIT"}
                            </div>
                        </div>
                        <div className="flex items-center justify-start gap-6 mt-2 text-xs text-slate-500 font-medium px-1">
                            <div className="flex items-center gap-1.5">
                                <div className="w-2 h-2 rounded-full bg-slate-400"></div>
                                Cost: {derivedRevenue > 0 ? ((derivedCogs / derivedRevenue) * 100).toFixed(1) : 0}%
                            </div>
                            <div className="flex items-center gap-1.5">
                                <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                                Profit: {derivedRevenue > 0 ? ((derivedProfit / derivedRevenue) * 100).toFixed(1) : 0}%
                            </div>
                        </div>
                    </Card>

                </div>
            </div>
        </FadeIn >
    )
}

// Sub-component for Mode Buttons
function ModeButton({ active, onClick, icon: Icon, label }: { active: boolean, onClick: () => void, icon: any, label: string }) {
    return (
        <button
            onClick={onClick}
            className={cn(
                "flex flex-col items-center justify-center gap-1.5 p-2 rounded-xl transition-all duration-300 border",
                active
                    ? "bg-white border-blue-200 shadow-sm text-blue-600 ring-2 ring-blue-100"
                    : "border-transparent text-slate-500 hover:bg-white hover:text-slate-700 hover:shadow-sm"
            )}
        >
            <Icon className={cn("w-4 h-4", active ? "stroke-[2.5px]" : "stroke-2")} />
            <span className="text-[11px] font-bold tracking-tight">{label}</span>
        </button>
    )
}


