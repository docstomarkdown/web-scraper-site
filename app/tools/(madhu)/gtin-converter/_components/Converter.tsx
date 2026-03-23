"use client"
import React, { useState, useEffect, useRef, useCallback } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
    RefreshCw,
    Barcode as BarcodeIcon,
    Calculator,
    Info,
    CheckCircle2,
    Check,
    X,
    XCircle,
    Activity,
    ClipboardPenLine,
    AlertTriangle,
    ImageIcon,
    Copy,
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { cn } from "@/lib/utils"
import { CalculatorCardHeader, CalculatorInput, FadeIn } from "@/app/tools/_shared/components"
import { useBarcodeScanner } from "@/app/tools/_shared/hooks/useBarcodeScanner"
import { motion, AnimatePresence } from "framer-motion"

type BarcodeFormat = "GTIN-8" | "UPC-A" | "EAN-13" | "GTIN-14" | "Unknown"

interface ConversionResult {
    gtin8: string
    gtin12: string
    gtin13: string
    gtin14: string
}

interface ValidationStatus {
    isValid: boolean
    message: string | React.ReactNode
    format: BarcodeFormat
    expectedCheckDigit?: number
    foundCheckDigit?: number
    correctedCode?: string
    calculationSteps?: { step: number; description: string; value: string }[]
}


export function Converter() {
    const { toast } = useToast()
    const [inputCode, setInputCode] = useState("")
    const [status, setStatus] = useState<ValidationStatus>({ isValid: false, message: "Awaiting input...", format: "Unknown" })
    const [results, setResults] = useState<ConversionResult | null>(null)
    const [isMounted, setIsMounted] = useState(false)

    useEffect(() => {
        setIsMounted(true)
    }, [])

    const calculateCheckDigitDetailed = (code: string) => {
        const digits = code.split('').map(Number)
        let sum = 0
        const reversed = [...digits].reverse()
        const steps: { step: number; description: string; value: string }[] = []
        let weightingStr = ""
        reversed.forEach((digit, i) => {
            const weight = (i % 2 === 0) ? 3 : 1
            const product = digit * weight
            sum += product
            weightingStr += `${digit}×${weight}${i < reversed.length - 1 ? " + " : ""}`
        })
        steps.push({ step: 1, description: "Reverse & Apply Weights (3, 1, 3...)", value: weightingStr })
        steps.push({ step: 2, description: "Calculate Sum of Weighted Products", value: `Total Sum = ${sum}` })
        const nextTen = Math.ceil(sum / 10) * 10
        const checkDigitValue = (nextTen - sum) % 10
        steps.push({ step: 3, description: "Find Next Multiple of 10", value: `${nextTen} - ${sum} = ${checkDigitValue}` })
        steps.push({ step: 4, description: "Resulting Check Digit", value: `Final Digit: ${checkDigitValue}` })
        return { checkDigit: checkDigitValue, steps }
    }

    const validateAndConvert = useCallback((code: string): { status: ValidationStatus, result: ConversionResult | null } => {
        const clean = code.replace(/[\s-]/g, "")
        if (!clean) {
            return { status: { isValid: false, message: "", format: "Unknown" }, result: null }
        }
        if (!/^\d+$/.test(clean)) {
            return {
                status: { isValid: false, message: "Please enter numbers only (spaces and dashes are allowed)", format: "Unknown" },
                result: null
            }
        }
        
        // Strict length validation for GTIN-8, 12, 13, 14
        if (![8, 12, 13, 14].includes(clean.length)) {
            const lengthError = (
                <div className="space-y-1 mt-1">
                    <p>Invalid length: {clean.length} digits entered.</p>
                    <p className="font-semibold text-xs opacity-90 mt-2">GTIN must contain exactly:</p>
                    <ul className="list-disc list-inside space-y-0.5 text-[11px] opacity-80 pl-1">
                        <li>8 digits (GTIN-8)</li>
                        <li>12 digits (UPC-A)</li>
                        <li>13 digits (EAN-13)</li>
                        <li>14 digits (GTIN-14)</li>
                    </ul>
                </div>
            )
            return { status: { isValid: false, message: lengthError, format: "Unknown" }, result: null }
        }

        const data = clean.slice(0, -1)
        const providedCD = parseInt(clean.slice(-1))
        const { checkDigit: expectedCD, steps } = calculateCheckDigitDetailed(data)

        let format: BarcodeFormat = "Unknown"
        if (clean.length === 8) format = "GTIN-8"
        else if (clean.length === 12) format = "UPC-A"
        else if (clean.length === 13) format = "EAN-13"
        else if (clean.length === 14) format = "GTIN-14"

        if (providedCD !== expectedCD) {
            const corrected = data + expectedCD
            return {
                status: {
                    isValid: false,
                    message: `Invalid check digit.`,
                    format: format,
                    expectedCheckDigit: expectedCD,
                    foundCheckDigit: providedCD,
                    correctedCode: corrected,
                    calculationSteps: steps
                },
                result: null
            }
        }

        const base14 = clean.padStart(14, "0")
        const conversionResult = {
            gtin8: clean.length === 8 ? clean : base14.slice(-8),
            gtin12: base14.slice(-12),
            gtin13: base14.slice(-13),
            gtin14: base14,
        }

        return {
            status: {
                isValid: true,
                message: "Valid Format",
                format,
                calculationSteps: steps
            },
            result: conversionResult
        }
    }, [])

    useEffect(() => {
        const { status: s, result: r } = validateAndConvert(inputCode)
        setStatus(s)
        setResults(r)
    }, [inputCode, validateAndConvert])

    // useBarcodeScanner Hook
    const { handleFileUpload } = useBarcodeScanner({
        onScan: (decodedText) => {
            setInputCode(decodedText)
        }
    })

    const clearAll = () => {
        setInputCode("")
    }

    return (
        <FadeIn className="w-full max-w-6xl mx-auto py-8 px-4" duration={0.6}>
            <input type="file" id="barcode-upload" accept="image/*" className="hidden" onChange={handleFileUpload} />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                {/* LEFT: Inputs */}
                <div className="lg:col-span-6">
                    <FadeIn delay={0.2} direction="right">
                        <Card className="border border-slate-200 shadow-sm overflow-hidden bg-white">
                            <CalculatorCardHeader
                                title="GTIN Converter"
                                description="Enter your barcode number or upload an image below to convert between GTIN formats."
                                guideId="how-to-use"
                                tooltip="How to use this converter"
                                onReset={clearAll}
                            />
                            <CardContent className="p-6 md:p-8 pb-12 md:pb-16 space-y-6 flex-1 flex flex-col">
                                <div className="space-y-6">
                                    <CalculatorInput
                                        label="GTIN / UPC / EAN Number"
                                        value={inputCode}
                                        onChange={(v) => {
                                            if (/^[\d\s-]*$/.test(v)) {
                                                setInputCode(v)
                                            }
                                        }}
                                        placeholder="Ex: 036000291452"
                                        tooltip="Enter EAN / UPC (8, 12, 13, or 14 digits) to convert."
                                        type="text"
                                    />

                                    <div className="relative flex items-center justify-center">
                                        <div className="w-full border-t border-slate-200/80"></div>
                                        <span className="absolute px-3 bg-white text-[10.5px] font-bold text-slate-400 uppercase tracking-widest">
                                            Or
                                        </span>
                                    </div>

                                    <Button
                                        variant="secondary"
                                        className="w-full h-10 text-xs font-bold border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-700 rounded-xl"
                                        onClick={() => document.getElementById('barcode-upload')?.click()}
                                    >
                                        <div className="flex items-center justify-center">
                                            <ImageIcon className="w-4 h-4 mr-2 text-blue-500 shrink-0" />
                                            Upload Barcode Image
                                        </div>
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    </FadeIn>
                </div>

                {/* RIGHT: Results */}
                <div className="lg:col-span-6">
                    <FadeIn delay={0.4} direction="left" className="h-full">
                        <div className="space-y-3 flex flex-col h-full">
                            <Card className="relative overflow-hidden border border-slate-200/60 shadow-sm rounded-2xl bg-[#F5F8FD]">
                                <div className="flex justify-between items-center gap-4 px-6 pt-5 pb-1">
                                    <div className="flex items-center gap-2.5">
                                        <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-blue-600/10 border border-blue-100/50 shadow-sm shadow-blue-500/5">
                                            <Activity className="w-4 h-4 text-blue-600" />
                                        </div>
                                        <span className="text-[15px] sm:text-[16px] font-bold text-blue-700 leading-none">
                                            Results Panel
                                        </span>
                                    </div>
                                    
                                    {(status.isValid || (inputCode && !status.isValid)) ? (
                                        <motion.div
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            transition={{ duration: 0.4, ease: "easeInOut" }}
                                            className={cn(
                                                "flex items-center justify-center px-2.5 py-1.5 rounded-full border shrink-0 border-slate-200/50",
                                                status.isValid
                                                    ? "bg-emerald-100/80 text-emerald-700"
                                                    : "bg-red-100/80 text-red-700"
                                            )}
                                        >
                                            {status.isValid ? (
                                                <Check className="w-3.5 h-3.5" />
                                            ) : (
                                                <X className="w-3.5 h-3.5" />
                                            )}
                                        </motion.div>
                                    ) : null}
                                </div>

                                <AnimatePresence mode="wait">
                                    {!inputCode ? (
                                        /* EMPTY STATE */
                                        <motion.div
                                            key="empty-state"
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                            transition={{ duration: 0.4 }}
                                            className="relative z-10 px-6 pb-6 pt-2"
                                        >
                                            <div className="relative">
                                                <div className="absolute inset-0 z-30 flex items-center justify-center pointer-events-none">
                                                    <motion.div
                                                        initial={{ opacity: 0 }}
                                                        animate={{ opacity: 1 }}
                                                        className="bg-white/80 backdrop-blur-xl border border-white/60 shadow-[0_8px_40px_rgba(59,130,246,0.12)] rounded-2xl px-6 py-5 flex flex-col items-center gap-3 w-fit max-w-[320px] pointer-events-auto"
                                                    >
                                                        <div className="relative flex items-center justify-center">
                                                            <span className="absolute w-11 h-11 rounded-xl bg-blue-400/15 animate-ping" style={{ animationDuration: "2.8s" }} />
                                                            <div className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200/60 flex items-center justify-center text-blue-500 shadow-sm">
                                                                <ClipboardPenLine className="w-[18px] h-[18px]" />
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

                                                {/* Ghosted Skeleton */}
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
                                        /* SINGLE RESULT STATE */
                                        <motion.div
                                            key="results-state"
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                            transition={{ duration: 0.55 }}
                                            className="flex flex-col"
                                        >
                                            <div className="px-5 pb-5 pt-3 space-y-3">
                                                <div className="space-y-3">
                                                    {status.isValid && results ? (
                                                        <>
                                                            <motion.div
                                                                initial={{ opacity: 0, scale: 0.98 }}
                                                                animate={{ opacity: 1, scale: 1 }}
                                                                transition={{ duration: 0.4, delay: 0.1, ease: "easeOut" }}
                                                                className="relative flex flex-col items-center text-center py-5 px-4 mb-2"
                                                            >
                                                                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">
                                                                    Detected Format
                                                                </span>
                                                                <div className="flex items-baseline justify-center">
                                                                    <span className="text-[2.75rem] sm:text-[3.25rem] font-black tracking-tighter leading-none text-blue-600">
                                                                        {status.format}
                                                                    </span>
                                                                </div>
                                                            </motion.div>

                                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                                                {[
                                                                    { label: "GTIN-8", value: results.gtin8, icon: BarcodeIcon, delay: 0.15 },
                                                                    { label: "GTIN-12", value: results.gtin12, icon: BarcodeIcon, delay: 0.2 },
                                                                    { label: "GTIN-13", value: results.gtin13, icon: BarcodeIcon, delay: 0.25 },
                                                                    { label: "GTIN-14", value: results.gtin14, icon: BarcodeIcon, delay: 0.3 }
                                                                ].map((item) => (
                                                                    <motion.div
                                                                        key={item.label}
                                                                        initial={{ opacity: 0, y: 8 }}
                                                                        animate={{ opacity: 1, y: 0 }}
                                                                        transition={{ duration: 0.3, delay: item.delay, ease: "easeOut" }}
                                                                        className="bg-white border border-slate-200/70 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] rounded-xl p-4 transition-all duration-200 hover:border-slate-300 hover:shadow-[0_4px_12px_-4px_rgba(0,0,0,0.08)] flex flex-col justify-between"
                                                                    >
                                                                        <div className="flex items-center gap-2 mb-1.5">
                                                                            <item.icon className="w-4 h-4 text-blue-500 flex-shrink-0" />
                                                                            <span className="text-[13px] font-bold text-slate-500">{item.label}</span>
                                                                        </div>
                                                                        <div className="pl-6 flex items-center justify-between gap-3">
                                                                            <span className="text-[15px] font-mono font-bold text-slate-800 break-all">{item.value}</span>
                                                                            <button
                                                                                onClick={() => {
                                                                                    navigator.clipboard.writeText(item.value)
                                                                                }}
                                                                                className="text-slate-400 hover:text-blue-600 transition-colors p-1 rounded-md hover:bg-blue-50/80 active:bg-blue-100 flex-shrink-0"
                                                                                title="Copy to clipboard"
                                                                            >
                                                                                <Copy className="w-3.5 h-3.5" />
                                                                            </button>
                                                                        </div>
                                                                    </motion.div>
                                                                ))}
                                                            </div>
                                                        </>
                                                    ) : (
                                                        <motion.div
                                                            initial={{ opacity: 0, y: 8 }}
                                                            animate={{ opacity: 1, y: 0 }}
                                                            transition={{ duration: 0.3, delay: 0.1, ease: "easeOut" }}
                                                            className="bg-white border border-slate-200/70 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] rounded-xl p-4 transition-all duration-200 hover:border-slate-300 hover:shadow-[0_4px_12px_-4px_rgba(0,0,0,0.08)]"
                                                        >
                                                            <div className="flex items-center gap-2 mb-2">
                                                                <XCircle className="w-4 h-4 text-rose-500 flex-shrink-0" />
                                                                <span className="text-[13px] font-bold text-slate-500">{status.format}</span>
                                                            </div>
                                                            <div className="pl-6 pt-1">
                                                                <div className="text-[13px] font-medium text-slate-700">{status.message}</div>
                                                            </div>
                                                        </motion.div>
                                                    )}
                                                </div>
                                                

                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </Card>
                        </div>
                    </FadeIn>
                </div>
            </div>
        </FadeIn>
    )
}
