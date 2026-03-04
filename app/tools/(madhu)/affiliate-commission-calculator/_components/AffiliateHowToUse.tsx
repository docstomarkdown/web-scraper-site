"use client"
import { ToolSteps } from "@/app/tools/_shared/components"
import { DollarSign, Percent, TrendingUp, AlertCircle, ShieldCheck } from "lucide-react"
export function AffiliateHowToUse() {
    return (
        <ToolSteps
            title="How to Use This Calculator"
            steps={[
                {
                    title: "Traffic Data",
                    description: "Enter expected visitors, click conversion, and total checkout values.",
                    icon: DollarSign
                },
                {
                    title: "Commission Rate",
                    description: "Input your flat fee or percentage rate applied per successful sale.",
                    icon: Percent
                },
                {
                    title: "View Earnings",
                    description: "Instantly check your projected affiliate income and total revenue.",
                    icon: TrendingUp
                }
            ]}
        />
    )
}