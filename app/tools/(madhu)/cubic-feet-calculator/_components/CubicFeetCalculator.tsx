"use client"
import React, { useState, useMemo } from "react"
import { Box, Layers } from "lucide-react"
import { cn } from "@/lib/utils"
import { Card, CardContent } from "@/components/ui/card"
import { ResultSummaryCard, CalculatorInput, CalculatorCardHeader } from "@/app/tools/_shared/components"
type DimensionUnit = "in" | "ft" | "cm" | "m"
interface DimensionInputs {
    length: string
    width: string
    height: string
    quantity: string
}
export function CubicFeetCalculator() {
    const [inputs, setInputs] = useState<DimensionInputs>({
        length: "",
        width: "",
        height: "",
        quantity: ""
    })
    const [unit, setUnit] = useState<DimensionUnit>("ft")
    const handleInputChange = (field: keyof DimensionInputs, value: string) => {
        setInputs(prev => ({ ...prev, [field]: value }))
    }
    const results = useMemo(() => {
        const l = parseFloat(inputs.length || "0")
        const w = parseFloat(inputs.width || "0")
        const h = parseFloat(inputs.height || "0")
        const qty = parseFloat(inputs.quantity || "1") // default 1 for calc only
        let volumeInCubicInches = 0
        // Convert all to Inches first as base
        switch (unit) {
            case "in":
                volumeInCubicInches = l * w * h
                break
            case "ft":
                volumeInCubicInches = (l * 12) * (w * 12) * (h * 12)
                break
            case "cm":
                volumeInCubicInches = (l / 2.54) * (w / 2.54) * (h / 2.54)
                break
            case "m":
                volumeInCubicInches = (l * 39.3701) * (w * 39.3701) * (h * 39.3701)
                break
        }
        const totalVolumeInches = volumeInCubicInches * qty
        return {
            cft: totalVolumeInches / 1728,
            cbm: totalVolumeInches / 61023.7,
            inches: totalVolumeInches,
            cm: totalVolumeInches * 16.3871
        }
    }, [inputs, unit])
    const formatNumber = (val: number, decimals = 2) => {
        return val.toLocaleString('en-US', { 
            minimumFractionDigits: decimals,
            maximumFractionDigits: decimals 
        })
    }
    const isCalculated = !!(inputs.length && inputs.width && inputs.height)
    const checklistItems = [
        { label: "Enter Length", isComplete: !!inputs.length },
        { label: "Enter Width", isComplete: !!inputs.width },
        { label: "Enter Height", isComplete: !!inputs.height }
    ]
    return (
        <div className="p-8 sm:p-12 max-w-6xl mx-auto">
            <div className="lg:col-span-12 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
                {/* Left Column: Inputs */}
                <div className="lg:col-span-7 h-full">
                    <Card className="border-slate-200 shadow-sm relative overflow-hidden bg-white h-full flex flex-col">
                        <CalculatorCardHeader
                            title="Calculator Inputs"
                            description="Enter dimensions to calculate total volume."
                            guideId="how-to-use"
                            tooltip="How to use this calculator"
                            onReset={() => setInputs({ length: "", width: "", height: "", quantity: "" })}
                        />
                        <CardContent className="p-6 md:p-8 pb-12 md:pb-16 space-y-8 flex-1 flex flex-col">
                            {/* All Inputs in Groups */}
                            <div className="space-y-6 max-w-[520px] mx-auto w-full">
                                {/* Dimensions — with Measurement system toggle as groupingAction */}
                                <div className="space-y-3">
                                    <CalculatorInput
                                        hideSeparator={true}
                                        label="Length"
                                        value={inputs.length}
                                        onChange={(v) => handleInputChange('length', v.toString())}
                                        placeholder="12.00"
                                        suffix={unit}
                                        type="number"
                                        tooltip="Enter the length dimension of your item (typically the longest side, front-to-back measurement)"
                                        groupingTitle="Dimensions"
                                        groupingIcon={Box}
                                        groupingAction={
                                            <div className="flex items-center bg-slate-100 p-0.5 rounded-lg border border-slate-200 h-7 font-sans ml-4 w-36 sm:w-44">
                                                {(["ft", "in", "cm", "m"] as DimensionUnit[]).map((u) => (
                                                    <button
                                                        key={u}
                                                        onClick={() => setUnit(u)}
                                                        className={cn(
                                                            "px-3 h-full rounded-md text-[11px] font-bold transition-all flex-1 flex items-center justify-center",
                                                            unit === u
                                                                ? "bg-white text-blue-600 shadow-sm border border-blue-200"
                                                                : "text-slate-500 hover:text-slate-900"
                                                        )}
                                                    >
                                                        {u}
                                                    </button>
                                                ))}
                                            </div>
                                        }
                                    />
                                    <CalculatorInput
                                        label="Width"
                                        value={inputs.width}
                                        onChange={(v) => handleInputChange('width', v.toString())}
                                        placeholder="10.00"
                                        suffix={unit}
                                        type="number"
                                        tooltip="Enter the width dimension of your item (perpendicular to length, typically left-to-right measurement)"
                                    />
                                    <CalculatorInput
                                        label="Height"
                                        value={inputs.height}
                                        onChange={(v) => handleInputChange('height', v.toString())}
                                        placeholder="8.00"
                                        suffix={unit}
                                        type="number"
                                        tooltip="Enter the height dimension of your item (vertical measurement, typically bottom-to-top)"
                                    />
                                </div>
                                {/* Total Quantity */}
                                <div className="space-y-3">
                                    <CalculatorInput
                                        label="Number of Units"
                                        value={inputs.quantity}
                                        onChange={(v) => handleInputChange('quantity', v.toString())}
                                        placeholder="1"
                                        type="number"
                                        groupingTitle="Total Quantity"
                                        groupingIcon={Layers}
                                        tooltip="Enter the number of identical items to calculate total volume. Leave as 1 for a single item, or enter multiple units to get combined volume."
                                        isOptional
                                    />
                                </div>
                            </div>

                        </CardContent>
                    </Card>
                </div>
                {/* Right Column: Results */}
                <div className="lg:col-span-5 flex flex-col space-y-3 h-full">
                    {/* Primary Result Card */}
                    <ResultSummaryCard
                        title="Total Volume"
                        primaryResult={{
                            value: formatNumber(results.cft, 2),
                            unit: "ft³",
                            label: "Cubic Feet",
                            key: "cft"
                        }}
                        secondaryResults={[
                            {
                                key: "cbm",
                                label: "Cubic meters",
                                value: formatNumber(results.cbm, 4),
                                unit: "m³",
                                tooltip: "Cubic meters - standard unit for international freight"
                            },
                            {
                                key: "inches",
                                label: "Cubic inches",
                                value: formatNumber(results.inches, 2),
                                unit: "in³",
                                tooltip: "Total volume in cubic inches"
                            }
                        ]}
                        isCalculated={isCalculated}
                        checklistItems={checklistItems}
                        emptyResultLabel="Total Volume"
                        description={isCalculated ? "Your calculated volume based on the dimensions provided." : undefined}
                    />
                </div>
            </div>
        </div>
    )
}
