"use client"

import React, { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { TrendingUp, DollarSign, Percent, BarChart3 } from "lucide-react"
import { CalculatorCardHeader, CalculatorInput, Counter, CurrencyCombobox, FadeIn, ResultFeedbackCard } from "@/app/tools/_shared/components"

export function ROICalculator() {
    const [currency, setCurrency] = useState("USD")
    const [amountInvested, setAmountInvested] = useState<number | "">("")
    const [amountReturned, setAmountReturned] = useState<number | "">("")
    const [mode, setMode] = useState<"dates" | "length">("dates")

    // Date mode states
    const [fromDate, setFromDate] = useState<string>(new Date().toISOString().split('T')[0])
    const [toDate, setToDate] = useState<string>(new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString().split('T')[0])

    // Length mode states
    const [lengthValue, setLengthValue] = useState<number | "">("")
    const [lengthUnit, setLengthUnit] = useState<"days" | "months" | "years">("years")

    const val = (v: number | "") => (v === "" ? 0 : v)

    const currencySymbols: Record<string, string> = {
        USD: '$', EUR: '€', GBP: '£', INR: '₹', AUD: 'A$', CAD: 'C$', JPY: '¥', CNY: '¥',
        AED: 'AED', SGD: 'S$', HKD: 'HK$', CHF: 'Fr', MXN: 'MX$', BRL: 'R$', KRW: '₩',
        RUB: '₽', ZAR: 'R', SEK: 'kr', NOK: 'kr', DKK: 'kr', PLN: 'zł', THB: '฿',
        IDR: 'Rp', MYR: 'RM', PHP: '₱', VND: '₫', TRY: '₺', SAR: '﷼', NZD: 'NZ$',
        EGP: 'E£', PKR: '₨', BDT: '৳', NGN: '₦', KES: 'KSh'
    }
    const symbol = currencySymbols[currency] || "$"
    const handleReset = () => {
        setAmountInvested("")
        setAmountReturned("")
        setLengthValue("")
        setFromDate(new Date().toISOString().split('T')[0])
        setToDate(new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString().split('T')[0])
    }

    // Calculations
    const invested = val(amountInvested)
    const returned = val(amountReturned)

    // Calculate investment length in years
    let years = 0
    if (mode === "dates") {
        const start = new Date(fromDate)
        const end = new Date(toDate)
        const diffTime = end.getTime() - start.getTime()
        const diffDays = Math.max(0, Math.ceil(diffTime / (1000 * 60 * 60 * 24)))
        years = diffDays / 365
    } else {
        const lv = val(lengthValue)
        if (lengthUnit === "years") years = Math.max(0, lv)
        else if (lengthUnit === "months") years = Math.max(0, lv / 12)
        else if (lengthUnit === "days") years = Math.max(0, lv / 365)
    }

    const investmentGain = returned - invested

    // Safety check for ROI calculation
    const totalROI = (invested > 0 && Number.isFinite(investmentGain))
        ? (investmentGain / invested) * 100
        : 0

    // Annualized ROI formula: ((Returned / Invested) ^ (1 / years) - 1) * 100
    // We need to be very defensive here to prevent NaN/Infinity
    let annualizedROI = 0
    if (invested > 0 && returned > 0 && years > 0) {
        const ratio = returned / invested
        const result = (Math.pow(ratio, 1 / years) - 1) * 100
        if (Number.isFinite(result)) {
            annualizedROI = result
        }
    }

    // Final safety check for all values passed to the UI
    const safeROI = Number.isFinite(totalROI) ? totalROI : 0
    const safeAnnualized = Number.isFinite(annualizedROI) ? annualizedROI : 0
    const safeGain = Number.isFinite(investmentGain) ? investmentGain : 0
    const safeYears = Number.isFinite(years) ? years : 0

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
                        <CalculatorCardHeader

                            description="Calculate your return on investment."

                            onReset={handleReset}

                            guideId="roi-guide"

                            currency={currency}

                            onCurrencyChange={setCurrency}

                        />
                        <CardContent className="space-y-6 pt-6">
                            <CalculatorInput
                                label={`Amount Invested (${symbol})`}
                                value={amountInvested}
                                onChange={setAmountInvested}
                                placeholder="1000.00"
                                max={10000000}
                                tooltip="The total dollar amount you originally put into the investment."
                            />
                            <CalculatorInput
                                label={`Amount Returned (${symbol})`}
                                value={amountReturned}
                                onChange={setAmountReturned}
                                placeholder="2000.00"
                                max={10000000}
                                tooltip="The final total value you received back from the investment (including your original capital)."
                            />

                            <div className="space-y-4 pt-4 border-t border-slate-50">
                                <label className="text-sm font-bold text-slate-600">Investment Time</label>
                                <div className="relative flex bg-slate-100 p-1 rounded-xl border border-slate-200 w-full sm:w-fit">
                                    <motion.div
                                        className="absolute bg-white rounded-lg shadow-sm border border-slate-200"
                                        initial={false}
                                        animate={{
                                            x: mode === "dates" ? 0 : "100%",
                                        }}
                                        transition={{ type: "spring", stiffness: 350, damping: 35 }}
                                        style={{ top: 2, bottom: 2, left: 2, width: 'calc(50% - 2px)' }}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setMode("dates")}
                                        className={cn(
                                            "relative z-10 px-4 py-2 rounded-lg text-xs font-semibold transition-all duration-200 w-28",
                                            mode === "dates" ? "text-blue-600" : "text-slate-500 hover:text-slate-700"
                                        )}
                                    >
                                        Use Dates
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setMode("length")}
                                        className={cn(
                                            "relative z-10 px-4 py-2 rounded-lg text-xs font-semibold transition-all duration-200 w-28",
                                            mode === "length" ? "text-blue-600" : "text-slate-500 hover:text-slate-700"
                                        )}
                                    >
                                        Use Length
                                    </button>
                                </div>

                                <motion.div
                                    layout
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    key={mode}
                                    className="space-y-4"
                                >
                                    {mode === "dates" ? (
                                        <div className="space-y-4">
                                            <div className="flex items-center justify-between gap-4 group">
                                                <label className="text-base font-semibold text-slate-700 group-hover:text-blue-600 transition-colors">From Date</label>
                                                <input
                                                    type="date"
                                                    value={fromDate}
                                                    onChange={(e) => setFromDate(e.target.value)}
                                                    className="h-10 px-3 rounded-md border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-medium bg-white w-36 md:w-44 text-right hover:border-blue-300"
                                                />
                                            </div>
                                            <div className="flex items-center justify-between gap-4 group">
                                                <label className="text-base font-semibold text-slate-700 group-hover:text-blue-600 transition-colors">To Date</label>
                                                <input
                                                    type="date"
                                                    value={toDate}
                                                    onChange={(e) => setToDate(e.target.value)}
                                                    className="h-10 px-3 rounded-md border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-medium bg-white w-36 md:w-44 text-right hover:border-blue-300"
                                                />
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="flex items-center justify-between gap-4 group">
                                            <label className="text-base font-semibold text-slate-700 group-hover:text-blue-600 transition-colors">Duration</label>
                                            <div className="flex gap-2 items-center">
                                                <input
                                                    type="number"
                                                    value={lengthValue}
                                                    onChange={(e) => setLengthValue(e.target.value === "" ? "" : Number(e.target.value))}
                                                    placeholder="Ex: 1"
                                                    className="h-10 px-3 rounded-md border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-medium bg-white w-20 text-right hover:border-blue-300"
                                                />
                                                <select
                                                    value={lengthUnit}
                                                    onChange={(e) => setLengthUnit(e.target.value as any)}
                                                    className="h-10 px-2 rounded-md border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-medium bg-white cursor-pointer hover:border-blue-300"
                                                >
                                                    <option value="days">Days</option>
                                                    <option value="months">Months</option>
                                                    <option value="years">Years</option>
                                                </select>
                                            </div>
                                        </div>
                                    )}
                                </motion.div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Results Section */}
                <div className="lg:col-span-5 space-y-4 lg:sticky lg:top-8">
                    <ResultFeedbackCard
                        title="Investment ROI"
                        mainValue={
                            <Counter value={safeROI} formatter={(v) => `${v.toFixed(2)}%`} />
                        }
                        valueColor={safeGain > 0 ? "text-blue-400" : (safeGain < 0 ? "text-red-400" : "text-white")}
                    />

                    {/* Return Indicator */}
                    {invested > 0 && returned > 0 && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className={cn(
                                "px-4 py-3 rounded-xl border text-center text-sm font-semibold",
                                safeROI >= 100
                                    ? "bg-blue-50 border-blue-200 text-blue-700"
                                    : safeROI >= 20
                                        ? "bg-blue-50 border-blue-200 text-blue-700"
                                        : safeROI >= 0
                                            ? "bg-amber-50 border-amber-200 text-amber-700"
                                            : "bg-red-50 border-red-200 text-red-700"
                            )}
                        >
                            {safeROI >= 100
                                ? " Excellent Return!"
                                : safeROI >= 20
                                    ? " Strong Return!"
                                    : safeROI >= 0
                                        ? " Positive Return"
                                        : " Loss on Investment"}
                        </motion.div>
                    )}

                    {/* Investment Breakdown */}
                    {invested > 0 || returned > 0 ? (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden border-l-4 border-l-blue-500"
                        >
                            <div className="px-5 py-3.5 border-b border-slate-100">
                                <p className="text-xs font-bold text-slate-600 uppercase tracking-wider">Investment Breakdown</p>
                            </div>
                            <div className="divide-y divide-slate-100">
                                <div className="flex justify-between items-center px-5 py-3.5">
                                    <span className="text-sm text-slate-600">Amount Invested</span>
                                    <span className="text-sm font-semibold text-slate-800">{formatCurrency(invested)}</span>
                                </div>
                                <div className="flex justify-between items-center px-5 py-3.5">
                                    <span className="text-sm text-slate-600">Amount Returned</span>
                                    <span className="text-sm font-semibold text-slate-800">{formatCurrency(returned)}</span>
                                </div>
                                <div className={cn("flex justify-between items-center px-5 py-3.5", safeGain >= 0 ? "bg-blue-50/50" : "bg-red-50/50")}>
                                    <span className={cn("text-sm font-semibold", safeGain >= 0 ? "text-blue-700" : "text-red-700")}>
                                        {safeGain >= 0 ? "Net Gain" : "Net Loss"}
                                    </span>
                                    <span className={cn("text-sm font-bold", safeGain >= 0 ? "text-blue-700" : "text-red-700")}>
                                        {safeGain >= 0 ? "+" : ""}{formatCurrency(safeGain)}
                                    </span>
                                </div>
                                <div className="flex justify-between items-center px-5 py-3.5">
                                    <span className="text-sm text-slate-600">Investment Period</span>
                                    <span className="text-sm font-semibold text-slate-800">
                                        {safeYears >= 1 ? `${safeYears.toFixed(1)} years` : `${Math.round(safeYears * 365)} days`}
                                    </span>
                                </div>
                                {safeAnnualized !== 0 && (
                                    <div className="flex justify-between items-center px-5 py-4 bg-blue-50/50">
                                        <span className="text-sm font-bold text-blue-700">Annualized Return</span>
                                        <span className="text-base font-bold text-blue-700">{safeAnnualized.toFixed(2)}%</span>
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    ) : (
                        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 text-center">
                            <p className="text-sm text-slate-400">Enter values to see the investment breakdown.</p>
                        </div>
                    )}
                </div>
            </div>
        </FadeIn>
    )
}


