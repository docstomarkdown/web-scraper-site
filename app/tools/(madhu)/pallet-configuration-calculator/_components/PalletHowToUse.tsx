"use client"
import { ToolSteps } from "@/app/tools/_shared/components"
import { Package, Grid3x3, Layers, Target } from "lucide-react"
export function PalletHowToUse() {
    return (
        <ToolSteps
            title="How to Use This Calculator"
            steps={[
                {
                    title: "Pallet Size",
                    description: "Select a standard pallet base format or enter custom footprint specs.",
                    icon: Package
                },
                {
                    title: "Box Details",
                    description: "Input the exact physical length, width, height, and unit box weight.",
                    icon: Grid3x3
                },
                {
                    title: "Optimize Build",
                    description: "Determine the most efficient maximum layers and stacking arrangement.",
                    icon: Layers
                }
            ]}
        />
    )
}