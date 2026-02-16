"use client"

import React, { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { HelpCircle, Package, Scissors, Star, Timer, DollarSign, Percent, ChevronDown, ChevronUp, ChevronsUpDown } from "lucide-react"
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

    // Percentage breakdown
    const materialPercentage = totalPackagingCost > 0 ? (totalMaterialCost / totalPackagingCost) * 100 : 0
    const laborPercentage = totalPackagingCost > 0 ? (laborCostPerUnit / totalPackagingCost) * 100 : 0

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
                                        Packaging Details
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
                                <CardDescription>Enter costs for materials and labor per unit.</CardDescription>
                            </div>
                            <div className="w-[140px]">
                                <CurrencyCombobox value={currency} onValueChange={setCurrency} />
                            </div>
                        </CardHeader>
                        <CardContent className="space-y-8 pt-6">

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

                        </CardContent>
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
                        valueColor="text-blue-600"
                        secondaryMetrics={[
                            {
                                label: "Total Materials",
                                value: <Counter value={totalMaterialCost} formatter={formatCurrency} key={`tmc-${currency}`} />,
                                color: "text-slate-600"
                            },
                            {
                                label: "Labor Cost",
                                value: <Counter value={laborCostPerUnit} formatter={formatCurrency} key={`tlc-${currency}`} />,
                                color: "text-slate-600"
                            }
                        ]}
                    />

                    {/* Breakdown Cards */}
                    <div className="grid grid-cols-2 gap-4">
                        <ResultCard
                            title="Materials Share"
                            value={<Counter value={materialPercentage} formatter={(v) => `${v.toFixed(1)}%`} />}
                            icon={Package}
                            color="text-blue-600"
                        />
                        <ResultCard
                            title="Labor Share"
                            value={<Counter value={laborPercentage} formatter={(v) => `${v.toFixed(1)}%`} />}
                            icon={Scissors}
                            color="text-amber-600"
                        />
                    </div>

                    {/* Optimization Insight */}
                    <Card className="border border-blue-100 shadow-sm bg-gradient-to-br from-blue-50/50 to-white overflow-hidden">
                        <div className="p-5">
                            <div className="flex items-center gap-3 mb-3">
                                <div className="p-2 bg-blue-100 rounded-lg">
                                    <Star className="w-4 h-4 text-blue-600" />
                                </div>
                                <h3 className="font-bold text-slate-800">Optimization Insight</h3>
                            </div>
                            <div className="space-y-4">
                                {totalPackagingCost > 2 ? (
                                    <p className="text-sm text-slate-600 leading-relaxed">
                                        Your packaging cost is above <span className="font-bold text-slate-900">$2.00</span>.
                                        Consider using <span className="text-blue-600 font-semibold">poly mailers</span> instead of boxes for non-fragile items to reduce materials cost by up to 60%.
                                    </p>
                                ) : totalPackagingCost > 0 ? (
                                    <p className="text-sm text-slate-600 leading-relaxed">
                                        Your packaging cost is well-optimized. To save further, consider <span className="text-blue-600 font-semibold">bulk purchasing</span> tape and labels, which can reduce per-unit cost by an additional 15-20%.
                                    </p>
                                ) : (
                                    <p className="text-sm text-slate-500 italic">
                                        Enter your details to see optimization tips for your business.
                                    </p>
                                )}
                            </div>
                        </div>
                    </Card>

                    {/* Detailed Breakdown */}
                    <Card className="border border-slate-200 shadow-sm bg-white overflow-hidden">
                        <div className="bg-slate-50 px-4 py-3 border-b border-slate-100 flex justify-between items-center">
                            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Cost Breakdown</p>
                            <span className="text-[10px] font-bold text-slate-400 bg-white px-2 py-0.5 rounded border border-slate-100">Per Unit</span>
                        </div>
                        <div className="divide-y divide-slate-50">
                            <BreakdownRow label="Box / Mailer" value={box} currency={currency} />
                            <BreakdownRow label="Padding / Infill" value={padding} currency={currency} />
                            <BreakdownRow label="Tape & Adhesive" value={tape} currency={currency} />
                            <BreakdownRow label="Label & Ink" value={label} currency={currency} />
                            <BreakdownRow label="Custom Branding" value={branding} currency={currency} />
                            <BreakdownRow label="Pack Labor" value={laborCostPerUnit} currency={currency} isLabor />
                        </div>
                    </Card>

                </div>
            </div>
        </FadeIn>
    )
}

function ResultCard({ title, value, icon: Icon, color = "text-slate-800" }: { title: string, value: React.ReactNode, icon: React.ComponentType<{ className?: string }>, color?: string }) {
    return (
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between group hover:border-blue-200 transition-all duration-300">
            <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">{title}</p>
                <p className={cn("text-xl font-extrabold tracking-tight", color)}>{value}</p>
            </div>
            <div className="bg-slate-50 p-2 rounded-lg text-slate-400 group-hover:bg-blue-50 group-hover:text-blue-500 transition-colors">
                <Icon className="w-5 h-5" />
            </div>
        </div>
    )
}

function BreakdownRow({ label, value, currency, isLabor }: { label: string, value: number, currency: string, isLabor?: boolean }) {
    if (value === 0) return null;

    return (
        <div className={`flex justify-between items-center px-4 py-3 text-sm ${isLabor ? 'bg-blue-50/30' : ''}`}>
            <span className={`text-slate-600 ${isLabor ? 'font-medium text-blue-700' : ''}`}>{label}</span>
            <span className="font-medium text-slate-900">
                {new Intl.NumberFormat('en-US', { style: 'currency', currency: currency }).format(value)}
            </span>
        </div>
    )
}
