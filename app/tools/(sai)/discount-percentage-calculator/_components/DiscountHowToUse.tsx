"use client"
import { ToolSteps } from "@/app/tools/_shared/components"
import { CircleDollarSign, Calculator, TrendingUp } from "lucide-react"
export function DiscountHowToUse() {
    return (
        <ToolSteps
            steps={[
                {
                    title: "Start Price",
                    description: "Enter the fixed standard corporate retail price before applying any promotions.",
                    icon: CircleDollarSign
                },
                {
                    title: "Sale Target",
                    description: "Input exactly either the numerical money cut or the percentage discount rate.",
                    icon: Calculator
                },
                {
                    title: "Check Cost",
                    description: "Instantly see the final checkout tag price and the sheer cash difference saved.",
                    icon: TrendingUp
                }
            ]}
        />
    )
}