"use client"

import { MadhuToolTemplate } from "../../ToolTemplate"
import { COGSCalculator } from "./COGSCalculator"
import {
    Truck,
    Package,
    TrendingUp,
    AlertCircle,
    Scale,
    CreditCard,
    RotateCcw
} from "lucide-react"

export function COGSCalculatorClient() {
    return (
        <MadhuToolTemplate
            title="COGS Calculator"
            toolComponent={<COGSCalculator />}
            howToUseSteps={[
                {
                    title: "Enter Acquisition Costs",
                    description: "Input the unit cost from your supplier, plus inbound shipping and duties. This gives you your 'Landed Cost'—the price to get the product to your warehouse.",
                    icon: Package
                },
                {
                    title: "Add Fulfillment Fees",
                    description: "Include the cost to pick, pack, and ship the product to the customer. Don't forget platform fees (like FBA) and packaging materials.",
                    icon: Truck
                },
                {
                    title: "Factor in Returns",
                    description: "Enter your estimated return rate %. The calculator adds a 'Return Risk' cost to ensure your profit margin accounts for refunded items.",
                    icon: RotateCcw
                }
            ]}
            howToUseGoal={{
                title: "Find Your True Profit",
                description: "Most sellers underestimate costs. This tool reveals your 'True COGS' and actual Gross Margin so you can price your products profitably.",
                icon: TrendingUp
            }}
            hiddenTruthInsights={[
                {
                    title: "The 'Return Risk' Trap",
                    description: "If you have a 10% return rate on a $50 item, you lose $5.00 per sale in revenue, plus shipping costs. Most calculators ignore this, leading to inflated profit estimates.",
                    icon: AlertCircle,
                    stat: "Hidden Cost",
                    statLabel: "Profit Killer",
                    iconBg: "bg-amber-50",
                    iconColor: "text-amber-600",
                    statColor: "text-amber-600",
                    tooltip: "Your margin isn't real until the return window closes."
                },
                {
                    title: "Landed vs. Product Cost",
                    description: "Your product cost is $5, but after shipping and taxes, it's $7. Pricing based on $5 guarantees you lose money on every sale.",
                    icon: Scale,
                    stat: "+40%",
                    statLabel: "Avg Markup",
                    iconBg: "bg-blue-50",
                    iconColor: "text-blue-600",
                    statColor: "text-blue-600",
                    tooltip: "Freight and duties often add 30-50% to the base product cost."
                },
                {
                    title: "Fulfillment > Manufacturing",
                    description: "For many low-cost items, the cost to pick, pack, and ship (Fulfillment) is actually higher than the cost to make the product.",
                    icon: CreditCard,
                    stat: "Reality",
                    statLabel: "Check Fees",
                    iconBg: "bg-indigo-50",
                    iconColor: "text-indigo-600",
                    statColor: "text-indigo-600",
                    tooltip: "Common in items under $20 selling price."
                }
            ]}
            faqs={[
                {
                    question: "What is 'Landed Cost'?",
                    answer: "Landed Cost is the total price of a product once it has arrived at your doorstep. It includes the original purchase price, freight, customs, duties, taxes, and insurance."
                },
                {
                    question: "Why include Return Rate in COGS?",
                    answer: "Returns are a cost of doing business. If 1 in 10 items is returned, you lose the shipping and fulfillment fees for that item. Including a 'Return Risk' buffer ensures your pricing covers these inevitable losses."
                },
                {
                    question: "What is a good Gross Margin?",
                    answer: "For e-commerce, a Gross Margin above 30% is generally considered healthy. If it is below 20%, you may struggle to pay for ads and operating expenses."
                },
                {
                    question: "Does this include Ad Spend (ROAS)?",
                    answer: "No. This calculator finds your 'Gross Profit' (Revenue - COGS). You pay for ads from your Gross Profit. Determining your 'Net Profit' after ads is a separate calculation."
                }
            ]}
        />
    )
}
