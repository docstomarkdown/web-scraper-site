"use client"
import { ToolSteps } from "@/app/tools/_shared/components"
import { Weight, SlidersHorizontal, LayoutList } from "lucide-react"
export function WeightConverterHowToUse() {
    return (
        <ToolSteps
            title="How to Use This Weight Converter"
            steps={[
                {
                    title: "Enter Weight Value",
                    description: "Type the numeric weight value you want to convert in the input field.",
                    icon: Weight
                },
                {
                    title: "Select Units",
                    description: "Choose your input unit (lbs, oz, kg, or g) and target unit using the tab buttons. The target unit cannot be the same as the input unit.",
                    icon: SlidersHorizontal
                },
                {
                    title: "View Results",
                    description: "Instantly see the converted weight in your target unit, plus all other unit conversions displayed in the results panel.",
                    icon: LayoutList
                }
            ]}
        />
    )
}
