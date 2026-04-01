"use client";

import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Target, MousePointer2, Calendar, MousePointerClick, ShoppingBag } from "lucide-react";
import { FadeIn, CalculatorInput, CalculatorCardHeader, ResultSummaryCard } from "@/app/tools/_shared/components";

export function AdBudgetCalculator() {
    const [currency, setCurrency] = useState("USD");

    const [revenueGoal, setRevenueGoal] = useState<number | "">("")
    const [targetROAS, setTargetROAS] = useState<number | "">("")

    // New Traffic Inputs
    const [avgCPC, setAvgCPC] = useState<number | "">("")
    const [conversionRate, setConversionRate] = useState<number | "">("")

    const [requiredAdSpend, setRequiredAdSpend] = useState<number>(0);
    const [dailySpend, setDailySpend] = useState<number>(0);
    const [estClicks, setEstClicks] = useState<number>(0);
    const [estOrders, setEstOrders] = useState<number>(0);

    const val = (v: number | "") => (v === "" ? 0 : v);
    const goal = val(revenueGoal);
    const roas = val(targetROAS);
    const cpc = val(avgCPC);
    const cvr = val(conversionRate);

    useEffect(() => {
        if (goal > 0 && roas > 0) {
            const spend = goal / roas;
            setRequiredAdSpend(spend);
            setDailySpend(spend / 30); // Monthly / 30

            // Traffic Potential Logic
            if (cpc > 0) {
                const clicks = spend / cpc;
                setEstClicks(clicks);
                if (cvr > 0) {
                    setEstOrders(clicks * (cvr / 100));
                } else {
                    setEstOrders(0);
                }
            } else {
                setEstClicks(0);
                setEstOrders(0);
            }
        } else {
            setRequiredAdSpend(0);
            setDailySpend(0);
            setEstClicks(0);
            setEstOrders(0);
        }
    }, [goal, roas, cpc, cvr]);

    const handleReset = () => {
        setRevenueGoal("");
        setTargetROAS("");
        setAvgCPC("");
        setConversionRate("");
    };

    const currencySymbols: Record<string, string> = {
        USD: '$', EUR: '€', GBP: '£', INR: '₹', AUD: 'A$', CAD: 'C$', JPY: '¥', CNY: '¥',
        AED: 'AED', SGD: 'S$', HKD: 'HK$', CHF: 'Fr', MXN: 'MX$', BRL: 'R$', KRW: '₩',
        RUB: '₽', ZAR: 'R', SEK: 'kr', NOK: 'kr', DKK: 'kr', PLN: 'zł', THB: '฿',
        IDR: 'Rp', MYR: 'RM', PHP: '₱', VND: '₫', TRY: '₺', SAR: '﷼', NZD: 'NZ$',
        EGP: 'E£', PKR: '₨', BDT: '৳', NGN: '₦', KES: 'KSh'
    }
    const symbol = currencySymbols[currency] || "$"

    return (
        <FadeIn className="w-full max-w-6xl mx-auto py-8 px-4" duration={0.6}>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                {/* Left Column: Inputs */}
                <div className="lg:col-span-7 space-y-3">
                    <Card className="border border-slate-200 shadow-sm bg-white overflow-hidden pb-4">
                        <CalculatorCardHeader
                            title="Campaign Goals"
                            description="Enter your monthly revenue goal and target ROAS."
                            onReset={handleReset}
                            currency={currency}
                            onCurrencyChange={setCurrency}
                        />

                        <CardContent className="p-4 md:p-6 pb-10 md:pb-14 space-y-3 flex flex-col">
                            {/* Group 1: Goals */}
                            <div className="space-y-4 max-w-[520px] mx-auto w-full">
                                <CalculatorInput
                                    label={`Revenue Goal (Per Month)`}
                                    value={revenueGoal}
                                    onChange={setRevenueGoal}
                                    placeholder="100,000"
                                    tooltip="Total target revenue to be generated from advertising campaigns during a single month."
                                    groupingTitle="Growth Goals"
                                    groupingIcon={Target}
                                    hideSeparator={true}
                                />
                                <CalculatorInput
                                    label="Target ROAS"
                                    value={targetROAS}
                                    onChange={setTargetROAS}
                                    placeholder="4.0"
                                    tooltip="Desired ratio of revenue generated to ad spend (e.g., ROAS 4.0 returns $4 for every $1 spent)."
                                />
                            </div>

                            {/* Group 2: Traffic Assumptions */}
                            <div className="space-y-4 max-w-[520px] mx-auto w-full pt-2">
                                <CalculatorInput
                                    label={`Avg. Cost Per Click`}
                                    value={avgCPC}
                                    onChange={setAvgCPC}
                                    placeholder="1.50"
                                    data-ignore-check="true"
                                    tooltip="Estimated amount paid for each individual click on an advertisement."
                                    groupingTitle="Traffic Assumptions"
                                    groupingIcon={MousePointer2}
                                    isOptional
                                    ignoreChecklist={true}
                                />
                                <CalculatorInput
                                    label="Conversion Rate"
                                    value={conversionRate}
                                    onChange={setConversionRate}
                                    placeholder="3.5"
                                    max={100}
                                    suffix="%"
                                    data-ignore-check="true"
                                    isOptional
                                    ignoreChecklist={true}
                                    tooltip="Percentage of ad-directed visitors who complete a purchase."
                                />
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Right Column: Results */}
                <div className="lg:col-span-5 space-y-3 lg:sticky lg:top-8">
                    <ResultSummaryCard
                        title="Monthly Ad Budget"
                        panelTitle="Result Panel"
                        showLiveBadge={true}
                        liveBadgeText={requiredAdSpend > 0 ? "Budget Set" : "Live"}
                        liveBadgeColor={requiredAdSpend > 0 ? "emerald" : "blue"}
                        primaryResult={{
                            value: requiredAdSpend,
                            label: "Required Ad Spend",
                            isCurrency: true,
                            key: "monthly_spend"
                        }}
                        description={requiredAdSpend > 0 ? "Ad spend required to hit your monthly revenue target at your set ROAS." : undefined}
                        secondaryResults={[
                            {
                                key: "daily_spend",
                                label: "Daily Ad Spend Required",
                                value: dailySpend,
                                isCurrency: true,
                                icon: Calendar,
                                tooltip: "The distributed daily budget necessary to meet the total monthly advertising objective."
                            },
                            {
                                key: "est_clicks",
                                label: "Estimated Clicks",
                                value: Math.round(estClicks),
                                icon: MousePointerClick,
                                tooltip: "The total number of visitors expected based on the allocated budget and CPC."
                            },
                            {
                                key: "est_orders",
                                label: "Estimated Orders",
                                value: Math.round(estOrders),
                                icon: ShoppingBag,
                                tooltip: "The total number of purchases projected based on traffic volume and conversion rate."
                            },
                        ]}
                        currency={currency}
                        isCalculated={requiredAdSpend > 0}
                        emptyMessage="Required Ad Spend"
                        dynamicMessages={{
                            neutral: "The precise advertising investment required to reach your target revenue goals.",
                            positive: "The precise advertising investment required to reach your target revenue goals.",
                            negative: "The precise advertising investment required to reach your target revenue goals."
                        }}
                    />
                </div>
            </div>
        </FadeIn>
    );
}

