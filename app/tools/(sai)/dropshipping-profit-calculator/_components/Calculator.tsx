"use client"

import React, { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { HelpCircle, Info } from "lucide-react"
import { CurrencyCombobox } from "@/components/ui/currency-combobox"
import { FadeIn, Counter, CalculatorInput } from "@/app/tools/_shared/components"


export function Calculator() {
    // State for inputs - initialized as empty for placeholder effect
    const [currency, setCurrency] = useState("USD")
    const [purchasePrice, setPurchasePrice] = useState<number | "">("")
    const [salesPrice, setSalesPrice] = useState<number | "">("")
    const [ordersReceived, setOrdersReceived] = useState<number | "">("")
    const [cancelledQty, setCancelledQty] = useState<number | "">("")
    const [rtoPercentage, setRtoPercentage] = useState<number | "">("")
    const [adsCostPerProduct, setAdsCostPerProduct] = useState<number | "">("")
    const [shippingCost, setShippingCost] = useState<number | "">("")
    const [otherCosts, setOtherCosts] = useState<number | "">("")

    // Helper to safely get number for calculation
    const val = (v: number | "") => (v === "" ? 0 : v)

    // Currency symbols map
    const currencySymbols: Record<string, string> = {
        USD: '$', EUR: '€', GBP: '£', INR: '₹', AUD: 'A$', CAD: 'C$', JPY: '¥', CNY: '¥',
        AED: 'AED', SGD: 'S$', HKD: 'HK$', CHF: 'Fr', MXN: 'MX$', BRL: 'R$', KRW: '₩',
        RUB: '₽', ZAR: 'R', SEK: 'kr', NOK: 'kr', DKK: 'kr', PLN: 'zł', THB: '฿',
        IDR: 'Rp', MYR: 'RM', PHP: '₱', VND: '₫', TRY: '₺', SAR: '﷼', NZD: 'NZ$',
        EGP: 'E£', PKR: '₨', BDT: '৳', NGN: '₦', KES: 'KSh'
    }
    const getSymbol = () => currencySymbols[currency] || "$"

    const scrollToGuide = () => {
        const element = document.getElementById('how-to-use');
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    // Calculations
    const purchasePriceVal = val(purchasePrice)
    const salesPriceVal = val(salesPrice)
    const ordersReceivedVal = val(ordersReceived)
    const cancelledQtyVal = val(cancelledQty)
    const rtoPercentageVal = val(rtoPercentage)
    const adsCostPerProductVal = val(adsCostPerProduct)
    const shippingCostVal = val(shippingCost)
    const otherCostsVal = val(otherCosts)

    const marginPerOrder = salesPriceVal - purchasePriceVal
    const totalOrderValue = salesPriceVal * ordersReceivedVal

    const rtoQty = Math.floor(ordersReceivedVal * (rtoPercentageVal / 100))
    const deliveredOrders = Math.max(0, ordersReceivedVal - cancelledQtyVal - rtoQty)

    const totalRtoCost = rtoQty * shippingCostVal
    const totalAdsCost = ordersReceivedVal * adsCostPerProductVal
    const totalOtherCosts = ordersReceivedVal * otherCostsVal
    const totalPurchaseCost = deliveredOrders * purchasePriceVal
    const revenueGenerated = deliveredOrders * salesPriceVal

    const totalExpenses = totalPurchaseCost + totalAdsCost + totalRtoCost + (deliveredOrders * shippingCostVal) + totalOtherCosts
    const netProfit = revenueGenerated - totalExpenses

    // Currency formatter
    const formatCurrency = (val: number) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: currency,
            maximumFractionDigits: 0
        }).format(val)
    }

    const symbol = getSymbol()

    return (
        <FadeIn className="w-full max-w-6xl mx-auto py-8 px-4" duration={0.6}>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

                {/* Left Column: Inputs (Col Span 7) */}
                <div className="lg:col-span-7">
                    <FadeIn delay={0.2} direction="right" className="h-full">
                        <Card className="border border-slate-200 shadow-sm bg-white">
                            <CardHeader className="pb-4 border-b border-slate-50 flex flex-row items-center justify-between space-y-0">
                                <div className="space-y-1">
                                    <div className="flex items-center gap-3">
                                        <CardTitle className="text-2xl font-bold text-blue-600">
                                            Calculator Inputs
                                        </CardTitle>
                                        <TooltipProvider delayDuration={100}>
                                            <Tooltip>
                                                <TooltipTrigger asChild>
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        onClick={scrollToGuide}
                                                        className="text-slate-400 hover:text-slate-900 hover:bg-slate-100 h-8 w-8 rounded-full transition-colors"
                                                    >
                                                        <HelpCircle className="w-4 h-4" />
                                                    </Button>
                                                </TooltipTrigger>
                                                <TooltipContent side="top" className="text-xs bg-slate-900 text-white border-slate-800">
                                                    How to use this calculator
                                                </TooltipContent>
                                            </Tooltip>
                                        </TooltipProvider>
                                    </div>
                                    <CardDescription>Enter your product and marketing costs below.</CardDescription>
                                </div>
                                <div className="w-[180px]">
                                    <CurrencyCombobox value={currency} onValueChange={setCurrency} />
                                </div>
                            </CardHeader>
                            <CardContent className="space-y-6 pt-6">
                                <CalculatorInput
                                    label={`Purchase Price (${symbol})`}
                                    value={purchasePrice}
                                    onChange={setPurchasePrice}
                                    placeholder="50"
                                    max={10000}
                                    tooltip="The cost to buy the product from your supplier."
                                />
                                <CalculatorInput
                                    label={`Selling Price (${symbol})`}
                                    value={salesPrice}
                                    onChange={setSalesPrice}
                                    placeholder="150"
                                    max={20000}
                                    tooltip="The price you sell the product for on your store."
                                />
                                <CalculatorInput
                                    label="Orders Received"
                                    value={ordersReceived}
                                    onChange={setOrdersReceived}
                                    placeholder="100"
                                    max={10000}
                                    tooltip="Total number of orders you received from customers."
                                />
                                <CalculatorInput
                                    label={`Shipping Cost (${symbol})`}
                                    value={shippingCost}
                                    onChange={setShippingCost}
                                    placeholder="8"
                                    max={500}
                                    tooltip="Average shipping cost per order. Applied to all delivered orders."
                                />
                                <CalculatorInput
                                    label={`Ads Cost per Product (CPA) (${symbol})`}
                                    value={adsCostPerProduct}
                                    onChange={setAdsCostPerProduct}
                                    placeholder="20"
                                    max={5000}
                                    tooltip="CPA (Cost Per Acquisition): The average amount you spend on ads to get just one successfully placed order."
                                />
                                <CalculatorInput
                                    label="Return to Origin (RTO %)"
                                    value={rtoPercentage}
                                    onChange={setRtoPercentage}
                                    placeholder="15"
                                    max={100}
                                    tooltip="RTO (Return to Origin): The percentage of orders that are sent back to you because they couldn't be delivered."
                                />
                                <CalculatorInput
                                    label="Cancelled Qty (Before Shipping)"
                                    value={cancelledQty}
                                    onChange={setCancelledQty}
                                    placeholder="5"
                                    max={ordersReceivedVal}
                                    tooltip="Orders cancelled by customers before you shipped them."
                                />
                                <CalculatorInput
                                    label={`Other Cost per Product (${symbol})`}
                                    value={otherCosts}
                                    onChange={setOtherCosts}
                                    placeholder="2"
                                    max={1000}
                                    tooltip="Other: Additional expenses per order like packaging, gateway fees, or handling."
                                />

                            </CardContent>
                        </Card>
                    </FadeIn>
                </div>

                {/* Right Column: Results (Col Span 5) - Sticky & Dark Theme */}
                <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-8">
                    <FadeIn delay={0.4} direction="left" className="space-y-6">

                        {/* Main Profit Card */}
                        <Card className={`border-0 shadow-2xl overflow-hidden relative transition-colors duration-300 ${netProfit >= 0 ? 'bg-[#0f172a]' : 'bg-gradient-to-br from-red-950 to-red-900'} text-white`}>
                            <div className={`absolute top-0 right-0 w-64 h-64 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none ${netProfit >= 0 ? 'bg-blue-600/10' : 'bg-red-600/20'}`} />

                            <CardHeader className="pb-2 relative z-10">
                                <div className="flex items-center justify-between">
                                    <CardTitle className={`text-sm font-medium uppercase tracking-wider ${netProfit >= 0 ? 'text-blue-200' : 'text-red-200'}`}>Net Profit / Loss</CardTitle>
                                    <div className="flex items-center gap-2 bg-slate-800/50 border border-slate-700/50 px-3 py-1 rounded-full text-xs font-medium text-emerald-400">
                                        <div className="relative flex h-2 w-2">
                                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                                        </div>
                                        Live
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent className="relative z-10">
                                <div className="flex items-baseline gap-3 mb-6">
                                    <span className={`text-4xl font-bold tracking-tight ${netProfit >= 0 ? 'text-white' : 'text-red-300'}`}>
                                        <Counter value={netProfit} formatter={formatCurrency} key={currency} />
                                    </span>
                                    {deliveredOrders > 0 && (
                                        <span className={`text-sm font-bold px-3 py-1 rounded-full ${netProfit >= 0 ? 'bg-emerald-500/20 text-emerald-300' : 'bg-red-500/30 text-red-200'}`}>
                                            {netProfit >= 0 ? '↑ PROFIT' : '↓ LOSS'}
                                        </span>
                                    )}
                                </div>

                                <div className="space-y-3 pt-4 border-t border-slate-700/50">
                                    <Row label="Revenue" value={<Counter value={revenueGenerated} formatter={formatCurrency} key={currency} />} className="text-slate-300" />
                                    <Row label="Total Ads Cost" value={<Counter value={totalAdsCost} formatter={formatCurrency} key={currency} />} className="text-slate-400" />
                                    <Row label="Purchase Cost" value={<Counter value={totalPurchaseCost} formatter={formatCurrency} key={currency} />} className="text-slate-400" />
                                    <Row label="Shipping & RTO" value={<Counter value={totalRtoCost + (deliveredOrders * shippingCostVal)} formatter={formatCurrency} key={currency} />} className="text-slate-400" />
                                    <Row label="Other Costs" value={<Counter value={totalOtherCosts} formatter={formatCurrency} key={currency} />} className="text-slate-400" />
                                </div>
                            </CardContent>
                        </Card>

                        {/* Metrics Grid */}
                        <div className="grid grid-cols-2 gap-3">
                            <ResultCard
                                title="Margin per Sale"
                                value={<Counter value={marginPerOrder} formatter={formatCurrency} key={currency} />}
                                tooltip="The profit you make on each sale before advertising and RTO costs. Calculated as: Selling Price - Product Cost."
                            />
                            <ResultCard
                                title="Return on Ad Spend (ROAS)"
                                value={<><Counter value={totalAdsCost > 0 ? (revenueGenerated / totalAdsCost) : 0} formatter={(v) => v.toFixed(2)} />X</>}
                                tooltip="ROAS (Return on Ad Spend): The money you make for every $1 spent on ads. Aim for 4X or more."
                            />
                            <ResultCard
                                title="Delivered"
                                value={<Counter value={deliveredOrders} />}
                                tooltip="Delivered Orders: Total orders that successfully reached your customers."
                            />
                            <ResultCard
                                title="Return to Origin Orders (RTO)"
                                value={<Counter value={rtoQty} />}
                                darkwarning
                                tooltip="RTO (Return to Origin): Orders sent back to you. This costs you double shipping plus wasted ad money."
                            />
                        </div>

                        {/* Context Summary */}
                        <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm text-sm text-slate-600 leading-relaxed">
                            If you purchase at <strong><Counter value={purchasePriceVal} formatter={formatCurrency} key={currency} /></strong> and sell at <strong><Counter value={salesPriceVal} formatter={formatCurrency} key={currency} /></strong>, with <strong><Counter value={ordersReceivedVal} /></strong> orders, your total profit is <strong><Counter value={netProfit} formatter={formatCurrency} key={currency} /></strong>.
                        </div>
                    </FadeIn>
                </div>
            </div>
        </FadeIn>
    )
}

function ResultCard({ title, value, darkwarning, tooltip }: { title: string, value: React.ReactNode, darkwarning?: boolean, tooltip?: string }) {
    return (
        <div className={`p-4 rounded-xl border transition-all duration-200 hover:-translate-y-1 hover:shadow-lg cursor-default ${darkwarning
            ? 'bg-orange-50/50 border-orange-100'
            : 'bg-white border-slate-200 shadow-sm'
            }`}>
            <div className="flex items-center gap-1.5 mb-1">
                <p className="text-xs font-semibold text-slate-500">{title}</p>
                {tooltip && (
                    <TooltipProvider delayDuration={100}>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <button type="button" className="text-slate-400 hover:text-blue-600 transition-colors">
                                    <Info className="h-3 w-3" />
                                </button>
                            </TooltipTrigger>
                            <TooltipContent side="top" className="max-w-xs text-xs bg-slate-900 text-white border-slate-800">
                                {tooltip}
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                )}
            </div>
            <p className={`text-xl font-bold ${darkwarning ? 'text-orange-600' : 'text-slate-800'}`}>{value}</p>
        </div>
    )
}

function Row({ label, value, isNegative, className }: { label: string, value: React.ReactNode, isNegative?: boolean, className?: string }) {
    return (
        <div className={`flex justify-between items-center text-sm ${className}`}>
            <span>{label}</span>
            <span className="font-medium tracking-wide">
                {isNegative ? '-' : ''}{value}
            </span>
        </div>
    )
}
