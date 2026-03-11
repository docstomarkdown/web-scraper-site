"use client"
import { ToolSteps } from "@/app/tools/_shared/components"
import { DollarSign, BarChart2 } from "lucide-react"
export function ACoSHowToUse() {
    return (
        <ToolSteps
            steps={[
                {
                    title: "Total Spend",
                    description: "Enter the overall exact amount of money spent on Amazon PPC campaigns.",
                    icon: DollarSign
                },
                {
                    title: "Ads Revenue",
                    description: "Input the total sales generated uniquely and directly from those ads.",
                    icon: BarChart2
                },
                {
                    title: "Check ACoS",
                    description: "Instantly calculate your Advertising Cost of Sales return percentage.",
                    icon: DollarSign
                }
            ]}
        />
    )
}