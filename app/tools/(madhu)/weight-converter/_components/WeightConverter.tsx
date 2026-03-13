"use client"
import React, { useState, useEffect, useMemo } from "react"
import { Scale, RefreshCw, Info } from "lucide-react";
import { cn } from "@/lib/utils"
import { Card, CardContent } from "@/components/ui/card"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { CalculatorCardHeader, CalculatorInput, ResultSummaryCard, Counter } from "../../../_shared/components"
type WeightUnit = "oz" | "lbs" | "g" | "kg"
interface ConversionResult {
    oz: number
    lbs: number
    g: number
    kg: number
}
export function WeightConverter() {
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
    }, [inputUnit, targetUnit])
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
    const formatCompact = (val: number): string => {
        if (Math.abs(val) < 100000) return val.toLocaleString(undefined, { maximumFractionDigits: 2 })
        return new Intl.NumberFormat('en-US', {
            notation: "compact",
            maximumFractionDigits: 2
        }).format(val)
    }
    // Helper to get secondary units
    const secondaryUnits = useMemo(() => {
        const allUnits: WeightUnit[] = ["lbs", "oz", "kg", "g"]
        return allUnits.filter(u => u !== inputUnit && u !== targetUnit)
    }, [inputUnit, targetUnit])
    
    const handleReset = () => {
        setInputValue("")
        setInputUnit("lbs")
        setTargetUnit("kg")
    }
    return (
        <div className="p-8 sm:p-12 max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
                {/* Left Column: Input (Col Span 7) */}
                <div className="lg:col-span-7 h-full">
                    <Card className="border-slate-200 shadow-sm relative overflow-hidden bg-white h-full flex flex-col">
                        <CalculatorCardHeader
                            title="Weight Converter"
                            description="Enter your weight value and select units to convert between lbs, oz, kg, and grams."
                            guideId="how-to-use"
                            tooltip="How to use this converter"
                            onReset={handleReset}
                        />
                        <CardContent className="p-6 md:p-8 pb-12 md:pb-16 space-y-8 flex-1 flex flex-col">
                            {/* All Inputs in Groups */}
                            <div className="space-y-6 max-w-[520px] mx-auto w-full">
                                {/* Weight Configuration */}
                                <div className="weight-config-group space-y-3">
                                    <CalculatorInput
                                        hideSeparator={true}
                                        label="Input Weight"
                                        value={inputValue}
                                        onChange={(v) => setInputValue(v.toString())}
                                        placeholder="12.00"
                                        type="number"
                                        tooltip="Enter the weight value you wish to convert"
                                        groupingTitle="Weight Configuration"
                                        groupingIcon={Scale}
                                    />
                                    <div className="calculator-input-row max-w-[520px] mx-auto px-3 sm:px-5">
                                        <div className="flex items-center gap-3 w-full relative z-10">
                                            <div className="flex items-center gap-2 flex-1 min-w-0 text-left">
                                                <label className="text-[14.5px] font-medium text-slate-600/90 cursor-pointer py-1">
                                                    Weight Unit
                                                </label>
                                                <Tooltip>
                                                    <TooltipTrigger asChild>
                                                        <button
                                                            type="button"
                                                            tabIndex={-1}
                                                            className="text-slate-400 hover:text-blue-500 transition-colors cursor-help shrink-0"
                                                        >
                                                            <Info className="w-3.5 h-3.5" />
                                                        </button>
                                                    </TooltipTrigger>
                                                    <TooltipContent side="top" className="max-w-xs text-[13px] font-normal bg-slate-900 text-white border-slate-800">
                                                        Select the unit of measurement for the weight value you're entering.
                                                    </TooltipContent>
                                                </Tooltip>
                                            </div>
                                            <div className="relative group flex-shrink-0 flex items-center gap-3">
                                                <div className="flex items-center bg-slate-100 p-0.5 rounded-lg border border-slate-200 h-7 font-sans w-36 sm:w-44">
                                                    {(["lbs", "oz", "kg", "g"] as WeightUnit[]).map((u) => (
                                                        <button
                                                            key={u}
                                                            onClick={() => setInputUnit(u)}
                                                            className={cn(
                                                                "px-3 h-full rounded-md text-[10px] font-bold transition-all uppercase flex-1 flex items-center justify-center",
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
                                    </div>
                                </div>
                                {/* Conversion Target */}
                                <div className="space-y-0">
                                    <div className="calculator-input-row max-w-[520px] mx-auto px-3 sm:px-5 pb-0">
                                        <div className="h-px bg-slate-100/80 w-[calc(100%+48px)] -ml-6 mb-3 mt-1" />
                                        <div className="relative w-full">
                                            {/* Connecting Line - extends from icon to bottom of Target Unit row */}
                                            <div
                                                className="absolute left-[-19px] w-[1.5px] bg-blue-200/70 z-0"
                                                style={{
                                                    top: '14px',
                                                    bottom: '0px',
                                                }}
                                            />
                                            <div className="flex items-center gap-2 -ml-[33px] mb-0.5 relative h-7 z-10">
                                                <div className="w-7 h-7 rounded-lg bg-blue-50 ring-[6px] ring-white flex items-center justify-center flex-shrink-0 z-10">
                                                    <RefreshCw className="w-3.5 h-3.5 text-blue-600" />
                                                </div>
                                                <span className="text-[16px] font-bold text-slate-600 capitalize z-10 tracking-tight flex-1">
                                                    Conversion Target
                                                </span>
                                            </div>
                                            <div className="flex items-center gap-3 w-full relative z-10 mt-3">
                                                <div className="flex items-center gap-2 flex-1 min-w-0 text-left">
                                                    <label className="text-[14.5px] font-medium text-slate-600/90 cursor-pointer py-1">
                                                        Target Unit
                                                    </label>
                                                    <Tooltip>
                                                        <TooltipTrigger asChild>
                                                            <button
                                                                type="button"
                                                                tabIndex={-1}
                                                                className="text-slate-400 hover:text-blue-500 transition-colors cursor-help shrink-0"
                                                            >
                                                                <Info className="w-3.5 h-3.5" />
                                                            </button>
                                                        </TooltipTrigger>
                                                        <TooltipContent side="top" className="max-w-xs text-[13px] font-normal bg-slate-900 text-white border-slate-800">
                                                            Select the unit you want to convert your weight to.
                                                        </TooltipContent>
                                                    </Tooltip>
                                                </div>
                                                <div className="relative group flex-shrink-0 flex items-center gap-3">
                                                    <div className="flex items-center bg-slate-100 p-0.5 rounded-lg border border-slate-200 h-7 font-sans w-36 sm:w-44">
                                                        {(["lbs", "oz", "kg", "g"] as WeightUnit[]).map((u) => (
                                                            <button
                                                                key={u}
                                                                onClick={() => setTargetUnit(u)}
                                                                disabled={inputUnit === u}
                                                                className={cn(
                                                                    "px-3 h-full rounded-md text-[10px] font-bold transition-all uppercase flex-1 flex items-center justify-center",
                                                                    targetUnit === u
                                                                        ? "bg-white text-blue-600 shadow-sm border border-blue-200"
                                                                        : "text-slate-500 hover:text-slate-900",
                                                                    inputUnit === u && "opacity-50 cursor-not-allowed"
                                                                )}
                                                            >
                                                                {u}
                                                            </button>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
                {/* Right Column: Results (Col Span 5) */}
                <div className="lg:col-span-5 flex flex-col space-y-3 h-full">
                    {/* Conversion Results */}
                    <ResultSummaryCard
                        title="Conversion Result"
                        primaryResult={{
                            value: formatCompact(conversions[targetUnit]),
                            unit: targetUnit.toUpperCase(),
                            label: "Target Conversion",
                            key: "target"
                        }}
                        secondaryResults={secondaryUnits.map((unit) => ({
                            key: unit,
                            label: unit === 'lbs' ? 'Pounds' : unit === 'oz' ? 'Ounces' : unit === 'kg' ? 'Kilograms' : 'Grams',
                            value: formatCompact(conversions[unit]),
                            unit: unit.toUpperCase(),
                            tooltip: `Weight in ${unit === 'lbs' ? 'pounds' : unit === 'oz' ? 'ounces' : unit === 'kg' ? 'kilograms' : 'grams'}`
                        }))}
                        isCalculated={!!inputValue}
                        checklistItems={[
                            { label: "Enter Weight", isComplete: !!inputValue }
                        ]}
                        emptyResultLabel="Conversion Result"
                        description={inputValue ? `Converted from ${inputValue} ${inputUnit} to ${targetUnit}` : undefined}
                    />
                </div >
            </div >
        </div >
    )
}
