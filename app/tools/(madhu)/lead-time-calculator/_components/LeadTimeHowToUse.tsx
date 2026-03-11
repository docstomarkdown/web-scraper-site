"use client"
import { ToolSteps } from "@/app/tools/_shared/components"
import { Factory, Ship, ShieldCheck } from "lucide-react"
export function LeadTimeHowToUse() {
    return (
        <ToolSteps
            title="How to Use This Calculator"
            steps={[
                {
                    title: "Order Date",
                    description: "Specify exactly when the purchase order was submitted to the supplier.",
                    icon: Factory
                },
                {
                    title: "Delivery Date",
                    description: "Enter the specific date the goods actually arrived at your warehouse.",
                    icon: Ship
                },
                {
                    title: "Calculate Time",
                    description: "Instantly check your total exact lead time in days for solid forecasting.",
                    icon: ShieldCheck
                }
            ]}
        />
    )
}