"use client"
import React, { useState, useMemo } from "react"
import { Ruler, Package, ArrowRight, Activity, ClipboardPenLine, ArrowLeft } from "lucide-react"
import { cn } from "@/lib/utils"
import { Card, CardContent } from "@/components/ui/card"
import { motion, AnimatePresence } from "framer-motion"
import { CalculatorInput, CalculatorCardHeader, FadeIn } from "@/app/tools/_shared/components"

// Ensure all dimension inputs align perfectly - override any dynamic classes
const dimensionInputStyle = `
    .dimensions-group-wrapper .calculator-input-row,
    .dimensions-group-wrapper > .calculator-input-row,
    .dimensions-group-wrapper .calculator-input-row[data-has-title="true"],
    .dimensions-group-wrapper .calculator-input-row[data-has-title="false"] {
        max-width: 520px !important;
        width: 100% !important;
        margin-left: auto !important;
        margin-right: auto !important;
        margin-top: 0 !important;
        padding-left: 0.75rem !important;
        padding-right: 0.75rem !important;
    }
    .dimensions-group-wrapper .calculator-input-row:not(:first-child) {
        margin-top: 0.75rem !important;
    }
    @media (min-width: 640px) {
        .dimensions-group-wrapper .calculator-input-row,
        .dimensions-group-wrapper > .calculator-input-row,
        .dimensions-group-wrapper .calculator-input-row[data-has-title="true"],
        .dimensions-group-wrapper .calculator-input-row[data-has-title="false"] {
            padding-left: 1.25rem !important;
            padding-right: 1.25rem !important;
        }
    }
`

type Unit = "in" | "cm"

interface Dimensions {
    length: string
    width: string
    height: string
}

interface ConvertedDimensionsCardProps {
    dimensions: Dimensions
    convertedL: number
    convertedW: number
    convertedH: number
    fromUnit: Unit
    toUnit: Unit
    isCalculated: boolean
}

const AXIS_META = [
    { key: "length" as const, label: "L", full: "Length" },
    { key: "width" as const, label: "W", full: "Width" },
    { key: "height" as const, label: "H", full: "Height" },
]

function ConvertedDimensionsCard(props: ConvertedDimensionsCardProps) {
    const { dimensions, convertedL, convertedW, convertedH, fromUnit, toUnit, isCalculated } = props
    const fmt = (v: number) => v.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })
    const converted = [convertedL, convertedW, convertedH]
    const fromLabel = fromUnit === "in" ? "Inches" : "Centimeters"
    const toLabel = toUnit === "in" ? "Inches" : "Centimeters"

    const completedCount = [dimensions.length, dimensions.width, dimensions.height].filter(Boolean).length
    const totalCount = 3
    const progressPct = (completedCount / totalCount) * 100

    return (
        <Card className="relative overflow-hidden border border-slate-200/60 bg-white shadow-sm rounded-2xl">
            {/* Header: RESULTS PANEL with icon */}
            <div className="flex justify-between items-center gap-4 px-6 pt-5 pb-1">
                <div className="flex items-center gap-2.5">
                    <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-blue-600/10 border border-blue-100/50 shadow-sm shadow-blue-500/5">
                        <Activity className="w-4 h-4 text-blue-600" />
                    </div>
                    <span className="text-[11px] font-black text-blue-600 uppercase tracking-[0.18em] leading-none">
                        Results Panel
                    </span>
                </div>
                <AnimatePresence mode="wait">
                    {!isCalculated ? (
                        <motion.div
                            key="progress"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.4, ease: "easeOut" }}
                            className="bg-slate-50 border border-slate-100 px-3 py-1.5 rounded-full flex items-center gap-2.5 shadow-sm"
                        >
                            <span className="text-[10px] font-black text-blue-600">{completedCount}/{totalCount}</span>
                            <div className="w-16 h-1.5 bg-blue-100/80 rounded-full overflow-hidden">
                                <motion.div
                                    className="h-full bg-gradient-to-r from-blue-400 to-blue-600 rounded-full"
                                    initial={{ width: "0%" }}
                                    animate={{ width: `${progressPct}%` }}
                                    transition={{ duration: 0.6, ease: "easeOut" }}
                                />
                            </div>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="conversion-badge"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.4, ease: "easeInOut" }}
                            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border bg-blue-50/80 border-blue-200/50 text-[10.5px] font-bold tracking-wide text-blue-600 shrink-0"
                        >
                            {fromUnit} → {toUnit}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            <AnimatePresence mode="wait">
                {!isCalculated ? (
                    <motion.div
                        key="empty"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="relative z-10 px-6 pb-6 pt-3"
                    >
                        <div className="relative">
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
                                            <ClipboardPenLine className="w-[18px] h-[18px]" />
                                        </div>
                                    </div>
                                    <div className="flex flex-col items-center gap-1.5">
                                        <div className="flex items-center gap-3 text-blue-500/70">
                                            <svg className="w-5 h-3 shrink-0" viewBox="0 0 40 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                <path d="M9 19l-7-7 7-7" />
                                                <path d="M2 12h36" />
                                            </svg>
                                            <p className="text-[12.5px] text-slate-500 font-semibold leading-snug whitespace-nowrap z-10">
                                                Fill in the inputs to see your
                                            </p>
                                        </div>
                                        <span className="inline-flex items-center px-3 py-1 rounded-lg bg-gradient-to-r from-blue-50 to-blue-100/80 text-[11.5px] font-extrabold text-blue-600/90 tracking-wide shadow-sm shadow-blue-100/50">
                                            Converted Dimensions
                                        </span>
                                    </div>
                                </motion.div>
                            </div>
                            <div className="blur-[2.5px] opacity-40 select-none pointer-events-none space-y-2 py-2">
                                {AXIS_META.map((axis, i) => (
                                    <div key={axis.key ?? i} className="flex items-center gap-3 p-3 rounded-xl bg-slate-50/50 border border-slate-100">
                                        <div className="h-5 w-5 rounded-md bg-slate-200/60 animate-pulse" />
                                        <div className="flex-1">
                                            <div className="h-2.5 w-14 rounded-full bg-slate-200/60 animate-pulse mb-1.5" />
                                            <div className="h-5 w-20 rounded-lg bg-slate-200/50 animate-pulse" />
                                        </div>
                                        <div className="h-3 w-3 rounded bg-slate-200/40 animate-pulse" />
                                        <div className="flex-1 text-right">
                                            <div className="h-2.5 w-14 rounded-full bg-slate-200/60 animate-pulse mb-1.5 ml-auto" />
                                            <div className="h-5 w-20 rounded-lg bg-slate-200/50 animate-pulse ml-auto" />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                ) : (
                    <motion.div
                        key="results"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5 }}
                        className="px-5 pb-5 pt-3"
                    >
                        <div className="space-y-2">
                            {AXIS_META.map((axis, idx) => {
                                const givenVal = dimensions[axis.key] || "0.00"
                                const convertedVal = fmt(converted[idx])
                                const isFirst = idx === 0
                                return (
                                    <motion.div
                                        key={axis.key}
                                        initial={{ opacity: 0, x: -12 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ duration: 0.35, delay: 0.08 + idx * 0.06, ease: "easeOut" }}
                                        className="group flex items-center gap-3 p-3 sm:p-3.5 rounded-xl bg-slate-50/70 border border-slate-100/80 hover:border-blue-200/60 hover:bg-blue-50/30 transition-all duration-200"
                                    >
                                        <div className="flex items-center gap-2.5 flex-1 min-w-0">
                                            <div className="flex items-center justify-center w-7 h-7 rounded-lg bg-slate-200/60 text-[11px] font-black text-slate-500 shrink-0">
                                                {axis.label}
                                            </div>
                                            <div className="min-w-0">
                                                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block leading-none mb-1">
                                                    {axis.full}
                                                </span>
                                                <span className="text-[15px] font-bold text-slate-600 tabular-nums">
                                                    {givenVal}
                                                    <span className="text-[11px] font-semibold text-slate-400 ml-1">{fromUnit}</span>
                                                </span>
                                            </div>
                                        </div>

                                        <ArrowRight className="w-3.5 h-3.5 text-slate-300 shrink-0 group-hover:text-blue-400 transition-colors" />

                                        <div className="flex-1 min-w-0 text-right">
                                            {isFirst && (
                                                <span className="text-[10px] font-bold text-blue-500/70 uppercase tracking-wider block leading-none mb-1">
                                                    Result
                                                </span>
                                            )}
                                            {!isFirst && <div className="h-2.5" />}
                                            <span className="text-[17px] font-black text-blue-600 tabular-nums tracking-tight">
                                                {convertedVal}
                                                <span className="text-[11px] font-semibold text-blue-400 ml-1">{toUnit}</span>
                                            </span>
                                        </div>
                                    </motion.div>
                                )
                            })}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </Card>
    )
}

export function DimensionConverterContent() {
    const [dimensions, setDimensions] = useState<Dimensions>({ length: "", width: "", height: "" })
    const [unit, setUnit] = useState<Unit>("in")

    const IN_TO_CM = 2.54

    const handleInputChange = (field: keyof Dimensions, value: string) => {
        setDimensions(prev => ({ ...prev, [field]: value }))
    }

    const results = useMemo(() => {
        const l = parseFloat(dimensions.length || "0")
        const w = parseFloat(dimensions.width || "0")
        const h = parseFloat(dimensions.height || "0")

        let l_cm: number
        let w_cm: number
        let h_cm: number

        if (unit === "in") {
            l_cm = l * IN_TO_CM
            w_cm = w * IN_TO_CM
            h_cm = h * IN_TO_CM
        } else {
            l_cm = l
            w_cm = w
            h_cm = h
        }

        const toIn = (v: number) => v / IN_TO_CM
        const otherUnit: Unit = unit === "in" ? "cm" : "in"
        const convertedL = otherUnit === "in" ? toIn(l_cm) : l_cm
        const convertedW = otherUnit === "in" ? toIn(w_cm) : w_cm
        const convertedH = otherUnit === "in" ? toIn(h_cm) : h_cm

        return { convertedL, convertedW, convertedH, otherUnit }
    }, [dimensions, unit])

    const isCalculated = !!(dimensions.length && dimensions.width && dimensions.height)

    return (
        <div className="p-8 sm:p-12 max-w-6xl mx-auto">
            <div className="lg:col-span-12 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
                {/* Left Column: Inputs */}
                <div className="lg:col-span-7 h-full">
                    <Card className="border-slate-200 shadow-sm relative overflow-hidden bg-white h-full flex flex-col">
                        <CalculatorCardHeader
                            title="Calculator Inputs"
                            description="Enter dimensions and select your base unit to convert."
                            guideId="how-to-use"
                            tooltip="How to use this converter"
                            onReset={() => {
                                setDimensions({ length: "", width: "", height: "" })
                                setUnit("in")
                            }}
                        />
                        <CardContent className="px-6 md:px-8 pt-3 md:pt-4 pb-12 md:pb-16 flex-1 flex flex-col">
                            <style dangerouslySetInnerHTML={{ __html: dimensionInputStyle }} />
                            <div className="max-w-[520px] mx-auto w-full">
                                <div className="space-y-3 dimensions-group-wrapper">
                                    <CalculatorInput
                                        hideSeparator
                                        label="Length"
                                        value={dimensions.length}
                                        onChange={(v) => handleInputChange("length", v.toString())}
                                        placeholder={unit === "in" ? "12.00" : "30.00"}
                                        suffix={unit}
                                        type="number"
                                        min={0}
                                        tooltip="Enter the longest dimension of your item (typically the front-to-back measurement)"
                                        groupingTitle="Dimensions"
                                        groupingIcon={Ruler}
                                        groupingAction={
                                            <div className="flex bg-slate-100 p-0.5 rounded-lg border border-slate-200 h-7 font-sans ml-4">
                                                {(["in", "cm"] as Unit[]).map((u) => (
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
                                        label="Width"
                                        value={dimensions.width}
                                        onChange={(v) => handleInputChange("width", v.toString())}
                                        placeholder={unit === "in" ? "8.00" : "20.00"}
                                        suffix={unit}
                                        type="number"
                                        min={0}
                                        tooltip="Enter the width dimension (perpendicular to length, typically left-to-right measurement)"
                                    />
                                    <CalculatorInput
                                        label="Height"
                                        value={dimensions.height}
                                        onChange={(v) => handleInputChange("height", v.toString())}
                                        placeholder={unit === "in" ? "6.00" : "15.00"}
                                        suffix={unit}
                                        type="number"
                                        min={0}
                                        tooltip="Enter the height dimension (vertical measurement, typically bottom-to-top)"
                                    />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Right Column: Results */}
                <div className="lg:col-span-5 flex flex-col space-y-3 h-full">
                    <FadeIn delay={0.2} direction="left">
                        <ConvertedDimensionsCard
                            dimensions={dimensions}
                            convertedL={results.convertedL}
                            convertedW={results.convertedW}
                            convertedH={results.convertedH}
                            fromUnit={unit}
                            toUnit={results.otherUnit}
                            isCalculated={isCalculated}
                        />
                    </FadeIn>
                </div>
            </div>
        </div>
    )
}
