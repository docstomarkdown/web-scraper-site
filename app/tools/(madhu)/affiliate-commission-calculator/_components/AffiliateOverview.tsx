"use client"
import { ToolOverview } from "@/app/tools/_shared/components"
import { Lightbulb } from "lucide-react"

export function AffiliateOverview() {
    return (
        <div className="space-y-8" id="overview">
            {/* Section Header */}
            <div className="px-1">
                <div className="flex items-center gap-3.5 sm:gap-4">
                    <div className="flex-shrink-0 flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100/80 shadow-[0_2px_8px_-4px_rgba(59,130,246,0.2)]">
                        <Lightbulb className="h-5 w-5 sm:h-6 sm:w-6 text-blue-600" />
                    </div>
                    <div>
                        <h2 className="text-[22px] sm:text-[28px] font-bold text-slate-700 tracking-tight leading-tight">
                            Tool Essentials
                        </h2>
                    </div>
                </div>
                <p className="text-[14px] sm:text-[15px] text-slate-500 font-medium leading-relaxed pl-[3.375rem] sm:pl-[4rem] max-w-2xl mt-2">
                    Optimize your affiliate strategy by understanding payouts, sales volume, and true profitability.
                </p>
            </div>

            {/* Tool Overview */}
            <ToolOverview
                heading="Built for store owners who run affiliate programs — the "
                headingAccent="Affiliate Payout Calculator"
                definition="If you sell online and pay commissions to influencers, bloggers, or referral partners, this tool was made for you. Before launching or scaling any affiliate campaign, you need to know two numbers: how much you'll pay out in commissions, and how much you'll actually keep. This calculator gives you both — instantly and transparently — so you can set smarter commission rates and protect your profit margins."
                facts={[
                    {
                        stat: "Payout",
                        label: "Projection",
                        detail: "See the exact total commission you owe across all your affiliate-driven sales — before you commit to a rate."
                    },
                    {
                        stat: "Net",
                        label: "Profit",
                        detail: "Know your true take-home after deducting both affiliate commissions and your product sourcing or manufacturing cost."
                    },
                    {
                        stat: "Rate",
                        label: "Testing",
                        detail: "Quickly simulate different commission percentages to find the rate that rewards affiliates fairly without sacrificing your margin."
                    }
                ]}
            />
        </div>
    )
}
