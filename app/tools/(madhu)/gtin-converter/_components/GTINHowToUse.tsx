"use client"

import { ToolSteps } from "@/app/tools/_shared/components"
import { FileUp, Calculator, ShieldCheck } from "lucide-react"

export function GTINHowToUse() {
    return (
        <ToolSteps
            title="How to Use This Converter"
            steps={[
                {
                    title: "Enter or Upload",
                    description: "Type your barcode manually or <b>upload a product image</b> for automatic extraction. Supports UPC-A, EAN-13, and GTIN-14 formats.",
                    icon: FileUp
                },
                {
                    title: "Format Detection",
                    description: "Our engine instantly detects the format and verifies the <b>Modulo 10 check digit</b> using official GS1 algorithms.",
                    icon: Calculator
                },
                {
                    title: "Instant Mapping",
                    description: "The tool immediately calculates the equivalent <b>GTIN-12, GTIN-13, and GTIN-14</b> codes for global EDI and inventory synchronization.",
                    icon: ShieldCheck
                }
            ]}
        />
    )
}
