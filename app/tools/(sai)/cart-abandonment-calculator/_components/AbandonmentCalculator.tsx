"use client"

import React, { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { HelpCircle, ShoppingCart, CreditCard, XCircle, ShoppingBag } from "lucide-react"
import { FadeIn, Counter, CalculatorInput, ResultFeedbackCard } from "@/app/tools/_shared/components"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

export function AbandonmentCalculator() {
    const [carts, setCarts] = useState<number | "">("")
    const [transactions, setTransactions] = useState<number | "">("")

    const val = (v: number | "") => (v === "" ? 0 : v)

    const scrollToGuide = () => {
        const element = document.getElementById('abandonment-guide');
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

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
                                <CardDescription>Enter cart and transaction data.</CardDescription>
                            </div>
                        </CardHeader>
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

                    {/* Insight Card */}
                    <div className="bg-orange-50 border border-orange-100 rounded-xl p-4 flex gap-3 items-start">
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
