"use client"
import React, { useState, useEffect, useMemo } from "react"
import { Scale, RefreshCw, Info, Package, ChevronDown, Truck, Check, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils"
import { Card, CardContent } from "@/components/ui/card"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { CalculatorCardHeader, CalculatorInput } from "../../../_shared/components"
import { motion, AnimatePresence } from "framer-motion"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

type WeightUnit = "oz" | "lbs" | "g" | "kg"
type ShippingMode = "carrier" | "class"

interface ConversionResult {
    oz: number
    lbs: number
    g: number
    kg: number
}

// Extended Carriers and Classes
type CarrierType = "usps" | "fedex" | "ups" | "dhl" | "royal_mail" | "canada_post" | "aus_post" | "other"
type ShippingClassType = "standard" | "express" | "overnight"

// Carrier shipping tiers (in lbs)
const CARRIER_TIERS: Record<CarrierType, { label: string; group: string; tiers: { max: number; label: string; cost: string; color: string }[] }> = {
    usps: {
        label: "USPS", group: "US & Global",
        tiers: [
            { max: 0.219, label: "First Class (Light)", cost: "$4.50–$7.50", color: "emerald" },
            { max: 1, label: "Priority (Env/Small)", cost: "$8.55–$19.95", color: "blue" },
            { max: 25, label: "Priority (Medium)", cost: "$16.10–$70.00", color: "blue" },
            { max: 70, label: "Priority (Large)", cost: "$21.90–$94.00", color: "amber" },
            { max: Infinity, label: "Retail / Freight", cost: "Contact carrier", color: "slate" },
        ]
    },
    fedex: {
        label: "FedEx", group: "US & Global",
        tiers: [
            { max: 1, label: "FedEx One Rate (Small)", cost: "$10.25–$14.35", color: "emerald" },
            { max: 10, label: "FedEx Home Delivery", cost: "$11.00–$28.00", color: "blue" },
            { max: 25, label: "FedEx Ground (Standard)", cost: "$18.00–$52.00", color: "blue" },
            { max: 70, label: "FedEx Express Saver", cost: "$28.00–$120.00", color: "amber" },
            { max: 150, label: "FedEx 2Day / Overnight", cost: "$55.00–$250.00", color: "orange" },
            { max: Infinity, label: "FedEx Freight", cost: "Quote Required", color: "slate" },
        ]
    },
    ups: {
        label: "UPS", group: "US & Global",
        tiers: [
            { max: 1, label: "UPS SurePost (Light)", cost: "$5.50–$9.00", color: "emerald" },
            { max: 10, label: "UPS Ground (Standard)", cost: "$12.00–$29.00", color: "blue" },
            { max: 30, label: "UPS Ground (Commercial)", cost: "$20.00–$58.00", color: "blue" },
            { max: 70, label: "UPS 3 Day Select", cost: "$32.00–$130.00", color: "amber" },
            { max: 150, label: "UPS 2nd Day Air", cost: "$55.00–$220.00", color: "orange" },
            { max: Infinity, label: "UPS Freight", cost: "Quote Required", color: "slate" },
        ]
    },
    dhl: {
        label: "DHL", group: "US & Global",
        tiers: [
            { max: 0.5, label: "DHL SmartMail Parcel (XS)", cost: "$2.75–$5.50", color: "emerald" },
            { max: 2, label: "DHL SmartMail Parcel (S)", cost: "$5.00–$10.00", color: "emerald" },
            { max: 10, label: "DHL eCommerce (Standard)", cost: "$9.00–$22.00", color: "blue" },
            { max: 30, label: "DHL Express Worldwide", cost: "$35.00–$85.00", color: "amber" },
            { max: 70, label: "DHL Express (Heavy)", cost: "$80.00–$200.00", color: "orange" },
            { max: Infinity, label: "DHL Freight / Custom", cost: "Quote Required", color: "slate" },
        ]
    },
    royal_mail: {
        label: "Royal Mail (UK)", group: "Regional",
        tiers: [
            { max: 0.22, label: "Large Letter", cost: "£1.55–£3.30", color: "emerald" },
            { max: 4.4, label: "Small/Med Parcel", cost: "£3.69–£6.69", color: "blue" },
            { max: 44, label: "Parcelforce Worldwide", cost: "£12.00+", color: "amber" },
            { max: Infinity, label: "Freight", cost: "Consult Size", color: "slate" },
        ]
    },
    canada_post: {
        label: "Canada Post", group: "Regional",
        tiers: [
            { max: 1.1, label: "Oversize Lettermail", cost: "$1.94–$3.19 CAD", color: "emerald" },
            { max: 11, label: "Regular Parcel", cost: "$10.00–$25.00 CAD", color: "blue" },
            { max: 66, label: "Xpresspost", cost: "$15.00–$60.00 CAD", color: "amber" },
            { max: Infinity, label: "Priority / Freight", cost: "Consult Size", color: "slate" },
        ]
    },
    aus_post: {
        label: "Australia Post", group: "Regional",
        tiers: [
            { max: 1.1, label: "Large Letter", cost: "$3.00–$5.50 AUD", color: "emerald" },
            { max: 11, label: "Parcel Post", cost: "$10.60–$21.05 AUD", color: "blue" },
            { max: 48, label: "Express Post", cost: "$14.10–$28.20 AUD", color: "amber" },
            { max: Infinity, label: "Courier/Freight", cost: "Consult Size", color: "slate" },
        ]
    },
    other: {
        label: "Other Carrier", group: "Generic",
        tiers: [
            { max: 1, label: "Light Doc/Envelope", cost: "Custom pricing", color: "slate" },
            { max: 10, label: "Standard Parcel", cost: "Custom pricing", color: "slate" },
            { max: 50, label: "Heavy Box", cost: "Custom pricing", color: "slate" },
            { max: Infinity, label: "Pallet / Freight", cost: "Contact carrier", color: "slate" }
        ]
    }
}

// Universal Shipping Speed / Class Estimates
const SHIPPING_CLASSES: Record<ShippingClassType, { label: string; tiers: { max: number; label: string; cost: string; color: string }[] }> = {
    standard: {
        label: "Standard / Ground",
        tiers: [
            { max: 1, label: "Standard Envelope (Economy)", cost: "$3.00–$8.00", color: "emerald" },
            { max: 15, label: "Standard Parcel", cost: "$10.00–$30.00", color: "blue" },
            { max: 70, label: "Heavy Standard", cost: "$20.00–$70.00", color: "amber" },
            { max: Infinity, label: "Standard Oversize", cost: "Requires Quote", color: "slate" }
        ]
    },
    express: {
        label: "Express / Expedited",
        tiers: [
            { max: 1, label: "Express Pouch", cost: "$8.00–$18.00", color: "emerald" },
            { max: 15, label: "Express Parcel", cost: "$18.00–$60.00", color: "blue" },
            { max: 70, label: "Express Freight (Heavy)", cost: "$50.00–$150.00", color: "amber" },
            { max: Infinity, label: "Bulk Express", cost: "Requires Quote", color: "slate" }
        ]
    },
    overnight: {
        label: "Next Day / Air",
        tiers: [
            { max: 1, label: "Overnight Envelope", cost: "$25.00–$50.00", color: "emerald" },
            { max: 15, label: "Overnight Parcel", cost: "$50.00–$120.00", color: "blue" },
            { max: 70, label: "Overnight Freight", cost: "$100.00–$300.00", color: "amber" },
            { max: Infinity, label: "Priority Airfreight", cost: "Requires Quote", color: "slate" }
        ]
    }
}

const UNIT_NAMES: Record<WeightUnit, string> = {
    oz: "Ounces",
    lbs: "Pounds",
    g: "Grams",
    kg: "Kilograms"
}

const UNIT_ABBR: Record<WeightUnit, string> = {
    oz: "oz",
    lbs: "lb",
    g: "g",
    kg: "kg"
}

const TIER_COLORS: Record<string, { bg: string; border: string; text: string; dot: string; badge: string }> = {
    emerald: { bg: "bg-emerald-50", border: "border-emerald-200/70", text: "text-emerald-700", dot: "bg-emerald-400", badge: "bg-emerald-100/80 text-emerald-700" },
    blue: { bg: "bg-blue-50", border: "border-blue-200/70", text: "text-blue-700", dot: "bg-blue-400", badge: "bg-blue-100/80 text-blue-700" },
    amber: { bg: "bg-amber-50", border: "border-amber-200/70", text: "text-amber-700", dot: "bg-amber-400", badge: "bg-amber-100/80 text-amber-700" },
    orange: { bg: "bg-orange-50", border: "border-orange-200/70", text: "text-orange-700", dot: "bg-orange-400", badge: "bg-orange-100/80 text-orange-700" },
    slate: { bg: "bg-slate-50", border: "border-slate-200/70", text: "text-slate-600", dot: "bg-slate-400", badge: "bg-slate-100/80 text-slate-700" },
}

export function WeightConverter() {
    const [inputValue, setInputValue] = useState<string>("")
    const [inputUnit, setInputUnit] = useState<WeightUnit>("lbs")
    const [targetUnit, setTargetUnit] = useState<WeightUnit>("kg")
    const [shippingMode, setShippingMode] = useState<ShippingMode>("carrier")
    const [carrier, setCarrier] = useState<CarrierType>("usps")
    const [shippingClass, setShippingClass] = useState<ShippingClassType>("standard")
    const [showBreakdown, setShowBreakdown] = useState(false)

    // Smart default switching
    useEffect(() => {
        if (inputUnit === targetUnit) {
            const defaults: Record<WeightUnit, WeightUnit> = {
                'lbs': 'kg', 'oz': 'g', 'kg': 'lbs', 'g': 'oz'
            }
            setTargetUnit(defaults[inputUnit])
        }
    }, [inputUnit, targetUnit])

    const conversions = useMemo((): ConversionResult => {
        const val = parseFloat(inputValue || "0")
        let baseInGrams = 0
        switch (inputUnit) {
            case "oz": baseInGrams = val * 28.3495; break
            case "lbs": baseInGrams = val * 453.592; break
            case "g": baseInGrams = val; break
            case "kg": baseInGrams = val * 1000; break
        }
        return {
            oz: baseInGrams / 28.3495,
            lbs: baseInGrams / 453.592,
            g: baseInGrams,
            kg: baseInGrams / 1000
        }
    }, [inputValue, inputUnit])

    const formatCompact = (val: number, decimals = 4): string => {
        if (val === 0) return "0"
        if (Math.abs(val) < 100000)
            return val.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: decimals })
        return new Intl.NumberFormat('en-US', { notation: "compact", maximumFractionDigits: 2 }).format(val)
    }

    const secondaryUnits = useMemo(() => {
        const allUnits: WeightUnit[] = ["lbs", "oz", "kg", "g"]
        return allUnits.filter(u => u !== inputUnit && u !== targetUnit)
    }, [inputUnit, targetUnit])

    const isCalculated = !!inputValue && parseFloat(inputValue) > 0

    // Shipping logic
    const weightInLbs = conversions.lbs
    const selectedShippingData = shippingMode === "carrier" ? CARRIER_TIERS[carrier] : SHIPPING_CLASSES[shippingClass]
    const handleShippingChange = (val: string) => {
        if (CARRIER_TIERS[val as CarrierType]) {
            setShippingMode("carrier")
            setCarrier(val as CarrierType)
        } else if (SHIPPING_CLASSES[val as ShippingClassType]) {
            setShippingMode("class")
            setShippingClass(val as ShippingClassType)
        }
    }

    const activeTier = useMemo(() => {
        if (!isCalculated) return null
        return selectedShippingData.tiers.find(t => weightInLbs <= t.max) || selectedShippingData.tiers[selectedShippingData.tiers.length - 1]
    }, [isCalculated, weightInLbs, selectedShippingData])

    // Breakdown: show all tiers with highlight on active
    const handleReset = () => {
        setInputValue("")
        setInputUnit("lbs")
        setTargetUnit("kg")
        setShippingMode("carrier")
        setCarrier("usps")
        setShippingClass("standard")
        setShowBreakdown(false)
    }

    return (
        <div className="p-8 sm:p-12 max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">

                {/* ═══ LEFT COLUMN: Input Panel ═══ */}
                <div className="lg:col-span-7 self-start lg:sticky lg:top-28">
                    <Card className="border-slate-200 shadow-sm relative overflow-hidden bg-white flex flex-col">
                        <CalculatorCardHeader
                            title="Weight Converter"
                            description="Enter your product weight and select target unit. Includes shipping tier estimator by carrier."
                            guideId="how-to-use"
                            tooltip="How to use this converter"
                            onReset={handleReset}
                        />
                        <CardContent className="p-6 md:p-8 pb-12 md:pb-16 space-y-8 flex-1 flex flex-col">
                            <div className="space-y-6 max-w-[520px] mx-auto w-full">

                                {/* ── Weight Configuration ── */}
                                <div className="weight-config-group space-y-3">
                                    <CalculatorInput
                                        hideSeparator={true}
                                        label="Input Weight"
                                        value={inputValue}
                                        onChange={(v) => setInputValue(v.toString())}
                                        placeholder="12.00"
                                        type="number"
                                        tooltip="Enter the weight value you wish to convert"
                                        groupingTitle="Weight Configuration"
                                        groupingIcon={Scale}
                                    />
                                    {/* Weight Unit Selector */}
                                    <div className="calculator-input-row max-w-[520px] mx-auto px-3 sm:px-5">
                                        <div className="flex items-center gap-3 w-full relative z-10">
                                            <div className="flex items-center gap-2 flex-1 min-w-0 text-left">
                                                <label className="text-[14.5px] font-medium text-slate-600/90 cursor-pointer py-1">Weight Unit</label>
                                                <Tooltip>
                                                    <TooltipTrigger asChild>
                                                        <button type="button" tabIndex={-1} className="text-slate-400 hover:text-blue-500 transition-colors cursor-help shrink-0">
                                                            <Info className="w-3.5 h-3.5" />
                                                        </button>
                                                    </TooltipTrigger>
                                                    <TooltipContent side="top" className="max-w-xs text-[13px] font-normal bg-slate-900 text-white border-slate-800">
                                                        Select the unit of measurement for the weight value you're entering.
                                                    </TooltipContent>
                                                </Tooltip>
                                            </div>
                                            <div className="flex items-center bg-slate-100 p-0.5 rounded-lg border border-slate-200 h-11 font-sans w-36 sm:w-44">
                                                {(["lbs", "oz", "kg", "g"] as WeightUnit[]).map((u) => (
                                                    <button
                                                        key={u}
                                                        onClick={() => setInputUnit(u)}
                                                        className={cn(
                                                            "px-3 h-full rounded-md text-[13px] font-bold transition-all flex-1 flex items-center justify-center",
                                                            inputUnit === u
                                                                ? "bg-white text-blue-600 shadow-sm border border-blue-200"
                                                                : "text-slate-500 hover:text-slate-900"
                                                        )}
                                                    >{u}</button>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* ── Conversion Target ── */}
                                <div className="space-y-0">
                                    <div className="calculator-input-row max-w-[520px] mx-auto px-3 sm:px-5 pb-0">
                                        <div className="h-px bg-slate-100/80 w-[calc(100%+48px)] -ml-6 mb-3 mt-1" />
                                        <div className="relative w-full">
                                            <div className="absolute left-[-19px] w-[1.5px] bg-blue-200/70 z-0" style={{ top: '14px', bottom: '0px' }} />
                                            <div className="flex items-center gap-2 -ml-[33px] mb-0.5 relative h-7 z-10">
                                                <div className="w-7 h-7 rounded-lg bg-blue-50 ring-[6px] ring-white flex items-center justify-center flex-shrink-0 z-10">
                                                    <RefreshCw className="w-3.5 h-3.5 text-blue-600" />
                                                </div>
                                                <span className="text-[16px] font-bold text-slate-600 capitalize z-10 tracking-tight flex-1">Conversion Target</span>
                                            </div>
                                            <div className="flex items-center gap-3 w-full relative z-10 mt-3">
                                                <div className="flex items-center gap-2 flex-1 min-w-0 text-left">
                                                    <label className="text-[14.5px] font-medium text-slate-600/90 cursor-pointer py-1">Target Unit</label>
                                                    <Tooltip>
                                                        <TooltipTrigger asChild>
                                                            <button type="button" tabIndex={-1} className="text-slate-400 hover:text-blue-500 transition-colors cursor-help shrink-0">
                                                                <Info className="w-3.5 h-3.5" />
                                                            </button>
                                                        </TooltipTrigger>
                                                        <TooltipContent side="top" className="max-w-xs text-[13px] font-normal bg-slate-900 text-white border-slate-800">
                                                            Select the unit you want to convert your weight to.
                                                        </TooltipContent>
                                                    </Tooltip>
                                                </div>
                                                <div className="flex items-center bg-slate-100 p-0.5 rounded-lg border border-slate-200 h-11 font-sans w-36 sm:w-44">
                                                    {(["lbs", "oz", "kg", "g"] as WeightUnit[]).map((u) => (
                                                        <button
                                                            key={u}
                                                            onClick={() => setTargetUnit(u)}
                                                            disabled={inputUnit === u}
                                                            className={cn(
                                                                "px-3 h-full rounded-md text-[13px] font-bold transition-all flex-1 flex items-center justify-center",
                                                                targetUnit === u
                                                                    ? "bg-white text-blue-600 shadow-sm border border-blue-200"
                                                                    : "text-slate-500 hover:text-slate-900",
                                                                inputUnit === u && "opacity-30 cursor-not-allowed"
                                                            )}
                                                        >{u}</button>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* ── Shipping Details ── */}
                                <div className="space-y-0">
                                    <div className="calculator-input-row max-w-[520px] mx-auto px-3 sm:px-5 pb-0">
                                        <div className="h-px bg-slate-100/80 w-[calc(100%+48px)] -ml-6 mb-3 mt-1" />
                                        <div className="relative w-full">
                                            <div className="absolute left-[-19px] w-[1.5px] bg-blue-200/70 z-0" style={{ top: '14px', bottom: '0px' }} />
                                            <div className="flex items-center justify-between -ml-[33px] mb-0.5 relative h-7 z-10 w-[calc(100%+33px)]">
                                                <div className="flex items-center gap-2">
                                                    <div className="w-7 h-7 rounded-lg bg-blue-50 ring-[6px] ring-white flex items-center justify-center flex-shrink-0 z-10">
                                                        <Truck className="w-3.5 h-3.5 text-blue-600" />
                                                    </div>
                                                    <span className="text-[16px] font-bold text-slate-600 capitalize z-10 tracking-tight">Shipping Estimator</span>
                                                </div>
                                            </div>
                                            {/* Carrier Selector Row */}
                                            <div className="flex items-center gap-3 w-full relative z-10 mt-3">
                                                <div className="flex items-center gap-2 flex-1 min-w-0 text-left">
                                                    <label className="text-[14.5px] font-medium text-slate-600/90 cursor-pointer py-1">
                                                        Select Carrier
                                                    </label>
                                                    <Tooltip>
                                                        <TooltipTrigger asChild>
                                                            <button type="button" tabIndex={-1} className="text-slate-400 hover:text-blue-500 transition-colors cursor-help shrink-0">
                                                                <Info className="w-3.5 h-3.5" />
                                                            </button>
                                                        </TooltipTrigger>
                                                        <TooltipContent side="top" className="max-w-xs text-[13px] font-normal bg-slate-900 text-white border-slate-800">
                                                            Select your shipping carrier to see estimated rates.
                                                        </TooltipContent>
                                                    </Tooltip>
                                                </div>
                                                <div className="w-36 sm:w-44 flex-shrink-0">
                                                    <Select 
                                                        value={carrier} 
                                                        onValueChange={(v) => {
                                                            setCarrier(v as CarrierType)
                                                            setShippingMode("carrier")
                                                        }}
                                                    >
                                                        <SelectTrigger className="h-11 text-[13px] border border-slate-200 font-semibold transition-all px-3 bg-white text-slate-700 focus:ring-0 focus:ring-offset-0 focus:outline-none hover:border-slate-300 shadow-sm rounded-xl">
                                                            <SelectValue placeholder="Select..." />
                                                        </SelectTrigger>
                                                        <SelectContent align="end" className="max-h-[300px] border-slate-200 shadow-xl rounded-xl z-[1001]">
                                                            {Object.entries(
                                                                Object.entries(CARRIER_TIERS).reduce((acc, [key, val]) => {
                                                                    if (!acc[val.group]) acc[val.group] = [];
                                                                    acc[val.group].push({ key, label: val.label });
                                                                    return acc;
                                                                }, {} as Record<string, {key: string, label: string}[]>)
                                                            ).map(([group, carriers]) => (
                                                                <SelectGroup key={group}>
                                                                    <SelectLabel className="text-[10px] font-extrabold text-slate-400 uppercase tracking-[0.13em] px-2 py-1.5 bg-slate-50/80 mb-1">{group}</SelectLabel>
                                                                    {carriers.map(c => (
                                                                        <SelectItem key={c.key} value={c.key} className="text-[12px] font-medium leading-tight py-1.5 cursor-pointer">{c.label}</SelectItem>
                                                                    ))}
                                                                </SelectGroup>
                                                            ))}
                                                        </SelectContent>
                                                    </Select>
                                                </div>
                                            </div>

                                            {/* Speed Selector Row */}
                                            <div className="flex items-center gap-3 w-full relative z-10 mt-2 pb-1">
                                                <div className="flex items-center gap-2 flex-1 min-w-0 text-left">
                                                    <label className="text-[14.5px] font-medium text-slate-600/90 cursor-pointer py-1">
                                                        Shipping Speed
                                                    </label>
                                                    <Tooltip>
                                                        <TooltipTrigger asChild>
                                                            <button type="button" tabIndex={-1} className="text-slate-400 hover:text-blue-500 transition-colors cursor-help shrink-0">
                                                                <Info className="w-3.5 h-3.5" />
                                                            </button>
                                                        </TooltipTrigger>
                                                        <TooltipContent side="top" className="max-w-xs text-[13px] font-normal bg-slate-900 text-white border-slate-800">
                                                            Select general shipping speed for estimates.
                                                        </TooltipContent>
                                                    </Tooltip>
                                                </div>
                                                <div className="w-36 sm:w-44 flex-shrink-0">
                                                    <Select 
                                                        value={shippingClass} 
                                                        onValueChange={(v) => {
                                                            setShippingClass(v as ShippingClassType)
                                                            setShippingMode("class")
                                                        }}
                                                    >
                                                        <SelectTrigger className="h-11 text-[13px] border border-slate-200 font-semibold transition-all px-3 bg-white text-slate-700 focus:ring-0 focus:ring-offset-0 focus:outline-none hover:border-slate-300 shadow-sm rounded-xl">
                                                            <SelectValue placeholder="Select..." />
                                                        </SelectTrigger>
                                                        <SelectContent align="end" className="max-h-[300px] border-slate-200 shadow-xl rounded-xl z-[1001]">
                                                            <SelectGroup>
                                                                <SelectLabel className="text-[10px] font-extrabold text-slate-400 uppercase tracking-[0.13em] px-2 py-1.5 bg-slate-50/80 mb-1">Speed Types</SelectLabel>
                                                                {Object.entries(SHIPPING_CLASSES).map(([key, val]) => (
                                                                    <SelectItem key={key} value={key} className="text-[12px] font-medium leading-tight py-1.5 cursor-pointer">{val.label}</SelectItem>
                                                                ))}
                                                            </SelectGroup>
                                                        </SelectContent>
                                                    </Select>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* ═══ RIGHT COLUMN: Results Panel ═══ */}
                <div className="lg:col-span-5 flex flex-col gap-3">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
                        className="flex flex-col gap-3"
                    >
                        <Card className="relative overflow-hidden border border-slate-200/60 shadow-sm rounded-2xl bg-[#F5F8FD] flex flex-col">
                            {/* Header */}
                            <div className="flex justify-between items-center gap-4 px-6 pt-5 pb-1">
                                <div className="flex items-center gap-2.5">
                                    <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-blue-600/10 border border-blue-100/50">
                                        <Scale className="w-4 h-4 text-blue-600" />
                                    </div>
                                    <span className="text-[15px] sm:text-[16px] font-bold text-blue-700 leading-none">
                                        Results Panel
                                    </span>
                                </div>
                                <AnimatePresence mode="wait">
                                    {isCalculated ? (
                                        <motion.div
                                            key="live"
                                            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                                            className={cn(
                                                "flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-[10.5px] font-bold",
                                                activeTier?.color === "emerald" ? "bg-emerald-100/50 text-emerald-700 border-emerald-200/50" :
                                                activeTier?.color === "amber" || activeTier?.color === "orange" ? "bg-amber-100/50 text-amber-700 border-amber-200/50" :
                                                "bg-blue-100/50 text-blue-700 border-blue-200/50"
                                            )}
                                        >
                                            <span className={cn(
                                                "w-1.5 h-1.5 rounded-full animate-pulse inline-block",
                                                activeTier?.color === "emerald" ? "bg-emerald-500" :
                                                activeTier?.color === "amber" || activeTier?.color === "orange" ? "bg-amber-500" :
                                                "bg-blue-500"
                                            )} />
                                            {activeTier ? activeTier.label.split("(")[0].trim() : "Target Weight"}
                                        </motion.div>
                                    ) : (
                                        <motion.div
                                            key="idle"
                                            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                                            className="text-[10.5px] font-bold text-slate-400 px-2"
                                        >
                                            Awaiting input
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>

                            <AnimatePresence mode="wait">
                                {!isCalculated ? (
                                    /* ── EMPTY STATE (UPC/GTIN style: frosted overlay + blurred skeleton) ── */
                                    <motion.div
                                        key="empty"
                                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                                        transition={{ duration: 0.4, ease: "easeInOut" }}
                                        className="relative z-10 px-6 pb-6 pt-2"
                                    >
                                        <div className="relative">
                                            {/* Frosted glass overlay */}
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
                                                            <Package className="w-[18px] h-[18px]" />
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
                                                            Conversion Results
                                                        </span>
                                                    </div>
                                                </motion.div>
                                            </div>

                                            {/* Blurred skeleton */}
                                            <div className="blur-[2.5px] opacity-40 select-none pointer-events-none">
                                                <div className="flex flex-col items-center justify-center py-5 px-4 mb-2">
                                                    <div className="h-2.5 w-24 rounded-full bg-slate-200/60 mb-3 animate-pulse" />
                                                    <div className="h-12 w-40 rounded-xl bg-slate-200/50 mb-2 animate-pulse" style={{ animationDelay: "0.1s" }} />
                                                    <div className="flex flex-col items-center gap-1.5 mt-1">
                                                        <div className="h-2 w-44 rounded-full bg-slate-200/60 animate-pulse" style={{ animationDelay: "0.2s" }} />
                                                        <div className="h-2 w-32 rounded-full bg-slate-200/50 animate-pulse" style={{ animationDelay: "0.3s" }} />
                                                    </div>
                                                </div>
                                                <div className="h-px w-full bg-slate-200/40 my-4" />
                                                <div className="space-y-3 px-2">
                                                    <div className="bg-slate-50/50 border border-slate-100 p-3 rounded-xl">
                                                        <div className="h-2 w-20 rounded-full bg-slate-200/60 mb-3 animate-pulse" />
                                                        <div className="h-4 w-16 rounded-lg bg-slate-200/50 animate-pulse" />
                                                    </div>
                                                    <div className="bg-slate-50/50 border border-slate-100 p-3 rounded-xl">
                                                        <div className="h-2 w-24 rounded-full bg-slate-200/60 mb-3 animate-pulse" style={{ animationDelay: "0.1s" }} />
                                                        <div className="h-4 w-12 rounded-lg bg-slate-200/50 animate-pulse" style={{ animationDelay: "0.15s" }} />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                ) : (
                                    /* ── RESULTS STATE ── */
                                    <motion.div
                                        key="results"
                                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                                        transition={{ duration: 0.45, ease: "easeInOut" }}
                                        className="flex flex-col gap-3 px-5 pb-5 pt-2"
                                    >
                                        {/* 1 — Target Conversion (Valid-like Hero) */}
                                        <motion.div
                                            initial={{ opacity: 0, scale: 0.97 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            transition={{ duration: 0.4, delay: 0.05 }}
                                            className="relative flex flex-col items-center text-center py-6 px-4 bg-transparent"
                                        >
                                            <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.18em] leading-none mb-2">Target Conversion</span>
                                            <motion.span
                                                key={`${conversions[targetUnit]}-${targetUnit}`}
                                                initial={{ opacity: 0, y: 4 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ duration: 0.3 }}
                                                className="text-[3.25rem] font-black text-blue-600 tracking-tighter leading-none"
                                            >
                                                {formatCompact(conversions[targetUnit], 4)}
                                            </motion.span>
                                            <span className="text-[1rem] font-bold text-slate-700 mt-1">{UNIT_NAMES[targetUnit]}</span>
                                            <p className="text-[11.5px] text-slate-500 font-medium mt-2">
                                                from {inputValue} {UNIT_NAMES[inputUnit]}
                                            </p>
                                        </motion.div>

                                        {/* 2 — Separated Cards Style */}
                                        
                                        {/* Card 1: Other Units */}
                                        <motion.div
                                            initial={{ opacity: 0, y: 8 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.35, delay: 0.1 }}
                                            className="bg-white border border-slate-200/70 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] rounded-xl p-4 transition-all duration-200 hover:border-slate-300 hover:shadow-[0_4px_12px_-4px_rgba(0,0,0,0.08)]"
                                        >
                                            <div className="flex items-center gap-2 mb-3">
                                                <RefreshCw className="w-4 h-4 text-blue-500 flex-shrink-0" />
                                                <span className="text-[13px] font-bold text-slate-500">Other Units</span>
                                            </div>
                                            <div className="pl-7 space-y-2">
                                                {secondaryUnits.map((unit) => (
                                                    <div key={unit} className="flex items-center justify-between mt-1">
                                                        <span className="text-xs text-slate-600 font-medium">{UNIT_NAMES[unit]}</span>
                                                        <span className="font-black tracking-tight text-[16px] text-slate-800 flex items-baseline">
                                                            {formatCompact(conversions[unit], 4)}
                                                            <span className="font-medium text-[0.6em] ml-1">{UNIT_ABBR[unit]}</span>
                                                        </span>
                                                    </div>
                                                ))}
                                                <div className="flex items-center justify-between pt-2 border-t border-slate-100 mt-2">
                                                    <span className="text-xs text-slate-600 font-medium">
                                                        {UNIT_NAMES[inputUnit]} <span className="text-blue-400 text-[10px] ml-1">(input)</span>
                                                    </span>
                                                    <span className="font-black tracking-tight text-[16px] text-slate-800 flex items-baseline">
                                                        {formatCompact(conversions[inputUnit], 4)}
                                                        <span className="font-medium text-[0.6em] ml-1">{UNIT_ABBR[inputUnit]}</span>
                                                    </span>
                                                </div>
                                            </div>
                                        </motion.div>

                                        {/* Card 2: Shipping Estimate */}
                                        {activeTier && (
                                            <motion.div
                                                initial={{ opacity: 0, y: 8 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ duration: 0.35, delay: 0.15 }}
                                                className="bg-white border border-slate-200/70 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] rounded-xl p-4 transition-all duration-200 hover:border-slate-300 hover:shadow-[0_4px_12px_-4px_rgba(0,0,0,0.08)]"
                                            >
                                                <div className="flex items-center justify-between mb-3">
                                                    <div className="flex items-center gap-2">
                                                        <Truck className="w-4 h-4 text-blue-500 flex-shrink-0" />
                                                        <span className="text-[13px] font-bold text-slate-500">
                                                            {selectedShippingData.label} Estimate
                                                        </span>
                                                    </div>
                                                    <span className="text-[10px] font-extrabold px-2 py-0.5 rounded bg-blue-100/80 text-blue-700 flex-shrink-0">
                                                        {activeTier.cost}
                                                    </span>
                                                </div>
                                                <div className="pl-6 pt-0.5">
                                                    <span className="font-black tracking-tight block text-xl text-slate-800">
                                                        {activeTier.label}
                                                    </span>
                                                    <p className="text-[11px] font-medium text-slate-500 mt-1 flex items-baseline">
                                                        {formatCompact(weightInLbs, 3)}<span className="ml-1 text-[0.8em]">lb</span>
                                                    </p>
                                                </div>
                                            </motion.div>
                                        )}

                                        {/* Card 3: Breakdown Collapsible */}
                                        <motion.div
                                            initial={{ opacity: 0, y: 8 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.35, delay: 0.2 }}
                                            className="bg-white border border-slate-200/70 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] rounded-xl pt-1 pb-1 transition-all duration-200 hover:border-slate-300 hover:shadow-[0_4px_12px_-4px_rgba(0,0,0,0.08)]"
                                        >
                                            <button
                                                onClick={() => setShowBreakdown(v => !v)}
                                                className="w-full flex items-center justify-between px-4 py-3 text-left transition-colors"
                                            >
                                                <div className="flex items-center gap-2">
                                                    <Package className="w-4 h-4 text-blue-500" />
                                                    <span className="text-[13px] font-bold text-slate-500">View Cost Breakdown</span>
                                                </div>
                                                <motion.span
                                                    animate={{ rotate: showBreakdown ? 180 : 0 }}
                                                    transition={{ duration: 0.2 }}
                                                >
                                                    <ChevronDown className="w-4 h-4 text-slate-400" />
                                                </motion.span>
                                            </button>
                                            <AnimatePresence>
                                                {showBreakdown && (
                                                    <motion.div
                                                        initial={{ height: 0, opacity: 0 }}
                                                        animate={{ height: "auto", opacity: 1 }}
                                                        exit={{ height: 0, opacity: 0 }}
                                                        transition={{ duration: 0.28, ease: "easeInOut" }}
                                                        className="overflow-hidden"
                                                    >
                                                        <div className="border-t border-slate-100 divide-y divide-slate-100/60 mt-1 mx-2">
                                                            {selectedShippingData.tiers.map((tier, idx) => {
                                                                const isActive = activeTier?.label === tier.label
                                                                const colors = TIER_COLORS[tier.color] || TIER_COLORS.slate
                                                                return (
                                                                    <div
                                                                        key={idx}
                                                                        className={cn(
                                                                            "flex items-center justify-between px-3 py-2.5 transition-colors rounded hover:bg-slate-50/50 mb-1 mt-1",
                                                                            isActive ? cn(colors.bg, "border-l-[3px]", colors.border.replace("border-", "border-l-")) : ""
                                                                        )}
                                                                    >
                                                                        <div className="flex items-center gap-2 min-w-0">
                                                                            <span className={cn("w-1.5 h-1.5 rounded-full shrink-0", isActive ? colors.dot : "bg-slate-300")} />
                                                                            <div className="min-w-0">
                                                                                <p className={cn("text-[11px] font-semibold truncate", isActive ? colors.text : "text-slate-600")}>
                                                                                    {tier.label}
                                                                                </p>
                                                                                <p className="text-[10px] text-slate-400">
                                                                                    up to {tier.max === Infinity ? "∞" : `${tier.max} lb`}
                                                                                </p>
                                                                            </div>
                                                                        </div>
                                                                        <span className={cn(
                                                                            "text-[10.5px] font-bold shrink-0 ml-2",
                                                                            isActive ? cn("px-2 py-0.5 rounded-md", colors.badge) : "text-slate-400"
                                                                        )}>
                                                                            {tier.cost}
                                                                        </span>
                                                                    </div>
                                                                )
                                                            })}
                                                        </div>
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>
                                        </motion.div>



                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </Card>
                    </motion.div>
                </div>

            </div>
        </div>
    )
}
