"use client"
import { ToolSteps } from "@/app/tools/_shared/components"
import { Users, BarChart3, DollarSign, TrendingUp } from "lucide-react"
export function EmailROIHowToUse() {
    return (
        <ToolSteps
            title="How to Use This Calculator"
            steps={[
                {
                    title: "Add Values",
                    description: "Input your baseline amounts in the fields provided to the left.",
                    icon: Users
                },
                {
                    title: "Adjust Data",
                    description: "Optionally toggle secondary parameters to reflect true conditions.",
                    icon: BarChart3
                },
                {
                    title: "Check Output",
                    description: "Instantly view exact performance calculations and copy metrics.",
                    icon: DollarSign
                }
            ]}
        />
    )
}