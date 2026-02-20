"use client"

import React, { useState, useMemo } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { HelpCircle, RotateCcw, Package, Scissors, Star, ChevronDown, ChevronUp, ChevronsUpDown, Layers } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"
import { CurrencyCombobox } from "@/app/tools/_shared/components"
import { FadeIn, Counter, CalculatorInput, ResultFeedbackCard } from "@/app/tools/_shared/components"

export function PackagingCostCalculator() {
    const [currency, setCurrency] = useState("USD")
    const [showAdvanced, setShowAdvanced] = useState(false)
    const [boxCost, setBoxCost] = useState<number | "">("")
    const [paddingCost, setPaddingCost] = useState<number | "">("")
    const [tapeCost, setTapeCost] = useState<number | "">("")
    const [labelCost, setLabelCost] = useState<number | "">("")
    const [brandingCost, setBrandingCost] = useState<number | "">("")
    const [laborTime, setLaborTime] = useState<number | "">("")
    const [hourlyWage, setHourlyWage] = useState<number | "">("")

    const [orderQuantity, setOrderQuantity] = useState<number | "">(1)

    const handleReset = () => {
        setBoxCost("")
        setPaddingCost("")
        setTapeCost("")
        setLabelCost("")
        setBrandingCost("")
        setLaborTime("")
        setHourlyWage("")
        setOrderQuantity(1)
        setShowAdvanced(false)
    }

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
        const element = document.getElementById('packaging-guide');
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    // Calculations
    const box = val(boxCost)
    const padding = val(paddingCost)
    const tape = val(tapeCost)
    const label = val(labelCost)
    const branding = val(brandingCost)

    // Labor Calculation
    const time = val(laborTime)
    const wage = val(hourlyWage)
    const laborCostPerUnit = time > 0 && wage > 0 ? (time / 60) * wage : 0

    const totalMaterialCost = box + padding + tape + label + branding
    const totalPackagingCost = totalMaterialCost + laborCostPerUnit
    const qty = val(orderQuantity)
    const batchTotal = totalPackagingCost * (qty > 0 ? qty : 1)

    const hasInput = totalPackagingCost > 0

    // Percentage breakdown
    const materialPercentage = totalPackagingCost > 0 ? (totalMaterialCost / totalPackagingCost) * 100 : 0
    const laborPercentage = totalPackagingCost > 0 ? (laborCostPerUnit / totalPackagingCost) * 100 : 0

    const formatCurrency = (v: number) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: currency,
            maximumFractionDigits: 2
        }).format(v)
    }

    // Smart insight logic
    const insightMessage = useMemo(() => {
        if (!hasInput) return null

        if (laborPercentage > 60) {
            return (
                <p className="text-sm text-slate-600 leading-relaxed">
                    <span className="text-amber-600 font-semibold">Labor is {laborPercentage.toFixed(0)}%</span> of your packaging cost.
                    Consider <span className="text-blue-600 font-semibold">batch packing</span> multiple orders at once, or outsourcing fulfillment if volume exceeds 100+ orders/day.
                </p>
            )
        }

        if (totalMaterialCost > 0 && box > totalMaterialCost * 0.6) {
            return (
                <p className="text-sm text-slate-600 leading-relaxed">
                    Your <span className="text-blue-600 font-semibold">box/mailer</span> is the biggest cost driver.
                    Try <span className="font-semibold text-slate-900">right-sizing</span> your packaging or switching to poly mailers for non-fragile items — this alone can cut material costs by up to 60%.
                </p>
            )
        }

        if (totalMaterialCost > 0 && branding > totalMaterialCost * 0.3) {
            return (
                <p className="text-sm text-slate-600 leading-relaxed">
                    <span className="text-blue-600 font-semibold">Branding materials</span> are a significant portion of your cost.
                    Consider simplifying inserts or switching to <span className="font-semibold text-slate-900">printed tape</span> instead of separate stickers and cards to maintain brand presence at lower cost.
                </p>
            )
        }

        if (totalPackagingCost > 2) {
            return (
                <p className="text-sm text-slate-600 leading-relaxed">
                    Your packaging cost is above <span className="font-bold text-slate-900">{formatCurrency(2)}</span>.
                    Consider <span className="text-blue-600 font-semibold">bulk purchasing</span> materials — buying in quantities of 500+ typically saves 15-20% per unit.
                </p>
            )
        }

        return (
            <p className="text-sm text-slate-600 leading-relaxed">
                Your packaging cost looks well-optimized at <span className="font-bold text-blue-600">{formatCurrency(totalPackagingCost)}</span> per unit.
                To save further, negotiate <span className="text-blue-600 font-semibold">supplier contracts</span> or consolidate orders for volume discounts.
            </p>
        )
    }, [hasInput, laborPercentage, totalMaterialCost, box, branding, totalPackagingCost, formatCurrency])

    return (
        <FadeIn className="w-full max-w-6xl mx-auto py-8 px-4" duration={0.6}>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

                {/* Inputs Section */}
                <div className="lg:col-span-7 space-y-6">
                    <Card className="border border-slate-200 shadow-sm bg-white">
                        <div className="pb-4 border-b border-slate-50 flex flex-row items-center justify-between space-y-0 p-6">
                            <div className="space-y-1">
                                <div className="flex items-center gap-2">
                                    <h2 className="text-xl font-bold text-blue-600">
                                        Inputs
                                    </h2>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        onClick={scrollToGuide}
                                        className="text-slate-400 hover:text-blue-600 hover:bg-slate-100 h-6 w-6 rounded-full"
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
                                                    className="text-slate-400 hover:text-slate-600 hover:bg-slate-100 h-6 w-6 rounded-full"
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
                                <p className="text-sm text-slate-500 font-medium tracking-tight">Enter costs for materials and labor per unit.</p>
                            </div>
                            <div className="w-[140px]">
                                <CurrencyCombobox value={currency} onValueChange={setCurrency} />
                            </div>
                        </div>
                        <div className="space-y-8 pt-6 p-6">

                            {/* Main Inputs */}
                            <div className="space-y-4">
                                <div className="space-y-4">
                                    <CalculatorInput
                                        label={`Box / Mailer Cost (${symbol})`}
                                        value={boxCost}
                                        onChange={setBoxCost}
                                        placeholder="0.85"
                                        max={100}
                                        tooltip="Cost of the primary shipping container (box, poly mailer, or envelope)."
                                    />
                                    <CalculatorInput
                                        label="Time to Pack (Minutes)"
                                        value={laborTime}
                                        onChange={setLaborTime}
                                        placeholder="2.5"
                                        max={60}
                                        tooltip="Average time it takes to pack one order, including assembling the box."
                                    />
                                    <CalculatorInput
                                        label={`Hourly Wage (${symbol}/hr)`}
                                        value={hourlyWage}
                                        onChange={setHourlyWage}
                                        placeholder="15.00"
                                        max={1000}
                                        tooltip="Hourly cost of the person packing the order (use your own rate if you do it yourself)."
                                    />
                                    <CalculatorInput
                                        label="Order Quantity"
                                        value={orderQuantity}
                                        onChange={setOrderQuantity}
                                        placeholder="1"
                                        max={100000}
                                        tooltip="Number of units to calculate the batch total for."
                                    />
                                </div>
                            </div>

                            {/* Advanced Settings */}
                            <div className="pt-4 border-t border-slate-100">
                                <div
                                    onClick={() => setShowAdvanced(!showAdvanced)}
                                    className={cn(
                                        "flex items-center justify-between p-4 rounded-xl border cursor-pointer transition-all duration-200 group select-none",
                                        showAdvanced
                                            ? "bg-blue-50/50 border-blue-200 shadow-sm"
                                            : "bg-slate-50 border-slate-200 hover:border-blue-300 hover:bg-slate-100"
                                    )}
                                >
                                    <div className="flex items-center gap-3">
                                        <div className={cn(
                                            "w-8 h-8 rounded-full flex items-center justify-center transition-colors",
                                            showAdvanced ? "bg-blue-100 text-blue-600" : "bg-white text-slate-400 group-hover:text-blue-500"
                                        )}>
                                            <ChevronsUpDown className="w-4 h-4" />
                                        </div>
                                        <div className="flex flex-col">
                                            <span className={cn("text-sm font-semibold transition-colors", showAdvanced ? "text-blue-700" : "text-slate-700")}>
                                                Advanced Settings
                                            </span>
                                            <span className="text-[11px] text-slate-400 font-medium">
                                                Tape, Label & Branding details
                                            </span>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <span className={cn(
                                            "text-[10px] px-2 py-0.5 rounded-full font-bold tracking-wide uppercase transition-colors",
                                            showAdvanced ? "bg-blue-100 text-blue-700" : "bg-slate-200 text-slate-500"
                                        )}>
                                            Optional
                                        </span>
                                        {showAdvanced ? <ChevronUp className="w-4 h-4 text-blue-500" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
                                    </div>
                                </div>

                                {showAdvanced && (
                                    <FadeIn className="mt-4 p-5 bg-slate-50/50 rounded-xl border border-slate-200/60 space-y-6">
                                        <div className="space-y-4">
                                            <CalculatorInput
                                                label={`Padding / Infill (${symbol})`}
                                                value={paddingCost}
                                                onChange={setPaddingCost}
                                                placeholder="0.25"
                                                max={50}
                                                tooltip="Cost of protective materials like bubble wrap, packing peanuts, or kraft paper."
                                            />
                                            <CalculatorInput
                                                label={`Tape Cost (${symbol})`}
                                                value={tapeCost}
                                                onChange={setTapeCost}
                                                placeholder="0.05"
                                                max={20}
                                                tooltip="Estimated cost of tape used per package."
                                            />
                                            <CalculatorInput
                                                label={`Shipping Label (${symbol})`}
                                                value={labelCost}
                                                onChange={setLabelCost}
                                                placeholder="0.02"
                                                max={10}
                                                tooltip="Cost of thermal label or paper + ink per package."
                                            />
                                            <CalculatorInput
                                                label={`Branding / Inserts (${symbol})`}
                                                value={brandingCost}
                                                onChange={setBrandingCost}
                                                placeholder="0.15"
                                                max={50}
                                                tooltip="Cost of stickers, thank you cards, tissue paper, or other branding materials."
                                            />
                                        </div>
                                    </FadeIn>
                                )}
                            </div>

                        </div>
                    </Card>
                </div>

                {/* Results Section */}
                <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-8">

                    {/* Main Result Card */}
                    <ResultFeedbackCard
                        title="Total Packaging Cost Per Unit"
                        mainValue={
                            <Counter value={totalPackagingCost} formatter={formatCurrency} key={`tpc-${currency}`} />
                        }
                        valueColor="text-white"
                        secondaryMetrics={[
                            ...(qty > 1 ? [{
                                label: `Batch Total (×${qty.toLocaleString()})`,
                                value: <Counter value={batchTotal} formatter={formatCurrency} key={`bt-${currency}-${qty}`} />,
                                color: "text-blue-500"
                            }] : [])
                        ]}
                    />

                    {/* Cost Breakdown Card */}
                    {hasInput ? (
                        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden border-l-4 border-l-blue-500">
                            <div className="px-5 py-3.5 border-b border-slate-100">
                                <p className="text-xs font-bold text-slate-600 uppercase tracking-wider">Cost Breakdown</p>
                            </div>
                            <div className="divide-y divide-slate-100">
                                <div className="flex justify-between items-center px-5 py-3.5">
                                    <span className="text-sm text-slate-600">Box/Mailer</span>
                                    <span className="text-sm font-semibold text-slate-800">{formatCurrency(box)}</span>
                                </div>
                                <div className="flex justify-between items-center px-5 py-3.5">
                                    <span className="text-sm text-slate-600">Included (Tape, Label, etc.)</span>
                                    <span className="text-sm font-semibold text-slate-800">{formatCurrency(padding + tape + label + branding)}</span>
                                </div>
                                <div className="flex justify-between items-center px-5 py-3.5">
                                    <span className="text-sm text-slate-600">Labor Cost</span>
                                    <span className="text-sm font-semibold text-amber-600">{formatCurrency(laborCostPerUnit)}</span>
                                </div>
                                <div className="flex justify-between items-center px-5 py-4 bg-slate-50">
                                    <span className="text-sm font-bold text-slate-900">Total Per Unit</span>
                                    <span className="text-base font-bold text-blue-600">{formatCurrency(totalPackagingCost)}</span>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 text-center">
                            <p className="text-sm text-slate-400">Enter packaging costs to see breakdown.</p>
                        </div>
                    )}

                    {/* Smart Optimization Insight */}
                    <Card className="border border-blue-100 shadow-sm bg-gradient-to-br from-blue-50/50 to-white overflow-hidden">
                        <div className="p-5">
                            <div className="flex items-center gap-3 mb-3">
                                <div className="p-2 bg-blue-100 rounded-lg">
                                    <Star className="w-4 h-4 text-blue-600" />
                                </div>
                                <h3 className="font-bold text-slate-800">Optimization Insight</h3>
                            </div>
                            <div className="space-y-4">
                                {insightMessage || (
                                    <p className="text-sm text-slate-500 italic">
                                        Enter your details to see optimization tips for your business.
                                    </p>
                                )}
                            </div>
                        </div>
                    </Card>

                </div>
            </div>
        </FadeIn>
    )
}



