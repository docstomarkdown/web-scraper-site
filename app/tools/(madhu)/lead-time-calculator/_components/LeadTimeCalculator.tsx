"use client"

import React, { useState, useEffect, useMemo } from "react"
import {
    Clock,
    Factory,
    Ship,
    FileCheck,
    ShieldAlert,
    Calendar,
    TrendingUp,
    Package,
    Globe,
    AlertCircle,
    Info,
    Truck,
    ChevronUp,
    ChevronDown,
    HelpCircle
} from "lucide-react"
import {
    InputCardHeader,
    ActionButtons,
    MadhuSubHeader
} from "../../ToolTemplate"
import { FadeIn, Counter, ResultFeedbackCard } from "@/app/tools/_shared/components"
import { cn } from "@/lib/utils"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface LeadTimeState {
    processing: string
    production: string
    customs: string
    shipping: string
    buffer: string
}

const DEFAULT_STATE: LeadTimeState = {
    processing: "",
    production: "",
    customs: "",
    shipping: "",
    buffer: ""
}

type TimeUnit = "days" | "weeks"

export function LeadTimeCalculator() {
    const [values, setValues] = useState<LeadTimeState>(DEFAULT_STATE)
    const [unit, setUnit] = useState<TimeUnit>("days")
    const [isCopying, setIsCopying] = useState(false)

    const handleInputChange = (field: keyof LeadTimeState, value: string) => {
        if (value === "" || (/^\d*\.?\d*$/.test(value) && parseFloat(value) >= 0)) {
            setValues(prev => ({ ...prev, [field]: value }))
        }
    }

    const hasInputs = useMemo(() => {
        return Object.values(values).some(v => v !== "")
    }, [values])

    const totals = useMemo(() => {
        const factor = unit === "weeks" ? 7 : 1

        const p = (parseFloat(values.processing) || 0) * factor
        const m = (parseFloat(values.production) || 0) * factor
        const c = (parseFloat(values.customs) || 0) * factor
        const s = (parseFloat(values.shipping) || 0) * factor
        const b = (parseFloat(values.buffer) || 0) * factor

        const total = p + m + c + s + b

        const getPct = (val: number) => total > 0 ? (val / total) * 100 : 0

        return {
            total,
            totalFormatted: unit === "weeks" ? (total / 7).toFixed(1) : total.toString(),
            processing: p,
            production: m,
            customs: c,
            shipping: s,
            buffer: b,
            pct: {
                processing: getPct(p),
                production: getPct(m),
                customs: getPct(c),
                shipping: getPct(s),
                buffer: getPct(b)
            }
        }
    }, [values, unit])

    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    const deliveryDate = useMemo(() => {
        if (!mounted || !hasInputs) return "Waiting for inputs..."
        const date = new Date()
        date.setDate(date.getDate() + totals.total)
        return date.toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        })
    }, [totals.total, mounted, hasInputs])

    const handleReset = () => setValues(DEFAULT_STATE)

    const handleCopy = async () => {
        setIsCopying(true)
        const text = `
Lead Time Calculation Results:
------------------------------
Order Processing: ${totals.processing} days
Production Time: ${totals.production} days
Customs Clearance: ${totals.customs} days
Shipping Transit: ${totals.shipping} days
Safety Buffer: ${totals.buffer} days
------------------------------
Total Lead Time: ${totals.total} days
Estimated Delivery Date: ${deliveryDate}
        `.trim()

        await navigator.clipboard.writeText(text)
        setTimeout(() => setIsCopying(false), 2000)
    }

    return (
        <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
                {/* Left Column: Inputs */}
                <div className="lg:col-span-7">
                    <Card className="border border-slate-200 shadow-sm bg-white overflow-hidden h-full flex flex-col rounded-3xl">
                        <InputCardHeader
                            title="Calculator Inputs"
                            subtitle="Enter timeline data to calculate total lead time."
                            onHelpClick={() => { }}
                        />

                        <CardContent className="p-8 space-y-8 flex-1 flex flex-col">
                            {/* Unit Switcher */}
                            <div className="flex bg-slate-100 p-1 rounded-xl border border-slate-200 w-full mb-2">
                                <button
                                    onClick={() => setUnit("days")}
                                    className={cn(
                                        "flex-1 px-3 py-2 rounded-lg text-xs font-bold transition-all uppercase",
                                        unit === "days" ? "bg-white text-blue-600 shadow-sm border border-blue-200" : "text-slate-500 hover:text-slate-900"
                                    )}
                                >
                                    Days
                                </button>
                                <button
                                    onClick={() => setUnit("weeks")}
                                    className={cn(
                                        "flex-1 px-3 py-2 rounded-lg text-xs font-bold transition-all uppercase",
                                        unit === "weeks" ? "bg-white text-blue-600 shadow-sm border border-blue-200" : "text-slate-500 hover:text-slate-900"
                                    )}
                                >
                                    Weeks
                                </button>
                            </div>

                            <div className="space-y-6">
                                <label className="text-base font-bold text-slate-400 flex items-center gap-2">
                                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
                                    Timeline Details ({unit})
                                </label>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                    <LeadTimeInput
                                        id="processing"
                                        label="Processing"
                                        value={values.processing}
                                        unit={unit}
                                        onChange={(v) => handleInputChange('processing', v)}
                                        icon={Package}
                                        tooltip="Order prep & admin time"
                                    />
                                    <LeadTimeInput
                                        id="production"
                                        label="Production"
                                        value={values.production}
                                        unit={unit}
                                        onChange={(v) => handleInputChange('production', v)}
                                        icon={Factory}
                                        tooltip="Manufacturing duration"
                                    />
                                    <LeadTimeInput
                                        id="customs"
                                        label="Customs"
                                        value={values.customs}
                                        unit={unit}
                                        onChange={(v) => handleInputChange('customs', v)}
                                        icon={FileCheck}
                                        tooltip="Customs & Export time"
                                    />
                                    <LeadTimeInput
                                        id="shipping"
                                        label="Shipping"
                                        value={values.shipping}
                                        unit={unit}
                                        onChange={(v) => handleInputChange('shipping', v)}
                                        icon={Ship}
                                        tooltip="Transit time on water/air"
                                    />
                                    <div className="md:col-span-2">
                                        <LeadTimeInput
                                            id="buffer"
                                            label="Safety Buffer"
                                            value={values.buffer}
                                            unit={unit}
                                            onChange={(v) => handleInputChange('buffer', v)}
                                            icon={ShieldAlert}
                                            tooltip="Extra days for delays"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="mt-auto pt-8 border-t border-slate-50">
                                <ActionButtons
                                    onReset={handleReset}
                                    onCopy={handleCopy}
                                    copyDisabled={!hasInputs || isCopying}
                                />
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Right Column: Results */}
                <div className="lg:col-span-5 flex flex-col space-y-8">
                    {/* Primary Result Card */}
                    <ResultFeedbackCard
                        title="TOTAL LEAD TIME"
                        titleLabel="Live Calculation"
                        mainValue={
                            <div className="flex flex-col">
                                <div className="flex items-baseline gap-2">
                                    <Counter
                                        value={parseFloat(totals.totalFormatted)}
                                    />
                                    <span className="text-lg font-medium opacity-50 uppercase">{unit}</span>
                                </div>
                                <p className="text-xs font-medium tracking-wider text-slate-400 mt-1 uppercase">
                                    {unit === "weeks" ? `${totals.total} total days` : "Total cycle duration"}
                                </p>
                            </div>
                        }
                    >
                        <div className="h-px bg-white/10 w-full mt-6 mb-6" />

                        <div className="space-y-4">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-blue-500/20 rounded-xl flex items-center justify-center border border-blue-500/30">
                                    <Calendar className="w-5 h-5 text-blue-400" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest">Est. Delivery Date</p>
                                    <p className="text-base font-bold text-white truncate">{deliveryDate}</p>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4 pt-2">
                                <div className="bg-white/5 rounded-xl p-3 border border-white/5">
                                    <p className="text-[9px] font-bold text-slate-500 uppercase tracking-tighter mb-1">Production Ratio</p>
                                    <p className="text-sm font-bold text-indigo-400">{Math.round(totals.pct.production)}%</p>
                                </div>
                                <div className="bg-white/5 rounded-xl p-3 border border-white/5">
                                    <p className="text-[9px] font-bold text-slate-500 uppercase tracking-tighter mb-1">Transit Ratio</p>
                                    <p className="text-sm font-bold text-emerald-400">{Math.round(totals.pct.shipping)}%</p>
                                </div>
                            </div>
                        </div>
                    </ResultFeedbackCard>

                    {/* Analysis Section */}
                    <div className="space-y-4 flex-1 flex flex-col">
                        <div className="flex items-center gap-2 px-1">
                            <div className="p-1.5 bg-slate-100 rounded-lg text-slate-600">
                                <TrendingUp className="w-4 h-4" />
                            </div>
                            <h3 className="text-lg font-bold text-slate-900 font-sans">Strategic Restock Analysis</h3>
                        </div>

                        <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-4 relative overflow-hidden group flex-1 flex flex-col">
                            {hasInputs ? (
                                <div className="space-y-6">
                                    <div className="space-y-1 pt-2">
                                        <div className="flex items-center justify-between">
                                            <span className="text-xs font-medium text-slate-400 tracking-wide uppercase">Current Risk Level</span>
                                            <div className={cn(
                                                "px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider",
                                                totals.buffer < 5 ? "bg-red-50 text-red-600" : "bg-emerald-50 text-emerald-600"
                                            )}>
                                                {totals.buffer < 5 ? "Critical" : "Stable"}
                                            </div>
                                        </div>
                                        <h4 className="text-xl font-bold text-slate-900 tracking-tight leading-none pt-2">
                                            {totals.total > 45 ? "Long-Cycle Cargo" : "Normal Velocity"}
                                        </h4>
                                    </div>

                                    <div className="h-px bg-slate-100 w-full" />

                                    <div className="grid grid-cols-1 gap-4">
                                        <InsightRow
                                            label="Shipping Mode"
                                            value={totals.shipping > 21 ? "Sea Freight is Cost-Effective" : "Air Freight for Velocity"}
                                            icon={Globe}
                                        />
                                        <InsightRow
                                            label="Restock Trigger"
                                            value={`Order when stock hits ${Math.ceil(totals.total / 10)} days left`}
                                            icon={ShieldAlert}
                                        />
                                        <InsightRow
                                            label="Working Days"
                                            value={`${Math.ceil(totals.total * 0.7)} Production Days`}
                                            icon={Clock}
                                        />
                                    </div>

                                    {totals.buffer === 0 && (
                                        <div className="bg-orange-50 p-4 rounded-2xl border border-orange-100 flex gap-3 items-start mt-4">
                                            <AlertCircle className="w-5 h-5 text-orange-600 flex-shrink-0 mt-0.5" />
                                            <p className="text-xs font-medium text-orange-800 leading-relaxed">
                                                Zero buffer detected. Most sellers account for 15% unexpected delays at ports or during QC.
                                            </p>
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <>
                                    <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:16px_16px]" />

                                    <div className="relative z-0 space-y-8 blur-[1.5px] opacity-[0.1] select-none pointer-events-none">
                                        <div className="space-y-3 pt-4">
                                            <div className="h-3 w-24 bg-slate-400 rounded-full" />
                                            <div className="h-8 w-48 bg-slate-500 rounded-lg" />
                                        </div>
                                        <div className="h-px bg-slate-200 w-full" />
                                        <div className="space-y-4">
                                            {[1, 2, 3].map(i => (
                                                <div key={i} className="flex gap-4 items-center">
                                                    <div className="w-8 h-8 rounded-lg bg-slate-300" />
                                                    <div className="space-y-2">
                                                        <div className="h-2 w-20 bg-slate-400 rounded-full" />
                                                        <div className="h-2 w-32 bg-slate-300 rounded-full" />
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="absolute inset-0 flex items-center justify-center p-6">
                                        <div className="bg-white p-8 rounded-[2rem] shadow-2xl shadow-blue-900/10 border border-slate-100 text-center space-y-4 transform transition-all duration-500 group-hover:scale-[1.02] max-w-[260px]">
                                            <div className="w-16 h-16 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl flex items-center justify-center text-blue-500 mx-auto shadow-inner border border-white">
                                                <Truck className="w-8 h-8 animate-pulse text-blue-600" />
                                            </div>
                                            <div className="space-y-2">
                                                <h4 className="text-lg font-bold text-slate-900 tracking-tight">Unlock Insights</h4>
                                                <p className="text-xs text-slate-500 leading-relaxed font-medium">
                                                    Enter timeline data to see <strong>restock risks</strong>, shipping strategies & date predictions.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

function LeadTimeInput({
    id,
    label,
    value,
    unit,
    onChange,
    icon: Icon,
    tooltip
}: {
    id: string,
    label: string,
    value: string,
    unit: string,
    onChange: (v: string) => void,
    icon: any,
    tooltip: string
}) {
    return (
        <div className="space-y-2 group/input">
            <div className="relative group">
                <label className={cn(
                    "absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 italic font-medium transition-all pointer-events-none z-10",
                    value !== "" && "opacity-0 -translate-x-2"
                )}>
                    {label}
                </label>

                <TooltipProvider delayDuration={100}>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <input
                                type="text"
                                value={value}
                                onChange={(e) => onChange(e.target.value)}
                                className="h-14 w-full text-lg border-2 border-slate-200 bg-white rounded-xl pl-5 pr-12 hover:border-blue-600 focus:border-blue-600 focus:ring-4 focus:ring-blue-600/5 transition-all font-bold text-slate-900 focus:outline-none"
                                placeholder=""
                            />
                        </TooltipTrigger>
                        <TooltipContent side="top" className="text-xs bg-slate-900 text-white border-slate-800 p-2 rounded-lg">
                            {tooltip}
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>

                <div className="absolute right-0 top-0 bottom-0 flex flex-col border-l border-slate-200 bg-slate-50/50 rounded-r-xl overflow-hidden">
                    <button
                        onClick={() => onChange((parseFloat(value || "0") + 1).toString())}
                        className="flex items-center justify-center px-2 flex-1 hover:bg-blue-50 hover:text-blue-600 text-slate-400 transition-all border-b border-slate-100"
                    >
                        <ChevronUp className="h-3.5 w-3.5" />
                    </button>
                    <button
                        onClick={() => onChange(Math.max(0, (parseFloat(value || "0") - 1)).toString())}
                        className="flex items-center justify-center px-2 flex-1 hover:bg-red-50 hover:text-red-600 text-slate-400 transition-all"
                    >
                        <ChevronDown className="h-3.5 w-3.5" />
                    </button>
                </div>
            </div>
        </div>
    )
}

function InsightRow({ label, value, icon: Icon }: { label: string, value: string, icon: any }) {
    return (
        <div className="flex items-center gap-4 bg-slate-50 p-3.5 rounded-2xl border border-slate-100 hover:border-blue-200 hover:bg-white transition-all group/row">
            <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-slate-400 border border-slate-200 group-hover/row:border-blue-100 group-hover/row:text-blue-500 transition-all">
                <Icon className="w-5 h-5" />
            </div>
            <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none mb-1">{label}</p>
                <p className="text-sm font-bold text-slate-700">{value}</p>
            </div>
        </div>
    )
}
