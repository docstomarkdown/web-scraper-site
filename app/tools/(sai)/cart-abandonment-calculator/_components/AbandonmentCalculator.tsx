"use client"
import React, { useState } from "react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { ShoppingCart, ShoppingBag, Percent, UserMinus } from "lucide-react"
import { cn } from "@/lib/utils"
import { CalculatorCardHeader, CalculatorInput, FadeIn, ResultSummaryCard } from "@/app/tools/_shared/components"
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
                <div className="lg:col-span-7 space-y-3 lg:sticky lg:top-8">
                    <Card className="border border-slate-200 shadow-sm bg-white">
                        <CalculatorCardHeader
                            title="Cart Drop-off Data"
                            description="Enter cart and transaction data."
                            onReset={handleReset}
                            guideId="abandonment-guide"
                        />
                        <CardContent className="space-y-3 pt-6">
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
                <div className="lg:col-span-5 space-y-3">
                    <ResultSummaryCard
                        title="Cart Abandonment Rate"
                        isCalculated={isValid}
                        liveBadgeText={
                            rate < 60 ? "Excellent" : rate < 75 ? "Average" : "High"
                        }
                        liveBadgeColor={
                            rate < 60 ? "emerald" : rate < 75 ? "amber" : "rose"
                        }
                        primaryResult={{
                            value: rate.toFixed(2),
                            unit: "%"
                        }}
                        secondaryResults={[
                            {
                                key: "abandoned",
                                label: "Abandoned Carts",
                                value: (cartsVal - transactionsVal).toLocaleString(),
                                icon: UserMinus,
                                tooltip: "Total users who dropped off (Carts - Orders)"
                            },
                            {
                                key: "conversion",
                                label: "Conversion Rate",
                                value: (isValid ? (100 - rate).toFixed(2) : 0),
                                unit: "%",
                                icon: Percent,
                                tooltip: "% of users who completed purchase"
                            }
                        ]}
                        emptyMessage="Abandonment rate"
                        description={
                            rate < 60 
                                ? "Good (Low Abandonment) → Checkout is healthy" 
                                : rate < 75 
                                    ? "Needs Improvement → Some friction exists" 
                                    : "High Abandonment → Major issue, optimize checkout"
                        }
                    />
                </div>
            </div>
        </FadeIn>
    )
}
