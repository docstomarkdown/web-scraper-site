"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { HelpCircle, Target, TrendingUp, DollarSign } from "lucide-react";
import { FadeIn, Counter, CalculatorInput, ResultFeedbackCard } from "@/app/tools/_shared/components";
import { Tooltip, TooltipProvider, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";

export function ACoSCalculator() {
    const [adSpend, setAdSpend] = useState<number | "">(200);
    const [adRevenue, setAdRevenue] = useState<number | "">(800);

    const val = (v: number | "") => (v === "" ? 0 : v);
    const spend = val(adSpend);
    const revenue = val(adRevenue);

    const acos = revenue > 0 ? (spend / revenue) * 100 : 0;

    const formatCurrency = (v: number) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            maximumFractionDigits: 0
        }).format(v);
    };

    const scrollToGuide = () => {
        const element = document.getElementById('how-to-use');
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    let status = "Waiting";
    let statusColor = "text-slate-400";
    if (revenue > 0) {
        if (acos < 15) { status = "Excellent"; statusColor = "text-emerald-400"; }
        else if (acos < 30) { status = "Healthy"; statusColor = "text-blue-400"; }
        else { status = "High"; statusColor = "text-orange-400"; }
    }

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
                                            Campaign Metrics
                                        </CardTitle>
                                        <TooltipProvider delayDuration={100}>
                                            <Tooltip>
                                                <TooltipTrigger asChild>
                                                    <Button variant="ghost" size="icon" onClick={scrollToGuide} className="text-slate-400 hover:text-slate-900 h-8 w-8 rounded-full">
                                                        <HelpCircle className="w-4 h-4" />
                                                    </Button>
                                                </TooltipTrigger>
                                                <TooltipContent side="top" className="text-xs bg-slate-900 text-white border-slate-800">
                                                    How to use this calculator
                                                </TooltipContent>
                                            </Tooltip>
                                        </TooltipProvider>
                                    </div>
                                    <CardDescription>Enter your ad spend and resulting sales.</CardDescription>
                                </div>
                            </CardHeader>
                            <CardContent className="space-y-6 pt-6">
                                <CalculatorInput
                                    label="Total Ad Spend ($)"
                                    value={adSpend}
                                    onChange={setAdSpend}
                                    placeholder="200"
                                    tooltip="Total amount spent on advertising."
                                />
                                <CalculatorInput
                                    label="Ad Revenue ($)"
                                    value={adRevenue}
                                    onChange={setAdRevenue}
                                    placeholder="800"
                                    tooltip="Total sales generated from these ads."
                                />
                            </CardContent>
                        </Card>
                    </FadeIn>
                </div>

                <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-8">
                    <FadeIn delay={0.4} direction="left" className="space-y-6">
                        <ResultFeedbackCard
                            title="ACoS Percentage"
                            mainValue={<div className="flex items-baseline gap-1">
                                <Counter value={acos} formatter={(v) => v.toFixed(2)} />
                                <span className="text-2xl font-bold">%</span>
                            </div>}
                            valueColor={statusColor}
                            mainMetricLabel="Status"
                            mainMetricValue={status}
                            mainMetricColor={statusColor}
                            secondaryMetrics={[
                                {
                                    label: "Return on Spend",
                                    value: <>{(revenue > 0 && spend > 0 ? (revenue / spend).toFixed(1) : 0)}x</>,
                                    color: "text-slate-300"
                                }
                            ]}
                        />

                        <div className="grid grid-cols-2 gap-3">
                            <ResultCard
                                title="Ad Spend"
                                value={<Counter value={spend} formatter={formatCurrency} />}
                                icon={DollarSign}
                            />
                            <ResultCard
                                title="Ad Revenue"
                                value={<Counter value={revenue} formatter={formatCurrency} />}
                                icon={TrendingUp}
                            />
                        </div>

                        <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm text-sm text-slate-600 leading-relaxed">
                            With a spend of <strong>{formatCurrency(spend)}</strong> generating <strong>{formatCurrency(revenue)}</strong> in sales, your ACoS is <strong>{acos.toFixed(2)}%</strong>. This means you spend {acos.toFixed(0)} cents to earn every $1.
                        </div>
                    </FadeIn>
                </div>
            </div>
        </FadeIn>
    );
}

function ResultCard({ title, value, icon: Icon }: { title: string, value: React.ReactNode, icon: any }) {
    return (
        <div className="p-4 rounded-xl border bg-white border-slate-200 shadow-sm transition-all duration-200">
            <div className="flex items-center gap-1.5 mb-1">
                <Icon className="h-3 w-3 text-slate-400" />
                <p className="text-xs font-semibold text-slate-500">{title}</p>
            </div>
            <p className="text-xl font-bold text-slate-800">{value}</p>
        </div>
    );
}
