"use client"
import { ToolSteps } from "@/app/tools/_shared/components"
import { Tag, Truck, Calculator } from "lucide-react"
export function PoshmarkFeeHowToUse() {
    return (
        <ToolSteps
            steps={[
                {
                    title: "Sale Info",
                    description: "Enter intended catalog retail selling tag plus any deliberate shipping incentives listed.",
                    icon: Tag
                },
                {
                    title: "Sourcing",
                    description: "Input optional prior original manufacturer wholesale sourcing amount to get net margin.",
                    icon: Truck
                },
                {
                    title: "Check Cost",
                    description: "Instantly calculate standard rigid $2.95 cuts or heavy 20% platform value surcharges.",
                    icon: Calculator
                }
            ]}
        />
    )
}