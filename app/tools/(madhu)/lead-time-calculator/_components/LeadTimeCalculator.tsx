"use client"

import React, { useState, useEffect, useMemo } from "react"
import {
    Clock,
    Factory,
    Ship,
    ShieldAlert,
    Calendar,
    ChevronUp,
    ChevronDown
} from "lucide-react"
import {
    InputCardHeader,
    ActionButtons,
    MadhuSubHeader
} from "../../ToolTemplate"
import { FadeIn, Counter, ResultFeedbackCard, CalculatorInput } from "@/app/tools/_shared/components"
import { cn } from "@/lib/utils"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface LeadTimeState {
    supplier: number | ""
    shipping: number | ""
    buffer: number | ""
}

const DEFAULT_STATE: LeadTimeState = {
    supplier: "",
    shipping: "",
    buffer: ""
}



export function LeadTimeCalculator() {
    const [values, setValues] = useState<LeadTimeState>(DEFAULT_STATE)
    const [isCopying, setIsCopying] = useState(false)

    const handleInputChange = (field: keyof LeadTimeState, value: string | number) => {
        setValues(prev => ({ ...prev, [field]: value === "" ? "" : Number(value) }))
    }

    const hasInputs = useMemo(() => {
        return Object.values(values).some(v => v !== "")
    }, [values])

    const totals = useMemo(() => {
        const sup = Number(values.supplier) || 0
        const shp = Number(values.shipping) || 0
        const buf = Number(values.buffer) || 0

        const total = sup + shp + buf

        const getPct = (val: number) => total > 0 ? (val / total) * 100 : 0

        return {
            total,
            totalFormatted: total.toString(),
            supplier: sup,
            shipping: shp,
            buffer: buf,
            pct: {
                supplier: getPct(sup),
                shipping: getPct(shp),
                buffer: getPct(buf)
            }
        }
    }, [values])

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
Supplier Time: ${totals.supplier} days
Shipping Time: ${totals.shipping} days
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
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch pt-6">
                {/* Left Column: Inputs */}
                <div className="lg:col-span-7">
                    <Card className="border border-slate-200 shadow-sm bg-white overflow-hidden h-full flex flex-col rounded-3xl">
                        <InputCardHeader
                            title="Calculator Inputs"
                            subtitle="Enter your supplier and shipping details."
                            scrollId="how-to-use"
                        />

                        <CardContent className="p-8 space-y-8 flex-1 flex flex-col">
                            <div className="space-y-6">
                                <label className="text-base font-bold text-slate-400 flex items-center gap-2">
                                    Timeline Details (Days)
                                </label>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                    <CalculatorInput
                                        label="Supplier Time"
                                        value={values.supplier}
                                        onChange={(v) => handleInputChange('supplier', v)}
                                        placeholder="Supplier Time"
                                        tooltip="Total processing & production time"
                                    />
                                    <CalculatorInput
                                        label="Shipping Time"
                                        value={values.shipping}
                                        onChange={(v) => handleInputChange('shipping', v)}
                                        placeholder="Shipping Time"
                                        tooltip="Transit + Customs clearance duration"
                                    />
                                    <div className="md:col-span-2">
                                        <CalculatorInput
                                            label="Safety Buffer"
                                            value={values.buffer}
                                            onChange={(v) => handleInputChange('buffer', v)}
                                            placeholder="Safety Buffer"
                                            tooltip="Extra days for unforeseen delays"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="mt-auto pt-8 border-t border-slate-50">
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
                                    <span className="text-2xl font-medium opacity-50">Days</span>
                                </div>
                            </div>
                        }
                    >
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
                                <div className="bg-white/5 rounded-xl p-4 border border-white/5">
                                    <p className="text-xs font-bold text-slate-300 mb-1">Supplier Time</p>
                                    <p className="text-xl font-bold text-indigo-400">{hasInputs ? Math.round(totals.pct.supplier) : 0}%</p>
                                </div>
                                <div className="bg-white/5 rounded-xl p-4 border border-white/5 text-left">
                                    <p className="text-xs font-bold text-slate-300 mb-1">Shipping Time</p>
                                    <p className="text-xl font-bold text-blue-400">{hasInputs ? Math.round(totals.pct.shipping) : 0}%</p>
                                </div>
                            </div>
                        </div>
                    </ResultFeedbackCard>
                </div>
            </div>
        </div>
    )
}




