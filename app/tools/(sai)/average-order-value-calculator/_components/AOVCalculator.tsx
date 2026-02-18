"use client"

import React, { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { HelpCircle, DollarSign, ShoppingBag, TrendingUp, Search } from "lucide-react"
import { CurrencyCombobox } from "@/app/tools/_shared/components"
import { FadeIn, Counter, CalculatorInput, ResultFeedbackCard } from "@/app/tools/_shared/components"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

export function AOVCalculator() {
    const [currency, setCurrency] = useState("USD")
    const [revenue, setRevenue] = useState<number | "">("")
    const [orders, setOrders] = useState<number | "">("")

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
        const element = document.getElementById('aov-guide');
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    // Calculation
    const revenueVal = val(revenue)
    const ordersVal = val(orders)

    let aov = 0
    let isValid = false

    if (revenueVal > 0 && ordersVal > 0) {
        aov = revenueVal / ordersVal
        isValid = true
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
                                <CardDescription>Enter your sales data.</CardDescription>
                            </div>
                            <div className="w-[140px]">
                                <CurrencyCombobox value={currency} onValueChange={setCurrency} />
                            </div>
                        </CardHeader>
                        <CardContent className="space-y-5 pt-6">
                            <CalculatorInput
                                label={`Total Revenue (${symbol})`}
                                value={revenue}
                                onChange={setRevenue}
                                placeholder="50000.00"
                                max={100000000}
                                tooltip="Total gross sales revenue for the period."
                            />
                            <CalculatorInput
                                label="Total Number of Orders"
                                value={orders}
                                onChange={setOrders}
                                placeholder="850"
                                max={1000000}
                                tooltip="The total count of individual orders placed."
                            />
                        </CardContent>
                    </Card>
                </div>

                {/* Results Section */}
                <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-8">
                    <ResultFeedbackCard
                        title="Average Order Value (AOV)"
                        mainValue={
                            <Counter value={aov} formatter={formatCurrency} key={currency} />
                        }
                        valueColor={isValid ? "text-blue-400" : "text-white"}
                        secondaryMetrics={[
                            {
                                label: "Revenue",
                                value: <Counter value={revenueVal} formatter={formatCurrency} key={currency} />,
                                color: "text-emerald-400"
                            },
                            {
                                label: "Orders",
                                value: <Counter value={ordersVal} formatter={(v) => v.toLocaleString()} />,
                                color: "text-slate-300"
                            }
                        ]}
                    />

                    {/* Insight Card */}
                    <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-4 flex gap-3 items-start">
                        <Search className="w-5 h-5 text-indigo-600 flex-shrink-0 mt-0.5" />
                        <div>
                            <h4 className="text-sm font-semibold text-indigo-900 mb-1">Strategy Tip</h4>
                            <p className="text-sm text-indigo-700 leading-relaxed">
                                Increasing AOV is often easier than getting new customers. Try offering bundles, upsells at checkout, or free shipping thresholds to boost this number.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </FadeIn>
    )
}
