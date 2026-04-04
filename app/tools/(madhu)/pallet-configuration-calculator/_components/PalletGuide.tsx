"use client"
import { ToolGuide } from "@/app/tools/_shared/components/ToolGuide"
import { RotateCcw, Ruler, Target, Scale } from "lucide-react"

export function PalletGuide() {
    return (
        <ToolGuide
            title="Getting the Most From Your Pallet"
            icon={Target}
            items={[
                {
                    title: "How Box Rotation Finds More Space",
                    description: "When <strong>Allow Rotation</strong> is enabled (under Advanced Settings), the calculator tests your box in 6 orientations — Standard, Rotated 90°, On Side (L/W), and On End (L/W). A box measuring 12×8×6 might fit 20 units upright but 24 units on its side. Leave rotation on to always get the best possible fit.",
                    icon: RotateCcw,
                    iconBg: "bg-purple-50",
                    iconColor: "text-purple-600"
                },
                {
                    title: "Why the 72-Inch Height Matters",
                    description: "The default <strong>Max Stack Height</strong> of 72 inches is the universally accepted limit for LTL freight and Amazon FBA shipments — it includes the 5.5-inch pallet base. Exceeding this triggers carrier surcharges and warehouse rejections. Only increase beyond 72 inches if you're shipping full truckload (FTL) and your carrier explicitly allows it.",
                    icon: Ruler,
                    iconBg: "bg-blue-50",
                    iconColor: "text-blue-600"
                },
                {
                    title: "What Space Efficiency Tells You",
                    description: "<strong>Space Used %</strong> shows how much pallet surface area your boxes actually cover. Above 90% is excellent, 80–89% is good, and below 80% means you're wasting space. If your efficiency is low, try switching between <strong>Standard</strong> and <strong>Euro</strong> pallet types or adjusting box dimensions.",
                    icon: Target,
                    iconBg: "bg-green-50",
                    iconColor: "text-green-600"
                },
                {
                    title: "When to Use Weight Limits",
                    description: "Under <strong>Advanced Settings</strong>, enter <strong>Box Weight</strong> and <strong>Max Pallet Weight</strong> if your product is heavy. The calculator will automatically reduce the number of layers so the total weight never exceeds your limit — even if there's still height left. Standard LTL pallets typically max out at 2,500 lb.",
                    icon: Scale,
                    iconBg: "bg-amber-50",
                    iconColor: "text-amber-600"
                }
            ]}
        />
    )
}
