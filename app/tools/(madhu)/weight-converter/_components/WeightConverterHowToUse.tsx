"use client"
import { ToolSteps } from "@/app/tools/_shared/components"
import { Scale, Truck, ChevronDown } from "lucide-react"

export function WeightConverterHowToUse() {
    return (
        <ToolSteps
            title="How to Use This Tool"
            steps={[
                {
                    title: "Enter Item Weight",
                    description: "Just type in your item's weight and pick your unit (like pounds or kilograms). We'll instantly convert it into all other measurement sizes for you.",
                    icon: Scale
                },
                {
                    title: "Select Shipping",
                    description: "Want to know shipping costs? Choose your preferred carrier or shipping speed, and we'll automatically find the correct pricing tier for your item's weight.",
                    icon: Truck
                },
                {
                    title: "View Breakdown",
                    description: "Open the cost breakdown to see exactly which shipping bracket your item falls into, and easily check how much more weight you can add before the price goes up!",
                    icon: ChevronDown
                }
            ]}
        />
    )
}
