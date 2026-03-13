"use client"
import { ToolSteps } from "@/app/tools/_shared/components"
import { FileUp, ArrowRightLeft, CheckCircle2 } from "lucide-react"
export function GTINHowToUse() {
    return (
        <ToolSteps
            title="How to Use This Converter"
            steps={[
                {
                    title: "Enter Barcode",
                    description: "Type your 12-digit UPC-A, 13-digit EAN-13, or 14-digit GTIN-14. Or upload a barcode image.",
                    icon: FileUp
                },
                {
                    title: "Auto Conversion",
                    description: "Enter UPC → see EAN as primary result. Enter EAN → see UPC as primary result.",
                    icon: ArrowRightLeft
                },
                {
                    title: "Get All Formats",
                    description: "View all three GTIN formats (GTIN-12, GTIN-13, GTIN-14) with validated check digits.",
                    icon: CheckCircle2
                }
            ]}
        />
    )
}
