"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Copy, RefreshCw, Calculator, HelpCircle, ClipboardList, TrendingUp, AlertTriangle, CircleDollarSign, Info, BookOpen } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { FadeIn } from "../../_shared/components/FadeIn"
import { ToolFAQ } from "../../_shared/components/ToolFAQ"
import { ToolSectionHeader } from "../../_shared/components/ToolSectionHeader"
import { CTA } from "@/components/sections/CTA"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

type Unit = "in" | "cm" | "mm"

interface Dimensions {
    length: string
    width: string
    height: string
}

export default function DimensionConverter() {
    const { toast } = useToast()
    const [dimensions, setDimensions] = useState<Dimensions>({ length: "", width: "", height: "" })
    const [unit, setUnit] = useState<Unit>("in")
    const [volume, setVolume] = useState<{ in3: number; cm3: number; mm3: number } | null>(null)
    const [converted, setConverted] = useState<{ in: Dimensions; cm: Dimensions; mm: Dimensions } | null>(null)

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
        } else if (unit === "mm") {
            l_cm = l / 10
            w_cm = w / 10
            h_cm = h / 10
        } else {
            l_cm = l
            w_cm = w
            h_cm = h
        }

        // Volume Calculations
        const vol_cm3 = l_cm * w_cm * h_cm
        const vol_in3 = vol_cm3 / (IN_TO_CM ** 3)
        const vol_mm3 = vol_cm3 * 1000

        setVolume({
            in3: vol_in3,
            cm3: vol_cm3,
            mm3: vol_mm3,
        })

        // Conversions
        const toIn = (val_cm: number) => val_cm / IN_TO_CM
        const toMm = (val_cm: number) => val_cm * 10

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
            },
            mm: {
                length: toMm(l_cm).toFixed(2),
                width: toMm(w_cm).toFixed(2),
                height: toMm(h_cm).toFixed(2)
            }
        })

    }, [dimensions, unit])

    const copyToClipboard = () => {
        if (!converted) return
        const text = `
Dimensions:
${converted.in.length}" x ${converted.in.width}" x ${converted.in.height}"
${converted.cm.length}cm x ${converted.cm.width}cm x ${converted.cm.height}cm
${converted.mm.length}mm x ${converted.mm.width}mm x ${converted.mm.height}mm

Volume:
${volume?.in3.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} in³
${volume?.cm3.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} cm³
${volume?.mm3.toLocaleString(undefined, { maximumFractionDigits: 0 })} mm³
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

    return (
        <div className="container mx-auto max-w-6xl pt-20 pb-12 px-4 md:px-6">
            <FadeIn direction="none">
                <div className="flex flex-col gap-6">
                    {/* Header */}
                    <div className="relative flex flex-col md:flex-row items-center justify-center gap-6 border-b border-slate-100 pb-6 px-4">
                        <div className="flex items-center">
                            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-800">
                                Dimension Converter
                            </h1>
                        </div>
                        {converted && (
                            <div className="md:absolute md:right-4">
                                <Button onClick={copyToClipboard} variant="outline" size="lg" className="h-12 px-8 shadow-sm border-slate-200 hover:bg-slate-50 transition-all font-bold">
                                    <Copy className="w-4 h-4 mr-2" /> Copy Results
                                </Button>
                            </div>
                        )}
                    </div>

                    {/* Power Dashboard Layout */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">

                        {/* LEFT COLUMN: Inputs */}
                        <aside className="lg:col-span-4">
                            <Card className="shadow-xl border-slate-200/60 overflow-hidden h-full flex flex-col bg-white">
                                <CardHeader className="pb-4 bg-slate-50/30 border-b border-slate-100">
                                    <div className="flex flex-col gap-4">
                                        <div className="flex items-center justify-between">
                                            <ToolSectionHeader icon={Calculator} title="Inputs" />
                                        </div>
                                        <div className="grid grid-cols-3 gap-1 p-1 bg-muted rounded-lg border text-[10px] font-bold">
                                            {(["in", "cm", "mm"] as Unit[]).map((u) => (
                                                <button
                                                    key={u}
                                                    onClick={() => setUnit(u)}
                                                    className={`px-3 py-1.5 rounded-md transition-all ${unit === u
                                                        ? "bg-white text-primary shadow-sm"
                                                        : "text-muted-foreground hover:text-foreground"}`}
                                                >
                                                    {u.toUpperCase()}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                    <CardDescription className="mt-2">Configure dimensions in {unit === "in" ? "Inches" : unit === "cm" ? "Centimeters" : "Millimeters"}</CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-6">
                                    <div className="space-y-4">
                                        {(["length", "width", "height"] as const).map((dim) => (
                                            <div key={dim} className="flex flex-col gap-2">
                                                <div className="flex justify-between items-center text-[11px] font-bold uppercase tracking-wider text-slate-500">
                                                    <Label htmlFor={dim}>{dim} ({unit.toUpperCase()})</Label>
                                                    <span className="font-mono opacity-50">{dim.charAt(0).toUpperCase()}-Axis</span>
                                                </div>
                                                <Input
                                                    id={dim}
                                                    name={dim}
                                                    type="text"
                                                    placeholder="0.00"
                                                    value={dimensions[dim]}
                                                    onChange={handleInputChange}
                                                    className="h-12 text-lg font-mono focus-visible:ring-primary shadow-sm bg-white"
                                                />
                                            </div>
                                        ))}
                                    </div>

                                    <Button
                                        variant="outline"
                                        className="w-full h-11 border-dashed hover:bg-muted/50 text-muted-foreground hover:text-foreground transition-all mt-4"
                                        onClick={clearAll}
                                    >
                                        <RefreshCw className="w-4 h-4 mr-2" /> Reset Calculator
                                    </Button>
                                </CardContent>
                            </Card>


                        </aside>

                        {/* RIGHT COLUMN: Results & Visuals */}
                        <main className="lg:col-span-8 flex flex-col justify-between gap-8 h-full">



                            {/* Detailed Findings Table */}
                            <FadeIn delay={0.25} className="flex-1">
                                <Card className="shadow-xl border-slate-200/60 overflow-hidden bg-white h-full flex flex-col">
                                    <CardHeader className="border-b bg-slate-50/30 py-4 px-8">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <CardTitle className="text-lg font-bold text-slate-800">
                                                    Converted Dimensions
                                                </CardTitle>
                                                <CardDescription className="text-xs">Precision mapping across all supported units</CardDescription>
                                            </div>
                                            <div className="flex items-center gap-2 px-3 py-1 bg-white border border-slate-200 rounded-full">
                                                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                                                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Active Stream</span>
                                            </div>
                                        </div>
                                    </CardHeader>
                                    <CardContent className="p-0">
                                        <div className="overflow-x-auto">
                                            <table className="w-full text-left border-collapse">
                                                <thead className="bg-slate-50 border-b border-slate-100 text-[11px] font-bold text-slate-500 uppercase tracking-widest">
                                                    <tr>
                                                        <th className="px-8 py-5 w-1/4 text-left">Axis / Dimension</th>
                                                        {[unit, ...(["in", "cm", "mm"] as Unit[]).filter(u => u !== unit)].map((u) => (
                                                            <th key={u} className={`px-8 py-5 text-center w-1/4 transition-colors ${u === unit ? 'text-slate-400 bg-slate-50/50' : 'text-slate-800'}`}>
                                                                {u === "in" ? 'Inches (")' : u === "cm" ? 'Centimeters (cm)' : 'Millimeters (mm)'}
                                                            </th>
                                                        ))}
                                                    </tr>
                                                </thead>
                                                <tbody className="divide-y divide-slate-100">
                                                    {(["length", "width", "height"] as const).map((dim) => (
                                                        <tr key={dim} className="hover:bg-slate-50/50 transition-all group">
                                                            <td className="px-8 py-8">
                                                                <div className="flex items-center gap-4">
                                                                    <div className="w-8 h-8 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400 group-hover:text-primary group-hover:bg-primary/5 transition-colors">
                                                                        {dim === 'length' ? 'L' : dim === 'width' ? 'W' : 'H'}
                                                                    </div>
                                                                    <div className="flex flex-col">
                                                                        <span className="text-sm font-bold capitalize text-slate-800">{dim}</span>
                                                                        <span className="text-[9px] text-slate-400 font-bold font-mono tracking-tighter uppercase">{dim.charAt(0)}-Axis</span>
                                                                    </div>
                                                                </div>
                                                            </td>
                                                            {[unit, ...(["in", "cm", "mm"] as Unit[]).filter(u => u !== unit)].map((u) => (
                                                                <td key={u} className={`px-8 py-8 w-1/4 font-mono text-xl text-center font-semibold border-l border-slate-50 transition-colors ${u === unit ? 'text-slate-400 bg-slate-50/30' : 'text-slate-700'}`}>
                                                                    {converted ? (u === "in" ? converted.in[dim] : u === "cm" ? converted.cm[dim] : converted.mm[dim]) : "0.00"}
                                                                </td>
                                                            ))}
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    </CardContent>
                                </Card>
                            </FadeIn>

                            {/* Volume Calculation Section - Integrated Footer Style */}
                            <FadeIn delay={0.3}>
                                <div className="grid grid-cols-1 md:grid-cols-4 gap-0 rounded-2xl overflow-hidden border border-slate-200 shadow-xl bg-white">
                                    {/* Summary Title Cell */}
                                    <div className="flex flex-col justify-center px-8 py-6 bg-slate-50/50 border-r border-slate-100">
                                        <span className="text-sm font-bold text-slate-800">TOTAL VOLUME</span>
                                    </div>

                                    {[unit, ...(["in", "cm", "mm"] as Unit[]).filter(u => u !== unit)].map((u, idx) => (
                                        <div key={u} className={`px-6 py-6 flex flex-col items-center justify-center text-center ${idx < 2 ? 'border-r border-slate-100' : ''}`}>
                                            <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-2">
                                                {u === "in" ? "INCHES (IN³)" : u === "cm" ? "CENTIMETERS (CM³)" : "MILLIMETERS (MM³)"}
                                            </span>
                                            {u === "mm" ? (
                                                <TooltipProvider>
                                                    <Tooltip>
                                                        <TooltipTrigger asChild>
                                                            <div className="text-xl font-semibold text-slate-700 font-mono tracking-tighter w-full cursor-help">
                                                                {volume ? volume.mm3.toLocaleString(undefined, { maximumFractionDigits: 0 }) : "0"}
                                                            </div>
                                                        </TooltipTrigger>
                                                        <TooltipContent className="bg-slate-900 text-white border-none text-[10px] font-mono px-3 py-1.5">
                                                            Full precision: {volume?.mm3.toFixed(2)} mm³
                                                        </TooltipContent>
                                                    </Tooltip>
                                                </TooltipProvider>
                                            ) : (
                                                <div className="text-xl font-semibold text-slate-700 font-mono tracking-tighter w-full">
                                                    {volume ? (u === "in" ? volume.in3.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : volume.cm3.toLocaleString(undefined, { minimumFractionDigits: 1, maximumFractionDigits: 1 })) : "0.00"}
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </FadeIn>
                        </main>
                    </div>
                </div>
            </FadeIn>

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
                                            Select between Inches, Centimeters, or Millimeters using the unit toggle. Your calculations will automatically update across all units.
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
                                        <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-1">Input Product Dimensions</h3>
                                        <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                                            Enter the length, width, and height of your package. The dashboard will instantly update all conversion metrics.
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
                                        <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-1">Get Instant Conversions</h3>
                                        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
                                            Instantly see your dimensions converted across all major units (In, Cm, Mm) and get detailed volume calculations for your e-commerce products.
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
                                        "Carriers charge the higher of actual weight vs volumetric weight.",
                                        "Large, light boxes are often charged at triple their real weight.",
                                        "Formula: (Length × Width × Height) / 139 is the standard divisor.",
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
                                        "Length + (2×W) + (2×H) exceeding 130 inches triggers massive fees.",
                                        "A single extra millimeter can push a box into higher pricing tiers.",
                                        "Always optimize packaging dimensions to stay under carrier limits.",
                                    ]
                                },
                                {
                                    icon: CircleDollarSign,
                                    iconBg: "bg-blue-50",
                                    iconColor: "text-blue-500",
                                    statColor: "text-blue-600",
                                    title: "Cubic Storage Reality",
                                    stat: "4X Peak",
                                    statLabel: "Holiday Storage Surcharges",
                                    points: [
                                        "Warehouses charge by precise cubic centimeters or cubic inches.",
                                        "Small height reductions save thousands in annual overhead costs.",
                                        "Inefficient air inside boxes drains your margins every day.",
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
                                                <div className={`text-2xl font-black ${insight.statColor} tracking-tight`}>{insight.stat}</div>
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
                                answer: "You can input dimensions in <b>Inches (in)</b>, <b>Centimeters (cm)</b>, or <b>Millimeters (mm)</b>. The tool automatically converts all inputs to all units and calculates volume in cubic inches, centimeters, feet, and meters."
                            },
                            {
                                question: "How is Cubic Volume calculated?",
                                answer: "Volume is calculated by multiplying Length × Width × Height. The tool handles all unit conversions internally to ensure precision across Imperial and Metric systems."
                            },
                            {
                                question: "Can I copy the conversion results?",
                                answer: "Yes! Use the 'Copy All' button at the top right to copy all converted dimensions and volume calculations to your clipboard in a clean, formatted text."
                            },
                            {
                                question: "Why are my millimeter values so high?",
                                answer: "Centimeters and inches are much larger units than millimeters (1 inch = 25.4mm). High values in millimeters are normal and provide high precision for small product components."
                            }
                        ]}
                    />
                </FadeIn>
            </div>

            {/* CTA Section */}
            <div className="mt-24">
                <FadeIn delay={0.4}>
                    <CTA withSectionWrapper={false} />
                </FadeIn>
            </div>
        </div>
    )
}
