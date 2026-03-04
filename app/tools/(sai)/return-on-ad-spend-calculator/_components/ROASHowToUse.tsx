"use client"
import { ToolSteps } from "@/app/tools/_shared/components"
import { TrendingUp, DollarSign, BarChart3 } from "lucide-react"
export function ROASHowToUse() {
    return (
        <ToolSteps
            steps={[
                {
                    title: "Ad Cash",
                    description: "Enter exactly the absolute full tracked financial investment placed heavily into promotion environments.",
                    icon: DollarSign
                },
                {
                    title: "Ad Revenue",
                    description: "Input explicit raw return values historically generated and sourced directly off specific paid marketing.",
                    icon: TrendingUp
                },
                {
                    title: "Check ROAS",
                    description: "Instantly pinpoint multiplier scaling effects highlighting precisely how strongly cash generates retail returns.",
                    icon: BarChart3
                }
            ]}
        />
    )
}