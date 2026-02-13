"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { HelpCircle } from "lucide-react";
import { CurrencyCombobox } from "@/components/ui/currency-combobox";
import { FadeIn, Counter, CalculatorInput, ResultFeedbackCard } from "@/app/tools/_shared/components";

export function TACoSCalculator() {
    const [currency, setCurrency] = useState("USD");
    const [totalAdSpend, setTotalAdSpend] = useState<number | "">("");
    const [totalRevenue, setTotalRevenue] = useState<number | "">("");

    const val = (v: number | "") => (v === "" ? 0 : v);

    const currencySymbols: Record<string, string> = {
        USD: '$', EUR: '€', GBP: '£', INR: '₹', AUD: 'A$', CAD: 'C$', JPY: '¥', CNY: '¥',
        AED: 'AED', SGD: 'S$', HKD: 'HK$', CHF: 'Fr', MXN: 'MX$', BRL: 'R$', KRW: '₩',
        RUB: '₽', ZAR: 'R', SEK: 'kr', NOK: 'kr', DKK: 'kr', PLN: 'zł', THB: '฿',
        IDR: 'Rp', MYR: 'RM', PHP: '₱', VND: '₫', TRY: '₺', SAR: '﷼', NZD: 'NZ$',
        EGP: 'E£', PKR: '₨', BDT: '৳', NGN: '₦', KES: 'KSh'
    };

    const getSymbol = () => currencySymbols[currency] || "$";
    const symbol = getSymbol();

    const scrollToGuide = () => {
        const element = document.getElementById('how-to-use');
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const adSpendVal = val(totalAdSpend);
    const revenueVal = val(totalRevenue);

    const tacos = revenueVal > 0 ? (adSpendVal / revenueVal) * 100 : 0;

    // Feedback logic
    // General rule of thumb: <10% Great, 10-15% Good, 15-25% Fair, >25% Watch out
    let feedbackColor = "text-white";
    let feedbackLabel = "Calculate";
    let feedbackLabelColor = "text-slate-400";

    if (revenueVal > 0) {
        if (tacos < 10) {
            feedbackColor = "text-emerald-400";
            feedbackLabel = "Excellent";
            feedbackLabelColor = "text-emerald-400";
        } else if (tacos < 15) {
            feedbackColor = "text-blue-400";
            feedbackLabel = "Good";
            feedbackLabelColor = "text-blue-400";
        } else if (tacos < 25) {
            feedbackColor = "text-yellow-400";
            feedbackLabel = "Fair";
            feedbackLabelColor = "text-yellow-400";
        } else {
            feedbackColor = "text-orange-400";
            feedbackLabel = "High";
            feedbackLabelColor = "text-orange-400";
        }
    }

    const formatCurrency = (val: number) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: currency,
            maximumFractionDigits: 0
        }).format(val);
    };

    return (
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
                                            Calculator Inputs
                                        </CardTitle>
                                        <TooltipProvider delayDuration={100}>
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
                                        </TooltipProvider>
                                    </div>
                                    <CardDescription>Enter your total advertising spend and total revenue.</CardDescription>
                                </div>
                                <div className="w-[180px]">
                                    <CurrencyCombobox value={currency} onValueChange={setCurrency} />
                                </div>
                            </CardHeader>
                            <CardContent className="space-y-6 pt-6">
                                <CalculatorInput
                                    label={`Total Ad Spend (${symbol})`}
                                    value={totalAdSpend}
                                    onChange={setTotalAdSpend}
                                    placeholder="5000"
                                    min={0}
                                    tooltip="Total amount spent on advertising across all channels (PPC, Social, etc.)."
                                />
                                <CalculatorInput
                                    label={`Total Revenue (${symbol})`}
                                    value={totalRevenue}
                                    onChange={setTotalRevenue}
                                    placeholder="50000"
                                    min={0}
                                />
                            </CardContent>
                        </Card>
                    </FadeIn>
                </div>

                {/* Results */}
                <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-8">
                    <FadeIn delay={0.4} direction="left">
                        <ResultFeedbackCard
                            title="Total ACoS (TACoS)"
                            mainValue={
                                <div className="flex items-baseline gap-1">
                                    <Counter
                                        value={tacos}
                                        formatter={(val) => val.toFixed(2)}
                                        className={`text-5xl font-bold tracking-tight ${feedbackColor}`}
                                    />
                                    <span className={`text-2xl font-bold ${feedbackColor}`}>%</span>
                                </div>
                            }
                            valueColor={feedbackColor}
                            mainMetricLabel="Health Check"
                            mainMetricValue={feedbackLabel}
                            mainMetricColor={feedbackLabelColor}
                        />
                    </FadeIn>
                </div>
            </div>
        </FadeIn>
    );
}
