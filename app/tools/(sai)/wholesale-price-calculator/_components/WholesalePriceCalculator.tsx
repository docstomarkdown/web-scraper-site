"use client"

import React, { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { DollarSign, Percent, TrendingUp, Tag } from "lucide-react"
import { CalculatorCardHeader, CalculatorInput, Counter, FadeIn, ResultFeedbackCard } from "@/app/tools/_shared/components"

export function WholesalePriceCalculator() {
    const [currency, setCurrency] = useState("USD")
    const [costOfGoods, setCostOfGoods] = useState<number | "">("")
    const [desiredMargin, setDesiredMargin] = useState<number | "">("")
    const [taxRate, setTaxRate] = useState<number | "">("")

    const handleReset = () => {
        setCostOfGoods("")
        setDesiredMargin("")
        setTaxRate("")
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
                        <CalculatorCardHeader
                            description="Enter product costs and target margin."
                            onReset={handleReset}
                            guideId="wholesale-guide"
                            currency={currency}
                            onCurrencyChange={setCurrency}
                        />
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
                            effectiveCost > 0 ?
                                <Counter value={wholesalePrice} formatter={formatCurrency} key={currency} /> :
                                "—"
                        }
                        valueColor="text-white"
                        secondaryMetrics={[]}
                    />

                    {/* Breakdown Card */}
                    {effectiveCost > 0 ? (
                        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden border-l-4 border-l-blue-500">
                            <div className="px-5 py-3.5 border-b border-slate-100">
                                <p className="text-xs font-bold text-slate-600 uppercase tracking-wider">Price Breakdown</p>
                            </div>
                            <div className="divide-y divide-slate-100">
                                <div className="flex justify-between items-center px-5 py-3.5">
                                    <span className="text-sm text-slate-600">Effective Cost</span>
                                    <span className="text-sm font-semibold text-slate-800">{formatCurrency(effectiveCost)}</span>
                                </div>
                                <div className="flex justify-between items-center px-5 py-3.5">
                                    <span className="text-sm text-slate-600">Target Margin</span>
                                    <span className="text-sm font-semibold text-slate-800">{Number(margin).toFixed(2)}%</span>
                                </div>
                                <div className="flex justify-between items-center px-5 py-3.5">
                                    <span className="text-sm text-slate-600">Markup Required</span>
                                    <span className="text-sm font-semibold text-slate-800">{markup.toFixed(2)}%</span>
                                </div>
                                <div className="flex justify-between items-center px-5 py-4">
                                    <span className="text-sm font-bold text-blue-600">Profit per Unit</span>
                                    <span className="text-base font-bold text-blue-600">{formatCurrency(profitPerUnit)}</span>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 text-center">
                            <p className="text-sm text-slate-400">Enter cost and margin to see breakdown.</p>
                        </div>
                    )}
                </div>
            </div>
        </FadeIn>
    )
}
