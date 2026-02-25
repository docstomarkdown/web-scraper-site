"use client"

import { ToolSteps } from "@/app/tools/_shared/components"
import { Package, Grid3x3, Layers, Target } from "lucide-react"

export function PalletHowToUse() {
    return (
        <ToolSteps
            title="How to Use This Calculator"
            steps={[
                {
                    title: "Enter carton dimensions",
                    description: "Input your box <b>Length, Width, Height, and Weight</b>. Switch between <b>inches and centimeters</b> for global accuracy.",
                    icon: Package
                },
                {
                    title: "Choose pallet &amp; preset",
                    description: "Select from <b>Standard US, Euro, or Custom</b> pallets. Use presets like <b>Amazon FBA</b> or <b>Standard LTL</b> to auto-set safety height limits.",
                    icon: Grid3x3
                },
                {
                    title: "Check 3D layout &amp; export",
                    description: "Analyze the <b>3D isometric visualization</b> to see exactly how boxes stack. Use the <b>Copy</b> button to save your loading plan for warehouse teams.",
                    icon: Layers
                }
            ]}
            goal={{
                title: "Pack smarter, ship cheaper",
                description: "Maximize your pallet real estate to lower costs by fitting more units into every shipment. Perfect for e-commerce brands looking to optimize FBA and LTL logistics.",
                icon: Target
            }}
        />
    )
}
