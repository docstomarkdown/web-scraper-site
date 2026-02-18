"use client"

import React, { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { HelpCircle, RotateCcw, DollarSign, MousePointerClick, Users, Target, Info, BarChart3 } from "lucide-react"
import { CurrencyCombobox } from "@/app/tools/_shared/components"
import { FadeIn, Counter, CalculatorInput, ResultFeedbackCard } from "@/app/tools/_shared/components"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

export function CPACalculator() {
    const [currency, setCurrency] = useState("USD")
    const [mode, setMode] = useState<"campaign-data" | "estimation">("campaign-data")

    // Mode 1: Campaign Data
    const [adSpend, setAdSpend] = useState<number | "">("")
    const [conversions, setConversions] = useState<number | "">("")

    // Mode 2: Estimation
    const [cpc, setCpc] = useState<number | "">("")
    const [conversionRate, setConversionRate] = useState<number | "">("")

    // Common
    const [targetCPA, setTargetCPA] = useState<number | "">("")

    const handleReset = () => {
        setAdSpend("")
        setConversions("")
        setCpc("")
        setConversionRate("")
        setTargetCPA("")
        setMode("campaign-data")
    }

    const val = (v: number | "") => (v === "" ? 0 : v)

    const currencySymbols: Record<string, string> = {
        USD: '$', EUR: '€', GBP: '£', INR: '₹', AUD: 'A$', CAD: 'C$', JPY: '¥', CNY: '¥',
        AED: 'AED', SGD: 'S$', HKD: 'HK$', CHF: 'Fr', MXN: 'MX$', BRL: 'R$', KRW: '₩',
        RUB: '₽', ZAR: 'R', SEK: 'kr', NOK: 'kr', DKK: 'kr', PLN: 'zł', THB: '฿',
        IDR: 'Rp', MYR: 'RM', PHP: '₱', VND: '₫', TRY: '₺', SAR: '﷼', NZD: 'NZ$',
        EGP: 'E£', PKR: '₨', BDT: '৳', NGN: '₦', KES: 'KSh'
    }
    const symbol = currencySymbols[currency] || "$"

    const scrollToGuide = () => {
        const element = document.getElementById('cpa-guide');
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    // --- Calculations ---
    let cpa = 0
    let validCalculation = false

    if (mode === "campaign-data") {
        const spendVal = val(adSpend)
        const conversionsVal = val(conversions)
        if (spendVal > 0 && conversionsVal > 0) {
            cpa = spendVal / conversionsVal
            validCalculation = true
        }
    } else {
        const cpcVal = val(cpc)
        const rateVal = val(conversionRate)
        if (cpcVal > 0 && rateVal > 0) {
            cpa = cpcVal / (rateVal / 100)
            validCalculation = true
        }
    }

    const target = val(targetCPA)

    // Determine Color
    // If target is set: Green if CPA <= Target, Red if CPA > Target
    // If target not set: White default
    let valueColor = "text-white"
    let statusLabel = "Calculated CPA"
    let statusColor = "bg-slate-800/50 text-slate-300"

    if (validCalculation && target > 0) {
        if (cpa <= target) {
            valueColor = "text-emerald-400"
            statusLabel = "Under Target"
            statusColor = "bg-emerald-500/20 text-emerald-300"
        } else {
            valueColor = "text-red-400"
            statusLabel = "Over Target"
            statusColor = "bg-red-500/20 text-red-300"
        }
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

                {/* Inputs Section */}
                <div className="lg:col-span-7 space-y-6">
                    <Card className="border border-slate-200 shadow-sm bg-white">
                        <CardHeader className="pb-4 border-b border-slate-50 flex flex-row items-center justify-between space-y-0">
                            <div className="space-y-1">
                                <div className="flex items-center gap-2">
                                    <CardTitle className="text-xl font-bold text-blue-600">
                                        Inputs
                                    </CardTitle>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        onClick={scrollToGuide}
                                        className="text-slate-400 hover:text-blue-600 hover:bg-slate-100 h-6 w-6 rounded-full"
                                    >
                                        <HelpCircle className="w-4 h-4" />
                                    </Button>
                                    <TooltipProvider delayDuration={100}>
                                        <Tooltip>
                                            <TooltipTrigger asChild>
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    onClick={handleReset}
                                                    className="text-slate-400 hover:text-slate-600 hover:bg-slate-100 h-6 w-6 rounded-full"
                                                >
                                                    <RotateCcw className="w-3.5 h-3.5" />
                                                </Button>
                                            </TooltipTrigger>
                                            <TooltipContent side="top" className="text-xs bg-slate-900 text-white border-slate-800">
                                                Reset Calculator
                                            </TooltipContent>
                                        </Tooltip>
                                    </TooltipProvider>
                                </div>
                                <CardDescription>Enter your campaign metrics.</CardDescription>
                            </div>
                            <div className="w-[140px]">
                                <CurrencyCombobox value={currency} onValueChange={setCurrency} />
                            </div>
                        </CardHeader>
                        <CardContent className="space-y-5 pt-6">

                            {/* Simplified Mode Toggle */}
                            <div className="relative flex bg-slate-100/80 p-1.5 rounded-xl border border-slate-200/60 w-full mb-4 shadow-sm">
                                {/* Animated Background Pill */}
                                <motion.div
                                    className="absolute bg-white rounded-lg shadow-sm border border-slate-200/50"
                                    initial={false}
                                    animate={{
                                        x: mode === "campaign-data" ? 0 : "100%",
                                    }}
                                    transition={{ type: "spring", stiffness: 350, damping: 35 }}
                                    style={{
                                        top: 6,
                                        bottom: 6,
                                        left: 6,
                                        width: 'calc(50% - 6px)',
                                        zIndex: 0
                                    }}
                                />

                                {/* Campaign Data Button */}
                                <div className="relative z-10 flex-1">
                                    <button
                                        type="button"
                                        onClick={() => setMode("campaign-data")}
                                        className={cn(
                                            "w-full flex items-center justify-center gap-1.5 py-2 rounded-lg transition-all duration-200",
                                            mode === "campaign-data" ? "text-blue-600 font-bold" : "text-slate-500 hover:text-slate-700"
                                        )}
                                    >
                                        <span className="text-sm">Campaign Data</span>
                                        <TooltipProvider delayDuration={100}>
                                            <Tooltip>
                                                <TooltipTrigger asChild>
                                                    <div className="opacity-40 hover:opacity-100 transition-opacity">
                                                        <Info className="h-3.5 w-3.5" />
                                                    </div>
                                                </TooltipTrigger>
                                                <TooltipContent side="top" className="max-w-xs text-xs bg-slate-900 text-white border-slate-800">
                                                    Analyze existing results using total spend and conversions.
                                                </TooltipContent>
                                            </Tooltip>
                                        </TooltipProvider>
                                    </button>
                                </div>

                                {/* Estimation Button */}
                                <div className="relative z-10 flex-1">
                                    <button
                                        type="button"
                                        onClick={() => setMode("estimation")}
                                        className={cn(
                                            "w-full flex items-center justify-center gap-1.5 py-2 rounded-lg transition-all duration-200",
                                            mode === "estimation" ? "text-blue-600 font-bold" : "text-slate-500 hover:text-slate-700"
                                        )}
                                    >
                                        <span className="text-sm">Estimation</span>
                                        <TooltipProvider delayDuration={100}>
                                            <Tooltip>
                                                <TooltipTrigger asChild>
                                                    <div className="opacity-40 hover:opacity-100 transition-opacity">
                                                        <Info className="h-3.5 w-3.5" />
                                                    </div>
                                                </TooltipTrigger>
                                                <TooltipContent side="top" className="max-w-xs text-xs bg-slate-900 text-white border-slate-800">
                                                    Forecast costs based on CPC and Conversion Rate.
                                                </TooltipContent>
                                            </Tooltip>
                                        </TooltipProvider>
                                    </button>
                                </div>
                            </div>

                            {mode === "campaign-data" ? (
                                <>
                                    <CalculatorInput
                                        label={`Total Ad Spend (${symbol})`}
                                        value={adSpend}
                                        onChange={setAdSpend}
                                        placeholder="1000.00"
                                        tooltip="The total amount spent."
                                    />
                                    <CalculatorInput
                                        label="Total Conversions"
                                        value={conversions}
                                        onChange={setConversions}
                                        placeholder="50"
                                        tooltip="The total number of acquisitions/conversions."
                                    />
                                </>
                            ) : (
                                <>
                                    <CalculatorInput
                                        label={`Cost Per Click (CPC) (${symbol})`}
                                        value={cpc}
                                        onChange={setCpc}
                                        placeholder="1.50"
                                        tooltip="The average cost you pay for each click."
                                    />
                                    <CalculatorInput
                                        label="Conversion Rate (%)"
                                        value={conversionRate}
                                        onChange={setConversionRate}
                                        placeholder="2.5"
                                        max={100}
                                        tooltip="The percentage of clicks that result in a conversion."
                                    />
                                </>
                            )}

                            <div className="pt-4 border-t border-slate-100">
                                <CalculatorInput
                                    label={`Target CPA (${symbol}) (Optional)`}
                                    value={targetCPA}
                                    onChange={setTargetCPA}
                                    placeholder="20.00"
                                    tooltip="Your desired maximum cost per acquisition. Used to calculate status."
                                />
                            </div>

                        </CardContent>
                    </Card>
                </div>

                {/* Results Section */}
                <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-8">
                    <ResultFeedbackCard
                        title="Cost Per Acquisition (CPA)"
                        titleLabel={validCalculation ? statusLabel : "Enter Data"}
                        labelClassName={validCalculation ? statusColor : "bg-slate-800 text-slate-400"}
                        mainValue={
                            <Counter value={cpa} formatter={formatCurrency} key={`${currency}-${mode}`} />
                        }
                        valueColor={valueColor}
                        secondaryMetrics={
                            mode === "campaign-data" ? [
                                { label: "Total Spend", value: <Counter value={val(adSpend)} formatter={formatCurrency} key={currency} />, color: "text-slate-300" },
                                { label: "Conversions", value: <Counter value={val(conversions)} formatter={(v) => v.toFixed(0)} />, color: "text-slate-300" }
                            ] : [
                                { label: "CPC", value: <Counter value={val(cpc)} formatter={formatCurrency} key={currency} />, color: "text-slate-300" },
                                { label: "Est. Conversions (per 100 clicks)", value: <Counter value={val(conversionRate)} formatter={(v) => v.toFixed(1)} />, color: "text-slate-300" }
                            ]
                        }
                    />

                    {/* Indicator Badge */}
                    {validCalculation && (
                        <div className={cn(
                            "px-4 py-3 rounded-xl border text-center text-sm font-semibold",
                            statusColor.replace('bg-', 'bg-opacity-10 border-').replace('/20', '').replace('text-', 'text-')
                        )}>
                            {validCalculation && target > 0 ? (
                                cpa <= target ? "✅ CPA Below Target" : "⚠️ CPA Above Target"
                            ) : "📊 CPA Calculated"}
                        </div>
                    )}

                    {/* Breakdown Card */}
                    {validCalculation ? (
                        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                            <div className="px-4 py-3 border-b border-slate-100">
                                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Metric Breakdown</p>
                            </div>
                            <div className="divide-y divide-slate-50">
                                <div className="flex justify-between items-center px-4 py-3">
                                    <span className="text-sm text-slate-500">{mode === 'campaign-data' ? 'Total Ad Spend' : 'Cost Per Click'}</span>
                                    <span className="text-sm font-medium text-slate-700">
                                        {formatCurrency(mode === 'campaign-data' ? val(adSpend) : val(cpc))}
                                    </span>
                                </div>
                                <div className="flex justify-between items-center px-4 py-3">
                                    <span className="text-sm text-slate-500">{mode === 'campaign-data' ? 'Total Conversions' : 'Conversion Rate'}</span>
                                    <span className="text-sm font-medium text-slate-700">
                                        {mode === 'campaign-data' ? val(conversions).toLocaleString() : `${val(conversionRate)}%`}
                                    </span>
                                </div>
                                {target > 0 && (
                                    <div className="flex justify-between items-center px-4 py-3 bg-slate-50">
                                        <span className="text-sm font-semibold text-slate-900">Target Variance</span>
                                        <span className={cn("text-sm font-bold", cpa <= target ? "text-emerald-600" : "text-red-600")}>
                                            {cpa <= target ? "-" : "+"}{formatCurrency(Math.abs(cpa - target))}
                                        </span>
                                    </div>
                                )}
                            </div>
                        </div>
                    ) : (
                        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 text-center">
                            <p className="text-sm text-slate-400">Enter metrics to calculate CPA.</p>
                        </div>
                    )}

                    {/* Pro Tip */}
                    <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 flex gap-3 items-start mt-4">
                        <Target className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                        <div>
                            <h4 className="text-sm font-semibold text-blue-900 mb-1">Pro Tip</h4>
                            <p className="text-sm text-blue-700 leading-relaxed">
                                {mode === "campaign-data" ?
                                    "A lower CPA is generally better, but ensure it's profitable relative to your Customer Lifetime Value (LTV)." :
                                    "Improving your Conversion Rate by just 1% can significantly lower your CPA without changing your CPC."
                                }
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </FadeIn>
    )
}
