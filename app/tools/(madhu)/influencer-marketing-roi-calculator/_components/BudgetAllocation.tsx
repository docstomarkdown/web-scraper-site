"use client"

import React from "react"
import { Card } from "@/components/ui/card"
import { PieChart as RechartsPie, Pie, Cell, ResponsiveContainer, Tooltip as RechartsTooltip } from "recharts"
import { Wallet, Info } from "lucide-react"

interface BudgetAllocationProps {
    fee: number
    boost: number
    productAndShipping: number
    mgmtAndRights: number
    totalInvestment: number
    feePct: number
    boostPct: number
    productPct: number
    managementPct: number
    formatCurrency: (val: number) => string
}

export function BudgetAllocation({
    fee,
    boost,
    productAndShipping,
    mgmtAndRights,
    totalInvestment,
    feePct,
    boostPct,
    productPct,
    managementPct,
    formatCurrency
}: BudgetAllocationProps) {
    const data = [
        { name: "Influencer Fee", value: fee, color: "#3b82f6" },
        { name: "Ad Boosting", value: boost, color: "#10b981" },
        { name: "Product & Logistics", value: productAndShipping, color: "#f59e0b" },
        { name: "Management & Rights", value: mgmtAndRights, color: "#a855f7" },
    ].filter(i => i.value > 0)

    return (
        <Card className="bg-white border-slate-200 shadow-sm rounded-2xl overflow-hidden p-4 flex flex-col">
            <h4 className="text-sm font-bold text-slate-700 mb-4 flex items-center gap-2">
                <Wallet className="w-4 h-4 text-blue-500" />
                Budget Allocation
            </h4>

            <div className="flex items-center gap-4 min-h-0">
                {/* Left: Chart */}
                <div className="h-[140px] w-[140px] relative shrink-0">
                    {totalInvestment > 0 ? (
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
                                <RechartsTooltip
                                    formatter={(value: number) => formatCurrency(value)}
                                    contentStyle={{
                                        backgroundColor: '#fff',
                                        border: 'none',
                                        borderRadius: '12px',
                                        boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
                                        padding: '8px 12px',
                                        fontSize: '12px',
                                        fontWeight: '600',
                                        color: '#1e293b'
                                    }}
                                    itemStyle={{ color: '#1e293b' }}
                                    labelStyle={{ display: 'none' }}
                                />
                            </RechartsPie>
                        </ResponsiveContainer>
                    ) : (
                        <div className="absolute inset-0 flex items-center justify-center text-slate-300 text-sm border-2 border-dashed border-slate-100 rounded-full">
                            No data
                        </div>
                    )}
                    {/* Center Label */}
                    {totalInvestment > 0 && (
                        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                            <span className="text-[10px] font-medium text-slate-400">Total</span>
                            <span className="text-xs font-bold text-slate-900">{formatCurrency(totalInvestment)}</span>
                        </div>
                    )}
                </div>

                {/* Right: Legend */}
                <div className="flex-1 grid grid-cols-1 gap-2">
                    <div className="flex items-center justify-between text-[10px] px-2 bg-slate-50 rounded-lg py-1.5">
                        <div className="flex items-center gap-1.5 truncate">
                            <div className="w-2 h-2 rounded-full bg-blue-500 shrink-0" />
                            <span className="text-slate-600 font-medium truncate">Influencer Fees</span>
                        </div>
                        <span className="font-bold text-slate-900 ml-1">{feePct.toFixed(0)}%</span>
                    </div>
                    <div className="flex items-center justify-between text-[10px] px-2 bg-slate-50 rounded-lg py-1.5">
                        <div className="flex items-center gap-1.5 truncate">
                            <div className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" />
                            <span className="text-slate-600 font-medium truncate">Ad Boosting</span>
                        </div>
                        <span className="font-bold text-slate-900 ml-1">{boostPct.toFixed(0)}%</span>
                    </div>
                    <div className="flex items-center justify-between text-[10px] px-2 bg-slate-50 rounded-lg py-1.5">
                        <div className="flex items-center gap-1.5 truncate">
                            <div className="w-2 h-2 rounded-full bg-amber-500 shrink-0" />
                            <span className="text-slate-600 font-medium truncate">Product & Logistics</span>
                        </div>
                        <span className="font-bold text-slate-900 ml-1">{productPct.toFixed(0)}%</span>
                    </div>
                    <div className="flex items-center justify-between text-[10px] px-2 bg-slate-50 rounded-lg py-1.5">
                        <div className="flex items-center gap-1.5 truncate">
                            <div className="w-2 h-2 rounded-full bg-purple-500 shrink-0" />
                            <span className="text-slate-600 font-medium truncate">Management & Rights</span>
                        </div>
                        <span className="font-bold text-slate-900 ml-1">{managementPct.toFixed(0)}%</span>
                    </div>
                </div>
            </div>
        </Card>
    )
}
