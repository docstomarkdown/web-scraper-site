"use client"
import { ToolSteps } from "@/app/tools/_shared/components"
import { Scale, Target, Truck, ShieldCheck, FileUp, HelpCircle } from "lucide-react"
export function ValidatorHowToUse() {
    return (
        <ToolSteps
            title="How to Use This Validator"
            steps={[
                {
                    title: "Input Code",
                    description: "Type or simply paste your 12-digit UPC or 13-digit EAN barcode exactly.",
                    icon: FileUp
                },
                {
                    title: "Run Check",
                    description: "The tool instantly verifies the standard official checksum algorithm rules.",
                    icon: ShieldCheck
                },
                {
                    title: "View Status",
                    description: "See immediately if the code is mathematically sound and ready for retail.",
                    icon: HelpCircle
                }
            ]}
        />
    )
}