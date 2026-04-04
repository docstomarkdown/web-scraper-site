"use client"
import React from "react"
import { Card } from "@/components/ui/card"
import { PieChart as RechartsPie, Pie, Cell, ResponsiveContainer } from "recharts"
import { PieChart } from "lucide-react"
import { cn } from "@/lib/utils"

interface BreakEvenBreakdownProps {
    pricePerUnit: number
    variableCostPerUnit: number
    contributionMargin: number
    fixedCosts: number
    currency?: string
    className?: string
}

export function BreakEvenBreakdown({
    pricePerUnit,
    variableCostPerUnit,
    contributionMargin,
    fixedCosts,
    currency = "USD",
    className,
}: BreakEvenBreakdownProps) {
    const formatCurrency = (val: number) =>
        new Intl.NumberFormat("en-US", {
            style: "currency",
            currency,
            maximumFractionDigits: 2,
        }).format(val)

    const pieTotal = pricePerUnit
    const calcPct = (val: number) => (pieTotal > 0 ? (val / pieTotal) * 100 : 0)

    const rawData = [
        {
            name: "Variable Cost",
            value: variableCostPerUnit,
            color: "#f43f5e", // rose-500
            isCost: true,
            isMandatory: true,
        },
        {
            name: contributionMargin > 0 ? "Contribution Mar." : "Negative Mar.",
            value: Math.max(contributionMargin, 0),
            color: contributionMargin > 0 ? "#10b981" : "#f43f5e", // emerald-500
            isCost: false,
            isMandatory: true,
        },
    ]

    const pieData = rawData.filter((i) => i.value > 0)

    const legendItems = [
        {
            label: "Price per Unit",
            value: pricePerUnit,
            pct: 100,
            colorBg: "transparent",
            isCost: false,
            showDot: false,
        },
        {
            label: "Variable Cost",
            value: variableCostPerUnit,
            pct: variableCostPerUnit > 0 ? calcPct(variableCostPerUnit) : 0,
            colorBg: "#f43f5e",
            isCost: true,
            showDot: true,
        },
        {
            label: contributionMargin > 0 ? "Contribution Mar." : "Negative Mar.",
            value: contributionMargin,
            pct: Math.abs(contributionMargin) > 0 ? calcPct(Math.abs(contributionMargin)) : 0,
            colorBg: contributionMargin > 0 ? "#10b981" : "#f43f5e",
            isCost: false,
            showDot: true,
        },
    ]

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
                    Unit Economics Breakdown
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
                                Price
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
                        const isNetItem = !item.isCost
                        const isPositive = item.value >= 0
                        const derivedDotColor = item.colorBg

                        return (
                            <div
                                key={item.label}
                                className={cn(
                                    "flex items-start sm:items-center justify-between px-3 border rounded-[10px] py-1.5 shadow-sm w-full gap-2 transition-all hover:border-slate-300",
                                    item.showDot ? "bg-white border-slate-200/80" : "bg-blue-50/50 border-blue-200/60"
                                )}
                            >
                                <div className="flex items-center gap-2">
                                    {item.showDot && (
                                        <div
                                            className="w-2.5 h-2.5 rounded-full shrink-0 mt-0.5"
                                            style={{ backgroundColor: derivedDotColor }}
                                        />
                                    )}
                                    <span className="text-[12px] text-slate-600 font-bold leading-tight">
                                        {item.label}
                                    </span>
                                </div>
                                <div className="flex items-center flex-1 justify-end shrink-0">
                                    <span
                                        className={cn(
                                            "text-[12px] font-semibold tabular-nums text-right flex-shrink-0 min-w-[60px]",
                                            item.isCost
                                                ? "text-slate-500"
                                                : "text-slate-700"
                                        )}
                                    >
                                        {item.isCost && item.value > 0 ? "-" : ""}
                                        {formatCurrency(Math.abs(item.value))}
                                    </span>
                                    <span
                                        className={cn(
                                            "text-[12px] font-extrabold tabular-nums text-right flex-shrink-0 w-[32px] sm:w-[40px] ml-2.5",
                                            !item.showDot ? "text-blue-600" : "text-slate-500"
                                        )}
                                    >
                                        {Math.abs(item.value) > 0 || item.showDot
                                            ? `${item.pct.toFixed(0)}%`
                                            : "—"}
                                    </span>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
            
            <div className="px-1 mt-1">
                <div className="flex justify-between items-center text-[12.5px]">
                    <span className="text-slate-500 font-medium">Total Fixed Costs</span>
                    <span className="text-slate-700 font-semibold">{formatCurrency(fixedCosts)}</span>
                </div>
            </div>
        </Card>
    )
}
