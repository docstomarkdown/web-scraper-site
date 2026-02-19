"use client"

import React, { useState } from "react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Users, MousePointerClick, TrendingUp } from "lucide-react"
import { cn } from "@/lib/utils"
import { CalculatorCardHeader, CalculatorInput, Counter, FadeIn, ResultFeedbackCard } from "@/app/tools/_shared/components"

export function ConversionCalculator() {
    const [visitors, setVisitors] = useState<number | "">("")
    const [conversions, setConversions] = useState<number | "">("")

    const val = (v: number | "") => (v === "" ? 0 : v)

    const handleReset = () => {
        setVisitors("")
        setConversions("")
    }
    // Calculation
    const visitorsVal = val(visitors)
    const conversionsVal = val(conversions)

    let rate = 0
    let isValid = false

    if (visitorsVal > 0 && conversionsVal >= 0) {
        rate = (conversionsVal / visitorsVal) * 100
        isValid = true
    }

    return (
        <FadeIn className="w-full max-w-6xl mx-auto py-8 px-4" duration={0.6}>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

                {/* Inputs Section */}
                <div className="lg:col-span-7 space-y-6">
                    <Card className="border border-slate-200 shadow-sm bg-white">
                        <CalculatorCardHeader

                            description="Enter traffic and conversion data."

                            onReset={handleReset}

                            guideId="conversion-guide"

                        />
                        <CardContent className="space-y-5 pt-6">
                            <CalculatorInput
                                label="Total Visitors (Sessions)"
                                value={visitors}
                                onChange={setVisitors}
                                placeholder="1000"
                                max={10000000}
                                tooltip="The total number of unique visitors or sessions."
                            />
                            <CalculatorInput
                                label="Total Conversions"
                                value={conversions}
                                onChange={setConversions}
                                placeholder="50"
                                max={1000000}
                                tooltip="The number of visitors who completed the desired action (e.g. purchase, signup)."
                            />
                        </CardContent>
                    </Card>
                </div>

                {/* Results Section */}
                <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-8">
                    <ResultFeedbackCard
                        title="Conversion Rate"
                        mainValue={
                            <Counter value={rate} formatter={(v) => `${v.toFixed(2)}%`} />
                        }
                        valueColor={isValid ? "text-emerald-400" : "text-white"}
                        secondaryMetrics={[
                            {
                                label: "Visitors",
                                value: <Counter value={visitorsVal} formatter={(v) => v.toLocaleString()} />,
                                color: "text-slate-300"
                            },
                            {
                                label: "Conversions",
                                value: <Counter value={conversionsVal} formatter={(v) => v.toLocaleString()} />,
                                color: "text-blue-400"
                            }
                        ]}
                    />

                    {/* Indicator Badge */}
                    {isValid && (
                        <div className={cn(
                            "px-4 py-3 rounded-xl border text-center text-sm font-semibold",
                            rate >= 3 ? "bg-emerald-50 border-emerald-200 text-emerald-700" :
                                rate >= 1 ? "bg-blue-50 border-blue-200 text-blue-700" :
                                    "bg-red-50 border-red-200 text-red-700"
                        )}>
                            {rate >= 3 ? "🚀 Excellent Conversion Rate" : rate >= 1 ? "✅ Average Conversion Rate" : "⚠️ Low Conversion Rate"}
                        </div>
                    )}

                    {/* Breakdown Card */}
                    {isValid ? (
                        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                            <div className="px-4 py-3 border-b border-slate-100">
                                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Traffic Breakdown</p>
                            </div>
                            <div className="divide-y divide-slate-50">
                                <div className="flex justify-between items-center px-4 py-3">
                                    <span className="text-sm text-slate-500">Total Visitors</span>
                                    <span className="text-sm font-medium text-slate-700">{visitorsVal.toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between items-center px-4 py-3 bg-emerald-50/50">
                                    <span className="text-sm text-emerald-600 font-medium">Converted Users</span>
                                    <span className="text-sm font-bold text-emerald-600">{conversionsVal.toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between items-center px-4 py-3 bg-slate-50/50">
                                    <span className="text-sm text-slate-500">Non-Converted Users</span>
                                    <span className="text-sm font-medium text-slate-700">{(visitorsVal - conversionsVal).toLocaleString()}</span>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 text-center">
                            <p className="text-sm text-slate-400">Enter traffic data to see breakdown.</p>
                        </div>
                    )}

                    {/* Insight Card */}
                    <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-4 flex gap-3 items-start mt-4">
                        <TrendingUp className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                        <div>
                            <h4 className="text-sm font-semibold text-emerald-900 mb-1">Benchmarks</h4>
                            <p className="text-sm text-emerald-700 leading-relaxed">
                                E-commerce conversion rates typically range from 1% to 3%. A rate above 3% is generally considered excellent, though this varies by industry.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </FadeIn>
    )
}
