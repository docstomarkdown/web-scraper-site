"use client"
import React from "react"
import { Card } from "@/components/ui/card"
import { PieChart as RechartsPie, Pie, Cell, ResponsiveContainer } from "recharts"
import { PieChart } from "lucide-react"
import { cn } from "@/lib/utils"
import { formatCurrencyValue } from "@/app/tools/_shared/components"

interface CLVBreakdownProps {
    clvRevenue: number;
    grossProfit: number;
    cacVal: number;
    netProfit: number;
    marginVal: number;
    currency?: string;
    className?: string;
}

export function CLVBreakdown({
    clvRevenue,
    grossProfit,
    cacVal,
    netProfit,
    marginVal,
    currency = "USD",
    className
}: CLVBreakdownProps) {
    const formatCurrency = (val: number) => formatCurrencyValue(val, currency, 0)

    const cogs = clvRevenue - grossProfit;
    const pieTotal = clvRevenue;
    const calcPct = (val: number) => (pieTotal > 0 ? (val / pieTotal) * 100 : 0)

    const rawData = [
        { name: netProfit >= 0 ? "Net Profit" : "Net Loss", value: Math.max(netProfit, 0), color: "#10b981", isCost: false, isMandatory: true },
        { name: "Product Costs (base)", value: cogs, color: "#f43f5e", isCost: true, isMandatory: true },
        { name: "Acq. Cost (CAC)", value: cacVal, color: "#f59e0b", isCost: true, isMandatory: false },
    ]

    const pieData = rawData.filter(i => i.value > 0)

    // Ensure legend always renders to prevent layout shifts
    const legendItems = [
        {
            label: "Product Costs",
            value: cogs,
            pct: calcPct(cogs),
            colorBg: "#f43f5e",
            isCost: true,
            isTotal: false,
        },
        ...(cacVal > 0 || netProfit === 0 ? [{
            label: "Acq. Cost",
            value: cacVal,
            pct: calcPct(cacVal),
            colorBg: "#f59e0b",
            isCost: true,
            isTotal: false,
        }] : []),
        {
            label: netProfit >= 0 ? "Net Profit" : "Net Loss",
            value: netProfit,
            pct: Math.abs(calcPct(netProfit)),
            colorBg: netProfit >= 0 ? "#10b981" : "#e11d48",
            isCost: netProfit < 0,
            isTotal: false,
        },
    ]

    const chartSizeClass = "h-[120px] w-[120px] sm:h-[140px] sm:w-[140px]";
    const innerR = 45;
    const outerR = 60;

    const isEmpty = clvRevenue <= 0;

    return (
        <Card className={cn("border border-slate-200/60 shadow-sm bg-[#F5F8FD] rounded-2xl p-4 sm:p-5 flex flex-col gap-4 sm:gap-5", className)}>
            {/* Header */}
            <div className="flex items-center gap-2 pb-3 border-b border-slate-200/50">
                <div className="flex items-center justify-center w-6 h-6 rounded-md bg-blue-600/10 border border-blue-500/20">
                    <PieChart className="w-3.5 h-3.5 text-blue-600" />
                </div>
                <h2 className="text-[15px] sm:text-[16px] font-bold text-blue-700 leading-none">
                    Lifetime Value Breakdown
                </h2>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-5 w-full">
                {/* Chart */}
                <div className={cn("relative shrink-0", chartSizeClass)}>
                    {!isEmpty ? (
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
                            Enter data to see breakdown
                        </div>
                    )}
                    
                    {!isEmpty && (
                        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                            <span className="text-[10px] sm:text-[11px] font-medium text-slate-400 text-center leading-tight mb-0.5 mt-0.5">
                                Revenue
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
                        const isNetItem = item.isTotal;
                        const isPositive = item.value >= 0;

                        return (
                            <div
                                key={item.label}
                                className={cn(
                                    "flex items-start sm:items-center justify-between px-3 bg-white border border-slate-200/80 rounded-[10px] py-1.5 shadow-sm w-full gap-2 transition-all hover:border-slate-300",
                                    item.isTotal && "bg-slate-50 border-slate-200/50 shadow-sm mt-1"
                                )}
                            >
                                <div className="flex items-center gap-2 min-w-0">
                                    <div
                                        className="w-2.5 h-2.5 rounded-full shrink-0 mt-0.5"
                                        style={{ backgroundColor: item.colorBg }}
                                    />
                                    <span className={cn(
                                        "text-[12px] font-bold leading-tight whitespace-nowrap overflow-hidden text-ellipsis",
                                        item.isTotal ? "text-slate-800" : "text-slate-600"
                                    )}>
                                        {item.label}
                                    </span>
                                </div>
                                <div className="flex items-center shrink-0">
                                    <span className={cn(
                                        "text-[12px] font-semibold tabular-nums text-right flex-shrink-0 w-[76px] sm:w-[86px]",
                                        item.isCost ? "text-slate-500" : (!isPositive ? "text-rose-600" : "text-[#10b981]")
                                    )}>
                                        {!item.isCost && item.value > 0 ? "+" : ""}
                                        {formatCurrency(item.value)}
                                    </span>
                                    <span className={cn(
                                        "text-[12px] font-extrabold tabular-nums text-right flex-shrink-0 w-[32px] sm:w-[40px] ml-2.5",
                                        item.isCost ? "text-slate-900" : (!isPositive ? "text-rose-700" : "text-[#10b981]")
                                    )}>
                                        {Math.abs(item.value) > 0 ? `${item.pct.toFixed(0)}%` : "—"}
                                    </span>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </Card>
    )
}

