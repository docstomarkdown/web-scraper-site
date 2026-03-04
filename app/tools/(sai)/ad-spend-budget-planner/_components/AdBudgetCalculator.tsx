"use client";
import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Target, MousePointer2, ShoppingCart, TrendingUp, DollarSign } from "lucide-react";
import { FadeIn, Counter, CalculatorInput, ResultFeedbackCard, CalculatorCardHeader } from "@/app/tools/_shared/components";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
export function AdBudgetCalculator() {
    const [currency, setCurrency] = useState("USD");
    const [revenueGoal, setRevenueGoal] = useState<number | "">("")
    const [targetROAS, setTargetROAS] = useState<number | "">("")
    // New Traffic Inputs
    const [avgCPC, setAvgCPC] = useState<number | "">("")
    const [conversionRate, setConversionRate] = useState<number | "">("")
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
    const currencySymbols: Record<string, string> = {
        USD: '$', EUR: '€', GBP: '£', INR: '₹', AUD: 'A$', CAD: 'C$', JPY: '¥', CNY: '¥',
        AED: 'AED', SGD: 'S$', HKD: 'HK$', CHF: 'Fr', MXN: 'MX$', BRL: 'R$', KRW: '₩',
        RUB: '₽', ZAR: 'R', SEK: 'kr', NOK: 'kr', DKK: 'kr', PLN: 'zł', THB: '฿',
        IDR: 'Rp', MYR: 'RM', PHP: '₱', VND: '₫', TRY: '₺', SAR: '﷼', NZD: 'NZ$',
        EGP: 'E£', PKR: '₨', BDT: '৳', NGN: '₦', KES: 'KSh'
    }
    const symbol = currencySymbols[currency] || "$"
    const formatCurrency = (val: number) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency', currency: currency, maximumFractionDigits: (val < 100 && val !== 0) ? 2 : 0
        }).format(val);
    };
    return (
        <FadeIn className="w-full max-w-6xl mx-auto py-8 px-4" duration={0.6}>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                {/* Left Column: Inputs */}
                <div className="lg:col-span-7 space-y-3">
                    <Card className="border border-slate-200 shadow-sm bg-white overflow-hidden">
                        <CalculatorCardHeader
                            description="Enter your monthly revenue goal and target ROAS."
                            onReset={handleReset}
                            currency={currency}
                            onCurrencyChange={setCurrency}
                        />
                        <CardContent className="space-y-3 pt-6">
                            {/* Group 1: Goals */}
                            <div className="space-y-3">
                                <div className="flex items-center gap-2 mb-2">
                                    <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600">
                                        <Target className="w-4 h-4" />
                                    </div>
                                    <h3 className="text-sm font-black text-slate-600 uppercase tracking-widest">Growth Goals</h3>
                                </div>
                                <CalculatorInput
                                    label={`Monthly Revenue Goal (${symbol})`}
                                    value={revenueGoal}
                                    onChange={setRevenueGoal}
                                    placeholder="100,000"
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
                            {/* Group 2: Traffic Assumptions */}
                            <div className="space-y-3">
                                <div className="flex items-center gap-2 mb-2">
                                    <div className="w-8 h-8 rounded-lg bg-purple-50 flex items-center justify-center text-purple-600">
                                        <MousePointer2 className="w-4 h-4" />
                                    </div>
                                    <h3 className="text-sm font-black text-slate-600 uppercase tracking-widest">Traffic Assumptions</h3>
                                </div>
                                <CalculatorInput
                                    label={`Avg. CPC (${symbol})`}
                                    value={avgCPC}
                                    onChange={setAvgCPC}
                                    placeholder="1.50"
                                    tooltip="The average cost you pay for each click on your ads."
                                />
                                <CalculatorInput
                                    label="Conversion Rate (%)"
                                    value={conversionRate}
                                    onChange={setConversionRate}
                                    placeholder="3.5"
                                    max={100}
                                    suffix="%"
                                    tooltip="The percentage of ad clicks that result in a purchase."
                                />
                            </div>
                        </CardContent>
                    </Card>
                </div>
                {/* Right Column: Results */}
                <div className="lg:col-span-5 space-y-3 lg:sticky lg:top-8">
                    <ResultFeedbackCard
                        title="Monthly Ad Budget"
                        mainValue={
                            <Counter value={requiredAdSpend} formatter={formatCurrency} key={currency} />
                        }
                        secondaryMetrics={[
                            { label: "Daily Spend", value: formatCurrency(dailySpend), color: "text-slate-300" },
                            { label: "Est. Orders", value: Math.round(estOrders).toLocaleString(), color: "text-blue-400" }
                        ]}
                    />
                    {/* Breakdown Card */}
                    {requiredAdSpend > 0 ? (
                        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden border-l-4 border-l-blue-500">
                            <div className="px-5 py-3.5 border-b border-slate-100">
                                <p className="text-xs font-bold text-slate-600 uppercase tracking-wider">Campaign Funnel</p>
                            </div>
                            <div className="divide-y divide-slate-100">
                                <div className="flex justify-between items-center px-5 py-3.5">
                                    <span className="text-sm text-slate-600">Total Ad Spend</span>
                                    <span className="text-sm font-semibold text-slate-800">{formatCurrency(requiredAdSpend)}</span>
                                </div>
                                <div className="flex justify-between items-center px-5 py-3.5">
                                    <span className="text-sm text-slate-500 flex items-center gap-2">
                                        <MousePointer2 className="w-4 h-4 text-slate-400" />
                                        Est. Clicks
                                    </span>
                                    <div className="text-right">
                                        <div className="text-sm font-semibold text-slate-800">{Math.round(estClicks).toLocaleString()}</div>
                                        <div className="text-[10px] text-slate-400 uppercase font-medium">@ {formatCurrency(cpc)} CPC</div>
                                    </div>
                                </div>
                                <div className="flex justify-between items-center px-5 py-4 bg-blue-50/20">
                                    <span className="text-sm font-bold text-blue-700 flex items-center gap-2">
                                        <ShoppingCart className="w-4 h-4" />
                                        Est. Orders
                                    </span>
                                    <div className="text-right">
                                        <div className="text-base font-bold text-blue-700">{Math.round(estOrders).toLocaleString()}</div>
                                        <div className="text-[10px] text-blue-500 uppercase font-medium">@ {val(conversionRate)}% CR</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 text-center">
                            <p className="text-sm text-slate-400">Enter goals to see campaign funnel.</p>
                        </div>
                    )}
                </div>
            </div>
        </FadeIn>
    );
}
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