"use client"
import { ToolSteps } from "@/app/tools/_shared/components"
import { ShoppingBag, Truck, RefreshCcw, Wallet } from "lucide-react"
export function DropshippingHowToUse() {
    return (
        <ToolSteps
            steps={[
                {
                    title: "Vendor Cost",
                    description: "Enter the external manufacturer wholesale cost plus exact dropship shipping.",
                    icon: ShoppingBag
                },
                {
                    title: "Retail MSRP",
                    description: "Input your final publicly accessible listed selling price on the storefront.",
                    icon: Truck
                },
                {
                    title: "Check Margins",
                    description: "Instantly map out your net gross profit and pure percentage margin per sale.",
                    icon: RefreshCcw
                }
            ]}
        />
    )
}