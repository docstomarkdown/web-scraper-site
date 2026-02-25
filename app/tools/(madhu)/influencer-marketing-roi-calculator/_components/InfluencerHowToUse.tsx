"use client"

import { ToolSteps } from "@/app/tools/_shared/components"
import { Target, DollarSign, TrendingUp, Users } from "lucide-react"

export function InfluencerHowToUse() {
    return (
        <ToolSteps
            title="How to Measure Campaign Success"
            steps={[
                {
                    title: "Set Your Campaign Baseline",
                    description: "Start by selecting your currency and defining the total budget cap. This instantly calibrates the tool to track your burn rate against your financial ceiling.",
                    icon: Target
                },
                {
                    title: "Itemize All Direct & Invisible Costs",
                    description: "Go beyond just the influencer fee. Log shipping, packaging, agency commissions, and rights usage fees to uncover the *true* cost of the partnership.",
                    icon: DollarSign
                },
                {
                    title: "Sync Performance Data",
                    description: "Input the final campaign metrics—sales, reach, and engagement. The calculator will cross-reference this against your 'Fully Loaded' cost to generate net efficiency metrics.",
                    icon: TrendingUp
                },
                {
                    title: "Optimize Future Spend",
                    description: "Use the <strong>CPA</strong> and <strong>ROAS</strong> outputs to negotiate better rates for the next campaign. If the ROAS is below 2.0x, renegotiate fees or shift to a commission-only model.",
                    icon: Users
                }
            ]}
            goal={{
                title: "Quantitative Influencer Strategy",
                description: "Move beyond 'vanity metrics' and gut feelings. This tool provides a financial framework to prove the value of your creator partnerships and optimize your marketing budget for maximum growth.",
                icon: TrendingUp
            }}
        />
    )
}
