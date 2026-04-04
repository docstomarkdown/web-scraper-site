"use client"
import React from "react"
import { Card } from "@/components/ui/card"
import { PieChart as RechartsPie, Pie, Cell, ResponsiveContainer } from "recharts"
import { PieChart, AlertTriangle } from "lucide-react"
import { cn } from "@/lib/utils"

interface MOQBreakdownProps {
    unitPrice: number
    moq: number
    shippingCost: number
    miscCost: number
    totalInvestment: number
    currency?: string
    className?: string
}

export function MOQBreakdown({
    unitPrice,
    moq,
    shippingCost,
    miscCost,
    totalInvestment,
    currency = "USD",
    className,
}: MOQBreakdownProps) {
    const formatCurrency = (val: number) =>
        new Intl.NumberFormat("en-US", {
            style: "currency",
            currency,
            maximumFractionDigits: 2,
        }).format(val)

    const productCost = unitPrice * moq
    const pieTotal = totalInvestment
    const calcPct = (val: number) => (pieTotal > 0 ? (val / pieTotal) * 100 : 0)

    const rawData = [
        {
            name: "Product Cost",
            value: productCost,
            color: "#3b82f6", // blue-500
            isCost: true,
            isMandatory: true,
        },
        {
            name: "Shipping",
            value: shippingCost,
            color: "#f59e0b", // amber-500
            isCost: true,
            isMandatory: true,
        },
        {
            name: "Other Costs",
            value: miscCost,
            color: "#8b5cf6", // violet-500
            isCost: true,
            isMandatory: true,
        },
    ]

    const pieData = rawData.filter((i) => i.value > 0)

    const legendItems = rawData
        .filter((item) => item.isMandatory || Math.abs(item.value) > 0)
        .map((item) => ({
            label: item.name,
            value: item.value,
            pct: Math.abs(item.value) > 0 ? calcPct(Math.abs(item.value)) : 0,
            colorBg: item.color,
            isCost: item.isCost,
        }))

    const chartSizeClass = "h-[120px] w-[120px] sm:h-[140px] sm:w-[140px]"
    const innerR = 45
    const outerR = 60

    return (
        <Card
            className={cn(
                "border border-slate-200/60 shadow-sm bg-[#F5F8FD] rounded-2xl p-4 sm:p-5 flex flex-col gap-4 sm:gap-5",
                className
            )}
        >
            {/* Header */}
            <div className="flex items-center gap-2 pb-3 border-b border-slate-200/50">
                <div className="flex items-center justify-center w-6 h-6 rounded-md bg-blue-600/10 border border-blue-500/20">
                    <PieChart className="w-3.5 h-3.5 text-blue-600" />
                </div>
                <h2 className="text-[15px] sm:text-[16px] font-bold text-blue-700 leading-none">
                    Investment Breakdown
                </h2>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-5 w-full">
                {/* Chart */}
                <div className={cn("relative shrink-0", chartSizeClass)}>
                    {pieTotal > 0 ? (
                        <ResponsiveContainer width="100%" height="100%">
                            <RechartsPie>
                                <Pie
                                    data={pieData}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={innerR}
                                    outerRadius={outerR}
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
                    {pieTotal > 0 && (
                        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                            <span className="text-[10px] sm:text-[11px] font-medium text-slate-400 text-center leading-tight mb-0.5 mt-0.5">
                                Total
                            </span>
                            <span className="text-[11px] sm:text-[13px] font-bold text-slate-900 tracking-tight">
                                {formatCurrency(pieTotal)}
                            </span>
                        </div>
                    )}
                </div>

                {/* Legend */}
                <div className="flex-1 min-w-0 flex flex-col gap-2 relative w-full">
                    {legendItems.map((item) => {
                        const isPositive = item.value >= 0
                        const derivedDotColor = item.colorBg

                        return (
                            <div
                                key={item.label}
                                className="grid text-[11px] px-3 bg-white border border-slate-100 rounded-lg py-1.5 shadow-sm"
                                style={{ gridTemplateColumns: "1fr auto auto" }}
                            >
                                <div className="flex items-center gap-2 min-w-0">
                                    <div
                                        className="w-2 h-2 rounded-full shrink-0"
                                        style={{ backgroundColor: derivedDotColor }}
                                    />
                                    <span className="text-slate-600 font-bold truncate">
                                        {item.label}
                                    </span>
                                </div>
                                <span className="text-slate-500 font-semibold tabular-nums text-right px-2 self-center">
                                    {formatCurrency(item.value)}
                                </span>
                                <span className="font-extrabold text-slate-900 tabular-nums text-right self-center w-[36px]">
                                    {`${item.pct.toFixed(0)}%`}
                                </span>
                            </div>
                        )
                    })}
                </div>
            </div>
        </Card>
    )
}
