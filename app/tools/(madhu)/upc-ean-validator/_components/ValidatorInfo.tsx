"use client"
import { ToolOverview } from "@/app/tools/_shared/components"

export function ValidatorInfo() {
    return (
        <ToolOverview
            heading="What is UPC / EAN?"
            headingAccent="UPC / EAN"
            definition="UPC (Universal Product Code) and EAN (European Article Number) are the numeric barcodes printed on product packaging to uniquely identify items — used at checkout, in warehouses, and across online marketplaces worldwide."
            facts={[
                {
                    stat: "3 Formats",
                    label: "Accepted",
                    detail: "UPC-A (12 digits), EAN-13 (13 digits), and EAN-8 (8 digits) — covers virtually every retail barcode globally.",
                },
                {
                    stat: "Instant",
                    label: "Validation",
                    detail: "Paste or scan any barcode and get immediate format checks, check-digit verification, and error correction.",
                },
                {
                    stat: "GS1",
                    label: "Standard",
                    detail: "Uses the official Modulo 10 algorithm — the same standard Amazon, Walmart, and every POS system relies on.",
                },
            ]}
        />
    )
}
