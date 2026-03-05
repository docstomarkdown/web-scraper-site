"use client"
import { ToolSteps } from "@/app/tools/_shared/components"
import { Scale, Package, Banknote } from "lucide-react"
export function FBAHowToUse() {
    return (
        <ToolSteps
            steps={[
                {
                    title: "Item Setup",
                    description: "Enter physical product weight, box dimensions, and base retail price.",
                    icon: Scale
                },
                {
                    title: "Set Category",
                    description: "Choose the accurate Amazon storefront category to parse referral rules.",
                    icon: Banknote
                },
                {
                    title: "Check Fees",
                    description: "Instantly reveal your pick rates, referral costs, and final net profit.",
                    icon: Package
                }
            ]}
        />
    )
}