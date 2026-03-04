"use client"
import { ToolSteps } from "@/app/tools/_shared/components"
import { ShoppingCart, CreditCard, Percent } from "lucide-react"
export function AbandonmentHowToUse() {
    return (
        <ToolSteps
            steps={[
                {
                    title: "Started Carts",
                    description: "Enter the overall number of checkout carts created by curious shoppers.",
                    icon: ShoppingCart
                },
                {
                    title: "Finished Sales",
                    description: "Input the actual concrete number of retail transactions that finalized.",
                    icon: CreditCard
                },
                {
                    title: "Check Droprate",
                    description: "Instantly see your specific percentage of ghosted sales to optimize funnels.",
                    icon: Percent
                }
            ]}
        />
    )
}