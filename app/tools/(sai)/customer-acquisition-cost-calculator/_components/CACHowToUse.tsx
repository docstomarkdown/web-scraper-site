"use client"
import { ToolSteps } from "@/app/tools/_shared/components"
import { Calculator, DollarSign, TrendingUp } from "lucide-react"
export function CACHowToUse() {
    return (
        <ToolSteps
            steps={[
                {
                    title: "Sales Cost",
                    description: "Enter specific commissions, outbound tools, and direct sales team pay.",
                    icon: DollarSign
                },
                {
                    title: "Ad Budgets",
                    description: "Add total creative marketing spend and promotional expenditures overall.",
                    icon: Calculator
                },
                {
                    title: "Check Value",
                    description: "Divide by your overall new signups to verify your true cost per shopper.",
                    icon: TrendingUp
                }
            ]}
        />
    )
}