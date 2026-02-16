"use client"

import { ToolSteps } from "@/app/tools/_shared/components"
import { Tag, DollarSign, Settings } from "lucide-react"

export function EtsyFeeHowToUse() {
    return (
        <ToolSteps
            steps={[
                {
                    title: "Enter Sale Details",
                    description: "Input your selling price and any shipping amount you charge the customer.",
                    icon: Tag
                },
                {
                    title: "Input Costs",
                    description: "Add your item material/labor cost and what you pay to ship the item.",
                    icon: DollarSign
                },
                {
                    title: "Configure Fees",
                    description: "Verify the fee rates. If the sale came from an Offsite Ad, enter 15% (or 12%) in the Offsite Ads field.",
                    icon: Settings
                }
            ]}
        />
    )
}
