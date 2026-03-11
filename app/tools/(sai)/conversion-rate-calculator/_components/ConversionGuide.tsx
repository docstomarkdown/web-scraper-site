"use client"
import { ToolGuide } from "@/app/tools/_shared/components"
import { MousePointerClick, Users, TrendingUp, Target } from "lucide-react"
export function ConversionGuide() {
    return (
        <ToolGuide
            title="Understanding Conversion Rate"
            items={[
                {
                    title: "What is Conversion Rate?",
                    icon: MousePointerClick,
                    iconBg: "bg-blue-50",
                    iconColor: "text-blue-500",
                    stat: "Rate",
                    statColor: "text-blue-600",
                    statLabel: "Action per visit",
                    tooltip: "Conversion Rate = (Conversions / Visitors) * 100.",
                    description: "Conversion Rate measures the percentage of visitors who complete a desired action, such as making a purchase, signing up for a newsletter, or filling out a form."
                },
                {
                    title: "Why it Matters?",
                    icon: TrendingUp,
                    iconBg: "bg-blue-50",
                    iconColor: "text-blue-500",
                    stat: "Growth",
                    statColor: "text-blue-600",
                    statLabel: "Efficiency metric",
                    tooltip: "Improving conversion rate increases revenue without increasing traffic costs.",
                    description: "Improving your conversion rate is often more cost-effective than acquiring new traffic. It means you are getting more value from the visitors you already have."
                },
                {
                    title: "What counts as a Conversion?",
                    icon: Target,
                    iconBg: "bg-purple-50",
                    iconColor: "text-purple-500",
                    stat: "Goal",
                    statColor: "text-purple-600",
                    statLabel: "Define your goal",
                    tooltip: "A conversion can be a sale, lead, download, or any key action.",
                    description: "A conversion isn't always a sale. It depends on your goal for that specific page or campaign. It could be a lead form submission, a software download, or even a video view."
                },
                {
                    title: "Traffic Quality",
                    icon: Users,
                    iconBg: "bg-amber-50",
                    iconColor: "text-amber-500",
                    stat: "Quality",
                    statColor: "text-amber-600",
                    statLabel: "Target the right people",
                    tooltip: "High traffic with low relevance leads to low conversion rates.",
                    description: "Sometimes a low conversion rate isn't a website problem, but a traffic problem. If you drive irrelevant traffic to your site, they won't convert no matter how good your page is."
                }
            ]}
        />
    )
}