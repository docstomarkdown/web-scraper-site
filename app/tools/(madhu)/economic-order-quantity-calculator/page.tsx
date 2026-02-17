"use client"

import { EOQCalculator } from "./_components/EOQCalculator"
import { MadhuToolTemplate } from "../ToolTemplate"
import {
    Package,
    TrendingUp,
    ShieldCheck,
    Clock,
    AlertCircle,
    CheckCircle2,
    ShoppingCart,
    BarChart3,
    Warehouse,
    Timer,
    DollarSign,
    Scale,
    Activity
} from "lucide-react"

export default function EOQCalculatorPage() {
    return (
        <MadhuToolTemplate
            title="Economic Order Quantity (EOQ) Calculator"
            toolComponent={<EOQCalculator />}
            howToUseSteps={[
                {
                    title: "Define Annual Demand",
                    description: "Input the total units you anticipate selling or using in one year. Use historical data or future forecasts for precise results.",
                    icon: TrendingUp
                },
                {
                    title: "Calculate Ordering Costs",
                    description: "Enter the fixed cost per purchase order—including administrative labor, shipping fees, and quality inspections.",
                    icon: ShoppingCart
                },
                {
                    title: "Estimate Storage Burden",
                    description: "Input the annual cost to carry one unit. Include warehouse rent, insurance, and the interest on tied-up capital.",
                    icon: Warehouse
                },
                {
                    title: "Find Daily Equilibrium",
                    description: "Review the Cost Balance Analysis to identify where your ordering and storage costs meet for minimum total spend.",
                    icon: Scale
                }
            ]}
            howToUseGoal={{
                title: "Achieve Inventory Equilibrium",
                description: "Master the balance between storage costs and ordering frequency. Our tool identifies the exact volume that minimizes your annual supply chain expenditure.",
                icon: CheckCircle2
            }}
            hiddenTruthInsights={[
                {
                    title: "The Silent Cost of Capital",
                    description: "Every dollar sitting on a shelf is a dollar not being spent on growth. EOQ helps you release frozen capital and reinvest it where it matters most.",
                    icon: DollarSign,
                    stat: "12-15%",
                    statLabel: "Capital Leakage",
                    iconBg: "bg-blue-50",
                    iconColor: "text-blue-600",
                    statColor: "text-blue-600",
                    tooltip: "The typical 'Cost of Capital' for retail businesses—representing the profit lost by not investing that money elsewhere."
                },
                {
                    title: "The 'Efficiency' Delusion",
                    description: "Ordering less frequently to save time often leads to bloated storage bills. True efficiency is found when your Ordering and Storage costs are equal.",
                    icon: Activity,
                    stat: "1:1",
                    statLabel: "Optimal Ratio",
                    iconBg: "bg-orange-50",
                    iconColor: "text-orange-600",
                    statColor: "text-orange-600"
                },
                {
                    title: "Inventory Obsolescence",
                    description: "Excess stock doesn't just cost rent; it risks expiring or becoming obsolete. High holding costs are often the first sign of a dangerous inventory surplus.",
                    icon: AlertCircle,
                    stat: "25%",
                    statLabel: "Value Loss",
                    iconBg: "bg-red-50",
                    iconColor: "text-red-600",
                    statColor: "text-red-600"
                }
            ]}
            faqs={[
                {
                    question: "What is the 'Optimal Equilibrium' in the analysis?",
                    answer: "In inventory theory, your total cost is minimized at the exact point where your total annual ordering costs equal your total annual holding costs. Our tool tracks this 'sweet spot' to ensure your supply chain is mathematically optimized."
                },
                {
                    question: "Why should I care about Ordering Costs?",
                    answer: "Ordering costs include the hidden labor of your procurement team, bank fees for international transfers, and fixed shipping rates. If you order too often, these small fees compound into a massive annual drain on your profits."
                },
                {
                    question: "How do holding costs vary by industry?",
                    answer: "Perishable items or electronics have high holding costs (30%+) due to expiration and rapid obsolescence. Stable items like hardware usually have lower costs (15-20%) because they retain value longer on the shelf."
                },
                {
                    question: "Does the calculator account for lead times?",
                    answer: "Standard EOQ focuses on 'How much' to order. To know 'When' to order, you should use this in conjunction with our Reorder Point (ROP) Calculator to account for shipping lead times."
                }
            ]}
        />
    )
}
