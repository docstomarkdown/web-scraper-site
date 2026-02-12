"use client"

import React, { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { HelpCircle, RefreshCw, TrendingUp, TrendingDown, ArrowRight } from "lucide-react"
import { FadeIn, Counter, CalculatorInput, ResultFeedbackCard } from "@/app/tools/_shared/components"
import { CurrencyCombobox } from "@/components/ui/currency-combobox"
import { Separator } from "@/components/ui/separator"

export function PriceElasticityCalculator() {
    const [currency, setCurrency] = useState("USD")
    const [initialPrice, setInitialPrice] = useState<number | "">("")
    const [finalPrice, setFinalPrice] = useState<number | "">("")
    const [initialQuantity, setInitialQuantity] = useState<number | "">("")
    const [finalQuantity, setFinalQuantity] = useState<number | "">("")

    const scrollToGuide = () => {
        const element = document.getElementById('how-to-use');
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const val = (v: number | "") => (v === "" ? 0 : v)

    const formatCurrency = (val: number) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: currency,
            maximumFractionDigits: 0
        }).format(val)
    }

    // --- Calculations ---
    const p1 = val(initialPrice)
    const p2 = val(finalPrice)
    const q1 = val(initialQuantity)
    const q2 = val(finalQuantity)

    const percentChangePrice = p1 > 0 ? ((p2 - p1) / p1) : 0
    const percentChangeQuantity = q1 > 0 ? ((q2 - q1) / q1) : 0

    const ped = percentChangePrice !== 0 ? (percentChangeQuantity / percentChangePrice) : 0
    const absolutePed = Math.abs(ped)

    let elasticityType = "Unitary Elastic"
    let elasticityColor = "text-blue-400"
    let elasticityBg = "bg-blue-500/10"
    let elasticityDescription = "Demand changes proportionally to price."

    if (absolutePed > 1) {
        elasticityType = "Elastic Demand"
        elasticityColor = "text-orange-400"
        elasticityBg = "bg-orange-500/10"
        elasticityDescription = "Consumers are highly sensitive to price changes."
    } else if (absolutePed < 1 && absolutePed > 0) {
        elasticityType = "Inelastic Demand"
        elasticityColor = "text-emerald-400"
        elasticityBg = "bg-emerald-500/10"
        elasticityDescription = "Demand is relatively stable despite price changes."
    } else if (absolutePed === 0 && (p1 > 0 || q1 > 0)) {
        elasticityType = "Perfectly Inelastic"
        elasticityColor = "text-slate-400"
        elasticityBg = "bg-slate-500/10"
        elasticityDescription = "Demand does not change with price."
    }

    const initialRevenue = p1 * q1
    const finalRevenue = p2 * q2
    const revenueChange = finalRevenue - initialRevenue
    const revenueChangePercent = initialRevenue > 0 ? (revenueChange / initialRevenue) * 100 : 0

    return (
        <FadeIn className="w-full max-w-6xl mx-auto py-8 px-4" duration={0.6}>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

                {/* Inputs Section */}
                <div className="lg:col-span-7 space-y-6">
                    <Card className="border border-slate-200 shadow-sm bg-white">
                        <CardHeader className="pb-4 border-b border-slate-50 flex flex-row items-center justify-between space-y-0">
                            <div className="space-y-1">
                                <div className="flex items-center gap-2">
                                    <CardTitle className="text-xl font-bold text-slate-800">
                                        Market Data
                                    </CardTitle>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        onClick={scrollToGuide}
                                        className="text-slate-400 hover:text-slate-900 hover:bg-slate-100 h-6 w-6 rounded-full"
                                    >
                                        <HelpCircle className="w-4 h-4" />
                                    </Button>
                                </div>
                                <CardDescription>Enter price and quantity changes.</CardDescription>
                            </div>
                            <div className="w-[120px]">
                                <CurrencyCombobox value={currency} onValueChange={setCurrency} />
                            </div>
                        </CardHeader>
                        <CardContent className="space-y-5 pt-6">
                            <CalculatorInput
                                label="Initial price"
                                value={initialPrice}
                                onChange={setInitialPrice}
                                placeholder="50.00"
                                min={0}
                                tooltip="The starting price of the product."
                            />
                            <CalculatorInput
                                label="Initial quantity"
                                value={initialQuantity}
                                onChange={setInitialQuantity}
                                placeholder="1000"
                                min={0}
                                tooltip="Units sold at the initial price."
                            />
                            <CalculatorInput
                                label="Final price"
                                value={finalPrice}
                                onChange={setFinalPrice}
                                placeholder="45.00"
                                min={0}
                                tooltip="The new price after adjustment."
                            />
                            <CalculatorInput
                                label="Final quantity"
                                value={finalQuantity}
                                onChange={setFinalQuantity}
                                placeholder="1200"
                                min={0}
                                tooltip="Units sold at the new price."
                            />

                            <Separator className="my-2" />

                            <div className="space-y-4 pt-2">
                                <ReadOnlyField
                                    label="Price elasticity of demand"
                                    value={absolutePed.toFixed(2)}
                                />
                                <ReadOnlyField
                                    label="Initial revenue"
                                    value={formatCurrency(initialRevenue)}
                                />
                                <ReadOnlyField
                                    label="Final revenue"
                                    value={formatCurrency(finalRevenue)}
                                />
                                <ReadOnlyField
                                    label="Revenue increase"
                                    value={`${revenueChangePercent >= 0 ? "+" : ""}${revenueChangePercent.toFixed(1)}%`}
                                    color={revenueChangePercent >= 0 ? "text-emerald-600" : "text-red-500"}
                                />
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Results Section */}
                <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-8">
                    <ResultFeedbackCard
                        title="Price Elasticity of Demand (PED)"
                        titleLabel="Score"
                        labelClassName="bg-indigo-500/10 text-indigo-400"
                        mainValue={
                            <div className="flex items-baseline gap-2">
                                <Counter value={absolutePed} formatter={(v) => v.toFixed(2)} />
                                <span className={`text-lg font-medium px-3 py-1 rounded-full ${elasticityBg} ${elasticityColor}`}>
                                    {elasticityType}
                                </span>
                            </div>
                        }
                        valueColor="text-white"
                        mainMetricLabel="Revenue Impact"
                        mainMetricValue={
                            <div className="flex items-center gap-1">
                                {revenueChange >= 0 ? "+" : ""}{formatCurrency(revenueChange)}
                                <span className={`text-sm font-normal ml-1 ${revenueChange >= 0 ? "text-emerald-400" : "text-red-400"}`}>
                                    ({revenueChangePercent >= 0 ? "+" : ""}{revenueChangePercent.toFixed(1)}%)
                                </span>
                            </div>
                        }
                        mainMetricColor={revenueChange >= 0 ? "text-emerald-400" : "text-red-400"}
                        secondaryMetrics={[
                            {
                                label: "Price Change",
                                value: `${percentChangePrice >= 0 ? "+" : ""}${(percentChangePrice * 100).toFixed(1)}%`,
                                color: percentChangePrice > 0 ? "text-slate-400" : "text-emerald-400"
                            },
                            {
                                label: "Quantity Change",
                                value: `${percentChangeQuantity >= 0 ? "+" : ""}${(percentChangeQuantity * 100).toFixed(1)}%`,
                                color: percentChangeQuantity > 0 ? "text-emerald-400" : "text-red-400"
                            }
                        ]}
                    />

                    {/* Interpretation Card */}
                    <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
                        <div className="flex items-start gap-4">
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${elasticityBg}`}>
                                {absolutePed > 1 ? (
                                    <TrendingDown className={`w-5 h-5 ${elasticityColor}`} />
                                ) : (
                                    <TrendingUp className={`w-5 h-5 ${elasticityColor}`} />
                                )}
                            </div>
                            <div>
                                <h4 className="font-semibold text-slate-800 mb-1">Interpretation</h4>
                                <p className="text-slate-600 leading-relaxed mb-3">
                                    {elasticityDescription}
                                </p>
                                <div className="text-sm bg-slate-50 p-3 rounded-lg border border-slate-100 text-slate-500">
                                    <strong>Recommendation: </strong>
                                    {absolutePed > 1
                                        ? "Lowering prices may significantly increase volume and total revenue."
                                        : "Increasing prices may increase revenue as volume drop-off is minimal."
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </FadeIn>
    )
}

function ReadOnlyField({ label, value, color = "text-slate-700" }: { label: string, value: string, color?: string }) {
    return (
        <div className="flex items-center justify-between gap-4 py-1">
            <span className="text-sm font-medium text-slate-500">{label}</span>
            <span className={`text-lg font-bold ${color}`}>{value}</span>
        </div>
    )
}
