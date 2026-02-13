"use client"

import React, { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { HelpCircle, TrendingUp, DollarSign, Percent, BarChart3, Scale } from "lucide-react"
import { CurrencyCombobox } from "@/components/ui/currency-combobox"
import { FadeIn, Counter, CalculatorInput, ResultFeedbackCard } from "@/app/tools/_shared/components"

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

                    {/* Breakdown Cards */}
                    <div className="grid grid-cols-2 gap-4">
                        <ResultCard
                            title="Contribution Margin"
                            value={<Counter value={contributionMargin} formatter={formatCurrency} key={`cm-${currency}`} />}
                            icon={Scale}
                        />
                        <ResultCard
                            title="Total Fixed Costs"
                            value={<Counter value={fixed} formatter={formatCurrency} key={`fix-${currency}`} />}
                            icon={DollarSign}
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
