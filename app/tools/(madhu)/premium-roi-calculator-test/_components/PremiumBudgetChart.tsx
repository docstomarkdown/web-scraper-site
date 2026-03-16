"use client"
import React from "react"
import { Card } from "@/components/ui/card"
import { PieChart as RechartsPie, Pie, Cell, ResponsiveContainer } from "recharts"
import { PieChart } from "lucide-react"

interface PremiumBudgetChartProps {
    fee: number
    adSpend: number
    productCost: number
    shippingCost: number
    totalCost: number
    feePct: number
    adPct: number
    productPct: number
    shippingPct: number
    formatCurrency: (val: number) => string
}

// Original multi-color scheme
const CHART_COLORS = [
    { name: "Influencer Fee", key: "fee", fill: "#3b82f6", dot: "bg-blue-500" }, // blue-500
    { name: "Ad Spend", key: "ad", fill: "#10b981", dot: "bg-emerald-500" }, // emerald-500
    { name: "Product Costs", key: "product", fill: "#8b5cf6", dot: "bg-violet-500" }, // violet-500
    { name: "Shipping Costs", key: "shipping", fill: "#f59e0b", dot: "bg-amber-500" }, // amber-500
]

export function PremiumBudgetChart({
    fee, adSpend, productCost, shippingCost, totalCost,
    feePct, adPct, productPct, shippingPct, formatCurrency
}: PremiumBudgetChartProps) {
    const values = [fee, adSpend, productCost, shippingCost]
    const pcts = [feePct, adPct, productPct, shippingPct]
    const data = CHART_COLORS.map((c, i) => ({ name: c.name, value: values[i], color: c.fill })).filter(d => d.value > 0)

    return (
        <Card className="border border-slate-200/60 shadow-xl shadow-slate-200/30 bg-white rounded-3xl p-5 flex flex-col gap-5 overflow-hidden relative">
            <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-slate-100 to-slate-50 border border-slate-200/60 flex items-center justify-center">
                    <PieChart className="w-4 h-4 text-slate-500" />
                </div>
                <h4 className="text-sm font-bold text-slate-700">Budget Allocation</h4>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-6">
                {/* Chart */}
                <div className="h-[140px] w-[140px] relative shrink-0">
                    {totalCost > 0 ? (
                        <ResponsiveContainer width="100%" height="100%">
                            <RechartsPie>
                                <Pie data={data} cx="50%" cy="50%" innerRadius={45} outerRadius={60} paddingAngle={4} dataKey="value" stroke="none">
                                    {data.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                </Pie>
                            </RechartsPie>
                        </ResponsiveContainer>
                    ) : (
                        <div className="absolute inset-0 flex items-center justify-center text-center p-4 text-slate-400 text-[10.5px] leading-tight font-medium border-2 border-dashed border-slate-100 rounded-full bg-slate-50/40">
                            Add data to see split
                        </div>
                    )}
                    {totalCost > 0 && (
                        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                            <span className="text-[10px] font-medium text-slate-400">Total</span>
                            <span className="text-[13px] font-bold text-slate-800">{formatCurrency(totalCost)}</span>
                        </div>
                    )}
                </div>

                {/* Legend */}
                <div className="flex-1 w-full flex flex-col gap-2">
                    {CHART_COLORS.map((item, i) => (
                        <div key={item.key} className="flex items-center justify-between text-[11px] px-3 bg-slate-50/80 rounded-lg py-2 hover:bg-slate-100/60 transition-colors">
                            <div className="flex items-center gap-2 shrink-0">
                                <div className={`w-2.5 h-2.5 rounded-full ${item.dot} shrink-0`} />
                                <span className="text-slate-600 font-medium whitespace-nowrap">{item.name}</span>
                            </div>
                            <div className="flex items-center gap-3 shrink-0 ml-4">
                                <span className="text-slate-400 font-medium tabular-nums min-w-[50px] text-right">{formatCurrency(values[i])}</span>
                                <span className="font-bold text-slate-800 tabular-nums min-w-[32px] text-right">{pcts[i].toFixed(0)}%</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </Card>
    )
}
