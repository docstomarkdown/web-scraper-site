"use client"
import React from "react"
import { Card } from "@/components/ui/card"
import { Mail, MousePointer, Target, BarChart3, Info } from "lucide-react"
import { Counter } from "@/app/tools/_shared/components"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
interface CampaignResultsProps {
    opens: number
    clicks: number
    conversions: number
    revenue: number
    openPct: number
    ctrPct: number
    convPct: number
    formatNumber: (v: number) => string
    formatCurrency: (v: number) => string
}
export function CampaignResults({
    opens,
    clicks,
    conversions,
    revenue,
    openPct,
    ctrPct,
    convPct,
    formatNumber,
    formatCurrency
}: CampaignResultsProps) {
    return (
        <Card className="bg-white border-slate-200 shadow-sm rounded-2xl overflow-hidden p-4">
            <h4 className="text-sm font-bold text-slate-700 mb-3 flex items-center gap-2">
                <BarChart3 className="w-4 h-4 text-blue-500" />
                Campaign Results
            </h4>
            {/* Funnel: Opens → Clicks → Conversions */}
            <div className="grid grid-cols-3 gap-2 mb-3">
                {/* Opens */}
                <div className="bg-blue-50/60 rounded-xl p-3 border border-blue-100 flex flex-col justify-between relative">
                    <div className="flex items-center justify-between mb-2">
                        <div className="p-1.5 bg-blue-100 text-blue-600 rounded-lg">
                            <Mail className="w-3.5 h-3.5" />
                        </div>
                        <span className="text-[10px] font-bold text-blue-600 bg-blue-100/60 px-1.5 py-0.5 rounded-full">
                            {openPct}%
                        </span>
                    </div>
                    <div>
                        <p className="text-[10px] font-medium text-slate-500 mb-0.5">Opens</p>
                        <p className="text-sm font-bold text-blue-500">
                            <Counter value={opens} formatter={formatNumber} />
                        </p>
                    </div>
                    {/* Connector arrow */}
                    <div className="hidden sm:flex absolute top-1/2 -right-2 -translate-y-1/2 z-10 items-center">
                        <div className="w-2 h-[2px] bg-slate-300" />
                        <div className="w-0 h-0 border-t-[3px] border-t-transparent border-b-[3px] border-b-transparent border-l-[4px] border-l-slate-300" />
                    </div>
                </div>
                {/* Clicks */}
                <div className="bg-purple-50/60 rounded-xl p-3 border border-purple-100 flex flex-col justify-between relative">
                    <div className="flex items-center justify-between mb-2">
                        <div className="p-1.5 bg-purple-100 text-purple-600 rounded-lg">
                            <MousePointer className="w-3.5 h-3.5" />
                        </div>
                        <span className="text-[10px] font-bold text-purple-600 bg-purple-100/60 px-1.5 py-0.5 rounded-full">
                            {ctrPct}%
                        </span>
                    </div>
                    <div>
                        <p className="text-[10px] font-medium text-slate-500 mb-0.5">Clicks</p>
                        <p className="text-sm font-bold text-purple-500">
                            <Counter value={clicks} formatter={formatNumber} />
                        </p>
                    </div>
                    {/* Connector arrow */}
                    <div className="hidden sm:flex absolute top-1/2 -right-2 -translate-y-1/2 z-10 items-center">
                        <div className="w-2 h-[2px] bg-slate-300" />
                        <div className="w-0 h-0 border-t-[3px] border-t-transparent border-b-[3px] border-b-transparent border-l-[4px] border-l-slate-300" />
                    </div>
                </div>
                {/* Conversions */}
                <div className="bg-emerald-50/60 rounded-xl p-3 border border-emerald-100 flex flex-col justify-between">
                    <div className="flex items-center justify-between mb-2">
                        <div className="p-1.5 bg-emerald-100 text-emerald-600 rounded-lg">
                            <Target className="w-3.5 h-3.5" />
                        </div>
                        <span className="text-[10px] font-bold text-emerald-600 bg-emerald-100/60 px-1.5 py-0.5 rounded-full">
                            {convPct}%
                        </span>
                    </div>
                    <div>
                        <p className="text-[10px] font-medium text-slate-500 mb-0.5">Conversions</p>
                        <p className="text-sm font-bold text-emerald-500">
                            <Counter value={conversions} formatter={formatNumber} />
                        </p>
                    </div>
                </div>
            </div>
            {/* Total Revenue Summary Row */}
            <div className="flex items-center justify-between bg-slate-50 rounded-xl px-4 py-3 border border-slate-100">
                <div className="flex items-center gap-1.5">
                    <span className="text-xs font-bold text-slate-400 tracking-wide">Total Revenue</span>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <button type="button" tabIndex={-1} className="text-slate-400 hover:text-slate-500 transition-colors">
                                <Info className="h-3 w-3" />
                            </button>
                        </TooltipTrigger>
                        <TooltipContent side="top" className="max-w-xs text-xs bg-slate-900 text-white border-slate-800">
                            Total estimated revenue generated from campaign conversions. (Purchases × Avg. Order Value)
                        </TooltipContent>
                    </Tooltip>
                </div>
                <span className="text-base font-bold text-emerald-600">
                    <Counter value={revenue} formatter={formatCurrency} />
                </span>
            </div>
        </Card>
    )
}