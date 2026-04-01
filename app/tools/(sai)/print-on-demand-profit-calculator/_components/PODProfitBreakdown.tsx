"use client"
import React from "react"
import { Card } from "@/components/ui/card"
import { PieChart as RechartsPie, Pie, Cell, ResponsiveContainer } from "recharts"
import { PieChart, BarChart2 } from "lucide-react"
import { cn } from "@/lib/utils"

interface PODProfitBreakdownProps {
    netProfit: number
    platformFee: number
    transactionFee: number
    paymentProcessingFee: number
    offsiteAdFee: number
    productCost: number
    shippingCost: number
    totalRevenue: number
    currency: string
    className?: string
}

export function PODProfitBreakdown({
    netProfit,
    platformFee,
    transactionFee,
    paymentProcessingFee,
    offsiteAdFee,
    productCost,
    shippingCost,
    totalRevenue,
    currency,
    className
}: PODProfitBreakdownProps) {
    const formatCurrency = (val: number) => {
        return new Intl.NumberFormat('en-US', { style: 'currency', currency }).format(val)
    }

    const isProfitable = netProfit > 0
    const pieTotal = isProfitable ? totalRevenue : (platformFee + transactionFee + paymentProcessingFee + offsiteAdFee + productCost + shippingCost)
    const calcPct = (val: number) => pieTotal > 0 ? (val / pieTotal) * 100 : 0

    const rawData = [
        { name: netProfit >= 0 ? "Net Profit" : "Net Loss", value: netProfit, color: "#10b981", isCost: false, isMandatory: true },
        { name: "Product Cost", value: productCost, color: "#f59e0b", isCost: true, isMandatory: true },
        { name: "Shipping Cost", value: shippingCost, color: "#a855f7", isCost: true, isMandatory: true },
        { name: "Transaction Fee", value: transactionFee, color: "#0ea5e9", isCost: true, isMandatory: true },
        { name: "Processing Fee", value: paymentProcessingFee, color: "#2563eb", isCost: true, isMandatory: true },
        { name: "Platform Fee", value: platformFee, color: "#3b82f6", isCost: true, isMandatory: false },
        { name: "Offsite Ads", value: offsiteAdFee, color: "#6366f1", isCost: true, isMandatory: false },
    ]

    const pieData = rawData.filter(i => i.value > 0)

    const legendItems = rawData
        .filter(item => item.isMandatory || item.value > 0)
        .map(item => ({
            label: item.name,
            value: item.value,
            pct: item.value > 0 ? calcPct(item.value) : 0,
            colorBg: item.color,
            isCost: item.isCost
        }))

    return (
        <Card className={cn("border border-slate-200/60 shadow-sm bg-[#F5F8FD] rounded-2xl p-4 sm:p-5 flex flex-col gap-4 sm:gap-5", className)}>
            <div className="flex items-center gap-2 pb-3 border-b border-slate-200/50">
                <div className="flex items-center justify-center w-6 h-6 rounded-md bg-blue-600/10 border border-blue-500/20">
                    <PieChart className="w-3.5 h-3.5 text-blue-600" />
                </div>
                <h2 className="text-[15px] sm:text-[16px] font-bold text-blue-700 leading-none">
                    Revenue Breakdown
                </h2>
            </div>
            
            <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-5 w-full">
                {/* Left: Chart */}
                <div className="h-[120px] w-[120px] sm:h-[140px] sm:w-[140px] relative shrink-0">
                    {pieTotal > 0 ? (
                        <ResponsiveContainer width="100%" height="100%">
                            <RechartsPie>
                                <Pie
                                    data={pieData}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={45}
                                    outerRadius={60}
                                    paddingAngle={3}
                                    dataKey="value"
                                    stroke="none"
                                >
                                    {pieData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                </Pie>
                            </RechartsPie>
                        </ResponsiveContainer>
                    ) : (
                        <div className="absolute inset-0 flex items-center justify-center text-center p-3 text-slate-400 text-[10.5px] leading-tight font-medium border-2 border-dashed border-slate-200/70 rounded-full bg-slate-50/40">
                            Add data to see breakdown
                        </div>
                    )}
                    {/* Center Label */}
                    {pieTotal > 0 && (
                        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                            <span className="text-[10px] sm:text-[11px] font-medium text-slate-400 text-center leading-tight mb-0.5 mt-0.5">
                                {isProfitable ? "Total Revenue" : "Total Costs"}
                            </span>
                            <span className="text-[11px] sm:text-[13px] font-bold text-slate-900 tracking-tight">
                                {formatCurrency(pieTotal)}
                            </span>
                        </div>
                    )}
                </div>
                {/* Right: Legend */}
                <div className="flex-1 min-w-0 flex flex-col gap-2 relative w-full">
                    {legendItems.map((item) => {
                        const isNetItem = !item.isCost
                        const isPositive = item.value >= 0
                        const derivedDotColor = (isNetItem && !isPositive) ? "#e11d48" : item.colorBg

                        return (
                            <div key={item.label} className="flex items-center justify-between px-3 bg-white border border-slate-200/80 rounded-[10px] py-1.5 shadow-sm w-full gap-2 transition-all hover:border-slate-300">
                                <div className="flex items-center gap-2 min-w-0">
                                    <div className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: derivedDotColor }} />
                                    <span className="text-[12px] text-slate-600 font-bold truncate">
                                        {item.label}
                                    </span>
                                </div>
                                <div className="flex items-center shrink-0">
                                    <span className={cn(
                                        "text-[12px] font-semibold tabular-nums text-right flex-shrink-0 min-w-[50px]",
                                        item.isCost ? "text-slate-500" : (!isPositive ? "text-rose-600" : "text-emerald-600")
                                    )}>
                                        {!item.isCost && item.value > 0 ? "+" : ""}{formatCurrency(item.value)}
                                    </span>
                                    <span className={cn(
                                        "text-[12px] font-extrabold tabular-nums text-right flex-shrink-0 min-w-[32px] ml-2.5",
                                        item.isCost ? "text-slate-900" : (!isPositive ? "text-rose-700" : "text-emerald-700")
                                    )}>
                                        {item.pct.toFixed(0)}%
                                    </span>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </Card>
    )
}
