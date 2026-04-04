"use client"
import { Tag, Percent, TrendingUp, Info } from "lucide-react"
import { ToolGuide } from "@/app/tools/_shared/components/ToolGuide"

export function WholesalePriceGuide() {
    return (
        <ToolGuide
            title="Understanding Wholesale Pricing"
            items={[
                {
                    title: "Wholesale Price",
                    description: "The price at which you sell goods in bulk to retailers or distributors. It must cover your full cost base and target profit margin while leaving enough room for retailers to apply their own markup.",
                    icon: Tag,
                    iconBg: "bg-blue-50",
                    iconColor: "text-blue-500"
                },
                {
                    title: "Profit Margin vs. Markup",
                    description: "Margin is based on the final selling price: (Price − Cost) ÷ Price. Markup is based on cost: (Price − Cost) ÷ Cost. A 50% margin requires a 100% markup—always use margin when setting wholesale prices to avoid underpricing.",
                    icon: Percent,
                    iconBg: "bg-blue-50",
                    iconColor: "text-blue-500"
                },
                {
                    title: "Effective Cost",
                    description: "Your effective cost includes the original Cost per Unit plus any taxes, import duties, or inbound fees applied via the Tax/Duty Rate field. Always calculate from your effective cost, not just your unit cost, to avoid margin erosion.",
                    icon: TrendingUp,
                    iconBg: "bg-amber-50",
                    iconColor: "text-amber-500"
                },
                {
                    title: "Standard Wholesale Margins",
                    description: "Standard wholesale profit margins typically range from 30% to 50% depending on the industry and product category. This gives retailers enough room to apply their standard 2–2.5× markup and reach a competitive retail price.",
                    icon: Info,
                    iconBg: "bg-violet-50",
                    iconColor: "text-violet-500"
                }
            ]}
        />
    )
}
