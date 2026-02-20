"use client"

import React, { useState, useMemo } from "react"
import {
    Calendar,
    Info,
    AlertCircle,
    CheckCircle2
} from "lucide-react"
import {
    InputCardHeader,
    ActionButtons
} from "../../ToolTemplate"
import { Counter, ResultFeedbackCard } from "@/app/tools/_shared/components"
import { cn } from "@/lib/utils"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface DOIState {
    currentStock: string
    salesVelocity: string
    velocityUnit: "daily" | "weekly" | "monthly"
    safetyStock: string
}

const DEFAULT_STATE: DOIState = {
    currentStock: "",
    salesVelocity: "",
    velocityUnit: "daily",
    safetyStock: ""
}

export function DaysOfInventoryCalculator() {
    const [values, setValues] = useState<DOIState>(DEFAULT_STATE)
    const [isCopying, setIsCopying] = useState(false)

    const handleInputChange = (field: keyof DOIState, value: string) => {
        if (field === "velocityUnit") {
            setValues(prev => ({ ...prev, [field]: value as any }))
            return
        }
        if (value === "" || (/^\d*\.?\d*$/.test(value) && parseFloat(value) >= 0)) {
            setValues(prev => ({ ...prev, [field]: value }))
        }
    }

    const hasInputs = useMemo(() => {
        const stock = parseFloat(values.currentStock) || 0
        const velocity = parseFloat(values.salesVelocity) || 0
        return values.currentStock !== "" && values.salesVelocity !== "" && stock > 0 && velocity > 0
    }, [values])

    const results = useMemo(() => {
        const stock = parseFloat(values.currentStock) || 0
        const velocity = parseFloat(values.salesVelocity) || 0
        const safety = parseFloat(values.safetyStock) || 0

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

    const handleCopy = async () => {
        setIsCopying(true)
        const dateString = results.runOutDate.toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        })

        const text = `
Inventory Runway Analysis:
---------------------------------------
- Current Stock: ${values.currentStock} units
- Sales Velocity: ${values.salesVelocity} units/${values.velocityUnit}
- Safety Stock Buffer: ${values.safetyStock} units

Results:
- DAYS OF INVENTORY REMAINING: ${results.daysRemaining} days
- Useable Days (excluding safety buffer): ${results.useableDays} days
- Estimated Stock-out Date: ${dateString}
- Daily Burn Rate: ${results.dailyVelocity.toFixed(2)} units/day
        `.trim()

        await navigator.clipboard.writeText(text)
        setTimeout(() => setIsCopying(false), 2000)
    }

    const getStatusColor = (status: string) => {
        switch (status) {
            case "critical": return "text-red-500 bg-red-50 border-red-100"
            case "warning": return "text-amber-500 bg-amber-50 border-amber-100"
            case "healthy": return "text-blue-500 bg-blue-50 border-blue-100"
            case "overstock": return "text-blue-500 bg-blue-50 border-blue-100"
            default: return "text-slate-400 bg-slate-50 border-slate-100"
        }
    }

    return (
        <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch pt-6">

                {/* Left Column: Smart Inputs */}
                <div className="lg:col-span-7">
                    <Card className="border border-slate-200 shadow-sm bg-white overflow-hidden h-full flex flex-col rounded-[2.5rem]">
                        <InputCardHeader
                            title="Inventory Configuration"
                            subtitle="Analyze your remaining stock runway."
                            scrollId="how-to-use"
                        />

                        <CardContent className="p-5 md:p-6 space-y-5 flex-1 flex flex-col">
                            {/* Velocity Unit Tabs */}
                            <div className="space-y-2">
                                <div className="flex items-center gap-1.5 mb-1 pl-1">
                                    <label className="text-sm font-bold text-slate-500 uppercase tracking-wider">
                                        Velocity Period
                                    </label>
                                    <TooltipProvider delayDuration={100}>
                                        <Tooltip>
                                            <TooltipTrigger asChild>
                                                <button type="button" className="text-slate-400 hover:text-blue-600 transition-colors p-0.5 mt-0.5">
                                                    <Info className="h-3.5 w-3.5" />
                                                </button>
                                            </TooltipTrigger>
                                            <TooltipContent side="top" className="max-w-[220px] text-xs bg-slate-900 text-white border-slate-800 p-3 rounded-lg">
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

                            <div className="space-y-6">
                                <DOIInput
                                    label="Current Stock on Hand"
                                    value={values.currentStock}
                                    onChange={(v) => handleInputChange('currentStock', v)}
                                    placeholder="Ex: 5000"
                                    tooltip="The total number of units physically available in your warehouse today."
                                />
                                <DOIInput
                                    label={`Sales Speed (Units per ${values.velocityUnit.replace('ly', 'y')})`}
                                    value={values.salesVelocity}
                                    onChange={(v) => handleInputChange('salesVelocity', v)}
                                    placeholder="Ex: 150"
                                    tooltip={`Average number of units sold every ${values.velocityUnit.replace('ly', '')}.`}
                                />
                                <DOIInput
                                    label="Safety Stock Buffer"
                                    value={values.safetyStock}
                                    onChange={(v) => handleInputChange('safetyStock', v)}
                                    placeholder="Ex: 0 (optional)"
                                    tooltip="Units you wish to keep as emergency backup (will be excluded from 'Useable Days')."
                                />
                            </div>

                            <div className="pt-1.5 border-t border-slate-50">
                                <ActionButtons
                                    onReset={handleReset}
                                    onCopy={handleCopy}
                                    copyDisabled={!hasInputs || isCopying}
                                    isCopied={isCopying}
                                />
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Right Column: Results */}
                <div className="lg:col-span-5 space-y-6 flex flex-col">
                    <ResultFeedbackCard
                        title="TOTAL INVENTORY RUNWAY"
                        titleLabel="Days Remaining"
                        className="flex-shrink-0"
                        mainValue={
                            <div className="flex flex-col">
                                <div className="flex items-baseline gap-2">
                                    <Counter value={results.daysRemaining} />
                                    <span className="text-2xl font-medium opacity-50">Days</span>
                                </div>
                                {hasInputs && (
                                    <div className={`flex items-center gap-2 mt-4 px-3 py-1.5 rounded-xl border w-fit font-bold text-xs uppercase tracking-wider ${getStatusColor(results.status)}`}>
                                        {results.status === "critical" ? (
                                            <AlertCircle className="w-3.5 h-3.5" />
                                        ) : (
                                            <CheckCircle2 className="w-3.5 h-3.5" />
                                        )}
                                        {results.status} Stock Level
                                    </div>
                                )}
                            </div>
                        }
                    >
                        <div className="space-y-6">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-blue-500/20 rounded-xl flex items-center justify-center border border-blue-500/30">
                                    <Calendar className="w-5 h-5 text-blue-400" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest">Est. Stock-Out Date</p>
                                    <p className={cn(
                                        "text-base font-bold truncate transition-colors",
                                        hasInputs ? "text-white" : "text-slate-600"
                                    )}>
                                        {hasInputs ? results.runOutDate.toLocaleDateString('en-US', {
                                            weekday: 'long',
                                            month: 'long',
                                            day: 'numeric',
                                            year: 'numeric'
                                        }) : "Waiting for inputs..."}
                                    </p>
                                </div>
                            </div>

                            {/* Useable Days vs Buffer */}
                            <div className="bg-white/5 p-3 rounded-2xl border border-white/5">
                                <p className="text-slate-400 text-sm font-semibold mb-1">Net Useable Runway</p>
                                <p className="text-sm font-medium text-slate-200 leading-relaxed">
                                    You have <span className="text-blue-400 font-bold">{hasInputs ? results.useableDays : 0} days</span> of stock remaining before hitting your <span className="text-slate-400">safety buffer</span>.
                                </p>
                            </div>
                        </div>
                    </ResultFeedbackCard>
                </div>
            </div>
        </div>
    )
}

function DOIInput({
    label,
    value,
    onChange,
    tooltip,
    placeholder
}: {
    label: string,
    value: string,
    onChange: (v: string) => void,
    tooltip: string,
    placeholder: string
}) {
    return (
        <div className="space-y-2 group/input">
            <div className="flex items-center gap-1.5 mb-1 pl-1">
                <label className="text-sm font-bold text-slate-600 group-focus-within/input:text-blue-600 transition-colors">
                    {label}
                </label>
                <TooltipProvider delayDuration={100}>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <button className="text-slate-400 hover:text-blue-600 transition-colors p-0.5 mt-0.5">
                                <Info className="h-3.5 w-3.5" />
                            </button>
                        </TooltipTrigger>
                        <TooltipContent side="top" className="text-[10px] bg-slate-900 text-white border-slate-800 p-2 max-w-[200px]">
                            {tooltip}
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            </div>

            <div className="relative group">
                <input
                    type="text"
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    className={cn(
                        "h-10 w-full text-base border-2 border-slate-200 bg-white rounded-xl hover:border-blue-600 focus:border-blue-600 focus:ring-4 focus:ring-blue-600/5 transition-all font-bold text-slate-900 focus:outline-none placeholder:text-slate-300 placeholder:font-normal placeholder:italic px-5 shrink-0"
                    )}
                    placeholder={placeholder}
                />
            </div>
        </div>
    )
}
