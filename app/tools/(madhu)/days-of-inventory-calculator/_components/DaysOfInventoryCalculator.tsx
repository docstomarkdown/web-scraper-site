"use client"
import React, { useState, useMemo } from "react"
import {
    Calendar,
    Info,
    AlertCircle,
    CheckCircle2,
    Package
} from "lucide-react"
import { ResultDateCard, CalculatorInput, CalculatorCardHeader, FadeIn } from "@/app/tools/_shared/components"
import { cn } from "@/lib/utils"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface DOIState {
    currentStock: string | number
    salesVelocity: string | number
    velocityUnit: "daily" | "weekly" | "monthly"
    safetyStock: string | number
}

const DEFAULT_STATE: DOIState = {
    currentStock: "",
    salesVelocity: "",
    velocityUnit: "daily",
    safetyStock: ""
}

export function DaysOfInventoryCalculator() {
    const [values, setValues] = useState<DOIState>(DEFAULT_STATE)

    const handleInputChange = (field: keyof DOIState, value: string | number) => {
        if (field === "velocityUnit") {
            setValues(prev => ({ ...prev, [field]: value as any }))
            return
        }
        setValues(prev => ({ ...prev, [field]: value === "" ? "" : value.toString() }))
    }

    const hasInputs = useMemo(() => {
        const stock = Number(values.currentStock) || 0
        const velocity = Number(values.salesVelocity) || 0
        return values.currentStock !== "" && values.salesVelocity !== "" && stock > 0 && velocity > 0
    }, [values])

    const results = useMemo(() => {
        const stock = Number(values.currentStock) || 0
        const velocity = Number(values.salesVelocity) || 0
        const safety = Number(values.safetyStock) || 0
        if (stock === 0 || velocity === 0) return {
            dailyVelocity: 0,
            daysRemaining: 0,
            useableDays: 0,
            runOutDate: new Date(),
            status: "waiting" as const
        }
        let dailyVelocity = velocity
        if (values.velocityUnit === "weekly") dailyVelocity = velocity / 7
        if (values.velocityUnit === "monthly") dailyVelocity = velocity / 30
        const totalDaysRemaining = stock / dailyVelocity
        const useableStock = Math.max(0, stock - safety)
        const useableDays = useableStock / dailyVelocity
        const runOutDate = new Date()
        runOutDate.setDate(runOutDate.getDate() + totalDaysRemaining)
        let status: "critical" | "warning" | "healthy" | "overstock" = "healthy"
        if (totalDaysRemaining < 7) status = "critical"
        else if (totalDaysRemaining < 21) status = "warning"
        else if (totalDaysRemaining > 90) status = "overstock"
        return {
            dailyVelocity,
            daysRemaining: Math.floor(totalDaysRemaining),
            useableDays: Math.floor(useableDays),
            runOutDate,
            status
        }
    }, [values])

    const handleReset = () => setValues(DEFAULT_STATE)

    const getStatusBadgeConfig = (status: string) => {
        if (!hasInputs) return undefined
        switch (status) {
            case "critical": return {
                text: "Critical",
                icon: <AlertCircle className="w-3.5 h-3.5 text-red-600" />,
                bgClass: "bg-red-50",
                textClass: "text-red-600",
                borderClass: "border-red-200"
            }
            case "warning": return {
                text: "Warning",
                icon: <CheckCircle2 className="w-3.5 h-3.5 text-amber-600" />,
                bgClass: "bg-amber-50",
                textClass: "text-amber-600",
                borderClass: "border-amber-200"
            }
            case "healthy": return {
                text: "Healthy",
                icon: <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />,
                bgClass: "bg-emerald-50",
                textClass: "text-emerald-600",
                borderClass: "border-emerald-200"
            }
            case "overstock": return {
                text: "Overstock",
                icon: <CheckCircle2 className="w-3.5 h-3.5 text-blue-600" />,
                bgClass: "bg-blue-50",
                textClass: "text-blue-600",
                borderClass: "border-blue-200"
            }
            default: return undefined
        }
    }

    const formattedRunOutDate = results.runOutDate.toLocaleDateString("en-US", {
        weekday: "long",
        month: "long",
        day: "numeric",
        year: "numeric",
    })

    return (
        <FadeIn className="max-w-6xl mx-auto" duration={0.6}>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch pt-6">
                {/* Left Column: Smart Inputs */}
                <div className="lg:col-span-7">
                    <Card className="border border-slate-200 shadow-sm bg-white overflow-hidden h-full flex flex-col rounded-[2.5rem]">
                        <CalculatorCardHeader
                            title="Inventory Configuration"
                            description="Analyze your remaining stock runway."
                            guideId="how-to-use"
                            onReset={handleReset}
                        />
                        <CardContent className="p-6 md:p-8 pb-12 md:pb-16 space-y-8 flex-1 flex flex-col">
                            {/* Velocity Unit Tabs */}
                            <div
                                className={cn(
                                    "max-w-[520px] mx-auto w-full relative calculator-input-row",
                                    "px-3 sm:px-5"
                                )}
                                data-has-title="true"
                            >
                                <div className="relative w-full">
                                    {/* Group Header */}
                                    <div className="flex items-center gap-2 -ml-[33px] mb-2.5 relative h-7">
                                        <div className="w-7 h-7 rounded-lg bg-blue-50 ring-[6px] ring-white flex items-center justify-center flex-shrink-0 z-10">
                                            <Calendar className="w-3.5 h-3.5 text-blue-600" />
                                        </div>
                                        <span className="text-[16px] font-bold text-slate-600 capitalize z-10 tracking-tight">
                                            Velocity Period
                                        </span>
                                        <TooltipProvider delayDuration={100}>
                                            <Tooltip>
                                                <TooltipTrigger asChild>
                                                    <button type="button" tabIndex={-1} className="text-slate-400 hover:text-blue-600 transition-colors cursor-help shrink-0">
                                                        <Info className="h-3.5 w-3.5" />
                                                    </button>
                                                </TooltipTrigger>
                                                <TooltipContent side="top" className="max-w-[220px] text-[13px] font-normal bg-slate-900 text-white border-slate-800 p-3 rounded-lg">
                                                    <p className="font-semibold mb-1.5">Select your sales tracking period:</p>
                                                    <div className="text-slate-300 text-[11px] leading-relaxed space-y-1">
                                                        <p><span className="text-blue-400 font-semibold">Daily</span> if you track sales every day</p>
                                                        <p><span className="text-blue-400 font-semibold">Weekly</span> for weekly reports</p>
                                                        <p><span className="text-blue-400 font-semibold">Monthly</span> for monthly data</p>
                                                    </div>
                                                </TooltipContent>
                                            </Tooltip>
                                        </TooltipProvider>
                                    </div>
                                    <div className="w-full relative z-10">
                                        <Tabs
                                            value={values.velocityUnit}
                                            onValueChange={(v) => handleInputChange('velocityUnit', v)}
                                            className="w-full"
                                        >
                                            <TabsList className="grid w-full grid-cols-3 h-10 bg-slate-100/50 p-1 rounded-xl border border-slate-200/50">
                                                <TabsTrigger
                                                    value="daily"
                                                    className="rounded-xl font-bold data-[state=active]:bg-white data-[state=active]:text-blue-600 data-[state=active]:shadow-sm transition-all"
                                                >
                                                    Daily
                                                </TabsTrigger>
                                                <TabsTrigger
                                                    value="weekly"
                                                    className="rounded-xl font-bold data-[state=active]:bg-white data-[state=active]:text-blue-600 data-[state=active]:shadow-sm transition-all"
                                                >
                                                    Weekly
                                                </TabsTrigger>
                                                <TabsTrigger
                                                    value="monthly"
                                                    className="rounded-xl font-bold data-[state=active]:bg-white data-[state=active]:text-blue-600 data-[state=active]:shadow-sm transition-all"
                                                >
                                                    Monthly
                                                </TabsTrigger>
                                            </TabsList>
                                        </Tabs>
                                    </div>
                                </div>
                            </div>
                            {/* ── Inputs Section ── */}
                            <div className="space-y-3">
                                <CalculatorInput
                                    hideSeparator={true}
                                    label="Total Current Stock"
                                    value={values.currentStock}
                                    onChange={(v) => handleInputChange('currentStock', v)}
                                    placeholder="5000"
                                    tooltip="The total number of units physically available in your warehouse today."
                                    groupingTitle="Stock & Sales Details"
                                    groupingIcon={Package}
                                />
                                <CalculatorInput
                                    label={`Average Sales Speed (Units per ${values.velocityUnit === "daily" ? "day" : values.velocityUnit === "weekly" ? "week" : "month"})`}
                                    labelClassName="whitespace-nowrap"
                                    value={values.salesVelocity}
                                    onChange={(v) => handleInputChange('salesVelocity', v)}
                                    placeholder="150"
                                    tooltip={`Average number of units sold every ${values.velocityUnit === "daily" ? "day" : values.velocityUnit === "weekly" ? "week" : "month"}.`}
                                />
                                <CalculatorInput
                                    label="Safety Buffer Units"
                                    value={values.safetyStock}
                                    onChange={(v) => handleInputChange('safetyStock', v)}
                                    placeholder="0"
                                    tooltip="Units you wish to keep as emergency backup (will be excluded from 'Useable Days')."
                                    isOptional={true}
                                />
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Right Column: Results */}
                <div className="lg:col-span-5 space-y-3 flex flex-col">
                    <ResultDateCard
                        title="Days of Inventory Remaining"
                        primaryResult={{
                            value: results.daysRemaining,
                            unit: "Days",
                            label: "Days of Inventory Remaining",
                        }}
                        dateSection={{
                            icon: <Calendar className="w-5 h-5 text-blue-500" />,
                            label: "Expected Stock-Out Date",
                            value: formattedRunOutDate,
                            emptyText: "Waiting for inputs...",
                        }}
                        infoCard={{
                            title: "Actionable Stock Runway",
                            children: (
                                <p className="text-sm font-medium text-slate-600 leading-relaxed">
                                    You have{" "}
                                    <span className="text-blue-500 font-bold">
                                        {hasInputs ? results.useableDays : 0} days
                                    </span>{" "}
                                    of stock remaining before hitting your safety buffer
                                </p>
                            ),
                        }}
                        isCalculated={hasInputs}
                        emptyResultLabel="Days of Inventory"
                        className="flex-shrink-0"
                        customBadge={getStatusBadgeConfig(results.status)}
                        checklistItems={[
                            { label: 'Total Current Stock', isComplete: values.currentStock !== "" && Number(values.currentStock) > 0 },
                            { label: 'Avg. Sales Speed', isComplete: values.salesVelocity !== "" && Number(values.salesVelocity) > 0 }
                        ]}
                    />
                </div>
            </div>
        </FadeIn>
    )
}
