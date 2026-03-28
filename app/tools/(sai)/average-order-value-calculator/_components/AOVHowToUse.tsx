"use client"
import { ToolSteps } from "@/app/tools/_shared/components"
import { DollarSign, ShoppingBag, Calculator } from "lucide-react"
export function AOVHowToUse() {
    return (
        <ToolSteps
            steps={[
                {
                    title: "Select Currency",
                    description: "Start by choosing your preferred local currency from the global dropdown menu located in the card header.",
                    icon: DollarSign
                },
                {
                    title: "Input Sales Metrics",
                    description: "Enter your total gross revenue alongside the exact number of transactions your store recorded during the period.",
                    icon: ShoppingBag
                },
                {
                    title: "Analyze Dashboard",
                    description: "Instantly review your true Average Order Value, complete with dynamic performance badges and side-by-side metric breakdowns.",
                    icon: Calculator
                }
            ]}
        />
    )
}