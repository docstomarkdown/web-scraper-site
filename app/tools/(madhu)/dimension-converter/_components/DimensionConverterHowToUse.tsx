"use client"
import { ToolSteps } from "@/app/tools/_shared/components"
import { RefreshCw, ClipboardList, Calculator } from "lucide-react"
export function DimensionConverterHowToUse() {
    return (
        <ToolSteps
            title="How to Use This Converter"
            steps={[
                {
                    title: "Input Value",
                    description: "Enter the exact numeric length, width, or height you need to switch.",
                    icon: RefreshCw
                },
                {
                    title: "Select Units",
                    description: "Choose the initial unit and the target measurement unit standard.",
                    icon: ClipboardList
                },
                {
                    title: "Get Conversion",
                    description: "Instantly copy the precisely converted dimensions for your specs.",
                    icon: Calculator
                }
            ]}
        />
    )
}