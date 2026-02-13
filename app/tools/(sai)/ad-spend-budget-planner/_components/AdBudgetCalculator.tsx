"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { HelpCircle, Target, Wallet, Calendar, TrendingUp } from "lucide-react";
import { CurrencyCombobox } from "@/components/ui/currency-combobox";
import { FadeIn, Counter, CalculatorInput, ResultFeedbackCard } from "@/app/tools/_shared/components";

export function AdBudgetCalculator() {
    const [currency, setCurrency] = useState("USD");
    const [revenueGoal, setRevenueGoal] = useState<number | "">(100000);
    const [targetROAS, setTargetROAS] = useState<number | "">(4.0);

    const val = (v: number | "") => (v === "" ? 0 : v);
    const revenueGoalVal = val(revenueGoal);
    const roasVal = val(targetROAS);

    const requiredAdSpend = roasVal > 0 ? revenueGoalVal / roasVal : 0;
    const dailySpend = requiredAdSpend / 30;

    const formatCurrency = (val: number) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency', currency: currency, maximumFractionDigits: 0
        }).format(val);
    };

    const scrollToGuide = () => {
        const element = document.getElementById('how-to-use');
        if (element) element.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <FadeIn className="w-full max-w-6xl mx-auto py-8 px-4" duration={0.6}>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                <div className="lg:col-span-7">
                    <FadeIn delay={0.2} direction="right" className="h-full">
                        <Card className="border border-slate-200 shadow-sm bg-white">
                            <CardHeader className="pb-4 border-b border-slate-50 flex flex-row items-center justify-between space-y-0">
                                <div className="space-y-1">
                                    <div className="flex items-center gap-3">
                                        <CardTitle className="text-2xl font-bold text-blue-600">
                                            Growth Targets
                                        </CardTitle>
                                        <TooltipProvider delayDuration={100}>
                                            <Tooltip>
                                                <TooltipTrigger asChild>
                                                    <Button variant="ghost" size="icon" onClick={scrollToGuide} className="text-slate-400 hover:text-slate-900 h-8 w-8 rounded-full">
                                                        <HelpCircle className="w-4 h-4" />
                                                    </Button>
                                                </TooltipTrigger>
                                                <TooltipContent side="top" className="text-xs bg-slate-900 text-white border-slate-800">
                                                    How to use this planner
                                                </TooltipContent>
                                            </Tooltip>
                                        </TooltipProvider>
                                    </div>
                                    <CardDescription>Enter your revenue goals and performance targets.</CardDescription>
                                </div>
                                <div className="w-[180px]">
                                    <CurrencyCombobox value={currency} onValueChange={setCurrency} />
                                </div>
                            </CardHeader>
                            <CardContent className="space-y-6 pt-6">
                                <CalculatorInput
                                    label={`Monthly Revenue Goal (${currency})`}
                                    value={revenueGoal}
                                    onChange={setRevenueGoal}
                                    placeholder="100000"
                                    tooltip="The total revenue amount you want to achieve this month."
                                />
                                <CalculatorInput
                                    label="Target ROAS"
                                    value={targetROAS}
                                    onChange={setTargetROAS}
                                    placeholder="4.0"
                                    tooltip="Return on Ad Spend (e.g., 4.0 means $4 revenue for every $1 spent)."
                                />
                            </CardContent>
                        </Card>
                    </FadeIn>
                </div>

                <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-8">
                    <FadeIn delay={0.4} direction="left" className="space-y-6">
                        <ResultFeedbackCard
                            title="Recommended Monthly Spend"
                            mainValue={<Counter value={requiredAdSpend} formatter={formatCurrency} />}
                            valueColor="text-white"
                            mainMetricLabel="Monthly Target"
                            mainMetricValue={formatCurrency(revenueGoalVal)}
                            mainMetricColor="text-blue-200"
                            secondaryMetrics={[
                                { label: "Daily Budget", value: formatCurrency(dailySpend), color: "text-slate-300" },
                                { label: "Target ROAS", value: `${roasVal}x`, color: "text-slate-400" }
                            ]}
                        />

                        <div className="grid grid-cols-2 gap-3">
                            <ResultCard title="Daily Spend" value={<Counter value={dailySpend} formatter={formatCurrency} />} icon={Wallet} />
                            <ResultCard title="Revenue Goal" value={<Counter value={revenueGoalVal} formatter={formatCurrency} />} icon={Target} />
                        </div>

                        <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm text-sm text-slate-600 leading-relaxed">
                            To achieve a revenue goal of <strong>{formatCurrency(revenueGoalVal)}</strong> with a <strong>{roasVal}x ROAS</strong>, you should allocate <strong>{formatCurrency(requiredAdSpend)}</strong> for the month, or approximately <strong>{formatCurrency(dailySpend)}</strong> per day.
                        </div>
                    </FadeIn>
                </div>
            </div>
        </FadeIn>
    );
}

function ResultCard({ title, value, icon: Icon }: { title: string, value: React.ReactNode, icon: any }) {
    return (
        <div className="p-4 rounded-xl border bg-white border-slate-200 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-lg">
            <div className="flex items-center gap-1.5 mb-1">
                <Icon className="h-3 w-3 text-slate-400" />
                <p className="text-xs font-semibold text-slate-500">{title}</p>
            </div>
            <p className="text-xl font-bold text-slate-800">{value}</p>
        </div>
    );
}
