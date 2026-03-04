"use client"
import { ToolSteps } from "@/app/tools/_shared/components"
import { Tag, Truck, Percent } from "lucide-react"
export function EbayFeeHowToUse() {
    return (
        <ToolSteps
            steps={[
                {
                    title: "List Price",
                    description: "Enter target selling cost, requested shipping fees, and your active store tier.",
                    icon: Tag
                },
                {
                    title: "Set Category",
                    description: "Select accurate item class taxonomy for the correct final value constraints.",
                    icon: Truck
                },
                {
                    title: "Check Profit",
                    description: "Instantly evaluate overall explicit eBay markdowns and your net money kept.",
                    icon: Percent
                }
            ]}
        />
    )
}