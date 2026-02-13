"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Copy, RefreshCw, Calculator, HelpCircle, ClipboardList, TrendingUp, AlertTriangle, CircleDollarSign, Info, BookOpen } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { FadeIn, ToolFAQ, ToolSectionHeader } from "../../../_shared/components"
import { CTA } from "@/components/sections/CTA"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Counter } from "../../../_shared/components"

type Unit = "in" | "cm"

interface Dimensions {
    length: string
    width: string
    height: string
}

export function DimensionConverterContent() {
    const { toast } = useToast()
    const [dimensions, setDimensions] = useState<Dimensions>({ length: "", width: "", height: "" })
    const [unit, setUnit] = useState<Unit>("in")
    const [volume, setVolume] = useState<{ in3: number; cm3: number } | null>(null)
    const [converted, setConverted] = useState<{ in: Dimensions; cm: Dimensions } | null>(null)

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
        toast({
            title: "Result Copied",
            description: "Calculations copied to your clipboard.",
        })
    }

    const clearAll = () => {
        setDimensions({ length: "", width: "", height: "" })
        setUnit("in")
        toast({
            title: "Reset",
            description: "All inputs cleared.",
        })
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
                        <CardHeader className="pb-4 border-b border-slate-50 flex flex-col items-start space-y-6">
                            <div className="space-y-1">
                                <div className="flex items-center gap-3">
                                    <CardTitle className="text-2xl font-bold text-blue-600">
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
                                <CardDescription className="text-slate-500 font-medium">Configure dimensions in {unit === "in" ? "Inches" : "Centimeters"}</CardDescription>
                            </div>
                            <div className="flex bg-slate-100 p-1 rounded-lg border border-slate-200 w-fit">
                                {(["in", "cm"] as Unit[]).map((u) => (
                                    <button
                                        key={u}
                                        onClick={() => setUnit(u)}
                                        className={`px-3 py-1.5 rounded-md text-xs font-bold transition-all ${unit === u
                                            ? "bg-white text-blue-600 shadow-sm"
                                            : "text-slate-500 hover:text-slate-900"}`}
                                    >
                                        {u.toUpperCase()}
                                    </button>
                                ))}
                            </div>
                        </CardHeader>
                        <CardContent className="space-y-6 pt-6 flex-1 flex flex-col">
                            <div className="space-y-6">
                                {(["length", "width", "height"] as const).map((dim) => (
                                    <div key={dim} className="flex items-center justify-between gap-2">
                                        <div className="flex items-center gap-2">
                                            <Label htmlFor={dim} className="text-base font-semibold text-slate-700 capitalize">
                                                {dim} ({unit.toUpperCase()})
                                            </Label>
                                        </div>
                                        <div className="relative group">
                                            <Input
                                                id={dim}
                                                name={dim}
                                                type="text"
                                                placeholder={unit === "in" ? (dim === "length" ? "Ex: 12.00" : dim === "width" ? "Ex: 8.00" : "Ex: 6.00") : (dim === "length" ? "Ex: 30.00" : dim === "width" ? "Ex: 20.00" : "Ex: 15.00")}
                                                value={dimensions[dim]}
                                                onChange={handleInputChange}
                                                className="h-10 text-base border-slate-300 bg-white shadow-sm placeholder:text-slate-400 placeholder:italic w-36 md:w-44 text-right hover:border-blue-600 focus:border-blue-600 focus:ring-4 focus:ring-blue-600/10 transition-all font-bold"
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="flex gap-2 mt-auto">
                                <Button
                                    variant="outline"
                                    className="flex-[2] h-11 border-dashed hover:bg-muted/50 text-slate-500 hover:text-slate-900 transition-all font-medium"
                                    onClick={clearAll}
                                >
                                    <RefreshCw className="w-4 h-4 mr-2" /> Reset Input
                                </Button>
                                <Button
                                    onClick={copyToClipboard}
                                    variant="outline"
                                    disabled={!converted}
                                    className="flex-1 h-11 px-6 shadow-sm border-slate-300 hover:bg-slate-50 transition-all font-bold text-slate-950 disabled:opacity-30"
                                >
                                    <Copy className="w-4 h-4 mr-2" /> Copy Results
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* RIGHT COLUMN: Results (Col Span 5) */}
                <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-8">
                    <FadeIn delay={0.4} direction="left" className="space-y-6">
                        {/* Main Volume Card (Dark Theme) */}
                        <Card className="border-0 shadow-2xl overflow-hidden relative bg-[#0f172a] text-white">
                            <div className="absolute top-0 right-0 w-64 h-64 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none bg-blue-600/10" />

                            <CardHeader className="pb-2 relative z-10">
                                <div className="flex items-center justify-between">
                                    <CardTitle className="text-sm font-medium uppercase tracking-wider text-blue-200">Total Volume</CardTitle>
                                    <div className="flex items-center gap-2 bg-slate-800/50 border border-slate-700/50 px-3 py-1 rounded-full text-xs font-medium text-emerald-400">
                                        <div className="relative flex h-2 w-2">
                                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                                        </div>
                                        Live
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent className="relative z-10">
                                <div className="flex items-baseline gap-3 mb-6">
                                    <span className="text-4xl font-bold tracking-tight text-white">
                                        <Counter value={unit === "in" ? (volume?.in3 || 0) : (volume?.cm3 || 0)} formatter={(v) => v.toLocaleString(undefined, { maximumFractionDigits: 2 })} key={unit} />
                                    </span>
                                    <span className="text-lg font-normal text-slate-500">{unit}³</span>
                                </div>

                                <div className="space-y-3 pt-4 border-t border-slate-700/50">
                                    <Row label="Cubic Inches" value={<Counter value={volume?.in3 || 0} formatter={(v) => v.toLocaleString(undefined, { maximumFractionDigits: 2 })} />} className="text-slate-400" />
                                    <Row label="Cubic Centimeters" value={<Counter value={volume?.cm3 || 0} formatter={(v) => v.toLocaleString(undefined, { maximumFractionDigits: 0 })} />} className="text-slate-400" />
                                </div>
                            </CardContent>
                        </Card>

                        {/* Conversion Results Table Card */}
                        <Card className="border border-slate-200 shadow-sm bg-white overflow-hidden">
                            <CardHeader className="pb-4 bg-slate-50/30 border-b border-slate-100">
                                <CardTitle className="text-lg font-bold text-slate-900 tracking-tight">Converted Dimensions</CardTitle>
                            </CardHeader>
                            <CardContent className="p-0">
                                <div className="overflow-x-auto">
                                    <table className="w-full text-left border-collapse">
                                        <thead className="bg-slate-50 border-b border-slate-100 text-xs font-medium text-slate-500 uppercase tracking-widest">
                                            <tr>
                                                <th className="px-4 py-3">Axis</th>
                                                <th className="px-4 py-3 text-right">Given ({unit.toUpperCase()})</th>
                                                <th className="px-4 py-3 text-right">Result ({unit === "in" ? "CM" : "IN"})</th>
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

            <div className="max-w-4xl mx-auto mt-20 space-y-24">
                {/* How to Use Section */}
                <FadeIn delay={0.1}>
                    <section id="how-to-use" className="relative">
                        <ToolSectionHeader icon={HelpCircle} title="How to Use This Converter" />

                        <div className="relative max-w-2xl mx-auto pl-4 sm:pl-8">
                            <div className="absolute left-[34px] sm:left-[54px] top-8 bottom-8 w-0.5 bg-blue-100 -z-10" />
                            <div className="space-y-6">
                                <div className="relative flex items-start gap-4 sm:gap-8 group bg-white p-5 sm:p-6 rounded-2xl border border-slate-200/60 shadow-sm hover:shadow-md transition-all duration-300">
                                    <div className="relative flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 bg-blue-100/80 border border-blue-200 rounded-xl flex items-center justify-center text-blue-700 z-10">
                                        <RefreshCw className="w-5 h-5 sm:w-6 sm:h-6" />
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2 mb-1">
                                            <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full uppercase tracking-wider">Step 01</span>
                                        </div>
                                        <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-1">Choose Your Base Units</h3>
                                        <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                                            Select between Inches or Centimeters using the unit toggle. Your calculations will automatically update across all units.
                                        </p>
                                    </div>
                                </div>

                                <div className="relative flex items-start gap-4 sm:gap-8 group bg-white p-5 sm:p-6 rounded-2xl border border-slate-200/60 shadow-sm hover:shadow-md transition-all duration-300">
                                    <div className="relative flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 bg-blue-100/80 border border-blue-200 rounded-xl flex items-center justify-center text-blue-700 z-10">
                                        <ClipboardList className="w-5 h-5 sm:w-6 sm:h-6" />
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2 mb-1">
                                            <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full uppercase tracking-wider">Step 02</span>
                                        </div>
                                        <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-1">Input Dimensions & Fine-Tune</h3>
                                        <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                                            Enter length, width, and height. Use the <b>integrated arrow controls</b> to increment or decrement values for precise product matching.
                                        </p>
                                    </div>
                                </div>

                                <div className="relative flex items-start gap-4 sm:gap-8 group bg-blue-50/40 p-5 sm:p-6 rounded-2xl border-2 border-blue-200 shadow-sm shadow-blue-100/20">
                                    <div className="relative flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-blue-600 to-blue-500 border border-blue-400 rounded-xl flex items-center justify-center text-white z-10 shadow-sm">
                                        <Calculator className="w-5 h-5 sm:w-6 sm:h-6" />
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2 mb-1">
                                            <span className="text-[10px] font-bold text-white bg-blue-600 px-2.5 py-1 rounded-full uppercase tracking-wider shadow-sm">The Goal</span>
                                        </div>
                                        <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-1">Analyze Volume & Conversion</h3>
                                        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                                            Review the <b>Total Volume</b> and the <b>Given vs Result</b> table. These live calculations provide precise cubic data and conversions for your products.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </FadeIn>
            </div>

            {/* Profitability Insights Section */}
            <div className="max-w-4xl mx-auto mt-32">
                <FadeIn delay={0.2}>
                    <section id="profitability-insights">
                        <div className="flex items-center gap-3 mb-10 pb-4 border-b border-slate-100">
                            <div className="p-2 bg-blue-50 rounded-xl text-blue-600">
                                <BookOpen className="h-6 w-6" />
                            </div>
                            <h2 className="text-2xl font-bold text-slate-900">The Hidden Truth About Converted Dimensions Profitability</h2>
                        </div>

                        <div className="space-y-6">
                            {[
                                {
                                    icon: TrendingUp,
                                    iconBg: "bg-rose-50",
                                    iconColor: "text-rose-500",
                                    statColor: "text-rose-600",
                                    title: "The DIM Weight Trap",
                                    stat: "139 Factor",
                                    statLabel: "Volumetric Weight Divisor",
                                    points: [
                                        "Converts cubic volume specifically for air freight and courier billing.",
                                        "Formula: (L × W × H) in inches / 139 is the standard US divisor.",
                                        "Large boxes are often billed at double their real weight due to volume.",
                                    ]
                                },
                                {
                                    icon: AlertTriangle,
                                    iconBg: "bg-amber-50",
                                    iconColor: "text-amber-500",
                                    statColor: "text-amber-600",
                                    title: "Oversized Surcharges",
                                    stat: "130 Inch",
                                    statLabel: "Girth Limit Threshold",
                                    points: [
                                        "Length + Girth (2W + 2H) exceeding 130 inches alerts carriers for extra fees.",
                                        "A single centimeter error can push a box into 'Oversized' pricing tiers.",
                                        "Stay under the threshold by optimizing your packaging dimensions.",
                                    ]
                                },
                                {
                                    icon: CircleDollarSign,
                                    iconBg: "bg-blue-50",
                                    iconColor: "text-blue-500",
                                    statColor: "text-blue-600",
                                    title: "Precise Warehousing",
                                    stat: "4X Peak",
                                    statLabel: "Holiday Storage Surcharges",
                                    points: [
                                        "Warehousing centers charge by precise cubic centimeters or inches.",
                                        "Accurate unit conversion prevents overpaying for shelf space.",
                                        "Small height savings directly correlate to reduced annual overhead.",
                                    ]
                                }
                            ].map((insight, index) => {
                                const Icon = insight.icon
                                return (
                                    <div
                                        key={index}
                                        className="bg-white rounded-2xl border border-slate-200/60 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden"
                                    >
                                        <div className="flex flex-col md:flex-row">
                                            <div className="flex-1 p-6 order-2 md:order-1">
                                                <div className="flex items-center gap-3 mb-4">
                                                    <div className={`w-9 h-9 rounded-xl ${insight.iconBg} ${insight.iconColor} flex items-center justify-center border border-slate-100/50`}>
                                                        <Icon className="w-5 h-5" />
                                                    </div>
                                                    <h3 className="text-base font-bold text-slate-900">{insight.title}</h3>
                                                </div>
                                                <ul className="space-y-2">
                                                    {insight.points.map((point, i) => (
                                                        <li key={i} className="flex items-start gap-2.5 text-sm text-slate-600 leading-tight">
                                                            <span className={`${insight.iconColor} mt-1.5 flex-shrink-0 opacity-60`}>
                                                                <svg width="5" height="5" viewBox="0 0 6 6" fill="currentColor"><circle cx="3" cy="3" r="3" /></svg>
                                                            </span>
                                                            <span>{point}</span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>

                                            <div className="flex md:flex-col items-center justify-center gap-1.5 p-6 md:w-48 bg-slate-50/50 border-b md:border-b-0 md:border-l border-slate-100 order-1 md:order-2">
                                                <div className={`text-2xl font-bold ${insight.statColor} tracking-tight`}>{insight.stat}</div>
                                                <div className="text-[10px] font-bold uppercase tracking-widest text-slate-400 bg-slate-100/50 px-2 py-0.5 rounded-full">
                                                    Takeaway
                                                </div>
                                                <div className="text-[11px] font-medium text-slate-500 text-center leading-tight mt-1 max-w-[120px]">
                                                    {insight.statLabel}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </section>
                </FadeIn>
            </div>

            {/* FAQ Section */}
            <div className="mt-24">
                <FadeIn delay={0.3}>
                    <ToolFAQ
                        faqs={[
                            {
                                question: "What units does this tool support?",
                                answer: "You can input dimensions in <b>Inches (in)</b> or <b>Centimeters (cm)</b>. The tool automatically converts all inputs to all units and calculates volume in cubic inches and cubic centimeters."
                            },
                            {
                                question: "How is Cubic Volume calculated?",
                                answer: "Volume is calculated by multiplying Length × Width × Height. The tool handles all unit conversions internally to ensure precision across Imperial and Metric systems."
                            },
                            {
                                question: "Can I copy the conversion results?",
                                answer: "Yes! Use the 'Copy All' button at the top right to copy all converted dimensions and volume calculations to your clipboard in a clean, formatted text."
                            }
                        ]}
                    />
                </FadeIn>
                {/* CTA Section */}
                <div className="mt-24">
                    <FadeIn delay={0.4}>
                        <CTA withSectionWrapper={false} />
                    </FadeIn>
                </div>
            </div>
        </div>
    )
}

function Row({ label, value, isNegative, className }: { label: string, value: React.ReactNode, isNegative?: boolean, className?: string }) {
    return (
        <div className={`flex justify-between items-center text-sm ${className}`}>
            <span>{label}</span>
            <span className="font-medium tracking-wide">
                {isNegative ? '-' : ''}{value}
            </span>
        </div>
    )
}
