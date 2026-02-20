"use client"

import React, { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Box, Layers, Archive } from "lucide-react"
import { FadeIn, Counter, CalculatorInput, ResultFeedbackCard, CalculatorCardHeader } from "@/app/tools/_shared/components"
import { cn } from "@/lib/utils"

// Constants for Fees (2024 Estimates)
const RATES = {
    standard: {
        "jan-sept": 0.87,
        "oct-dec": 2.40
    },
    oversize: {
        "jan-sept": 0.56,
        "oct-dec": 1.40
    }
}

export function StorageFeeCalculator() {
    const [currency, setCurrency] = useState("USD")
    const [length, setLength] = useState<number | "">("")
    const [width, setWidth] = useState<number | "">("")
    const [height, setHeight] = useState<number | "">("")
    const [quantity, setQuantity] = useState<number | "">("")
    const [season, setSeason] = useState<"jan-sept" | "oct-dec">("jan-sept")
    const [sizeTier, setSizeTier] = useState<"standard" | "oversize">("standard")

    const val = (v: number | "") => (v === "" ? 0 : v)

    const handleReset = () => {
        setLength("")
        setWidth("")
        setHeight("")
        setQuantity("")
        setSeason("jan-sept")
        setSizeTier("standard")
    }



    // Calculation
    const l = val(length)
    const w = val(width)
    const h = val(height)
    const qty = val(quantity)

    // Volume in Cubic Feet
    // (L x W x H) / 1728
    const volumePerUnit = (l * w * h) / 1728
    const totalVolume = volumePerUnit * qty

    // Fee Calculation
    const rate = RATES[sizeTier][season]
    const monthlyFee = totalVolume * rate

    const formatCurrency = (val: number) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: currency,
            maximumFractionDigits: 2
        }).format(val)
    }

    return (
        <FadeIn className="w-full max-w-6xl mx-auto py-8 px-4" duration={0.6}>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

                {/* Inputs Section */}
                <div className="lg:col-span-7 space-y-6">
                    <Card className="border border-slate-200 shadow-sm bg-white">
                        <CalculatorCardHeader
                            description="Enter product dimensions and inventory details."
                            onReset={handleReset}
                            guideId="storage-guide"
                            currency={currency}
                            onCurrencyChange={setCurrency}
                        />
                        <CardContent className="space-y-5 pt-6">

                            <div className="space-y-4">
                                <label className="text-sm font-semibold text-slate-700">Dimensions (inches)</label>
                                <div className="grid grid-cols-1 gap-4">
                                    <CalculatorInput
                                        label="Length"
                                        value={length}
                                        onChange={setLength}
                                        placeholder="Length"
                                    />
                                    <CalculatorInput
                                        label="Width"
                                        value={width}
                                        onChange={setWidth}
                                        placeholder="Width"
                                    />
                                    <CalculatorInput
                                        label="Height"
                                        value={height}
                                        onChange={setHeight}
                                        placeholder="Height"
                                    />
                                </div>
                            </div>

                            <CalculatorInput
                                label="Quantity on Hand"
                                value={quantity}
                                onChange={setQuantity}
                                placeholder="1000"
                                max={100000}
                                tooltip="Total number of units stored in Amazon fulfillment centers."
                            />

                            {/* Dropdowns */}
                            <div className="grid grid-cols-1 gap-5">
                                <div className="space-y-2">
                                    <label className="text-sm font-semibold text-slate-700">Detailed Season</label>
                                    <Select value={season} onValueChange={(v: "jan-sept" | "oct-dec") => setSeason(v)}>
                                        <SelectTrigger className="bg-white">
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="jan-sept">Jan - Sept (Standard Rate)</SelectItem>
                                            <SelectItem value="oct-dec">Oct - Dec (Peak Rate)</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-semibold text-slate-700">Product Size Tier</label>
                                    <Select value={sizeTier} onValueChange={(v: "standard" | "oversize") => setSizeTier(v)}>
                                        <SelectTrigger className="bg-white">
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="standard">Standard Size</SelectItem>
                                            <SelectItem value="oversize">Oversize</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>

                        </CardContent>
                    </Card>
                </div>

                {/* Results Section */}
                <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-8">
                    <ResultFeedbackCard
                        title="Monthly Storage Fee"
                        mainValue={
                            <Counter value={monthlyFee} formatter={formatCurrency} key={`${currency}-${season}`} />
                        }
                        valueColor={monthlyFee > 0 ? "text-slate-100" : "text-white"}
                        secondaryMetrics={[
                            {
                                label: "Total Volume (cu ft)",
                                value: <Counter value={totalVolume} formatter={(v) => v.toFixed(2)} />,
                                color: "text-emerald-500"
                            },
                            {
                                label: "Rate per cu ft",
                                value: <Counter value={rate} formatter={(v) => `$${v.toFixed(2)}`} />,
                                color: "text-emerald-500"
                            }
                        ]}
                    />

                    {/* Indicator Badge */}
                    {monthlyFee > 0 && (
                        <div className={cn(
                            "px-4 py-3 rounded-xl border text-center text-sm font-semibold",
                            season === "oct-dec" ? "bg-amber-50 border-amber-200 text-amber-700" : "bg-emerald-50 border-emerald-200 text-emerald-700"
                        )}>
                            {season === "oct-dec" ? "⚠️ Peak Season Rates (Oct-Dec)" : "✅ Standard Season Rates (Jan-Sept)"}
                        </div>
                    )}

                    {/* Breakdown Card */}
                    {monthlyFee > 0 ? (
                        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden border-l-4 border-l-emerald-500">
                            <div className="px-4 py-3 border-b border-slate-100">
                                <p className="text-xs font-bold text-slate-600 uppercase tracking-wider">Fee Breakdown</p>
                            </div>
                            <div className="divide-y divide-slate-100">
                                <div className="flex justify-between items-center px-4 py-3">
                                    <span className="text-sm text-slate-500">Unit Volume</span>
                                    <span className="text-sm font-medium text-slate-700">{volumePerUnit.toFixed(4)} cu ft</span>
                                </div>
                                <div className="flex justify-between items-center px-4 py-3">
                                    <span className="text-sm text-slate-500">Total Volume ({qty} units)</span>
                                    <span className="text-sm font-medium text-slate-700">{totalVolume.toFixed(2)} cu ft</span>
                                </div>
                                <div className="flex justify-between items-center px-4 py-3">
                                    <span className="text-sm text-slate-500">Rate per cu ft</span>
                                    <span className="text-sm font-semibold text-slate-800">${rate.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between items-center px-4 py-3 bg-emerald-50/20">
                                    <span className="text-sm font-bold text-slate-900">Monthly Fee</span>
                                    <span className="text-sm font-bold text-emerald-600">{formatCurrency(monthlyFee)}</span>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 text-center">
                            <p className="text-sm text-slate-400">Enter details to see fee breakdown.</p>
                        </div>
                    )}
                </div>
            </div>
        </FadeIn>
    )
}
