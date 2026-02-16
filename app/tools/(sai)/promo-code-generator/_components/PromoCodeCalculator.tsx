"use client"

import React, { useState, useCallback } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { HelpCircle, RefreshCw, Copy, Check, Ticket, Settings2, ChevronDown, ChevronUp, Type, Binary, Hash } from "lucide-react"
import { FadeIn, Counter, CalculatorInput, ResultFeedbackCard } from "@/app/tools/_shared/components"
import { Label } from "@/components/ui/label"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { toast } from "sonner"
import { Info } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"

export function PromoCodeCalculator() {
    // --- State ---
    const [prefix, setPrefix] = useState("")
    const [suffix, setSuffix] = useState("")
    const [length, setLength] = useState<number | "">(8)
    const [count, setCount] = useState<number | "">(5)

    const [useUppercase, setUseUppercase] = useState(true)
    const [useNumbers, setUseNumbers] = useState(true)
    const [useSymbols, setUseSymbols] = useState(false)
    const [showAdvanced, setShowAdvanced] = useState(false)

    const [generatedCodes, setGeneratedCodes] = useState<string[]>([])
    const [copiedIndex, setCopiedIndex] = useState<number | null>(null)

    // --- Helpers ---
    const scrollToGuide = () => {
        const element = document.getElementById('how-to-use');
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const generateRandomString = (len: number) => {
        let chars = ""
        if (useUppercase) chars += "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
        if (useNumbers) chars += "0123456789"
        if (useSymbols) chars += "!@#$%^&*"

        if (chars === "") chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789" // Fallback

        let result = ""
        for (let i = 0; i < len; i++) {
            result += chars.charAt(Math.floor(Math.random() * chars.length))
        }
        return result
    }

    const handleGenerate = () => {
        const numCodes = count === "" ? 1 : Math.min(Math.max(1, count), 50)
        const charLen = length === "" ? 8 : Math.min(Math.max(1, length), 32)

        const newCodes = Array.from({ length: numCodes }, () => {
            const randomPart = generateRandomString(charLen)
            return `${prefix}${randomPart}${suffix}`.toUpperCase()
        })

        setGeneratedCodes(newCodes)
        toast.success(`Generated ${numCodes} promo codes`)
    }

    const copyToClipboard = (text: string, index: number) => {
        navigator.clipboard.writeText(text)
        setCopiedIndex(index)
        toast.success("Copied to clipboard")
        setTimeout(() => setCopiedIndex(null), 2000)
    }

    const copyAll = () => {
        navigator.clipboard.writeText(generatedCodes.join("\n"))
        toast.success("All codes copied to clipboard")
    }

    return (
        <FadeIn className="w-full max-w-6xl mx-auto py-8 px-4" duration={0.6}>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

                {/* Inputs Section */}
                <div className="lg:col-span-7 space-y-6">
                    <Card className="border border-slate-200 shadow-sm bg-white">
                        <CardHeader className="pb-4 border-b border-slate-50 flex flex-row items-center justify-between space-y-0">
                            <div className="space-y-1">
                                <div className="flex items-center gap-2">
                                    <CardTitle className="text-xl font-bold text-slate-800">
                                        Configuration
                                    </CardTitle>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        onClick={scrollToGuide}
                                        className="text-slate-400 hover:text-slate-900 hover:bg-slate-100 h-6 w-6 rounded-full"
                                    >
                                        <HelpCircle className="w-4 h-4" />
                                    </Button>
                                </div>
                                <CardDescription>Set your prefix, suffix and randomization rules.</CardDescription>
                            </div>
                        </CardHeader>
                        <CardContent className="space-y-6 pt-6">
                            <div className="space-y-5">
                                <CalculatorInput
                                    label="Random Part Length"
                                    value={length}
                                    onChange={setLength}
                                    placeholder="8"
                                    tooltip="Number of randomized characters between prefix and suffix."
                                />
                                <CalculatorInput
                                    label="Number of Codes"
                                    value={count}
                                    onChange={setCount}
                                    placeholder="5"
                                    tooltip="How many unique codes to generate at once."
                                />
                            </div>

                            <div className="pt-2">
                                <button
                                    onClick={() => setShowAdvanced(!showAdvanced)}
                                    className={cn(
                                        "w-full flex items-center justify-between p-4 rounded-xl border border-slate-100 transition-all duration-300 group",
                                        showAdvanced ? "bg-slate-50 shadow-sm border-blue-100" : "bg-white hover:bg-slate-50/50"
                                    )}
                                >
                                    <div className="flex items-center gap-2.5">
                                        <div className={cn(
                                            "w-8 h-8 rounded-lg flex items-center justify-center transition-colors",
                                            showAdvanced ? "bg-blue-600 text-white" : "bg-slate-100 text-slate-500"
                                        )}>
                                            <Settings2 className="w-4 h-4" />
                                        </div>
                                        <div className="text-left">
                                            <p className="text-sm font-bold text-slate-800">Advanced Settings</p>
                                            <p className="text-[10px] text-slate-500 font-medium">Prefix, Suffix, and Character Rules</p>
                                        </div>
                                    </div>
                                    {showAdvanced ? (
                                        <ChevronUp className="w-5 h-5 text-blue-500" />
                                    ) : (
                                        <ChevronDown className="w-5 h-5 text-slate-400 group-hover:text-slate-600" />
                                    )}
                                </button>

                                <AnimatePresence>
                                    {showAdvanced && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: "auto", opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.3, ease: "easeInOut" }}
                                            className="overflow-hidden"
                                        >
                                            <div className="pt-6 pb-2 px-1 space-y-6">
                                                {/* Prefix/Suffix Grid */}
                                                <div className="space-y-4">
                                                    <CalculatorInput
                                                        label="Prefix (Optional)"
                                                        value={prefix}
                                                        onChange={setPrefix}
                                                        placeholder="SAVE-"
                                                        type="text"
                                                        tooltip="Text added to the start of every generated code."
                                                    />
                                                    <CalculatorInput
                                                        label="Suffix (Optional)"
                                                        value={suffix}
                                                        onChange={setSuffix}
                                                        placeholder="-2024"
                                                        type="text"
                                                        tooltip="Text added to the end of every generated code."
                                                    />
                                                </div>

                                                {/* Character Selection Chips */}
                                                <div className="space-y-3">
                                                    <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Include Characters</label>
                                                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                                                        <CharacterChip
                                                            label="Uppercase"
                                                            sub="A-Z"
                                                            icon={Type}
                                                            checked={useUppercase}
                                                            onChange={setUseUppercase}
                                                        />
                                                        <CharacterChip
                                                            label="Numbers"
                                                            sub="0-9"
                                                            icon={Binary}
                                                            checked={useNumbers}
                                                            onChange={setUseNumbers}
                                                        />
                                                        <CharacterChip
                                                            label="Symbols"
                                                            sub="!@#"
                                                            icon={Hash}
                                                            checked={useSymbols}
                                                            onChange={setUseSymbols}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>

                            <Button
                                onClick={handleGenerate}
                                className="w-full h-12 text-lg font-semibold bg-blue-600 hover:bg-blue-700 text-white shadow-md transition-all active:scale-[0.98]"
                            >
                                <RefreshCw className="mr-2 h-5 w-5" />
                                Generate Codes
                            </Button>
                        </CardContent>
                    </Card>

                    {/* Codes List Card (only if generated) */}
                    {generatedCodes.length > 0 && (
                        <Card className="border border-slate-200 shadow-sm bg-white overflow-hidden">
                            <CardHeader className="pb-3 border-b border-slate-50 flex flex-row items-center justify-between">
                                <CardTitle className="text-lg font-bold text-slate-800">Generated Codes</CardTitle>
                                <Button variant="outline" size="sm" onClick={copyAll} className="text-slate-600">
                                    <Copy className="w-4 h-4 mr-2" />
                                    Copy All
                                </Button>
                            </CardHeader>
                            <CardContent className="p-0 max-h-[400px] overflow-y-auto">
                                <div className="divide-y divide-slate-50">
                                    {generatedCodes.map((code, idx) => (
                                        <div key={idx} className="flex items-center justify-between p-4 hover:bg-slate-50 transition-colors">
                                            <code className="text-base font-mono font-bold text-slate-700">{code}</code>
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={() => copyToClipboard(code, idx)}
                                                className="text-blue-500 hover:text-blue-700 hover:bg-blue-50"
                                            >
                                                {copiedIndex === idx ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                                            </Button>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    )}
                </div>

                {/* Results Section (Right) */}
                <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-8">
                    <ResultFeedbackCard
                        title="Latest Reward Code"
                        titleLabel="Active"
                        labelClassName="bg-emerald-500/10 text-emerald-500"
                        mainValue={
                            <div className="text-3xl font-mono font-bold tracking-wider truncate max-w-full">
                                {generatedCodes.length > 0 ? generatedCodes[0] : "---- ----"}
                            </div>
                        }
                        valueColor="text-blue-600"
                        mainMetricLabel="Total Unique Codes"
                        mainMetricValue={<Counter value={generatedCodes.length} />}
                        mainMetricColor="text-slate-600"
                        secondaryMetrics={[
                            {
                                label: "Avg Length",
                                value: `${(prefix.length + (length === "" ? 0 : length) + suffix.length)} chars`,
                                color: "text-slate-500"
                            },
                            {
                                label: "Complexity",
                                value: useSymbols ? "High" : useNumbers ? "Medium" : "Low",
                                color: "text-blue-400"
                            }
                        ]}
                    />

                    {/* Tip Card */}
                    <div className="bg-blue-50 p-6 rounded-2xl border border-blue-100 flex gap-4">
                        <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                            <Ticket className="w-5 h-5 text-blue-600" />
                        </div>
                        <div>
                            <h4 className="font-semibold text-blue-900 mb-1">E-commerce Pro Tip</h4>
                            <p className="text-sm text-blue-800/80 leading-relaxed">
                                Use short, memorable prefixes like <span className="font-mono bg-blue-100 px-1 rounded">FLASH</span> or <span className="font-mono bg-blue-100 px-1 rounded">VIP</span> to increase conversion rates by up to 15%.
                            </p>
                        </div>
                    </div>
                </div>

            </div>
        </FadeIn>
    )
}
function ReadOnlyField({ label, value, color = "text-slate-700" }: { label: string, value: string, color?: string }) {
    return (
        <div className="flex items-center justify-between gap-4 py-1">
            <span className="text-sm font-medium text-slate-500">{label}</span>
            <span className={`text-lg font-bold ${color}`}>{value}</span>
        </div>
    )
}

function CharacterChip({ label, sub, icon: Icon, checked, onChange }: { label: string, sub: string, icon: any, checked: boolean, onChange: (v: boolean) => void }) {
    return (
        <button
            type="button"
            onClick={() => onChange(!checked)}
            className={cn(
                "flex items-center gap-3 p-3 rounded-xl border transition-all duration-300 text-left",
                checked
                    ? "bg-blue-600 border-blue-600 text-white shadow-md shadow-blue-200"
                    : "bg-white border-slate-200 text-slate-600 hover:border-blue-300 hover:bg-slate-50"
            )}
        >
            <div className={cn(
                "w-8 h-8 rounded-lg flex items-center justify-center",
                checked ? "bg-white/20" : "bg-slate-100"
            )}>
                <Icon className="w-4 h-4" />
            </div>
            <div>
                <p className="text-xs font-bold leading-none mb-1">{label}</p>
                <p className={cn("text-[10px] font-medium opacity-80", checked ? "text-white" : "text-slate-400")}>{sub}</p>
            </div>
        </button>
    )
}
