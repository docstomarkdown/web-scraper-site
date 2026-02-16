"use client"

import { ToolSteps } from "@/app/tools/_shared/components"
import { Tag, Truck, Percent } from "lucide-react"

export function EbayFeeHowToUse() {
    return (
        <ToolSteps
            steps={[
                {
                    title: "Enter Sales Price",
                    description: "Input the final sold price and any shipping you collected from the buyer.",
                    icon: Tag
                },
                {
                    title: "Add Investment Costs",
                    description: "Enter what you paid for the item and the actual cost of the shipping label.",
                    icon: Truck
                },
                {
                    title: "Check Tax & Fees",
                    description: "Adjust the Final Value Fee % if needed (default 13.25%). Add any Ad Rate % if you used Promoted Listings.",
                    icon: Percent
                }
            ]}
        />
    )
}
