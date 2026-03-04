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
        description: "Gross margins can be misleading. Hidden costs like shipping variances, transaction fees, and taxes often eat up 30-40% of your expected profit. Always calculate your NET profit to see the real picture."
    },
    {
        icon: AlertTriangle,
        iconBg: "bg-amber-50",
        iconColor: "text-amber-500",
        statColor: "text-amber-600",
        title: "The RTO Problem",
        stat: "2×",
        statLabel: "Shipping cost per return",
        description: "Returns are a double hit: you pay for shipping both ways, plus you lose your ad spend. In Cash on Delivery (COD) markets, RTO rates can hit 15-30%, making this a critical factor to track.",
        tooltip: "RTO (Return to Origin): When a customer rejects a delivery. You pay for shipping to them AND back to you, plus the ad money is wasted."
    },
    {
        icon: CircleDollarSign,
        iconBg: "bg-blue-50",
        iconColor: "text-blue-500",
        statColor: "text-blue-600",
        title: "ROAS Reality Check",
        stat: "4×+",
        statLabel: "Target ROAS (not 3.5×)",
        description: "A 3.5× ROAS might look good, but after deducting product and shipping costs, your actual profit could be thin. Aim for higher ROAS to cover all operational expenses and returns.",
        tooltip: "ROAS (Return on Ad Spend): Revenue earned for every $1 spent on ads. A high ROAS doesn't always guarantee profit if your margins are low."
    },
    {
        icon: Calculator,
        iconBg: "bg-blue-50",
        iconColor: "text-blue-500",
        statColor: "text-blue-600",
        title: "Break-Even CPA",
        stat: "Know It",
        statLabel: "Your max cost per acquisition",
        description: "This is your profitability line in the sand. It's the maximum you can spend to acquire a customer without losing money. Keep your actual CPA below this number to stay profitable.",
        tooltip: "CPA (Cost Per Acquisition): The average cost to get one paying customer. If your CPA is lower than your break-even point, you make money."
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
                                    <p className="text-sm text-slate-600 leading-relaxed">
                                        {insight.description}
                                    </p>
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