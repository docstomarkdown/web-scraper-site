"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { HelpCircle } from "lucide-react";
import { FadeIn, Counter, CalculatorInput, ResultFeedbackCard } from "@/app/tools/_shared/components";

export function ReturnRateCalculator() {
    const [unitsSold, setUnitsSold] = useState<number | "">("");
    const [unitsReturned, setUnitsReturned] = useState<number | "">("");

    const val = (v: number | "") => (v === "" ? 0 : v);

    const scrollToGuide = () => {
        const element = document.getElementById('how-to-use');
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const soldVal = val(unitsSold);
    const returnedVal = val(unitsReturned);

    const returnRate = soldVal > 0 ? (returnedVal / soldVal) * 100 : 0;

    // Feedback logic
    // General benchmarks: <5% Excellent, 5-10% Good, 10-20% Average (Fashion), >20% High
    let feedbackColor = "text-white";
    let feedbackLabel = "Calculate";
    let feedbackLabelColor = "text-slate-400";

    if (soldVal > 0) {
        if (returnRate < 5) {
            feedbackColor = "text-emerald-400";
            feedbackLabel = "Low (Excellent)";
            feedbackLabelColor = "text-emerald-400";
        } else if (returnRate < 10) {
            feedbackColor = "text-blue-400";
            feedbackLabel = "Good";
            feedbackLabelColor = "text-blue-400";
        } else if (returnRate < 20) {
            feedbackColor = "text-yellow-400";
            feedbackLabel = "Average";
            feedbackLabelColor = "text-yellow-400";
        } else {
            feedbackColor = "text-orange-400";
            feedbackLabel = "High";
            feedbackLabelColor = "text-orange-400";
        }
    }

    return (
        <FadeIn className="w-full max-w-6xl mx-auto py-8 px-4" duration={0.6}>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                
                {/* Inputs */}
                <div className="lg:col-span-7">
                    <FadeIn delay={0.2} direction="right" className="h-full">
                        <Card className="border border-slate-200 shadow-sm bg-white">
                            <CardHeader className="pb-4 border-b border-slate-50 flex flex-row items-center justify-between space-y-0">
                                <div className="space-y-1">
                                    <div className="flex items-center gap-3">
                                        <CardTitle className="text-2xl font-bold text-blue-600">
                                            Calculator Inputs
                                        </CardTitle>
                                        <TooltipProvider delayDuration={100}>
                                            <Tooltip>
                                                <TooltipTrigger asChild>
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        onClick={scrollToGuide}
                                                        className="text-slate-400 hover:text-slate-900 hover:bg-slate-100 h-8 w-8 rounded-full transition-colors"
                                                    >
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
                                    min={0}
                                    tooltip="The total number of products sold / shipped in the given period."
                                />
                                <CalculatorInput
                                    label="Total Units Returned"
                                    value={unitsReturned}
                                    onChange={setUnitsReturned}
                                    placeholder="50"
                                    min={0}
                                    max={soldVal} // Can't return more than sold
                                    tooltip="The number of products sent back by customers."
                                />
                            </CardContent>
                        </Card>
                    </FadeIn>
                </div>

                {/* Results */}
                <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-8">
                    <FadeIn delay={0.4} direction="left">
                        <ResultFeedbackCard
                            title="Product Return Rate"
                            mainValue={
                                <div className="flex items-baseline gap-1">
                                    <Counter
                                        value={returnRate}
                                        formatter={(val) => val.toFixed(2)}
                                        className={`text-5xl font-bold tracking-tight ${feedbackColor}`}
                                    />
                                    <span className={`text-2xl font-bold ${feedbackColor}`}>%</span>
                                </div>
                            }
                            valueColor={feedbackColor}
                            mainMetricLabel="Severity"
                            mainMetricValue={feedbackLabel}
                            mainMetricColor={feedbackLabelColor}
                        />
                    </FadeIn>
                </div>
            </div>
        </FadeIn>
    );
}
