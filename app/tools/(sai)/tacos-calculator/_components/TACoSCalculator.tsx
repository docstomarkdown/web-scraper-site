"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { HelpCircle, Target, TrendingUp, DollarSign, LineChart } from "lucide-react";
import { CurrencyCombobox } from "@/components/ui/currency-combobox";
import { FadeIn, Counter, CalculatorInput, ResultFeedbackCard } from "@/app/tools/_shared/components";
import { TrendingDown } from "lucide-react";

export function TACoSCalculator() {
    const [currency, setCurrency] = useState("USD");
    const [totalAdSpend, setTotalAdSpend] = useState<number | "">(5000);
    const [totalRevenue, setTotalRevenue] = useState<number | "">(50000);

    const val = (v: number | "") => (v === "" ? 0 : v);
    const spend = val(totalAdSpend);
    const revenue = val(totalRevenue);

    const tacos = revenue > 0 ? (spend / revenue) * 100 : 0;

    const formatCurrency = (val: number) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency', currency: currency, maximumFractionDigits: 0
        }).format(val);
    };

    let status = "Healthy";
    let statusColor = "text-blue-400";
    if (revenue > 0) {
        if (tacos < 10) { status = "Excellent"; statusColor = "text-emerald-400"; }
        else if (tacos < 20) { status = "Healthy"; statusColor = "text-blue-400"; }
        else { status = "High"; statusColor = "text-orange-400"; }
    }

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
                                            Total Business Metrics
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
                                    <CardDescription>Enter total ad spend and total revenue (Paid + Organic).</CardDescription>
                                </div>
                                <div className="w-[180px]">
                                    <CurrencyCombobox value={currency} onValueChange={setCurrency} />
                                </div>
                            </CardHeader>
                            <CardContent className="space-y-6 pt-6">
                                <CalculatorInput
                                    label={`Total Ad Spend (${currency})`}
                                    value={totalAdSpend}
                                    onChange={setTotalAdSpend}
                                    placeholder="5000"
                                    tooltip="Total spend on all ad platforms."
                                />
                                <CalculatorInput
                                    label={`Total Revenue (${currency})`}
                                    value={totalRevenue}
                                    onChange={setTotalRevenue}
                                    placeholder="50000"
                                    tooltip="Total sales from both organic and paid traffic."
                                />
                            </CardContent>
                        </Card>
                    </FadeIn>
                </div>

                <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-8">
                    <FadeIn delay={0.4} direction="left" className="space-y-6">
                        <ResultFeedbackCard
                            title="Total ACoS (TACoS)"
                            mainValue={<div className="flex items-baseline gap-1">
                                <Counter value={tacos} formatter={(v) => v.toFixed(2)} />
                                <span className="text-2xl font-bold">%</span>
                            </div>}
                            valueColor={statusColor}
                            mainMetricLabel="Status"
                            mainMetricValue={status}
                            mainMetricColor={statusColor}
                            secondaryMetrics={[
                                { label: "Spend", value: formatCurrency(spend), color: "text-slate-300" },
                                { label: "Revenue", value: formatCurrency(revenue), color: "text-slate-400" }
                            ]}
                        />

                        <div className="grid grid-cols-2 gap-3">
                            <ResultCard title="Ad Spend" value={<Counter value={spend} formatter={formatCurrency} />} icon={DollarSign} />
                            <ResultCard title="Total Rev" value={<Counter value={revenue} formatter={formatCurrency} />} icon={LineChart} />
                        </div>

                        <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm text-sm text-slate-600 leading-relaxed">
                            Your TACoS is <strong>{tacos.toFixed(2)}%</strong>. This means that for every $1 you earn, you spend {tacos.toFixed(0)} cents on advertising.
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
                {Icon && <Icon className="h-3 w-3 text-slate-400" />}
                <p className="text-xs font-semibold text-slate-500">{title}</p>
            </div>
            <p className="text-xl font-bold text-slate-800">{value}</p>
        </div>
    );
}
