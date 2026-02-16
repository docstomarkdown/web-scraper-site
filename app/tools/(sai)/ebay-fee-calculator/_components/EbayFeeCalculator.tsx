"use client"

import React, { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { CalculatorInput, ResultFeedbackCard, Counter, CurrencyCombobox, currencies, FadeIn } from "@/app/tools/_shared/components"
import { Separator } from "@/components/ui/separator"
import { ShoppingCart, Truck, Percent, DollarSign, Tag } from "lucide-react"

export function EbayFeeCalculator() {
    const [currency, setCurrency] = useState("USD")

    // Revenue
    const [soldPrice, setSoldPrice] = useState<number | "">("")
    const [shippingCharged, setShippingCharged] = useState<number | "">("")

    // Costs
    const [itemCost, setItemCost] = useState<number | "">("")
    const [shippingCost, setShippingCost] = useState<number | "">("")

    // Fees
    const [feeRate, setFeeRate] = useState<number | "">("") // 13.25% standard
    const [fixedFee, setFixedFee] = useState<number | "">("") // $0.30
    const [adRate, setAdRate] = useState<number | "">("") // Promoted Listings

    const currencySymbol = currencies.find(c => c.code === currency)?.symbol || "$"

    // Results
    const [totalRevenue, setTotalRevenue] = useState(0)
    const [totalFees, setTotalFees] = useState(0)
    const [netProfit, setNetProfit] = useState(0)
    const [margin, setMargin] = useState(0)

    useEffect(() => {
        if (feeRate === "") setFeeRate(13.25)
        if (fixedFee === "") setFixedFee(0.30)
    }, [])

    useEffect(() => {
        const price = Number(soldPrice) || 0
        const charge = Number(shippingCharged) || 0
        const cost = Number(itemCost) || 0
        const shipCost = Number(shippingCost) || 0
        const rate = Number(feeRate) || 0
        const fixed = Number(fixedFee) || 0
        const ad = Number(adRate) || 0

        // 1. Revenue
        const revenue = price + charge

        if (revenue === 0) {
            setTotalRevenue(0)
            setTotalFees(0)
            setNetProfit(0)
            setMargin(0)
            return
        }

        // 2. Fees
        // Final Value Fee applies to (Price + Shipping + Sales Tax). 
        // We ignore tax here as it varies by buyer location and is a pass-through.
        const fvf = (revenue * (rate / 100)) + fixed

        // Ad Fee applies to the same total amount
        const adFee = revenue * (ad / 100)

        const fees = fvf + adFee

        // 3. Profit
        const totalExpenses = cost + shipCost + fees
        const profit = revenue - totalExpenses

        const calcMargin = (profit / revenue) * 100

        setTotalRevenue(revenue)
        setTotalFees(fees)
        setNetProfit(profit)
        setMargin(calcMargin)

    }, [soldPrice, shippingCharged, itemCost, shippingCost, feeRate, fixedFee, adRate])

    return (
        <FadeIn className="w-full max-w-6xl mx-auto space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

                {/* Inputs */}
                <Card className="lg:col-span-7 border-none shadow-lg bg-white/80 backdrop-blur-sm ring-1 ring-slate-900/5">
                    <CardHeader className="pb-6 border-b border-slate-100/50 flex flex-row items-center justify-between space-y-0">
                        <div className="flex items-center gap-3">
                            <div className="p-2.5 bg-blue-50 rounded-xl">
                                <ShoppingCart className="w-6 h-6 text-blue-600" />
                            </div>
                            <div>
                                <CardTitle className="text-lg font-semibold text-slate-900">eBay Listing Details</CardTitle>
                                <CardDescription>Enter final sale price and costs.</CardDescription>
                            </div>
                        </div>
                        <div className="w-[140px]">
                            <CurrencyCombobox value={currency} onValueChange={setCurrency} />
                        </div>
                    </CardHeader>

                    <CardContent className="p-6 md:p-8 space-y-8">
                        {/* Revenue */}
                        <div className="space-y-4">
                            <h3 className="text-sm font-medium text-slate-700 flex items-center gap-2">
                                <Tag className="w-4 h-4 text-slate-400" />
                                Sale Amount
                            </h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <CalculatorInput
                                    label={`Sold Price (${currencySymbol})`}
                                    value={soldPrice}
                                    onChange={setSoldPrice}
                                    placeholder="45.00"
                                />
                                <CalculatorInput
                                    label={`Shipping Charged (${currencySymbol})`}
                                    value={shippingCharged}
                                    onChange={setShippingCharged}
                                    placeholder="0.00"
                                    tooltip="Amount buyer paid for shipping."
                                />
                            </div>
                        </div>

                        <Separator />

                        {/* Costs */}
                        <div className="space-y-4">
                            <h3 className="text-sm font-medium text-slate-700 flex items-center gap-2">
                                <DollarSign className="w-4 h-4 text-slate-400" />
                                Your Costs
                            </h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <CalculatorInput
                                    label={`Item Cost (${currencySymbol})`}
                                    value={itemCost}
                                    onChange={setItemCost}
                                    placeholder="10.00"
                                    tooltip="What you paid for the item."
                                />
                                <CalculatorInput
                                    label={`Shipping Cost (${currencySymbol})`}
                                    value={shippingCost}
                                    onChange={setShippingCost}
                                    placeholder="5.50"
                                    tooltip="Actual cost to buy the label."
                                />
                            </div>
                        </div>

                        <Separator />

                        {/* Fees */}
                        <div className="space-y-4">
                            <h3 className="text-sm font-medium text-slate-700 flex items-center gap-2">
                                <Percent className="w-4 h-4 text-slate-400" />
                                eBay Fees
                            </h3>
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                <CalculatorInput
                                    label="Final Value Fee (%)"
                                    value={feeRate}
                                    onChange={setFeeRate}
                                    placeholder="13.25"
                                    tooltip="Standard is 13.25% for most categories."
                                />
                                <CalculatorInput
                                    label={`Fixed Fee (${currencySymbol})`}
                                    value={fixedFee}
                                    onChange={setFixedFee}
                                    placeholder="0.30"
                                    tooltip="Standard per-order fee."
                                />
                                <CalculatorInput
                                    label="Ad Rate (%)"
                                    value={adRate}
                                    onChange={setAdRate}
                                    placeholder="0"
                                    tooltip="Promoted Listings Standard rate."
                                />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Results */}
                <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-8">
                    <ResultFeedbackCard
                        title="Net Profit"
                        titleLabel="Cash in Hand"
                        mainValue={<Counter value={netProfit} prefix={currencySymbol} />}
                        valueColor={netProfit >= 0 ? "text-emerald-400" : "text-red-400"}
                        secondaryMetrics={[
                            {
                                label: "Profit Margin",
                                value: <Counter value={margin} formatter={(v) => `${v.toFixed(1)}%`} />,
                                color: margin >= 20 ? "text-emerald-600" : (margin > 0 ? "text-blue-600" : "text-red-600")
                            },
                            {
                                label: "Total Fees",
                                value: <Counter value={totalFees} prefix={currencySymbol} />,
                                color: "text-red-500"
                            }
                        ]}
                    />

                    {/* Breakdown */}
                    <Card className="border border-slate-200 shadow-sm bg-white p-5">
                        <h4 className="text-sm font-semibold text-slate-900 mb-4 flex items-center gap-2">
                            <DollarSign className="w-4 h-4 text-indigo-500" />
                            Fee Breakdown
                        </h4>
                        <div className="space-y-3">
                            <div className="flex justify-between text-sm">
                                <span className="text-slate-500">Final Value Fee</span>
                                <span className="font-medium text-slate-700">{currencySymbol}{((Number(soldPrice) + Number(shippingCharged)) * (Number(feeRate) / 100) + Number(fixedFee)).toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-slate-500">Ad Fee</span>
                                <span className="font-medium text-slate-700">{currencySymbol}{((Number(soldPrice) + Number(shippingCharged)) * (Number(adRate) / 100)).toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-slate-500">Total Costs</span>
                                <span className="font-medium text-red-500">
                                    -{currencySymbol}{(Number(itemCost) + Number(shippingCost)).toFixed(2)}
                                </span>
                            </div>
                            <Separator className="my-2" />
                            <div className="flex justify-between text-sm font-semibold">
                                <span className="text-slate-700">Net Profit</span>
                                <span className={netProfit >= 0 ? "text-emerald-600" : "text-red-600"}>
                                    {currencySymbol}{netProfit.toFixed(2)}
                                </span>
                            </div>
                        </div>
                    </Card>
                </div>
            </div>
        </FadeIn>
    )
}
