"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { HelpCircle, Package, RotateCcw, AlertCircle, CheckCircle2 } from "lucide-react";
import { FadeIn, Counter, CalculatorInput, ResultFeedbackCard } from "@/app/tools/_shared/components";

export function ReturnRateCalculator() {
    const [unitsSold, setUnitsSold] = useState<number | "">(1000);
    const [unitsReturned, setUnitsReturned] = useState<number | "">(50);

    const val = (v: number | "") => (v === "" ? 0 : v);
    const sold = val(unitsSold);
    const returned = val(unitsReturned);

    const returnRate = sold > 0 ? (returned / sold) * 100 : 0;

    let status = "Calculate";
    let statusColor = "text-slate-400";
    if (sold > 0) {
        if (returnRate < 5) { status = "Excellent"; statusColor = "text-emerald-400"; }
        else if (returnRate < 15) { status = "Healthy"; statusColor = "text-blue-400"; }
        else { status = "High Risk"; statusColor = "text-orange-400"; }
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
                                            Return Metrics
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
                                    <CardDescription>Enter your sales and return data.</CardDescription>
                                </div>
                            </CardHeader>
                            <CardContent className="space-y-6 pt-6">
                                <CalculatorInput
                                    label="Total Units Sold"
                                    value={unitsSold}
                                    onChange={setUnitsSold}
                                    placeholder="1000"
                                    tooltip="Total items shipped in the period."
                                />
                                <CalculatorInput
                                    label="Total Units Returned"
                                    value={unitsReturned}
                                    onChange={setUnitsReturned}
                                    placeholder="50"
                                    tooltip="Total items sent back by customers."
                                />
                            </CardContent>
                        </Card>
                    </FadeIn>
                </div>

                <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-8">
                    <FadeIn delay={0.4} direction="left" className="space-y-6">
                        <ResultFeedbackCard
                            title="Return Rate"
                            mainValue={<div className="flex items-baseline gap-1">
                                <Counter value={returnRate} formatter={(v) => v.toFixed(2)} />
                                <span className="text-2xl font-bold">%</span>
                            </div>}
                            valueColor={statusColor}
                            mainMetricLabel="Status"
                            mainMetricValue={status}
                            mainMetricColor={statusColor}
                            secondaryMetrics={[
                                { label: "Sold", value: sold.toString(), color: "text-slate-300" },
                                { label: "Returned", value: returned.toString(), color: "text-slate-400" }
                            ]}
                        />

                        <div className="grid grid-cols-2 gap-3">
                            <ResultCard title="Units Sold" value={<Counter value={sold} />} icon={Package} />
                            <ResultCard title="Returns" value={<Counter value={returned} />} icon={RotateCcw} />
                        </div>

                        <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm text-sm text-slate-600 leading-relaxed">
                            Your return rate is <strong>{returnRate.toFixed(2)}%</strong>. {returnRate > 15
                                ? "This is considered high and may indicate quality or description issues."
                                : "This is within a healthy range for most e-commerce categories."}
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
