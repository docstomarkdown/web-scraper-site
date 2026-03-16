"use client"
import React, { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import {
    Wallet, Box, ShoppingCart, Info, RotateCw, HelpCircle,
    Activity, TrendingUp, TrendingDown, Minus, CheckCircle2,
    Circle, ClipboardPenLine
} from "lucide-react"
import { motion, AnimatePresence } from "motion/react"
import { cn } from "@/lib/utils"
import { CurrencyCombobox, currencies } from "@/app/tools/_shared/components/CurrencyCombobox"
import { PremiumBudgetChart } from "./PremiumBudgetChart"

interface InputFieldProps {
    label: string
    value: number | ""
    onChange: (v: number | "") => void
    placeholder: string
    tooltip: string
    currency?: string
    isOptional?: boolean
}

function PremiumInput({ label, value, onChange, placeholder, tooltip, currency, isOptional }: InputFieldProps) {
    const found = currency ? currencies.find(c => c.code === currency) : null
    const symbol = found?.symbol || "$"
    const showCurrency = !!currency

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value
        if (val === "") { onChange(""); return }
        const parsed = parseFloat(val)
        if (!isNaN(parsed)) onChange(parsed)
    }

    return (
        <div className="group flex items-center gap-3 w-full">
            <div className="flex items-center gap-2 flex-1 min-w-0">
                <Label className="text-[14px] font-medium text-slate-600 cursor-pointer whitespace-nowrap">
                    {label}
                    {isOptional && (
                        <span className="ml-1.5 text-[11px] font-normal italic text-slate-400">(optional)</span>
                    )}
                </Label>
                <Tooltip>
                    <TooltipTrigger asChild>
                        <button type="button" tabIndex={-1} className="text-slate-300 hover:text-blue-500 transition-colors shrink-0">
                            <Info className="h-3.5 w-3.5" />
                        </button>
                    </TooltipTrigger>
                    <TooltipContent side="top" className="max-w-xs text-[13px] bg-slate-900 text-white border-slate-800 rounded-xl p-3">
                        {tooltip}
                    </TooltipContent>
                </Tooltip>
            </div>
            <div className="relative flex-shrink-0">
                {showCurrency && (
                    <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-xs font-semibold group-focus-within:text-blue-500 transition-colors pointer-events-none z-10">
                        {symbol}
                    </div>
                )}
                <Input
                    type="number"
                    value={value}
                    onChange={handleChange}
                    placeholder={`Eg: ${placeholder}`}
                    className={cn(
                        "h-11 w-36 sm:w-44 text-[15px] font-semibold text-slate-700 rounded-xl text-right",
                        showCurrency ? "pl-9" : "pl-3",
                        "border-2 border-slate-200/80 bg-white shadow-sm",
                        "placeholder:text-slate-300 placeholder:font-normal placeholder:text-[14px]",
                        "hover:border-blue-300/80 hover:shadow-md",
                        "focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 focus:outline-none",
                        "transition-all duration-200"
                    )}
                    min={0}
                    max={1000000}
                />
            </div>
        </div>
    )
}

interface InputGroupProps {
    title: string
    icon: React.ElementType
    children: React.ReactNode
    accent?: string
}

function InputGroup({ title, icon: Icon, children, accent = "blue" }: InputGroupProps) {
    // Single blue color scheme matching other tools
    const colors = { iconBg: "bg-blue-50 ring-blue-500/10", iconText: "text-blue-600", line: "bg-blue-200/50" }

    return (
        <div className="relative pl-8">
            {/* Vertical connecting line */}
            <div className={`absolute left-[13px] top-8 bottom-2 w-[1.5px] ${colors.line} rounded-full`} />

            {/* Group header */}
            <div className="flex items-center gap-2.5 -ml-8 mb-4">
                <div className={cn("w-7 h-7 rounded-lg ring-1 ring-inset flex items-center justify-center shrink-0 z-10 bg-white", colors.iconBg)}>
                    <Icon className={cn("w-3.5 h-3.5", colors.iconText)} />
                </div>
                <span className="text-[15px] font-bold text-slate-700 tracking-tight">{title}</span>
            </div>

            <div className="space-y-3">
                {children}
            </div>
        </div>
    )
}

export function PremiumCalculator() {
    const [currency, setCurrency] = useState("USD")
    const [influencerFee, setInfluencerFee] = useState<number | "">("")
    const [adSpend, setAdSpend] = useState<number | "">("")
    const [productCostPerItem, setProductCostPerItem] = useState<number | "">("")
    const [shippingCost, setShippingCost] = useState<number | "">("")
    const [sellingPrice, setSellingPrice] = useState<number | "">("")
    const [totalOrders, setTotalOrders] = useState<number | "">("")

    const val = (v: number | "") => (v === "" ? 0 : v)
    const handleReset = () => {
        setInfluencerFee(""); setAdSpend(""); setProductCostPerItem("")
        setShippingCost(""); setSellingPrice(""); setTotalOrders("")
    }

    const fee = val(influencerFee)
    const ad = val(adSpend)
    const costPerItem = val(productCostPerItem)
    const ship = val(shippingCost)
    const price = val(sellingPrice)
    const orders = val(totalOrders)
    const campaignCosts = fee + ad
    const totalProductCost = (costPerItem + ship) * orders
    const totalCost = campaignCosts + totalProductCost
    const totalRevenue = price * orders
    const profitLoss = totalRevenue - totalCost
    const roi = totalCost > 0 ? (profitLoss / totalCost) * 100 : 0
    const profitPerOrder = orders > 0 ? profitLoss / orders : 0
    const hasAllRequired = influencerFee !== "" && sellingPrice !== "" && totalOrders !== ""

    const formatCurrency = (val: number) => {
        const found = currencies.find(c => c.code === currency)
        if (found) {
            return `${found.symbol}${new Intl.NumberFormat('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(val)}`
        }
        try {
            return new Intl.NumberFormat('en-US', { style: 'currency', currency, currencyDisplay: 'narrowSymbol', maximumFractionDigits: 2 }).format(val)
        } catch {
            return new Intl.NumberFormat('en-US', { style: 'currency', currency, maximumFractionDigits: 2 }).format(val)
        }
    }

    const checklistItems = [
        { label: "Influencer Fee", isComplete: influencerFee !== "" },
        { label: "Selling Price", isComplete: sellingPrice !== "" },
        { label: "Total Orders", isComplete: totalOrders !== "" },
    ]
    const completedCount = checklistItems.filter(i => i.isComplete).length
    const progressPct = (completedCount / checklistItems.length) * 100

    const getPercent = (amount: number) => totalCost > 0 ? Math.min(Math.max((amount / totalCost) * 100, 0), 100) : 0

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="w-full max-w-6xl mx-auto py-2 px-4"
        >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
                {/* ═══════ INPUT CARD ═══════ */}
                <div className="lg:col-span-7">
                    <Card className="relative border border-slate-200/60 shadow-xl shadow-slate-200/30 bg-white rounded-3xl overflow-hidden">
                        {/* Header */}
                        <div className="px-6 py-5 border-b border-slate-100/80 bg-gradient-to-b from-slate-50/50 to-white">
                            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                                <div className="flex-1 min-w-0 space-y-1.5">
                                    <div className="flex items-center gap-2.5">
                                        <h2 className="text-xl font-bold text-slate-800 tracking-tight">Campaign Details</h2>
                                        <Tooltip>
                                            <TooltipTrigger asChild>
                                                <button
                                                    type="button"
                                                    tabIndex={-1}
                                                    onClick={() => {
                                                        const el = document.getElementById("how-to-use")
                                                        if (el) el.scrollIntoView({ behavior: "smooth", block: "start" })
                                                    }}
                                                    className="text-slate-300 hover:text-blue-500 transition-colors"
                                                >
                                                    <HelpCircle className="h-4 w-4" />
                                                </button>
                                            </TooltipTrigger>
                                            <TooltipContent side="top" className="text-xs bg-slate-900 text-white border-slate-800 rounded-xl">
                                                How to use this tool
                                            </TooltipContent>
                                        </Tooltip>
                                    </div>
                                    <p className="text-[13px] text-slate-400 font-medium leading-relaxed">
                                        Enter your campaign costs, product details, and sales data.
                                    </p>
                                </div>
                                <div className="flex items-center gap-2 flex-shrink-0">
                                    <div className="w-[138px]">
                                        <CurrencyCombobox value={currency} onValueChange={setCurrency} />
                                    </div>
                                    <button
                                        type="button"
                                        onClick={handleReset}
                                        className="group flex items-center justify-center h-9 w-9 text-slate-400 hover:text-blue-600 bg-white border border-slate-200 hover:border-blue-200 shadow-sm hover:shadow-md rounded-xl transition-all duration-250 active:scale-90"
                                        aria-label="Reset"
                                    >
                                        <RotateCw className="h-3.5 w-3.5" />
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Inputs body */}
                        <CardContent className="p-5 md:p-7 pb-10 md:pb-12 space-y-5">
                            <InputGroup title="Campaign Costs" icon={Wallet} accent="blue">
                                <PremiumInput label="Influencer Fee" value={influencerFee} onChange={setInfluencerFee} placeholder="1000.00" tooltip="The flat fee or commission paid directly to the influencer." currency={currency} />
                                <PremiumInput label="Ad Spend" value={adSpend} onChange={setAdSpend} placeholder="500.00" tooltip="Amount spent on paid ads to boost or promote the campaign." currency={currency} isOptional />
                            </InputGroup>

                            <div className="h-px bg-slate-100/80 w-full" />

                            <InputGroup title="Sales Metrics" icon={ShoppingCart} accent="blue">
                                <PremiumInput label="Average Selling Price" value={sellingPrice} onChange={setSellingPrice} placeholder="100.00" tooltip="The price customers pay for one unit of your product." currency={currency} />
                                <PremiumInput label="Number of Orders" value={totalOrders} onChange={setTotalOrders} placeholder="50" tooltip="Total number of orders generated during this campaign." />
                            </InputGroup>

                            <div className="h-px bg-slate-100/80 w-full" />

                            <InputGroup title="Product Costs" icon={Box} accent="blue">
                                <PremiumInput label="Product Cost per Item" value={productCostPerItem} onChange={setProductCostPerItem} placeholder="25.00" tooltip="The cost to produce or purchase one unit (COGS)." currency={currency} isOptional />
                                <PremiumInput label="Shipping Cost" value={shippingCost} onChange={setShippingCost} placeholder="5.00" tooltip="Average shipping and handling cost per order." currency={currency} isOptional />
                            </InputGroup>
                        </CardContent>
                    </Card>
                </div>

                {/* ═══════ RESULT CARD ═══════ */}
                <div className="lg:col-span-5 lg:sticky lg:top-32 flex flex-col gap-4">
                    <PremiumResultCard
                        roi={roi}
                        profitLoss={profitLoss}
                        totalRevenue={totalRevenue}
                        totalCost={totalCost}
                        profitPerOrder={profitPerOrder}
                        hasAllRequired={hasAllRequired}
                        checklistItems={checklistItems}
                        completedCount={completedCount}
                        progressPct={progressPct}
                        formatCurrency={formatCurrency}
                    />

                    <PremiumBudgetChart
                        fee={fee}
                        adSpend={ad}
                        productCost={costPerItem * orders}
                        shippingCost={ship * orders}
                        totalCost={totalCost}
                        feePct={getPercent(fee)}
                        adPct={getPercent(ad)}
                        productPct={getPercent(costPerItem * orders)}
                        shippingPct={getPercent(ship * orders)}
                        formatCurrency={formatCurrency}
                    />
                </div>
            </div>
        </motion.div>
    )
}

/* ═══════════════════════════════════════════════════
   PREMIUM RESULT CARD (local, not shared)
   ═══════════════════════════════════════════════════ */

interface PremiumResultCardProps {
    roi: number
    profitLoss: number
    totalRevenue: number
    totalCost: number
    profitPerOrder: number
    hasAllRequired: boolean
    checklistItems: { label: string; isComplete: boolean }[]
    completedCount: number
    progressPct: number
    formatCurrency: (v: number) => string
}

function PremiumResultCard({
    roi, profitLoss, totalRevenue, totalCost, profitPerOrder,
    hasAllRequired, checklistItems, completedCount, progressPct, formatCurrency
}: PremiumResultCardProps) {
    const [showResults, setShowResults] = useState(false)
    const isProfit = profitLoss > 0
    const isLoss = profitLoss < 0

    useEffect(() => {
        if (hasAllRequired) {
            const timer = setTimeout(() => setShowResults(true), 350)
            return () => clearTimeout(timer)
        } else {
            setShowResults(false)
        }
    }, [hasAllRequired])

    const badge = isProfit
        ? { text: "Profit", bg: "bg-blue-50", border: "border-blue-200/60", textCol: "text-blue-700", dot: "bg-blue-500" }
        : isLoss
            ? { text: "Loss", bg: "bg-red-50", border: "border-red-200/60", textCol: "text-red-700", dot: "bg-red-500" }
            : { text: "Live", bg: "bg-blue-50", border: "border-blue-200/60", textCol: "text-blue-700", dot: "bg-blue-500" }

    const secondaryMetrics = [
        { label: isLoss ? "Net Loss" : "Net Profit", value: formatCurrency(Math.abs(profitLoss)), color: isProfit ? "text-blue-600" : isLoss ? "text-red-600" : "text-slate-500", tooltip: "Revenue minus all costs." },
        { label: "Total Revenue", value: formatCurrency(totalRevenue), color: "text-slate-500", tooltip: "Selling Price x Total Orders." },
        { label: "Total Cost", value: formatCurrency(totalCost), color: "text-slate-500", tooltip: "All campaign + product costs combined." },
        { label: "Profit per Order", value: formatCurrency(Math.abs(profitPerOrder)), color: isProfit ? "text-blue-600" : isLoss ? "text-red-600" : "text-slate-500", tooltip: "Net Profit / Total Orders." },
    ]

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
            <Card className="relative overflow-hidden border border-slate-200/60 shadow-sm rounded-2xl bg-[#F5F8FD]">
                {/* Subtle gradient overlay */}
                <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-blue-50/30 to-transparent pointer-events-none" />

                {/* Header */}
                <div className="relative flex justify-between items-center gap-4 px-6 pt-5 pb-1">
                    <div className="flex items-center gap-2.5">
                        <div className="relative">
                            <div className="absolute inset-0 bg-blue-400/10 rounded-lg blur-sm" />
                            <div className="relative flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 shadow-sm shadow-blue-500/20">
                                <Activity className="w-4 h-4 text-white" />
                            </div>
                        </div>
                        <span className="text-[11px] font-black text-blue-600 uppercase tracking-[0.18em] leading-none">
                            Results Panel
                        </span>
                    </div>

                    <AnimatePresence mode="wait">
                        {!showResults ? (
                            <motion.div
                                key="progress"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0, transition: { duration: 0.25 } }}
                                className="bg-white/80 backdrop-blur-sm border border-slate-100 px-3 py-1.5 rounded-full flex items-center gap-2.5 shadow-sm"
                            >
                                <span className="text-[10px] font-black text-blue-600">{completedCount}/{checklistItems.length}</span>
                                <div className="w-16 h-1.5 bg-blue-100/80 rounded-full overflow-hidden">
                                    <motion.div
                                        className="h-full bg-gradient-to-r from-blue-400 to-blue-600 rounded-full"
                                        initial={{ width: "0%" }}
                                        animate={{ width: `${progressPct}%` }}
                                        transition={{ duration: 0.6, ease: "easeOut" }}
                                    />
                                </div>
                            </motion.div>
                        ) : (
                            <motion.div
                                key="badge"
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className={cn(
                                    "flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-[10.5px] font-bold tracking-wide",
                                    badge.bg, badge.border, badge.textCol
                                )}
                            >
                                <div className={cn("w-1.5 h-1.5 rounded-full animate-pulse", badge.dot)} />
                                {badge.text}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                <AnimatePresence mode="wait">
                    {!showResults ? (
                        /* ═══ EMPTY STATE ═══ */
                        <motion.div
                            key="empty"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.4 }}
                            className="relative z-10 px-6 pb-6 pt-2"
                        >
                            <div className="relative">
                                {/* Glass overlay */}
                                <div className="absolute inset-0 z-30 flex items-center justify-center pointer-events-none">
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ duration: 0.5 }}
                                        className="bg-white/85 backdrop-blur-xl border border-white/60 shadow-[0_8px_40px_rgba(59,130,246,0.12)] rounded-2xl px-6 py-5 flex flex-col items-center gap-3 max-w-[300px] pointer-events-auto"
                                    >
                                        <div className="relative">
                                            <span className="absolute w-11 h-11 rounded-xl bg-blue-400/15 animate-ping" style={{ animationDuration: "2.8s" }} />
                                            <div className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200/60 flex items-center justify-center text-blue-500 shadow-sm">
                                                <ClipboardPenLine className="w-[18px] h-[18px]" />
                                            </div>
                                        </div>
                                        <p className="text-[12.5px] text-slate-500 font-semibold text-center">
                                            Fill in the inputs to see your
                                        </p>
                                        <span className="inline-flex items-center px-3 py-1 rounded-lg bg-gradient-to-r from-blue-50 to-blue-100/80 text-[11.5px] font-extrabold text-blue-600/90 tracking-wide shadow-sm">
                                            Return on Investment
                                        </span>

                                        {/* Checklist */}
                                        <div className="w-full space-y-1.5 mt-1">
                                            {checklistItems.map((item, i) => (
                                                <div key={i} className="flex items-center gap-2 text-[11.5px]">
                                                    {item.isComplete ? (
                                                        <CheckCircle2 className="w-3.5 h-3.5 text-blue-500 shrink-0" />
                                                    ) : (
                                                        <Circle className="w-3.5 h-3.5 text-slate-300 shrink-0" />
                                                    )}
                                                    <span className={cn(
                                                        "font-medium",
                                                        item.isComplete ? "text-blue-600 line-through" : "text-slate-400"
                                                    )}>{item.label}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </motion.div>
                                </div>

                                {/* Skeleton */}
                                <div className="blur-[2.5px] opacity-35 select-none pointer-events-none">
                                    <div className="flex flex-col items-center py-5 px-4 mb-2">
                                        <div className="h-2.5 w-24 rounded-full bg-slate-200/60 mb-3 animate-pulse" />
                                        <div className="h-12 w-40 rounded-xl bg-slate-200/50 mb-2 animate-pulse" style={{ animationDelay: "0.1s" }} />
                                        <div className="h-2 w-44 rounded-full bg-slate-200/60 animate-pulse mt-2" style={{ animationDelay: "0.2s" }} />
                                    </div>
                                    <div className="h-px w-full bg-slate-200/40 my-4" />
                                    <div className="grid grid-cols-2 gap-2">
                                        {[0, 1, 2, 3].map(i => (
                                            <div key={i} className="bg-slate-50/50 border border-slate-100 p-3 rounded-xl">
                                                <div className="h-2 w-20 rounded-full bg-slate-200/60 mb-3 animate-pulse" style={{ animationDelay: `${0.1 + i * 0.08}s` }} />
                                                <div className="h-4 w-16 rounded-lg bg-slate-200/50 animate-pulse" style={{ animationDelay: `${0.15 + i * 0.08}s` }} />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ) : (
                        /* ═══ RESULTS STATE ═══ */
                        <motion.div
                            key="results"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.55 }}
                            className="flex flex-col"
                        >
                            {/* Primary hero */}
                            <div className="px-5 pb-4">
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.98 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ duration: 0.5, delay: 0.1 }}
                                    className="relative flex flex-col items-center text-center py-7 px-4 rounded-2xl bg-white/70 border border-slate-100/80 backdrop-blur-sm overflow-hidden"
                                >
                                    {/* Decorative glow */}
                                    {/* Decorative glow */}
                                    <div className={cn(
                                        "absolute -top-8 left-1/2 -translate-x-1/2 w-40 h-40 rounded-full blur-3xl opacity-20 pointer-events-none",
                                        isProfit ? "bg-blue-400" : isLoss ? "bg-red-400" : "bg-blue-400"
                                    )} />

                                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.16em] mb-2 relative">
                                        Return on Investment
                                    </span>

                                    <div className="flex items-baseline gap-1 relative">
                                        <span className={cn(
                                            "text-[3rem] sm:text-[3.5rem] font-black tracking-tighter leading-none",
                                            isProfit ? "text-blue-600" : isLoss ? "text-red-600" : "text-blue-600"
                                        )}>
                                            {roi.toFixed(2)}
                                        </span>
                                        <span className={cn(
                                            "text-[1.5rem] font-bold opacity-70",
                                            isProfit ? "text-blue-500" : isLoss ? "text-red-500" : "text-blue-500"
                                        )}>%</span>
                                    </div>

                                    {/* Trend indicator */}
                                    <div className={cn(
                                        "flex items-center gap-1.5 mt-3 px-3 py-1 rounded-full text-[11px] font-bold",
                                        isProfit ? "bg-blue-50 text-blue-600" : isLoss ? "bg-red-50 text-red-600" : "bg-slate-50 text-slate-500"
                                    )}>
                                        {isProfit ? <TrendingUp className="w-3.5 h-3.5" /> : isLoss ? <TrendingDown className="w-3.5 h-3.5" /> : <Minus className="w-3.5 h-3.5" />}
                                        {isProfit ? "Profitable campaign" : isLoss ? "Operating at a loss" : "Break even"}
                                    </div>
                                </motion.div>
                            </div>

                            {/* Secondary metrics */}
                            <div className="px-5 pb-5">
                                <div className="grid grid-cols-2 gap-2">
                                    {secondaryMetrics.map((metric, idx) => (
                                        <motion.div
                                            key={metric.label}
                                            initial={{ opacity: 0, y: 8 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.3, delay: 0.12 + idx * 0.05 }}
                                            className="group bg-white border border-slate-200/70 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] rounded-xl p-4 transition-all duration-200 hover:border-slate-300 hover:shadow-[0_4px_12px_-4px_rgba(0,0,0,0.08)]"
                                        >
                                            <div className="flex items-center gap-1.5 mb-1.5">
                                                <span className="text-[10.5px] font-bold text-slate-400 uppercase tracking-[0.08em] leading-none">
                                                    {metric.label}
                                                </span>
                                                <Tooltip>
                                                    <TooltipTrigger asChild>
                                                        <button type="button" tabIndex={-1} className="text-slate-300 hover:text-blue-500 transition-colors shrink-0">
                                                            <Info className="w-3 h-3" />
                                                        </button>
                                                    </TooltipTrigger>
                                                    <TooltipContent className="bg-slate-900 border-slate-800 text-white text-xs max-w-xs p-3 rounded-xl">
                                                        {metric.tooltip}
                                                    </TooltipContent>
                                                </Tooltip>
                                            </div>
                                            <div className={cn("text-[16px] font-extrabold tracking-tight", metric.color)}>
                                                {metric.value}
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </Card>
        </motion.div>
    )
}
