"use client"
import React, { useState, useMemo } from "react"
import {
    CalculatorInput,
    CalculatorCardHeader,
    ResultSummaryCard,
    FadeIn
} from "@/app/tools/_shared/components"
import { CalendarDays, Boxes } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

interface TurnoverState {
    cogs: string | number
    beginningInventory: string | number
    endingInventory: string | number
    periodInDays: string | number
    currency: string
}

const DEFAULT_STATE: TurnoverState = {
    cogs: "",
    beginningInventory: "",
    endingInventory: "",
    periodInDays: "",
    currency: "USD"
}

export function InventoryTurnoverCalculator() {
    const [values, setValues] = useState<TurnoverState>(DEFAULT_STATE)

    const handleInputChange = (field: keyof TurnoverState, value: string | number) => {
        setValues(prev => ({ ...prev, [field]: value === "" ? "" : value.toString() }))
    }

    const hasInputs = useMemo(() => {
        const cogs = Number(values.cogs) || 0
        const begInv = Number(values.beginningInventory) || 0
        const endInv = Number(values.endingInventory) || 0
        return (
            values.cogs !== "" &&
            values.beginningInventory !== "" &&
            values.endingInventory !== "" &&
            cogs > 0
        )
    }, [values])

    const results = useMemo(() => {
        const cogs = Number(values.cogs) || 0
        const begInv = Number(values.beginningInventory) || 0
        const endInv = Number(values.endingInventory) || 0
        const period = Number(values.periodInDays) || 365

        if (!hasInputs) return {
            avgInventory: 0,
            turnoverRatio: 0,
            dsi: 0,
            status: "Waiting",
            efficiency: 0
        }

        const avgInventory = (begInv + endInv) / (begInv && endInv ? 2 : 1)
        const turnoverRatio = avgInventory > 0 ? cogs / avgInventory : 0
        const dsi = turnoverRatio > 0 ? period / turnoverRatio : 0

        let status = "Moderate"
        if (turnoverRatio < 3) status = "Low"
        else if (turnoverRatio < 7) status = "Moderate"
        else if (turnoverRatio < 12) status = "High"
        else status = "Excellent"

        const efficiency = Math.min(100, (turnoverRatio / 8) * 100)

        return {
            avgInventory,
            turnoverRatio,
            dsi,
            status,
            efficiency
        }
    }, [values, hasInputs])

    const handleReset = () => setValues(DEFAULT_STATE)

    return (
        <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch pt-6">
                {/* Left Column: Smart Inputs */}
                <div className="lg:col-span-7">
                    <FadeIn direction="right">
                        <Card className="border border-slate-200 shadow-sm bg-white overflow-hidden h-full flex flex-col rounded-[2.5rem]">
                            <CalculatorCardHeader
                                title="Turnover Configuration"
                                description="Input your financial data to analyze how effectively you're managing inventory."
                                guideId="how-to-use"
                                onReset={handleReset}
                                currency={values.currency}
                                onCurrencyChange={(v) => handleInputChange('currency', v)}
                            />
                            <CardContent className="p-6 md:p-8 pb-12 md:pb-16 space-y-8 flex-1 flex flex-col">
                                <div className="space-y-4">
                                    <CalculatorInput
                                        label="Cost of Goods Sold (COGS)"
                                        value={values.cogs}
                                        onChange={(v) => handleInputChange('cogs', v)}
                                        placeholder="150000"
                                        tooltip="The total cost of all products sold during the period. Found on your Income Statement."
                                        currency={values.currency}
                                    />
                                    <CalculatorInput
                                        label="Opening Inventory"
                                        value={values.beginningInventory}
                                        onChange={(v) => handleInputChange('beginningInventory', v)}
                                        placeholder="25000"
                                        tooltip="The value of your inventory at the very start of the measurement period."
                                        currency={values.currency}
                                    />
                                    <CalculatorInput
                                        label="Closing Inventory"
                                        value={values.endingInventory}
                                        onChange={(v) => handleInputChange('endingInventory', v)}
                                        placeholder="35000"
                                        tooltip="The value of your inventory at the very end of the measurement period."
                                        currency={values.currency}
                                    />
                                    <CalculatorInput
                                        label="Analysis Period"
                                        value={values.periodInDays}
                                        onChange={(v) => handleInputChange('periodInDays', v)}
                                        placeholder="365"
                                        tooltip="Length of time to analyze. Standard: 365 days (annual), 90 days (quarterly), or 30 days (monthly). Defaults to 365 if left blank."
                                        isOptional={true}
                                        hint="Defaults to 365 days (annual)"
                                    />
                                </div>
                            </CardContent>
                        </Card>
                    </FadeIn>
                </div>

                {/* Right Column: Results */}
                <div className="lg:col-span-5 space-y-3 flex flex-col">
                    <FadeIn direction="left" delay={0.1}>
                        <ResultSummaryCard
                            title="Inventory Turnover Ratio"
                            isCalculated={hasInputs}
                            primaryResult={{
                                value: hasInputs ? results.turnoverRatio.toFixed(2) : "0.00",
                                label: "Turnover Ratio",
                                unit: "x"
                            }}
                            secondaryResults={[
                                {
                                    key: "dsi",
                                    label: "Days to Sell Inventory",
                                    value: hasInputs ? results.dsi.toFixed(1) : "0",
                                    unit: "Days",
                                    tooltip: "How many days of stock you currently hold based on your sales velocity. Lower is generally better.",
                                    icon: CalendarDays,
                                },
                                {
                                    key: "avgInventory",
                                    label: "Average Inventory Value",
                                    value: hasInputs ? results.avgInventory : 0,
                                    isCurrency: true,
                                    tooltip: "The average value of stock held during this period, calculated as (Opening + Closing Stock) ÷ 2.",
                                    icon: Boxes,
                                }
                            ]}
                            currency={values.currency}
                            emptyResultLabel="Turnover Ratio"
                            liveBadgeText={hasInputs ? `${results.status} Turnover` : "LIVE"}
                            checklistItems={[
                                { key: 'cogs', label: 'Cost of Goods Sold', isComplete: values.cogs !== "" },
                                { key: 'beginInv', label: 'Opening Stock Value', isComplete: values.beginningInventory !== "" },
                                { key: 'endInv', label: 'Closing Stock Value', isComplete: values.endingInventory !== "" }
                            ]}
                            dynamicMessages={{
                                positive: "Great efficiency! Your inventory is cycling well. Aim to maintain this turnover range.",
                                negative: "Turnover is low — stock may be sitting too long. Consider reducing reorder quantities.",
                                neutral: "Your inventory is breaking even on turnover. Review reorder cycles to optimize cash flow."
                            }}
                        />
                    </FadeIn>
                </div>
            </div>
        </div>
    )
}
