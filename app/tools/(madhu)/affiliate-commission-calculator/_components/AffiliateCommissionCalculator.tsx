"use client"
import React, { useState, useMemo } from "react"
import {
    MousePointerClick,
    Percent,
    ShoppingCart,
    Handshake,
    PackageOpen
} from "lucide-react"

import {
    Counter,
    CalculatorInput,
    CalculatorCardHeader,
    ResultSummaryCard,
    currencies
} from "@/app/tools/_shared/components"
import { cn } from "@/lib/utils"
import { Card, CardContent } from "@/components/ui/card"

interface AffiliateState {
    affiliateTraffic: number | ""
    conversionRate: number | ""
    averageOrderValue: number | ""
    affiliateCommission: number | ""
    productCost: number | ""
}

const DEFAULT_STATE: AffiliateState = {
    affiliateTraffic: "",
    conversionRate: 2.5,
    averageOrderValue: "",
    affiliateCommission: "",
    productCost: ""
}

export function AffiliateCommissionCalculator() {
    const [values, setValues] = useState<AffiliateState>(DEFAULT_STATE)
    const [currencyCode, setCurrencyCode] = useState("USD")

    // Get current currency symbol
    const currencySymbol = useMemo(() => {
        return currencies.find(c => c.code === currencyCode)?.symbol || "$"
    }, [currencyCode])

    const handleInputChange = (field: keyof AffiliateState, value: string | number) => {
        setValues(prev => ({ ...prev, [field]: value === "" ? "" : Number(value) }))
    }

    // Results calculate only when mandatory fields are filled
    const hasInputs = useMemo(() => {
        return values.affiliateTraffic !== "" && values.averageOrderValue !== "" && values.affiliateCommission !== ""
    }, [values])

    const results = useMemo(() => {
        const clicks = Number(values.affiliateTraffic) || 0
        const convRate = Number(values.conversionRate) || 0
        const aov = Number(values.averageOrderValue) || 0
        const commissionPct = Number(values.affiliateCommission) || 0
        const productCostPct = Number(values.productCost) || 0

        const estimatedSales = clicks * (convRate / 100)
        const totalRevenue = estimatedSales * aov
        const affiliatePayout = totalRevenue * (commissionPct / 100)
        const productCostAmount = totalRevenue * (productCostPct / 100)
        const netProfit = totalRevenue - affiliatePayout - productCostAmount

        return {
            estimatedSales,
            totalRevenue,
            affiliatePayout,
            productCostAmount,
            netProfit
        }
    }, [values])

    const handleReset = () => {
        setValues(DEFAULT_STATE)
        setCurrencyCode("USD")
    }

    return (
        <div className="max-w-6xl mx-auto py-2">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch pt-2">
                {/* Left Column: Inputs */}
                <div className="lg:col-span-7 flex flex-col h-full space-y-3">
                    <Card className="border border-slate-200 shadow-sm bg-white overflow-hidden h-full flex flex-col rounded-3xl">
                        <CalculatorCardHeader
                            title="Affiliate Payout Calculator"
                            description="Enter your traffic, pricing, and commission details to estimate affiliate payouts and profitability."
                            currency={currencyCode}
                            onCurrencyChange={setCurrencyCode}
                            onReset={handleReset}
                        />
                        <CardContent className="p-4 md:p-6 pb-12 md:pb-16 space-y-3 flex-1 flex flex-col">
                            {/* All Inputs in Groups */}
                            <div className="space-y-6 max-w-[520px] mx-auto w-full">
                                {/* 1. Campaign Traffic */}
                                <div className="space-y-3">
                                    <CalculatorInput
                                        hideSeparator={true}
                                        label="Affiliate Clicks"
                                        value={values.affiliateTraffic}
                                        onChange={(v) => handleInputChange('affiliateTraffic', v)}
                                        placeholder="10,000"
                                        tooltip="Total number of visitors (clicks) sent by your affiliates to your store or landing page."
                                        groupingTitle="Campaign Traffic"
                                        groupingIcon={MousePointerClick}
                                    />
                                    <CalculatorInput
                                        label="Conversion Rate"
                                        value={values.conversionRate}
                                        onChange={(v) => handleInputChange('conversionRate', v)}
                                        placeholder="2.5"
                                        tooltip="Percentage of affiliate clicks that turn into actual purchases. Pre-filled with the industry average."
                                        suffix="%"
                                        hint="Industry average: 1% – 3%"
                                        benchmarkBadge={true}
                                        isOptional={true}
                                        step={0.01}
                                        max={100}
                                    />
                                </div>

                                {/* 2. Store Details */}
                                <div className="space-y-3">
                                    <CalculatorInput
                                        label="Average Order Value"
                                        value={values.averageOrderValue}
                                        onChange={(v) => handleInputChange('averageOrderValue', v)}
                                        placeholder="75.00"
                                        tooltip="The average amount a customer spends per order on your store."
                                        prefix={currencySymbol}
                                        step={0.01}
                                        groupingTitle="Store Details"
                                        groupingIcon={ShoppingCart}
                                    />
                                </div>

                                {/* 3. Payout & Profit */}
                                <div className="space-y-3">
                                    <CalculatorInput
                                        label="Commission Rate"
                                        value={values.affiliateCommission}
                                        onChange={(v) => handleInputChange('affiliateCommission', v)}
                                        placeholder="10"
                                        tooltip="The percentage of each sale you pay to an affiliate as their commission."
                                        suffix="%"
                                        hint="Typical range: 5% – 30%"
                                        step={0.01}
                                        max={100}
                                        groupingTitle="Payout & Profit"
                                        groupingIcon={Handshake}
                                    />
                                    <CalculatorInput
                                        label="Product Cost"
                                        value={values.productCost}
                                        onChange={(v) => handleInputChange('productCost', v)}
                                        placeholder="40"
                                        tooltip="Your cost to produce or source the product, as a percentage of revenue. Helps calculate your actual profit after paying affiliates."
                                        suffix="%"
                                        hint="Helps calculate your net profit"
                                        isOptional={true}
                                        step={0.01}
                                        max={100}
                                    />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Right Column: Results */}
                <div className="lg:col-span-5 space-y-3">
                    <ResultSummaryCard
                        title={
                            hasInputs
                                ? "AFFILITATE PAYOUTS (Total Commission Paid)"
                                : "AFFILITATE PAYOUTS (Total Commission Paid)"
                        }
                        primaryResult={{
                            value: Math.round(results.affiliatePayout).toLocaleString(),
                            unit: currencySymbol,
                            label: "Total Affiliate Payout",
                            key: "affiliatePayout"
                        }}
                        secondaryResults={[
                            {
                                key: "totalRevenue",
                                label: "Total Revenue",
                                value: Math.round(results.totalRevenue).toLocaleString(),
                                unit: currencySymbol,
                                tooltip: "Total revenue generated from estimated sales. Calculated as Estimated Sales × Average Order Value."
                            },
                            {
                                key: "estimatedSales",
                                label: "Estimated Sales",
                                value: Math.round(results.estimatedSales).toLocaleString(),
                                unit: " sales",
                                tooltip: "Number of actual purchases expected from the affiliate traffic. Calculated as Clicks × Conversion Rate."
                            },
                            {
                                key: "netProfit",
                                label: "Net Profit",
                                value: Math.round(results.netProfit).toLocaleString(),
                                unit: currencySymbol,
                                tooltip: "Your take-home profit after deducting affiliate commissions and product costs. Calculated as Revenue − Affiliate Payout − Product Cost."
                            }
                        ]}
                        isCalculated={hasInputs}
                        profitLossKey="netProfit"
                        emptyMessage="Enter the below mentioned fields to get the output."
                        checklistItems={[
                            { key: 'traffic', label: 'Enter Affiliate Traffic', isComplete: values.affiliateTraffic !== "" },
                            { key: 'aov', label: 'Define Average Order Value', isComplete: values.averageOrderValue !== "" },
                            { key: 'commission', label: 'Set Commission Rate', isComplete: values.affiliateCommission !== "" }
                        ]}
                        dynamicMessages={{
                            positive: "Your affiliate program is profitable at this commission rate. You're earning more than you pay out.",
                            negative: "Your program is operating at a loss. Try lowering the commission rate or reducing product costs.",
                            neutral: "Your program is breaking even. Revenue exactly covers affiliate payouts and product costs."
                        }}
                    />
                </div>
            </div>
        </div>
    )
}
