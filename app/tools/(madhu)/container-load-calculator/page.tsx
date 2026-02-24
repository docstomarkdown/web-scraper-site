"use client"

import React, { useState, useEffect } from "react"
import { ActionButtons, MadhuToolTemplate, Step, Insight, FAQ, InputCardHeader, MadhuSubHeader, Counter } from "../ToolTemplate"
import { CalculatorInput } from "@/app/tools/_shared/components"
import { ContainerLoadResultCard as ResultFeedbackCard } from "./_components/ContainerLoadResultCard"
import { useToast } from "@/hooks/use-toast"
import {
    Box,
    Truck,
    Scale,
    Archive,
    CheckCircle2,
    AlertCircle,
    Layers,
    Info,
    Container,
    Package,
    Settings,
    Layout,
    Maximize,
    XCircle,
    RefreshCw,
    Target
} from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"

// Constants for Container Dimensions (Internal)
// Length, Width, Height in mm
// Max Weight in kg
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

// Helper to calculate max fit for a single dimension
const fitInDim = (containerDim: number, boxDim: number) => Math.floor(containerDim / boxDim)

export default function ContainerLoadCalculator() {
    const { toast } = useToast()
    // ---- State ----
    const scrollToGuide = () => {
        const element = document.getElementById('how-to-use');
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
    const [palletLength, setPalletLength] = useState<number | "">("") // Default Euro 120
    const [palletWidth, setPalletWidth] = useState<number | "">("")   // Default Euro 80
    const [palletHeight, setPalletHeight] = useState<number | "">("") // Base height approx 15cm
    const [palletWeight, setPalletWeight] = useState<number | "">("") // Approx 20-25kg

    // Settings
    const [unitSystem, setUnitSystem] = useState<"metric" | "imperial">("metric") // cm/kg vs in/lb
    const [canRotate, setCanRotate] = useState(true)

    // Results
    const [result, setResult] = useState<any>(null)

    // Calculate
    useEffect(() => {
        // Reset result if inputs are invalid
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

        // Conversions
        // Metric: Input cm, kg -> use mm, kg
        // Imperial: Input in, lb -> use mm, kg
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

        // Calculation Logic

        // --- Helper: Simple Fit (Rotatable) ---
        const calculateMaxFit = (containerL: number, containerW: number, containerH: number, itemL: number, itemW: number, itemH: number) => {
            let maxCount = 0

            // Permutations for rotation (if applicable)
            // If it's a pallet inside container or carton on pallet, we usually only rotate on Base (L/W), not H.
            // Vertically, items must be upright (usually).
            // Let's assume 'canRotate' applies to base dimensions L/W only for Pallets/Cartons to be safe?
            // User 'canRotate' usually implies boxes can be flipped 3D.
            // But for Pallet loading in container, we rarely flip a pallet on its side.
            // So: 
            // 1. Box -> Rotatable 3D (if turned on)
            // 2. Pallet -> Rotatable 2D (Base only)

            // For Loose Cartons: Use 3D rotation if enabled
            // For Pallet Calculation: 
            //    Step A: Boxes ON Pallet (Assume upright unless specified, but let's stick to base rotation for stability or 3D if fully boxed)
            //    Step B: Pallets IN Container (Base rotation only)

            // Let's stick to a robust simple logic:

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

        // --- Helper: Pallet Logic (Restricted Rotation) ---
        // Pallets generally stay upright (Z axis fixed). We only swap L & W.
        const calculatePalletFit = (spaceL: number, spaceW: number, spaceH: number, palL: number, palW: number, palH: number) => {
            // 1. Normal: Pallet L aligns with Space L
            const normL = Math.floor(spaceL / palL)
            const normW = Math.floor(spaceW / palW)
            const normH = Math.floor(spaceH / palH)
            const totalNorm = normL * normW * normH

            // 2. Rotated: Pallet L aligns with Space W
            const rotL = Math.floor(spaceL / palW)
            const rotW = Math.floor(spaceW / palL)
            const rotH = Math.floor(spaceH / palH) // H doesn't rotate
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
            // Pallet Logic
            // 1. How many cartons fit on ONE pallet?
            //    - Space available: PalletL, PalletW. 
            //    - Height available: ContainerH - PalletBaseH (Assuming stacking on pallet up to ceiling)
            //    OR if double stacking pallets? 
            //    Let's assume generic model: "Pallet Height" input is the *empty* pallet height.
            //    We stack boxes on top. Total Height = PalletBase + BoxStackHeight.
            //    Total Height must be <= Container Height.

            const effectivePalletH = Number(palletHeight) // Input height of the pallet base itself? Or full loaded pallet?
            // Based on workflow "Enter pallet details", usually implies the base.
            // Let's assume the user stacks boxes ON the pallet up to the container ceiling?
            // Actually, in logistics, you often define a "Loaded Pallet Height".
            // BUT, if we want to optimize, we should calculate how many layers fit.

            // Logic:
            // Max Load Height = Container Height - PalletBaseH (pH_mm)
            // Layers of boxes = Floor(Max Load Height / BoxH) -- (Assuming boxes upright or optimal var)
            // We use calculateMaxFit but constraint H.

            // Actually, simpler approach for this tool:
            // Calculate Box Fit on 1 Pallet Base (2D area * Layers).
            // Layers determined by (Container.Height - PalletBaseHeight) / BoxHeight. 
            // (Assuming we optimize layers to fill container).

            // 1. Boxes per Pallet Layer (2D Area optimization on PalletL x PalletW)
            //    We can rotate boxes on the pallet.
            const boxArea = cL_mm * cW_mm
            const palletArea = pL_mm * pW_mm
            // Simple approach: Best fit of box L/W into Pallet L/W

            // Try Normal
            const b_normL = Math.floor(pL_mm / cL_mm)
            const b_normW = Math.floor(pW_mm / cW_mm)
            const countLayer1 = b_normL * b_normW

            // Try Rotated
            const b_rotL = Math.floor(pL_mm / cW_mm)
            const b_rotW = Math.floor(pW_mm / cL_mm)
            const countLayer2 = b_rotL * b_rotW

            const boxesPerLayer = Math.max(countLayer1, countLayer2)

            // 2. Number of Layers
            // Max height available for boxes = ContainerH - PalletBaseH
            const maxBoxHeightAvail = Math.max(0, container.height - pH_mm)
            const layers = Math.floor(maxBoxHeightAvail / cH_mm)

            const boxesPerPallet = boxesPerLayer * layers
            const weightPerLoadedPallet = pWt_kg + (boxesPerPallet * cWt_kg)

            // 3. How many Pallets fit in Container?
            //    Pallet Dimensions to use for packing: pL, pW, and Full Loaded Height (pH + layers*cH)
            //    Usually pallets are not stacked on top of each other unless specified.
            //    We will assume Single Stack of Pallets for simplicity unless "Double Stack" requested.
            //    Standard container calculators often assume 1 level of pallets unless 'stackable'.
            //    Let's assume 1 level of pallets for now.

            const palletsInContainer = calculatePalletFit(container.length, container.width, container.height, pL_mm, pW_mm, pH_mm + (layers * cH_mm))

            const totalBoxes = palletsInContainer * boxesPerPallet
            const totalLoadWeight = palletsInContainer * weightPerLoadedPallet

            // Check Container Weight Limit
            const isOverweight = totalLoadWeight > container.maxWeight

            // If overweight, we must reduce count. 
            // But how? Reduce pallets? Or reduce boxes per pallet?
            // Usually, we just limit the # of pallets or mark as overweight.
            // Let's cap by weight.

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

    // ---- Content ----

    const howToUseSteps: Step[] = [
        {
            title: "Select Container",
            description: "Choose between standard <strong>20ft</strong>, <strong>40ft</strong>, or <strong>High Cube</strong> containers to match your shipping plan.",
            icon: Container
        },
        {
            title: "Enter Dimensions",
            description: "Input your unit's L/W/H and Weight. If using pallets, toggle to <strong>Pallet</strong> mode and provide pallet details.",
            icon: Box
        },
        {
            title: "Check Capacity",
            description: "We calculate the maximum units that fit, accounting for <b>volume</b> and <b>weight limits</b> automatically.",
            icon: CheckCircle2
        }
    ]

    const howToUseGoal = {
        title: "Maximize Shipping ROI",
        description: "By optimizing cargo distribution, you reduce <b>empty space costs</b> and ensure your containers meet safety weight standards, preventing costly port delays.",
        icon: Truck
    }

    const insights: Insight[] = [
        {
            title: "Weight Limits are Strict",
            description: "A 20ft container often takes MORE weight (28,200kg) than a 40ft (26,600kg). Heavy goods? Use 20ft.",
            icon: Scale,
            stat: "Risk #1",
            statLabel: "Overloading",
            iconBg: "bg-red-100",
            iconColor: "text-red-600",
            statColor: "text-red-600"
        },
        {
            title: "Palletization Cost",
            description: "Pallets protect goods but eat 10-15% of space. A 20ft holds ~11 Euro pallets vs ~28m³ loose cargo.",
            icon: Package,
            stat: "-15%",
            statLabel: "Volume Loss",
            iconBg: "bg-amber-100",
            iconColor: "text-amber-600",
            statColor: "text-amber-600"
        },
        {
            title: "Stacking Efficiency",
            description: "High Cube containers offer 1ft extra height. For palletized goods, this often allows an entire extra layer.",
            icon: Layers,
            stat: "Top Tip",
            statLabel: "Use High Cube",
            iconBg: "bg-blue-100",
            iconColor: "text-blue-600",
            statColor: "text-blue-600"
        }
    ]

    const faqs: FAQ[] = [
        {
            question: "How do you calculate pallet fit?",
            answer: "We maximize the floor area by rotating pallets (if standard size). We then stack boxes on the pallet up to the container's ceiling height."
        },
        {
            question: "Does this include container tare weight?",
            answer: "No, the 'Max Weight' shown is the Payload Capacity (Net Weight) typically allowed. Always check your specific container's CSC plate."
        },
        {
            question: "What if my boxes are crushable?",
            answer: "This calculator assumes boxes can be stacked to the ceiling. If your goods are fragile, you should manually limit the height or use pallets with defined max height."
        }
    ]

    // ---- UI ----

    const ToolUI = (
        <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start justify-center">

                {/* Left Panel: Inputs */}
                <div className="lg:col-span-7 space-y-6">
                    <Card className="border-slate-200 shadow-sm relative overflow-hidden bg-white">
                        <InputCardHeader
                            title="Configuration inputs"
                            subtitle="Enter box details, pallet type, and stack limits."
                            onHelpClick={scrollToGuide}
                        />

                        <CardContent className="p-6 md:p-8 space-y-8 flex-1 flex flex-col">
                            {/* 1. Configuration Selectors */}
                            <div className="space-y-3">
                                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                    <MadhuSubHeader title="Select container" icon={Container} className="mb-0" />
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

                                <div className="h-px bg-slate-100 w-full" />
                                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                    <MadhuSubHeader title="Loading type" icon={Layout} className="mb-0" />
                                    <Tabs value={loadType} onValueChange={(v) => setLoadType(v as any)} className="w-full sm:w-[300px]">
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

                            {/* Dimensions & Pallet Row */}
                            <div className="h-px bg-slate-100 w-full" />
                            <div className={cn(
                                "grid grid-cols-1 gap-y-8",
                                loadType === "pallet" ? "md:grid-cols-2 gap-x-12" : "max-w-2xl"
                            )}>
                                {/* Left: Box Details */}
                                <div className="space-y-4">
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

                                {/* Right: Pallet Details (conditional) */}
                                {loadType === "pallet" && (
                                    <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-500">
                                        <div className="flex items-center min-h-[36px]">
                                            <MadhuSubHeader title="Pallet type" icon={Layers} className="mb-0" />
                                        </div>
                                        <div className="flex flex-col gap-4">
                                            <CalculatorInput label="Pallet length" value={palletLength} onChange={setPalletLength} placeholder="120" suffix={unitSystem === "metric" ? "cm" : "in"} />
                                            <CalculatorInput label="Pallet width" value={palletWidth} onChange={setPalletWidth} placeholder="80" suffix={unitSystem === "metric" ? "cm" : "in"} />
                                            <CalculatorInput label="Base height" value={palletHeight} onChange={setPalletHeight} placeholder="15" tooltip="Height of empty pallet only" suffix={unitSystem === "metric" ? "cm" : "in"} />
                                            <CalculatorInput label="Pallet weight" value={palletWeight} onChange={setPalletWeight} placeholder="20" tooltip="Weight of empty pallet" suffix={unitSystem === "metric" ? "kg" : "lb"} />
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* 3. Action Buttons */}
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

                {/* Right Panel: Output */}
                <div className="lg:col-span-4 space-y-6">
                    <div className="space-y-6 animate-in fade-in duration-500">
                        {/* Main Result Card */}
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
                                    color: result?.limitReason === "Weight Limit" ? "text-amber-500" : "text-blue-400"
                                },
                                {
                                    label: "Volume Usage",
                                    value: result ? `${result.totalVolume.toFixed(2)} m³` : "0.00 m³",
                                    color: "text-blue-400"
                                }
                            ]}
                        />

                        {/* Additional Stats Section (Only for Pallet Loading) */}
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

    return (
        <MadhuToolTemplate
            title="Container Load Calculator"
            toolComponent={ToolUI}
            howToUseTitle="How to Use This Tool"
            howToUseSteps={howToUseSteps}
            howToUseGoal={howToUseGoal}
            hiddenTruthTitle="The Hidden Truth About This Process"
            hiddenTruthInsights={insights}
            faqs={faqs}
        />
    )
} 
