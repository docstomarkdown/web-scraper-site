"use client"

import React, { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { HelpCircle, DollarSign, Percent, TrendingUp, Tag } from "lucide-react"
import { CurrencyCombobox } from "@/app/tools/_shared/components"
import { FadeIn, Counter, CalculatorInput, ResultFeedbackCard } from "@/app/tools/_shared/components"

export function WholesalePriceCalculator() {
    const [currency, setCurrency] = useState("USD")
    const [costOfGoods, setCostOfGoods] = useState<number | "">("")
    const [desiredMargin, setDesiredMargin] = useState<number | "">("")
    const [taxRate, setTaxRate] = useState<number | "">("")

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
        const element = document.getElementById('wholesale-guide');
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    // Calculations
    const cost = val(costOfGoods)
    const margin = val(desiredMargin)
    const tax = val(taxRate)

    const effectiveCost = cost * (1 + tax / 100)

    // Avoid division by zero or negative/100 margin causing infinity
    // Margin should be < 100
    const wholesalePrice = (margin < 100) ? effectiveCost / (1 - margin / 100) : 0
    const profitPerUnit = wholesalePrice - effectiveCost
    const markup = effectiveCost > 0 ? (profitPerUnit / effectiveCost) * 100 : 0

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
                                <CardDescription>Enter product costs and target margin.</CardDescription>
                            </div>
                            <div className="w-[140px]">
                                <CurrencyCombobox value={currency} onValueChange={setCurrency} />
                            </div>
                        </CardHeader>
                        <CardContent className="space-y-5 pt-6">
                            <CalculatorInput
                                label={`Cost of Goods (${symbol})`}
                                value={costOfGoods}
                                onChange={setCostOfGoods}
                                placeholder="10.00"
                                max={1000000}
                                tooltip="Total cost to produce or acquire one unit of the product."
                            />
                            <CalculatorInput
                                label="Desired Profit Margin (%)"
                                value={desiredMargin}
                                onChange={setDesiredMargin}
                                placeholder="40"
                                max={99.9}
                                suffix="%"
                                tooltip="The percentage of the final selling price that is profit. Formula: (Price - Cost) / Price."
                            />
                            <CalculatorInput
                                label="Tax/Duty Rate (Optional %)"
                                value={taxRate}
                                onChange={setTaxRate}
                                placeholder="0"
                                max={100}
                                suffix="%"
                                tooltip="Additional percentage costs like import duty or VAT paid on the cost of goods."
                            />
                        </CardContent>
                    </Card>
                </div>

                {/* Results Section */}
                <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-8">
                    {/* Main Result Card */}
                    <ResultFeedbackCard
                        title="Recommended Wholesale Price"
                        mainValue={
                            <Counter value={wholesalePrice} formatter={formatCurrency} key={currency} />
                        }
                        valueColor="text-blue-500"
                        secondaryMetrics={[
                            {
                                label: "Profit per Unit",
                                value: <Counter value={profitPerUnit} formatter={formatCurrency} key={`profit-${currency}`} />,
                                color: profitPerUnit >= 0 ? 'text-emerald-500' : 'text-red-500'
                            },
                            {
                                label: "Markup",
                                value: <Counter value={markup} formatter={(v) => `${v.toFixed(2)}%`} />,
                                color: "text-slate-600"
                            }
                        ]}
                    />

                    {/* Breakdown Cards */}
                    <div className="grid grid-cols-2 gap-4">
                        <ResultCard
                            title="Effective Cost"
                            value={<Counter value={effectiveCost} formatter={formatCurrency} key={`cost-${currency}`} />}
                            icon={Tag}
                            tooltip="Original cost plus any taxes/duties."
                        />
                        <ResultCard
                            title="Gross Margin"
                            value={<Counter value={margin} formatter={(v) => `${v.toFixed(2)}%`} />}
                            icon={Percent}
                        />
                    </div>
                </div>
            </div>
        </FadeIn>
    )
}

function ResultCard({ title, value, icon: Icon, tooltip }: { title: string, value: React.ReactNode, icon: any, tooltip?: string }) {
    return (
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between group relative">
            <div>
                <div className="flex items-center gap-1.5 mb-1">
                    <p className="text-xs font-medium text-slate-500">{title}</p>
                    {tooltip && (
                        <TooltipProvider delayDuration={100}>
                            <Tooltip>
                                <TooltipTrigger>
                                    <HelpCircle className="w-3 h-3 text-slate-300 hover:text-slate-500" />
                                </TooltipTrigger>
                                <TooltipContent className="bg-slate-900 text-white text-xs border-slate-800">
                                    {tooltip}
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    )}
                </div>
                <p className="text-lg font-bold text-slate-800">{value}</p>
            </div>
            <div className="bg-slate-50 p-2 rounded-lg text-slate-400 group-hover:bg-slate-100 group-hover:text-blue-500 transition-colors">
                <Icon className="w-5 h-5" />
            </div>
        </div>
    )
}
