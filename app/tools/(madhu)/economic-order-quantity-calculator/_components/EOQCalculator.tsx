"use client"
import React, { useState, useMemo } from "react"
import { Scale } from "lucide-react"
import {
    FadeIn,
    ResultSummaryCard,
    CalculatorInput,
    CalculatorCardHeader,
} from "@/app/tools/_shared/components"
import { Card, CardContent } from "@/components/ui/card"

interface EOQState {
    annualDemand: string | number
    orderCost: string | number
    holdingCost: string | number
}

const DEFAULT_STATE: EOQState = {
    annualDemand: "",
    orderCost: "",
    holdingCost: "",
}

export function EOQCalculator() {
    const [values, setValues] = useState<EOQState>(DEFAULT_STATE)
    const [currency, setCurrency] = useState("USD")

    const handleInputChange = (field: keyof EOQState, value: string | number) => {
        setValues((prev) => ({ ...prev, [field]: value === "" ? "" : value.toString() }))
    }

    const hasInputs = useMemo(() => {
        return (
            values.annualDemand !== "" &&
            values.orderCost !== "" &&
            values.holdingCost !== "" &&
            Number(values.annualDemand) > 0 &&
            Number(values.holdingCost) > 0
        )
    }, [values])

    const results = useMemo(() => {
        const D = Number(values.annualDemand) || 0
        const S = Number(values.orderCost) || 0
        const H = Number(values.holdingCost) || 0
        if (D === 0 || H === 0)
            return { eoq: 0, annualOrders: "0", annualOrderCost: 0, annualHoldingCost: 0, totalCost: 0 }
        const eoq = Math.sqrt((2 * D * S) / H)
        const annualOrders = D / eoq
        const annualOrderCost = annualOrders * S
        const annualHoldingCost = (eoq / 2) * H
        const totalCost = annualOrderCost + annualHoldingCost
        return {
            eoq: Math.round(eoq),
            annualOrders: annualOrders.toFixed(1),
            annualOrderCost,
            annualHoldingCost,
            totalCost,
        }
    }, [values])

    const handleReset = () => setValues(DEFAULT_STATE)

    return (
        <FadeIn className="max-w-6xl mx-auto" duration={0.6}>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch pt-6">
                {/* Left: Inputs */}
                <div className="lg:col-span-7">
                    <Card className="border border-slate-200 shadow-sm bg-white overflow-hidden h-full flex flex-col rounded-[2.5rem]">
                        <CalculatorCardHeader
                            title="EOQ Configuration"
                            description="Enter your annual supply chain costs to find your optimal order quantity."
                            currency={currency}
                            onCurrencyChange={setCurrency}
                            guideId="how-to-use"
                            onReset={handleReset}
                            tooltip="See step-by-step instructions below"
                        />
                        <CardContent className="p-6 md:p-8 pb-12 md:pb-16 space-y-8 flex-1 flex flex-col">
                            <div className="space-y-3">
                                <CalculatorInput
                                    label="Annual Demand (Units)"
                                    value={values.annualDemand}
                                    onChange={(v) => handleInputChange("annualDemand", v)}
                                    placeholder="10000"
                                    tooltip="Total units your business sells or uses in one full year."
                                />
                                <CalculatorInput
                                    label="Cost Per Order"
                                    value={values.orderCost}
                                    onChange={(v) => handleInputChange("orderCost", v)}
                                    placeholder="50"
                                    currency={currency}
                                    tooltip="Fixed cost every time you place a purchase order — includes shipping, admin, and supplier fees."
                                />
                                <CalculatorInput
                                    label="Annual Holding Cost Per Unit"
                                    value={values.holdingCost}
                                    onChange={(v) => handleInputChange("holdingCost", v)}
                                    placeholder="2.50"
                                    currency={currency}
                                    tooltip="Cost to store one unit for a full year — warehouse rent, insurance, and capital tied up in stock."
                                />
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Right: Results */}
                <div className="lg:col-span-5 space-y-3 flex flex-col">
                    <ResultSummaryCard
                        title="Optimal Order Quantity"
                        primaryResult={{
                            value: results.eoq,
                            unit: "Units",
                            label: "Optimal Order Quantity",
                            key: "eoq",
                        }}
                        secondaryResults={[
                            {
                                key: "orderCost",
                                label: "Annual Order Cost",
                                value: results.annualOrderCost,
                                isCurrency: true,
                                tooltip: "Total cost of all purchase orders in a year at this EOQ.",
                            },
                            {
                                key: "holdingCost",
                                label: "Annual Holding Cost",
                                value: results.annualHoldingCost,
                                isCurrency: true,
                                tooltip: "Total storage cost for average inventory in a year at this EOQ.",
                            },
                        ]}
                        currency={currency}
                        isCalculated={hasInputs}
                        description="The ideal order size to keep your total annual inventory costs as low as possible."
                        emptyResultLabel="Optimal Order Quantity"
                        checklistItems={[
                            { label: "Annual Demand", isComplete: values.annualDemand !== "" && Number(values.annualDemand) > 0 },
                            { label: "Cost Per Order", isComplete: values.orderCost !== "" },
                            { label: "Holding Cost / Unit", isComplete: values.holdingCost !== "" && Number(values.holdingCost) > 0 },
                        ]}
                    />

                </div>
            </div>
        </FadeIn>
    )
}
