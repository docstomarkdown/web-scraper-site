"use client"

import { DaysOfInventoryCalculator } from "./_components/DaysOfInventoryCalculator"
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
    LineChart
} from "lucide-react"

export default function DaysOfInventoryCalculatorPage() {
    return (
        <MadhuToolTemplate
            title="Days of Inventory Remaining Calculator"
            toolComponent={<DaysOfInventoryCalculator />}
            howToUseSteps={[
                {
                    title: "Select Velocity Period",
                    description: "Choose how you track sales: Daily (for day-to-day tracking), Weekly (for weekly reports), or Monthly (for monthly data). The calculator automatically converts to daily burn rate.",
                    icon: Clock
                },
                {
                    title: "Input Current Stock",
                    description: "Enter the total physical units currently available in your warehouse. This is your starting inventory that will be depleted over time.",
                    icon: Package
                },
                {
                    title: "Enter Sales Speed",
                    description: "Input your average units sold per selected period. The tool will calculate your daily burn rate to determine how fast your inventory depletes.",
                    icon: TrendingUp
                },
                {
                    title: "Set Safety Buffer (Optional)",
                    description: "Define a safety stock level to exclude from your useable runway. This buffer protects against delays or unexpected demand spikes.",
                    icon: ShieldCheck
                },
                {
                    title: "Review Runway & Stock-Out Date",
                    description: "Check the total days remaining, estimated stock-out date, and your Net Useable Runway. Use status indicators (Critical, Warning, Healthy, Overstock) to prioritize reordering decisions.",
                    icon: Calendar
                }
            ]}
            howToUseGoal={{
                title: "Eliminate Stock-Outs Forever",
                description: "Master your inventory runway. By knowing exactly when your stock will hit zero, you can transition from reactive 'fire-fighting' to proactive supply chain planning.",
                icon: CheckCircle2
            }}
            hiddenTruthInsights={[
                {
                    title: "The Safety Stock Illusion",
                    description: "Many businesses confuse 'safety stock' with 'buffer stock.' Safety stock is a statistical calculation based on demand variability and lead time uncertainty—not just an arbitrary number you feel comfortable with.",
                    icon: ShieldCheck,
                    stat: "2.5x",
                    statLabel: "Standard Deviation",
                    iconBg: "bg-purple-50",
                    iconColor: "text-purple-600",
                    statColor: "text-purple-600",
                    tooltip: "Proper safety stock should cover 2-3 standard deviations of demand variability during lead time."
                },
                {
                    title: "The Timeframe Trap",
                    description: "Using monthly velocity data can mask critical daily or weekly fluctuations. A product averaging 300 units/month might sell 5/day for 3 weeks, then 50/day during week 4—leading to hidden stockouts.",
                    icon: Activity,
                    stat: "73%",
                    statLabel: "Forecast Error",
                    iconBg: "bg-orange-50",
                    iconColor: "text-orange-600",
                    statColor: "text-orange-600"
                },
                {
                    title: "The Lead Time Blindspot",
                    description: "Your runway calculation tells you when stock hits zero—but you need to reorder when stock equals your safety buffer PLUS lead time demand. Waiting too long means guaranteed stockouts.",
                    icon: Timer,
                    stat: "Runway - Lead Time",
                    statLabel: "Reorder Trigger",
                    iconBg: "bg-blue-50",
                    iconColor: "text-blue-600",
                    statColor: "text-blue-600"
                }
            ]}
            faqs={[
                {
                    question: "What do the status indicators (Critical, Warning, Healthy, Overstock) mean?",
                    answer: "Critical: Less than 7 days remaining—reorder immediately. Warning: 7-21 days—plan your reorder now. Healthy: 21-90 days—optimal inventory range. Overstock: Over 90 days—risk of dead stock and capital tie-up."
                },
                {
                    question: "Should I use Daily, Weekly, or Monthly velocity tracking?",
                    answer: "Use the timeframe that matches your reporting system. However, Daily velocity gives the most accurate runway calculations. If you track monthly, the calculator converts it to daily (dividing by 30), but daily tracking captures demand variability better."
                },
                {
                    question: "What is 'Net Useable Runway' and why does it matter?",
                    answer: "Net Useable Runway shows how many days of stock you have BEFORE hitting your safety buffer. This is your actionable timeline—when this hits your lead time, you must reorder or risk stockouts."
                },
                {
                    question: "How much safety stock should I keep?",
                    answer: "A common rule: Safety Stock = (Max Daily Sales - Avg Daily Sales) × Lead Time Days. For example, if you average 50 units/day but can spike to 80, with a 14-day lead time, keep (80-50) × 14 = 420 units as buffer."
                },
                {
                    question: "Why isn't my on-order inventory counted?",
                    answer: "This calculator shows your TODAY runway based on physical stock. Incoming orders should be tracked separately—if your stock-out date is Feb 20 and your shipment arrives Feb 15, you're safe. If it arrives Feb 25, you'll stockout for 5 days."
                }
            ]}
        />
    )
}
