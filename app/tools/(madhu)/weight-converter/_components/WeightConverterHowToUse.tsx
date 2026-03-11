"use client"
import { ToolSteps } from "@/app/tools/_shared/components"
import { Scale, Target, Truck } from "lucide-react"
export function WeightConverterHowToUse() {
    return (
        <ToolSteps
            title="How to Use This Tool"
            steps={[
                {
                    title: "Enter Mass",
                    description: "Type numeric weight data and select the initial starting unit standard.",
                    icon: Scale
                },
                {
                    title: "Select Target",
                    description: "Choose the final measurement unit constraint you want to convert into.",
                    icon: Target
                },
                {
                    title: "Get Result",
                    description: "Instantly calculate and copy the exact fractional weight for logistics.",
                    icon: Truck
                }
            ]}
        />
    )
}