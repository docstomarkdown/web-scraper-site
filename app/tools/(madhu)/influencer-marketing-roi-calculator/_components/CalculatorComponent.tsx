"use client"

import React, { useState } from "react"
import { Card, CardContent } from "../../../../../components/ui/card"
import { DollarSign, Package, ShoppingCart } from "lucide-react"
import { ActionButtons } from "../../ToolTemplate"
import { FadeIn, CalculatorInput, CalculatorCardHeader, ResultSummaryCard } from "../../../_shared/components"
import { BudgetAllocation } from "./BudgetAllocation"

export function InfluencerROICalculator() {
    const [currency, setCurrency] = useState("USD")

    // Campaign Costs
    const [influencerFee, setInfluencerFee] = useState<number | "">("")
    const [adSpend, setAdSpend] = useState<number | "">("")

    // Product Costs
    const [productCostPerItem, setProductCostPerItem] = useState<number | "">("")
    const [shippingCost, setShippingCost] = useState<number | "">("")

    // Sales
    const [sellingPrice, setSellingPrice] = useState<number | "">("")
    const [totalOrders, setTotalOrders] = useState<number | "">("")

    const val = (v: number | "") => (v === "" ? 0 : v)

    const handleReset = () => {
        setInfluencerFee("")
        setAdSpend("")
        setProductCostPerItem("")
        setShippingCost("")
        setSellingPrice("")
        setTotalOrders("")
    }

    // Calculations
    const fee = val(influencerFee)
    const ad = val(adSpend)
    const costPerItem = val(productCostPerItem)
    const ship = val(shippingCost)
    const price = val(sellingPrice)
    const orders = val(totalOrders)

    const campaignCosts = fee + ad
    const totalProductCost = (costPerItem + ship) * orders
    const totalCost = campaignCosts + totalProductCost
    const totalRevenue = price * orders
    const profitLoss = totalRevenue - totalCost
    const roi = totalCost > 0 ? (profitLoss / totalCost) * 100 : 0
    const profitPerOrder = orders > 0 ? profitLoss / orders : 0

    const hasAnyData = totalCost > 0 || totalRevenue > 0

    const [isCopied, setIsCopied] = useState(false)

    const handleCopy = () => {
        const text = `Influencer Marketing ROI Results:\n\n` +
            `Campaign Costs:\n` +
            `- Influencer Fee: ${formatCurrency(fee)}\n` +
            `- Ad Spend: ${formatCurrency(ad)}\n\n` +
            `Product Costs:\n` +
            `- Product Cost per Item: ${formatCurrency(costPerItem)}\n` +
            `- Shipping Cost: ${formatCurrency(ship)}\n\n` +
            `Sales:\n` +
            `- Selling Price: ${formatCurrency(price)}\n` +
            `- Total Orders: ${orders}\n\n` +
            `Results:\n` +
            `- Total Revenue: ${formatCurrency(totalRevenue)}\n` +
            `- Total Cost: ${formatCurrency(totalCost)}\n` +
            `- Net Profit: ${formatCurrency(profitLoss)}\n` +
            `- ROI: ${roi.toFixed(2)}%\n` +
            `- Profit per Order: ${formatCurrency(profitPerOrder)}`

        navigator.clipboard.writeText(text).then(() => {
            setIsCopied(true)
            setTimeout(() => setIsCopied(false), 2000)
        })
    }

    const formatCurrency = (val: number) => {
        try {
            return new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: currency,
                currencyDisplay: 'narrowSymbol',
                maximumFractionDigits: 2
            }).format(val)
        } catch {
            return new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: currency,
                maximumFractionDigits: 2
            }).format(val)
        }
    }

    // Breakdown Percentages for Budget Allocation
    const getPercent = (amount: number) => {
        return totalCost > 0 ? Math.min(Math.max((amount / totalCost) * 100, 0), 100) : 0
    }

    const feePct = getPercent(fee)
    const adPct = getPercent(ad)
    const productPct = getPercent(costPerItem * orders)
    const shippingPct = getPercent(ship * orders)

    return (
        <FadeIn className="w-full max-w-6xl mx-auto py-2 px-4" duration={0.6}>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                <div className="lg:col-span-7 space-y-4">
                    <Card className="border border-slate-200 shadow-xl shadow-slate-200/40 bg-white rounded-3xl overflow-hidden">
                        <CalculatorCardHeader
                            title="Campaign Details"
                            description="Enter your campaign costs, product details, and sales data."
                            currency={currency}
                            onCurrencyChange={setCurrency}
                        />

                        <CardContent className="p-6 md:p-8 space-y-8 flex-1 flex flex-col">
                            {/* Campaign Costs */}
                            <div className="space-y-4">
                                <CalculatorInput
                                    label="Influencer Fee"
                                    value={influencerFee}
                                    onChange={setInfluencerFee}
                                    placeholder="1000.00"
                                    tooltip="The flat fee or commission paid directly to the influencer."
                                    currency={currency}
                                    groupingTitle="Campaign Costs"
                                    groupingIcon={DollarSign}
                                />
                                <CalculatorInput
                                    label="Ad Spend"
                                    value={adSpend}
                                    onChange={setAdSpend}
                                    placeholder="500.00"
                                    tooltip="Amount spent on paid ads to boost or promote the campaign."
                                    currency={currency}
                                />
                            </div>

                            {/* Product Costs */}
                            <div className="h-px bg-slate-100 w-full" />
                            <div className="space-y-4">
                                <CalculatorInput
                                    label="Product Cost per Item"
                                    value={productCostPerItem}
                                    onChange={setProductCostPerItem}
                                    placeholder="25.00"
                                    tooltip="The cost to produce or purchase one unit of your product (COGS)."
                                    currency={currency}
                                    groupingTitle="Product Costs"
                                    groupingIcon={Package}
                                />
                                <CalculatorInput
                                    label="Shipping Cost"
                                    value={shippingCost}
                                    onChange={setShippingCost}
                                    placeholder="5.00"
                                    tooltip="Average shipping and handling cost per order."
                                    currency={currency}
                                />
                            </div>

                            {/* Sales */}
                            <div className="h-px bg-slate-100 w-full" />
                            <div className="space-y-4">
                                <CalculatorInput
                                    label="Selling Price"
                                    value={sellingPrice}
                                    onChange={setSellingPrice}
                                    placeholder="75.00"
                                    tooltip="The price at which you sell each unit to the customer."
                                    currency={currency}
                                    groupingTitle="Sales"
                                    groupingIcon={ShoppingCart}
                                />
                                <CalculatorInput
                                    label="Total Orders"
                                    value={totalOrders}
                                    onChange={setTotalOrders}
                                    placeholder="100"
                                    tooltip="The total number of orders generated from the influencer campaign."
                                />
                            </div>

                            <ActionButtons
                                onReset={handleReset}
                                onCopy={handleCopy}
                                isCopied={isCopied}
                                className="pt-6 mt-2 border-t border-slate-100"
                            />
                        </CardContent>
                    </Card>
                </div>

                <div className="lg:col-span-5 lg:sticky lg:top-32 flex flex-col gap-3">
                    <ResultSummaryCard
                        title="ROI"
                        currency={currency}
                        primaryResult={{
                            value: roi.toFixed(2),
                            unit: "%",
                            label: "Campaign Performance"
                        }}
                        secondaryResults={[
                            {
                                key: "profitLoss",
                                label: "Net Profit",
                                value: profitLoss.toFixed(2),
                                isCurrency: true,
                                tooltip: "Revenue minus all costs. Positive = profit. Negative = loss."
                            },
                            {
                                key: "totalRevenue",
                                label: "Total Revenue",
                                value: totalRevenue.toFixed(2),
                                isCurrency: true,
                                tooltip: "Selling Price × Total Orders."
                            },
                            {
                                key: "totalCost",
                                label: "Total Cost",
                                value: totalCost.toFixed(2),
                                isCurrency: true,
                                tooltip: "Influencer Fee + Ad Spend + (Product Cost + Shipping) × Orders."
                            },
                            {
                                key: "profitPerOrder",
                                label: "Profit per Order",
                                value: profitPerOrder.toFixed(2),
                                isCurrency: true,
                                tooltip: "Net Profit ÷ Total Orders. Your earnings per sale."
                            }
                        ]}
                        isCalculated={hasAnyData}
                        profitLossKey="profitLoss"
                    />

                    <BudgetAllocation
                        fee={fee}
                        adSpend={ad}
                        productCost={costPerItem * orders}
                        shippingCost={ship * orders}
                        totalCost={totalCost}
                        feePct={feePct}
                        adPct={adPct}
                        productPct={productPct}
                        shippingPct={shippingPct}
                        formatCurrency={formatCurrency}
                    />
                </div>
            </div>
        </FadeIn>
    )
}
