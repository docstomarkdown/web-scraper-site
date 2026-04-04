"use client"
import React, { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Tag, DollarSign, Percent } from "lucide-react"
import { CalculatorCardHeader, CalculatorInput, FadeIn, ResultSummaryCard } from "@/app/tools/_shared/components"
import { EbayFeeBreakdown } from "./EbayFeeBreakdown"

export function EbayFeeCalculator() {
    const [currency, setCurrency] = useState("USD")
    
    // Revenue
    const [soldPrice, setSoldPrice] = useState<number | "">("")
    const [shippingCharged, setShippingCharged] = useState<number | "">("")
    
    // Costs
    const [itemCost, setItemCost] = useState<number | "">("")
    const [shippingCost, setShippingCost] = useState<number | "">("")
    
    // Fees
    const [feeRate, setFeeRate] = useState<number | "">("")
    const [fixedFee, setFixedFee] = useState<number | "">("")
    const [adRate, setAdRate] = useState<number | "">("")

    useEffect(() => {
        if (feeRate === "") setFeeRate(13.25)
        if (fixedFee === "") setFixedFee(0.30)
    }, [])

    const handleReset = () => {
        setSoldPrice("")
        setShippingCharged("")
        setItemCost("")
        setShippingCost("")
        setFeeRate(13.25)
        setFixedFee(0.30)
        setAdRate("")
    }

    // Results
    const [totalRevenue, setTotalRevenue] = useState(0)
    const [totalFees, setTotalFees] = useState(0)
    const [netProfit, setNetProfit] = useState(0)
    const [margin, setMargin] = useState(0)
    const [fvfAmount, setFvfAmount] = useState(0)
    const [adFeeAmount, setAdFeeAmount] = useState(0)

    useEffect(() => {
        const price = Number(soldPrice) || 0
        const charge = Number(shippingCharged) || 0
        const cost = Number(itemCost) || 0
        const shipCost = Number(shippingCost) || 0
        const rate = Number(feeRate) || 0
        const fixed = Number(fixedFee) >= 0 && fixedFee !== "" ? Number(fixedFee) : 0
        const ad = Number(adRate) || 0

        const revenue = price + charge
        
        if (revenue === 0) {
            setTotalRevenue(0)
            setTotalFees(0)
            setNetProfit(0)
            setMargin(0)
            setFvfAmount(0)
            setAdFeeAmount(0)
            return
        }

        const fvf = (revenue * (rate / 100)) + fixed
        const adFee = revenue * (ad / 100)
        const fees = fvf + adFee

        const totalExpenses = cost + shipCost + fees
        const profit = revenue - totalExpenses
        const calcMargin = (profit / revenue) * 100

        setTotalRevenue(revenue)
        setTotalFees(fees)
        setNetProfit(profit)
        setMargin(calcMargin)
        setFvfAmount(fvf)
        setAdFeeAmount(adFee)
    }, [soldPrice, shippingCharged, itemCost, shippingCost, feeRate, fixedFee, adRate])

    const isValid = soldPrice !== "" && itemCost !== "" && feeRate !== "" && (fixedFee !== "" && Number(fixedFee) >= 0)
    const isLive = totalRevenue > 0

    return (
        <FadeIn className="w-full max-w-6xl mx-auto py-8 px-4" duration={0.6}>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                {/* Inputs Section */}
                <div className="lg:col-span-7 space-y-3">
                    <Card className="border border-slate-200 shadow-sm bg-white">
                        <CalculatorCardHeader
                            title="Sale & Fee Details"
                            description="Enter sale price, costs, and eBay fees."
                            onReset={handleReset}
                            guideId="ebay-fee-guide"
                            currency={currency}
                            onCurrencyChange={setCurrency}
                        />

                        <CardContent className="p-4 md:p-6 pb-10 md:pb-14 space-y-3 flex flex-col">
                            <div className="space-y-6 max-w-[520px] mx-auto w-full">
                                {/* Sale */}
                                <div className="space-y-3">
                                    <CalculatorInput
                                        hideSeparator={true}
                                        groupingTitle="Sale"
                                        groupingIcon={Tag}
                                        label="Item Price"
                                        value={soldPrice}
                                        onChange={setSoldPrice}
                                        placeholder="45.00"
                                        max={100000}
                                        step={0.01}
                                        tooltip="Your item's final selling price."
                                        isCurrency
                                        currency={currency}
                                        autoFocus
                                    />
                                    <CalculatorInput
                                        label="Shipping Charged"
                                        value={shippingCharged}
                                        onChange={setShippingCharged}
                                        placeholder="0.00"
                                        max={100000}
                                        step={0.01}
                                        tooltip="The shipping fee paid by the buyer."
                                        isCurrency
                                        currency={currency}
                                        isOptional
                                    />
                                </div>

                                {/* Costs */}
                                <div className="space-y-3">
                                    <CalculatorInput
                                        groupingTitle="Costs"
                                        groupingIcon={DollarSign}
                                        label="Product Cost"
                                        value={itemCost}
                                        onChange={setItemCost}
                                        placeholder="10.00"
                                        max={100000}
                                        step={0.01}
                                        tooltip="How much you originally paid for the item."
                                        isCurrency
                                        currency={currency}
                                    />
                                    <CalculatorInput
                                        label="Shipping Cost"
                                        value={shippingCost}
                                        onChange={setShippingCost}
                                        placeholder="5.50"
                                        max={100000}
                                        step={0.01}
                                        tooltip="Your actual cost to purchase the shipping label and packaging."
                                        isCurrency
                                        currency={currency}
                                        isOptional
                                    />
                                </div>

                                {/* Fees */}
                                <div className="space-y-3">
                                    <CalculatorInput
                                        groupingTitle="Fees"
                                        groupingIcon={Percent}
                                        label="eBay Fee"
                                        value={feeRate}
                                        onChange={setFeeRate}
                                        placeholder="13.25"
                                        suffix="%"
                                        step={0.01}
                                        min={0}
                                        max={100}
                                        tooltip="eBay's Final Value Fee percentage based on your item's category."
                                        hint={feeRate === 13.25 ? "Industry standard range: 10% – 15%" : undefined}
                                    />
                                    <CalculatorInput
                                        label="Order Fee"
                                        value={fixedFee}
                                        onChange={setFixedFee}
                                        placeholder="0.30"
                                        step={0.01}
                                        min={0}
                                        max={10000}
                                        tooltip="eBay's standard fixed transaction fee per order (usually $0.30)."
                                        isCurrency
                                        currency={currency}
                                        hint={fixedFee === 0.30 ? "Standard fixed fee: $0.30" : undefined}
                                    />
                                    <CalculatorInput
                                        label="Promoted Listings"
                                        value={adRate}
                                        onChange={setAdRate}
                                        placeholder="0"
                                        step={0.01}
                                        min={0}
                                        max={100}
                                        tooltip="The extra percentage you pay eBay if a buyer clicks your promoted ad."
                                        suffix="%"
                                        isOptional
                                        hint={Number(adRate) === 0 || adRate === "" ? "Typical range: 2% – 10%" : undefined}
                                    />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Results Section */}
                <div className="lg:col-span-5 space-y-3 lg:sticky lg:top-8">
                    <ResultSummaryCard
                        isCalculated={isValid}
                        currency={currency}
                        emptyMessage="eBay fees & payout"
                        profitLossKey="netProfit"
                        liveBadgeText={
                            isValid
                                ? netProfit > 0 ? "Profitable Sale"
                                : netProfit === 0 ? "Break Even"
                                : "Unprofitable Sale"
                                : "Draft"
                        }
                        liveBadgeColor={
                            isValid
                                ? netProfit > 0 ? "emerald"
                                : netProfit === 0 ? "amber"
                                : "rose"
                                : "slate"
                        }
                        dynamicMessages={{
                            positive: `You keep ${margin.toFixed(1)}% of the sale price as net profit after all fees and costs.`,
                            negative: `Your costs exceed your revenue by the amount of your fees.`,
                            neutral: "You broke even on this sale. No profit, no loss."
                        }}
                        primaryResult={{
                            value: netProfit,
                            label: "You Receive (After Fees & Costs)",
                            isCurrency: true,
                            key: "netProfit"
                        }}
                        secondaryResults={[
                            {
                                key: "totalFees",
                                label: "Total Fees",
                                value: totalFees,
                                isCurrency: true,
                                icon: DollarSign,
                                tooltip: "The combined total of eBay's Final Value Fee, the per-order fee, and any Promoted Listings fees."
                            },
                            {
                                key: "margin",
                                label: "Profit Margin",
                                value: margin.toFixed(1),
                                unit: "%",
                                icon: Percent,
                                tooltip: "Your net profit shown as a percentage of your total gross revenue."
                            }
                        ]}
                        checklistItems={[
                            { key: "price", label: "Item Price", isComplete: soldPrice !== "" },
                            { key: "cost", label: "Product Cost", isComplete: itemCost !== "" },
                            { key: "feeRate", label: "eBay Fee", isComplete: feeRate !== "" },
                            { key: "fixedFee", label: "Order Fee", isComplete: fixedFee !== "" && Number(fixedFee) >= 0 }
                        ]}
                    >
                    </ResultSummaryCard>
                    
                    <div className="mt-4">
                        <EbayFeeBreakdown
                            netProfit={netProfit}
                            fvfFee={fvfAmount}
                            adFee={adFeeAmount}
                            productCost={Number(itemCost) || 0}
                            shippingCost={Number(shippingCost) || 0}
                            totalRevenue={totalRevenue}
                            currency={currency}
                        />
                    </div>
                </div>
            </div>
        </FadeIn>
    )
}
