"use client"
import { ToolGuide } from "@/app/tools/_shared/components/ToolGuide"
import { Package, RotateCcw, Layers, TrendingUp, AlertTriangle, Truck } from "lucide-react"
export function PalletGuide() {
    return (
        <ToolGuide
            title="Master Pallet Loading: What You Need to Know"
            icon={Package}
            items={[
                {
                    title: "Why Pallet Configuration Matters",
                    description: "Proper pallet loading directly impacts your shipping costs, warehouse efficiency, and product safety. This calculator analyzes 6 different box orientations to find the configuration that maximizes units per pallet while respecting weight and height constraints. Even a 5% improvement in pallet utilization can save thousands in annual freight costs.",
                    icon: Package,
                    iconBg: "bg-blue-50",
                    iconColor: "text-blue-600"
                },
                {
                    title: "The Power of Box Orientation",
                    description: "The calculator automatically tests Standard, Rotated 90°, On Side (L), On Side (W), On End (L), and On End (W) orientations. A box measuring 12\"×8\"×6\" might fit 20 units standing upright but 24 units on its side. The optimal orientation depends on your pallet size and stack height limits.",
                    icon: RotateCcw,
                    iconBg: "bg-purple-50",
                    iconColor: "text-purple-600"
                },
                {
                    title: "Understanding Configuration Presets",
                    description: "Standard LTL (72\" / 2,500 lb) is ideal for general freight. Amazon FBA (72\" / 1,500 lb) ensures warehouse compliance. Max Volume (96\" / 3,000 lb) maximizes full truckload efficiency. Double Stack (48\" / 1,200 lb) allows two pallets stacked vertically in a trailer. Choose the preset that matches your shipping method.",
                    icon: Layers,
                    iconBg: "bg-indigo-50",
                    iconColor: "text-indigo-600"
                },
                {
                    title: "Space Efficiency Explained",
                    description: "This percentage shows how much of the pallet's surface area is covered by boxes. 90%+ is excellent, 80-89% is good, below 80% suggests trying a different pallet size or box orientation. The calculator also shows overhang (unused edge space) and unused height to help you optimize further.",
                    icon: TrendingUp,
                    iconBg: "bg-green-50",
                    iconColor: "text-green-600"
                },
                {
                    title: "Common Mistakes to Avoid",
                    description: "Don't ignore weight limits — overloaded pallets cause pallet collapse and carrier rejections. Don't exceed 72\" for LTL or you'll pay premium fees. Don't forget the 5.5\" pallet base height when calculating total height. Always leave 2-3\" buffer for stretch wrap and pallet overhang.",
                    icon: AlertTriangle,
                    iconBg: "bg-amber-50",
                    iconColor: "text-amber-600"
                },
                {
                    title: "Real-World Application",
                    description: "Use this calculator before ordering packaging to ensure your box dimensions work efficiently with standard pallets. Use it to compare pallet types (US vs Euro) for international shipping. Use it to calculate truck capacity by multiplying units per pallet by pallets per truck. Optimize once, save forever.",
                    icon: Truck,
                    iconBg: "bg-cyan-50",
                    iconColor: "text-cyan-600"
                }
            ]}
        />
    )
}
