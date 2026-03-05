"use client"
import { ToolSteps } from "@/app/tools/_shared/components"
import { FileUp, Calculator, ShieldCheck } from "lucide-react"
export function GTINHowToUse() {
    return (
        <ToolSteps
            title="How to Use This Converter"
            steps={[
                {
                    title: "Enter Barcode",
                    description: "Input your existing 8, 12, or 13-digit standard UPC or EAN barcode.",
                    icon: FileUp
                },
                {
                    title: "Select Format",
                    description: "Choose the target global trade item number format for conversion.",
                    icon: Calculator
                },
                {
                    title: "Get GTIN",
                    description: "Instantly calculate the correctly padded product code and check digit.",
                    icon: ShieldCheck
                }
            ]}
        />
    )
}