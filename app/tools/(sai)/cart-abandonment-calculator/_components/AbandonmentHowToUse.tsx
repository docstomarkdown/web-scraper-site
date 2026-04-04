"use client"
import { ToolSteps } from "@/app/tools/_shared/components"
import { ShoppingCart, CreditCard, Activity } from "lucide-react"

export function AbandonmentHowToUse() {
    return (
        <ToolSteps
            title="How to Use This Calculator"
            steps={[
                {
                    title: "Enter Cart Data",
                    description: "Input the total number of checkout carts created by your visitors over a specific time period.",
                    icon: ShoppingCart
                },
                {
                    title: "Enter Sales Data",
                    description: "Input the actual number of completed transactions (successful purchases) from that same period.",
                    icon: CreditCard
                },
                {
                    title: "View Insights",
                    description: "Instantly see your Cart Abandonment Rate, the number of lost users, and smart performance insights.",
                    icon: Activity
                }
            ]}
        />
    )
}