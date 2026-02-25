"use client"

import { ToolSteps } from "@/app/tools/_shared/components"
import { Clock, Package, TrendingUp, ShieldCheck, Calendar, CheckCircle2 } from "lucide-react"

export function DaysOfInventoryHowToUse() {
    return (
        <ToolSteps
            title="How to Use This Tool"
            steps={[
                {
                    title: "Select Velocity Period",
                    description: "Choose how you track sales: Daily (for day-to-day tracking), Weekly (for weekly reports), or Monthly (for monthly data). The calculator automatically converts to daily burn rate.",
                    icon: Clock
                },
                {
                    title: "Input Current Stock",
                    description: "Enter the total physical units currently available in your warehouse. This is your starting inventory that will be depleted over time.",
                    icon: Package
                },
                {
                    title: "Enter Sales Speed",
                    description: "Input your average units sold per selected period. The tool will calculate your daily burn rate to determine how fast your inventory depletes.",
                    icon: TrendingUp
                },
                {
                    title: "Set Safety Buffer (Optional)",
                    description: "Define a safety stock level to exclude from your useable runway. This buffer protects against delays or unexpected demand spikes.",
                    icon: ShieldCheck
                },
                {
                    title: "Review Runway & Stock-Out Date",
                    description: "Check the total days remaining, estimated stock-out date, and your Net Useable Runway. Use status indicators (Critical, Warning, Healthy, Overstock) to prioritize reordering decisions.",
                    icon: Calendar
                }
            ]}
        />
    )
}
