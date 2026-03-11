"use client"
import { ToolSteps } from "@/app/tools/_shared/components"
import { Container, Box, CheckCircle2, Truck } from "lucide-react"
export function ContainerLoadHowToUse() {
    return (
        <ToolSteps
            title="How to Use This Tool"
            steps={[
                {
                    title: "Container Type",
                    description: "Select standard sizes (20ft, 40ft) or enter customized container specs.",
                    icon: Container
                },
                {
                    title: "Item Details",
                    description: "Input the exact length, width, height, and weight of your cargo boxes.",
                    icon: Box
                },
                {
                    title: "Calculate Fit",
                    description: "See max capacity, utilization rates, and optimal stacking efficiency.",
                    icon: CheckCircle2
                }
            ]}
        />
    )
}