"use client"
import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Copy, RefreshCw, HelpCircle, Box, Check } from "lucide-react";
import { cn } from "@/lib/utils"
import { FadeIn } from "../../../_shared/components"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Counter, ResultFeedbackCard, CalculatorInput } from "../../../_shared/components"
type Unit = "in" | "cm"
interface Dimensions {
    length: string
    width: string
    height: string
}
export function DimensionConverterContent() {
    const [dimensions, setDimensions] = useState<Dimensions>({ length: "", width: "", height: "" })
    const [unit, setUnit] = useState<Unit>("in")
    const [volume, setVolume] = useState<{ in3: number; cm3: number } | null>(null)
    const [converted, setConverted] = useState<{ in: Dimensions; cm: Dimensions } | null>(null)
    const [isCopied, setIsCopied] = useState(false)
    // Constants
    const IN_TO_CM = 2.54
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        // Allow only numbers and one decimal point
        if (value === "" || /^\d*\.?\d*$/.test(value)) {
            setDimensions((prev: Dimensions) => ({ ...prev, [name]: value }))
        }
    }
    const parseValue = (val: string) => parseFloat(val) || 0
    useEffect(() => {
        const l = parseValue(dimensions.length)
        const w = parseValue(dimensions.width)
        const h = parseValue(dimensions.height)
        if (l === 0 && w === 0 && h === 0) {
            setVolume(null)
            setConverted(null)
            return
        }
        // Convert everything to a base unit (cm) for calculation
        let l_cm = 0, w_cm = 0, h_cm = 0
        if (unit === "in") {
            l_cm = l * IN_TO_CM
            w_cm = w * IN_TO_CM
            h_cm = h * IN_TO_CM
        } else {
            l_cm = l
            w_cm = w
            h_cm = h
        }
        // Volume Calculations
        const vol_cm3 = l_cm * w_cm * h_cm
        const vol_in3 = vol_cm3 / (IN_TO_CM ** 3)
        setVolume({
            in3: vol_in3,
            cm3: vol_cm3,
        })
        // Conversions
        const toIn = (val_cm: number) => val_cm / IN_TO_CM
        setConverted({
            in: {
                length: toIn(l_cm).toFixed(2),
                width: toIn(w_cm).toFixed(2),
                height: toIn(h_cm).toFixed(2)
            },
            cm: {
                length: l_cm.toFixed(2),
                width: w_cm.toFixed(2),
                height: h_cm.toFixed(2)
            }
        })
    }, [dimensions, unit])
    const copyToClipboard = () => {
        if (!converted) return
        const text = `
Dimensions:
${converted.in.length}" x ${converted.in.width}" x ${converted.in.height}"
${converted.cm.length}cm x ${converted.cm.width}cm x ${converted.cm.height}cm
Volume:
${volume?.in3.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} in³
${volume?.cm3.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} cm³
    `.trim()
        navigator.clipboard.writeText(text)
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000);
    }
    const clearAll = () => {
        setDimensions({ length: "", width: "", height: "" })
        setUnit("in")
    }
    const scrollToGuide = () => {
        const element = document.getElementById('how-to-use');
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };
    return (
        <div className="flex flex-col gap-10 max-w-4xl mx-auto">
            {/* Power Dashboard Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* LEFT COLUMN: Inputs */}
                <div className="lg:col-span-7">
                    <Card className="border border-slate-200 shadow-sm bg-white overflow-hidden h-full flex flex-col">
                        <CardHeader className="pb-6 border-b border-slate-50">
                            <div className="space-y-1">
                                <div className="flex items-center gap-3">
                                    <CardTitle className="text-xl font-bold text-blue-600">
                                        Calculator Inputs
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
                                                How to use this converter
                                            </TooltipContent>
                                        </Tooltip>
                                    </TooltipProvider>
                                </div>
                                <CardDescription className="text-slate-500 font-medium">Configure your dimensions and units below.</CardDescription>
                            </div>
                        </CardHeader>
                        <CardContent className="p-6 md:p-10 pb-12 md:pb-16 space-y-10">
                            {/* Measurement Unit Section */}
                            <div className="space-y-3">
                                <label className="text-sm font-semibold text-slate-600 flex items-center gap-2 mb-2">
                                    <RefreshCw className="w-4 h-4 text-slate-400" />
                                    Measurement Unit
                                </label>
                                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                    <label className="text-base font-semibold text-slate-700 whitespace-nowrap">
                                        Base Unit
                                    </label>
                                    <div className="flex bg-slate-100 p-1 rounded-lg border border-slate-200 w-full sm:w-[210px]">
                                        {(["in", "cm"] as Unit[]).map((u) => (
                                            <button
                                                key={u}
                                                onClick={() => setUnit(u)}
                                                className={cn(
                                                    "flex-1 py-1.5 rounded-md text-[10px] font-bold transition-all uppercase",
                                                    unit === u
                                                        ? "bg-white text-blue-600 shadow-sm border border-blue-200"
                                                        : "text-slate-500 hover:text-slate-900"
                                                )}
                                            >
                                                {u.toUpperCase()}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <Separator className="bg-slate-100" />
                            {/* Dimension Details Section */}
                            <div className="space-y-3">
                                <label className="text-sm font-semibold text-slate-600 flex items-center gap-2 mb-2">
                                    <Box className="w-4 h-4 text-slate-400" />
                                    Dimension Details
                                </label>
                                <div className="space-y-3">
                                    {(["length", "width", "height"] as const).map((dim) => (
                                        <CalculatorInput
                                            key={dim}
                                            label={`${dim.charAt(0).toUpperCase() + dim.slice(1)} (${unit.toLowerCase()})`}
                                            value={dimensions[dim]}
                                            onChange={(val) => setDimensions((prev) => ({ ...prev, [dim]: val.toString() }))}
                                            placeholder={unit === "in" ? (dim === "length" ? "12.00" : dim === "width" ? "8.00" : "6.00") : (dim === "length" ? "30.00" : dim === "width" ? "20.00" : "15.00")}
                                            type="number"
                                            min={0}
                                        />
                                    ))}
                                </div>
                            </div>
                            <div className="flex gap-4 pt-8 border-t border-slate-100">
                                <Button
                                    variant="outline"
                                    className="flex-[2] h-11 border-dashed hover:bg-muted/50 text-slate-500 hover:text-slate-900 transition-all font-medium"
                                    onClick={clearAll}
                                >
                                    <RefreshCw className="w-4 h-4 mr-2" /> Reset Input
                                </Button>
                                <Button
                                    variant="outline"
                                    onClick={copyToClipboard}
                                    className={cn(
                                        "flex-1 h-11 shadow-sm transition-all font-bold",
                                        isCopied
                                            ? "bg-green-50 text-green-700 border-green-200 hover:bg-green-50 hover:text-green-700"
                                            : "border-slate-300 hover:bg-slate-50 text-slate-900"
                                    )}
                                >
                                    {isCopied ? (
                                        <><Check className="w-4 h-4 mr-2" /> Copied!</>
                                    ) : (
                                        <><Copy className="w-4 h-4 mr-2" /> Copy Results</>
                                    )}
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>
                {/* RIGHT COLUMN: Results (Col Span 5) */}
                <div className="lg:col-span-5 space-y-3 lg:sticky lg:top-8">
                    <FadeIn delay={0.4} direction="left" className="space-y-3">
                        {/* Main Volume Card (Dark Theme) */}
                        <ResultFeedbackCard
                            title="Total Volume"
                            titleLabel="Live"
                            mainValue={
                                <>
                                    <Counter value={unit === "in" ? (volume?.in3 || 0) : (volume?.cm3 || 0)} formatter={(v) => v.toLocaleString(undefined, { maximumFractionDigits: 2 })} key={unit} />
                                    <span className="text-lg font-normal text-slate-400 ml-2">{unit}³</span>
                                </>
                            }
                        >
                            <div className="grid grid-cols-2 gap-4 mt-2">
                                <div className="bg-white/5 rounded-xl p-4 border border-white/5">
                                    <p className="text-xs font-bold text-slate-300 mb-1">Cubic Inches</p>
                                    <p className="text-xl font-bold text-blue-400">
                                        <Counter value={volume?.in3 || 0} formatter={(v) => v.toLocaleString(undefined, { maximumFractionDigits: 2 })} />
                                        <span className="text-xs font-normal ml-1 text-blue-400">IN³</span>
                                    </p>
                                </div>
                                <div className="bg-white/5 rounded-xl p-4 border border-white/5">
                                    <p className="text-xs font-bold text-slate-300 mb-1">Cubic Centimeters</p>
                                    <p className="text-xl font-bold text-blue-400">
                                        <Counter value={volume?.cm3 || 0} formatter={(v) => v.toLocaleString(undefined, { maximumFractionDigits: 0 })} />
                                        <span className="text-xs font-normal ml-1 text-blue-400">CM³</span>
                                    </p>
                                </div>
                            </div>
                        </ResultFeedbackCard>
                        {/* Conversion Results Table Card */}
                        <Card className="border border-slate-200 shadow-sm bg-white overflow-hidden">
                            <CardHeader className="pb-4 bg-slate-50/30 border-b border-slate-100">
                                <CardTitle className="text-lg font-bold text-slate-900 tracking-tight">Converted Dimensions</CardTitle>
                            </CardHeader>
                            <CardContent className="p-0">
                                <div className="overflow-x-auto">
                                    <table className="w-full text-left border-collapse">
                                        <thead className="bg-slate-50 border-b border-slate-100 text-xs font-semibold text-slate-500 tracking-wide">
                                            <tr>
                                                <th className="px-4 py-3">Axis</th>
                                                <th className="px-4 py-3 text-right">Given ({unit.toLowerCase()})</th>
                                                <th className="px-4 py-3 text-right">Result ({unit === "in" ? "cm" : "in"})</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-slate-100">
                                            {(["length", "width", "height"] as const).map((dim) => {
                                                const otherUnit = unit === "in" ? "cm" : "in"
                                                return (
                                                    <tr key={dim} className="hover:bg-slate-50/50 transition-all">
                                                        <td className="px-4 py-3 text-sm font-medium text-slate-800 capitalize">{dim}</td>
                                                        <td className="px-4 py-3 text-sm font-medium text-right text-slate-600">
                                                            {dimensions[dim] || "0.00"}
                                                        </td>
                                                        <td className="px-4 py-3 text-sm font-bold text-right text-blue-600 bg-blue-50/30">
                                                            {converted ? (otherUnit === "in" ? converted.in[dim] : converted.cm[dim]) : "0.00"}
                                                        </td>
                                                    </tr>
                                                )
                                            })}
                                        </tbody>
                                    </table>
                                </div>
                            </CardContent>
                        </Card>
                    </FadeIn>
                </div>
            </div>
        </div>
    )
}
