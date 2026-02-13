"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { HelpCircle, DollarSign, ArrowRight, Wallet } from "lucide-react";
import { CurrencyCombobox } from "@/components/ui/currency-combobox";
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
                <div className="lg:col-span-7">
                    <FadeIn delay={0.2} direction="right" className="h-full">
                        <Card className="border border-slate-200 shadow-sm bg-white">
                            <CardHeader className="pb-4 border-b border-slate-50 flex flex-row items-center justify-between space-y-0">
                                <div className="space-y-1">
                                    <div className="flex items-center gap-3">
                                        <CardTitle className="text-2xl font-bold text-blue-600">
                                            Transaction Details
                                        </CardTitle>
                                        <TooltipProvider delayDuration={100}>
                                            <Tooltip>
                                                <TooltipTrigger asChild>
                                                    <Button variant="ghost" size="icon" onClick={scrollToGuide} className="text-slate-400 hover:text-slate-900 h-8 w-8 rounded-full">
                                                        <HelpCircle className="w-4 h-4" />
                                                    </Button>
                                                </TooltipTrigger>
                                                <TooltipContent side="top" className="text-xs bg-slate-900 text-white border-slate-800">
                                                    How to use this calculator
                                                </TooltipContent>
                                            </Tooltip>
                                        </TooltipProvider>
                                    </div>
                                    <CardDescription>Enter the invoice or transfer amount.</CardDescription>
                                </div>
                                <div className="w-[120px]">
                                    <CurrencyCombobox value={currency} onValueChange={setCurrency} />
                                </div>
                            </CardHeader>
                            <CardContent className="space-y-6 pt-6">
                                <Tabs value={feeType} onValueChange={(v) => setFeeType(v as any)} className="w-full">
                                    <TabsList className="grid w-full grid-cols-4 mb-4">
                                        <TabsTrigger value="standard" className="text-xs">Standard</TabsTrigger>
                                        <TabsTrigger value="international" className="text-xs">Intl.</TabsTrigger>
                                        <TabsTrigger value="micropayment" className="text-xs">Micro</TabsTrigger>
                                        <TabsTrigger value="nonprofit" className="text-xs">Charity</TabsTrigger>
                                    </TabsList>
                                </Tabs>

                                <CalculatorInput
                                    label={`Transaction Amount (${currency})`}
                                    value={amount}
                                    onChange={setAmount}
                                    placeholder="100.00"
                                    tooltip="The total amount being sent or requested."
                                />

                                <div className="bg-slate-50 p-4 rounded-lg border border-slate-100 text-sm flex justify-between">
                                    <span className="text-slate-500">Applied Rate:</span>
                                    <span className="font-bold text-slate-700">{ratePercent}% + {formatCurrency(fixedFee)}</span>
                                </div>
                            </CardContent>
                        </Card>
                    </FadeIn>
                </div>

                <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-8">
                    <FadeIn delay={0.4} direction="left" className="space-y-6">
                        <ResultFeedbackCard
                            title="You Receive (Net)"
                            mainValue={<Counter value={netAmount > 0 ? netAmount : 0} formatter={formatCurrency} />}
                            valueColor="text-emerald-400"
                            mainMetricLabel="Total Fee"
                            mainMetricValue={formatCurrency(totalFee)}
                            mainMetricColor="text-red-300"
                            secondaryMetrics={[
                                { label: "Rate", value: `${ratePercent}%`, color: "text-slate-400" },
                                { label: "Fixed", value: formatCurrency(fixedFee), color: "text-slate-400" }
                            ]}
                        />

                        <div className="bg-blue-600 rounded-xl p-6 text-white shadow-lg shadow-blue-200/50">
                            <div className="flex items-center gap-2 mb-2 opacity-80">
                                <Wallet className="h-4 w-4" />
                                <span className="text-xs font-bold uppercase tracking-wider">Invoicing Tip</span>
                            </div>
                            <h3 className="text-lg font-bold mb-1">To receive exactly {formatCurrency(amountVal)}</h3>
                            <p className="text-xs opacity-80 mb-4">You should ask the sender for:</p>
                            <div className="text-3xl font-black">{formatCurrency(toReceiveAmount > 0 ? toReceiveAmount : 0)}</div>
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                            <ResultCard title="Total Fee" value={<Counter value={totalFee} formatter={formatCurrency} />} icon={DollarSign} />
                            <ResultCard title="Net %" value={<>{((netAmount / (amountVal || 1)) * 100).toFixed(1)}%</>} icon={ArrowRight} />
                        </div>
                    </FadeIn>
                </div>
            </div>
        </FadeIn>
    );
}

function ResultCard({ title, value, icon: Icon }: { title: string, value: React.ReactNode, icon: any }) {
    return (
        <div className="p-4 rounded-xl border bg-white border-slate-200 shadow-sm transition-all duration-200">
            <div className="flex items-center gap-1.5 mb-1">
                <Icon className="h-3 w-3 text-slate-400" />
                <p className="text-xs font-semibold text-slate-500">{title}</p>
            </div>
            <p className="text-xl font-bold text-slate-800">{value}</p>
        </div>
    );
}
