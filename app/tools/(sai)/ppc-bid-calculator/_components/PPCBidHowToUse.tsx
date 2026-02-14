"use client"

import { ToolSteps } from "@/app/tools/_shared/components"
import { Calculator, Target, BarChart2 } from "lucide-react"

export function PPCBidHowToUse() {
    return (
        <ToolSteps
            steps={[
                {
                    title: "Enter Product Price",
                    description: "Input the selling price of your product.",
                    icon: Calculator
                },
                {
                    title: "Set Conversion Rate",
                    description: "Enter your average conversion rate (orders / clicks).",
                    icon: BarChart2
                },
                {
                    title: "Define Target Advertising Cost of Sales (ACoS)",
                    description: "Set your target Advertising Cost of Sales (ACoS) percentage.",
                    icon: Target
                }
            ]}
        />
    )
}
