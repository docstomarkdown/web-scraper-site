"use client"
import { ToolSteps } from "@/app/tools/_shared/components"
import { Tag, Truck, Calculator } from "lucide-react"

export function PoshmarkFeeHowToUse() {
    return (
        <ToolSteps
            title="How to Calculate Your Poshmark Payout"
            steps={[
                {
                    title: "Enter Selling Price",
                    description: "Input the expected selling price for your item. Remember that Poshmark's fee structure heavily impacts items listed under $15.",
                    icon: Tag
                },
                {
                    title: "Input Item Cost",
                    description: "Add your original purchase price to calculate your true net profit and profit margin, giving you a full picture of your ROI.",
                    icon: Calculator
                },
                {
                    title: "Add Shipping Discounts",
                    description: "If you're offering a shipping discount (e.g., Offer to Likers), enter that amount here to see its exact impact on your final payout.",
                    icon: Truck
                }
            ]}
        />
    )
}