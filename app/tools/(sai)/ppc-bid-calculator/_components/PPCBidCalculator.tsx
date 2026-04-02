"use client"
import React, { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { motion, AnimatePresence } from "framer-motion"
import { Target, DollarSign, TrendingUp, BarChart2, MousePointerClick } from "lucide-react"
import { CalculatorCardHeader, CalculatorInput, FadeIn } from "@/app/tools/_shared/components"
import { ResultSummaryCard } from "@/app/tools/_shared/components/ResultSummaryCard"
import { cn } from "@/lib/utils"

export function PPCBidCalculator() {
    const [currency, setCurrency] = useState<string>("USD")
    const [price, setPrice] = useState<number | "">("")
    const [conversionRate, setConversionRate] = useState<number | "">("")
    const [profitMargin, setProfitMargin] = useState<number | "">("")
    const [targetACoS, setTargetACoS] = useState<number | "">("")
    const [recommendedBid, setRecommendedBid] = useState<number>(0)
    const [breakevenBid, setBreakevenBid] = useState<number>(0)

    useEffect(() => {
        const p = price === "" ? 0 : price
        const cr = (conversionRate === "" ? 0 : conversionRate) / 100
        const pm = (profitMargin === "" ? 0 : profitMargin) / 100
        
        // Use Target ACoS if provided, otherwise default to a "safe" 75% of profit margin
        const acos = targetACoS !== "" ? (targetACoS / 100) : (pm * 0.75)
        
        if (p > 0 && cr > 0) {
            setBreakevenBid(p * cr * pm)
            // Only show recommended bid if we have some target (either ACoS or Profit Margin)
            if (targetACoS !== "" || pm > 0) {
                setRecommendedBid(p * cr * acos)
            } else {
                setRecommendedBid(0)
            }
        } else {
            setRecommendedBid(0)
            setBreakevenBid(0)
        }
    }, [price, conversionRate, profitMargin, targetACoS])

    const handleReset = () => {
        setPrice("")
        setConversionRate("")
        setProfitMargin("")
        setTargetACoS("")
    }

    const isCalculated = Number(price) > 0 && Number(conversionRate) > 0 && (Number(profitMargin) > 0 || Number(targetACoS) > 0)

    return (
        <FadeIn className="w-full max-w-6xl mx-auto py-8 px-4" duration={0.6}>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                {/* Left Column: Inputs */}
                <div className="lg:col-span-7 space-y-3 lg:sticky lg:top-8">
                    <Card className="border border-slate-200 shadow-sm bg-white overflow-hidden">
                        <CalculatorCardHeader
                            title="PPC Bid Details"
                            description="Enter your product price and campaign targets."
                            onReset={handleReset}
                            currency={currency}
                            onCurrencyChange={setCurrency}
                        />
                        <CardContent className="space-y-3 pt-6">
                            {/* Group 1: Product Data */}
                            <div className="space-y-4 max-w-[520px] mx-auto w-full">
                                <CalculatorInput
                                    hideSeparator={true}
                                    groupingTitle="Product Data"
                                    groupingIcon={DollarSign}
                                    label="Product Price"
                                    isCurrency
                                    currency={currency}
                                    value={price}
                                    onChange={setPrice}
                                    placeholder="50.00"
                                    min={0}
                                    step={0.01}
                                    tooltip="The selling price of your product."
                                />
                                <CalculatorInput
                                    label="Conversion Rate"
                                    suffix="%"
                                    value={conversionRate}
                                    onChange={setConversionRate}
                                    placeholder="10.0"
                                    min={0}
                                    max={100}
                                    step={0.1}
                                    tooltip="Percentage of clicks that turn into purchases."
                                />
                                <CalculatorInput
                                    label="Profit Margin"
                                    suffix="%"
                                    value={profitMargin}
                                    onChange={setProfitMargin}
                                    placeholder="30.0"
                                    min={0}
                                    max={100}
                                    step={0.1}
                                    tooltip="Your profit percentage after all costs (used to calculate a safe bid)."
                                />
                            </div>
                            {/* Group 2: Campaign Goals */}
                            <div className="space-y-4 max-w-[520px] mx-auto w-full pt-2">
                                <CalculatorInput
                                    groupingTitle="Campaign Goals"
                                    groupingIcon={Target}
                                    label="Target ACoS (optional)"
                                    suffix="%"
                                    value={targetACoS}
                                    onChange={setTargetACoS}
                                    placeholder="20.0"
                                    min={0}
                                    max={100}
                                    step={0.1}
                                    tooltip="Desired percentage of ad spend compared to sales."
                                />
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Right Column: Results */}
                <div className="lg:col-span-5 space-y-3">
                    <ResultSummaryCard
                        primaryResult={{
                            value: recommendedBid.toFixed(2),
                            isCurrency: true,
                            label: "Recommended Bid per Click",
                            key: "recommendedBid"
                        }}
                        secondaryResults={[
                            {
                                key: "breakevenBid",
                                label: "Break-even Bid",
                                value: breakevenBid.toFixed(2),
                                isCurrency: true,
                                icon: MousePointerClick,
                                tooltip: "Maximum bid where you make no profit and no loss."
                            }
                        ]}
                        currency={currency}
                        isCalculated={isCalculated}
                        emptyMessage="Calculate Bid"
                        liveBadgeText="Active bid"
                        liveBadgeColor="blue"
                    />

                    {/* Profitability Insight Card */}
                    <Card className="border border-slate-200/60 shadow-sm bg-[#F5F8FD] rounded-2xl overflow-hidden transition-all duration-300">
                        {/* Header: Matching Result Panel Format */}
                        <div className="flex justify-between items-center gap-4 px-6 pt-5 pb-1">
                            <div className="flex items-center gap-2.5">
                                <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-blue-600/10 border border-blue-100/50 shadow-sm shadow-blue-500/5">
                                    <TrendingUp className="w-4 h-4 text-blue-600" />
                                </div>
                                <span className="text-[15px] sm:text-[16px] font-bold text-blue-700 leading-none">
                                    Profitability Insight
                                </span>
                            </div>
                            {isCalculated && (
                                <AnimatePresence mode="wait">
                                    <motion.div
                                        key={Number(targetACoS || (Number(profitMargin) * 0.75)) > Number(profitMargin) ? 'warning' : 'strategy'}
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.9 }}
                                        className={cn(
                                            "flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-[10.5px] font-semibold tracking-wide shrink-0",
                                            Number(targetACoS || (Number(profitMargin) * 0.75)) > Number(profitMargin)
                                                ? "bg-rose-100/80 text-rose-700 border-rose-200/50"
                                                : "bg-blue-100/50 text-blue-700 border-blue-200/50"
                                        )}
                                    >
                                        {Number(targetACoS || (Number(profitMargin) * 0.75)) > Number(profitMargin) ? "Profit warning" : "Active strategy"}
                                    </motion.div>
                                </AnimatePresence>
                            )}
                        </div>

                        <div className="px-6 pb-6 pt-2">
                            <div className="flex items-center justify-between mb-3 text-xs font-bold uppercase tracking-widest">
                                <p className="text-slate-500 italic lowercase first-letter:uppercase">Aggressiveness Scale</p>
                                {isCalculated && (
                                    <span className={cn(
                                        "px-2 py-0.5 rounded-md border",
                                        Number(targetACoS || (Number(profitMargin) * 0.75)) > Number(profitMargin)
                                            ? "text-rose-600 bg-rose-50 border-rose-100"
                                            : "text-blue-600 bg-blue-50 border-blue-100"
                                    )}>
                                        {Number(targetACoS || (Number(profitMargin) * 0.75)).toFixed(1)}% ACoS
                                    </span>
                                )}
                            </div>
                            <div className="relative pt-2 pb-1">
                                <div className="h-2 w-full bg-slate-200/50 rounded-full overflow-hidden flex shadow-inner">
                                    <div className="h-full bg-blue-300 border-r border-white/40 shadow-sm" style={{ width: '33%' }} />
                                    <div className="h-full bg-blue-500 border-r border-white/40 shadow-sm" style={{ width: '33%' }} />
                                    <div className="h-full bg-amber-400 border-r border-white/40 shadow-sm" style={{ width: '34%' }} />
                                </div>
                                {isCalculated && (
                                    <motion.div
                                        initial={{ left: 0 }}
                                        animate={{ 
                                            left: `${Math.min(Math.max((Number(targetACoS || (Number(profitMargin) * 0.75)) / (Number(profitMargin) * 1.5)) * 100, 0), 100)}%` 
                                        }}
                                        className={cn(
                                            "absolute top-0 -mt-0.5 w-4 h-4 bg-white border-2 rounded-full shadow-md z-10 -ml-2",
                                            Number(targetACoS || (Number(profitMargin) * 0.75)) > Number(profitMargin)
                                                ? "border-rose-600 ring-2 ring-rose-100"
                                                : "border-slate-800"
                                        )}
                                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                    />
                                )}
                            </div>
                            <div className="flex justify-between mt-2 text-[10px] font-bold text-slate-400 uppercase tracking-tight">
                                <span>Conservative</span>
                                <span>Balanced</span>
                                <span className={cn(
                                    Number(targetACoS || (Number(profitMargin) * 0.75)) > Number(profitMargin) && "text-rose-500"
                                )}>
                                    {Number(targetACoS || (Number(profitMargin) * 0.75)) > Number(profitMargin) ? "Loss-Making" : "Aggressive"}
                                </span>
                            </div>
                            {isCalculated && Number(targetACoS) > Number(profitMargin) && (
                                <p className="mt-4 text-[11px] text-rose-600 font-medium leading-normal bg-white border border-rose-100 p-3 rounded-xl shadow-sm">
                                    <strong className="block mb-1">Caution: Unprofitable Bid</strong>
                                    Your target ACoS is higher than your profit margin, which means you are spending more on ads than you earn on the product.
                                </p>
                            )}
                        </div>
                    </Card>
                </div>
            </div>
        </FadeIn>
    )
}