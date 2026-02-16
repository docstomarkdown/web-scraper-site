"use client"

import React, { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Trash2, Package, Scale, Info } from "lucide-react"
import { CalculatorInput, ResultFeedbackCard, Counter, FadeIn } from "@/app/tools/_shared/components"
import { cn } from "@/lib/utils"

export function FBARemovalCalculator() {
    // State
    const [unitWeight, setUnitWeight] = useState<number | "">("")
    const [length, setLength] = useState<number | "">("")
    const [width, setWidth] = useState<number | "">("")
    const [height, setHeight] = useState<number | "">("")
    const [quantity, setQuantity] = useState<number | "">("")

    // Derived State
    const [sizeTier, setSizeTier] = useState<"Standard" | "Large/Bulky" | null>(null)
    const [shippingWeight, setShippingWeight] = useState<number>(0)
    const [removalFeePerUnit, setRemovalFeePerUnit] = useState<number>(0)
    const [totalCost, setTotalCost] = useState<number>(0)

    // specific 2025 fee logic
    useEffect(() => {
        const w = Number(unitWeight) || 0
        const l = Number(length) || 0
        const wi = Number(width) || 0
        const h = Number(height) || 0
        const q = Number(quantity) || 0

        if (w === 0 || l === 0 || wi === 0 || h === 0) {
            setTotalCost(0)
            setRemovalFeePerUnit(0)
            setSizeTier(null)
            return
        }

        // 1. Determine Size Tier
        // Standard: <= 18 x 14 x 8 inches AND <= 20 lbs
        const isStandardDims = l <= 18 && wi <= 14 && h <= 8
        const isStandardWeight = w <= 20
        const isStandard = isStandardDims && isStandardWeight
        const specificTier = isStandard ? "Standard" : "Large/Bulky"
        setSizeTier(specificTier)

        // 2. Calculate Dimensional Weight (Divisor 139)
        const dimWeight = (l * wi * h) / 139

        // 3. Determine Shipping Weight
        // For Standard: Unit weight only? No, usually greater of unit or dim weight for fees, 
        // BUT for removal fees specifically, the rate card uses "Shipping Weight".
        // Use greater of unit or dim weight.
        const shipW = Math.max(w, dimWeight)
        setShippingWeight(shipW)

        // 4. Calculate Fee based on 2025 Rate Card
        let fee = 0

        if (isStandard) {
            // Standard Size Tiers (Weight in lb ranges)
            // Rate card: 
            // 0-0.5 lb: $1.04
            // 0.5-1.0 lb: $1.53
            // 1.0-2.0 lb: $2.27
            // > 2 lb: $2.89 + $1.06/lb above 2lb

            if (shipW <= 0.5) fee = 1.04
            else if (shipW <= 1.0) fee = 1.53
            else if (shipW <= 2.0) fee = 2.27
            else {
                const roundedWeight = Math.ceil(shipW)
                const additionalLbs = Math.max(0, roundedWeight - 2)
                fee = 2.89 + (additionalLbs * 1.06)
            }
        } else {
            // Large Bulky / Extra Large
            // 0-1 lb: $3.12
            // 1-2 lb: $4.30
            // 2-4 lb: $6.36
            // 4-10 lb: $10.04
            // > 10 lb: $14.32 + $1.06/lb above 10 lb

            // "For these size tiers, shipping weight is rounded up to the nearest whole pound"
            const roundedShipW = Math.ceil(shipW)

            if (roundedShipW <= 1) fee = 3.12
            else if (roundedShipW <= 2) fee = 4.30
            else if (roundedShipW <= 4) fee = 6.36
            else if (roundedShipW <= 10) fee = 10.04
            else {
                const additionalLbs = Math.max(0, roundedShipW - 10)
                fee = 14.32 + (additionalLbs * 1.06)
            }
        }

        setRemovalFeePerUnit(fee)
        setTotalCost(fee * q)

    }, [unitWeight, length, width, height, quantity])

    return (
        <div className="w-full max-w-5xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Left Column: Inputs */}
                <div className="lg:col-span-7 space-y-6">
                    <Card className="border border-slate-200 shadow-sm bg-white">
                        <CardHeader className="pb-4 border-b border-slate-50">
                            <div className="space-y-1">
                                <CardTitle className="text-xl font-bold text-slate-900">
                                    Product Details
                                </CardTitle>
                                <CardDescription className="text-slate-500">
                                    Enter the specifications for the items you want to remove.
                                </CardDescription>
                            </div>
                        </CardHeader>

                        <CardContent className="space-y-8 pt-8">

                            {/* Dimensions Section */}
                            <div className="space-y-4">
                                <label className="text-sm font-semibold text-slate-900 uppercase tracking-wide">
                                    Dimensions (Inches)
                                </label>
                                <div className="grid grid-cols-3 gap-6">
                                    <CalculatorInput
                                        label="Length"
                                        value={length}
                                        onChange={setLength}
                                        placeholder="10"
                                    />
                                    <CalculatorInput
                                        label="Width"
                                        value={width}
                                        onChange={setWidth}
                                        placeholder="8"
                                    />
                                    <CalculatorInput
                                        label="Height"
                                        value={height}
                                        onChange={setHeight}
                                        placeholder="2"
                                    />
                                </div>
                            </div>

                            {/* Weight & Quantity Section */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="space-y-4">
                                    <label className="text-sm font-semibold text-slate-900 uppercase tracking-wide">
                                        Weight
                                    </label>
                                    <CalculatorInput
                                        label="Unit Weight (lbs)"
                                        value={unitWeight}
                                        onChange={setUnitWeight}
                                        placeholder="0.5"
                                        tooltip="The actual weight of a single unit in pounds."
                                    />
                                </div>

                                <div className="space-y-4">
                                    <label className="text-sm font-semibold text-slate-900 uppercase tracking-wide">
                                        Quantity
                                    </label>
                                    <CalculatorInput
                                        label="Units to Remove"
                                        value={quantity}
                                        onChange={setQuantity}
                                        placeholder="100"
                                        tooltip="Total number of units to remove or dispose."
                                    />
                                </div>
                            </div>

                        </CardContent>
                    </Card>
                </div>

                {/* Right Column: Results */}
                <div className="lg:col-span-5 space-y-6">
                    <ResultFeedbackCard
                        title="Estimated Removal Cost"
                        titleLabel="Total Fees"
                        mainValue={<Counter value={totalCost} prefix="$" />}
                        secondaryMetrics={[
                            {
                                label: "Fee Per Unit",
                                value: <Counter value={removalFeePerUnit} prefix="$" />,
                            },
                            {
                                label: "Billing Weight",
                                value: `${shippingWeight.toFixed(2)} lbs`,
                            }
                        ]}
                    />

                    {/* Breakdown */}
                    {sizeTier && (
                        <Card className="border border-slate-200 shadow-sm bg-white overflow-hidden">
                            <div className="bg-slate-50 px-5 py-3 border-b border-slate-100 flex justify-between items-center">
                                <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Classification</p>
                                <div className="flex items-center gap-2">
                                    <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                                    <span className="text-xs font-medium text-slate-600">Active</span>
                                </div>
                            </div>
                            <div className="p-5 space-y-4">
                                <div className="flex justify-between items-center">
                                    <span className="text-sm text-slate-600">Size Tier Detected</span>
                                    <span className={cn(
                                        "text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide",
                                        sizeTier === "Standard"
                                            ? "bg-green-100 text-green-700"
                                            : "bg-amber-100 text-amber-700"
                                    )}>
                                        {sizeTier}
                                    </span>
                                </div>
                                <div className="flex justify-between items-center border-t border-slate-50 pt-3">
                                    <span className="text-sm text-slate-600">Rate Basis</span>
                                    <span className="text-sm font-medium text-slate-900">2025 Rate Card</span>
                                </div>
                            </div>
                        </Card>
                    )}

                    {/* Info Card - Relocated to Right Column */}
                    <Card className="bg-slate-50 border border-slate-200 shadow-sm">
                        <div className="p-5 flex gap-4 items-start">
                            <div className="p-2 bg-white rounded-lg border border-slate-100 shadow-sm shrink-0">
                                <Info className="w-5 h-5 text-blue-600" />
                            </div>
                            <div className="space-y-1">
                                <h4 className="font-semibold text-slate-900 text-sm">Automated Fee Detection (2025)</h4>
                                <p className="text-sm text-slate-600 leading-relaxed">
                                    We automatically detect if your item is <strong>Standard</strong> or <strong>Large/Bulky</strong> and apply the correct 2025 fee schedule based on the greater of actual or dimensional weight.
                                </p>
                            </div>
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    )
}
