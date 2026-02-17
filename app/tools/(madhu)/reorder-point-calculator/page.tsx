"use client"

import { ReorderPointCalculator } from "./_components/ReorderPointCalculator"
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
    Timer
} from "lucide-react"

export default function ReorderPointCalculatorPage() {
    return (
        <MadhuToolTemplate
            title="Reorder Point Calculator"
            toolComponent={<ReorderPointCalculator />}
            howToUseSteps={[
                {
                    title: "Enter Daily Sales Velocity",
                    description: "Input the average number of units you sell per day. Use your last 30 days of data for the most accurate 'normal' velocity.",
                    icon: TrendingUp
                },
                {
                    title: "Input Lead Time",
                    description: "Enter the total days it takes from placing an order to receiving stock. This includes production, shipping, and customs clearance.",
                    icon: Clock
                },
                {
                    title: "Set Safety Stock",
                    description: "Add a buffer to handle unexpected sales spikes. A common rule of thumb is keeping 14 days of 'backup' demand.",
                    icon: ShieldCheck
                },
                {
                    title: "Analyze the Journey",
                    description: "Watch the 'Restock Journey' timeline to visualize your order point. This represents the 'danger zone' where you must act to prevent stockouts.",
                    icon: Timer
                }
            ]}
            howToUseGoal={{
                title: "Master Your Inventory Timeline",
                description: "The goal is to pinpoint the exact inventory level that triggers a restock, ensuring you never hit zero units while waiting for your next shipment to arrive.",
                icon: CheckCircle2
            }}
            hiddenTruthInsights={[
                {
                    title: "The Marketplace Ranking Tax",
                    description: "Running out of stock doesn't just lose sales today—it destroys your search rank. Markets like Amazon prioritize 'In-Stock' reliability over almost everything else.",
                    icon: AlertCircle,
                    stat: "42%",
                    statLabel: "Rank Recovery Risk",
                    iconBg: "bg-red-50",
                    iconColor: "text-red-600",
                    statColor: "text-red-600",
                    tooltip: "Recovering your previous ranking can take 3x longer than the duration of the stock-out."
                },
                {
                    title: "The Lead Time Illusion",
                    description: "Sellers often forget 'Admin Time'. If it takes you 3 days to approve an invoice, your lead time is 3 days longer than the factory says. Factor this into your calculation.",
                    icon: Timer,
                    stat: "+3 Days",
                    statLabel: "Admin Buffer",
                    iconBg: "bg-orange-50",
                    iconColor: "text-orange-600",
                    statColor: "text-orange-600"
                },
                {
                    title: "Capital Opportunity Cost",
                    description: "Setting an ROP too high wastes cash. Every $1 tied up in excessive safety stock is $1 you can't spend on new product launches or marketing.",
                    icon: Warehouse,
                    stat: "22%",
                    statLabel: "Capital Drag",
                    iconBg: "bg-blue-50",
                    iconColor: "text-blue-600",
                    statColor: "text-blue-600"
                }
            ]}
            faqs={[
                {
                    question: "What exactly does the 'Restock Journey' show?",
                    answer: "The Restock Journey visualizes the critical window between placing an order and receiving it. It highlights exactly where your 'Reorder Point' sits in that timeline to help you visualize the inventory drawdown."
                },
                {
                    question: "How do I calculate the best Safety Stock?",
                    answer: "A standard approach is: (Max Daily Sales × Max Lead Time) - (Average Daily Sales × Average Lead Time). For simpler setups, many sellers just keep 20% of their lead time demand as safety stock."
                },
                {
                    question: "Should I change my ROP for Q4 or Holidays?",
                    answer: "Absolutely. During peak seasons, your 'Daily Sales Velocity' can triple. You should recalculate your ROP at least 45 days before a major sales event like Black Friday."
                },
                {
                    question: "What if my lead time varies every shipment?",
                    answer: "Always use the 'Worst Case' lead time in your calculation. If shipping usually takes 20 days but sometimes 30, use 30. It's cheaper to hold 10 extra days of stock than to go out of stock."
                }
            ]}
        />
    )
}
