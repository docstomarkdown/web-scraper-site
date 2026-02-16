"use client"

import { LeadTimeCalculator } from "./_components/LeadTimeCalculator"
import { MadhuToolTemplate } from "../ToolTemplate"
import {
    Clock,
    Zap,
    ShieldCheck,
    TrendingDown,
    Calendar,
    AlertTriangle,
    CheckCircle2
} from "lucide-react"

export default function LeadTimeCalculatorPage() {
    return (
        <MadhuToolTemplate
            title="Lead Time Calculator"
            toolComponent={<LeadTimeCalculator />}
            howToUseSteps={[
                {
                    title: "Define Production Window",
                    description: "Enter the time required for manufacturing and quality control. This is usually the largest chunk of your lead time.",
                    icon: Zap
                },
                {
                    title: "Add Logistics & Customs",
                    description: "Input transit times (Sea/Air) and estimated days for customs clearance. Don't forget documentation prep time!",
                    icon: Clock
                },
                {
                    title: "Apply Safety Buffers",
                    description: "Always include a buffer for unexpected delays like port congestion, weather, or failed QC reports.",
                    icon: ShieldCheck
                }
            ]}
            howToUseGoal={{
                title: "Calculate 'In-Stock' Date",
                description: "The goal is to know exactly when your inventory will be ready for sale, allowing you to trigger restock orders before running out of stock (Stock-out).",
                icon: CheckCircle2
            }}
            hiddenTruthInsights={[
                {
                    title: "The 'Golden Ratio' Buffer",
                    description: "Successful e-commerce sellers add a 15-20% buffer to their total lead time. If your calculated time is 50 days, plan for 60. This prevents emergency air freight costs.",
                    icon: TrendingDown,
                    stat: "15-20%",
                    statLabel: "Recommended Buffer",
                    iconBg: "bg-orange-50",
                    iconColor: "text-orange-600",
                    statColor: "text-orange-600",
                    tooltip: "Account for holidays like Chinese New Year where production stops for 3 weeks."
                },
                {
                    title: "Hidden 'QC' Delays",
                    description: "Most calculators ignore the 'Repair Time' if a Quality Control (QC) check fails. A failed check can add 7-10 days to your production window instantly.",
                    icon: AlertTriangle,
                    stat: "+10d",
                    statLabel: "QC Fail Risk",
                    iconBg: "bg-red-50",
                    iconColor: "text-red-600",
                    statColor: "text-red-600"
                },
                {
                    title: "The Port Congestion Trap",
                    description: "Sea shipping might be 25 days on water, but 'Port to Door' delivery (getting off the ship) can take an extra 5-7 days at busy ports like LA or Felixstowe.",
                    icon: Clock,
                    stat: "5-7d",
                    statLabel: "Drayage Delay",
                    iconBg: "bg-blue-50",
                    iconColor: "text-blue-600",
                    statColor: "text-blue-600"
                }
            ]}
            faqs={[
                {
                    question: "What is lead time in supply chain?",
                    answer: "Lead time is the total amount of time that elapses between the moment a customer places an order and the moment they receive the product. In manufacturing, it's the time from the 'Start Production' signal to 'Warehouse Delivery'."
                },
                {
                    question: "How do I calculate my reorder point (ROP)?",
                    answer: "Use the formula: (Daily Sales × Lead Time) + Safety Stock. If you sell 10 units/day and lead time is 45 days, you need to reorder when you have at least 450 units left."
                },
                {
                    question: "Does this calculator account for weekends?",
                    answer: "Production and shipping often move on weekends, but customs and local courier deliveries might not. This calculator uses total calendar days to give a realistic conservative estimate."
                },
                {
                    question: "What is the difference between production lead time and total lead time?",
                    answer: "Production lead time only covers manufacturing. Total lead time (which this tool calculates) includes order processing, shipping, customs, and final delivery."
                }
            ]}
        />
    )
}
