"use client"

import { BookOpen, AlertTriangle, CircleDollarSign, Calculator, Info } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

const DrawingTrendingDown = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        <polyline points="23 18 13.5 8.5 8.5 13.5 1 6" />
        <polyline points="17 18 23 18 23 12" />
    </svg>
)

const insights = [
    {
        icon: DrawingTrendingDown,
        iconBg: "bg-rose-50",
        iconColor: "text-rose-500",
        statColor: "text-rose-600",
        title: "The Margin Illusion",
        stat: "30–40%",
        statLabel: "Profit lost to hidden costs",
        points: [
            "Gross margin looks great on paper",
            "Shipping & ads cut profits by 30–40%",
            "Always calculate NET, not gross"
        ]
    },
    {
        icon: AlertTriangle,
        iconBg: "bg-amber-50",
        iconColor: "text-amber-500",
        statColor: "text-amber-600",
        title: "The RTO Problem",
        stat: "2×",
        statLabel: "Shipping cost per return",
        points: [
            "Each return = forward + return shipping",
            "Plus wasted ad spend on that order",
            "COD markets: 15–30% RTO is common"
        ],
        tooltip: "RTO (Return to Origin): When a customer doesn't accept the package and it's sent back to you. You lose the money spent on shipping and ads."
    },
    {
        icon: CircleDollarSign,
        iconBg: "bg-blue-50",
        iconColor: "text-blue-500",
        statColor: "text-blue-600",
        title: "ROAS Reality Check",
        stat: "4×+",
        statLabel: "Target ROAS (not 3.5×)",
        points: [
            "3.5× ROAS ignores product costs & RTOs",
            "You may keep only 15% of revenue",
            "Factor RTO rate into every calculation"
        ],
        tooltip: "ROAS (Return on Ad Spend): How much money you make for every $1 spent on ads. For example, 4X means you made $4 from $1 of ads."
    },
    {
        icon: Calculator,
        iconBg: "bg-emerald-50",
        iconColor: "text-emerald-500",
        statColor: "text-emerald-600",
        title: "Break-Even CPA",
        stat: "Know It",
        statLabel: "Your max cost per acquisition",
        points: [
            "Sale price − all costs = max CPA",
            "Lower CPA = more scaling headroom",
            "Know your limit before spending on ads"
        ],
        tooltip: "CPA (Cost Per Acquisition): The average amount you spend on ads to get just one order."
    }
]

export function ProfitGuide() {
    return (
        <section id="profit-guide">
            <div className="flex items-center gap-3 mb-10 pb-4 border-b border-slate-100">
                <div className="p-2 bg-blue-50 rounded-xl text-blue-600">
                    <BookOpen className="h-6 w-6" />
                </div>
                <h2 className="text-2xl font-bold text-slate-900">The Hidden Truth About Dropshipping Profitability</h2>
            </div>

            <div className="space-y-6">
                {insights.map((insight, index) => {
                    const Icon = insight.icon
                    return (
                        <div
                            key={index}
                            className="bg-white rounded-2xl border border-slate-200/60 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden"
                        >
                            <div className="flex flex-col md:flex-row">
                                {/* Left: Content */}
                                <div className="flex-1 p-6 order-2 md:order-1">
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className={`w-9 h-9 rounded-xl ${insight.iconBg} ${insight.iconColor} flex items-center justify-center border border-slate-100/50`}>
                                            <Icon className="w-4.5 h-4.5" />
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <h3 className="text-base font-bold text-slate-900">{insight.title}</h3>
                                            {'tooltip' in insight && (
                                                <TooltipProvider delayDuration={100}>
                                                    <Tooltip>
                                                        <TooltipTrigger asChild>
                                                            <button type="button" className="text-slate-400 hover:text-blue-600 transition-colors">
                                                                <Info className="h-3.5 w-3.5" />
                                                            </button>
                                                        </TooltipTrigger>
                                                        <TooltipContent side="top" className="max-w-xs text-xs bg-slate-900 text-white border-slate-800">
                                                            {insight.tooltip}
                                                        </TooltipContent>
                                                    </Tooltip>
                                                </TooltipProvider>
                                            )}
                                        </div>
                                    </div>
                                    <ul className="space-y-2">
                                        {insight.points.map((point, i) => (
                                            <li key={i} className="flex items-start gap-2.5 text-sm text-slate-600 leading-tight">
                                                <span className={`${insight.iconColor} mt-1.5 flex-shrink-0 opacity-60`}>
                                                    <svg width="5" height="5" viewBox="0 0 6 6" fill="currentColor"><circle cx="3" cy="3" r="3" /></svg>
                                                </span>
                                                <span>{point}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                {/* Right: Takeaway Stat Panel (Neutral Background) */}
                                <div className="flex md:flex-col items-center justify-center gap-1.5 p-6 md:w-48 bg-slate-50/50 border-b md:border-b-0 md:border-l border-slate-100 order-1 md:order-2">
                                    <div className={`text-3xl font-bold ${insight.statColor} tracking-tight`}>{insight.stat}</div>
                                    <div className="text-[10px] font-bold uppercase tracking-widest text-slate-400 bg-slate-100/50 px-2 py-0.5 rounded-full">
                                        Takeaway
                                    </div>
                                    <div className="text-[11px] font-medium text-slate-500 text-center leading-tight mt-1 max-w-[120px]">
                                        {insight.statLabel}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </section>
    )
}
