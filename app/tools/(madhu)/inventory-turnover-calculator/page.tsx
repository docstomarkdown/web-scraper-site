"use client"

import { InventoryTurnoverCalculator } from "./_components/InventoryTurnoverCalculator"
import { MadhuToolTemplate } from "../ToolTemplate"
import {
    Package,
    TrendingUp,
    ShieldCheck,
    Clock,
    AlertCircle,
    CheckCircle2,
    BarChart3,
    Warehouse,
    Timer,
    Calendar,
    Activity,
    LineChart,
    Target,
    Boxes,
    RotateCw,
    Percent,
    Zap
} from "lucide-react"

export default function InventoryTurnoverCalculatorPage() {
    return (
        <MadhuToolTemplate
            title="Inventory Turnover Ratio Calculator"
            toolComponent={<InventoryTurnoverCalculator />}
            howToUseSteps={[
                {
                    title: "Define Financial Context",
                    description: "Input your <b>Cost of Goods Sold (COGS)</b> for the period. For Amazon/Shopify sellers, use your 'Landed Cost' for the most accurate ratio.",
                    icon: Target
                },
                {
                    title: "Set Analysis Window",
                    description: "Choose your period (30, 90, or 365 days). Use the <b>quick-presets</b> to instantly toggle between monthly and annual reports.",
                    icon: Timer
                },
                {
                    title: "Optimize Stock Velocity",
                    description: "Review your <b>DSI (Runway)</b>. If DSI exceeds 90 days, you likely have capital trapped in slow-moving inventory.",
                    icon: RotateCw
                }
            ]}
            howToUseGoal={{
                title: "Unlock Working Capital",
                description: "Maximize your inventory velocity to free up cash flow. High turnover allows you to reinvest in new products and faster-moving SKUs.",
                icon: CheckCircle2
            }}
            hiddenTruthInsights={[
                {
                    title: "The 90-Day Liquidity Wall",
                    description: "In e-commerce, stock that doesn't move within 90 days often requires aggressive discounting to recover capital, destroying margins.",
                    icon: Activity,
                    stat: "90 Days",
                    statLabel: "The Danger Zone",
                    iconBg: "bg-orange-50",
                    iconColor: "text-orange-600",
                    statColor: "text-orange-600",
                    tooltip: "Any index over 90 DSI is usually considered inefficient for high-growth brands."
                },
                {
                    title: "Velocity vs. Availability",
                    description: "A turnover ratio above 12x looks efficient but often hides frequent stock-outs. Don't starve your growth for 'perfect' ratios.",
                    icon: AlertCircle,
                    stat: "4-8x",
                    statLabel: "Target Range",
                    iconBg: "bg-red-50",
                    iconColor: "text-red-600",
                    statColor: "text-red-600"
                },
                {
                    title: "The Seasonal Distortion",
                    description: "Calculating annual turnover during peak season (Q4) gives a false positive. Always compare Q4 ratios against Q4 of the previous year.",
                    icon: Calendar,
                    stat: "Q4",
                    statLabel: "Skew Risk",
                    iconBg: "bg-blue-50",
                    iconColor: "text-blue-600",
                    statColor: "text-blue-600"
                },
                {
                    title: "Storage Cost Multiplier",
                    description: "Low turnover metrics (under 4x) don't just trap cash—they actively consume it through long-term storage fees, especially with 3PLs.",
                    icon: Warehouse,
                    stat: "+15%",
                    statLabel: "Cost Increase",
                    iconBg: "bg-amber-50",
                    iconColor: "text-amber-600",
                    statColor: "text-amber-600"
                }
            ]}
            faqs={[
                {
                    question: "What is a healthy turnover ratio for e-commerce?",
                    answer: "For most mature e-commerce brands, a ratio between <b>4 and 8</b> is ideal. High-volume categories like apparel or food may aim for 12+, while luxury goods often sit around 2-3."
                },
                {
                    question: "How does DSI (Days Sales in Inventory) affect cash flow?",
                    answer: "DSI represents how long your cash is 'trapped' in stock. Reducing DSI from 60 to 45 days can free up 25% of your inventory capital for marketing or new product development."
                },
                {
                    question: "Should I include shipping costs in my COGS?",
                    answer: "Yes. For the most accurate efficiency rating, use <b>Landed COGS</b> (Product Cost + Freight + Customs) rather than just the wholesale price."
                }
            ]}
        />
    )
}
