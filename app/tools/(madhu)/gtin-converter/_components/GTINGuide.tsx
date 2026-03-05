"use client"
import { ToolGuide } from "@/app/tools/_shared/components/ToolGuide"
import { Calculator, Globe2, Shield, Fingerprint, BookOpen } from "lucide-react"
export function GTINGuide() {
    return (
        <ToolGuide
            title="The Hidden Truth About Barcode Validation"
            icon={BookOpen}
            items={[
                {
                    title: "Why Check Digits Fail",
                    description: "Most data entry errors happen at the final digit. Our converter uses the official GS1 Modulo 10 algorithm to detect if your code is physically valid before processing it.",
                    icon: Calculator,
                    stat: "Mod 10",
                    statLabel: "Mathematical Law",
                    iconBg: "bg-blue-50",
                    iconColor: "text-blue-500",
                    statColor: "text-blue-600"
                },
                {
                    title: "The 'Nested' Zero Trap",
                    description: "A common mistake is treating UPC and EAN as separate systems. In reality, a GTIN-12 (UPC) is simply a GTIN-13 (EAN) with a leading zero. Our tool maps these perfectly.",
                    icon: Globe2,
                    stat: "0",
                    statLabel: "Implicit Prefix",
                    iconBg: "bg-blue-50",
                    iconColor: "text-blue-500",
                    statColor: "text-blue-600"
                },
                {
                    title: "Compliance is Not Optional",
                    description: "Amazon and major retailers now cross-reference your GTINs against the GS1 GEPIR database. Using unvalidated or 'made-up' codes can lead to permanent account suspension.",
                    icon: Shield,
                    stat: "GS1",
                    statLabel: "Brand Authority",
                    iconBg: "bg-rose-50",
                    iconColor: "text-rose-500",
                    statColor: "text-rose-600"
                },
                {
                    title: "Format Integrity",
                    description: "Calculated lengths (12, 13, or 14 digits) are rigid. If your code length doesn't match its format, fulfillment software will reject your inventory at the receiving dock.",
                    icon: Fingerprint,
                    stat: "Fixed",
                    statLabel: "Digit Count",
                    iconBg: "bg-amber-50",
                    iconColor: "text-amber-500",
                    statColor: "text-amber-600"
                }
            ]}
        />
    )
}