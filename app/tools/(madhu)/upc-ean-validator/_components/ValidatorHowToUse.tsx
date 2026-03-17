"use client"
import { ToolSteps } from "@/app/tools/_shared/components"
import { Barcode, ScanSearch, ClipboardCheck } from "lucide-react"
export function ValidatorHowToUse() {
    return (
        <ToolSteps
            title="How to Use This Validator"
            steps={[
                {
                    title: "Enter Barcode",
                    description: "Enter or upload your UPC or EAN barcode to instantly scan and verify its validation status.",
                    icon: Barcode
                },
                {
                    title: "Instant Validation",
                    description: "The tool checks format and validates the check digit automatically.",
                    icon: ScanSearch
                },
                {
                    title: "View Results",
                    description: "See validation status, check digit, and calculation breakdown.",
                    icon: ClipboardCheck
                }
            ]}
        />
    )
}
