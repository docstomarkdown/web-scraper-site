"use client"
import React from "react"
import { Card } from "@/components/ui/card"
import { PieChart as RechartsPie, Pie, Cell, ResponsiveContainer } from "recharts"
import { PieChart } from "lucide-react"
import { cn } from "@/lib/utils"

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
    className?: string
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
    formatCurrency,
    className
}: BudgetAllocationProps) {
    const data = [
        { name: "Influencer Fee", value: fee, color: "#3b82f6" },
        { name: "Ad Spend", value: adSpend, color: "#10b981" },
        { name: "Product Costs", value: productCost, color: "#f59e0b" },
        { name: "Shipping Costs", value: shippingCost, color: "#a855f7" },
    ].filter(i => i.value > 0)
    return (
        <Card className={cn("border border-slate-200/60 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] bg-[#F5F8FD] rounded-2xl p-5 flex flex-col gap-5", className)}>
            <div className="flex items-center gap-2.5 pb-2 border-b border-slate-200/50">
                <div className="flex items-center justify-center w-7 h-7 rounded-lg bg-blue-600/10 border border-blue-100/50">
                    <PieChart className="w-3.5 h-3.5 text-blue-600" />
                </div>
                <span className="text-[14px] sm:text-[15px] font-bold text-blue-700 leading-none">
                    Budget Split
                </span>
            </div>
            
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
                        <div className="absolute inset-0 flex items-center justify-center text-center p-4 text-slate-400 text-[10.5px] leading-tight font-medium border-2 border-dashed border-slate-200/70 rounded-full bg-slate-50/40">
                            Add data to see budget split
                        </div>
                    )}
                    {/* Center Label */}
                    {totalCost > 0 && (
                        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                            <span className="text-[11px] font-medium text-slate-400">Costs</span>
                            <span className="text-xs font-bold text-slate-900">{formatCurrency(totalCost)}</span>
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
                        <div key={item.label} className="flex items-center justify-between text-[11px] px-3 bg-white border border-slate-100 rounded-lg py-1.5 shadow-sm">
                            <div className="flex items-center gap-2 shrink-0">
                                <div className={`w-2 h-2 rounded-full ${item.color} shrink-0`} />
                                <span className="text-slate-600 font-bold whitespace-nowrap">{item.label}</span>
                            </div>
                            <div className="flex items-center gap-3 shrink-0 ml-4">
                                <span className="text-slate-500 font-semibold tabular-nums min-w-[50px] text-right">{formatCurrency(item.value)}</span>
                                <span className="font-extrabold text-slate-900 tabular-nums min-w-[32px] text-right">{item.pct.toFixed(0)}%</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </Card>
    )
}
