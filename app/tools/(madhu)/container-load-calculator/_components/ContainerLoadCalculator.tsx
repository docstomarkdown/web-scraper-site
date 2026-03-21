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
        if (!length || !width || !height || loadType === 'loose') {
            setHasScrolledToPallet(false)
        }
    }, [length, width, height, weight, loadType, hasScrolledToPallet, scrollToPallet])
    useEffect(() => {
        if (!length || !width || !height || (loadType === "pallet" && (!palletLength || !palletWidth || !palletHeight))) {
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
        const cartonWt = Number(weight) || 0
        if (cartonL <= 0 || cartonW <= 0 || cartonH <= 0) return
        let cL_mm, cW_mm, cH_mm, cWt_kg
        let pL_mm, pW_mm, pH_mm
        if (unitSystem === "metric") {
            cL_mm = cartonL * 10
            cW_mm = cartonW * 10
            cH_mm = cartonH * 10
            cWt_kg = cartonWt
            pL_mm = Number(palletLength) * 10
            pW_mm = Number(palletWidth) * 10
            pH_mm = Number(palletHeight) * 10
        } else {
            cL_mm = cartonL * 25.4
            cW_mm = cartonW * 25.4
            cH_mm = cartonH * 25.4
            cWt_kg = cartonWt * 0.453592
            pL_mm = Number(palletLength) * 25.4
            pW_mm = Number(palletWidth) * 25.4
            pH_mm = Number(palletHeight) * 25.4
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
            let bestArr = ""
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
                if (total > maxCount) {
                    maxCount = total
                    bestArr = `${countL}L × ${countW}W × ${countH}H`
                }
            })
            return { maxCount, bestArr }
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
            if (totalNorm >= totalRot) {
                return { count: totalNorm, arr: `${normL}L × ${normW}W pallets` }
            } else {
                return { count: totalRot, arr: `${rotL}L × ${rotW}W pallets` }
            }
        }
        if (loadType === "loose") {
            const { maxCount: maxFit, bestArr } = calculateMaxFit(container.length, container.width, container.height, cL_mm, cW_mm, cH_mm)
            const maxWeightCount = Math.floor(container.maxWeight / cWt_kg)
            const finalCount = Math.min(maxFit, maxWeightCount)
            const totalVol = (finalCount * cL_mm * cW_mm * cH_mm) / 1e9
            const utilPct = container.volume > 0 ? (totalVol / container.volume) * 100 : 0
            setResult({
                units: finalCount,
                palletsCount: 0,
                boxesPerPallet: 0,
                layers: 0,
                limitReason: maxWeightCount < maxFit ? "Weight Limit" : (maxFit === 0 ? "Dimension Mismatch" : "Volume Limit"),
                totalWeight: finalCount * cWt_kg,
                totalVolume: totalVol,
                utilization: utilPct,
                arrangement: bestArr,
                containerUsed: container,
                noFit: maxFit === 0
            })
        } else {
            const b_normL = Math.floor(pL_mm / cL_mm)
            const b_normW = Math.floor(pW_mm / cW_mm)
            const countLayer1 = b_normL * b_normW
            const b_rotL = Math.floor(pL_mm / cW_mm)
            const b_rotW = Math.floor(pW_mm / cL_mm)
            const countLayer2 = b_rotL * b_rotW
            const isRotatedBox = countLayer2 > countLayer1
            const boxesPerLayer = Math.max(countLayer1, countLayer2)
            const boxArrLayer = isRotatedBox ? `${b_rotL}L × ${b_rotW}W` : `${b_normL}L × ${b_normW}W`

            const maxBoxHeightAvail = Math.max(0, container.height - pH_mm)
            const layers = Math.floor(maxBoxHeightAvail / cH_mm)
            const boxesPerPallet = boxesPerLayer * layers
            const weightPerLoadedPallet = (boxesPerPallet * cWt_kg) // No empty pallet weight
            
            const { count: palletsInContainer, arr: palletArr } = calculatePalletFit(container.length, container.width, container.height, pL_mm, pW_mm, pH_mm + (layers * cH_mm))
            const maxPalletsByWeight = weightPerLoadedPallet > 0 ? Math.floor(container.maxWeight / weightPerLoadedPallet) : palletsInContainer
            const actualPallets = Math.min(palletsInContainer, maxPalletsByWeight)
            const finalTotalBoxes = actualPallets * boxesPerPallet
            
            const totalVol = ((actualPallets * pL_mm * pW_mm * pH_mm) + (finalTotalBoxes * cL_mm * cW_mm * cH_mm)) / 1e9
            const utilPct = container.volume > 0 ? (totalVol / container.volume) * 100 : 0
            const arrText = `${palletArr} | Boxes: ${boxArrLayer} per layer × ${layers} layers`

            setResult({
                units: finalTotalBoxes,
                palletsCount: actualPallets,
                boxesPerPallet,
                layers,
                limitReason: maxPalletsByWeight < palletsInContainer ? "Weight Limit" : (palletsInContainer === 0 ? "Dimension Mismatch" : "Volume/Floor Limit"),
                totalWeight: actualPallets * weightPerLoadedPallet,
                totalVolume: totalVol,
                utilization: utilPct,
                arrangement: arrText,
                containerUsed: container,
                noFit: palletsInContainer === 0 || (boxesPerPallet === 0 && layers === 0)
            })
        }
    }, [length, width, height, weight, unitSystem, selectedContainer, loadType, palletLength, palletWidth, palletHeight, canRotate, customCLength, customCWidth, customCHeight, customCWeight])
    const clearAll = () => {
        setLength("")
        setWidth("")
        setHeight("")
        setWeight("")
        setPalletLength("")
        setPalletWidth("")
        setPalletHeight("")
        setCustomCLength("")
        setCustomCWidth("")
        setCustomCHeight("")
        setCustomCWeight("")
        setResult(null)
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
                        <CardContent className="p-4 md:p-6 pb-12 md:pb-16 flex flex-col gap-0">
                                {/* ── Container Setup Group ── */}
                                {/* This custom section replicates the exact CalculatorInput grouping structure */}
                                <div className="w-full relative calculator-input-row max-w-[520px] mx-auto px-3 sm:px-5" data-has-title="true">
                                    {/* Section separator */}
                                    <div className="h-px bg-slate-100/80 w-[calc(100%+48px)] -ml-6 mb-3 mt-1" />
                                    <div className="relative w-full">
                                        {/* Connecting Line — same as CalculatorInput: left-[-19px] from px-3 edge */}
                                        <div className="absolute left-[-19px] w-[1.5px] bg-blue-200/70 z-0" style={{ top: '14px', bottom: '0px' }} />

                                        {/* Group Header — same offsets as CalculatorInput: -ml-[33px] mb-3 */}
                                        <div className="flex items-center gap-2 -ml-[33px] mb-3 relative">
                                            <div className="w-7 h-7 rounded-lg bg-blue-50 ring-[6px] ring-white flex items-center justify-center flex-shrink-0 z-10">
                                                <Container className="w-3.5 h-3.5 text-blue-600" />
                                            </div>
                                            <span className="text-[16px] font-bold text-slate-600 capitalize tracking-tight z-10 flex-1">Container Setup</span>
                                        </div>

                                        {/* Row: Select Container */}
                                        <div className="flex items-center gap-3 w-full relative z-10">
                                            <div className="flex items-center gap-2 flex-1 min-w-0 text-left">
                                                <span className="text-[14.5px] font-medium text-slate-600/90 py-1">Select Container</span>
                                            </div>
                                            <div className="flex-shrink-0">
                                                <div className="w-[176px]">
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

                                        {selectedContainer === "custom" && (
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 bg-blue-50/30 p-4 rounded-2xl border border-blue-100/50 mt-3 mb-1">
                                                <CalculatorInput label="Int. Length" value={customCLength} onChange={setCustomCLength} placeholder={unitSystem === "metric" ? "580" : "232"} suffix={unitSystem === "metric" ? "cm" : "in"} hideSeparator tooltip="Inside length of the custom container." />
                                                <CalculatorInput label="Int. Width" value={customCWidth} onChange={setCustomCWidth} placeholder={unitSystem === "metric" ? "230" : "92"} suffix={unitSystem === "metric" ? "cm" : "in"} hideSeparator tooltip="Inside width (door to back) of the custom container." />
                                                <CalculatorInput label="Int. Height" value={customCHeight} onChange={setCustomCHeight} placeholder={unitSystem === "metric" ? "230" : "92"} suffix={unitSystem === "metric" ? "cm" : "in"} hideSeparator tooltip="Inside height (floor to ceiling) of the custom container." />
                                                <CalculatorInput label="Max Weight" value={customCWeight} onChange={setCustomCWeight} placeholder={unitSystem === "metric" ? "28000" : "61000"} suffix={unitSystem === "metric" ? "kg" : "lb"} hideSeparator tooltip="Maximum gross payload allowed inside the container." />
                                            </div>
                                        )}

                                        {/* Row: Loading Type — mt-3 matches CalculatorInput row spacing */}
                                        <div className="flex items-center gap-3 w-full relative z-10 mt-3">
                                            <div className="flex items-center gap-2 flex-1 min-w-0 text-left">
                                                <span className="text-[14.5px] font-medium text-slate-600/90 py-1">Loading Type</span>
                                            </div>
                                            <div className="flex-shrink-0">
                                                <Tabs value={loadType} onValueChange={(v) => setLoadType(v as any)} className="w-[176px]">
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
                                    </div>{/* end relative w-full */}
                                </div>{/* end Container Setup group */}

                                {/* Detailed Specs Group — CalculatorInput handles its own grouping/spacing */}                                <CalculatorInput
                                    label="Box Length"
                                    value={length}
                                    onChange={setLength}
                                    placeholder="40"
                                    suffix={unitSystem === "metric" ? "cm" : "in"}
                                    tooltip="The longest side of your individual carton or item."
                                    groupingTitle="Cargo Dimensions"
                                    groupingIcon={Box}
                                    groupingAction={
                                        <Tabs value={unitSystem} onValueChange={(v) => setUnitSystem(v as any)} className="w-[140px]">
                                            <TabsList className="grid w-full grid-cols-2 h-7 p-0.5 bg-slate-100/60 border border-slate-200/50 rounded-lg">
                                                <TabsTrigger value="metric" className="py-0.5 text-[11px] font-bold rounded-md data-[state=active]:bg-white data-[state=active]:text-blue-600 tracking-tight">cm / kg</TabsTrigger>
                                                <TabsTrigger value="imperial" className="py-0.5 text-[11px] font-bold rounded-md data-[state=active]:bg-white data-[state=active]:text-blue-600 tracking-tight">in / lb</TabsTrigger>
                                            </TabsList>
                                        </Tabs>
                                    }
                                />
                                <CalculatorInput
                                    label="Box Width"
                                    value={width}
                                    onChange={setWidth}
                                    placeholder="30"
                                    tooltip="The shorter side of your individual carton or item base."
                                    suffix={unitSystem === "metric" ? "cm" : "in"}
                                />
                                <CalculatorInput
                                    label="Box Height"
                                    value={height}
                                    onChange={setHeight}
                                    placeholder="25"
                                    tooltip="The vertical height of your individual carton or item."
                                    suffix={unitSystem === "metric" ? "cm" : "in"}
                                />
                                <CalculatorInput
                                    label="Unit Weight"
                                    value={weight}
                                    onChange={setWeight}
                                    placeholder="5"
                                    isOptional={true}
                                    tooltip="The total gross weight of one single carton or item."
                                    suffix={unitSystem === "metric" ? "kg" : "lb"}
                                />

                                {loadType === "pallet" && (
                                    <div className="animate-in fade-in slide-in-from-top-4 duration-500">
                                        <CalculatorInput
                                            label="Pallet Length"
                                            value={palletLength}
                                            onChange={setPalletLength}
                                            placeholder="120"
                                            tooltip="The longest outer dimension of the pallet base."
                                            suffix={unitSystem === "metric" ? "cm" : "in"}
                                            groupingTitle="Pallet Specifications"
                                            groupingIcon={Layers}
                                        />
                                        <CalculatorInput
                                            label="Pallet Width"
                                            value={palletWidth}
                                            onChange={setPalletWidth}
                                            placeholder="80"
                                            tooltip="The shorter outer dimension of the pallet base."
                                            suffix={unitSystem === "metric" ? "cm" : "in"}
                                        />
                                        <CalculatorInput
                                            label="Pallet Height"
                                            value={palletHeight}
                                            onChange={setPalletHeight}
                                            placeholder="15"
                                            tooltip="The initial thickness/height of the empty pallet structure."
                                            suffix={unitSystem === "metric" ? "cm" : "in"}
                                        />
                                    </div>
                                )}
                                {/* end Detailed Specs Group */}
                        </CardContent>
                    </Card>
                </div>

                <div className="lg:col-span-12 xl:col-span-5 space-y-6">
                    <div className="space-y-6">
                        <ResultSummaryCard
                            title="Loading Efficiency"
                            isCalculated={!!result}
                            showLiveBadge={true}
                            checklistItems={[
                                { 
                                    key: 'length', 
                                    label: 'Box Length', 
                                    isComplete: !!length 
                                },
                                { 
                                    key: 'width', 
                                    label: 'Box Width', 
                                    isComplete: !!width 
                                },
                                { 
                                    key: 'height', 
                                    label: 'Box Height', 
                                    isComplete: !!height 
                                },
                                ...(loadType === "pallet" ? [
                                    { 
                                        key: 'palletLength', 
                                        label: 'Pallet Length', 
                                        isComplete: !!palletLength 
                                    },
                                    { 
                                        key: 'palletWidth', 
                                        label: 'Pallet Width', 
                                        isComplete: !!palletWidth 
                                    },
                                    { 
                                        key: 'palletHeight', 
                                        label: 'Pallet Height', 
                                        isComplete: !!palletHeight 
                                    }
                                ] : [])
                            ]}
                            primaryResult={{
                                value: result ? result.units.toLocaleString() : "0",
                                label: "Total Units",
                                unit: ""
                            }}
                            secondaryResults={loadType === "loose" ? [
                                {
                                    key: "arrangement",
                                    label: "Arrangement",
                                    value: result ? result.arrangement : "-",
                                    tooltip: "How the boxes are arranged in the container (Length × Width × Height).",
                                    icon: Box,
                                },
                                {
                                    key: "utilization",
                                    label: "Space Utilization",
                                    value: result ? `${result.utilization.toFixed(1)}%` : "0%",
                                    tooltip: "Percentage of total container volume occupied by the cargo.",
                                    icon: Package,
                                }
                            ] : [
                                {
                                    key: "boxes_per_pallet",
                                    label: "Boxes per Pallet",
                                    value: result ? result.boxesPerPallet.toLocaleString() : "0",
                                    tooltip: "Total boxes stacked on each individual pallet.",
                                    icon: Package,
                                },
                                {
                                    key: "total_pallets",
                                    label: "Total Pallets",
                                    value: result ? result.palletsCount.toLocaleString() : "0",
                                    tooltip: "Total number of pallet units that fit inside the container.",
                                    icon: Layers,
                                },
                                {
                                    key: "arrangement",
                                    label: "Arrangement",
                                    value: result ? result.arrangement : "-",
                                    tooltip: "How the pallets and boxes are stacked inside the container.",
                                    icon: Box,
                                },
                                {
                                    key: "utilization",
                                    label: "Space Utilization",
                                    value: result ? `${result.utilization.toFixed(1)}%` : "0%",
                                    tooltip: "Percentage of total container volume occupied by the cargo.",
                                    icon: Container,
                                }
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
