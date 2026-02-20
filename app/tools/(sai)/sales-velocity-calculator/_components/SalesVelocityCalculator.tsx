"use client"

import React, { useState } from "react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { TrendingUp, AlertTriangle } from "lucide-react"
import { CalculatorCardHeader, CalculatorInput, Counter, CurrencyCombobox, FadeIn, ResultFeedbackCard } from "@/app/tools/_shared/components"

export function SalesVelocityCalculator() {
    const [currency, setCurrency] = useState("USD")
    const [unitsSold, setUnitsSold] = useState<number | "">("")
    const [periodDays, setPeriodDays] = useState<number | "">("")
    const [outOfStockDays, setOutOfStockDays] = useState<number | "">("")
    const [price, setPrice] = useState<number | "">("")

    const handleReset = () => {
        setUnitsSold("")
        setPeriodDays("")
        setOutOfStockDays("")
        setPrice("")
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
    const totalSold = val(unitsSold)
    const days = val(periodDays)
    const oosDays = val(outOfStockDays)
    const unitPrice = val(price)

    const activeDays = Math.max(1, days - oosDays)
    const rawVelocity = days > 0 ? totalSold / days : 0
    const trueVelocity = activeDays > 0 ? totalSold / activeDays : 0

    const velocityDiff = trueVelocity - rawVelocity
    const velocityIncreasePercent = rawVelocity > 0 ? (velocityDiff / rawVelocity) * 100 : 0

    const monthlyRunRate = trueVelocity * 30
    const revenueRunRate = monthlyRunRate * unitPrice

    const formatCurrency = (val: number) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: currency,
            maximumFractionDigits: 0
        }).format(val)
    }

    return (
        <FadeIn className="w-full max-w-6xl mx-auto py-8 px-4" duration={0.6}>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

                {/* Inputs Section */}
                <div className="lg:col-span-7 space-y-6">
                    <Card className="border border-slate-200 shadow-sm bg-white">
                        <CalculatorCardHeader
                            description="Enter sales history and stockout details."
                            onReset={handleReset}
                        />
                        <CardContent className="space-y-5 pt-6">
                            <CalculatorInput
                                label="Total Units Sold"
                                value={unitsSold}
                                onChange={setUnitsSold}
                                placeholder="300"
                                tooltip="Total units sold during the selected period."
                            />
                            <CalculatorInput
                                label="Period Length (Days)"
                                value={periodDays}
                                onChange={setPeriodDays}
                                placeholder="30"
                                tooltip="The timeframe you are analyzing (e.g., last 30 days)."
                            />
                            <CalculatorInput
                                label="Days Out of Stock"
                                value={outOfStockDays}
                                onChange={setOutOfStockDays}
                                placeholder="5"
                                tooltip="Number of days the product was unavailable."
                            />
                            <CalculatorInput
                                label={`Selling Price (${symbol}) (Optional)`}
                                value={price}
                                onChange={setPrice}
                                placeholder="25.00"
                                tooltip="Unit price to calculate revenue potential."
                            />
                        </CardContent>
                    </Card>

                    {/* Analysis Card */}
                    <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-4">
                        <div className="flex items-start gap-3">
                            <TrendingUp className="w-5 h-5 text-blue-500 mt-0.5" />
                            <div>
                                <h4 className="text-base font-bold text-slate-800 mb-1">
                                    Forecasting Insight
                                </h4>
                                <p className="text-sm text-slate-600 leading-relaxed">
                                    {oosDays > 0 ? (
                                        <>
                                            You were out of stock for <strong>{oosDays} days</strong>.
                                            If you had been in stock, you likely would have sold <strong>{((trueVelocity * days) - totalSold).toFixed(0)} more units</strong>.
                                            Use the <strong>{trueVelocity.toFixed(1)}/day</strong> rate for future reordering.
                                        </>
                                    ) : (
                                        <>
                                            No stockouts recorded. Your sales velocity is steady at <strong>{rawVelocity.toFixed(1)} units/day</strong>.
                                        </>
                                    )}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Results Section */}
                <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-8">
                    <ResultFeedbackCard
                        title="True Sales Velocity"
                        titleLabel="Adjusted Rate"
                        labelClassName="bg-blue-500/10 text-blue-500"
                        mainValue={
                            <div className="flex items-baseline gap-1">
                                <Counter value={trueVelocity} formatter={(v) => v.toFixed(1)} />
                                <span className="text-2xl font-normal opacity-80">/ Day</span>
                            </div>
                        }
                        valueColor="text-white"
                        mainMetricLabel="Impact of Stockouts"
                        mainMetricValue={<><Counter value={velocityIncreasePercent} formatter={(v) => `+${v.toFixed(1)}%`} /> Faster</>}
                        mainMetricColor={velocityIncreasePercent > 0 ? "text-blue-400" : "text-slate-400"}
                        secondaryMetrics={[
                            {
                                label: "Raw Daily Average",
                                value: <><Counter value={rawVelocity} formatter={(v) => v.toFixed(1)} /> / Day</>,
                                color: "text-slate-400"
                            },
                            {
                                label: "Monthly Perimeter",
                                value: <><Counter value={monthlyRunRate} formatter={(v) => v.toFixed(0)} /> Units</>,
                                color: "text-blue-400"
                            }
                        ]}
                    />

                    {/* Breakdown Card */}
                    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden border-l-4 border-l-blue-500">
                        <div className="px-5 py-3.5 border-b border-slate-100">
                            <p className="text-xs font-bold text-slate-600 uppercase tracking-wider">Velocity Breakdown</p>
                        </div>
                        <div className="divide-y divide-slate-100">
                            <div className="flex justify-between items-center px-5 py-3.5">
                                <span className="text-sm text-slate-600">Raw Velocity</span>
                                <span className="text-sm font-semibold text-slate-800">{rawVelocity.toFixed(1)} / day</span>
                            </div>
                            <div className="flex justify-between items-center px-5 py-3.5">
                                <span className="text-sm text-slate-600">Active Selling Days</span>
                                <span className="text-sm font-semibold text-slate-800">{activeDays} days</span>
                            </div>
                            <div className="flex justify-between items-center px-5 py-3.5 bg-blue-50/20">
                                <span className="text-sm font-bold text-slate-900">True Velocity</span>
                                <span className="text-base font-bold text-blue-600">{trueVelocity.toFixed(1)} / day</span>
                            </div>
                        </div>
                    </div>

                    {/* Revenue Card */}
                    {unitPrice > 0 && (
                        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-2">
                            <h4 className="text-sm font-medium text-slate-500 uppercase tracking-wider">Projected Monthly Revenue</h4>
                            <div className="text-3xl font-bold text-slate-800 flex items-baseline gap-2">
                                <Counter value={revenueRunRate} formatter={formatCurrency} key={currency} />
                                <span className="text-sm font-normal text-slate-400">/ mo</span>
                            </div>
                            <p className="text-xs text-slate-400">Based on adjusted velocity</p>
                        </div>
                    )}
                </div>
            </div>
        </FadeIn>
    )
}
