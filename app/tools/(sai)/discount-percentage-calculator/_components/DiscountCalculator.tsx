"use client"

import React, { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { HelpCircle, TrendingDown, DollarSign, Percent, ArrowRight, RotateCcw, ShoppingCart } from "lucide-react"
import { CurrencyCombobox } from "@/app/tools/_shared/components"
import { FadeIn, Counter, CalculatorInput, ResultFeedbackCard } from "@/app/tools/_shared/components"
import { motion } from "framer-motion"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"

export function DiscountCalculator() {
    const [currency, setCurrency] = useState("USD")
    const [mode, setMode] = useState("find-price") // find-price | find-discount

    // Inputs
    const [originalPrice, setOriginalPrice] = useState<number | "">("")
    const [discountValue, setDiscountValue] = useState<number | "">("") // Can be % or price depending on mode
    const [quantity, setQuantity] = useState<number | "">("")

    // Results
    const [finalPrice, setFinalPrice] = useState<number>(0)
    const [savings, setSavings] = useState<number>(0)
    const [totalSavings, setTotalSavings] = useState<number>(0)
    const [calculatedDiscount, setCalculatedDiscount] = useState<number>(0)

    const val = (v: number | "") => (v === "" ? 0 : v)

    const currencySymbols: Record<string, string> = {
        USD: '$', EUR: '€', GBP: '£', INR: '₹', AUD: 'A$', CAD: 'C$', JPY: '¥', CNY: '¥',
        AED: 'AED', SGD: 'S$', HKD: 'HK$', CHF: 'Fr', MXN: 'MX$', BRL: 'R$', KRW: '₩',
        RUB: '₽', ZAR: 'R', SEK: 'kr', NOK: 'kr', DKK: 'kr', PLN: 'zł', THB: '฿',
        IDR: 'Rp', MYR: 'RM', PHP: '₱', VND: '₫', TRY: '₺', SAR: '﷼', NZD: 'NZ$',
        EGP: 'E£', PKR: '₨', BDT: '৳', NGN: '₦', KES: 'KSh'
    }
    const symbol = currencySymbols[currency] || "$"

    const scrollToGuide = () => {
        const element = document.getElementById('discount-guide');
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const handleReset = () => {
        setOriginalPrice("")
        setDiscountValue("")
        setQuantity("")
        setFinalPrice(0)
        setSavings(0)
        setTotalSavings(0)
        setCalculatedDiscount(0)
    }

    // Effect to calculate based on mode
    useEffect(() => {
        const price = val(originalPrice)
        const secondVal = val(discountValue)
        const qty = val(quantity) || 1

        if (mode === "find-price") {
            if (price > 0 && secondVal >= 0) {
                const save = price * (secondVal / 100)
                setSavings(save)
                setTotalSavings(save * qty)
                setFinalPrice((price - save) * qty)
            } else {
                setSavings(0)
                setTotalSavings(0)
                setFinalPrice(price * qty)
            }
        } else {
            if (price > 0 && secondVal > 0) {
                const save = price - secondVal
                setSavings(Math.max(save, 0))
                setTotalSavings(Math.max(save, 0) * qty)
                setCalculatedDiscount(save > 0 ? (save / price) * 100 : 0)
            } else {
                setSavings(0)
                setTotalSavings(0)
                setCalculatedDiscount(0)
            }
        }
    }, [originalPrice, discountValue, mode, quantity])

    const formatCurrency = (val: number) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: currency,
            maximumFractionDigits: 2
        }).format(val)
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
                                    <CardTitle className="text-xl font-bold text-blue-600">
                                        Inputs
                                    </CardTitle>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        onClick={scrollToGuide}
                                        className="text-slate-400 hover:text-slate-900 hover:bg-slate-100 h-6 w-6 rounded-full"
                                    >
                                        <HelpCircle className="w-4 h-4" />
                                    </Button>
                                    <TooltipProvider delayDuration={100}>
                                        <Tooltip>
                                            <TooltipTrigger asChild>
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    onClick={handleReset}
                                                    className="text-slate-400 hover:text-slate-600 hover:bg-slate-100 h-6 w-6 rounded-full transition-colors"
                                                >
                                                    <RotateCcw className="w-3.5 h-3.5" />
                                                </Button>
                                            </TooltipTrigger>
                                            <TooltipContent side="top" className="text-xs bg-slate-900 text-white border-slate-800">
                                                Reset Calculator
                                            </TooltipContent>
                                        </Tooltip>
                                    </TooltipProvider>
                                </div>
                                <CardDescription>
                                    Calculate your discount and final price.
                                </CardDescription>
                            </div>
                            <div className="w-[140px]">
                                <CurrencyCombobox value={currency} onValueChange={setCurrency} />
                            </div>
                        </CardHeader>
                        <CardContent className="space-y-6 pt-6">
                            <div className="space-y-4 mb-2 pb-6 border-b border-slate-50">
                                <label className="text-sm font-bold text-slate-600">Calculation Mode</label>
                                <div className="relative flex bg-slate-100 p-1 rounded-xl border border-slate-200 w-full sm:w-fit">
                                    {/* Animated Background Pill */}
                                    <motion.div
                                        className="absolute bg-white rounded-lg shadow-sm border border-slate-200"
                                        initial={false}
                                        animate={{
                                            x: mode === "find-price" ? 0 : "100%",
                                        }}
                                        transition={{ type: "spring", stiffness: 350, damping: 35 }}
                                        style={{ top: 2, bottom: 2, left: 2, width: 'calc(50% - 2px)' }}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => { setMode("find-price"); handleReset(); }}
                                        className={cn(
                                            "relative z-10 px-4 py-2 rounded-lg text-xs font-semibold transition-all duration-200 w-32",
                                            mode === "find-price" ? "text-blue-600" : "text-slate-500 hover:text-slate-700"
                                        )}
                                    >
                                        Find Final Price
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => { setMode("find-discount"); handleReset(); }}
                                        className={cn(
                                            "relative z-10 px-4 py-2 rounded-lg text-xs font-semibold transition-all duration-200 w-32",
                                            mode === "find-discount" ? "text-blue-600" : "text-slate-500 hover:text-slate-700"
                                        )}
                                    >
                                        Find Discount %
                                    </button>
                                </div>
                            </div>

                            <div className="space-y-5">
                                <CalculatorInput
                                    label={`Original Price (${symbol})`}
                                    value={originalPrice}
                                    onChange={setOriginalPrice}
                                    placeholder="100.00"
                                    max={1000000}
                                    tooltip="The price before any discount is applied."
                                />

                                <motion.div
                                    layout
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    key={mode}
                                >
                                    {mode === "find-price" ? (
                                        <CalculatorInput
                                            label="Discount (%)"
                                            value={discountValue}
                                            onChange={setDiscountValue}
                                            placeholder="20"
                                            max={100}
                                            tooltip="The percentage to deduct from the original price."
                                        />
                                    ) : (
                                        <CalculatorInput
                                            label={`Final Price (${symbol})`}
                                            value={discountValue}
                                            onChange={setDiscountValue}
                                            placeholder="80.00"
                                            max={1000000}
                                            tooltip="The price after the discount is applied."
                                        />
                                    )}
                                </motion.div>

                                <CalculatorInput
                                    label="Quantity"
                                    value={quantity}
                                    onChange={setQuantity}
                                    placeholder="1"
                                    max={10000}
                                    tooltip="Number of items you are buying."
                                />
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Results Section */}
                <div className="lg:col-span-5 space-y-4 lg:sticky lg:top-8">
                    {/* Main Result Card */}
                    <ResultFeedbackCard
                        title={mode === "find-price" ? "Total Price" : "Discount Percentage"}
                        mainValue={
                            mode === "find-price" ? (
                                <Counter value={finalPrice} formatter={formatCurrency} key={currency} />
                            ) : (
                                <Counter value={calculatedDiscount} formatter={(v) => `${v.toFixed(2)}%`} />
                            )
                        }
                        secondaryMetrics={[
                            {
                                label: "Total Savings",
                                value: <Counter value={totalSavings} formatter={formatCurrency} key={currency} />,
                                color: "text-emerald-400"
                            },
                            {
                                label: mode === "find-price" ? "Unit Saving" : "Unit Price",
                                value: mode === "find-price" ? (
                                    <Counter value={savings} formatter={formatCurrency} key={currency} />
                                ) : (
                                    <Counter value={Number(originalPrice) || 0} formatter={formatCurrency} key={currency} />
                                ),
                                color: "text-blue-400"
                            }
                        ]}
                    />

                    {/* Savings Indicator */}
                    {(mode === "find-price" ? val(discountValue) > 0 : calculatedDiscount > 0) && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className={cn(
                                "px-4 py-3 rounded-xl border text-center text-sm font-semibold",
                                (mode === "find-price" ? val(discountValue) : calculatedDiscount) >= 40
                                    ? "bg-emerald-50 border-emerald-200 text-emerald-700"
                                    : (mode === "find-price" ? val(discountValue) : calculatedDiscount) >= 20
                                        ? "bg-blue-50 border-blue-200 text-blue-700"
                                        : (mode === "find-price" ? val(discountValue) : calculatedDiscount) >= 10
                                            ? "bg-amber-50 border-amber-200 text-amber-700"
                                            : "bg-slate-50 border-slate-200 text-slate-600"
                            )}
                        >
                            {(mode === "find-price" ? val(discountValue) : calculatedDiscount) >= 40
                                ? "🔥 Amazing Deal!"
                                : (mode === "find-price" ? val(discountValue) : calculatedDiscount) >= 20
                                    ? "✨ Great Savings!"
                                    : (mode === "find-price" ? val(discountValue) : calculatedDiscount) >= 10
                                        ? "👍 Decent Discount"
                                        : "💡 Modest Savings"}
                        </motion.div>
                    )}

                    {/* Price Breakdown */}
                    {originalPrice && discountValue ? (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden"
                        >
                            <div className="px-4 py-3 border-b border-slate-100">
                                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Price Breakdown</p>
                            </div>
                            <div className="divide-y divide-slate-50">
                                <div className="flex justify-between items-center px-4 py-3">
                                    <span className="text-sm text-slate-500">Original Price</span>
                                    <span className="text-sm font-medium text-slate-700">{formatCurrency(val(originalPrice))}</span>
                                </div>
                                <div className="flex justify-between items-center px-4 py-3">
                                    <span className="text-sm text-slate-500">Discount</span>
                                    <span className="text-sm font-medium text-red-500">
                                        - {formatCurrency(savings)} ({mode === "find-price" ? `${val(discountValue)}%` : `${calculatedDiscount.toFixed(1)}%`})
                                    </span>
                                </div>
                                <div className="flex justify-between items-center px-4 py-3">
                                    <span className="text-sm text-slate-500">Price After Discount</span>
                                    <span className="text-sm font-semibold text-slate-800">
                                        {formatCurrency(val(originalPrice) - savings)}
                                    </span>
                                </div>
                                {val(quantity) > 1 && (
                                    <>
                                        <div className="flex justify-between items-center px-4 py-3 bg-slate-50/50">
                                            <span className="text-sm text-slate-500">Quantity</span>
                                            <span className="text-sm font-medium text-slate-700">× {val(quantity)}</span>
                                        </div>
                                        <div className="flex justify-between items-center px-4 py-3 bg-blue-50/50">
                                            <span className="text-sm font-semibold text-blue-700">Grand Total</span>
                                            <span className="text-sm font-bold text-blue-700">{formatCurrency(finalPrice)}</span>
                                        </div>
                                    </>
                                )}
                                <div className="flex justify-between items-center px-4 py-3 bg-emerald-50/50">
                                    <span className="text-sm font-semibold text-emerald-700">You Save</span>
                                    <span className="text-sm font-bold text-emerald-700">{formatCurrency(totalSavings)}</span>
                                </div>
                            </div>
                        </motion.div>
                    ) : (
                        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 text-center">
                            <p className="text-sm text-slate-400">Enter values to see the price breakdown.</p>
                        </div>
                    )}
                </div>
            </div>
        </FadeIn>
    )
}

function ResultCard({ title, value, icon: Icon, tooltip }: { title: string, value: React.ReactNode, icon: any, tooltip?: string }) {
    return (
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
            <div>
                <div className="flex items-center gap-1.5 mb-1">
                    <p className="text-xs font-medium text-slate-500">{title}</p>
                    {tooltip && (
                        <TooltipProvider delayDuration={100}>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <button type="button" className="text-slate-300 hover:text-slate-500 transition-colors cursor-default">
                                        <HelpCircle className="h-3 w-3" />
                                    </button>
                                </TooltipTrigger>
                                <TooltipContent side="top" className="max-w-xs text-[10px] bg-slate-900 text-white border-slate-800">
                                    {tooltip}
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    )}
                </div>
                <div className="text-sm font-medium text-slate-800">{value}</div>
            </div>
            <div className="bg-slate-50 p-2 rounded-lg text-slate-400">
                <Icon className="w-5 h-5" />
            </div>
        </div>
    )
}
