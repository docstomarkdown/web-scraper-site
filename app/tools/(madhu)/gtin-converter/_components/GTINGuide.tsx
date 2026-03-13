"use client"
import { ToolGuide } from "@/app/tools/_shared/components/ToolGuide"
import { ArrowRightLeft, Globe2, Shield, Calculator, BookOpen } from "lucide-react"
export function GTINGuide() {
    return (
        <ToolGuide
            title="Understanding GTIN Conversion"
            icon={BookOpen}
            items={[
                {
                    title: "UPC to EAN Conversion",
                    description: "When you enter a 12-digit UPC-A (GTIN-12), our converter automatically shows GTIN-13 (EAN) as the primary result. This is because UPC and EAN are mathematically equivalent—a UPC is simply an EAN with a leading zero.",
                    icon: ArrowRightLeft,
                    stat: "UPC→EAN",
                    statLabel: "Primary Conversion",
                    iconBg: "bg-blue-50",
                    iconColor: "text-blue-500",
                    statColor: "text-blue-600"
                },
                {
                    title: "EAN to UPC Conversion",
                    description: "When you enter a 13-digit EAN-13 (GTIN-13), the tool shows GTIN-12 (UPC) as the primary result. This conversion removes the leading zero to create the North American UPC format, essential for US and Canadian retail.",
                    icon: Globe2,
                    stat: "EAN→UPC",
                    statLabel: "Reverse Conversion",
                    iconBg: "bg-blue-50",
                    iconColor: "text-blue-500",
                    statColor: "text-blue-600"
                },
                {
                    title: "Complete GTIN Format Coverage",
                    description: "Our converter generates all three GTIN formats simultaneously: GTIN-12 (UPC), GTIN-13 (EAN), and GTIN-14 (for cartons). All formats are calculated with correct check digits using the official GS1 Modulo 10 algorithm.",
                    icon: Calculator,
                    stat: "3 Formats",
                    statLabel: "All GTIN Types",
                    iconBg: "bg-emerald-50",
                    iconColor: "text-emerald-500",
                    statColor: "text-emerald-600"
                },
                {
                    title: "Validation Before Conversion",
                    description: "Before converting, the tool validates your input barcode using the GS1 check digit algorithm. Invalid codes are flagged immediately, preventing errors in your product listings and inventory systems.",
                    icon: Shield,
                    stat: "GS1",
                    statLabel: "Validated",
                    iconBg: "bg-rose-50",
                    iconColor: "text-rose-500",
                    statColor: "text-rose-600"
                }
            ]}
        />
    )
}
