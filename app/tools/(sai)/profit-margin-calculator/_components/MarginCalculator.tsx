"use client"

import React, { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { HelpCircle, Info, TrendingUp, DollarSign, Percent, ChevronDown, ChevronUp, ChevronsUpDown, RotateCcw } from "lucide-react"
import { CurrencyCombobox } from "@/app/tools/_shared/components"
import { FadeIn, Counter, CalculatorInput, ResultFeedbackCard } from "@/app/tools/_shared/components"
import { cn } from "@/lib/utils"

export function MarginCalculator() {
    const [currency, setCurrency] = useState("USD")
    const [costPrice, setCostPrice] = useState<number | "">("")
    const [salesPrice, setSalesPrice] = useState<number | "">("")
    const [quantity, setQuantity] = useState<number | "">("")

    // Advanced Settings State
    const [showAdvanced, setShowAdvanced] = useState(false)
    const [shippingCost, setShippingCost] = useState<number | "">("")
    const [otherCosts, setOtherCosts] = useState<number | "">("")
    const [taxRate, setTaxRate] = useState<number | "">("")

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
        const element = document.getElementById('margin-guide');
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const handleReset = () => {
        setCostPrice("")
        setSalesPrice("")
        setQuantity("")
        setShippingCost("")
        setOtherCosts("")
        setTaxRate("")
    }

    // Calculations
    const cost = val(costPrice)
    const price = val(salesPrice)
    const qty = val(quantity) === 0 ? 1 : val(quantity)
    const shipping = val(shippingCost)
    const other = val(otherCosts)
    const taxPercent = val(taxRate)

    // Per Unit Calculations
    const grossProfitPerUnit = price - cost
    const taxAmountPerUnit = price > 0 ? (price * (taxPercent / 100)) : 0
    const totalCostPerUnit = cost + shipping + other + taxAmountPerUnit
    const netProfitPerUnit = price - totalCostPerUnit

    // Totals
    const totalRevenue = price * qty
    const totalCostOfGoods = totalCostPerUnit * qty
    const totalNetProfit = netProfitPerUnit * qty

    // Margins
    const grossMarginPercent = price > 0 ? (grossProfitPerUnit / price) * 100 : 0
    const netMarginPercent = price > 0 ? (netProfitPerUnit / price) * 100 : 0
    const markupPercent = totalCostPerUnit > 0 ? (netProfitPerUnit / totalCostPerUnit) * 100 : 0
    const roiPercent = (cost + shipping + other) > 0 ? (netProfitPerUnit / (cost + shipping + other)) * 100 : 0

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
                                <CardDescription>Calculate your net profit and margin.</CardDescription>
                            </div>
                            <div className="w-[140px]">
                                <CurrencyCombobox value={currency} onValueChange={setCurrency} />
                            </div>
                        </CardHeader>
                        <CardContent className="space-y-5 pt-6">
                            <CalculatorInput
                                label={`Cost Price (${symbol})`}
                                value={costPrice}
                                onChange={setCostPrice}
                                placeholder="50.00"
                                max={100000}
                                tooltip="The total cost to produce or acquire one unit of the product."
                            />
                            <CalculatorInput
                                label={`Selling Price (${symbol})`}
                                value={salesPrice}
                                onChange={setSalesPrice}
                                placeholder="100.00"
                                max={100000}
                                tooltip="The price at which you sell one unit of the product."
                            />
                            <CalculatorInput
                                label="Quantity (Optional)"
                                value={quantity}
                                onChange={setQuantity}
                                placeholder="1"
                                max={10000}
                                tooltip="Number of units sold. Defaults to 1 if left empty."
                            />

                            {/* Advanced Toggle */}
                            <div className="pt-2">
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
                                                Shipping, Tax, & Misc Costs
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
                                    <FadeIn className="marginTop-4 p-5 bg-slate-50/50 rounded-xl border border-slate-200/60 space-y-4 mt-4">
                                        <CalculatorInput
                                            label={`Shipping Cost per Unit (${symbol})`}
                                            value={shippingCost}
                                            onChange={setShippingCost}
                                            placeholder="5.00"
                                            max={10000}
                                            tooltip="Cost to ship the item to the customer (if you pay for it)."
                                        />
                                        <CalculatorInput
                                            label={`Misc. Fees / Packaging (${symbol})`}
                                            value={otherCosts}
                                            onChange={setOtherCosts}
                                            placeholder="2.00"
                                            max={10000}
                                            tooltip="Any extra costs per unit (e.g. packaging, transaction fees)."
                                        />
                                        <CalculatorInput
                                            label="Tax Rate (%)"
                                            value={taxRate}
                                            onChange={setTaxRate}
                                            placeholder="8.0"
                                            max={100}
                                            tooltip="Sales tax rate passing through to expenses or reducing net."
                                        />
                                    </FadeIn>
                                )}
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Results Section */}
                <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-8">
                    {/* Main Profit Card */}
                    <ResultFeedbackCard
                        title={(quantity && quantity > 1) ? 'Total Net Profit' : 'Net Profit per Unit'}
                        mainValue={
                            <Counter value={totalNetProfit} formatter={formatCurrency} key={currency} />
                        }
                        valueColor={totalNetProfit > 0 ? "text-emerald-400" : (totalNetProfit < 0 ? "text-red-400" : "text-white")}
                        mainMetricColor={totalNetProfit >= 0 ? 'text-white' : 'text-red-200'}
                        secondaryMetrics={[
                            {
                                label: "Net Margin",
                                value: <Counter value={netMarginPercent} formatter={(v) => `${v.toFixed(2)}%`} />,
                                color: totalNetProfit >= 0 ? 'text-emerald-400' : 'text-red-400'
                            },
                            {
                                label: "ROI",
                                value: <Counter value={roiPercent} formatter={(v) => `${v.toFixed(2)}%`} />,
                                color: "text-blue-400"
                            }
                        ]}
                    />

                    {/* Breakdown Grid */}
                    <div className="grid grid-cols-2 gap-3">
                        <ResultCard
                            title="Total Revenue"
                            value={<Counter value={totalRevenue} formatter={formatCurrency} key={currency} />}
                            icon={DollarSign}
                        />
                        <ResultCard
                            title="Total Costs"
                            value={<Counter value={totalCostOfGoods} formatter={formatCurrency} key={currency} />}
                            icon={TrendingUp}
                            tooltip="Includes Cost Price + Shipping + Misc + Tax"
                        />
                        <ResultCard
                            title="Gross Margin"
                            value={`${grossMarginPercent.toFixed(2)}%`}
                            icon={Percent}
                            tooltip="Margin before extra expenses (Price - Cost Price)."
                        />
                        <ResultCard
                            title="Markup"
                            value={`${markupPercent.toFixed(2)}%`}
                            icon={TrendingUp}
                            tooltip="Percentage mark-up over total costs."
                        />
                    </div>
                </div>
            </div>
        </FadeIn>
    )
}

function ResultCard({ title, value, icon: Icon, tooltip }: { title: string, value: React.ReactNode, icon: any, tooltip?: string }) {
    return (
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between group hover:border-blue-300 transition-colors">
            <div>
                <p className="text-xs font-semibold text-slate-500 mb-1 flex items-center gap-1.5">
                    {title}
                    {tooltip && (
                        <TooltipProvider delayDuration={100}>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <Info className="w-3 h-3 text-slate-300 hover:text-blue-500 cursor-help transition-colors" />
                                </TooltipTrigger>
                                <TooltipContent className="text-xs bg-slate-900 text-white border-slate-800">
                                    {tooltip}
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    )}
                </p>
                <p className="text-lg font-bold text-slate-800">{value}</p>
            </div>
            <div className="bg-slate-50 p-2 rounded-lg text-slate-400 group-hover:text-blue-500 transition-colors">
                <Icon className="w-4 h-4" />
            </div>
        </div>
    )
}
