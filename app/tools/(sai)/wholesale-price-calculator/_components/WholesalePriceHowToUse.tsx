"use client"
import { ToolSteps } from "@/app/tools/_shared/components"
import { Tag, Percent, DollarSign } from "lucide-react"
export function WholesalePriceHowToUse() {
    return (
        <ToolSteps
            steps={[
                {
                    title: "Build Costs",
                    description: "Enter deeply thorough explicitly validated aggregate landed expense bounds covering holistic factory manufacturing alongside absolute logistic import drops.",
                    icon: Tag
                },
                {
                    title: "Set Metrics",
                    description: "Input fundamentally required percentage margin thresholds structurally targeting totally viable sustainable gross profitability metrics actively growing scale.",
                    icon: Percent
                },
                {
                    title: "Check Targets",
                    description: "Instantly trace specifically aligned suggested raw retail pricing limits explicitly accommodating middle distributor markups preserving net core gross.",
                    icon: DollarSign
                }
            ]}
        />
    )
}