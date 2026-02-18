"use client"

import React, { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { HelpCircle, DollarSign, Users, TrendingUp, Target } from "lucide-react"
import { CurrencyCombobox } from "@/app/tools/_shared/components"
import { FadeIn, Counter, CalculatorInput, ResultFeedbackCard } from "@/app/tools/_shared/components"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

export function CACCalculator() {
    const [currency, setCurrency] = useState("USD")
    const [expenses, setExpenses] = useState<number | "">("")
    const [customers, setCustomers] = useState<number | "">("")

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
        const element = document.getElementById('cac-guide');
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

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
                                <CardDescription>Enter total costs and customers acquired.</CardDescription>
                            </div>
                            <div className="w-[140px]">
                                <CurrencyCombobox value={currency} onValueChange={setCurrency} />
                            </div>
                        </CardHeader>
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
                                color: "text-emerald-400"
                            }
                        ]}
                    />

                    {/* Insight Card */}
                    <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 flex gap-3 items-start">
                        <Target className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                        <div>
                            <h4 className="text-sm font-semibold text-blue-900 mb-1">Benchmarks</h4>
                            <p className="text-sm text-blue-700 leading-relaxed">
                                A good CAC depends on your industry and LTV (Lifetime Value). A healthy business model typically aims for an LTV:CAC ratio of 3:1 or higher.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </FadeIn>
    )
}
