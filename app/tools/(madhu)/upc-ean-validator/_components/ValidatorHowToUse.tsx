"use client"

import { ToolSteps } from "@/app/tools/_shared/components"
import { Scale, Target, Truck, ShieldCheck, FileUp, HelpCircle } from "lucide-react"

export function ValidatorHowToUse() {
    return (
        <ToolSteps
            title="How to Use This Validator"
            steps={[
                {
                    title: "Input or Upload",
                    description: "Type your barcode manually or <b>upload a product image</b> for automatic extraction. The tool supports UPC-A, EAN-13, and EAN-8 formats.",
                    icon: FileUp
                },
                {
                    title: "Automatic Detection",
                    description: "Our engine instantly cleans up spaces or dashes and identifies the barcode format, ensuring the correct validation logic is applied.",
                    icon: ShieldCheck
                },
                {
                    title: "Verify Calculation",
                    description: "Click the <b>? icon</b> near the Check Digit to see the mathematical breakdown (Modulo 10) used to verify your code's integrity.",
                    icon: HelpCircle
                },
                {
                    title: "Instant Verification",
                    description: "Get a clear 'Valid' or 'Invalid' status, view your barcode visualization, and copy the clean results to use in your inventory system.",
                    icon: Target
                }
            ]}
        />
    )
}
