"use client"

import React, { useState, useEffect, useMemo } from "react"
import { Scale, RefreshCw, Info, AlertTriangle, Truck, DollarSign, Package, Copy, ChevronUp, ChevronDown, HelpCircle } from "lucide-react"
import { cn } from "@/lib/utils"
import { useToast } from "@/hooks/use-toast"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { ResultFeedbackCard, Counter } from "../../../_shared/components"

type WeightUnit = "oz" | "lbs" | "g" | "kg"

interface ConversionResult {
    oz: number
    lbs: number
    g: number
    kg: number
}

export function WeightConverter() {
    const { toast } = useToast()
    const [inputValue, setInputValue] = useState<string>("")
    const [inputUnit, setInputUnit] = useState<WeightUnit>("lbs")
    const [targetUnit, setTargetUnit] = useState<WeightUnit>("kg")

    // Smart default switching: When input unit changes, ensure target isn't the same (if possible)
    useEffect(() => {
        if (inputUnit === targetUnit || (inputUnit === 'lbs' && targetUnit === 'lbs')) {
            // Default logic map
            const defaults: Record<WeightUnit, WeightUnit> = {
                'lbs': 'kg',
                'oz': 'g',
                'kg': 'lbs',
                'g': 'oz'
            }
            setTargetUnit(defaults[inputUnit])
        }
    }, [inputUnit])

    const conversions = useMemo((): ConversionResult => {
        const val = parseFloat(inputValue || "0")
        let baseInGrams = 0

        // Convert to base unit: grams
        switch (inputUnit) {
            case "oz": baseInGrams = val * 28.3495; break
            case "lbs": baseInGrams = val * 453.592; break
            case "g": baseInGrams = val; break
            case "kg": baseInGrams = val * 1000; break
        }

        return {
            oz: baseInGrams / 28.3495,
            lbs: baseInGrams / 453.592,
            g: baseInGrams,
            kg: baseInGrams / 1000
        }
    }, [inputValue, inputUnit])

    const shippingImpact = useMemo(() => {
        if (!inputValue) return null
        const lbs = conversions.lbs
        const oz = conversions.oz

        let tierName = ""
        let tierRule = ""
        let costRange = ""
        let status = ""
        let statusColor = ""
        let thresholdAlert = null
        let dimWarning = false

        if (oz <= 15.99) {
            tierName = "Lightweight"
            tierRule = "Best for USPS ground advantage (under 1 lb)"
            costRange = "$4.50 – $7.50"
            status = "High margin safe"
            statusColor = "text-emerald-500 bg-emerald-50 border-emerald-100"

            if (oz >= 12) {
                thresholdAlert = "⚠ Shipping costs increase once you exceed 1 lb."
            }
        } else if (lbs <= 5) {
            tierName = "Standard parcel"
            tierRule = "USPS priority mail / UPS ground"
            costRange = "$8.50 – $15.00"
            status = "Moderate impact"
            statusColor = "text-amber-500 bg-amber-50 border-amber-100"

            if (lbs <= 1.1) {
                thresholdAlert = "You are slightly above 1 lb. Reducing packaging weight may lower shipping costs."
            }
        } else if (lbs <= 20) {
            tierName = "Heavy parcel"
            tierRule = "UPS ground / FedEx home delivery"
            costRange = "$12.00 – $25.00+"
            status = "High cost risk"
            statusColor = "text-orange-500 bg-orange-50 border-orange-100"
        } else {
            tierName = "Oversized / Freight"
            tierRule = "LTL or freight shipping required"
            costRange = "$50.00+"
            status = "Critical cost impact"
            statusColor = "text-red-600 bg-red-50 border-red-100"
        }

        // Removed DIM warning logic entirely for now as requested
        return { tierName, tierRule, costRange, status, statusColor, thresholdAlert, dimWarning: false }
    }, [conversions.lbs, conversions.oz, inputValue])

    // Helper to get secondary units
    const secondaryUnits = useMemo(() => {
        const allUnits: WeightUnit[] = ["lbs", "oz", "kg", "g"]
        return allUnits.filter(u => u !== inputUnit && u !== targetUnit)
    }, [inputUnit, targetUnit])

    const copyToClipboard = () => {
        const val = parseFloat(inputValue) || 0
        const text = `
Weight Converter Result:
Input: ${val} ${inputUnit}

Conversions:
${conversions.lbs.toFixed(4)} lbs
${conversions.oz.toFixed(4)} oz
${conversions.kg.toFixed(4)} kg
${conversions.g.toFixed(4)} g

Shipping Tier: ${shippingImpact?.tierName || 'N/A'}
Estimated Cost: ${shippingImpact?.costRange || 'N/A'}
`.trim()

        navigator.clipboard.writeText(text)
        toast({
            title: "Result Copied",
            description: "Weight calculations copied to your clipboard.",
        })
    }

    const scrollToGuide = () => {
        const element = document.getElementById('how-to-use');
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <div className="p-8 sm:p-12 max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
                {/* Left Column: Input (Col Span 7) */}
                <div className="lg:col-span-7 h-full">
                    <Card className="border border-slate-200 shadow-sm bg-white overflow-hidden h-full flex flex-col">
                        <CardHeader className="pb-4 border-b border-slate-50 flex flex-col items-start space-y-6">
                            <div className="space-y-1 w-full">
                                <div className="flex items-center gap-3">
                                    <CardTitle className="text-2xl font-bold text-blue-600">
                                        Calculator Inputs
                                    </CardTitle>
                                    <TooltipProvider delayDuration={100}>
                                        <Tooltip>
                                            <TooltipTrigger asChild>
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    onClick={scrollToGuide}
                                                    className="text-slate-400 hover:text-slate-900 hover:bg-slate-100 h-8 w-8 rounded-full transition-colors"
                                                >
                                                    <HelpCircle className="w-4 h-4" />
                                                </Button>
                                            </TooltipTrigger>
                                            <TooltipContent side="top" className="text-xs bg-slate-900 text-white border-slate-800">
                                                How to use this converter
                                            </TooltipContent>
                                        </Tooltip>
                                    </TooltipProvider>
                                </div>
                                <CardDescription className="text-slate-500 font-medium">Configure your weight and target unit.</CardDescription>
                            </div>
                        </CardHeader>

                        <CardContent className="p-6 space-y-8 flex-1 flex flex-col">
                            {/* Input Configuration */}
                            <div className="space-y-4">
                                <label className="text-base font-bold text-slate-400 flex items-center gap-2">
                                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
                                    Input weight
                                </label>
                                <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center">
                                    <div className="relative group flex-1">
                                        <input
                                            type="number"
                                            value={inputValue}
                                            onChange={(e) => setInputValue(e.target.value)}
                                            className="h-12 text-lg border border-slate-300 rounded-md bg-white shadow-sm placeholder:text-slate-400 placeholder:italic w-full pr-10 text-right hover:border-blue-600 focus:border-blue-600 focus:outline-none focus:ring-4 focus:ring-blue-600/10 transition-all font-bold"
                                            placeholder="Ex: 12.00"
                                        />
                                        <div className="absolute right-0 top-0 bottom-0 flex flex-col border-l border-slate-200 bg-slate-50/50 rounded-r-md">
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    const val = parseFloat(inputValue) || 0;
                                                    setInputValue((val + 1).toString());
                                                }}
                                                className="flex items-center justify-center px-2 flex-1 hover:text-blue-600 text-slate-400 transition-colors"
                                            >
                                                <ChevronUp className="h-3 w-3" />
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    const val = parseFloat(inputValue) || 0;
                                                    setInputValue(Math.max(0, val - 1).toString());
                                                }}
                                                className="flex items-center justify-center px-2 flex-1 hover:text-blue-600 text-slate-400 transition-colors border-t border-slate-200"
                                            >
                                                <ChevronDown className="h-3 w-3" />
                                            </button>
                                        </div>
                                    </div>

                                    <div className="flex bg-slate-100 p-1 rounded-lg border border-slate-200 w-fit self-start sm:self-auto min-w-[200px]">
                                        {(["lbs", "oz", "kg", "g"] as WeightUnit[]).map((u) => (
                                            <button
                                                key={u}
                                                onClick={() => setInputUnit(u)}
                                                className={cn(
                                                    "flex-1 px-3 py-2 rounded-md text-xs font-bold transition-all uppercase",
                                                    inputUnit === u
                                                        ? "bg-white text-blue-600 shadow-sm border border-blue-200"
                                                        : "text-slate-500 hover:text-slate-900"
                                                )}
                                            >
                                                {u}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <div className="h-px bg-slate-100 w-full" />

                            {/* Target Configuration */}
                            <div className="space-y-4">
                                <label className="text-base font-bold text-slate-400 flex items-center gap-2">
                                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
                                    Convert to
                                </label>
                                <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center justify-between">
                                    <div className="font-medium text-slate-600 pl-2">
                                        Converting your Input <span className="font-bold text-slate-900">{inputValue || 0} {inputUnit.toUpperCase()}</span> to:
                                    </div>
                                    <div className="flex bg-slate-100 p-1 rounded-lg border border-slate-200 w-full sm:w-fit min-w-[200px]">
                                        {(["lbs", "oz", "kg", "g"] as WeightUnit[]).map((u) => (
                                            <button
                                                key={u}
                                                onClick={() => setTargetUnit(u)}
                                                className={cn(
                                                    "flex-1 px-4 py-2 rounded-md text-xs font-bold transition-all uppercase",
                                                    targetUnit === u
                                                        ? "bg-white text-blue-600 shadow-sm border border-blue-200"
                                                        : "text-slate-500 hover:text-slate-900",
                                                    inputUnit === u && "opacity-50 cursor-not-allowed"
                                                )}
                                                disabled={inputUnit === u}
                                            >
                                                {u}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <div className="flex gap-2 mt-auto pt-4">
                                <Button
                                    variant="outline"
                                    onClick={() => setInputValue("")}
                                    className="flex-[2] h-11 border-dashed hover:bg-slate-50 text-slate-500 hover:text-slate-900 transition-all font-medium"
                                >
                                    <RefreshCw className="w-4 h-4 mr-2" /> Reset Input
                                </Button>
                                <Button
                                    variant="outline"
                                    onClick={copyToClipboard}
                                    className="flex-1 h-11 shadow-sm border-slate-300 hover:bg-slate-50 text-slate-900 transition-all font-bold"
                                >
                                    <Copy className="w-4 h-4 mr-2" /> Copy Results
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Right Column: Results (Col Span 5) */}
                <div className="lg:col-span-5 relative space-y-8">
                    {/* Conversion Results */}
                    <Card className="border-slate-800 bg-slate-900 text-slate-50 overscroll-y-none">
                        <CardHeader className="pb-2 relative z-10">
                            <CardTitle className="text-sm font-medium tracking-wider text-slate-300/80 flex justify-between items-center">
                                <span>Conversion matrix</span>
                                <span className="bg-slate-800/50 border border-slate-700/50 px-3 py-1 rounded-full text-xs font-medium text-emerald-400 flex items-center gap-2">
                                    <div className="relative flex h-2 w-2">
                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                                    </div>
                                    Live
                                </span>
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-6 pt-6">
                            <div className="space-y-1">
                                <div className="text-5xl font-black tracking-tight text-white">
                                    <div className="flex items-baseline gap-2">
                                        <Counter
                                            value={conversions[targetUnit]}
                                        />
                                        <span className="text-lg font-medium opacity-50">
                                            {targetUnit}
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-800/60">
                                {secondaryUnits.map(unit => (
                                    <div key={unit} className="space-y-1">
                                        <p className="text-xs font-medium tracking-wider text-slate-400">
                                            {unit === 'lbs' ? 'pounds' : unit === 'oz' ? 'ounces' : unit === 'kg' ? 'kilograms' : 'grams'}
                                        </p>
                                        <div className="text-xl font-bold tracking-tight text-white break-words">
                                            <div className="flex items-baseline gap-1">
                                                <Counter value={conversions[unit]} />
                                                <span className="text-xs opacity-40 ml-1 font-medium">{unit}</span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Shipping Impact Section - MOVED HERE */}
                    <div className="space-y-2">
                        <div className="flex items-center gap-2 mb-2">
                            <div className="p-1.5 bg-slate-100 rounded-lg text-slate-600">
                                <Truck className="w-4 h-4" />
                            </div>
                            <h3 className="text-lg font-bold text-slate-900">Shipping impact analysis</h3>
                        </div>

                        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4 relative overflow-hidden group">
                            {shippingImpact ? (
                                <>
                                    {/* 1. Weight Tier Section */}
                                    <div className="space-y-4 pt-2">
                                        <div className="space-y-1">
                                            <div className="flex items-center justify-between">
                                                <span className="text-xs sm:text-[13px] font-medium text-slate-400 tracking-wide">Weight tier</span>
                                                <span className={cn("text-[10px] sm:text-[11px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider opacity-90 -mt-1 -mr-0.5", shippingImpact.statusColor)}>
                                                    {shippingImpact.status}
                                                </span>
                                            </div>
                                            <h4 className="text-xl sm:text-[22px] font-bold text-slate-900 tracking-tight leading-none pt-1">
                                                {shippingImpact.tierName}
                                            </h4>
                                        </div>
                                    </div>

                                    <div className="h-px bg-slate-100 w-full" />

                                    {/* 2. Estimated Cost Section */}
                                    <div className="space-y-1.5 pb-2">
                                        <span className="text-xs sm:text-[13px] font-medium text-slate-400 block">Estimated shipping cost</span>
                                        <div>
                                            <div className="text-2xl sm:text-[26px] font-bold text-slate-900 tracking-tight">
                                                {shippingImpact.costRange}
                                            </div>
                                            <p className="text-xs sm:text-[13px] text-slate-400 mt-1 font-normal">
                                                Cost depends on distance and carrier.
                                            </p>
                                        </div>
                                    </div>

                                    {/* Alerts */}
                                    {shippingImpact.thresholdAlert && (
                                        <div className="space-y-3 pt-2">
                                            <div className="flex gap-3 bg-amber-50 p-3 rounded-xl border border-amber-100 text-amber-800 text-sm font-semibold items-center">
                                                <AlertTriangle className="w-5 h-5 flex-shrink-0 text-amber-600" />
                                                <p>{shippingImpact.thresholdAlert}</p>
                                            </div>
                                        </div>
                                    )}
                                </>
                            ) : (
                                <>
                                    {/* Ghost Content Background */}
                                    <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:16px_16px]" />

                                    <div className="relative z-0 space-y-8 blur-[1px] opacity-[0.08] select-none pointer-events-none">
                                        <div className="space-y-3">
                                            <div className="h-3 w-16 bg-slate-400 rounded-full" />
                                            <div className="h-7 w-40 bg-slate-500 rounded-lg" />
                                            <div className="h-4 w-56 bg-slate-300 rounded-md" />
                                        </div>
                                        <div className="h-px bg-slate-200 w-full" />
                                        <div className="space-y-3">
                                            <div className="h-3 w-28 bg-slate-400 rounded-full" />
                                            <div className="h-9 w-32 bg-slate-500 rounded-lg" />
                                            <div className="h-3 w-44 bg-slate-300 rounded-md" />
                                        </div>
                                    </div>

                                    {/* Floating Insight Card */}
                                    <div className="absolute inset-0 flex items-center justify-center p-6 bg-white/20 backdrop-blur-[0.5px]">
                                        <div className="bg-white p-6 rounded-2xl shadow-xl shadow-blue-900/5 border border-slate-100 text-center space-y-3 transform transition-all duration-500 group-hover:scale-[1.02] max-w-[240px]">
                                            <div className="w-14 h-14 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl flex items-center justify-center text-blue-500 mx-auto shadow-inner">
                                                <Truck className="w-7 h-7 animate-pulse" />
                                            </div>
                                            <div className="space-y-1.5">
                                                <h4 className="text-base font-bold text-slate-900 tracking-tight">Unlock Insights</h4>
                                                <p className="text-xs text-slate-500 leading-relaxed font-medium">
                                                    Enter a weight to see <strong>carrier tiers</strong>, estimated costs & margin warnings.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
