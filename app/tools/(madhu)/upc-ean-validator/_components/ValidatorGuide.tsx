"use client"
import { BookOpen, Calculator, AlertTriangle, ShieldCheck, CheckCircle2 } from "lucide-react"
import { ToolGuide } from "@/app/tools/_shared/components"

export function ValidatorGuide() {
    return (
        <ToolGuide
            title="Understanding Barcode Validation"
            icon={BookOpen}
            items={[
                {
                    icon: Calculator,
                    iconBg: "bg-blue-50",
                    iconColor: "text-blue-500",
                    statColor: "text-blue-600",
                    title: "The Check Digit Algorithm",
                    stat: "Mod 10",
                    statLabel: "GS1 Standard",
                    description: "The last digit of every UPC/EAN barcode is a calculated checksum using the Modulo 10 algorithm. This digit validates the integrity of all previous digits. If incorrect, the barcode won't scan at point-of-sale terminals."
                },
                {
                    icon: ShieldCheck,
                    iconBg: "bg-emerald-50",
                    iconColor: "text-emerald-500",
                    statColor: "text-emerald-600",
                    title: "Why Validation Matters",
                    stat: "100%",
                    statLabel: "Accuracy Required",
                    description: "Invalid barcodes cause scanning failures at checkout, inventory errors, and listing rejections on e-commerce platforms. Our validator catches errors before they become costly problems."
                },
                {
                    icon: AlertTriangle,
                    iconBg: "bg-amber-50",
                    iconColor: "text-amber-500",
                    statColor: "text-amber-600",
                    title: "Common Validation Errors",
                    stat: "2 Types",
                    statLabel: "Main Issues",
                    description: "Most barcode errors fall into two categories: length errors (wrong number of digits) or check digit errors (last digit doesn't match the calculated value). Our tool identifies both and shows the correct check digit."
                },
                {
                    icon: CheckCircle2,
                    iconBg: "bg-blue-50",
                    iconColor: "text-blue-500",
                    statColor: "text-blue-600",
                    title: "Supported Formats",
                    stat: "3 Formats",
                    statLabel: "UPC/EAN Types",
                    description: "We validate UPC-A (12 digits, North America), EAN-13 (13 digits, global standard), and EAN-8 (8 digits, small packages). Each format uses the same Modulo 10 algorithm but with different digit lengths."
                }
            ]}
        />
    )
}
