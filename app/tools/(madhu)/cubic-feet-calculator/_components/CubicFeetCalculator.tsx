"use client"

import React, { useState, useEffect, useMemo } from "react"
import { RefreshCw, AlertTriangle, Truck, Copy, HelpCircle, Package, Ruler, Layers } from "lucide-react"
import { cn } from "@/lib/utils"
import { useToast } from "@/hooks/use-toast"
import { ActionButtons, InputCardHeader, MadhuSubHeader } from "../../ToolTemplate"
import { Card, CardContent } from "@/components/ui/card"
import { ResultFeedbackCard, Counter, CalculatorInput } from "@/app/tools/_shared/components"

type DimensionUnit = "in" | "ft" | "cm" | "m"

interface DimensionInputs {
    length: string
    width: string
    height: string
    quantity: string
}

export function CubicFeetCalculator() {
    const { toast } = useToast()
    const [inputs, setInputs] = useState<DimensionInputs>({
        length: "",
        width: "",
        height: "",
        quantity: ""
    })
    const [unit, setUnit] = useState<DimensionUnit>("in")

    const handleInputChange = (field: keyof DimensionInputs, value: string) => {
        setInputs(prev => ({ ...prev, [field]: value }))
    }

    const results = useMemo(() => {
        const l = parseFloat(inputs.length || "0")
        const w = parseFloat(inputs.width || "0")
        const h = parseFloat(inputs.height || "0")
        const qty = parseFloat(inputs.quantity || "1") // default 1 for calc only

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

        const totalVolumeInches = volumeInCubicInches * qty

        return {
            cft: totalVolumeInches / 1728,
            cbm: totalVolumeInches / 61023.7,
            inches: totalVolumeInches,
            cm: totalVolumeInches * 16.3871
        }
    }, [inputs, unit])

    const logisticsImpact = useMemo(() => {
        if (!inputs.length || !inputs.width || !inputs.height) return null
        const cft = results.cft
        const cbm = results.cbm

        let tierName = ""
        let tierRule = ""
        let costRange = ""
        let status = ""
        let statusColor = ""
        let alert = null

        if (cft <= 2) {
            tierName = "Small Parcel"
            tierRule = "Fits standard courier limits"
            costRange = "$15 – $45"
            status = "Standard Shipping"
            statusColor = "text-blue-500 bg-blue-50 border-blue-100"
        } else if (cft <= 15) {
            tierName = "Oversized Parcel"
            tierRule = "Likely triggers 'Oversize' surcharges"
            costRange = "$60 – $150"
            status = "Surcharge Risk"
            statusColor = "text-amber-500 bg-amber-50 border-amber-100"
            alert = "Dimensional weight surcharges usually apply after 1 cu ft."
        } else if (cft <= 50) {
            tierName = "LTL / Pallet"
            tierRule = "Better sent via Less-Than-Truckload"
            costRange = "$150 – $400"
            status = "Freight Required"
            statusColor = "text-orange-500 bg-orange-50 border-orange-100"
        } else {
            tierName = "Commercial Freight"
            tierRule = "Requires dedicated freight solution"
            costRange = "$500+"
            status = "High Volume"
            statusColor = "text-red-600 bg-red-50 border-red-100"
            if (cbm > 1) {
                alert = "You are over 1 CBM. Consider sea freight for better rates."
            }
        }

        const storageCost = cft * 0.87
        const formattedStorage = cft === 0 ? "$0.00" : `$${storageCost.toFixed(2)} / mo`

        return { tierName, tierRule, costRange, status, statusColor, alert, storageCost: formattedStorage }
    }, [results.cft, results.cbm, inputs])

    const copyResults = () => {
        const text = `
Cubic Feet Calculator Result:
Dimensions: ${inputs.length}x${inputs.width}x${inputs.height} ${unit}
Quantity: ${inputs.quantity}

Total Volume:
${results.cft.toFixed(3)} Cubic Feet (CFT)
${results.cbm.toFixed(3)} Cubic Meters (CBM)
${results.inches.toLocaleString()} Cubic Inches
`.trim()

        navigator.clipboard.writeText(text)
        toast({
            title: "Results Copied",
            description: "Calculation data copied to clipboard.",
        })
    }

    const scrollToGuide = () => {
        const element = document.getElementById('how-to-use');
        if (element) {
            const offset = 120
            const elementPosition = element.getBoundingClientRect().top + window.scrollY
            const offsetPosition = elementPosition - offset

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            })
        }
    }

    return (
        <div className="p-8 sm:p-12 max-w-6xl mx-auto">
            <div className="lg:col-span-12 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
                {/* Left Column: Inputs */}
                <div className="lg:col-span-7 h-full">
                    <Card className="border-slate-200 shadow-sm relative overflow-hidden bg-white h-full flex flex-col">
                        <InputCardHeader
                            title="Calculator Inputs"
                            subtitle="Enter dimensions to calculate total volume."
                            onHelpClick={scrollToGuide}
                        />

                        <CardContent className="p-6 md:p-8 space-y-8 flex-1 flex flex-col">
                            {/* Unit Switcher */}
                            <div className="space-y-3">
                                <div className="flex items-center justify-between gap-4">
                                    <div className="flex items-center gap-2">
                                        <label className="text-base font-semibold text-slate-700 whitespace-nowrap">Select unit</label>
                                    </div>
                                    <div className="flex bg-slate-100 p-1 rounded-lg border border-slate-200 w-[200px] h-11">
                                        {(["in", "ft", "cm", "m"] as DimensionUnit[]).map((u) => (
                                            <button
                                                key={u}
                                                onClick={() => setUnit(u)}
                                                className={cn(
                                                    "flex-1 rounded-md text-xs font-bold transition-all uppercase flex items-center justify-center",
                                                    unit === u
                                                        ? "bg-white text-blue-600 shadow-sm border border-blue-200"
                                                        : "text-slate-500 hover:text-slate-900"
                                                )}
                                            >
                                                {u}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <div className="h-px bg-slate-100 w-full" />

                            <div className="space-y-4">
                                <MadhuSubHeader
                                    title={`Dimensions (${unit === 'in' ? 'Inches' : unit === 'ft' ? 'Feet' : unit === 'cm' ? 'Centimeters' : 'Meters'})`}
                                    icon={Package}
                                    className="mb-2 [&_h3]:text-sm [&_h3]:font-medium [&_h3]:text-slate-700 [&_svg]:text-slate-400"
                                />
                                <div className="space-y-4">
                                    <CalculatorInput
                                        label="Length"
                                        value={inputs.length}
                                        onChange={(v) => handleInputChange('length', v.toString())}
                                        placeholder="12"
                                        suffix={unit}
                                    />
                                    <CalculatorInput
                                        label="Width"
                                        value={inputs.width}
                                        onChange={(v) => handleInputChange('width', v.toString())}
                                        placeholder="10"
                                        suffix={unit}
                                    />
                                    <CalculatorInput
                                        label="Height"
                                        value={inputs.height}
                                        onChange={(v) => handleInputChange('height', v.toString())}
                                        placeholder="8"
                                        suffix={unit}
                                    />

                                    <div className="h-px bg-slate-100 w-full my-2" />

                                    <div className="pt-2">
                                        <MadhuSubHeader title="Total Quantity" icon={Layers} className="mb-2 [&_h3]:text-sm [&_h3]:font-medium [&_h3]:text-slate-700 [&_svg]:text-slate-400" />
                                        <CalculatorInput
                                            label="Number of Units"
                                            value={inputs.quantity}
                                            onChange={(v) => handleInputChange('quantity', v.toString())}
                                            placeholder="1"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="pt-6 mt-auto border-t border-slate-100">
                                <ActionButtons
                                    onReset={() => setInputs({ length: "", width: "", height: "", quantity: "" })}
                                    onCopy={copyResults}
                                    copyDisabled={!inputs.length || !inputs.width || !inputs.height}
                                />
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Right Column: Results */}
                <div className="lg:col-span-5 flex flex-col space-y-6 h-full">
                    {/* Primary Result Card */}
                    <ResultFeedbackCard
                        title="TOTAL VOLUME"
                        titleLabel="Live Calculation"
                        mainValue={
                            <div className="flex flex-col">
                                <div className="flex items-baseline gap-2">
                                    <Counter
                                        value={results.cft}
                                        formatter={(val) => val.toFixed(3)}
                                    />
                                    <span className="text-lg font-medium text-blue-400">CFT</span>
                                </div>
                                <p className="text-xs font-medium tracking-wider text-slate-500 mt-1">Cubic feet</p>
                            </div>
                        }
                    >
                        <div className="grid grid-cols-2 gap-4">
                            <div className="bg-white/5 rounded-xl p-4 border border-white/5">
                                <p className="text-xs font-bold text-slate-300 mb-1">Cubic meters</p>
                                <p className="text-xl font-bold text-blue-400">
                                    <Counter
                                        value={results.cbm}
                                        formatter={(val) => val.toFixed(4)}
                                    />
                                    <span className="text-xs font-normal ml-1 text-blue-400">CBM</span>
                                </p>
                            </div>
                            <div className="bg-white/5 rounded-xl p-4 border border-white/5 text-left">
                                <p className="text-xs font-bold text-slate-300 mb-1">Cubic inches</p>
                                <p className="text-xl font-bold text-blue-400">
                                    <Counter
                                        value={results.inches}
                                        formatter={(val) => Math.round(val).toLocaleString()}
                                    />
                                    <span className="text-xs font-normal ml-1 text-blue-400">IN³</span>
                                </p>
                            </div>
                        </div>
                    </ResultFeedbackCard>

                    {/* Logistics Analysis Card */}
                    <div className="space-y-2 flex-1 flex flex-col">
                        <div className="flex items-center gap-2 mb-2">
                            <div className="p-1.5 bg-slate-100 rounded-lg text-slate-600">
                                <Truck className="w-4 h-4" />
                            </div>
                            <h3 className="text-lg font-bold text-blue-400 font-sans">Freight & Logistics Analysis</h3>
                        </div>

                        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4 relative overflow-hidden group flex-1 flex flex-col">
                            {logisticsImpact ? (
                                <>
                                    {/* 1. Calculated Tier Section */}
                                    <div className="space-y-4 pt-2">
                                        <div className="space-y-1">
                                            <div className="flex items-center justify-between">
                                                <span className="text-xs sm:text-[13px] font-medium text-slate-400 tracking-wide">Calculated tier</span>
                                                <div className={cn("px-2 py-0.5 rounded-full text-[10px] sm:text-[11px] font-bold uppercase tracking-wider opacity-90", logisticsImpact.statusColor)}>
                                                    {logisticsImpact.status}
                                                </div>
                                            </div>
                                            <h4 className="text-xl sm:text-[22px] font-bold text-blue-400 tracking-tight leading-none pt-1">
                                                {logisticsImpact.tierName}
                                            </h4>
                                        </div>
                                    </div>

                                    <div className="flex-1 flex flex-col space-y-4">
                                        <div className="h-px bg-slate-100 w-full" />

                                        {/* 2. Costs Row */}
                                        <div className="grid grid-cols-2 gap-x-6 pb-1">
                                            <div className="space-y-1">
                                                <span className="text-xs font-medium text-slate-400 block">Estimated freight</span>
                                                <div className="text-lg sm:text-[21px] font-bold text-blue-400 tracking-tight leading-tight">
                                                    {logisticsImpact.costRange}
                                                </div>
                                            </div>
                                            <div className="space-y-1">
                                                <span className="text-xs font-medium text-slate-400 block">Estimated storage</span>
                                                <div className="text-lg sm:text-[21px] font-bold text-blue-400 tracking-tight leading-tight">
                                                    {logisticsImpact.storageCost}
                                                </div>
                                            </div>
                                        </div>

                                        {logisticsImpact.alert && (
                                            <div className="mt-auto pt-2">
                                                <div className="flex gap-3 bg-amber-50 p-3 rounded-xl border border-amber-100 text-amber-800 text-sm font-semibold items-center">
                                                    <AlertTriangle className="w-5 h-5 flex-shrink-0 text-amber-600" />
                                                    <p className="leading-snug">{logisticsImpact.alert}</p>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </>
                            ) : (
                                <>
                                    {/* Ghost Content Background */}
                                    <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:16px_16px]" />

                                    <div className="relative z-0 space-y-8 blur-[1px] opacity-[0.08] select-none pointer-events-none">
                                        <div className="space-y-3">
                                            <div className="h-3 w-16 bg-slate-400 rounded-full" />
                                            <div className="h-7 w-40 bg-slate-500 rounded-lg" />
                                            <div className="h-4 w-56 bg-slate-300 rounded-md" />
                                        </div>
                                        <div className="h-px bg-slate-200 w-full" />
                                        <div className="space-y-3">
                                            <div className="h-3 w-28 bg-slate-400 rounded-full" />
                                            <div className="h-9 w-32 bg-slate-500 rounded-lg" />
                                            <div className="h-3 w-44 bg-slate-300 rounded-md" />
                                        </div>
                                    </div>

                                    {/* Floating Insight Card */}
                                    <div className="absolute inset-0 flex items-center justify-center p-6 bg-white/20 backdrop-blur-[0.5px]">
                                        <div className="bg-white p-6 rounded-2xl shadow-xl shadow-slate-900/5 border border-slate-100 text-center space-y-3 transform transition-all duration-500 group-hover:scale-[1.02] max-w-[240px]">
                                            <div className="w-14 h-14 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl flex items-center justify-center text-blue-500 mx-auto shadow-inner">
                                                <Truck className="w-7 h-7 animate-pulse" />
                                            </div>
                                            <div className="space-y-1.5">
                                                <h4 className="text-base font-bold text-slate-900 tracking-tight">Unlock Insights</h4>
                                                <p className="text-xs text-slate-500 leading-relaxed font-medium">
                                                    Enter dimensions to see <strong>logistics tiers</strong>, estimated costs & storage fees.
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
