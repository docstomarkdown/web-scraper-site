"use client"
import { ToolGuide } from "@/app/tools/_shared/components/ToolGuide"
import { LineChart, Hourglass, Coins, BookOpen } from "lucide-react"
export function ReorderPointGuide() {
    return (
        <ToolGuide
            title="Best Practices for Reordering Inventory"
            icon={BookOpen}
            items={[
                {
                    title: "Protect Your Store's Ranking",
                    description: "Staying in stock is the best way to keep your search ranking high. If you run out, your store could drop in search results, making it harder for customers to find you.",
                    icon: LineChart,
                    stat: "Essential",
                    statLabel: "Consistency",
                    iconBg: "bg-blue-50",
                    iconColor: "text-blue-600",
                    statColor: "text-blue-600",
                    tooltip: "Consistent availability prevents ranking drops."
                },
                {
                    title: "Don't Forget Processing Time",
                    description: "When calculating lead time, add 2-3 extra days for 'admin time'—like paying the invoice and getting the warehouse ready to receive the goods.",
                    icon: Hourglass,
                    stat: "+2 Days",
                    statLabel: "Admin Buffer",
                    iconBg: "bg-purple-50",
                    iconColor: "text-purple-600",
                    statColor: "text-purple-600"
                },
                {
                    title: "Use Cash More Wisely",
                    description: "By knowing exactly when to reorder, you won't buy products too early. This keeps your cash free for other things, like marketing or new product launches.",
                    icon: Coins,
                    stat: "Better",
                    statLabel: "Cash Flow",
                    iconBg: "bg-emerald-50",
                    iconColor: "text-emerald-600",
                    statColor: "text-emerald-600"
                }
            ]}
        />
    )
}
