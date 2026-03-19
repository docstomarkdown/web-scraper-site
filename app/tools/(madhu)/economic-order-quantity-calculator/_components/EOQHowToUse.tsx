"use client"
import { ToolSteps } from "@/app/tools/_shared/components"
import { CalendarRange, Banknote, Target } from "lucide-react"

export function EOQHowToUse() {
    return (
        <ToolSteps
            title="How to Use This Calculator"
            steps={[
                {
                    title: "Add Annual Demand",
                    description: "Input the total units your business expects to sell or use over a full 12-month period. If you have monthly data, just multiply it by 12.",
                    icon: CalendarRange
                },
                {
                    title: "Enter Ordering & Holding Costs",
                    description: "Provide your fixed Cost Per Order (shipping, handling, or admin fees) alongside the annual Holding Cost to store a single unit.",
                    icon: Banknote
                },
                {
                    title: "Get Optimal Ordering Setup",
                    description: "Instantly see the exact units to order each time, how many orders to place annually, and the total cost to manage your inventory per year.",
                    icon: Target
                }
            ]}
        />
    )
}