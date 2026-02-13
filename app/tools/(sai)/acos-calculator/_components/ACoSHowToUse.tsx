"use client"

import { ToolSteps } from "@/app/tools/_shared/components"
import { DollarSign, BarChart2 } from "lucide-react"

export function ACoSHowToUse() {
    return (
        <ToolSteps
            steps={[
                {
                    title: "Enter Ad Spend",
                    description: "Input the total amount you spent on your advertising campaign.",
                    icon: DollarSign
                },
                {
                    title: "Enter Ad Revenue",
                    description: "Input the total revenue generated directly from those ads.",
                    icon: BarChart2
                },
                {
                    title: "View Result",
                    description: "See your ACoS percentage instantly to evaluate campaign efficiency.",
                    icon: BarChart2
                }
            ]}
        />
    )
}
