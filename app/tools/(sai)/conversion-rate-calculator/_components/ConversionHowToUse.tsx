"use client"
import { ToolSteps } from "@/app/tools/_shared/components"
import { Users, MousePointerClick, TrendingUp } from "lucide-react"
export function ConversionHowToUse() {
    return (
        <ToolSteps
            steps={[
                {
                    title: "Total Traffic",
                    description: "Enter exact site unique visitors or page impressions during your period.",
                    icon: Users
                },
                {
                    title: "Total Actions",
                    description: "Input the number of totally successful sales or captured digital leads.",
                    icon: MousePointerClick
                },
                {
                    title: "Check Rate",
                    description: "Instantly calculate your raw conversion percentage to gauge site health.",
                    icon: TrendingUp
                }
            ]}
        />
    )
}