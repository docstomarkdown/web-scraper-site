"use client"

import React, { useState } from "react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { TrendingUp, DollarSign, Percent, AlertTriangle, CheckCircle2 } from "lucide-react"
import { CalculatorCardHeader, CalculatorInput, Counter, CurrencyCombobox, FadeIn, ResultFeedbackCard } from "@/app/tools/_shared/components"

export function FreeShippingCalculator() {
    const [currency, setCurrency] = useState("USD")
    const [aov, setAov] = useState<number | "">("")
    const [marginPercent, setMarginPercent] = useState<number | "">("")
    const [shippingCost, setShippingCost] = useState<number | "">("")
    const [proposedThreshold, setProposedThreshold] = useState<number | "">("")

    const handleReset = () => {
        setAov("")
        setMarginPercent("")
        setShippingCost("")
        setProposedThreshold("")
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
    const currentAOV = val(aov)
    const margin = val(marginPercent) / 100
    const shipCost = val(shippingCost)
    const threshold = val(proposedThreshold)

    // 1. Current Profit per Order (assuming shipping is paid by customer or handled differently, 
    // but usually "Free Shipping" means we absorb the cost. 
    // Let's assume currently shipping is paid by customer (Revenue = AOV), so Profit = AOV * Margin.
    // If we offer Free Shipping, we absorb 'shipCost'.

    // To maintain the SAME total profit, we need more sales volume or higher AOV.
    // Breakeven AOV with Free Shipping = AOV / (1 - (ShippingCost / (AOV * Margin))) ... this is getting complex.

    // Simpler approach for the user:
    // "How much do sales need to increase to cover the free shipping cost?"
    // Required Sales Increase % = (Shipping Cost / (AOV * Margin - Shipping Cost)) * 100

    // Let's protect against divide by zero or negative margin
    const grossProfitPerOrder = currentAOV * margin
    const netProfitWithFreeShipping = grossProfitPerOrder - shipCost

    let salesIncreaseNeeded = 0
    let isViable = true

    if (currentAOV > 0 && margin > 0) {
        if (netProfitWithFreeShipping <= 0) {
            isViable = false
            salesIncreaseNeeded = 0 // Technically infinite or impossible to break even on this order alone
        } else {
            // Formula: Sales Increase = (Cost of Free Shipping) / (Gross Profit - Cost of Free Shipping)
            // Wait, standard formula: Required Lift = (Cost / (Margin - Cost)) doesn't look right.

            // Let's simple Break Even Analysis:
            // Current Profit = Sales * (AOV * Margin) [Assuming Shipping is paid by customer in "Current" state, so it's pass-through]
            // New Profit = (Sales * (1 + Lift)) * (AOV_New * Margin - Shipping)

            // If we assume AOV stays same for simplicity (or acts as a floor):
            // Old Profit = AOV * Margin
            // New Profit = AOV * Margin - Shipping
            // We need Volume Lift (L) such that: (1+L) * (Profit - Shipping) = Profit
            // (1+L) = Profit / (Profit - Shipping)
            // L = (Profit / (Profit - Shipping)) - 1

            if (grossProfitPerOrder > shipCost) {
                salesIncreaseNeeded = ((grossProfitPerOrder / (grossProfitPerOrder - shipCost)) - 1) * 100
            } else {
                isViable = false // Losing money on every order
            }
        }
    }

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

                            description="Enter your current metrics."

                            onReset={handleReset}

                            currency={currency}

                            onCurrencyChange={setCurrency}

                        />
                        <CardContent className="space-y-5 pt-6">
                            <CalculatorInput
                                label={`Average Order Value (AOV) (${symbol})`}
                                value={aov}
                                onChange={setAov}
                                placeholder="50.00"
                                tooltip="The average amount a customer currently spends per order."
                            />
                            <CalculatorInput
                                label="Gross Margin (%)"
                                value={marginPercent}
                                onChange={setMarginPercent}
                                placeholder="40"
                                max={100}
                                tooltip="Your average profit margin percentage before shipping costs."
                            />
                            <CalculatorInput
                                label={`Average Shipping Cost (${symbol})`}
                                value={shippingCost}
                                onChange={setShippingCost}
                                placeholder="8.00"
                                tooltip="The cost you incur to ship an average order."
                            />
                            <CalculatorInput
                                label={`Proposed Free Shipping Threshold (${symbol})`}
                                value={proposedThreshold}
                                onChange={setProposedThreshold}
                                placeholder="75.00"
                                tooltip="The minimum order value customers must reach to get free shipping."
                            />
                        </CardContent>
                    </Card>
                </div>

                {/* Results Section */}
                <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-8">
                    <ResultFeedbackCard
                        title="Required Sales Increase"
                        titleLabel={isViable ? "Feasible" : "High Risk"}
                        labelClassName={isViable ? "bg-emerald-50 border-emerald-200 text-emerald-700" : "bg-red-50 border-red-200 text-red-700"}
                        mainValue={
                            isViable ?
                                <Counter value={salesIncreaseNeeded} formatter={(v) => `+${v.toFixed(1)}%`} /> :
                                <span>Unprofitable</span>
                        }
                        valueColor={isViable ? (salesIncreaseNeeded < 20 ? "text-emerald-400" : "text-yellow-400") : "text-red-400"}
                        mainMetricLabel="Impact"
                        mainMetricValue={isViable ? "To Break Even" : "Loss per Order"}
                        secondaryMetrics={[
                            {
                                label: "New Net Profit",
                                value: <Counter value={isViable ? netProfitWithFreeShipping : (grossProfitPerOrder - shipCost)} formatter={formatCurrency} key={currency} />,
                                color: isViable ? "text-blue-300" : "text-red-300"
                            },
                            {
                                label: "Gross Profit",
                                value: <Counter value={grossProfitPerOrder} formatter={formatCurrency} key={currency} />,
                                color: "text-slate-400"
                            }
                        ]}
                    />

                    {/* Breakdown Card */}
                    <div className={`bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden border-l-4 ${isViable ? 'border-l-emerald-500' : 'border-l-red-500'}`}>
                        <div className="px-5 py-3.5 border-b border-slate-100">
                            <p className="text-xs font-bold text-slate-600 uppercase tracking-wider">Price Breakdown</p>
                        </div>
                        <div className="divide-y divide-slate-100">
                            <div className="flex justify-between items-center px-5 py-3.5">
                                <span className="text-sm text-slate-600">Gross Profit per Order</span>
                                <span className="text-sm font-semibold text-slate-800">
                                    {formatCurrency(grossProfitPerOrder)}
                                </span>
                            </div>
                            <div className="flex justify-between items-center px-5 py-3.5">
                                <span className="text-sm text-slate-600">Shipping Cost</span>
                                <span className="text-sm font-semibold text-red-500">
                                    - {formatCurrency(shipCost)}
                                </span>
                            </div>
                            <div className="flex justify-between items-center px-5 py-3.5">
                                <span className="text-sm text-slate-600">Net Profit After Shipping</span>
                                <span className="text-sm font-semibold text-slate-800">
                                    {formatCurrency(netProfitWithFreeShipping)}
                                </span>
                            </div>
                            <div className="flex justify-between items-center px-5 py-4">
                                <span className={`text-sm font-bold ${isViable ? 'text-emerald-600' : 'text-red-600'}`}>
                                    {isViable ? 'Sales Lift Needed' : 'Not Viable'}
                                </span>
                                <span className={`text-base font-bold ${isViable ? 'text-emerald-600' : 'text-red-600'}`}>
                                    {isViable ? `+${salesIncreaseNeeded.toFixed(1)}%` : formatCurrency(Math.abs(netProfitWithFreeShipping)) + ' loss'}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </FadeIn>
    )
}
