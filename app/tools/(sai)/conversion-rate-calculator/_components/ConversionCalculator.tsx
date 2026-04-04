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
                    >
                        {/* Benchmark Inner Card */}
                        <div className="bg-white border border-slate-200/70 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] rounded-xl transition-all duration-200 hover:shadow-[0_4px_12px_-4px_rgba(0,0,0,0.08)] hover:border-slate-300 overflow-hidden">
                            <div className="flex items-center gap-2 p-4">
                                <TrendingUp className="w-4 h-4 text-blue-500 flex-shrink-0" />
                                <span className="text-[13px] sm:text-[14px] font-bold text-slate-500 tracking-tight">
                                    Industry Benchmark
                                </span>
                            </div>
                            <div className="px-4 pb-4 pt-0 border-t border-slate-100">
                                <p className="text-[13px] text-slate-500 leading-relaxed pt-3 pl-[24px]">
                                    E-commerce conversion rates typically range from <strong className="text-slate-700 font-semibold">1% to 3%</strong>. A rate above <strong className="text-slate-700 font-semibold">3%</strong> is generally considered excellent, though this varies by industry and traffic quality.
                                </p>
                            </div>
                        </div>
                    </ResultSummaryCard>
                </div>
            </div>
        </FadeIn>
    )
}