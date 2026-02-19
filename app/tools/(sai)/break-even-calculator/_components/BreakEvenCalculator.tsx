"use client"

import React, { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { HelpCircle, RotateCcw, TrendingUp, DollarSign, Percent, BarChart3, Scale, Target } from "lucide-react"
import { CurrencyCombobox } from "@/app/tools/_shared/components"
import { FadeIn, Counter, CalculatorInput, ResultFeedbackCard } from "@/app/tools/_shared/components"
import { cn } from "@/lib/utils"

export function BreakEvenCalculator() {
    const [currency, setCurrency] = useState("USD")
    const [fixedCosts, setFixedCosts] = useState<number | "">("")
    const [pricePerUnit, setPricePerUnit] = useState<number | "">("")
    const [variableCostPerUnit, setVariableCostPerUnit] = useState<number | "">("")

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
        setFixedCosts("")
        setPricePerUnit("")
        setVariableCostPerUnit("")
    }

    const scrollToGuide = () => {
        const element = document.getElementById('break-even-guide');
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    // Calculations
    const fixed = val(fixedCosts)
    const price = val(pricePerUnit)
    const variable = val(variableCostPerUnit)

    const contributionMargin = price - variable
    const breakEvenUnits = contributionMargin > 0 ? fixed / contributionMargin : 0
    const breakEvenRevenue = breakEvenUnits * price

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
                                        className="text-slate-400 hover:text-blue-600 hover:bg-transparent h-6 w-6 rounded-full"
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
                                <CardDescription>Enter your costs and pricing details.</CardDescription>
                            </div>
                            <div className="w-[140px]">
                                <CurrencyCombobox value={currency} onValueChange={setCurrency} />
                            </div>
                        </CardHeader>
                        <CardContent className="space-y-5 pt-6">
                            <CalculatorInput
                                label={`Total Fixed Costs (${symbol})`}
                                value={fixedCosts}
                                onChange={setFixedCosts}
                                placeholder="1000.00"
                                max={10000000}
                                tooltip="Costs that don't change regardless of how much you sell (e.g., rent, salaries, software subscriptions)."
                            />
                            <CalculatorInput
                                label={`Price Per Unit (${symbol})`}
                                value={pricePerUnit}
                                onChange={setPricePerUnit}
                                placeholder="50.00"
                                max={1000000}
                                tooltip="The selling price of a single unit of your product."
                            />
                            <CalculatorInput
                                label={`Variable Cost Per Unit (${symbol})`}
                                value={variableCostPerUnit}
                                onChange={setVariableCostPerUnit}
                                placeholder="30.00"
                                max={1000000}
                                tooltip="The cost to produce or acquire one single unit (e.g., COGS, shipping, packaging)."
                            />
                        </CardContent>
                    </Card>
                </div>

                {/* Results Section */}
                <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-8">
                    {/* Main Result Card */}
                    <ResultFeedbackCard
                        title="Break-Even Units"
                        mainValue={
                            <Counter value={breakEvenUnits} formatter={(v) => `${Math.ceil(v).toLocaleString()} units`} />
                        }
                        valueColor="text-white"
                        secondaryMetrics={[
                            {
                                label: "Break-Even Revenue",
                                value: <Counter value={breakEvenRevenue} formatter={formatCurrency} key={`rev-${currency}`} />,
                                color: "text-emerald-400"
                            },
                        ]}
                    />

                    {/* Indicator Badge */}
                    {breakEvenUnits > 0 && (
                        <div className="px-4 py-3 rounded-xl border bg-blue-50 border-blue-200 text-blue-700 text-center text-sm font-semibold">
                            🎯 Break-Even Target Calculated
                        </div>
                    )}

                    {/* Breakdown Card */}
                    {breakEvenUnits > 0 ? (
                        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden border-l-4 border-l-emerald-500">
                            <div className="px-5 py-3.5 border-b border-slate-100">
                                <p className="text-xs font-bold text-slate-600 uppercase tracking-wider">Unit Economics</p>
                            </div>
                            <div className="divide-y divide-slate-100">
                                <div className="flex justify-between items-center px-5 py-3.5">
                                    <span className="text-sm text-slate-600">Price per Unit</span>
                                    <span className="text-sm font-semibold text-slate-800">{formatCurrency(price)}</span>
                                </div>
                                <div className="flex justify-between items-center px-5 py-3.5">
                                    <span className="text-sm text-slate-600">Variable Cost</span>
                                    <span className="text-sm font-semibold text-red-500">-{formatCurrency(variable)}</span>
                                </div>
                                <div className="flex justify-between items-center px-5 py-3.5 bg-slate-50">
                                    <span className="text-sm font-semibold text-slate-900">Contribution Margin</span>
                                    <span className="text-sm font-bold text-emerald-600">{formatCurrency(contributionMargin)}</span>
                                </div>
                                <div className="flex justify-between items-center px-5 py-4">
                                    <span className="text-sm font-bold text-emerald-600">Fixed Costs</span>
                                    <span className="text-base font-bold text-emerald-600">{formatCurrency(fixed)}</span>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 text-center">
                            <p className="text-sm text-slate-400">Enter costs to see unit economics.</p>
                        </div>
                    )}
                </div>
            </div>
        </FadeIn>
    )
}


