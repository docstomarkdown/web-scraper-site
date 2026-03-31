"use client"
import React, { useMemo } from "react"
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip as RechartsTooltip } from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { PieChart as PieChartIcon, Info } from "lucide-react"

interface MercariFeeBreakdownProps {
    price: number;
    cost: number;
    ship: number;
    other: number;
    totalFees: number;
    netProfit: number;
    currency?: string;
}

export function MercariFeeBreakdown({
    price,
    cost,
    ship,
    other,
    totalFees,
    netProfit,
    currency = "USD"
}: MercariFeeBreakdownProps) {
    const isReady = price > 0;

    const data = useMemo(() => {
        if (!isReady) return [];
        
        // Ensure values don't disappear when hitting zero by using Math.max(0, val)
        const safeProfit = Math.max(0, netProfit);
        const safeCosts = Math.max(0, cost + ship + other);
        const safeFees = Math.max(0, totalFees);

        return [
            { name: "Net Profit", value: safeProfit, color: "#10b981" },
            { name: "Costs & Shipping", value: safeCosts, color: "#94a3b8" },
            { name: "Mercari Fees", value: safeFees, color: "#f43f5e" }
        ].filter(item => item.value > 0); // Remove completely zero entries from visual
    }, [isReady, netProfit, cost, ship, other, totalFees]);

    const formatCurrency = (val: number) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: currency
        }).format(val);
    };

    const renderEmptyState = () => (
        <div className="flex flex-col items-center justify-center p-8 bg-slate-50 rounded-xl border border-dashed border-slate-200 h-[300px] mt-4">
            <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mb-4">
                <PieChartIcon className="w-8 h-8 text-slate-400" />
            </div>
            <h4 className="text-sm font-semibold text-slate-700 mb-1">Waiting for details</h4>
            <p className="text-xs text-slate-500 text-center max-w-[200px]">
                Enter your item metrics to see your breakdown chart.
            </p>
        </div>
    );

    return (
        <Card className="border border-slate-200 shadow-sm bg-white overflow-hidden">
            <CardHeader className="bg-slate-50/50 border-b border-slate-100 pb-4">
                <div className="flex items-center justify-between">
                    <CardTitle className="text-base font-semibold text-slate-800 flex items-center gap-2">
                        <PieChartIcon className="w-5 h-5 text-indigo-500" />
                        Profit & Fee Breakdown
                    </CardTitle>
                </div>
                <p className="text-sm text-slate-500 mt-1">
                    Visualizing where the money from your sale goes.
                </p>
            </CardHeader>
            <CardContent className="p-6">
                {!isReady ? renderEmptyState() : (
                    <div className="space-y-6">
                        <div className="h-[250px] w-full mt-4">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={data}
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={70}
                                        outerRadius={90}
                                        paddingAngle={4}
                                        dataKey="value"
                                        stroke="none"
                                    >
                                        {data.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={entry.color} />
                                        ))}
                                    </Pie>
                                    <RechartsTooltip 
                                        formatter={(value: number) => formatCurrency(value)}
                                        contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                                    />
                                    <Legend 
                                        verticalAlign="bottom" 
                                        height={36} 
                                        iconType="circle"
                                        formatter={(value, entry: any) => (
                                            <span className="text-xs font-medium text-slate-600 ml-1">{value}</span>
                                        )}
                                    />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                        
                        <div className="grid grid-cols-1 divide-y divide-slate-100 border border-slate-100 rounded-lg overflow-hidden bg-slate-50/30">
                            <div className="flex justify-between items-center p-3">
                                <span className="text-sm text-slate-600">Sale Price</span>
                                <span className="text-sm font-semibold text-slate-800">{formatCurrency(price)}</span>
                            </div>
                            <div className="flex justify-between items-center p-3">
                                <span className="text-sm text-slate-600 flex items-center gap-1">
                                    Mercari Fees
                                    <Info className="w-3.5 h-3.5 text-slate-400" />
                                </span>
                                <span className="text-sm font-semibold text-rose-500">- {formatCurrency(totalFees)}</span>
                            </div>
                            <div className="flex justify-between items-center p-3">
                                <span className="text-sm text-slate-600">Item Cost & Shipping</span>
                                <span className="text-sm font-semibold text-slate-500">- {formatCurrency(cost + ship + other)}</span>
                            </div>
                            <div className="flex justify-between items-center p-3 bg-emerald-50/50">
                                <span className="text-sm font-bold text-emerald-700">Net Profit</span>
                                <span className="text-sm font-bold text-emerald-600">{formatCurrency(netProfit)}</span>
                            </div>
                        </div>
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
