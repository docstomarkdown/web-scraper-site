"use client"
import React, { useState, useEffect } from "react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Store, CreditCard, Megaphone, DollarSign, Tag } from "lucide-react"
import { cn } from "@/lib/utils"
import { CalculatorCardHeader, CalculatorInput, Counter, CurrencyCombobox, FadeIn, ResultFeedbackCard, currencies } from "@/app/tools/_shared/components"
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
    const handleReset = () => {
        setPrice("")
        setShippingCharged("")
        setItemCost("")
        setShippingCost("")
        setListingFee(0.20)
        setTransactionFeeVar(6.5)
        setPaymentFeeVar(3.0)
        setPaymentFeeFixed(0.25)
        setOffsiteAdsFee("")
    }
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
                    <CalculatorCardHeader
                        description="Enter your details."
                        onReset={handleReset}
                        currency={currency}
                        onCurrencyChange={setCurrency}
                    />
                    <CardContent className="p-6 md:p-8 space-y-8">
                        {/* Revenue */}
                        <div className="space-y-3">
                            <h3 className="text-sm font-medium text-slate-700 flex items-center gap-2">
                                <Tag className="w-4 h-4 text-slate-400" />
                                Sale Info
                            </h3>
                            <div className="grid grid-cols-1 gap-4">
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
                        {/* Costs */}
                        <div className="space-y-3">
                            <h3 className="text-sm font-medium text-slate-700 flex items-center gap-2">
                                <DollarSign className="w-4 h-4 text-slate-400" />
                                Product Costs
                            </h3>
                            <div className="grid grid-cols-1 gap-4">
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
                        {/* Fee Config */}
                        <div className="space-y-3">
                            <h3 className="text-sm font-medium text-slate-700 flex items-center gap-2">
                                <CreditCard className="w-4 h-4 text-slate-400" />
                                Fee Settings
                            </h3>
                            <div className="grid grid-cols-1 gap-4">
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
                <div className="lg:col-span-5 space-y-3 lg:sticky lg:top-8">
                    <ResultFeedbackCard
                        title="Net Profit"
                        titleLabel="Money in Pocket"
                        mainValue={totalRevenue > 0 ? <Counter value={netProfit} prefix={currencySymbol} /> : `${currencySymbol}0.00`}
                        valueColor={totalRevenue > 0 ? (netProfit >= 0 ? "text-slate-100" : "text-rose-400") : "text-slate-400"}
                        secondaryMetrics={[
                            {
                                label: "Profit Margin",
                                value: <Counter value={margin} formatter={(v) => `${v.toFixed(1)}%`} />,
                                color: margin >= 30 ? "text-emerald-500 font-bold" : (margin > 0 ? "text-emerald-500" : "text-rose-400")
                            },
                            {
                                label: "Total Fees",
                                value: <Counter value={totalFees} prefix={currencySymbol} />,
                                color: "text-rose-400"
                            }
                        ]}
                    />
                    {/* Breakdown */}
                    {totalRevenue > 0 ? (
                        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden border-l-4 border-l-emerald-500">
                            <div className="px-5 py-3.5 border-b border-slate-100">
                                <p className="text-xs font-bold text-slate-600 uppercase tracking-wider">Fee Breakdown</p>
                            </div>
                            <div className="divide-y divide-slate-100">
                                <div className="flex justify-between items-center px-4 py-3">
                                    <span className="text-sm text-slate-500">Listing Fee</span>
                                    <span className="text-sm font-medium text-slate-700">{currencySymbol}{Number(listingFee).toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between items-center px-4 py-3">
                                    <span className="text-sm text-slate-500">Transaction Fee</span>
                                    <span className="text-sm font-medium text-slate-700">{currencySymbol}{((Number(price) + Number(shippingCharged)) * (Number(transactionFeeVar) / 100)).toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between items-center px-4 py-3">
                                    <span className="text-sm text-slate-500">Processing Fee</span>
                                    <span className="text-sm font-medium text-slate-700">{currencySymbol}{(((Number(price) + Number(shippingCharged)) * (Number(paymentFeeVar) / 100)) + Number(paymentFeeFixed)).toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between items-center px-4 py-3">
                                    <span className="text-sm text-slate-500">Offsite Ads</span>
                                    <span className="text-sm font-medium text-slate-700">{currencySymbol}{((Number(price) + Number(shippingCharged)) * (Number(offsiteAdsFee) / 100)).toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between items-center px-4 py-3 bg-rose-50/50">
                                    <span className="text-sm text-slate-500">Total Fees</span>
                                    <span className="text-sm font-bold text-rose-600">
                                        -{currencySymbol}{totalFees.toFixed(2)}
                                    </span>
                                </div>
                                <div className="flex justify-between items-center px-5 py-3.5 bg-slate-50">
                                    <span className="text-sm font-bold text-slate-900">Net Profit</span>
                                    <span className={cn("text-base font-bold", netProfit >= 0 ? "text-emerald-600" : "text-rose-600")}>
                                        {currencySymbol}{netProfit.toFixed(2)}
                                    </span>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 text-center">
                            <p className="text-sm text-slate-400">Enter sale info to see fee breakdown.</p>
                        </div>
                    )}
                </div>
            </div>
        </FadeIn >
    )
}