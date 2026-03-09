"use client"

import React, { useState, useMemo } from "react"
import {
    Package,
    Truck
} from "lucide-react"
import {
    CalculatorCardHeader,
    CalculatorInput,
    ResultSummaryCard,
} from "@/app/tools/_shared/components"
import { Card, CardContent } from "@/components/ui/card"
import { currencies } from "@/app/tools/_shared/components/CurrencyCombobox"

interface COGSState {
    productCost: string | number
    inboundShipping: string | number
    duties: string | number
    packaging: string | number
    fulfillmentFee: string | number
    outboundShipping: string | number
    returnRate: string | number
    sellPrice: string | number
}

const DEFAULT_STATE: COGSState = {
    productCost: "",
    inboundShipping: "",
    duties: "",
    packaging: "",
    fulfillmentFee: "",
    outboundShipping: "",
    returnRate: "",
    sellPrice: ""
}

export function COGSCalculator() {
    const [values, setValues] = useState<COGSState>(DEFAULT_STATE)
    const [currency, setCurrency] = useState("USD")

    const handleInputChange = (field: keyof COGSState, value: string | number) => {
        setValues(prev => ({ ...prev, [field]: value === "" ? "" : value.toString() }))
    }

    const hasInputs = useMemo(() => {
        return Object.values(values).some(val => val !== "")
    }, [values])

    const selectedCurrency = useMemo(() =>
        currencies.find(c => c.code === currency) || currencies[0]
        , [currency])

    const results = useMemo(() => {
        const product = Number(values.productCost) || 0
        const inbound = Number(values.inboundShipping) || 0
        const duties = Number(values.duties) || 0
        const pkg = Number(values.packaging) || 0
        const fulfillment = Number(values.fulfillmentFee) || 0
        const outbound = Number(values.outboundShipping) || 0
        const rate = Number(values.returnRate) || 0
        const price = Number(values.sellPrice) || 0

        const landedCost = product + inbound + duties + pkg
        const returnRiskCost = price * (rate / 100)
        const trueCogs = landedCost + fulfillment + outbound + returnRiskCost
        const grossProfit = price - trueCogs
        const grossMargin = price > 0 ? (grossProfit / price) * 100 : 0

        return { landedCost, returnRiskCost, trueCogs, grossProfit, grossMargin }
    }, [values])

    const handleReset = () => setValues(DEFAULT_STATE)

    return (
        <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start pt-1">
                {/* Left Column: Inputs */}
                <div className="lg:col-span-7">
                    <Card className="border border-slate-200 shadow-sm bg-white overflow-hidden h-full flex flex-col rounded-3xl">
                        <CalculatorCardHeader
                            title="Unit Economics"
                            description="Calculate the true cost and profitability of a single product unit."
                            onReset={handleReset}
                            currency={currency}
                            onCurrencyChange={setCurrency}
                        />
                        <CardContent className="p-6 md:p-8 pb-12 md:pb-16 flex-1 flex flex-col">

                            {/* Section 1: Acquisition Costs */}
                            <CalculatorInput
                                label="Product Cost"
                                value={values.productCost}
                                onChange={(v) => handleInputChange('productCost', v)}
                                placeholder="15.00"
                                prefix={selectedCurrency.symbol}
                                tooltip="Cost per unit from supplier"
                                groupingTitle="Acquisition (Landed) Cost"
                                groupingIcon={Package}
                                hideSeparator
                            />
                            <CalculatorInput
                                label="Inbound Shipping"
                                value={values.inboundShipping}
                                onChange={(v) => handleInputChange('inboundShipping', v)}
                                placeholder="2.50"
                                prefix={selectedCurrency.symbol}
                                tooltip="Freight cost to get goods to you (per unit)"
                            />
                            <CalculatorInput
                                label="Duties & Taxes"
                                value={values.duties}
                                onChange={(v) => handleInputChange('duties', v)}
                                placeholder="1.25"
                                prefix={selectedCurrency.symbol}
                                tooltip="Customs duties, tariffs, and taxes"
                            />
                            <CalculatorInput
                                label="Pkg. & Prep"
                                value={values.packaging}
                                onChange={(v) => handleInputChange('packaging', v)}
                                placeholder="0.75"
                                prefix={selectedCurrency.symbol}
                                tooltip="Cost of packaging, polybags, labels, etc."
                            />

                            {/* Section 2: Fulfillment & Sales */}
                            <CalculatorInput
                                label="Fulfillment Fee"
                                value={values.fulfillmentFee}
                                onChange={(v) => handleInputChange('fulfillmentFee', v)}
                                placeholder="3.50"
                                prefix={selectedCurrency.symbol}
                                tooltip="Cost to pick and pack (e.g., FBA Fee)"
                                groupingTitle="Fulfillment & Sales"
                                groupingIcon={Truck}
                            />
                            <CalculatorInput
                                label="Outbound Ship"
                                value={values.outboundShipping}
                                onChange={(v) => handleInputChange('outboundShipping', v)}
                                placeholder="4.00"
                                prefix={selectedCurrency.symbol}
                                tooltip="Shipping cost to customer (if not included in price)"
                            />
                            <CalculatorInput
                                label="Est. Return Rate"
                                value={values.returnRate}
                                onChange={(v) => handleInputChange('returnRate', v)}
                                placeholder="5"
                                suffix="%"
                                tooltip="Percentage of sales expected to be returned"
                            />
                            <CalculatorInput
                                label="Target Sell Price"
                                value={values.sellPrice}
                                onChange={(v) => handleInputChange('sellPrice', v)}
                                placeholder="49.99"
                                prefix={selectedCurrency.symbol}
                                tooltip="The price you intend to sell the product for"
                            />

                        </CardContent>
                    </Card>
                </div>

                {/* Right Column: Results */}
                <div className="lg:col-span-5 sticky top-6">
                    <ResultSummaryCard
                        title="Profit Analysis"
                        isCalculated={hasInputs}
                        currency={currency}
                        primaryResult={{
                            key: "trueCogs",
                            label: "TRUE COGS",
                            value: results.trueCogs,
                            isCurrency: true
                        }}
                        secondaryResults={[
                            {
                                key: "landedCost",
                                label: "Landed Cost",
                                value: results.landedCost,
                                isCurrency: true,
                                tooltip: "Cost of product plus shipping, duties, and packaging."
                            },
                            {
                                key: "returnRiskCost",
                                label: "Return Cost",
                                value: results.returnRiskCost,
                                isCurrency: true,
                                tooltip: "Expected cost from returns based on estimated return rate."
                            },
                            {
                                key: "grossProfit",
                                label: "Gross Profit",
                                value: results.grossProfit,
                                isCurrency: true,
                                tooltip: "Total revenue minus all costs (COGS)."
                            },
                            {
                                key: "grossMargin",
                                label: "Gross Margin",
                                value: results.grossMargin.toFixed(1),
                                unit: "%",
                                tooltip: "Profit as a percentage of the selling price."
                            }
                        ]}
                        profitLossKey="grossProfit"
                        dynamicMessages={{
                            positive: `Profit margin is ${results.grossMargin.toFixed(1)}%. This is a healthy margin!`,
                            negative: "Warning: Your costs exceed your selling price. You are losing money on every unit.",
                            neutral: "Break-even point reached. Your price exactly covers all associated costs."
                        }}
                    />
                </div>
            </div>
        </div>
    )
}
