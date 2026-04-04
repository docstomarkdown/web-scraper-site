"use client"
import { ToolGuide } from "@/app/tools/_shared/components/ToolGuide"
import { Scale, Package, Layers, TrendingUp } from "lucide-react"

export function ContainerLoadGuide() {
    return (
        <ToolGuide
            title="What Smart Shippers Always Know"
            items={[
                {
                    title: "20ft Beats 40ft for Heavy Cargo",
                    description: "A 20ft standard container often carries more weight (28,200 kg max) than a 40ft (26,600 kg). If your goods are dense and heavy, a smaller container is safer and avoids overloading fines.",
                    icon: Scale,
                    stat: "28,200 kg",
                    statLabel: "20ft Payload",
                    iconBg: "bg-red-100",
                    iconColor: "text-red-600",
                    statColor: "text-red-600"
                },
                {
                    title: "Pallets Trade Space for Safety",
                    description: "Palletizing protects fragile cargo but costs you 10–15% of usable volume. Use pallet mode in this tool to see the exact trade-off before you commit to a loading method.",
                    icon: Package,
                    stat: "-15%",
                    statLabel: "Volume Lost",
                    iconBg: "bg-amber-100",
                    iconColor: "text-amber-600",
                    statColor: "text-amber-600"
                },
                {
                    title: "High Cube = One Extra Layer",
                    description: "The 40ft High Cube gives you ~30cm more interior height than a standard 40ft. For palletized goods, that's often enough for a full additional stacking layer — significantly boosting total unit count.",
                    icon: Layers,
                    stat: "+30 cm",
                    statLabel: "Extra Height",
                    iconBg: "bg-blue-100",
                    iconColor: "text-blue-600",
                    statColor: "text-blue-600"
                },
                {
                    title: "Space Utilization = Shipping ROI",
                    description: "Every percentage point of unused container space is money lost. Aim for 85%+ utilization. If your result is below 70%, try resizing your cartons or switching between loose and pallet mode to find a better fit.",
                    icon: TrendingUp,
                    stat: "85%+",
                    statLabel: "Target Utilization",
                    iconBg: "bg-green-100",
                    iconColor: "text-green-600",
                    statColor: "text-green-600"
                }
            ]}
        />
    )
}