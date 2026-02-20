"use client"

import React, { useState, useEffect } from "react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { DollarSign, Percent, ShoppingCart, Tag, BarChart } from "lucide-react"
import { cn } from "@/lib/utils"
import { Separator } from "@/components/ui/separator"
import { CalculatorCardHeader, CalculatorInput, Counter, CurrencyCombobox, FadeIn, ResultFeedbackCard, currencies } from "@/app/tools/_shared/components"

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
                    <CalculatorCardHeader

                        description="Enter your coupon efficiency metrics."

                        onReset={handleReset}

                        currency={currency}

                        onCurrencyChange={setCurrency}

                    />

                    <CardContent className="p-6 md:p-8 space-y-8">
                        {/* Campaign Costs */}
                        <div className="space-y-4">
                            <h3 className="text-sm font-medium text-slate-700 flex items-center gap-2">
                                <DollarSign className="w-4 h-4 text-slate-400" />
                                Costs & Volume
                            </h3>
                            <div className="grid grid-cols-1 gap-4">
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
                            <div className="grid grid-cols-1 gap-4">
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
                        valueColor={roi > 0 ? "text-slate-100" : (roi < 0 ? "text-rose-400" : "text-slate-100")}
                        secondaryMetrics={[
                            {
                                label: "Net Profit",
                                value: <Counter value={netProfit} prefix={currencySymbol} />,
                                color: netProfit >= 0 ? "text-emerald-500 font-bold" : "text-rose-400"
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

                    {/* Indicator Badge */}
                    {totalRevenue > 0 && (
                        <div className={cn(
                            "px-4 py-3 rounded-xl border text-center text-sm font-semibold",
                            roi > 0 ? "bg-emerald-50 border-emerald-200 text-emerald-700" :
                                roi === 0 ? "bg-slate-50 border-slate-200 text-slate-700" :
                                    "bg-rose-50 border-rose-200 text-rose-700"
                        )}>
                            {roi > 0 ? "🚀 Positive ROI Campaign" : roi === 0 ? "⚖️ Break-Even Campaign" : "🛑 Negative ROI Campaign"}
                        </div>
                    )}

                    {/* Breakdown */}
                    {totalRevenue > 0 ? (
                        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden border-l-4 border-l-emerald-500">
                            <div className="px-5 py-3.5 border-b border-slate-100">
                                <p className="text-xs font-bold text-slate-600 uppercase tracking-wider">Financial Breakdown</p>
                            </div>
                            <div className="divide-y divide-slate-100">
                                <div className="flex justify-between items-center px-4 py-3">
                                    <span className="text-sm text-slate-500">Gross Sales</span>
                                    <span className="text-sm font-medium text-slate-700">{currencySymbol}{(Number(redemptions) * Number(aov)).toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between items-center px-4 py-3">
                                    <span className="text-sm text-slate-500">Total Cost (Goods + Ads)</span>
                                    <span className="text-sm font-medium text-slate-700">-{currencySymbol}{totalCost.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between items-center px-4 py-3 bg-slate-50/50">
                                    <span className="text-sm text-slate-500">Discount Given</span>
                                    <span className="text-sm font-medium text-rose-600">-{currencySymbol}{(Number(redemptions) * Number(discountAmount)).toFixed(2)}</span>
                                </div>
                            </div>
                            <div className="flex justify-between items-center px-5 py-3.5 bg-slate-100/50 border-t border-slate-100">
                                <span className="text-sm font-bold text-slate-900">Net Profit</span>
                                <span className={cn("text-base font-bold", netProfit >= 0 ? "text-emerald-600" : "text-rose-600")}>
                                    {currencySymbol}{netProfit.toFixed(2)}
                                </span>
                            </div>
                        </div>
                    ) : (
                        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 text-center">
                            <p className="text-sm text-slate-400">Enter metrics to see financial breakdown.</p>
                        </div>
                    )}
                </div>
            </div>
        </FadeIn>
    )
}
