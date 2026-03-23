"use client"
import { ToolGuide } from "@/app/tools/_shared/components/ToolGuide"
import { Globe, MapPin, ShieldCheck, Boxes, BookOpen } from "lucide-react"
export function GTINGuide() {
    return (
        <ToolGuide
            title="Understanding GTIN Conversion"
            icon={BookOpen}
            items={[
                {
                    title: "UPC to EAN (GTIN-12 to 13)",
                    description: "The primary conversion for US/Canada retail. Our tool automatically prepends the required zero prefix to transition your UPC-A codes into the 13-digit EAN-13 (GTIN-13) international standard.",
                    icon: Globe,
                    stat: "UPC→EAN",
                    statLabel: "USA to Global",
                    iconBg: "bg-blue-50",
                    iconColor: "text-blue-500",
                    statColor: "text-blue-600"
                },
                {
                    title: "EAN to UPC (GTIN-13 to 12)",
                    description: "When converting for North American marketplaces like Amazon, Walmart, or Target, our tool strips the zero-padding from your EAN-13 to return the standard 12-digit UPC format.",
                    icon: MapPin,
                    stat: "EAN→UPC",
                    statLabel: "Global to USA",
                    iconBg: "bg-indigo-50",
                    iconColor: "text-indigo-500",
                    statColor: "text-indigo-600"
                },
                {
                    title: "Logistics GTIN-14 Levels",
                    description: "Commonly used for cartons, cases, and pallet configurations. We convert your consumer-level barcode (UPC/EAN) to the shipper-level GTIN-14 format essential for warehouse and supply chain management.",
                    icon: Boxes,
                    stat: "Shipper",
                    statLabel: "Case/Pack Level",
                    iconBg: "bg-emerald-50",
                    iconColor: "text-emerald-500",
                    statColor: "text-emerald-600"
                },
                {
                    title: "Instant Image Scanning",
                    description: "New scanning technology: upload a photo from your warehouse. Our tool automatically reads the numerical data from the image for instant validation and conversion — no more manual entry errors.",
                    icon: ShieldCheck,
                    stat: "Scan-ID",
                    statLabel: "Auto-Read",
                    iconBg: "bg-violet-50",
                    iconColor: "text-violet-500",
                    statColor: "text-violet-600"
                }
            ]}
        />
    )
}
