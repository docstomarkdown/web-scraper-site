"use client"
import { ToolSteps } from "@/app/tools/_shared/components"
import { Package, HandCoins, AlertTriangle } from "lucide-react"
export function FBARemovalHowToUse() {
    return (
        <ToolSteps
            steps={[
                {
                    title: "Enter Inventory Details",
                    description: "Input the total number of units you are planning to remove or dispose from Amazon's fulfillment centers.",
                    icon: Package
                },
                {
                    title: "Add Fees & Expected Price",
                    description: "Provide the Amazon removal and disposal fees per unit, and factor in how much you could resell each item for upon return.",
                    icon: HandCoins
                },
                {
                    title: "Discover the Best Action",
                    description: "The calculator compares potential profit and loss scenarios to recommend the most cost-effective decision: Remove, Dispose, or Hold.",
                    icon: AlertTriangle
                }
            ]}
        />
    )
}