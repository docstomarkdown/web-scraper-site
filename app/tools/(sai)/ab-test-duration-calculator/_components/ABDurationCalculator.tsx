"use client"

import React, { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Calendar, Users, Target, Activity } from "lucide-react"
import { FadeIn, Counter, CalculatorInput, ResultFeedbackCard, CalculatorCardHeader } from "@/app/tools/_shared/components"
import { cn } from "@/lib/utils"

export function ABDurationCalculator() {
    const [baselineRate, setBaselineRate] = useState<number | "">("")
    const [mde, setMde] = useState<number | "">("")
    const [dailyVisitors, setDailyVisitors] = useState<number | "">("")

    // Advanced Settings (could be hidden, but let's keep simple first)
    // const [significance, setSignificance] = useState<number>(95)
    // const [power, setPower] = useState<number>(80)

    const [sampleSize, setSampleSize] = useState<number>(0)
    const [duration, setDuration] = useState<number>(0)

    const handleReset = () => {
        setBaselineRate("")
        setMde("")
        setDailyVisitors("")
    }



    const val = (v: number | "") => (v === "" ? 0 : v)

    useEffect(() => {
        const p1 = val(baselineRate) / 100
        const effect = val(mde) / 100
        const visitors = val(dailyVisitors)

        if (p1 > 0 && p1 < 1 && effect > 0 && visitors > 0) {
            // Formula parameters for 95% Confidence (Z=1.96) and 80% Power (Z=0.84)
            const Z_alpha = 1.96
            const Z_beta = 0.84
            const p2 = p1 * (1 + effect)

            // Pooled variance approximation
            // n = (Z_alpha + Z_beta)^2 * (p1(1-p1) + p2(1-p2)) / (p2 - p1)^2

            if (p2 > 0 && p2 < 1) {
                const numerator = Math.pow(Z_alpha + Z_beta, 2) * (p1 * (1 - p1) + p2 * (1 - p2))
                const denominator = Math.pow(p2 - p1, 2)
                const n = Math.ceil(numerator / denominator)

                setSampleSize(n)
                setDuration(Math.ceil((n * 2) / visitors)) // Total sample = n * 2 variations
            }
        } else {
            setSampleSize(0)
            setDuration(0)
        }
    }, [baselineRate, mde, dailyVisitors])

    return (
        <FadeIn className="w-full max-w-6xl mx-auto py-8 px-4" duration={0.6}>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

                {/* Inputs Section */}
                <div className="lg:col-span-7 space-y-6">
                    <Card className="border border-slate-200 shadow-sm bg-white">
                        <CalculatorCardHeader
                            description="Enter your current metrics and desired improvement."
                            onReset={handleReset}
                            guideId="ab-guide"
                        />
                        <CardContent className="space-y-5 pt-6">
                            <CalculatorInput
                                label="Baseline Conversion Rate (%)"
                                value={baselineRate}
                                onChange={setBaselineRate}
                                placeholder="2.5"
                                max={100}
                                suffix="%"
                                tooltip="Your current conversion rate for the page/element being tested."
                            />
                            <CalculatorInput
                                label="Minimum Detectable Effect (%)"
                                value={mde}
                                onChange={setMde}
                                placeholder="10"
                                max={1000}
                                suffix="%"
                                tooltip="The minimum relative improvement you want to detect (e.g., a 10% lift)."
                            />
                            <CalculatorInput
                                label="Average Daily Visitors"
                                value={dailyVisitors}
                                onChange={setDailyVisitors}
                                placeholder="1000"
                                max={10000000}
                                tooltip="Number of visitors/sessions expected on the test page per day."
                            />
                        </CardContent>
                    </Card>
                </div>

                {/* Results Section */}
                <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-8">
                    <ResultFeedbackCard
                        title="Estimated Duration"
                        mainValue={
                            <div className="flex items-baseline gap-2">
                                <Counter value={duration} className="text-5xl font-bold text-blue-600" />
                                <span className="text-2xl font-bold text-slate-400">Days</span>
                            </div>
                        }
                        secondaryMetrics={[
                            {
                                label: "Total Sample Size",
                                value: <Counter value={sampleSize * 2} formatter={(v) => v.toLocaleString()} />,
                                color: "text-slate-600"
                            },
                            {
                                label: "Per Variant",
                                value: <Counter value={sampleSize} formatter={(v) => v.toLocaleString()} />,
                                color: "text-slate-400"
                            }
                        ]}
                    />

                    {/* Indicator Badge */}
                    {duration > 0 && (
                        <div className={cn(
                            "px-4 py-3 rounded-xl border text-center text-sm font-semibold",
                            duration <= 14 ? "bg-emerald-50 border-emerald-200 text-emerald-700" :
                                duration <= 30 ? "bg-blue-50 border-blue-200 text-blue-700" :
                                    "bg-amber-50 border-amber-200 text-amber-700"
                        )}>
                            {duration <= 14 ? "🚀 Quick Test (Under 2 Weeks)" : duration <= 30 ? "✅ Standard Duration" : "⚠️ Long Duration"}
                        </div>
                    )}

                    {/* Breakdown Card */}
                    {duration > 0 ? (
                        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                            <div className="px-4 py-3 border-b border-slate-100">
                                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Test Specifications</p>
                            </div>
                            <div className="divide-y divide-slate-50">
                                <div className="flex justify-between items-center px-4 py-3">
                                    <span className="text-sm text-slate-500">Significance Level</span>
                                    <span className="text-sm font-medium text-slate-700">95%</span>
                                </div>
                                <div className="flex justify-between items-center px-4 py-3">
                                    <span className="text-sm text-slate-500">Statistical Power</span>
                                    <span className="text-sm font-medium text-slate-700">80%</span>
                                </div>
                                <div className="flex justify-between items-center px-4 py-3 bg-slate-50">
                                    <span className="text-sm font-semibold text-slate-900">Total Visitors Needed</span>
                                    <span className="text-sm font-bold text-blue-600">{(sampleSize * 2).toLocaleString()}</span>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 text-center">
                            <p className="text-sm text-slate-400">Enter metrics to calculate duration.</p>
                        </div>
                    )}
                </div>
            </div>
        </FadeIn>
    )
}
