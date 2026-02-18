"use client"

import { MadhuToolTemplate } from "../../ToolTemplate"
import { COGSCalculator } from "./COGSCalculator"
import {
    Truck,
    Package,
    ShoppingCart,
    BarChart3,
    ShieldCheck,
    TrendingUp,
    AlertCircle,
    RotateCcw
} from "lucide-react"

export function COGSCalculatorClient() {
    return (
        <MadhuToolTemplate
            title="COGS Calculator"
            toolComponent={<COGSCalculator />}
            howToUseSteps={[
                {
                    title: "Enter Sourcing Costs",
                    description: "Start with the unit product cost from your supplier, then add freight shipping costs to your warehouse and any applicable customs duties or taxes.",
                    icon: Package
                },
                {
                    title: "Add Packaging & Prep",
                    description: "Include the cost of boxes, inserts, and any fees charged by your 3PL for prepping and labeling your products for shipment.",
                    icon: ShoppingCart
                },
                {
                    title: "Factor in Fulfillment",
                    description: "Enter your pick and pack fees and the average shipping cost to the final customer to get a complete view of order-level costs.",
                    icon: Truck
                },
                {
                    title: "Consider Returns & Risk",
                    description: "Set an estimated return rate percentage. This helps account for the 'lost' costs of processing returns and shipping that eat into your margins.",
                    icon: RotateCcw
                }
            ]}
            howToUseGoal={{
                title: "Identify Your True Unit Margin",
                description: "By calculating your 'True COGS'—including fulfillment and returns—you can accurately set prices that guarantee profitability and identify exactly which costs are squeezing your margins.",
                icon: TrendingUp
            }}
            hiddenTruthInsights={[
                {
                    title: "The 'Return' Tax",
                    description: "Most sellers forget that a 5% return rate doesn't just lose the sale; it costs double in fulfillment and shipping while tying up capital in 'unsellable' inventory.",
                    icon: AlertCircle,
                    stat: "8-12%",
                    statLabel: "Margin Erosion",
                    iconBg: "bg-red-50",
                    iconColor: "text-red-600",
                    statColor: "text-red-600",
                    tooltip: "The average impact of returns on net profit when fulfillment costs are high."
                },
                {
                    title: "Landed vs. True COGS",
                    description: "Landed cost only gets you to the warehouse. 'True COGS' includes fulfillment, which often accounts for 30% or more of the total variable cost per unit.",
                    icon: BarChart3,
                    stat: "30%+",
                    statLabel: "Hidden Costs",
                    iconBg: "bg-blue-50",
                    iconColor: "text-blue-600",
                    statColor: "text-blue-600",
                    tooltip: "Fulfillment and storage can often exceed the manufacturing cost for low-priced items."
                },
                {
                    title: "Customs Volatility",
                    description: "Duty rates can change overnight due to trade wars or reclassifications. Monitoring your HS codes can save thousands in unexpected per-unit costs.",
                    icon: ShieldCheck,
                    stat: "25%",
                    statLabel: "Potential Duty",
                    iconBg: "bg-indigo-50",
                    iconColor: "text-indigo-600",
                    statColor: "text-indigo-600",
                    tooltip: "MaximumSection 301 tariffs often applied to specific imports."
                }
            ]}
            faqs={[
                {
                    question: "What is the difference between Landed Cost and COGS?",
                    answer: "Landed cost includes everything to get the product to your door (Manufacturing + Inbound Shipping + Duty). COGS in e-commerce typically extends this to include packaging and fulfillment fees, providing a more accurate 'Cost per Order'."
                },
                {
                    question: "Should I include marketing costs in COGS?",
                    answer: "Traditionally, marketing is an operating expense. However, many e-commerce sellers include 'Cost Per Acquisition' (CPA) when calculating their 'True Per-Unit Cost' to see if a product is viable after ad spend."
                },
                {
                    question: "What is a good COGS percentage?",
                    answer: "For most private label e-commerce brands, a COGS between 25-35% of the retail price is considered healthy. This allows enough room for marketing, overhead, and profit."
                },
                {
                    question: "How do returns impact my COGS?",
                    answer: "Returns increase your COGS because you've already paid for fulfillment, packaging, and outbound shipping which are non-refundable. Additionally, you may pay a return processing fee and lose a percentage of the product value if it cannot be resold as new."
                }
            ]}
        />
    )
}
