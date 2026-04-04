"use client"

import React, { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Users, Target, Activity, Settings, ChevronDown, ChevronUp, Calendar, Info } from "lucide-react"
import { FadeIn, CalculatorInput, ResultSummaryCard, CalculatorCardHeader } from "@/app/tools/_shared/components"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
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
            ? "Your traffic is sufficient for a reliable test"
            : "Low traffic — test will take longer")
        : "Estimate how long your experiment should run."

    const estimatedEndDate = isCalculated
        ? new Date(Date.now() + duration * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
        : "—"

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
                                groupingTitle="Test Configuration"
                                groupingIcon={Target}
                                label="Daily Visitors"
                                value={dailyVisitors}
                                onChange={setDailyVisitors}
                                placeholder="1000"
                                max={10000000}
                                tooltip="How many users visit your page per day."
                            />
                            <CalculatorInput
                                label="Current Conversion Rate (%)"
                                value={baselineRate}
                                onChange={setBaselineRate}
                                placeholder="5"
                                max={100}
                                suffix="%"
                                tooltip="Your existing conversion rate. Example: if 5 out of 100 visitors convert, enter 5%."
                            />
                            <CalculatorInput
                                label="Expected Improvement (%)"
                                value={mde}
                                onChange={setMde}
                                placeholder="10"
                                max={1000}
                                suffix="%"
                                tooltip="The minimum uplift you want to detect—example: enter 10% if you expect your test version to convert 10% better."
                            />
                            <CalculatorInput
                                label="Traffic Split"
                                isOptional={true}
                                value={trafficSplit}
                                onChange={setTrafficSplit}
                                placeholder="50"
                                max={99}
                                suffix="/ 50"
                                tooltip="How you divide visitors between Variant A and B (default: 50/50)."
                            />
                        </CardContent>
                    </Card>
                </div>

                {/* ── RIGHT: Results ── */}
                <div className="lg:col-span-5 space-y-4">
                    <ResultSummaryCard
                        title="Test Results"
                        isCalculated={isCalculated}
                        liveBadgeText={
                            duration < 7 ? "Too Short" : duration > 30 ? "Check Risk" : "Optimal"
                        }
                        liveBadgeColor={
                            duration < 7 ? "amber" : duration > 30 ? "rose" : "emerald"
                        }
                        primaryResult={{
                            label: "REQUIRED TEST DURATION",
                            value: isCalculated ? `Run your test for: ${duration} days` : "—",
                            unit: "",
                            key: "duration"
                        }}
                        description={insightMessage}
                        emptyMessage="Test duration"
                        secondaryResults={[
                            {
                                key: "totalVisitors",
                                label: "Total Visitors Needed",
                                value: isCalculated ? totalVisitorsNeeded.toLocaleString() : "0",
                                unit: "users",
                                tooltip: "The total sample size required for a trustworthy result.",
                                icon: Target
                            },
                            {
                                key: "samplePerVariant",
                                label: "Visitors Needed Per Variant",
                                value: isCalculated ? sampleSize.toLocaleString() : "0",
                                unit: "users",
                                tooltip: "Minimum number of visitors required for Variant A and Variant B.",
                                icon: Users
                            },
                            {
                                key: "estimatedEndDate",
                                label: "Estimated End Date",
                                value: estimatedEndDate,
                                unit: "",
                                tooltip: "Based on today’s date and the calculated duration.",
                                icon: Calendar
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
                                <div className="flex items-center gap-2 flex-1">
                                    <Settings className="w-4 h-4 text-blue-500 flex-shrink-0" />
                                    <span className="text-[13px] sm:text-[14px] font-bold text-slate-500 group-hover:text-slate-600 transition-colors flex-1 text-left tracking-tight">
                                        Test Settings
                                        <span className="ml-1.5 font-normal italic text-[12px] text-slate-400 lowercase tracking-normal group-hover:text-blue-400/80 transition-colors">(optional)</span>
                                    </span>
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
                                    <TooltipProvider delayDuration={100}>
                                        <div className="flex justify-between items-center py-3 border-b border-slate-100 group/item">
                                            <div className="flex items-center gap-1.5">
                                                <span className="text-[13px] sm:text-[14px] font-bold text-slate-500">Confidence Level</span>
                                                <Tooltip>
                                                    <TooltipTrigger asChild>
                                                        <Info className="w-3.5 h-3.5 text-slate-400 cursor-help" />
                                                    </TooltipTrigger>
                                                    <TooltipContent side="top" className="max-w-xs text-[11px] bg-slate-900 text-white border-slate-800">
                                                        Higher confidence means more reliable results but needs more time (default: 95%).
                                                    </TooltipContent>
                                                </Tooltip>
                                            </div>
                                            <span className="text-[16px] sm:text-[17px] font-bold tracking-tight text-slate-700">95%</span>
                                        </div>
                                        <div className="flex justify-between items-center py-3 group/item">
                                            <div className="flex items-center gap-1.5">
                                                <span className="text-[13px] sm:text-[14px] font-bold text-slate-500">Statistical Power</span>
                                                <Tooltip>
                                                    <TooltipTrigger asChild>
                                                        <Info className="w-3.5 h-3.5 text-slate-400 cursor-help" />
                                                    </TooltipTrigger>
                                                    <TooltipContent side="top" className="max-w-xs text-[11px] bg-slate-900 text-white border-slate-800">
                                                        Power determines how likely your test is to detect a real difference (default: 80%).
                                                    </TooltipContent>
                                                </Tooltip>
                                            </div>
                                            <span className="text-[16px] sm:text-[17px] font-bold tracking-tight text-slate-700">80%</span>
                                        </div>
                                    </TooltipProvider>
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