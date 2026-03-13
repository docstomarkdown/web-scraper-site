"use client"
import React, { useState, useEffect, useCallback } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
    Barcode as BarcodeIcon,
    Calculator,
    ChevronDown,
    FileUp,
    Info
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { cn } from "@/lib/utils"
import { CalculatorCardHeader, CalculatorInput, ResultSummaryCard, FadeIn } from "@/app/tools/_shared/components"
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
    const clearAll = () => {
        setInputCode("")
        setResult(null)
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
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                {/* LEFT: Input (Col Span 6) */}
                <div className="lg:col-span-6">
                    <FadeIn delay={0.2} direction="right">
                        <Card className="border border-slate-200 shadow-sm overflow-hidden bg-white">
                            <CalculatorCardHeader
                                title="UPC/EAN Validator"
                                description="Enter your barcode number or upload an image below to validate."
                                guideId="how-to-use"
                                tooltip="How to use this validator"
                                onReset={clearAll}
                            />
                            <CardContent className="p-6 md:p-8 pb-12 md:pb-16 space-y-8 flex-1 flex flex-col">
                                <div className="space-y-3">
                                    <CalculatorInput
                                        label="Barcode Number"
                                        value={inputCode}
                                        onChange={(v) => {
                                            if (/^[\d\s-]*$/.test(v)) {
                                                setInputCode(v)
                                            }
                                        }}
                                        placeholder="Ex: 036000291452"
                                        tooltip="Enter EAN / UPC (8, 12, or 13 digits) to validate."
                                        type="text"
                                    />
                                    {/* Scan Controls */}
                                    <div className="pt-2">
                                        <Button
                                            variant="secondary"
                                            className="w-full h-10 text-xs font-bold border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-700 rounded-xl"
                                            onClick={() => document.getElementById('barcode-upload')?.click()}
                                        >
                                            <div className="flex items-center">
                                                <FileUp className="w-4 h-4 mr-2 text-blue-500" />
                                                Upload Image
                                            </div>
                                        </Button>
                                    </div>
                                </div>

                            </CardContent>
                        </Card>
                    </FadeIn>
                </div>
                {/* RIGHT: Results (Col Span 6) */}
                <div className="lg:col-span-6">
                    <FadeIn delay={0.4} direction="left" className="h-full">
                        <div className="space-y-3">
                            {/* Validation Results */}
                            <ResultSummaryCard
                                title="Validation Results"
                                primaryResult={{
                                    value: inputCode || "Awaiting Input",
                                    label: !inputCode
                                        ? "Ready"
                                        : result?.isValid
                                            ? `Valid ${result.format}`
                                            : `Invalid ${result?.format || "Format"}`,
                                    key: "barcode"
                                }}
                                secondaryResults={[
                                    // Validation status for badge (hidden but used for profitLossKey)
                                    ...(result
                                        ? [{
                                            key: "validationStatus",
                                            label: "Status",
                                            value: result.isValid ? 1 : -1, // Positive for valid (green), negative for invalid (red)
                                            tooltip: "Validation status",
                                            className: "hidden"
                                        }]
                                        : []),
                                    {
                                        key: "checkDigit",
                                        label: "Check Digit",
                                        value: result?.checkDigit || "—",
                                        tooltip: "The last digit of the barcode used for validation"
                                    },
                                    ...(result && !result.isValid && result.expectedCheckDigit !== "-"
                                        ? [{
                                            key: "expectedCheckDigit",
                                            label: "Expected Check Digit",
                                            value: result.expectedCheckDigit,
                                            tooltip: "The correct check digit calculated using Modulo 10 algorithm"
                                        }]
                                        : []),
                                    {
                                        key: "analysis",
                                        label: "Analysis",
                                        value: result?.message || "Waiting for input...",
                                        tooltip: "Validation status and details"
                                    }
                                ]}
                                profitLossKey="validationStatus"
                                validationBadgeText={{ valid: "Valid", invalid: "Invalid" }}
                                isCalculated={!!inputCode}
                                checklistItems={[
                                    { label: "Enter Barcode", isComplete: !!inputCode }
                                ]}
                                emptyResultLabel="Validation Status"
                                description={result?.isValid
                                    ? `The barcode is valid and matches ${result.format} standard. Check digit is correct.`
                                    : result && !result.isValid
                                        ? result.details.join(". ")
                                        : "Enter a barcode to validate its format and check digit."}
                            />
                            {/* Calculation Dialog Button - Tool-specific customization */}
                            {result && result.calculationSteps.length > 0 && (
                                <Card className="bg-white border border-slate-200 shadow-sm p-4">
                                    <Dialog>
                                        <DialogTrigger asChild>
                                            <Button
                                                variant="outline"
                                                className="w-full h-10 text-xs font-medium justify-between"
                                            >
                                                <span className="flex items-center gap-2">
                                                    <Calculator className="w-4 h-4 text-blue-500" />
                                                    View Calculation Breakdown
                                                    <TooltipProvider delayDuration={0}>
                                                        <Tooltip>
                                                            <TooltipTrigger asChild>
                                                                <span
                                                                    onClick={(e) => e.stopPropagation()}
                                                                    className="flex-shrink-0 text-slate-400 hover:text-blue-600 transition-colors cursor-help"
                                                                    aria-label="Calculation breakdown info"
                                                                >
                                                                    <Info className="w-3.5 h-3.5" />
                                                                </span>
                                                            </TooltipTrigger>
                                                            <TooltipContent side="top" className="bg-slate-900 border-slate-800 text-white text-xs">
                                                                Step-by-step check digit calculation
                                                            </TooltipContent>
                                                        </Tooltip>
                                                    </TooltipProvider>
                                                </span>
                                                <ChevronDown className="w-4 h-4 text-slate-400" />
                                            </Button>
                                        </DialogTrigger>
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
                                            <div className="space-y-3 py-4">
                                                <div className="space-y-3 relative">
                                                    <div className={cn("absolute left-3 top-2 bottom-2 w-0.5", result.isValid ? "bg-emerald-100" : "bg-rose-100")} />
                                                    {result.calculationSteps.map((step, idx) => (
                                                        <div key={idx} className="flex gap-4 relative">
                                                            <div className={cn(
                                                                "flex-shrink-0 w-6 h-6 rounded-full border flex items-center justify-center text-xs font-black z-10 transition-colors",
                                                                result.isValid
                                                                    ? "bg-emerald-50 border-emerald-200 text-emerald-600"
                                                                    : "bg-rose-50 border-rose-200 text-rose-600"
                                                            )}>
                                                                {step.step}
                                                            </div>
                                                            <div className="space-y-1">
                                                                <p className="text-sm font-bold text-slate-800 leading-none">{step.description}</p>
                                                                <div className={cn(
                                                                    "font-mono text-xs px-2.5 py-1 rounded w-fit border transition-colors",
                                                                    result.isValid
                                                                        ? "text-emerald-700 bg-emerald-50/50 border-emerald-100"
                                                                        : "text-rose-700 bg-rose-50/50 border-rose-100"
                                                                )}>
                                                                    {step.value}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
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
                                </Card>
                            )}
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
        </FadeIn >
    )
}
