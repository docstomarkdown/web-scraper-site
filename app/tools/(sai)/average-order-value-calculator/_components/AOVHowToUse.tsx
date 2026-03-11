"use client"
import { ToolSteps } from "@/app/tools/_shared/components"
import { DollarSign, ShoppingBag, Calculator } from "lucide-react"
export function AOVHowToUse() {
    return (
        <ToolSteps
            steps={[
                {
                    title: "Gross Revenue",
                    description: "Enter the combined sales revenue over your chosen reporting window.",
                    icon: DollarSign
                },
                {
                    title: "Total Orders",
                    description: "Input the total number of single distinct checkout transactions recorded.",
                    icon: ShoppingBag
                },
                {
                    title: "Check Value",
                    description: "Instantly evaluate exactly how much the average consumer spends total.",
                    icon: Calculator
                }
            ]}
        />
    )
}