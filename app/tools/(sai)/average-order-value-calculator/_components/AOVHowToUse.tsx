"use client"

import { ToolSteps } from "@/app/tools/_shared/components"
import { DollarSign, ShoppingBag, Calculator } from "lucide-react"

export function AOVHowToUse() {
    return (
        <ToolSteps
            steps={[
                {
                    title: "Enter Revenue",
                    description: "Input the total revenue generated over a specific period (e.g., last month or year).",
                    icon: DollarSign
                },
                {
                    title: "Enter Orders",
                    description: "Input the total number of individual orders placed during that same period.",
                    icon: ShoppingBag
                },
                {
                    title: "Calculate AOV",
                    description: "The calculator divides revenue by orders to show you how much the average customer spends per transaction.",
                    icon: Calculator
                }
            ]}
        />
    )
}
