"use client"
import { ToolGuide } from "@/app/tools/_shared/components"
import { Target, Search, AlertCircle, BookOpen, TrendingUp } from "lucide-react"
export function AffiliateGuide() {
    return (
        <ToolGuide
            title="How to Plan Your Affiliate Strategy"
            icon={BookOpen}
            items={[
                {
                    title: "Start With 3 Core Metrics",
                    description: "You only need three inputs to get a complete payout estimate: <strong>Affiliate Clicks</strong>, <strong>Average Order Value</strong>, and <strong>Commission Rate</strong>. By starting here, you establish your <strong>baseline revenue</strong> and your <strong>total commission liability</strong> instantly.",
                    icon: Target,
                    stat: "Instant",
                    statLabel: "Payout Estimate",
                    iconBg: "bg-emerald-50",
                    iconColor: "text-emerald-600",
                    statColor: "text-emerald-600",
                    tooltip: "Your core metrics power the Affiliate Payout, Total Revenue, and Estimated Sales outputs."
                },
                {
                    title: "Test Different Commission Scenarios",
                    description: "Since <strong>Commission Rate</strong> is a mandatory input with no default, we recommend testing a few different structures. See how a change from <strong>10%</strong> to <strong>15%</strong> immediately inflates your payout overhead vs your expected total revenue.",
                    icon: Search,
                    stat: "Compare",
                    statLabel: "Scenarios",
                    iconBg: "bg-blue-50",
                    iconColor: "text-blue-600",
                    statColor: "text-blue-600"
                },
                {
                    title: "Understand Product Cost Impact",
                    description: "The optional <strong>Product Cost</strong> field is your key to calculating <strong>Net Profit</strong>. Without it, you only see top-line revenue and affiliate costs. Adding your cost margin instantly reveals if your program is actually financially sustainable.",
                    icon: AlertCircle,
                    stat: "Margins",
                    statLabel: "Matter",
                    iconBg: "bg-orange-50",
                    iconColor: "text-orange-600",
                    statColor: "text-orange-600"
                },
                {
                    title: "Conversion Rate is Your Lever",
                    description: "A small change in <strong>conversion rate</strong> has a massive impact on total sales and payout. It is pre-filled at the <strong>2.5%</strong> industry standard, but improving your landing pages to hit <strong>4%</strong> can nearly double your estimated sales and affiliate costs.",
                    icon: TrendingUp,
                    stat: "Scalable",
                    statLabel: "Growth",
                    iconBg: "bg-purple-50",
                    iconColor: "text-purple-600",
                    statColor: "text-purple-600"
                }
            ]}
        />
    )
}
