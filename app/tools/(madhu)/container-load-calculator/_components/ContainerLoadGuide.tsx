"use client"
import { ToolGuide } from "@/app/tools/_shared/components/ToolGuide"
import { Scale, Package, Layers, BookOpen } from "lucide-react"
export function ContainerLoadGuide() {
    return (
        <ToolGuide
            title="The Hidden Truth About This Process"
            icon={BookOpen}
            items={[
                {
                    title: "Weight Limits are Strict",
                    description: "A 20ft container often takes MORE weight (28,200kg) than a 40ft (26,600kg). Heavy goods? Use 20ft.",
                    icon: Scale,
                    stat: "Risk #1",
                    statLabel: "Overloading",
                    iconBg: "bg-red-100",
                    iconColor: "text-red-600",
                    statColor: "text-red-600"
                },
                {
                    title: "Palletization Cost",
                    description: "Pallets protect goods but eat 10-15% of space. A 20ft holds ~11 Euro pallets vs ~28m³ loose cargo.",
                    icon: Package,
                    stat: "-15%",
                    statLabel: "Volume Loss",
                    iconBg: "bg-amber-100",
                    iconColor: "text-amber-600",
                    statColor: "text-amber-600"
                },
                {
                    title: "Stacking Efficiency",
                    description: "High Cube containers offer 1ft extra height. For palletized goods, this often allows an entire extra layer.",
                    icon: Layers,
                    stat: "Top Tip",
                    statLabel: "Use High Cube",
                    iconBg: "bg-blue-100",
                    iconColor: "text-blue-600",
                    statColor: "text-blue-600"
                }
            ]}
        />
    )
}