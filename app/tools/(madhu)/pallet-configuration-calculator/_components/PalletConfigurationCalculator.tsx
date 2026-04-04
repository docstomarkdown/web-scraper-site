"use client"
import React, { useState, useMemo } from "react"
import {
    Grid3x3,
    ChevronDown,
    ChevronUp,
    Layers,
    AlertTriangle,
    Box,
    Target,
    Ruler,
    Scale,
    Settings2,
    RotateCcw,
    Info,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Card, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { ResultFeedbackCard, ResultSummaryCard, CalculatorInput, CalculatorCardHeader } from "@/app/tools/_shared/components"

type DimensionUnit = "in" | "cm"
type PalletPreset = "standard" | "euro" | "custom"

interface BoxDimensions {
    length: string
    width: string
    height: string
}

interface PalletDimensions {
    length: number
    width: number
}

const PALLET_PRESETS: Record<Exclude<PalletPreset, "custom">, PalletDimensions> = {
    standard: { length: 48, width: 40 },
    euro: { length: 47.24, width: 31.5 }, // 120cm × 80cm in inches
}

const PALLET_HEIGHT = 5.5 // Standard pallet thickness in inches

export function PalletConfigurationCalculator() {
    // Box
    const [boxDimensions, setBoxDimensions] = useState<BoxDimensions>({ length: "", width: "", height: "" })
    // Pallet
    const [palletPreset, setPalletPreset] = useState<PalletPreset>("standard")
    // Editable pallet fields (auto-filled from preset, editable)
    const [palletLength, setPalletLength] = useState("48")
    const [palletWidth, setPalletWidth] = useState("40")
    // Stack limit
    const [maxStackHeight, setMaxStackHeight] = useState("72")
    // Advanced
    const [showAdvanced, setShowAdvanced] = useState(false)
    const [allowRotation, setAllowRotation] = useState(true)
    const [boxWeight, setBoxWeight] = useState("")
    const [maxPalletWeight, setMaxPalletWeight] = useState("")
    // Unit
    const [unit, setUnit] = useState<DimensionUnit>("in")

    const handleBoxChange = (field: keyof BoxDimensions, value: string) => {
        setBoxDimensions(prev => ({ ...prev, [field]: value }))
    }

    const handlePresetChange = (preset: PalletPreset) => {
        setPalletPreset(preset)
        if (preset !== "custom") {
            const dims = PALLET_PRESETS[preset]
            if (unit === "cm") {
                // Convert inches to cm
                setPalletLength((dims.length * 2.54).toFixed(1))
                setPalletWidth((dims.width * 2.54).toFixed(1))
            } else {
                setPalletLength(dims.length.toString())
                setPalletWidth(dims.width.toString())
            }
        } else {
            setPalletLength("")
            setPalletWidth("")
        }
    }

    const convertToInches = React.useCallback((value: number): number => {
        return unit === "cm" ? value / 2.54 : value
    }, [unit])

    const results = useMemo(() => {
        const boxL = parseFloat(boxDimensions.length || "0")
        const boxW = parseFloat(boxDimensions.width || "0")
        const boxH = parseFloat(boxDimensions.height || "0")
        const bxWt = parseFloat(boxWeight || "0")
        const maxWt = parseFloat(maxPalletWeight || "0")

        if (boxL === 0 || boxW === 0 || boxH === 0) return null

        const boxLIn = convertToInches(boxL)
        const boxWIn = convertToInches(boxW)
        const boxHIn = convertToInches(boxH)
        const palL = convertToInches(parseFloat(palletLength || "48"))
        const palW = convertToInches(parseFloat(palletWidth || "40"))
        const maxH = convertToInches(parseFloat(maxStackHeight || "72"))

        const availableHeight = maxH - PALLET_HEIGHT

        // Build orientations
        const orientations = allowRotation
            ? [
                { name: "Standard", l: boxLIn, w: boxWIn, h: boxHIn },
                { name: "Rotated 90°", l: boxWIn, w: boxLIn, h: boxHIn },
                { name: "On Side (L)", l: boxHIn, w: boxWIn, h: boxLIn },
                { name: "On Side (W)", l: boxLIn, w: boxHIn, h: boxWIn },
                { name: "On End (L)", l: boxHIn, w: boxLIn, h: boxWIn },
                { name: "On End (W)", l: boxWIn, w: boxHIn, h: boxLIn },
            ]
            : [{ name: "Standard", l: boxLIn, w: boxWIn, h: boxHIn }]

        let best = {
            unitsAlongLength: 0,
            unitsAlongWidth: 0,
            unitsPerLayer: 0,
            layers: 0,
            totalUnits: 0,
            areaEfficiency: 0,
            loadHeight: 0,
            orientation: "Standard",
        }

        for (const o of orientations) {
            if (o.l <= 0 || o.w <= 0) continue
            const uL = Math.floor(palL / o.l)
            const uW = Math.floor(palW / o.w)
            const uPerLayer = uL * uW
            if (uPerLayer === 0) continue

            let layers = 0
            if (o.h > 0 && availableHeight > 0) {
                layers = Math.floor(availableHeight / o.h)
            }

            let totalUnits = uPerLayer * layers

            // Weight constraint
            if (bxWt > 0 && maxWt > 0 && totalUnits > 0) {
                const maxByWeight = Math.floor(maxWt / bxWt)
                totalUnits = Math.min(totalUnits, maxByWeight)
                layers = uPerLayer > 0 ? Math.floor(totalUnits / uPerLayer) : 0
                totalUnits = uPerLayer * layers
            }

            const usedArea = uPerLayer * (o.l * o.w)
            const palletArea = palL * palW
            const areaEfficiency = palletArea > 0 ? (usedArea / palletArea) * 100 : 0
            const loadHeight = layers * (o.h > 0 ? o.h : 0) + PALLET_HEIGHT

            const isBetter =
                totalUnits > best.totalUnits ||
                (totalUnits === best.totalUnits && totalUnits > 0 && areaEfficiency > best.areaEfficiency) ||
                (best.totalUnits === 0 && totalUnits === 0 && uPerLayer > best.unitsPerLayer)

            if (isBetter) {
                best = {
                    unitsAlongLength: uL,
                    unitsAlongWidth: uW,
                    unitsPerLayer: uPerLayer,
                    layers,
                    totalUnits,
                    areaEfficiency,
                    loadHeight,
                    orientation: o.name,
                }
            }
        }

        const totalWeight = bxWt > 0 ? best.totalUnits * bxWt : null
        const hasWeightInput = bxWt > 0

        const warnings: string[] = []
        if (best.areaEfficiency < 80 && best.unitsPerLayer > 0) warnings.push("Low area utilization — try a different pallet size")
        if (best.loadHeight > 96) warnings.push("Height exceeds standard 96\" limit")
        if (best.totalUnits === 0 && boxH > 0) warnings.push("Configuration not possible with given limits")

        return {
            ...best,
            totalWeight,
            hasWeightInput,
            maxH,
            warnings,
            palL,
            palW,
        }
    }, [boxDimensions, palletLength, palletWidth, maxStackHeight, allowRotation, boxWeight, maxPalletWeight, convertToInches])

    const arrangement = results
        ? `${results.unitsAlongLength} × ${results.unitsAlongWidth} × ${results.layers}`
        : "— × — × —"

    return (
        <div className="flex flex-col gap-10 max-w-6xl mx-auto">
            <div className="lg:col-span-12 grid grid-cols-1 lg:grid-cols-12 gap-4 items-stretch">
                {/* ═══════════════════ LEFT: INPUTS ═══════════════════ */}
                <div className="lg:col-span-7 h-full">
                    <Card className="border border-slate-200 shadow-sm bg-white overflow-hidden h-full flex flex-col">
                        <CalculatorCardHeader
                            title="Pallet Configuration Calculator"
                            description="Enter box dimensions and pallet details to find the optimal loading arrangement."
                            onReset={() => {
                                setBoxDimensions({ length: "", width: "", height: "" })
                                setPalletPreset("standard")
                                setPalletLength("48")
                                setPalletWidth("40")
                                setMaxStackHeight("72")
                                setAllowRotation(true)
                                setBoxWeight("")
                                setMaxPalletWeight("")
                                setShowAdvanced(false)
                            }}
                        />
                        <CardContent className="p-4 md:p-6 pb-10 md:pb-14 space-y-3 flex-1 flex flex-col">
                            <div className="space-y-6 max-w-[520px] mx-auto w-full">

                                {/* ─── BOX DETAILS ─── */}
                                <div className="space-y-3">
                                    <CalculatorInput
                                        hideSeparator={true}
                                        label="Length"
                                        suffix={unit}
                                        value={boxDimensions.length}
                                        onChange={(val) => handleBoxChange("length", val.toString())}
                                        placeholder="12.00"
                                        type="number"
                                        tooltip="Length of the box"
                                        groupingTitle="Box Details"
                                        groupingIcon={Box}
                                        groupingAction={
                                            <div className="flex bg-slate-100 p-0.5 rounded-lg border border-slate-200 h-7 font-sans ml-4">
                                                {(["in", "cm"] as DimensionUnit[]).map((u) => (
                                                    <button
                                                        key={u}
                                                        onClick={() => {
                                                            setUnit(u)
                                                            // Re-fill pallet dims in new unit
                                                            if (palletPreset !== "custom") {
                                                                const dims = PALLET_PRESETS[palletPreset]
                                                                setPalletLength(u === "cm" ? (dims.length * 2.54).toFixed(1) : dims.length.toString())
                                                                setPalletWidth(u === "cm" ? (dims.width * 2.54).toFixed(1) : dims.width.toString())
                                                            }
                                                        }}
                                                        className={cn(
                                                            "px-3 h-full rounded-md text-[11px] font-bold transition-all",
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
                                        suffix={unit}
                                        value={boxDimensions.width}
                                        onChange={(val) => handleBoxChange("width", val.toString())}
                                        placeholder="8.00"
                                        type="number"
                                        tooltip="Width of the box"
                                    />
                                    <CalculatorInput
                                        label="Height"
                                        suffix={unit}
                                        value={boxDimensions.height}
                                        onChange={(val) => handleBoxChange("height", val.toString())}
                                        placeholder="6.00"
                                        type="number"
                                        tooltip="Height of the box"
                                    />
                                </div>

                                {/* ─── PALLET DETAILS ─── */}
                                <div className="space-y-3">
                                    {/* Pallet grouping header + preset quick-select */}
                                    <div
                                        className="w-full relative calculator-input-row max-w-[520px] mx-auto px-3 sm:px-5"
                                        data-has-title="true"
                                    >
                                        <div className="h-px bg-slate-100/80 w-[calc(100%+48px)] -ml-6 mb-3 mt-1" />
                                        <div className="relative w-full">
                                            {/* Vertical line */}
                                            <div
                                                className="absolute left-[-19px] w-[1.5px] bg-blue-200/70 z-0"
                                                style={{ top: "14px", bottom: "10px" }}
                                            />
                                            {/* Header */}
                                            <div className="flex items-center gap-2 -ml-[33px] mb-3 relative h-7">
                                                <div className="w-7 h-7 rounded-lg bg-blue-50 ring-[6px] ring-white flex items-center justify-center flex-shrink-0 z-10">
                                                    <Layers className="w-3.5 h-3.5 text-blue-600" />
                                                </div>
                                                <span className="text-[16px] font-bold text-slate-600 capitalize z-10 tracking-tight">
                                                    Pallet Details
                                                </span>
                                            </div>

                                            {/* Preset quick-select label */}
                                            <div className="flex items-center gap-3 w-full relative z-10 mb-3">
                                                <div className="flex items-center flex-1 min-w-0">
                                                    <Label className="text-[14.5px] font-medium text-slate-600/90 py-1">
                                                        Pallet type
                                                    </Label>
                                                </div>
                                                <div className="flex-shrink-0">
                                                    <div className="flex bg-slate-100 p-0.5 rounded-lg border border-slate-200 h-8 font-sans w-36 sm:w-44">
                                                        {(["standard", "euro", "custom"] as PalletPreset[]).map((p) => (
                                                            <button
                                                                key={p}
                                                                onClick={() => handlePresetChange(p)}
                                                                className={cn(
                                                                    "flex-1 h-full rounded-md text-[10.5px] font-bold transition-all whitespace-nowrap",
                                                                    palletPreset === p
                                                                        ? "bg-white text-blue-600 shadow-sm border border-blue-200"
                                                                        : "text-slate-500 hover:text-slate-900"
                                                                )}
                                                            >
                                                                {p === "standard" ? "Standard" : p === "euro" ? "Euro" : "Custom"}
                                                            </button>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Preset hint */}
                                            {palletPreset !== "custom" && (
                                                <div className="flex items-center gap-3 w-full relative z-10 mb-1">
                                                    <div className="flex items-center flex-1 min-w-0">
                                                        <Label className="text-[13px] font-medium text-slate-400">
                                                            {palletPreset === "standard" ? "Standard (48 × 40 in)" : "Euro (120 × 80 cm)"}
                                                        </Label>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    {/* Pallet Length — always visible, auto-filled */}
                                    <CalculatorInput
                                        label="Pallet Length"
                                        suffix={unit}
                                        value={palletLength}
                                        onChange={(val) => {
                                            setPalletLength(val.toString())
                                            setPalletPreset("custom")
                                        }}
                                        placeholder="48.00"
                                        type="number"
                                        tooltip="Length of the pallet surface"
                                    />
                                    {/* Pallet Width — always visible, auto-filled */}
                                    <CalculatorInput
                                        label="Pallet Width"
                                        suffix={unit}
                                        value={palletWidth}
                                        onChange={(val) => {
                                            setPalletWidth(val.toString())
                                            setPalletPreset("custom")
                                        }}
                                        placeholder="40.00"
                                        type="number"
                                        tooltip="Width of the pallet surface"
                                    />
                                </div>

                                {/* ─── STACK LIMIT ─── */}
                                <div className="space-y-3">
                                    <CalculatorInput
                                        hideSeparator={false}
                                        label="Max Stack Height"
                                        suffix={unit}
                                        value={maxStackHeight}
                                        onChange={(val) => setMaxStackHeight(val.toString())}
                                        placeholder="72.00"
                                        type="number"
                                        tooltip="72 inches is the universal standard limit for LTL freight and Amazon FBA containers. Includes pallet base."
                                        hint="Industry standard limit"
                                        groupingTitle="Stack Limit"
                                        groupingIcon={Ruler}
                                    />
                                </div>

                                {/* ─── ADVANCED SETTINGS ─── */}
                                <div className="space-y-3">
                                    {/* Toggle row */}
                                    <div
                                        className="w-full relative calculator-input-row max-w-[520px] mx-auto px-3 sm:px-5"
                                        data-has-title="false"
                                    >
                                        <div className="h-px bg-slate-100/80 w-[calc(100%+48px)] -ml-6 mb-3 mt-1" />
                                        <button
                                            onClick={() => setShowAdvanced(!showAdvanced)}
                                            className="flex items-center gap-2 w-full group -ml-[33px] relative z-10"
                                        >
                                            <div className="w-7 h-7 rounded-lg bg-white ring-[6px] ring-white border border-slate-200 flex items-center justify-center flex-shrink-0 group-hover:bg-blue-50 group-hover:border-blue-200 transition-all duration-200 shadow-sm">
                                                <Settings2 className="w-3.5 h-3.5 text-slate-400 group-hover:text-blue-500 transition-colors" />
                                            </div>
                                            <span className="text-[15px] font-bold text-slate-600 group-hover:text-blue-600 transition-colors flex-1 text-left tracking-tight">
                                                Advanced Settings
                                                <span className="ml-1.5 font-normal italic text-[12px] text-slate-400 lowercase tracking-normal group-hover:text-blue-400/80 transition-colors">(optional)</span>
                                            </span>
                                            {showAdvanced
                                                ? <ChevronUp className="w-4 h-4 text-slate-400" />
                                                : <ChevronDown className="w-4 h-4 text-slate-400" />
                                            }
                                        </button>
                                    </div>

                                    {/* Advanced content */}
                                    {showAdvanced && (
                                        <div className="space-y-3 animate-in fade-in slide-in-from-top-2 duration-200">
                                            {/* Allow Rotation */}
                                            <div
                                                className="w-full relative calculator-input-row max-w-[520px] mx-auto px-3 sm:px-5"
                                                data-has-title="true"
                                            >
                                                <div className="relative w-full">
                                                    <div
                                                        className="absolute left-[-19px] w-[1.5px] bg-blue-200/70 z-0"
                                                        style={{ top: "14px", bottom: "10px" }}
                                                    />
                                                    <div className="flex items-center gap-2 -ml-[33px] mb-3 relative h-7">
                                                        <div className="w-7 h-7 rounded-lg bg-blue-50 ring-[6px] ring-white flex items-center justify-center flex-shrink-0 z-10">
                                                            <RotateCcw className="w-3.5 h-3.5 text-blue-600" />
                                                        </div>
                                                        <span className="text-[15px] font-bold text-slate-600 z-10 tracking-tight">
                                                            Optimization
                                                        </span>
                                                    </div>
                                                    <div className="flex items-center gap-3 w-full relative z-10">
                                                        <div className="flex items-center gap-2 flex-1 min-w-0 text-left">
                                                            <Label className="text-[14.5px] font-medium text-slate-600/90 py-1">
                                                                Allow Rotation
                                                            </Label>
                                                            <TooltipProvider delayDuration={200}>
                                                                <Tooltip>
                                                                    <TooltipTrigger asChild>
                                                                        <button
                                                                            type="button"
                                                                            tabIndex={-1}
                                                                            className="text-slate-400 hover:text-blue-600 transition-colors cursor-help shrink-0"
                                                                        >
                                                                            <Info className="h-3.5 w-3.5" />
                                                                        </button>
                                                                    </TooltipTrigger>
                                                                    <TooltipContent side="top" className="max-w-xs text-[13px] font-normal bg-slate-900 text-white border-slate-800">
                                                                        Determine if boxes can be rotated to find a better fit on the pallet.
                                                                    </TooltipContent>
                                                                </Tooltip>
                                                            </TooltipProvider>
                                                        </div>
                                                        <div className="flex-shrink-0">
                                                            <div className="flex bg-slate-100 p-0.5 rounded-lg border border-slate-200 h-8 font-sans w-28">
                                                                {[true, false].map((v) => (
                                                                    <button
                                                                        key={v.toString()}
                                                                        onClick={() => setAllowRotation(v)}
                                                                        className={cn(
                                                                            "flex-1 h-full rounded-md text-[11px] font-bold transition-all",
                                                                            allowRotation === v
                                                                                ? "bg-white text-blue-600 shadow-sm border border-blue-200"
                                                                                : "text-slate-500 hover:text-slate-900"
                                                                        )}
                                                                    >
                                                                        {v ? "Yes" : "No"}
                                                                    </button>
                                                                ))}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Weight inputs */}
                                            <CalculatorInput
                                                hideSeparator={false}
                                                label="Box Weight"
                                                suffix="lb"
                                                value={boxWeight}
                                                onChange={(val) => setBoxWeight(val.toString())}
                                                placeholder="10.00"
                                                type="number"
                                                tooltip="Weight of a single box in pounds (optional)"
                                                groupingTitle="Weight"
                                                groupingIcon={Scale}
                                            />
                                            <CalculatorInput
                                                label="Max Pallet Weight"
                                                suffix="lb"
                                                value={maxPalletWeight}
                                                onChange={(val) => setMaxPalletWeight(val.toString())}
                                                placeholder="2500.00"
                                                type="number"
                                                tooltip="Maximum total weight this pallet can carry in pounds (optional)"
                                            />
                                        </div>
                                    )}
                                </div>

                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* ═══════════════════ RIGHT: RESULTS ═══════════════════ */}
                <div className="lg:col-span-5 flex flex-col space-y-3 h-full">
                    {/* Primary Result */}
                    <ResultSummaryCard
                        title="Optimal Configuration"
                        checklistItems={[
                            { label: "Box Length", isComplete: boxDimensions.length !== "" },
                            { label: "Box Width", isComplete: boxDimensions.width !== "" },
                            { label: "Box Height", isComplete: boxDimensions.height !== "" },
                        ]}
                        primaryResult={{
                            value: results ? results.totalUnits : 0,
                            unit: "boxes",
                            label: "Total Boxes per Pallet",
                            key: "totalUnits",
                        }}
                        secondaryResults={[
                            {
                                key: "arrangement",
                                label: "Final Arrangement",
                                value: results
                                    ? `${results.unitsAlongLength} × ${results.unitsAlongWidth} × ${results.layers}`
                                    : "— × — × —",
                                tooltip: "Boxes along Length × Width × Height (layers)",
                                icon: Grid3x3,
                            },
                            {
                                key: "areaEfficiency",
                                label: "Space Used",
                                value: results ? parseFloat(results.areaEfficiency.toFixed(1)) : 0,
                                unit: "%",
                                tooltip: "Percentage of pallet surface area utilized",
                                icon: Target,
                            },
                            {
                                key: "loadHeight",
                                label: "Used Height",
                                value: results ? parseFloat(results.loadHeight.toFixed(1)) : 0,
                                unit: "/ " + (results ? parseFloat(results.maxH.toFixed(0)) : "72") + (unit === "cm" ? " cm" : " in"),
                                tooltip: "Load height vs. max allowed stack height",
                                icon: Ruler,
                            },
                            ...(results?.hasWeightInput
                                ? [{
                                    key: "totalWeight",
                                    label: "Total Weight",
                                    value: results.totalWeight ?? 0,
                                    unit: "lb",
                                    tooltip: "Total weight of all boxes on the pallet",
                                    icon: Scale,
                                }]
                                : []),
                        ]}
                        isCalculated={!!results}
                        showLiveBadge={!!results}
                        liveBadgeText={results ? (results.areaEfficiency >= 80 ? "Optimal Fit" : "Low Area Use") : "Draft"}
                        emptyMessage="Pallet configuration"
                        emptyResultLabel="Total Boxes per Pallet"
                    />

                    {/* Visual Layout — Top View Grid */}
                    <ResultFeedbackCard
                        title={
                            <div className="flex items-center gap-2 -ml-1 h-7">
                                <div className="w-7 h-7 rounded-lg bg-blue-50 ring-[6px] ring-white flex items-center justify-center flex-shrink-0 z-10">
                                    <Grid3x3 className="w-3.5 h-3.5 text-blue-600" />
                                </div>
                                <span className="text-[13px] sm:text-[14px] font-bold text-slate-500 z-10 tracking-tight">
                                    Pallet Layout — Top View
                                </span>
                            </div>
                        }
                        variant="compact"
                    >
                        <PalletTopView results={results} />
                    </ResultFeedbackCard>
                </div>
            </div>
        </div>
    )
}

/* ─────────────────────────────────────────────────────────
   PREMIUM ISOMETRIC PALLET VISUALIZATION
───────────────────────────────────────────────────────── */
interface TopViewProps {
    results: {
        unitsAlongLength: number
        unitsAlongWidth: number
        unitsPerLayer: number
        layers: number
        totalUnits: number
        areaEfficiency: number
        warnings: string[]
    } | null
}

function PalletTopView({ results }: TopViewProps) {
    const isDummy = !results;
    const displayResults = isDummy ? {
        orientation: "Standard",
        unitsPerLayer: 12,
        layers: 4,
        totalUnits: 48,
        unitsAlongLength: 4,
        unitsAlongWidth: 3,
        areaEfficiency: 0,
    } : results;

    return (
        <div className="space-y-3 relative group flex-1 flex flex-col min-h-[220px]">
            {/* Isometric 3D Visualization */}
            <div className={cn(
                "flex-1 flex flex-col items-center justify-center py-4 min-h-[200px] rounded-xl border overflow-hidden relative group transition-all duration-500",
                isDummy ? "bg-slate-50 border-slate-100" : "bg-slate-50/50 border-slate-200/50"
            )}>
                {/* Background Grid Pattern */}
                <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
                    style={{ backgroundImage: `radial-gradient(#3b82f6 1px, transparent 0)`, backgroundSize: '24px 24px' }}
                />
                
                {/* Ghost Overlay for Dummy State */}
                {isDummy && (
                    <div className="absolute inset-0 z-20 flex items-center justify-center bg-white/40 backdrop-blur-[1px]">
                        <div className="bg-white px-5 py-3 rounded-2xl shadow-[0_8px_30px_rgba(59,130,246,0.08)] border border-blue-50 text-[13px] font-semibold flex flex-col items-center gap-2 group/badge transition-all duration-300 hover:scale-105">
                            <div className="w-9 h-9 rounded-xl bg-blue-50 flex items-center justify-center text-blue-500 mb-1 border border-blue-100/50 shadow-sm">
                                <Box className="w-5 h-5 animate-pulse" />
                            </div>
                            <div className="flex flex-col items-center">
                                <span className="text-slate-400 text-[11px] font-bold uppercase tracking-wider mb-0.5">Ready to design</span>
                                <span className="text-slate-600">Enter box dimensions to preview</span>
                            </div>
                        </div>
                    </div>
                )}
                
                <div className={cn(
                    "relative perspective-[1200px] w-full h-full flex items-center justify-center pointer-events-none transition-all duration-700",
                    isDummy ? "opacity-30 scale-95 grayscale" : "opacity-100 scale-100"
                )}>
                    {/* Isometric Container */}
                    <div
                        className="relative transition-all duration-1000 ease-out group-hover:scale-[1.05]"
                        style={{
                            transform: 'rotateX(60deg) rotateZ(-45deg)',
                            transformStyle: 'preserve-3d',
                            width: '180px',
                            height: '140px'
                        }}
                    >
                        {/* Wood Pallet Shadow */}
                        <div className="absolute inset-[-15%] bg-slate-900/10 blur-3xl rounded-full transform translate-z-[-30px]" />
                        
                        {/* Pallet Base (Wooden Look) */}
                        <div className="absolute inset-0 bg-[#d4a373] border-b-4 border-r-4 border-[#bc8a5f] shadow-xl rounded-sm transform translate-z-[-10px]">
                            <div className="absolute inset-0 flex flex-col gap-1.5 p-1 opacity-25">
                                {Array.from({ length: 5 }).map((_, i) => (
                                    <div key={i} className="h-full border-b-[1px] border-[#8b5e34]" />
                                ))}
                            </div>
                        </div>
                        
                        {/* Stacking Boxes (Pseudo-3D) */}
                        <div className="absolute inset-0 grid gap-1.5 pt-1.5 pl-1.5"
                            style={{
                                gridTemplateColumns: `repeat(${displayResults.unitsAlongLength}, 1fr)`,
                                gridTemplateRows: `repeat(${displayResults.unitsAlongWidth}, 1fr)`
                            }}
                        >
                            {Array.from({ length: Math.min(displayResults.unitsPerLayer, 100) }).map((_, i) => (
                                <div
                                    key={i}
                                    className="relative transition-all duration-500"
                                    style={{ transformStyle: 'preserve-3d' }}
                                >
                                    {/* Base Layer */}
                                    <div className="absolute inset-0 bg-blue-500 border border-blue-600/50 shadow-sm" />
                                    {/* Top Face */}
                                    <div
                                        className="absolute inset-0 bg-gradient-to-br from-blue-300 to-blue-500 border border-blue-400 shadow-[inset_0_0_10px_rgba(255,255,255,0.2)]"
                                        style={{
                                            transform: `translateZ(${Math.min(displayResults.layers * 8, 80)}px)`,
                                            transition: 'transform 1s ease-out'
                                        }}
                                    >
                                        <div className="absolute top-1/2 left-1 right-1 h-0.5 bg-white/20" />
                                    </div>
                                    {/* Side faces */}
                                    <div
                                        className="absolute left-full top-0 h-full bg-[#1e40af] origin-left border-y border-r border-[#1e3a8a]"
                                        style={{
                                            width: `${Math.min(displayResults.layers * 8, 80)}px`,
                                            transform: 'rotateY(90deg)',
                                            transition: 'width 1s ease-out'
                                        }}
                                    />
                                    <div
                                        className="absolute left-0 top-full w-full bg-[#1e3a8a] origin-top border-x border-b border-[#172554]"
                                        style={{
                                            height: `${Math.min(displayResults.layers * 8, 80)}px`,
                                            transform: 'rotateX(-90deg)',
                                            transition: 'height 1s ease-out'
                                        }}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                
                {/* Bottom Legend */}
                <div className="absolute bottom-3 left-0 right-0 px-6 flex justify-between items-center text-slate-400">
                    <div className="flex flex-col gap-0">
                        <span className="text-[13px] sm:text-[14px] font-bold text-slate-500 leading-tight">Arrangement</span>
                        <span className={cn("text-[16px] sm:text-[17px] font-bold tracking-tight block", isDummy ? "text-blue-400" : "text-slate-700")}>
                            {displayResults.unitsAlongLength} × {displayResults.unitsAlongWidth} Grid
                        </span>
                    </div>
                    <div className="h-6 w-px bg-slate-200 mx-1" />
                    <div className="flex flex-col items-center gap-0">
                        <span className="text-[13px] sm:text-[14px] font-bold text-slate-500 leading-tight">Total stack</span>
                        <span className={cn("text-[16px] sm:text-[17px] font-bold tracking-tight block", isDummy ? "text-blue-400" : "text-blue-600")}>
                            {displayResults.layers} {displayResults.layers === 1 ? 'Layer' : 'Layers'}
                        </span>
                    </div>
                    <div className="h-6 w-px bg-slate-200 mx-1" />
                    <div className="flex flex-col items-end gap-0 text-right">
                        <span className="text-[13px] sm:text-[14px] font-bold text-slate-500 leading-tight">Fill Rate</span>
                        <span className={cn("text-[16px] sm:text-[17px] font-bold tracking-tight block", isDummy ? "text-blue-400" : "text-slate-700")}>
                            {isDummy ? "—" : `${displayResults.areaEfficiency.toFixed(0)}%`}
                        </span>
                    </div>
                </div>
            </div>
            
            {/* Warnings Section - Only for Real Results */}
            {!isDummy && results!.warnings.length > 0 && (
                <div className="space-y-1.5 mt-2.5">
                    {results!.warnings.map((warning, i) => (
                        <div key={i} className="flex gap-2 bg-amber-50/50 px-2 py-1.5 rounded-lg border border-amber-100 text-amber-800 text-[10px] font-bold items-center">
                            <AlertTriangle className="w-3 h-3 shrink-0 text-amber-500" />
                            <span>{warning}</span>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}
