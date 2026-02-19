"use client"

import React, { useState } from "react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { ShoppingCart, CreditCard, XCircle, ShoppingBag } from "lucide-react"
import { cn } from "@/lib/utils"
import { CalculatorCardHeader, CalculatorInput, Counter, FadeIn, ResultFeedbackCard } from "@/app/tools/_shared/components"

export function AbandonmentCalculator() {
    const [carts, setCarts] = useState<number | "">("")
    const [transactions, setTransactions] = useState<number | "">("")

    const val = (v: number | "") => (v === "" ? 0 : v)

    const handleReset = () => {
        setCarts("")
        setTransactions("")
    }
    // Calculation
    const cartsVal = val(carts)
    const transactionsVal = val(transactions)

    let rate = 0
    let isValid = false

    if (cartsVal > 0 && transactionsVal >= 0) {
        if (transactionsVal <= cartsVal) {
            rate = (1 - (transactionsVal / cartsVal)) * 100
            isValid = true
        }
    }

    return (
        <FadeIn className="w-full max-w-6xl mx-auto py-8 px-4" duration={0.6}>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

                {/* Inputs Section */}
                <div className="lg:col-span-7 space-y-6">
                    <Card className="border border-slate-200 shadow-sm bg-white">
                        <CalculatorCardHeader

                            description="Enter cart and transaction data."

                            onReset={handleReset}

                            guideId="abandonment-guide"
                        />
                        <CardContent className="space-y-5 pt-6">
                            <CalculatorInput
                                label="Number of Carts Created"
                                value={carts}
                                onChange={setCarts}
                                placeholder="500"
                                max={1000000}
                                tooltip="The total number of visitors who added items to their shopping cart."
                            />
                            <CalculatorInput
                                label="Completed Transactions"
                                value={transactions}
                                onChange={setTransactions}
                                placeholder="150"
                                max={1000000}
                                tooltip="The number of users who successfully completed the checkout process."
                            />
                        </CardContent>
                    </Card>
                </div>

                {/* Results Section */}
                <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-8">
                    <ResultFeedbackCard
                        title="Cart Abandonment Rate"
                        mainValue={
                            <Counter value={rate} formatter={(v) => `${v.toFixed(2)}%`} />
                        }
                        valueColor={isValid ? (rate < 70 ? "text-emerald-400" : "text-red-400") : "text-white"}
                        secondaryMetrics={[
                            {
                                label: "Carts Created",
                                value: <Counter value={cartsVal} formatter={(v) => v.toLocaleString()} />,
                                color: "text-slate-300"
                            },
                            {
                                label: "Purchases",
                                value: <Counter value={transactionsVal} formatter={(v) => v.toLocaleString()} />,
                                color: "text-blue-400"
                            }
                        ]}
                    />

                    {/* Indicator Badge */}
                    {isValid && (
                        <div className={cn(
                            "px-4 py-3 rounded-xl border text-center text-sm font-semibold",
                            rate < 60 ? "bg-emerald-50 border-emerald-200 text-emerald-700" :
                                rate < 75 ? "bg-yellow-50 border-yellow-200 text-yellow-700" :
                                    "bg-red-50 border-red-200 text-red-700"
                        )}>
                            {rate < 60 ? "🚀 High Retention Rate" : rate < 75 ? "⚠️ Average Abandonment" : "🛑 High Abandonment"}
                        </div>
                    )}

                    {/* Breakdown Card */}
                    {isValid ? (
                        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden border-l-4 border-l-red-500">
                            <div className="px-5 py-3.5 border-b border-slate-100">
                                <p className="text-xs font-bold text-slate-600 uppercase tracking-wider">Cart Flow</p>
                            </div>
                            <div className="divide-y divide-slate-100">
                                <div className="flex justify-between items-center px-4 py-3">
                                    <span className="text-sm text-slate-500">Total Carts Created</span>
                                    <span className="text-sm font-medium text-slate-700">{cartsVal.toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between items-center px-4 py-3 bg-red-50/50">
                                    <span className="text-sm text-red-600 font-medium">Abandoned Carts</span>
                                    <span className="text-sm font-bold text-red-600">{(cartsVal - transactionsVal).toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between items-center px-4 py-3 bg-emerald-50/50">
                                    <span className="text-sm text-emerald-600 font-medium">Completed Orders</span>
                                    <span className="text-sm font-bold text-emerald-600">{transactionsVal.toLocaleString()}</span>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 text-center">
                            <p className="text-sm text-slate-400">Enter data to see breakdown.</p>
                        </div>
                    )}

                    {/* Insight Card */}
                    <div className="bg-orange-50 border border-orange-100 rounded-xl p-4 flex gap-3 items-start mt-4">
                        <XCircle className="w-5 h-5 text-orange-600 flex-shrink-0 mt-0.5" />
                        <div>
                            <h4 className="text-sm font-semibold text-orange-900 mb-1">Industry Status</h4>
                            <p className="text-sm text-orange-700 leading-relaxed">
                                The average cart abandonment rate across industries is nearly 70%. If your rate is lower than 70%, you are doing better than average.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </FadeIn>
    )
}
