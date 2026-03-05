"use client"
import { ToolSteps } from "@/app/tools/_shared/components"
import { MousePointerClick, Calculator, TrendingUp } from "lucide-react"
export function CPAHowToUse() {
    return (
        <ToolSteps
            steps={[
                {
                    title: "Marketing Cost",
                    description: "Enter the total combined budget given strictly to ads, tools, and labor.",
                    icon: MousePointerClick
                },
                {
                    title: "New Shoppers",
                    description: "Input the absolute exact number of fresh buyers acquired via the promo.",
                    icon: Calculator
                },
                {
                    title: "Check CPA",
                    description: "Instantly view your average holistic cost to bring in one single new customer.",
                    icon: TrendingUp
                }
            ]}
        />
    )
}