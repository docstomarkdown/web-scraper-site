"use client";
import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card"
import { User, TrendingUp, DollarSign } from "lucide-react"
import { FadeIn, CalculatorInput, CalculatorCardHeader, ResultSummaryCard, formatCurrencyValue } from "@/app/tools/_shared/components"
import { CLVBreakdown } from "./CLVBreakdown";

export function CLVCalculator() {
    const [currency, setCurrency] = useState("USD");

    // Core Value Drivers
    const [aov, setAov] = useState<number | "">("")
    const [frequency, setFrequency] = useState<number | "">("")
    const [lifespan, setLifespan] = useState<number | "">("")

    // Profit & Acquisition
    const [grossMargin, setGrossMargin] = useState<number | "">("")
    const [cac, setCac] = useState<number | "">("")

    const handleReset = () => {
        setAov("");
        setFrequency("");
        setLifespan("");
        setGrossMargin("");
        setCac("");
    };

    const val = (v: number | "") => (v === "" ? 0 : v);

    const aovVal = val(aov);
    const freqVal = val(frequency);
    const lifespanVal = val(lifespan);
    const marginVal = val(grossMargin);
    const cacVal = val(cac);

    // CLV = AOV × Frequency × Lifespan (revenue-based)
    const clv = aovVal * freqVal * lifespanVal;
    // Lifetime Profit = CLV × Margin% − CAC (only meaningful when margin is entered)
    const grossProfit = clv * (marginVal / 100);
    const lifetimeProfit = grossProfit - cacVal;
    const hasMargin = grossMargin !== "";

    // Requires only the 3 core behavior fields
    const isCalculated = aov !== "" && frequency !== "" && lifespan !== "";

    const formatCurrency = (v: number) => formatCurrencyValue(v, currency, 0);

    return (
        <FadeIn className="w-full max-w-6xl mx-auto py-8 px-4" duration={0.6}>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                {/* Left Column: Inputs - Sticky */}
                <div className="lg:col-span-7 lg:sticky lg:top-8">
                    <FadeIn delay={0.2} direction="right" className="h-full">
                        <Card className="border border-slate-200 shadow-sm bg-white">
                            <CalculatorCardHeader
                                title="Customer Metrics"
                                description="Define your customer's behavior and unit economics."
                                onReset={handleReset}
                                currency={currency}
                                onCurrencyChange={setCurrency}
                            />
                            <CardContent className="p-4 md:p-6 pb-10 md:pb-14 space-y-3 flex flex-col">
                                <div className="space-y-6 max-w-[520px] mx-auto w-full">

                                    {/* Group 1: Customer Behavior */}
                                    <div className="space-y-4">
                                        <CalculatorInput
                                            label={`Avg. Order Value `}
                                            value={aov}
                                            onChange={setAov}
                                            placeholder="50"
                                            isCurrency
                                            currency={currency}
                                            autoFocus
                                            tooltip="The average amount a customer spends each time they buy. Use your store's average if you're unsure."
                                            groupingTitle="Customer Behavior"
                                            groupingIcon={User}
                                            hideSeparator={true}
                                        />
                                        <CalculatorInput
                                            label="Annual Purchase Frequency"
                                            value={frequency}
                                            onChange={setFrequency}
                                            placeholder="4"
                                            min={1}
                                            tooltip="How many times, on average, a customer buys from you per year. For example, 4 = once per quarter."
                                        />
                                        <CalculatorInput
                                            label="Customer Lifespan (Years)"
                                            value={lifespan}
                                            onChange={setLifespan}
                                            placeholder="3"
                                            min={1}
                                            tooltip="How many years a typical customer stays active before they stop buying. Most businesses average 2–5 years."
                                        />
                                    </div>

                                    {/* Group 2: Unit Economics */}
                                    <div className="space-y-4">
                                        <CalculatorInput
                                            label="Gross Margin (%)"
                                            value={grossMargin}
                                            onChange={setGrossMargin}
                                            placeholder="40"
                                            min={0}
                                            max={100}
                                            tooltip="The percentage of revenue left after subtracting product and shipping costs. Example: 40% means you keep $40 from a $100 sale."
                                            groupingTitle="Unit Economics"
                                            groupingIcon={TrendingUp}
                                        />
                                        <CalculatorInput
                                            label={`Acquisition Cost — CAC (${currency})`}
                                            value={cac}
                                            onChange={setCac}
                                            placeholder="30"
                                            isCurrency
                                            currency={currency}
                                            tooltip="What you spend on ads and marketing to acquire one new customer. Leave blank if you're not tracking this yet."
                                            isOptional
                                            ignoreChecklist={true}
                                        />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </FadeIn>
                </div>

                {/* Right Column: Results - Scrollable */}
                <div className="lg:col-span-5 space-y-4">
                    <FadeIn delay={0.4} direction="left" className="space-y-4">
                        <ResultSummaryCard
                            panelTitle="CLV Calculator"
                            isCalculated={isCalculated}
                            currency={currency}
                            emptyMessage="Customer Lifetime Value"
                            showLiveBadge={true}
                            liveBadgeText={isCalculated ? "Calculated" : "Live"}
                            liveBadgeColor={isCalculated ? "emerald" : "blue"}
                            description={
                                isCalculated
                                    ? hasMargin
                                        ? "Total expected revenue generated by a single customer."
                                        : "Add Gross Margin % to unlock Lifetime Profit."
                                    : undefined
                            }
                            primaryResult={{
                                value: clv,
                                label: "Customer Lifetime Value (CLV)",
                                isCurrency: true,
                                key: "clv"
                            }}
                            secondaryResults={[
                                {
                                    key: "totalRevenue",
                                    label: "Total Lifetime Revenue",
                                    value: clv,
                                    isCurrency: true,
                                    icon: DollarSign,
                                    tooltip: `AOV (${formatCurrency(aovVal)}) × Frequency (${freqVal}×/yr) × Lifespan (${lifespanVal} yrs) = ${formatCurrency(clv)} total revenue over the customer relationship.`
                                },
                                ...(hasMargin ? [{
                                    key: "lifetimeProfit",
                                    label: "Lifetime Profit",
                                    value: lifetimeProfit,
                                    isCurrency: true,
                                    icon: TrendingUp,
                                    tooltip: `Gross Profit (${formatCurrency(grossProfit)}) − CAC (${formatCurrency(cacVal)}) = ${formatCurrency(lifetimeProfit)}. This is the actual profit earned after product costs and acquisition spend.`
                                }] : [])
                            ]}
                            checklistItems={[
                                { key: "aov", label: "Avg. Order Value", isComplete: aov !== "" },
                                { key: "frequency", label: "Purchase Frequency", isComplete: frequency !== "" },
                                { key: "lifespan", label: "Customer Lifespan", isComplete: lifespan !== "" },
                            ]}
                        />

                        <CLVBreakdown
                            clvRevenue={clv}
                            grossProfit={grossProfit}
                            cacVal={cacVal}
                            netProfit={lifetimeProfit}
                            marginVal={marginVal}
                            currency={currency}
                        />
                    </FadeIn>
                </div>
            </div>
        </FadeIn>
    );
}