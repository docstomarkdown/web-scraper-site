"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { HelpCircle } from "lucide-react";
import { CurrencyCombobox } from "@/components/ui/currency-combobox";
import { FadeIn, Counter, CalculatorInput, ResultFeedbackCard } from "@/app/tools/_shared/components";

export function PayPalFeeCalculator() {
    const [currency, setCurrency] = useState("USD");
    const [amount, setAmount] = useState<number | "">("");
    const [feeType, setFeeType] = useState<"standard" | "international" | "micropayment" | "nonprofit">("standard");

    const val = (v: number | "") => (v === "" ? 0 : v);

    const currencySymbols: Record<string, string> = {
        USD: '$', EUR: '€', GBP: '£', INR: '₹', AUD: 'A$', CAD: 'C$', JPY: '¥',
        CNY: '¥', AED: 'AED', SGD: 'S$', HKD: 'HK$', CHF: 'Fr', MXN: 'MX$',
        BRL: 'R$', KRW: '₩', RUB: '₽', ZAR: 'R'
    };

    const getSymbol = () => currencySymbols[currency] || "$";
    const symbol = getSymbol();

    const scrollToGuide = () => {
        const element = document.getElementById('how-to-use');
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const amountVal = val(amount);

    // Rate Logic (Based on US basic rates, usually configurable)
    // Standard: 2.9% + 0.30
    // International: 4.4% + 0.30 (approx, often +1.5% cross-border fee)
    // Micropayments: 5% + 0.05
    // Non-profit: 2.2% + 0.30
    let ratePercent = 2.9;
    let fixedFee = 0.30;

    switch (feeType) {
        case "international":
            ratePercent = 4.4;
            fixedFee = 0.30;
            break;
        case "micropayment":
            ratePercent = 5.0;
            fixedFee = 0.05;
            break;
        case "nonprofit":
            ratePercent = 2.2;
            fixedFee = 0.30;
            break;
        default: // standard
            ratePercent = 2.9;
            fixedFee = 0.30;
    }

    const totalFee = (amountVal * (ratePercent / 100)) + fixedFee;
    const netAmount = amountVal - totalFee;

    // Reverse calculation: How much to ask for to receive X?
    // Target = (Ask - Fixed) * (1 - Rate)
    // Ask = (Target + Fixed) / (1 - Rate)
    const toReceiveAmount = (amountVal + fixedFee) / (1 - (ratePercent / 100));

    const formatCurrency = (val: number) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: currency,
            maximumFractionDigits: 2
        }).format(val);
    };

    return (
        <TooltipProvider delayDuration={0}>
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
                                                Transaction Details
                                            </CardTitle>
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
                                        </div>
                                        <CardDescription>Enter the invoice or transfer amount.</CardDescription>
                                    </div>
                                    <div className="w-[120px]">
                                        <CurrencyCombobox value={currency} onValueChange={setCurrency} />
                                    </div>
                                </CardHeader>
                                <CardContent className="space-y-6 pt-6">
                                    <Tabs defaultValue="standard" value={feeType} onValueChange={(v) => setFeeType(v as any)} className="w-full">
                                        <TabsList className="grid w-full grid-cols-4 mb-4">
                                            <Tooltip>
                                                <TooltipTrigger asChild>
                                                    <TabsTrigger value="standard" className="text-xs sm:text-sm">Standard</TabsTrigger>
                                                </TooltipTrigger>
                                                <TooltipContent>2.9% + {formatCurrency(0.30)} (Domestic)</TooltipContent>
                                            </Tooltip>
                                            <Tooltip>
                                                <TooltipTrigger asChild>
                                                    <TabsTrigger value="international" className="text-xs sm:text-sm">Intl.</TabsTrigger>
                                                </TooltipTrigger>
                                                <TooltipContent>4.4% + {formatCurrency(0.30)} (Cross-border)</TooltipContent>
                                            </Tooltip>
                                            <Tooltip>
                                                <TooltipTrigger asChild>
                                                    <TabsTrigger value="micropayment" className="text-xs sm:text-sm">Micro</TabsTrigger>
                                                </TooltipTrigger>
                                                <TooltipContent>5.0% + {formatCurrency(0.05)} (Small goods)</TooltipContent>
                                            </Tooltip>
                                            <Tooltip>
                                                <TooltipTrigger asChild>
                                                    <TabsTrigger value="nonprofit" className="text-xs sm:text-sm">Non-Profit</TabsTrigger>
                                                </TooltipTrigger>
                                                <TooltipContent>2.2% + {formatCurrency(0.30)} (Charity)</TooltipContent>
                                            </Tooltip>
                                        </TabsList>
                                    </Tabs>

                                    <CalculatorInput
                                        label={`Transaction Amount (${symbol})`}
                                        value={amount}
                                        onChange={setAmount}
                                        placeholder="100.00"
                                        min={0}
                                        tooltip="The total amount being sent or requested."
                                    />

                                    <div className="bg-slate-50 p-4 rounded-lg border border-slate-100 text-sm space-y-2">
                                        <div className="flex justify-between text-slate-600">
                                            <span>Applied Rate:</span>
                                            <span className="font-semibold">{ratePercent}% + {formatCurrency(fixedFee)}</span>
                                        </div>
                                        <div className="text-xs text-slate-400">
                                            *Rates based on standard merchant fees. Check your specific PayPal agreement.
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </FadeIn>
                    </div>

                    {/* Results */}
                    <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-8">
                        <FadeIn delay={0.4} direction="left">
                            <ResultFeedbackCard
                                title="You receive (Net)"
                                mainValue={
                                    <Counter
                                        value={netAmount > 0 ? netAmount : 0}
                                        formatter={formatCurrency}
                                        className="text-5xl font-bold tracking-tight text-white"
                                    />
                                }
                                valueColor="text-emerald-400"
                                mainMetricLabel="Total Fees"
                                mainMetricValue={formatCurrency(totalFee)}
                                mainMetricColor="text-red-300"
                            />

                            <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
                                <h3 className="text-sm font-medium text-slate-500 mb-4 uppercase tracking-wider">Breakeven Calculation</h3>
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg border border-blue-100">
                                        <div className="space-y-1">
                                            <div className="text-sm font-semibold text-blue-900">To Receive {amountVal > 0 ? formatCurrency(amountVal) : symbol + '0'}</div>
                                            <div className="text-xs text-blue-600">You should ask for</div>
                                        </div>
                                        <div className="text-xl font-bold text-blue-700">
                                            {formatCurrency(toReceiveAmount > 0 ? toReceiveAmount : 0)}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </FadeIn>
                    </div>
                </div>
            </FadeIn>
        </TooltipProvider>
    );
}
