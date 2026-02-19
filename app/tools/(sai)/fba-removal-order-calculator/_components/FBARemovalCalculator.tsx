"use client"

import React, { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

import { Package, Scale, Info, Box, Truck, HelpCircle, RotateCcw } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { CalculatorInput, Counter, FadeIn, CurrencyCombobox, currencies, ResultFeedbackCard } from "@/app/tools/_shared/components"
import { cn } from "@/lib/utils"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"

export function FBARemovalCalculator() {
    // State
    const [unitWeight, setUnitWeight] = useState<number | "">("")
    const [length, setLength] = useState<number | "">("")
    const [width, setWidth] = useState<number | "">("")
    const [height, setHeight] = useState<number | "">("")
    const [quantity, setQuantity] = useState<number | "">("")
    const [currency, setCurrency] = useState("USD")

    // Derived State
    const [sizeTier, setSizeTier] = useState<"Standard" | "Large/Bulky" | null>(null)
    const [shippingWeight, setShippingWeight] = useState<number>(0)
    const [removalFeePerUnit, setRemovalFeePerUnit] = useState<number>(0)
    const [totalCost, setTotalCost] = useState<number>(0)

    const handleReset = () => {
        setUnitWeight("")
        setLength("")
        setWidth("")
        setHeight("")
        setQuantity("")
    }

    // Get currency symbol
    const currencySymbol = currencies.find(c => c.code === currency)?.symbol || "$"

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
        <div className="w-full max-w-6xl mx-auto space-y-8">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div className="space-y-1">
                    <h2 className="text-2xl font-bold tracking-tight text-slate-900">
                        Removal Order Cost Calculator
                    </h2>
                    <p className="text-slate-500">
                        Calculate the cost to remove or dispose of FBA inventory based on 2025 rates.
                    </p>
                </div>

            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

                {/* Left Column: Inputs */}
                <Card className="lg:col-span-7 border-none shadow-lg bg-white/80 backdrop-blur-sm ring-1 ring-slate-900/5">
                    <CardHeader className="pb-6 border-b border-slate-100/50 flex flex-row items-center justify-between space-y-0">
                        <div className="flex items-center gap-3">
                            <div className="flex items-center gap-2">
                                <CardTitle className="text-xl font-bold text-blue-600">
                                    Inputs
                                </CardTitle>
                                <TooltipProvider delayDuration={100}>
                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                onClick={handleReset}
                                                className="text-slate-400 hover:text-slate-600 hover:bg-slate-100 h-6 w-6 rounded-full"
                                            >
                                                <RotateCcw className="w-3.5 h-3.5" />
                                            </Button>
                                        </TooltipTrigger>
                                        <TooltipContent side="top" className="text-xs bg-slate-900 text-white border-slate-800">
                                            Reset Calculator
                                        </TooltipContent>
                                    </Tooltip>
                                </TooltipProvider>
                            </div>
                        </div>
                        <div className="w-[140px]">
                            <CurrencyCombobox value={currency} onValueChange={setCurrency} />
                        </div>
                    </CardHeader>

                    <CardContent className="p-6 md:p-8 space-y-8">
                        {/* Dimensional Data */}
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <label className="text-sm font-medium text-slate-700 flex items-center gap-2">
                                    <Box className="w-4 h-4 text-slate-400" />
                                    Dimensions (Inches)
                                </label>
                            </div>
                            <div className="grid grid-cols-3 gap-4">
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
                                    placeholder="6"
                                />
                            </div>
                        </div>

                        <Separator className="bg-slate-100" />

                        {/* Weight & Quantity */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <div className="space-y-4">
                                <label className="text-sm font-medium text-slate-700 flex items-center gap-2">
                                    <Scale className="w-4 h-4 text-slate-400" />
                                    Unit Weight
                                </label>
                                <CalculatorInput
                                    label="Weight (lbs)"
                                    value={unitWeight}
                                    onChange={setUnitWeight}
                                    placeholder="0.5"
                                    tooltip="The actual weight of a single unit."
                                />
                            </div>

                            <div className="space-y-4">
                                <label className="text-sm font-medium text-slate-700 flex items-center gap-2">
                                    <Truck className="w-4 h-4 text-slate-400" />
                                    Removal Quantity
                                </label>
                                <CalculatorInput
                                    label="Total Units"
                                    value={quantity}
                                    onChange={setQuantity}
                                    placeholder="100"
                                    tooltip="How many units to remove?"
                                />
                            </div>
                        </div>

                        {/* Size Tier Alert */}
                        {Boolean(sizeTier) && (
                            <FadeIn>
                                <div className={cn(
                                    "flex items-start gap-3 p-4 rounded-xl border transition-all duration-300",
                                    sizeTier === "Standard"
                                        ? "bg-emerald-50/50 border-emerald-100"
                                        : "bg-amber-50/50 border-amber-100"
                                )}>
                                    <div className={cn(
                                        "p-2 rounded-lg bg-white shadow-sm ring-1",
                                        sizeTier === "Standard" ? "ring-emerald-100 text-emerald-600" : "ring-amber-100 text-amber-600"
                                    )}>
                                        <Box className="w-4 h-4" />
                                    </div>
                                    <div>
                                        <p className={cn(
                                            "text-sm font-semibold",
                                            sizeTier === "Standard" ? "text-emerald-900" : "text-amber-900"
                                        )}>
                                            {sizeTier} Size Tier Detected
                                        </p>
                                        <p className={cn(
                                            "text-xs mt-0.5",
                                            sizeTier === "Standard" ? "text-emerald-700" : "text-amber-700"
                                        )}>
                                            Billing is based on {shippingWeight > 0.5 ? Math.ceil(shippingWeight) : shippingWeight} lbs shipping weight.
                                        </p>
                                    </div>
                                </div>
                            </FadeIn>
                        )}
                    </CardContent>
                </Card>

                {/* Right Column: Results */}
                <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-8">
                    <ResultFeedbackCard
                        title="Estimated Removal Cost"
                        titleLabel="Total Fees"
                        mainValue={<Counter value={totalCost} prefix={currencySymbol} />}
                        secondaryMetrics={[
                            {
                                label: "Fee Per Unit",
                                value: <Counter value={removalFeePerUnit} prefix={currencySymbol} />,
                            },
                            {
                                label: "Billing Weight",
                                value: `${shippingWeight.toFixed(2)} lbs`,
                            }
                        ]}
                    >
                        <div className="flex justify-between items-center py-2 border-t border-slate-100 mt-2">
                            <span className="text-sm text-slate-500 font-medium">Rate Card Year</span>
                            <Badge variant="secondary" className="bg-indigo-50 text-indigo-700 hover:bg-indigo-100 border-indigo-100">
                                2025 Rates
                            </Badge>
                        </div>
                    </ResultFeedbackCard>

                    {/* Breakdown Card */}
                    {totalCost > 0 ? (
                        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden border-l-4 border-l-blue-500">
                            <div className="px-5 py-3.5 border-b border-slate-100">
                                <p className="text-xs font-bold text-slate-600 uppercase tracking-wider">Cost Breakdown</p>
                            </div>
                            <div className="divide-y divide-slate-100">
                                <div className="flex justify-between items-center px-5 py-3.5">
                                    <span className="text-sm text-slate-600">Per-Unit Fee</span>
                                    <span className="text-sm font-semibold text-slate-800">{currencySymbol}{removalFeePerUnit.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between items-center px-5 py-3.5">
                                    <span className="text-sm text-slate-600">Quantity</span>
                                    <span className="text-sm font-semibold text-slate-800">{Number(quantity).toLocaleString()} units</span>
                                </div>
                                <div className="flex justify-between items-center px-5 py-3.5 bg-blue-50/20">
                                    <span className="text-sm font-bold text-slate-900">Total Removal Cost</span>
                                    <span className="text-base font-bold text-blue-600">{currencySymbol}{totalCost.toFixed(2)}</span>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 text-center">
                            <p className="text-sm text-slate-400">Enter details to calculate removal cost.</p>
                        </div>
                    )}
                    <Card className="border border-slate-200 shadow-sm bg-white p-5">
                        <div className="flex gap-4">
                            <div className="p-2.5 bg-blue-50 text-blue-600 rounded-lg h-fit shrink-0">
                                <Info className="w-5 h-5" />
                            </div>
                            <div className="space-y-1">
                                <h4 className="text-sm font-semibold text-slate-900">How fees are calculated</h4>
                                <p className="text-xs text-slate-500 leading-relaxed">
                                    Fees vary by size tier (Standard vs Large) and weight. We automatically use the greater of unit weight vs dimensional weight to determine the final fee.
                                </p>
                            </div>
                        </div>

                    </Card>
                </div>
            </div>
        </div>
    )
}
