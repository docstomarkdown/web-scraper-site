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
    const [aov, setAov] = useState<number | "">(50);
    const [frequency, setFrequency] = useState<number | "">(4);
    const [lifespan, setLifespan] = useState<number | "">(3);

    // Profit & Acquisition
    const [grossMargin, setGrossMargin] = useState<number | "">(40);
    const [cac, setCac] = useState<number | "">(30);

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

    // Determine Health Status
    let status = "Calculate";
    let statusColor = "text-slate-400";
    let statusBg = "bg-slate-100";

    if (cacVal > 0 && clvProfit > 0) {
        if (ltvCacRatio >= 5) { status = "Elite"; statusColor = "text-emerald-600"; statusBg = "bg-emerald-100"; }
        else if (ltvCacRatio >= 3) { status = "Healthy"; statusColor = "text-blue-600"; statusBg = "bg-blue-100"; }
        else if (ltvCacRatio >= 1) { status = "Caution"; statusColor = "text-amber-600"; statusBg = "bg-amber-100"; }
        else { status = "At Risk"; statusColor = "text-red-600"; statusBg = "bg-red-100"; }
    }

    return (
        <FadeIn className="w-full max-w-6xl mx-auto py-8 px-4" duration={0.6}>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

                {/* Left Column: Inputs */}
                <div className="lg:col-span-7 space-y-6">
                    <Card className="border border-slate-200 shadow-sm bg-white overflow-hidden">
                        <CalculatorCardHeader

                            description="Define your customer value and costs."

                            onReset={handleReset}

                            currency={currency}

                            onCurrencyChange={setCurrency}

                        />
                        <CardContent className="space-y-6 pt-6">

                            {/* Group 1: Value Drivers */}
                            <div className="space-y-4">
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

                            <div className="h-px w-full bg-slate-100" />

                            {/* Group 2: Unit Economics */}
                            <div className="space-y-4">
                                <div className="flex items-center gap-2 mb-2">
                                    <div className="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center text-emerald-600">
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

                    {/* Logic Highlight */}
                    <FadeIn delay={0.2}>
                        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 flex gap-4">
                            <div className="w-12 h-12 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-blue-600 shrink-0 shadow-sm">
                                <ShieldCheck className="w-6 h-6" />
                            </div>
                            <div>
                                <h4 className="text-base font-bold text-slate-800 mb-1 leading-tight">Economic Summary</h4>
                                <p className="text-[15px] text-slate-600 leading-relaxed max-w-lg font-medium">
                                    A customer generates <span className="font-bold text-slate-900">{formatCurrency(clvRevenue)}</span> revenue over their lifespan.
                                    After costs, you keep <span className="font-bold text-emerald-600">{formatCurrency(clvProfit)}</span> in lifetime profit.
                                    {cacVal > 0 && (
                                        <> This means your LTV is <span className="font-bold text-blue-600">{ltvCacRatio.toFixed(1)}x</span> your acquisition cost.</>
                                    )}
                                </p>
                            </div>
                        </div>
                    </FadeIn>
                </div>

                {/* Right Column: Results */}
                <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-8">
                    <ResultFeedbackCard
                        title="Lifetime Profit (LTV)"
                        mainValue={
                            <Counter value={clvProfit} formatter={formatCurrency} />
                        }
                    />

                    {/* Breakdown Card */}
                    {clvRevenue > 0 ? (
                        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden border-l-4 border-l-emerald-500">
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

                                <div className="flex justify-between items-center px-5 py-4 bg-emerald-50/30">
                                    <span className="text-sm font-bold text-slate-900">Net Lifetime Profit</span>
                                    <span className={cn("text-base font-bold text-emerald-600")}>
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

                    {/* Insight Card: Ratio Meter */}
                    <Card className="border border-slate-200 shadow-sm p-6 space-y-6 bg-white">
                        <div className="flex items-center justify-between">
                            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                                <Percent className="w-5 h-5 text-blue-600" />
                                Growth Efficiency
                            </h3>
                            {clvProfit > 0 && cacVal > 0 && (
                                <span className={cn("text-xs font-bold uppercase tracking-widest px-2 py-0.5 rounded-full", statusBg, statusColor)}>
                                    {status}
                                </span>
                            )}
                        </div>

                        <div className="space-y-4">
                            <InsightItem
                                label="LTV / CAC Ratio"
                                value={`${ltvCacRatio.toFixed(2)}x`}
                                description="Ratio of customer profit to acquisition cost."
                                icon={TrendingUp}
                                color={ltvCacRatio >= 3 ? "text-emerald-600" : ltvCacRatio >= 1 ? "text-amber-600" : "text-red-500"}
                                bg={ltvCacRatio >= 3 ? "bg-emerald-50" : ltvCacRatio >= 1 ? "bg-amber-50" : "bg-red-50"}
                            />
                            <InsightItem
                                label="Target CPA"
                                value={formatCurrency(clvProfit / 3)}
                                description="Ideal max spend to acquire 1 customer."
                                icon={DollarSign}
                                color="text-blue-600"
                                bg="bg-blue-50"
                            />
                        </div>

                        <div className="h-px w-full bg-slate-100" />

                        <div className="pt-2">
                            <div className="flex items-center justify-between mb-3">
                                <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Efficiency Meter</p>
                                <span className="text-[10px] font-bold text-slate-400 bg-slate-50 px-2 py-0.5 rounded border border-slate-100">Ratio goal: 3:1+</span>
                            </div>

                            <div className="relative pt-2 pb-1">
                                {/* Visual Scale */}
                                <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden flex">
                                    <div className="h-full bg-red-400" style={{ width: '20%' }} /> {/* < 1x */}
                                    <div className="h-full bg-amber-400" style={{ width: '40%' }} /> {/* 1x - 3x */}
                                    <div className="h-full bg-emerald-400" style={{ width: '40%' }} /> {/* 3x+ */}
                                </div>

                                {/* Dynamic Pointer */}
                                {ltvCacRatio > 0 && (
                                    <motion.div
                                        initial={{ left: 0 }}
                                        animate={{
                                            // Scale: 0 to 5 for point. Caps at 100% (5.0+)
                                            left: `${Math.min((ltvCacRatio / 5) * 100, 100)}%`
                                        }}
                                        className="absolute top-0 -mt-0.5 w-4 h-4 bg-white border-2 border-slate-800 rounded-full shadow-md z-10 -ml-2 transition-all"
                                    />
                                )}
                            </div>
                            <div className="flex justify-between mt-2 text-[11px] font-bold text-slate-500 italic px-1">
                                <span>Risk</span>
                                <span>Breakeven</span>
                                <span>Healthy</span>
                                <span>Elite</span>
                            </div>
                        </div>
                    </Card>
                </div>
            </div>
        </FadeIn>
    );
}

function InsightItem({ label, value, description, icon: Icon, color, bg }: { label: string, value: string, description: string, icon: any, color: string, bg: string }) {
    return (
        <div className="flex gap-4">
            <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center shrink-0", bg, color)}>
                <Icon className="w-5 h-5" />
            </div>
            <div>
                <div className="flex items-baseline gap-2 mb-1">
                    <h4 className="text-sm font-bold text-slate-900 leading-tight">{label}</h4>
                    <span className={cn("text-sm font-bold", color)}>{value}</span>
                </div>
                <p className="text-[13px] text-slate-600 font-medium leading-relaxed">{description}</p>
            </div>
        </div>
    )
}
