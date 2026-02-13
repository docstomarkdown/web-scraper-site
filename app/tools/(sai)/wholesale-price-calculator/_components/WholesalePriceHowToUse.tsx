"use client"

import { ToolSteps } from "@/app/tools/_shared/components"
import { Tag, Percent, DollarSign } from "lucide-react"

export function WholesalePriceHowToUse() {
    return (
        <ToolSteps
            steps={[
                {
                    title: "Enter Unit Cost",
                    description: "Input the total cost to produce or acquire one single unit of your product.",
                    icon: Tag
                },
                {
                    title: "Set Target Margin",
                    description: "Enter the profit margin percentage you want to achieve on the final wholesale price.",
                    icon: Percent
                },
                {
                    title: "Get Wholesale Price",
                    description: "Instantly see the recommended wholesale price, profit per unit, and markup percentage.",
                    icon: DollarSign
                }
            ]}
        />
    )
}
