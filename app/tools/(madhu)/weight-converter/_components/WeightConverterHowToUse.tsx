"use client"

import { ToolSteps } from "@/app/tools/_shared/components"
import { Scale, Target, Truck } from "lucide-react"

export function WeightConverterHowToUse() {
    return (
        <ToolSteps
            title="How to Use This Tool"
            steps={[
                {
                    title: "Set your input weight",
                    description: "Enter your product's weight as provided by your supplier. Be sure to include <b>packaging materials</b> (box, tape, labels) for an accurate shipping estimate.",
                    icon: Scale
                },
                {
                    title: "Configure target units",
                    description: "Select your input unit and your preferred target unit. The tool will instantly show your main result and synchronize across the full <b>conversion matrix</b>.",
                    icon: Target
                },
                {
                    title: "Analyze shipping impact",
                    description: "Review the 'Shipping impact analysis' card to see which carrier tier your product falls into. Watch for <b>critical cost warnings</b> if you are near a weight threshold.",
                    icon: Truck
                }
            ]}
            goal={{
                title: "Maximize shipping efficiency",
                description: "Use the live data to see if lowering product weight by even a fraction of an ounce can move you into a cheaper shipping tier, saving you thousands in annual fees.",
                icon: Target
            }}
        />
    )
}
