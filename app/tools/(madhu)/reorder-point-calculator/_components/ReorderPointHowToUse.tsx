"use client"
import { ToolSteps } from "@/app/tools/_shared/components"
import { TrendingUp, Clock, ShieldCheck, Timer, CheckCircle2 } from "lucide-react"
export function ReorderPointHowToUse() {
    return (
        <ToolSteps
            title="How to Use This Tool"
            steps={[
                {
                    title: "Daily Units Sold",
                    description: "Enter how many products you typically sell in a day. Use an average of your last 30 days of sales to get an accurate daily velocity.",
                    icon: TrendingUp
                },
                {
                    title: "Delivery Lead Time",
                    description: "Enter the number of days your supplier usually takes to deliver products to your warehouse, including processing time.",
                    icon: Clock
                },
                {
                    title: "Safety Stock",
                    description: "Optionally, enter emergency units to keep as a buffer. Use this if your sales are unpredictable or your supplier is often late.",
                    icon: ShieldCheck
                }
            ]}
        />
    )
}
