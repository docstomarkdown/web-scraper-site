"use client";

import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { HelpCircle, RefreshCw, Target, MousePointer2, ShoppingCart, TrendingUp, DollarSign } from "lucide-react";
import { CurrencyCombobox } from "@/app/tools/_shared/components";
import { FadeIn, Counter, CalculatorInput, ResultFeedbackCard } from "@/app/tools/_shared/components";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

export function AdBudgetCalculator() {
    const [currency, setCurrency] = useState("USD");
    const [revenueGoal, setRevenueGoal] = useState<number | "">(100000);
    const [targetROAS, setTargetROAS] = useState<number | "">(4.0);

    // New Traffic Inputs
    const [avgCPC, setAvgCPC] = useState<number | "">(1.50);
    const [conversionRate, setConversionRate] = useState<number | "">(3.5);

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

                {/* Left Column: Inputs */}
                <div className="lg:col-span-7 space-y-6">
                    <Card className="border border-slate-200 shadow-sm bg-white overflow-hidden">
                        <CardHeader className="pb-4 border-b border-slate-50 flex flex-row items-center justify-between space-y-0">
                            <div className="space-y-1">
                                <div className="flex items-center gap-2">
                                    <CardTitle className="text-xl font-bold text-slate-800">
                                        Budget Planner
                                    </CardTitle>
                                    <button onClick={scrollToGuide} className="text-slate-400 hover:text-blue-600 transition-colors">
                                        <HelpCircle className="w-4 h-4" />
                                    </button>
                                </div>
                                <p className="text-sm text-slate-500 font-medium tracking-tight">Define revenue targets and traffic costs.</p>
                            </div>
                            <div className="flex items-center gap-2">
                                <CurrencyCombobox value={currency} onValueChange={setCurrency} />
                                <button
                                    onClick={handleReset}
                                    className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
                                    title="Reset All"
                                >
                                    <RefreshCw className="w-4 h-4" />
                                </button>
                            </div>
                        </CardHeader>
                        <CardContent className="space-y-6 pt-6">
                            {/* Group 1: Goals */}
                            <div className="space-y-4">
                                <div className="flex items-center gap-2 mb-2">
                                    <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600">
                                        <Target className="w-4 h-4" />
                                    </div>
                                    <h3 className="text-sm font-black text-slate-600 uppercase tracking-widest">Growth Goals</h3>
                                </div>
                                <CalculatorInput
                                    label={`Monthly Revenue Goal (${currency})`}
                                    value={revenueGoal}
                                    onChange={setRevenueGoal}
                                    placeholder="100000"
                                    tooltip="The total revenue amount you want to achieve this month."
                                />
                                <CalculatorInput
                                    label="Target AD ROAS"
                                    value={targetROAS}
                                    onChange={setTargetROAS}
                                    placeholder="4.0"
                                    tooltip="Return on Ad Spend (e.g., 4.0 means $4 revenue for every $1 spent)."
                                />
                            </div>

                            <Separator />

                            {/* Group 2: Traffic Assumptions */}
                            <div className="space-y-4">
                                <div className="flex items-center gap-2 mb-2">
                                    <div className="w-8 h-8 rounded-lg bg-purple-50 flex items-center justify-center text-purple-600">
                                        <MousePointer2 className="w-4 h-4" />
                                    </div>
                                    <h3 className="text-sm font-black text-slate-600 uppercase tracking-widest">Traffic Assumptions</h3>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <CalculatorInput
                                        label={`Avg. CPC (${currency})`}
                                        value={avgCPC}
                                        onChange={setAvgCPC}
                                        placeholder="1.50"
                                        tooltip="Average Cost Per Click."
                                    />
                                    <CalculatorInput
                                        label="Conversion Rate (%)"
                                        value={conversionRate}
                                        onChange={setConversionRate}
                                        placeholder="3.5"
                                        tooltip="percentage of clicks that become orders."
                                    />
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Logic Highlight */}
                    <FadeIn delay={0.2}>
                        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 flex gap-4">
                            <div className="w-12 h-12 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-blue-600 shrink-0 shadow-sm">
                                <DollarSign className="w-6 h-6" />
                            </div>
                            <div>
                                <h4 className="text-base font-bold text-slate-800 mb-1 leading-tight">Investment Impact</h4>
                                <p className="text-[15px] text-slate-600 leading-relaxed max-w-lg font-medium">
                                    To hit <span className="font-bold text-slate-900">{formatCurrency(goal)}</span> revenue, you need to invest <span className="font-bold text-blue-600">{formatCurrency(requiredAdSpend)}</span>.
                                    {cpc > 0 && (
                                        <> This budget buys approx. <span className="font-bold text-slate-900">{Math.round(estClicks).toLocaleString()} clicks</span>.</>
                                    )}
                                </p>
                            </div>
                        </div>
                    </FadeIn>
                </div>

                {/* Right Column: Results */}
                <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-8">
                    <ResultFeedbackCard
                        title="Monthly Ad Budget"
                        mainValue={
                            <Counter value={requiredAdSpend} formatter={formatCurrency} />
                        }
                        secondaryMetrics={[
                            { label: "Daily Spend", value: formatCurrency(dailySpend), color: "text-slate-300" },
                            { label: "Est. Orders", value: Math.round(estOrders).toLocaleString(), color: "text-emerald-400" }
                        ]}
                    />

                    {/* Insight Card: Traffic Funnel */}
                    <Card className="border border-slate-200 shadow-sm p-6 space-y-6 bg-white">
                        <div className="flex items-center justify-between">
                            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                                <TrendingUp className="w-5 h-5 text-blue-600" />
                                Traffic Potential
                            </h3>
                            {requiredAdSpend > 0 && (
                                <span className={cn("text-xs font-bold uppercase tracking-widest px-2 py-0.5 rounded-full bg-blue-100 text-blue-600")}>
                                    Forecast
                                </span>
                            )}
                        </div>

                        <div className="space-y-0 relative">
                            {/* Visual Funnel Step 1: Spend */}
                            <FunnelStep
                                label="Total Spend"
                                value={formatCurrency(requiredAdSpend)}
                                icon={DollarSign}
                                color="bg-blue-50 text-blue-600"
                                isLast={false}
                            />

                            {/* Connector Line */}
                            <div className="h-6 w-0.5 bg-slate-200 ml-6 -my-1" />

                            {/* Visual Funnel Step 2: Clicks */}
                            <FunnelStep
                                label="Traffic (Clicks)"
                                value={Math.round(estClicks).toLocaleString()}
                                subtext={`@ ${formatCurrency(cpc)} CPC`}
                                icon={MousePointer2}
                                color="bg-purple-50 text-purple-600"
                                isLast={false}
                            />

                            {/* Connector Line */}
                            <div className="h-6 w-0.5 bg-slate-200 ml-6 -my-1" />

                            {/* Visual Funnel Step 3: Orders */}
                            <FunnelStep
                                label="Sales (Orders)"
                                value={Math.round(estOrders).toLocaleString()}
                                subtext={`@ ${cvr}% Conv. Rate`}
                                icon={ShoppingCart}
                                color="bg-emerald-50 text-emerald-600"
                                isLast={true}
                            />
                        </div>

                        <div className="bg-slate-50 rounded-xl p-4 border border-slate-100 mt-4">
                            <p className="text-xs text-slate-500 font-medium leading-relaxed text-center">
                                *Estimates based on your CPC and Conversion Rate. Actual results may vary based on market conditions.
                            </p>
                        </div>
                    </Card>
                </div>
            </div>
        </FadeIn>
    );
}

const Separator = () => <div className="h-px w-full bg-slate-100" />

function FunnelStep({ label, value, subtext, icon: Icon, color, isLast }: { label: string, value: string, subtext?: string, icon: any, color: string, isLast: boolean }) {
    return (
        <div className="flex items-center gap-4 py-2 relative z-10 bg-white">
            <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center shrink-0 shadow-sm border border-slate-100", color)}>
                <Icon className="w-5 h-5" />
            </div>
            <div>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-0.5">{label}</p>
                <div className="flex items-baseline gap-2">
                    <h4 className="text-lg font-bold text-slate-900 leading-tight">{value}</h4>
                    {subtext && <span className="text-xs font-medium text-slate-500">({subtext})</span>}
                </div>
            </div>
        </div>
    )
}
