"use client"

import React, { useState, useEffect } from "react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { ShoppingBag, Truck, DollarSign, Tag } from "lucide-react"
import { CalculatorCardHeader, CalculatorInput, Counter, CurrencyCombobox, FadeIn, ResultFeedbackCard, currencies } from "@/app/tools/_shared/components"

export function PoshmarkFeeCalculator() {
    const [currency, setCurrency] = useState("USD")

    // Inputs
    const [soldPrice, setSoldPrice] = useState<number | "">("")
    const [costPrice, setCostPrice] = useState<number | "">("")
    const [shippingDiscount, setShippingDiscount] = useState<number | "">("") // Seller pays part of shipping

    const handleReset = () => {
        setSoldPrice("")
        setCostPrice("")
        setShippingDiscount("")
    }

    const currencySymbol = currencies.find(c => c.code === currency)?.symbol || "$"

    // Results
    const [poshFee, setPoshFee] = useState(0)
    const [netEarnings, setNetEarnings] = useState(0)
    const [netProfit, setNetProfit] = useState(0)
    const [margin, setMargin] = useState(0)

    useEffect(() => {
        const price = Number(soldPrice) || 0
        const cost = Number(costPrice) || 0
        const shipDisc = Number(shippingDiscount) || 0

        if (price === 0) {
            setPoshFee(0)
            setNetEarnings(0)
            setNetProfit(0)
            setMargin(0)
            return
        }

        // Poshmark Fee Logic
        // Sales under $15: Flat $2.95
        // Sales $15+: 20%
        let fee = 0
        if (price < 15) {
            fee = 2.95
        } else {
            fee = price * 0.20
        }

        // Net Earnings = Price - Fee - Shipping Discount (paid by seller)
        const earnings = price - fee - shipDisc

        // Net Profit = Earnings - Cost of Goods
        const profit = earnings - cost

        // Margin
        const calcMargin = (profit / price) * 100

        setPoshFee(fee)
        setNetEarnings(earnings)
        setNetProfit(profit)
        setMargin(calcMargin)

    }, [soldPrice, costPrice, shippingDiscount])

    return (
        <FadeIn className="w-full max-w-6xl mx-auto space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

                {/* Inputs */}
                <Card className="lg:col-span-7 border-none shadow-lg bg-white/80 backdrop-blur-sm ring-1 ring-slate-900/5">
                    <CalculatorCardHeader

                        description="Enter your details."

                        onReset={handleReset}

                        currency={currency}

                        onCurrencyChange={setCurrency}

                    />

                    <CardContent className="p-6 md:p-8 space-y-8">
                        {/* Revenue */}
                        <div className="space-y-4">
                            <h3 className="text-sm font-medium text-slate-700 flex items-center gap-2">
                                <Tag className="w-4 h-4 text-slate-400" />
                                Sale Details
                            </h3>
                            <div className="grid grid-cols-1 gap-4">
                                <CalculatorInput
                                    label={`Sold Price (${currencySymbol})`}
                                    value={soldPrice}
                                    onChange={setSoldPrice}
                                    placeholder="25.00"
                                />
                                <CalculatorInput
                                    label={`Shipping Discount (${currencySymbol})`}
                                    value={shippingDiscount}
                                    onChange={setShippingDiscount}
                                    placeholder="0.00"
                                    tooltip="Amount of shipping YOU paid (e.g. Offer to Likers)."
                                />
                            </div>
                        </div>

                        <Separator />

                        {/* Costs */}
                        <div className="space-y-4">
                            <h3 className="text-sm font-medium text-slate-700 flex items-center gap-2">
                                <DollarSign className="w-4 h-4 text-slate-400" />
                                My Cost
                            </h3>
                            <div className="grid grid-cols-1 gap-4">
                                <CalculatorInput
                                    label={`Item Cost (${currencySymbol})`}
                                    value={costPrice}
                                    onChange={setCostPrice}
                                    placeholder="5.00"
                                    tooltip="Original cost of the item."
                                />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Results */}
                <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-8">
                    <ResultFeedbackCard
                        title="Net Earnings"
                        titleLabel="Payout Amount"
                        mainValue={Number(soldPrice) > 0 ? <Counter value={netEarnings} prefix={currencySymbol} /> : `${currencySymbol}0.00`}
                        valueColor={Number(soldPrice) > 0 ? (netEarnings >= 0 ? "text-slate-100" : "text-rose-400") : "text-slate-400"}
                        secondaryMetrics={[
                            {
                                label: "Net Profit",
                                value: <Counter value={netProfit} prefix={currencySymbol} />,
                                color: netProfit >= 0 ? "text-emerald-500 font-bold" : "text-rose-400"
                            },
                            {
                                label: "Poshmark Fee",
                                value: <Counter value={poshFee} prefix={currencySymbol} />,
                                color: "text-rose-400"
                            }
                        ]}
                    />

                    {/* Breakdown */}
                    {Number(soldPrice) > 0 ? (
                        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden border-l-4 border-l-rose-500">
                            <div className="px-5 py-3.5 border-b border-slate-100">
                                <p className="text-xs font-bold text-slate-600 uppercase tracking-wider">Payout Breakdown</p>
                            </div>
                            <div className="divide-y divide-slate-100">
                                <div className="flex justify-between items-center px-5 py-3.5">
                                    <span className="text-sm text-slate-600">Sold Price</span>
                                    <span className="text-sm font-semibold text-slate-800">{currencySymbol}{Number(soldPrice).toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between items-center px-5 py-3.5">
                                    <span className="text-sm text-slate-600">Poshmark Fee</span>
                                    <span className="text-sm font-semibold text-rose-600">-{currencySymbol}{poshFee.toFixed(2)}</span>
                                </div>
                                {Number(shippingDiscount) > 0 && (
                                    <div className="flex justify-between items-center px-5 py-3.5">
                                        <span className="text-sm text-slate-600">Shipping Discount</span>
                                        <span className="text-sm font-semibold text-rose-600">-{currencySymbol}{Number(shippingDiscount).toFixed(2)}</span>
                                    </div>
                                )}
                                <div className="flex justify-between items-center px-5 py-3.5 bg-rose-50/20">
                                    <span className="text-sm font-bold text-slate-900">Net Earnings</span>
                                    <span className="text-base font-bold text-rose-600">{currencySymbol}{netEarnings.toFixed(2)}</span>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 text-center">
                            <p className="text-sm text-slate-400">Enter sale details to see payout breakdown.</p>
                        </div>
                    )}
                </div>
            </div>
        </FadeIn>
    )
}
