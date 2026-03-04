"use client"
import { ToolSteps } from "@/app/tools/_shared/components"
import { Clock, Package, TrendingUp, ShieldCheck, Calendar, CheckCircle2 } from "lucide-react"
export function DaysOfInventoryHowToUse() {
    return (
        <ToolSteps
            title="How to Use This Tool"
            steps={[
                {
                    title: "Avg Inventory",
                    description: "Input your starting and ending holding values for the targeted period.",
                    icon: Clock
                },
                {
                    title: "Cost of Goods",
                    description: "Enter your total COGS (Cost of Goods Sold) for the exact same timeframe.",
                    icon: Package
                },
                {
                    title: "Check Status",
                    description: "View how many days it typically takes to clear your stock completely.",
                    icon: TrendingUp
                }
            ]}
        />
    )
}