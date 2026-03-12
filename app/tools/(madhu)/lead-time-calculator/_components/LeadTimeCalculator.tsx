"use client"
import React, { useState, useEffect, useMemo } from "react"
import {
    Clock
} from "lucide-react"

import { 
    FadeIn, 
    CalculatorInput,
    CalculatorCardHeader,
    ResultDateCard 
} from "@/app/tools/_shared/components"
import { cn } from "@/lib/utils"
import { Card, CardContent } from "@/components/ui/card"

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
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    const handleInputChange = (field: keyof LeadTimeState, value: string | number) => {
        setValues(prev => ({ ...prev, [field]: value === "" ? "" : Number(value) }))
    }

    const hasInputs = useMemo(() => {
        return values.supplier !== "" && values.shipping !== ""
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

    const deliveryDate = useMemo(() => {
        if (!mounted || totals.total === 0) return "Waiting for inputs..."
        const date = new Date()
        date.setDate(date.getDate() + totals.total)
        return date.toLocaleDateString('en-US', {
            weekday: 'short',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        })
    }, [totals.total, mounted])

    const handleReset = () => setValues(DEFAULT_STATE)

    return (
        <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start pt-6">
                {/* Left Column: Inputs */}
                <div className="lg:col-span-7">
                    <Card className="border border-slate-200 shadow-sm bg-white overflow-hidden flex flex-col rounded-3xl">
                        <CalculatorCardHeader
                            title="Calculator Inputs"
                            description="Enter your supplier timeline details below."
                            onReset={handleReset}
                        />
                        <CardContent className="p-6 md:p-8 pb-12 md:pb-16 flex-1 flex flex-col">
                            
                            <div className="space-y-3">
                                <CalculatorInput
                                    label="Supplier Time"
                                    value={values.supplier}
                                    onChange={(v) => handleInputChange('supplier', v)}
                                    placeholder="14"
                                    tooltip="Total processing & production time"
                                />
                                <CalculatorInput
                                    label="Shipping Time"
                                    value={values.shipping}
                                    onChange={(v) => handleInputChange('shipping', v)}
                                    placeholder="7"
                                    tooltip="Transit + Customs clearance duration"
                                />
                                <CalculatorInput
                                    label="Safety Buffer"
                                    value={values.buffer}
                                    onChange={(v) => handleInputChange('buffer', v)}
                                    placeholder="3"
                                    tooltip="Extra days for unforeseen delays"
                                    isOptional={true}
                                />
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Right Column: Results */}
                <div className="lg:col-span-5 flex flex-col space-y-8">
                    <ResultDateCard
                        title="TOTAL LEAD TIME"
                        isCalculated={hasInputs}
                        primaryResult={{
                            label: "Total Lead Time",
                            value: totals.totalFormatted,
                            unit: "Days"
                        }}
                        dateSection={{
                            label: "Est. Delivery Date",
                            value: deliveryDate,
                            emptyText: "Waiting for inputs..."
                        }}
                        infoCard={{
                            title: "",
                            children: (
                                <div className="space-y-4 pt-1">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="bg-slate-50 rounded-xl p-3 border border-slate-100">
                                            <p className="text-[11px] font-bold text-slate-400 mb-1 uppercase tracking-wider">Supplier Time</p>
                                            <p className="text-xl font-bold text-blue-600">{hasInputs ? Math.round(totals.pct.supplier) : 0}%</p>
                                        </div>
                                        <div className="bg-slate-50 rounded-xl p-3 border border-slate-100">
                                            <p className="text-[11px] font-bold text-slate-400 mb-1 uppercase tracking-wider">Shipping Time</p>
                                            <p className="text-xl font-bold text-blue-600">{hasInputs ? Math.round(totals.pct.shipping) : 0}%</p>
                                        </div>
                                    </div>
                                </div>
                            )
                        }}
                    />
                </div>
            </div>
        </div>
    )
}

