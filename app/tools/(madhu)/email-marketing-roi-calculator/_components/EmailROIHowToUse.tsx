"use client"

import { ToolSteps } from "@/app/tools/_shared/components"
import { Users, BarChart3, DollarSign, TrendingUp } from "lucide-react"

export function EmailROIHowToUse() {
    return (
        <ToolSteps
            title="How to Use This Calculator"
            steps={[
                {
                    title: "Define Your Audience & Costs",
                    description:
                        "Start by entering your total <strong>Number of Subscribers</strong> and the <strong>Total Campaign Cost</strong>. This includes email software, design, and production labor.",
                    icon: Users,
                },
                {
                    title: "Map Your Email Engagement",
                    description:
                        "Enter your <strong>Estimated Open Rate</strong>, <strong>Email CTR (on Opens)</strong>, and <strong>Post-Click Conversion Rate</strong>. We've pre-filled industry benchmarks (20% opens, 2.5% CTR) to help you get started.",
                    icon: BarChart3,
                },
                {
                    title: "Analyze Revenue & Profitability",
                    description:
                        "Add your <strong>Average Order Value (AOV)</strong>. The tool instantly calculates <strong>Net Profit</strong> and <strong>Cost Per Acquisition (CPA)</strong> to show you exactly how much each new sale costs.",
                    icon: DollarSign,
                },
            ]}
            goal={{
                title: "Scale Your Success with Data",
                description:
                    "Stop guessing and start optimizing. This breakdown reveals exactly where you're losing customers—whether it's the subject line, the email content, or the bridge to your landing page. Fix the 'leak' to maximize your profit.",
                icon: TrendingUp,
            }}
        />
    )
}
