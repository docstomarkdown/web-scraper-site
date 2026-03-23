"use client"
import React, { useState, useMemo, useEffect } from "react"
import {
    Info,
    TrendingUp,
    ShieldCheck
} from "lucide-react"
import {
    InputCardHeader,
    ActionButtons
} from "../../ToolTemplate"
import { FadeIn, Counter, ResultSummaryCard, CalculatorInput, CalculatorCardHeader } from "@/app/tools/_shared/components"
import { cn } from "@/lib/utils"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Card, CardContent } from "@/components/ui/card"
interface ROPState {
    salesVelocity: number | ""
    leadTime: number | ""
    safetyStock: number | ""
}
const DEFAULT_STATE: ROPState = {
    salesVelocity: "",
    leadTime: "",
    safetyStock: ""
}
export function ReorderPointCalculator() {
    const [values, setValues] = useState<ROPState>(DEFAULT_STATE)
    const handleInputChange = (field: keyof ROPState, value: string | number) => {
        setValues(prev => ({ ...prev, [field]: value === "" ? "" : Number(value) }))
    }
    const hasInputs = useMemo(() => {
        return values.salesVelocity !== "" && values.leadTime !== ""
    }, [values])
    const results = useMemo(() => {
        const velocity = Number(values.salesVelocity) || 0
        const leadTime = Number(values.leadTime) || 0
        const safetyStock = Number(values.safetyStock) || 0
        const leadTimeDemand = velocity * leadTime
        const reorderPoint = leadTimeDemand + safetyStock
        return {
            leadTimeDemand,
            reorderPoint: Math.ceil(reorderPoint),
            safetyStock,
            totalCoverage: velocity > 0 ? Math.floor(reorderPoint / velocity) : 0
        }
    }, [values])
    const handleReset = () => setValues({
        salesVelocity: "",
        leadTime: "",
        safetyStock: ""
    })
    return (
        <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch pt-6">
                {/* Left Column: Smart Inputs */}
                <div className="lg:col-span-7">
                    <Card className="border border-slate-200 shadow-sm bg-white overflow-hidden flex flex-col rounded-3xl h-fit">
                        <CalculatorCardHeader
                            title="Calculator Inputs"
                            description="Configure your inventory reorder point calculation."
                            tooltip="Set your inventory parameters to calculate the optimal point for restocking your warehouse."
                            onReset={handleReset}
                        />
                        <CardContent className="p-6 md:p-8 pb-12 md:pb-16 space-y-8 flex-1 flex flex-col">
                            <div className="space-y-3">
                                <CalculatorInput
                                    label="Average Daily Units Sold"
                                    value={values.salesVelocity}
                                    onChange={(v) => handleInputChange('salesVelocity', v)}
                                    placeholder="25"
                                    tooltip="The average number of units your business sells each day."
                                />
                                <CalculatorInput
                                    label="Delivery Time (Days)"
                                    value={values.leadTime}
                                    onChange={(v) => handleInputChange('leadTime', v)}
                                    placeholder="14"
                                    tooltip="The total time (in days) from placing an order to having the stock available for sale."
                                />
                                <CalculatorInput
                                    label="Safety Stock (Units)"
                                    value={values.safetyStock}
                                    onChange={(v) => handleInputChange('safetyStock', v)}
                                    placeholder="50"
                                    tooltip="Extra buffer stock to prevent stockouts during unexpected demand spikes or shipping delays."
                                    isOptional
                                />
                            </div>

                        </CardContent>
                    </Card>
                </div>
                {/* Right Column: Results */}
                <div className="lg:col-span-5 space-y-3">
                    <ResultSummaryCard
                        title="REORDER POINT"
                        description="Place your next order when inventory drops to this amount."
                        isCalculated={hasInputs}
                        liveBadgeText={values.safetyStock ? "Buffered Stock" : "Just-In-Time"}
                        checklistItems={[
                            { label: "Enter Daily Units Sold", isComplete: values.salesVelocity !== "" },
                            { label: "Enter Delivery Time", isComplete: values.leadTime !== "" }
                        ]}
                        primaryResult={{
                            value: results.reorderPoint,
                            label: "Units to trigger reorder",
                            unit: "Units"
                        }}
                        secondaryResults={[
                            {
                                key: "demand",
                                label: "Demand During Delivery Time",
                                tooltip: "Estimated units sold during lead time (Daily Units Sold × Delivery Time).",
                                value: Math.round(results.leadTimeDemand),
                                unit: "Units",
                                icon: TrendingUp,
                            },
                            ...(values.safetyStock !== "" ? [{
                                key: "safety",
                                label: "Safety Stock",
                                tooltip: "The chosen buffer stock to protect against delays or demand spikes.",
                                value: Math.round(results.safetyStock),
                                unit: "Units",
                                icon: ShieldCheck,
                            }] : [])
                        ]}
                        emptyMessage="Reorder Point"
                        emptyResultLabel="Reorder Point"
                    />
                </div>
            </div>
        </div>
    )
}
