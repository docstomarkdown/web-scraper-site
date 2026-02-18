"use client"

import { ToolSteps } from "@/app/tools/_shared/components"
import { ShoppingCart, CreditCard, Percent } from "lucide-react"

export function AbandonmentHowToUse() {
    return (
        <ToolSteps
            steps={[
                {
                    title: "Count Shopping Carts",
                    description: "Identify how many unique shopping carts were created or initiated by users in your analytics.",
                    icon: ShoppingCart
                },
                {
                    title: "Count Completed Sales",
                    description: "Count the number of those carts that successfully resulted in a completed transaction.",
                    icon: CreditCard
                },
                {
                    title: "See Abandonment Rate",
                    description: "The calculator will show the percentage of users who left without buying. Lower is better.",
                    icon: Percent
                }
            ]}
        />
    )
}
