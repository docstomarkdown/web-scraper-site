"use client"

import React, { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { HelpCircle, TrendingUp, DollarSign, Percent, AlertTriangle, CheckCircle2 } from "lucide-react"
import { CurrencyCombobox } from "@/components/ui/currency-combobox"
import { FadeIn, Counter, CalculatorInput, ResultFeedbackCard } from "@/app/tools/_shared/components"

export function FreeShippingCalculator() {
    const [currency, setCurrency] = useState("USD")
    const [aov, setAov] = useState<number | "">("")
    const [marginPercent, setMarginPercent] = useState<number | "">("")
    const [shippingCost, setShippingCost] = useState<number | "">("")
    const [proposedThreshold, setProposedThreshold] = useState<number | "">("")

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
        const element = document.getElementById('how-to-use');
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

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
                                <CardDescription>Enter your current metrics.</CardDescription>
                            </div>
                            <div className="w-[140px]">
                                <CurrencyCombobox value={currency} onValueChange={setCurrency} />
                            </div>
                        </CardHeader>
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
                        labelClassName={isViable ? "bg-emerald-500/20 text-emerald-300" : "bg-red-500/20 text-red-300"}
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

                    {/* Analysis Card */}
                    <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-4">
                        <div className="flex items-start gap-3">
                            {isViable ?
                                <CheckCircle2 className="w-5 h-5 text-emerald-500 mt-0.5" /> :
                                <AlertTriangle className="w-5 h-5 text-red-500 mt-0.5" />
                            }
                            <div>
                                <h4 className="font-semibold text-slate-800 mb-1">
                                    {isViable ? "Viability Analysis" : "Profit Warning"}
                                </h4>
                                <p className="text-sm text-slate-600 leading-relaxed">
                                    {isViable ? (
                                        <>
                                            Offering free shipping costs you <strong>{formatCurrency(shipCost)}</strong> per order.
                                            To maintain your current total profit, you need to increase sales volume by <strong>{salesIncreaseNeeded.toFixed(1)}%</strong>
                                            OR increase your AOV to compensate.
                                        </>
                                    ) : (
                                        <>
                                            Your shipping cost ({formatCurrency(shipCost)}) is higher than your gross profit ({formatCurrency(grossProfitPerOrder)}).
                                            Offering free shipping at this AOV will result in a loss of <strong>{formatCurrency(Math.abs(netProfitWithFreeShipping))}</strong> per order.
                                        </>
                                    )}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </FadeIn>
    )
}
