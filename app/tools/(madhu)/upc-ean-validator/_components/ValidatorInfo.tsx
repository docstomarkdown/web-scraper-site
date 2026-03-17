"use client"
import { Barcode, ShieldCheck, ScanSearch } from "lucide-react"
import { ToolOverview } from "@/app/tools/_shared/components"

export function ValidatorInfo() {
    return (
        <ToolOverview
            heading="What is UPC / EAN?"
            headingAccent="UPC / EAN"
            definition="UPC (Universal Product Code) and EAN (European Article Number) are the numeric barcodes printed on product packaging to uniquely identify items — used at checkout, in warehouses, and across online marketplaces worldwide."
            facts={[
                {
                    icon: ShieldCheck,
                    label: "Check Digit",
                    detail: "Last digit verifies all others are correct via GS1 Modulo 10",
                },
                {
                    icon: ScanSearch,
                    label: "Why Validate?",
                    detail: "Invalid barcodes get rejected at checkout and on Amazon, Walmart",
                },
                {
                    icon: Barcode,
                    label: "Supported Formats",
                    detail: "UPC-A (12 digits) · EAN-13 (13 digits) · EAN-8 (8 digits)",
                },
            ]}
        />
    )
}
