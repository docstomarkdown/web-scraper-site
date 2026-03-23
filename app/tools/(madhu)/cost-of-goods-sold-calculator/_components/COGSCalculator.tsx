"use client"

import React, { useState, useMemo } from "react"
import {
    Package,
    Truck,
    Calculator,
    PieChart,
    ChevronDown,
    ClipboardList,
    CheckCircle2,
    DollarSign
} from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"
import {
    CalculatorCardHeader,
    CalculatorInput,
    FadeIn
} from "@/app/tools/_shared/components"
import { Card, CardContent } from "@/components/ui/card"
import { currencies, formatCurrencyValue } from "@/app/tools/_shared/components/CurrencyCombobox"

interface COGSState {
    productCost: string | number
    quantity: string | number
    shippingCost: string | number
    packaging: string | number
    fulfillmentFee: string | number
}

const DEFAULT_STATE: COGSState = {
    productCost: "",
    quantity: "",
    shippingCost: "",
    packaging: "",
    fulfillmentFee: ""
}

export function COGSCalculator() {
    const [values, setValues] = useState<COGSState>(DEFAULT_STATE)
    const [currency, setCurrency] = useState("USD")
    const [showBreakdown, setShowBreakdown] = useState(false)

    const handleInputChange = (field: keyof COGSState, value: string | number) => {
        setValues(prev => ({ ...prev, [field]: value === "" ? "" : value.toString() }))
    }

    const hasInputs = useMemo(() => {
        const mandatoryFields = [
            values.productCost,
            values.quantity,
            values.shippingCost,
            values.packaging,
            values.fulfillmentFee
        ]
        return mandatoryFields.every(val => val !== "" && val !== null && val !== undefined)
    }, [values])

    const selectedCurrency = useMemo(() =>
        currencies.find(c => c.code === currency) || currencies[0]
        , [currency])

    const results = useMemo(() => {
        const product = Number(values.productCost) || 0
        const qty = Number(values.quantity) || 0
        const shipping = Number(values.shippingCost) || 0
        const pkg = Number(values.packaging) || 0
        const fulfillment = Number(values.fulfillmentFee) || 0

        const cogsPerUnit = product + shipping + pkg + fulfillment
        const totalCogs = cogsPerUnit * qty

        return { 
            cogsPerUnit, 
            totalCogs, 
            qty,
            breakdown: {
                productTotal: product * qty,
                shippingTotal: shipping * qty,
                packagingTotal: pkg * qty,
                fulfillmentTotal: fulfillment * qty,
            }
        }
    }, [values])

    const handleReset = () => {
        setValues(DEFAULT_STATE)
        setShowBreakdown(false)
    }

    return (
        <FadeIn className="w-full max-w-6xl mx-auto py-8 px-4" duration={0.6}>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                {/* Left Column: Inputs */}
                <div className="lg:col-span-7 space-y-3 lg:sticky lg:top-28">
                    <Card className="border border-slate-200 shadow-sm bg-white overflow-hidden h-full flex flex-col rounded-3xl">
                        <CalculatorCardHeader
                            title="COGS Calculator"
                            description="Calculate your Total Cost of Goods Sold and understand your unit economics."
                            onReset={handleReset}
                            currency={currency}
                            onCurrencyChange={setCurrency}
                        />
                        <CardContent className="p-6 md:p-8 pb-12 md:pb-16 flex-1 flex flex-col">

                            {/* Section 1: Product Details */}
                            <CalculatorInput
                                label="Product Cost"
                                value={values.productCost}
                                onChange={(v) => handleInputChange('productCost', v)}
                                placeholder="15.00"
                                prefix={selectedCurrency.symbol}
                                tooltip="Cost per unit from supplier"
                                groupingTitle="Product & Quantity"
                                groupingIcon={Package}
                                hideSeparator
                            />
                            <CalculatorInput
                                label="Quantity"
                                value={values.quantity}
                                onChange={(v) => handleInputChange('quantity', v)}
                                placeholder="100"
                                tooltip="Total number of units"
                            />

                            {/* Section 2: Additional Costs */}
                            <CalculatorInput
                                label="Shipping Cost"
                                value={values.shippingCost}
                                onChange={(v) => handleInputChange('shippingCost', v)}
                                placeholder="4.50"
                                prefix={selectedCurrency.symbol}
                                tooltip="Total freight and shipping costs to get goods to you and out to customers (per unit)"
                                groupingTitle="Logistics & Fulfillment"
                                groupingIcon={Truck}
                            />
                            <CalculatorInput
                                label="Packaging"
                                value={values.packaging}
                                onChange={(v) => handleInputChange('packaging', v)}
                                placeholder="0.75"
                                prefix={selectedCurrency.symbol}
                                tooltip="Cost of packaging, polybags, labels, etc. (per unit)"
                            />
                            <CalculatorInput
                                label="Fulfillment"
                                value={values.fulfillmentFee}
                                onChange={(v) => handleInputChange('fulfillmentFee', v)}
                                placeholder="3.50"
                                prefix={selectedCurrency.symbol}
                                tooltip="Cost to pick, pack, and process orders, such as FBA fees (per unit)"
                            />

                        </CardContent>
                    </Card>
                </div>

                {/* Right Column: Results */}
                <div className="lg:col-span-5 flex flex-col gap-3">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
                        className="flex flex-col gap-3"
                    >
                        <Card className="relative overflow-hidden border border-slate-200/60 shadow-sm rounded-2xl bg-[#F5F8FD] flex flex-col">
                            {/* Header */}
                            <div className="flex justify-between items-center gap-4 px-6 pt-5 pb-1">
                                <div className="flex items-center gap-2.5">
                                    <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-blue-600/10 border border-blue-100/50">
                                        <ClipboardList className="w-4 h-4 text-blue-600" />
                                    </div>
                                    <span className="text-[15px] sm:text-[16px] font-bold text-blue-700 leading-none">
                                        Results Panel
                                    </span>
                                </div>
                                <AnimatePresence mode="wait">
                                    {hasInputs ? (
                                        <motion.div
                                            key="live"
                                            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                                            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-slate-200/50 bg-emerald-100/50 text-[10.5px] font-bold text-emerald-700"
                                        >
                                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse inline-block" />
                                            Live
                                        </motion.div>
                                    ) : (
                                        <motion.div
                                            key="idle"
                                            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                                            className="text-[10.5px] font-bold text-slate-400 px-2"
                                        >
                                            Awaiting input
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>

                            <AnimatePresence mode="wait">
                                {!hasInputs ? (
                                    /* ── EMPTY STATE ── */
                                    <motion.div
                                        key="empty"
                                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                                        transition={{ duration: 0.4, ease: "easeInOut" }}
                                        className="relative z-10 px-6 pb-6 pt-2"
                                    >
                                        <div className="relative">
                                            <div className="absolute inset-0 z-30 flex items-center justify-center pointer-events-none">
                                                <motion.div
                                                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.55, ease: "easeOut" }}
                                                    className="bg-white/80 backdrop-blur-xl border border-white/60 shadow-[0_8px_40px_rgba(59,130,246,0.12)] rounded-2xl px-6 py-5 flex flex-col items-center gap-3 w-fit max-w-[320px] pointer-events-auto"
                                                >
                                                    <div className="relative flex items-center justify-center">
                                                        <span className="absolute w-11 h-11 rounded-xl bg-blue-400/15 animate-ping" style={{ animationDuration: "2.8s" }} />
                                                        <div className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200/60 flex items-center justify-center text-blue-500 shadow-sm">
                                                            <Calculator className="w-[18px] h-[18px]" />
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
                                                            COGS Analysis
                                                        </span>
                                                    </div>
                                                </motion.div>
                                            </div>

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
                                    /* ── RESULTS STATE ── */
                                    <motion.div
                                        key="results"
                                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                                        transition={{ duration: 0.45, ease: "easeInOut" }}
                                        className="flex flex-col gap-3 px-5 pb-5 pt-2"
                                    >
                                        <motion.div
                                            initial={{ opacity: 0, scale: 0.97 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            transition={{ duration: 0.4, delay: 0.05 }}
                                            className="relative flex flex-col items-center text-center py-6 px-4 bg-transparent"
                                        >
                                            <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.18em] leading-none mb-2">Total COGS</span>
                                            <span className="text-[3.25rem] font-black text-blue-600 tracking-tighter leading-none">
                                                {formatCurrencyValue(results.totalCogs, currency)}
                                            </span>
                                            <p className="text-[11.5px] text-slate-500 font-medium mt-3">
                                                Your comprehensive total Cost of Goods Sold.
                                            </p>
                                        </motion.div>

                                        {/* Secondary Result Cards */}
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                            <motion.div
                                                initial={{ opacity: 0, y: 8 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ duration: 0.35, delay: 0.1 }}
                                                className="bg-white border border-slate-200/70 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] rounded-xl p-4 transition-all duration-200 hover:shadow-[0_4px_12px_-4px_rgba(0,0,0,0.08)] hover:border-slate-300"
                                            >
                                                <div className="flex items-center gap-2 mb-2">
                                                    <DollarSign className="w-4 h-4 text-blue-500 flex-shrink-0" />
                                                    <span className="text-[13px] font-bold text-slate-500">COGS per Unit</span>
                                                </div>
                                                <div className="pl-6 pt-0.5">
                                                    <span className="font-bold tracking-tight block text-[16px] sm:text-[17px] text-slate-700">
                                                        {formatCurrencyValue(results.cogsPerUnit, currency)}
                                                    </span>
                                                </div>
                                            </motion.div>

                                            <motion.div
                                                initial={{ opacity: 0, y: 8 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ duration: 0.35, delay: 0.15 }}
                                                className="bg-white border border-slate-200/70 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] rounded-xl p-4 transition-all duration-200 hover:shadow-[0_4px_12px_-4px_rgba(0,0,0,0.08)] hover:border-slate-300"
                                            >
                                                <div className="flex items-center gap-2 mb-2">
                                                    <Package className="w-4 h-4 text-blue-500 flex-shrink-0" />
                                                    <span className="text-[13px] font-bold text-slate-500">Quantity</span>
                                                </div>
                                                <div className="pl-6 pt-0.5">
                                                    <span className="font-bold tracking-tight block text-[16px] sm:text-[17px] text-slate-700">
                                                        {results.qty}
                                                    </span>
                                                </div>
                                            </motion.div>
                                        </div>

                                        {/* Cost Breakdown Collapsible */}
                                        <motion.div
                                            initial={{ opacity: 0, y: 8 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.35, delay: 0.2 }}
                                            className="bg-white border border-slate-200/70 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] rounded-xl pt-1 pb-1 transition-all duration-200 hover:shadow-[0_4px_12px_-4px_rgba(0,0,0,0.08)] hover:border-slate-300"
                                        >
                                            <button
                                                onClick={() => setShowBreakdown(v => !v)}
                                                className="w-full flex items-center justify-between px-4 py-3 text-left transition-colors"
                                            >
                                                <div className="flex items-center gap-2">
                                                    <PieChart className="w-4 h-4 text-blue-500" />
                                                    <span className="text-[13px] font-bold text-slate-500">View Cost Breakdown</span>
                                                </div>
                                                <motion.span
                                                    animate={{ rotate: showBreakdown ? 180 : 0 }}
                                                    transition={{ duration: 0.2 }}
                                                >
                                                    <ChevronDown className="w-4 h-4 text-slate-400" />
                                                </motion.span>
                                            </button>
                                            <AnimatePresence>
                                                {showBreakdown && (
                                                    <motion.div
                                                        initial={{ height: 0, opacity: 0 }}
                                                        animate={{ height: "auto", opacity: 1 }}
                                                        exit={{ height: 0, opacity: 0 }}
                                                        transition={{ duration: 0.28, ease: "easeInOut" }}
                                                        className="overflow-hidden"
                                                    >
                                                        <div className="border-t border-slate-100/80 px-4 py-3 space-y-2.5">
                                                            <div className="flex justify-between items-center bg-slate-50/60 px-3 py-2 rounded-xl border border-slate-100/60">
                                                                <div className="flex items-center gap-2.5">
                                                                    <div className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                                                                    <span className="text-[12px] font-semibold text-slate-600">Product Cost</span>
                                                                </div>
                                                                <span className="text-[13px] font-bold tracking-tight text-slate-700">
                                                                    {formatCurrencyValue(results.breakdown.productTotal, currency)}
                                                                </span>
                                                            </div>
                                                            
                                                            <div className="flex justify-between items-center bg-slate-50/60 px-3 py-2 rounded-xl border border-slate-100/60">
                                                                <div className="flex items-center gap-2.5">
                                                                    <div className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                                                                    <span className="text-[12px] font-semibold text-slate-600">Shipping Cost</span>
                                                                </div>
                                                                <span className="text-[13px] font-bold tracking-tight text-slate-700">
                                                                    {formatCurrencyValue(results.breakdown.shippingTotal, currency)}
                                                                </span>
                                                            </div>

                                                            <div className="flex justify-between items-center bg-slate-50/60 px-3 py-2 rounded-xl border border-slate-100/60">
                                                                <div className="flex items-center gap-2.5">
                                                                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                                                                    <span className="text-[12px] font-semibold text-slate-600">Packaging</span>
                                                                </div>
                                                                <span className="text-[13px] font-bold tracking-tight text-slate-700">
                                                                    {formatCurrencyValue(results.breakdown.packagingTotal, currency)}
                                                                </span>
                                                            </div>

                                                            <div className="flex justify-between items-center bg-slate-50/60 px-3 py-2 rounded-xl border border-slate-100/60">
                                                                <div className="flex items-center gap-2.5">
                                                                    <div className="w-1.5 h-1.5 rounded-full bg-orange-400" />
                                                                    <span className="text-[12px] font-semibold text-slate-600">Fulfillment</span>
                                                                </div>
                                                                <span className="text-[13px] font-bold tracking-tight text-slate-700">
                                                                    {formatCurrencyValue(results.breakdown.fulfillmentTotal, currency)}
                                                                </span>
                                                            </div>

                                                            <div className="flex justify-between items-center px-3 pt-2">
                                                                <span className="text-[12px] font-bold text-slate-500 uppercase tracking-widest">Total</span>
                                                                <span className="text-[14px] font-black tracking-tight text-blue-600">
                                                                    {formatCurrencyValue(results.totalCogs, currency)}
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>
                                        </motion.div>

                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </Card>
                    </motion.div>
                </div>
            </div>
        </FadeIn>
    )
} 
