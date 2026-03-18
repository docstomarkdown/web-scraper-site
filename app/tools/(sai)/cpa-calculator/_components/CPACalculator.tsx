"use client"
import React, { useState } from "react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { DollarSign, MousePointerClick, Users, Target, Info, BarChart3 } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { CalculatorCardHeader, CalculatorInput, Counter, CurrencyCombobox, FadeIn, ResultFeedbackCard } from "@/app/tools/_shared/components"
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
    // We'll return specific class sets for the badge to ensure consistency
    let badgeClasses = "bg-slate-100 border-slate-200 text-slate-600"
    let valueColor = "text-white"
    if (validCalculation && target > 0) {
        if (cpa <= target) {
            valueColor = "text-white"
            // Clean, standard success colors for the external badge
            badgeClasses = "bg-emerald-50 border-emerald-200 text-emerald-700"
        } else {
            valueColor = "text-red-400"
            // Clean, standard error colors for the external badge
            badgeClasses = "bg-red-50 border-red-200 text-red-700"
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
                <div className="lg:col-span-7 space-y-3">
                    <Card className="border border-slate-200 shadow-sm bg-white">
                        <CalculatorCardHeader
                            description="Enter your campaign metrics."
                            onReset={handleReset}
                            guideId="cpa-guide"
                            currency={currency}
                            onCurrencyChange={setCurrency}
                        />
                        <CardContent className="space-y-3 pt-6">
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
                <div className="lg:col-span-5 space-y-3 lg:sticky lg:top-8">
                    <ResultFeedbackCard
                        title="Cost Per Acquisition (CPA)"
                        mainValue={
                            <Counter value={cpa} formatter={formatCurrency} key={`${currency}-${mode}`} />
                        }
                        valueColor={valueColor}
                    />
                    {/* Breakdown Card */}
                    {validCalculation ? (
                        <div className={cn(
                            "bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden border-l-4",
                            cpa <= (target || cpa) ? "border-l-blue-500" : "border-l-red-500"
                        )}>
                            <div className="px-5 py-3.5 border-b border-slate-100">
                                <p className="text-xs font-bold text-slate-600 uppercase tracking-wider">
                                    {mode === "campaign-data" ? "Campaign Audit" : "Projection Breakdown"}
                                </p>
                            </div>
                            <div className="divide-y divide-slate-100">
                                {mode === "campaign-data" ? (
                                    <>
                                        <div className="flex justify-between items-center px-5 py-3.5">
                                            <span className="text-sm text-slate-600">Total Spend</span>
                                            <span className="text-sm font-semibold text-slate-800">{formatCurrency(val(adSpend))}</span>
                                        </div>
                                        <div className="flex justify-between items-center px-5 py-3.5">
                                            <span className="text-sm text-slate-600">Total Conversions</span>
                                            <span className="text-sm font-semibold text-slate-800">{val(conversions)}</span>
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <div className="flex justify-between items-center px-5 py-3.5">
                                            <span className="text-sm text-slate-600">Cost Per Click (CPC)</span>
                                            <span className="text-sm font-semibold text-slate-800">{formatCurrency(val(cpc))}</span>
                                        </div>
                                        <div className="flex justify-between items-center px-5 py-3.5">
                                            <span className="text-sm text-slate-600">Clicks for 1 Conversion</span>
                                            <span className="text-sm font-semibold text-slate-800">
                                                {val(conversionRate) > 0 ? (100 / val(conversionRate)).toFixed(1) : "—"}
                                            </span>
                                        </div>
                                    </>
                                )}
                                {target > 0 && (
                                    <div className="flex justify-between items-center px-5 py-3.5 bg-slate-50/50">
                                        <span className="text-sm font-medium text-slate-500">Target CPA</span>
                                        <span className="text-sm font-bold text-slate-700">{formatCurrency(target)}</span>
                                    </div>
                                )}
                                <div className={cn("flex justify-between items-center px-5 py-4", cpa <= (target || cpa) ? "bg-blue-50/50" : "bg-red-50/50")}>
                                    <span className={cn("text-sm font-bold", cpa <= (target || cpa) ? "text-blue-700" : "text-red-700")}>
                                        Measured CPA
                                    </span>
                                    <span className={cn("text-base font-bold", cpa <= (target || cpa) ? "text-blue-700" : "text-red-700")}>
                                        {formatCurrency(cpa)}
                                    </span>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 text-center">
                            <p className="text-sm text-slate-400">Enter campaign data to see analysis.</p>
                        </div>
                    )}
                    {/* Indicator Badge */}
                    {validCalculation && (
                        <div className={cn(
                            "px-4 py-3 rounded-xl border text-center text-sm font-semibold",
                            badgeClasses
                        )}>
                            {validCalculation && target > 0 ? (
                                cpa <= target ? (
                                    <span>✅ CPA Below Target <span className="opacity-80 ml-1">(-{formatCurrency(Math.abs(cpa - target))})</span></span>
                                ) : (
                                    <span>⚠️ CPA Above Target <span className="opacity-80 ml-1">(+{formatCurrency(Math.abs(cpa - target))})</span></span>
                                )
                            ) : "📊 CPA Calculated"}
                        </div>
                    )}
                </div>
            </div>
        </FadeIn>
    )
}
