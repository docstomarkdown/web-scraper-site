"use client"
import { ToolSteps } from "@/app/tools/_shared/components"
import { Ruler, DollarSign, LayoutList } from "lucide-react"

export function CubicFeetHowToUse() {
    return (
        <ToolSteps
            title="How to Use This Calculator"
            steps={[
                {
                    title: "Set Your Unit & Dimensions",
                    description: "Choose Feet, Inches, CM, or Meters from the unit tabs, then enter Length, Width, and Height. Results update instantly as you type — no submit needed.",
                    icon: Ruler
                },
                {
                    title: "Add Quantity & Cost (Optional)",
                    description: "Enter the number of identical units to calculate total volume, and optionally add a cost-per-ft³ rate with your preferred currency to get an Estimated Total Cost.",
                    icon: DollarSign
                },
                {
                    title: "Read Your Results",
                    description: "The Results Panel shows your primary volume in Cubic Feet, along with Total Volume (if quantity > 1), Other Units (m³ and in³), and Estimated Total Cost — all in one clean panel.",
                    icon: LayoutList
                }
            ]}
        />
    )
}
