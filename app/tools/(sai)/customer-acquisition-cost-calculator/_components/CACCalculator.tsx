"use client"

import React, { useState } from "react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { DollarSign, Users, TrendingUp, Target } from "lucide-react"

import { cn } from "@/lib/utils"
import { CalculatorCardHeader, CalculatorInput, Counter, CurrencyCombobox, FadeIn, ResultFeedbackCard } from "@/app/tools/_shared/components"

export function CACCalculator() {
    const [currency, setCurrency] = useState("USD")
    const [expenses, setExpenses] = useState<number | "">("")
    const [customers, setCustomers] = useState<number | "">("")

    const handleReset = () => {
        setExpenses("")
        setCustomers("")
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
    // Calculation
    const expensesVal = val(expenses)
    const customersVal = val(customers)

    let cac = 0
    let isValid = false

    if (expensesVal > 0 && customersVal > 0) {
        cac = expensesVal / customersVal
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
                        <CalculatorCardHeader

                            description="Enter total costs and customers acquired."

                            onReset={handleReset}

                            guideId="cac-guide"

                            currency={currency}

                            onCurrencyChange={setCurrency}

                        />
                        <CardContent className="space-y-5 pt-6">
                            <CalculatorInput
                                label={`Total Sales & Marketing Costs (${symbol})`}
                                value={expenses}
                                onChange={setExpenses}
                                placeholder="5000.00"
                                max={10000000}
                                tooltip="Include all costs: ad spend, salaries, commissions, tools, improvements, etc."
                            />
                            <CalculatorInput
                                label="New Customers Acquired"
                                value={customers}
                                onChange={setCustomers}
                                placeholder="50"
                                max={1000000}
                                tooltip="The total number of new customers acquired during the same period."
                            />
                        </CardContent>
                    </Card>
                </div>

                {/* Results Section */}
                <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-8">
                    <ResultFeedbackCard
                        title="Customer Acquisition Cost (CAC)"
                        mainValue={
                            <Counter value={cac} formatter={formatCurrency} key={currency} />
                        }
                        valueColor={isValid ? "text-blue-400" : "text-white"}
                        secondaryMetrics={[
                            {
                                label: "Total Investment",
                                value: <Counter value={expensesVal} formatter={formatCurrency} key={currency} />,
                                color: "text-slate-300"
                            },
                            {
                                label: "Customers Won",
                                value: <Counter value={customersVal} formatter={(v) => v.toFixed(0)} />,
                                color: "text-blue-400"
                            }
                        ]}
                    />

                    {/* Indicator Badge */}
                    {isValid && (
                        <div className={cn(
                            "px-4 py-3 rounded-xl border text-center text-sm font-semibold",
                            cac < 50 ? "bg-blue-50 border-blue-200 text-blue-700" :
                                cac < 100 ? "bg-blue-50 border-blue-200 text-blue-700" :
                                    "bg-slate-50 border-slate-200 text-slate-700"
                        )}>
                            {cac < 50 ? "🚀 Efficient Acquisition" : cac < 100 ? "⚖️ Moderate CPA" : "📊 High Acquisition Cost"}
                        </div>
                    )}

                    {/* Breakdown Card */}
                    {isValid ? (
                        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden border-l-4 border-l-blue-500">
                            <div className="px-5 py-3.5 border-b border-slate-100">
                                <p className="text-xs font-bold text-slate-600 uppercase tracking-wider">Cost Breakdown</p>
                            </div>
                            <div className="divide-y divide-slate-100">
                                <div className="flex justify-between items-center px-4 py-3">
                                    <span className="text-sm text-slate-500">Total Expenses</span>
                                    <span className="text-sm font-medium text-slate-700">{formatCurrency(expensesVal)}</span>
                                </div>
                                <div className="flex justify-between items-center px-4 py-3">
                                    <span className="text-sm text-slate-500">New Customers</span>
                                    <span className="text-sm font-medium text-slate-700">{customersVal.toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between items-center px-5 py-3.5 bg-blue-50/20">
                                    <span className="text-sm font-bold text-slate-900">Cost Per Customer</span>
                                    <span className="text-base font-bold text-blue-600">{formatCurrency(cac)}</span>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 text-center">
                            <p className="text-sm text-slate-400">Enter expenses and customers to calculate CAC.</p>
                        </div>
                    )}

                    {/* Insight Card */}
                    <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 flex gap-3 items-start mt-4">
                        <Target className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                        <div>
                            <h4 className="text-sm font-semibold text-slate-900 mb-1">Benchmarks</h4>
                            <p className="text-sm text-blue-700 leading-relaxed">
                                A good CAC depends on your industry and LTV (Lifetime Value). A healthy business model typically aims for an LTV:CAC ratio of 3:1 or higher.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </FadeIn >
    )
}
