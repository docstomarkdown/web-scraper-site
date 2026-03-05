"use client"
import { ToolSteps } from "@/app/tools/_shared/components"
import { DollarSign, Package, ShoppingCart, TrendingUp } from "lucide-react"
export function InfluencerHowToUse() {
    return (
        <ToolSteps
            title="How to Calculate Your ROI"
            steps={[
                {
                    title: "Add Values",
                    description: "Input your baseline amounts in the fields provided to the left.",
                    icon: DollarSign
                },
                {
                    title: "Adjust Data",
                    description: "Optionally toggle secondary parameters to reflect true conditions.",
                    icon: Package
                },
                {
                    title: "Check Output",
                    description: "Instantly view exact performance calculations and copy metrics.",
                    icon: ShoppingCart
                }
            ]}
        />
    )
}