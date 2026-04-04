"use client"
import { ToolSteps } from "@/app/tools/_shared/components"
import { Container, Box, Target } from "lucide-react"

export function ContainerLoadHowToUse() {
    return (
        <ToolSteps
            title="How to Use This Tool"
            steps={[
                {
                    title: "Container Setup",
                    description: "Select a standard container size or enter custom interior dimensions. Then choose between loose direct stacking or pallet loading.",
                    icon: Container
                },
                {
                    title: "Box Dimensions",
                    description: "Input your carton's length, width, and height. If using pallets, add pallet dimensions. Toggle between metric and imperial as needed.",
                    icon: Box
                },
                {
                    title: "View Results",
                    description: "Instantly view your maximum total units, optimal stacking arrangement, and overall space utilization percentage in the live results panel.",
                    icon: Target
                }
            ]}
        />
    )
}