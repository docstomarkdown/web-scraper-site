"use client"

import React, { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { CalculatorInput, ResultFeedbackCard, Counter, CurrencyCombobox, currencies, FadeIn } from "@/app/tools/_shared/components"
import { Separator } from "@/components/ui/separator"
import { Store, CreditCard, Megaphone, DollarSign, Tag } from "lucide-react"

export function EtsyFeeCalculator() {
    const [currency, setCurrency] = useState("USD")

    // Revenue
    const [price, setPrice] = useState<number | "">("")
    const [shippingCharged, setShippingCharged] = useState<number | "">("")

    // Costs
    const [itemCost, setItemCost] = useState<number | "">("")
    const [shippingCost, setShippingCost] = useState<number | "">("")

    // Fees Settings
    const [listingFee, setListingFee] = useState<number | "">("") // typically $0.20
    const [transactionFeeVar, setTransactionFeeVar] = useState<number | "">("") // 6.5%
    const [paymentFeeVar, setPaymentFeeVar] = useState<number | "">("") // 3% + 0.25
    const [paymentFeeFixed, setPaymentFeeFixed] = useState<number | "">("")
    const [offsiteAdsFee, setOffsiteAdsFee] = useState<number | "">("") // 0, 12, or 15%

    const currencySymbol = currencies.find(c => c.code === currency)?.symbol || "$"

    // State for results
    const [totalRevenue, setTotalRevenue] = useState(0)
    const [totalFees, setTotalFees] = useState(0)
    const [netProfit, setNetProfit] = useState(0)
    const [margin, setMargin] = useState(0)

    // Set defaults on mount
    useEffect(() => {
        if (listingFee === "") setListingFee(0.20)
        if (transactionFeeVar === "") setTransactionFeeVar(6.5)
        if (paymentFeeVar === "") setPaymentFeeVar(3.0) // US Standard
        if (paymentFeeFixed === "") setPaymentFeeFixed(0.25) // US Standard
    }, [])

    useEffect(() => {
        const p = Number(price) || 0
        const sc = Number(shippingCharged) || 0
        const cost = Number(itemCost) || 0
        const shipCost = Number(shippingCost) || 0

        const lFee = Number(listingFee) || 0
        const tRate = Number(transactionFeeVar) || 0
        const payRate = Number(paymentFeeVar) || 0
        const payFixed = Number(paymentFeeFixed) || 0
        const adRate = Number(offsiteAdsFee) || 0

        // 1. Revenue
        const revenue = p + sc

        if (revenue === 0) {
            setTotalRevenue(0)
            setTotalFees(0)
            setNetProfit(0)
            setMargin(0)
            return
        }

        // 2. Fees
        // Transaction Fee: Applies to Price + Shipping Charged
        const transFee = revenue * (tRate / 100)

        // Payment Processing: Applies to Price + Shipping Tax (we assume 0 tax for calc simplicity unless added)
        const payFee = (revenue * (payRate / 100)) + payFixed

        // Offsite Ads: Applies to Price + Shipping
        const adFee = revenue * (adRate / 100)

        // Total Fees
        const fees = lFee + transFee + payFee + adFee

        // 3. Profit
        const totalCost = cost + shipCost + fees
        const profit = revenue - totalCost

        const calcMargin = (profit / revenue) * 100

        setTotalRevenue(revenue)
        setTotalFees(fees)
        setNetProfit(profit)
        setMargin(calcMargin)

    }, [price, shippingCharged, itemCost, shippingCost, listingFee, transactionFeeVar, paymentFeeVar, paymentFeeFixed, offsiteAdsFee])


    return (
        <FadeIn className="w-full max-w-6xl mx-auto space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

                {/* Inputs */}
                <Card className="lg:col-span-7 border-none shadow-lg bg-white/80 backdrop-blur-sm ring-1 ring-slate-900/5">
                    <CardHeader className="pb-6 border-b border-slate-100/50 flex flex-row items-center justify-between space-y-0">
                        <div className="flex items-center gap-3">
                            <div className="p-2.5 bg-orange-50 rounded-xl">
                                <Store className="w-6 h-6 text-orange-600" />
                            </div>
                            <div>
                                <CardTitle className="text-lg font-semibold text-slate-900">Etsy Sale Details</CardTitle>
                                <CardDescription>Enter sale price and costs.</CardDescription>
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
                                Sale Info
                            </h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <CalculatorInput
                                    label={`Sale Price (${currencySymbol})`}
                                    value={price}
                                    onChange={setPrice}
                                    placeholder="50.00"
                                />
                                <CalculatorInput
                                    label={`Shipping Charged (${currencySymbol})`}
                                    value={shippingCharged}
                                    onChange={setShippingCharged}
                                    placeholder="5.00"
                                />
                            </div>
                        </div>

                        <Separator />

                        {/* Costs */}
                        <div className="space-y-4">
                            <h3 className="text-sm font-medium text-slate-700 flex items-center gap-2">
                                <DollarSign className="w-4 h-4 text-slate-400" />
                                Product Costs
                            </h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <CalculatorInput
                                    label={`Item Cost (${currencySymbol})`}
                                    value={itemCost}
                                    onChange={setItemCost}
                                    placeholder="15.00"
                                    tooltip="Cost of goods sold (materials + labor)."
                                />
                                <CalculatorInput
                                    label={`Shipping Cost (${currencySymbol})`}
                                    value={shippingCost}
                                    onChange={setShippingCost}
                                    placeholder="4.00"
                                    tooltip="Actual cost to ship the item."
                                />
                            </div>
                        </div>

                        <Separator />

                        {/* Fee Config */}
                        <div className="space-y-4">
                            <h3 className="text-sm font-medium text-slate-700 flex items-center gap-2">
                                <CreditCard className="w-4 h-4 text-slate-400" />
                                Fee Settings
                            </h3>
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                                <CalculatorInput
                                    label={`Listing Fee (${currencySymbol})`}
                                    value={listingFee}
                                    onChange={setListingFee}
                                    placeholder="0.20"
                                />
                                <CalculatorInput
                                    label="Transaction %"
                                    value={transactionFeeVar}
                                    onChange={setTransactionFeeVar}
                                    placeholder="6.5"
                                />
                                <CalculatorInput
                                    label="Processing %"
                                    value={paymentFeeVar}
                                    onChange={setPaymentFeeVar}
                                    placeholder="3.0"
                                />
                                <CalculatorInput
                                    label={`Fixed Proc. (${currencySymbol})`}
                                    value={paymentFeeFixed}
                                    onChange={setPaymentFeeFixed}
                                    placeholder="0.25"
                                />
                            </div>
                            <div className="pt-2">
                                <CalculatorInput
                                    label="Offsite Ads Fee (%)"
                                    value={offsiteAdsFee}
                                    onChange={setOffsiteAdsFee}
                                    placeholder="0"
                                    tooltip="Set to 15% (standard) or 12% (>10k sales) if applicable."
                                />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Results */}
                <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-8">
                    <ResultFeedbackCard
                        title="Net Profit"
                        titleLabel="Money in Pocket"
                        mainValue={<Counter value={netProfit} prefix={currencySymbol} />}
                        valueColor={netProfit >= 0 ? "text-emerald-400" : "text-red-400"}
                        secondaryMetrics={[
                            {
                                label: "Profit Margin",
                                value: <Counter value={margin} formatter={(v) => `${v.toFixed(1)}%`} />,
                                color: margin >= 30 ? "text-emerald-600" : (margin > 0 ? "text-blue-600" : "text-red-600")
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
                            <Megaphone className="w-4 h-4 text-orange-500" />
                            Fee Breakdown
                        </h4>
                        <div className="space-y-3">
                            <div className="flex justify-between text-sm">
                                <span className="text-slate-500">Listing Fee</span>
                                <span className="font-medium text-slate-700">{currencySymbol}{Number(listingFee).toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-slate-500">Transaction Fee</span>
                                <span className="font-medium text-slate-700">{currencySymbol}{((Number(price) + Number(shippingCharged)) * (Number(transactionFeeVar) / 100)).toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-slate-500">Processing Fee</span>
                                <span className="font-medium text-slate-700">{currencySymbol}{(((Number(price) + Number(shippingCharged)) * (Number(paymentFeeVar) / 100)) + Number(paymentFeeFixed)).toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-slate-500">Offsite Ads</span>
                                <span className="font-medium text-slate-700">{currencySymbol}{((Number(price) + Number(shippingCharged)) * (Number(offsiteAdsFee) / 100)).toFixed(2)}</span>
                            </div>
                            <Separator className="my-2" />
                            <div className="flex justify-between text-sm font-semibold">
                                <span className="text-slate-700">Total Fees</span>
                                <span className="text-red-600">
                                    -{currencySymbol}{totalFees.toFixed(2)}
                                </span>
                            </div>
                        </div>
                    </Card>
                </div>
            </div>
        </FadeIn>
    )
}
