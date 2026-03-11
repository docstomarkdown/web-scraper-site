"use client"
import { ToolSteps } from "@/app/tools/_shared/components"
import { Tag, DollarSign, Settings } from "lucide-react"
export function EtsyFeeHowToUse() {
    return (
        <ToolSteps
            steps={[
                {
                    title: "Sale Details",
                    description: "Enter expected sales ticket, any billed shipping fees, and material creation cost.",
                    icon: Tag
                },
                {
                    title: "Ad Traffic",
                    description: "Specify completely if this sale relied heavily on platform Offsite Ad networks.",
                    icon: DollarSign
                },
                {
                    title: "Check Returns",
                    description: "Instantly summarize all listing, active transaction, and specific processing cuts.",
                    icon: Settings
                }
            ]}
        />
    )
}