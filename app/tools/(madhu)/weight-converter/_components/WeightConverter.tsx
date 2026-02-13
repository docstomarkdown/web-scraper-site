"use client"

import React, { useState, useEffect, useMemo } from "react"
import { Scale, RefreshCw, Info, AlertTriangle, Truck, DollarSign, Package } from "lucide-react"
import { cn } from "@/lib/utils"

type WeightUnit = "oz" | "lbs" | "g" | "kg"

interface ConversionResult {
    oz: number
    lbs: number
    g: number
    kg: number
}

export function WeightConverter() {
    const [inputValue, setInputValue] = useState<string>("1")
    const [inputUnit, setInputUnit] = useState<WeightUnit>("lbs")

    const conversions = useMemo((): ConversionResult => {
        const val = parseFloat(inputValue) || 0
        let baseInGrams = 0

        // Convert to base unit: grams
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

    const shippingImpact = useMemo(() => {
        const lbs = conversions.lbs
        const oz = conversions.oz

        if (lbs <= 0) return null

        if (oz <= 16) {
            return {
                level: "Lightweight",
                color: "text-green-600 bg-green-50 border-green-100",
                description: "Eligible for standard lightweight shipping (USPS Ground Advantage/First Class). This is the most cost-effective tier for e-commerce.",
                impact: "Minimal cost impact. Ideal for high-margin small goods.",
                icon: Package
            }
        } else if (lbs <= 5) {
            return {
                level: "Standard Parcel",
                color: "text-blue-600 bg-blue-50 border-blue-100",
                description: "Standard weight for Priority Mail or UPS Ground. Rates start to climb significantly after 1lb.",
                impact: "Moderate cost. Every pound added increases cost by $0.50 - $1.50 depending on zone.",
                icon: Truck
            }
        } else if (lbs <= 20) {
            return {
                level: "Heavy Parcel",
                color: "text-amber-600 bg-amber-50 border-amber-100",
                description: "Heavy weight tier. Significant shipping costs that can eat into margins if not priced correctly.",
                impact: "High cost. Consider flat-rate boxes or regional rate boxes to optimize.",
                icon: Scale
            }
        } else if (lbs <= 50) {
            return {
                level: "Oversized/Bulky",
                color: "text-orange-600 bg-orange-50 border-orange-100",
                description: "Near the limit for standard parcel shipping. DIM weight is likely to be a bigger factor than actual weight.",
                impact: "Very High cost. Surcharges for handling may apply from private carriers.",
                icon: AlertTriangle
            }
        } else {
            return {
                level: "Freight/LTL Candidate",
                color: "text-red-600 bg-red-50 border-red-100",
                description: "Over 50lbs. High risk of heavy package surcharges ($25+ additional).",
                impact: "Extreme cost. Professional freight or LTL shipping might be more economical.",
                icon: AlertTriangle
            }
        }
    }, [conversions.lbs, conversions.oz])

    return (
        <div className="p-8 sm:p-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                {/* Input Section */}
                <div className="space-y-8">
                    <div>
                        <label className="block text-sm font-bold text-slate-700 uppercase tracking-wider mb-4">
                            Enter Product Weight
                        </label>
                        <div className="flex gap-4">
                            <div className="relative flex-1 group">
                                <input
                                    type="number"
                                    value={inputValue}
                                    onChange={(e) => setInputValue(e.target.value)}
                                    className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl px-6 py-4 text-2xl font-bold text-slate-900 focus:outline-none focus:border-blue-500 transition-all placeholder:text-slate-300"
                                    placeholder="0.00"
                                />
                                <div className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 group-hover:text-blue-500 transition-colors">
                                    <Scale className="w-6 h-6" />
                                </div>
                            </div>
                            <select
                                value={inputUnit}
                                onChange={(e) => setInputUnit(e.target.value as WeightUnit)}
                                className="bg-white border-2 border-slate-100 rounded-2xl px-6 py-4 text-lg font-bold text-slate-700 focus:outline-none focus:border-blue-500 cursor-pointer shadow-sm hover:border-slate-200 transition-all"
                            >
                                <option value="lbs">LBS</option>
                                <option value="oz">OZ</option>
                                <option value="kg">KG</option>
                                <option value="g">G</option>
                            </select>
                        </div>
                    </div>

                    <div className="bg-slate-50/50 rounded-[2rem] border border-slate-100 p-8 space-y-6">
                        <h3 className="text-sm font-black text-slate-400 uppercase tracking-[0.2em] flex items-center gap-2">
                            <RefreshCw className="w-4 h-4" />
                            Conversion Results
                        </h3>

                        <div className="grid grid-cols-2 gap-4">
                            {[
                                { label: "Pounds", unit: "LBS", value: conversions.lbs, icon: "lb" },
                                { label: "Ounces", unit: "OZ", value: conversions.oz, icon: "oz" },
                                { label: "Kilograms", unit: "KG", value: conversions.kg, icon: "kg" },
                                { label: "Grams", unit: "G", value: conversions.g, icon: "g" },
                            ].map((item) => (
                                <div
                                    key={item.unit}
                                    className={cn(
                                        "p-6 rounded-2xl transition-all duration-300 border-2",
                                        inputUnit.toUpperCase() === item.unit
                                            ? "bg-blue-600 border-blue-500 text-white shadow-lg shadow-blue-200"
                                            : "bg-white border-slate-100 text-slate-900 hover:border-blue-100"
                                    )}
                                >
                                    <div className={cn(
                                        "text-[10px] font-black uppercase tracking-widest mb-1",
                                        inputUnit.toUpperCase() === item.unit ? "text-blue-100" : "text-slate-400"
                                    )}>
                                        {item.label}
                                    </div>
                                    <div className="text-xl font-black truncate">
                                        {item.value === 0 ? "0" :
                                            item.value > 1000 ? Math.round(item.value).toLocaleString() :
                                                item.value.toFixed(3).replace(/\.?0+$/, '')}
                                        <span className={cn(
                                            "ml-1 text-xs opacity-60 font-bold",
                                            inputUnit.toUpperCase() === item.unit ? "text-blue-50" : "text-slate-400"
                                        )}>
                                            {item.unit}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Impact Section */}
                <div className="relative">
                    <div className="sticky top-8 space-y-6">
                        <div className="flex items-center gap-3 mb-2">
                            <div className="p-2 bg-blue-100 rounded-xl text-blue-600">
                                <Truck className="w-5 h-5" />
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 tracking-tight">Shipping Cost Impact</h3>
                        </div>

                        {shippingImpact ? (
                            <div className={cn("rounded-3xl border p-8 space-y-6 transition-all duration-500", shippingImpact.color)}>
                                <div className="flex items-start justify-between">
                                    <div className="space-y-1">
                                        <span className="text-[10px] font-black uppercase tracking-[0.2em] opacity-70">Weight Category</span>
                                        <h4 className="text-2xl font-black tracking-tight">{shippingImpact.level}</h4>
                                    </div>
                                    <div className="p-3 bg-white/50 rounded-2xl shadow-inner">
                                        {(() => {
                                            const ImpactIcon = shippingImpact.icon
                                            return <ImpactIcon className="w-8 h-8" />
                                        })()}
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <div className="p-4 bg-white/40 rounded-2xl border border-white/20">
                                        <div className="flex items-center gap-2 mb-2 font-bold text-sm">
                                            <Info className="w-4 h-4" />
                                            Overview
                                        </div>
                                        <p className="text-sm font-medium leading-relaxed opacity-90">
                                            {shippingImpact.description}
                                        </p>
                                    </div>

                                    <div className="p-4 bg-white/40 rounded-2xl border border-white/20">
                                        <div className="flex items-center gap-2 mb-2 font-bold text-sm">
                                            <DollarSign className="w-4 h-4" />
                                            Profit Impact
                                        </div>
                                        <p className="text-sm font-medium leading-relaxed opacity-90">
                                            {shippingImpact.impact}
                                        </p>
                                    </div>
                                </div>

                                <div className="pt-2">
                                    <div className="flex items-center gap-3 text-xs font-bold opacity-70 italic">
                                        <AlertTriangle className="w-3 h-3" />
                                        <span>Estimated impact based on 2024-2025 carrier rates for US Domestic zones 1-8.</span>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="h-[400px] border-2 border-dashed border-slate-200 rounded-3xl flex flex-col items-center justify-center text-center p-8">
                                <Scale className="w-12 h-12 text-slate-200 mb-4" />
                                <h4 className="text-lg font-bold text-slate-400 mb-2">Ready to Analyze</h4>
                                <p className="text-sm text-slate-400 max-w-[200px]">
                                    Enter a weight to see shipping tier impacts and margin insights.
                                </p>
                            </div>
                        )}

                        {/* Additional Insight Card */}
                        <div className="bg-slate-900 rounded-3xl p-8 text-white overflow-hidden relative group">
                            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:rotate-12 transition-transform duration-500">
                                <Package className="w-24 h-24" />
                            </div>
                            <div className="relative z-10">
                                <h4 className="text-lg font-bold mb-4 flex items-center gap-2">
                                    <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
                                    Seller Intelligence
                                </h4>
                                <p className="text-slate-400 text-sm leading-relaxed mb-6">
                                    Did you know? Products under <b className="text-white">16oz</b> (packaged) often see <b className="text-white">35% higher net margins</b> due to the dramatic jump in shipping costs once you hit the 1lb Priority Mail threshold.
                                </p>
                                <div className="h-1 w-full bg-slate-800 rounded-full overflow-hidden">
                                    <div className="h-full bg-blue-500 w-2/3 rounded-full" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
