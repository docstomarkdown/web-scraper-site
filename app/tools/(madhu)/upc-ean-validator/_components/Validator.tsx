"use client"
import React, { useState, useEffect, useCallback, useRef } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
    Calculator,
    Maximize2,
    FileUp,
    Info,
    CheckCircle2,
    Check,
    X,
    XCircle,
    AlertTriangle,
    ClipboardList,
    ClipboardPenLine,
    Upload,
    ImageIcon,
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { cn } from "@/lib/utils"
import { CalculatorCardHeader, CalculatorInput, FadeIn } from "@/app/tools/_shared/components"
import { useBarcodeScanner } from "@/app/tools/_shared/hooks/useBarcodeScanner"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { motion, AnimatePresence } from "framer-motion"
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
        setBulkResults([])
        setBulkFileName("")
    }

    // Bulk validation state
    const [bulkResults, setBulkResults] = useState<{ code: string; result: ValidationResult }[]>([])
    const [bulkFileName, setBulkFileName] = useState<string>("")
    const [isDragOver, setIsDragOver] = useState(false)

    // useBarcodeScanner Hook (for image scanning)
    const { handleFileUpload } = useBarcodeScanner({
        onScan: (decodedText) => {
            setInputCode(decodedText)
            setResult(validateBarcode(decodedText))
            setBulkResults([])
        }
    })

    // Bulk file upload handler (CSV/TXT)
    const handleBulkFileUpload = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (!file) return

        const reader = new FileReader()
        reader.onload = (event) => {
            const text = event.target?.result as string
            if (!text) return

            // Parse lines — supports comma-separated, newline-separated, or mixed
            const codes = text
                .split(/[\n\r,;]+/)
                .map(line => line.trim().replace(/[\s-]/g, ""))
                .filter(line => line.length > 0 && /^\d+$/.test(line))

            if (codes.length === 0) {
                toast({ title: "No valid barcodes found", description: "The file should contain numeric barcodes, one per line or comma-separated.", variant: "destructive" })
                return
            }

            // Always treat as bulk (even single — shown in the unified bulk card)
            const results = codes.map(code => ({
                code,
                result: validateBarcode(code)
            }))
            setBulkResults(results)
            setBulkFileName(file.name)
            setInputCode("")
            setResult(null)
        }
        reader.readAsText(file)
        e.target.value = '' // reset input
    }, [validateBarcode, toast])

    // Drag and drop handlers
    const handleDragOver = useCallback((e: React.DragEvent) => {
        e.preventDefault()
        setIsDragOver(true)
    }, [])
    const handleDragLeave = useCallback((e: React.DragEvent) => {
        e.preventDefault()
        setIsDragOver(false)
    }, [])
    const handleDrop = useCallback((e: React.DragEvent) => {
        e.preventDefault()
        setIsDragOver(false)
        const file = e.dataTransfer.files?.[0]
        if (file) {
            const fakeEvent = { target: { files: [file], value: '' } } as unknown as React.ChangeEvent<HTMLInputElement>
            if (file.type.startsWith('image/')) {
                handleFileUpload(fakeEvent)
            } else {
                handleBulkFileUpload(fakeEvent)
            }
        }
    }, [handleBulkFileUpload, handleFileUpload])

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

    return (
        <FadeIn className="w-full max-w-6xl mx-auto py-8 px-4" duration={0.6}>
            {/* Hidden file inputs */}
            <input
                type="file"
                id="barcode-upload"
                accept="image/*"
                className="hidden"
                onChange={handleFileUpload}
            />
            <input
                type="file"
                id="bulk-upload"
                accept=".csv,.txt,.text"
                className="hidden"
                onChange={handleBulkFileUpload}
            />
            <input
                type="file"
                id="combined-upload"
                accept=".csv,.txt,.text,image/*"
                className="hidden"
                onChange={(e) => {
                    const file = e.target.files?.[0]
                    if (!file) return
                    if (file.type.startsWith('image/')) {
                        handleFileUpload(e)
                    } else {
                        handleBulkFileUpload(e)
                    }
                }}
            />
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                {/* LEFT: Input (Col Span 6) */}
                <div className="lg:col-span-6 self-start lg:sticky lg:top-28">
                    <FadeIn delay={0.2} direction="right">
                        <Card className="border border-slate-200 shadow-sm overflow-hidden bg-white min-h-[360px]">
                            <CalculatorCardHeader
                                title="UPC/EAN Validator"
                                description="Enter a barcode / upload an image / import a CSV/TXT file to check status—with bulk validation support."
                                guideId="how-to-use"
                                tooltip="How to use this validator"
                                onReset={clearAll}
                            />
                            <CardContent className="p-6 md:p-8 flex flex-col gap-6">
                                {/* ── Single Barcode Input ── */}
                                <div>
                                    <CalculatorInput
                                        label="UPC / EAN Number"
                                        value={inputCode}
                                        onChange={(v) => {
                                            if (/^[\d\s-]*$/.test(v)) {
                                                setInputCode(v)
                                                setBulkResults([])
                                            }
                                        }}
                                        placeholder="Ex: 036000291452"
                                        tooltip="Enter EAN / UPC (8, 12, or 13 digits) to validate."
                                        type="text"
                                    />
                                </div>

                                {/* ── Divider ── */}
                                <div className="relative flex items-center justify-center">
                                    <div className="w-full border-t border-slate-200/80"></div>
                                    <span className="absolute px-3 bg-white text-[10.5px] font-bold text-slate-400 uppercase tracking-widest">
                                        Or
                                    </span>
                                </div>
                                {/* ── Upload Section ── */}
                                <AnimatePresence mode="wait">
                                    {bulkResults.length > 0 ? (
                                        <motion.div
                                            key="bulk-success"
                                            initial={{ opacity: 0, scale: 0.97 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            exit={{ opacity: 0, scale: 0.97 }}
                                            transition={{ duration: 0.25 }}
                                            className="rounded-xl border border-blue-200 bg-blue-50/50 p-5"
                                        >
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center flex-shrink-0">
                                                    <CheckCircle2 className="w-5 h-5 text-blue-600" />
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <p className="text-[13px] font-bold text-blue-700">
                                                        {bulkResults.length} barcode{bulkResults.length !== 1 ? 's' : ''} loaded
                                                    </p>
                                                    <p className="text-[11px] text-blue-600/70 truncate">
                                                        from <span className="font-semibold">{bulkFileName}</span>
                                                    </p>
                                                </div>
                                                <button
                                                    className="text-[11px] font-semibold text-blue-600 hover:text-blue-800 bg-blue-100 hover:bg-blue-200 px-3 py-1.5 rounded-lg transition-colors flex-shrink-0"
                                                    onClick={() => { setBulkResults([]); setBulkFileName("") }}
                                                >
                                                    Clear
                                                </button>
                                            </div>
                                        </motion.div>
                                    ) : (
                                        <motion.div
                                            key="upload-options"
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                            transition={{ duration: 0.2 }}
                                        >
                                            {/* Dropzone */}
                                            <div
                                                className={cn(
                                                    "relative rounded-xl border-2 border-dashed transition-all duration-200 cursor-pointer",
                                                    "px-6 py-6",
                                                    isDragOver
                                                        ? "border-blue-400 bg-blue-50/60"
                                                        : "border-slate-200 bg-slate-50/40 hover:border-blue-300 hover:bg-blue-50/30"
                                                )}
                                                onDragOver={handleDragOver}
                                                onDragLeave={handleDragLeave}
                                                onDrop={handleDrop}
                                                onClick={() => document.getElementById('combined-upload')?.click()}
                                            >
                                                <div className="flex flex-col items-center gap-3">
                                                    <div className={cn(
                                                        "w-11 h-11 rounded-xl flex items-center justify-center transition-colors",
                                                        isDragOver ? "bg-blue-100 text-blue-600" : "bg-slate-100 text-slate-400"
                                                    )}>
                                                        <Upload className="w-5 h-5" />
                                                    </div>
                                                    <div className="text-center space-y-1.5">
                                                        <p className="text-[13.5px] font-semibold text-slate-700 leading-snug">
                                                            Drop file here or <span className="text-blue-600 hover:text-blue-700 transition-colors">browse</span>
                                                        </p>
                                                        <p className="text-[11.5px] text-slate-500 leading-relaxed">
                                                            Supports barcode images, CSV, or TXT files
                                                        </p>
                                                        <div className="flex items-center justify-center gap-2 pt-1">
                                                            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-blue-50 border border-blue-100">
                                                                <ImageIcon className="w-3 h-3 text-blue-600" />
                                                                <span className="text-[10px] font-semibold text-blue-700">Image</span>
                                                            </div>
                                                            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-blue-50 border border-blue-100">
                                                                <FileUp className="w-3 h-3 text-blue-600" />
                                                                <span className="text-[10px] font-semibold text-blue-700">Bulk CSV/TXT</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </CardContent>
                        </Card>
                    </FadeIn>
                </div>
                {/* RIGHT: Results (Col Span 6) */}
                <div className="lg:col-span-6">
                    <FadeIn delay={0.4} direction="left" className="h-full">
                        <div className="space-y-3">
                            {/* Unified Result Card — shows bulk OR single, never both */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
                            >
                                <Card className="relative overflow-hidden border border-slate-200/60 shadow-sm rounded-2xl bg-[#F5F8FD]">
                                    {/* ── Header ── */}
                                    <div className="flex justify-between items-center gap-4 px-6 pt-5 pb-1">
                                        <div className="flex items-center gap-2.5">
                                            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-blue-600/10 border border-blue-100/50 shadow-sm shadow-blue-500/5">
                                                <ClipboardList className="w-4 h-4 text-blue-600" />
                                            </div>
                                            <span className="text-[15px] sm:text-[16px] font-bold text-blue-700 leading-none">
                                                Results Panel
                                            </span>
                                        </div>
                                        {/* Badge: single valid/invalid OR bulk summary */}
                                        {bulkResults.length > 0 ? (
                                            <div className="flex items-center gap-1.5">
                                                <span className="text-[10.5px] font-bold text-emerald-700 bg-emerald-100/80 px-2.5 py-1.5 rounded-full">
                                                    {bulkResults.filter(r => r.result.isValid).length} Valid
                                                </span>
                                                <span className="text-[10.5px] font-bold text-red-700 bg-red-100/80 px-2.5 py-1.5 rounded-full">
                                                    {bulkResults.filter(r => !r.result.isValid).length} Invalid
                                                </span>
                                            </div>
                                        ) : result ? (
                                            <motion.div
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                transition={{ duration: 0.4, ease: "easeInOut" }}
                                                className={cn(
                                                    "flex items-center justify-center px-2.5 py-1.5 rounded-full border shrink-0 border-slate-200/50",
                                                    result.isValid
                                                        ? "bg-emerald-100/80 text-emerald-700"
                                                        : "bg-red-100/80 text-red-700"
                                                )}
                                            >
                                                {result.isValid ? (
                                                    <Check className="w-3.5 h-3.5" />
                                                ) : (
                                                    <X className="w-3.5 h-3.5" />
                                                )}
                                            </motion.div>
                                        ) : null}
                                    </div>

                                    <AnimatePresence mode="wait">
                                        {bulkResults.length > 0 ? (
                                            /* ═══════════ BULK STATE ═══════════ */
                                            <motion.div
                                                key="bulk-state"
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                exit={{ opacity: 0 }}
                                                transition={{ duration: 0.35, ease: "easeInOut" }}
                                                className="px-5 pb-5 pt-3 space-y-2 max-h-[520px] overflow-y-auto"
                                            >
                                                {bulkResults.map((item, idx) => (
                                                    <motion.div
                                                        key={idx}
                                                        initial={{ opacity: 0, y: 6 }}
                                                        animate={{ opacity: 1, y: 0 }}
                                                        transition={{ duration: 0.22, delay: idx * 0.025, ease: "easeOut" }}
                                                        className="bg-white border border-slate-200/70 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] rounded-xl p-3.5 flex items-center justify-between gap-3"
                                                    >
                                                        <div className="flex items-center gap-3 min-w-0">
                                                            {item.result.isValid
                                                                ? <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                                                                : <XCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
                                                            }
                                                            <div className="min-w-0">
                                                                <p className="text-sm font-bold text-slate-800 font-mono truncate">{item.code}</p>
                                                                <p className="text-[10px] text-slate-500">
                                                                    {item.result.format !== "Unknown" ? item.result.format : "Unknown format"}
                                                                    {item.result.isValid && ` · Check Digit: ${item.result.checkDigit}`}
                                                                </p>
                                                            </div>
                                                        </div>
                                                        <span className={cn(
                                                            "text-[10px] font-bold px-2.5 py-1 rounded-full flex-shrink-0",
                                                            item.result.isValid
                                                                ? "text-emerald-700 bg-emerald-50"
                                                                : "text-red-700 bg-red-50"
                                                        )}>
                                                            {item.result.isValid ? "Valid" : "Invalid"}
                                                        </span>
                                                    </motion.div>
                                                ))}
                                            </motion.div>
                                        ) : !result ? (
                                            /* ═══════════ EMPTY STATE ═══════════ */
                                            <motion.div
                                                key="empty-state"
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                exit={{ opacity: 0 }}
                                                transition={{ duration: 0.4, ease: "easeInOut" }}
                                                className="relative z-10 px-6 pb-6 pt-2"
                                            >
                                                <div className="relative">
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
                                                                    Validation Status
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
                                            /* ═══════════ RESULTS STATE ═══════════ */
                                            <motion.div
                                                key="results-state"
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                exit={{ opacity: 0 }}
                                                transition={{ duration: 0.55, ease: "easeInOut" }}
                                                className="flex flex-col"
                                            >
                                                {/* ── Primary Hero: Valid / Invalid ── */}
                                                <div className="px-5 pb-4">
                                                    <motion.div
                                                        initial={{ opacity: 0 }}
                                                        animate={{ opacity: 1 }}
                                                        transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
                                                        className="relative flex flex-col items-center text-center py-6 px-4 rounded-2xl bg-slate-50/70 border border-slate-100/80"
                                                    >


                                                        <motion.div
                                                            initial={{ opacity: 0 }}
                                                            animate={{ opacity: 1 }}
                                                            transition={{ duration: 0.5, delay: 0.15, ease: "easeOut" }}
                                                            className="flex items-baseline justify-center"
                                                        >
                                                            <span className={cn(
                                                                "text-[2.75rem] sm:text-[3.25rem] font-black tracking-tighter leading-none",
                                                                result.isValid ? "text-emerald-600" : "text-red-600"
                                                            )}>
                                                                {result.isValid ? "Valid" : "Invalid"}
                                                            </span>
                                                        </motion.div>

                                                        <motion.p
                                                            initial={{ opacity: 0 }}
                                                            animate={{ opacity: 1 }}
                                                            transition={{ duration: 0.3, delay: 0.2 }}
                                                            className="text-[12px] text-slate-500 font-medium max-w-[280px] mx-auto leading-relaxed mt-2.5"
                                                        >
                                                            {result.isValid
                                                                ? (
                                                                    result.format === "EAN-13"
                                                                        ? "Valid EAN-13 barcode. Check digit is correct."
                                                                        : `Valid ${result.format} barcode. Check digit is correct.`
                                                                )
                                                                : result.details.join(". ")}
                                                        </motion.p>
                                                    </motion.div>
                                                </div>

                                                {/* ── Validation Checks ── */}
                                                <div className="px-5 pb-5 space-y-2.5">
                                                    {/* Format Check */}
                                                    <motion.div
                                                        initial={{ opacity: 0, y: 8 }}
                                                        animate={{ opacity: 1, y: 0 }}
                                                        transition={{ duration: 0.3, delay: 0.12, ease: "easeOut" }}
                                                        className="bg-white border border-slate-200/70 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] rounded-xl p-4 transition-all duration-200 hover:border-slate-300 hover:shadow-[0_4px_12px_-4px_rgba(0,0,0,0.08)]"
                                                    >
                                                        <div className="flex items-center gap-2 mb-2">
                                                            {result.format !== "Unknown"
                                                                ? <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                                                                : <XCircle className="w-4 h-4 text-red-500 flex-shrink-0" />
                                                            }
                                                            <span className="text-[13px] font-bold text-slate-500">Barcode type</span>
                                                        </div>
                                                        <div className="pl-7 space-y-1.5">
                                                            {result.format !== "Unknown" ? (
                                                                <>
                                                                    <div className="flex items-center gap-1.5">
                                                                        <Check className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" />
                                                                        <span className="text-xs text-slate-600">
                                                                            Barcode type: <span className="font-bold text-slate-800">{result.format}</span>
                                                                        </span>
                                                                    </div>
                                                                </>
                                                            ) : (
                                                                <div className="flex items-center gap-1.5">
                                                                    <AlertTriangle className="w-3.5 h-3.5 text-red-500 flex-shrink-0" />
                                                                    <span className="text-xs text-slate-600">{result.message}</span>
                                                                </div>
                                                            )}
                                                        </div>
                                                    </motion.div>

                                                    {/* Check Digit Analysis */}
                                                    {result.format !== "Unknown" && (
                                                        <motion.div
                                                            initial={{ opacity: 0, y: 8 }}
                                                            animate={{ opacity: 1, y: 0 }}
                                                            transition={{ duration: 0.3, delay: 0.17, ease: "easeOut" }}
                                                            className="bg-white border border-slate-200/70 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] rounded-xl p-4 transition-all duration-200 hover:border-slate-300 hover:shadow-[0_4px_12px_-4px_rgba(0,0,0,0.08)]"
                                                        >
                                                            <div className="flex items-center gap-2 mb-2">
                                                                {result.isValid
                                                                    ? <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                                                                    : <XCircle className="w-4 h-4 text-red-500 flex-shrink-0" />
                                                                }
                                                                <span className="text-[13px] font-bold text-slate-500">Check Digit Analysis</span>
                                                            </div>
                                                            <div className="pl-7 space-y-1.5">
                                                                {result.isValid ? (
                                                                    <div className="flex items-center gap-1.5">
                                                                        <Check className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" />
                                                                        <span className="text-xs text-slate-600">
                                                                            Check digit is correct: <span className="font-bold text-slate-800">{result.checkDigit}</span>
                                                                        </span>
                                                                    </div>
                                                                ) : (
                                                                    <div className="flex items-center gap-1.5">
                                                                        <AlertTriangle className="w-3.5 h-3.5 text-red-500 flex-shrink-0" />
                                                                        <span className="text-xs text-slate-600">
                                                                            Entered check digit is <span className="font-bold text-slate-800">{result.checkDigit}</span>, expected <span className="font-bold text-slate-800">{result.expectedCheckDigit}</span>.
                                                                        </span>
                                                                    </div>
                                                                )}
                                                            </div>
                                                        </motion.div>
                                                    )}

                                                    {/* View Calculation Breakdown */}
                                                    {result.calculationSteps.length > 0 && (
                                                        <motion.div
                                                            initial={{ opacity: 0, y: 8 }}
                                                            animate={{ opacity: 1, y: 0 }}
                                                            transition={{ duration: 0.3, delay: 0.22, ease: "easeOut" }}
                                                            className="bg-white border border-slate-200/70 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] rounded-xl p-4 transition-all duration-200 hover:border-slate-300 hover:shadow-[0_4px_12px_-4px_rgba(0,0,0,0.08)]"
                                                        >
                                                            <Dialog>
                                                                <DialogTrigger asChild>
                                                                    <Button
                                                                        variant="ghost"
                                                                        className="w-full h-auto p-0 text-xs font-medium justify-between hover:bg-transparent"
                                                                    >
                                                                        <span className="flex items-center gap-2">
                                                                            <Calculator className="w-4 h-4 text-blue-500" />
                                                                            <span className="text-[13px] font-bold text-slate-500">View Calculation Breakdown</span>
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
                                                                        <Maximize2 className="w-3.5 h-3.5 text-slate-400" />
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
                                                                            <motion.div
                                                                                initial={{ height: 0 }}
                                                                                animate={{ height: "100%" }}
                                                                                transition={{ duration: 0.8, delay: 0.2 }}
                                                                                className={cn("absolute left-3 top-2 bottom-2 w-0.5", result.isValid ? "bg-emerald-100" : "bg-rose-100")}
                                                                            />
                                                                            {result.calculationSteps.map((step, idx) => (
                                                                                <motion.div
                                                                                    key={idx}
                                                                                    initial={{ opacity: 0, x: -10 }}
                                                                                    animate={{ opacity: 1, x: 0 }}
                                                                                    transition={{ duration: 0.4, delay: 0.1 + (idx * 0.1) }}
                                                                                    className="flex gap-4 relative"
                                                                                >
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
                                                                                </motion.div>
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
                                                        </motion.div>
                                                    )}
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </Card>
                            </motion.div>
                        </div>
                    </FadeIn>
                </div>
            </div>
        </FadeIn >
    )
}
