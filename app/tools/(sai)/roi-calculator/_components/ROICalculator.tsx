"use client"

import React, { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"
import { HelpCircle, TrendingUp, DollarSign, Percent, BarChart3 } from "lucide-react"
import { CurrencyCombobox } from "@/app/tools/_shared/components"
import { FadeIn, Counter, CalculatorInput, ResultFeedbackCard } from "@/app/tools/_shared/components"

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

    const scrollToGuide = () => {
        const element = document.getElementById('roi-guide');
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

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
                        <CardHeader className="pb-4 border-b border-slate-50 flex flex-row items-center justify-between space-y-0">
                            <div className="space-y-1">
                                <div className="flex items-center gap-2">
                                    <CardTitle className="text-xl font-bold text-slate-800">
                                        Investment Details
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
                                <CardDescription>Enter amount invested and returned.</CardDescription>
                            </div>
                            <div className="w-[140px]">
                                <CurrencyCombobox value={currency} onValueChange={setCurrency} />
                            </div>
                        </CardHeader>
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
                                <div className="relative flex bg-slate-100 p-1 rounded-lg border border-slate-200 w-fit">
                                    {/* Animated Background Pill */}
                                    <motion.div
                                        className="absolute bg-white rounded-md shadow-sm border border-blue-200"
                                        initial={false}
                                        animate={{
                                            x: mode === "dates" ? 0 : "100%",
                                            width: "50%"
                                        }}
                                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                        style={{ top: 4, bottom: 4, left: 4, width: 'calc(50% - 4px)' }}
                                    />

                                    <button
                                        type="button"
                                        onClick={() => setMode("dates")}
                                        className={cn(
                                            "relative z-10 px-4 py-1.5 rounded-md text-[10px] font-bold transition-colors uppercase tracking-wider w-24",
                                            mode === "dates" ? "text-blue-600" : "text-slate-500 hover:text-slate-800"
                                        )}
                                    >
                                        Use Dates
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setMode("length")}
                                        className={cn(
                                            "relative z-10 px-4 py-1.5 rounded-md text-[10px] font-bold transition-colors uppercase tracking-wider w-24",
                                            mode === "length" ? "text-blue-600" : "text-slate-500 hover:text-slate-800"
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
                <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-8">
                    <ResultFeedbackCard
                        title="Investment ROI"
                        mainValue={
                            <Counter value={safeROI} formatter={(v) => `${v.toFixed(2)}%`} />
                        }
                        valueColor={safeGain > 0 ? "text-emerald-400" : (safeGain < 0 ? "text-red-400" : "text-white")}
                        secondaryMetrics={[
                            {
                                label: "Investment Gain",
                                value: <Counter value={safeGain} formatter={formatCurrency} key={currency} />,
                                color: safeGain >= 0 ? 'text-emerald-400' : 'text-red-400'
                            },
                            {
                                label: "Annualized ROI",
                                value: <Counter value={safeAnnualized} formatter={(v) => `${v.toFixed(2)}%`} />,
                                color: "text-blue-400"
                            }
                        ]}
                    />

                    <div className="grid grid-cols-2 gap-4">
                        <ResultCard
                            title="Total Investment"
                            value={<Counter value={invested} formatter={formatCurrency} key={`inv-${currency}`} />}
                            icon={DollarSign}
                            tooltip="The initial amount of capital you put into this investment."
                        />
                        <ResultCard
                            title="Investment Length"
                            value={
                                <div className="flex items-baseline gap-1">
                                    <Counter value={safeYears} formatter={(v) => v.toFixed(3)} />
                                    <span className="text-xs font-normal">years</span>
                                </div>
                            }
                            icon={BarChart3}
                            tooltip="The total time duration between your investment date and the return date."
                        />
                    </div>
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
                <div className="text-lg font-bold text-slate-800">{value}</div>
            </div>
            <div className="bg-slate-50 p-2 rounded-lg text-slate-400">
                <Icon className="w-5 h-5" />
            </div>
        </div>
    )
}
