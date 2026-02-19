"use client"

import React, { useState } from "react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { RefreshCw, TrendingUp, TrendingDown, ArrowRight } from "lucide-react"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"
import { CalculatorCardHeader, CalculatorInput, Counter, CurrencyCombobox, FadeIn, ResultFeedbackCard } from "@/app/tools/_shared/components"

export function PriceElasticityCalculator() {
    const [currency, setCurrency] = useState("USD")
    const [initialPrice, setInitialPrice] = useState<number | "">("")
    const [finalPrice, setFinalPrice] = useState<number | "">("")
    const [initialQuantity, setInitialQuantity] = useState<number | "">("")
    const [finalQuantity, setFinalQuantity] = useState<number | "">("")
    const handleReset = () => {
        setInitialPrice("")
        setFinalPrice("")
        setInitialQuantity("")
        setFinalQuantity("")
    }

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
                        <CalculatorCardHeader

                            description="Enter price and quantity changes."

                            onReset={handleReset}

                        />
                        <CardContent className="space-y-5 pt-6">
                            {/* Group 1: Starting Position */}
                            <div className="space-y-3">
                                <h3 className="text-sm font-semibold text-slate-900 flex items-center gap-2">
                                    <span className="w-6 h-6 rounded-full bg-slate-100 text-slate-500 flex items-center justify-center text-xs font-bold">1</span>
                                    Starting Position
                                </h3>
                                <div className="space-y-4">
                                    <CalculatorInput
                                        label="Initial Price"
                                        value={initialPrice}
                                        onChange={setInitialPrice}
                                        placeholder="50.00"
                                        min={0}
                                    />
                                    <CalculatorInput
                                        label="Initial Quantity"
                                        value={initialQuantity}
                                        onChange={setInitialQuantity}
                                        placeholder="1000"
                                        min={0}
                                    />
                                </div>
                            </div>

                            <Separator className="my-2" />

                            {/* Group 2: New Scenario */}
                            <div className="space-y-3">
                                <h3 className="text-sm font-semibold text-slate-900 flex items-center gap-2">
                                    <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xs font-bold">2</span>
                                    New Scenario
                                </h3>
                                <div className="space-y-4">
                                    <CalculatorInput
                                        label="Final Price"
                                        value={finalPrice}
                                        onChange={setFinalPrice}
                                        placeholder="45.00"
                                        min={0}
                                    />
                                    <CalculatorInput
                                        label="Final Quantity"
                                        value={finalQuantity}
                                        onChange={setFinalQuantity}
                                        placeholder="1200"
                                        min={0}
                                    />
                                </div>
                            </div>

                            <Separator className="my-2" />

                            {/* Quick Stats */}
                            <div className="grid grid-cols-2 gap-4 pt-2">
                                <div className="bg-slate-50 p-3 rounded-lg border border-slate-100">
                                    <div className="text-xs text-slate-500 font-medium mb-1">Initial Revenue</div>
                                    <div className="text-lg font-bold text-slate-700">{formatCurrency(initialRevenue)}</div>
                                </div>
                                <div className="bg-blue-50/50 p-3 rounded-lg border border-blue-100">
                                    <div className="text-xs text-blue-600 font-medium mb-1">Final Revenue</div>
                                    <div className="text-lg font-bold text-blue-700">{formatCurrency(finalRevenue)}</div>
                                </div>
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

                    {/* Breakdown Card */}
                    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden border-l-4 border-l-blue-500">
                        <div className="px-5 py-3.5 border-b border-slate-100">
                            <p className="text-xs font-bold text-slate-600 uppercase tracking-wider">Elasticity Analysis</p>
                        </div>
                        <div className="divide-y divide-slate-100">
                            <div className="flex justify-between items-center px-5 py-3.5">
                                <span className="text-sm text-slate-600">% Change in Price</span>
                                <span className={cn("text-sm font-semibold", percentChangePrice > 0 ? "text-slate-800" : "text-emerald-600")}>
                                    {percentChangePrice > 0 ? "+" : ""}{(percentChangePrice * 100).toFixed(1)}%
                                </span>
                            </div>
                            <div className="flex justify-between items-center px-5 py-3.5">
                                <span className="text-sm text-slate-600">% Change in Demand</span>
                                <span className={cn("text-sm font-semibold", percentChangeQuantity >= 0 ? "text-emerald-600" : "text-red-600")}>
                                    {percentChangeQuantity > 0 ? "+" : ""}{(percentChangeQuantity * 100).toFixed(1)}%
                                </span>
                            </div>
                            <div className="flex justify-between items-center px-5 py-3.5 bg-blue-50/20">
                                <span className="text-sm font-bold text-slate-900">Revenue Impact</span>
                                <span className={cn("text-base font-bold", revenueChange >= 0 ? "text-emerald-600" : "text-red-600")}>
                                    {revenueChange >= 0 ? "+" : ""}{formatCurrency(revenueChange)}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Interpretation Card */}
                    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                        {/* Elasticity Visual Scale */}
                        <div className="p-6 pb-2">
                            <div className="flex items-center justify-between text-xs font-semibold text-slate-400 mb-2">
                                <span>Inelastic</span>
                                <span>Unitary</span>
                                <span>Elastic</span>
                            </div>
                            <div className="relative h-4 rounded-full bg-gradient-to-r from-emerald-400 via-blue-400 to-orange-400 w-full">
                                {/* Marker */}
                                <div
                                    className="absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-white border-2 border-slate-600 rounded-full shadow-md transition-all duration-500"
                                    style={{
                                        left: `${Math.min(Math.max((absolutePed / 3) * 100, 0), 100)}%`
                                    }}
                                />
                            </div>
                            <div className="flex justify-between text-[10px] text-slate-300 mt-1 font-mono">
                                <span>0</span>
                                <span>1</span>
                                <span>3+</span>
                            </div>
                        </div>

                        <div className="p-6 pt-2">
                            <div className="flex items-start gap-4">
                                <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${elasticityBg}`}>
                                    {absolutePed > 1 ? (
                                        <TrendingDown className={`w-5 h-5 ${elasticityColor}`} />
                                    ) : (
                                        <TrendingUp className={`w-5 h-5 ${elasticityColor}`} />
                                    )}
                                </div>
                                <div className="flex-1">
                                    <h4 className="font-semibold text-slate-800 mb-1">Interpretation</h4>
                                    <p className="text-sm text-slate-600 leading-relaxed mb-4">
                                        {elasticityDescription}
                                    </p>

                                    <div className={`text-sm p-4 rounded-xl border ${absolutePed > 1 ? "bg-orange-50 border-orange-100 text-orange-800" : "bg-emerald-50 border-emerald-100 text-emerald-800"}`}>
                                        <div className="flex items-center gap-2 font-bold mb-1">
                                            <ArrowRight className="w-4 h-4" />
                                            Recommendation
                                        </div>
                                        <p className="opacity-90 leading-snug">
                                            {absolutePed > 1
                                                ? "Lowering prices may significantly increase volume and total revenue."
                                                : "Increasing prices may increase revenue as volume drop-off is minimal."
                                            }
                                        </p>
                                    </div>
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
