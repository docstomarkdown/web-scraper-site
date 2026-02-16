"use client"

import React, { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { CalculatorInput, ResultFeedbackCard, Counter, CurrencyCombobox, currencies, FadeIn } from "@/app/tools/_shared/components"
import { Separator } from "@/components/ui/separator"
import { ShoppingBag, Truck, CreditCard, Tag, DollarSign, Package } from "lucide-react"

export function PODProfitCalculator() {
    const [currency, setCurrency] = useState("USD")

    // Revenue Inputs
    const [sellingPrice, setSellingPrice] = useState<number | "">("")
    const [shippingCharge, setShippingCharge] = useState<number | "">("")

    // Cost Inputs
    const [baseCost, setBaseCost] = useState<number | "">("") // Product + Print
    const [shippingCost, setShippingCost] = useState<number | "">("") // What provider charges
    const [platformFeePercent, setPlatformFeePercent] = useState<number | "">("") // e.g. Etsy 6.5%
    const [transactionFeePercent, setTransactionFeePercent] = useState<number | "">("") // e.g. Stripe 2.9%
    const [transactionFeeFixed, setTransactionFeeFixed] = useState<number | "">("") // e.g. $0.30

    const currencySymbol = currencies.find(c => c.code === currency)?.symbol || "$"

    // Results
    const [totalRevenue, setTotalRevenue] = useState(0)
    const [totalCosts, setTotalCosts] = useState(0)
    const [netProfit, setNetProfit] = useState(0)
    const [margin, setMargin] = useState(0)

    useEffect(() => {
        const price = Number(sellingPrice) || 0
        const charge = Number(shippingCharge) || 0
        const cost = Number(baseCost) || 0
        const shipCost = Number(shippingCost) || 0
        const pFeePct = Number(platformFeePercent) || 0
        const tFeePct = Number(transactionFeePercent) || 0
        const tFeeFixed = Number(transactionFeeFixed) || 0

        // 1. Total Revenue
        const revenue = price + charge

        // 2. Fees
        // Platform fees usually apply to total revenue (price + shipping)
        const platformFees = revenue * (pFeePct / 100)

        // Transaction fees usually apply to total revenue
        const transactionFees = (revenue * (tFeePct / 100)) + tFeeFixed

        const totalFees = platformFees + transactionFees

        // 3. Total Costs
        const allCosts = cost + shipCost + totalFees

        // 4. Net Profit
        const profit = revenue - allCosts

        // 5. Margin
        const calcMargin = revenue > 0 ? (profit / revenue) * 100 : 0

        setTotalRevenue(revenue)
        setTotalCosts(allCosts)
        setNetProfit(profit)
        setMargin(calcMargin)

    }, [sellingPrice, shippingCharge, baseCost, shippingCost, platformFeePercent, transactionFeePercent, transactionFeeFixed])

    return (
        <FadeIn className="w-full max-w-6xl mx-auto space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

                {/* Inputs */}
                <Card className="lg:col-span-7 border-none shadow-lg bg-white/80 backdrop-blur-sm ring-1 ring-slate-900/5">
                    <CardHeader className="pb-6 border-b border-slate-100/50 flex flex-row items-center justify-between space-y-0">
                        <div className="flex items-center gap-3">
                            <div className="p-2.5 bg-indigo-50 rounded-xl">
                                <ShoppingBag className="w-6 h-6 text-indigo-600" />
                            </div>
                            <div>
                                <CardTitle className="text-lg font-semibold text-slate-900">Product & Pricing</CardTitle>
                                <CardDescription>Enter your sales and production details.</CardDescription>
                            </div>
                        </div>
                        <div className="w-[140px]">
                            <CurrencyCombobox value={currency} onValueChange={setCurrency} />
                        </div>
                    </CardHeader>

                    <CardContent className="p-6 md:p-8 space-y-8">
                        {/* Revenue Section */}
                        <div className="space-y-4">
                            <h3 className="text-sm font-medium text-slate-700 flex items-center gap-2">
                                <Tag className="w-4 h-4 text-slate-400" />
                                Revenue
                            </h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <CalculatorInput
                                    label={`Selling Price (${currencySymbol})`}
                                    value={sellingPrice}
                                    onChange={setSellingPrice}
                                    placeholder="25.00"
                                />
                                <CalculatorInput
                                    label={`Shipping Charge (${currencySymbol})`}
                                    value={shippingCharge}
                                    onChange={setShippingCharge}
                                    placeholder="5.00"
                                    tooltip="What you charge the customer for shipping."
                                />
                            </div>
                        </div>

                        <Separator />

                        {/* Cost Section */}
                        <div className="space-y-4">
                            <h3 className="text-sm font-medium text-slate-700 flex items-center gap-2">
                                <Package className="w-4 h-4 text-slate-400" />
                                Base Costs
                            </h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <CalculatorInput
                                    label={`Product Cost (${currencySymbol})`}
                                    value={baseCost}
                                    onChange={setBaseCost}
                                    placeholder="10.00"
                                    tooltip="Base cost from provider (e.g. Printful) including printing."
                                />
                                <CalculatorInput
                                    label={`Shipping Cost (${currencySymbol})`}
                                    value={shippingCost}
                                    onChange={setShippingCost}
                                    placeholder="4.50"
                                    tooltip="What the provider charges YOU for shipping."
                                />
                            </div>
                        </div>

                        <Separator />

                        {/* Fees Section */}
                        <div className="space-y-4">
                            <h3 className="text-sm font-medium text-slate-700 flex items-center gap-2">
                                <CreditCard className="w-4 h-4 text-slate-400" />
                                Platform Fees
                            </h3>
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                <CalculatorInput
                                    label="Platform Fee (%)"
                                    value={platformFeePercent}
                                    onChange={setPlatformFeePercent}
                                    placeholder="5" // Etsy is 6.5% now, 5% is generic
                                    tooltip="Fee charged by the marketplace (e.g. Etsy, eBay)."
                                />
                                <CalculatorInput
                                    label="Trans. Fee (%)"
                                    value={transactionFeePercent}
                                    onChange={setTransactionFeePercent}
                                    placeholder="2.9"
                                />
                                <CalculatorInput
                                    label={`Fixed Fee (${currencySymbol})`}
                                    value={transactionFeeFixed}
                                    onChange={setTransactionFeeFixed}
                                    placeholder="0.30"
                                />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Results */}
                <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-8">
                    <ResultFeedbackCard
                        title="Net Profit"
                        titleLabel="Total Earnings"
                        mainValue={<Counter value={netProfit} prefix={currencySymbol} />}
                        valueColor={netProfit >= 0 ? "text-emerald-400" : "text-red-400"}
                        secondaryMetrics={[
                            {
                                label: "Profit Margin",
                                value: <Counter value={margin} formatter={(v) => `${v.toFixed(1)}%`} />,
                                color: margin >= 15 ? "text-emerald-600" : (margin > 0 ? "text-blue-600" : "text-red-600")
                            },
                            {
                                label: "Total Revenue",
                                value: <Counter value={totalRevenue} prefix={currencySymbol} />,
                            }
                        ]}
                    />

                    {/* Breakdown */}
                    <Card className="border border-slate-200 shadow-sm bg-white p-5">
                        <h4 className="text-sm font-semibold text-slate-900 mb-4 flex items-center gap-2">
                            <DollarSign className="w-4 h-4 text-indigo-500" />
                            Cost Breakdown
                        </h4>
                        <div className="space-y-3">
                            <div className="flex justify-between text-sm">
                                <span className="text-slate-500">Base Cost</span>
                                <span className="font-medium text-slate-700">{currencySymbol}{Number(baseCost).toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-slate-500">Shipping Cost</span>
                                <span className="font-medium text-slate-700">{currencySymbol}{Number(shippingCost).toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-slate-500">Total Fees</span>
                                <span className="font-medium text-red-500">
                                    {currencySymbol}{(Number(totalCosts) - Number(baseCost) - Number(shippingCost)).toFixed(2)}
                                </span>
                            </div>
                            <Separator className="my-2" />
                            <div className="flex justify-between text-sm font-semibold">
                                <span className="text-slate-700">Total Costs</span>
                                <span className="text-slate-900">
                                    {currencySymbol}{totalCosts.toFixed(2)}
                                </span>
                            </div>
                        </div>
                    </Card>
                </div>
            </div>
        </FadeIn>
    )
}
