"use client"

import React, { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { HelpCircle, Clock, Users, BarChart2, Split } from "lucide-react"
import { FadeIn, Counter, CalculatorInput, ResultFeedbackCard } from "@/app/tools/_shared/components"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

export function ABDurationCalculator() {
    const [baselineRate, setBaselineRate] = useState<number | "">("")
    const [mde, setMde] = useState<number | "">("")
    const [dailyVisitors, setDailyVisitors] = useState<number | "">("")

    const val = (v: number | "") => (v === "" ? 0 : v)

    const scrollToGuide = () => {
        const element = document.getElementById('ab-guide');
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    // Calculation
    const baseline = val(baselineRate) / 100
    const effect = val(mde) / 100
    const visitors = val(dailyVisitors)

    let days = 0
    let sampleSize = 0
    let isValid = false

    if (baseline > 0 && effect > 0 && visitors > 0) {
        // Formula: n = 16 * sigma^2 / delta^2
        // sigma^2 = p(1-p)
        // delta = p * MDE
        const p = baseline
        const delta = p * effect
        const sigma2 = p * (1 - p)

        // Sample size per variation
        const n = (16 * sigma2) / (delta * delta)

        sampleSize = Math.ceil(n)
        const totalSample = sampleSize * 2 // Assuming 2 variations
        days = Math.ceil(totalSample / visitors)

        isValid = true
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
                                <CardDescription>Parameters for a 2-tailed test with 95% significance & 80% power.</CardDescription>
                            </div>
                        </CardHeader>
                        <CardContent className="space-y-5 pt-6">
                            <CalculatorInput
                                label="Baseline Conversion Rate (%)"
                                value={baselineRate}
                                onChange={setBaselineRate}
                                placeholder="5"
                                max={100}
                                tooltip="Your current conversion rate."
                            />
                            <CalculatorInput
                                label="Minimum Detectable Effect (%)"
                                value={mde}
                                onChange={setMde}
                                placeholder="20"
                                max={1000}
                                tooltip="The relative improvement you want to detect (e.g., 20% lift)."
                            />
                            <CalculatorInput
                                label="Daily Visitors"
                                value={dailyVisitors}
                                onChange={setDailyVisitors}
                                placeholder="1000"
                                max={1000000}
                                tooltip="Total number of visitors participating in the test per day."
                            />
                        </CardContent>
                    </Card>
                </div>

                {/* Results Section */}
                <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-8">
                    <ResultFeedbackCard
                        title="Estimated Test Duration"
                        mainValue={
                            <Counter value={days} formatter={(v) => `${v.toLocaleString()} Days`} />
                        }
                        valueColor={isValid ? "text-blue-400" : "text-white"}
                        secondaryMetrics={[
                            {
                                label: "Sample Size / Variation",
                                value: <Counter value={sampleSize} formatter={(v) => v.toLocaleString()} />,
                                color: "text-slate-300"
                            },
                            {
                                label: "Total Visitors Required",
                                value: <Counter value={sampleSize * 2} formatter={(v) => v.toLocaleString()} />,
                                color: "text-slate-300"
                            }
                        ]}
                    />

                    {/* Insight Card */}
                    <div className="bg-purple-50 border border-purple-100 rounded-xl p-4 flex gap-3 items-start">
                        <Clock className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
                        <div>
                            <h4 className="text-sm font-semibold text-purple-900 mb-1">Duration Tip</h4>
                            <p className="text-sm text-purple-700 leading-relaxed">
                                Avoid running tests for less than 7 days (to capture weekly cycles) or more than 30 days (due to cookie churn/data pollution).
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </FadeIn>
    )
}
