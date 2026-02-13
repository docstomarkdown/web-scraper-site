"use client";

import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { HelpCircle, ShoppingBag } from "lucide-react";
import { FadeIn, Counter, CalculatorInput, ResultFeedbackCard } from "@/app/tools/_shared/components";
import { Tooltip, TooltipProvider, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";

export function MercariFeeCalculator() {
    const [salePrice, setSalePrice] = useState<number | "">(50);
    const [itemCost, setItemCost] = useState<number | "">(20);
    const [shippingCost, setShippingCost] = useState<number | "">(0);
    const [otherCosts, setOtherCosts] = useState<number | "">(0);

    const val = (v: number | "") => (v === "" ? 0 : v);

    // Calculations
    const price = val(salePrice);
    const cost = val(itemCost);
    const ship = val(shippingCost);
    const other = val(otherCosts);

    // Mercari Fees: 10% selling fee + 2.9% + $0.50 processing fee
    const merchFee = price * 0.10;
    const processingFee = price > 0 ? (price * 0.029) + 0.50 : 0;
    const totalFees = merchFee + processingFee;

    const totalExpenses = cost + ship + other + totalFees;
    const netProfit = price - totalExpenses;
    const margin = price > 0 ? (netProfit / price) * 100 : 0;
    const roi = (cost + ship + other) > 0 ? (netProfit / (cost + ship + other)) * 100 : 0;

    const formatCurrency = (v: number) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            maximumFractionDigits: 2
        }).format(v);
    };

    const scrollToGuide = () => {
        const element = document.getElementById('how-to-use');
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <FadeIn className="w-full max-w-6xl mx-auto py-8 px-4" duration={0.6}>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                {/* Left Column: Inputs */}
                <div className="lg:col-span-7">
                    <FadeIn delay={0.2} direction="right" className="h-full">
                        <Card className="border border-slate-200 shadow-sm bg-white">
                            <CardHeader className="pb-4 border-b border-slate-50 flex flex-row items-center justify-between space-y-0">
                                <div className="space-y-1">
                                    <div className="flex items-center gap-3">
                                        <CardTitle className="text-2xl font-bold text-blue-600">
                                            Listing Details
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
                                    <CardDescription>Enter your sales price and expenses.</CardDescription>
                                </div>
                            </CardHeader>
                            <CardContent className="space-y-6 pt-6">
                                <CalculatorInput
                                    label="Sale Price ($)"
                                    value={salePrice}
                                    onChange={setSalePrice}
                                    placeholder="50"
                                    tooltip="The price you plan to list the item for on Mercari."
                                />
                                <CalculatorInput
                                    label="Item Cost ($)"
                                    value={itemCost}
                                    onChange={setItemCost}
                                    placeholder="20"
                                    tooltip="The amount you paid for the item."
                                />
                                <CalculatorInput
                                    label="Shipping Cost ($)"
                                    value={shippingCost}
                                    onChange={setShippingCost}
                                    placeholder="0"
                                    tooltip="Shipping cost if you are paying for the label (Seller Pays)."
                                />
                                <CalculatorInput
                                    label="Other Expenses ($)"
                                    value={otherCosts}
                                    onChange={setOtherCosts}
                                    placeholder="0"
                                    tooltip="Any other costs like packaging or supplies."
                                />
                            </CardContent>
                        </Card>
                    </FadeIn>
                </div>

                {/* Right Column: Results */}
                <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-8">
                    <FadeIn delay={0.4} direction="left" className="space-y-6">
                        <ResultFeedbackCard
                            title="Net Profit"
                            titleLabel="Live"
                            labelClassName="text-emerald-400 bg-slate-800/50 border-slate-700/50"
                            mainValue={<Counter value={netProfit} formatter={formatCurrency} />}
                            valueColor={netProfit >= 0 ? "text-emerald-400" : "text-red-400"}
                            mainMetricLabel="Status"
                            mainMetricValue={price > 0 ? (netProfit >= 0 ? "PROFITABLE" : "LOSS") : "WAITING"}
                            mainMetricColor={netProfit >= 0 ? "text-emerald-400" : "text-red-400"}
                            secondaryMetrics={[
                                {
                                    label: "Total Fees",
                                    value: <Counter value={totalFees} formatter={formatCurrency} />,
                                    color: "text-slate-400"
                                },
                                {
                                    label: "Margin",
                                    value: <>{margin.toFixed(1)}%</>,
                                    color: "text-slate-300"
                                }
                            ]}
                        />

                        <div className="grid grid-cols-2 gap-3">
                            <ResultCard
                                title="Mercari Fee (10%)"
                                value={<Counter value={merchFee} formatter={formatCurrency} />}
                                tooltip="10% selling fee based on the item price."
                            />
                            <ResultCard
                                title="Processing Fee"
                                value={<Counter value={processingFee} formatter={formatCurrency} />}
                                tooltip="2.9% + $0.50 payment processing fee."
                            />
                            <ResultCard
                                title="ROI"
                                value={<>{roi.toFixed(1)}%</>}
                                tooltip="Return on Investment (Profit / Total Investment Costs)."
                            />
                            <ResultCard
                                title="Costs Total"
                                value={<Counter value={cost + ship + other} formatter={formatCurrency} />}
                                tooltip="Sum of product, shipping, and other expenses."
                            />
                        </div>

                        <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm text-sm text-slate-600 leading-relaxed">
                            Selling at <strong>{formatCurrency(price)}</strong> with costs of <strong>{formatCurrency(cost + ship + other)}</strong> leaves you with a net profit of <strong>{formatCurrency(netProfit)}</strong> after Mercari's fees.
                        </div>
                    </FadeIn>
                </div>
            </div>
        </FadeIn>
    );
}

function ResultCard({ title, value, tooltip }: { title: string, value: React.ReactNode, tooltip?: string }) {
    return (
        <div className="p-4 rounded-xl border bg-white border-slate-200 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-lg cursor-default">
            <div className="flex items-center gap-1.5 mb-1">
                <p className="text-xs font-semibold text-slate-500">{title}</p>
                {tooltip && (
                    <TooltipProvider delayDuration={100}>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <div className="text-slate-400 hover:text-blue-600 transition-colors">
                                    <ShoppingBag className="h-3 w-3" />
                                </div>
                            </TooltipTrigger>
                            <TooltipContent side="top" className="max-w-xs text-xs bg-slate-900 text-white border-slate-800">
                                {tooltip}
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                )}
            </div>
            <p className="text-xl font-bold text-slate-800">{value}</p>
        </div>
    );
}
