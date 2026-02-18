"use client"

import React, { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { CalculatorInput, ResultFeedbackCard, Counter, CurrencyCombobox, currencies, FadeIn } from "@/app/tools/_shared/components"
import { Separator } from "@/components/ui/separator"
import { ShoppingBag, Truck, DollarSign, Tag, RotateCcw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

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
                    <CardHeader className="pb-6 border-b border-slate-100/50 flex flex-row items-center justify-between space-y-0">
                        <div className="flex items-center gap-3">
                            <div className="flex items-center gap-2">
                                <CardTitle className="text-xl font-bold text-blue-600">Inputs</CardTitle>
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
                                Sale Details
                            </h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                        mainValue={<Counter value={netEarnings} prefix={currencySymbol} />}
                        valueColor={netEarnings >= 0 ? "text-emerald-400" : "text-slate-100"}
                        secondaryMetrics={[
                            {
                                label: "Net Profit",
                                value: <Counter value={netProfit} prefix={currencySymbol} />,
                                color: netProfit >= 0 ? "text-emerald-600" : "text-red-600"
                            },
                            {
                                label: "Poshmark Fee",
                                value: <Counter value={poshFee} prefix={currencySymbol} />,
                                color: "text-red-500"
                            }
                        ]}
                    />

                    {/* Breakdown */}
                    <Card className="border border-slate-200 shadow-sm bg-white p-5">
                        <h4 className="text-sm font-semibold text-slate-900 mb-4 flex items-center gap-2">
                            <ShoppingBag className="w-4 h-4 text-indigo-500" />
                            Payout Breakdown
                        </h4>
                        <div className="space-y-3">
                            <div className="flex justify-between text-sm">
                                <span className="text-slate-500">Sold Price</span>
                                <span className="font-medium text-slate-700">{currencySymbol}{Number(soldPrice).toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-slate-500">Poshmark Fee</span>
                                <span className="text-red-600 font-medium">-{currencySymbol}{poshFee.toFixed(2)}</span>
                            </div>
                            {Number(shippingDiscount) > 0 && (
                                <div className="flex justify-between text-sm">
                                    <span className="text-slate-500">Shipping Discount</span>
                                    <span className="text-red-600 font-medium">-{currencySymbol}{Number(shippingDiscount).toFixed(2)}</span>
                                </div>
                            )}
                            <Separator className="my-2" />
                            <div className="flex justify-between text-sm font-semibold">
                                <span className="text-slate-700">Net Earnings</span>
                                <span className="text-emerald-600">
                                    {currencySymbol}{netEarnings.toFixed(2)}
                                </span>
                            </div>
                        </div>
                    </Card>
                </div>
            </div>
        </FadeIn>
    )
}
