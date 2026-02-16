"use client"

import React, { useState, useMemo } from "react"
import {
    Package,
    Grid3x3,
    RefreshCw,
    Copy,
    ChevronUp,
    ChevronDown,
    HelpCircle,
    Layers,
    AlertTriangle,
    TrendingUp,
    Box,
    Target,
    TrendingDown,
    Truck,
    DollarSign,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { useToast } from "@/hooks/use-toast"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Counter, ResultFeedbackCard } from "@/app/tools/_shared/components"

type DimensionUnit = "in" | "cm"
type PalletType = "standard-us" | "euro" | "custom"

interface BoxDimensions {
    length: string
    width: string
    height: string
    weight: string
}

interface StackLimits {
    maxHeight: string
    weightLimit: string
}

type StackPreset = "standard" | "amazon" | "full-truck" | "double-stack" | "custom"

const STACK_PRESETS: Record<Exclude<StackPreset, "custom">, StackLimits> = {
    standard: { maxHeight: "72", weightLimit: "2500" },
    amazon: { maxHeight: "72", weightLimit: "1500" },
    "full-truck": { maxHeight: "96", weightLimit: "3000" },
    "double-stack": { maxHeight: "48", weightLimit: "1200" }
}

interface PalletDimensions {
    length: number
    // ... (rest of the interface depends on the previous content, let's just replace the relevant block)
    width: number
    maxHeight: number
}

const PALLET_TYPES: Record<Exclude<PalletType, "custom">, PalletDimensions> = {
    "standard-us": { length: 48, width: 40, maxHeight: 72 },
    "euro": { length: 47.2, width: 39.4, maxHeight: 72 }
}

const PALLET_HEIGHT = 5.5 // Standard pallet thickness in inches
const DEFAULT_WEIGHT_LIMIT = 2500 // lbs
const DEFAULT_MAX_HEIGHT = 72 // inches

export function PalletConfigurationCalculator() {
    const { toast } = useToast()
    const [boxDimensions, setBoxDimensions] = useState<BoxDimensions>({
        length: "",
        width: "",
        height: "",
        weight: ""
    })
    const [stackLimits, setStackLimits] = useState<StackLimits>(STACK_PRESETS.standard)
    const [unit, setUnit] = useState<DimensionUnit>("in")
    const [palletType, setPalletType] = useState<Exclude<PalletType, "custom"> | "custom">("standard-us")
    const [customPallet, setCustomPallet] = useState({ length: "48", width: "40" })
    const [selectedPreset, setSelectedPreset] = useState<StackPreset>("standard")

    const handleBoxChange = (field: keyof BoxDimensions, value: string) => {
        setBoxDimensions(prev => ({ ...prev, [field]: value }))
    }

    const handleStackLimitChange = (field: keyof StackLimits, value: string) => {
        setStackLimits(prev => ({ ...prev, [field]: value }))
    }

    const handleCustomPalletChange = (field: 'length' | 'width', value: string) => {
        setCustomPallet(prev => ({ ...prev, [field]: value }))
    }

    // Convert dimensions to inches for calculation
    const convertToInches = React.useCallback((value: number): number => {
        return unit === "cm" ? value / 2.54 : value
    }, [unit])

    const results = useMemo(() => {
        const boxL = parseFloat(boxDimensions.length || "0")
        const boxW = parseFloat(boxDimensions.width || "0")
        const boxH = parseFloat(boxDimensions.height || "0")
        const boxWt = parseFloat(boxDimensions.weight || "0")

        // Require at least Length and Width to show ANY result
        if (boxL === 0 || boxW === 0) {
            return null
        }

        // Convert to inches
        const boxLengthIn = convertToInches(boxL)
        const boxWidthIn = convertToInches(boxW)
        const boxHeightIn = convertToInches(boxH)

        const maxPalletHeight = parseFloat(stackLimits.maxHeight) || DEFAULT_MAX_HEIGHT
        const weightLimit = parseFloat(stackLimits.weightLimit) || DEFAULT_WEIGHT_LIMIT

        let palletL = 0
        let palletW = 0

        if (palletType === "custom") {
            palletL = parseFloat(customPallet.length) || 48
            palletW = parseFloat(customPallet.width) || 40
        } else {
            palletL = PALLET_TYPES[palletType].length
            palletW = PALLET_TYPES[palletType].width
        }

        const pallet = { length: palletL, width: palletW, maxHeight: maxPalletHeight }

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
            totalWeight: 0,
            loadHeight: 0,
            unitsAlongLength: 0,
            unitsAlongWidth: 0,
            overhangLength: 0,
            overhangWidth: 0,
            unusedHeight: 0,
            efficiency: 0,
            areaEfficiency: 0,
            unusedArea: 0,
            boxL: boxLengthIn,
            boxW: boxWidthIn,
            boxH: boxHeightIn
        }

        for (const orientation of orientations) {
            // Skip invalid orientations (dim <= 0)
            if (orientation.l <= 0 || orientation.w <= 0) continue

            const unitsAlongLength = Math.floor(pallet.length / orientation.l)
            const unitsAlongWidth = Math.floor(pallet.width / orientation.w)
            const unitsPerLayer = unitsAlongLength * unitsAlongWidth

            if (unitsPerLayer === 0) continue

            const availableHeight = pallet.maxHeight - PALLET_HEIGHT

            // If height is 0 (missing input), we can't calculate vertical stacking
            let layers = 0
            if (orientation.h > 0) {
                layers = Math.floor(availableHeight / orientation.h)

                // Adjust layers if weight limit is reached
                if (boxWt > 0) {
                    const maxUnitsByWeight = Math.floor(weightLimit / boxWt)
                    const maxLayersByWeight = Math.floor(maxUnitsByWeight / unitsPerLayer)
                    layers = Math.min(layers, maxLayersByWeight)
                }
            }

            const totalUnits = unitsPerLayer * layers
            const totalWeight = totalUnits * boxWt
            const loadHeight = layers * orientation.h + PALLET_HEIGHT

            const overhangLength = pallet.length - (unitsAlongLength * orientation.l)
            const overhangWidth = pallet.width - (unitsAlongWidth * orientation.w)
            const unusedHeight = pallet.maxHeight - loadHeight

            const usedVolume = totalUnits * (orientation.l * orientation.w * orientation.h)
            const palletVolume = pallet.length * pallet.width * (pallet.maxHeight - PALLET_HEIGHT)
            // Prevent NaN if no volume
            const volumeEfficiency = palletVolume > 0 && totalUnits > 0 ? (usedVolume / palletVolume) * 100 : 0

            const usedArea = unitsPerLayer * (orientation.l * orientation.w)
            const palletArea = pallet.length * pallet.width
            const areaEfficiency = (usedArea / palletArea) * 100
            const unusedArea = palletArea - usedArea

            // Selection Logic:
            // 1. Prefer configuration with more TOTAL units
            // 2. If same total units, prefer better Area Efficiency
            // 3. Fallback: If Total Units is 0 (incomplete input), pick best Units Per Layer
            const isBetter =
                totalUnits > bestConfig.totalUnits ||
                (totalUnits === bestConfig.totalUnits && totalUnits > 0 && areaEfficiency > bestConfig.areaEfficiency) ||
                (bestConfig.totalUnits === 0 && totalUnits === 0 && unitsPerLayer > bestConfig.unitsPerLayer)

            if (isBetter) {
                bestConfig = {
                    orientation: orientation.name,
                    unitsPerLayer,
                    layers,
                    totalUnits,
                    totalWeight,
                    loadHeight,
                    unitsAlongLength,
                    unitsAlongWidth,
                    overhangLength,
                    overhangWidth,
                    unusedHeight,
                    efficiency: volumeEfficiency,
                    areaEfficiency,
                    unusedArea,
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
        if (bestConfig.efficiency < 70 && bestConfig.totalUnits > 0) {
            warnings.push("Low volume efficiency - consider adjusting stack height")
        }
        if (bestConfig.areaEfficiency < 80 && bestConfig.unitsPerLayer > 0) {
            warnings.push("Low area utilization - try a different pallet size")
        }
        if (bestConfig.loadHeight > 96) {
            warnings.push("Height exceeds standard 96&quot; limit")
        }
        if (bestConfig.totalUnits === 0 && boxH > 0) {
            warnings.push("Configuration not possible with given limits")
        }

        // Check for unrealistically large dimensions
        const maxDimension = Math.max(boxLengthIn, boxWidthIn, boxHeightIn)
        if (maxDimension > 100) {
            warnings.push(`Box dimension of ${maxDimension.toFixed(1)}&quot; seems unusually large. Typical boxes are 6-24 inches.`)
        }

        return { ...bestConfig, warnings, pallet }
    }, [boxDimensions, unit, palletType, customPallet, stackLimits, convertToInches])

    const copyResults = () => {
        if (!results) return

        const text = `
Pallet Configuration Calculator Result:

Box Dimensions:
Length: ${boxDimensions.length} ${unit}
Width: ${boxDimensions.width} ${unit}
Height: ${boxDimensions.height} ${unit}
Weight: ${boxDimensions.weight} lb

Pallet Details:
Type: ${palletType === "custom" ? "Custom" : palletType === "standard-us" ? "Standard US (48\"×40\")" : "Euro (47.2\"×39.4\")"}
Max Height: ${stackLimits.maxHeight}"
Weight Limit: ${stackLimits.weightLimit} lb

Optimal Configuration:
Total Units: ${results.totalUnits}
Units per Layer: ${results.unitsPerLayer} (${results.unitsAlongLength} × ${results.unitsAlongWidth})
Total Layers: ${results.layers}
Total Weight: ${results.totalWeight.toFixed(1)} lb
Load Height: ${results.loadHeight.toFixed(1)}"
Space Efficiency: ${results.areaEfficiency.toFixed(1)}%
Volume Utilization: ${results.efficiency.toFixed(1)}%
`.trim()

        navigator.clipboard.writeText(text)
        toast({
            title: "Results Copied",
            description: "Configuration data copied to your clipboard.",
        })
    }

    const scrollToGuide = () => {
        const element = document.getElementById('how-to-use')
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' })
        }
    }

    return (
        <div className="p-4 sm:p-6 max-w-6xl mx-auto h-screen flex flex-col justify-center">
            <div className="lg:col-span-12 grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
                {/* Left Column: Inputs */}
                <div className="lg:col-span-7 h-full">
                    <Card className="border border-slate-200 shadow-sm bg-white overflow-hidden h-full flex flex-col">
                        <CardHeader className="py-3 px-6 border-b border-slate-50 flex flex-col items-start space-y-2">
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
                                    Enter box details, pallet type, and stack limits.
                                </CardDescription>
                            </div>
                        </CardHeader>

                        <CardContent className="p-5 space-y-4 flex-1 flex flex-col">
                            {/* Unit Switcher */}
                            <div className="flex bg-slate-100 p-1 rounded-lg border border-slate-200 w-full font-sans">
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

                            {/* Box Dimensions & Weight */}
                            <div className="space-y-3">
                                <label className="text-sm font-bold text-slate-400 flex items-center gap-2">
                                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
                                    Box details
                                </label>
                                <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                                    {([
                                        { id: 'length' as const, label: `Length (${unit})`, placeholder: "12" },
                                        { id: 'width' as const, label: `Width (${unit})`, placeholder: "10" },
                                        { id: 'height' as const, label: `Height (${unit})`, placeholder: "8" },
                                        { id: 'weight' as const, label: 'Weight (lb)', placeholder: "5" }
                                    ] as const).map((field) => (
                                        <div key={field.id}>
                                            <label className="text-[10px] font-bold text-slate-400 mb-1 block pl-1">{field.label}</label>
                                            <div className="relative">
                                                <Input
                                                    type="number"
                                                    value={boxDimensions[field.id]}
                                                    onChange={(e) => handleBoxChange(field.id, e.target.value)}
                                                    className="h-10 w-full text-base border-slate-300 bg-white shadow-sm placeholder:italic placeholder:text-slate-400 text-right pr-12 hover:border-blue-600 focus:border-blue-600 focus:ring-4 focus:ring-blue-600/10 transition-all font-bold"
                                                    placeholder={field.placeholder}
                                                />
                                                <div className="absolute right-0 top-0 bottom-0 flex flex-col border-l border-slate-200 bg-slate-50/50 rounded-r-md w-[22px]">
                                                    <button
                                                        onClick={() => handleBoxChange(field.id, (parseFloat(boxDimensions[field.id] || "0") + 1).toString())}
                                                        className="flex items-center justify-center flex-1 hover:text-blue-600 text-slate-400 transition-colors"
                                                    >
                                                        <ChevronUp className="h-3 w-3" />
                                                    </button>
                                                    <button
                                                        onClick={() => handleBoxChange(field.id, Math.max(0, (parseFloat(boxDimensions[field.id] || "0") - 1)).toString())}
                                                        className="flex items-center justify-center flex-1 hover:text-blue-600 text-slate-400 transition-colors border-t border-slate-200"
                                                    >
                                                        <ChevronDown className="h-3 w-3" />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="h-px bg-slate-100 w-full" />

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                {/* Pallet Selection */}
                                <div className="space-y-3">
                                    <label className="text-sm font-bold text-slate-400 flex items-center gap-2">
                                        <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
                                        Pallet type
                                    </label>
                                    <div className="space-y-2">
                                        {[
                                            { id: 'standard-us' as const, label: 'Standard US', dimensions: '48" × 40"' },
                                            { id: 'euro' as const, label: 'Euro Pallet', dimensions: '47.2" × 39.4"' },
                                            { id: 'custom' as const, label: 'Custom Size', dimensions: 'Set dimensions below' }
                                        ].map((type) => (
                                            <button
                                                key={type.id}
                                                onClick={() => setPalletType(type.id)}
                                                className={cn(
                                                    "w-full p-2.5 rounded-lg border-2 transition-all text-left",
                                                    palletType === type.id
                                                        ? "border-blue-600 bg-blue-50"
                                                        : "border-slate-200 bg-white hover:border-slate-300"
                                                )}
                                            >
                                                <div className="flex items-center justify-between">
                                                    <div>
                                                        <div className="font-bold text-slate-900">{type.label}</div>
                                                        <div className="text-xs text-slate-500">{type.dimensions}</div>
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

                                {/* Stack Limits */}
                                <div className="space-y-4">
                                    <label className="text-sm font-bold text-slate-400 flex items-center gap-2">
                                        <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
                                        Stack limits
                                    </label>
                                    <div className="space-y-3 p-3 bg-slate-50/50 rounded-lg border border-slate-200">
                                        {/* Preset Dropdown */}
                                        <div className="space-y-1.5">
                                            <div className="flex items-center justify-between px-1">
                                                <label className="text-[10px] font-bold text-slate-400">Configuration mode</label>
                                            </div>
                                            <Select
                                                value={selectedPreset}
                                                onValueChange={(value: StackPreset) => {
                                                    if (value !== "custom") {
                                                        const values = STACK_PRESETS[value]
                                                        setStackLimits(values)
                                                    }
                                                    setSelectedPreset(value)
                                                }}
                                            >
                                                <SelectTrigger className={cn(
                                                    "h-10 border-slate-200 bg-white transition-all font-bold text-slate-700 hover:border-blue-400",
                                                    selectedPreset !== "custom" && "border-blue-200 ring-4 ring-blue-50"
                                                )}>
                                                    <div className="flex items-center gap-2.5">
                                                        {selectedPreset === "standard" && <Truck className="w-4 h-4 text-blue-500" />}
                                                        {selectedPreset === "amazon" && <Package className="w-4 h-4 text-blue-500" />}
                                                        {selectedPreset === "full-truck" && <Target className="w-4 h-4 text-blue-500" />}
                                                        {selectedPreset === "double-stack" && <Layers className="w-4 h-4 text-blue-500" />}
                                                        {selectedPreset === "custom" && <RefreshCw className="w-4 h-4 text-slate-400" />}
                                                        <span className={cn(
                                                            "truncate",
                                                            selectedPreset !== "custom" ? "text-blue-600" : "text-slate-700"
                                                        )}>
                                                            {selectedPreset === "standard" && "Standard LTL"}
                                                            {selectedPreset === "amazon" && "Amazon FBA"}
                                                            {selectedPreset === "full-truck" && "Max Volume"}
                                                            {selectedPreset === "double-stack" && "Double Stack"}
                                                            {selectedPreset === "custom" && "Custom Manual Limit"}
                                                        </span>
                                                    </div>
                                                </SelectTrigger>
                                                <SelectContent className="w-[280px]">
                                                    <SelectItem value="standard" className="py-3 focus:bg-blue-50">
                                                        <div className="flex items-center gap-3">
                                                            <Truck className="w-4 h-4 text-slate-400" />
                                                            <div className="flex flex-col text-left">
                                                                <span className="font-bold text-sm">Standard LTL</span>
                                                                <span className="text-[10px] text-slate-500 font-medium">Safe Gap (72" / 2500lb)</span>
                                                            </div>
                                                        </div>
                                                    </SelectItem>
                                                    <SelectItem value="amazon" className="py-3 focus:bg-blue-50">
                                                        <div className="flex items-center gap-3">
                                                            <Package className="w-4 h-4 text-slate-400" />
                                                            <div className="flex flex-col text-left">
                                                                <span className="font-bold text-sm">Amazon FBA</span>
                                                                <span className="text-[10px] text-slate-500 font-medium">Warehouse (72" / 1500lb)</span>
                                                            </div>
                                                        </div>
                                                    </SelectItem>
                                                    <SelectItem value="full-truck" className="py-3 focus:bg-blue-50">
                                                        <div className="flex items-center gap-3">
                                                            <Target className="w-4 h-4 text-slate-400" />
                                                            <div className="flex flex-col text-left">
                                                                <span className="font-bold text-sm">Max Volume (FTL)</span>
                                                                <span className="text-[10px] text-slate-500 font-medium">High-Cube (96" / 3000lb)</span>
                                                            </div>
                                                        </div>
                                                    </SelectItem>
                                                    <SelectItem value="double-stack" className="py-3 focus:bg-blue-50">
                                                        <div className="flex items-center gap-3">
                                                            <Layers className="w-4 h-4 text-slate-400" />
                                                            <div className="flex flex-col text-left">
                                                                <span className="font-bold text-sm">Double Stacking</span>
                                                                <span className="text-[10px] text-slate-500 font-medium">Low Profile (48" / 1200lb)</span>
                                                            </div>
                                                        </div>
                                                    </SelectItem>
                                                    <SelectItem value="custom" className="py-3 border-t border-slate-100 focus:bg-blue-50">
                                                        <div className="flex items-center gap-3">
                                                            <RefreshCw className="w-4 h-4 text-blue-500" />
                                                            <div className="flex flex-col text-left">
                                                                <span className="font-bold text-sm text-blue-600">Custom Manual Limit</span>
                                                                <span className="text-[10px] text-blue-400 font-medium font-sans">User defined</span>
                                                            </div>
                                                        </div>
                                                    </SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>

                                        <div className="h-px bg-slate-200 -mx-1" />

                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <label className="text-[10px] font-bold text-slate-500 mb-1.5 block pl-1">Max height (in)</label>
                                                <Input
                                                    type="number"
                                                    value={stackLimits.maxHeight}
                                                    onChange={(e) => {
                                                        handleStackLimitChange('maxHeight', e.target.value)
                                                        setSelectedPreset("custom")
                                                    }}
                                                    className={cn(
                                                        "h-10 w-full text-sm font-bold bg-white transition-all",
                                                        selectedPreset === "custom" ? "border-blue-500 ring-2 ring-blue-500/10" : "border-slate-300"
                                                    )}
                                                />
                                            </div>
                                            <div>
                                                <label className="text-[10px] font-bold text-slate-500 mb-1.5 block pl-1">Weight limit (lb)</label>
                                                <Input
                                                    type="number"
                                                    value={stackLimits.weightLimit}
                                                    onChange={(e) => {
                                                        handleStackLimitChange('weightLimit', e.target.value)
                                                        setSelectedPreset("custom")
                                                    }}
                                                    className={cn(
                                                        "h-10 w-full text-sm font-bold bg-white transition-all",
                                                        selectedPreset === "custom" ? "border-blue-500 ring-2 ring-blue-500/10" : "border-slate-300"
                                                    )}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Custom Pallet Inputs */}
                            {palletType === "custom" && (
                                <div className="space-y-4 p-4 bg-blue-50/50 rounded-lg border border-blue-100">
                                    <label className="text-xs font-bold text-blue-600 pl-1">Custom pallet dimensions (inches)</label>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="text-[10px] text-slate-500 mb-1 block font-bold pl-1">Length</label>
                                            <Input
                                                type="number"
                                                value={customPallet.length}
                                                onChange={(e) => handleCustomPalletChange('length', e.target.value)}
                                                className="h-10 w-full text-sm border-slate-300 bg-white px-3 font-bold"
                                            />
                                        </div>
                                        <div>
                                            <label className="text-[10px] text-slate-500 mb-1 block font-bold pl-1">Width</label>
                                            <Input
                                                type="number"
                                                value={customPallet.width}
                                                onChange={(e) => handleCustomPalletChange('width', e.target.value)}
                                                className="h-10 w-full text-sm border-slate-300 bg-white px-3 font-bold"
                                            />
                                        </div>
                                    </div>
                                </div>
                            )}

                            <div className="flex gap-2 mt-auto pt-4">
                                <Button
                                    variant="outline"
                                    onClick={() => {
                                        setBoxDimensions({ length: "", width: "", height: "", weight: "" })
                                        setStackLimits(STACK_PRESETS.standard)
                                        setSelectedPreset("standard")
                                    }}
                                    className="flex-1 h-11 border-dashed hover:bg-slate-50 text-slate-500 hover:text-slate-900 transition-all font-medium"
                                >
                                    <RefreshCw className="w-4 h-4 mr-2" /> Reset
                                </Button>
                                <Button
                                    variant="outline"
                                    onClick={copyResults}
                                    className="flex-1 h-11 shadow-sm border-slate-300 hover:bg-slate-50 text-slate-900 transition-all font-bold"
                                >
                                    <Copy className="w-4 h-4 mr-2" /> Copy Results
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Right Column: Results */}
                <div className="lg:col-span-5 flex flex-col space-y-4 h-full">
                    {/* Primary Result Card */}
                    <ResultFeedbackCard
                        title="OPTIMAL CONFIGURATION"
                        titleLabel="Live Calculation"
                    >
                        <div className="space-y-4">
                            {/* Compact Main Value Row */}
                            <div className="flex items-center justify-between w-full -mt-2">
                                <div className="flex items-baseline gap-1.5">
                                    {results ? (
                                        <Counter
                                            className="text-4xl font-bold tracking-tight text-white"
                                            value={results.totalUnits}
                                            formatter={(val) => Math.round(val).toString()}
                                        />
                                    ) : (
                                        <span className="text-4xl font-bold tracking-tight text-white/20">0</span>
                                    )}
                                    <span className="text-sm font-medium opacity-60 text-white">units</span>
                                </div>
                                <span className="text-[10px] font-bold uppercase tracking-widest text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded-full border border-blue-500/20">
                                    Per pallet
                                </span>
                            </div>

                            {/* Compact Metrics Grid */}
                            <div className="grid grid-cols-2 gap-x-4 gap-y-3 pt-3 border-t border-white/10">
                                {[
                                    {
                                        label: "Units per layer",
                                        value: results ? (
                                            <span className="flex items-baseline gap-1">
                                                {results.unitsPerLayer} <span className="text-[10px] opacity-40 font-normal">({results.unitsAlongLength}×{results.unitsAlongWidth})</span>
                                            </span>
                                        ) : (
                                            <span className="flex items-baseline gap-1">
                                                0 <span className="text-[10px] opacity-20 font-normal">(0×0)</span>
                                            </span>
                                        )
                                    },
                                    {
                                        label: "Total layers",
                                        value: results ? `${results.layers} layers` : "0 layers"
                                    },
                                    {
                                        label: "Orientation",
                                        value: results ? results.orientation : "Standard"
                                    },
                                    {
                                        label: "Space efficiency",
                                        value: results ? `${results.areaEfficiency.toFixed(1)}%` : "0.0%",
                                        color: results ? (results.areaEfficiency >= 90 ? "text-emerald-400" : results.areaEfficiency >= 80 ? "text-amber-400" : "text-red-400") : "text-white/20"
                                    }
                                ].map((metric, i) => (
                                    <div key={i}>
                                        <p className="text-[10px] mb-0.5 font-bold opacity-60 text-slate-300">{metric.label}</p>
                                        <div className={cn("text-base font-bold break-all", metric.color || (results ? "text-emerald-400" : "text-white/20"))}>
                                            {metric.value}
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Weight & Height Row */}
                            <div className="grid grid-cols-2 gap-4 mt-1 tracking-tight">
                                <div className="space-y-0.5">
                                    <p className="text-[10px] opacity-40 font-bold text-slate-300">Total weight</p>
                                    <p className={cn("text-base font-bold leading-none", results ? "text-white" : "text-white/20")}>
                                        {results ? results.totalWeight.toFixed(1) : "0.0"} <span className="text-xs opacity-50">lb</span>
                                    </p>
                                </div>
                                <div className="space-y-0.5">
                                    <p className="text-[10px] opacity-40 font-bold text-slate-300">Load height</p>
                                    <p className={cn("text-base font-bold leading-none", results ? "text-white" : "text-white/20")}>
                                        {results ? results.loadHeight.toFixed(1) : "0.0"} <span className="text-xs opacity-50">in</span>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </ResultFeedbackCard>

                    {/* Visual Layout Card */}
                    <ResultFeedbackCard
                        title="Pallet Layout"
                        variant="compact"
                        mainValue={null}
                    >
                        <div className="space-y-4 relative group flex-1 flex flex-col min-h-[300px]">
                            {(() => {
                                const isDummy = !results;
                                const displayResults = isDummy ? {
                                    orientation: "Standard",
                                    unitsPerLayer: 12,
                                    layers: 4,
                                    totalUnits: 48,
                                    unitsAlongLength: 4,
                                    unitsAlongWidth: 3,
                                } : results;

                                return (
                                    <>
                                        {/* Isometric 3D Visualization */}
                                        <div className={cn(
                                            "flex-1 flex flex-col items-center justify-center py-6 min-h-[260px] rounded-xl border overflow-hidden relative group transition-all duration-500",
                                            isDummy ? "bg-slate-50 border-slate-100" : "bg-slate-50/50 border-slate-200/50"
                                        )}>
                                            {/* Background Grid Pattern */}
                                            <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
                                                style={{ backgroundImage: `radial-gradient(#3b82f6 1px, transparent 0)`, backgroundSize: '24px 24px' }}
                                            />

                                            {/* Ghost Overlay for Dummy State */}
                                            {isDummy && (
                                                <div className="absolute inset-0 z-20 flex items-center justify-center bg-white/40 backdrop-blur-[1px]">
                                                    <div className="bg-white/90 px-4 py-2 rounded-lg shadow-sm border border-slate-200 text-sm font-semibold text-slate-500 flex items-center gap-2">
                                                        <Grid3x3 className="w-4 h-4" />
                                                        Enter dimensions to update
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
                                                        width: '240px',
                                                        height: '200px'
                                                    }}
                                                >
                                                    {/* Wood Pallet Shadow */}
                                                    <div className="absolute inset-[-15%] bg-slate-900/10 blur-3xl rounded-full transform translate-z-[-30px]" />

                                                    {/* Pallet Base (Wooden Look) */}
                                                    <div className="absolute inset-0 bg-[#d4a373] border-b-8 border-r-8 border-[#bc8a5f] shadow-2xl rounded-sm transform translate-z-[-10px]">
                                                        <div className="absolute inset-0 flex flex-col gap-2 p-1 opacity-30">
                                                            {Array.from({ length: 5 }).map((_, i) => (
                                                                <div key={i} className="h-full border-b-2 border-[#8b5e34]" />
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
                                            <div className="absolute bottom-5 left-0 right-0 px-10 flex justify-between items-center text-slate-400">
                                                <div className="flex flex-col gap-0.5">
                                                    <span className="text-[10px] font-bold tracking-[0.1em] opacity-60">Arrangement</span>
                                                    <span className={cn("text-[14px] font-black tracking-tight", isDummy ? "text-slate-400" : "text-slate-900")}>
                                                        {displayResults.unitsAlongLength} × {displayResults.unitsAlongWidth} Grid
                                                    </span>
                                                </div>
                                                <div className="h-8 w-px bg-slate-200 mx-4" />
                                                <div className="flex flex-col items-end gap-0.5 text-right">
                                                    <span className="text-[10px] font-bold tracking-[0.1em] opacity-60">Total stack</span>
                                                    <span className={cn("text-[14px] font-black tracking-tight", isDummy ? "text-slate-400" : "text-blue-600")}>
                                                        {displayResults.layers} {displayResults.layers === 1 ? 'Layer' : 'Layers'}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Warnings Section - Only for Real Results */}
                                        {!isDummy && results.warnings.length > 0 && (
                                            <>
                                                <div className="h-px bg-slate-100 w-full mt-2" />
                                                <div className="space-y-2 mt-4">
                                                    {results.warnings.map((warning, i) => (
                                                        <div key={i} className="flex gap-2 bg-amber-50 p-3 rounded-lg border border-amber-100 text-amber-800 text-xs font-semibold items-start">
                                                            <AlertTriangle className="w-4 h-4 shrink-0 text-amber-500 mt-0.5" />
                                                            <span>{warning}</span>
                                                        </div>
                                                    ))}
                                                </div>
                                            </>
                                        )}
                                    </>
                                );
                            })()}
                        </div>
                    </ResultFeedbackCard>
                </div>
            </div>
        </div>
    )
}
