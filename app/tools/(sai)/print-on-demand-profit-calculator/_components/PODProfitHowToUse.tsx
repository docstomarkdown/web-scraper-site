"use client"

import { ToolSteps } from "@/app/tools/_shared/components"
import { Tag, Package, Calculator } from "lucide-react"

export function PODProfitHowToUse() {
    return (
        <ToolSteps
            steps={[
                {
                    title: "Set Your Pricing",
                    description: "Enter the retail price you plan to charge and any shipping fees you'll collect from the customer.",
                    icon: Tag
                },
                {
                    title: "Input Base Costs",
                    description: "Add the product base cost (from Printful, Printify, etc.) and the shipping cost the provider charges you.",
                    icon: Package
                },
                {
                    title: "Add Platform Fees",
                    description: "Include marketplace fees (e.g. Etsy's 6.5%) and payment processing fees (e.g. Stripe's 2.9% + $0.30).",
                    icon: Calculator
                }
            ]}
        />
    )
}
