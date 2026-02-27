"use client"

import React, { useState, useEffect } from "react"
import { ActionButtons, InputCardHeader, MadhuSubHeader, Counter } from "../../ToolTemplate"
import { CalculatorInput } from "@/app/tools/_shared/components"
import { ContainerLoadResultCard as ResultFeedbackCard } from "./ContainerLoadResultCard"
import { useToast } from "@/hooks/use-toast"
import {
    Box,
    Container,
    Package,
    Layers,
    XCircle,
} from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger } from "@/components/ui/select"

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

    const copyResult = () => {
        if (!result) return
        const text = `
Container Load Calculation:
--------------------------
Container: ${result.containerUsed.name}
Loading Type: ${loadType.toUpperCase()}
Total Units: ${result.units}
Total Weight: ${Math.round(result.totalWeight)} kg
Total Volume: ${result.totalVolume.toFixed(2)} m³
${loadType === 'pallet' ? `Total Pallets: ${result.palletsCount}\nBoxes per Pallet: ${result.boxesPerPallet}` : ''}
--------------------------
Calculated via Container Load Calculator
`.trim()

        navigator.clipboard.writeText(text)
        toast({
            title: "Copied to Clipboard",
            description: "Calculation results copied successfully.",
        })
    }

    return (
        <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start justify-center">
                <div className="lg:col-span-7 space-y-6">
                    <Card className="border-slate-200 shadow-sm relative overflow-hidden bg-white">
                        <InputCardHeader
                            title="Configuration inputs"
                            subtitle="Enter box details, pallet type, and stack limits."
                            onHelpClick={scrollToGuide}
                        />

                        <CardContent className="p-6 md:p-8 space-y-6 flex-1 flex flex-col">
                            <div className="space-y-3">
                                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                    <label className="text-base font-semibold text-slate-700 whitespace-nowrap">
                                        Select container
                                    </label>
                                    <div className="w-full sm:w-[300px]">
                                        <Select value={selectedContainer} onValueChange={(v) => setSelectedContainer(v as keyof typeof CONTAINERS)}>
                                            <SelectTrigger className="h-11 border-slate-200 bg-white transition-all hover:border-blue-400 px-3 w-full">
                                                <div className="flex items-center justify-center gap-2.5 w-full min-w-0 pr-1">
                                                    <Container className="w-4 h-4 text-blue-500 shrink-0" />
                                                    <span className="font-bold text-sm text-blue-600 truncate leading-tight">
                                                        {CONTAINERS[selectedContainer]?.name}
                                                    </span>
                                                </div>
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
                                                                    Weight: {data.maxWeight.toLocaleString()} kg | L: {(data.length / 1000).toFixed(1)}m × W: {(data.width / 1000).toFixed(2)}m
                                                                </span>
                                                            )}
                                                        </div>
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>

                                {selectedContainer === "custom" && (
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-in fade-in slide-in-from-top-2 duration-300 bg-blue-50/50 p-4 rounded-xl border border-blue-100">
                                        <CalculatorInput label="Int. Length" value={customCLength} onChange={setCustomCLength} placeholder={unitSystem === "metric" ? "580" : "232"} suffix={unitSystem === "metric" ? "cm" : "in"} />
                                        <CalculatorInput label="Int. Width" value={customCWidth} onChange={setCustomCWidth} placeholder={unitSystem === "metric" ? "230" : "92"} suffix={unitSystem === "metric" ? "cm" : "in"} />
                                        <CalculatorInput label="Int. Height" value={customCHeight} onChange={setCustomCHeight} placeholder={unitSystem === "metric" ? "230" : "92"} suffix={unitSystem === "metric" ? "cm" : "in"} />
                                        <CalculatorInput label="Max Weight" value={customCWeight} onChange={setCustomCWeight} placeholder={unitSystem === "metric" ? "28000" : "61000"} suffix={unitSystem === "metric" ? "kg" : "lb"} />
                                    </div>
                                )}

                                <div className="h-px bg-slate-100/60 w-full" />
                                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                    <label className="text-base font-semibold text-slate-700 whitespace-nowrap">
                                        Loading type
                                    </label>
                                    <Tabs
                                        value={loadType}
                                        onValueChange={(v) => setLoadType(v as any)}
                                        className="w-full sm:w-[300px]"
                                    >
                                        <TabsList className="grid w-full grid-cols-2 h-auto p-1 bg-slate-100/60 border border-slate-200/50 rounded-xl">
                                            <TabsTrigger value="loose" className="flex items-center justify-center py-1.5 text-xs font-bold rounded-lg data-[state=active]:bg-white data-[state=active]:text-blue-600 data-[state=active]:shadow-sm transition-all">
                                                <Box className="w-3.5 h-3.5 mr-2" />
                                                Loose Box
                                            </TabsTrigger>
                                            <TabsTrigger value="pallet" className="flex items-center justify-center py-1.5 text-xs font-bold rounded-lg data-[state=active]:bg-white data-[state=active]:text-blue-600 data-[state=active]:shadow-sm transition-all">
                                                <Package className="w-3.5 h-3.5 mr-2" />
                                                Pallet
                                            </TabsTrigger>
                                        </TabsList>
                                    </Tabs>
                                </div>
                            </div>

                            <div className="h-px bg-slate-100/60 w-full" />
                            <div className="space-y-6">
                                <div className="space-y-4 max-w-2xl">
                                    <div className="flex items-center justify-between min-h-[36px]">
                                        <MadhuSubHeader title="Box details" icon={Box} className="mb-0" />
                                        <Tabs value={unitSystem} onValueChange={(v) => setUnitSystem(v as any)} className="w-[160px]">
                                            <TabsList className="grid w-full grid-cols-2 h-auto p-1 bg-slate-100/60 border border-slate-200/50 rounded-xl">
                                                <TabsTrigger value="metric" className="py-1.5 text-[10px] font-bold rounded-lg data-[state=active]:bg-white data-[state=active]:text-blue-600 data-[state=active]:shadow-sm transition-all uppercase tracking-tighter">CM / KG</TabsTrigger>
                                                <TabsTrigger value="imperial" className="py-1.5 text-[10px] font-bold rounded-lg data-[state=active]:bg-white data-[state=active]:text-blue-600 data-[state=active]:shadow-sm transition-all uppercase tracking-tighter">IN / LB</TabsTrigger>
                                            </TabsList>
                                        </Tabs>
                                    </div>
                                    <div className="flex flex-col gap-4">
                                        <CalculatorInput label="Length" value={length} onChange={setLength} placeholder="40" suffix={unitSystem === "metric" ? "cm" : "in"} />
                                        <CalculatorInput label="Width" value={width} onChange={setWidth} placeholder="30" suffix={unitSystem === "metric" ? "cm" : "in"} />
                                        <CalculatorInput label="Height" value={height} onChange={setHeight} placeholder="25" suffix={unitSystem === "metric" ? "cm" : "in"} />
                                        <CalculatorInput label="Weight (Unit)" value={weight} onChange={setWeight} placeholder="5" suffix={unitSystem === "metric" ? "kg" : "lb"} />
                                    </div>
                                </div>

                                {loadType === "pallet" && (
                                    <>
                                        <div className="h-px bg-slate-100/60 w-full" />
                                        <div id="pallet-details" className="space-y-4 max-w-2xl animate-in fade-in slide-in-from-top-4 duration-500">
                                            <MadhuSubHeader title="Pallet details" icon={Layers} className="mb-0" />
                                            <div className="flex flex-col gap-4">
                                                <CalculatorInput label="Pallet length" value={palletLength} onChange={setPalletLength} placeholder="120" suffix={unitSystem === "metric" ? "cm" : "in"} />
                                                <CalculatorInput label="Pallet width" value={palletWidth} onChange={setPalletWidth} placeholder="80" suffix={unitSystem === "metric" ? "cm" : "in"} />
                                                <CalculatorInput label="Base height" value={palletHeight} onChange={setPalletHeight} placeholder="15" tooltip="Height of empty pallet only" suffix={unitSystem === "metric" ? "cm" : "in"} />
                                                <CalculatorInput label="Pallet weight" value={palletWeight} onChange={setPalletWeight} placeholder="20" tooltip="Weight of empty pallet" suffix={unitSystem === "metric" ? "kg" : "lb"} />
                                            </div>
                                        </div>
                                    </>
                                )}
                            </div>

                            <div className="pt-6 mt-auto border-t border-slate-100">
                                <ActionButtons
                                    onReset={clearAll}
                                    onCopy={copyResult}
                                    copyDisabled={!result || result.units === 0}
                                />
                            </div>
                        </CardContent>
                    </Card>
                </div>

                <div className="lg:col-span-4 space-y-6">
                    <div className="space-y-6 animate-in fade-in duration-500">
                        <ResultFeedbackCard
                            variant="default"
                            title="Capacity Estimate"
                            titleLabel={result ? CONTAINERS[selectedContainer as keyof typeof CONTAINERS].name : "Ready"}
                            mainValue={
                                <div className="flex items-baseline gap-2">
                                    <span className="text-5xl font-extrabold tracking-tight">
                                        {result ? result.units.toLocaleString() : "0"}
                                    </span>
                                    <span className="text-2xl text-slate-400 font-medium">units</span>
                                </div>
                            }
                            secondaryMetrics={[
                                {
                                    label: "Total Weight",
                                    value: result ? `${Math.round(result.totalWeight).toLocaleString()} kg` : "0 kg",
                                    color: result?.limitReason === "Weight Limit" ? "text-amber-500" : "text-blue-400",
                                    tooltip: "Combined gross weight of all boxes and pallets. Must not exceed the container's max payload capacity."
                                },
                                {
                                    label: "Volume Usage",
                                    value: result ? `${result.totalVolume.toFixed(2)} m³` : "0.00 m³",
                                    color: "text-blue-400",
                                    tooltip: "The physical space occupied by your cargo in cubic meters. Based on carton exterior dimensions."
                                }
                            ]}
                        />

                        {loadType === "pallet" && (
                            <div className="grid grid-cols-2 gap-3 animate-in fade-in slide-in-from-top-2 duration-300">
                                <ResultFeedbackCard
                                    variant="compact"
                                    title="Total pallets"
                                    mainValue={<Counter value={result ? result.palletsCount : 0} />}
                                    tooltip="Total number of pallets planned for the container payload."
                                />
                                <ResultFeedbackCard
                                    variant="compact"
                                    title="Boxes / pallet"
                                    mainValue={<Counter value={result ? result.boxesPerPallet : 0} />}
                                    tooltip="Quantity of boxes stacked on a single pallet unit."
                                />
                                <ResultFeedbackCard
                                    variant="compact"
                                    title="Layers high"
                                    mainValue={<Counter value={result ? result.layers : 0} />}
                                    tooltip="Number of vertical stacking levels on each pallet."
                                />
                            </div>
                        )}

                        {result && result.units === 0 ? (
                            <div className="flex flex-col items-center justify-center p-6 bg-red-50 rounded-2xl border border-dashed border-red-200 text-center animate-in fade-in zoom-in-95">
                                <XCircle className="w-10 h-10 mb-2 text-red-500" />
                                <h4 className="text-sm font-bold text-red-600 mb-1">Items do not fit</h4>
                                <p className="text-xs text-red-500/80 leading-relaxed px-4">
                                    {result.noFit
                                        ? "Your box dimensions are larger than the available container space. Please check your measurements."
                                        : "The weight of a single unit exceeds the container's maximum capacity."}
                                </p>
                            </div>
                        ) : null}
                    </div>
                </div>
            </div>
        </div >
    )
}
