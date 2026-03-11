"use client"
import { ToolSteps } from "@/app/tools/_shared/components"
import { Calculator, Target, BarChart2 } from "lucide-react"
export function PPCBidHowToUse() {
    return (
        <ToolSteps
            steps={[
                {
                    title: "Target Cost",
                    description: "Enter strictly the highest acceptable percentage ceiling for advertising cost of sales.",
                    icon: Calculator
                },
                {
                    title: "Sale Impact",
                    description: "Input exactly the product listed ticket cost and expected historically accurate ad conversion.",
                    icon: BarChart2
                },
                {
                    title: "Get Max Bid",
                    description: "Instantly locate the numerical optimal maximum safe CPC bid preserving positive cashflow.",
                    icon: Target
                }
            ]}
        />
    )
}