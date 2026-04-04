"use client"
import React from "react"
import { Card } from "@/components/ui/card"
import { PieChart as RechartsPie, Pie, Cell, ResponsiveContainer } from "recharts"
import { PieChart } from "lucide-react"
import { cn } from "@/lib/utils"

interface DimWeightBreakdownProps {
    actualWeight: number
    dimWeight: number
    billableWeight: number
    weightUnit: string
    className?: string
}

export function DimWeightBreakdown({
    actualWeight,
    dimWeight,
    billableWeight,
    weightUnit,
    className,
}: DimWeightBreakdownProps) {
    const formatWeight = (val: number) => `${val.toFixed(1)} ${weightUnit}`

    const pieTotal = billableWeight
    const calcPct = (val: number) => (pieTotal > 0 ? (val / pieTotal) * 100 : 0)

    const dimAddon = Math.max(0, dimWeight - actualWeight)
    const effectiveActual = actualWeight > 0 ? actualWeight : 0

    const rawData = [
        {
            name: "Actual Weight",
            value: effectiveActual,
            color: "#3b82f6", // blue
            isCost: false,
            isMandatory: true,
        },
        {
            name: "Dimensional Add-on",
            value: dimAddon,
            color: "#94a3b8", // slate
            isCost: true,
            isMandatory: true,
        },
    ]

    const pieData = rawData.filter((i) => i.value > 0)

    const legendItems = rawData
        .filter((item) => item.isMandatory || item.value > 0)
        .map((item) => ({
            label: item.name,
            value: item.value,
            pct: item.value > 0 ? calcPct(item.value) : 0,
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
                    Weight Breakdown
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
                                Billable
                            </span>
                            <span className="text-[11px] sm:text-[13px] font-bold text-slate-900 tracking-tight">
                                {formatWeight(billableWeight)}
                            </span>
                        </div>
                    )}
                </div>

                {/* Legend */}
                <div className="flex-1 min-w-0 flex flex-col gap-2 relative w-full">
                    {legendItems.map((item) => {
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
                                    {formatWeight(item.value)}
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
