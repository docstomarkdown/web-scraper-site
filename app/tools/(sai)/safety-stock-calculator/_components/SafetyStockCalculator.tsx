"use client"

import React, { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { HelpCircle, AlertTriangle, ShieldCheck } from "lucide-react"
import { FadeIn, Counter, CalculatorInput, ResultFeedbackCard } from "@/app/tools/_shared/components"

export function SafetyStockCalculator() {
    const [maxDailySales, setMaxDailySales] = useState<number | "">("")
    const [maxLeadTime, setMaxLeadTime] = useState<number | "">("")
    const [avgDailySales, setAvgDailySales] = useState<number | "">("")
    const [avgLeadTime, setAvgLeadTime] = useState<number | "">("")

    const scrollToGuide = () => {
        const element = document.getElementById('how-to-use');
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const val = (v: number | "") => (v === "" ? 0 : v)

    // --- Calculations ---
    const maxSales = val(maxDailySales)
    const maxLead = val(maxLeadTime)
    const avgSales = val(avgDailySales)
    const avgLead = val(avgLeadTime)

    // Formula: (Max Daily Sales * Max Lead Time) - (Avg Daily Sales * Avg Lead Time)
    const maxUsage = maxSales * maxLead
    const avgUsage = avgSales * avgLead
    const safetyStock = Math.max(0, Math.ceil(maxUsage - avgUsage))

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
                                        Sales & Lead Time Variability
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
                                <CardDescription>Enter your best and average case scenarios.</CardDescription>
                            </div>
                        </CardHeader>
                        <CardContent className="space-y-5 pt-6">
                            <CalculatorInput
                                label="Max Daily Sales"
                                value={maxDailySales}
                                onChange={setMaxDailySales}
                                placeholder="20"
                                tooltip="The highest number of units sold in a single day."
                            />
                            <CalculatorInput
                                label="Avg. Daily Sales"
                                value={avgDailySales}
                                onChange={setAvgDailySales}
                                placeholder="10"
                                tooltip="The typical number of units sold in a day."
                            />
                            <CalculatorInput
                                label="Max Lead Time (Days)"
                                value={maxLeadTime}
                                onChange={setMaxLeadTime}
                                placeholder="21"
                                tooltip="The longest it has ever taken for stock to arrive."
                            />
                            <CalculatorInput
                                label="Avg. Lead Time (Days)"
                                value={avgLeadTime}
                                onChange={setAvgLeadTime}
                                placeholder="14"
                                tooltip="The typical number of days for stock to arrive."
                            />
                        </CardContent>
                    </Card>
                </div>

                {/* Results Section */}
                <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-8">
                    <ResultFeedbackCard
                        title="Recommended Safety Stock"
                        titleLabel="Buffer Needed"
                        labelClassName="bg-blue-500/10 text-blue-400"
                        mainValue={
                            <div className="flex items-baseline gap-1">
                                <Counter value={safetyStock} />
                                <span className="text-2xl font-normal opacity-80">Units</span>
                            </div>
                        }
                        valueColor="text-emerald-400"
                        mainMetricLabel="Impact"
                        mainMetricValue="Prevents Stockouts"
                        mainMetricColor="text-blue-400"
                        secondaryMetrics={[
                            {
                                label: "Max Lead Time Demand",
                                value: <><Counter value={maxUsage} /> Units</>,
                                color: "text-slate-300"
                            },
                            {
                                label: "Avg Lead Time Demand",
                                value: <><Counter value={avgUsage} /> Units</>,
                                color: "text-slate-400"
                            }
                        ]}
                    />

                    {/* Analysis Card */}
                    <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-4">
                        <div className="flex items-start gap-3">
                            <ShieldCheck className="w-5 h-5 text-emerald-500 mt-0.5" />
                            <div>
                                <h4 className="font-semibold text-slate-800 mb-1">
                                    Inventory Protection
                                </h4>
                                <p className="text-sm text-slate-600 leading-relaxed">
                                    To protect against the variability in your sales and supplier delays, you should hold <strong>{safetyStock} units</strong> as a permanent buffer. This ensures you can cover demand even if a shipment is late or sales spike.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </FadeIn>
    )
}
