"use client"
import React, { useState, useEffect } from "react"
import { ActionButtons, Counter } from "../../ToolTemplate"
import { CalculatorInput, CalculatorCardHeader, ResultSummaryCard, FadeIn, ToolSectionHeader as MadhuSubHeader } from "@/app/tools/_shared/components"
import { useToast } from "@/hooks/use-toast"
import {
    Box,
    Container,
    Package,
    Layers,
    XCircle,
    Info,
    Scale,
    Ruler
} from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger } from "@/components/ui/select"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
const CONTAINERS = {
    "custom": {
        name: "Custom Container",
        length: 0,
        width: 0,
        height: 0,
        maxWeight: 0,
        volume: 0 // m3
    },
    "20ft": {
        name: "20ft Standard",
        length: 5898,
        width: 2352,
        height: 2393,
        maxWeight: 28200,
        volume: 33.2 // m3
    },
    "40ft": {
        name: "40ft Standard",
        length: 12032,
        width: 2352,
        height: 2393,
        maxWeight: 26600,
        volume: 67.7 // m3
    },
    "40hc": {
        name: "40ft High Cube",
        length: 12032,
        width: 2352,
        height: 2698,
        maxWeight: 28600,
        volume: 76.4 // m3
    },
    "45hc": {
        name: "45ft High Cube",
        length: 13556,
        width: 2352,
        height: 2698,
        maxWeight: 27700,
        volume: 86.0 // m3
    },
    "20rf": {
        name: "20ft Reefer",
        length: 5444,
        width: 2284,
        height: 2267,
        maxWeight: 27400,
        volume: 28.3 // m3
    },
    "40rf": {
        name: "40ft Reefer",
        length: 11583,
        width: 2284,
        height: 2250,
        maxWeight: 27700,
        volume: 59.3 // m3
    },
    "40hr": {
        name: "40ft HC Reefer",
        length: 11583,
        width: 2284,
        height: 2532,
        maxWeight: 29500,
        volume: 67.3 // m3
    }
}
export function ContainerLoadCalculator() {
    const { toast } = useToast()
    const scrollToSection = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            const offset = 100;
            const elementPosition = element.getBoundingClientRect().top + window.scrollY;
            const offsetPosition = elementPosition - offset;
            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    }
    const scrollToGuide = () => scrollToSection('how-to-use')
    const scrollToPallet = () => scrollToSection('pallet-details')
    // 1. Container Selection
    const [selectedContainer, setSelectedContainer] = useState<keyof typeof CONTAINERS>("20ft")
    const [customCLength, setCustomCLength] = useState<number | "">("")
    const [customCWidth, setCustomCWidth] = useState<number | "">("")
    const [customCHeight, setCustomCHeight] = useState<number | "">("")
    const [customCWeight, setCustomCWeight] = useState<number | "">("")
    // 2. Unit Details (Carton)
    const [length, setLength] = useState<number | "">("")
    const [width, setWidth] = useState<number | "">("")
    const [height, setHeight] = useState<number | "">("")
    const [weight, setWeight] = useState<number | "">("")
    // 3. Loading Type
    const [loadType, setLoadType] = useState<"loose" | "pallet">("loose")
    // 4. Pallet Details (Only if loadType === 'pallet')
    const [palletLength, setPalletLength] = useState<number | "">("")
    const [palletWidth, setPalletWidth] = useState<number | "">("")
    const [palletHeight, setPalletHeight] = useState<number | "">("")
    const [palletWeight, setPalletWeight] = useState<number | "">("")
    // Settings
    const [unitSystem, setUnitSystem] = useState<"metric" | "imperial">("metric")
    const [canRotate, setCanRotate] = useState(true)
    // Results
    const [result, setResult] = useState<any>(null)
    const [hasScrolledToPallet, setHasScrolledToPallet] = useState(false)
    useEffect(() => {
        if (loadType === 'pallet' && length && width && height && weight && !hasScrolledToPallet) {
            setTimeout(scrollToPallet, 300)
            setHasScrolledToPallet(true)
        }
        if (!length || !width || !height || !weight || loadType === 'loose') {
            setHasScrolledToPallet(false)
        }
    }, [length, width, height, weight, loadType, hasScrolledToPallet, scrollToPallet])
    useEffect(() => {
        if (!length || !width || !height || !weight || (loadType === "pallet" && (!palletLength || !palletWidth || !palletHeight))) {
            setResult(null)
            return
        }
        if (selectedContainer === "custom" && (!customCLength || !customCWidth || !customCHeight || !customCWeight)) {
            setResult(null)
            return
        }
        const cartonL = Number(length)
        const cartonW = Number(width)
        const cartonH = Number(height)
        const cartonWt = Number(weight)
        if (cartonL <= 0 || cartonW <= 0 || cartonH <= 0 || cartonWt <= 0) return
        let cL_mm, cW_mm, cH_mm, cWt_kg
        let pL_mm, pW_mm, pH_mm, pWt_kg
        if (unitSystem === "metric") {
            cL_mm = cartonL * 10
            cW_mm = cartonW * 10
            cH_mm = cartonH * 10
            cWt_kg = cartonWt
            pL_mm = Number(palletLength) * 10
            pW_mm = Number(palletWidth) * 10
            pH_mm = Number(palletHeight) * 10
            pWt_kg = Number(palletWeight) || 0
        } else {
            cL_mm = cartonL * 25.4
            cW_mm = cartonW * 25.4
            cH_mm = cartonH * 25.4
            cWt_kg = cartonWt * 0.453592
            pL_mm = Number(palletLength) * 25.4
            pW_mm = Number(palletWidth) * 25.4
            pH_mm = Number(palletHeight) * 25.4
            pWt_kg = (Number(palletWeight) || 0) * 0.453592
        }
        let container = { ...CONTAINERS[selectedContainer] }
        if (selectedContainer === "custom") {
            if (unitSystem === "metric") {
                container.length = Number(customCLength) * 10
                container.width = Number(customCWidth) * 10
                container.height = Number(customCHeight) * 10
                container.maxWeight = Number(customCWeight)
            } else {
                container.length = Math.round(Number(customCLength) * 25.4)
                container.width = Math.round(Number(customCWidth) * 25.4)
                container.height = Math.round(Number(customCHeight) * 25.4)
                container.maxWeight = Math.round(Number(customCWeight) * 0.453592)
            }
        }
        const calculateMaxFit = (containerL: number, containerW: number, containerH: number, itemL: number, itemW: number, itemH: number) => {
            let maxCount = 0
            const orientations = canRotate ? [
                [itemL, itemW, itemH],
                [itemL, itemH, itemW],
                [itemW, itemL, itemH],
                [itemW, itemH, itemL],
                [itemH, itemL, itemW],
                [itemH, itemW, itemL],
            ] : [[itemL, itemW, itemH]]
            orientations.forEach(([dim1, dim2, dim3]) => {
                const countL = Math.floor(containerL / dim1)
                const countW = Math.floor(containerW / dim2)
                const countH = Math.floor(containerH / dim3)
                const total = countL * countW * countH
                if (total > maxCount) maxCount = total
            })
            return maxCount
        }
        const calculatePalletFit = (spaceL: number, spaceW: number, spaceH: number, palL: number, palW: number, palH: number) => {
            const normL = Math.floor(spaceL / palL)
            const normW = Math.floor(spaceW / palW)
            const normH = Math.floor(spaceH / palH)
            const totalNorm = normL * normW * normH
            const rotL = Math.floor(spaceL / palW)
            const rotW = Math.floor(spaceW / palL)
            const rotH = Math.floor(spaceH / palH)
            const totalRot = rotL * rotW * rotH
            return Math.max(totalNorm, totalRot)
        }
        if (loadType === "loose") {
            const maxFit = calculateMaxFit(container.length, container.width, container.height, cL_mm, cW_mm, cH_mm)
            const maxWeightCount = Math.floor(container.maxWeight / cWt_kg)
            const finalCount = Math.min(maxFit, maxWeightCount)
            setResult({
                units: finalCount,
                palletsCount: 0,
                boxesPerPallet: 0,
                layers: 0,
                limitReason: maxWeightCount < maxFit ? "Weight Limit" : (maxFit === 0 ? "Dimension Mismatch" : "Volume Limit"),
                totalWeight: finalCount * cWt_kg,
                totalVolume: (finalCount * cL_mm * cW_mm * cH_mm) / 1e9,
                containerUsed: container,
                noFit: maxFit === 0
            })
        } else {
            const boxArea = cL_mm * cW_mm
            const palletArea = pL_mm * pW_mm
            const b_normL = Math.floor(pL_mm / cL_mm)
            const b_normW = Math.floor(pW_mm / cW_mm)
            const countLayer1 = b_normL * b_normW
            const b_rotL = Math.floor(pL_mm / cW_mm)
            const b_rotW = Math.floor(pW_mm / cL_mm)
            const countLayer2 = b_rotL * b_rotW
            const boxesPerLayer = Math.max(countLayer1, countLayer2)
            const maxBoxHeightAvail = Math.max(0, container.height - pH_mm)
            const layers = Math.floor(maxBoxHeightAvail / cH_mm)
            const boxesPerPallet = boxesPerLayer * layers
            const weightPerLoadedPallet = pWt_kg + (boxesPerPallet * cWt_kg)
            const palletsInContainer = calculatePalletFit(container.length, container.width, container.height, pL_mm, pW_mm, pH_mm + (layers * cH_mm))
            const maxPalletsByWeight = Math.floor(container.maxWeight / weightPerLoadedPallet)
            const actualPallets = Math.min(palletsInContainer, maxPalletsByWeight)
            const finalTotalBoxes = actualPallets * boxesPerPallet
            setResult({
                units: finalTotalBoxes,
                palletsCount: actualPallets,
                boxesPerPallet,
                layers,
                limitReason: maxPalletsByWeight < palletsInContainer ? "Weight Limit" : (palletsInContainer === 0 ? "Dimension Mismatch" : "Volume/Floor Limit"),
                totalWeight: actualPallets * weightPerLoadedPallet,
                totalVolume: (finalTotalBoxes * cL_mm * cW_mm * cH_mm) / 1e9,
                containerUsed: container,
                noFit: palletsInContainer === 0 || (boxesPerPallet === 0 && layers === 0)
            })
        }
    }, [length, width, height, weight, unitSystem, selectedContainer, loadType, palletLength, palletWidth, palletHeight, palletWeight, canRotate, customCLength, customCWidth, customCHeight, customCWeight])
    const clearAll = () => {
        setLength("")
        setWidth("")
        setHeight("")
        setWeight("")
        setPalletLength("")
        setPalletWidth("")
        setPalletHeight("")
        setPalletWeight("")
        setCustomCLength("")
        setCustomCWidth("")
        setCustomCHeight("")
        setCustomCWeight("")
        setResult(null)
        toast({
            title: "Reset Success",
            description: "All inputs have been cleared.",
        })
    }
    return (
        <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start justify-center">
                <div className="lg:col-span-12 xl:col-span-7 space-y-6">
                    <Card className="border-slate-200 shadow-sm relative overflow-visible bg-white rounded-3xl">
                        <CalculatorCardHeader
                            title="Container Configuration"
                            description="Specify your container dimensions, load type, and cargo details to optimize space utilization."
                            onReset={clearAll}
                        />
                        <CardContent className="p-6 md:p-8 pb-12 md:pb-16 pl-10 md:pl-12 flex flex-col gap-8">
                            {/* Shared container for alignment - both sections use same left edge */}
                            <div className="max-w-[520px] mx-auto px-3 sm:px-5 space-y-6">
                                {/* ── Container Setup Group ── */}
                                <div className="space-y-3 relative calculator-input-row" data-has-title="true">
                                    {/* Dynamic Connecting Line Fragment: Ensures a solid vertical path ONLY for labeled groups */}
                                    <div className="absolute left-[-19px] w-[1.5px] bg-blue-200/70 z-0" style={{ top: '14px', bottom: '0px' }} />

                                    {/* Group Header */}
                                    <div className="flex items-center gap-2 -ml-[33px] mb-0.5 relative h-7">
                                        <div className="w-7 h-7 rounded-lg bg-blue-50 ring-[6px] ring-white flex items-center justify-center flex-shrink-0 z-10">
                                            <Container className="w-3.5 h-3.5 text-blue-600" />
                                        </div>
                                        <span className="text-[16px] font-bold text-slate-600 tracking-tight z-10">Container Setup</span>
                                    </div>

                                    {/* Row: Select Container */}
                                    <div className="relative w-full">
                                        <div className="flex items-center gap-3 w-full relative z-10 py-3">
                                            <div className="flex items-center gap-2 flex-1 min-w-0 text-left">
                                                <span className="text-[14.5px] font-medium text-slate-600/90 cursor-pointer py-1">Select Container</span>
                                            </div>
                                            <div className="relative group flex-shrink-0 flex items-center gap-3">
                                                <div className="w-full sm:w-[300px] max-w-[176px]">
                                                    <Select value={selectedContainer} onValueChange={(v) => setSelectedContainer(v as keyof typeof CONTAINERS)}>
                                                        <SelectTrigger className="h-11 border-2 border-slate-200 bg-white transition-all hover:border-blue-300 hover:shadow-md px-3 w-full rounded-xl font-semibold text-slate-600">
                                                            <span className="font-bold text-sm text-blue-600 truncate">
                                                                {CONTAINERS[selectedContainer]?.name}
                                                            </span>
                                                        </SelectTrigger>
                                                        <SelectContent className="max-h-[400px]">
                                                            {Object.entries(CONTAINERS).map(([key, data]) => (
                                                                <SelectItem key={key} value={key} className="py-2.5 focus:bg-blue-50">
                                                                    <div className="flex flex-col text-left">
                                                                        <span className="font-bold text-sm text-slate-700">{data.name}</span>
                                                                        {key === "custom" ? (
                                                                            <span className="text-[10px] text-slate-400 font-medium">User defined dimensions</span>
                                                                        ) : (
                                                                            <span className="text-[10px] text-slate-500 font-medium">
                                                                                Wt: {data.maxWeight.toLocaleString()} kg · {(data.length / 1000).toFixed(1)}m × {(data.width / 1000).toFixed(2)}m
                                                                            </span>
                                                                        )}
                                                                    </div>
                                                                </SelectItem>
                                                            ))}
                                                        </SelectContent>
                                                    </Select>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {selectedContainer === "custom" && (
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 bg-blue-50/30 p-4 rounded-2xl border border-blue-100/50 mb-3">
                                            <CalculatorInput label="Int. Length" value={customCLength} onChange={setCustomCLength} placeholder={unitSystem === "metric" ? "580" : "232"} suffix={unitSystem === "metric" ? "cm" : "in"} hideSeparator />
                                            <CalculatorInput label="Int. Width" value={customCWidth} onChange={setCustomCWidth} placeholder={unitSystem === "metric" ? "230" : "92"} suffix={unitSystem === "metric" ? "cm" : "in"} hideSeparator />
                                            <CalculatorInput label="Int. Height" value={customCHeight} onChange={setCustomCHeight} placeholder={unitSystem === "metric" ? "230" : "92"} suffix={unitSystem === "metric" ? "cm" : "in"} hideSeparator />
                                            <CalculatorInput label="Max Weight" value={customCWeight} onChange={setCustomCWeight} placeholder={unitSystem === "metric" ? "28000" : "61000"} suffix={unitSystem === "metric" ? "kg" : "lb"} hideSeparator />
                                        </div>
                                    )}

                                    {/* Sub-row: Loading Type */}
                                    <div className="relative w-full">
                                        <div className="flex items-center gap-3 w-full relative z-10 py-3">
                                            <div className="flex items-center gap-2 flex-1 min-w-0 text-left">
                                                <span className="text-[14.5px] font-medium text-slate-600/90 cursor-pointer py-1">Loading Type</span>
                                            </div>
                                            <div className="relative group flex-shrink-0 flex items-center gap-3">
                                                <Tabs value={loadType} onValueChange={(v) => setLoadType(v as any)} className="max-w-[176px] w-full">
                                                    <TabsList className="grid w-full grid-cols-2 h-auto p-1 bg-slate-100/60 border border-slate-200/50 rounded-xl">
                                                        <TabsTrigger value="loose" className="flex items-center justify-center py-1.5 text-[10px] font-bold rounded-lg data-[state=active]:bg-white data-[state=active]:text-blue-600 data-[state=active]:shadow-sm">
                                                            <Box className="w-3 h-3 mr-1" />
                                                            Loose
                                                        </TabsTrigger>
                                                        <TabsTrigger value="pallet" className="flex items-center justify-center py-1.5 text-[10px] font-bold rounded-lg data-[state=active]:bg-white data-[state=active]:text-blue-600 data-[state=active]:shadow-sm">
                                                            <Layers className="w-3 h-3 mr-1" />
                                                            Pallets
                                                        </TabsTrigger>
                                                    </TabsList>
                                                </Tabs>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Detailed Specs Group - same container for vertical alignment */}
                                <div className="space-y-3">

                                <CalculatorInput
                                    label="Box Length"
                                    value={length}
                                    onChange={setLength}
                                    placeholder="40"
                                    suffix={unitSystem === "metric" ? "cm" : "in"}
                                    groupingTitle="Cargo Dimensions"
                                    groupingIcon={Box}
                                    rowAction={
                                        <Tabs value={unitSystem} onValueChange={(v) => setUnitSystem(v as any)} className="w-[140px]">
                                            <TabsList className="grid w-full grid-cols-2 h-7 p-0.5 bg-slate-100/60 border border-slate-200/50 rounded-lg">
                                                <TabsTrigger value="metric" className="py-0.5 text-[9px] font-black rounded-md data-[state=active]:bg-white data-[state=active]:text-blue-600 uppercase tracking-tight">CM / KG</TabsTrigger>
                                                <TabsTrigger value="imperial" className="py-0.5 text-[9px] font-black rounded-md data-[state=active]:bg-white data-[state=active]:text-blue-600 uppercase tracking-tight">IN / LB</TabsTrigger>
                                            </TabsList>
                                        </Tabs>
                                    }
                                />
                                <CalculatorInput
                                    label="Box Width"
                                    value={width}
                                    onChange={setWidth}
                                    placeholder="30"
                                    suffix={unitSystem === "metric" ? "cm" : "in"}
                                />
                                <CalculatorInput
                                    label="Box Height"
                                    value={height}
                                    onChange={setHeight}
                                    placeholder="25"
                                    suffix={unitSystem === "metric" ? "cm" : "in"}
                                />
                                <CalculatorInput
                                    label="Unit Weight"
                                    value={weight}
                                    onChange={setWeight}
                                    placeholder="5"
                                    suffix={unitSystem === "metric" ? "kg" : "lb"}
                                />

                                {loadType === "pallet" && (
                                    <div className="pt-6 animate-in fade-in slide-in-from-top-4 duration-500">
                                        <CalculatorInput
                                            label="Pallet Length"
                                            value={palletLength}
                                            onChange={setPalletLength}
                                            placeholder="120"
                                            suffix={unitSystem === "metric" ? "cm" : "in"}
                                            groupingTitle="Pallet Specifications"
                                            groupingIcon={Layers}
                                        />
                                        <CalculatorInput
                                            label="Pallet Width"
                                            value={palletWidth}
                                            onChange={setPalletWidth}
                                            placeholder="80"
                                            suffix={unitSystem === "metric" ? "cm" : "in"}
                                        />
                                        <CalculatorInput
                                            label="Base Height"
                                            value={palletHeight}
                                            onChange={setPalletHeight}
                                            placeholder="15"
                                            tooltip="Standard pallet base height (usually 15cm / 6in)"
                                            suffix={unitSystem === "metric" ? "cm" : "in"}
                                        />
                                        <CalculatorInput
                                            label="Empty Weight"
                                            value={palletWeight}
                                            onChange={setPalletWeight}
                                            placeholder="25"
                                            tooltip="Weight of the wooden or plastic pallet itself"
                                            suffix={unitSystem === "metric" ? "kg" : "lb"}
                                        />
                                    </div>
                                )}
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                <div className="lg:col-span-12 xl:col-span-5 space-y-6">
                    <div className="space-y-6">
                        <ResultSummaryCard
                            title="Loading Efficiency"
                            isCalculated={!!result}
                            primaryResult={{
                                value: result ? result.units.toLocaleString() : "0",
                                label: "Total box capacity",
                                unit: "units"
                            }}
                            secondaryResults={[
                                {
                                    key: "weight",
                                    label: "Gross Payload",
                                    value: result ? Math.round(result.totalWeight).toLocaleString() : "0",
                                    unit: "kg",
                                    tooltip: "The total gross weight of all boxes and pallets. Ensure this doesn't exceed the container's official safety rating.",
                                    className: result?.limitReason === "Weight Limit" ? "text-amber-600 bg-amber-50/50 border-amber-100" : "",
                                    icon: Scale,
                                },
                                {
                                    key: "volume",
                                    label: "Cubic Volume",
                                    value: result ? result.totalVolume.toFixed(2) : "0.00",
                                    unit: "m³",
                                    tooltip: "Space occupied in cubic meters based on exterior carton dimensions.",
                                    icon: Box,
                                },
                                ...(loadType === "pallet" ? [
                                    {
                                        key: "pallets",
                                        label: "Pallet Count",
                                        value: result ? result.palletsCount : 0,
                                        tooltip: "Total number of pallet units that fit on the container floor.",
                                        icon: Layers,
                                    },
                                    {
                                        key: "boxes_per_pallet",
                                        label: "Inner Yield",
                                        value: result ? result.boxesPerPallet : 0,
                                        tooltip: "Total boxes stacked on each individual pallet.",
                                        icon: Package,
                                    },
                                    {
                                        key: "layers",
                                        label: "Stack Layers",
                                        value: result ? result.layers : 0,
                                        tooltip: "Vertical stacking levels permitted based on container interior height.",
                                        icon: Ruler,
                                    }
                                ] : [])
                            ]}
                            emptyResultLabel="Capacity"
                            dynamicMessages={{
                                positive: "Optimization successful! Your cargo configuration maximizes container space usage.",
                                negative: "Warning: Load exceeds container limits. Adjust dimensions or loading type.",
                                neutral: "Ready to calculate your optimal container load configuration."
                            }}
                        />

                        {result && result.units === 0 ? (
                            <FadeIn direction="up" duration={0.4}>
                                <div className="flex flex-col items-center justify-center p-8 bg-red-50/50 rounded-3xl border border-dashed border-red-200 text-center backdrop-blur-sm">
                                    <div className="w-12 h-12 rounded-2xl bg-red-100 flex items-center justify-center text-red-600 mb-4 shadow-sm">
                                        <XCircle className="w-6 h-6" />
                                    </div>
                                    <h4 className="text-[17px] font-bold text-red-600 mb-2 tracking-tight">Cargo Does Not Fit</h4>
                                    <p className="text-[13.5px] text-red-500/80 leading-relaxed max-w-[280px]">
                                        {result.noFit
                                            ? "Your carton or pallet dimensions are larger than the container's interior entry height or width. Check measurements."
                                            : "The weight of your cargo exceeds the allowed payload capacity for this container type."}
                                    </p>
                                </div>
                            </FadeIn>
                        ) : null}
                    </div>
                </div>

            </div>
        </div>
    )
}
