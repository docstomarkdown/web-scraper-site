"use client"
import { ToolSteps } from "@/app/tools/_shared/components"
import { Tag, Percent, DollarSign } from "lucide-react"

export function WholesalePriceHowToUse() {
    return (
        <ToolSteps
            steps={[
                {
                    title: "Enter Your Costs",
                    description: "Input your cost per unit and any applicable tax or import duty rates to establish your true cost base.",
                    icon: Tag
                },
                {
                    title: "Set Your Margin",
                    description: "Enter the profit margin percentage you need to achieve on each wholesale sale.",
                    icon: Percent
                },
                {
                    title: "Get Your Price",
                    description: "Instantly see the recommended wholesale price, required markup percentage, and profit per unit.",
                    icon: DollarSign
                }
            ]}
        />
    )
}