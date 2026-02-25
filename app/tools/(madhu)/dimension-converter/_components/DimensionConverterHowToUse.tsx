"use client"

import { ToolSteps } from "@/app/tools/_shared/components"
import { RefreshCw, ClipboardList, Calculator } from "lucide-react"

export function DimensionConverterHowToUse() {
    return (
        <ToolSteps
            title="How to Use This Converter"
            steps={[
                {
                    title: "Choose Your Base Units",
                    description: "Select between Inches or Centimeters using the unit toggle. Your calculations will automatically update across all units.",
                    icon: RefreshCw
                },
                {
                    title: "Input Dimensions &amp; Fine-Tune",
                    description: "Enter length, width, and height. Use the <b>integrated arrow controls</b> to increment or decrement values for precise product matching.",
                    icon: ClipboardList
                },
                {
                    title: "Analyze Volume &amp; Conversion",
                    description: "Review the <b>Total Volume</b> and the <b>Given vs Result</b> table. These live calculations provide precise cubic data and conversions for your products.",
                    icon: Calculator
                }
            ]}
        />
    )
}
