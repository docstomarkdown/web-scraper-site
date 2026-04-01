"use client"
import React from "react"
import { Card } from "@/components/ui/card"
import { PieChart as RechartsPie, Pie, Cell, ResponsiveContainer } from "recharts"
import { PieChart } from "lucide-react"
import { cn } from "@/lib/utils"

interface PackagingCostBreakdownProps {
    totalMaterialCost: number
    laborCostPerUnit: number
    boxCost: number
    paddingCost: number
    tapeCost: number
    labelCost: number
    brandingCost: number
    totalPackagingCost: number
    currency: string
    className?: string
}

export function PackagingCostBreakdown({
    totalMaterialCost,
    laborCostPerUnit,
    boxCost,
    paddingCost,
    tapeCost,
    labelCost,
    brandingCost,
    totalPackagingCost,
    currency,
    className
}: PackagingCostBreakdownProps) {
    const formatCurrency = (val: number) =>
        new Intl.NumberFormat("en-US", { style: "currency", currency, maximumFractionDigits: 2 }).format(val)

    const pieTotal = totalPackagingCost
    const calcPct = (val: number) => (pieTotal > 0 ? (val / pieTotal) * 100 : 0)

    // Always show mandatory items, show optional only when they have data
    const rawData = [
        { name: "Box / Mailer", value: boxCost, color: "#3b82f6", isMandatory: true },
        { name: "Labor",        value: laborCostPerUnit, color: "#f59e0b", isMandatory: true },
        { name: "Padding",      value: paddingCost, color: "#a855f7", isMandatory: false },
        { name: "Tape",         value: tapeCost, color: "#0ea5e9", isMandatory: false },
        { name: "Label",        value: labelCost, color: "#10b981", isMandatory: false },
        { name: "Branding",     value: brandingCost, color: "#f97316", isMandatory: false },
    ]

    const pieData = rawData.filter(i => i.value > 0)

    // Legend shows mandatory always + optional only when > 0
    const legendItems = rawData
        .filter(item => item.isMandatory || item.value > 0)
        .map(item => ({
            label: item.name,
            value: item.value,
            pct: item.value > 0 ? calcPct(item.value) : 0,
            colorBg: item.color,
        }))

    const chartSizeClass = "h-[120px] w-[120px] sm:h-[140px] sm:w-[140px]";
    const innerR = 45;
    const outerR = 60;

    return (
        <Card className={cn("border border-slate-200/60 shadow-sm bg-[#F5F8FD] rounded-2xl p-4 sm:p-5 flex flex-col gap-4 sm:gap-5", className)}>
            {/* Header */}
            <div className="flex items-center gap-2 pb-3 border-b border-slate-200/50">
                <div className="flex items-center justify-center w-6 h-6 rounded-md bg-blue-600/10 border border-blue-500/20">
                    <PieChart className="w-3.5 h-3.5 text-blue-600" />
                </div>
                <h2 className="text-[15px] sm:text-[16px] font-bold text-blue-700 leading-none">
                    Cost Breakdown
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
                        /* Persistent empty-state ring */
                        <div className="absolute inset-0 flex items-center justify-center text-center p-3 text-slate-400 text-[10.5px] leading-tight font-medium border-2 border-dashed border-slate-200/70 rounded-full bg-slate-50/40">
                            Add data to see breakdown
                        </div>
                    )}
                    {/* Center label when data exists */}
                    {pieTotal > 0 && (
                        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                            <span className="text-[10px] sm:text-[11px] font-medium text-slate-400 text-center leading-tight mb-0.5 mt-0.5">
                                Total Cost
                            </span>
                            <span className="text-[11px] sm:text-[13px] font-bold text-slate-900 tracking-tight">
                                {formatCurrency(pieTotal)}
                            </span>
                        </div>
                    )}
                </div>

                {/* Legend */}
                <div className="flex-1 min-w-0 flex flex-col gap-2 relative w-full">
                    {legendItems.map((item) => (
                        <div
                            key={item.label}
                            className="flex items-center justify-between px-3 bg-white border border-slate-200/80 rounded-[10px] py-1.5 shadow-sm w-full gap-2 transition-all hover:border-slate-300"
                        >
                            <div className="flex items-center gap-2 min-w-0">
                                <div
                                    className="w-2.5 h-2.5 rounded-full shrink-0"
                                    style={{ backgroundColor: item.colorBg }}
                                />
                                <span className="text-[12px] text-slate-600 font-bold truncate">
                                    {item.label}
                                </span>
                            </div>
                            <div className="flex items-center shrink-0">
                                <span className="text-[12px] font-semibold tabular-nums text-right flex-shrink-0 min-w-[50px] text-slate-500">
                                    {formatCurrency(item.value)}
                                </span>
                                <span className={cn(
                                    "text-[12px] font-extrabold tabular-nums text-right flex-shrink-0 min-w-[32px] ml-2.5",
                                    item.value > 0 ? "text-slate-900" : "text-slate-300"
                                )}>
                                    {item.value > 0 ? `${item.pct.toFixed(0)}%` : "—"}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </Card>
    )
}
