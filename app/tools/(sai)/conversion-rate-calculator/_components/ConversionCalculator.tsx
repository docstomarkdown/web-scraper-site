"use client"

import React, { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { HelpCircle, Users, MousePointerClick, TrendingUp } from "lucide-react"
import { FadeIn, Counter, CalculatorInput, ResultFeedbackCard } from "@/app/tools/_shared/components"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

export function ConversionCalculator() {
    const [visitors, setVisitors] = useState<number | "">("")
    const [conversions, setConversions] = useState<number | "">("")

    const val = (v: number | "") => (v === "" ? 0 : v)

    const scrollToGuide = () => {
        const element = document.getElementById('conversion-guide');
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

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
                                <CardDescription>Enter traffic and conversion data.</CardDescription>
                            </div>
                        </CardHeader>
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

                    {/* Insight Card */}
                    <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-4 flex gap-3 items-start">
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
