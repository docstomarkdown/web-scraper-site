"use client"
import { ToolSteps } from "@/app/tools/_shared/components"
import { Box, Settings2, Grid3x3 } from "lucide-react"
export function PalletHowToUse() {
    return (
        <ToolSteps
            title="How to Use This Calculator"
            steps={[
                {
                    title: "Enter Box Dimensions",
                    description: "Input your box length, width, and height in inches or centimeters. Use the IN/CM toggle to switch units.",
                    icon: Box
                },
                {
                    title: "Configure Pallet Settings",
                    description: "Select Standard US, Euro, or custom pallet size. Then choose a preset configuration or set max height and weight limits.",
                    icon: Settings2
                },
                {
                    title: "View Optimal Configuration",
                    description: "See the best box orientation, total units per pallet, layers, and 3D visualization instantly.",
                    icon: Grid3x3
                }
            ]}
        />
    )
}
