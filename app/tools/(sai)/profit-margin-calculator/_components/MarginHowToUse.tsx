"use client"
import { ToolSteps } from "@/app/tools/_shared/components"
import { CircleDollarSign, Calculator, TrendingUp } from "lucide-react"
export function MarginHowToUse() {
    return (
        <ToolSteps
            steps={[
                {
                    title: "Sale Return",
                    description: "Enter absolute final storefront ticket pricing actively charged completely to final checkout buyers.",
                    icon: CircleDollarSign
                },
                {
                    title: "Total Spend",
                    description: "Input comprehensive sheer costs physically manufacturing, importing, packing, and holding goods.",
                    icon: Calculator
                },
                {
                    title: "Get Margins",
                    description: "Instantly map precise specific gross profitability metrics showing hard dollars and raw percentage.",
                    icon: TrendingUp
                }
            ]}
        />
    )
}