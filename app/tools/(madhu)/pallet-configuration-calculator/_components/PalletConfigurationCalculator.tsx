"use client"

import React, { useState, useMemo } from "react"
import { Package, Grid3x3, RefreshCw, Copy, ChevronUp, ChevronDown, HelpCircle, Layers, AlertTriangle, TrendingUp, Box } from "lucide-react"
import { cn } from "@/lib/utils"
import { useToast } from "@/hooks/use-toast"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Counter } from "@/app/tools/_shared/components"

type DimensionUnit = "in" | "cm"
type PalletType = "standard-us" | "euro" | "custom"

interface BoxDimensions {
    length: string
    width: string
    height: string
}

interface PalletDimensions {
    length: number
    width: number
    maxHeight: number
}

const PALLET_TYPES: Record<PalletType, PalletDimensions> = {
    "standard-us": { length: 48, width: 40, maxHeight: 96 },
    "euro": { length: 47.2, width: 39.4, maxHeight: 96 },
    "custom": { length: 48, width: 40, maxHeight: 96 }
}

const PALLET_HEIGHT = 5.5 // Standard pallet thickness in inches

export function PalletConfigurationCalculator() {
    const { toast } = useToast()
    const [boxDimensions, setBoxDimensions] = useState<BoxDimensions>({
        length: "",
        width: "",
        height: ""
    })
    const [unit, setUnit] = useState<DimensionUnit>("in")
    const [palletType, setPalletType] = useState<PalletType>("standard-us")
    const [customPallet, setCustomPallet] = useState<PalletDimensions>({
        length: 48,
        width: 40,
        maxHeight: 96
    })

    const handleBoxChange = (field: keyof BoxDimensions, value: string) => {
        setBoxDimensions(prev => ({ ...prev, [field]: value }))
    }

    const handleCustomPalletChange = (field: keyof PalletDimensions, value: string) => {
        setCustomPallet(prev => ({ ...prev, [field]: parseFloat(value) || 0 }))
    }

    // Convert dimensions to inches for calculation
    const convertToInches = (value: number): number => {
        return unit === "cm" ? value / 2.54 : value
    }

    const results = useMemo(() => {
        const boxL = parseFloat(boxDimensions.length || "0")
        const boxW = parseFloat(boxDimensions.width || "0")
        const boxH = parseFloat(boxDimensions.height || "0")

        if (boxL === 0 || boxW === 0 || boxH === 0) {
            return null
        }

        // Convert to inches
        const boxLengthIn = convertToInches(boxL)
        const boxWidthIn = convertToInches(boxW)
        const boxHeightIn = convertToInches(boxH)

        const pallet = palletType === "custom" ? customPallet : PALLET_TYPES[palletType]

        // Calculate all possible orientations
        const orientations = [
            { name: "Standard", l: boxLengthIn, w: boxWidthIn, h: boxHeightIn },
            { name: "Rotated 90°", l: boxWidthIn, w: boxLengthIn, h: boxHeightIn },
            { name: "On Side (L)", l: boxHeightIn, w: boxWidthIn, h: boxLengthIn },
            { name: "On Side (W)", l: boxLengthIn, w: boxHeightIn, h: boxWidthIn },
            { name: "On End (L)", l: boxHeightIn, w: boxLengthIn, h: boxWidthIn },
            { name: "On End (W)", l: boxWidthIn, w: boxHeightIn, h: boxLengthIn }
        ]

        let bestConfig = {
            orientation: "Standard",
            unitsPerLayer: 0,
            layers: 0,
            totalUnits: 0,
            unitsAlongLength: 0,
            unitsAlongWidth: 0,
            overhangLength: 0,
            overhangWidth: 0,
            unusedHeight: 0,
            efficiency: 0,
            boxL: boxLengthIn,
            boxW: boxWidthIn,
            boxH: boxHeightIn
        }

        for (const orientation of orientations) {
            const unitsAlongLength = Math.floor(pallet.length / orientation.l)
            const unitsAlongWidth = Math.floor(pallet.width / orientation.w)
            const unitsPerLayer = unitsAlongLength * unitsAlongWidth

            const availableHeight = pallet.maxHeight - PALLET_HEIGHT
            const layers = Math.floor(availableHeight / orientation.h)
            const totalUnits = unitsPerLayer * layers

            const overhangLength = pallet.length - (unitsAlongLength * orientation.l)
            const overhangWidth = pallet.width - (unitsAlongWidth * orientation.w)
            const unusedHeight = availableHeight - (layers * orientation.h)

            const usedVolume = totalUnits * (orientation.l * orientation.w * orientation.h)
            const palletVolume = pallet.length * pallet.width * availableHeight
            const efficiency = (usedVolume / palletVolume) * 100

            if (totalUnits > bestConfig.totalUnits) {
                bestConfig = {
                    orientation: orientation.name,
                    unitsPerLayer,
                    layers,
                    totalUnits,
                    unitsAlongLength,
                    unitsAlongWidth,
                    overhangLength,
                    overhangWidth,
                    unusedHeight,
                    efficiency,
                    boxL: orientation.l,
                    boxW: orientation.w,
                    boxH: orientation.h
                }
            }
        }

        // Calculate warnings
        const warnings = []
        if (bestConfig.overhangLength > 3 || bestConfig.overhangWidth > 3) {
            warnings.push("Significant unused edge space detected")
        }
        if (bestConfig.efficiency < 70) {
            warnings.push("Low pallet efficiency - consider adjusting box dimensions")
        }
        if ((bestConfig.layers * bestConfig.boxH) + PALLET_HEIGHT > 96) {
            warnings.push("Height exceeds standard 96\" limit")
        }
        if (bestConfig.totalUnits === 0) {
            warnings.push("Box dimensions too large for selected pallet")
        }

        // Check for unrealistically large dimensions
        const maxDimension = Math.max(boxLengthIn, boxWidthIn, boxHeightIn)
        if (maxDimension > 100) {
            warnings.push(`Box dimension of ${maxDimension.toFixed(1)}" seems unusually large. Typical boxes are 6-24 inches.`)
        }

        return { ...bestConfig, warnings, pallet }
    }, [boxDimensions, unit, palletType, customPallet])

    const copyResults = () => {
        if (!results) return

        const text = `
Pallet Configuration Calculator Result:
Box Dimensions: ${boxDimensions.length}×${boxDimensions.width}×${boxDimensions.height} ${unit}
Pallet Type: ${palletType === "custom" ? "Custom" : palletType === "standard-us" ? "Standard US (48\"×40\")" : "Euro (47.2\"×39.4\")"}

Optimal Configuration:
Orientation: ${results.orientation}
Units per Layer: ${results.unitsPerLayer} (${results.unitsAlongLength} × ${results.unitsAlongWidth})
Layers: ${results.layers}
Total Units per Pallet: ${results.totalUnits}
Pallet Efficiency: ${results.efficiency.toFixed(1)}%
`.trim()

        navigator.clipboard.writeText(text)
        toast({
            title: "Results Copied",
            description: "Configuration data copied to clipboard.",
        })
    }

    const scrollToGuide = () => {
        const element = document.getElementById('how-to-use')
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' })
        }
    }

    return (
        <div className="p-8 sm:p-12 max-w-6xl mx-auto">
            <div className="lg:col-span-12 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
                {/* Left Column: Inputs */}
                <div className="lg:col-span-7 h-full">
                    <Card className="border border-slate-200 shadow-sm bg-white overflow-hidden h-full flex flex-col">
                        <CardHeader className="pb-4 border-b border-slate-50 flex flex-col items-start space-y-6">
                            <div className="space-y-1 w-full">
                                <div className="flex items-center gap-3">
                                    <CardTitle className="text-2xl font-bold text-blue-600">
                                        Configuration Inputs
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
                                                How to use this calculator
                                            </TooltipContent>
                                        </Tooltip>
                                    </TooltipProvider>
                                </div>
                                <CardDescription className="text-slate-500 font-medium font-sans">
                                    Enter box dimensions and select pallet type.
                                </CardDescription>
                            </div>
                        </CardHeader>

                        <CardContent className="p-6 space-y-6 flex-1 flex flex-col">
                            {/* Unit Switcher */}
                            <div className="flex bg-slate-100 p-1 rounded-lg border border-slate-200 w-full">
                                {(["in", "cm"] as DimensionUnit[]).map((u) => (
                                    <button
                                        key={u}
                                        onClick={() => setUnit(u)}
                                        className={cn(
                                            "flex-1 px-3 py-2 rounded-md text-xs font-bold transition-all uppercase",
                                            unit === u
                                                ? "bg-white text-blue-600 shadow-sm border border-blue-200"
                                                : "text-slate-500 hover:text-slate-900"
                                        )}
                                    >
                                        {u === "in" ? "Inches" : "Centimeters"}
                                    </button>
                                ))}
                            </div>

                            {/* Box Dimensions */}
                            <div className="space-y-4">
                                <label className="text-base font-bold text-slate-400 flex items-center gap-2">
                                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
                                    Box dimensions ({unit})
                                </label>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    {[
                                        { id: 'length' as const, label: 'Length' },
                                        { id: 'width' as const, label: 'Width' },
                                        { id: 'height' as const, label: 'Height' }
                                    ].map((field) => (
                                        <div key={field.id} className="relative group">
                                            <input
                                                type="number"
                                                value={boxDimensions[field.id]}
                                                onChange={(e) => handleBoxChange(field.id, e.target.value)}
                                                className="h-12 w-full text-lg border border-slate-300 rounded-md bg-white shadow-sm placeholder:italic text-right pr-10 hover:border-blue-600 focus:border-blue-600 focus:outline-none focus:ring-4 focus:ring-blue-600/10 transition-all font-bold"
                                                placeholder={field.label}
                                            />
                                            <div className="absolute right-0 top-0 bottom-0 flex flex-col border-l border-slate-200 bg-slate-50/50 rounded-r-md">
                                                <button
                                                    onClick={() => handleBoxChange(field.id, (parseFloat(boxDimensions[field.id] || "0") + 1).toString())}
                                                    className="flex items-center justify-center px-1.5 flex-1 hover:text-blue-600 text-slate-400 transition-colors"
                                                >
                                                    <ChevronUp className="h-3 w-3" />
                                                </button>
                                                <button
                                                    onClick={() => handleBoxChange(field.id, Math.max(0, (parseFloat(boxDimensions[field.id] || "0") - 1)).toString())}
                                                    className="flex items-center justify-center px-1.5 flex-1 hover:text-blue-600 text-slate-400 transition-colors border-t border-slate-200"
                                                >
                                                    <ChevronDown className="h-3 w-3" />
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="h-px bg-slate-100 w-full" />

                            {/* Pallet Type Selection */}
                            <div className="space-y-4">
                                <label className="text-base font-bold text-slate-400 flex items-center gap-2">
                                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
                                    Pallet type
                                </label>
                                <div className="grid grid-cols-1 gap-3">
                                    {[
                                        { id: 'standard-us' as const, label: 'Standard US', dimensions: '48" × 40"' },
                                        { id: 'euro' as const, label: 'Euro Pallet', dimensions: '47.2" × 39.4"' },
                                        { id: 'custom' as const, label: 'Custom Size', dimensions: 'Set your own' }
                                    ].map((type) => (
                                        <button
                                            key={type.id}
                                            onClick={() => setPalletType(type.id)}
                                            className={cn(
                                                "p-4 rounded-lg border-2 transition-all text-left",
                                                palletType === type.id
                                                    ? "border-blue-600 bg-blue-50"
                                                    : "border-slate-200 bg-white hover:border-slate-300"
                                            )}
                                        >
                                            <div className="flex items-center justify-between">
                                                <div>
                                                    <div className="font-bold text-slate-900">{type.label}</div>
                                                    <div className="text-sm text-slate-500">{type.dimensions}</div>
                                                </div>
                                                <div className={cn(
                                                    "w-5 h-5 rounded-full border-2 flex items-center justify-center",
                                                    palletType === type.id ? "border-blue-600" : "border-slate-300"
                                                )}>
                                                    {palletType === type.id && (
                                                        <div className="w-3 h-3 rounded-full bg-blue-600"></div>
                                                    )}
                                                </div>
                                            </div>
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Custom Pallet Inputs */}
                            {palletType === "custom" && (
                                <div className="space-y-4 p-4 bg-slate-50 rounded-lg border border-slate-200">
                                    <label className="text-sm font-bold text-slate-600">Custom pallet dimensions (inches)</label>
                                    <div className="grid grid-cols-3 gap-3">
                                        <div>
                                            <label className="text-xs text-slate-500 mb-1 block">Length</label>
                                            <input
                                                type="number"
                                                value={customPallet.length}
                                                onChange={(e) => handleCustomPalletChange('length', e.target.value)}
                                                className="h-10 w-full text-sm border border-slate-300 rounded-md bg-white px-3 font-bold"
                                            />
                                        </div>
                                        <div>
                                            <label className="text-xs text-slate-500 mb-1 block">Width</label>
                                            <input
                                                type="number"
                                                value={customPallet.width}
                                                onChange={(e) => handleCustomPalletChange('width', e.target.value)}
                                                className="h-10 w-full text-sm border border-slate-300 rounded-md bg-white px-3 font-bold"
                                            />
                                        </div>
                                        <div>
                                            <label className="text-xs text-slate-500 mb-1 block">Max Height</label>
                                            <input
                                                type="number"
                                                value={customPallet.maxHeight}
                                                onChange={(e) => handleCustomPalletChange('maxHeight', e.target.value)}
                                                className="h-10 w-full text-sm border border-slate-300 rounded-md bg-white px-3 font-bold"
                                            />
                                        </div>
                                    </div>
                                </div>
                            )}

                            <div className="flex gap-2 mt-auto pt-4">
                                <Button
                                    variant="outline"
                                    onClick={() => setBoxDimensions({ length: "12", width: "10", height: "8" })}
                                    className="flex-1 h-11 bg-blue-50 border-blue-200 hover:bg-blue-100 text-blue-700 hover:text-blue-900 transition-all font-medium"
                                >
                                    <Package className="w-4 h-4 mr-2" /> Try Example
                                </Button>
                                <Button
                                    variant="outline"
                                    onClick={() => setBoxDimensions({ length: "", width: "", height: "" })}
                                    className="flex-1 h-11 border-dashed hover:bg-slate-50 text-slate-500 hover:text-slate-900 transition-all font-medium"
                                >
                                    <RefreshCw className="w-4 h-4 mr-2" /> Reset
                                </Button>
                                <Button
                                    variant="outline"
                                    onClick={copyResults}
                                    className="flex-1 h-11 shadow-sm border-slate-300 hover:bg-slate-50 text-slate-900 transition-all font-bold"
                                >
                                    <Copy className="w-4 h-4 mr-2" /> Copy
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Right Column: Results */}
                <div className="lg:col-span-5 flex flex-col space-y-6 h-full">
                    {/* Primary Result Card */}
                    <Card className="border-slate-800 bg-slate-900 text-slate-50 overflow-hidden relative">
                        {/* Decorative Background */}
                        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full -mr-16 -mt-16 blur-3xl pointer-events-none" />

                        <CardHeader className="pb-1">
                            <CardTitle className="text-sm font-medium tracking-wider text-slate-400 flex justify-between items-center">
                                <span>OPTIMAL CONFIGURATION</span>
                                <span className="bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 rounded-full text-xs font-medium text-emerald-400 flex items-center gap-2">
                                    <div className="relative flex h-2 w-2">
                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                                    </div>
                                    Live Calculation
                                </span>
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4 pt-4">
                            {results ? (
                                <>
                                    <div className="flex justify-between items-end">
                                        <div className="text-5xl font-black tracking-tight text-white flex items-baseline gap-2">
                                            <Counter
                                                value={results.totalUnits}
                                                formatter={(val) => Math.round(val).toString()}
                                            />
                                            <span className="text-lg font-medium opacity-50">units</span>
                                        </div>
                                        <p className="text-xs font-medium tracking-wider text-slate-500">Per pallet</p>
                                    </div>

                                    <div className="h-px bg-slate-800/80 w-full" />

                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-1">
                                            <p className="text-xs font-medium tracking-wider text-slate-500">Units per layer</p>
                                            <div className="text-xl font-bold text-white flex items-baseline gap-1">
                                                <Counter
                                                    value={results.unitsPerLayer}
                                                    formatter={(val) => Math.round(val).toString()}
                                                />
                                                <span className="text-xs opacity-40">({results.unitsAlongLength}×{results.unitsAlongWidth})</span>
                                            </div>
                                        </div>
                                        <div className="space-y-1">
                                            <p className="text-xs font-medium tracking-wider text-slate-500">Total layers</p>
                                            <div className="text-xl font-bold text-white flex items-baseline gap-1">
                                                <Counter
                                                    value={results.layers}
                                                    formatter={(val) => Math.round(val).toString()}
                                                />
                                                <span className="text-xs opacity-40">layers</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="h-px bg-slate-800/80 w-full" />

                                    <div className="space-y-2">
                                        <div className="flex justify-between items-center">
                                            <span className="text-xs text-slate-400">Orientation</span>
                                            <span className="text-sm font-bold text-white">{results.orientation}</span>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span className="text-xs text-slate-400">Pallet efficiency</span>
                                            <span className={cn(
                                                "text-sm font-bold",
                                                results.efficiency >= 80 ? "text-emerald-400" :
                                                    results.efficiency >= 70 ? "text-amber-400" : "text-red-400"
                                            )}>
                                                {results.efficiency.toFixed(1)}%
                                            </span>
                                        </div>
                                    </div>
                                </>
                            ) : (
                                <div className="py-8 text-center space-y-2">
                                    <Package className="w-12 h-12 mx-auto text-slate-600 mb-3" />
                                    <p className="text-sm font-bold text-slate-700">Enter box dimensions to calculate</p>
                                    <p className="text-xs text-slate-500 max-w-[200px] mx-auto">Try the example button for a 12"×10"×8" box</p>
                                </div>
                            )}
                        </CardContent>
                    </Card>

                    {/* Visual Layout Card */}
                    <div className="space-y-2 flex-1 flex flex-col">
                        <div className="flex items-center gap-2 mb-2">
                            <div className="p-1.5 bg-slate-100 rounded-lg text-slate-600">
                                <Grid3x3 className="w-4 h-4" />
                            </div>
                            <h3 className="text-lg font-bold text-slate-900 font-sans">Pallet Layout</h3>
                        </div>

                        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4 relative overflow-hidden group flex-1 flex flex-col">
                            {results && results.totalUnits > 0 ? (
                                <>
                                    {/* Visual Grid Representation */}
                                    <div className="space-y-3">
                                        <div className="aspect-square max-w-[280px] mx-auto border-2 border-slate-300 rounded-lg p-2 bg-amber-50/30 relative">
                                            <div className="absolute top-1 left-1 text-[10px] text-slate-400 font-bold">
                                                {results.pallet.length}" × {results.pallet.width}"
                                            </div>
                                            <div className="grid gap-0.5 h-full w-full p-4"
                                                style={{
                                                    gridTemplateColumns: `repeat(${results.unitsAlongLength}, 1fr)`,
                                                    gridTemplateRows: `repeat(${results.unitsAlongWidth}, 1fr)`
                                                }}
                                            >
                                                {Array.from({ length: results.unitsPerLayer }).map((_, i) => (
                                                    <div
                                                        key={i}
                                                        className="bg-blue-500 border border-blue-600 rounded-sm"
                                                    />
                                                ))}
                                            </div>
                                        </div>
                                        <p className="text-center text-xs text-slate-500 font-medium">
                                            Top view: {results.unitsPerLayer} boxes per layer
                                        </p>
                                    </div>

                                    <div className="h-px bg-slate-100 w-full" />

                                    {/* Efficiency Metrics */}
                                    <div className="space-y-3">
                                        <div className="flex justify-between items-center">
                                            <span className="text-sm text-slate-600">Unused edge space</span>
                                            <span className="text-sm font-bold text-slate-900">
                                                {results.overhangLength.toFixed(1)}" × {results.overhangWidth.toFixed(1)}"
                                            </span>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span className="text-sm text-slate-600">Unused height</span>
                                            <span className="text-sm font-bold text-slate-900">
                                                {results.unusedHeight.toFixed(1)}"
                                            </span>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span className="text-sm text-slate-600">Total stack height</span>
                                            <span className={cn(
                                                "text-sm font-bold",
                                                (results.layers * results.boxH + PALLET_HEIGHT) > 96 ? "text-red-600" : "text-slate-900"
                                            )}>
                                                {(results.layers * results.boxH + PALLET_HEIGHT).toFixed(1)}"
                                            </span>
                                        </div>
                                    </div>

                                    {/* Warnings */}
                                    {results.warnings.length > 0 && (
                                        <>
                                            <div className="h-px bg-slate-100 w-full" />
                                            <div className="space-y-2">
                                                {results.warnings.map((warning, i) => (
                                                    <div key={i} className="flex gap-2 bg-amber-50 p-3 rounded-lg border border-amber-100 text-amber-800 text-xs font-semibold items-start">
                                                        <AlertTriangle className="w-4 h-4 flex-shrink-0 text-amber-600 mt-0.5" />
                                                        <p className="leading-snug">{warning}</p>
                                                    </div>
                                                ))}
                                            </div>
                                        </>
                                    )}
                                </>
                            ) : (
                                <>
                                    {/* Ghost Content Background */}
                                    <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:16px_16px]" />

                                    <div className="relative z-0 space-y-8 blur-[1px] opacity-[0.08] select-none pointer-events-none">
                                        <div className="aspect-square max-w-[200px] mx-auto bg-slate-300 rounded-lg" />
                                        <div className="space-y-3">
                                            <div className="h-3 w-32 bg-slate-400 rounded-full mx-auto" />
                                            <div className="h-4 w-48 bg-slate-300 rounded-md mx-auto" />
                                        </div>
                                    </div>

                                    {/* Floating Insight Card */}
                                    <div className="absolute inset-0 flex items-center justify-center p-6 bg-white/20 backdrop-blur-[0.5px]">
                                        <div className="bg-white p-6 rounded-2xl shadow-xl shadow-blue-900/5 border border-slate-100 text-center space-y-3 transform transition-all duration-500 group-hover:scale-[1.02] max-w-[240px]">
                                            <div className="w-14 h-14 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl flex items-center justify-center text-blue-500 mx-auto shadow-inner">
                                                <Grid3x3 className="w-7 h-7 animate-pulse" />
                                            </div>
                                            <div className="space-y-1.5">
                                                <h4 className="text-base font-bold text-slate-900 tracking-tight">Unlock Layout</h4>
                                                <p className="text-xs text-slate-500 leading-relaxed font-medium">
                                                    Enter box dimensions to see <strong>visual pallet layout</strong> and optimization insights.
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
