"use client"
import React, { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Tag, Truck, DollarSign, TrendingUp, Percent } from "lucide-react"
import { CalculatorCardHeader, CalculatorInput, FadeIn, ResultSummaryCard } from "@/app/tools/_shared/components"

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

    const price = Number(soldPrice) || 0
    const isValid = price > 0

    return (
        <FadeIn className="w-full max-w-6xl mx-auto py-8 px-4" duration={0.6}>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                {/* Inputs Section */}
                <div className="lg:col-span-7 space-y-3">
                    <Card className="border border-slate-200 shadow-sm bg-white">
                        <CalculatorCardHeader
                            title="Sale & Cost Details"
                            description="Enter your sale price, shipping discount, and item cost."
                            onReset={handleReset}
                            guideId="poshmark-guide"
                            currency={currency}
                            onCurrencyChange={setCurrency}
                        />

                        <CardContent className="space-y-3 pt-6">
                            <div className="space-y-4 max-w-[520px] mx-auto w-full">
                                <CalculatorInput
                                    label="Selling Price"
                                    value={soldPrice}
                                    onChange={setSoldPrice}
                                    placeholder="25.00"
                                    max={100000}
                                    tooltip="Price at which you are selling the item"
                                    isCurrency={true}
                                    currency={currency}
                                />

                                <CalculatorInput
                                    label="Item Cost"
                                    value={costPrice}
                                    onChange={setCostPrice}
                                    placeholder="5.00"
                                    max={100000}
                                    tooltip="Your cost to buy or make the product"
                                    isCurrency={true}
                                    currency={currency}
                                />

                                <CalculatorInput
                                    label="Shipping Discount (optional)"
                                    value={shippingDiscount}
                                    onChange={setShippingDiscount}
                                    placeholder="0.00"
                                    max={100000}
                                    tooltip="Amount you pay for shipping on behalf of the buyer"
                                    isCurrency={true}
                                    currency={currency}
                                />
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Results Section */}
                <div className="lg:col-span-5 space-y-3 lg:sticky lg:top-8">
                    <ResultSummaryCard
                        isCalculated={isValid}
                        currency={currency}
                        emptyMessage="Poshmark payout"
                        profitLossKey="netProfit"
                        liveBadgeText={
                            isValid
                                ? netProfit > 0 ? "Profitable Sale"
                                : netProfit === 0 ? "Break Even"
                                : "Unprofitable Sale"
                                : "Enter Data"
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
                            negative: `Your costs exceed your earnings by the fee amount. Consider repricing to improve margin.`,
                            neutral: "You broke even on this sale. No profit, no loss."
                        }}
                        primaryResult={{
                            value: netEarnings,
                            label: "Net Earnings",
                            isCurrency: true,
                            key: "netEarnings"
                        }}
                        secondaryResults={[
                            {
                                key: "netProfit",
                                label: "Net Profit",
                                value: netProfit,
                                isCurrency: true,
                                icon: TrendingUp,
                                tooltip: "Earnings minus your item cost."
                            },
                            {
                                key: "poshFee",
                                label: "Poshmark Fee",
                                value: poshFee,
                                isCurrency: true,
                                icon: DollarSign,
                                tooltip: price < 15 ? "Flat fee of $2.95 for sales under $15." : "20% commission on sales of $15+."
                            },
                            {
                                key: "margin",
                                label: "Profit Margin",
                                value: isValid ? margin.toFixed(1) : "0.0",
                                unit: "%",
                                icon: Percent,
                                tooltip: "Percentage of the sale price retained as net profit."
                            }
                        ]}
                    />
                </div>
            </div>
        </FadeIn>
    )
}