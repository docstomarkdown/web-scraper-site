"use client"

import React, { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { HelpCircle, RotateCcw, Box, Calendar, Package } from "lucide-react"
import { FadeIn, Counter, CalculatorInput, ResultFeedbackCard, CurrencyCombobox } from "@/app/tools/_shared/components"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
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

    const scrollToGuide = () => {
        const element = document.getElementById('storage-guide');
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

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
                        <CardHeader className="pb-4 border-b border-slate-50 flex flex-row items-center justify-between space-y-0">
                            <div className="space-y-1">
                                <div className="flex items-center gap-2">
                                    <CardTitle className="text-xl font-bold text-blue-600">
                                        Inputs
                                    </CardTitle>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        onClick={scrollToGuide}
                                        className="text-slate-400 hover:text-blue-600 hover:bg-transparent h-6 w-6 rounded-full"
                                    >
                                        <HelpCircle className="w-4 h-4" />
                                    </Button>
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
                                <CardDescription>Enter product dimensions and inventory details.</CardDescription>
                            </div>
                            <div className="w-[140px]">
                                <CurrencyCombobox value={currency} onValueChange={setCurrency} />
                            </div>
                        </CardHeader>
                        <CardContent className="space-y-5 pt-6">

                            {/* Dimensions */}
                            <div className="space-y-3">
                                <div className="flex items-center justify-between">
                                    <label className="text-base font-semibold text-slate-700">Dimensions (inches)</label>
                                </div>
                                <div className="grid grid-cols-3 gap-3">
                                    <Input
                                        type="number"
                                        placeholder="Length"
                                        value={length}
                                        onChange={(e) => setLength(parseFloat(e.target.value) || "")}
                                        className="text-center"
                                    />
                                    <Input
                                        type="number"
                                        placeholder="Width"
                                        value={width}
                                        onChange={(e) => setWidth(parseFloat(e.target.value) || "")}
                                        className="text-center"
                                    />
                                    <Input
                                        type="number"
                                        placeholder="Height"
                                        value={height}
                                        onChange={(e) => setHeight(parseFloat(e.target.value) || "")}
                                        className="text-center"
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
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
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
                        valueColor={monthlyFee > 0 ? "text-blue-400" : "text-white"}
                        secondaryMetrics={[
                            {
                                label: "Total Volume (cu ft)",
                                value: <Counter value={totalVolume} formatter={(v) => v.toFixed(2)} />,
                                color: "text-slate-300"
                            },
                            {
                                label: "Rate per cu ft",
                                value: <Counter value={rate} formatter={(v) => `$${v.toFixed(2)}`} />,
                                color: "text-slate-300"
                            }
                        ]}
                    />

                    {/* Indicator Badge */}
                    {monthlyFee > 0 && (
                        <div className={cn(
                            "px-4 py-3 rounded-xl border text-center text-sm font-semibold",
                            season === "oct-dec" ? "bg-amber-50 border-amber-200 text-amber-700" : "bg-blue-50 border-blue-200 text-blue-700"
                        )}>
                            {season === "oct-dec" ? "⚠️ Peak Season Rates (Oct-Dec)" : "✅ Standard Season Rates (Jan-Sept)"}
                        </div>
                    )}

                    {/* Breakdown Card */}
                    {monthlyFee > 0 ? (
                        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden border-l-4 border-l-blue-500">
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
                                <div className="flex justify-between items-center px-4 py-3 bg-blue-50/20">
                                    <span className="text-sm font-bold text-slate-900">Monthly Fee</span>
                                    <span className="text-sm font-bold text-blue-600">{formatCurrency(monthlyFee)}</span>
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
