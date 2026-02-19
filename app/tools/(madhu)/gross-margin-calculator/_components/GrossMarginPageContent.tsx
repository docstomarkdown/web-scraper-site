"use client"

import { MadhuToolTemplate, Step, Insight, FAQ } from "../../ToolTemplate"
import { GrossMarginCalculator } from "./GrossMarginCalculator"
import { Calculator, DollarSign, TrendingUp, AlertTriangle, Target, BarChart3, Wallet } from "lucide-react"

export function GrossMarginPageContent() {

    const steps: Step[] = [
        {
            title: "Select Calculation Mode",
            description: "Choose from <strong>Find Margin</strong> (to get margin %), <strong>Find Revenue</strong> (to get required price), or <strong>Find COGS Cost</strong> (to get max allowable cost).",
            icon: Calculator
        },
        {
            title: "Input Financial Data",
            description: "Enter your values in the <strong>Configurations</strong> card. For COGS, include all direct costs per unit. For Revenue, use your total sales price.",
            icon: DollarSign
        },
        {
            title: "Analyze & Export",
            description: "View your <strong>Gross Margin</strong>, <strong>Gross Profit</strong>, and <strong>Markup</strong> in the live results. Use the <strong>Copy Results</strong> button to save your calculation.",
            icon: BarChart3
        }
    ]

    const goal = {
        title: "Master Your Unit Economics",
        description: "To protect your profitability by understanding the exact relationship between your revenue and costs, ensuring you never sell at a loss and always maintain healthy margins.",
        icon: Target
    }

    const insights: Insight[] = [
        {
            title: "Margin is NOT Markup",
            description: "This is the #1 mistake. Markup is % added to Cost. Margin is % of Revenue. If you buy for $50 and markup 50% to sell at $75, your Margin is only 33% ($25/$75).",
            icon: AlertTriangle,
            stat: "33% vs 50%",
            statLabel: "Margin vs Markup",
            iconBg: "bg-red-100",
            iconColor: "text-red-600",
            statColor: "text-red-600",
            tooltip: "Confusing these two can lead to underpricing by 17% or more."
        },
        {
            title: "The Operating Expense Gap",
            description: "Gross Margin is not your take-home pay. It must be high enough to cover all Operating Expenses (OpEx) like rent, marketing, and salaries before you see Net Profit.",
            icon: Wallet,
            stat: "Gross > OpEx",
            statLabel: "Profit Formula",
            iconBg: "bg-amber-100",
            iconColor: "text-amber-600",
            statColor: "text-amber-600",
            tooltip: "If Gross Margin < OpEx, you are losing money operationally."
        },
        {
            title: "Volume vs. Margin",
            description: "A lower margin product with high velocity (volume) often generates more total cash profit than a high-margin product that rarely sells. Balance is key.",
            icon: TrendingUp,
            stat: "Cash Flow",
            statLabel: "King of Business",
            iconBg: "bg-emerald-100",
            iconColor: "text-emerald-600",
            statColor: "text-emerald-600",
        }
    ]

    const faqs: FAQ[] = [
        {
            question: "What is the formula for Gross Margin?",
            answer: "Gross Margin % = ((Total Revenue - COGS) / Total Revenue) * 100. It represents the percentage of each dollar of revenue that you retain as gross profit."
        },
        {
            question: "What is a 'good' Gross Margin?",
            answer: "It varies wildly by industry. SaaS companies often aim for 80%+, while high-volume retail might thrive on 25-30%. As a rule of thumb for e-commerce, aiming for 50%+ allows ample room for marketing and OpEx."
        },
        {
            question: "When should I use 'Find Revenue'?",
            answer: "Use this mode when you know your product cost (COGS) and want to achieve a specific margin (e.g., 40%). The tool will tell you exactly what price you need to sell at."
        },
        {
            question: "Why does this tool calculate Markup too?",
            answer: "We include Markup to help you spot the difference. Many suppliers quote in Markup, while your P&L speaks in Margin. Seeing both helps you translate between supplier-speak and accountant-speak."
        }
    ]

    return (
        <MadhuToolTemplate
            title="Gross Margin Calculator"
            toolComponent={<GrossMarginCalculator />}
            howToUseSteps={steps}
            howToUseGoal={goal}
            hiddenTruthInsights={insights}
            faqs={faqs}
        />
    )
}
