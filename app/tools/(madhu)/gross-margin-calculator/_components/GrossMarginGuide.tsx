"use client"
import { ToolGuide } from "@/app/tools/_shared/components/ToolGuide"
import { ShieldCheck, Target, BarChart3, Lightbulb } from "lucide-react"

export function GrossMarginGuide() {
    return (
        <ToolGuide
            title="Professional Margin Management"
            icon={Lightbulb}
            items={[
                {
                    title: "Defending Your Bottom Line",
                    description: "Your gross margin is the most accurate pulse check for your business. It tells you exactly how many cents of every dollar you keep to cover your operating expenses and profit.",
                    icon: ShieldCheck,
                    stat: "Critical",
                    statLabel: "Profit Health",
                    iconBg: "bg-red-50",
                    iconColor: "text-red-600",
                    statColor: "text-red-700",
                    tooltip: "Tracking margins allows you to see if your product costs are rising faster than your prices."
                },
                {
                    title: "Reverse Pricing Strategy",
                    description: "Don't guess your prices. Use the <strong>Find Revenue</strong> mode to tell the tool your required margin. As you scroll, the sticky dashboard instantly calculates the exact price point needed to hit your financial goals.",
                    icon: Target,
                    stat: "3-in-1",
                    statLabel: "Tool Versatility",
                    iconBg: "bg-amber-50",
                    iconColor: "text-amber-600",
                    statColor: "text-amber-700",
                    tooltip: "Switch instantly between calculating margin, required price, or manufacturing cost limits."
                },
                {
                    title: "Precision Cost Mapping",
                    description: "Use the <strong>Find COGS</strong> mode when your market price is fixed. This tells you the absolute maximum you can afford to pay for manufacturing while protecting your target margin.",
                    icon: BarChart3,
                    stat: "Budgeting",
                    statLabel: "Cost Control",
                    iconBg: "bg-emerald-50",
                    iconColor: "text-emerald-600",
                    statColor: "text-emerald-700",
                    tooltip: "Visualizing your revenue breakdown helps you see exactly where your capital is being allocated."
                }
            ]}
        />
    )
}