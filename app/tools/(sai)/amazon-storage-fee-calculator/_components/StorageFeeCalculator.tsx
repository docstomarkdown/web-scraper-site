"use client"
import React, { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Box, Layers, Info, Calendar, Clock, ChevronsUpDown, ChevronDown, ChevronUp } from "lucide-react"
import { FadeIn, CalculatorInput, ResultSummaryCard, CalculatorCardHeader } from "@/app/tools/_shared/components"
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
    const [duration, setDuration] = useState<number | "">("")

    const [showAdvanced, setShowAdvanced] = useState(false)
    const [season, setSeason] = useState<"jan-sept" | "oct-dec">("jan-sept")
    const [sizeTier, setSizeTier] = useState<"standard" | "oversize" | "auto">("auto")

    const val = (v: number | "") => (v === "" ? 0 : v)

    const handleReset = () => {
        setLength("")
        setWidth("")
        setHeight("")
        setQuantity("")
        setDuration("")
        setSeason("jan-sept")
        setSizeTier("auto")
        setShowAdvanced(false)
    }

    // Calculation vars
    const l = val(length)
    const w = val(width)
    const h = val(height)
    const qty = val(quantity)
    const months = val(duration) || 1

    // Auto-detect size tier
    const activeSizeTier = React.useMemo(() => {
        if (sizeTier !== "auto") return sizeTier;
        if (l > 0 && w > 0 && h > 0) {
            const dims = [l, w, h].sort((a, b) => b - a);
            if (dims[0] <= 18 && dims[1] <= 14 && dims[2] <= 8) {
                return "standard";
            } else {
                return "oversize";
            }
        }
        return "standard";
    }, [sizeTier, l, w, h]);

    // Volume in Cubic Feet (L x W x H) / 1728
    const volumePerUnit = (l * w * h) / 1728
    const totalVolume = volumePerUnit * qty

    // Fee Calculation
    const rate = RATES[activeSizeTier][season]
    const monthlyFee = totalVolume * rate

    // Long Term Storage Fee logic (Aged inventory > 6 months)
    let longTermFee = 0;
    if (months > 6 && totalVolume > 0) {
        // Simplified estimate: $1.50 per cubic foot per month beyond 6 months
        longTermFee = totalVolume * 1.50 * (months - 6)
    }

    // Total Cost
    const actualMonths = val(duration) === 0 ? 0 : months;
    const totalCost = (monthlyFee * actualMonths) + longTermFee

    // Insights
    let insightText = "Add dimensions, duration, and quantity to see insights."
    if (actualMonths > 0 && totalVolume > 0) {
        if (actualMonths > 6) {
            insightText = "🚨 Long-term fee risk — slow-moving inventory"
        } else if (monthlyFee > 100) {
            insightText = "⚠️ High storage cost — reduce size or inventory"
        } else {
            insightText = "✅ Efficient storage — low cost product"
        }
    }

    const isCalculated = length !== "" && width !== "" && height !== "" && quantity !== ""

    return (
        <FadeIn className="w-full max-w-6xl mx-auto py-8 px-4" duration={0.6}>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                {/* Inputs Section */}
                <div className="lg:col-span-7 space-y-3">
                    <Card className="border border-slate-200/80 shadow-sm bg-white overflow-hidden h-full flex flex-col rounded-3xl">
                        <CalculatorCardHeader
                            title="Amazon Storage Fee Calculator"
                            description="Enter product dimensions and inventory details to estimate storage costs."
                            onReset={handleReset}
                            guideId="storage-guide"
                        />
                        <CardContent className="p-4 md:p-6 pb-10 md:pb-14 space-y-3 flex-1 flex flex-col">
                            <div className="space-y-6 max-w-[520px] mx-auto w-full">
                                {/* 1. Product Size */}
                                <div className="space-y-3">
                                    <CalculatorInput
                                        hideSeparator={true}
                                        label="Length"
                                        value={length}
                                        onChange={setLength}
                                        placeholder="Length"
                                        suffix="in"
                                        tooltip="Length of the unit in inches."
                                        groupingTitle="Product Size (inches)"
                                        groupingIcon={Box}
                                    />
                                    <CalculatorInput
                                        label="Width"
                                        value={width}
                                        onChange={setWidth}
                                        placeholder="Width"
                                        suffix="in"
                                        tooltip="Width of the unit in inches."
                                    />
                                    <CalculatorInput
                                        label="Height"
                                        value={height}
                                        onChange={setHeight}
                                        placeholder="Height"
                                        suffix="in"
                                        tooltip="Height of the unit in inches."
                                    />
                                </div>

                                {/* 2. Inventory */}
                                <div className="space-y-3">
                                    <CalculatorInput
                                        label="Units Stored"
                                        value={quantity}
                                        onChange={setQuantity}
                                        placeholder="1000"
                                        max={500000}
                                        tooltip="Total number of units stored in Amazon fulfillment centers."
                                        groupingTitle="Inventory"
                                        groupingIcon={Layers}
                                    />
                                    <CalculatorInput
                                        label="Storage Duration (Months)"
                                        value={duration}
                                        onChange={setDuration}
                                        placeholder="3"
                                        max={36}
                                        tooltip="How long you plan to store these units on average. > 6 months incurs long-term fees."
                                    />
                                </div>

                                {/* Advanced Toggle */}
                                <div className="pt-6 mt-4 border-t border-slate-100">
                                    <div
                                        onClick={() => setShowAdvanced(!showAdvanced)}
                                        className={cn(
                                            "flex items-center justify-between p-4 rounded-xl border cursor-pointer transition-all duration-200 group select-none",
                                            showAdvanced
                                                ? "bg-blue-50/50 border-blue-200 shadow-sm"
                                                : "bg-slate-50 border-slate-200 hover:border-blue-300 hover:bg-slate-100"
                                        )}
                                    >
                                        <div className="flex items-center gap-3">
                                            <div className={cn(
                                                "w-8 h-8 rounded-full flex items-center justify-center transition-colors",
                                                showAdvanced ? "bg-blue-100 text-blue-600" : "bg-white text-slate-400 group-hover:text-blue-500"
                                            )}>
                                                <ChevronsUpDown className="w-4 h-4" />
                                            </div>
                                            <div className="flex flex-col">
                                                <span className={cn("text-sm font-semibold transition-colors", showAdvanced ? "text-blue-700" : "text-slate-700")}>
                                                    Advanced Settings
                                                </span>
                                                <span className="text-[11px] text-slate-400 font-medium">
                                                    Season & Size Tier Rules
                                                </span>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <span className={cn(
                                                "text-[10px] px-2 py-0.5 rounded-full font-bold tracking-wide uppercase transition-colors",
                                                showAdvanced ? "bg-blue-100 text-blue-700" : "bg-slate-200 text-slate-500"
                                            )}>
                                                Optional
                                            </span>
                                            {showAdvanced ? <ChevronUp className="w-4 h-4 text-blue-500" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
                                        </div>
                                    </div>

                                    {showAdvanced && (
                                        <TooltipProvider delayDuration={200}>
                                        <FadeIn className="pt-4 space-y-5 max-w-[520px] mx-auto w-full px-1">
                                            <div className="flex items-center gap-3 w-full relative z-10">
                                                <div className="flex items-center gap-2 flex-1 min-w-0 text-left">
                                                    <label className="text-[14.5px] font-medium text-slate-600/90 cursor-pointer py-1">Season</label>
                                                    <Tooltip>
                                                        <TooltipTrigger asChild>
                                                            <button type="button" className="text-slate-400 hover:text-blue-600 transition-colors cursor-help">
                                                                <Info className="h-3.5 w-3.5" />
                                                            </button>
                                                        </TooltipTrigger>
                                                        <TooltipContent className="bg-slate-900 text-white border-slate-800 text-[13px]">
                                                            Amazon's monthly storage fees vary by season (Peak vs Standard).
                                                        </TooltipContent>
                                                    </Tooltip>
                                                </div>
                                                <div className="w-36 sm:w-44 relative flex-shrink-0">
                                                    <Select value={season} onValueChange={(v: "jan-sept" | "oct-dec") => setSeason(v)}>
                                                        <SelectTrigger className="h-11 border-2 border-slate-200 bg-white font-semibold text-slate-600 focus:ring-4 focus:ring-blue-500/10 hover:border-blue-300 hover:shadow-sm focus:border-blue-500 text-right w-full rounded-xl transition-all [&>span]:w-full [&>span]:text-right [&>span]:pr-3">
                                                            <SelectValue />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            <SelectItem value="jan-sept">Jan - Sept</SelectItem>
                                                            <SelectItem value="oct-dec">Oct - Dec</SelectItem>
                                                        </SelectContent>
                                                    </Select>
                                                </div>
                                            </div>

                                            <div className="flex items-center gap-3 w-full relative z-10">
                                                <div className="flex items-center gap-2 flex-1 min-w-0 text-left">
                                                    <label className="text-[14.5px] font-medium text-slate-600/90 cursor-pointer py-1">Size Tier</label>
                                                    <Tooltip>
                                                        <TooltipTrigger asChild>
                                                            <button type="button" className="text-slate-400 hover:text-blue-600 transition-colors cursor-help">
                                                                <Info className="h-3.5 w-3.5" />
                                                            </button>
                                                        </TooltipTrigger>
                                                        <TooltipContent className="bg-slate-900 text-white border-slate-800 text-[13px]">
                                                            Auto-detect calculates if the product is Standard or Oversize based on dimensions.
                                                        </TooltipContent>
                                                    </Tooltip>
                                                </div>
                                                <div className="w-36 sm:w-44 relative flex-shrink-0">
                                                    <Select value={sizeTier} onValueChange={(v: "standard" | "oversize" | "auto") => setSizeTier(v)}>
                                                        <SelectTrigger className="h-11 border-2 border-slate-200 bg-white font-semibold text-slate-600 focus:ring-4 focus:ring-blue-500/10 hover:border-blue-300 hover:shadow-sm focus:border-blue-500 text-right w-full rounded-xl transition-all [&>span]:w-full [&>span]:text-right [&>span]:pr-3">
                                                            <SelectValue />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            <SelectItem value="auto">Auto-detect</SelectItem>
                                                            <SelectItem value="standard">Standard</SelectItem>
                                                            <SelectItem value="oversize">Oversize</SelectItem>
                                                        </SelectContent>
                                                    </Select>
                                                </div>
                                            </div>
                                        </FadeIn>
                                        </TooltipProvider>
                                    )}
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Results Section */}
                <div className="lg:col-span-5 lg:sticky lg:top-8">
                    <FadeIn delay={0.4} direction="left" className="h-full">
                        <ResultSummaryCard
                            title="Total Storage Cost"
                            currency={currency}
                            primaryResult={{
                                value: totalCost,
                                isCurrency: true,
                                key: "total_cost",
                                label: "Total cost for selected duration"
                            }}
                            secondaryResults={[
                                {
                                    key: "monthly_fee",
                                    label: "Monthly Storage Fee",
                                    value: monthlyFee,
                                    isCurrency: true,
                                    tooltip: "Cost per month",
                                    icon: Calendar
                                },
                                ...(longTermFee > 0 ? [{
                                    key: "long_term_fee",
                                    label: "Long-Term Storage Fee",
                                    value: longTermFee,
                                    isCurrency: true,
                                    tooltip: "Extra cost for aged inventory",
                                    icon: Clock
                                }] : [])
                            ]}
                            showLiveBadge={true}
                            liveBadgeText={season === "oct-dec" ? "Peak Rates Active" : "Standard Rates Active"}
                            isCalculated={isCalculated}
                            description={isCalculated ? insightText : "Fill in dimensions and inventory to see cost insights."}
                            emptyMessage="Storage Cost"
                            emptyResultLabel="Total Storage Cost"
                        />
                    </FadeIn>
                </div>
            </div>
        </FadeIn>
    )
}