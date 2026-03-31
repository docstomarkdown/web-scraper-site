"use client"
import { ToolSteps } from "@/app/tools/_shared/components"
import { Calculator, DollarSign, PieChart } from "lucide-react"
export function CouponROIHowToUse() {
    return (
        <ToolSteps
            steps={[
                {
                    title: "Enter Campaign Basics",
                    description: "Input your total campaign cost (e.g., ad spend), the number of coupons distributed, and how many were actually redeemed by customers.",
                    icon: DollarSign
                },
                {
                    title: "Add Sales Data",
                    description: "Enter your Average Order Value (AOV), the discount amount applied per order, and your base profit margin. This allows us to calculate your true Cost of Goods Sold.",
                    icon: Calculator
                },
                {
                    title: "Review Profit & ROI",
                    description: "Instantly see your Return on Investment, Net Profit, and a comprehensive breakdown of your campaign's true financial impact.",
                    icon: PieChart
                }
            ]}
        />
    )
}