"use client"

import React, { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { HelpCircle, TrendingUp, DollarSign, Percent, BarChart3 } from "lucide-react"
import { CurrencyCombobox } from "@/components/ui/currency-combobox"
import { FadeIn, Counter, CalculatorInput, ResultFeedbackCard } from "@/app/tools/_shared/components"

export function ROICalculator() {
    const [currency, setCurrency] = useState("USD")
    const [investmentCost, setInvestmentCost] = useState<number | "">("")
    const [revenueEarned, setRevenueEarned] = useState<number | "">("")
    const [timePeriod, setTimePeriod] = useState<number | "">("")

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
        const element = document.getElementById('roi-guide');
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    // Calculations
    const investment = val(investmentCost)
    const revenue = val(revenueEarned)
    const months = val(timePeriod)

    const netProfit = revenue - investment
    const roiPercent = investment > 0 ? (netProfit / investment) * 100 : 0
    const profitRatio = investment > 0 ? revenue / investment : 0
    const monthlyROI = months > 0 && investment > 0 ? roiPercent / months : 0

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
                                <CardDescription>Enter investment and revenue details.</CardDescription>
                            </div>
                            <div className="w-[140px]">
                                <CurrencyCombobox value={currency} onValueChange={setCurrency} />
                            </div>
                        </CardHeader>
                        <CardContent className="space-y-5 pt-6">
                            <CalculatorInput
                                label={`Investment Cost (${symbol})`}
                                value={investmentCost}
                                onChange={setInvestmentCost}
                                placeholder="500.00"
                                max={1000000}
                                tooltip="Total amount invested including product cost, shipping, advertising, and any other expenses."
                            />
                            <CalculatorInput
                                label={`Revenue Earned (${symbol})`}
                                value={revenueEarned}
                                onChange={setRevenueEarned}
                                placeholder="1500.00"
                                max={1000000}
                                tooltip="Total revenue generated from selling the product."
                            />
                            <CalculatorInput
                                label="Time Period (Months)"
                                value={timePeriod}
                                onChange={setTimePeriod}
                                placeholder="3"
                                max={120}
                                suffix="mo"
                                tooltip="Optional. Number of months over which the ROI was realized. Used to calculate monthly ROI."
                            />
                        </CardContent>
                    </Card>
                </div>

                {/* Results Section */}
                <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-8">
                    {/* Main ROI Card */}
                    <ResultFeedbackCard
                        title="Return on Investment"
                        mainValue={
                            <Counter value={roiPercent} formatter={(v) => `${v.toFixed(2)}%`} />
                        }
                        valueColor={netProfit > 0 ? "text-emerald-400" : (netProfit < 0 ? "text-red-400" : "text-white")}
                        secondaryMetrics={[
                            {
                                label: "Net Profit",
                                value: <Counter value={netProfit} formatter={formatCurrency} key={currency} />,
                                color: netProfit >= 0 ? 'text-emerald-400' : 'text-red-400'
                            },
                            {
                                label: "Profit Ratio",
                                value: <Counter value={profitRatio} formatter={(v) => `${v.toFixed(2)}x`} />,
                                color: "text-blue-400"
                            }
                        ]}
                    />

                    {/* Breakdown Cards */}
                    <div className="grid grid-cols-2 gap-4">
                        <ResultCard
                            title="Total Investment"
                            value={<Counter value={investment} formatter={formatCurrency} key={`inv-${currency}`} />}
                            icon={DollarSign}
                        />
                        <ResultCard
                            title={months > 0 ? "Monthly ROI" : "Total Revenue"}
                            value={
                                months > 0
                                    ? <Counter value={monthlyROI} formatter={(v) => `${v.toFixed(2)}%`} />
                                    : <Counter value={revenue} formatter={formatCurrency} key={`rev-${currency}`} />
                            }
                            icon={months > 0 ? BarChart3 : TrendingUp}
                        />
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
