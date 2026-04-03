"use client"
import React, { useState } from "react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { TrendingUp, AlertTriangle } from "lucide-react"
import { CalculatorCardHeader, CalculatorInput, Counter, FadeIn } from "@/app/tools/_shared/components"
import { ResultSummaryCard } from "@/app/tools/_shared/components/ResultSummaryCard"
import { SalesVelocityBreakdown } from "./SalesVelocityBreakdown"

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
                <div className="lg:col-span-7 space-y-3 lg:sticky lg:top-8">
                    <Card className="border border-slate-200 shadow-sm bg-white overflow-hidden">
                        <CalculatorCardHeader
                            title="Sales History"
                            description="Enter sales history and stockout details."
                            onReset={handleReset}
                        />
                        <CardContent className="space-y-3 pt-6">
                            <CalculatorInput
                                label="Total Units Sold"
                                value={unitsSold}
                                onChange={setUnitsSold}
                                placeholder="300"
                                tooltip="Units sold during selected period."
                            />
                            <CalculatorInput
                                label="Period Length (Days)"
                                value={periodDays}
                                onChange={setPeriodDays}
                                placeholder="30"
                                tooltip="Timeframe you rely on (e.g., last 30 days)."
                            />
                            <CalculatorInput
                                label="Days Out of Stock"
                                value={outOfStockDays}
                                onChange={setOutOfStockDays}
                                placeholder="5"
                                tooltip="Days the product lacked stock."
                            />
                            <CalculatorInput
                                label={`Selling Price`}
                                isOptional
                                value={price}
                                onChange={setPrice}
                                placeholder="25.00"
                                tooltip="Unit price for revenue calculation."
                            />
                        </CardContent>
                    </Card>
                </div>

                {/* Results Section */}
                <div className="lg:col-span-5 space-y-3 lg:sticky lg:top-8">
                    <ResultSummaryCard
                        primaryResult={{
                            value: trueVelocity.toFixed(1),
                            unit: "/ Day",
                            label: "True Sales Velocity",
                            key: "trueVelocity",
                        }}
                        secondaryResults={[
                            {
                                key: "rawVelocity",
                                label: "Raw Daily Average",
                                value: rawVelocity.toFixed(1),
                                unit: "/ Day",
                                tooltip: "Unadjusted sales per day over the period."
                            },
                            {
                                key: "monthlyRunRate",
                                label: "Monthly Run Rate",
                                value: monthlyRunRate.toFixed(0),
                                unit: "Units",
                                tooltip: "Projected monthly unit sales if perfectly in stock."
                            }
                        ]}
                        isCalculated={days > 0 || totalSold > 0}
                        emptyMessage="True Sales Velocity"
                        validationBadgeText={{ valid: "Calculated", invalid: "Pending" }}
                    >
                        {/* Information inside the card */}
                        <div className="flex flex-col gap-3 mt-2 mx-5 mb-5">
                            {/* Analysis Card */}
                            <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm space-y-3">
                                <div className="flex items-start gap-3">
                                    <TrendingUp className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
                                    <div>
                                        <h4 className="text-sm font-bold text-slate-800 mb-1">
                                            Forecasting Insight
                                        </h4>
                                        <p className="text-xs text-slate-600 leading-relaxed">
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
                            
                            {/* Revenue Card */}
                            {unitPrice > 0 && (
                                <div className="bg-blue-50/50 p-4 rounded-xl border border-blue-100 shadow-sm space-y-1">
                                    <h4 className="text-[11px] font-bold text-blue-500 uppercase tracking-wider">Projected Monthly Revenue</h4>
                                    <div className="text-2xl font-bold text-slate-800 flex items-baseline gap-1.5">
                                        <Counter value={revenueRunRate} formatter={formatCurrency} key={currency} />
                                        <span className="text-xs font-normal text-slate-400">/ mo</span>
                                    </div>
                                </div>
                            )}
                        </div>
                    </ResultSummaryCard>

                    {/* Breakdown Chart */}
                    <FadeIn delay={0.1}>
                        <SalesVelocityBreakdown
                            rawVelocity={rawVelocity}
                            trueVelocity={trueVelocity}
                        />
                    </FadeIn>
                </div>
            </div>
        </FadeIn>
    )
}