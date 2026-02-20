"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DollarSign, ArrowRight, Wallet, Percent, TrendingUp, BarChart3 } from "lucide-react"
import { CalculatorCardHeader, CalculatorInput, Counter, CurrencyCombobox, FadeIn, ResultFeedbackCard } from "@/app/tools/_shared/components"

export function PayPalFeeCalculator() {
    const [currency, setCurrency] = useState("USD");
    const [amount, setAmount] = useState<number | "">("");
    const [feeType, setFeeType] = useState<"standard" | "international" | "micropayment" | "nonprofit">("standard");

    const handleReset = () => {
        setAmount(100)
        setFeeType("standard")
    }

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
                        <CalculatorCardHeader

                            description="Enter your details."

                            onReset={handleReset}

                            currency={currency}

                            onCurrencyChange={setCurrency}

                        />
                        <CardContent className="space-y-6 pt-6">
                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <label className="text-xs font-black uppercase tracking-widest text-slate-450">Fee Tier</label>
                                    <Tabs value={feeType} onValueChange={(v) => setFeeType(v as any)} className="w-full">
                                        <TabsList className="grid w-full grid-cols-4 h-12 bg-slate-100/50 p-1">
                                            <TabsTrigger value="standard" className="text-xs font-bold data-[state=active]:bg-white data-[state=active]:text-emerald-600">Standard</TabsTrigger>
                                            <TabsTrigger value="international" className="text-xs font-bold data-[state=active]:bg-white data-[state=active]:text-emerald-600">Intl.</TabsTrigger>
                                            <TabsTrigger value="micropayment" className="text-xs font-bold data-[state=active]:bg-white data-[state=active]:text-emerald-600">Micro</TabsTrigger>
                                            <TabsTrigger value="nonprofit" className="text-xs font-bold data-[state=active]:bg-white data-[state=active]:text-emerald-600">Charity</TabsTrigger>
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

                            <div className="bg-slate-50/80 rounded-2xl p-5 border border-slate-100 flex items-center justify-between group hover:border-emerald-100 transition-colors">
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-xl bg-white border border-slate-100 flex items-center justify-center text-emerald-500 shadow-sm group-hover:scale-110 transition-transform">
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

                </div>

                <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-8">
                    <ResultFeedbackCard
                        title="You Receive (Net)"
                        mainValue={
                            amountVal > 0 ?
                                <div className="flex items-baseline gap-1">
                                    <Counter value={netAmount > 0 ? netAmount : 0} formatter={formatCurrency} />
                                </div> :
                                formatCurrency(0)
                        }
                        valueColor={amountVal > 0 ? (netAmount >= 0 ? "text-slate-100" : "text-rose-400") : "text-slate-400"}
                        secondaryMetrics={[]}
                    />

                    {/* Breakdown Card */}
                    {amountVal > 0 ? (
                        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden border-l-4 border-l-emerald-500">
                            <div className="px-5 py-3.5 border-b border-slate-100">
                                <p className="text-xs font-bold text-slate-600 uppercase tracking-wider">Fee Breakdown</p>
                            </div>
                            <div className="divide-y divide-slate-100">
                                <div className="flex justify-between items-center px-5 py-3.5">
                                    <span className="text-sm text-slate-600">Transaction Amount</span>
                                    <span className="text-sm font-semibold text-slate-800">{formatCurrency(amountVal)}</span>
                                </div>
                                <div className="flex justify-between items-center px-5 py-3.5">
                                    <span className="text-sm text-slate-600">Total PayPal Fee</span>
                                    <span className="text-sm font-semibold text-rose-500">- {formatCurrency(totalFee)}</span>
                                </div>
                                <div className="flex justify-between items-center px-5 py-3.5">
                                    <span className="text-sm text-slate-600">Net Keep %</span>
                                    <span className="text-sm font-semibold text-slate-800">{((netAmount / (amountVal || 1)) * 100).toFixed(1)}%</span>
                                </div>
                                <div className="flex justify-between items-center px-5 py-4">
                                    <span className="text-sm font-bold text-emerald-600">Ask For (To Cover Fees)</span>
                                    <span className="text-base font-bold text-emerald-600">{formatCurrency(toReceiveAmount > 0 ? toReceiveAmount : 0)}</span>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 text-center">
                            <p className="text-sm text-slate-400">Enter transaction details to see breakdown.</p>
                        </div>
                    )}

                    <Card className="border border-slate-200 shadow-sm p-6 space-y-6 bg-white overflow-hidden relative">
                        <div className="flex items-center justify-between relative z-10">
                            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                                <BarChart3 className="w-5 h-5 text-emerald-600" />
                                Efficiency Meter
                            </h3>
                            <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">
                                Net Margin
                            </span>
                        </div>

                        <div className="space-y-4 relative z-10">
                            <div className="h-4 bg-slate-100 rounded-full overflow-hidden border border-slate-200/50 p-1 flex items-center">
                                <div
                                    className="h-2 rounded-full bg-gradient-to-r from-emerald-500 to-emerald-500 transition-all duration-1000 ease-out shadow-[0_0_12px_rgba(16,185,129,0.4)]"
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
                                    <p className="text-lg font-bold text-rose-500 leading-none">
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

