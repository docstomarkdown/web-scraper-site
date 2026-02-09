"use client"

import { BookOpen, TrendingDown, AlertTriangle, CircleDollarSign, Calculator } from "lucide-react"
import { motion } from "framer-motion"

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
        <motion.polyline
            points="23 18 13.5 8.5 8.5 13.5 1 6"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.5, ease: "easeInOut", repeat: Infinity, repeatDelay: 1 }}
        />
        <motion.polyline
            points="17 18 23 18 23 12"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.5, ease: "easeInOut", repeat: Infinity, repeatDelay: 1 }}
        />
    </svg>
)

const insights = [
    {
        number: 1,
        icon: DrawingTrendingDown,
        iconBg: "bg-rose-100",
        iconColor: "text-rose-600",
        title: "The Margin Illusion",
        stat: "30-40%",
        statLabel: "Less than expected profit",
        // Custom icon handles animation
        animation: {},
        points: [
            "Gross margin looks great on paper",
            "Shipping + ads eat 30-40% of your profit",
            "Always calculate NET margin, not gross"
        ]
    },
    {
        number: 2,
        icon: AlertTriangle,
        iconBg: "bg-amber-100",
        iconColor: "text-amber-600",
        title: "The RTO Problem",
        stat: "2x",
        statLabel: "Shipping cost per return",
        animation: {
            opacity: [1, 0.5, 1],
            transition: { repeat: Infinity, duration: 1.5, ease: "easeInOut" }
        },
        points: [
            "Each return = forward + return shipping",
            "Plus wasted ad spend on that order",
            "COD markets: 15-30% RTO is common"
        ]
    },
    {
        number: 3,
        icon: CircleDollarSign,
        iconBg: "bg-blue-100",
        iconColor: "text-blue-600",
        title: "ROAS Reality Check",
        stat: "4x+",
        statLabel: "Target ROAS (not 3.5x)",
        animation: {
            scale: [1, 1.15, 1],
            transition: { repeat: Infinity, duration: 2, ease: "easeInOut" }
        },
        points: [
            "3.5x ROAS ignores product costs & RTOs",
            "You may keep only 15% of revenue",
            "Account for RTO rate in calculations"
        ]
    },
    {
        number: 4,
        icon: Calculator,
        iconBg: "bg-emerald-100",
        iconColor: "text-emerald-600",
        title: "Break-Even CPA",
        stat: "Know It",
        statLabel: "Your max cost per acquisition",
        animation: {
            rotate: [0, -10, 10, -5, 5, 0],
            transition: { repeat: Infinity, duration: 2.5, ease: "easeInOut", repeatDelay: 1 }
        },
        points: [
            "Sale price - all costs = max CPA",
            "Lower CPA = more scaling headroom",
            "Know your limit before ad spend"
        ]
    }
]

export function ProfitGuide() {
    return (
        <section id="profit-guide">
            <div className="flex items-center gap-3 mb-8 pb-4 border-b border-slate-200">
                <div className="p-2 bg-blue-50 rounded-xl text-blue-600">
                    <BookOpen className="h-6 w-6" />
                </div>
                <h2 className="text-2xl font-bold text-slate-900">The Hidden Truth About Dropshipping Profitability</h2>
            </div>

            <div className="space-y-4">
                {insights.map((insight) => {
                    const Icon = insight.icon
                    return (
                        <div
                            key={insight.number}
                            className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden hover:shadow-md transition-shadow"
                        >
                            <div className="flex flex-col md:flex-row">
                                {/* Left: Content */}
                                <div className="flex-1 p-6 order-2 md:order-1">
                                    <div className="flex items-center gap-3 mb-3">
                                        <span className="w-6 h-6 rounded-full bg-blue-50 text-blue-500 text-xs font-bold flex items-center justify-center border border-blue-200">
                                            {insight.number}
                                        </span>
                                        <h3 className="text-lg font-bold text-slate-900">{insight.title}</h3>
                                    </div>
                                    <ul className="space-y-2">
                                        {insight.points.map((point, i) => (
                                            <li key={i} className="flex items-start gap-2 text-slate-600">
                                                <span className="text-blue-500 mt-1">•</span>
                                                <span>{point}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                {/* Right: Icon + Stat */}
                                <div className="flex md:flex-col items-center justify-center gap-3 p-6 md:w-44 bg-slate-50 border-b md:border-b-0 md:border-l border-slate-100 order-1 md:order-2">
                                    <div className={`w-12 h-12 rounded-xl ${insight.iconBg} ${insight.iconColor} flex items-center justify-center opacity-70`}>
                                        <motion.div
                                            animate={insight.animation}
                                        >
                                            <Icon className="w-6 h-6" />
                                        </motion.div>
                                    </div>
                                    <div className="text-center">
                                        <div className="text-2xl font-bold text-slate-900">{insight.stat}</div>
                                        <div className="text-xs text-slate-500">{insight.statLabel}</div>
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
