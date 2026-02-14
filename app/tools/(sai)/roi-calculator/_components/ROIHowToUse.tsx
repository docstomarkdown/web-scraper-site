"use client"

import { ToolSteps } from "@/app/tools/_shared/components"
import { CircleDollarSign, TrendingUp, BarChart3 } from "lucide-react"

export function ROIHowToUse() {
    return (
        <ToolSteps
            steps={[
                {
                    title: "Enter Investment",
                    description: "Input the total amount you invested — including product cost, shipping, ads, and any other expenses.",
                    icon: CircleDollarSign
                },
                {
                    title: "Add Revenue",
                    description: "Enter the total revenue you generated from sales of the product.",
                    icon: TrendingUp
                },
                {
                    title: "See Your Return on Investment (ROI)",
                    description: "View your Return on Investment (ROI) percentage, net profit, and profit-to-investment ratio instantly.",
                    icon: BarChart3
                }
            ]}
        />
    )
}
