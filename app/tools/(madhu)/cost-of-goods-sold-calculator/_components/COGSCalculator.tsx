"use client"

import React, { useState, useMemo } from "react"
import {
    Package,
    Truck
} from "lucide-react"
import { cn } from "@/lib/utils"
import {
    CalculatorCardHeader,
    CalculatorInput,
    ResultSummaryCard,
    FadeIn
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
    unitsSold: string | number
}

const DEFAULT_STATE: COGSState = {
    productCost: "",
    inboundShipping: "",
    duties: "",
    packaging: "",
    fulfillmentFee: "",
    outboundShipping: "",
    unitsSold: ""
}

export function COGSCalculator() {
    const [values, setValues] = useState<COGSState>(DEFAULT_STATE)
    const [currency, setCurrency] = useState("USD")

    const handleInputChange = (field: keyof COGSState, value: string | number) => {
        setValues(prev => ({ ...prev, [field]: value === "" ? "" : value.toString() }))
    }

    const hasInputs = useMemo(() => {
        const mandatoryFields = [
            values.productCost,
            values.inboundShipping,
            values.duties,
            values.packaging,
            values.fulfillmentFee,
            values.outboundShipping
        ]
        return mandatoryFields.every(val => val !== "" && val !== null && val !== undefined)
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
        const units = Number(values.unitsSold) || 0

        const cogsPerUnit = product + inbound + duties + pkg + fulfillment + outbound

        // If units are not provided (or 0), we don't assume 1. We just pass 0 to hide or change the behavior
        // But for display purposes, we might want Total COGS to show 0 or be hidden entirely when no units are input.
        // Let's modify: if units is 0, we can either hide the secondary card, or explicitly show "0".
        // Let's pass the raw total which is cogsPerUnit * units, and the UI can handle if it's 0.
        const totalCogs = cogsPerUnit * units

        return { cogsPerUnit, totalCogs, units }
    }, [values])

    const handleReset = () => setValues(DEFAULT_STATE)

    return (
        <FadeIn className="w-full max-w-6xl mx-auto py-8 px-4" duration={0.6}>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                {/* Left Column: Inputs */}
                <div className="lg:col-span-7 space-y-3">
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
                                groupingTitle="Product & Import Costs"
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
                                label="Packaging"
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
                                label="Outbound Shipping"
                                value={values.outboundShipping}
                                onChange={(v) => handleInputChange('outboundShipping', v)}
                                placeholder="4.00"
                                prefix={selectedCurrency.symbol}
                                tooltip="Shipping cost to customer (if not included in price)"
                            />

                            <CalculatorInput
                                label="Units Sold"
                                isOptional={true}
                                value={values.unitsSold}
                                onChange={(v) => handleInputChange('unitsSold', v)}
                                placeholder="100"
                                tooltip="Number of units sold to calculate Total COGS."
                                hideSeparator
                            />

                        </CardContent>
                    </Card>
                </div>

                {/* Right Column: Results */}
                <div className="lg:col-span-5 sticky top-6">
                    <ResultSummaryCard
                        title="COGS Analysis"
                        isCalculated={hasInputs}
                        currency={currency}
                        primaryResult={{
                            key: "cogsPerUnit",
                            label: "COGS per Unit",
                            value: results.cogsPerUnit,
                            isCurrency: true
                        }}
                        description="A breakdown of your Cost of Goods Sold."
                        secondaryResults={
                            !hasInputs ? [
                                {
                                    key: "totalCogs_skeleton",
                                    label: "Total COGS",
                                    value: 0,
                                    className: "sm:col-span-2"
                                }
                            ] : results.units > 0 ? [
                                {
                                    key: "totalCogs",
                                    label: "Total COGS",
                                    value: results.totalCogs,
                                    isCurrency: true,
                                    tooltip: "Total cost for all units based on Units Sold.",
                                    className: "sm:col-span-2"
                                }
                            ] : []
                        }
                        checklistItems={[
                            { key: 'productCost', label: 'Product Cost', isComplete: values.productCost !== "" && values.productCost !== null && values.productCost !== undefined },
                            { key: 'inboundShipping', label: 'Inbound Shipping', isComplete: values.inboundShipping !== "" && values.inboundShipping !== null && values.inboundShipping !== undefined },
                            { key: 'duties', label: 'Duties & Taxes', isComplete: values.duties !== "" && values.duties !== null && values.duties !== undefined },
                            { key: 'packaging', label: 'Packaging', isComplete: values.packaging !== "" && values.packaging !== null && values.packaging !== undefined },
                            { key: 'fulfillmentFee', label: 'Fulfillment Fee', isComplete: values.fulfillmentFee !== "" && values.fulfillmentFee !== null && values.fulfillmentFee !== undefined },
                            { key: 'outboundShipping', label: 'Outbound Shipping', isComplete: values.outboundShipping !== "" && values.outboundShipping !== null && values.outboundShipping !== undefined }
                        ]}
                    />
                </div>
            </div>
        </FadeIn>
    )
}
