"use client"

import React, { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { HelpCircle, Info, TrendingUp, DollarSign, Percent } from "lucide-react"
import { CurrencyCombobox } from "@/components/ui/currency-combobox"
import { FadeIn, Counter, CalculatorInput, ResultFeedbackCard } from "@/app/tools/_shared/components"

export function MarginCalculator() {
    const [currency, setCurrency] = useState("USD")
    const [costPrice, setCostPrice] = useState<number | "">("")
    const [salesPrice, setSalesPrice] = useState<number | "">("")
    const [quantity, setQuantity] = useState<number | "">("")

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
        const element = document.getElementById('margin-guide');
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    // Calculations
    const cost = val(costPrice)
    const price = val(salesPrice)
    const qty = val(quantity) === 0 ? 1 : val(quantity) // Default to 1 for per-unit display if empty

    const profitPerUnit = price - cost
    const totalProfit = profitPerUnit * qty
    const totalRevenue = price * qty
    const totalCost = cost * qty

    const marginPercent = price > 0 ? (profitPerUnit / price) * 100 : 0
    const markupPercent = cost > 0 ? (profitPerUnit / cost) * 100 : 0

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
                                <CardDescription>Enter cost and selling price.</CardDescription>
                            </div>
                            <div className="w-[140px]">
                                <CurrencyCombobox value={currency} onValueChange={setCurrency} />
                            </div>
                        </CardHeader>
                        <CardContent className="space-y-5 pt-6">
                            <CalculatorInput
                                label={`Cost Price (${symbol})`}
                                value={costPrice}
                                onChange={setCostPrice}
                                placeholder="50.00"
                                max={100000}
                                tooltip="The total cost to produce or acquire one unit of the product."
                            />
                            <CalculatorInput
                                label={`Selling Price (${symbol})`}
                                value={salesPrice}
                                onChange={setSalesPrice}
                                placeholder="100.00"
                                max={100000}
                                tooltip="The price at which you sell one unit of the product."
                            />
                            <CalculatorInput
                                label="Quantity (Optional)"
                                value={quantity}
                                onChange={setQuantity}
                                placeholder="1"
                                max={10000}
                                tooltip="Number of units sold. Defaults to 1 if left empty."
                            />
                        </CardContent>
                    </Card>
                </div>

                {/* Results Section */}
                <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-8">
                    {/* Main Profit Card */}
                    <ResultFeedbackCard
                        title={quantity ? 'Total Profit' : 'Profit per Unit'}
                        mainValue={
                            <Counter value={totalProfit} formatter={formatCurrency} key={currency} />
                        }
                        valueColor={totalProfit > 0 ? "text-emerald-400" : (totalProfit < 0 ? "text-red-400" : "text-white")}
                        mainMetricColor={totalProfit >= 0 ? 'text-white' : 'text-red-200'}
                        secondaryMetrics={[
                            {
                                label: "Gross Margin",
                                value: <Counter value={marginPercent} formatter={(v) => `${v.toFixed(2)}%`} />,
                                color: totalProfit >= 0 ? 'text-emerald-400' : 'text-red-400'
                            },
                            {
                                label: "Markup",
                                value: <Counter value={markupPercent} formatter={(v) => `${v.toFixed(2)}%`} />,
                                color: "text-blue-400"
                            }
                        ]}
                    />

                    {/* Simple Breakdown */}
                    <div className="grid grid-cols-2 gap-4">
                        <ResultCard title="Total Revenue" value={<Counter value={totalRevenue} formatter={formatCurrency} key={currency} />} icon={DollarSign} />
                        <ResultCard title="Total Cost" value={<Counter value={totalCost} formatter={formatCurrency} key={currency} />} icon={TrendingUp} />
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
