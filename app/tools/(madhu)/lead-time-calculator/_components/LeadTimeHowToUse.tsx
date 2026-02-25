"use client"

import { ToolSteps } from "@/app/tools/_shared/components"
import { Factory, Ship, ShieldCheck } from "lucide-react"

export function LeadTimeHowToUse() {
    return (
        <ToolSteps
            title="How to Use This Calculator"
            steps={[
                {
                    title: "Enter Supplier Time",
                    description: "Input the total days your supplier needs for order processing and production. This covers everything from order placement to factory departure.",
                    icon: Factory
                },
                {
                    title: "Add Shipping Time",
                    description: "Enter the estimated days for transit and customs clearance. Whether by sea or air, include the time from factory departure to arrival at your warehouse.",
                    icon: Ship
                },
                {
                    title: "Set Safety Buffer",
                    description: "Add a safety margin for unexpected delays. A good rule of thumb is 15-20% of your total estimated time to account for inspections or congestion.",
                    icon: ShieldCheck
                }
            ]}
        />
    )
}
