"use client"
import React, { useState, useMemo } from "react"
import {
    Package,
    Grid3x3,
    RefreshCw,
    ChevronUp,
    ChevronDown,
    HelpCircle,
    Layers,
    AlertTriangle,
    TrendingUp,
    Box,
    Target,
    Truck,
    DollarSign,
    Ruler,
    Scale,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Counter, ResultFeedbackCard, ResultSummaryCard, CalculatorInput, CalculatorCardHeader } from "@/app/tools/_shared/components"
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
    const [boxDimensions, setBoxDimensions] = useState<BoxDimensions>({
        length: "",
        width: "",
        height: "",
        weight: ""
    })
    const [stackLimits, setStackLimits] = useState<StackLimits>(STACK_PRESETS.standard)
    const [unit, setUnit] = useState<DimensionUnit>("in")
    const [palletType, setPalletType] = useState<Exclude<PalletType, "custom"> | "custom">("standard-us")
    const [customPallet, setCustomPallet] = useState({ length: "", width: "" })
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
    }, [boxDimensions, palletType, customPallet, stackLimits, convertToInches])

    return (
        <div className="flex flex-col gap-10 max-w-6xl mx-auto">
            <div className="lg:col-span-12 grid grid-cols-1 lg:grid-cols-12 gap-4 items-stretch">
                {/* Left Column: Inputs */}
                <div className="lg:col-span-7 h-full">
                    <Card className="border border-slate-200 shadow-sm bg-white overflow-hidden h-full flex flex-col">
                        <CalculatorCardHeader
                            title="Pallet Configuration Calculator"
                            description="Enter box dimensions and pallet constraints to calculate optimal loading."
                            onReset={() => {
                                setBoxDimensions({ length: "", width: "", height: "", weight: "" })
                                setStackLimits(STACK_PRESETS.standard)
                                setSelectedPreset("standard")
                                setPalletType("standard-us")
                                setCustomPallet({ length: "", width: "" })
                            }}
                        />
                        <CardContent className="p-4 md:p-6 pb-10 md:pb-14 space-y-3 flex-1 flex flex-col">
                            {/* All Inputs in Groups */}
                            <div className="space-y-6 max-w-[520px] mx-auto w-full">
                                {/* Box Dimensions & Weight — with Measurement system toggle as groupingAction */}
                                <div className="space-y-3">
                                    <CalculatorInput
                                        hideSeparator={true}
                                        label="Length"
                                        suffix={unit}
                                        value={boxDimensions.length}
                                        onChange={(val) => handleBoxChange('length', val.toString())}
                                        placeholder="12.00"
                                        type="number"
                                        tooltip="Length of the box in the selected unit"
                                        groupingTitle="Box details"
                                        groupingIcon={Box}
                                        groupingAction={
                                            <div className="flex bg-slate-100 p-0.5 rounded-lg border border-slate-200 h-7 font-sans ml-4">
                                                {(["in", "cm"] as DimensionUnit[]).map((u) => (
                                                    <button
                                                        key={u}
                                                        onClick={() => setUnit(u)}
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
                                        onChange={(val) => handleBoxChange('width', val.toString())}
                                        placeholder="8.00"
                                        type="number"
                                        tooltip="Width of the box in the selected unit"
                                    />
                                    <CalculatorInput
                                        label="Height"
                                        suffix={unit}
                                        value={boxDimensions.height}
                                        onChange={(val) => handleBoxChange('height', val.toString())}
                                        placeholder="6.00"
                                        type="number"
                                        tooltip="Height of the box in the selected unit"
                                    />
                                    <CalculatorInput
                                        label="Weight"
                                        suffix="lb"
                                        value={boxDimensions.weight}
                                        onChange={(val) => handleBoxChange('weight', val.toString())}
                                        placeholder="10.00"
                                        type="number"
                                        tooltip="Weight of a single box in pounds"
                                    />
                                </div>
                                {/* Pallet Selection — grouping header with type toggle as groupingAction */}
                                <div className="space-y-3">
                                    <div
                                        className="w-full relative calculator-input-row max-w-[520px] mx-auto px-3 sm:px-5"
                                        data-has-title="true"
                                    >
                                        <div className="h-px bg-slate-100/80 w-[calc(100%+48px)] -ml-6 mb-3 mt-1" />
                                        <div className="relative w-full">
                                            {/* Vertical connecting line — spans both sub-rows */}
                                            <div
                                                className="absolute left-[-19px] w-[1.5px] bg-blue-200/70 z-0"
                                                style={{ top: '14px', bottom: '10px' }}
                                            />
                                            {/* Grouping Header — icon + title only */}
                                            <div className="flex items-center gap-2 -ml-[33px] mb-3 relative h-7">
                                                <div className="w-7 h-7 rounded-lg bg-blue-50 ring-[6px] ring-white flex items-center justify-center flex-shrink-0 z-10">
                                                    <Layers className="w-3.5 h-3.5 text-blue-600" />
                                                </div>
                                                <span className="text-[16px] font-bold text-slate-600 capitalize z-10 tracking-tight">
                                                    Pallet type
                                                </span>
                                            </div>
                                            {/* Type selector sub-row — label left, toggle right */}
                                            <div className="flex items-center gap-3 w-full relative z-10 mb-3">
                                                <div className="flex items-center flex-1 min-w-0">
                                                    <Label className="text-[14.5px] font-medium text-slate-600/90 py-1">
                                                        Select type
                                                    </Label>
                                                </div>
                                                <div className="flex-shrink-0">
                                                    <div className="flex bg-slate-100 p-0.5 rounded-lg border border-slate-200 h-7 font-sans w-36 sm:w-44">
                                                        {(['standard-us', 'euro', 'custom'] as const).map((t) => (
                                                            <button
                                                                key={t}
                                                                onClick={() => setPalletType(t)}
                                                                className={cn(
                                                                    "flex-1 h-full rounded-md text-[10px] font-bold transition-all uppercase whitespace-nowrap",
                                                                    palletType === t
                                                                        ? "bg-white text-blue-600 shadow-sm border border-blue-200"
                                                                        : "text-slate-500 hover:text-slate-900"
                                                                )}
                                                            >
                                                                {t === 'standard-us' ? 'US' : t === 'euro' ? 'EU' : 'Custom'}
                                                            </button>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                            {/* Fixed dimensions sub-row — only for standard presets */}
                                            {palletType !== 'custom' && (
                                                <div className="flex items-center gap-3 w-full relative z-10">
                                                    <div className="flex items-center flex-1 min-w-0">
                                                        <Label className="text-[14.5px] font-medium text-slate-600/90 py-1">
                                                            {palletType === 'standard-us' ? 'Standard US' : 'Euro'} pallet
                                                        </Label>
                                                    </div>
                                                    <div className="flex-shrink-0">
                                                        <span className="flex items-center justify-end px-3 h-11 text-[16px] font-semibold text-slate-600 bg-white rounded-xl border-2 border-slate-200 shadow-sm w-36 sm:w-44">
                                                            {palletType === 'standard-us' ? '48" × 40"' : '47.2" × 39.4"'}
                                                        </span>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    {/* Custom pallet inputs — direct siblings of the group wrapper so DOM group detection works */}
                                    {palletType === 'custom' && (
                                        <>
                                            <CalculatorInput
                                                label="Pallet length"
                                                suffix={unit}
                                                value={customPallet.length}
                                                onChange={(val) => handleCustomPalletChange('length', val.toString())}
                                                placeholder="48.00"
                                                type="number"
                                                tooltip="Length of the custom pallet in the selected unit"
                                            />
                                            <CalculatorInput
                                                label="Pallet width"
                                                suffix={unit}
                                                value={customPallet.width}
                                                onChange={(val) => handleCustomPalletChange('width', val.toString())}
                                                placeholder="40.00"
                                                type="number"
                                                tooltip="Width of the custom pallet in the selected unit"
                                            />
                                        </>
                                    )}
                                </div>
                                {/* Stack Limits */}
                                <div className="space-y-3">
                                    {/* Configuration mode - Custom structure matching CalculatorInput grouping style */}
                                    <div
                                        className="w-full relative calculator-input-row max-w-[520px] mx-auto px-3 sm:px-5"
                                        data-has-title="true"
                                    >
                                        {/* Section Separator */}
                                        <div className="h-px bg-slate-100/80 w-[calc(100%+48px)] -ml-6 mb-3 mt-1" />
                                        
                                        <div className="relative w-full">
                                            {/* Grouping Header */}
                                            <div className="flex items-center gap-2 -ml-[33px] mb-0.5 relative h-7">
                                                <div className="w-7 h-7 rounded-lg bg-blue-50 ring-[6px] ring-white flex items-center justify-center flex-shrink-0 z-10">
                                                    <Truck className="w-3.5 h-3.5 text-blue-600" />
                                                </div>
                                                <span className="text-[16px] font-bold text-slate-600 capitalize z-10 tracking-tight flex-1">
                                                    Stack limits
                                                </span>
                                            </div>
                                            
                                            {/* Vertical connecting line */}
                                            <div
                                                className="absolute left-[-19px] w-[1.5px] bg-blue-200/70 z-0"
                                                style={{
                                                    top: '14px',
                                                    bottom: '-50px',
                                                }}
                                            />
                                            
                                            {/* Configuration mode field */}
                                            <div className="flex items-center gap-3 w-full relative z-10">
                                                <div className="flex items-center gap-2 flex-1 min-w-0 text-left">
                                                    <Label className="text-[14.5px] font-medium text-slate-600/90 cursor-pointer py-1">
                                                        Configuration mode
                                                    </Label>
                                                </div>
                                                <div className="relative group flex-shrink-0 flex items-center gap-3">
                                                    <div className="w-36 sm:w-44">
                                                        <Select
                                                            value={selectedPreset}
                                                            onValueChange={(value: StackPreset) => {
                                                                if (value !== "custom") {
                                                                    const values = STACK_PRESETS[value]
                                                                    setStackLimits(values)
                                                                } else {
                                                                    setStackLimits({ maxHeight: "", weightLimit: "" })
                                                                }
                                                                setSelectedPreset(value)
                                                            }}
                                                        >
                                                            <SelectTrigger className={cn(
                                                                "h-11 border-2 border-slate-200 bg-white shadow-sm transition-all font-semibold text-slate-600 hover:border-blue-300 hover:shadow-md focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 focus:outline-none rounded-xl text-right w-full",
                                                                selectedPreset !== "custom" && "border-blue-200 ring-4 ring-blue-50"
                                                            )}>
                                                                <div className="flex items-center justify-center gap-2 w-full pr-1">
                                                                    {selectedPreset === "standard" && <Truck className="w-4 h-4 text-blue-500 shrink-0" />}
                                                                    {selectedPreset === "amazon" && <Package className="w-4 h-4 text-blue-500 shrink-0" />}
                                                                    {selectedPreset === "full-truck" && <Target className="w-4 h-4 text-blue-500 shrink-0" />}
                                                                    {selectedPreset === "double-stack" && <Layers className="w-4 h-4 text-blue-500 shrink-0" />}
                                                                    {selectedPreset === "custom" && <RefreshCw className="w-4 h-4 text-slate-400 shrink-0" />}
                                                                    <span className={cn(
                                                                        "truncate text-center text-[15px]",
                                                                        selectedPreset !== "custom" ? "text-blue-600 font-semibold" : "text-slate-700 font-semibold"
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
                                                                            <span className="text-[10px] text-slate-500 font-medium">Safe Gap (72&quot; / 2500lb)</span>
                                                                        </div>
                                                                    </div>
                                                                </SelectItem>
                                                                <SelectItem value="amazon" className="py-3 focus:bg-blue-50">
                                                                    <div className="flex items-center gap-3">
                                                                        <Package className="w-4 h-4 text-slate-400" />
                                                                        <div className="flex flex-col text-left">
                                                                            <span className="font-bold text-sm">Amazon FBA</span>
                                                                            <span className="text-[10px] text-slate-500 font-medium">Warehouse (72&quot; / 1500lb)</span>
                                                                        </div>
                                                                    </div>
                                                                </SelectItem>
                                                                <SelectItem value="full-truck" className="py-3 focus:bg-blue-50">
                                                                    <div className="flex items-center gap-3">
                                                                        <Target className="w-4 h-4 text-slate-400" />
                                                                        <div className="flex flex-col text-left">
                                                                            <span className="font-bold text-sm">Max Volume (FTL)</span>
                                                                            <span className="text-[10px] text-slate-500 font-medium">High-Cube (96&quot; / 3000lb)</span>
                                                                        </div>
                                                                    </div>
                                                                </SelectItem>
                                                                <SelectItem value="double-stack" className="py-3 focus:bg-blue-50">
                                                                    <div className="flex items-center gap-3">
                                                                        <Layers className="w-4 h-4 text-slate-400" />
                                                                        <div className="flex flex-col text-left">
                                                                            <span className="font-bold text-sm">Double Stacking</span>
                                                                            <span className="text-[10px] text-slate-500 font-medium">Low Profile (48&quot; / 1200lb)</span>
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
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <CalculatorInput
                                        label="Max height"
                                        suffix={unit}
                                        value={stackLimits.maxHeight}
                                        onChange={(val) => {
                                            handleStackLimitChange('maxHeight', val.toString())
                                            setSelectedPreset("custom")
                                        }}
                                        placeholder="72.00"
                                        type="number"
                                        tooltip="Maximum allowed height for the loaded pallet in the selected unit"
                                    />
                                    <CalculatorInput
                                        label="Weight limit"
                                        suffix="lb"
                                        value={stackLimits.weightLimit}
                                        onChange={(val) => {
                                            handleStackLimitChange('weightLimit', val.toString())
                                            setSelectedPreset("custom")
                                        }}
                                        placeholder="2500.00"
                                        type="number"
                                        tooltip="Maximum allowed weight for the loaded pallet in pounds"
                                    />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
                {/* Right Column: Results */}
                <div className="lg:col-span-5 flex flex-col space-y-3 h-full">
                    {/* Primary Result Card */}
                    <ResultSummaryCard
                        title="Optimal Configuration"
                        checklistItems={[
                            { label: "Enter Box Length", isComplete: boxDimensions.length !== "" },
                            { label: "Enter Box Width", isComplete: boxDimensions.width !== "" }
                        ]}
                        primaryResult={{
                            value: results ? results.totalUnits : 0,
                            unit: "units",
                            label: "Total Units Per Pallet",
                            key: "totalUnits"
                        }}
                        secondaryResults={[
                            {
                                key: "unitsPerLayer",
                                label: "Units per layer",
                                value: results ? `${results.unitsPerLayer} (${results.unitsAlongLength}×${results.unitsAlongWidth})` : "0 (0×0)",
                                tooltip: "Number of boxes that fit on a single layer",
                                icon: Grid3x3,
                            },
                            {
                                key: "layers",
                                label: "Total layers",
                                value: results ? results.layers : 0,
                                unit: "layers",
                                tooltip: "Number of layers stacked vertically",
                                icon: Layers,
                            },
                            {
                                key: "orientation",
                                label: "Orientation",
                                value: results ? results.orientation : "Standard",
                                tooltip: "Optimal box orientation for maximum efficiency",
                                icon: RefreshCw,
                            },
                            {
                                key: "areaEfficiency",
                                label: "Space efficiency",
                                value: results ? results.areaEfficiency : 0,
                                unit: "%",
                                tooltip: "Percentage of pallet surface area utilized",
                                icon: Target,
                            },
                            {
                                key: "totalWeight",
                                label: "Total weight",
                                value: results ? results.totalWeight : 0,
                                unit: "lb",
                                tooltip: "Total weight of all boxes on the pallet",
                                icon: Scale,
                            },
                            {
                                key: "loadHeight",
                                label: "Load height",
                                value: results ? results.loadHeight : 0,
                                unit: "in",
                                tooltip: "Total height of the loaded pallet including pallet base",
                                icon: Ruler,
                            }
                        ]}
                        isCalculated={!!results}
                        showLiveBadge={true}
                        liveBadgeText="Live"
                        emptyMessage="Pallet configuration"
                        emptyResultLabel="Total Units Per Pallet"
                    />
                    {/* Visual Layout Card */}
                    <ResultFeedbackCard
                        title={
                            <div className="flex items-center gap-2 -ml-1 h-7">
                                <div className="w-7 h-7 rounded-lg bg-blue-50 ring-[6px] ring-white flex items-center justify-center flex-shrink-0 z-10">
                                    <Grid3x3 className="w-3.5 h-3.5 text-blue-600" />
                                </div>
                                <span className="text-[15px] font-semibold text-slate-500 uppercase z-10 tracking-tight">
                                    Pallet Layout
                                </span>
                            </div>
                        }
                        variant="compact"
                        mainValue={null}
                    >
                        <div className="space-y-3 relative group flex-1 flex flex-col min-h-[220px]">
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
                                                    <span className="text-[9px] font-bold tracking-[0.05em] uppercase opacity-50">Arrangement</span>
                                                    <span className={cn("text-xs font-bold", isDummy ? "text-blue-400" : "text-slate-900")}>
                                                        {displayResults.unitsAlongLength} × {displayResults.unitsAlongWidth} Grid
                                                    </span>
                                                </div>
                                                <div className="h-6 w-px bg-slate-200 mx-2" />
                                                <div className="flex flex-col items-end gap-0 text-right">
                                                    <span className="text-[9px] font-bold tracking-[0.05em] uppercase opacity-50">Total stack</span>
                                                    <span className={cn("text-xs font-bold", isDummy ? "text-blue-400" : "text-blue-600")}>
                                                        {displayResults.layers} {displayResults.layers === 1 ? 'Layer' : 'Layers'}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                        {/* Warnings Section - Only for Real Results */}
                                        {!isDummy && results.warnings.length > 0 && (
                                            <>
                                                <div className="space-y-1.5 mt-2.5">
                                                    {results.warnings.map((warning, i) => (
                                                        <div key={i} className="flex gap-2 bg-amber-50/50 px-2 py-1.5 rounded-lg border border-amber-100 text-amber-800 text-[10px] font-bold items-center">
                                                            <AlertTriangle className="w-3 h-3 shrink-0 text-amber-500" />
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
