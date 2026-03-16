"use client"
import { ToolSteps } from "@/app/tools/_shared/components"
import { Users, MousePointerClick, DollarSign, TrendingUp } from "lucide-react"

export function EmailROIHowToUse() {
    return (
        <ToolSteps
            title="How to Use This Calculator"
            steps={[
                {
                    title: "Define Campaign Scope",
                    description: "Enter your <strong>Number of Email Subscribers</strong> and <strong>Total Campaign Cost</strong> to establish your campaign's scale.",
                    icon: Users
                },
                {
                    title: "Engagement Metrics",
                    description: "Input your <strong>Open Rate</strong> and <strong>Email CTR</strong> to calculate the traffic generated from your list.",
                    icon: MousePointerClick
                },
                {
                    title: "Sales & Valuation",
                    description: "Apply your <strong>Conversion Rate</strong> and <strong>Average Order Value</strong> to reveal your total sales revenue and final campaign ROI.",
                    icon: DollarSign
                }
            ]}
        />
    )
}
