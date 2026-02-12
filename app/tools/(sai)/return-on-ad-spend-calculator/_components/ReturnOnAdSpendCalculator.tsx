"use client"

import React, { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { HelpCircle, TrendingUp, DollarSign, Percent, BarChart3, AlertCircle } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { CurrencyCombobox } from "@/components/ui/currency-combobox"
import { FadeIn, Counter, CalculatorInput, ResultFeedbackCard } from "@/app/tools/_shared/components"

export function ReturnOnAdSpendCalculator() {
    const [currency, setCurrency] = useState("USD")
    const [mode, setMode] = useState<"calculate-roas" | "calculate-revenue">("calculate-roas")

    // Common Input
    const [adSpend, setAdSpend] = useState<number | "">("")

    // Mode: Calculate ROAS (Standard)
    const [revenueFromAds, setRevenueFromAds] = useState<number | "">("")

    // Mode: Calculate Revenue (Planning)
    const [targetROAS, setTargetROAS] = useState<number | "">("")

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
        const element = document.getElementById('roas-guide');
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

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

        // Always return blue styling
        return { color: "text-blue-400", bg: "bg-slate-900", label }
    }

    const currentHealth = mode === "calculate-roas" ? getROASHealth(roas) : getROASHealth(targetRoasVal)

    return (
        <FadeIn className="w-full max-w-5xl mx-auto py-8 px-4" duration={0.6}>
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">

                {/* Inputs Section */}
                <div className="md:col-span-5 space-y-6">
                    <Card className="border border-slate-200 shadow-sm bg-white">
                        <CardHeader className="pb-4 border-b border-slate-50 flex flex-row items-center justify-between space-y-0">
                            <div className="space-y-1">
                                <div className="flex items-center gap-2">
                                    <CardTitle className="text-xl font-bold text-slate-800">
                                        Inputs
                                    </CardTitle>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        onClick={scrollToGuide}
                                        className="text-slate-400 hover:text-slate-900 hover:bg-slate-100 h-6 w-6 rounded-full"
                                    >
                                        <HelpCircle className="w-4 h-4" />
                                    </Button>
                                </div>
                                <CardDescription>Enter your ad spend details.</CardDescription>
                            </div>
                            <div className="w-[140px]">
                                <CurrencyCombobox value={currency} onValueChange={setCurrency} />
                            </div>
                        </CardHeader>
                        <CardContent className="space-y-5 pt-6">

                            <CalculatorInput
                                label={`Total Ad Spend (${symbol})`}
                                value={adSpend}
                                onChange={setAdSpend}
                                placeholder="100.00"
                                max={1000000}
                                tooltip="The total amount spent on advertising campaigns."
                            />

                            {/* Mode Toggle */}
                            <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 space-y-3">
                                <div className="flex items-center gap-2">
                                    <label className="text-sm font-medium text-slate-700">Do you know your revenue?</label>
                                    <TooltipProvider>
                                        <Tooltip delayDuration={300}>
                                            <TooltipTrigger asChild>
                                                <HelpCircle className="w-4 h-4 text-slate-400 cursor-help hover:text-slate-600 transition-colors" />
                                            </TooltipTrigger>
                                            <TooltipContent className="max-w-[200px] text-xs">
                                                <p>Switch to &quot;No&quot; if you want to calculate the revenue needed to hit a specific Target ROAS.</p>
                                            </TooltipContent>
                                        </Tooltip>
                                    </TooltipProvider>
                                </div>
                                <div className="flex gap-2">
                                    <button
                                        onClick={() => setMode("calculate-roas")}
                                        className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-all duration-200 border ${mode === "calculate-roas" ? "bg-white border-blue-200 text-blue-700 shadow-sm ring-1 ring-blue-100" : "bg-transparent border-transparent text-slate-500 hover:bg-slate-100"}`}
                                    >
                                        Yes
                                    </button>
                                    <button
                                        onClick={() => setMode("calculate-revenue")}
                                        className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-all duration-200 border ${mode === "calculate-revenue" ? "bg-white border-blue-200 text-blue-700 shadow-sm ring-1 ring-blue-100" : "bg-transparent border-transparent text-slate-500 hover:bg-slate-100"}`}
                                    >
                                        No
                                    </button>
                                </div>
                            </div>

                            {mode === "calculate-roas" ? (
                                <CalculatorInput
                                    label={`Revenue from Ads (${symbol})`}
                                    value={revenueFromAds}
                                    onChange={setRevenueFromAds}
                                    placeholder="500.00"
                                    max={1000000}
                                    tooltip="The total revenue generated directly from your ads."
                                />
                            ) : (
                                <CalculatorInput
                                    label="Target ROAS"
                                    value={targetROAS}
                                    onChange={setTargetROAS}
                                    placeholder="4.0"
                                    max={100}
                                    step={0.1}
                                    tooltip="ROAS (Return on Ad Spend): The money you make for every $1 spent on ads. Aim for 4X or more. Calculated as: Revenue / Ad Spend."
                                />
                            )}
                        </CardContent>
                    </Card>
                </div>

                {/* Results Section */}
                <div className="md:col-span-7 space-y-6">
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
                        valueColor={mode === "calculate-roas" ? (roas > 1 ? "text-emerald-400" : (roas < 1 ? "text-red-400" : "text-white")) : "text-white"}
                        secondaryMetrics={[
                            {
                                label: mode === "calculate-roas" ? "ROAS %" : "Target ROAS",
                                value: mode === "calculate-roas" ? (
                                    <Counter value={roasPercent} formatter={(v) => `${v.toFixed(0)}%`} />
                                ) : (
                                    <Counter value={val(targetROAS)} formatter={(v) => `${v.toFixed(2)}x`} />
                                ),
                                color: currentHealth.color
                            },
                            {
                                label: "Net Profit (Ads)",
                                value: <Counter value={mode === "calculate-roas" ? profit : plannedProfit} formatter={formatCurrency} key={currency} />,
                                color: (mode === "calculate-roas" ? profit : plannedProfit) >= 0 ? 'text-emerald-400' : 'text-red-400'
                            }
                        ]}
                    />

                    {/* Breakdown Cards */}
                    <div className="grid grid-cols-2 gap-4">
                        <ResultCard
                            title="Total Ad Spend"
                            value={<Counter value={spend} formatter={formatCurrency} key={`spend-${currency}`} />}
                            icon={DollarSign}
                        />
                        <ResultCard
                            title={mode === "calculate-roas" ? "Revenue Generated" : "Target ROAS"}
                            value={mode === "calculate-roas" ?
                                <Counter value={revenue} formatter={formatCurrency} key={`rev-${currency}`} /> :
                                <Counter value={val(targetROAS)} formatter={(v) => `${v.toFixed(2)}x`} />
                            }
                            icon={TrendingUp}
                        />
                    </div>
                    <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 flex gap-3 items-start">
                        <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                        <div>
                            <h4 className="text-sm font-semibold text-blue-900 mb-1">Pro Tip</h4>
                            <p className="text-sm text-blue-700 leading-relaxed">
                                {mode === "calculate-roas" ?
                                    "A ROAS of 4.0x (400%) means for every $1 you spend on ads, you get $4 back in revenue. Aim for at least 2.5x - 3.0x to cover product costs and other expenses." :
                                    "To define a target ROAS, consider your profit margins. If your break-even ROAS is 2.0x, aim for a target of 3.0x or higher to ensure profitability."
                                }
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </FadeIn>
    )
}

function ResultCard({ title, value, icon: Icon }: { title: string, value: React.ReactNode, icon: any }) {
    return (
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
            <div>
                <p className="text-xs font-medium text-slate-500 mb-1">{title}</p>
                <p className="text-lg font-bold text-slate-800">{value}</p>
            </div>
            <div className="bg-slate-50 p-2 rounded-lg text-slate-400">
                <Icon className="w-5 h-5" />
            </div>
        </div>
    )
}
