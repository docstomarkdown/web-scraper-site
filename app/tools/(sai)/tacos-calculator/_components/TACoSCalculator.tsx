"use client";

import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { HelpCircle, RefreshCw, TrendingUp, DollarSign, Percent, BarChart3, PieChart } from "lucide-react";
import { CurrencyCombobox } from "@/app/tools/_shared/components";
import { FadeIn, Counter, CalculatorInput, ResultFeedbackCard } from "@/app/tools/_shared/components";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

export function TACoSCalculator() {
    const [currency, setCurrency] = useState("USD");
    const [totalAdSpend, setTotalAdSpend] = useState<number | "">(5000);
    const [totalRevenue, setTotalRevenue] = useState<number | "">(50000);
    const [grossMargin, setGrossMargin] = useState<number | "">("");

    const [tacos, setTacos] = useState<number>(0);
    const [netMargin, setNetMargin] = useState<number>(0);
    const [netProfit, setNetProfit] = useState<number>(0);

    const val = (v: number | "") => (v === "" ? 0 : v);
    const spend = val(totalAdSpend);
    const revenue = val(totalRevenue);
    const margin = val(grossMargin);

    useEffect(() => {
        if (revenue > 0) {
            const calculatedTacos = (spend / revenue) * 100;
            setTacos(calculatedTacos);

            if (margin > 0) {
                const calculatedNetMargin = margin - calculatedTacos;
                setNetMargin(calculatedNetMargin);

                // Net Profit $ = Revenue * (Net Margin %)
                setNetProfit(revenue * (calculatedNetMargin / 100));
            } else {
                setNetMargin(0);
                setNetProfit(0);
            }
        } else {
            setTacos(0);
            setNetMargin(0);
            setNetProfit(0);
        }
    }, [spend, revenue, margin]);

    const handleReset = () => {
        setTotalAdSpend("");
        setTotalRevenue("");
        setGrossMargin("");
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
    let status = "Waiting";
    let statusColor = "text-slate-400";
    let statusBg = "bg-slate-100";

    if (revenue > 0) {
        if (margin > 0) {
            if (tacos < (margin * 0.3)) { // Spending < 30% of margin
                status = "Excellent";
                statusColor = "text-emerald-600";
                statusBg = "bg-emerald-100";
            } else if (tacos < (margin * 0.6)) { // Spending < 60% of margin
                status = "Healthy";
                statusColor = "text-blue-600";
                statusBg = "bg-blue-100";
            } else if (tacos < margin) { // Spending < 100% of margin (Profitable)
                status = "Warning";
                statusColor = "text-amber-600";
                statusBg = "bg-amber-100";
            } else { // Spending > Margin (Loss)
                status = "Unprofitable";
                statusColor = "text-red-600";
                statusBg = "bg-red-100";
            }
        } else {
            // Fallback if no margin entered (Standard TACoS benchmarks)
            if (tacos < 10) { status = "Excellent"; statusColor = "text-emerald-600"; statusBg = "bg-emerald-100"; }
            else if (tacos < 20) { status = "Healthy"; statusColor = "text-blue-600"; statusBg = "bg-blue-100"; }
            else { status = "High"; statusColor = "text-amber-600"; statusBg = "bg-amber-100"; }
        }
    }

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
                                        Total Business Metrics
                                    </CardTitle>
                                    <button onClick={scrollToGuide} className="text-slate-400 hover:text-blue-600 transition-colors">
                                        <HelpCircle className="w-4 h-4" />
                                    </button>
                                </div>
                                <p className="text-sm text-slate-500 font-medium tracking-tight">Enter total ad spend, revenue, and product margins.</p>
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
                            {/* Group 1: Business Data */}
                            <div className="space-y-4">
                                <div className="flex items-center gap-2 mb-2">
                                    <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600">
                                        <BarChart3 className="w-4 h-4" />
                                    </div>
                                    <h3 className="text-sm font-black text-slate-600 uppercase tracking-widest">Business Data</h3>
                                </div>
                                <CalculatorInput
                                    label={`Total Revenue (${currency})`}
                                    value={totalRevenue}
                                    onChange={setTotalRevenue}
                                    placeholder="50000"
                                    tooltip="Total sales from both organic and paid traffic."
                                />
                                <CalculatorInput
                                    label={`Total Ad Spend (${currency})`}
                                    value={totalAdSpend}
                                    onChange={setTotalAdSpend}
                                    placeholder="5000"
                                    tooltip="Total spend on all ad platforms."
                                />
                            </div>

                            <Separator />

                            {/* Group 2: Profitability */}
                            <div className="space-y-4">
                                <div className="flex items-center gap-2 mb-2">
                                    <div className="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center text-emerald-600">
                                        <PieChart className="w-4 h-4" />
                                    </div>
                                    <h3 className="text-sm font-black text-slate-600 uppercase tracking-widest">Profitability</h3>
                                </div>
                                <CalculatorInput
                                    label="Gross Profit Margin (%)"
                                    value={grossMargin}
                                    onChange={setGrossMargin}
                                    placeholder="40.0"
                                    min={0}
                                    max={100}
                                    tooltip="Your overall business profit margin before ad costs."
                                />
                            </div>
                        </CardContent>
                    </Card>

                    {/* Logic Highlight */}
                    <FadeIn delay={0.2}>
                        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 flex gap-4">
                            <div className="w-12 h-12 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-blue-600 shrink-0 shadow-sm">
                                <Percent className="w-6 h-6" />
                            </div>
                            <div>
                                <h4 className="text-base font-bold text-slate-800 mb-1 leading-tight">Net Margin Impact</h4>
                                <p className={cn(
                                    "text-[15px] leading-relaxed max-w-lg transition-colors duration-300 font-medium",
                                    margin > 0 ? "text-slate-600" : "text-slate-400"
                                )}>
                                    Advertising is consuming <span className="font-bold text-slate-900">{tacos.toFixed(1)}%</span> of your revenue.
                                    {margin > 0 && (
                                        <> This leaves you with a Net Profit Margin of <span className={cn("font-bold", netMargin > 0 ? "text-emerald-600" : "text-red-500")}>{netMargin.toFixed(1)}%</span>.</>
                                    )}
                                </p>
                            </div>
                        </div>
                    </FadeIn>
                </div>

                {/* Right Column: Results */}
                <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-8">
                    <ResultFeedbackCard
                        title="TACoS Percentage"
                        mainValue={
                            <div className="flex items-baseline gap-1">
                                <Counter
                                    value={tacos}
                                    formatter={(val) => val.toFixed(2)}
                                    className="text-5xl font-bold"
                                />
                                <span className="text-3xl font-bold text-slate-400">%</span>
                            </div>
                        }
                        secondaryMetrics={[
                            { label: "Ad Spend", value: formatCurrency(spend), color: "text-slate-300" },
                            { label: "Net Profit", value: formatCurrency(netProfit), color: netProfit >= 0 ? "text-emerald-400" : "text-red-400" }
                        ]}
                    />

                    {/* Insight Card */}
                    <Card className="border border-slate-200 shadow-sm p-6 space-y-6 bg-white">
                        <div className="flex items-center justify-between">
                            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                                <TrendingUp className="w-5 h-5 text-blue-600" />
                                Margin Health
                            </h3>
                            {revenue > 0 && (
                                <span className={cn("text-xs font-bold uppercase tracking-widest px-2 py-0.5 rounded-full", statusBg, statusColor)}>
                                    {status}
                                </span>
                            )}
                        </div>

                        <div className="space-y-4">
                            <InsightItem
                                label="Net Profit Margin"
                                value={margin > 0 ? `${netMargin.toFixed(2)}%` : "-"}
                                description="Real profit % after deducting ad spend."
                                icon={Percent}
                                color={netMargin > 0 ? "text-emerald-600" : netMargin < 0 ? "text-red-500" : "text-slate-400"}
                                bg={netMargin > 0 ? "bg-emerald-50" : netMargin < 0 ? "bg-red-50" : "bg-slate-50"}
                            />
                            <InsightItem
                                label="Ad Cost Impact"
                                value={`${tacos.toFixed(2)}%`}
                                description="Portion of revenue consumed by ads."
                                icon={DollarSign}
                                color="text-amber-600"
                                bg="bg-amber-50"
                            />
                        </div>

                        <Separator />

                        <div className="pt-2">
                            <div className="flex items-center justify-between mb-3">
                                <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Profitability Scale</p>
                                {margin > 0 && (
                                    <span className={cn("text-xs font-bold px-2 py-0.5 rounded-md border",
                                        netMargin > 0 ? "text-emerald-600 bg-emerald-50 border-emerald-100" : "text-red-600 bg-red-50 border-red-100"
                                    )}>
                                        {netMargin.toFixed(1)}% Net
                                    </span>
                                )}
                            </div>

                            <div className="relative pt-2 pb-1">
                                {/* Visual Bar: Spend Impact on Margin */}
                                <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden flex">
                                    <div className="h-full bg-emerald-400" style={{ width: '60%' }} /> {/* Healthy Zone */}
                                    <div className="h-full bg-amber-400" style={{ width: '20%' }} /> {/* Warning Zone */}
                                    <div className="h-full bg-red-400" style={{ width: '20%' }} /> {/* Danger Zone */}
                                </div>

                                {/* Dynamic Pointer for TACoS relative to Margin */}
                                {margin > 0 && revenue > 0 && (
                                    <motion.div
                                        initial={{ left: 0 }}
                                        animate={{
                                            // Scale: 0% to 100% of Margin. If TACoS > Margin, it caps at 100%
                                            left: `${Math.min((tacos / margin) * 100, 100)}%`
                                        }}
                                        className="absolute top-0 -mt-0.5 w-4 h-4 bg-white border-2 border-slate-800 rounded-full shadow-md z-10 -ml-2 transition-all"
                                    />
                                )}
                            </div>
                            <div className="flex justify-between mt-2 text-[11px] font-bold text-slate-500 italic">
                                <span>Safe</span>
                                <span>Caution</span>
                                <span>Unprofitable</span>
                            </div>
                        </div>
                    </Card>
                </div>
            </div>
        </FadeIn>
    );
}

const Separator = () => <div className="h-px w-full bg-slate-100" />

function InsightItem({ label, value, description, icon: Icon, color, bg }: { label: string, value: string, description: string, icon: any, color: string, bg: string }) {
    return (
        <div className="flex gap-4">
            <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center shrink-0", bg, color)}>
                <Icon className="w-6 h-6" />
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
