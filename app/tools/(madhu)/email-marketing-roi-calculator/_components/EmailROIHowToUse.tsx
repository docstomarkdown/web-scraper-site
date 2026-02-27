"use client"

import { ToolSteps } from "@/app/tools/_shared/components"
import { Users, BarChart3, DollarSign, TrendingUp } from "lucide-react"

export function EmailROIHowToUse() {
    return (
        <ToolSteps
            title="How to Use This Calculator"
            steps={[
                {
                    title: "Set Your Baseline",
                    description:
                        "Enter your total <strong>List Size</strong> and total <strong>Campaign Cost</strong>. This establishes your potential reach and the break-even point you need to surpass. Use the currency selector to match your local currency.",
                    icon: Users,
                },
                {
                    title: "Model the Funnel",
                    description:
                        "Input your estimated <strong>Open Rate</strong>, <strong>Click-Through Rate (CTR)</strong>, and <strong>Conversion Rate</strong>. The tool will instantly visualize your 'Subscriber Funnel' to show exactly where you lose potential customers.",
                    icon: BarChart3,
                },
                {
                    title: "Calculate Financials",
                    description:
                        "Add your <strong>Average Order Value (AOV)</strong> to unlock key profitability metrics like <strong>ROI</strong>, <strong>ROAS</strong>, and <strong>Net Profit</strong>, all updated in real time.",
                    icon: DollarSign,
                },
            ]}
            goal={{
                title: "Turn Every Send Into a Profitable Decision",
                description:
                    "Use these numbers to <strong>benchmark your campaign against industry averages</strong>, identify your weakest funnel stage, and confidently decide whether to invest more budget — or redirect it elsewhere.",
                icon: TrendingUp,
            }}
        />
    )
}
