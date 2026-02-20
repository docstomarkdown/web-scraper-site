"use client"

import React, { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { TrendingUp, DollarSign, Percent, BarChart3, AlertCircle } from "lucide-react"
import { FadeIn, Counter, CalculatorInput, ResultFeedbackCard, CalculatorCardHeader } from "@/app/tools/_shared/components"
import { cn } from "@/lib/utils"

export function ReturnOnAdSpendCalculator() {
    const [currency, setCurrency] = useState("USD")
    const [mode, setMode] = useState<"calculate-roas" | "calculate-revenue">("calculate-roas")

    // Common Input
    const [adSpend, setAdSpend] = useState<number | "">("")

    // Mode: Calculate ROAS (Standard)
    const [revenueFromAds, setRevenueFromAds] = useState<number | "">("")

    // Mode: Calculate Revenue (Planning)
    const [targetROAS, setTargetROAS] = useState<number | "">("")

    const handleReset = () => {
        setAdSpend("")
        setRevenueFromAds("")
        setTargetROAS("")
        setMode("calculate-roas")
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
    const spend = val(adSpend)

    // Standard Mode Results
    const revenue = val(revenueFromAds)
    const roas = spend > 0 ? revenue / spend : 0
    const roasPercent = roas * 100
    const profit = revenue - spend

    // Planning Mode Results
    const targetRoasVal = val(targetROAS)
    const calculatedRevenue = spend * targetRoasVal
    const plannedProfit = calculatedRevenue - spend

    const formatCurrency = (val: number) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: currency,
            maximumFractionDigits: 2
        }).format(val)
    }

    // Determine ROAS health (shared logic)
    const getROASHealth = (roasValue: number) => {
        let label = "High Performance"
        if (roasValue < 1) label = "Loss Making"
        else if (roasValue < 2) label = "Break Even / Low Profit"
        else if (roasValue < 4) label = "Profitable"

        let color = "text-blue-400"
        if (roasValue < 1) color = "text-red-400"
        else if (roasValue < 2) color = "text-amber-400"

        return { color, bg: "bg-slate-900", label }
    }

    const currentHealth = mode === "calculate-roas" ? getROASHealth(roas) : getROASHealth(targetRoasVal)

    return (
        <FadeIn className="w-full max-w-6xl mx-auto py-8 px-4" duration={0.6}>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

                {/* Inputs Section */}
                <div className="lg:col-span-7 space-y-6">
                    <Card className="border border-slate-200 shadow-sm bg-white">
                        <CalculatorCardHeader
                            description="Enter your ad spend details."
                            onReset={handleReset}
                            guideId="roas-guide"
                            currency={currency}
                            onCurrencyChange={setCurrency}
                        />
                        <CardContent className="space-y-5 pt-6">

                            <CalculatorInput
                                label={`Total Ad Spend (${symbol})`}
                                value={adSpend}
                                onChange={setAdSpend}
                                placeholder="100.00"
                                max={1000000}
                                tooltip="The total amount spent on advertising campaigns."
                            />

                            {/* Simplified Input Mode Selection via Tabs or just stacked inputs? 
                                User asked to "Simplify revenue input". The previous toggle was "Do you know your revenue? Yes/No".
                                "Yes" -> Show Revenue Input. "No" -> Show Target ROAS Input.
                                I will replace the bulky toggle with a cleaner interaction or just label the section better. 
                                Actually, the user might want a simple calculator where you just enter Revenue. 
                                But the tool has two distinct modes: "Calculate ROAS" (backward looking) and "Calculate Revenue Needed" (forward looking).
                                I will switch to a Tabs-like approach or a simple dropdown for "Goal", which is cleaner than a "Do you know...?" question.
                            */}

                            <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 space-y-4">
                                <label className="text-sm font-medium text-slate-700 block">I want to calculate:</label>
                                <div className="grid grid-cols-2 gap-2">
                                    <button
                                        onClick={() => setMode("calculate-roas")}
                                        className={`py-2.5 px-3 rounded-lg text-sm font-medium transition-all duration-200 border ${mode === "calculate-roas"
                                            ? "bg-white border-blue-200 text-blue-700 shadow-sm ring-1 ring-blue-100"
                                            : "bg-transparent border-transparent text-slate-500 hover:bg-slate-100"
                                            }`}
                                    >
                                        My Current ROAS
                                    </button>
                                    <button
                                        onClick={() => setMode("calculate-revenue")}
                                        className={`py-2.5 px-3 rounded-lg text-sm font-medium transition-all duration-200 border ${mode === "calculate-revenue"
                                            ? "bg-white border-blue-200 text-blue-700 shadow-sm ring-1 ring-blue-100"
                                            : "bg-transparent border-transparent text-slate-500 hover:bg-slate-100"
                                            }`}
                                    >
                                        Revenue Goal
                                    </button>
                                </div>

                                {mode === "calculate-roas" ? (
                                    <div className="pt-2">
                                        <CalculatorInput
                                            label={`Revenue from Ads (${symbol})`}
                                            value={revenueFromAds}
                                            onChange={setRevenueFromAds}
                                            placeholder="500.00"
                                            max={10000000}
                                            tooltip="The total revenue generated directly from your ads."
                                        />
                                    </div>
                                ) : (
                                    <div className="pt-2">
                                        <CalculatorInput
                                            label="Target ROAS (x)"
                                            value={targetROAS}
                                            onChange={setTargetROAS}
                                            placeholder="4.0"
                                            max={100}
                                            step={0.1}
                                            tooltip="Your goal Return on Ad Spend. Example: 4.0 means you want to make $4 for every $1 spent."
                                        />
                                    </div>
                                )}
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Results Section */}
                <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-8">
                    {/* Main Card */}
                    <ResultFeedbackCard
                        title={mode === "calculate-roas" ? "Return on Ad Spend (ROAS)" : "Target Revenue Required"}
                        titleLabel={currentHealth.label}
                        labelClassName={currentHealth.color}
                        mainValue={
                            mode === "calculate-roas" ? (
                                <Counter value={roas} formatter={(v) => `${v.toFixed(2)}x`} />
                            ) : (
                                <Counter value={calculatedRevenue} formatter={formatCurrency} key={currency} />
                            )
                        }
                        valueColor={mode === "calculate-roas" ? (roas > 1 ? "text-blue-400" : (roas < 1 ? "text-red-400" : "text-white")) : "text-white"}
                        secondaryMetrics={[
                            {
                                label: mode === "calculate-roas" ? "ROAS %" : "Target ROAS (x)",
                                value: mode === "calculate-roas" ? (
                                    <Counter value={roasPercent} formatter={(v) => `${v.toFixed(0)}%`} />
                                ) : (
                                    <Counter value={val(targetROAS)} formatter={(v) => `${v.toFixed(2)}x`} />
                                ),
                                color: currentHealth.color
                            }
                        ]}
                    />

                    {/* Performance Breakdown Card */}
                    {spend > 0 ? (
                        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden border-l-4 border-l-blue-500">
                            <div className="px-5 py-3.5 border-b border-slate-100">
                                <p className="text-xs font-bold text-slate-600 uppercase tracking-wider">Performance Breakdown</p>
                            </div>
                            <div className="divide-y divide-slate-100">
                                <div className="flex justify-between items-center px-5 py-3.5">
                                    <span className="text-sm text-slate-600">Ad Spend</span>
                                    <span className="text-sm font-semibold text-slate-800">{formatCurrency(spend)}</span>
                                </div>
                                <div className="flex justify-between items-center px-5 py-3.5">
                                    <span className="text-sm text-slate-600">Revenue Generated</span>
                                    <span className="text-sm font-semibold text-slate-800">{formatCurrency(mode === "calculate-roas" ? revenue : calculatedRevenue)}</span>
                                </div>
                                <div className="flex justify-between items-center px-5 py-4 bg-slate-50">
                                    <span className="text-sm font-bold text-blue-600">Net Profit (Ads)</span>
                                    <span className={cn("text-base font-bold", (mode === "calculate-roas" ? profit : plannedProfit) >= 0 ? "text-blue-600" : "text-red-500")}>
                                        {formatCurrency(mode === "calculate-roas" ? profit : plannedProfit)}
                                    </span>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 text-center">
                            <p className="text-sm text-slate-400">Enter ad spend details to calculate performance.</p>
                        </div>
                    )}


                    <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 flex gap-3 items-start">
                        <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                        <div>
                            <h4 className="text-sm font-semibold text-emerald-900 mb-1">Pro Tip</h4>
                            <p className="text-sm text-blue-700 leading-relaxed">
                                {mode === "calculate-roas" ?
                                    "A Return on Ad Spend (ROAS) of 4.0x (400%) means for every $1 you spend on ads, you get $4 back in revenue. Aim for at least 2.5x - 3.0x to cover product costs and other expenses." :
                                    "To define a target Return on Ad Spend (ROAS), consider your profit margins. If your break-even Return on Ad Spend (ROAS) is 2.0x, aim for a target of 3.0x or higher to ensure profitability."
                                }
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </FadeIn>
    )
}


