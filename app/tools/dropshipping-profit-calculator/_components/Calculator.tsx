"use client"

import * as React from "react"
import { useState, useEffect } from "react"
import { CalculatorInput } from "./CalculatorInput"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { IndianRupee, Sparkles } from "lucide-react"
import { FadeIn } from "./FadeIn"

export function Calculator() {
    // State for inputs - initialized as empty for placeholder effect
    const [purchasePrice, setPurchasePrice] = useState<number | "">("")
    const [salesPrice, setSalesPrice] = useState<number | "">("")
    const [ordersReceived, setOrdersReceived] = useState<number | "">("")
    const [cancelledQty, setCancelledQty] = useState<number | "">("")
    const [rtoPercentage, setRtoPercentage] = useState<number | "">("")
    const [adsCostPerProduct, setAdsCostPerProduct] = useState<number | "">("")
    const [shippingCost, setShippingCost] = useState<number | "">("")

    // Helper to safely get number for calculation
    const val = (v: number | "") => (v === "" ? 0 : v)

    // Calculations
    const purchasePriceVal = val(purchasePrice)
    const salesPriceVal = val(salesPrice)
    const ordersReceivedVal = val(ordersReceived)
    const cancelledQtyVal = val(cancelledQty)
    const rtoPercentageVal = val(rtoPercentage)
    const adsCostPerProductVal = val(adsCostPerProduct)
    const shippingCostVal = val(shippingCost)

    const marginPerOrder = salesPriceVal - purchasePriceVal
    const totalOrderValue = salesPriceVal * ordersReceivedVal

    const rtoQty = Math.floor(ordersReceivedVal * (rtoPercentageVal / 100))
    const deliveredOrders = Math.max(0, ordersReceivedVal - cancelledQtyVal - rtoQty)

    const totalRtoCost = rtoQty * shippingCostVal
    const totalAdsCost = ordersReceivedVal * adsCostPerProductVal
    const totalPurchaseCost = deliveredOrders * purchasePriceVal
    const revenueGenerated = deliveredOrders * salesPriceVal

    const totalExpenses = totalPurchaseCost + totalAdsCost + totalRtoCost + (deliveredOrders * shippingCostVal)
    const netProfit = revenueGenerated - totalExpenses

    // Currency formatter
    const formatCurrency = (val: number) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            maximumFractionDigits: 0
        }).format(val)
    }

    return (
        <FadeIn className="w-full max-w-6xl mx-auto py-8 px-4" duration={0.6}>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

                {/* Left Column: Inputs (Col Span 7) */}
                <div className="lg:col-span-7">
                    <FadeIn delay={0.2} direction="right" className="h-full">
                        <Card className="border border-slate-200 shadow-sm bg-white">
                            <CardHeader className="pb-4 border-b border-slate-50">
                                <CardTitle className="text-2xl font-bold text-slate-900 w-fit">
                                    Calculator Inputs
                                </CardTitle>
                                <CardDescription className="pt-1">Enter your product and marketing costs below.</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-6 pt-6">
                                <CalculatorInput
                                    label="Purchase Price (₹)"
                                    value={purchasePrice}
                                    onChange={setPurchasePrice}
                                    placeholder="500"
                                    max={10000}
                                />
                                <CalculatorInput
                                    label="Sales Price (₹)"
                                    value={salesPrice}
                                    onChange={setSalesPrice}
                                    placeholder="1500"
                                    max={20000}
                                />
                                <CalculatorInput
                                    label="Orders Received"
                                    value={ordersReceived}
                                    onChange={setOrdersReceived}
                                    placeholder="100"
                                    max={10000}
                                />
                                <CalculatorInput
                                    label="Cancelled Qty (Before Shipping)"
                                    value={cancelledQty}
                                    onChange={setCancelledQty}
                                    placeholder="5"
                                    max={ordersReceivedVal}
                                />
                                <CalculatorInput
                                    label="Return to Origin (RTO %)"
                                    value={rtoPercentage}
                                    onChange={setRtoPercentage}
                                    placeholder="15"
                                    max={100}
                                    tooltip="Percentage of orders returned before delivery. For COD in India, 15-30% is common."
                                />
                                <CalculatorInput
                                    label="Ads Cost per Product (CPA) (₹)"
                                    value={adsCostPerProduct}
                                    onChange={setAdsCostPerProduct}
                                    placeholder="200"
                                    max={5000}
                                    tooltip="Cost Per Acquisition - your total ad spend divided by number of orders."
                                />

                                <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 mt-4">
                                    <CalculatorInput
                                        label="Return to Origin Cost (₹)"
                                        value={shippingCost}
                                        onChange={setShippingCost}
                                        placeholder="80"
                                        max={500}
                                        tooltip="How much you pay the courier per order. You pay this twice for returned orders."
                                    />
                                    <p className="text-[11px] text-slate-400 mt-2 text-right">
                                        *Applied to delivered orders and RTOs (round-trip)
                                    </p>
                                </div>
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
                                    <div className="flex items-center gap-1.5 text-xs text-slate-400 bg-slate-800/50 px-2 py-1 rounded-full">
                                        <Sparkles className="w-3 h-3 text-emerald-400" />
                                        <span>Live</span>
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent className="relative z-10">
                                <div className="flex items-baseline gap-3 mb-6">
                                    <span className={`text-4xl font-bold tracking-tight ${netProfit >= 0 ? 'text-white' : 'text-red-300'}`}>
                                        {formatCurrency(netProfit)}
                                    </span>
                                    {deliveredOrders > 0 && (
                                        <span className={`text-sm font-bold px-3 py-1 rounded-full ${netProfit >= 0 ? 'bg-emerald-500/20 text-emerald-300' : 'bg-red-500/30 text-red-200'}`}>
                                            {netProfit >= 0 ? '↑ PROFIT' : '↓ LOSS'}
                                        </span>
                                    )}
                                </div>

                                <div className="space-y-3 pt-4 border-t border-slate-700/50">
                                    <Row label="Revenue" value={formatCurrency(revenueGenerated)} className="text-slate-300" />
                                    <Row label="Total Ads Cost" value={formatCurrency(totalAdsCost)} className="text-slate-400" />
                                    <Row label="Purchase Cost" value={formatCurrency(totalPurchaseCost)} className="text-slate-400" />
                                    <Row label="Shipping & RTO" value={formatCurrency(totalRtoCost + (deliveredOrders * shippingCostVal))} className="text-slate-400" />
                                </div>
                            </CardContent>
                        </Card>

                        {/* Metrics Grid */}
                        <div className="grid grid-cols-2 gap-3">
                            <ResultCard title="Margin per Sale" value={formatCurrency(marginPerOrder)} dark />
                            <ResultCard title="Return on Ad Spend (ROAS)" value={`${totalAdsCost > 0 ? ((revenueGenerated / totalAdsCost).toFixed(2)) + 'X' : '0X'}`} dark />
                            <ResultCard title="Delivered" value={`${deliveredOrders}`} dark />
                            <ResultCard title="Return to Origin Orders (RTO)" value={`${rtoQty}`} darkwarning />
                        </div>

                        {/* Context Summary */}
                        <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm text-sm text-slate-600 leading-relaxed">
                            If you purchase products at <strong>{formatCurrency(purchasePriceVal)}</strong> each and sell them at <strong>{formatCurrency(salesPriceVal)}</strong> each, receiving a total of <strong>{ordersReceivedVal}</strong> orders (with <strong>{deliveredOrders}</strong> orders delivered), your total profit or loss would be <strong>{formatCurrency(netProfit)}</strong>.
                        </div>
                    </FadeIn>
                </div>
            </div>
        </FadeIn>
    )
}

function ResultCard({ title, value, dark, darkwarning }: { title: string, value: string, dark?: boolean, darkwarning?: boolean }) {
    return (
        <div className={`p-4 rounded-xl border transition-all duration-200 hover:-translate-y-1 hover:shadow-lg cursor-default ${dark
            ? 'bg-white border-slate-200 shadow-sm'
            : darkwarning
                ? 'bg-orange-50/50 border-orange-100'
                : 'bg-white border-slate-200 shadow-sm'
            }`}>
            <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1">{title}</p>
            <p className={`text-xl font-bold ${darkwarning ? 'text-orange-600' : 'text-slate-800'}`}>{value}</p>
        </div>
    )
}

function Row({ label, value, isNegative, className }: { label: string, value: string, isNegative?: boolean, className?: string }) {
    return (
        <div className={`flex justify-between items-center text-sm ${className}`}>
            <span>{label}</span>
            <span className="font-medium tracking-wide">
                {isNegative ? '-' : ''}{value}
            </span>
        </div>
    )
}
