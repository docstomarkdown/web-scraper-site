"use client"

import React, { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CalculatorInput } from "@/app/tools/_shared/components"
import { ResultFeedbackCard, Counter, FadeIn } from "@/app/tools/_shared/components"
import { HelpCircle } from "lucide-react"

export function ACoSCalculator() {
    const [adSpend, setAdSpend] = useState<number | "">("")
    const [adRevenue, setAdRevenue] = useState<number | "">("")
    const [acos, setAcos] = useState<number>(0)

    useEffect(() => {
        const spend = adSpend === "" ? 0 : adSpend
        const revenue = adRevenue === "" ? 0 : adRevenue

        if (spend > 0 && revenue > 0) {
            // Formula: ACoS = (Ad Spend / Ad Revenue) * 100
            const calculatedAcos = (spend / revenue) * 100
            setAcos(calculatedAcos)
        } else {
            setAcos(0)
        }
    }, [adSpend, adRevenue])

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
                                label="Total Ad Spend"
                                value={adSpend}
                                onChange={setAdSpend}
                                placeholder="200.00"
                                min={0}
                                step={0.01}
                                tooltip="Total amount spent on advertising."
                            />
                            <CalculatorInput
                                label="Total Ad Revenue"
                                value={adRevenue}
                                onChange={setAdRevenue}
                                placeholder="800.00"
                                min={0}
                                step={0.01}
                                tooltip="Total revenue generated from advertising."
                            />
                        </CardContent>
                    </Card>
                </div>

                {/* Right Column: Results */}
                <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-8">
                    <ResultFeedbackCard
                        title="ACoS"
                        mainValue={
                            <div className="flex items-baseline gap-1">
                                <Counter
                                    value={acos}
                                    formatter={(val) => val.toFixed(2)}
                                    className="text-4xl font-bold text-white"
                                />
                                <span className="text-2xl font-bold text-blue-200">%</span>
                            </div>
                        }
                    />
                </div>
            </div>
        </FadeIn>
    )
}
