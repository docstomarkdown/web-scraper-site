"use client";
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { User, Repeat, Calendar, DollarSign, Percent, TrendingUp, ShieldCheck } from "lucide-react"
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { CalculatorCardHeader, CalculatorInput, Counter, CurrencyCombobox, FadeIn, ResultFeedbackCard } from "@/app/tools/_shared/components"
export function CLVCalculator() {
    const [currency, setCurrency] = useState("USD");
    // Core Value Drivers
    const [aov, setAov] = useState<number | "">("")
    const [frequency, setFrequency] = useState<number | "">("")
    const [lifespan, setLifespan] = useState<number | "">("")
    // Profit & Acquisition
    const [grossMargin, setGrossMargin] = useState<number | "">("")
    const [cac, setCac] = useState<number | "">("")
    const [clvRevenue, setClvRevenue] = useState(0);
    const [clvProfit, setClvProfit] = useState(0);
    const [ltvCacRatio, setLtvCacRatio] = useState(0);
    const [annualProfit, setAnnualProfit] = useState(0);
    const val = (v: number | "") => (v === "" ? 0 : v);
    const aovVal = val(aov);
    const freqVal = val(frequency);
    const lifespanVal = val(lifespan);
    const marginVal = val(grossMargin);
    const cacVal = val(cac);
    useEffect(() => {
        const revenue = aovVal * freqVal * lifespanVal;
        const grossProfit = revenue * (marginVal / 100);
        setClvRevenue(revenue);
        setClvProfit(grossProfit - cacVal);
        setAnnualProfit(grossProfit / (lifespanVal || 1));
        if (cacVal > 0) {
            setLtvCacRatio(grossProfit / cacVal);
        } else {
            setLtvCacRatio(0);
        }
    }, [aovVal, freqVal, lifespanVal, marginVal, cacVal]);
    const handleReset = () => {
        setAov("");
        setFrequency("");
        setLifespan("");
        setGrossMargin("");
        setCac("");
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
                <div className="lg:col-span-7 space-y-3">
                    <Card className="border border-slate-200 shadow-sm bg-white overflow-hidden">
                        <CalculatorCardHeader
                            description="Define your customer value and costs."
                            onReset={handleReset}
                            currency={currency}
                            onCurrencyChange={setCurrency}
                        />
                        <CardContent className="space-y-3 pt-6">
                            {/* Group 1: Value Drivers */}
                            <div className="space-y-3">
                                <div className="flex items-center gap-2 mb-2">
                                    <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600">
                                        <User className="w-4 h-4" />
                                    </div>
                                    <h3 className="text-sm font-black text-slate-600 uppercase tracking-widest">Customer Behavior</h3>
                                </div>
                                <CalculatorInput
                                    label={`Avg. Order Value (${currency})`}
                                    value={aov}
                                    onChange={setAov}
                                    placeholder="50"
                                    tooltip="Average spend per transaction."
                                />
                                <CalculatorInput
                                    label="Annual Frequency"
                                    value={frequency}
                                    onChange={setFrequency}
                                    placeholder="4"
                                    tooltip="How many times they buy per year."
                                />
                                <CalculatorInput
                                    label="Lifespan (Years)"
                                    value={lifespan}
                                    onChange={setLifespan}
                                    placeholder="3"
                                    tooltip="How many years they stay active."
                                />
                            </div>
                            {/* Group 2: Unit Economics */}
                            <div className="space-y-3">
                                <div className="flex items-center gap-2 mb-2">
                                    <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600">
                                        <TrendingUp className="w-4 h-4" />
                                    </div>
                                    <h3 className="text-sm font-black text-slate-600 uppercase tracking-widest">Unit Economics</h3>
                                </div>
                                <CalculatorInput
                                    label="Gross Margin (%)"
                                    value={grossMargin}
                                    onChange={setGrossMargin}
                                    placeholder="40"
                                    tooltip="Profit margin before customer acquisition costs."
                                />
                                <CalculatorInput
                                    label={`CAC (${currency})`}
                                    value={cac}
                                    onChange={setCac}
                                    placeholder="30"
                                    tooltip="Customer Acquisition Cost (Ad spend per new customer)."
                                />
                            </div>
                        </CardContent>
                    </Card>
                </div>
                {/* Right Column: Results */}
                <div className="lg:col-span-5 space-y-3 lg:sticky lg:top-8">
                    <ResultFeedbackCard
                        title="Lifetime Profit (LTV)"
                        mainValue={
                            <Counter value={clvProfit} formatter={formatCurrency} />
                        }
                        secondaryMetrics={clvProfit !== 0 ? [
                            {
                                label: "LTV / CAC Ratio",
                                value: `${ltvCacRatio.toFixed(2)}x`,
                                color: "text-blue-400",
                                tooltip: "Ratio of customer profit to acquisition cost."
                            },
                            {
                                label: "Target CPA",
                                value: formatCurrency(clvProfit / 3),
                                color: "text-blue-400",
                                tooltip: "Ideal max spend to acquire 1 customer (based on a 3:1 ratio)."
                            }
                        ] : []}
                    />
                    {/* Breakdown Card */}
                    {clvRevenue > 0 ? (
                        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden border-l-4 border-l-blue-500">
                            <div className="px-5 py-3.5 border-b border-slate-100">
                                <p className="text-xs font-bold text-slate-600 uppercase tracking-wider">Lifetime Value Breakdown</p>
                            </div>
                            <div className="divide-y divide-slate-100">
                                <div className="flex justify-between items-center px-5 py-3.5">
                                    <span className="text-sm text-slate-600">Total Lifetime Revenue</span>
                                    <span className="text-sm font-semibold text-slate-800">{formatCurrency(clvRevenue)}</span>
                                </div>
                                <div className="flex justify-between items-center px-5 py-3.5">
                                    <span className="text-sm text-slate-600">Gross Profit (Margin: {marginVal}%)</span>
                                    <span className="text-sm font-semibold text-slate-800">{formatCurrency(clvRevenue * (marginVal / 100))}</span>
                                </div>
                                <div className="flex justify-between items-center px-5 py-3.5">
                                    <span className="text-sm text-slate-600">Acquisition Cost (CAC)</span>
                                    <span className="text-sm font-semibold text-red-600">-{formatCurrency(cacVal)}</span>
                                </div>
                                {annualProfit > 0 && (
                                    <div className="flex justify-between items-center px-5 py-3.5 bg-slate-50/50">
                                        <span className="text-sm font-medium text-slate-500">Annual Profit Contribution</span>
                                        <span className="text-sm font-bold text-slate-700">{formatCurrency(annualProfit)}</span>
                                    </div>
                                )}
                                <div className="flex justify-between items-center px-5 py-4 bg-blue-50/30">
                                    <span className="text-sm font-bold text-slate-900">Net Lifetime Profit</span>
                                    <span className={cn("text-base font-bold text-blue-600")}>
                                        {formatCurrency(clvProfit)}
                                    </span>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 text-center">
                            <p className="text-sm text-slate-400">Enter metrics to calculate LTV.</p>
                        </div>
                    )}
                </div>
            </div>
        </FadeIn>
    );
}