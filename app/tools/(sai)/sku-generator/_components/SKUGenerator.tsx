"use client"

import React, { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Copy, Check, Hash, Tag, Layers, Palette, Maximize2, Settings2, ChevronDown, ChevronUp, Plus, Download, Trash2, List, HelpCircle } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"
import { toast } from "sonner"
import { CalculatorCardHeader, CalculatorInput, FadeIn, ResultFeedbackCard } from "@/app/tools/_shared/components"

interface SKUEntry {
    id: string
    productName: string
    brand: string
    category: string
    color: string
    size: string
    sku: string
}

export function SKUGenerator() {
    // Component States
    const [brand, setBrand] = useState("")
    const [category, setCategory] = useState("")
    const [product, setProduct] = useState("")
    const [attribute1, setAttribute1] = useState("")
    const [attribute2, setAttribute2] = useState("")
    const [sequentialStart, setSequentialStart] = useState("001")
    const [charLimit, setCharLimit] = useState("3")
    const [separator, setSeparator] = useState("-")
    const [caseType, setCaseType] = useState("uppercase")
    const [generatedSKU, setGeneratedSKU] = useState("")
    const [copied, setCopied] = useState(false)
    const [isAdvancedOpen, setIsAdvancedOpen] = useState(false)
    const [entries, setEntries] = useState<SKUEntry[]>([])

    // Handle SKU generation logic (pulling X characters from each part)
    useEffect(() => {
        const limit = parseInt(charLimit) || 3
        const parts = [brand, category, product, attribute1, attribute2]
            .map(p => p.trim().substring(0, limit))
            .filter(p => p !== "")

        if (sequentialStart) {
            parts.push(sequentialStart)
        }

        const sep = separator === "none" ? "" : separator
        let sku = parts.join(sep)

        if (caseType === "uppercase") {
            sku = sku.toUpperCase()
        } else if (caseType === "lowercase") {
            sku = sku.toLowerCase()
        }

        setGeneratedSKU(sku)
    }, [brand, category, product, attribute1, attribute2, sequentialStart, separator, caseType, charLimit])

    const copyToClipboard = () => {
        if (!generatedSKU) return
        navigator.clipboard.writeText(generatedSKU)
        setCopied(true)
        toast.success("SKU copied to clipboard!")
        setTimeout(() => setCopied(false), 2000)
    }

    const resetFields = () => {
        setBrand("")
        setCategory("")
        setProduct("")
        setAttribute1("")
        setAttribute2("")
        setSequentialStart("001")
        setSeparator("-")
        setCaseType("uppercase")
        setCharLimit("3")
    }

    const addItemToList = (retain: boolean = false) => {
        if (!generatedSKU) {
            toast.error("Please enter item information first")
            return
        }

        const newEntry: SKUEntry = {
            id: Math.random().toString(36).substr(2, 9),
            productName: product || "Unnamed Product",
            brand,
            category,
            color: attribute1,
            size: attribute2,
            sku: generatedSKU
        }

        setEntries([newEntry, ...entries])
        toast.success("Item added to list")

        if (!retain) {
            setProduct("")
            setAttribute1("")
            setAttribute2("")
            // Increment sequence
            const seq = parseInt(sequentialStart)
            if (!isNaN(seq)) {
                setSequentialStart((seq + 1).toString().padStart(sequentialStart.length, '0'))
            }
        }
    }

    const removeEntry = (id: string) => {
        setEntries(entries.filter(e => e.id !== id))
    }

    const downloadCSV = () => {
        if (entries.length === 0) return

        const headers = ["Product Name", "Brand", "Category", "Color", "Size", "SKU"]
        const data = entries.map(e => [
            `"${e.productName}"`,
            `"${e.brand}"`,
            `"${e.category}"`,
            `"${e.color}"`,
            `"${e.size}"`,
            `"${e.sku}"`
        ].join(","))

        const csvContent = [headers.join(","), ...data].join("\n")
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
        const url = URL.createObjectURL(blob)
        const link = document.createElement("a")
        link.setAttribute("href", url)
        link.setAttribute("download", `skus_${new Date().toISOString().split('T')[0]}.csv`)
        link.style.visibility = 'hidden'
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
    }
    return (
        <FadeIn className="w-full max-w-6xl mx-auto py-8 px-4" duration={0.6}>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

                {/* Inputs Section */}
                <div className="lg:col-span-7 space-y-6">
                    <Card className="border border-slate-200 shadow-sm bg-white">
                        <CalculatorCardHeader

                            description="Enter the data to build your SKU structure."

                            onReset={resetFields}

                            guideId="sku-guide"

                        />
                        <CardContent className="space-y-5 pt-6">
                            <SKUInput
                                label="Brand Prefix"
                                value={brand}
                                onChange={setBrand}
                                placeholder="NIKE"
                                icon={Tag}
                                tooltip="A short code for the brand name (e.g., NK for Nike)."
                            />
                            <SKUInput
                                label="Category"
                                value={category}
                                onChange={setCategory}
                                placeholder="SHO"
                                icon={Layers}
                                tooltip="A code for the product category (e.g., SHO for Shoes)."
                            />
                            <SKUInput
                                label="Product Name"
                                value={product}
                                onChange={setProduct}
                                placeholder="AF1"
                                icon={Maximize2}
                                tooltip="A short identifier for the model (e.g., AF1 for Air Force 1)."
                            />

                            <div className="grid grid-cols-2 gap-4 pt-2">
                                <Button
                                    onClick={() => addItemToList(false)}
                                    className="bg-blue-600 hover:bg-blue-700 h-12 font-bold"
                                >
                                    <Plus className="w-4 h-4 mr-2" />
                                    Add Item to List
                                </Button>
                                <Button
                                    variant="outline"
                                    onClick={() => addItemToList(true)}
                                    className="border-blue-200 text-blue-600 hover:bg-blue-50 h-12 font-bold"
                                >
                                    Add & Retain
                                </Button>
                            </div>

                            {/* Advanced Settings Toggle */}
                            <div className="pt-2">
                                <button
                                    onClick={() => setIsAdvancedOpen(!isAdvancedOpen)}
                                    className={cn(
                                        "w-full flex items-center justify-between p-4 rounded-xl border border-slate-100 transition-all duration-300 group",
                                        isAdvancedOpen ? "bg-slate-50 shadow-sm border-blue-100" : "bg-white hover:bg-slate-50/50"
                                    )}
                                >
                                    <div className="flex items-center gap-2.5">
                                        <div className={cn(
                                            "w-8 h-8 rounded-lg flex items-center justify-center transition-colors",
                                            isAdvancedOpen ? "bg-blue-600 text-white" : "bg-slate-100 text-slate-500"
                                        )}>
                                            <Settings2 className="w-4 h-4" />
                                        </div>
                                        <div className="text-left">
                                            <p className="text-sm font-bold text-slate-800">Advanced Settings</p>
                                            <p className="text-[10px] text-slate-500 font-medium">Extra attributes & formatting</p>
                                        </div>
                                    </div>
                                    {isAdvancedOpen ? (
                                        <ChevronUp className="w-5 h-5 text-blue-500" />
                                    ) : (
                                        <ChevronDown className="w-5 h-5 text-slate-400 group-hover:text-slate-600" />
                                    )}
                                </button>
                            </div>

                            {/* Collapsible Advanced Content */}
                            <AnimatePresence>
                                {isAdvancedOpen && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.3, ease: "easeInOut" }}
                                        className="overflow-hidden"
                                    >
                                        <div className="pt-6 pb-2 px-1 space-y-5">
                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                                <SKUInput
                                                    label="Color Part"
                                                    value={attribute1}
                                                    onChange={setAttribute1}
                                                    placeholder="WHT"
                                                    icon={Palette}
                                                    tooltip="Color code (e.g., WHT for White)."
                                                />
                                                <SKUInput
                                                    label="Size Part"
                                                    value={attribute2}
                                                    onChange={setAttribute2}
                                                    placeholder="10"
                                                    icon={Maximize2}
                                                    tooltip="Size identifier (e.g., 10 for Size 10)."
                                                />
                                            </div>

                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                                <div className="flex items-center justify-between gap-4">
                                                    <span className="text-sm font-semibold text-slate-700">Char Pull Count</span>
                                                    <Input
                                                        type="number"
                                                        value={charLimit}
                                                        onChange={(e) => setCharLimit(e.target.value)}
                                                        className="w-32 bg-white border-slate-200 h-10 text-right font-medium"
                                                        min="1"
                                                        max="10"
                                                    />
                                                </div>
                                                <SKUInput
                                                    label="Sequential #"
                                                    value={sequentialStart}
                                                    onChange={setSequentialStart}
                                                    placeholder="001"
                                                    icon={Hash}
                                                    tooltip="Unique numeric identifier."
                                                />
                                            </div>

                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                                <div className="flex items-center justify-between gap-4">
                                                    <span className="text-sm font-semibold text-slate-700">Separator</span>
                                                    <Select value={separator} onValueChange={setSeparator}>
                                                        <SelectTrigger className="w-32 bg-white border-slate-200 h-10">
                                                            <SelectValue placeholder="Select" />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            <SelectItem value="-">Dash (-)</SelectItem>
                                                            <SelectItem value="_">Underscore (_)</SelectItem>
                                                            <SelectItem value="none">None</SelectItem>
                                                            <SelectItem value=".">Dot (.)</SelectItem>
                                                        </SelectContent>
                                                    </Select>
                                                </div>
                                                <div className="flex items-center justify-between gap-4">
                                                    <span className="text-sm font-semibold text-slate-700">Letter Case</span>
                                                    <Select value={caseType} onValueChange={setCaseType}>
                                                        <SelectTrigger className="w-32 bg-white border-slate-200 h-10">
                                                            <SelectValue placeholder="Select" />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            <SelectItem value="uppercase">UPPER</SelectItem>
                                                            <SelectItem value="lowercase">lower</SelectItem>
                                                            <SelectItem value="original">Original</SelectItem>
                                                        </SelectContent>
                                                    </Select>
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </CardContent>
                    </Card>
                </div>

                {/* Results Section */}
                <div className="lg:col-span-5 space-y-6">
                    <ResultFeedbackCard
                        title="Generated SKU"
                        mainValue={
                            <div className="font-mono font-bold tracking-[0.2em] break-all text-center leading-tight">
                                {generatedSKU || "---"}
                            </div>
                        }
                    >
                        <div className="grid grid-cols-2 gap-3 w-full">
                            <Button
                                onClick={copyToClipboard}
                                disabled={!generatedSKU}
                                className={cn(
                                    "py-6 text-sm font-bold transition-all duration-300",
                                    copied ? "bg-blue-500 hover:bg-blue-600" : "bg-slate-800 hover:bg-slate-900"
                                )}
                            >
                                {copied ? <Check className="w-4 h-4 mr-2" /> : <Copy className="w-4 h-4 mr-2" />}
                                {copied ? 'Copied' : 'Copy'}
                            </Button>
                            <Button
                                onClick={() => addItemToList(false)}
                                disabled={!generatedSKU}
                                className="py-6 text-sm font-bold bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-500/20"
                            >
                                <Plus className="w-4 h-4 mr-2" />
                                Add to List
                            </Button>
                        </div>
                    </ResultFeedbackCard>

                    <Card className="border border-slate-200 shadow-sm bg-white overflow-hidden">
                        <CardHeader className="pb-4 border-b border-slate-50 flex flex-row items-center justify-between space-y-0">
                            <div className="space-y-1">
                                <CardTitle className="text-lg font-bold flex items-center gap-2">
                                    <List className="w-5 h-5 text-blue-600" />
                                    Live Preview ({entries.length})
                                </CardTitle>
                                <CardDescription>Your generated SKU list.</CardDescription>
                            </div>
                            {entries.length > 0 && (
                                <Button
                                    size="sm"
                                    onClick={downloadCSV}
                                    className="bg-blue-600 hover:bg-blue-700 text-white"
                                >
                                    <Download className="w-4 h-4 mr-2" />
                                    CSV
                                </Button>
                            )}
                        </CardHeader>
                        <CardContent className="p-0">
                            <div className="overflow-x-auto">
                                <table className="w-full text-sm text-left">
                                    <thead className="text-xs uppercase bg-slate-50 text-slate-500 font-bold border-b border-slate-100">
                                        <tr>
                                            <th className="px-4 py-3">Item</th>
                                            <th className="px-4 py-3">SKU</th>
                                            <th className="px-4 py-3 text-right">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-100">
                                        {entries.length === 0 ? (
                                            <tr>
                                                <td colSpan={3} className="px-4 py-8 text-center text-slate-400 italic">
                                                    No items added yet. Fill the form to add items.
                                                </td>
                                            </tr>
                                        ) : (
                                            entries.map((entry) => (
                                                <tr key={entry.id} className="hover:bg-slate-50 transition-colors">
                                                    <td className="px-4 py-3">
                                                        <div className="font-medium text-slate-800">{entry.productName}</div>
                                                        <div className="text-[10px] text-slate-400 truncate max-w-[100px]">
                                                            {entry.brand}/{entry.category}
                                                        </div>
                                                    </td>
                                                    <td className="px-4 py-3 font-mono font-bold text-blue-600 uppercase">
                                                        {entry.sku}
                                                    </td>
                                                    <td className="px-4 py-3 text-right">
                                                        <Button
                                                            variant="ghost"
                                                            size="icon"
                                                            onClick={() => removeEntry(entry.id)}
                                                            className="text-slate-300 hover:text-red-600 h-8 w-8"
                                                        >
                                                            <Trash2 className="w-4 h-4" />
                                                        </Button>
                                                    </td>
                                                </tr>
                                            ))
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </FadeIn>
    )
}

interface SKUInputProps {
    label: string
    value: string
    onChange: (value: string) => void
    placeholder: string
    icon: any
    tooltip?: string
}

function SKUInput({ label, value, onChange, placeholder, icon: Icon, tooltip }: SKUInputProps) {
    return (
        <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-2">
                <Label className="text-sm font-semibold text-slate-700 whitespace-nowrap">{label}</Label>
                {tooltip && (
                    <TooltipProvider delayDuration={100}>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <button type="button" className="text-slate-400 hover:text-blue-600 transition-colors">
                                    <HelpCircle className="h-3.5 w-3.5" />
                                </button>
                            </TooltipTrigger>
                            <TooltipContent side="top" className="max-w-xs text-xs bg-slate-900 text-white p-2 rounded-lg">
                                {tooltip}
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                )}
            </div>
            <div className="relative w-40 sm:w-48">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                    <Icon className="w-3.5 h-3.5" />
                </div>
                <Input
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    placeholder={placeholder}
                    className="pl-9 h-10 bg-white border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/5 transition-all uppercase text-right font-medium placeholder:italic placeholder:text-slate-300"
                />
            </div>
        </div>
    )
}
