"use client"
import React, { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Box, Scale, Truck, DollarSign } from "lucide-react"
import { cn } from "@/lib/utils"
import { CalculatorCardHeader, CalculatorInput, FadeIn, ResultSummaryCard } from "@/app/tools/_shared/components"

export function FBARemovalCalculator() {
    const [currency, setCurrency] = useState("USD")

    // Dimension Inputs
    const [length, setLength] = useState<number | "">("")
    const [width, setWidth] = useState<number | "">("")
    const [height, setHeight] = useState<number | "">("")

    // Weight & Quantity
    const [unitWeight, setUnitWeight] = useState<number | "">("")
    const [quantity, setQuantity] = useState<number | "">("")

    // Results
    const [sizeTier, setSizeTier] = useState<"Standard" | "Large/Bulky" | null>(null)
    const [shippingWeight, setShippingWeight] = useState(0)
    const [removalFeePerUnit, setRemovalFeePerUnit] = useState(0)
    const [totalCost, setTotalCost] = useState(0)

    const handleReset = () => {
        setLength("")
        setWidth("")
        setHeight("")
        setUnitWeight("")
        setQuantity("")
        setSizeTier(null)
        setShippingWeight(0)
        setRemovalFeePerUnit(0)
        setTotalCost(0)
    }

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
            setShippingWeight(0)
            return
        }

        const isStandardDims = l <= 18 && wi <= 14 && h <= 8
        const isStandardWeight = w <= 20
        const isStandard = isStandardDims && isStandardWeight
        const specificTier = isStandard ? "Standard" : "Large/Bulky"
        setSizeTier(specificTier)

        const dimWeight = (l * wi * h) / 139
        const shipW = Math.max(w, dimWeight)
        setShippingWeight(shipW)

        let fee = 0
        if (isStandard) {
            if (shipW <= 0.5) fee = 1.04
            else if (shipW <= 1.0) fee = 1.53
            else if (shipW <= 2.0) fee = 2.27
            else {
                const roundedWeight = Math.ceil(shipW)
                const additionalLbs = Math.max(0, roundedWeight - 2)
                fee = 2.89 + (additionalLbs * 1.06)
            }
        } else {
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

    const isValid = length !== "" && width !== "" && height !== "" && unitWeight !== "" && quantity !== ""

    return (
        <FadeIn className="w-full max-w-6xl mx-auto py-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                {/* Left: Inputs */}
                <div className="lg:col-span-7 space-y-3">
                    <Card className="border border-slate-200 shadow-sm bg-white">
                        <CalculatorCardHeader
                            title="Product Dimensions & Quantity"
                            description="Enter dimensions (inches), unit weight (lbs), and quantity to estimate removal costs."
                            onReset={handleReset}
                            guideId="fba-removal-guide"
                            currency={currency}
                            onCurrencyChange={setCurrency}
                        />
                        <CardContent className="p-4 md:p-6 pb-10 md:pb-14 space-y-3 flex flex-col">
                            <div className="space-y-6 max-w-[520px] mx-auto w-full">
                                {/* Dimensions */}
                                <div className="space-y-3">
                                    <CalculatorInput
                                        hideSeparator={true}
                                        groupingTitle="Dimensions"
                                        groupingIcon={Box}
                                        label="Length"
                                        value={length}
                                        onChange={setLength}
                                        placeholder="10"
                                        suffix="in"
                                        step={0.1}
                                        min={0}
                                        max={10000}
                                        tooltip="The longest side of your packaged product in inches."
                                        autoFocus
                                    />
                                    <CalculatorInput
                                        label="Width"
                                        value={width}
                                        onChange={setWidth}
                                        placeholder="8"
                                        suffix="in"
                                        step={0.1}
                                        min={0}
                                        max={10000}
                                        tooltip="The second-longest side of your packaged product in inches."
                                    />
                                    <CalculatorInput
                                        label="Height"
                                        value={height}
                                        onChange={setHeight}
                                        placeholder="6"
                                        suffix="in"
                                        step={0.1}
                                        min={0}
                                        max={10000}
                                        tooltip="The shortest side of your packaged product in inches."
                                    />
                                </div>

                                {/* Weight & Quantity */}
                                <div className="space-y-3">
                                    <CalculatorInput
                                        groupingTitle="Weight & Quantity"
                                        groupingIcon={Scale}
                                        label="Unit Weight"
                                        value={unitWeight}
                                        onChange={setUnitWeight}
                                        placeholder="0.5"
                                        suffix="lbs"
                                        step={0.01}
                                        min={0}
                                        max={1000}
                                        tooltip="The physical weight of a single unit in pounds. Amazon uses the greater of actual or dimensional weight for billing."
                                    />
                                    <CalculatorInput
                                        label="Removal Quantity"
                                        value={quantity}
                                        onChange={setQuantity}
                                        placeholder="100"
                                        suffix="units"
                                        step={1}
                                        min={1}
                                        max={1000000}
                                        tooltip="The total number of units you want to remove or dispose from Amazon's fulfillment centers."
                                    />
                                </div>

                                {/* Size Tier Alert */}
                                {Boolean(sizeTier) && (
                                    <FadeIn>
                                        <div className={cn(
                                            "flex items-start gap-3 p-4 rounded-xl border transition-all duration-300",
                                            sizeTier === "Standard"
                                                ? "bg-emerald-50/60 border-emerald-100"
                                                : "bg-amber-50/60 border-amber-100"
                                        )}>
                                            <div className={cn(
                                                "p-2 rounded-lg bg-white shadow-sm ring-1 shrink-0",
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
                                                    Billing is based on {shippingWeight > 0.5 ? Math.ceil(shippingWeight) : shippingWeight.toFixed(2)} lbs shipping weight.
                                                </p>
                                            </div>
                                        </div>
                                    </FadeIn>
                                )}
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Right: Results */}
                <div className="lg:col-span-5 space-y-3 lg:sticky lg:top-8">
                    <ResultSummaryCard
                        isCalculated={isValid}
                        currency={currency}
                        emptyMessage="removal order cost"
                        liveBadgeText={
                            isValid
                                ? sizeTier === "Standard" ? "Standard Size"
                                : "Large/Bulky"
                                : "Draft"
                        }
                        liveBadgeColor={
                            isValid
                                ? sizeTier === "Standard" ? "emerald"
                                : "amber"
                                : "slate"
                        }
                        dynamicMessages={{
                            positive: `Your total removal order is estimated at ${new Intl.NumberFormat("en-US", { style: "currency", currency }).format(totalCost)}.`,
                            negative: `Your total removal order is estimated at ${new Intl.NumberFormat("en-US", { style: "currency", currency }).format(totalCost)}.`,
                            neutral: `Your total removal order is estimated at ${new Intl.NumberFormat("en-US", { style: "currency", currency }).format(totalCost)}.`
                        }}
                        primaryResult={{
                            value: totalCost,
                            label: "Total Removal Cost",
                            isCurrency: true,
                            key: "totalCost"
                        }}
                        secondaryResults={[
                            {
                                key: "perUnit",
                                label: "Fee Per Unit",
                                value: removalFeePerUnit,
                                isCurrency: true,
                                icon: DollarSign,
                                tooltip: "The per-unit removal fee Amazon charges based on your product's size tier and shipping weight."
                            },
                            {
                                key: "billingWeight",
                                label: "Billing Weight",
                                value: shippingWeight > 0 ? `${(shippingWeight > 0.5 ? Math.ceil(shippingWeight) : shippingWeight).toFixed(2)} lbs` : "0 lbs",
                                icon: Scale,
                                tooltip: "The greater of your unit's actual weight or dimensional weight. This is what Amazon uses to calculate the fee."
                            },
                            {
                                key: "sizeTierResult",
                                label: "Size Tier",
                                value: sizeTier ?? "—",
                                icon: Truck,
                                tooltip: "Standard items must be ≤18×14×8 in and ≤20 lbs. Everything else is Large/Bulky."
                            }
                        ]}
                        checklistItems={[
                            { key: "len", label: "Length", isComplete: length !== "" },
                            { key: "wid", label: "Width", isComplete: width !== "" },
                            { key: "hei", label: "Height", isComplete: height !== "" },
                            { key: "wgt", label: "Unit Weight", isComplete: unitWeight !== "" },
                            { key: "qty", label: "Quantity", isComplete: quantity !== "" },
                        ]}
                    >
                    </ResultSummaryCard>

                    {/* Rate Card Badge */}
                    {isValid && (
                        <div className="bg-white border border-slate-200 rounded-xl px-5 py-3 flex items-center justify-between shadow-sm">
                            <span className="text-sm text-slate-500 font-medium">Rate Card Year</span>
                            <span className="text-xs font-extrabold px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-100">
                                2025 Rates
                            </span>
                        </div>
                    )}
                </div>
            </div>
        </FadeIn>
    )
}