"use client"

import React, { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { HelpCircle, Box, Calendar, Package } from "lucide-react"
import { FadeIn, Counter, CalculatorInput, ResultFeedbackCard, CurrencyCombobox } from "@/app/tools/_shared/components"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

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
                                    <CardTitle className="text-xl font-bold text-slate-800">
                                        Inputs
                                    </CardTitle>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        onClick={scrollToGuide}
                                        className="text-slate-400 hover:text-slate-900 hover:bg-slate-100 h-6 w-6 rounded-full"
                                    >
                                        <HelpCircle className="w-4 h-4" />
                                    </Button>
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

                    {/* Insight Card */}
                    <div className="bg-amber-50 border border-amber-100 rounded-xl p-4 flex gap-3 items-start">
                        <Calendar className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                        <div>
                            <h4 className="text-sm font-semibold text-amber-900 mb-1">Peak Season Warning</h4>
                            <p className="text-sm text-amber-700 leading-relaxed">
                                Storage fees increase significantly (up to 3x) during Q4 (Oct-Dec). Plan your inventory carefully to avoid excessive bold fees during the holidays.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </FadeIn>
    )
}
