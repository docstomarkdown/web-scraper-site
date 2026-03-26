"use client"

import React, { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Users, Target, Activity, Settings, ChevronDown, ChevronUp } from "lucide-react"
import { FadeIn, CalculatorInput, ResultSummaryCard, CalculatorCardHeader } from "@/app/tools/_shared/components"
import { cn } from "@/lib/utils"

export function ABDurationCalculator() {
    const [baselineRate, setBaselineRate] = useState<number | "">("")
    const [mde, setMde] = useState<number | "">("")
    const [dailyVisitors, setDailyVisitors] = useState<number | "">("")
    const [trafficSplit, setTrafficSplit] = useState<number | "">(50)
    const [settingsOpen, setSettingsOpen] = useState(false)

    const [sampleSize, setSampleSize] = useState<number>(0)
    const [duration, setDuration] = useState<number>(0)

    const handleReset = () => {
        setBaselineRate("")
        setMde("")
        setDailyVisitors("")
        setTrafficSplit(50)
    }

    const val = (v: number | "") => (v === "" ? 0 : v)

    useEffect(() => {
        const p1 = val(baselineRate) / 100
        const effect = val(mde) / 100
        const visitors = val(dailyVisitors)
        const split = val(trafficSplit) || 50

        if (p1 > 0 && p1 < 1 && effect > 0 && visitors > 0 && split > 0 && split < 100) {
            const Z_alpha = 1.96
            const Z_beta = 0.84
            const p2 = p1 * (1 + effect)

            if (p2 > 0 && p2 < 1) {
                const numerator = Math.pow(Z_alpha + Z_beta, 2) * (p1 * (1 - p1) + p2 * (1 - p2))
                const denominator = Math.pow(p2 - p1, 2)
                const n = Math.ceil(numerator / denominator)
                setSampleSize(n)
                const minFraction = Math.min(split, 100 - split) / 100
                setDuration(Math.ceil(n / (visitors * minFraction)))
            } else {
                setSampleSize(0)
                setDuration(0)
            }
        } else {
            setSampleSize(0)
            setDuration(0)
        }
    }, [baselineRate, mde, dailyVisitors, trafficSplit])

    const isCalculated = duration > 0
    const totalVisitorsNeeded = sampleSize * 2
    const dailyPerVariant = Math.floor(val(dailyVisitors) * (val(trafficSplit) || 50) / 100)

    const insightMessage = isCalculated
        ? (duration <= 30
            ? "Your traffic is sufficient for a reliable test ✅"
            : "Low traffic — test will take longer ⚠️")
        : "A quick measure of your test duration."

    return (
        <FadeIn className="w-full max-w-6xl mx-auto py-8 px-4" duration={0.6}>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

                {/* ── LEFT: Inputs ── */}
                <div className="lg:col-span-7 space-y-4 self-start lg:sticky lg:top-28">
                    <Card className="border border-slate-200 shadow-sm bg-white overflow-hidden rounded-2xl">
                        <CalculatorCardHeader
                            title="Test Parameters"
                            description="Enter your current conversion rate, expected improvement, and traffic details to calculate your test duration."
                            onReset={handleReset}
                            guideId="ab-guide"
                        />
                        <CardContent className="space-y-4 pt-6 px-6 pb-6">
                            <CalculatorInput
                                label="Current Conversion Rate"
                                value={baselineRate}
                                onChange={setBaselineRate}
                                placeholder="5"
                                max={100}
                                suffix="%"
                                tooltip="Out of 100 users, how many convert. Example: 5"
                            />
                            <CalculatorInput
                                label="Expected Improvement"
                                value={mde}
                                onChange={setMde}
                                placeholder="10"
                                max={1000}
                                suffix="%"
                                tooltip="How much better you expect Version B to perform. Smaller improvements need longer tests."
                            />
                            <CalculatorInput
                                label="Daily Visitors"
                                value={dailyVisitors}
                                onChange={setDailyVisitors}
                                placeholder="1000"
                                max={10000000}
                                tooltip="Number of users visiting per day. Example: 1000"
                            />
                            <CalculatorInput
                                label="Traffic Split"
                                value={trafficSplit}
                                onChange={setTrafficSplit}
                                placeholder="50"
                                max={99}
                                suffix="/ 50"
                                tooltip="How users are divided between A & B. Default: 50 / 50"
                            />
                        </CardContent>
                    </Card>
                </div>

                {/* ── RIGHT: Results ── */}
                <div className="lg:col-span-5 space-y-4">
                    <ResultSummaryCard
                        title="Test Duration"
                        isCalculated={isCalculated}
                        primaryResult={{
                            label: "RUN TEST FOR",
                            value: isCalculated ? duration : 0,
                            unit: "days",
                            key: "duration"
                        }}
                        description={insightMessage}
                        emptyMessage="Test duration"
                        secondaryResults={[
                            {
                                key: "samplePerVariant",
                                label: "Sample Size per Variant",
                                value: isCalculated ? sampleSize.toLocaleString() : "0",
                                unit: "users",
                                tooltip: "Users needed for each version (A & B)",
                                icon: Users
                            },
                            {
                                key: "totalVisitors",
                                label: "Total Visitors Needed",
                                value: isCalculated ? totalVisitorsNeeded.toLocaleString() : "0",
                                unit: "users",
                                tooltip: "Total users required (A + B)",
                                icon: Target
                            },
                            {
                                key: "dailyPerVariant",
                                label: "Daily Users per Variant",
                                value: isCalculated ? dailyPerVariant.toLocaleString() : "0",
                                unit: "users/day",
                                tooltip: "Users per version per day",
                                icon: Activity
                            }
                        ]}
                    >
                        {/* ── Test Settings Dropdown inside ResultSummaryCard ── */}
                        <div className="bg-white border border-slate-200/70 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] rounded-xl transition-all duration-200 hover:shadow-[0_4px_12px_-4px_rgba(0,0,0,0.08)] hover:border-slate-300 overflow-hidden">
                            <button
                                type="button"
                                onClick={() => setSettingsOpen(o => !o)}
                                className="w-full flex items-center justify-between p-4 text-left group"
                            >
                                <div className="flex items-center gap-2">
                                    <Settings className="w-4 h-4 text-blue-500 flex-shrink-0" />
                                    <span className="text-[13px] sm:text-[14px] font-bold text-slate-500 group-hover:text-slate-600 transition-colors">Test Settings</span>
                                </div>
                                {settingsOpen
                                    ? <ChevronUp className="w-4 h-4 text-slate-400 group-hover:text-slate-500 transition-colors" />
                                    : <ChevronDown className="w-4 h-4 text-slate-400 group-hover:text-slate-500 transition-colors" />
                                }
                            </button>

                            <div className={cn(
                                "overflow-hidden transition-all duration-300 ease-in-out",
                                settingsOpen ? "max-h-48 opacity-100" : "max-h-0 opacity-0"
                            )}>
                                <div className="px-4 pb-4 pt-1 space-y-0 border-t border-slate-100">
                                    <div className="flex justify-between items-center py-3 border-b border-slate-100">
                                        <span className="text-[13px] sm:text-[14px] font-bold text-slate-500">Confidence Level</span>
                                        <span className="text-[16px] sm:text-[17px] font-bold tracking-tight text-slate-700">95%</span>
                                    </div>
                                    <div className="flex justify-between items-center py-3">
                                        <span className="text-[13px] sm:text-[14px] font-bold text-slate-500">Statistical Power</span>
                                        <span className="text-[16px] sm:text-[17px] font-bold tracking-tight text-slate-700">80%</span>
                                    </div>
                                    <p className="text-[11.5px] text-slate-400 leading-relaxed pt-2">
                                        These are standard settings to ensure accurate and reliable test results. You don't need to change them.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </ResultSummaryCard>
                </div>

            </div>
        </FadeIn>
    )
}