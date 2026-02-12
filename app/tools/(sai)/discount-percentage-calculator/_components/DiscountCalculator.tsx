"use client"

import React, { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { HelpCircle, TrendingDown, DollarSign, Percent, ArrowRight, RefreshCw } from "lucide-react"
import { CurrencyCombobox } from "@/components/ui/currency-combobox"
import { FadeIn, Counter, CalculatorInput, ResultFeedbackCard } from "@/app/tools/_shared/components"
import { motion } from "framer-motion"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

export function DiscountCalculator() {
    const [currency, setCurrency] = useState("USD")
    const [mode, setMode] = useState("find-price") // find-price | find-discount

    // Inputs
    const [originalPrice, setOriginalPrice] = useState<number | "">("")
    const [discountValue, setDiscountValue] = useState<number | "">("") // Can be % or price depending on mode

    // Results
    const [finalPrice, setFinalPrice] = useState<number>(0)
    const [savings, setSavings] = useState<number>(0)
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

    const resetFields = () => {
        setOriginalPrice("")
        setDiscountValue("")
        setFinalPrice(0)
        setSavings(0)
        setCalculatedDiscount(0)
    }

    // Effect to calculate based on mode
    useEffect(() => {
        const price = val(originalPrice)
        const secondVal = val(discountValue)

        if (mode === "find-price") {
            // Calculate Final Price given Original + Discount %
            // secondVal is Discount %
            if (price > 0 && secondVal >= 0) {
                const save = price * (secondVal / 100)
                setSavings(save)
                setFinalPrice(price - save)
            } else {
                setSavings(0)
                setFinalPrice(price)
            }
        } else {
            // Calculate Discount % given Original + Final Price
            // secondVal is Final Price
            if (price > 0 && secondVal > 0) {
                const save = price - secondVal
                setSavings(Math.max(save, 0))
                setCalculatedDiscount(save > 0 ? (save / price) * 100 : 0)
            } else {
                setSavings(0)
                setCalculatedDiscount(0)
            }
        }
    }, [originalPrice, discountValue, mode])

    const formatCurrency = (val: number) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: currency,
            maximumFractionDigits: 2
        }).format(val)
    }

    return (
        <FadeIn className="w-full max-w-6xl mx-auto py-8 px-4" duration={0.6}>
            <div className="flex justify-center mb-8">
                <div className="bg-slate-100 p-1.5 rounded-xl inline-flex relative shadow-inner">
                    <TooltipProvider>
                        <Tooltip delayDuration={300}>
                            <TooltipTrigger asChild>
                                <button
                                    onClick={() => { setMode("find-price"); resetFields(); }}
                                    className={`relative z-10 px-6 py-2.5 text-sm font-medium rounded-lg transition-colors duration-200 ${mode === "find-price" ? "text-slate-900" : "text-slate-500 hover:text-slate-700"}`}
                                >
                                    Find Final Price
                                    {mode === "find-price" && (
                                        <motion.div
                                            layoutId="active-pill"
                                            className="absolute inset-0 bg-white rounded-lg shadow-sm border border-slate-200/50 -z-10"
                                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                        />
                                    )}
                                </button>
                            </TooltipTrigger>
                            <TooltipContent side="bottom" className="text-xs max-w-[200px] text-center bg-slate-800 text-white border-slate-700">
                                Enter Original Price & Discount % to calculate what you pay.
                            </TooltipContent>
                        </Tooltip>

                        <Tooltip delayDuration={300}>
                            <TooltipTrigger asChild>
                                <button
                                    onClick={() => { setMode("find-discount"); resetFields(); }}
                                    className={`relative z-10 px-6 py-2.5 text-sm font-medium rounded-lg transition-colors duration-200 ${mode === "find-discount" ? "text-slate-900" : "text-slate-500 hover:text-slate-700"}`}
                                >
                                    Find Discount %
                                    {mode === "find-discount" && (
                                        <motion.div
                                            layoutId="active-pill"
                                            className="absolute inset-0 bg-white rounded-lg shadow-sm border border-slate-200/50 -z-10"
                                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                        />
                                    )}
                                </button>
                            </TooltipTrigger>
                            <TooltipContent side="bottom" className="text-xs max-w-[200px] text-center bg-slate-800 text-white border-slate-700">
                                Enter Original & Final Price to see the discount percentage.
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                {/* Inputs Section */}
                <div className="lg:col-span-7 space-y-6">
                    <Card className="border border-slate-200 shadow-sm bg-white">
                        <CardHeader className="pb-4 border-b border-slate-50 flex flex-row items-center justify-between space-y-0">
                            <div className="space-y-1">
                                <div className="flex items-center gap-2">
                                    <CardTitle className="text-xl font-bold text-slate-800">
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
                                </div>
                                <CardDescription>
                                    {mode === "find-price" ? "Enter price and discount percentage." : "Enter original and final price."}
                                </CardDescription>
                            </div>
                            <div className="w-[140px]">
                                <CurrencyCombobox value={currency} onValueChange={setCurrency} />
                            </div>
                        </CardHeader>
                        <CardContent className="space-y-5 pt-6">
                            <CalculatorInput
                                label={`Original Price (${symbol})`}
                                value={originalPrice}
                                onChange={setOriginalPrice}
                                placeholder="100.00"
                                max={1000000}
                                tooltip="The price before any discount is applied."
                            />

                            {mode === "find-price" ? (
                                <CalculatorInput
                                    label="Discount Percentage (%)"
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

                            <Button
                                variant="outline"
                                onClick={resetFields}
                                className="w-full text-slate-500 hover:text-slate-700"
                            >
                                <RefreshCw className="w-4 h-4 mr-2" />
                                Reset Calculator
                            </Button>
                        </CardContent>
                    </Card>
                </div>

                {/* Results Section */}
                <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-8">
                    {/* Main Result Card */}
                    <ResultFeedbackCard
                        title={mode === "find-price" ? "Final Price" : "Discount Percentage"}
                        mainValue={
                            mode === "find-price" ? (
                                <Counter value={finalPrice} formatter={formatCurrency} key={currency} />
                            ) : (
                                <Counter value={calculatedDiscount} formatter={(v) => `${v.toFixed(2)}%`} />
                            )
                        }
                        secondaryMetrics={[
                            {
                                label: "You Save",
                                value: <Counter value={savings} formatter={formatCurrency} key={currency} />,
                                color: "text-emerald-400"
                            },
                            {
                                label: mode === "find-price" ? "Discount %" : "Original Price",
                                value: mode === "find-price" ? (
                                    <Counter value={Number(discountValue) || 0} formatter={(v) => `${v}%`} />
                                ) : (
                                    <Counter value={Number(originalPrice) || 0} formatter={formatCurrency} key={currency} />
                                ),
                                color: "text-blue-400"
                            }
                        ]}
                    />

                    {/* Additional Info / Comparison */}
                    <div className="grid grid-cols-1 gap-4">
                        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <div className="bg-blue-50 p-2 rounded-lg text-blue-500">
                                    <TrendingDown className="w-5 h-5" />
                                </div>
                                <div>
                                    <p className="text-xs font-medium text-slate-500 mb-0.5">Summary</p>
                                    <p className="text-sm font-medium text-slate-800">
                                        {originalPrice && discountValue ? (
                                            mode === "find-price" ? (
                                                <>Original {formatCurrency(Number(originalPrice))} minus {discountValue}% OFF</>
                                            ) : (
                                                <>Original {formatCurrency(Number(originalPrice))} discounted to {formatCurrency(Number(discountValue))}</>
                                            )
                                        ) : "Enter values to see summary"}
                                    </p>
                                </div>
                            </div>
                            <ArrowRight className="w-4 h-4 text-slate-300" />
                        </div>
                    </div>
                </div>
            </div>
        </FadeIn>
    )
}
