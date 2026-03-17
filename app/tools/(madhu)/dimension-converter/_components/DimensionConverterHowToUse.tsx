"use client"
import { ToolSteps } from "@/app/tools/_shared/components"
import { Settings2, Ruler, Activity } from "lucide-react"
export function DimensionConverterHowToUse() {
    return (
        <ToolSteps
            title="How to Use This Converter"
            steps={[
                {
                    title: "Select Unit",
                    description: "Choose your input unit (Inches or Centimeters) using the toggle tabs above the dimension fields.",
                    icon: Settings2
                },
                {
                    title: "Enter Dimensions",
                    description: "Input the Length, Width, and Height of your item in the selected unit. All three fields are required for conversion.",
                    icon: Ruler
                },
                {
                    title: "View Results",
                    description: "Instantly see converted dimensions displayed in the Results Panel. Length, Width, and Height are converted from your input unit to the opposite unit (IN ↔ CM).",
                    icon: Activity
                }
            ]}
        />
    )
}
