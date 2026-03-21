"use client"
import { ToolSteps } from "@/app/tools/_shared/components"
import { Users, MousePointerClick, TrendingUp } from "lucide-react"

export function EmailROIHowToUse() {
    return (
        <ToolSteps
            title="How to Calculate Your Email ROI"
            steps={[
                {
                    title: "Campaign Details",
                    description: "Provide your <strong>Number of Email Subscribers</strong> and set your <strong>Total Campaign Cost</strong> (if applicable) to define your campaign’s scale.",
                    icon: Users
                },
                {
                    title: "Performance Metrics",
                    description: "Add your <strong>Open Rate</strong> and <strong>Click Rate</strong> to map out exactly how much traffic your email will drive to your offer.",
                    icon: MousePointerClick
                },
                {
                    title: "Revenue & Profit",
                    description: "Enter your <strong>Sales Conversion Rate</strong> and <strong>Average Order Value</strong> to instantly reveal your total sales, net profit, and ROI.",
                    icon: TrendingUp
                }
            ]}
        />
    )
}

