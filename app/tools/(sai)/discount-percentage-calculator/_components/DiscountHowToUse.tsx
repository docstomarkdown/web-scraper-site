"use client"

import { ToolSteps } from "@/app/tools/_shared/components"
import { CircleDollarSign, Calculator, TrendingUp } from "lucide-react"

export function DiscountHowToUse() {
    return (
        <ToolSteps
            steps={[
                {
                    title: "Enter Price & Discount",
                    description: "Input the original price of the item and the discount percentage you want to apply.",
                    icon: CircleDollarSign
                },
                {
                    title: "Check Savings",
                    description: "The calculator immediately shows you exactly how much money you are saving.",
                    icon: Calculator
                },
                {
                    title: "See Final Price",
                    description: "View the final discounted price you will pay after the reduction is applied.",
                    icon: TrendingUp
                }
            ]}
        />
    )
}
