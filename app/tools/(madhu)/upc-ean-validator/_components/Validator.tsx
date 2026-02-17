"use client"

import React, { useState, useEffect, useCallback } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import {
    Copy,
    RefreshCw,
    XCircle,
    ShieldCheck,
    ArrowRight,
    Barcode as BarcodeIcon,
    HelpCircle,
    Calculator,
    ChevronDown,
    ChevronUp
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { FadeIn, ResultFeedbackCard, ToolSectionHeader } from "@/app/tools/_shared/components"
import { useBarcodeScanner } from "@/app/tools/_shared/hooks/useBarcodeScanner"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import Barcode from 'react-barcode'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"

type BarcodeFormat = "UPC-A" | "EAN-13" | "EAN-8" | "UPC-E" | "Unknown"

interface CalculationStep {
    step: number
    description: string
    value: string
}

interface ValidationResult {
    isValid: boolean
    format: BarcodeFormat
    checkDigit: string
    expectedCheckDigit: string
    message: string
    details: string[]
    calculationSteps: CalculationStep[]
}

export function Validator() {
    const { toast } = useToast()
    const [inputCode, setInputCode] = useState("")
    const [result, setResult] = useState<ValidationResult | null>(null)
    const [isMounted, setIsMounted] = useState(false)

    useEffect(() => {
        setIsMounted(true)
    }, [])

    // Memoize the validator function to use in the hook callback
    // We need to implement validateBarcode inside the component or outside?
    // It is inside. We need to be careful with dependencies.
    // Ideally validateBarcode shouldn't depend on state, which it doesn't seems to.

    // Check Digit Calculation (GTIN standard)
    const calculateCheckDigit = (digits: string): { checkDigit: number, steps: CalculationStep[] } => {
        const reversed = digits.split('').reverse().map(Number)
        let sum = 0;
        const steps: CalculationStep[] = [];

        // Step 1: Sum odd/even positions
        let sumOdd = 0;
        let sumEven = 0;

        reversed.forEach((digit, idx) => {
            if (idx % 2 === 0) { // Odd position (from right, 0-indexed) -> multiply by 3
                sumOdd += digit;
            } else { // Even position -> multiply by 1
                sumEven += digit;
            }
        });

        // The logic for GTIN check digit:
        // iterate from right to left (which we did by reversing).
        // positions 1, 3, 5... (indices 0, 2, 4...) are x3
        // positions 2, 4, 6... (indices 1, 3, 5...) are x1

        const totalSum = (sumOdd * 3) + sumEven;

        steps.push({
            step: 1,
            description: "Sum of digits in odd positions (from right) × 3",
            value: `${sumOdd} × 3 = ${sumOdd * 3}`
        });

        steps.push({
            step: 2,
            description: "Sum of digits in even positions",
            value: `${sumEven}`
        });

        steps.push({
            step: 3,
            description: "Add results together",
            value: `${sumOdd * 3} + ${sumEven} = ${totalSum}`
        });

        const nearestTen = Math.ceil(totalSum / 10) * 10
        const checkDigit = nearestTen - totalSum

        steps.push({
            step: 4,
            description: "Subtract sum from nearest equal or higher multiple of 10",
            value: `${nearestTen} - ${totalSum} = ${checkDigit}`
        });

        return { checkDigit, steps }
    }

    const validateBarcode = useCallback((code: string): ValidationResult => {
        const cleanCode = code.replace(/[\s-]/g, "")

        if (!/^\d+$/.test(cleanCode)) {
            return {
                isValid: false,
                format: "Unknown",
                checkDigit: "-",
                expectedCheckDigit: "-",
                message: "Invalid characters detected. Only numbers are allowed.",
                details: ["Remove spaces, dashes, or letters."],
                calculationSteps: []
            }
        }

        let format: BarcodeFormat = "Unknown"
        let isValid = false
        let checkDigit = "-"
        let expectedCheckDigit = "-"
        let message = "Invalid"
        let details: string[] = []

        // Determine format based on length
        if (cleanCode.length === 12) format = "UPC-A"
        else if (cleanCode.length === 13) format = "EAN-13"
        else if (cleanCode.length === 8) {
            format = "EAN-8"
        } else {
            return {
                isValid: false,
                format: "Unknown",
                checkDigit: "-",
                expectedCheckDigit: "-",
                message: `Invalid Length (${cleanCode.length} digits).`,
                details: [
                    "UPC-A: 12 digits",
                    "EAN-13: 13 digits",
                    "EAN-8 / UPC-E: 8 digits"
                ],
                calculationSteps: []
            }
        }

        // Validate Check Digit
        const dataDigits = cleanCode.slice(0, -1)
        const providedCheck = cleanCode.slice(-1)

        const { checkDigit: calculatedCheck, steps } = calculateCheckDigit(dataDigits)

        checkDigit = providedCheck
        expectedCheckDigit = calculatedCheck.toString()

        if (parseInt(providedCheck) === calculatedCheck) {
            isValid = true
            message = "Valid Barcode"
            details = [`Structure matches ${format} standard.`, "Check digit is correct."]
        } else {
            isValid = false
            message = "Invalid Check Digit"
            details = [
                `Expected Check Digit: ${expectedCheckDigit}`,
                `Found: ${providedCheck}`,
                "The last digit does not match the calculated checksum."
            ]
        }

        return { isValid, format, checkDigit, expectedCheckDigit, message, details, calculationSteps: steps }
    }, [])

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value
        if (/^[\d\s-]*$/.test(val)) {
            setInputCode(val)
        }
    }

    useEffect(() => {
        if (!inputCode) {
            setResult(null)
            return
        }
        setResult(validateBarcode(inputCode))
        // Auto-close details on new input
    }, [inputCode, validateBarcode])

    const copyResult = () => {
        if (!inputCode) return
        const text = `Format: ${result?.format}\nResult: ${result?.isValid ? "Valid" : "Invalid"}\nCode: ${inputCode}`
        navigator.clipboard.writeText(text)
        toast({
            title: "Copied",
            description: "Validation result copied to clipboard.",
        })
    }

    const clearAll = () => {
        setInputCode("")
        setResult(null)
        setResult(null) // redundant set

        toast({
            title: "Reset",
            description: "Input cleared.",
        })
    }

    // useBarcodeScanner Hook
    const { handleFileUpload } = useBarcodeScanner({
        onScan: (decodedText) => {
            setInputCode(decodedText)
            setResult(validateBarcode(decodedText))
        }
    })

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
    };

    const getBarcodeFormat = (format: BarcodeFormat) => {
        switch (format) {
            case "UPC-A": return "UPC"
            case "EAN-13": return "EAN13"
            case "EAN-8": return "EAN8"
            default: return "CODE128"
        }
    }

    return (
        <FadeIn className="w-full max-w-6xl mx-auto py-8 px-4" duration={0.6}>
            {/* Hidden file input for upload */}
            <input
                type="file"
                id="barcode-upload"
                accept="image/*"
                className="hidden"
                onChange={handleFileUpload}
            />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">

                {/* LEFT: Input (Col Span 6) */}
                <div className="lg:col-span-6">
                    <FadeIn delay={0.2} direction="right" className="h-full">
                        <Card className="border border-slate-200 shadow-sm overflow-hidden h-full flex flex-col bg-white">
                            <CardHeader className="pb-4 bg-slate-50/30 border-b border-slate-100 flex flex-row items-center justify-between space-y-0">
                                <div>
                                    <div className="flex items-center gap-2">
                                        <CardTitle className="text-2xl font-bold text-blue-600">
                                            Validator Inputs
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
                                                    How to use this validator
                                                </TooltipContent>
                                            </Tooltip>
                                        </TooltipProvider>
                                    </div>
                                    <CardDescription>Enter your barcode number or upload an image below.</CardDescription>
                                </div>
                            </CardHeader>
                            <CardContent className="space-y-6 pt-6">
                                <div className="space-y-2">
                                    <div className="flex justify-between items-center text-sm font-bold text-slate-600">
                                        <Label htmlFor="barcode-input">Barcode Number</Label>
                                        <span className="text-xs font-mono opacity-50 uppercase">UPC / EAN</span>
                                    </div>
                                    <Input
                                        id="barcode-input"
                                        placeholder="e.g. 036000291452"
                                        value={inputCode}
                                        onChange={handleInputChange}
                                        className="h-14 text-xl font-mono focus-visible:ring-primary shadow-sm bg-white"
                                        autoComplete="off"
                                    />


                                    {/* Scan Controls */}
                                    <div className="pt-2">
                                        <Button
                                            variant="secondary"
                                            className="w-full h-10 text-xs font-bold border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-700"
                                            onClick={() => document.getElementById('barcode-upload')?.click()}
                                        >
                                            <div className="flex items-center">
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    width="16"
                                                    height="16"
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    strokeWidth="2"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    className="w-4 h-4 mr-2 text-emerald-500"
                                                >
                                                    <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
                                                    <circle cx="9" cy="9" r="2" />
                                                    <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
                                                </svg>
                                                Upload Image
                                            </div>
                                        </Button>
                                    </div>
                                </div>

                                <div className="flex gap-2">
                                    <Button
                                        variant="outline"
                                        className="flex-[2] h-11 border-dashed hover:bg-muted/50 text-slate-500 hover:text-slate-900 transition-all font-medium"
                                        onClick={clearAll}
                                    >
                                        <RefreshCw className="w-4 h-4 mr-2" /> Reset Input
                                    </Button>
                                    <Button
                                        onClick={copyResult}
                                        variant="outline"
                                        disabled={!inputCode}
                                        className="flex-1 h-11 px-6 shadow-sm border-slate-300 hover:bg-slate-50 transition-all font-bold text-slate-950 disabled:opacity-30"
                                    >
                                        <Copy className="w-4 h-4 mr-2" /> Copy Results
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    </FadeIn>
                </div>

                {/* RIGHT: Results (Col Span 6) */}
                <div className="lg:col-span-6">
                    <FadeIn delay={0.4} direction="left" className="h-full">
                        <div className="space-y-6">
                            {/* Blue Result Card (Always Visible) */}
                            <ResultFeedbackCard
                                variant={result && !result.isValid ? "warning" : "default"}
                                title="Validation Status"
                                titleLabel={!inputCode ? "Ready" : result?.isValid ? "Valid" : "Invalid"}
                                valueColor={result && !result.isValid ? 'text-red-300' : 'text-white'}
                                mainValue={
                                    <div className="flex items-baseline gap-3">
                                        <span>
                                            {inputCode || "000000000000"}
                                        </span>
                                    </div>
                                }
                            >
                                <div className="space-y-3 mt-2">
                                    <Row
                                        label={
                                            <div className="flex items-center gap-1.5">
                                                <span>Check Digit</span>
                                                <Dialog>
                                                    <TooltipProvider delayDuration={0}>
                                                        <Tooltip>
                                                            <TooltipTrigger asChild>
                                                                <DialogTrigger asChild>
                                                                    <button className="text-slate-400 hover:text-slate-200 transition-all p-0.5" aria-label="See calculation">
                                                                        <HelpCircle className="w-3.5 h-3.5" />
                                                                    </button>
                                                                </DialogTrigger>
                                                            </TooltipTrigger>
                                                            <TooltipContent side="top" className="bg-slate-900 border-slate-800 text-white text-xs">
                                                                How calculation done
                                                            </TooltipContent>
                                                        </Tooltip>
                                                    </TooltipProvider>
                                                    <DialogContent className="max-w-md bg-white text-slate-900 border-slate-200">
                                                        <DialogHeader>
                                                            <DialogTitle className="flex items-center gap-2 text-slate-900">
                                                                <Calculator className="w-5 h-5 text-blue-500" />
                                                                Calculation Breakdown
                                                            </DialogTitle>
                                                            <DialogDescription className="text-slate-500">
                                                                {inputCode
                                                                    ? <>Step-by-step verification regarding <span className="font-mono font-bold text-slate-700 bg-slate-100 px-1.5 py-0.5 rounded text-xs">{inputCode}</span></>
                                                                    : "Enter a barcode to see the step-by-step validation logic."
                                                                }
                                                            </DialogDescription>
                                                        </DialogHeader>
                                                        <div className="space-y-4 py-4">
                                                            {result && result.calculationSteps.length > 0 ? (
                                                                <div className="space-y-4 relative">
                                                                    <div className="absolute left-3 top-2 bottom-2 w-0.5 bg-slate-100" />
                                                                    {result.calculationSteps.map((step, idx) => (
                                                                        <div key={idx} className="flex gap-4 relative">
                                                                            <div className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-50 border border-blue-100 text-blue-600 flex items-center justify-center text-xs font-bold z-10">
                                                                                {step.step}
                                                                            </div>
                                                                            <div className="space-y-1">
                                                                                <p className="text-sm font-medium text-slate-700 leading-none">{step.description}</p>
                                                                                <div className="font-mono text-xs text-slate-500 bg-slate-50 px-2 py-1 rounded w-fit border border-slate-100">
                                                                                    {step.value}
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    ))}
                                                                </div>
                                                            ) : (
                                                                <div className="py-8 text-center text-slate-400">
                                                                    <Calculator className="w-12 h-12 mx-auto mb-3 opacity-10" />
                                                                    <p className="text-sm">Waiting for valid barcode input...</p>
                                                                </div>
                                                            )}
                                                            <div className="bg-blue-50 p-3 rounded-lg border border-blue-100">
                                                                <p className="text-xs text-blue-700 font-medium">
                                                                    Note: Standard Modulo 10 Algorithm
                                                                </p>
                                                                <p className="text-[10px] text-blue-600 mt-1">
                                                                    This calculation is used universally for GTIN barcodes (UPC, EAN) to detect common data entry errors.
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </DialogContent>
                                                </Dialog>
                                            </div>
                                        }
                                        value={result?.checkDigit || "-"}
                                        className="text-slate-300"
                                    />
                                    {result && !result.isValid && result.expectedCheckDigit !== "-" && (
                                        <Row label="Expected Check Digit" value={result.expectedCheckDigit} className="text-orange-300 font-bold" />
                                    )}
                                    <Row label="Analysis" value={result?.message || "Waiting for input..."} className="text-slate-300" />
                                </div>
                            </ResultFeedbackCard>

                            {/* Barcode Preview */}
                            <Card className="bg-white border border-slate-200 shadow-sm p-4 sm:p-6 flex flex-col items-center justify-center min-h-[160px] flex-1 transition-all duration-300 overflow-hidden">
                                {result && result.isValid && isMounted ? (
                                    <div className="flex flex-col items-center w-full animate-in fade-in zoom-in-95 duration-200 fill-mode-forwards">
                                        <h3 className="text-base font-bold text-slate-900 mb-2">Identified {result.format} Barcode</h3>

                                        <div className="p-4 bg-white rounded-lg border border-slate-100 shadow-sm w-full flex justify-center overflow-hidden mb-4">
                                            <div className="scale-110 sm:scale-125 origin-center">
                                                <Barcode
                                                    value={inputCode}
                                                    format={getBarcodeFormat(result.format)}
                                                    width={2}
                                                    height={80}
                                                    fontSize={16}
                                                    background="transparent"
                                                    marginTop={10}
                                                    marginBottom={10}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="relative w-full flex flex-col items-center justify-center py-6 group">
                                        {/* Ghost Barcode & Animation */}
                                        {isMounted && (
                                            <>
                                                <div className="scale-110 sm:scale-125 origin-center opacity-10 grayscale">
                                                    <Barcode
                                                        value="000000000000"
                                                        format="UPC"
                                                        width={2}
                                                        height={80}
                                                        fontSize={18}
                                                        background="transparent"
                                                        lineColor="#64748b"
                                                    />
                                                </div>

                                                {/* Scanning Laser Animation (Visible when no input) */}
                                                {!inputCode && (
                                                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                                        <div className="w-[200px] h-[120px] relative">
                                                            <div className="absolute top-0 left-0 w-full h-[2px] bg-blue-500/40 shadow-[0_0_15px_rgba(59,130,246,0.5)] animate-[scan_3s_ease-in-out_infinite]" />
                                                        </div>
                                                    </div>
                                                )}
                                            </>
                                        )}

                                        {/* Center Text */}
                                        <div className="absolute inset-0 flex flex-col items-center justify-center space-y-2">
                                            <div className="bg-white/80 backdrop-blur-sm px-4 py-2 rounded-lg border border-slate-100 shadow-sm flex flex-col items-center">
                                                <BarcodeIcon className="w-8 h-8 text-slate-300 mb-1" />
                                                <p className="text-sm font-semibold text-slate-500">
                                                    {!inputCode ? "Awaiting Input..." : "Invalid Format"}
                                                </p>
                                                <p className="text-[10px] text-slate-400">
                                                    {!inputCode ? "Enter a barcode to visualize" : "Check code length and structure"}
                                                </p>
                                            </div>
                                        </div>

                                        <style jsx global>{`
                                            @keyframes scan {
                                                0%, 100% { top: 10%; opacity: 0.2; }
                                                50% { top: 90%; opacity: 1; }
                                            }
                                        `}</style>
                                    </div>
                                )}
                            </Card>
                        </div>
                    </FadeIn>
                </div>
            </div>
        </FadeIn>

    )
}

function Row({ label, value, className }: { label: React.ReactNode, value: React.ReactNode, className?: string }) {
    return (
        <div className={`flex justify-between items-center text-sm ${className}`}>
            <span>{label}</span>
            <span className="font-medium tracking-wide">
                {value}
            </span>
        </div>
    )
}
