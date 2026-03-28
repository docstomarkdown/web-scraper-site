"use client"
import React, { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { DollarSign, Users, Target, TrendingUp } from "lucide-react"
import { CalculatorCardHeader, CalculatorInput, FadeIn, ResultSummaryCard } from "@/app/tools/_shared/components"

export function CACCalculator() {
    const [currency, setCurrency] = useState("USD")
    const [expenses, setExpenses] = useState<number | "">("")
    const [customers, setCustomers] = useState<number | "">("")

    const handleReset = () => {
        setExpenses("")
        setCustomers("")
    }

    const val = (v: number | "") => (v === "" ? 0 : v)

    // Calculation
    const expensesVal = val(expenses)
    const customersVal = val(customers)
    let cac = 0
    let isValid = false

    if (expensesVal > 0 && customersVal > 0) {
        cac = expensesVal / customersVal
        isValid = true
    }

    return (
        <FadeIn className="w-full max-w-6xl mx-auto py-8 px-4" duration={0.6}>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                {/* Inputs Section — Sticky */}
                <div className="lg:col-span-7 space-y-3 lg:sticky lg:top-8">
                    <Card className="border border-slate-200 shadow-sm bg-white overflow-hidden rounded-3xl">
                        <CalculatorCardHeader
                            title="Acquisition Metrics"
                            description="Enter total costs and customers acquired."
                            onReset={handleReset}
                            guideId="cac-guide"
                            currency={currency}
                            onCurrencyChange={setCurrency}
                        />
                        <CardContent className="p-4 md:p-6 pb-10 md:pb-14 space-y-3">
                            <div className="space-y-6 max-w-[520px] mx-auto w-full">
                                <div className="space-y-3">
                                    <CalculatorInput
                                        label="Total Sales & Marketing Costs"
                                        value={expenses}
                                        onChange={setExpenses}
                                        placeholder="5000.00"
                                        max={10000000}
                                        tooltip="Include all costs: ad spend, salaries, commissions, tools, improvements, etc."
                                        groupingTitle="Spend & Volume"
                                        groupingIcon={TrendingUp}
                                    />
                                    <CalculatorInput
                                        label="New Customers Acquired"
                                        value={customers}
                                        onChange={setCustomers}
                                        placeholder="50"
                                        max={1000000}
                                        tooltip="The total number of new customers acquired during the same period."
                                    />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Results Section — Scrollable */}
                <div className="lg:col-span-5 space-y-3">
                    <ResultSummaryCard
                        isCalculated={isValid}
                        currency={currency}
                        emptyMessage="CAC"
                        liveBadgeText={
                            isValid
                                ? cac < 50 ? "Efficient Acquisition"
                                : cac < 100 ? "Moderate CPA"
                                : "High Acquisition Cost"
                                : "Enter Data"
                        }
                        liveBadgeColor={
                            isValid
                                ? cac < 50 ? "emerald"
                                : cac < 100 ? "blue"
                                : "amber"
                                : "slate"
                        }
                        primaryResult={{
                            value: cac,
                            label: "Customer Acquisition Cost",
                            isCurrency: true,
                            key: "cac"
                        }}
                        secondaryResults={[
                            {
                                key: "expenses",
                                label: "Total Investment",
                                value: expensesVal,
                                isCurrency: true,
                                icon: DollarSign
                            },
                            {
                                key: "customers",
                                label: "Customers Won",
                                value: customersVal,
                                isCurrency: false,
                                icon: Users
                            }
                        ]}
                    />
                    {/* Insight Card */}
                    <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 flex gap-3 items-start">
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
        </FadeIn>
    )
}