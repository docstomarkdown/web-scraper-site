"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { HelpCircle, DollarSign, ArrowRight, Wallet, Percent, TrendingUp, BarChart3 } from "lucide-react";
import { CurrencyCombobox } from "@/app/tools/_shared/components";
import { FadeIn, Counter, CalculatorInput, ResultFeedbackCard } from "@/app/tools/_shared/components";

export function PayPalFeeCalculator() {
    const [currency, setCurrency] = useState("USD");
    const [amount, setAmount] = useState<number | "">(100);
    const [feeType, setFeeType] = useState<"standard" | "international" | "micropayment" | "nonprofit">("standard");

    const val = (v: number | "") => (v === "" ? 0 : v);
    const amountVal = val(amount);

    let ratePercent = 2.9;
    let fixedFee = 0.30;

    switch (feeType) {
        case "international": ratePercent = 4.4; fixedFee = 0.30; break;
        case "micropayment": ratePercent = 5.0; fixedFee = 0.05; break;
        case "nonprofit": ratePercent = 2.2; fixedFee = 0.30; break;
        default: ratePercent = 2.9; fixedFee = 0.30;
    }

    const totalFee = (amountVal * (ratePercent / 100)) + fixedFee;
    const netAmount = amountVal - totalFee;
    const toReceiveAmount = (amountVal + fixedFee) / (1 - (ratePercent / 100));

    const formatCurrency = (v: number) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency', currency: currency, maximumFractionDigits: 2
        }).format(v);
    };

    const scrollToGuide = () => {
        const element = document.getElementById('how-to-use');
        if (element) element.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <FadeIn className="w-full max-w-6xl mx-auto py-8 px-4" duration={0.6}>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                <div className="lg:col-span-7 space-y-6">
                    <Card className="border border-slate-200 shadow-sm bg-white overflow-hidden">
                        <CardHeader className="pb-4 border-b border-slate-50 flex flex-row items-center justify-between space-y-0 text-left">
                            <div className="space-y-1">
                                <div className="flex items-center gap-2">
                                    <CardTitle className="text-xl font-bold text-slate-800">
                                        Transaction Data
                                    </CardTitle>
                                    <button onClick={scrollToGuide} className="text-slate-400 hover:text-blue-600 transition-colors">
                                        <HelpCircle className="h-4 w-4" />
                                    </button>
                                </div>
                                <CardDescription className="text-sm">Configure your sale or transfer details.</CardDescription>
                            </div>
                            <div className="w-[140px]">
                                <CurrencyCombobox value={currency} onValueChange={setCurrency} />
                            </div>
                        </CardHeader>
                        <CardContent className="space-y-6 pt-6">
                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <label className="text-xs font-black uppercase tracking-widest text-slate-450">Fee Tier</label>
                                    <Tabs value={feeType} onValueChange={(v) => setFeeType(v as any)} className="w-full">
                                        <TabsList className="grid w-full grid-cols-4 h-12 bg-slate-100/50 p-1">
                                            <TabsTrigger value="standard" className="text-xs font-bold data-[state=active]:bg-white data-[state=active]:text-blue-600">Standard</TabsTrigger>
                                            <TabsTrigger value="international" className="text-xs font-bold data-[state=active]:bg-white data-[state=active]:text-blue-600">Intl.</TabsTrigger>
                                            <TabsTrigger value="micropayment" className="text-xs font-bold data-[state=active]:bg-white data-[state=active]:text-blue-600">Micro</TabsTrigger>
                                            <TabsTrigger value="nonprofit" className="text-xs font-bold data-[state=active]:bg-white data-[state=active]:text-blue-600">Charity</TabsTrigger>
                                        </TabsList>
                                    </Tabs>
                                </div>

                                <CalculatorInput
                                    label="Transaction Amount"
                                    value={amount}
                                    onChange={setAmount}
                                    placeholder="100.00"
                                    tooltip="The total amount being sent or requested."
                                />
                            </div>

                            <div className="bg-slate-50/80 rounded-2xl p-5 border border-slate-100 flex items-center justify-between group hover:border-blue-100 transition-colors">
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-xl bg-white border border-slate-100 flex items-center justify-center text-blue-500 shadow-sm group-hover:scale-110 transition-transform">
                                        <Percent className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest leading-none mb-1">Fee Logic</p>
                                        <p className="text-base font-bold text-slate-700">{ratePercent}% + {formatCurrency(fixedFee)}</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest leading-none mb-1">Effective Rate</p>
                                    <p className="text-base font-bold text-slate-900">{((totalFee / (amountVal || 1)) * 100).toFixed(2)}%</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Logic Insight */}
                    <div className="bg-blue-50 border border-blue-100 rounded-2xl p-6 flex gap-4">
                        <div className="w-12 h-12 rounded-xl bg-white border border-blue-100 flex items-center justify-center text-blue-600 shrink-0 shadow-sm">
                            <Wallet className="w-6 h-6" />
                        </div>
                        <div>
                            <h4 className="text-base font-bold text-blue-900 mb-1 leading-tight">Invoicing Insight</h4>
                            <p className="text-sm text-blue-700 leading-relaxed font-medium">
                                To receive a clean <span className="font-bold">{formatCurrency(amountVal)}</span>, you should ask the sender for <span className="font-bold underline underline-offset-4">{formatCurrency(toReceiveAmount > 0 ? toReceiveAmount : 0)}</span>. This covers the {ratePercent}% merchant fee.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-8">
                    <ResultFeedbackCard
                        title="You Receive (Net)"
                        mainValue={
                            <div className="flex items-baseline gap-1">
                                <Counter value={netAmount > 0 ? netAmount : 0} formatter={formatCurrency} />
                            </div>
                        }
                        valueColor="text-emerald-400"
                        secondaryMetrics={[
                            { label: "Total Fee", value: formatCurrency(totalFee), color: "text-red-400" },
                            { label: "Fixed Cost", value: formatCurrency(fixedFee), color: "text-slate-300" }
                        ]}
                    />

                    {/* Breakdown Cards */}
                    <div className="grid grid-cols-2 gap-4">
                        <ResultCard
                            title="Markup Price"
                            value={formatCurrency(toReceiveAmount > 0 ? toReceiveAmount : 0)}
                            description="Price to offset fees."
                            icon={ArrowRight}
                        />
                        <ResultCard
                            title="Net Keep %"
                            value={`${((netAmount / (amountVal || 1)) * 100).toFixed(1)}%`}
                            description="Profit retention."
                            icon={TrendingUp}
                        />
                    </div>

                    <Card className="border border-slate-200 shadow-sm p-6 space-y-6 bg-white overflow-hidden relative">
                        <div className="flex items-center justify-between relative z-10">
                            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                                <BarChart3 className="w-5 h-5 text-blue-600" />
                                Efficiency Meter
                            </h3>
                            <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">
                                Net Margin
                            </span>
                        </div>

                        <div className="space-y-4 relative z-10">
                            <div className="h-4 bg-slate-100 rounded-full overflow-hidden border border-slate-200/50 p-1 flex items-center">
                                <div
                                    className="h-2 rounded-full bg-gradient-to-r from-blue-500 to-emerald-500 transition-all duration-1000 ease-out shadow-[0_0_12px_rgba(59,130,246,0.4)]"
                                    style={{ width: `${Math.min(100, (netAmount / (amountVal || 1)) * 100)}%` }}
                                />
                            </div>
                            <div className="flex justify-between items-end">
                                <div>
                                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Profit Retained</p>
                                    <p className="text-2xl font-black text-slate-900 leading-none">
                                        {((netAmount / (amountVal || 1)) * 100).toFixed(1)}%
                                    </p>
                                </div>
                                <div className="text-right">
                                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1 leading-none">Fee Leakage</p>
                                    <p className="text-lg font-bold text-red-500 leading-none">
                                        {((totalFee / (amountVal || 1)) * 100).toFixed(1)}%
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Decorative background element */}
                        <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-blue-50/50 rounded-full blur-2xl z-0" />
                    </Card>
                </div>
            </div>
        </FadeIn>
    );
}

function ResultCard({ title, value, description, icon: Icon }: { title: string, value: string, description: string, icon: any }) {
    return (
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm group hover:border-blue-200 transition-all duration-300">
            <div className="flex items-center gap-1.5 mb-3">
                <div className="w-7 h-7 rounded-lg bg-slate-50 flex items-center justify-center text-slate-400 group-hover:text-blue-500 group-hover:bg-blue-50 transition-colors">
                    <Icon className="h-4 w-4" />
                </div>
                <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">{title}</p>
            </div>
            <div className="space-y-1">
                <p className="text-xl font-black text-slate-900">{value}</p>
                <p className="text-[11px] font-medium text-slate-400 leading-tight">{description}</p>
            </div>
        </div>
    );
}

