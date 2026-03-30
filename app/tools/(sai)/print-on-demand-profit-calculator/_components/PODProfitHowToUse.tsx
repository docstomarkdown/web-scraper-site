"use client"
import { ToolSteps } from "@/app/tools/_shared/components"
import { Tag, Calculator, Percent } from "lucide-react"

export function PODProfitHowToUse() {
    return (
        <ToolSteps
            steps={[
                {
                    title: "Enter Revenue & Costs",
                    description: "Input your item's selling price and the base manufacturing and shipping costs from your POD supplier (e.g., Printful).",
                    icon: Tag
                },
                {
                    title: "Add Marketplace Fees",
                    description: "Input transaction percentages and fixed processing fees for your selling platform or payment gateway.",
                    icon: Percent
                },
                {
                    title: "Review True Margins",
                    description: "Instantly see your exact net profit, total costs, and fully calculated profit margins per item sold.",
                    icon: Calculator
                }
            ]}
        />
    )
}