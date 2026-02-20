"use client"

import React, { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Info, Check, ChevronsUpDown } from "lucide-react"
import { FadeIn, Counter, CalculatorInput, ResultFeedbackCard, CalculatorCardHeader } from "@/app/tools/_shared/components"
import { cn } from "@/lib/utils"

import { ChevronDown, ChevronUp } from "lucide-react"

// --- Market Configurations ---
// Define fee structures and unit preferences for each region

type MarketConfig = {
    units: { weight: string, dim: string },
    shippingZone?: boolean, // Some markets have zones (e.g. India)
    currencyParams: { storagePerCubic: number, storageUnit: string } // NEW: Storage params
    getFbaFee: (l: number, w: number, h: number, wt: number, price?: number) => number
    getReferralFee: (price: number, category?: string) => number // UPDATED: Category aware
    getClosingFee?: (price: number) => number // India specific
}

// --- Categories & Referral Fees ---
const categories: Record<string, number> = {
    "General (Default)": 0.15,
    "Apparel & Accessories": 0.17,
    "Baby Products": 0.08, // often 8% or 15% depending on price, simplifying
    "Books": 0.15,
    "Consumer Electronics": 0.08,
    "Home & Garden": 0.15,
    "Automotive": 0.12,
    "Beauty": 0.08, // often 8% for <$10, 15% otherwise
    "Toys & Games": 0.15,
    "Sports": 0.15,
}

const markets: Record<string, MarketConfig> = {
    // === UNITED STATES (Imperial) ===
    USD: {
        units: { weight: "lbs", dim: "in" },
        currencyParams: { storagePerCubic: 0.89, storageUnit: "ft³" }, // 2026 Adjusted Avg
        getFbaFee: (l, w, h, wt, price) => {
            // Estimated 2026 US Rates (Base + Inflation Adjustment)
            if (l === 0 || w === 0 || h === 0 || wt === 0) return 0;

            let baseFee = 0;
            // Small Standard
            if (l <= 15 && w <= 12 && h <= 0.75 && wt <= 1) baseFee = 3.30; // +0.08 approx
            // Large Standard
            else if (l <= 18 && w <= 14 && h <= 8 && wt <= 20) {
                if (wt <= 0.25) baseFee = 3.86;
                else if (wt <= 0.5) baseFee = 3.96;
                else if (wt <= 0.75) baseFee = 4.15;
                else if (wt <= 1) baseFee = 4.75;
                else if (wt <= 1.5) baseFee = 5.57;
                else if (wt <= 2) baseFee = 5.86;
                else if (wt <= 3) baseFee = 6.61;
                else baseFee = 6.61 + ((Math.ceil(wt) - 3) * 0.38);
            }
            // Oversize
            else baseFee = 9.98 + ((Math.ceil(wt) - 1) * 0.44);

            // 2026 Low-Inventory / Inflation Surcharge Logic (Simplified)
            // If price > 50, add ~$0.31, < 10 add ~$0.12 (Averaged to +0.10 for simplicity in this tool)
            if (price) {
                if (price < 10) baseFee += 0.12;
                else if (price > 50) baseFee += 0.31;
                else baseFee += 0.08;
            }
            return parseFloat(baseFee.toFixed(2));
        },

        getReferralFee: (price, category) => {
            if (!price) return 0;
            const rate = category && categories[category] ? categories[category] : 0.15;
            return Math.max(0.30, price * rate);
        },
    },

    // === INDIA (Metric) ===
    INR: {
        units: { weight: "kg", dim: "cm" },
        currencyParams: { storagePerCubic: 45, storageUnit: "ft³" }, // ~45 INR per cubic foot
        getFbaFee: (l, w, h, wt, price) => {
            // India FBA (Easy Ship / FBA National)
            // Weight handling fees are based on slabs.
            // First 500g: ~₹44 (National)
            // Addl 500g: ~₹24
            // Fixed Closing Fee based on price range
            if (wt === 0) return 0;

            const weightInGrams = wt * 1000;
            // Volumetric weight (LxWxH / 5000)
            const volWeight = (l * w * h) / 5000 * 1000;
            const chargeableWeight = Math.max(weightInGrams, volWeight);

            // Basic slab calculation (National standard estimate)
            let fee = 0;
            if (chargeableWeight <= 500) {
                fee = 44; // First 500g
            } else if (chargeableWeight <= 1000) {
                fee = 44 + 24; // First 500 + Next 500
            } else if (chargeableWeight <= 5000) {
                // > 1kg
                const extra500s = Math.ceil((chargeableWeight - 1000) / 500);
                fee = 68 + (extra500s * 24);
            } else {
                // Heavy
                const extraKg = Math.ceil((chargeableWeight - 5000) / 1000);
                fee = 68 + (8 * 24) + (extraKg * 12); // rough estimate
            }
            return fee;
        },
        getClosingFee: (price) => {
            if (price <= 250) return 4; // roughly
            if (price <= 500) return 9;
            if (price <= 1000) return 30;
            return 61; // > 1000
        },

        getReferralFee: (price, category) => {
            if (!price) return 0;
            // In India, electronics can be very low, apparel can be high.
            // We'll use the passed category % if available, else 12% default
            const rate = category && categories[category] ? categories[category] : 0.12;
            return Math.max(3, price * rate);
        }
    },

    // === UK (Metric) ===
    GBP: {
        units: { weight: "kg", dim: "cm" },
        currencyParams: { storagePerCubic: 0.88, storageUnit: "ft³" }, // ~£0.88
        getFbaFee: (l, w, h, wt) => {
            // 2024 UK Rates (rough estimates)
            const weightG = wt * 1000;
            if (l <= 35 && w <= 25 && h <= 12 && weightG <= 1000) {
                // Small/Standard envelope/parcel
                if (weightG <= 100) return 1.63; // Small envelope
                if (weightG <= 500) return 2.27; // Standard envelope
                if (weightG <= 1000) return 2.76;
            }
            if (l <= 45 && w <= 34 && h <= 26 && weightG <= 11900) {
                // Standard Parcel
                if (weightG <= 500) return 2.91;
                if (weightG <= 1000) return 3.49;
                if (weightG <= 2000) return 4.05;
                return 5.50; // estimate for heavier
            }
            return 7.00 + (Math.ceil(wt) * 0.40); // Oversize estimate
        },

        getReferralFee: (price, category) => price > 0 ? Math.max(0.25, price * (category ? categories[category] : 0.153)) : 0
    },

    // === EUROPE (Metric - Generic EUR) ===
    EUR: {
        units: { weight: "kg", dim: "cm" },
        currencyParams: { storagePerCubic: 26, storageUnit: "m³" }, // ~26 EUR per cubic METER
        getFbaFee: (l, w, h, wt) => {
            // Generic Pan-EU estimate (DE rates often baseline)
            const weightG = wt * 1000;
            if (weightG <= 100) return 1.95;
            if (weightG <= 500) return 3.48;
            if (weightG <= 1000) return 4.63;
            if (weightG <= 1500) return 5.46;
            if (weightG <= 2000) return 5.99;
            return 7.00 + (Math.ceil(wt - 2) * 0.5);
        },

        getReferralFee: (price, category) => {
            if (price <= 0) return 0;
            // 2026 EU Rate Updates for Low Price Items
            if (price <= 20 && (category === "Home & Garden" || category === "Beauty" || category === "Grocery")) {
                return price * 0.08; // Reduced to 8% (some 5%, simplifying)
            }
            return Math.max(0.30, price * (category ? categories[category] : 0.15));
        }
    },

    // === CANADA (Metric) ===
    CAD: {
        units: { weight: "kg", dim: "cm" },
        currencyParams: { storagePerCubic: 35, storageUnit: "m³" }, // Approx
        getFbaFee: (l, w, h, wt) => {
            const weightG = wt * 1000;
            // CA Rates 2024
            if (weightG <= 100) return 4.59;
            if (weightG <= 500) return 5.51;
            if (weightG <= 1000) return 6.95; // large standard
            if (weightG <= 2000) return 8.78;
            if (weightG <= 3000) return 10.37;
            return 11.00 + (Math.ceil(wt - 3) * 0.40);
        },

        getReferralFee: (price, category) => price > 0 ? Math.max(1.00, price * (category ? categories[category] : 0.15)) : 0
    }
}

// Fallback for others
const defaultMarket = markets.USD;

export function FBACalculator() {
    // State for inputs
    const [currency, setCurrency] = useState("USD")
    const [salesPrice, setSalesPrice] = useState<number | "">("")
    // Ensure inputs are reset or logically handled when units change?
    // For now, we keep values but let user know units changed via label.
    const [weight, setWeight] = useState<number | "">("")
    const [length, setLength] = useState<number | "">("")
    const [width, setWidth] = useState<number | "">("")
    const [height, setHeight] = useState<number | "">("")

    // Advanced State
    const [showAdvanced, setShowAdvanced] = useState(false)
    const [category, setCategory] = useState("General (Default)")
    const [storageMonths, setStorageMonths] = useState<number | "">("")

    const market = markets[currency] || defaultMarket;
    const units = market.units;

    // Helper to safely get number for calculation
    const val = (v: number | "") => (v === "" ? 0 : v)

    // Currency symbols map
    const currencySymbols: Record<string, string> = {
        USD: '$', EUR: '€', GBP: '£', INR: '₹', AUD: 'A$', CAD: 'C$', JPY: '¥', CNY: '¥',
        AED: 'AED', SGD: 'S$', HKD: 'HK$', CHF: 'Fr', MXN: 'MX$', BRL: 'R$', KRW: '₩',
        RUB: '₽', ZAR: 'R', SEK: 'kr', NOK: 'kr', DKK: 'kr', PLN: 'zł', THB: '฿',
        IDR: 'Rp', MYR: 'RM', PHP: '₱', VND: '₫', TRY: '₺', SAR: '﷼', NZD: 'NZ$',
        EGP: 'E£', PKR: '₨', BDT: '৳', NGN: '₦', KES: 'KSh'
    }
    const getSymbol = () => currencySymbols[currency] || "$"



    const handleReset = () => {
        setSalesPrice("")
        setWeight("")
        setLength("")
        setWidth("")
        setHeight("")
        setCategory("General (Default)")
        setStorageMonths("")
    }

    const salesPriceVal = val(salesPrice)
    const weightVal = val(weight)
    const lengthVal = val(length)
    const widthVal = val(width)
    const heightVal = val(height)

    // Calculate Fees
    // Calculate Fees
    const fbaFee = market.getFbaFee(lengthVal, widthVal, heightVal, weightVal, salesPriceVal)
    const referralFee = market.getReferralFee(salesPriceVal, category)
    const closingFee = market.getClosingFee ? market.getClosingFee(salesPriceVal) : 0;

    // Storage Fee Calculation
    const getStorageFee = () => {
        if (lengthVal === 0 || widthVal === 0 || heightVal === 0) return 0;
        const months = val(storageMonths) || 0;
        if (months === 0) return 0;

        // Calculate Volume
        let volume = lengthVal * widthVal * heightVal; // base unit volume (e.g. in³ or cm³)
        let volumeInFeeUnits = 0;

        if (market.units.dim === "in" && market.currencyParams.storageUnit === "ft³") {
            // in³ to ft³ => / 1728
            volumeInFeeUnits = volume / 1728;
        } else if (market.units.dim === "cm" && market.currencyParams.storageUnit === "ft³") {
            // cm³ to ft³ => / 28316.8
            volumeInFeeUnits = volume / 28316.8;
        } else if (market.units.dim === "cm" && market.currencyParams.storageUnit === "m³") {
            // cm³ to m³ => / 1,000,000
            volumeInFeeUnits = volume / 1000000;
        } else {
            // Fallback approximation
            return 0;
        }

        return volumeInFeeUnits * market.currencyParams.storagePerCubic * months;
    }

    const storageFee = getStorageFee();
    const totalFees = fbaFee + referralFee + closingFee + storageFee;

    // Size Tier Display (Rough Logic)
    const getSizeTier = () => {
        if (lengthVal === 0 || widthVal === 0 || heightVal === 0 || weightVal === 0) return "Unknown"
        // Rough universal logic for display text
        if (market.units.dim === "in") {
            if (lengthVal <= 15 && widthVal <= 12 && heightVal <= 0.75 && weightVal <= 1) return "Small Standard"
            if (lengthVal <= 18 && widthVal <= 14 && heightVal <= 8 && weightVal <= 20) return "Large Standard"
        } else {
            // Metric approximation
            // 38 x 30 x 2 cm ~ Small ? 
            // 45 x 34 x 26 cm ~ Standard
            if (lengthVal <= 45 && widthVal <= 34 && heightVal <= 26 && weightVal <= 12) return "Standard Parcel"
        }
        return "Oversize / Heavy"
    }

    // Currency formatter
    const formatCurrency = (val: number) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: currency,
            maximumFractionDigits: 2
        }).format(val)
    }

    const symbol = getSymbol()

    return (
        <FadeIn className="w-full max-w-6xl mx-auto py-8 px-4" duration={0.6}>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

                {/* Left Column: Inputs (Col Span 7) */}
                <div className="lg:col-span-7">
                    <FadeIn delay={0.2} direction="right" className="h-full">
                        <Card className="border border-slate-200 shadow-sm bg-white">
                            <CalculatorCardHeader
                                description="Estimate FBA and referral fees."
                                onReset={handleReset}
                                currency={currency}
                                onCurrencyChange={setCurrency}
                            />
                            <CardContent className="space-y-4 pt-6">
                                <div className="space-y-4">
                                    <CalculatorInput
                                        label={`Selling Price (${symbol})`}
                                        value={salesPrice}
                                        onChange={setSalesPrice}
                                        placeholder="29.99"
                                        max={100000}
                                        tooltip="The price you list your product for on Amazon."
                                    />

                                    <div className="grid grid-cols-1 gap-4">
                                        <CalculatorInput
                                            label={`Packaged Weight (${units.weight})`}
                                            value={weight}
                                            onChange={setWeight}
                                            placeholder={units.weight === "lbs" ? "1.5" : "0.5"}
                                            max={150}
                                            tooltip={`Total weight including packaging in ${units.weight}.`}
                                        />

                                        <div className="bg-slate-50/50 p-4 rounded-xl border border-slate-100 space-y-3">
                                            <div className="space-y-1">
                                                <label className="text-base font-semibold text-slate-700 flex items-center justify-between">
                                                    <span>Dimensions ({units.dim})</span>
                                                    <span className="text-[11px] font-medium text-slate-400/80 bg-slate-50 px-2 py-0.5 rounded">L x W x H</span>
                                                </label>
                                                <div className="grid grid-cols-3 gap-3">
                                                    <div className="relative group">
                                                        <Input
                                                            type="number"
                                                            value={length}
                                                            onChange={(e) => {
                                                                const val = e.target.value;
                                                                if (val === "") setLength("");
                                                                else {
                                                                    const num = parseFloat(val);
                                                                    if (!isNaN(num)) setLength(num);
                                                                }
                                                            }}
                                                            placeholder="Length"
                                                            max={1000}
                                                            className="h-10 text-base border-slate-300 bg-white shadow-sm placeholder:text-slate-400 placeholder:italic w-full text-center hover:border-blue-600 focus:border-blue-600 focus:ring-4 focus:ring-blue-600/10 transition-all"
                                                        />
                                                        <div className="absolute -bottom-5 inset-x-0 text-center text-[10px] text-slate-400 font-medium opacity-0 group-hover:opacity-100 transition-opacity">Length</div>
                                                    </div>
                                                    <div className="relative group">
                                                        <Input
                                                            type="number"
                                                            value={width}
                                                            onChange={(e) => {
                                                                const val = e.target.value;
                                                                if (val === "") setWidth("");
                                                                else {
                                                                    const num = parseFloat(val);
                                                                    if (!isNaN(num)) setWidth(num);
                                                                }
                                                            }}
                                                            placeholder="Width"
                                                            max={1000}
                                                            className="h-10 text-base border-slate-300 bg-white shadow-sm placeholder:text-slate-400 placeholder:italic w-full text-center hover:border-blue-600 focus:border-blue-600 focus:ring-4 focus:ring-blue-600/10 transition-all"
                                                        />
                                                        <div className="absolute -bottom-5 inset-x-0 text-center text-[10px] text-slate-400 font-medium opacity-0 group-hover:opacity-100 transition-opacity">Width</div>
                                                    </div>
                                                    <div className="relative group">
                                                        <Input
                                                            type="number"
                                                            value={height}
                                                            onChange={(e) => {
                                                                const val = e.target.value;
                                                                if (val === "") setHeight("");
                                                                else {
                                                                    const num = parseFloat(val);
                                                                    if (!isNaN(num)) setHeight(num);
                                                                }
                                                            }}
                                                            placeholder="Height"
                                                            max={1000}
                                                            className="h-10 text-base border-slate-300 bg-white shadow-sm placeholder:text-slate-400 placeholder:italic w-full text-center hover:border-blue-600 focus:border-blue-600 focus:ring-4 focus:ring-blue-600/10 transition-all"
                                                        />
                                                        <div className="absolute -bottom-5 inset-x-0 text-center text-[10px] text-slate-400 font-medium opacity-0 group-hover:opacity-100 transition-opacity">Height</div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>



                                {/* Advanced Toggle */}
                                <div className="pt-6 mt-4 border-t border-slate-100">
                                    <div
                                        onClick={() => setShowAdvanced(!showAdvanced)}
                                        className={cn(
                                            "flex items-center justify-between p-4 rounded-xl border cursor-pointer transition-all duration-200 group select-none",
                                            showAdvanced
                                                ? "bg-blue-50/50 border-blue-200 shadow-sm"
                                                : "bg-slate-50 border-slate-200 hover:border-blue-300 hover:bg-slate-100"
                                        )}
                                    >
                                        <div className="flex items-center gap-3">
                                            <div className={cn(
                                                "w-8 h-8 rounded-full flex items-center justify-center transition-colors",
                                                showAdvanced ? "bg-blue-100 text-blue-600" : "bg-white text-slate-400 group-hover:text-blue-500"
                                            )}>
                                                <ChevronsUpDown className="w-4 h-4" />
                                            </div>
                                            <div className="flex flex-col">
                                                <span className={cn("text-sm font-semibold transition-colors", showAdvanced ? "text-blue-700" : "text-slate-700")}>
                                                    Advanced Settings
                                                </span>
                                                <span className="text-[11px] text-slate-400 font-medium">
                                                    Category & Storage details
                                                </span>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <span className={cn(
                                                "text-[10px] px-2 py-0.5 rounded-full font-bold tracking-wide uppercase transition-colors",
                                                showAdvanced ? "bg-blue-100 text-blue-700" : "bg-slate-200 text-slate-500"
                                            )}>
                                                Optional
                                            </span>
                                            {showAdvanced ? <ChevronUp className="w-4 h-4 text-blue-500" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
                                        </div>
                                    </div>

                                    {showAdvanced && (
                                        <FadeIn className="mt-4 p-5 bg-slate-50/50 rounded-xl border border-slate-200/60 space-y-6">
                                            {/* Category Selector */}
                                            <div className="space-y-3">
                                                <div className="flex items-center justify-between">
                                                    <div className="flex items-center gap-2">
                                                        <label className="text-sm font-semibold text-slate-700">Product Category</label>
                                                        <TooltipProvider delayDuration={100}>
                                                            <Tooltip>
                                                                <TooltipTrigger asChild>
                                                                    <button
                                                                        type="button"
                                                                        tabIndex={-1}
                                                                        className="text-slate-400 hover:text-blue-600 transition-colors cursor-default"
                                                                    >
                                                                        <Info className="h-3.5 w-3.5" />
                                                                    </button>
                                                                </TooltipTrigger>
                                                                <TooltipContent side="top" className="max-w-xs text-xs bg-slate-900 text-white border-slate-800">
                                                                    Referral fee percentage varies by product category.
                                                                </TooltipContent>
                                                            </Tooltip>
                                                        </TooltipProvider>
                                                    </div>
                                                    <span className="text-xs font-medium text-slate-500 bg-white px-2 py-1 rounded-md border border-slate-200 shadow-sm">
                                                        Fee: <span className="text-blue-600 font-bold">{Math.round(categories[category] * 100)}%</span>
                                                    </span>
                                                </div>

                                                <Popover>
                                                    <PopoverTrigger asChild>
                                                        <Button
                                                            variant="outline"
                                                            role="combobox"
                                                            className="w-full justify-between h-11 bg-white border-slate-200 text-slate-700 hover:border-blue-400 hover:text-slate-900 shadow-sm transition-all"
                                                        >
                                                            <span className="truncate">{category}</span>
                                                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                                        </Button>
                                                    </PopoverTrigger>
                                                    <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-0" align="start">
                                                        <Command>
                                                            <CommandInput placeholder="Search category..." className="text-sm" />
                                                            <CommandList>
                                                                <CommandEmpty>No category found.</CommandEmpty>
                                                                <CommandGroup>
                                                                    {Object.keys(categories).map(cat => (
                                                                        <CommandItem
                                                                            key={cat}
                                                                            value={cat}
                                                                            onSelect={(val) => {
                                                                                const match = Object.keys(categories).find(k => k.toLowerCase() === val.toLowerCase());
                                                                                if (match) setCategory(match);
                                                                            }}
                                                                            className="flex items-center justify-between py-2.5 px-3 cursor-pointer"
                                                                        >
                                                                            <span className="text-sm truncate mr-2">{cat}</span>
                                                                            <div className="flex items-center gap-2 shrink-0">
                                                                                <span className={cn("text-xs font-medium px-1.5 py-0.5 rounded", category === cat ? "bg-blue-50 text-blue-600" : "text-slate-400")}>
                                                                                    {Math.round(categories[cat] * 100)}%
                                                                                </span>
                                                                                {category === cat && <Check className="h-3.5 w-3.5 text-blue-600" />}
                                                                            </div>
                                                                        </CommandItem>
                                                                    ))}
                                                                </CommandGroup>
                                                            </CommandList>
                                                        </Command>
                                                    </PopoverContent>
                                                </Popover>
                                            </div>

                                            {/* Storage Input */}
                                            <div className="pt-2 border-t border-slate-200/50">
                                                <div className="grid grid-cols-1 gap-4">
                                                    <div>
                                                        <CalculatorInput
                                                            label="Avg. Storage Duration"
                                                            value={storageMonths}
                                                            onChange={setStorageMonths}
                                                            placeholder="0"
                                                            max={12}
                                                            tooltip="Average months inventory stays in Fulfillment by Amazon (FBA) warehouses."
                                                        />
                                                        <div className="flex justify-end mt-1.5">
                                                            <span className="text-[10px] font-medium text-slate-400 bg-slate-100 px-2 py-0.5 rounded">
                                                                Est. Cost: {market.currencyParams.storagePerCubic} {symbol}/{market.currencyParams.storageUnit} / mo
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </FadeIn>
                                    )}
                                </div>
                            </CardContent>
                        </Card>
                    </FadeIn>
                </div>

                {/* Right Column: Results (Col Span 5) - Sticky & Dark Theme */}
                <div className="lg:col-span-5 space-y-4 lg:sticky lg:top-8">
                    <FadeIn delay={0.4} direction="left" className="space-y-4">

                        <ResultFeedbackCard
                            title="Total Amazon Fees"
                            titleLabel="Estimated (2026 Rates)"
                            mainValue={
                                <Counter value={totalFees} formatter={formatCurrency} key={currency} />
                            }
                            // valueColor removed to use default white text on dark background
                            secondaryMetrics={[]}
                        />

                        {/* Fee Breakdown Card */}
                        {salesPriceVal > 0 ? (
                            <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden border-l-4 border-l-blue-500">
                                <div className="px-5 py-3.5 border-b border-slate-100 flex justify-between items-center">
                                    <p className="text-xs font-bold text-slate-600 uppercase tracking-wider">Fee Breakdown</p>
                                    <span className="text-[10px] font-semibold bg-slate-100 text-slate-500 px-2 py-0.5 rounded-full uppercase tracking-wide">{getSizeTier()}</span>
                                </div>
                                <div className="divide-y divide-slate-100">
                                    <div className="flex justify-between items-center px-5 py-3.5">
                                        <span className="text-sm text-slate-600">Referral Fee ({(categories?.[category] || (currency === 'INR' ? 0.12 : 0.15)) * 100}%)</span>
                                        <span className="text-sm font-semibold text-slate-800">{formatCurrency(referralFee)}</span>
                                    </div>
                                    <div className="flex justify-between items-center px-5 py-3.5">
                                        <span className="text-sm text-slate-600">Fulfillment Fee (FBA)</span>
                                        <span className="text-sm font-semibold text-slate-800">{formatCurrency(fbaFee)}</span>
                                    </div>
                                    {closingFee > 0 && (
                                        <div className="flex justify-between items-center px-5 py-3.5">
                                            <span className="text-sm text-slate-600">Closing Fee</span>
                                            <span className="text-sm font-semibold text-slate-800">{formatCurrency(closingFee)}</span>
                                        </div>
                                    )}
                                    {storageFee > 0 && (
                                        <div className="flex justify-between items-center px-5 py-3.5">
                                            <span className="text-sm text-slate-600">Est. Storage Fee</span>
                                            <span className="text-sm font-semibold text-slate-800">{formatCurrency(storageFee)}</span>
                                        </div>
                                    )}
                                    <div className="flex justify-between items-center px-5 py-4 bg-slate-50">
                                        <span className="text-sm font-bold text-slate-900">Total Fees</span>
                                        <span className="text-base font-bold text-slate-900">{formatCurrency(totalFees)}</span>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 text-center">
                                <p className="text-sm text-slate-400">Enter product details to calculate fees.</p>
                            </div>
                        )}


                    </FadeIn>
                </div >
            </div >


        </FadeIn >
    )
}


