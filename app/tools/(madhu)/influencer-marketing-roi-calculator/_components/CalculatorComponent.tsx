"use client"

import React, { useState } from "react"
import { Card, CardContent } from "../../../../../components/ui/card"
import { DollarSign, Truck, Users, BarChart3 } from "lucide-react"
import { ActionButtons } from "../../ToolTemplate"
import { FadeIn, CalculatorInput, CalculatorCardHeader, ResultSummaryCard } from "../../../_shared/components"
import { BudgetAllocation } from "./BudgetAllocation"

export function InfluencerROICalculator() {
    const [currency, setCurrency] = useState("USD")

    // Investment States
    const [influencerFee, setInfluencerFee] = useState<number | "">("")
    const [productCogs, setProductCogs] = useState<number | "">("")
    const [shippingCost, setShippingCost] = useState<number | "">("")
    const [managementFee, setManagementFee] = useState<number | "">("")
    const [contentRightsFee, setContentRightsFee] = useState<number | "">("")
    const [boostingSpend, setBoostingSpend] = useState<number | "">("")

    // Performance States
    const [totalSales, setTotalSales] = useState<number | "">("")
    const [conversions, setConversions] = useState<number | "">("")
    const [impressions, setImpressions] = useState<number | "">("")
    const [engagements, setEngagements] = useState<number | "">("")

    const val = (v: number | "") => (v === "" ? 0 : v)

    const handleReset = () => {
        setInfluencerFee("")
        setProductCogs("")
        setShippingCost("")
        setManagementFee("")
        setContentRightsFee("")
        setBoostingSpend("")
        setTotalSales("")
        setConversions("")
        setImpressions("")
        setEngagements("")
    }

    // Calculations
    const fee = val(influencerFee)
    const pCogs = val(productCogs)
    const ship = val(shippingCost)
    const mgmt = val(managementFee)
    const rights = val(contentRightsFee)
    const boost = val(boostingSpend)

    const sales = val(totalSales)
    const convs = val(conversions)
    const imps = val(impressions)
    const engs = val(engagements)

    const totalInvestment = fee + pCogs + ship + mgmt + rights + boost
    const hasAnyData = totalInvestment > 0 || sales > 0 || convs > 0 || imps > 0 || engs > 0
    const netProfit = sales - totalInvestment
    const roi = totalInvestment > 0 ? (netProfit / totalInvestment) * 100 : 0
    const roas = totalInvestment > 0 ? sales / totalInvestment : 0

    const cpa = convs > 0 ? totalInvestment / convs : 0
    const cpm = imps > 0 ? (totalInvestment / imps) * 1000 : 0
    const cpe = engs > 0 ? totalInvestment / engs : 0

    const [isCopied, setIsCopied] = useState(false)

    const handleCopy = () => {
        const text = `Influencer Marketing ROI Results:\n\n` +
            `Investment Details:\n` +
            `- Influencer Fee: ${formatCurrency(fee)}\n` +
            `- Product & Shipping: ${formatCurrency(pCogs + ship)}\n` +
            `- Management & Rights: ${formatCurrency(mgmt + rights)}\n` +
            `- Boosting Spend: ${formatCurrency(boost)}\n` +
            `Total Investment: ${formatCurrency(totalInvestment)}\n\n` +
            `Performance Results:\n` +
            `- Total Sales: ${formatCurrency(sales)}\n` +
            `- Net Profit: ${formatCurrency(netProfit)}\n` +
            `- ROI: ${roi.toFixed(2)}%\n` +
            `- ROAS: ${roas.toFixed(2)}x\n` +
            `- CPA: ${formatCurrency(cpa)}\n` +
            `- CPM: ${formatCurrency(cpm)}\n` +
            `- CPE: ${formatCurrency(cpe)}`

        navigator.clipboard.writeText(text).then(() => {
            setIsCopied(true)
            setTimeout(() => setIsCopied(false), 2000)
        })
    }

    const formatCurrency = (val: number) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: currency,
            maximumFractionDigits: 2
        }).format(val)
    }

    // Breakdown Percentages
    const getPercent = (amount: number) => {
        return totalInvestment > 0 ? Math.min(Math.max((amount / totalInvestment) * 100, 0), 100) : 0
    }

    const feePct = getPercent(fee)
    const productPct = getPercent(pCogs + ship)
    const managementPct = getPercent(mgmt + rights)
    const boostPct = getPercent(boost)

    return (
        <FadeIn className="w-full max-w-6xl mx-auto py-2 px-4" duration={0.6}>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                <div className="lg:col-span-7 space-y-4">
                    <Card className="border border-slate-200 shadow-xl shadow-slate-200/40 bg-white rounded-3xl overflow-hidden">
                        <CalculatorCardHeader
                            title="Campaign Budget"
                            description="Log every dollar invested into the campaign."
                            currency={currency}
                            onCurrencyChange={setCurrency}
                        />

                        <CardContent className="p-6 md:p-8 space-y-8 flex-1 flex flex-col">
                            {/* Direct Costs */}
                            <div className="space-y-4">
                                <CalculatorInput
                                    label="Influencer Fee"
                                    value={influencerFee}
                                    onChange={setInfluencerFee}
                                    placeholder="1000.00"
                                    tooltip="The flat fee paid directly to the creator."
                                    prefix={currency}
                                    groupingTitle="Direct costs"
                                    groupingIcon={DollarSign}
                                />
                                <CalculatorInput
                                    label="Boosting / Ad Spend"
                                    value={boostingSpend}
                                    onChange={setBoostingSpend}
                                    placeholder="500.00"
                                    tooltip="Amount spent on Meta/TikTok ads to boost the creator's post."
                                    prefix={currency}
                                />
                            </div>

                            {/* Logistics & Product */}
                            <div className="h-px bg-slate-100 w-full" />
                            <div className="space-y-4">
                                <CalculatorInput
                                    label="Product COGS"
                                    value={productCogs}
                                    onChange={setProductCogs}
                                    placeholder="50.00"
                                    tooltip="The manufacturing cost or wholesale price of gifted products."
                                    prefix={currency}
                                    groupingTitle="Fulfillment & logistics"
                                    groupingIcon={Truck}
                                />
                                <CalculatorInput
                                    label="Shipping & Packaging"
                                    value={shippingCost}
                                    onChange={setShippingCost}
                                    placeholder="15.00"
                                    tooltip="Costs to ship the units to the influencer."
                                    prefix={currency}
                                />
                            </div>

                            {/* Overhead */}
                            <div className="h-px bg-slate-100 w-full" />
                            <div className="space-y-4">
                                <CalculatorInput
                                    label="Agency/Mgmt Fee"
                                    value={managementFee}
                                    onChange={setManagementFee}
                                    placeholder="250.00"
                                    tooltip="Any commission or fee paid to an agency or manager."
                                    prefix={currency}
                                    groupingTitle="Management & rights"
                                    groupingIcon={Users}
                                />
                                <CalculatorInput
                                    label="Content Rights Fee"
                                    value={contentRightsFee}
                                    onChange={setContentRightsFee}
                                    placeholder="100.00"
                                    tooltip="Additional cost for whitelisting or spark ad rights."
                                    prefix={currency}
                                />
                            </div>

                            {/* Performance Data */}
                            <div className="h-px bg-slate-100 w-full" />
                            <div className="space-y-4 pt-1">
                                <CalculatorInput
                                    label="Total Sales Revenue"
                                    value={totalSales}
                                    onChange={setTotalSales}
                                    placeholder="8500.00"
                                    tooltip="The total gross revenue generated from tracking links/codes."
                                    prefix={currency}
                                    groupingTitle="Performance metrics"
                                    groupingIcon={BarChart3}
                                />
                                <CalculatorInput
                                    label="Total Conversions"
                                    value={conversions}
                                    onChange={setConversions}
                                    placeholder="125"
                                    tooltip="Number of successful orders or leads generated."
                                />
                                <CalculatorInput
                                    label="Total Impressions"
                                    value={impressions}
                                    onChange={setImpressions}
                                    placeholder="50000"
                                    tooltip="Number of times the content was viewed."
                                />
                                <CalculatorInput
                                    label="Total Engagements"
                                    value={engagements}
                                    onChange={setEngagements}
                                    placeholder="2500"
                                    tooltip="Total likes, comments, and shares."
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
                        title="Return on Investment"
                        primaryResult={{
                            value: roi.toFixed(2),
                            unit: "%",
                            label: "Return"
                        }}
                        secondaryResults={[
                            {
                                key: "roas",
                                label: "ROAS",
                                value: roas.toFixed(2),
                                unit: "x",
                                tooltip: "Revenue generated for every $1 spent. (Sales / Investment)"
                            },
                            {
                                key: "cpa",
                                label: "CPA (Cost/Sale)",
                                value: cpa.toFixed(2),
                                unit: currency,
                                tooltip: "How much it costs to acquire one customer. (Investment / Sales)"
                            },
                            {
                                key: "cpm",
                                label: "CPM (1k Views)",
                                value: cpm.toFixed(2),
                                unit: currency,
                                tooltip: "Cost per 1,000 impressions. ((Investment / Impressions) * 1000)"
                            },
                            {
                                key: "cpe",
                                label: "CPE (Engage)",
                                value: cpe.toFixed(2),
                                unit: currency,
                                tooltip: "Cost for every like, comment, or share. (Investment / Engagements)"
                            },
                            {
                                key: "netProfit",
                                label: "Net Profit",
                                value: netProfit.toFixed(2),
                                unit: currency,
                                tooltip: "Total Sales minus Total Investment"
                            }
                        ]}
                        isCalculated={hasAnyData}
                        profitLossKey="netProfit"
                    />

                    <BudgetAllocation
                        fee={fee}
                        boost={boost}
                        productAndShipping={pCogs + ship}
                        mgmtAndRights={mgmt + rights}
                        totalInvestment={totalInvestment}
                        feePct={feePct}
                        boostPct={boostPct}
                        productPct={productPct}
                        managementPct={managementPct}
                        formatCurrency={formatCurrency}
                    />
                </div>
            </div>
        </FadeIn>
    )
}
