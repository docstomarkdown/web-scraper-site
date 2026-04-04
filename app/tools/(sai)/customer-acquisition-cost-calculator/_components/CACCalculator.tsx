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
                    >
                        {/* Benchmark Inner Card */}
                        <div className="bg-white border border-slate-200/70 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] rounded-xl transition-all duration-200 hover:shadow-[0_4px_12px_-4px_rgba(0,0,0,0.08)] hover:border-slate-300 overflow-hidden">
                            <div className="flex items-center gap-2 p-4">
                                <Target className="w-4 h-4 text-blue-500 flex-shrink-0" />
                                <span className="text-[13px] sm:text-[14px] font-bold text-slate-500 tracking-tight">
                                    Industry Benchmark
                                </span>
                            </div>
                            <div className="px-4 pb-4 pt-0 border-t border-slate-100">
                                <p className="text-[13px] text-slate-500 leading-relaxed pt-3 pl-[24px]">
                                    A good CAC depends on your industry and LTV (Lifetime Value). A healthy business model typically aims for an <strong className="text-slate-700 font-semibold">LTV:CAC ratio of 3:1</strong> or higher.
                                </p>
                            </div>
                        </div>
                    </ResultSummaryCard>
                </div>
            </div>
        </FadeIn>
    )
}