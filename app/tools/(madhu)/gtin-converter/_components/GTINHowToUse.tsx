"use client"
import { ToolSteps } from "@/app/tools/_shared/components"
import { Scan, SearchCheck, RefreshCw } from "lucide-react"
export function GTINHowToUse() {
    return (
        <ToolSteps
            title="How to Use the GTIN Converter"
            steps={[
                {
                    title: "Enter or Scan",
                    description: "Manually type your numeric barcode (8, 12, 13, or 14 digits) or simply upload an image of the barcode label for instant Conversion.",
                    icon: Scan
                },
                {
                    title: "Validate Digit",
                    description: "Our tool automatically verifies the GS1 Modulo 10 check digit. If it's invalid, we'll flag it immediately to ensure your data is listing-ready.",
                    icon: SearchCheck
                },
                {
                    title: "Format Output",
                    description: "Instantly view your barcode converted across all standard formats, including GTIN-8, GTIN-12 (UPC), GTIN-13 (EAN), and GTIN-14 for logistics.",
                    icon: RefreshCw
                }
            ]}
        />
    )
}
