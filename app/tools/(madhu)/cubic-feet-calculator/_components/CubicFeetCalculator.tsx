"use client"
import React, { useState, useMemo } from "react"
import { Box, Layers, DollarSign, Ruler, RefreshCw, Package, Calculator, Info } from "lucide-react"
import { cn } from "@/lib/utils"
import { Card, CardContent } from "@/components/ui/card"
import { CalculatorInput, CalculatorCardHeader, getCurrencySymbol, formatCurrencyValue, CurrencyIcon } from "@/app/tools/_shared/components"
import { motion, AnimatePresence } from "framer-motion"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"

type DimensionUnit = "in" | "ft" | "cm" | "m"

interface DimensionInputs {
    length: string
    width: string
    height: string
    quantity: string
    costPerVolume: string
}

const UNIT_NAMES: Record<DimensionUnit, string> = {
    in: "Inches",
    ft: "Feet",
    cm: "Centimeters",
    m: "Meters"
}

export function CubicFeetCalculator() {
    const [currency, setCurrency] = useState("USD")
    const [inputs, setInputs] = useState<DimensionInputs>({
        length: "",
        width: "",
        height: "",
        quantity: "",
        costPerVolume: ""
    })
    const [unit, setUnit] = useState<DimensionUnit>("ft")

    const handleInputChange = (field: keyof DimensionInputs, value: string) => {
        setInputs(prev => ({ ...prev, [field]: value }))
    }

    const results = useMemo(() => {
        const l = parseFloat(inputs.length || "0")
        const w = parseFloat(inputs.width || "0")
        const h = parseFloat(inputs.height || "0")
        const qty = parseFloat(inputs.quantity || "1") // default 1
        const costPerVol = parseFloat(inputs.costPerVolume || "0")
        
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

        const singleVolumeInches = volumeInCubicInches
        const totalVolumeInches = volumeInCubicInches * qty
        
        const totalCft = totalVolumeInches / 1728

        return {
            singleCft: singleVolumeInches / 1728,
            cft: totalCft,
            cbm: totalVolumeInches / 61023.7,
            inches: totalVolumeInches,
            cm: totalVolumeInches * 16.3871,
            estimatedCost: costPerVol > 0 ? totalCft * costPerVol : 0
        }
    }, [inputs, unit])

    const formatCompact = (val: number, decimals = 2): string => {
        if (val === 0) return "0"
        if (Math.abs(val) < 100000)
            return val.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: decimals })
        return new Intl.NumberFormat('en-US', { notation: "compact", maximumFractionDigits: 2 }).format(val)
    }

    const formatCurrency = (val: number) => {
        return formatCurrencyValue(val, currency, 2)
    }

    const isCalculated = !!(inputs.length && inputs.width && inputs.height && parseFloat(inputs.length) > 0)
    const qtyNum = parseFloat(inputs.quantity || "1")
    const hasMultipleUnits = qtyNum > 1
    const hasCost = parseFloat(inputs.costPerVolume || "0") > 0

    const handleReset = () => {
        setInputs({ length: "", width: "", height: "", quantity: "", costPerVolume: "" })
        setUnit("ft")
    }

    return (
        <div className="p-8 sm:p-12 max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
                
                {/* ═══ LEFT COLUMN: Input Panel ═══ */}
                <div className="lg:col-span-7 self-start lg:sticky lg:top-28">
                    <Card className="border-slate-200 shadow-sm relative overflow-hidden bg-white flex flex-col">
                        <CalculatorCardHeader
                            title="Cubic Feet Calculator"
                            description="Enter dimensions to calculate the cubic volume of your item or shipment."
                            guideId="how-to-use"
                            tooltip="How to use this calculator"
                            currency={currency}
                            onCurrencyChange={setCurrency}
                            onReset={handleReset}
                        />
                        <CardContent className="p-6 md:p-8 pb-12 md:pb-16 space-y-8 flex-1 flex flex-col">
                            <div className="space-y-6 max-w-[520px] mx-auto w-full">
                                
                                {/* ── Dimensions ── */}
                                <div className="space-y-3">
                                    <CalculatorInput
                                        hideSeparator={true}
                                        label="Length"
                                        value={inputs.length}
                                        onChange={(v) => handleInputChange('length', v.toString())}
                                        placeholder="12.00"
                                        suffix={unit}
                                        type="number"
                                        tooltip="Enter the length dimension of your item."
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
                                        hideSeparator={true}
                                        label="Width"
                                        value={inputs.width}
                                        onChange={(v) => handleInputChange('width', v.toString())}
                                        placeholder="10.00"
                                        suffix={unit}
                                        type="number"
                                        tooltip="Enter the width dimension of your item."
                                    />
                                    <CalculatorInput
                                        hideSeparator={true}
                                        label="Height"
                                        value={inputs.height}
                                        onChange={(v) => handleInputChange('height', v.toString())}
                                        placeholder="8.00"
                                        suffix={unit}
                                        type="number"
                                        tooltip="Enter the height dimension of your item."
                                    />
                                </div>

                                {/* ── Quantity ── */}
                                <div className="space-y-0">
                                    <div className="calculator-input-row max-w-[520px] mx-auto px-3 sm:px-5 pb-0">
                                        <div className="h-px bg-slate-100/80 w-[calc(100%+48px)] -ml-6 mb-3 mt-1" />
                                    </div>
                                    <CalculatorInput
                                        hideSeparator={true}
                                        label="Number of Units"
                                        value={inputs.quantity}
                                        onChange={(v) => handleInputChange('quantity', v.toString())}
                                        placeholder="1"
                                        type="number"
                                        groupingTitle="Quantity"
                                        groupingIcon={Layers}
                                        tooltip="Enter the number of identical items to calculate total volume."
                                        isOptional
                                    />
                                </div>

                                {/* ── Cost ── */}
                                <div className="space-y-0">
                                    <div className="calculator-input-row max-w-[520px] mx-auto px-3 sm:px-5 pb-0">
                                        <div className="h-px bg-slate-100/80 w-[calc(100%+48px)] -ml-6 mb-3 mt-1" />
                                    </div>
                                    <CalculatorInput
                                        hideSeparator={true}
                                        label="Cost per ft³"
                                        value={inputs.costPerVolume}
                                        onChange={(v) => handleInputChange('costPerVolume', v.toString())}
                                        placeholder="2.50"
                                        type="number"
                                        groupingTitle="Cost"
                                        groupingIcon={(props: any) => <CurrencyIcon code={currency} {...props} className={cn(props.className, "text-[12px] font-black")} />}
                                        tooltip="Enter the cost per cubic foot to estimate total shipping or storage cost."
                                        currency={currency}
                                        isOptional
                                    />
                                </div>

                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* ═══ RIGHT COLUMN: Results Panel ═══ */}
                <div className="lg:col-span-5 flex flex-col gap-3">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
                        className="flex flex-col gap-3"
                    >
                        <Card className="relative overflow-hidden border border-slate-200/60 shadow-sm rounded-2xl bg-[#F5F8FD] flex flex-col">
                            {/* Header */}
                            <div className="flex justify-between items-center gap-4 px-6 pt-5 pb-1">
                                <div className="flex items-center gap-2.5">
                                    <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-blue-600/10 border border-blue-100/50">
                                        <Calculator className="w-4 h-4 text-blue-600" />
                                    </div>
                                    <span className="text-[12px] sm:text-[13px] font-extrabold text-blue-700 uppercase tracking-[0.14em] leading-none">
                                        Results Panel
                                    </span>
                                </div>
                                <AnimatePresence mode="wait">
                                    {isCalculated ? (
                                        <motion.div
                                            key="live"
                                            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                                            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-slate-200/50 bg-emerald-100/50 text-[10.5px] font-bold text-emerald-700"
                                        >
                                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse inline-block" />
                                            Live
                                        </motion.div>
                                    ) : (
                                        <motion.div
                                            key="idle"
                                            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                                            className="text-[10.5px] font-bold text-slate-400 px-2"
                                        >
                                            Awaiting input
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>

                            <AnimatePresence mode="wait">
                                {!isCalculated ? (
                                    /* ── EMPTY STATE ── */
                                    <motion.div
                                        key="empty"
                                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                                        transition={{ duration: 0.4, ease: "easeInOut" }}
                                        className="relative z-10 px-6 pb-6 pt-2"
                                    >
                                        <div className="relative">
                                            {/* Frosted glass overlay */}
                                            <div className="absolute inset-0 z-30 flex items-center justify-center pointer-events-none">
                                                <motion.div
                                                    initial={{ opacity: 0 }}
                                                    animate={{ opacity: 1 }}
                                                    transition={{ duration: 0.55, ease: "easeOut" }}
                                                    className="bg-white/80 backdrop-blur-xl border border-white/60 shadow-[0_8px_40px_rgba(59,130,246,0.12)] rounded-2xl px-6 py-5 flex flex-col items-center gap-3 w-fit max-w-[320px] pointer-events-auto"
                                                >
                                                    <div className="relative flex items-center justify-center">
                                                        <span className="absolute w-11 h-11 rounded-xl bg-blue-400/15 animate-ping" style={{ animationDuration: "2.8s" }} />
                                                        <div className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200/60 flex items-center justify-center text-blue-500 shadow-sm">
                                                            <Package className="w-[18px] h-[18px]" />
                                                        </div>
                                                    </div>
                                                    <div className="flex flex-col items-center gap-1.5">
                                                        <div className="flex items-center gap-3 text-blue-500/70">
                                                            <svg className="w-5 h-3 shrink-0" viewBox="0 0 40 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                                <path d="M9 19l-7-7 7-7" />
                                                                <path d="M2 12h36" />
                                                            </svg>
                                                            <p className="text-[12.5px] text-slate-500 font-semibold leading-snug whitespace-nowrap z-10">
                                                                Fill in dimensions to see your
                                                            </p>
                                                        </div>
                                                        <span className="inline-flex items-center px-3 py-1 rounded-lg bg-gradient-to-r from-blue-50 to-blue-100/80 text-[11.5px] font-extrabold text-blue-600/90 tracking-wide shadow-sm shadow-blue-100/50">
                                                            Volume Results
                                                        </span>
                                                    </div>
                                                </motion.div>
                                            </div>

                                            {/* Blurred skeleton */}
                                            <div className="blur-[2.5px] opacity-40 select-none pointer-events-none">
                                                <div className="flex flex-col items-center justify-center py-5 px-4 mb-2">
                                                    <div className="h-2.5 w-24 rounded-full bg-slate-200/60 mb-3 animate-pulse" />
                                                    <div className="h-12 w-40 rounded-xl bg-slate-200/50 mb-2 animate-pulse" style={{ animationDelay: "0.1s" }} />
                                                    <div className="flex flex-col items-center gap-1.5 mt-1">
                                                        <div className="h-2 w-44 rounded-full bg-slate-200/60 animate-pulse" style={{ animationDelay: "0.2s" }} />
                                                        <div className="h-2 w-32 rounded-full bg-slate-200/50 animate-pulse" style={{ animationDelay: "0.3s" }} />
                                                    </div>
                                                </div>
                                                <div className="h-px w-full bg-slate-200/40 my-4" />
                                                <div className="space-y-3 px-2">
                                                    <div className="bg-slate-50/50 border border-slate-100 p-3 rounded-xl">
                                                        <div className="h-2 w-20 rounded-full bg-slate-200/60 mb-3 animate-pulse" />
                                                        <div className="h-4 w-16 rounded-lg bg-slate-200/50 animate-pulse" />
                                                    </div>
                                                    <div className="bg-slate-50/50 border border-slate-100 p-3 rounded-xl">
                                                        <div className="h-2 w-24 rounded-full bg-slate-200/60 mb-3 animate-pulse" style={{ animationDelay: "0.1s" }} />
                                                        <div className="h-4 w-12 rounded-lg bg-slate-200/50 animate-pulse" style={{ animationDelay: "0.15s" }} />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                ) : (
                                    /* ── RESULTS STATE ── */
                                    <motion.div
                                        key="results"
                                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                                        transition={{ duration: 0.45, ease: "easeInOut" }}
                                        className="flex flex-col gap-3 px-5 pb-5 pt-2"
                                    >
                                        {/* 1 — Target Volume (Valid-like Hero) */}
                                        <motion.div
                                            initial={{ opacity: 0, scale: 0.97 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            transition={{ duration: 0.4, delay: 0.05 }}
                                            className="relative flex flex-col items-center text-center py-6 px-4 bg-transparent"
                                        >
                                            <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.18em] leading-none mb-2">Cubic Feet</span>
                                            <motion.span
                                                key={results.singleCft}
                                                initial={{ opacity: 0, y: 4 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ duration: 0.3 }}
                                                className="text-[3.25rem] font-black text-blue-600 tracking-tighter leading-none"
                                            >
                                                {formatCompact(results.singleCft, 2)}
                                            </motion.span>
                                            <span className="text-[1rem] font-bold text-slate-700 mt-1">Cubic Feet (ft³)</span>
                                            <p className="text-[11.5px] text-slate-500 font-medium mt-2">
                                                from {inputs.length} × {inputs.width} × {inputs.height} {unit}
                                            </p>
                                        </motion.div>

                                        {/* Optional Card: Total Volume if multiple units  */}
                                        {hasMultipleUnits && (
                                            <motion.div
                                                initial={{ opacity: 0, y: 8 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ duration: 0.35, delay: 0.08 }}
                                                className="bg-white border border-slate-200/70 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] rounded-xl p-4 transition-all duration-200 hover:border-slate-300 hover:shadow-[0_4px_12px_-4px_rgba(0,0,0,0.08)] mb-1"
                                            >
                                                <div className="flex items-center justify-between">
                                                    <div className="flex items-center gap-2">
                                                        <Package className="w-4 h-4 text-blue-500 flex-shrink-0" />
                                                        <span className="text-[13px] font-bold text-slate-500">Total Volume <span className="font-medium text-[11px] ml-1 opacity-70">(×{qtyNum} items)</span></span>
                                                    </div>
                                                    <span className="text-[13px] font-bold text-slate-800">
                                                        {formatCompact(results.cft, 2)} <span className="font-normal">ft³</span>
                                                    </span>
                                                </div>
                                            </motion.div>
                                        )}

                                        {/* Card 1: Other Units */}
                                        <motion.div
                                            initial={{ opacity: 0, y: 8 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.35, delay: 0.1 }}
                                            className="bg-white border border-slate-200/70 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] rounded-xl p-4 transition-all duration-200 hover:border-slate-300 hover:shadow-[0_4px_12px_-4px_rgba(0,0,0,0.08)]"
                                        >
                                            <div className="flex items-center gap-2 mb-3">
                                                <RefreshCw className="w-4 h-4 text-blue-500 flex-shrink-0" />
                                                <span className="text-[13px] font-bold text-slate-500">Other Units</span>
                                            </div>
                                            <div className="pl-7 space-y-2">
                                                <div className="flex items-center justify-between mt-1">
                                                    <span className="text-xs text-slate-600 font-medium">Cubic Meters</span>
                                                    <span className="text-sm font-bold text-slate-800 font-mono">
                                                        {formatCompact(results.cbm, 4)}{" "}
                                                        <span className="font-normal text-xs">m³</span>
                                                    </span>
                                                </div>
                                                <div className="flex items-center justify-between mt-1">
                                                    <span className="text-xs text-slate-600 font-medium">Cubic Inches</span>
                                                    <span className="text-sm font-bold text-slate-800 font-mono">
                                                        {formatCompact(results.inches, 2)}{" "}
                                                        <span className="font-normal text-xs">in³</span>
                                                    </span>
                                                </div>
                                            </div>
                                        </motion.div>

                                        {/* Card 2: Estimated Cost */}
                                        {hasCost && (
                                            <motion.div
                                                initial={{ opacity: 0, y: 8 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ duration: 0.35, delay: 0.15 }}
                                                className="bg-white border border-blue-200/70 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] rounded-xl p-4 transition-all duration-200 hover:border-blue-300 hover:shadow-[0_4px_12px_-4px_rgba(0,0,0,0.08)] bg-blue-50/30"
                                            >
                                                <div className="flex items-center justify-between mb-2">
                                                    <div className="flex items-center gap-2">
                                                        <span className="flex items-center justify-center w-4 h-4 rounded-full bg-blue-100 text-blue-600 font-bold text-[10px] flex-shrink-0">
                                                            {getCurrencySymbol(currency)}
                                                        </span>
                                                        <span className="text-[13px] font-bold text-slate-500">
                                                            Estimated Total Cost
                                                        </span>
                                                    </div>
                                                    <span className="text-[10px] font-extrabold px-2 py-0.5 rounded bg-blue-100/80 text-blue-700">
                                                        {formatCurrency(parseFloat(inputs.costPerVolume))}/ft³
                                                    </span>
                                                </div>
                                                <div className="pl-6 pt-1">
                                                    <span className="text-xl font-black text-slate-800 tracking-tight block">
                                                        {formatCurrency(results.estimatedCost)}
                                                    </span>
                                                </div>
                                            </motion.div>
                                        )}

                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </Card>
                    </motion.div>
                </div>
                
            </div>
        </div>
    )
}
