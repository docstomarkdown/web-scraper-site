"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { HelpCircle, User, Repeat, Calendar, DollarSign } from "lucide-react";
import { CurrencyCombobox } from "@/app/tools/_shared/components";
import { FadeIn, Counter, CalculatorInput, ResultFeedbackCard } from "@/app/tools/_shared/components";

export function CLVCalculator() {
    const [currency, setCurrency] = useState("USD");
    const [aov, setAov] = useState<number | "">(50);
    const [frequency, setFrequency] = useState<number | "">(4);
    const [lifespan, setLifespan] = useState<number | "">(3);

    const val = (v: number | "") => (v === "" ? 0 : v);
    const aovVal = val(aov);
    const freqVal = val(frequency);
    const lifespanVal = val(lifespan);

    const clv = aovVal * freqVal * lifespanVal;

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
                                            Customer Lifetime Value (LTV) Variables
                                        </CardTitle>
                                        <TooltipProvider delayDuration={100}>
                                            <Tooltip>
                                                <TooltipTrigger asChild>
                                                    <Button variant="ghost" size="icon" onClick={scrollToGuide} className="text-slate-400 hover:text-slate-900 h-8 w-8 rounded-full transition-colors">
                                                        <HelpCircle className="w-4 h-4" />
                                                    </Button>
                                                </TooltipTrigger>
                                                <TooltipContent side="top" className="text-xs bg-slate-900 text-white border-slate-800">
                                                    How to use this calculator
                                                </TooltipContent>
                                            </Tooltip>
                                        </TooltipProvider>
                                    </div>
                                    <CardDescription>Calculate the total expected revenue from a single customer.</CardDescription>
                                </div>
                                <div className="w-[180px]">
                                    <CurrencyCombobox value={currency} onValueChange={setCurrency} />
                                </div>
                            </CardHeader>
                            <CardContent className="space-y-6 pt-6">
                                <CalculatorInput
                                    label="Average Order Value"
                                    value={aov}
                                    onChange={setAov}
                                    placeholder="50"
                                    tooltip="Average spend per transaction."
                                />
                                <CalculatorInput
                                    label="Annual Purchase Frequency"
                                    value={frequency}
                                    onChange={setFrequency}
                                    placeholder="4"
                                    tooltip="Number of purchases a customer makes per year."
                                />
                                <CalculatorInput
                                    label="Customer Lifespan (Years)"
                                    value={lifespan}
                                    onChange={setLifespan}
                                    placeholder="3"
                                    tooltip="How many years a customer stays with your brand."
                                />
                            </CardContent>
                        </Card>
                    </FadeIn>
                </div>

                <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-8">
                    <FadeIn delay={0.4} direction="left" className="space-y-6">
                        <ResultFeedbackCard
                            title="Customer Lifetime Value (LTV)"
                            mainValue={<Counter value={clv} formatter={formatCurrency} />}
                            valueColor="text-white"
                            mainMetricLabel="Max Cost Per Acquisition (CPA) Tip"
                            mainMetricValue={formatCurrency(clv / 3)}
                            mainMetricColor="text-blue-200"
                            secondaryMetrics={[
                                { label: "Annual Value", value: formatCurrency(aovVal * freqVal), color: "text-slate-300" },
                                { label: "Lifespan", value: `${lifespanVal} Years`, color: "text-slate-400" }
                            ]}
                        />

                        <div className="grid grid-cols-2 gap-3">
                            <ResultCard title="Annual Rev" value={<Counter value={aovVal * freqVal} formatter={formatCurrency} />} icon={DollarSign} />
                            <ResultCard title="Freq" value={<Counter value={freqVal} />} icon={Repeat} />
                        </div>

                        <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm text-sm text-slate-600 leading-relaxed">
                            A customer spending <strong>{formatCurrency(aovVal)}</strong>, buying <strong>{freqVal}</strong> times a year for <strong>{lifespanVal}</strong> years, generates a total lifetime value of <strong>{formatCurrency(clv)}</strong>.
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
