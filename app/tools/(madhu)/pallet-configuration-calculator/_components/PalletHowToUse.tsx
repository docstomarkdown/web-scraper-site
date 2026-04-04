"use client"
import { ToolSteps } from "@/app/tools/_shared/components"
import { Box, Layers, Eye } from "lucide-react"

export function PalletHowToUse() {
    return (
        <ToolSteps
            title="How to Use This Calculator"
            steps={[
                {
                    title: "Box Dimensions",
                    description: "Input your box <strong>Length</strong>, <strong>Width</strong>, and <strong>Height</strong>. Use the <strong>in / cm</strong> toggle to switch between units.",
                    icon: Box
                },
                {
                    title: "Pallet Settings",
                    description: "Select <strong>Standard</strong>, <strong>Euro</strong>, or <strong>Custom</strong>. Adjust the <strong>Max Stack Height</strong> if needed for carrier compliance.",
                    icon: Layers
                },
                {
                    title: "Optimal Layout",
                    description: "Instantly see the best <strong>box orientation</strong>, total units per pallet, layers, space efficiency, and a <strong>live visual preview</strong>.",
                    icon: Eye
                }
            ]}
        />
    )
}
