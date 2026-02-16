"use client"

import React, { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { HelpCircle, DollarSign, Percent, ShoppingCart, Tag, BarChart } from "lucide-react"
import { CalculatorInput, ResultFeedbackCard, Counter, CurrencyCombobox, currencies, FadeIn } from "@/app/tools/_shared/components"
import { Separator } from "@/components/ui/separator"

export function CouponROICalculator() {
    const [currency, setCurrency] = useState("USD")
    const [campaignCost, setCampaignCost] = useState<number | "">("")
    const [redemptions, setRedemptions] = useState<number | "">("")
    const [aov, setAov] = useState<number | "">("")
    const [discountAmount, setDiscountAmount] = useState<number | "">("")
    const [margin, setMargin] = useState<number | "">("") // Profit margin %

    const currencySymbol = currencies.find(c => c.code === currency)?.symbol || "$"

    // Results
    const [totalRevenue, setTotalRevenue] = useState(0)
    const [totalCost, setTotalCost] = useState(0) // Includes goods + campaign + discount
    const [netProfit, setNetProfit] = useState(0)
    const [roi, setRoi] = useState(0)

    useEffect(() => {
        const cCost = Number(campaignCost) || 0
        const count = Number(redemptions) || 0
        const orderValue = Number(aov) || 0
        const discount = Number(discountAmount) || 0
        const marginPercent = Number(margin) || 0

        if (count === 0 || orderValue === 0) {
            setTotalRevenue(0)
            setTotalCost(0)
            setNetProfit(0)
            setRoi(0)
            return
        }

        // 1. Total Gross Revenue (pre-discount)
        // Usually AOV is what the customer pays *after* discount? Or list price?
        // Let's assume AOV is the "List Price" / "Cart Value" before discount.
        const grossRevenue = count * orderValue

        // 2. Cost of Goods Sold (COGS)
        // Margin = (Price - Cost) / Price  => Cost = Price * (1 - Margin)
        // COGS applies to the base product value
        const cogsPerUnit = orderValue * (1 - (marginPercent / 100))
        const totalCOGS = cogsPerUnit * count

        // 3. Total Discount Given
        const totalDiscount = discount * count

        // 4. Net Revenue (Real money in)
        const netRevenue = grossRevenue - totalDiscount

        // 5. Total Expenses
        const totalExpenses = cCost + totalCOGS // Measuring profit against campaign + goods

        // 6. Net Profit
        const profit = netRevenue - totalExpenses

        // 7. ROI
        // ROI = (Net Profit / Total Investment) * 100
        // Investment = Campaign Cost + COGS?
        // Marketing ROI = (Net Profit / Campaign Cost) * 100 ?

        // Let's use Marketing ROI as it's more specific to the tool "Coupon ROI"
        // Net Profit = (Net Revenue - COGS) - Campaign Cost
        // ROI = (Profit Lift / Campaign Cost) * 100

        const grossProfit = netRevenue - totalCOGS
        const profitAfterCampaign = grossProfit - cCost

        const calcRoi = cCost > 0 ? (profitAfterCampaign / cCost) * 100 : (profitAfterCampaign > 0 ? 9999 : 0)

        setTotalRevenue(netRevenue)
        setTotalCost(cCost + totalDiscount) // Showing "Cost of Campaign" (Media + Discounts)
        setNetProfit(profitAfterCampaign)
        setRoi(calcRoi)

    }, [campaignCost, redemptions, aov, discountAmount, margin])

    const handleReset = () => {
        setCampaignCost("")
        setRedemptions("")
        setAov("")
        setDiscountAmount("")
        setMargin("")
    }

    return (
        <FadeIn className="w-full max-w-6xl mx-auto space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                {/* Inputs */}
                <Card className="lg:col-span-7 border-none shadow-lg bg-white/80 backdrop-blur-sm ring-1 ring-slate-900/5">
                    <CardHeader className="pb-6 border-b border-slate-100/50 flex flex-row items-center justify-between space-y-0">
                        <div className="flex items-center gap-3">
                            <div className="p-2.5 bg-indigo-50 rounded-xl">
                                <Tag className="w-6 h-6 text-indigo-600" />
                            </div>
                            <div>
                                <CardTitle className="text-lg font-semibold text-slate-900">Campaign Details</CardTitle>
                                <CardDescription>Enter your coupon efficiency metrics.</CardDescription>
                            </div>
                        </div>
                        <div className="w-[140px]">
                            <CurrencyCombobox value={currency} onValueChange={setCurrency} />
                        </div>
                    </CardHeader>

                    <CardContent className="p-6 md:p-8 space-y-8">
                        {/* Campaign Costs */}
                        <div className="space-y-4">
                            <h3 className="text-sm font-medium text-slate-700 flex items-center gap-2">
                                <DollarSign className="w-4 h-4 text-slate-400" />
                                Costs & Volume
                            </h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <CalculatorInput
                                    label={`Campaign Cost (${currencySymbol})`}
                                    value={campaignCost}
                                    onChange={setCampaignCost}
                                    placeholder="500"
                                    tooltip="Total spend on marketing, printing, or distribution."
                                />
                                <CalculatorInput
                                    label="Redemptions"
                                    value={redemptions}
                                    onChange={setRedemptions}
                                    placeholder="100"
                                    tooltip="Number of times the coupon was used."
                                />
                            </div>
                        </div>

                        <Separator />

                        {/* Product Economics */}
                        <div className="space-y-4">
                            <h3 className="text-sm font-medium text-slate-700 flex items-center gap-2">
                                <ShoppingCart className="w-4 h-4 text-slate-400" />
                                Sales Metrics
                            </h3>
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                <CalculatorInput
                                    label={`Avg Order Value (${currencySymbol})`}
                                    value={aov}
                                    onChange={setAov}
                                    placeholder="50.00"
                                    tooltip="Average cart size before discount."
                                />
                                <CalculatorInput
                                    label={`Discount Amount (${currencySymbol})`}
                                    value={discountAmount}
                                    onChange={setDiscountAmount}
                                    placeholder="10.00"
                                    tooltip="The value deducted per order."
                                />
                                <CalculatorInput
                                    label="Profit Margin (%)"
                                    value={margin}
                                    onChange={setMargin}
                                    placeholder="40"
                                    max={100}
                                    tooltip="Your standard profit margin percentage."
                                />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Results */}
                <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-8">
                    <ResultFeedbackCard
                        title="Campaign ROI"
                        titleLabel="Return on Investment"
                        mainValue={<Counter value={roi} formatter={(v) => `${v.toFixed(0)}%`} />}
                        valueColor={roi > 0 ? "text-emerald-400" : (roi < 0 ? "text-red-400" : "text-slate-100")}
                        secondaryMetrics={[
                            {
                                label: "Net Profit",
                                value: <Counter value={netProfit} prefix={currencySymbol} />,
                                color: netProfit >= 0 ? "text-emerald-600" : "text-red-600"
                            },
                            {
                                label: "Total Revenue",
                                value: <Counter value={totalRevenue} prefix={currencySymbol} />,
                            }
                        ]}
                    >
                        <div className="flex justify-between items-center py-2 border-t border-slate-100 mt-2">
                            <span className="text-sm text-slate-500">Break-even Redemptions</span>
                            <span className="text-sm font-medium text-slate-900">
                                {((Number(campaignCost) || 0) / Math.max(0.01, (Number(aov) || 0) * (Number(margin) || 0) / 100 - (Number(discountAmount) || 0))).toFixed(0)} units
                            </span>
                        </div>
                    </ResultFeedbackCard>

                    {/* Breakdown */}
                    <Card className="border border-slate-200 shadow-sm bg-white p-5">
                        <h4 className="text-sm font-semibold text-slate-900 mb-4 flex items-center gap-2">
                            <BarChart className="w-4 h-4 text-indigo-500" />
                            Financial Breakdown
                        </h4>
                        <div className="space-y-3">
                            <div className="flex justify-between text-sm">
                                <span className="text-slate-500">Gross Sales</span>
                                <span className="font-medium">{currencySymbol}{(Number(redemptions) * Number(aov)).toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-slate-500">Total Discount Cost</span>
                                <span className="text-red-500 font-medium">-{currencySymbol}{(Number(redemptions) * Number(discountAmount)).toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-slate-500">Campaign Cost</span>
                                <span className="text-red-500 font-medium">-{currencySymbol}{Number(campaignCost).toFixed(2)}</span>
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
