"use client"
import { ToolSteps } from "@/app/tools/_shared/components"
import { Ruler, DollarSign, LayoutList } from "lucide-react"

export function CubicFeetHowToUse() {
    return (
        <ToolSteps
            title="How to Use This Calculator"
            steps={[
                {
                    title: "Enter Dimensions",
                    description: "Select your preferred unit (like Inches or CM), then type in the length, width, and height of your item. We calculate everything instantly as you type.",
                    icon: Ruler
                },
                {
                    title: "Quantity & Cost",
                    description: "Got more than one identical box? Just enter the total quantity. You can also add your shipping provider's cost per cubic foot to estimate your final shipping bill.",
                    icon: DollarSign
                },
                {
                    title: "View Results",
                    description: "Your total volume appears instantly in the Results Panel! See exactly how many cubic feet your items take up, along with quick conversions and total cost estimates.",
                    icon: LayoutList
                }
            ]}
        />
    )
}
