"use client"

import React, { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CalculatorInput } from "@/app/tools/_shared/components"
import { ResultFeedbackCard, Counter, FadeIn } from "@/app/tools/_shared/components"
import { HelpCircle } from "lucide-react"

export function PPCBidCalculator() {
    const [price, setPrice] = useState<number | "">("")
    const [conversionRate, setConversionRate] = useState<number | "">("")
    const [targetACoS, setTargetACoS] = useState<number | "">("")
    const [maxBid, setMaxBid] = useState<number>(0)

    useEffect(() => {
        const p = price === "" ? 0 : price
        const cr = conversionRate === "" ? 0 : conversionRate
        const acos = targetACoS === "" ? 0 : targetACoS

        if (p > 0 && cr > 0 && acos > 0) {
            // Formula: Max Bid = Price * (Conversion Rate / 100) * (Target ACoS / 100)
            const calculatedBid = p * (cr / 100) * (acos / 100)
            setMaxBid(calculatedBid)
        } else {
            setMaxBid(0)
        }
    }, [price, conversionRate, targetACoS])

    return (
        <FadeIn className="w-full max-w-6xl mx-auto py-8 px-4" duration={0.6}>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                {/* Left Column: Inputs */}
                <div className="lg:col-span-7 space-y-6">
                    <Card className="border border-slate-200 shadow-sm bg-white">
                        <CardHeader className="pb-4 border-b border-slate-50">
                            <div className="flex items-center gap-2">
                                <CardTitle className="text-xl font-bold text-slate-800">
                                    Campaign Metrics
                                </CardTitle>
                                <HelpCircle className="w-4 h-4 text-slate-400" />
                            </div>
                        </CardHeader>
                        <CardContent className="space-y-5 pt-6">
                            <CalculatorInput
                                label="Product Sale Price"
                                value={price}
                                onChange={setPrice}
                                placeholder="50.00"
                                min={0}
                                step={0.01}
                                tooltip="The selling price of your product."
                            />
                            <CalculatorInput
                                label="Conversion Rate"
                                value={conversionRate}
                                onChange={setConversionRate}
                                placeholder="10.0"
                                min={0}
                                max={100}
                                step={0.1}
                                tooltip="Your average conversion rate (orders / clicks * 100)."
                            />
                            <CalculatorInput
                                label="Target ACoS"
                                value={targetACoS}
                                onChange={setTargetACoS}
                                placeholder="30.0"
                                min={0}
                                max={100}
                                step={0.1}
                                tooltip="Your target Advertising Cost of Sales (Ad Spend / Sales * 100)."
                            />
                        </CardContent>
                    </Card>
                </div>

                {/* Right Column: Results */}
                <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-8">
                    <ResultFeedbackCard
                        title="Maximum Bid"
                        mainValue={
                            <div className="flex items-baseline gap-1">
                                <span className="text-4xl font-bold text-white">$</span>
                                <Counter
                                    value={maxBid}
                                    formatter={(val) => val.toFixed(2)}
                                    className="text-4xl font-bold text-white"
                                />
                            </div>
                        }
                    />
                </div>
            </div>
        </FadeIn>
    )
}
