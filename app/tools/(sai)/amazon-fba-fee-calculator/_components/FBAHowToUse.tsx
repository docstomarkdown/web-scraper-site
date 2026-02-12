"use client"

import { ToolSteps } from "@/app/tools/_shared/components"
import { Scale, Package, Banknote } from "lucide-react"

export function FBAHowToUse() {
    return (
        <ToolSteps
            steps={[
                {
                    title: "Enter Dimensions & Weight",
                    description: "Accurately enter your packaged product's length, width, height, and weight. Amazon fees heavily depend on size tiers.",
                    icon: Scale
                },
                {
                    title: "Input Selling Price",
                    description: "Enter the price you intend to sell at. This is used to calculate the Referral Fee (typically 15% of the sale price).",
                    icon: Package
                },
                {
                    title: "View Total Fees",
                    description: "Instantly see your estimated Amazon FBA Fulfillment Fee and Referral Fee totals.",
                    icon: Banknote
                }
            ]}
        />
    )
}
