"use client"
import { ToolSteps } from "@/app/tools/_shared/components"
import { Building2, Tag, Target } from "lucide-react"

export function BreakEvenHowToUse() {
    return (
        <ToolSteps
            steps={[
                {
                    title: "Input Business Overheads",
                    description: "Enter your total fixed costs like rent, software, and salaries that don't change with sales.",
                    icon: Building2
                },
                {
                    title: "Enter Unit Economics",
                    description: "Add your planned selling price and the variable costs to produce or ship one single unit.",
                    icon: Tag
                },
                {
                    title: "Review Target Volume",
                    description: "Instantly see the exact number of units you need to sell to cover all costs and start profiting.",
                    icon: Target
                }
            ]}
        />
    )
}