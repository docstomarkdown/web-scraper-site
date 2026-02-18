"use client"

import { ToolSteps } from "@/app/tools/_shared/components"
import { Box, Calendar, Package } from "lucide-react"

export function StorageFeeHowToUse() {
    return (
        <ToolSteps
            steps={[
                {
                    title: "Measure Product",
                    description: "Enter the Length, Width, and Height of a SINGLE packaged unit in inches.",
                    icon: Box
                },
                {
                    title: "Total Inventory",
                    description: "Input the total number of units you plan to store in Amazon's warehouses.",
                    icon: Package
                },
                {
                    title: "Select Season",
                    description: "Choose the time of year. Remember that fees are significantly higher during Q4 (Oct-Dec).",
                    icon: Calendar
                }
            ]}
        />
    )
}
