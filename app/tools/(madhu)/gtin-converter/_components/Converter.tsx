"use client"

import React, { useState, useEffect, useRef, useCallback } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import {
    Copy,
    RefreshCw,
    Barcode as BarcodeIcon,
    HelpCircle,
    Calculator,
    Info,
    CheckCircle2,
    XCircle,
    ArrowRightLeft,
    ClipboardCheck,
    Download,
    AlertTriangle,
    FileUp
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { FadeIn, ResultFeedbackCard } from "../../../_shared/components"
import { useBarcodeScanner } from "@/app/tools/_shared/hooks/useBarcodeScanner"
import bwipjs from 'bwip-js'
import Barcode from 'react-barcode'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

type BarcodeFormat = "UPC-A" | "EAN-13" | "GTIN-14" | "Unknown"

interface ConversionResult {
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
}

interface BarcodeConfig {
    title: string
    standard: string
    usage: string
    bwipId: string
    formatLabel: string
}

const BARCODE_CONFIGS: Record<string, BarcodeConfig> = {
    "UPC-A": {
        title: "Generated UPC-A Barcode",
        standard: "GS1 UPC-A (GTIN-12)",
        usage: "North American Retail (POS)",
        bwipId: "upca",
        formatLabel: "UPC-A (GTIN-12)"
    },
    "EAN-13": {
        title: "Generated EAN-13 Barcode",
        standard: "GS1 EAN-13 (GTIN-13)",
        usage: "Global Retail (POS)",
        bwipId: "ean13",
        formatLabel: "EAN-13 (GTIN-13)"
    },
    "GTIN-14": {
        title: "Generated ITF-14 Carton Barcode",
        standard: "GS1 ITF-14 (GTIN-14)",
        usage: "Carton & Logistics (Non-POS)",
        bwipId: "itf14",
        formatLabel: "GTIN-14 (ITF-14)"
    }
}

export function Converter() {
    const { toast } = useToast()
    const [inputCode, setInputCode] = useState("")
    const [status, setStatus] = useState<ValidationStatus>({ isValid: false, message: "Awaiting input...", format: "Unknown" })
    const [results, setResults] = useState<ConversionResult | null>(null)
    const [isMounted, setIsMounted] = useState(false)
    const [canvasError, setCanvasError] = useState(false)
    const canvasRef = useRef<HTMLCanvasElement>(null)

    useEffect(() => {
        setIsMounted(true)
    }, [])

    const calculateCheckDigit = (code: string) => {
        const digits = code.split('').map(Number)
        let sum = 0
        const reversed = [...digits].reverse()

        reversed.forEach((digit, i) => {
            const weight = (i % 2 === 0) ? 3 : 1
            sum += digit * weight
        })

        const nextTen = Math.ceil(sum / 10) * 10
        return (nextTen - sum) % 10
    }

    const validateAndConvert = useCallback((code: string) => {
        const clean = code.replace(/[\s-]/g, "")

        if (!clean) {
            setStatus({ isValid: false, message: "", format: "Unknown" })
            setResults(null)
            return
        }

        if (!/^\d+$/.test(clean)) {
            setStatus({ isValid: false, message: "Please enter numbers only (spaces and dashes are allowed)", format: "Unknown" })
            setResults(null)
            return
        }

        // Strict length validation for GTIN-12, 13, 14
        if (![12, 13, 14].includes(clean.length)) {
            const lengthError = (
                <div className="space-y-1 mt-1">
                    <p>Invalid length: {clean.length} digits entered.</p>
                    <p className="font-semibold text-xs opacity-90 mt-2">GTIN must contain exactly:</p>
                    <ul className="list-disc list-inside space-y-0.5 text-[11px] opacity-80 pl-1">
                        <li>12 digits (UPC-A)</li>
                        <li>13 digits (EAN-13)</li>
                        <li>14 digits (GTIN-14)</li>
                    </ul>
                </div>
            )
            setStatus({ isValid: false, message: lengthError, format: "Unknown" })
            setResults(null)
            return
        }

        const data = clean.slice(0, -1)
        const providedCD = parseInt(clean.slice(-1))
        const expectedCD = calculateCheckDigit(data)

        // Determine detected format
        let format: BarcodeFormat = "Unknown"
        if (clean.length === 12) format = "UPC-A"
        else if (clean.length === 13) format = "EAN-13"
        else if (clean.length === 14) format = "GTIN-14"

        if (providedCD !== expectedCD) {
            const corrected = data + expectedCD
            setStatus({
                isValid: false,
                message: `Invalid check digit.`,
                format: format, // Detected format by length, even if invalid check digit
                expectedCheckDigit: expectedCD,
                foundCheckDigit: providedCD,
                correctedCode: corrected
            })
            setResults(null)
            return
        }

        setStatus({ isValid: true, message: "Valid Format", format })

        // Generate conversions (all padded to 14, then sliced)
        const base14 = clean.padStart(14, "0")
        setResults({
            gtin12: base14.slice(-12),
            gtin13: base14.slice(-13),
            gtin14: base14,
        })
    }, [])

    useEffect(() => {
        validateAndConvert(inputCode)
    }, [inputCode, validateAndConvert])

    // Render Barcode Effect
    useEffect(() => {
        if (!status.isValid || !canvasRef.current || !results) return

        const config = BARCODE_CONFIGS[status.format]
        if (!config) return

        try {
            setCanvasError(false)
            // Determine text to encode based on detected format (NOT converted result)
            let textToEncode = ""
            if (status.format === "UPC-A") textToEncode = results.gtin12
            else if (status.format === "EAN-13") textToEncode = results.gtin13
            else if (status.format === "GTIN-14") textToEncode = results.gtin14

            let options: any = {
                bcid: config.bwipId,       // Barcode type
                text: textToEncode,        // Text to encode
                scale: 3,                  // 3x scaling factor
                height: 12,                // Bar height, in millimeters
                includetext: true,         // Show human-readable text
                textxalign: 'center',      // Always good to allow this
                textsize: 13,
            }

            // Specific options for ITF-14
            if (status.format === "GTIN-14") {
                options = {
                    ...options,
                    includecheck: true,
                    includecheckintext: true,
                    guardwhitespace: true,
                    borderwidth: 4, // create a thick border for bearer bars
                    bordertop: 10,
                    borderbottom: 10,
                    borderleft: 10, // Full box
                    borderright: 10,
                }
            }

            bwipjs.toCanvas(canvasRef.current, options)
        } catch (e) {
            console.error(e)
            setCanvasError(true)
        }
    }, [status, results])

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value
        // Basic filtering to allow digits, spaces and dashes
        if (/^[\d\s-]*$/.test(val)) {
            setInputCode(val)
        }
    }

    // useBarcodeScanner Hook
    const { handleFileUpload } = useBarcodeScanner({
        onScan: (decodedText) => {
            setInputCode(decodedText)
            // No need to call validateAndConvert here if it's triggered by inputCode change effect
        }
    })



    const copyToClipboard = (text: string, label: string) => {
        navigator.clipboard.writeText(text)
        toast({
            title: "Copied",
            description: `${label} copied to clipboard.`,
        })
    }

    const copyAll = () => {
        if (!results) return
        const text = `
GTIN-12 (UPC-A): ${results.gtin12}
GTIN-13 (EAN-13): ${results.gtin13}
GTIN-14: ${results.gtin14}
        `.trim()
        navigator.clipboard.writeText(text)
        toast({
            title: "Success",
            description: "All formats copied to clipboard.",
        })
    }

    const clearAll = () => {
        setInputCode("")
        toast({
            title: "Reset",
            description: "Input cleared.",
        })
    }

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

    const downloadBarcode = (format: 'png' | 'svg') => {
        // Implementation similar to previous step, using bwipjs for client side generation
        if (format === 'png' && canvasRef.current) {
            const dataUrl = canvasRef.current.toDataURL("image/png")
            const link = document.createElement('a')
            link.download = `barcode-${status.format}-${inputCode}.png`
            link.href = dataUrl
            link.click()
        } else if (format === 'svg') {
            try {
                const config = BARCODE_CONFIGS[status.format]
                let textToEncode = ""
                if (status.format === "UPC-A") textToEncode = results!.gtin12
                else if (status.format === "EAN-13") textToEncode = results!.gtin13
                else if (status.format === "GTIN-14") textToEncode = results!.gtin14

                let options: any = {
                    bcid: config.bwipId,
                    text: textToEncode,
                    scale: 3,
                    height: 12,
                    includetext: true,
                    textxalign: 'center',
                    textsize: 13,
                }
                if (status.format === "GTIN-14") {
                    options = {
                        ...options,
                        includecheck: true,
                        includecheckintext: true,
                        guardwhitespace: true,
                        borderwidth: 4,
                        bordertop: 10,
                        borderbottom: 10,
                        borderleft: 10,
                        borderright: 10,
                    }
                }

                // @ts-ignore
                const svg = bwipjs.toSVG(options)
                const blob = new Blob([svg], { type: "image/svg+xml" })
                const url = URL.createObjectURL(blob)
                const link = document.createElement('a')
                link.download = `barcode-${status.format}-${inputCode}.svg`
                link.href = url
                link.click()
                URL.revokeObjectURL(url)
            } catch (e) {
                toast({
                    variant: "destructive",
                    title: "Download Failed",
                    description: "Could not generate SVG."
                })
            }
        }
    }

    return (
        <FadeIn className="w-full max-w-6xl mx-auto py-8" duration={0.6}>
            {/* Hidden file input for upload */}
            <input
                type="file"
                id="gtin-barcode-upload"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                    // Create placeholder if missing (same fix as UPC tool)
                    if (!document.getElementById("file-reader-placeholder-hook")) {
                        const div = document.createElement("div");
                        div.id = "file-reader-placeholder-hook";
                        div.style.display = "none";
                        document.body.appendChild(div);
                    }
                    handleFileUpload(e);
                }}
            />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">

                {/* LEFT: Inputs */}
                <div className="lg:col-span-6">
                    <Card className="border border-slate-200 shadow-sm bg-white h-full flex flex-col overflow-hidden">
                        <CardHeader className="pb-4 bg-slate-50/30 border-b border-slate-100 flex flex-row items-center justify-between space-y-0">
                            <div>
                                <div className="flex items-center gap-2">
                                    <CardTitle className="text-2xl font-bold text-blue-600">
                                        Converter Inputs
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
                                <CardDescription>Enter your barcode number or upload an image below..</CardDescription>
                            </div>
                        </CardHeader>
                        <CardContent className="space-y-6 pt-6">
                            <div className="space-y-2">
                                <div className="flex justify-between items-center text-sm font-bold text-slate-600">
                                    <Label htmlFor="gtin-input">Barcode Number</Label>
                                    <span className="text-xs font-mono opacity-50 uppercase">GTIN / UPC / EAN</span>
                                </div>
                                <Input
                                    id="gtin-input"
                                    placeholder="Ex: 036000291452"
                                    value={inputCode}
                                    onChange={handleInputChange}
                                    className="h-14 text-xl font-bold focus-visible:ring-primary shadow-sm bg-white placeholder:text-slate-300 placeholder:font-normal placeholder:italic"
                                    autoComplete="off"
                                />

                                {/* Scan Controls */}
                                <div className="pt-2">
                                    <Button
                                        variant="secondary"
                                        className="h-10 w-full text-xs font-bold border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-700"
                                        onClick={() => document.getElementById('gtin-barcode-upload')?.click()}
                                    >
                                        <div className="flex items-center">
                                            <FileUp className="w-4 h-4 mr-2 text-blue-500" />
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
                                    onClick={copyAll}
                                    variant="outline"
                                    disabled={!status.isValid}
                                    className="flex-1 h-11 px-6 shadow-sm border-slate-300 hover:bg-slate-50 transition-all font-bold text-slate-950 disabled:opacity-30"
                                >
                                    <Copy className="w-4 h-4 mr-2" /> Copy Results
                                </Button>
                            </div>

                            {/* Status Card */}
                            {inputCode && (
                                <div
                                    id="status-message"
                                    className={`p-4 rounded-xl border flex flex-col gap-3 transition-colors ${status.isValid
                                        ? 'bg-emerald-50/50 border-emerald-100'
                                        : 'bg-rose-50/50 border-rose-100'
                                        }`}
                                >
                                    <div className="flex items-start gap-3">
                                        <div className={`mt-1 ${status.isValid ? 'text-emerald-500' : 'text-rose-500'}`}>
                                            {status.isValid ? <CheckCircle2 className="w-5 h-5" /> : <XCircle className="w-5 h-5" />}
                                        </div>
                                        <div className="w-full">
                                            <p className={`text-sm font-bold ${status.isValid ? 'text-emerald-700' : 'text-rose-700'}`}>
                                                {status.isValid
                                                    ? "Valid GTIN"
                                                    : status.correctedCode
                                                        ? "Check Digit Invalid"
                                                        : "Invalid GTIN"
                                                }
                                            </p>

                                            {/* Valid State Details */}
                                            {status.isValid && (
                                                <div className="space-y-1 mt-1">
                                                    <p className="text-emerald-600 text-xs font-medium">
                                                        Detected Type: {status.format === "UPC-A" ? "GTIN-12" : status.format === "EAN-13" ? "GTIN-13" : "GTIN-14"}
                                                    </p>
                                                    <p className="text-emerald-600/80 text-xs">
                                                        Barcode Format: {status.format === "GTIN-14" ? "ITF-14" : status.format}
                                                    </p>
                                                </div>
                                            )}

                                            {/* Invalid Check Digit Details - Use Corrected Code Button */}
                                            {!status.isValid && status.correctedCode && (
                                                <div className="space-y-3 mt-2">
                                                    <p className="text-xs text-rose-600 leading-relaxed font-medium">
                                                        The check digit (last number) is incorrect. Based on the GS1 algorithm, it should be <span className="font-bold underline text-rose-700">{status.expectedCheckDigit}</span>, but you entered <span className="font-bold">{status.foundCheckDigit}</span>.
                                                    </p>
                                                    <Button
                                                        size="sm"
                                                        variant="outline"
                                                        className="h-9 text-[11px] font-bold bg-white text-rose-600 border-rose-200 hover:bg-rose-50 hover:text-rose-700 w-full shadow-sm"
                                                        onClick={() => setInputCode(status.correctedCode!)}
                                                    >
                                                        <RefreshCw className="w-3 h-3 mr-1.5" /> Use Corrected Code: {status.correctedCode}
                                                    </Button>
                                                </div>
                                            )}

                                            {/* General Error Message */}
                                            {!status.isValid && !status.correctedCode && (
                                                <div className="text-xs text-rose-600 mt-1">
                                                    {status.message}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>

                {/* RIGHT: Results */}
                <div className="lg:col-span-6">
                    <div className="space-y-6 flex flex-col h-full">
                        {/* Summary Visualization Card */}
                        <ResultFeedbackCard
                            variant={inputCode && !status.isValid ? "warning" : "default"}
                            title={inputCode && !status.isValid ? 'Validation Status' : 'Conversion Map'}
                            titleLabel={!inputCode ? "Ready" : status.isValid ? "Valid" : "Invalid"}
                            // If invalid, show large text here. If valid, show nothing in mainValue and use children.
                            mainValue={inputCode && !status.isValid ? (
                                <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
                                    <div className="flex items-baseline gap-3">
                                        <span className="text-3xl sm:text-4xl font-bold tracking-tight text-red-100 break-all">
                                            {inputCode}
                                        </span>
                                    </div>
                                </div>
                            ) : undefined}
                        >
                            {/* Validation Analysis or Results List */}
                            {inputCode && !status.isValid ? (
                                // INVALID STATE SUB-CONTENT
                                <div className="space-y-3 mt-2">
                                    <div className="flex justify-between items-center text-sm text-red-200/80">
                                        <span>Analysis</span>
                                        <span className="font-medium text-white text-right font-mono">
                                            {status.correctedCode
                                                ? "Check Digit Invalid"
                                                : typeof status.message === 'string' && status.message.includes("numeric")
                                                    ? "Invalid Characters"
                                                    : "Incorrect Length"
                                            }
                                        </span>
                                    </div>
                                </div>
                            ) : (
                                // VALID OR EMPTY STATE - Custom Result Rows
                                <div className="space-y-4">
                                    <ResultRow
                                        label="GTIN-14"
                                        value={results?.gtin14 || "00000000000000"}
                                        onCopy={() => results && copyToClipboard(results.gtin14, "GTIN-14")}
                                        disabled={!results}
                                        tooltip="Used for shipping cases and outer packaging containing multiple units of the same product. Global Trade Item Number (GTIN)"
                                    />
                                    <ResultRow
                                        label="GTIN-13 (EAN)"
                                        value={results?.gtin13 || "0000000000000"}
                                        onCopy={() => results && copyToClipboard(results.gtin13, "GTIN-13")}
                                        disabled={!results}
                                        tooltip="Global standard for individual product identification, required for international marketplaces. European Article Number (EAN)"
                                    />
                                    <ResultRow
                                        label="GTIN-12 (UPC)"
                                        value={results?.gtin12 || "000000000000"}
                                        onCopy={() => results && copyToClipboard(results.gtin12, "GTIN-12")}
                                        disabled={!results}
                                        tooltip="Standard product barcode for North America (US and Canada retail). Universal Product Code (UPC)"
                                    />
                                </div>
                            )}
                        </ResultFeedbackCard>

                        {/* Barcode Preview */}
                        <Card className="bg-white border border-slate-200 shadow-sm p-4 sm:p-6 flex flex-col items-center justify-center min-h-[160px] flex-1 transition-all duration-300 overflow-hidden">
                            {results && status.isValid && isMounted ? (
                                <div className="flex flex-col items-center w-full animate-in fade-in zoom-in-95 duration-200 fill-mode-forwards">
                                    <h3 className="text-base font-bold text-slate-900 mb-2">{BARCODE_CONFIGS[status.format].title}</h3>

                                    <div className="p-4 bg-white rounded-lg border border-slate-100 shadow-sm w-full flex justify-center overflow-hidden mb-4">
                                        <canvas ref={canvasRef} className="max-w-full h-[80px] sm:h-[100px] w-auto" />
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
                                                {!inputCode ? "Enter a barcode to preview" : "Check code length and structure"}
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
                </div>
            </div>
        </FadeIn >
    )
}

function ResultRow({ label, value, onCopy, disabled, tooltip }: { label: string, value: string, onCopy: () => void, disabled: boolean, tooltip?: string }) {
    return (
        <div className="flex items-center justify-between group py-1">
            <div className="space-y-0.5">
                <TooltipProvider delayDuration={100}>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <div className="flex items-center gap-1.5 cursor-help group/label">
                                <p className="text-base font-bold text-slate-400 uppercase tracking-widest transition-colors group-hover/label:text-slate-300">{label}</p>
                                {tooltip && <Info className="w-3.5 h-3.5 text-blue-300 opacity-80 group-hover/label:opacity-100 group-hover/label:text-blue-200 transition-all" />}
                            </div>
                        </TooltipTrigger>
                        {tooltip && (
                            <TooltipContent side="right" className="text-xs bg-slate-900 text-white border-slate-800 max-w-xs">
                                {tooltip}
                            </TooltipContent>
                        )}
                    </Tooltip>
                </TooltipProvider>
                <p className="text-xl sm:text-2xl font-bold tracking-tight text-white">{value}</p>
            </div>
            <Button
                size="icon"
                variant="ghost"
                onClick={onCopy}
                disabled={disabled}
                className="text-slate-400 hover:text-white hover:bg-white/10 opacity-0 group-hover:opacity-100 transition-all h-8 w-8"
            >
                <ClipboardCheck className="w-4 h-4" />
            </Button>
        </div>
    )
}
