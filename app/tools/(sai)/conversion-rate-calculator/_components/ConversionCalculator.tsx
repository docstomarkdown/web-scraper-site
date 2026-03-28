"use client"
import React, { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Users, MousePointerClick, TrendingUp, AlertCircle } from "lucide-react"
import { CalculatorCardHeader, CalculatorInput, FadeIn, ResultSummaryCard } from "@/app/tools/_shared/components"

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

    if (visitorsVal > 0 && conversionsVal >= 0 && conversionsVal <= visitorsVal) {
        rate = (conversionsVal / visitorsVal) * 100
        isValid = true
    } else if (conversionsVal > visitorsVal && visitorsVal > 0) {
        // Handle invalid case where conversions > visitors
        isValid = true
        rate = (conversionsVal / visitorsVal) * 100
    }

    return (
        <FadeIn className="w-full max-w-6xl mx-auto py-8 px-4" duration={0.6}>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                {/* Inputs Section */}
                <div className="lg:col-span-7 space-y-3 lg:sticky lg:top-8">
                    <Card className="border border-slate-200 shadow-sm bg-white overflow-hidden rounded-3xl">
                        <CalculatorCardHeader
                            title="Traffic & Conversions"
                            description="Enter traffic and conversion data."
                            onReset={handleReset}
                            guideId="conversion-guide"
                        />
                        <CardContent className="p-4 md:p-6 pb-10 md:pb-14 space-y-3">
                            <div className="space-y-6 max-w-[520px] mx-auto w-full">
                                <div className="space-y-3">
                                    <CalculatorInput
                                        label="Total Visitors (Sessions)"
                                        value={visitors}
                                        onChange={setVisitors}
                                        placeholder="1000"
                                        max={10000000}
                                        tooltip="The total number of unique visitors or sessions."
                                        groupingTitle="Performance Metrics"
                                        groupingIcon={TrendingUp}
                                    />
                                    <CalculatorInput
                                        label="Total Conversions"
                                        value={conversions}
                                        onChange={setConversions}
                                        placeholder="50"
                                        max={1000000}
                                        tooltip="The number of visitors who completed the desired action (e.g. purchase, signup)."
                                    />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Results Section */}
                <div className="lg:col-span-5 space-y-3">
                    <ResultSummaryCard
                        title="Conversion Rate"
                        isCalculated={isValid}
                        liveBadgeText={
                            rate >= 3 ? "Excellent" : rate >= 1 ? "Average" : "Low"
                        }
                        liveBadgeColor={
                            rate >= 3 ? "emerald" : rate >= 1 ? "amber" : "rose"
                        }
                        primaryResult={{
                            value: rate.toFixed(2),
                            unit: "%"
                        }}
                        secondaryResults={[
                            {
                                key: "visitors",
                                label: "Total Visitors",
                                value: visitorsVal.toLocaleString(),
                                icon: Users,
                                tooltip: "Total unique visitors or sessions"
                            },
                            {
                                key: "conversions",
                                label: "Total Conversions",
                                value: conversionsVal.toLocaleString(),
                                icon: MousePointerClick,
                                tooltip: "Total successful conversions"
                            }
                        ]}
                        emptyMessage="Conversion rate"
                        description={
                            rate >= 3
                                ? "Excellent → Above average conversion" 
                                : rate >= 1 
                                    ? "Average → Room for optimization" 
                                    : "Low → Needs improvement in offer or traffic"
                        }
                    />
                     {/* Insight Card */}
                     <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 flex gap-3 items-start mt-4">
                        <TrendingUp className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                        <div>
                            <h4 className="text-sm font-semibold text-emerald-900 mb-1">Benchmarks</h4>
                            <p className="text-sm text-blue-700 leading-relaxed">
                                E-commerce conversion rates typically range from 1% to 3%. A rate above 3% is generally considered excellent, though this varies by industry.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </FadeIn>
    )
}