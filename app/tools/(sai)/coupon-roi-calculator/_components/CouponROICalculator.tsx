"use client"
import React, { useState, useEffect } from "react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { DollarSign, Percent, ShoppingCart, Tag, BarChart } from "lucide-react"
import { cn } from "@/lib/utils"
import { Separator } from "@/components/ui/separator"
import { CalculatorCardHeader, CalculatorInput, FadeIn, ResultSummaryCard, currencies } from "@/app/tools/_shared/components"
import { CouponROIBreakdown } from "./CouponROIBreakdown"
export function CouponROICalculator() {
    const [currency, setCurrency] = useState("USD")
    const [campaignCost, setCampaignCost] = useState<number | "">("")
    const [couponsIssued, setCouponsIssued] = useState<number | "">("")
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
    const [grossRevenue, setGrossRevenue] = useState(0)
    const [totalCOGS, setTotalCOGS] = useState(0)
    const [totalDiscountOut, setTotalDiscountOut] = useState(0)
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
        setGrossRevenue(grossRevenue)
        setTotalCOGS(totalCOGS)
        setTotalDiscountOut(totalDiscount)
        setTotalRevenue(netRevenue)
        setTotalCost(cCost + totalDiscount) // Showing "Cost of Campaign" (Media + Discounts)
        setNetProfit(profitAfterCampaign)
        setRoi(calcRoi)
    }, [campaignCost, redemptions, aov, discountAmount, margin])
    const handleReset = () => {
        setCampaignCost("")
        setCouponsIssued("")
        setRedemptions("")
        setAov("")
        setDiscountAmount("")
        setMargin("")
    }

    const isValid = campaignCost !== "" && redemptions !== "" && aov !== "" && discountAmount !== "" && margin !== ""

    return (
        <FadeIn className="w-full max-w-6xl mx-auto space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                {/* Inputs */}
                <Card className="lg:col-span-7 border-none shadow-lg bg-white/80 backdrop-blur-sm ring-1 ring-slate-900/5">
                    <CalculatorCardHeader
                        title="Campaign Details"
                        description="Enter your coupon efficiency metrics."
                        onReset={handleReset}
                        guideId="tool-guide"
                        currency={currency}
                        onCurrencyChange={setCurrency}
                    />
                    <CardContent className="p-4 md:p-6 pb-10 md:pb-14 space-y-3 flex flex-col">
                        <div className="space-y-6 max-w-[520px] mx-auto w-full">
                            {/* Campaign Basics */}
                            <div className="space-y-3">
                                <CalculatorInput
                                    hideSeparator={true}
                                    groupingTitle="Campaign Basics"
                                    groupingIcon={DollarSign}
                                    label="Campaign Cost"
                                    value={campaignCost}
                                    onChange={setCampaignCost}
                                    placeholder="500"
                                    tooltip="Total amount spent to run the coupon campaign."
                                    currency={currency}
                                />
                                <CalculatorInput
                                    label="Number of Coupons Issued"
                                    value={couponsIssued}
                                    onChange={setCouponsIssued}
                                    placeholder="5000"
                                    tooltip="Total coupons distributed."
                                    isOptional={true}
                                />
                                <CalculatorInput
                                    label="Redemptions"
                                    value={redemptions}
                                    onChange={setRedemptions}
                                    placeholder="100"
                                    tooltip="Number of coupons actually used."
                                />
                            </div>
                            {/* Sales Data */}
                            <div className="space-y-3">
                                <CalculatorInput
                                    groupingTitle="Sales Data"
                                    groupingIcon={ShoppingCart}
                                    label="Average Order Value"
                                    value={aov}
                                    onChange={setAov}
                                    placeholder="50.00"
                                    tooltip="Average purchase amount per order."
                                    currency={currency}
                                />
                                <CalculatorInput
                                    label="Discount Amount (per order)"
                                    value={discountAmount}
                                    onChange={setDiscountAmount}
                                    placeholder="10.00"
                                    tooltip="Discount applied per order."
                                    currency={currency}
                                />
                                <CalculatorInput
                                    label="Profit Margin"
                                    value={margin}
                                    onChange={setMargin}
                                    placeholder="40"
                                    max={100}
                                    tooltip="Profit margin before discount."
                                    suffix="%"
                                />
                            </div>
                        </div>
                    </CardContent>
                </Card>
                {/* Results */}
                <div className="lg:col-span-5 space-y-3 lg:sticky lg:top-8">
                    <ResultSummaryCard
                        isCalculated={isValid}
                        currency={currency}
                        emptyMessage="net profit ROI"
                        liveBadgeText={roi > 0 ? "Positive ROI" : roi === 0 ? "Break-Even" : "Negative ROI"}
                        liveBadgeColor={roi > 0 ? "emerald" : roi === 0 ? "slate" : "rose"}
                        primaryResult={{
                            value: roi,
                            label: "Return on Investment",
                            isCurrency: false,
                            unit: "%",
                            key: "roi"
                        }}
                        secondaryResults={[
                            {
                                key: "netProfit",
                                label: "Net Profit",
                                value: netProfit,
                                isCurrency: true,
                                tooltip: "Derived by subtracting your Campaign Spend, Total Granted Discounts, and COGS from top-line revenue."
                            }
                        ]}
                        checklistItems={[
                            { key: "cc", label: "Campaign Cost", isComplete: campaignCost !== "" },
                            { key: "red", label: "Redemptions", isComplete: redemptions !== "" },
                            { key: "aov", label: "Avg Order Value", isComplete: aov !== "" },
                            { key: "da", label: "Discount Amount", isComplete: discountAmount !== "" },
                            { key: "pm", label: "Profit Margin", isComplete: margin !== "" },
                        ]}
                        profitLossKey="netProfit"
                    >
                    </ResultSummaryCard>
                    {/* Breakdown */}
                    <CouponROIBreakdown
                        netProfit={netProfit}
                        cogs={totalCOGS}
                        campaignCost={Number(campaignCost) || 0}
                        totalDiscount={totalDiscountOut}
                        grossRevenue={grossRevenue}
                        currency={currency}
                        className="mt-3"
                    />
                </div>
            </div>
        </FadeIn>
    )
}