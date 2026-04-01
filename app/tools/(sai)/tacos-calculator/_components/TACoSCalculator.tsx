"use client";
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Box, TrendingUp, DollarSign, Percent, BarChart3, PieChart, LineChart, ShieldAlert } from "lucide-react"
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { CalculatorCardHeader, CalculatorInput, FadeIn, ResultSummaryCard } from "@/app/tools/_shared/components"
export function TACoSCalculator() {
    const [currency, setCurrency] = useState("USD");
    const [totalAdSpend, setTotalAdSpend] = useState<number | "">("")
    const [totalRevenue, setTotalRevenue] = useState<number | "">("")
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
                statusColor = "text-blue-600";
                statusBg = "bg-blue-100";
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
            if (tacos < 10) { status = "Excellent"; statusColor = "text-blue-600"; statusBg = "bg-blue-100"; }
            else if (tacos < 20) { status = "Healthy"; statusColor = "text-blue-600"; statusBg = "bg-blue-100"; }
            else { status = "High"; statusColor = "text-amber-600"; statusBg = "bg-amber-100"; }
        }
    }
    return (
        <FadeIn className="w-full max-w-6xl mx-auto py-8 px-4" duration={0.6}>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                {/* Left Column: Inputs */}
                <div className="lg:col-span-7 space-y-3 lg:sticky lg:top-8">
                    <Card className="border border-slate-200 shadow-sm bg-white overflow-hidden">
                        <CalculatorCardHeader
                            title="TACoS Details"
                            description="Enter total ad spend, revenue, and product margins."
                            onReset={handleReset}
                            currency={currency}
                            onCurrencyChange={setCurrency}
                        />
                        <CardContent className="space-y-3 pt-6">
                            {/* Group 1: Business Data */}
                            <div className="space-y-4 max-w-[520px] mx-auto w-full">
                                <CalculatorInput
                                    hideSeparator={true}
                                    groupingTitle="Business Data"
                                    groupingIcon={BarChart3}
                                    label="Total Revenue"
                                    value={totalRevenue}
                                    onChange={setTotalRevenue}
                                    placeholder="50000"
                                    tooltip="Combined total of pure organic sales and ad-driven revenue over a specific period."
                                    isCurrency
                                    currency={currency}
                                />
                                <CalculatorInput
                                    label="Total Ad Spend"
                                    value={totalAdSpend}
                                    onChange={setTotalAdSpend}
                                    placeholder="5000"
                                    tooltip="Total capital deployed across all advertising channels targeting this revenue."
                                    isCurrency
                                    currency={currency}
                                />
                            </div>
                            {/* Group 2: Profitability */}
                            <div className="space-y-4 max-w-[520px] mx-auto w-full">
                                <CalculatorInput
                                    groupingTitle="Profitability"
                                    groupingIcon={PieChart}
                                    label="Gross Profit Margin"
                                    suffix="%"
                                    value={grossMargin}
                                    onChange={setGrossMargin}
                                    placeholder="40.0"
                                    min={0}
                                    max={100}
                                    tooltip="Base business profitability before advertising costs are factored in."
                                />
                            </div>
                        </CardContent>
                    </Card>
                </div>
                {/* Right Column: Results */}
                <div className="lg:col-span-5 space-y-3">
                    <ResultSummaryCard
                        isCalculated={revenue > 0 && spend > 0}
                        currency={currency}
                        emptyMessage="TACoS Percentage"
                        showLiveBadge={true}
                        liveBadgeText={status !== "Waiting" ? status : "Live"}
                        liveBadgeColor={
                            status === "Excellent" || status === "Healthy" ? "emerald" :
                            status === "Warning" || status === "High" ? "amber" :
                            status === "Unprofitable" ? "rose" : "blue"
                        }
                        description={
                            revenue > 0
                                ? `TACoS measures ad dependency. You spend ${currency}${spend.toLocaleString()} to generate ${currency}${revenue.toLocaleString()} total revenue.`
                                : undefined
                        }
                        primaryResult={{
                            value: tacos,
                            label: "Total ACoS (TACoS)",
                            unit: "%",
                            key: "tacosResult"
                        }}
                        secondaryResults={[
                            {
                                key: "adSpend",
                                label: "Ad Spend",
                                value: spend,
                                isCurrency: true,
                                icon: DollarSign,
                                tooltip: "The total amount spent on advertising."
                            },
                            {
                                key: "netProfit",
                                label: "Estimated Net Profit",
                                value: netProfit,
                                isCurrency: true,
                                icon: PieChart,
                                tooltip: "Estimated real currency profit based on Net Margin × Total Revenue.",
                                className: netProfit > 0 ? "text-emerald-600" : "text-red-500"
                            }
                        ]}
                        checklistItems={[
                            { key: "rev", label: "Total Revenue", isComplete: totalRevenue !== "" },
                            { key: "spend", label: "Total Ad Spend", isComplete: totalAdSpend !== "" },
                            { key: "margin", label: "Gross Margin", isComplete: grossMargin !== "" }
                        ]}
                    />

                    {/* Insight Card */}
                    <Card className="border border-slate-200 shadow-sm p-4 md:p-6 space-y-3 bg-white mt-4">
                        <div className="flex flex-col gap-2 mb-4">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2.5">
                                    <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-blue-600/10 border border-blue-100/50 shadow-sm shadow-blue-500/5">
                                        <LineChart className="w-4 h-4 text-blue-600" />
                                    </div>
                                    <span className="text-[15px] sm:text-[16px] font-bold text-blue-700 leading-none">
                                        Margin Health
                                    </span>
                                </div>
                                {revenue > 0 && (
                                    <span className={cn("flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-[10.5px] font-bold tracking-wide shrink-0 border-slate-200/50", statusBg, statusColor)}>
                                        {status}
                                    </span>
                                )}
                            </div>
                            <p className="text-xs font-medium text-slate-500 leading-relaxed pr-6 mt-1">
                                Visualize how your total ad spend impacts your overall gross margin. Keep the pointer inside the <strong className="text-blue-500 font-bold">Safe</strong> zone to ensure your business remains profitable.
                            </p>
                        </div>
                        <div className="pt-2">
                            <div className="flex items-center justify-between mb-3">
                                <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Profitability Scale</p>
                                {margin > 0 && (
                                    <span className={cn("text-xs font-bold px-2.5 py-1 rounded-md border",
                                        netMargin > 0 ? "text-blue-600 bg-blue-50 border-blue-100" : "text-red-600 bg-red-50 border-red-100"
                                    )}>
                                        {netMargin.toFixed(1)}% Net
                                    </span>
                                )}
                            </div>
                            <div className="relative pt-2 pb-1">
                                {/* Visual Bar: Spend Impact on Margin */}
                                <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden flex">
                                    <div className="h-full bg-blue-400" style={{ width: '60%' }} /> {/* Healthy Zone */}
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