"use client"

import React from "react"
import { Card } from "@/components/ui/card"
import { MousePointer, Target, BarChart3, Info } from "lucide-react"
import { Counter } from "@/app/tools/_shared/components"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface CampaignResultsProps {
    clicks: number
    conversions: number
    revenue: number
    ctrPct: number
    convPct: number
    formatNumber: (v: number) => string
    formatCurrency: (v: number) => string
}

export function CampaignResults({
    clicks,
    conversions,
    revenue,
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

            <div className="grid grid-cols-2 gap-3 mb-4">
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
                        <p className="text-base font-bold text-purple-500">
                            <Counter value={clicks} formatter={formatNumber} />
                        </p>
                    </div>
                    {/* Connector */}
                    <div className="hidden sm:block absolute top-1/2 -right-3.5 w-3.5 h-[2px] bg-slate-200 z-10" />
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
                        <p className="text-[10px] font-medium text-slate-500 mb-0.5">Conversion Rate</p>
                        <p className="text-base font-bold text-emerald-500">
                            <Counter value={conversions} formatter={formatNumber} />
                        </p>
                    </div>
                </div>
            </div>

            {/* Total Revenue Summary Row */}
            <div className="flex items-center justify-between bg-slate-50 rounded-xl px-4 py-3 border border-slate-100">
                <div className="flex items-center gap-1.5">
                    <span className="text-xs font-bold text-slate-400 tracking-wide">Total Revenue</span>
                    <TooltipProvider delayDuration={100}>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <button type="button" className="text-slate-400 hover:text-slate-500 transition-colors">
                                    <Info className="h-3 w-3" />
                                </button>
                            </TooltipTrigger>
                            <TooltipContent side="top" className="max-w-xs text-xs bg-slate-900 text-white border-slate-800">
                               Total estimated revenue generated from campaign conversions.
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                </div>
                <span className="text-base font-black text-slate-900">
                    <Counter value={revenue} formatter={formatCurrency} />
                </span>
            </div>
        </Card>
    )
}
