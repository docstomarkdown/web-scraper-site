"use client"
import React from "react"
import { Card } from "@/components/ui/card"
import { PieChart as RechartsPie, Pie, Cell, ResponsiveContainer } from "recharts"
import { Wallet } from "lucide-react"
interface BudgetAllocationProps {
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
export function BudgetAllocation({
    fee,
    adSpend,
    productCost,
    shippingCost,
    totalCost,
    feePct,
    adPct,
    productPct,
    shippingPct,
    formatCurrency
}: BudgetAllocationProps) {
    const data = [
        { name: "Influencer Fee", value: fee, color: "#3b82f6" },
        { name: "Ad Spend", value: adSpend, color: "#10b981" },
        { name: "Product Costs", value: productCost, color: "#f59e0b" },
        { name: "Shipping Costs", value: shippingCost, color: "#a855f7" },
    ].filter(i => i.value > 0)
    return (
        <Card className="border border-slate-200 shadow-xl shadow-slate-200/40 bg-white rounded-3xl p-5 flex flex-col gap-5">
            <h4 className="text-sm font-bold text-slate-700 flex items-center gap-2">
                <Wallet className="w-4 h-4 text-blue-500" />
                Budget Allocation
            </h4>
            <div className="flex flex-col sm:flex-row items-center gap-6">
                {/* Left: Chart */}
                <div className="h-[140px] w-[140px] relative shrink-0">
                    {totalCost > 0 ? (
                        <ResponsiveContainer width="100%" height="100%">
                            <RechartsPie>
                                <Pie
                                    data={data}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={45}
                                    outerRadius={60}
                                    paddingAngle={5}
                                    dataKey="value"
                                    stroke="none"
                                >
                                    {data.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                </Pie>
                            </RechartsPie>
                        </ResponsiveContainer>
                    ) : (
                        <div className="absolute inset-0 flex items-center justify-center text-center p-4 text-slate-400 text-[10.5px] leading-tight font-medium border-2 border-dashed border-slate-100 rounded-full bg-slate-50/40">
                            Add data to see your Budget split
                        </div>
                    )}
                    {/* Center Label */}
                    {totalCost > 0 && (
                        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                            <span className="text-[11px] font-medium text-slate-400">Total</span>
                            <span className="text-sm font-bold text-slate-900">{formatCurrency(totalCost)}</span>
                        </div>
                    )}
                </div>
                {/* Right: Legend */}
                <div className="flex-1 w-full flex flex-col gap-2">
                    {[
                        { label: "Influencer Fee", value: fee, pct: feePct, color: "bg-blue-500" },
                        { label: "Ad Spend", value: adSpend, pct: adPct, color: "bg-emerald-500" },
                        { label: "Product Costs", value: productCost, pct: productPct, color: "bg-amber-500" },
                        { label: "Shipping Costs", value: shippingCost, pct: shippingPct, color: "bg-purple-500" },
                    ].map((item) => (
                        <div key={item.label} className="flex items-center justify-between text-[11px] px-3 bg-slate-50 rounded-lg py-1.5">
                            <div className="flex items-center gap-2 shrink-0">
                                <div className={`w-2 h-2 rounded-full ${item.color} shrink-0`} />
                                <span className="text-slate-600 font-medium whitespace-nowrap">{item.label}</span>
                            </div>
                            <div className="flex items-center gap-3 shrink-0 ml-4">
                                <span className="text-slate-400 font-medium tabular-nums min-w-[50px] text-right">{formatCurrency(item.value)}</span>
                                <span className="font-bold text-slate-900 tabular-nums min-w-[32px] text-right">{item.pct.toFixed(0)}%</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </Card>
    )
}
